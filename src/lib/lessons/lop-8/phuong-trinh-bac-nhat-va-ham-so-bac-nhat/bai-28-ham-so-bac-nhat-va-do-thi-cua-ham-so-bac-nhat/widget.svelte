<script>
  import Tex from '#lib/components/tex.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import { yAt, lineFromPoints, linePoints } from '#lib/algebra-engine/linear.js';
  import CartesianPlane from './cartesian-plane.svelte';

  // SVG layout: 20 math units span -10..10.
  const VIEW = 420;
  const PAD = 30;
  const U = (VIEW - PAD * 2) / 20;

  /** Math x → SVG x */
  const mx = (/** @type {number} */ x) => PAD + (x + 10) * U;
  /** Math y → SVG y (the SVG y-axis points down) */
  const my = (/** @type {number} */ y) => PAD + (10 - y) * U;
  /** SVG y → math y */
  const svgYtoMath = (/** @type {number} */ sy) => 10 - (sy - PAD) / U;

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
    viewBox: { w: VIEW, h: VIEW },
    projector: project(x),
    pad: 0,
    keyStep: U,
    onChange: handleDragChange,
  });
  const drag1Opts = $derived(dragOpts(p1, ANCHOR1_X));
  const drag2Opts = $derived(dragOpts(p2, ANCHOR2_X));

  /** One decimal, with the Vietnamese decimal comma. */
  const fmt = (/** @type {number} */ v) => v.toFixed(1).replace('.', ',');

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

  const gridLines = Array.from({ length: 21 }, (_, i) => i - 10);
</script>

<div class="space-y-4">
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <SliderField label="Hệ số a" bind:value={a} min={-5} max={5} step={0.1} format={fmt} />
    <SliderField label="Hệ số b" bind:value={b} min={-10} max={10} step={0.1} format={fmt} />
  </div>

  <p class="text-sm text-slate-600">Hoặc kéo trực tiếp hai điểm đỏ trên đường thẳng.</p>
  <CartesianPlane
    bind:svgEl
    view={VIEW}
    pad={PAD}
    {mx}
    {my}
    {gridLines}
    {pts}
    {p1}
    {p2}
    {anchor1MathY}
    {anchor2MathY}
    {drag1Opts}
    {drag2Opts}
    {showTriangle}
    anchor1X={ANCHOR1_X}
    anchor2X={ANCHOR2_X}
    {deltaY}
    texMath={plainMath}
    anchor1Label="Điểm neo 1 tại x = −5"
    anchor2Label="Điểm neo 2 tại x = 5"
  />

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
