<script>
  import { drawOrder, viewPoint } from '#lib/geom-engine/solid.js';
  import { bounds, decoMarks, faceGroups, onFace, outerFaces, shade } from './solids.js';

  /**
   * One or more boxes (khối lập phương, khối hộp chữ nhật, walls of cubes)
   * drawn in 3D from a view that may turn. Faces far from the viewer are
   * drawn first, so near faces cover them. The scale fits the whole set in
   * any view, so the drawing keeps its size while it turns.
   *
   * - `boxes`: what to draw (see `Box` in `solids.js`);
   * - `view`: `{ yaw, pitch }` in degrees;
   * - `tone`: colour each face by its size group: faces of equal size share
   *   a colour, so all faces of a cube look alike;
   * - `width`, `height`: the SVG canvas;
   * - `label`: what the drawing shows, for screen readers;
   * - `decorative`: hide it from screen readers when a nearby label names it.
   * @type {{
   *   boxes: import('./solids.js').Box[];
   *   view?: { yaw: number, pitch: number };
   *   tone?: boolean;
   *   width?: number;
   *   height?: number;
   *   label?: string;
   *   decorative?: boolean;
   * }}
   */
  let {
    boxes,
    view = { yaw: -30, pitch: 22 },
    tone = false,
    width = 240,
    height = 200,
    label = '',
    decorative = false,
  } = $props();

  const TONES = ['#6366f1', '#f59e0b', '#10b981'];
  const PAD = 10;

  const fit = $derived(bounds(boxes));
  const scale = $derived((Math.min(width, height) / 2 - PAD) / (fit.radius || 1));
  const centre = $derived(viewPoint(fit.centre, view));
  /** @param {{ x: number, y: number }} p */
  const toScreen = (p) => ({
    x: width / 2 + scale * (p.x - centre.x),
    y: height / 2 + scale * (p.y - centre.y),
  });
  const faces = $derived(drawOrder(outerFaces(boxes), view, toScreen).filter((f) => f.front));

  /** @param {{ x: number, y: number }[]} pts */
  const path = (pts) =>
    pts.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';

  /** Light from above and a little from the left: tops brightest. */
  const LIGHT = /** @type {const} */ ({
    top: 0.35,
    bottom: -0.3,
    front: 0,
    back: -0.15,
    left: -0.2,
    right: -0.2,
  });

  /** @param {import('./solids.js').BoxFace} face */
  function fillOf(face) {
    const box = boxes[face.box];
    const base = tone
      ? TONES[faceGroups(box.dims)[face.face] % TONES.length]
      : (box.faceColors?.[face.face] ?? box.color);
    return shade(base, LIGHT[face.face]);
  }

  /**
   * Marks of a decorated face on screen.
   * @param {import('./solids.js').BoxFace} face
   * @param {{ x: number, y: number }[]} screen
   */
  function marksOf(face, screen) {
    if (tone) return [];
    return decoMarks(boxes[face.box].deco, face.face).map((m) => {
      if (m.type === 'dot') {
        const [cu, cv] = m.uv[0];
        const r = m.r ?? 0.1;
        const ring = Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * 2 * Math.PI;
          return onFace(screen, cu + r * Math.cos(a), cv + r * Math.sin(a));
        });
        return { d: path(ring), fill: m.fill ?? '#1e293b', line: false };
      }
      const pts = m.uv.map(([u, v]) => onFace(screen, u, v));
      if (m.type === 'line') {
        return {
          d: `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y}`,
          fill: 'none',
          line: true,
        };
      }
      return { d: path(pts), fill: m.fill ?? '#1e293b', line: false };
    });
  }
</script>

<svg
  viewBox="0 0 {width} {height}"
  class="block h-auto w-full select-none"
  role={decorative ? undefined : 'img'}
  aria-label={decorative ? undefined : label}
  aria-hidden={decorative ? 'true' : undefined}
>
  {#each faces as f (f.face.id)}
    <path
      d={path(f.screen)}
      fill={fillOf(/** @type {import('./solids.js').BoxFace} */ (f.face))}
      stroke="#1e293b"
      stroke-width="2"
      stroke-linejoin="round"
    />
    {#each marksOf(/** @type {import('./solids.js').BoxFace} */ (f.face), f.screen) as m, i (i)}
      <path
        d={m.d}
        fill={m.fill}
        stroke={m.line ? '#1e293b' : 'none'}
        stroke-width={m.line ? 1.6 : 0}
        stroke-opacity="0.7"
      />
    {/each}
  {/each}
</svg>
