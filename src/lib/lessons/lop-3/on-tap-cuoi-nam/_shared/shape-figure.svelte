<script>
  import { pointsAttr } from '#lib/utils/svg.js';
  import { shapeLabel } from './measure.js';

  /**
   * A plane shape with its measures written beside its sides: a triangle or a
   * quadrilateral with every side, a rectangle with its length and width, a
   * square with one side, or a circle with its centre O and a radius
   * (`labels[1]` is `'r'`) or a diameter (`'d'`).
   * @type {{ kind: import('./visual.js').ShapeKind, labels: string[] }}
   */
  let { kind, labels } = $props();

  const INK = '#1e293b';
  /** @type {Record<Exclude<import('./visual.js').ShapeKind, 'circle'>, Array<{ x: number, y: number }>>} */
  const CORNERS = {
    triangle: [
      { x: 130, y: 25 },
      { x: 230, y: 160 },
      { x: 30, y: 160 },
    ],
    quad: [
      { x: 55, y: 40 },
      { x: 200, y: 25 },
      { x: 235, y: 160 },
      { x: 30, y: 150 },
    ],
    rect: [
      { x: 40, y: 45 },
      { x: 220, y: 45 },
      { x: 220, y: 150 },
      { x: 40, y: 150 },
    ],
    square: [
      { x: 80, y: 40 },
      { x: 185, y: 40 },
      { x: 185, y: 145 },
      { x: 80, y: 145 },
    ],
  };

  const corners = $derived(kind === 'circle' ? [] : CORNERS[kind]);
  const centre = $derived({
    x: corners.reduce((s, p) => s + p.x, 0) / Math.max(1, corners.length),
    y: corners.reduce((s, p) => s + p.y, 0) / Math.max(1, corners.length),
  });
  const marks = $derived(
    labels.slice(0, kind === 'circle' ? 0 : labels.length).map((text, i) => {
      const p = corners[i];
      const q = corners[(i + 1) % corners.length];
      const mid = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
      const dx = mid.x - centre.x;
      const dy = mid.y - centre.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = dx / len;
      const ny = dy / len;
      const anchor = nx < -0.5 ? 'end' : nx > 0.5 ? 'start' : 'middle';
      return { text, anchor, x: mid.x + nx * 10, y: mid.y + ny * 18 + 6 };
    }),
  );
</script>

<svg
  viewBox="-30 -4 320 200"
  class="mx-auto block w-full max-w-xs rounded-2xl border border-slate-200 bg-white"
  role="img"
  aria-label={shapeLabel(kind, labels)}
>
  {#if kind === 'circle'}
    <circle cx="130" cy="95" r="72" fill="#e0f2fe" stroke={INK} stroke-width="3" />
    <line
      x1={labels[1] === 'd' ? 58 : 130}
      y1="95"
      x2="202"
      y2="95"
      stroke="#4f46e5"
      stroke-width="4"
      stroke-linecap="round"
    />
    <circle cx="130" cy="95" r="4" fill={INK} />
    <text x="124" y="118" font-size="18" font-weight="700" fill={INK}>O</text>
    <text
      x={labels[1] === 'd' ? 130 : 166}
      y="84"
      text-anchor="middle"
      font-size="18"
      font-weight="700"
      fill="#4338ca">{labels[0]}</text
    >
  {:else}
    <polygon
      points={pointsAttr(corners)}
      fill="#e0f2fe"
      stroke={INK}
      stroke-width="3"
      stroke-linejoin="round"
    />
    {#each marks as mark, i (i)}
      <text
        x={mark.x}
        y={mark.y}
        text-anchor={mark.anchor}
        font-size="17"
        font-weight="700"
        fill="#4338ca">{mark.text}</text
      >
    {/each}
  {/if}
</svg>
