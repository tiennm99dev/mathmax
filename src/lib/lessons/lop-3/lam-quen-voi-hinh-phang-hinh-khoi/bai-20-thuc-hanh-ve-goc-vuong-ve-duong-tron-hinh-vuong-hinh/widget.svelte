<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { cornerPath } from '../_shared/scene.js';
  import { passFocus } from '../_shared/pass-focus.js';
  import {
    CELL,
    COLOURS,
    COLS,
    PAD,
    ROWS,
    TOOLS,
    draftMessage,
    draftOf,
    flower,
    isComplete,
    placeSecond,
    progressMessage,
    toBoard,
    toGrid,
  } from './engine.js';

  /** @typedef {import('./engine.js').Item & { colour: string }} Stamped */

  const W = COLS * CELL + 2 * PAD;
  const H = ROWS * CELL + 2 * PAD;
  const GRID_X = Array.from({ length: COLS + 1 }, (_, i) => PAD + i * CELL);
  const GRID_Y = Array.from({ length: ROWS + 1 }, (_, i) => PAD + i * CELL);
  const INK = '#1e293b';

  /** Where the handles start for a tool, in grid cells. */
  const STARTS = /** @type {const} */ ({
    goc: [
      { x: 3, y: 9 },
      { x: 8, y: 9 },
    ],
    tron: [
      { x: 7, y: 6 },
      { x: 10, y: 6 },
    ],
    'chu-nhat': [
      { x: 3, y: 3 },
      { x: 9, y: 7 },
    ],
    vuong: [
      { x: 4, y: 3 },
      { x: 9, y: 8 },
    ],
  });

  let tool = $state(/** @type {import('./engine.js').Tool} */ ('goc'));
  let colour = $state(/** @type {string} */ (COLOURS[1].value));
  const first = $state(toBoard(STARTS.goc[0]));
  const second = $state(toBoard(STARTS.goc[1]));
  let items = $state(/** @type {Stamped[]} */ ([]));
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @type {HTMLButtonElement | undefined} */
  let undoButton = $state();
  /** @type {HTMLButtonElement | undefined} */
  let clearButton = $state();
  /** @type {HTMLButtonElement | undefined} */
  let flowerButton = $state();

  const a = $derived(toGrid(first));
  const b = $derived(toGrid(second));
  const draft = $derived(draftOf(tool, a, b));
  const message = $derived(draftMessage(tool, draft));
  const progress = $derived(progressMessage(items));
  const complete = $derived(isComplete(items));

  function resetHandles() {
    const [p, q] = STARTS[tool];
    Object.assign(first, toBoard(p));
    Object.assign(second, toBoard(q));
  }

  /** Keeps the second handle where the tool allows, after a handle moved. */
  function settleSecond() {
    Object.assign(second, toBoard(placeSecond(tool, toGrid(first), toGrid(second))));
  }

  function stamp() {
    if (draft) items = [...items, { ...draft, colour }];
  }

  function addFlower() {
    items = [...items, ...flower().map((item) => ({ ...item, colour }))];
  }

  function undo() {
    items = items.slice(0, -1);
    passFocus(undoButton, flowerButton);
  }

  function clearAll() {
    items = [];
    passFocus(clearButton, flowerButton);
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
      onChange: settleSecond,
    };
  }

  /**
   * Board corners of a drawn right angle.
   * @param {Extract<import('./engine.js').Item, { kind: 'goc' }>} item
   */
  const anglePoints = (item) => ({
    c: toBoard(item.corner),
    p: toBoard(item.p),
    q: toBoard(item.q),
  });
</script>

{#snippet drawn(
  /** @type {import('./engine.js').Item} */ item,
  /** @type {string} */ fill,
  /** @type {boolean} */ isDraft,
)}
  {@const stroke = isDraft ? '#4f46e5' : INK}
  {@const dash = isDraft ? '6 5' : undefined}
  {#if item.kind === 'tron'}
    <circle
      cx={toBoard(item.centre).x}
      cy={toBoard(item.centre).y}
      r={item.radius * CELL}
      fill={isDraft ? 'none' : fill}
      fill-opacity="0.7"
      {stroke}
      stroke-width="3"
      stroke-dasharray={dash}
    />
  {:else if item.kind === 'goc'}
    {@const pts = anglePoints(item)}
    <polyline
      points={pointsAttr([pts.p, pts.c, pts.q])}
      fill="none"
      {stroke}
      stroke-width="3"
      stroke-linejoin="round"
      stroke-dasharray={dash}
    />
    <path d={cornerPath(pts.c, pts.p, pts.q, 10)} fill="none" {stroke} stroke-width="2.5" />
  {:else}
    <rect
      x={toBoard({ x: item.left, y: item.top }).x}
      y={toBoard({ x: item.left, y: item.top }).y}
      width={item.width * CELL}
      height={item.height * CELL}
      fill={isDraft ? 'none' : fill}
      fill-opacity="0.7"
      {stroke}
      stroke-width="3"
      stroke-dasharray={dash}
    />
  {/if}
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Em vẽ gì?"
    bind:value={tool}
    options={TOOLS.map((t) => ({ value: t.id, label: t.label }))}
    onchange={resetHandles}
  />

  <GeometryBoard
    width={W}
    height={H}
    interactive
    bind:svgEl
    maxWidth="max-w-lg"
    label="Bảng vẽ ô vuông có ê ke và compa ảo. Em đã vẽ {items.length} hình."
  >
    {#each GRID_X as x (x)}
      <line x1={x} x2={x} y1={PAD} y2={H - PAD} stroke="#e2e8f0" />
    {/each}
    {#each GRID_Y as y (y)}
      <line x1={PAD} x2={W - PAD} y1={y} y2={y} stroke="#e2e8f0" />
    {/each}

    {#each items as item, i (i)}
      {@render drawn(item, item.colour, false)}
    {/each}

    {#if draft}
      {#if draft.kind === 'goc'}
        {@const pts = anglePoints(draft)}
        <polygon
          points={pointsAttr([pts.c, pts.p, pts.q])}
          fill="#fbbf24"
          fill-opacity="0.35"
          stroke="#b45309"
          stroke-width="2"
          aria-hidden="true"
        />
      {:else if draft.kind === 'tron'}
        {@const pin = toBoard(draft.centre)}
        {@const tip = toBoard({ x: draft.centre.x + draft.radius, y: draft.centre.y })}
        <polyline
          points={pointsAttr([pin, { x: (pin.x + tip.x) / 2, y: Math.max(8, pin.y - 70) }, tip])}
          fill="none"
          stroke="#64748b"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        />
      {/if}
      {@render drawn(draft, 'none', true)}
    {/if}

    <DragPoint
      drag={dragOf(first)}
      label="Nút thứ nhất, {tool === 'goc'
        ? 'đỉnh góc'
        : tool === 'tron'
          ? 'tâm đường tròn'
          : 'một góc của hình'}. Kéo hoặc bấm phím mũi tên"
      color="#b45309"
      r={11}
    />
    <DragPoint
      drag={dragOf(second)}
      label="Nút thứ hai, {tool === 'goc'
        ? 'đầu cạnh'
        : tool === 'tron'
          ? 'đầu bút compa'
          : 'góc đối diện'}. Kéo hoặc bấm phím mũi tên"
      color="#4f46e5"
      r={11}
    />
  </GeometryBoard>

  <p
    class="rounded-2xl bg-slate-100 px-4 py-3 text-lg font-semibold text-slate-800"
    aria-live="polite"
  >
    {message}
  </p>

  <SegmentedControl
    label="Màu tô"
    bind:value={colour}
    options={COLOURS.map((c) => ({ value: c.value, label: c.label }))}
  />

  <div class="flex flex-wrap justify-center gap-3">
    <button
      type="button"
      class="min-h-12 text-lg aria-disabled:opacity-50 {button.primary}"
      aria-disabled={!draft}
      onclick={stamp}>Vẽ</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      bind:this={flowerButton}
      onclick={addFlower}>Vẽ bông hoa mẫu</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={items.length === 0}
      bind:this={undoButton}
      onclick={undo}>Xoá hình cuối</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={items.length === 0}
      bind:this={clearButton}
      onclick={clearAll}>Xoá hết</button
    >
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {complete
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if complete}<span aria-hidden="true">⭐ </span>{/if}{progress}
  </p>
</div>
