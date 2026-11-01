<script>
  import { pointsAttr } from '#lib/utils/svg.js';
  import { figureText, lineThrough } from './figures.js';

  /**
   * Draws a `Figure` from `figures.js`: shapes, strokes, lines to the edges,
   * segments, curves, length labels, and dots with their names.
   *
   * - `figure`: what to draw.
   * - `label`: what a screen reader hears, by default the figure in words;
   *   ignored when `decorative`.
   * - `decorative`: hide it from screen readers when a nearby label names it.
   * - `maxWidth`: Tailwind max-width class.
   * @type {{
   *   figure: import('./figures.js').Figure;
   *   label?: string;
   *   decorative?: boolean;
   *   maxWidth?: string;
   * }}
   */
  let { figure, label = '', decorative = false, maxWidth = 'max-w-sm' } = $props();

  /** @param {string} name */
  const at = (name) => figure.dots?.find((d) => d.name === name) ?? { x: 0, y: 0 };
</script>

<svg
  viewBox="0 0 {figure.w} {figure.h}"
  class="mx-auto block w-full select-none {maxWidth}"
  role={decorative ? undefined : 'img'}
  aria-label={decorative ? undefined : label || figureText(figure)}
  aria-hidden={decorative ? 'true' : undefined}
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
  {#each figure.lines ?? [] as [a, b], i (i)}
    {@const ends = lineThrough(at(a), at(b), figure.w, figure.h)}
    <line
      x1={ends[0].x}
      y1={ends[0].y}
      x2={ends[1].x}
      y2={ends[1].y}
      stroke="#0f766e"
      stroke-width="3"
    />
  {/each}
  {#each figure.curves ?? [] as curve, i (i)}
    <path d={curve.d} fill="none" stroke="#be123c" stroke-width="3" stroke-linecap="round" />
    {#if curve.name}
      <text
        x={curve.x}
        y={curve.y}
        font-size="17"
        font-style="italic"
        font-weight="700"
        fill="#be123c">{curve.name}</text
      >
    {/if}
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
    <text x={d.x} y={d.y - 11} text-anchor="middle" font-size="17" font-weight="700" fill="#1e293b"
      >{d.name}</text
    >
  {/each}
</svg>
