<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { along, arcPath, directionTo, rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { KIND_NAME, STEP, clampMeasure, kindOf, measureAt } from '../_shared/angle.js';
  import AngleFigure from '../_shared/angle-figure.svelte';
  import { angleFigure } from '../_shared/figure.js';
  import { BINS, GOALS, SORT_ANGLES, compareText, goalMessage, sortCards } from './engine.js';

  const W = 400;
  const H = 230;
  const O = { x: 200, y: 196 };
  const HANDLE = 160;

  const KIND_STYLE = {
    nhon: 'bg-sky-100 text-sky-900',
    vuong: 'bg-emerald-100 text-emerald-900',
    tu: 'bg-amber-100 text-amber-900',
    bet: 'bg-rose-100 text-rose-900',
  };

  let mode = $state(/** @type {'xoay' | 'xep'} */ ('xoay'));
  let m = $state(45);
  let goal = $state(0);
  const handle = $state(along(O, HANDLE, 45));
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const kind = $derived(kindOf(m));
  const want = $derived(GOALS[goal % GOALS.length]);
  const status = $derived(goalMessage(m, want));
  const bEnd = $derived(along(O, HANDLE, m));
  const aEnd = along(O, 180, 0);
  const upEnd = along(O, 170, 90);
  const leftEnd = along(O, 180, 180);

  const cards = shuffled(sortCards(), 4);
  const figures = Object.fromEntries(
    SORT_ANGLES.map((a) => [a.id, { m: a.m, figure: angleFigure(a.m, a.turn, a.names) }]),
  );

  /** @param {number} next */
  function setMeasure(next) {
    m = clampMeasure(next);
    const p = along(O, HANDLE, m);
    handle.x = p.x;
    handle.y = p.y;
  }

  const drag = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => along(O, HANDLE, measureAt(directionTo(O, p), 'phai')),
    onChange: () => {
      m = measureAt(directionTo(O, handle), 'phai');
    },
    /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setMeasure(m + (dx < 0 || dy < 0 ? 1 : -1) * (big ? 30 : STEP)),
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'xoay', label: 'Xoay cạnh OB' },
      { value: 'xep', label: 'Xếp góc vào nhóm' },
    ]}
  />

  {#if mode === 'xoay'}
    <p class="text-center text-xl font-semibold text-slate-800">
      Em hãy tạo một <strong class="text-indigo-700">{KIND_NAME[want]}</strong>.
    </p>

    <GeometryBoard
      bind:svgEl
      width={W}
      height={H}
      interactive
      maxWidth="max-w-xl"
      label="Góc đỉnh O; cạnh OA, OB. Cạnh OA nằm ngang, cạnh OB xoay được. Nét đứt dựng đứng chỉ góc vuông."
    >
      <line
        x1={O.x}
        y1={O.y}
        x2={upEnd.x}
        y2={upEnd.y}
        stroke="#059669"
        stroke-width="2"
        stroke-dasharray="6 6"
      />
      <text x={upEnd.x + 6} y={upEnd.y + 14} font-size="14" fill="#047857">90°</text>
      <line
        x1={O.x}
        y1={O.y}
        x2={leftEnd.x}
        y2={leftEnd.y}
        stroke="#E11D48"
        stroke-width="2"
        stroke-dasharray="3 6"
      />
      {#if kind === 'vuong'}
        <path d={rightMarkPath(O, 0, m, 22)} fill="none" stroke="#059669" stroke-width="3" />
      {:else}
        <path d={arcPath(O, 0, m, 34)} fill="none" stroke="#B45309" stroke-width="3" />
      {/if}
      <line x1={O.x} y1={O.y} x2={aEnd.x} y2={aEnd.y} stroke="#4F46E5" stroke-width="4" />
      <line x1={O.x} y1={O.y} x2={bEnd.x} y2={bEnd.y} stroke="#1B998B" stroke-width="4" />
      <text x={aEnd.x - 12} y={aEnd.y + 24} font-size="18" font-weight="700" fill="#3730A3">A</text>
      <circle cx={O.x} cy={O.y} r="5" fill="#1F2937" />
      <text x={O.x - 6} y={O.y + 24} font-size="18" font-weight="700" fill="#1F2937">O</text>
      <DragPoint
        {drag}
        r={11}
        color="#1B998B"
        name="B"
        nameDx={handle.x > 350 ? -26 : 14}
        label="Cạnh OB. Kéo hoặc bấm phím mũi tên để xoay, mỗi bước 5 độ."
      />
    </GeometryBoard>

    <p class="rounded-2xl px-4 py-3 text-center text-2xl font-bold {KIND_STYLE[kind]}">
      {KIND_NAME[kind].charAt(0).toUpperCase() + KIND_NAME[kind].slice(1)}: {compareText(m)}
    </p>

    <div aria-live="polite">
      <p
        class="rounded-2xl px-4 py-3 text-xl font-semibold {status.done
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
        onclick={() => (goal += 1)}>Góc khác</button
      >
    </div>
  {:else}
    <p class="text-lg text-slate-700">
      Em so sánh mỗi góc với góc vuông (90°), rồi xếp vào đúng nhóm.
    </p>
    <CardSorter {cards} bins={[...BINS]} label="Xếp các góc vào nhóm" hintOnWrong>
      {#snippet face(c)}
        <span class="flex w-32 flex-col items-center gap-1">
          <AngleFigure figure={figures[c.id].figure} settled={false} size="max-w-32" />
          <span class="text-xl font-bold text-amber-700">{figures[c.id].m}°</span>
        </span>
      {/snippet}
    </CardSorter>
  {/if}
</div>
