<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { along, arcPath, bisectorDir, degText, intersect, sectorPath } from './angle.js';
  import { NUMBERS, angleAt, raysOf } from './transversal.js';

  /**
   * Two lines a (through A, direction `alpha`) and b (through B, direction
   * `beta`) cut by a transversal c (through A and B, upward direction
   * `gamma`), with the four angles at each vertex numbered 1 to 4 (see
   * `transversal.js`). Highlighted angles get a coloured sector and their
   * measure; when a and b meet inside the board, the meeting point M is
   * marked. Drag handles go in `children`.
   *
   * @type {{
   *   A: { x: number, y: number };
   *   B: { x: number, y: number };
   *   alpha?: number;
   *   beta: number;
   *   gamma: number;
   *   highlight?: Array<{ at: 'A' | 'B', i: 1 | 2 | 3 | 4, color: string }>;
   *   label: string;
   *   svgEl?: SVGSVGElement;
   *   children?: import('svelte').Snippet;
   * }}
   */
  let {
    A,
    B,
    alpha = 0,
    beta,
    gamma,
    highlight = [],
    label,
    svgEl = $bindable(),
    children,
  } = $props();

  /** @type {Array<'A' | 'B'>} */
  const VERTICES = ['A', 'B'];
  const W = 400;
  const H = 300;
  const FAR = 520;

  /** @param {'A' | 'B'} at */
  const vertex = (at) => (at === 'A' ? A : B);
  /** @param {'A' | 'B'} at */
  const dirAt = (at) => (at === 'A' ? alpha : beta);

  const meet = $derived(alpha === beta ? null : intersect(A, alpha, B, beta));
  const meetInside = $derived(
    meet !== null && meet.x > 8 && meet.x < W - 8 && meet.y > 8 && meet.y < H - 8,
  );

  const lineA = $derived([along(A, FAR, alpha + 180), along(A, FAR, alpha)]);
  const lineB = $derived([along(B, FAR, beta + 180), along(B, FAR, beta)]);
  const lineC = $derived([along(A, FAR, gamma), along(B, FAR, gamma + 180)]);

  /** Where to write a line's name: near the right-hand edge of the board. */
  const nameA = $derived(
    along(A, Math.min(150, (W - 24 - A.x) / Math.cos((alpha * Math.PI) / 180)), alpha),
  );
  const nameB = $derived(
    along(B, Math.min(150, (W - 24 - B.x) / Math.cos((beta * Math.PI) / 180)), beta),
  );
  const nameC = $derived(along(A, 80, gamma));
</script>

<GeometryBoard bind:svgEl width={W} height={H} interactive maxWidth="max-w-xl" {label}>
  {#each highlight as h (h.at + h.i)}
    {@const P = vertex(h.at)}
    {@const [p, q] = raysOf(h.i, dirAt(h.at), gamma)}
    {@const m = angleAt(h.i, dirAt(h.at), gamma)}
    {@const t = along(P, 50, bisectorDir(p, q))}
    <path d={sectorPath(P, p, q, 34)} fill={h.color} fill-opacity="0.22" />
    <path d={arcPath(P, p, q, 34)} fill="none" stroke={h.color} stroke-width="2" />
    <text
      x={t.x}
      y={t.y + 5}
      font-size="13"
      font-weight="700"
      text-anchor="middle"
      fill={h.color}
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke">{degText(m)}</text
    >
  {/each}

  <line
    x1={lineA[0].x}
    y1={lineA[0].y}
    x2={lineA[1].x}
    y2={lineA[1].y}
    stroke="#1F2937"
    stroke-width="2.5"
  />
  <line
    x1={lineB[0].x}
    y1={lineB[0].y}
    x2={lineB[1].x}
    y2={lineB[1].y}
    stroke="#0F766E"
    stroke-width="2.5"
  />
  <line
    x1={lineC[0].x}
    y1={lineC[0].y}
    x2={lineC[1].x}
    y2={lineC[1].y}
    stroke="#7C3AED"
    stroke-width="2"
  />

  {#each VERTICES as v (v)}
    {@const P = vertex(v)}
    {#each NUMBERS as i (i)}
      {@const [p, q] = raysOf(i, dirAt(v), gamma)}
      {@const n = along(P, 20, bisectorDir(p, q))}
      <text x={n.x} y={n.y + 4} font-size="11" text-anchor="middle" fill="#475569">{i}</text>
    {/each}
    <circle cx={P.x} cy={P.y} r="3.5" fill="#1F2937" />
  {/each}

  {#each VERTICES as v (v)}
    <!-- The letter sits just off the line, outside the numbered corner marks. -->
    {@const L = along(vertex(v), 34, dirAt(v) + (v === 'A' ? 180 : 0))}
    <text
      x={L.x}
      y={L.y + (v === 'A' ? -7 : 17)}
      font-size="14"
      font-weight="700"
      text-anchor="middle"
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke">{v}</text
    >
  {/each}
  <text x={nameA.x} y={nameA.y - 8} font-size="15" font-style="italic" font-weight="700">a</text>
  <text
    x={nameB.x}
    y={nameB.y - 8}
    font-size="15"
    font-style="italic"
    font-weight="700"
    fill="#0F766E">b</text
  >
  <text
    x={nameC.x + 12}
    y={nameC.y}
    font-size="15"
    font-style="italic"
    font-weight="700"
    fill="#7C3AED">c</text
  >

  {#if meetInside && meet}
    <circle cx={meet.x} cy={meet.y} r="5" fill="#DC2626" />
    <text x={meet.x + 6} y={meet.y - 8} font-size="14" font-weight="700" fill="#DC2626">M</text>
  {/if}

  {@render children?.()}
</GeometryBoard>
