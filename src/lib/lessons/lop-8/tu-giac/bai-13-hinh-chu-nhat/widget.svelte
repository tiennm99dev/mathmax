<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatFixed } from '#lib/core/number-format.js';
  import { arcPath, directionTo, rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import { pointsAttr, UNIT } from '../_shared/quad.js';
  import {
    RANGE,
    diagonals,
    kindOf,
    paraPoints,
    polarFromPointer,
    sideFromPointer,
    stepWithin,
  } from '../_shared/para.js';

  const W = 420;
  const H = 300;
  const A = { x: 105, y: 216 };
  const START = { a: 8, b: 5, deg: 65 };

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let a = $state(START.a);
  let b = $state(START.b);
  let deg = $state(START.deg);
  let announcement = $state('');
  /** @type {ReturnType<typeof setTimeout> | null} */ let timer = null;

  const para = $derived({ a, b, deg });
  const pts = $derived(paraPoints(A, para));
  const O = $derived({ x: (A.x + pts.C.x) / 2, y: (A.y + pts.C.y) / 2 });
  const rect = $derived(kindOf(para).rect);
  const diag = $derived(diagonals(para));

  /** Diagonals print with two decimals, so unequal ones never print alike. */
  const len2 = (/** @type {number} */ v) => formatFixed(v, 2);

  const checks = $derived([
    { id: 'goc', name: `Góc A: Â = ${deg}°`, ok: rect },
    {
      id: 'cheo',
      name: `Hai đường chéo: AC = ${len2(diag.ac)}, BD = ${len2(diag.bd)}`,
      ok: rect,
    },
    {
      id: 'o',
      name: rect
        ? `OA = OB = OC = OD = ${len2(diag.ac / 2)}`
        : `OA = OC = ${len2(diag.ac / 2)}, OB = OD = ${len2(diag.bd / 2)}`,
      ok: rect,
    },
  ]);

  const feedback = $derived.by(() => {
    if (rect) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Hình bình hành có một góc vuông nên ABCD là hình chữ nhật. Hai đường chéo bằng nhau (AC = BD = ${len2(diag.ac)}) và cắt nhau tại trung điểm O, nên O cách đều bốn đỉnh.`,
      };
    }
    const longer = diag.ac > diag.bd ? 'AC dài hơn BD' : 'BD dài hơn AC';
    return {
      tone: /** @type {const} */ ('info'),
      text: `ABCD là hình bình hành với Â = ${deg}°, chưa có góc vuông: ${longer}. Kéo D để góc A thành góc vuông.`,
    };
  });

  function announce() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      announcement = feedback.text;
    }, 400);
  }

  const base = {
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
  };
  const dragB = $derived({
    ...base,
    point: pts.B,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      a = sideFromPointer(A, p);
      return paraPoints(A, { a, b, deg }).B;
    },
    onChange: announce,
    /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy */
    onKeyMove: (dx, dy) => {
      a = stepWithin(a, dx || -dy, RANGE.aMin, RANGE.aMax);
      announce();
    },
  });
  const dragD = $derived({
    ...base,
    point: pts.D,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      ({ b, deg } = polarFromPointer(A, p));
      return paraPoints(A, { a, b, deg }).D;
    },
    onChange: announce,
    /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      if (dx) deg = stepWithin(deg, -dx * (big ? 5 : 1), RANGE.degMin, RANGE.degMax);
      if (dy) b = stepWithin(b, -dy, RANGE.bMin, RANGE.bMax);
      announce();
    },
  });

  function reset() {
    a = START.a;
    b = START.b;
    deg = START.deg;
    announce();
  }

  const dirAB = $derived(directionTo(A, pts.B));
  const dirAD = $derived(directionTo(A, pts.D));
</script>

<div class="space-y-4">
  <div aria-live="polite" aria-atomic="true" class="sr-only">{announcement}</div>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-lg"
    label="Hình bình hành ABCD: kéo B để đổi cạnh AB, kéo D để đổi cạnh AD và góc A"
  >
    {#if rect}
      <circle
        cx={O.x}
        cy={O.y}
        r={(diag.ac / 2) * UNIT}
        fill="none"
        stroke="#10B981"
        stroke-width="1.5"
        stroke-dasharray="4 5"
      />
    {/if}
    <polygon
      points={pointsAttr([pts.A, pts.B, pts.C, pts.D])}
      fill={rect ? '#10B981' : '#6366F1'}
      fill-opacity="0.12"
      stroke="#1F2937"
      stroke-width="2.5"
    />
    <line
      x1={A.x}
      y1={A.y}
      x2={pts.C.x}
      y2={pts.C.y}
      stroke="#D7263D"
      stroke-width="1.8"
      stroke-dasharray="6 5"
    />
    <line
      x1={pts.B.x}
      y1={pts.B.y}
      x2={pts.D.x}
      y2={pts.D.y}
      stroke="#1B998B"
      stroke-width="1.8"
      stroke-dasharray="6 5"
    />
    {#if rect}
      <TickMarks from={A} to={O} count={1} color="#047857" />
      <TickMarks from={O} to={pts.C} count={1} color="#047857" />
      <TickMarks from={pts.B} to={O} count={1} color="#047857" />
      <TickMarks from={O} to={pts.D} count={1} color="#047857" />
      <path d={rightMarkPath(A, dirAB, dirAD, 14)} fill="none" stroke="#047857" stroke-width="2" />
    {:else}
      <TickMarks from={A} to={O} count={1} color="#D7263D" />
      <TickMarks from={O} to={pts.C} count={1} color="#D7263D" />
      <TickMarks from={pts.B} to={O} count={2} color="#1B998B" />
      <TickMarks from={O} to={pts.D} count={2} color="#1B998B" />
      <path d={arcPath(A, dirAB, dirAD, 20)} fill="none" stroke="#4F46E5" stroke-width="2" />
    {/if}
    <circle cx={O.x} cy={O.y} r="4" fill="#1F2937" />
    <text x={O.x + 8} y={O.y - 8} font-size="14" font-weight="700" fill="#1F2937">O</text>
    <circle cx={pts.C.x} cy={pts.C.y} r="5" fill="#1F2937" />
    <circle cx={A.x} cy={A.y} r="5" fill="#1F2937" />

    <DragPoint
      drag={dragB}
      r={10}
      label="Đỉnh B: kéo ngang, hoặc dùng phím mũi tên để đổi cạnh AB"
    />
    <DragPoint
      drag={dragD}
      r={10}
      color="#D97706"
      label="Đỉnh D: kéo, hoặc dùng mũi tên trái phải để đổi góc A, lên xuống để đổi cạnh AD"
    />
    <text x={A.x - 20} y={A.y + 20} font-size="15" font-weight="700" fill="#1F2937">A</text>
    <text x={pts.B.x + 8} y={pts.B.y + 22} font-size="15" font-weight="700" fill="#1F2937">B</text>
    <text x={pts.C.x + 10} y={pts.C.y - 10} font-size="15" font-weight="700" fill="#1F2937">C</text>
    <text x={pts.D.x - 6} y={pts.D.y - 16} font-size="15" font-weight="700" fill="#1F2937">D</text>
  </GeometryBoard>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
    <span class="text-sm text-slate-600 tabular-nums">AB = {a}, AD = {b}</span>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <ul class="space-y-1 text-sm tabular-nums" aria-label="Các số đo của hình">
    {#each checks as c (c.id)}
      <li class="flex items-start gap-2">
        <span
          class="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold {c.ok
            ? 'bg-emerald-100 text-emerald-800'
            : 'bg-slate-200 text-slate-600'}"
          aria-hidden="true">{c.ok ? '✓' : '·'}</span
        >
        <span>{c.name}</span>
      </li>
    {/each}
  </ul>
</div>
