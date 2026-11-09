<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { labelSpot } from '#lib/geom-engine/plane.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { fitBoard, sideLabelSpot } from './figures.js';

  /**
   * A polygon with a length written beside its sides and its corners named,
   * fitted into a board: the drawings of perimeter and area questions.
   *
   * - `points`: the corners in units (1 unit is drawn up to 40 px).
   * - `labels`: the text beside side i (corner i to corner i + 1); '' for none.
   * - `names`: the corner letters, or none.
   * - `label`: what a screen reader hears for the whole drawing.
   * - `fill`: the colour inside.
   * - `children`: drawn on top, given the unit-to-board mapping (a moving ant).
   * @type {{
   *   points: Array<{ x: number, y: number }>;
   *   labels: string[];
   *   names?: string[];
   *   label: string;
   *   fill?: string;
   *   children?: import('svelte').Snippet<[(p: { x: number, y: number }) => { x: number, y: number }]>;
   * }}
   */
  let { points, labels, names = [], label, fill = '#fef3c7', children } = $props();

  const W = 340;
  const H = 230;

  const fit = $derived(fitBoard(points, W, H, 60));
  const corners = $derived(points.map(fit.toBoard));
  const centre = $derived({
    x: corners.reduce((s, p) => s + p.x, 0) / corners.length,
    y: corners.reduce((s, p) => s + p.y, 0) / corners.length,
  });
</script>

<GeometryBoard width={W} height={H} {label} maxWidth="max-w-md">
  <polygon
    points={pointsAttr(corners)}
    {fill}
    stroke="#1e293b"
    stroke-width="3"
    stroke-linejoin="round"
  />
  {#each corners as _, i (i)}
    {#if labels[i]}
      {@const spot = sideLabelSpot(corners, i, 12)}
      {@const end = corners[(i + 1) % corners.length]}
      {@const midX = (corners[i].x + end.x) / 2}
      <text
        x={spot.x}
        y={spot.y + 6}
        text-anchor={spot.x < midX - 1 ? 'end' : spot.x > midX + 1 ? 'start' : 'middle'}
        font-size="17"
        font-weight="700"
        fill="#1d4ed8">{labels[i]}</text
      >
    {/if}
  {/each}
  {#each names as name, i (i)}
    {@const spot = labelSpot(corners[i], centre, 18, W, H)}
    <text
      x={spot.x}
      y={spot.y + 6}
      text-anchor="middle"
      font-size="17"
      font-weight="700"
      fill="#0f172a">{name}</text
    >
  {/each}
  {@render children?.(fit.toBoard)}
</GeometryBoard>
