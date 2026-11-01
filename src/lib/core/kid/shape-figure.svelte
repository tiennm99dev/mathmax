<script>
  import { pointsAttr } from '#lib/utils/svg.js';
  import { circleRadius, figureCorners, figureLabel, solidFaces } from './shapes.js';

  /**
   * One plane shape or solid drawn on its own square canvas: a square,
   * circle, triangle or rectangle, or a cube or box drawn with its front, top
   * and side faces. `plainFigure(kind)` in `shapes.js` gives a picture-card
   * look; a full `Figure` sets the colour, size, turn and proportions.
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
  const faces = $derived(solidFaces(figure));
</script>

<svg
  width={size}
  height={size}
  viewBox="-6 -6 112 112"
  role={decorative ? undefined : 'img'}
  aria-label={decorative ? undefined : figureLabel(figure)}
  aria-hidden={decorative ? 'true' : undefined}
  class="shrink-0"
>
  <g
    transform="rotate({figure.turn} 50 50)"
    fill={figure.color}
    stroke="#1e293b"
    stroke-width="3"
    stroke-linejoin="round"
  >
    {#if faces}
      <polygon points={faces.front} />
      <polygon points={faces.top} />
      <polygon points={faces.side} />
      <polygon points={faces.top} fill="white" fill-opacity="0.4" stroke="none" />
      <polygon points={faces.side} fill="black" fill-opacity="0.18" stroke="none" />
    {:else if corners}
      <polygon points={pointsAttr(corners)} />
    {:else}
      <circle cx="50" cy="50" r={circleRadius(figure)} />
    {/if}
  </g>
</svg>
