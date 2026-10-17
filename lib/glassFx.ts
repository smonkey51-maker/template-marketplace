/**
 * Should the heavy glass effects (the liquid-gl lenses and the SVG refraction) run?
 *
 * They are built for a GPU. With software rendering (no hardware acceleration) the
 * lens set-up alone blocked the main thread for several seconds — the page ignored
 * clicks — so there they stay off and the CSS glass, which carries all the legibility
 * anyway, is what the visitor sees. Also off on very low core counts and with the
 * data-saver setting.
 *
 * `?lenses=on` / `?lenses=off` in the URL overrides the detection (used by the tests,
 * and by the contrast audit, which must see the effects in a headless browser).
 * The answer is computed once, in an idle moment (creating a WebGL context is not
 * free, and very slow under software rendering), kept for client-side navigations and
 * remembered for the session so later page loads do not pay for the probe again.
 */
let cached: boolean | undefined;

function isSoftwareRenderer(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return true;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch {
    return true;
  }
}

const idle = () =>
  new Promise<void>((resolve) => {
    if ("requestIdleCallback" in window) {
      (
        window as Window & {
          requestIdleCallback: (cb: () => void, o?: { timeout: number }) => void;
        }
      ).requestIdleCallback(() => resolve(), { timeout: 2000 });
    } else {
      setTimeout(resolve, 600);
    }
  });

export async function glassEffectsEnabled(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (cached !== undefined) return cached;
  const flag = new URLSearchParams(window.location.search).get("lenses");
  if (flag === "on") return (cached = true);
  if (flag === "off") return (cached = false);
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return (cached = false);
  if ((nav.hardwareConcurrency ?? 8) < 4) return (cached = false);
  try {
    const remembered = sessionStorage.getItem("glassfx");
    if (remembered) return (cached = remembered === "1");
  } catch {}
  await idle();
  const ok = !isSoftwareRenderer();
  try {
    sessionStorage.setItem("glassfx", ok ? "1" : "0");
  } catch {}
  return (cached = ok);
}
