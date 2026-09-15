<script>
  import { draggable } from '$lib/actions/draggable.svelte.js';

  /**
   * @typedef {{x: number, y: number}} MutablePoint
   * @typedef {import('$lib/geom-engine/vec.js').Vec2} Vec2
   */

  /** @type {{
   *   svgEl: SVGSVGElement | undefined,
   *   view: number,
   *   pad: number,
   *   mx: (x: number) => number,
   *   my: (y: number) => number,
   *   gridLines: number[],
   *   seg1: [Vec2, Vec2] | null,
   *   seg2: [Vec2, Vec2] | null,
   *   handle1: MutablePoint,
   *   handle2: MutablePoint,
   *   drag1Opts: import('$lib/actions/draggable.svelte.js').DraggableParams,
   *   drag2Opts: import('$lib/actions/draggable.svelte.js').DraggableParams,
   *   solutionPoint: Vec2 | null,
   *   solutionMarkerLabel: string,
   *   coincident: boolean,
   *   plotLabel: string,
   *   handle1Label: string,
   *   handle2Label: string,
   * }} */
  let {
    svgEl = $bindable(),
    view,
    pad,
    mx,
    my,
    gridLines,
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
</script>

<svg
  bind:this={svgEl}
  viewBox="0 0 {view} {view}"
  preserveAspectRatio="xMidYMid meet"
  class="block w-full max-w-md mx-auto bg-white rounded-lg border border-slate-200"
  style="touch-action:none; aspect-ratio:1/1"
  role="img"
  aria-label={plotLabel}
>
  <!-- Grid lines -->
  {#each gridLines as v}
    <line x1={mx(v)} y1={pad} x2={mx(v)} y2={view - pad} stroke="#e2e8f0" stroke-width="0.5" />
    <line x1={pad} y1={my(v)} x2={view - pad} y2={my(v)} stroke="#e2e8f0" stroke-width="0.5" />
  {/each}

  <!-- Axes -->
  <line x1={mx(0)} y1={pad} x2={mx(0)} y2={view - pad} stroke="#334155" stroke-width="1.5" />
  <line x1={pad} y1={my(0)} x2={view - pad} y2={my(0)} stroke="#334155" stroke-width="1.5" />

  <!-- Integer axis labels every 2 units -->
  {#each gridLines as v}
    {#if v !== 0 && v % 2 === 0}
      <text x={mx(v)} y={my(0) + 14} text-anchor="middle" font-size="9" fill="#64748b">{v}</text>
      <text x={mx(0) - 5} y={my(v) + 3} text-anchor="end" font-size="9" fill="#64748b">{v}</text>
    {/if}
  {/each}
  <text x={mx(0) - 5} y={my(0) + 14} text-anchor="end" font-size="9" fill="#64748b">0</text>

  <!-- Line (1): solid. When the lines coincide it is drawn thicker so the
       overlap stays visible under the dashed line (2). -->
  {#if seg1}
    <line
      x1={mx(seg1[0].x)} y1={my(seg1[0].y)}
      x2={mx(seg1[1].x)} y2={my(seg1[1].y)}
      stroke={LINE_1} stroke-width={coincident ? 6 : 2.5} stroke-linecap="round"
    />
  {/if}

  <!-- Line (2): dashed, so the two lines differ by more than color alone. -->
  {#if seg2}
    <line
      x1={mx(seg2[0].x)} y1={my(seg2[0].y)}
      x2={mx(seg2[1].x)} y2={my(seg2[1].y)}
      stroke={LINE_2} stroke-width="2.5" stroke-linecap="round" stroke-dasharray="8 5"
    />
  {/if}

  <!-- Intersection point: the solution of the system -->
  {#if solutionPoint}
    <circle cx={mx(solutionPoint.x)} cy={my(solutionPoint.y)} r="6" fill={SOLUTION} stroke="#fff" stroke-width="2" />
    <text
      x={mx(solutionPoint.x) + 10}
      y={my(solutionPoint.y) - 8}
      font-size="11" font-weight="600" fill={SOLUTION}
    >{solutionMarkerLabel}</text>
  {/if}

  <!-- Drag handle for line (1): square marker -->
  {#if seg1}
    <rect
      x={handle1.x - 9} y={handle1.y - 9} width="18" height="18" rx="3"
      fill={LINE_1} stroke="#fff" stroke-width="2"
      role="button"
      tabindex="0"
      aria-label={handle1Label}
      style="cursor:grab; outline:none"
      use:draggable={drag1Opts}
    />
    <text x={handle1.x} y={handle1.y + 4} text-anchor="middle" font-size="11" font-weight="700" fill="#fff" style="pointer-events:none">1</text>
  {/if}

  <!-- Drag handle for line (2): square marker -->
  {#if seg2}
    <rect
      x={handle2.x - 9} y={handle2.y - 9} width="18" height="18" rx="3"
      fill={LINE_2} stroke="#fff" stroke-width="2"
      role="button"
      tabindex="0"
      aria-label={handle2Label}
      style="cursor:grab; outline:none"
      use:draggable={drag2Opts}
    />
    <text x={handle2.x} y={handle2.y + 4} text-anchor="middle" font-size="11" font-weight="700" fill="#fff" style="pointer-events:none">2</text>
  {/if}
</svg>
