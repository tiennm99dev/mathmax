<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatFixed } from '#lib/core/number-format.js';
  import { arcPath, degText, directionTo, rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    RANGE,
    diagonalAngle,
    diagonals,
    kindOf,
    paraPoints,
    polarFromPointer,
    sideFromPointer,
    splitAtA,
    stepWithin,
  } from '../_shared/para.js';

  const W = 420;
  const H = 270;
  const A = { x: 105, y: 235 };
  const START = { a: 7, b: 5, deg: 65 };

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let a = $state(START.a);
  let b = $state(START.b);
  let deg = $state(START.deg);
  let announcement = $state('');
  /** @type {ReturnType<typeof setTimeout> | null} */ let timer = null;

  const para = $derived({ a, b, deg });
  const pts = $derived(paraPoints(A, para));
  const O = $derived({ x: (A.x + pts.C.x) / 2, y: (A.y + pts.C.y) / 2 });
  const kind = $derived(kindOf(para));
  const diag = $derived(diagonals(para));
  const between = $derived(Math.round(diagonalAngle(para)));
  // Whole degrees, or a half when Â is odd and AC bisects it; the two parts
  // always add up to the printed Â.
  const parts = $derived.by(() => {
    if (kind.rhombus) return [deg / 2, deg / 2];
    const cab = Math.round(splitAtA(para).cab);
    return [cab, deg - cab];
  });

  /** @param {number} v */
  const len2 = (v) => formatFixed(v, 2);

  const name = $derived(
    kind.square
      ? 'hình vuông'
      : kind.rect
        ? 'hình chữ nhật'
        : kind.rhombus
          ? 'hình thoi'
          : 'hình bình hành',
  );

  const tree = $derived([
    { id: 'tg', label: 'Tứ giác', why: 'bốn đỉnh, bốn cạnh', on: true },
    { id: 'ht', label: 'Hình thang', why: 'AB ∥ CD', on: true },
    { id: 'hbh', label: 'Hình bình hành', why: 'AB ∥ CD, AD ∥ BC', on: true },
    { id: 'hcn', label: 'Hình chữ nhật', why: 'thêm một góc vuông', on: kind.rect },
    { id: 'ht2', label: 'Hình thoi', why: 'thêm hai cạnh kề bằng nhau', on: kind.rhombus },
    { id: 'hv', label: 'Hình vuông', why: 'cả hai điều kiện', on: kind.square },
  ]);

  const checks = $derived([
    { id: 'canh', name: `Hai cạnh kề: AB = ${a}, AD = ${b}`, ok: kind.rhombus },
    { id: 'vuong', name: `Góc giữa hai đường chéo: ${between}°`, ok: kind.rhombus },
    {
      id: 'phan-giac',
      name: `AC chia góc A thành ${degText(parts[0])} và ${degText(parts[1])}`,
      ok: kind.rhombus,
    },
    { id: 'goc', name: `Góc A: Â = ${deg}°`, ok: kind.rect },
    {
      id: 'cheo',
      name: `Hai đường chéo: AC = ${len2(diag.ac)}, BD = ${len2(diag.bd)}`,
      ok: kind.rect,
    },
  ]);

  const feedback = $derived.by(() => {
    if (kind.square) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `ABCD là hình vuông: vừa là hình chữ nhật (Â = 90°) vừa là hình thoi (AB = AD = ${a}). Hai đường chéo bằng nhau, vuông góc và là phân giác các góc.`,
      };
    }
    if (kind.rhombus) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `ABCD là hình thoi: hình bình hành có hai cạnh kề bằng nhau. Hai đường chéo vuông góc và AC là tia phân giác của góc A. Kéo D để Â = 90° thì được hình vuông.`,
      };
    }
    if (kind.rect) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `ABCD là hình chữ nhật, chưa là hình thoi vì AB = ${a} ≠ AD = ${b}. Chỉnh cho AB = AD để leo lên hình vuông.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `ABCD là hình bình hành. Chỉnh cho AB = AD để được hình thoi, hoặc cho góc A vuông để được hình chữ nhật.`,
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
  const dirAC = $derived(directionTo(A, pts.C));
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
    <polygon
      points={pointsAttr([pts.A, pts.B, pts.C, pts.D])}
      fill={kind.square ? '#10B981' : kind.rhombus ? '#F59E0B' : kind.rect ? '#0EA5E9' : '#6366F1'}
      fill-opacity="0.14"
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
    {#if kind.rhombus}
      <TickMarks from={A} to={pts.B} count={1} color="#B45309" />
      <TickMarks from={pts.B} to={pts.C} count={1} color="#B45309" />
      <TickMarks from={pts.C} to={pts.D} count={1} color="#B45309" />
      <TickMarks from={pts.D} to={A} count={1} color="#B45309" />
      <path
        d={rightMarkPath(O, directionTo(O, A), directionTo(O, pts.B), 10)}
        fill="none"
        stroke="#047857"
        stroke-width="2"
      />
    {/if}
    {#if kind.rect}
      <path d={rightMarkPath(A, dirAB, dirAD, 14)} fill="none" stroke="#047857" stroke-width="2" />
    {/if}
    <path d={arcPath(A, dirAB, dirAC, 30)} fill="none" stroke="#4F46E5" stroke-width="2" />
    <path d={arcPath(A, dirAC, dirAD, 36)} fill="none" stroke="#D97706" stroke-width="2" />
    <circle cx={O.x} cy={O.y} r="4" fill="#1F2937" />
    <text x={O.x + 8} y={O.y + 18} font-size="14" font-weight="700" fill="#1F2937">O</text>
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
    <span class="text-sm text-slate-600">ABCD đang là <strong>{name}</strong>.</span>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <div class="grid gap-4 sm:grid-cols-2">
    <section aria-label="Sơ đồ các loại tứ giác">
      <h3 class="mb-2 text-sm font-semibold text-slate-700">Sơ đồ các loại tứ giác</h3>
      <ol class="space-y-1 text-sm">
        {#each tree as node, i (node.id)}
          <li
            class="flex items-center gap-2 rounded-md border px-2 py-1 {node.on
              ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
              : 'border-slate-200 bg-white text-slate-500'} {i >= 3 && i <= 4 ? 'ml-4' : ''} {i ===
            5
              ? 'ml-8'
              : ''}"
          >
            <span aria-hidden="true">{node.on ? '✓' : '·'}</span>
            <span class="font-semibold">{node.label}</span>
            <span class="text-xs">({node.why})</span>
            <span class="sr-only">{node.on ? ': đúng' : ': chưa'}</span>
          </li>
        {/each}
      </ol>
    </section>
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
</div>
