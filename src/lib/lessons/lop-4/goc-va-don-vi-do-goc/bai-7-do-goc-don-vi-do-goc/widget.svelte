<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { along, arcPath, directionTo, rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { STEP, clampMeasure, measureAt, rayDirection, scaleReadings } from '../_shared/angle.js';
  import Protractor from '../_shared/protractor.svelte';
  import QuestionVisual from '../_shared/question-visual.svelte';
  import { KIND_LABELS, TARGETS, buildRound, targetMessage } from './engine.js';

  const W = 420;
  const H = 250;
  const O = { x: 210, y: 222 };
  const R = 156;
  const HANDLE = 200;

  let mode = $state(/** @type {'xoay' | 'doc'} */ ('xoay'));
  let side = $state(/** @type {import('../_shared/angle.js').Side} */ ('phai'));
  let m = $state(30);
  let goal = $state(0);
  const handle = $state(along(O, HANDLE, 30));
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const target = $derived(TARGETS[goal % TARGETS.length]);
  const status = $derived(targetMessage(m, target));
  const aDir = $derived(side === 'phai' ? 0 : 180);
  const bDir = $derived(rayDirection(m, side));
  const aEnd = $derived(along(O, 196, aDir));
  const bEnd = $derived(along(O, HANDLE, bDir));
  const marks = $derived(scaleReadings(m, side));
  const ring = $derived(side === 'phai' ? 'trong' : 'ngoài');
  const reading = $derived(
    `Cạnh OB đi qua vạch ${side === 'phai' ? marks.inner : marks.outer} của vòng số ${ring}.`,
  );

  /** @param {number} next */
  function setMeasure(next) {
    m = clampMeasure(next);
    const p = along(O, HANDLE, rayDirection(m, side));
    handle.x = p.x;
    handle.y = p.y;
  }

  /** @param {string | number} v */
  function changeSide(v) {
    side = v === 'trai' ? 'trai' : 'phai';
    setMeasure(m);
  }

  function nextGoal() {
    goal += 1;
  }

  const drag = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => along(O, HANDLE, rayDirection(measureAt(directionTo(O, p), side), side)),
    onChange: () => {
      m = measureAt(directionTo(O, handle), side);
    },
    /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setMeasure(m + (dx > 0 || dy < 0 ? 1 : -1) * (big ? 30 : STEP)),
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'xoay', label: 'Xoay cạnh OB' },
      { value: 'doc', label: 'Đọc thước đo góc' },
    ]}
  />

  {#if mode === 'xoay'}
    <p class="text-center text-xl font-semibold text-slate-800">
      Em xoay cạnh OB để được góc <strong class="text-indigo-700">{target}°</strong>.
    </p>

    <SegmentedControl
      label="Cạnh OA nằm"
      value={side}
      onchange={changeSide}
      options={[
        { value: 'phai', label: 'Bên phải' },
        { value: 'trai', label: 'Bên trái' },
      ]}
    />

    <GeometryBoard
      bind:svgEl
      width={W}
      height={H}
      interactive
      maxWidth="max-w-xl"
      label="Thước đo góc đặt lên góc đỉnh O; cạnh OA, OB. Tâm thước ở đỉnh O, cạnh OA đi qua vạch 0. Cạnh OB xoay được."
    >
      <Protractor o={O} r={R} {side} font={12} />
      {#if m === 90}
        <path d={rightMarkPath(O, aDir, bDir, 20)} fill="none" stroke="#059669" stroke-width="3" />
      {:else}
        <path d={arcPath(O, aDir, bDir, 28)} fill="none" stroke="#B45309" stroke-width="3" />
      {/if}
      <line x1={O.x} y1={O.y} x2={aEnd.x} y2={aEnd.y} stroke="#4F46E5" stroke-width="4" />
      <line x1={O.x} y1={O.y} x2={bEnd.x} y2={bEnd.y} stroke="#1B998B" stroke-width="4" />
      <text
        x={side === 'phai' ? aEnd.x - 12 : aEnd.x + 4}
        y={aEnd.y + 22}
        font-size="18"
        font-weight="700"
        fill="#3730A3">A</text
      >
      <circle cx={O.x} cy={O.y} r="5" fill="#1F2937" />
      <text x={O.x - 6} y={O.y + 24} font-size="18" font-weight="700" fill="#1F2937">O</text>
      <DragPoint
        {drag}
        r={11}
        color="#1B998B"
        name="B"
        nameDx={handle.x > 370 ? -26 : 14}
        label="Cạnh OB. Kéo hoặc bấm phím mũi tên để xoay, mỗi bước 5 độ."
      />
    </GeometryBoard>

    <p class="text-center text-3xl font-bold text-amber-700" aria-hidden="true">{m}°</p>

    <div aria-live="polite">
      <p class="text-center text-lg text-slate-700">{reading} Góc bằng {m}°.</p>
      <p
        class="mt-2 rounded-2xl px-4 py-3 text-xl font-semibold {status.done
          ? 'bg-emerald-100 text-emerald-900'
          : 'bg-slate-100 text-slate-800'}"
      >
        {#if status.done}<span aria-hidden="true">⭐ </span>{/if}{status.text}
      </p>
    </div>

    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {status.done ? button.primary : button.secondary}"
        onclick={nextGoal}>Số đo khác</button
      >
    </div>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em đọc thước đo góc rất giỏi."
    >
      {#snippet visual(q, settled)}
        <QuestionVisual visual={q.visual} {settled} />
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
