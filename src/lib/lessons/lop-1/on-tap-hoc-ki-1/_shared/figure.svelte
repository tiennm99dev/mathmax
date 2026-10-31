<script>
  import { FIGURE_NAMES } from './shape-skills.js';

  /**
   * One plane shape or solid on its own square canvas: a square, circle,
   * triangle or rectangle, or a cube or box drawn with its front, top and
   * side faces.
   *
   * - `kind`: which figure.
   * - `size`: width and height in CSS pixels.
   * - `decorative`: hide it from screen readers when a nearby label names it.
   *
   * @type {{
   *   kind: import('./quiz.js').FigureKind;
   *   size?: number;
   *   decorative?: boolean;
   * }}
   */
  let { kind, size = 56, decorative = false } = $props();

  /** @type {Record<import('./quiz.js').FigureKind, string>} */
  const FILL = {
    vuong: '#60a5fa',
    tron: '#f59e0b',
    'tam-giac': '#34d399',
    'chu-nhat': '#f472b6',
    'lap-phuong': '#a78bfa',
    'hop-chu-nhat': '#fb923c',
  };

  /**
   * Faces of a solid: front rectangle at (x, y) of width w and height h,
   * pushed back by (dx, -dy) for the top and right faces.
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {number} dx
   * @param {number} dy
   */
  function box(x, y, w, h, dx, dy) {
    return {
      front: `${x},${y} ${x + w},${y} ${x + w},${y + h} ${x},${y + h}`,
      top: `${x},${y} ${x + dx},${y - dy} ${x + w + dx},${y - dy} ${x + w},${y}`,
      side: `${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y + h - dy} ${x + w},${y + h}`,
    };
  }

  const solid = $derived(
    kind === 'lap-phuong'
      ? box(14, 34, 56, 56, 20, 20)
      : kind === 'hop-chu-nhat'
        ? box(6, 46, 72, 44, 18, 16)
        : null,
  );
</script>

<svg
  width={size}
  height={size}
  viewBox="-4 -4 108 108"
  role={decorative ? undefined : 'img'}
  aria-label={decorative ? undefined : FIGURE_NAMES[kind]}
  aria-hidden={decorative ? 'true' : undefined}
  class="shrink-0"
>
  <g fill={FILL[kind]} stroke="#1e293b" stroke-width="3" stroke-linejoin="round">
    {#if kind === 'vuong'}
      <rect x="14" y="14" width="72" height="72" />
    {:else if kind === 'tron'}
      <circle cx="50" cy="50" r="38" />
    {:else if kind === 'tam-giac'}
      <polygon points="50,10 92,86 8,86" />
    {:else if kind === 'chu-nhat'}
      <rect x="4" y="28" width="92" height="44" />
    {:else if solid}
      <polygon points={solid.front} />
      <polygon points={solid.top} />
      <polygon points={solid.side} />
      <polygon points={solid.top} fill="white" fill-opacity="0.4" stroke="none" />
      <polygon points={solid.side} fill="black" fill-opacity="0.18" stroke="none" />
    {/if}
  </g>
</svg>
