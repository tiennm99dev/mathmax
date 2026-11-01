<script>
  import { pointsAttr } from '#lib/utils/svg.js';

  /**
   * Draws a `Figure` from `figures.js`: closed shapes, dividing strokes,
   * segments, labels, and dots with their names. Screen readers hear its `say`.
   * @type {{ figure: import('./figures.js').Figure }}
   */
  let { figure } = $props();

  /** @param {string} name */
  const at = (name) => figure.dots?.find((d) => d.name === name) ?? { x: 0, y: 0 };
</script>

<svg
  viewBox="0 0 {figure.w} {figure.h}"
  class="mx-auto block w-full max-w-sm select-none"
  role="img"
  aria-label={figure.say}
>
  {#each figure.shapes ?? [] as corners, i (i)}
    <polygon
      points={pointsAttr(corners)}
      fill="#dbeafe"
      stroke="#1e3a8a"
      stroke-width="3"
      stroke-linejoin="round"
    />
  {/each}
  {#each figure.strokes ?? [] as pts, i (i)}
    <polyline
      points={pointsAttr(pts)}
      fill="none"
      stroke="#1e3a8a"
      stroke-width="3"
      stroke-linejoin="round"
    />
  {/each}
  {#each figure.segments ?? [] as [a, b], i (i)}
    <line
      x1={at(a).x}
      y1={at(a).y}
      x2={at(b).x}
      y2={at(b).y}
      stroke="#3730a3"
      stroke-width="3"
      stroke-linecap="round"
    />
  {/each}
  {#each figure.texts ?? [] as t, i (i)}
    <text x={t.x} y={t.y} text-anchor="middle" font-size="15" font-weight="600" fill="#334155"
      >{t.text}</text
    >
  {/each}
  {#each figure.dots ?? [] as d (d.name)}
    <circle cx={d.x} cy={d.y} r="5" fill="#1e293b" />
    <text
      x={d.x}
      y={d.below ? d.y + 22 : d.y - 11}
      text-anchor="middle"
      font-size="17"
      font-weight="700"
      fill="#1e293b">{d.name}</text
    >
  {/each}
</svg>
