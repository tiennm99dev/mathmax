<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { arcPath, directionTo, rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { fitScale, layout } from './tri.js';

  /**
   * Two triangles ABC and A′B′C′ drawn side by side at one common scale, so
   * their real sizes compare. Corresponding sides share a colour and carry
   * their lengths; the angles named in `marks` get an arc, and a right
   * angle at A gets its corner mark. A triangle that cannot be built (null)
   * leaves a note in its half instead.
   *
   * - `left`, `right`: the triangles (`Tri` from `tri.js`), or null.
   * - `marks`: vertices whose angle is part of the given data ('A', 'B', 'C').
   * - `label`: accessible name of the drawing.
   *
   * @type {{
   *   left: import('./tri.js').Tri | null;
   *   right: import('./tri.js').Tri | null;
   *   marks?: Array<'A' | 'B' | 'C'>;
   *   label: string;
   * }}
   */
  let { left, right, marks = [], label } = $props();

  const W = 400;
  const H = 240;
  const HALF = W / 2;
  const PAD_X = 30;
  const TOP = 30;
  const BASE = H - 34;
  const COLORS = { ab: '#D7263D', bc: '#1B998B', ca: '#F46036' };

  /** @typedef {{ x: number, y: number }} Pt */

  const scale = $derived(
    fitScale(
      /** @type {import('./tri.js').Tri[]} */ ([left, right].filter(Boolean)),
      HALF - 2 * PAD_X,
      BASE - TOP,
    ),
  );

  /**
   * Screen points of a triangle centred in the half starting at `x0`.
   * @param {import('./tri.js').Tri} t @param {number} x0
   */
  function place(t, x0) {
    const p = layout(t);
    const minX = Math.min(0, p.A.x);
    const width = (Math.max(p.C.x, p.A.x) - minX) * scale;
    const ox = x0 + (HALF - width) / 2 - minX * scale;
    /** @param {Pt} q @returns {Pt} */
    const to = (q) => ({ x: ox + q.x * scale, y: BASE - q.y * scale });
    return { A: to(p.A), B: to(p.B), C: to(p.C) };
  }

  /**
   * Label position for a side: its midpoint pushed away from the centroid.
   * @param {Pt} p @param {Pt} q @param {Pt} g
   */
  function sideLabel(p, q, g) {
    const m = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
    const d = Math.hypot(m.x - g.x, m.y - g.y) || 1;
    return { x: m.x + ((m.x - g.x) / d) * 14, y: m.y + ((m.y - g.y) / d) * 14 + 4 };
  }

  const shapes = $derived(
    [
      { t: left, x0: 0, prime: '' },
      { t: right, x0: HALF, prime: '′' },
    ].map(({ t, x0, prime }) => {
      if (!t) return { x0, prime, pts: null, t };
      const pts = place(t, x0);
      const g = {
        x: (pts.A.x + pts.B.x + pts.C.x) / 3,
        y: (pts.A.y + pts.B.y + pts.C.y) / 3,
      };
      const sides = /** @type {const} */ ([
        ['ab', pts.A, pts.B, t.ab],
        ['bc', pts.B, pts.C, t.bc],
        ['ca', pts.C, pts.A, t.ca],
      ]).map(([key, p, q, len]) => ({ key, p, q, len, at: sideLabel(p, q, g) }));
      const angles = /** @type {const} */ ([
        ['A', pts.A, pts.B, pts.C],
        ['B', pts.B, pts.C, pts.A],
        ['C', pts.C, pts.A, pts.B],
      ]).map(([name, v, p, q]) => {
        const a = directionTo(v, p);
        const b = directionTo(v, q);
        const right = name === 'A' && Math.abs(t.A - 90) < 1e-9;
        const d = Math.hypot(v.x - g.x, v.y - g.y) || 1;
        return {
          name,
          right,
          marked: marks.includes(name),
          arc: arcPath(v, a, b, 20),
          corner: rightMarkPath(v, a, b, 11),
          at: { x: v.x + ((v.x - g.x) / d) * 16, y: v.y + ((v.y - g.y) / d) * 16 + 5 },
        };
      });
      return { x0, prime, pts, t, sides, angles };
    }),
  );
</script>

<GeometryBoard width={W} height={H} maxWidth="max-w-xl" {label}>
  <line x1={HALF} y1="12" x2={HALF} y2={H - 12} stroke="#E2E8F0" stroke-dasharray="4 4" />
  {#each shapes as s (s.x0)}
    {#if s.pts && s.sides && s.angles}
      <polygon
        points="{s.pts.A.x},{s.pts.A.y} {s.pts.B.x},{s.pts.B.y} {s.pts.C.x},{s.pts.C.y}"
        fill="#EEF2FF"
      />
      {#each s.sides as side (side.key)}
        <line
          x1={side.p.x}
          y1={side.p.y}
          x2={side.q.x}
          y2={side.q.y}
          stroke={COLORS[side.key]}
          stroke-width="3"
          stroke-linecap="round"
        />
        <text
          x={side.at.x}
          y={side.at.y}
          text-anchor="middle"
          font-size="12"
          font-weight="600"
          fill={COLORS[side.key]}>{formatNumber(side.len, 1)}</text
        >
      {/each}
      {#each s.angles as ang (ang.name)}
        {#if ang.right}
          <path d={ang.corner} fill="none" stroke="#334155" stroke-width="1.5" />
        {:else if ang.marked}
          <path d={ang.arc} fill="none" stroke="#4F46E5" stroke-width="2.5" />
        {/if}
        <text
          x={ang.at.x}
          y={ang.at.y}
          text-anchor="middle"
          font-size="14"
          font-weight="700"
          fill="#1F2937">{ang.name}{s.prime}</text
        >
      {/each}
    {:else}
      <text x={s.x0 + HALF / 2} y={H / 2} text-anchor="middle" font-size="13" fill="#B45309"
        >Không dựng được tam giác</text
      >
    {/if}
  {/each}
</GeometryBoard>
