<script>
  import { button } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { cmText, measure, sumEqualsAB } from './engine.js';

  const W = 480;
  const H = 190;
  // One millimetre is MM units; the ruler's 0 is at ORIGIN.
  const MM = 4;
  const ORIGIN = 40;
  const RULER_MM = 100;
  const LINE = 100;
  const TOP = 20;
  // M closer than MAGNET units to the ruler's edge snaps onto it.
  const MAGNET = 8;
  const START = { a: 10, b: 66, m: { x: 40, y: 16 } };

  const TASKS = [
    { id: 'ab-6', text: 'Kéo A, B để đoạn thẳng AB dài đúng 6 cm.' },
    { id: 'giua', text: 'Đặt M nằm giữa A và B, rồi kiểm tra AM + MB = AB.' },
    { id: 'ngoai', text: 'Đặt M trên đường thẳng AB nhưng ở ngoài đoạn AB.' },
  ];

  /** @param {number} mm */
  const px = (mm) => ORIGIN + mm * MM;
  /** @param {number} x */
  const toMm = (x) => Math.round((x - ORIGIN) / MM);

  let A = $state({ x: px(START.a), y: LINE });
  let B = $state({ x: px(START.b), y: LINE });
  let M = $state({ x: px(START.m.x), y: LINE - START.m.y * MM });
  /** @type {Record<string, boolean>} */
  let done = $state({});
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  /** @param {{ x: number, y: number }} p */
  const onRuler = (p) => ({ x: px(clamp(toMm(p.x), 0, RULER_MM)), y: LINE });
  /** @param {{ x: number, y: number }} p */
  const free = (p) => {
    const x = px(clamp(toMm(p.x), -5, RULER_MM + 5));
    const y = clamp(LINE - Math.round((LINE - p.y) / MM) * MM, TOP, LINE);
    return { x, y: LINE - y <= MAGNET ? LINE : y };
  };

  /**
   * @param {{ x: number, y: number }} point
   * @param {(p: { x: number, y: number }) => { x: number, y: number }} projector
   */
  const dragOf = (point, projector) => ({
    point,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector,
    keyStep: MM,
    keyShiftStep: 10 * MM,
  });

  /**
   * Arrow keys move M one millimetre; a step up from the ruler's edge jumps
   * past the magnet so the keyboard can lift M off the line.
   * @param {number} dx @param {number} dy @param {boolean} big
   */
  function moveM(dx, dy, big) {
    const step = big ? 10 * MM : MM;
    const lift = dy < 0 && M.y === LINE ? MAGNET + MM : step;
    M = free({ x: M.x + dx * step, y: M.y + dy * (dy < 0 ? lift : step) });
  }

  function reset() {
    A = { x: px(START.a), y: LINE };
    B = { x: px(START.b), y: LINE };
    M = { x: px(START.m.x), y: LINE - START.m.y * MM };
    done = {};
  }

  const r = $derived(measure(toMm(A.x), toMm(B.x), { x: toMm(M.x), y: (LINE - M.y) / MM }));
  const equal = $derived(sumEqualsAB(r));

  const verdict = $derived.by(() => {
    if (r.ab === 0) return 'Hai điểm A và B đang trùng nhau: khoảng cách giữa chúng bằng 0.';
    if (r.atEnd) return 'M đang trùng với một đầu mút của đoạn AB.';
    if (r.between)
      return `M nằm giữa A và B: AM + MB = ${cmText(r.am)} + ${cmText(r.mb)} = ${cmText(r.sum)} (cm) = AB.`;
    const where = r.onLine
      ? 'M thuộc đường thẳng AB nhưng không nằm giữa A và B'
      : 'M không thuộc đường thẳng AB';
    if (r.onLine) return `${where}: AM + MB = ${cmText(r.sum)} cm > AB = ${cmText(r.ab)} cm.`;
    if (cmText(r.sum) === cmText(r.ab))
      return `${where}: AM + MB lớn hơn AB = ${cmText(r.ab)} cm một chút (chưa tới 1 mm), nên vẫn không bằng AB.`;
    return `${where}: AM + MB ≈ ${cmText(r.sum)} cm > AB = ${cmText(r.ab)} cm.`;
  });

  $effect(() => {
    if (r.ab === 60 && !done['ab-6']) done['ab-6'] = true;
    if (r.between && r.ab > 0 && !done.giua) done.giua = true;
    if (r.onLine && !r.between && !r.atEnd && r.ab > 0 && !done.ngoai) done.ngoai = true;
  });

  const solved = $derived(TASKS.filter((t) => done[t.id]).length);
  const lenText = (/** @type {number} */ mm, /** @type {boolean} */ exact) =>
    `${exact ? '' : '≈ '}${cmText(mm)} cm`;
</script>

<div class="space-y-4">
  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Thước thẳng chia xăng-ti-mét, đoạn thẳng AB trên mép thước và điểm M kéo được"
  >
    <!-- Ruler -->
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
    <text x={px(RULER_MM) - 2} y={LINE + 51} font-size="10" fill="#92400E" text-anchor="end"
      >cm</text
    >

    <!-- Line AB and the segment -->
    <line x1="10" y1={LINE} x2={W - 10} y2={LINE} stroke="#CBD5E1" stroke-width="1.5" />
    <line
      x1={A.x}
      y1={LINE}
      x2={B.x}
      y2={LINE}
      stroke={equal && r.between ? '#059669' : '#4F46E5'}
      stroke-width="4"
      stroke-linecap="round"
    />

    <!-- AM and MB -->
    {#if !r.onLine}
      <line
        x1={A.x}
        y1={A.y}
        x2={M.x}
        y2={M.y}
        stroke="#F46036"
        stroke-width="2"
        stroke-dasharray="6 4"
      />
      <line
        x1={M.x}
        y1={M.y}
        x2={B.x}
        y2={B.y}
        stroke="#F46036"
        stroke-width="2"
        stroke-dasharray="6 4"
      />
    {/if}

    <DragPoint
      drag={dragOf(A, onRuler)}
      r={9}
      name="A"
      nameDx={-5}
      nameDy={-14}
      label="Điểm A trên mép thước: kéo hoặc dùng phím mũi tên trái, phải, mỗi bước 1 mm"
    />
    <DragPoint
      drag={dragOf(B, onRuler)}
      r={9}
      name="B"
      nameDx={-5}
      nameDy={-14}
      label="Điểm B trên mép thước: kéo hoặc dùng phím mũi tên trái, phải, mỗi bước 1 mm"
    />
    <DragPoint
      drag={{ ...dragOf(M, free), onKeyMove: moveM }}
      r={9}
      color="#F46036"
      name="M"
      nameDx={10}
      nameDy={-10}
      label="Điểm M: kéo hoặc dùng phím mũi tên, mỗi bước 1 mm; đến gần mép thước thì M dính vào đường thẳng AB"
    />
  </GeometryBoard>

  <dl class="grid grid-cols-3 gap-2 text-center text-sm">
    <div class="rounded-lg bg-indigo-50 p-2">
      <dt class="text-indigo-700">AB</dt>
      <dd class="text-lg font-semibold tabular-nums text-indigo-950">{lenText(r.ab, true)}</dd>
    </div>
    <div class="rounded-lg bg-orange-50 p-2">
      <dt class="text-orange-700">AM</dt>
      <dd class="text-lg font-semibold tabular-nums text-orange-950">{lenText(r.am, r.onLine)}</dd>
    </div>
    <div class="rounded-lg bg-orange-50 p-2">
      <dt class="text-orange-700">MB</dt>
      <dd class="text-lg font-semibold tabular-nums text-orange-950">{lenText(r.mb, r.onLine)}</dd>
    </div>
  </dl>

  <p
    class="rounded-lg border p-3 text-sm {r.between
      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
      : 'border-slate-200 bg-slate-50 text-slate-900'}"
    aria-live="polite"
  >
    {verdict}
  </p>

  <div class="rounded-lg border border-slate-200 p-3">
    <p class="mb-2 text-sm font-semibold text-slate-700">Thử thách ({solved}/{TASKS.length})</p>
    <ul class="space-y-1 text-sm">
      {#each TASKS as t (t.id)}
        <li class={done[t.id] ? 'text-emerald-700' : 'text-slate-700'}>
          <span aria-hidden="true">{done[t.id] ? '✓' : '○'}</span>
          {t.text}
          <span class="sr-only">{done[t.id] ? '(đã làm được)' : '(chưa làm)'}</span>
        </li>
      {/each}
    </ul>
  </div>

  <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
</div>
