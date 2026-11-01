<script>
  import { tick } from 'svelte';
  import { rng } from '#lib/core/drill.js';
  import { MINUS } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import CountingSticks from '#lib/core/kid/counting-sticks.svelte';
  import CarryBoard from '../_shared/carry-board.svelte';
  import { carryText, freshCarry } from '../_shared/carry.js';
  import { canTake, differenceOptions, table, tableMessage } from './engine.js';

  // A fixed seed so the prerendered page and the browser agree.
  const rand = rng(22);

  let a = $state(42);
  let b = $state(7);
  let untied = $state(false);
  let taken = $state(0);
  /** @type {number[]} */
  let wrong = $state([]);
  let solved = $state(false);
  let choice = $state(differenceOptions(rng(22), 42, 7));
  /** @type {HTMLButtonElement | undefined} */
  let takeButton = $state();
  /** @type {HTMLButtonElement | undefined} */
  let untieButton = $state();
  /** @type {HTMLDivElement | undefined} */
  let answers = $state();

  const t = $derived(table(a, b, untied, taken));
  const open = $derived(canTake(t));
  const allOut = $derived(t.left === 0);
  const ended = $derived(solved || wrong.length > 1);

  const message = $derived.by(() => {
    if (solved) return `Đúng rồi! ${carryText(a, b, '-')}`;
    if (wrong.length > 1) return `Em xem nhé: ${carryText(a, b, '-')}`;
    if (wrong.length === 1) {
      return allOut
        ? `Chưa đúng. Em đếm số que chưa bị gạch: ${t.tens} chục và ${t.ones - t.taken} que rời.`
        : 'Chưa đúng. Em bớt hết số que cần bớt rồi đếm số que còn lại nhé.';
    }
    return tableMessage(a, b, untied, taken);
  });

  async function takeOne() {
    if (!open) return;
    taken += 1;
    await tick();
    if (taken === b) answers?.querySelector('button')?.focus();
    else if (!canTake(table(a, b, untied, taken))) untieButton?.focus();
  }

  async function untie() {
    if (untied) return;
    untied = true;
    await tick();
    takeButton?.focus();
  }

  function reset() {
    untied = false;
    taken = 0;
    wrong = [];
    solved = false;
  }

  function newTask() {
    const next = freshCarry(rand, 'sub-one', { a, b });
    a = next.a;
    b = next.b;
    reset();
    choice = differenceOptions(rand, a, b);
  }

  function finish() {
    untied = true;
    taken = b;
  }

  /** @param {number} i */
  function pickOption(i) {
    if (ended || wrong.includes(i)) return;
    if (i === choice.answer) {
      solved = true;
      finish();
    } else {
      wrong = [...wrong, i];
      if (wrong.length > 1) finish();
    }
  }
</script>

<div class="space-y-4">
  <p class="text-center text-4xl font-bold tabular-nums text-slate-800">
    {a}
    {MINUS}
    {b} =
    <span class={ended ? 'text-emerald-700' : 'text-amber-600'}>{ended ? a - b : '?'}</span>
  </p>

  <div class="space-y-2 rounded-3xl bg-amber-50 p-3">
    <p class="text-lg font-semibold text-slate-700">
      {t.tens} chục và {t.ones - t.taken} que rời · đã bớt {t.taken} / {b} que
    </p>
    <CountingSticks
      tens={t.tens}
      ones={t.ones}
      crossOnes={t.taken}
      highlight={!untied && !open ? 'tens' : 'ones'}
    />
  </div>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      bind:this={takeButton}
      disabled={!open}
      onclick={takeOne}>Bớt 1 que</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      bind:this={untieButton}
      disabled={untied}
      onclick={untie}>Tháo 1 bó chục</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={!untied && taken === 0 && wrong.length === 0}
      onclick={reset}>Làm lại</button
    >
  </div>

  <p class="text-xl font-semibold text-slate-800">{a} {MINUS} {b} bằng bao nhiêu?</p>
  <div bind:this={answers} role="group" aria-label="Chọn kết quả" class="flex flex-wrap gap-3">
    {#each choice.options as v, i (v)}
      <button
        type="button"
        class="h-16 min-w-16 rounded-2xl border-4 px-3 text-3xl font-bold tabular-nums transition motion-reduce:transition-none {focusRing} {solved &&
        i === choice.answer
          ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
          : wrong.includes(i)
            ? 'border-rose-400 bg-rose-50 text-rose-700 line-through'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
        aria-disabled={wrong.includes(i) || ended}
        onclick={() => pickOption(i)}>{v}</button
      >
    {/each}
  </div>

  {#if ended}
    <div class="flex justify-center">
      <CarryBoard
        {a}
        {b}
        op="-"
        written={{ tens: Math.floor((a - b) / 10), ones: (a - b) % 10 }}
        carried
      />
    </div>
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {solved
      ? 'bg-emerald-100 text-emerald-900'
      : wrong.length > 0
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if solved}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newTask}>
    Phép tính khác
  </button>
</div>
