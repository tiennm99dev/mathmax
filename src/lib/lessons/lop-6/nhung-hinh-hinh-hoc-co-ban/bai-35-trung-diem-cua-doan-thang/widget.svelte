<script>
  import { button } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';
  import { midStatus, newLength } from './engine.js';

  const W = 480;
  const H = 140;
  const MM = 4;
  const ORIGIN = 40;
  const RULER_MM = 100;
  const LINE = 56;
  const MIN_AB = 20;
  const START = { ab: 56, am: 16 };

  /** @param {number} mm */
  const px = (mm) => ORIGIN + mm * MM;
  /** @param {number} x */
  const toMm = (x) => Math.round((x - ORIGIN) / MM);
  /** @param {number} mm */
  const cm = (mm) => formatNumber(mm / 10, 1);

  let B = $state({ x: px(START.ab), y: LINE });
  let M = $state({ x: px(START.am), y: LINE });
  let found = $state(0);
  let wasMid = false;
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const ab = $derived(toMm(B.x));
  const st = $derived(midStatus(ab, toMm(M.x)));

  /** B moves in 2 mm steps so the midpoint is always a whole millimetre. */
  const projectB = (/** @type {{ x: number, y: number }} */ p) => ({
    x: px(clamp(2 * Math.round(toMm(p.x) / 2), MIN_AB, RULER_MM)),
    y: LINE,
  });
  const projectM = (/** @type {{ x: number, y: number }} */ p) => ({
    x: px(clamp(toMm(p.x), 0, ab)),
    y: LINE,
  });

  const dragB = $derived({
    point: B,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: projectB,
    keyStep: 2 * MM,
    keyShiftStep: 10 * MM,
    onChange: () => {
      if (M.x > B.x) M = { x: B.x, y: LINE };
    },
  });
  const dragM = $derived({
    point: M,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: projectM,
    keyStep: MM,
    keyShiftStep: 10 * MM,
  });

  $effect(() => {
    if (st.isMid && !wasMid) found++;
    wasMid = st.isMid;
  });

  function fresh() {
    const next = newLength(Math.random, ab);
    B = { x: px(next), y: LINE };
    M = { x: px(Math.round(next / 5)), y: LINE };
  }

  const message = $derived.by(() => {
    if (st.isMid)
      return `Đèn sáng! MA = MB = ${cm(st.ma)} cm và M nằm giữa A, B, nên M là trung điểm của AB: MA = MB = AB : 2 = ${cm(ab)} : 2 = ${cm(st.ma)} (cm).`;
    if (st.ma === 0) return 'M đang trùng với A. Kéo M vào giữa đoạn thẳng AB.';
    if (st.mb === 0) return 'M đang trùng với B. Kéo M vào giữa đoạn thẳng AB.';
    return st.nearer === 'A'
      ? `MA = ${cm(st.ma)} cm < MB = ${cm(st.mb)} cm: M còn gần A hơn. Kéo M về phía B.`
      : `MA = ${cm(st.ma)} cm > MB = ${cm(st.mb)} cm: M đã gần B hơn. Kéo M về phía A.`;
  });
</script>

<div class="space-y-4">
  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Đoạn thẳng AB trên thước, điểm M kéo được dọc đoạn AB"
  >
    <rect
      x={ORIGIN - 14}
      y={LINE + 4}
      width={RULER_MM * MM + 28}
      height="52"
      rx="4"
      fill="#FEF3C7"
      stroke="#D97706"
      stroke-width="1"
    />
    {#each { length: RULER_MM + 1 } as _, mm (mm)}
      <line
        x1={px(mm)}
        y1={LINE + 4}
        x2={px(mm)}
        y2={LINE + 4 + (mm % 10 === 0 ? 16 : mm % 5 === 0 ? 10 : 6)}
        stroke="#92400E"
        stroke-width={mm % 10 === 0 ? 1.5 : 0.8}
      />
      {#if mm % 10 === 0}
        <text x={px(mm)} y={LINE + 36} font-size="12" fill="#78350F" text-anchor="middle"
          >{mm / 10}</text
        >
      {/if}
    {/each}

    <line
      x1={px(0)}
      y1={LINE}
      x2={B.x}
      y2={LINE}
      stroke={st.isMid ? '#059669' : '#4F46E5'}
      stroke-width="4"
      stroke-linecap="round"
    />
    {#if st.isMid}
      <TickMarks from={{ x: px(0), y: LINE }} to={{ x: M.x, y: LINE }} count={1} color="#059669" />
      <TickMarks from={{ x: M.x, y: LINE }} to={{ x: B.x, y: LINE }} count={1} color="#059669" />
    {/if}

    <circle cx={px(0)} cy={LINE} r="7" fill="#1F2937" />
    <text x={px(0) - 5} y={LINE - 14} font-size="14" font-weight="700" fill="#1F2937">A</text>
    <DragPoint
      drag={dragB}
      r={9}
      name="B"
      nameDx={-5}
      nameDy={-16}
      label="Điểm B: kéo hoặc dùng phím mũi tên để đổi độ dài AB, mỗi bước 2 mm"
    />
    <DragPoint
      drag={dragM}
      r={9}
      color={st.isMid ? '#059669' : '#F46036'}
      name="M"
      nameDx={-5}
      nameDy={-16}
      label="Điểm M trên đoạn AB: kéo hoặc dùng phím mũi tên trái, phải, mỗi bước 1 mm"
    />
  </GeometryBoard>

  <div class="flex flex-wrap items-center gap-4">
    <div
      class="h-12 w-12 shrink-0 rounded-full border-4 motion-safe:transition-all motion-safe:duration-300 {st.isMid
        ? 'border-amber-300 bg-yellow-300 shadow-[0_0_24px_8px_rgba(250,204,21,0.7)]'
        : 'border-slate-300 bg-slate-200'}"
      role="img"
      aria-label={st.isMid ? 'Đèn đang sáng' : 'Đèn đang tắt'}
    ></div>
    <dl class="grid flex-1 grid-cols-3 gap-2 text-center text-sm">
      <div class="rounded-lg bg-indigo-50 p-2">
        <dt class="text-indigo-700">AB</dt>
        <dd class="text-lg font-semibold tabular-nums text-indigo-950">{cm(ab)} cm</dd>
      </div>
      <div class="rounded-lg bg-orange-50 p-2">
        <dt class="text-orange-700">MA</dt>
        <dd class="text-lg font-semibold tabular-nums text-orange-950">{cm(st.ma)} cm</dd>
      </div>
      <div class="rounded-lg bg-orange-50 p-2">
        <dt class="text-orange-700">MB</dt>
        <dd class="text-lg font-semibold tabular-nums text-orange-950">{cm(st.mb)} cm</dd>
      </div>
    </dl>
  </div>

  <p
    class="rounded-lg border p-3 text-sm {st.isMid
      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
      : 'border-slate-200 bg-slate-50 text-slate-900'}"
    aria-live="polite"
  >
    {message}
  </p>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.primary} onclick={fresh}>Đoạn thẳng mới</button>
    <span class="text-sm text-slate-600">Số lần tìm được trung điểm: {found}</span>
  </div>
</div>
