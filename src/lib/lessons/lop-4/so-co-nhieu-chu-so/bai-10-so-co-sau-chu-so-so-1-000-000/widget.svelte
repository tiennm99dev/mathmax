<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { readBig } from '../_shared/big-numbers.js';
  import {
    CHALLENGES,
    COLUMNS,
    EMPTY,
    challengeNote,
    clear,
    hundredThousands,
    place,
    reading,
    sumLine,
  } from './engine.js';

  const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let slots = $state(EMPTY);
  let round = $state(0);
  /** The digit card picked by a tap, waiting for a column. */
  let picked = $state(/** @type {number | null} */ (null));
  /** Hundred thousands counted so far, 0 to 10. */
  let count = $state(0);

  const target = $derived(CHALLENGES[round % CHALLENGES.length]);
  const note = $derived(challengeNote(slots, target));
  const found = $derived(note.tone === 'ok');
  const sum = $derived(sumLine(slots));
  const counted = $derived(count === 0 ? null : hundredThousands(count));

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

  function next() {
    round += 1;
    slots = EMPTY;
    picked = null;
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Em hãy xếp số: <strong class="text-indigo-700">{readBig(target)}</strong>
  </p>

  <div class="grid grid-cols-6 gap-1" role="group" aria-label="Bảng các hàng">
    {#each COLUMNS as title, i (title)}
      <button
        type="button"
        class="flex min-h-28 min-w-0 flex-col items-center justify-between rounded-2xl border-2 p-1 {picked !==
        null
          ? 'border-indigo-400 bg-indigo-50'
          : 'border-slate-200 bg-white'}"
        aria-label="Cột {title}: {slots[i] === null ? 'trống' : `thẻ ${slots[i]}`}"
        onclick={() => tapColumn(i)}
      >
        <span class="text-center text-xs leading-tight font-bold text-slate-700 sm:text-sm"
          >{title}</span
        >
        <span
          class="flex h-14 w-10 items-center justify-center rounded-xl text-3xl font-bold tabular-nums {slots[
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
    <p class="rounded-2xl bg-slate-50 px-4 py-3 text-center text-lg text-slate-700 tabular-nums">
      {sum}
    </p>
  {/if}

  <div class="grid grid-cols-5 gap-2" role="group" aria-label="Thẻ chữ số">
    {#each DIGITS as digit (digit)}
      <button
        type="button"
        class="min-h-14 text-3xl font-bold {picked === digit ? button.primary : button.quiet}"
        aria-pressed={picked === digit}
        aria-label="Thẻ chữ số {digit}"
        disabled={found}
        onclick={() => (picked = picked === digit ? null : digit)}>{digit}</button
      >
    {/each}
  </div>

  <p class="text-center text-base text-slate-600">
    Em chạm thẻ rồi chạm cột. Chạm cột có thẻ để lấy thẻ ra.
  </p>

  <FeedbackNote tone={note.tone} text={note.text} />

  {#if found}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Xếp số khác
      </button>
    </div>
  {/if}

  <div class="space-y-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3">
    <p class="text-center text-lg font-bold text-emerald-900">Đếm thêm 100 000</p>
    <div class="grid grid-cols-5 gap-1" aria-hidden="true">
      {#each Array.from({ length: 10 }, (_, i) => i) as i (i)}
        <span
          class="flex h-10 min-w-0 items-center justify-center rounded-lg text-xs font-bold {i <
          count
            ? 'bg-emerald-500 text-white'
            : 'border-2 border-dashed border-emerald-300 text-emerald-300'}">100 000</span
        >
      {/each}
    </div>
    <p class="text-center text-lg text-emerald-950 tabular-nums" aria-live="polite">
      {counted ? counted.text : 'Em chạm nút để thêm một trăm nghìn.'}
    </p>
    <div class="flex flex-wrap justify-center gap-2">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        disabled={count >= 10}
        onclick={() => (count += 1)}>Thêm 100 000</button
      >
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        disabled={count === 0}
        onclick={() => (count = 0)}>Đếm lại</button
      >
    </div>
  </div>
</div>
