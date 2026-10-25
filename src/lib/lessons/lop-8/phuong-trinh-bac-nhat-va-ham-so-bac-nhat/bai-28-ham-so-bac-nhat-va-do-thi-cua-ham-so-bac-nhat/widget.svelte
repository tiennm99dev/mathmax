<script>
  import { formatFixed } from '#lib/core/number-format.js';
  import Tex from '#lib/components/tex.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import { yAt, lineFromPoints, linePoints } from '#lib/algebra-engine/linear.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';

  // 20 math units span -10..10 on both axes.
  const plane = planeScale();
  const { mx, my, toY: svgYtoMath, unit: U } = plane;

  const CLAMP_Y = 10;
  const EPSILON = 0.01;
  const ANCHOR1_X = -5;
  const ANCHOR2_X = 5;

  const INIT_A = 1;
  const INIT_B = 0;

  let a = $state(INIT_A);
  let b = $state(INIT_B);

  /** Clamp a pixel y to the plotted range, so anchors never leave the box. */
  const clampPx = (/** @type {number} */ py) => Math.max(my(CLAMP_Y), Math.min(my(-CLAMP_Y), py));

  // Anchor pixels, written by the sliders (below) or by the draggable action.
  let p1 = $state({ x: mx(ANCHOR1_X), y: clampPx(my(INIT_A * ANCHOR1_X + INIT_B)) });
  let p2 = $state({ x: mx(ANCHOR2_X), y: clampPx(my(INIT_A * ANCHOR2_X + INIT_B)) });

  // (a, b) → anchor positions.
  $effect(() => {
    p1.y = clampPx(my(yAt({ a, b }, ANCHOR1_X)));
    p2.y = clampPx(my(yAt({ a, b }, ANCHOR2_X)));
  });

  // Anchor drag → (a, b). Called from the action's onChange hook rather than an
  // effect, so slider writes never bounce back. Rounded to the slider step.
  function handleDragChange() {
    const next = lineFromPoints(
      { x: ANCHOR1_X, y: svgYtoMath(p1.y) },
      { x: ANCHOR2_X, y: svgYtoMath(p2.y) },
    );
    if (!next) return;
    const newA = Math.round(next.a * 10) / 10;
    const newB = Math.round(next.b * 10) / 10;
    if (Math.abs(newA - a) < EPSILON && Math.abs(newB - b) < EPSILON) return;
    a = Math.max(-5, Math.min(5, newA));
    b = Math.max(-10, Math.min(10, newB));
  }

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  /** Lock each anchor to its column and keep it inside the plot. */
  const project = (/** @type {number} */ x) => (/** @type {{x:number,y:number}} */ p) => ({
    x: mx(x),
    y: clampPx(p.y),
  });

  /** @param {{x: number, y: number}} point @param {number} x */
  const dragOpts = (point, x) => ({
    point,
    svg: () => svgEl ?? null,
    viewBox: { w: plane.width, h: plane.height },
    projector: project(x),
    pad: 0,
    keyStep: U,
    onChange: handleDragChange,
  });
  const drag1Opts = $derived(dragOpts(p1, ANCHOR1_X));
  const drag2Opts = $derived(dragOpts(p2, ANCHOR2_X));

  /** One decimal, with the Vietnamese decimal comma. */
  const fmt = (/** @type {number} */ v) => formatFixed(v, 1);

  const line = $derived({ a, b });
  const pts = $derived(linePoints(line, -10, 10));
  const sign = $derived(b < 0 ? '-' : '+');
  const plainMath = $derived(`y = ${fmt(a)}x ${sign} ${fmt(Math.abs(b))}`);
  const texMath = $derived(plainMath.replace(/,/g, '{,}'));
  const anchor1MathY = $derived(yAt(line, ANCHOR1_X));
  const anchor2MathY = $derived(yAt(line, ANCHOR2_X));
  const deltaY = $derived(anchor2MathY - anchor1MathY);

  let showTriangle = $state(false);

  // Announce the equation 300 ms after input settles, so dragging does not
  // flood screen readers.
  let ariaAnnounce = $state('');
  $effect(() => {
    const msg = plainMath;
    const timer = setTimeout(() => (ariaAnnounce = msg), 300);
    return () => clearTimeout(timer);
  });

  function reset() {
    a = INIT_A;
    b = INIT_B;
  }
</script>

<div class="space-y-4">
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <SliderField label="Hệ số a" bind:value={a} min={-5} max={5} step={0.1} format={fmt} />
    <SliderField label="Hệ số b" bind:value={b} min={-10} max={10} step={0.1} format={fmt} />
  </div>

  <p class="text-sm text-slate-600">Hoặc kéo trực tiếp hai điểm đỏ trên đường thẳng.</p>
  <CoordinatePlane bind:svgEl {plane} label="Đồ thị hàm số {plainMath}">
    {#if showTriangle}
      {@const tx1 = mx(ANCHOR1_X)}
      {@const ty1 = my(anchor1MathY)}
      {@const tx2 = mx(ANCHOR2_X)}
      {@const ty2 = my(anchor2MathY)}
      <!-- Rise/run triangle: the right angle sits below anchor 2, level with anchor 1. -->
      <polygon
        points="{tx1},{ty1} {tx2},{ty1} {tx2},{ty2}"
        fill="#D7263D"
        fill-opacity="0.12"
        stroke="#D7263D"
        stroke-width="1.5"
        stroke-dasharray="5 3"
      />
      <text
        x={(tx1 + tx2) / 2}
        y={ty1 + 14}
        text-anchor="middle"
        font-size="11"
        fill="#D7263D"
        font-weight="600">Δx = 10</text
      >
      <text
        x={tx2 + 6}
        y={(ty1 + ty2) / 2}
        text-anchor="start"
        dominant-baseline="middle"
        font-size="11"
        fill="#D7263D"
        font-weight="600">Δy = {formatFixed(deltaY, 1)}</text
      >
    {/if}

    <line
      x1={mx(pts[0].x)}
      y1={my(pts[0].y)}
      x2={mx(pts[1].x)}
      y2={my(pts[1].y)}
      stroke="#1B998B"
      stroke-width="2.5"
      stroke-linecap="round"
    />

    <DragPoint
      drag={drag1Opts}
      color="#D7263D"
      label="Điểm neo 1 tại x = −5, y = {formatFixed(anchor1MathY, 1)} — kéo hoặc dùng phím mũi tên"
    />
    <DragPoint
      drag={drag2Opts}
      color="#D7263D"
      label="Điểm neo 2 tại x = 5, y = {formatFixed(anchor2MathY, 1)} — kéo hoặc dùng phím mũi tên"
    />
  </CoordinatePlane>

  <div class="overflow-x-auto text-center">
    <Tex display math={texMath} ariaLabel="Hàm số {plainMath}" />
  </div>

  <div aria-live="polite" aria-atomic="true" class="sr-only">{ariaAnnounce}</div>

  <div class="flex flex-wrap items-center gap-4">
    <label
      class="flex min-h-11 cursor-pointer select-none items-center gap-2 text-sm text-slate-700"
    >
      <input type="checkbox" bind:checked={showTriangle} class="h-5 w-5 accent-indigo-600" />
      Hiện tam giác đo độ dốc
    </label>
    <button type="button" onclick={reset} class="ml-auto {button.quiet}">Đặt lại</button>
  </div>
</div>
