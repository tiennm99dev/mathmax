<script>
  import { tick } from 'svelte';
  import { rng } from '#lib/core/drill.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import CountingSticks from '#lib/core/kid/counting-sticks.svelte';
  import ColumnBoard from '#lib/core/kid/column-board.svelte';
  import { carryText, freshCarry } from '#lib/core/kid/carry.js';
  import { sumOptions, table, tableMessage } from './engine.js';

  // A fixed seed so the prerendered page and the browser agree.
  const rand = rng(19);

  let a = $state(35);
  let b = $state(7);
  let added = $state(0);
  /** @type {number[]} */
  let wrong = $state([]);
  let solved = $state(false);
  let choice = $state(sumOptions(rng(19), 35, 7));
  /** @type {HTMLDivElement | undefined} */
  let answers = $state();
  /** @type {HTMLButtonElement | undefined} */
  let addButton = $state();

  const t = $derived(table(a, b, added));
  const allIn = $derived(t.left === 0);
  const ended = $derived(solved || wrong.length > 1);

  const message = $derived.by(() => {
    if (solved) return `Đúng rồi! ${carryText(a, b, '+')}`;
    if (wrong.length > 1) return `Em xem nhé: ${carryText(a, b, '+')}`;
    if (wrong.length === 1) {
      return allIn
        ? `Chưa đúng. Em đếm: ${t.tens} chục và ${t.ones} que rời. Đừng quên bó chục mới nhé.`
        : 'Chưa đúng. Em thêm hết que tính rồi đếm số bó và số que rời nhé.';
    }
    return tableMessage(a, b, added);
  });

  async function addOne() {
    if (allIn) return;
    added += 1;
    if (added === b) {
      await tick();
      answers?.querySelector('button')?.focus();
    }
  }

  function newTask() {
    const next = freshCarry(rand, 'add-one', { a, b });
    a = next.a;
    b = next.b;
    added = 0;
    wrong = [];
    solved = false;
    choice = sumOptions(rand, a, b);
  }

  async function again() {
    added = 0;
    wrong = [];
    solved = false;
    // "Làm lại" is disabled now, so hand the focus to "Thêm 1 que".
    await tick();
    addButton?.focus();
  }

  /** @param {number} i */
  function pickOption(i) {
    if (ended || wrong.includes(i)) return;
    if (i === choice.answer) {
      solved = true;
      added = b;
    } else {
      wrong = [...wrong, i];
      if (wrong.length > 1) added = b;
    }
  }
</script>

<div class="space-y-4">
  <p class="text-center text-4xl font-bold tabular-nums text-slate-800">
    {a} + {b} =
    <span class={ended ? 'text-emerald-700' : 'text-amber-600'}>{ended ? a + b : '?'}</span>
  </p>

  <div class="grid gap-3 sm:grid-cols-[1fr_auto]">
    <div class="space-y-2 rounded-3xl bg-amber-50 p-3">
      <p class="text-lg font-semibold text-slate-700">
        Trên bàn: {t.tens} chục và {t.ones} que rời
      </p>
      <CountingSticks tens={t.tens} ones={t.ones} highlight={t.tied ? 'tens' : 'ones'} />
    </div>
    <div class="space-y-2 rounded-3xl bg-sky-50 p-3">
      <p class="text-lg font-semibold text-slate-700">Còn thêm: {t.left} que</p>
      {#if t.left > 0}
        <CountingSticks tens={0} ones={t.left} tone="sky" />
      {:else}
        <p class="text-lg text-slate-600">Đã thêm hết que tính.</p>
      {/if}
    </div>
  </div>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      bind:this={addButton}
      disabled={allIn}
      onclick={addOne}>Thêm 1 que</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={added === 0 && wrong.length === 0}
      onclick={again}>Làm lại</button
    >
  </div>

  <p class="text-xl font-semibold text-slate-800">{a} + {b} bằng bao nhiêu?</p>
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
      <ColumnBoard
        {a}
        {b}
        op="+"
        written={{ tens: Math.floor((a + b) / 10), ones: (a + b) % 10 }}
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
