<script>
  import { pointsAttr } from '#lib/utils/svg.js';
  import { circleRadius, figureCorners, figureLabel } from './shapes.js';

  /**
   * One plane shape drawn on its own square canvas.
   *
   * - `figure`: what to draw (kind, colour, size, turn, variant).
   * - `size`: width and height in CSS pixels.
   * - `decorative`: hide it from screen readers when a nearby label names it.
   *
   * @type {{
   *   figure: import('./shapes.js').Figure;
   *   size?: number;
   *   decorative?: boolean;
   * }}
   */
  let { figure, size = 64, decorative = false } = $props();

  const corners = $derived(figureCorners(figure));
</script>

<svg
  width={size}
  height={size}
  viewBox="-6 -6 112 112"
  role={decorative ? undefined : 'img'}
  aria-label={decorative ? undefined : figureLabel(figure)}
  aria-hidden={decorative ? 'true' : undefined}
>
  <g transform="rotate({figure.turn} 50 50)">
    {#if corners}
      <polygon
        points={pointsAttr(corners)}
        fill={figure.color}
        stroke="#1e293b"
        stroke-width="3"
        stroke-linejoin="round"
      />
    {:else}
      <circle
        cx="50"
        cy="50"
        r={circleRadius(figure)}
        fill={figure.color}
        stroke="#1e293b"
        stroke-width="3"
      />
    {/if}
  </g>
</svg>
