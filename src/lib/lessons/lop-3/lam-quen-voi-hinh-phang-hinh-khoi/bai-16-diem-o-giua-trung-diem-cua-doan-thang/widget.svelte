<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Ruler from '#lib/core/kid/ruler.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import SceneFigure from '../_shared/scene-figure.svelte';
  import {
    A_COL,
    CELL,
    COLS,
    KIND_LABELS,
    LENGTHS,
    LINE_ROW,
    PAD,
    buildRound,
    placeMessage,
    placeOf,
    snapToGrid,
    toBoard,
  } from './engine.js';

  const W = COLS * CELL + 2 * PAD;
  const RULER_Y = toBoard(0, LINE_ROW).y + 18;
  const H = RULER_Y + 50;

  let mode = $state(/** @type {'keo' | 'quiz'} */ ('keo'));
  let length = $state(8);
  const m = $state(toBoard(A_COL + 3, LINE_ROW));
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const cell = $derived(snapToGrid(m));
  const a = toBoard(A_COL, LINE_ROW);
  const b = $derived(toBoard(A_COL + length, LINE_ROW));
  const place = $derived(placeOf(cell.col, cell.row, length));
  const between = $derived(place === 'giua' || place === 'trung-diem');
  const isMiddle = $derived(place === 'trung-diem');
  const message = $derived(placeMessage(cell.col, cell.row, length));

  const COLUMNS = Array.from({ length: COLS + 1 }, (_, i) => i);
  const ROWS = Array.from({ length: LINE_ROW + 1 }, (_, i) => i);

  const drag = $derived({
    point: m,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: CELL,
    keyShiftStep: CELL * 2,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      const { col, row } = snapToGrid(p);
      return toBoard(col, row);
    },
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'keo', label: 'Kéo điểm M' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'keo'}
    <SegmentedControl
      label="Đoạn thẳng AB dài bao nhiêu?"
      bind:value={length}
      options={LENGTHS.map((n) => ({ value: n, label: `${n} cm` }))}
    />

    <GeometryBoard
      width={W}
      height={H}
      interactive
      bind:svgEl
      label="Bảng có đoạn thẳng AB, thước đo và điểm M kéo được"
    >
      {#each COLUMNS as c (c)}
        <line
          x1={toBoard(c, 0).x}
          x2={toBoard(c, 0).x}
          y1={toBoard(0, 0).y}
          y2={toBoard(0, LINE_ROW).y}
          stroke="#e2e8f0"
        />
      {/each}
      {#each ROWS as r (r)}
        <line
          x1={toBoard(0, r).x}
          x2={toBoard(COLS, r).x}
          y1={toBoard(0, r).y}
          y2={toBoard(0, r).y}
          stroke="#e2e8f0"
        />
      {/each}

      <Ruler x={a.x} y={RULER_Y} cm={length} unit={CELL} />

      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#1e293b" stroke-width="4" />
      {#if between}
        <line
          x1={a.x}
          y1={a.y}
          x2={m.x}
          y2={m.y}
          stroke={isMiddle ? '#059669' : '#2563eb'}
          stroke-width="6"
        />
        <line
          x1={m.x}
          y1={m.y}
          x2={b.x}
          y2={b.y}
          stroke={isMiddle ? '#059669' : '#f97316'}
          stroke-width="6"
        />
      {/if}

      <circle cx={a.x} cy={a.y} r="6" fill="#1e293b" />
      <circle cx={b.x} cy={b.y} r="6" fill="#1e293b" />
      <text x={a.x} y={a.y - 14} text-anchor="middle" font-size="20" font-weight="700">A</text>
      <text x={b.x} y={b.y - 14} text-anchor="middle" font-size="20" font-weight="700">B</text>

      <DragPoint
        {drag}
        label="Điểm M. Kéo hoặc bấm phím mũi tên để di chuyển"
        color={isMiddle ? '#059669' : '#e11d48'}
      />
      <text
        x={cell.col === COLS ? m.x - 18 : m.x + 18}
        y={cell.row === 0 ? m.y + 18 : m.y - 18}
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="20"
        font-weight="700"
        style="pointer-events:none">M</text
      >
    </GeometryBoard>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {isMiddle
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if isMiddle}<span aria-hidden="true">⭐ </span>{/if}{message}
    </p>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em đã biết tìm điểm ở giữa và trung điểm của đoạn thẳng."
    >
      {#snippet visual(q, settled)}
        {#if q.visual}
          <SceneFigure scene={q.visual} {settled} />
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
