<svelte:options namespace="svg" />

<script>
  import { along } from '#lib/core/visuals/angle-math.js';

  /**
   * A half-circle protractor drawn inside an SVG, its centre at `o` and its
   * base horizontal. Like the real one it has two scales: the inner scale
   * counts from 0 on the right, the outer scale from 0 on the left. Small
   * marks every degree, longer ones every 5° and 10°. The outer numbers sit
   * just outside the rim so the two scales stay readable on a phone; leave
   * about `1.6 × font` of room above the rim.
   *
   * - `o`: centre of the protractor (the vertex of the angle).
   * - `r`: radius in SVG units.
   * - `side`: the scale to read, whose 0 lies on the side OA ('phai' when OA
   *   points right); it is drawn in red and bold. Null colours neither.
   * - `font`: font size of the numbers.
   * @type {{
   *   o: { x: number, y: number };
   *   r: number;
   *   side?: import('./angle.js').Side | null;
   *   font?: number;
   * }}
   */
  let { o, r, side = null, font = 11 } = $props();

  const ticks = $derived(
    Array.from({ length: 181 }, (_, d) => {
      const len = d % 10 === 0 ? 14 : d % 5 === 0 ? 9 : 4;
      return { d, p: along(o, r, d), q: along(o, r - len, d), long: d % 5 === 0 };
    }),
  );
  const labels = $derived(
    Array.from({ length: 19 }, (_, i) => {
      const d = i * 10;
      return { d, inner: along(o, r - 16 - 0.9 * font, d), outer: along(o, r + 0.9 * font, d) };
    }),
  );
  const ring = $derived(r - 20 - 2 * font);
  const hot = '#B91C1C';
  const cold = '#64748B';
</script>

<g aria-hidden="true">
  <path
    d="M {o.x - r} {o.y} A {r} {r} 0 0 1 {o.x + r} {o.y} Z"
    fill="#EFF6FF"
    fill-opacity="0.85"
    stroke="#3B82F6"
    stroke-width="1.5"
  />
  <path
    d="M {o.x - ring} {o.y} A {ring} {ring} 0 0 1 {o.x + ring} {o.y}"
    fill="none"
    stroke="#93C5FD"
    stroke-width="1"
  />
  {#each ticks as t (t.d)}
    <line
      x1={t.p.x}
      y1={t.p.y}
      x2={t.q.x}
      y2={t.q.y}
      stroke="#1E3A8A"
      stroke-width={t.long ? 1.1 : 0.5}
    />
  {/each}
  {#each labels as l (l.d)}
    <text
      x={l.outer.x}
      y={l.outer.y + font / 3}
      font-size={font}
      text-anchor="middle"
      fill={side === 'trai' ? hot : cold}
      font-weight={side === 'trai' ? 700 : 400}>{180 - l.d}</text
    >
    <text
      x={l.inner.x}
      y={l.inner.y + font / 3}
      font-size={font}
      text-anchor="middle"
      fill={side === 'phai' ? hot : cold}
      font-weight={side === 'phai' ? 700 : 400}>{l.d}</text
    >
  {/each}
  <circle cx={o.x} cy={o.y} r="2.5" fill="#1E3A8A" />
</g>
