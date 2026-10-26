<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatFixed } from '#lib/core/number-format.js';
  import { directionTo, rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import { UNIT } from '../_shared/quad.js';
  import { B, C, HALF, M, angleA, apexFromPointer, apexPoint, stepApex } from './engine.js';

  const W = 400;
  const H = 255;
  const START = { tenths: 64, dir: 70 };

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let apex = $state({ ...START });
  let announcement = $state('');
  /** @type {ReturnType<typeof setTimeout> | null} */ let timer = null;

  const A = $derived(apexPoint(apex));
  const angle = $derived(Math.round(angleA(apex)));
  const onCircle = $derived(apex.tenths === HALF * 10);
  const ma = $derived(formatFixed(apex.tenths / 10, 1));
  const half = formatFixed(HALF, 1);

  const feedback = $derived.by(() => {
    if (onCircle) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `MA = MB = MC = ${half}: trung tuyến AM bằng nửa cạnh BC, và đúng lúc đó góc BAC = 90°. Tam giác ABC vuông tại A.`,
      };
    }
    const side = apex.tenths < HALF * 10 ? 'nhỏ hơn' : 'lớn hơn';
    const kind = angle > 90 ? 'tù' : 'nhọn';
    return {
      tone: /** @type {const} */ ('info'),
      text: `MA = ${ma} ${side} BC : 2 = ${half}, và góc BAC = ${angle}° là góc ${kind}. Kéo A lên đường tròn nét đứt để MA = BC : 2.`,
    };
  });

  function announce() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      announcement = feedback.text;
    }, 400);
  }

  const dragA = $derived({
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    point: A,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      apex = apexFromPointer(p);
      return apexPoint(apex);
    },
    onChange: announce,
    /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      apex = stepApex(apex, dx, dy, big);
      announce();
    },
  });

  function reset() {
    apex = { ...START };
    announce();
  }
</script>

<div class="space-y-4">
  <div aria-live="polite" aria-atomic="true" class="sr-only">{announcement}</div>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-lg"
    label="Tam giác ABC với trung tuyến AM; kéo đỉnh A"
  >
    <path
      d="M {B.x} {B.y} A {HALF * UNIT} {HALF * UNIT} 0 0 1 {C.x} {C.y}"
      fill="none"
      stroke="#94A3B8"
      stroke-width="1.5"
      stroke-dasharray="4 5"
    />
    <polygon
      points="{A.x},{A.y} {B.x},{B.y} {C.x},{C.y}"
      fill={onCircle ? '#10B981' : '#6366F1'}
      fill-opacity="0.12"
      stroke="#1F2937"
      stroke-width="2.5"
    />
    <line x1={A.x} y1={A.y} x2={M.x} y2={M.y} stroke="#D97706" stroke-width="2.2" />
    <TickMarks from={B} to={M} count={1} color="#D7263D" />
    <TickMarks from={M} to={C} count={1} color="#D7263D" />
    {#if onCircle}
      <TickMarks from={A} to={M} count={1} color="#D7263D" />
      <path
        d={rightMarkPath(A, directionTo(A, B), directionTo(A, C), 13)}
        fill="none"
        stroke="#047857"
        stroke-width="2"
      />
    {/if}
    <circle cx={M.x} cy={M.y} r="4" fill="#1F2937" />
    <circle cx={B.x} cy={B.y} r="5" fill="#1F2937" />
    <circle cx={C.x} cy={C.y} r="5" fill="#1F2937" />
    <text x={B.x - 18} y={B.y + 20} font-size="15" font-weight="700" fill="#1F2937">B</text>
    <text x={C.x + 6} y={C.y + 20} font-size="15" font-weight="700" fill="#1F2937">C</text>
    <text x={M.x - 5} y={M.y + 22} font-size="15" font-weight="700" fill="#1F2937">M</text>
    <DragPoint
      drag={dragA}
      r={10}
      color="#D97706"
      label="Đỉnh A: kéo, hoặc dùng mũi tên trái phải để xoay quanh M, lên xuống để đổi độ dài MA"
    />
    <text x={A.x + 10} y={A.y - 12} font-size="15" font-weight="700" fill="#1F2937">A</text>
  </GeometryBoard>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
    <span class="text-sm text-slate-600 tabular-nums">
      BC = {formatFixed(2 * HALF, 1)}, BC : 2 = {half}, MA = {ma}, góc BAC = {angle}°
    </span>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
