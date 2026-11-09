<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { PLACES5, readTo100000 } from '../_shared/numbers-to-100000.js';
  import {
    CHALLENGES,
    DIGITS,
    EMPTY,
    challengeNote,
    clear,
    place,
    reading,
    sumLine,
  } from './engine.js';

  /** How far, in px, a press must move before it counts as a drag. */
  const DRAG_START = 8;

  let slots = $state(EMPTY);
  let round = $state(0);
  /** The digit card picked by a tap, waiting for a column. */
  let picked = $state(/** @type {number | null} */ (null));
  /** A card being dragged by the pointer, with where the pointer is. */
  let drag = $state(
    /** @type {{ digit: number, x: number, y: number, x0: number, y0: number, moved: boolean } | null} */ (
      null
    ),
  );
  let skipClick = false;

  const target = $derived(CHALLENGES[round % CHALLENGES.length]);
  const note = $derived(challengeNote(slots, target));
  const found = $derived(note.tone === 'ok');
  const sum = $derived(sumLine(slots));

  /** @param {number} digit */
  function tapCard(digit) {
    if (skipClick) {
      skipClick = false;
      return;
    }
    picked = picked === digit ? null : digit;
  }

  /** @param {number} column */
  function tapColumn(column) {
    if (found) return;
    if (picked !== null) {
      slots = place(slots, column, picked);
      picked = null;
    } else if (slots[column] !== null) {
      slots = clear(slots, column);
    }
  }

  /**
   * @param {PointerEvent} event
   * @param {number} digit
   */
  function pressCard(event, digit) {
    if (found || event.button !== 0) return;
    drag = {
      digit,
      x: event.clientX,
      y: event.clientY,
      x0: event.clientX,
      y0: event.clientY,
      moved: false,
    };
  }

  /** @param {PointerEvent} event */
  function movePointer(event) {
    if (!drag) return;
    const far = Math.hypot(event.clientX - drag.x0, event.clientY - drag.y0) > DRAG_START;
    drag = { ...drag, x: event.clientX, y: event.clientY, moved: drag.moved || far };
  }

  /** @param {PointerEvent} event */
  function releasePointer(event) {
    if (!drag) return;
    if (drag.moved) {
      // A click may follow on the card the drag started from; skip it once.
      skipClick = true;
      setTimeout(() => (skipClick = false), 0);
      const under = document.elementFromPoint(event.clientX, event.clientY);
      const cell = under instanceof Element ? under.closest('[data-column]') : null;
      if (cell) {
        slots = place(slots, Number(cell.getAttribute('data-column')), drag.digit);
        picked = null;
      }
    }
    drag = null;
  }

  function next() {
    round += 1;
    slots = EMPTY;
    picked = null;
  }
</script>

<svelte:window
  onpointermove={movePointer}
  onpointerup={releasePointer}
  onpointercancel={() => (drag = null)}
/>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Em hãy xếp số: <strong class="text-indigo-700">{readTo100000(target)}</strong>
  </p>

  <div class="grid grid-cols-5 gap-1" role="group" aria-label="Bảng các hàng">
    {#each PLACES5 as p, i (p.key)}
      <button
        type="button"
        data-column={i}
        class="flex min-h-28 min-w-0 flex-col items-center justify-between rounded-2xl border-2 p-1 {picked !==
          null || drag?.moved
          ? 'border-indigo-400 bg-indigo-50'
          : 'border-slate-200 bg-white'}"
        aria-label="Cột {p.title}: {slots[i] === null ? 'trống' : `thẻ ${slots[i]}`}"
        onclick={() => tapColumn(i)}
      >
        <span class="text-center text-sm leading-tight font-bold text-slate-700">{p.title}</span>
        <span
          class="flex h-14 w-11 items-center justify-center rounded-xl text-4xl font-bold tabular-nums {slots[
            i
          ] === null
            ? 'border-2 border-dashed border-slate-300 text-slate-300'
            : 'bg-amber-100 text-slate-900 shadow'}"
          aria-hidden="true">{slots[i] ?? '?'}</span
        >
      </button>
    {/each}
  </div>

  <p class="text-center text-xl font-bold text-slate-800" aria-live="polite">{reading(slots)}</p>
  {#if sum}
    <p class="text-center text-lg text-slate-700 tabular-nums">{sum}</p>
  {/if}

  <div class="grid grid-cols-5 gap-2" role="group" aria-label="Thẻ chữ số">
    {#each DIGITS as digit (digit)}
      <button
        type="button"
        class="min-h-14 touch-none text-3xl font-bold select-none {picked === digit
          ? button.primary
          : button.quiet}"
        aria-pressed={picked === digit}
        aria-label="Thẻ chữ số {digit}"
        disabled={found}
        onpointerdown={(event) => pressCard(event, digit)}
        onclick={() => tapCard(digit)}>{digit}</button
      >
    {/each}
  </div>

  <p class="text-center text-base text-slate-600">
    Em kéo thẻ vào cột, hoặc chạm thẻ rồi chạm cột. Chạm cột có thẻ để lấy thẻ ra.
  </p>

  <FeedbackNote tone={note.tone} text={note.text} />

  {#if found}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Xếp số khác
      </button>
    </div>
  {/if}
</div>

{#if drag?.moved}
  <div
    class="pointer-events-none fixed z-50 flex h-14 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-amber-200 text-4xl font-bold shadow-lg"
    style:left="{drag.x}px"
    style:top="{drag.y}px"
    aria-hidden="true"
  >
    {drag.digit}
  </div>
{/if}
