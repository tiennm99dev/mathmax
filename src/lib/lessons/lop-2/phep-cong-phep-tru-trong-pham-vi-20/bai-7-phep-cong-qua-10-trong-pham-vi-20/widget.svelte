<script>
  import { rng } from '#lib/core/drill.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import TenFrame from '../_shared/ten-frame.svelte';
  import { makeTen } from '../_shared/facts.js';
  import { canMove, explain, frameMessage, frames, newPair, sumOptions } from './engine.js';

  // A fixed seed so the prerendered page and the browser agree.
  const rand = rng(7);

  let a = $state(9);
  let b = $state(5);
  let moved = $state(0);
  /** @type {number[]} */
  let wrong = $state([]);
  let solved = $state(false);
  let choice = $state(sumOptions(rng(7), 9, 5));

  const cells = $derived(frames(a, b, moved));
  const split = $derived(makeTen(a, b));
  const open = $derived(canMove(a, moved));
  const ended = $derived(solved || wrong.length > 1);

  const message = $derived.by(() => {
    if (solved) return `Đúng rồi! ${explain(a, b)}`;
    if (wrong.length > 1) return `Em xem nhé: ${explain(a, b)}`;
    if (wrong.length === 1) {
      return open
        ? 'Chưa đúng. Em chuyển chấm xanh cho đủ 10 chấm ở khung thứ nhất rồi đếm tiếp nhé.'
        : `Chưa đúng. 10 chấm và ${split.rest} chấm nữa là bao nhiêu chấm?`;
    }
    return frameMessage(a, b, moved);
  });

  function moveOne() {
    if (open && moved < b) moved += 1;
  }

  function newTask() {
    const next = newPair(rand, { a, b });
    a = next.a;
    b = next.b;
    moved = 0;
    wrong = [];
    solved = false;
    choice = sumOptions(rand, a, b);
  }

  function again() {
    moved = 0;
    wrong = [];
    solved = false;
  }

  /** @param {number} i */
  function pickOption(i) {
    if (ended || wrong.includes(i)) return;
    if (i === choice.answer) {
      solved = true;
      moved = split.fill;
    } else {
      wrong = [...wrong, i];
      if (wrong.length > 1) moved = split.fill;
    }
  }
</script>

<div class="space-y-4">
  <p class="text-center text-4xl font-bold tabular-nums text-slate-800">
    {a} + {b} =
    <span class={ended ? 'text-emerald-700' : 'text-amber-600'}>{ended ? a + b : '?'}</span>
  </p>

  <div class="flex flex-wrap justify-center gap-4">
    <div class="space-y-1 text-center">
      <p class="text-lg font-semibold text-slate-700">Khung thứ nhất</p>
      <TenFrame cells={cells.first} label="Khung thứ nhất" full={!open} />
    </div>
    <div class="space-y-1 text-center">
      <p class="text-lg font-semibold text-slate-700">Khung thứ hai</p>
      <TenFrame
        cells={cells.second}
        label="Khung thứ hai"
        onpick={moveOne}
        canPick={(i) => open && cells.second[i] === 'blue'}
        pickLabel={() => 'Chuyển một chấm xanh sang khung thứ nhất'}
      />
    </div>
  </div>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      disabled={!open}
      onclick={moveOne}>Chuyển 1 chấm xanh</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={moved === 0 && wrong.length === 0}
      onclick={again}>Làm lại</button
    >
  </div>

  <p class="text-xl font-semibold text-slate-800">{a} + {b} bằng bao nhiêu?</p>
  <div role="group" aria-label="Chọn kết quả" class="flex flex-wrap gap-3">
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
