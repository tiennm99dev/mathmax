<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { pointsAttr } from '#lib/utils/svg.js';
  import SceneFigure from '../_shared/scene-figure.svelte';
  import { centreOf, cornerPath, nameAway, rightCorners } from '../_shared/scene.js';
  import { classify } from '../_shared/shape-questions.js';
  import {
    CELL,
    COLS,
    KIND_LABELS,
    PAD,
    QUAD_NAMES,
    ROWS,
    START_QUAD,
    START_TRIANGLE,
    TRIANGLE_NAMES,
    buildRound,
    cellLengths,
    shapeMessage,
    toBoard,
    toGrid,
  } from './engine.js';

  const W = COLS * CELL + 2 * PAD;
  const H = ROWS * CELL + 2 * PAD;
  const GRID_X = Array.from({ length: COLS + 1 }, (_, i) => PAD + i * CELL);
  const GRID_Y = Array.from({ length: ROWS + 1 }, (_, i) => PAD + i * CELL);

  let mode = $state(/** @type {'tu-giac' | 'tam-giac' | 'quiz'} */ ('tu-giac'));
  let quad = $state(START_QUAD.map(toBoard));
  let triangle = $state(START_TRIANGLE.map(toBoard));
  let madeRectangle = $state(false);
  let madeSquare = $state(false);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const corners = $derived(mode === 'tam-giac' ? triangle : quad);
  const names = $derived(mode === 'tam-giac' ? TRIANGLE_NAMES : QUAD_NAMES);
  const grid = $derived(corners.map(toGrid));
  const kind = $derived(classify(grid));
  const special = $derived(kind === 'vuong' || kind === 'chu-nhat');
  const isFigure = $derived(kind !== 'thang-hang' && kind !== 'cat-nhau');
  const right = $derived(isFigure ? rightCorners(grid) : []);
  const lengths = $derived(cellLengths(grid));
  const middle = $derived(centreOf(corners));
  const message = $derived(shapeMessage(grid));
  const fill = $derived(
    kind === 'vuong'
      ? '#bbf7d0'
      : kind === 'chu-nhat'
        ? '#bfdbfe'
        : isFigure
          ? '#fef3c7'
          : '#fee2e2',
  );

  function noteMade() {
    const now = classify(quad.map(toGrid));
    if (now === 'chu-nhat') madeRectangle = true;
    if (now === 'vuong') madeSquare = true;
  }

  /** @param {{ x: number, y: number }} point */
  function dragOf(point) {
    return {
      point,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      keyStep: CELL,
      keyShiftStep: CELL * 2,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => toBoard(toGrid(p)),
      onChange: noteMade,
    };
  }

  function restart() {
    quad = START_QUAD.map(toBoard);
    triangle = START_TRIANGLE.map(toBoard);
    madeRectangle = false;
    madeSquare = false;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'tu-giac', label: 'Hình tứ giác' },
      { value: 'tam-giac', label: 'Hình tam giác' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode !== 'quiz'}
    <GeometryBoard
      width={W}
      height={H}
      interactive
      bind:svgEl
      maxWidth="max-w-md"
      label="Lưới ô vuông có một hình với các đỉnh kéo được"
    >
      {#each GRID_X as x (x)}
        <line x1={x} x2={x} y1={PAD} y2={H - PAD} stroke="#e2e8f0" />
      {/each}
      {#each GRID_Y as y (y)}
        <line x1={PAD} x2={W - PAD} y1={y} y2={y} stroke="#e2e8f0" />
      {/each}

      <polygon
        points={pointsAttr(corners)}
        {fill}
        fill-opacity="0.75"
        stroke="#1e293b"
        stroke-width="4"
        stroke-linejoin="round"
      />

      {#each right as i (i)}
        <path
          d={cornerPath(
            corners[i],
            corners[(i + corners.length - 1) % corners.length],
            corners[(i + 1) % corners.length],
            14,
          )}
          fill="none"
          stroke="#059669"
          stroke-width="4"
        />
      {/each}

      {#each lengths as length, i (i)}
        {#if length !== null && length > 0}
          {@const p = corners[i]}
          {@const q = corners[(i + 1) % corners.length]}
          <text
            x={(p.x + q.x) / 2 + (p.y === q.y ? 0 : p.x > middle.x ? -18 : 18)}
            y={(p.y + q.y) / 2 + (p.x === q.x ? 0 : p.y > middle.y ? -14 : 16)}
            text-anchor="middle"
            dominant-baseline="middle"
            font-size="17"
            font-weight="600"
            fill="#b91c1c"
            aria-hidden="true">{length}</text
          >
        {/if}
      {/each}

      {#each corners as point, i (names[i])}
        {@const spot = nameAway(point, middle, 24)}
        <DragPoint
          drag={dragOf(point)}
          label="Đỉnh {names[i]}. Kéo hoặc bấm phím mũi tên để di chuyển trên lưới"
          r={10}
        />
        <text
          x={spot.x}
          y={spot.y}
          text-anchor="middle"
          dominant-baseline="middle"
          font-size="20"
          font-weight="700"
          style="pointer-events:none">{names[i]}</text
        >
      {/each}
    </GeometryBoard>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {special
        ? 'bg-emerald-100 text-emerald-900'
        : isFigure
          ? 'bg-slate-100 text-slate-800'
          : 'bg-amber-100 text-amber-900'}"
      aria-live="polite"
    >
      {#if special}<span aria-hidden="true">⭐ </span>{/if}{message}
    </p>

    {#if mode === 'tu-giac'}
      <ul class="grid gap-2 text-lg font-semibold sm:grid-cols-2">
        <li
          class="rounded-2xl px-4 py-2 {madeRectangle
            ? 'bg-emerald-50 text-emerald-800'
            : 'bg-slate-50 text-slate-700'}"
        >
          {madeRectangle ? '✓ Đã xếp được' : 'Thử xếp'} hình chữ nhật
        </li>
        <li
          class="rounded-2xl px-4 py-2 {madeSquare
            ? 'bg-emerald-50 text-emerald-800'
            : 'bg-slate-50 text-slate-700'}"
        >
          {madeSquare ? '✓ Đã xếp được' : 'Thử xếp'} hình vuông
        </li>
      </ul>
    {/if}

    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={restart}>
        Làm lại từ đầu
      </button>
    </div>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em đã nhận ra hình tam giác, hình tứ giác, hình chữ nhật và hình vuông."
    >
      {#snippet visual(q, settled)}
        {#if q.visual}
          <SceneFigure scene={q.visual} {settled} />
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
