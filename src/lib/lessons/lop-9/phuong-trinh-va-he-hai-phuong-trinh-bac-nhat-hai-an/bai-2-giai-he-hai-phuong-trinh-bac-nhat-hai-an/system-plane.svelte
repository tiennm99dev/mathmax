<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';

  /**
   * @typedef {{x: number, y: number}} MutablePoint
   * @typedef {import('#lib/geom-engine/vec.js').Vec2} Vec2
   */

  /** @type {{
   *   svgEl: SVGSVGElement | undefined,
   *   plane: import('#lib/core/visuals/svg-math.js').PlaneScale,
   *   seg1: [Vec2, Vec2] | null,
   *   seg2: [Vec2, Vec2] | null,
   *   handle1: MutablePoint,
   *   handle2: MutablePoint,
   *   drag1Opts: import('#lib/actions/draggable.svelte.js').DraggableParams,
   *   drag2Opts: import('#lib/actions/draggable.svelte.js').DraggableParams,
   *   solutionPoint: Vec2 | null,
   *   solutionMarkerLabel: string,
   *   coincident: boolean,
   *   plotLabel: string,
   *   handle1Label: string,
   *   handle2Label: string,
   * }} */
  let {
    svgEl = $bindable(),
    plane,
    seg1,
    seg2,
    handle1,
    handle2,
    drag1Opts,
    drag2Opts,
    solutionPoint,
    solutionMarkerLabel,
    coincident,
    plotLabel,
    handle1Label,
    handle2Label,
  } = $props();

  const LINE_1 = '#1B998B';
  const LINE_2 = '#5E60CE';
  const SOLUTION = '#D7263D';
  const { mx, my } = $derived(plane);
</script>

<CoordinatePlane bind:svgEl {plane} label={plotLabel}>
  <!-- Line (1): solid. When the lines coincide it is drawn thicker so the
       overlap stays visible under the dashed line (2). -->
  {#if seg1}
    <line
      x1={mx(seg1[0].x)}
      y1={my(seg1[0].y)}
      x2={mx(seg1[1].x)}
      y2={my(seg1[1].y)}
      stroke={LINE_1}
      stroke-width={coincident ? 6 : 2.5}
      stroke-linecap="round"
    />
  {/if}

  <!-- Line (2): dashed, so the two lines differ by more than color alone. -->
  {#if seg2}
    <line
      x1={mx(seg2[0].x)}
      y1={my(seg2[0].y)}
      x2={mx(seg2[1].x)}
      y2={my(seg2[1].y)}
      stroke={LINE_2}
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-dasharray="8 5"
    />
  {/if}

  <!-- Intersection point: the solution of the system -->
  {#if solutionPoint}
    <circle
      cx={mx(solutionPoint.x)}
      cy={my(solutionPoint.y)}
      r="6"
      fill={SOLUTION}
      stroke="#fff"
      stroke-width="2"
    />
    <text
      x={mx(solutionPoint.x) + 10}
      y={my(solutionPoint.y) - 8}
      font-size="11"
      font-weight="600"
      fill={SOLUTION}>{solutionMarkerLabel}</text
    >
  {/if}

  <!-- Drag handle for line (1): square marker -->
  {#if seg1}
    <rect
      x={handle1.x - 9}
      y={handle1.y - 9}
      width="18"
      height="18"
      rx="3"
      fill={LINE_1}
      stroke="#fff"
      stroke-width="2"
      role="button"
      tabindex="0"
      aria-label={handle1Label}
      style="cursor:grab; outline:none"
      use:draggable={drag1Opts}
    />
    <text
      x={handle1.x}
      y={handle1.y + 4}
      text-anchor="middle"
      font-size="11"
      font-weight="700"
      fill="#fff"
      style="pointer-events:none">1</text
    >
  {/if}

  <!-- Drag handle for line (2): square marker -->
  {#if seg2}
    <rect
      x={handle2.x - 9}
      y={handle2.y - 9}
      width="18"
      height="18"
      rx="3"
      fill={LINE_2}
      stroke="#fff"
      stroke-width="2"
      role="button"
      tabindex="0"
      aria-label={handle2Label}
      style="cursor:grab; outline:none"
      use:draggable={drag2Opts}
    />
    <text
      x={handle2.x}
      y={handle2.y + 4}
      text-anchor="middle"
      font-size="11"
      font-weight="700"
      fill="#fff"
      style="pointer-events:none">2</text
    >
  {/if}
</CoordinatePlane>
