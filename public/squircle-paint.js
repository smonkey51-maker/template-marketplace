/* CSS Paint API worklet — draws a superellipse ("squircle") corner instead of
 * a circular one, at a fixed pixel radius regardless of element size or
 * aspect ratio (unlike a clip-path scaled to the element's bounding box).
 * Registered from components/GlassEnhancements.tsx; falls back silently
 * (mask never applies) in browsers without Paint API support — Safari and
 * Firefox included, so this is a Chromium-only enhancement layered on top
 * of the existing border-radius, never a replacement for it.
 */
registerPaint(
  "squircle",
  class {
    static get inputProperties() {
      return ["--squircle-radius", "--squircle-n"];
    }

    paint(ctx, size, props) {
      const w = size.width;
      const h = size.height;

      const radiusRaw = parseFloat(props.get("--squircle-radius").toString());
      const nRaw = parseFloat(props.get("--squircle-n").toString());
      const r = Math.max(0, Math.min(Number.isFinite(radiusRaw) ? radiusRaw : 16, w / 2, h / 2));
      const n = Number.isFinite(nRaw) && nRaw > 0 ? nRaw : 5;

      if (r === 0) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);
        return;
      }

      // g(t) traces one axis of a corner from 0 (at the tangent point) to r
      // (at the true corner), t in [0,1]. g(1-t) traces the other axis in
      // the complementary direction — together they draw a quarter of the
      // superellipse. n=2 reproduces a circular corner exactly; n=4–6 is
      // the flatter-edge, tighter-turn look of Apple's "continuous corners".
      const g = (t) => r * (1 - Math.pow(Math.cos((t * Math.PI) / 2), 2 / n));
      const steps = 14;

      const pts = [];
      pts.push([r, 0]);
      pts.push([w - r, 0]);
      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        pts.push([w - g(1 - t), g(t)]);
      }
      pts.push([w, r]);
      pts.push([w, h - r]);
      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        pts.push([w - g(t), h - g(1 - t)]);
      }
      pts.push([w - r, h]);
      pts.push([r, h]);
      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        pts.push([g(1 - t), h - g(t)]);
      }
      pts.push([0, h - r]);
      pts.push([0, r]);
      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        pts.push([g(t), g(1 - t)]);
      }
      pts.push([r, 0]);

      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = "#000";
      ctx.fill();
    }
  },
);
