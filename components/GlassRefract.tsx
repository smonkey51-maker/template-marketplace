"use client";

import { useEffect } from "react";
import { glassEffectsEnabled } from "@/lib/glassFx";

/**
 * Real refraction on the page's glass panels (Chromium only).
 *
 * Every `.glass` panel gets an SVG filter built around a displacement map of its own
 * size. In a rounded-rectangle rim near the edge the *sharp* backdrop is bent inward
 * like the lip of a glass slab, with a hint of chromatic aberration; everywhere else it
 * is the same frosted blur as before. The filter is applied through
 * `backdrop-filter: url(#id) saturate()`, so it only ever touches what is *behind* the
 * panel — never the text on it — and the part of the backdrop that sits behind the text
 * is unchanged. That is what keeps it legible: refraction lives in the outer ~30 px,
 * where there is padding and no text.
 *
 * Safari and Firefox do not accept `url()` in `backdrop-filter`; the capability check
 * fails there and the panels keep their ordinary CSS blur. Skipped for reduced
 * transparency. Panels are only filtered while near the viewport.
 */

const BEZEL = 30; // px: width of the refracting rim
const SHIFT = 22; // px: maximum backdrop displacement, at the very edge
const BLUR_STD = 12; // px: the frosted interior (≈ CSS blur(12px))
const ABERRATION = 0.07; // relative colour-channel spread
const SAT = "saturate(170%)";
const MAX_PANELS = 14;
const MAX_SIDE = 1600;

type Entry = { id: string; filter: SVGFilterElement; w: number; h: number; on: boolean };

/**
 * Two images of the panel's size: the displacement map (neutral grey inside, inward
 * vectors in the rim) and a rim mask (alpha 1 at the edge, easing to 0 inside), which
 * decides where the sharp bent backdrop replaces the frosted one.
 */
function buildMaps(w: number, h: number, r: number): { map: string; mask: string } | null {
  const mk = () => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    return c;
  };
  const cMap = mk();
  const cMask = mk();
  const xMap = cMap.getContext("2d");
  const xMask = cMask.getContext("2d");
  if (!xMap || !xMask) return null;
  const iMap = xMap.createImageData(w, h);
  const iMask = xMask.createImageData(w, h);
  const d = iMap.data;
  const m = iMask.data;
  const rad = Math.min(r, w / 2, h / 2);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      d[i] = d[i + 1] = d[i + 2] = 128;
      d[i + 3] = 255;
      m[i] = m[i + 1] = m[i + 2] = 255;
      m[i + 3] = 0;

      const px = Math.min(x + 0.5, w - x - 0.5);
      const py = Math.min(y + 0.5, h - y - 0.5);
      if (Math.min(px, py) >= BEZEL + rad) continue; // deep inside: neutral

      let dist: number; // distance inward from the panel's edge
      let nx = 0;
      let ny = 0; // inward unit normal
      if (px < rad && py < rad) {
        const cx = x < w / 2 ? rad : w - rad;
        const cy = y < h / 2 ? rad : h - rad;
        const vx = cx - (x + 0.5);
        const vy = cy - (y + 0.5);
        const len = Math.hypot(vx, vy) || 1;
        dist = rad - len;
        nx = vx / len;
        ny = vy / len;
      } else if (px < py) {
        dist = px;
        nx = x < w / 2 ? 1 : -1;
      } else {
        dist = py;
        ny = y < h / 2 ? 1 : -1;
      }
      if (dist < 0 || dist >= BEZEL) continue;

      const t = 1 - dist / BEZEL;
      const k = t * t; // strongest at the edge, easing to nothing
      d[i] = Math.round(128 + 127 * nx * k);
      d[i + 1] = Math.round(128 + 127 * ny * k);
      // The rim mask stays solid through most of the rim and falls off at its inner edge.
      m[i + 3] = Math.round(255 * Math.min(1, t * 2.2));
    }
  }
  xMap.putImageData(iMap, 0, 0);
  xMask.putImageData(iMask, 0, 0);
  return { map: cMap.toDataURL("image/png"), mask: cMask.toDataURL("image/png") };
}

export default function GlassRefract() {
  useEffect(() => {
    if (
      typeof CSS === "undefined" ||
      !CSS.supports("backdrop-filter", "url(#a)") ||
      window.matchMedia("(prefers-reduced-transparency: reduce)").matches
    ) {
      return;
    }

    let stop: (() => void) | undefined;
    let cancelled = false;
    // Only run where there is a GPU for it (lib/glassFx.ts decides, once, in an idle moment).
    void glassEffectsEnabled().then((ok) => {
      if (ok && !cancelled) stop = start();
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return null;
}

/** Sets the filters up; returns the function that tears them down. */
function start(): () => void {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.style.cssText = "position:absolute;width:0;height:0;pointer-events:none";
  const defs = document.createElementNS(NS, "defs");
  svg.appendChild(defs);
  document.body.appendChild(svg);

  const entries = new Map<HTMLElement, Entry>();
  let seq = 0;
  let timer = 0;

  const setFilter = (el: HTMLElement, id: string | null) => {
    const value = id ? `url(#${id}) ${SAT}` : "";
    el.style.backdropFilter = value;
    el.style.setProperty("-webkit-backdrop-filter", value);
  };

  const rebuild = (el: HTMLElement, entry: Entry) => {
    const r = el.getBoundingClientRect();
    const w = Math.round(r.width);
    const h = Math.round(r.height);
    if (w < 120 || h < 60 || w > MAX_SIDE || h > MAX_SIDE) {
      setFilter(el, null);
      entry.on = false;
      return;
    }
    if (w === entry.w && h === entry.h && entry.filter.firstChild) return;
    entry.w = w;
    entry.h = h;
    const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 20;
    const maps = buildMaps(w, h, radius);
    if (!maps) return;

    const f = entry.filter;
    f.replaceChildren();
    f.setAttribute("color-interpolation-filters", "sRGB");
    f.setAttribute("x", "0");
    f.setAttribute("y", "0");
    f.setAttribute("width", String(w));
    f.setAttribute("height", String(h));
    f.setAttribute("filterUnits", "userSpaceOnUse");
    f.setAttribute("primitiveUnits", "userSpaceOnUse");

    const mk = (tag: string, attrs: Record<string, string>) => {
      const n = document.createElementNS(NS, tag);
      for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
      f.appendChild(n);
    };
    const img = (href: string, result: string) =>
      mk("feImage", {
        href,
        x: "0",
        y: "0",
        width: String(w),
        height: String(h),
        preserveAspectRatio: "none",
        result,
      });
    img(maps.map, "map");
    img(maps.mask, "mask");
    // The frosted interior (edge pixels duplicated, so it does not fade at the border).
    mk("feGaussianBlur", {
      in: "SourceGraphic",
      stdDeviation: String(BLUR_STD),
      edgeMode: "duplicate",
      result: "frost",
    });
    // The sharp backdrop, displaced once per colour channel and spread slightly:
    // red bends least, blue most.
    const channels: [string, number, string][] = [
      ["r", 1 - ABERRATION, "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"],
      ["g", 1, "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"],
      ["b", 1 + ABERRATION, "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"],
    ];
    for (const [name, k, matrix] of channels) {
      mk("feDisplacementMap", {
        in: "SourceGraphic",
        in2: "map",
        scale: String(SHIFT * 2 * k),
        xChannelSelector: "R",
        yChannelSelector: "G",
        result: `d${name}`,
      });
      mk("feColorMatrix", { in: `d${name}`, type: "matrix", values: matrix, result: name });
    }
    mk("feBlend", { in: "r", in2: "g", mode: "screen", result: "rg" });
    mk("feBlend", { in: "rg", in2: "b", mode: "screen", result: "bent" });
    // Sharp and bent inside the rim, frosted everywhere else.
    mk("feComposite", { in: "bent", in2: "mask", operator: "in", result: "rim" });
    mk("feComposite", { in: "frost", in2: "mask", operator: "out", result: "core" });
    const merge = document.createElementNS(NS, "feMerge");
    for (const name of ["core", "rim"]) {
      const node = document.createElementNS(NS, "feMergeNode");
      node.setAttribute("in", name);
      merge.appendChild(node);
    }
    f.appendChild(merge);
    entry.on = true;
    setFilter(el, entry.id);
  };

  const ro = new ResizeObserver((list) => {
    for (const { target } of list) {
      const e = entries.get(target as HTMLElement);
      if (e && e.on) schedule(target as HTMLElement);
    }
  });

  const pending = new Set<HTMLElement>();
  const schedule = (el: HTMLElement) => {
    pending.add(el);
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      for (const p of pending) {
        const e = entries.get(p);
        if (e && p.isConnected) rebuild(p, e);
      }
      pending.clear();
    }, 120);
  };

  // Filter a panel only while it is near the viewport: the GPU cost is per visible pixel.
  const io = new IntersectionObserver(
    (list) => {
      for (const { target, isIntersecting } of list) {
        const el = target as HTMLElement;
        const e = entries.get(el);
        if (!e) continue;
        if (isIntersecting) {
          if (e.on) setFilter(el, e.id);
          else rebuild(el, e);
        } else {
          setFilter(el, null);
        }
      }
    },
    { rootMargin: "200px 0px" },
  );

  const attach = (el: HTMLElement) => {
    if (entries.has(el) || entries.size >= MAX_PANELS) return;
    const id = `glass-refract-${++seq}`;
    const filter = document.createElementNS(NS, "filter");
    filter.setAttribute("id", id);
    defs.appendChild(filter);
    entries.set(el, { id, filter, w: 0, h: 0, on: false });
    ro.observe(el);
    io.observe(el);
  };

  const detachGone = () => {
    for (const [el, e] of entries) {
      if (!el.isConnected) {
        ro.unobserve(el);
        io.unobserve(el);
        e.filter.remove();
        entries.delete(el);
      }
    }
  };

  const scan = () => {
    detachGone();
    document.querySelectorAll<HTMLElement>("main .glass-panel").forEach(attach);
  };
  scan();

  // Pages swap their panels on navigation, and some appear later (e.g. the form's thanks).
  const mo = new MutationObserver(() => scan());
  mo.observe(document.getElementById("main-content") ?? document.body, {
    childList: true,
    subtree: true,
  });

  return () => {
    mo.disconnect();
    io.disconnect();
    ro.disconnect();
    window.clearTimeout(timer);
    for (const el of entries.keys()) setFilter(el, null);
    svg.remove();
  };
}
