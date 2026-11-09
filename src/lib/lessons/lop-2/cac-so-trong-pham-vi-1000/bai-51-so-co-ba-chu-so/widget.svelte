<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import BlockPile from '#lib/core/kid/block-pile.svelte';
  import Block from '#lib/core/kid/block.svelte';
  import { PLACES, readTo1000 } from '#lib/core/kid/place-value.js';
  import { CHALLENGES, EMPTY, challengeNote, drop, numberOf, reading, takeOut } from './engine.js';

  /** @typedef {import('#lib/core/kid/place-value.js').PlaceKey} PlaceKey */

  /** Drawn sizes in a column, chosen so nine blocks of a place fit at 390 px. */
  const CELLS = { hundreds: 2.5, tens: 5, ones: 12 };
  /** How far a pointer travels before a press counts as a drag. */
  const DRAG_START = 8;

  let table = $state(EMPTY);
  let round = $state(0);
  let refused = $state('');

  /** @type {{ key: PlaceKey, kind: import('#lib/core/kid/place-value.js').BlockKind, x: number, y: number, startX: number, startY: number, moved: boolean } | null} */
  let dragging = $state(null);
  /** The click that ends a drag must not also place a block. */
  let dragEnded = false;

  const target = $derived(CHALLENGES[round % CHALLENGES.length]);
  const number = $derived(numberOf(table));
  const note = $derived(challengeNote(table, target));
  const found = $derived(number === target);

  /**
   * @param {PlaceKey} block
   * @param {PlaceKey} column
   */
  function place(block, column) {
    const result = drop(table, block, column);
    table = result.table;
    refused = result.refused;
  }

  /** @param {PlaceKey} column */
  function remove(column) {
    table = takeOut(table, column);
    refused = '';
  }

  function next() {
    round += 1;
    table = EMPTY;
    refused = '';
  }

  /**
   * @param {PointerEvent & { currentTarget: HTMLElement }} e
   * @param {(typeof PLACES)[number]} p
   */
  function pressBlock(e, p) {
    dragEnded = false;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging = {
      key: p.key,
      kind: p.block,
      x: e.clientX,
      y: e.clientY,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    };
  }

  /** @param {PointerEvent} e */
  function moveBlock(e) {
    if (!dragging) return;
    const moved =
      dragging.moved ||
      Math.hypot(e.clientX - dragging.startX, e.clientY - dragging.startY) > DRAG_START;
    dragging = { ...dragging, x: e.clientX, y: e.clientY, moved };
  }

  /** @param {PointerEvent} e */
  function releaseBlock(e) {
    if (!dragging) return;
    const { key, moved } = dragging;
    dragging = null;
    if (!moved) return;
    dragEnded = true;
    const column = document
      .elementFromPoint(e.clientX, e.clientY)
      ?.closest('[data-column]')
      ?.getAttribute('data-column');
    if (column) place(key, /** @type {PlaceKey} */ (column));
  }

  /** A tap or Enter puts the block straight in its own column. @param {PlaceKey} key */
  function tapBlock(key) {
    if (dragEnded) {
      dragEnded = false;
      return;
    }
    place(key, key);
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Em hãy tạo số: <strong class="text-indigo-700">{readTo1000(target)}</strong>
  </p>

  <div class="grid grid-cols-3 gap-2" role="group" aria-label="Các khối để đặt vào bảng">
    {#each PLACES as p (p.key)}
      <button
        type="button"
        class="flex min-h-20 cursor-grab touch-none flex-col items-center justify-center gap-1 rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-2 font-semibold text-indigo-900 hover:bg-indigo-100 {focusRing}"
        aria-label="Đặt một {p.blockName} vào cột {p.title}"
        onpointerdown={(e) => pressBlock(e, p)}
        onpointermove={moveBlock}
        onpointerup={releaseBlock}
        onpointercancel={() => (dragging = null)}
        onclick={() => tapBlock(p.key)}
      >
        <Block kind={p.block} cell={p.key === 'ones' ? 12 : 4} />
        <span class="text-sm leading-tight">{p.blockName}</span>
      </button>
    {/each}
  </div>

  <div class="grid grid-cols-3 gap-2">
    {#each PLACES as p (p.key)}
      <section
        data-column={p.key}
        class="flex min-w-0 flex-col items-center gap-2 rounded-2xl border-2 bg-white p-2 {dragging?.moved
          ? 'border-indigo-400'
          : 'border-slate-200'}"
        aria-label="Cột {p.title}: {table[p.key]} khối"
      >
        <h3 class="font-bold text-slate-700">{p.title}</h3>
        <div class="flex min-h-28 w-full items-center justify-center">
          <BlockPile {...{ [p.key]: table[p.key] }} cells={CELLS} />
        </div>
        <p class="text-4xl font-bold text-slate-800 tabular-nums">{table[p.key]}</p>
        <button
          type="button"
          class="min-h-12 min-w-12 text-2xl {button.quiet} px-0"
          aria-label="Bỏ một {p.blockName} khỏi cột {p.title}"
          disabled={table[p.key] === 0}
          onclick={() => remove(p.key)}>−</button
        >
      </section>
    {/each}
  </div>

  <p class="text-center text-xl font-bold text-slate-800">{reading(table)}</p>

  {#if refused}
    <FeedbackNote tone="warn" text={refused} />
  {:else}
    <FeedbackNote tone={note.tone} text={note.text} />
  {/if}

  {#if found}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Tạo số khác
      </button>
    </div>
  {/if}
</div>

{#if dragging?.moved}
  <div
    class="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
    style:left="{dragging.x}px"
    style:top="{dragging.y}px"
  >
    <Block kind={dragging.kind} cell={dragging.key === 'ones' ? 12 : 4} />
  </div>
{/if}
