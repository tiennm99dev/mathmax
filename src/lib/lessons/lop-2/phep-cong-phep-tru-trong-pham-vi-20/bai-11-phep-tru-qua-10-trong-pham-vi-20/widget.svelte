<script>
  import { rng } from '#lib/core/drill.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import TenFrame from '../_shared/ten-frame.svelte';
  import { downToTen } from '../_shared/facts.js';
  import { canCross, differenceOptions, explain, frameMessage, frames, newPair } from './engine.js';

  // A fixed seed so the prerendered page and the browser agree.
  const rand = rng(11);

  let c = $state(12);
  let b = $state(3);
  /** @type {number[]} */
  let goneFirst = $state([]);
  /** @type {number[]} */
  let goneSecond = $state([]);
  /** @type {number[]} */
  let wrong = $state([]);
  let solved = $state(false);
  let choice = $state(differenceOptions(rng(11), 12, 3));

  const cells = $derived(frames(c, goneFirst, goneSecond));
  const taken = $derived(goneFirst.length + goneSecond.length);
  const ended = $derived(solved || wrong.length > 1);
  const crossing = $derived({ c, b, goneFirst, goneSecond });

  const message = $derived.by(() => {
    if (solved) return `Đúng rồi! ${explain(c, b)}`;
    if (wrong.length > 1) return `Em xem nhé: ${explain(c, b)}`;
    if (wrong.length === 1) {
      return taken < b
        ? `Chưa đúng. Em gạch đủ ${b} chấm rồi đếm số chấm còn lại nhé.`
        : 'Chưa đúng. Em đếm lại các chấm chưa bị gạch nhé.';
    }
    return frameMessage(c, b, taken);
  });

  /** @param {'first' | 'second'} frame @param {number} i */
  function cross(frame, i) {
    if (ended || !canCross(crossing, frame, i)) return;
    if (frame === 'second') goneSecond = [...goneSecond, i];
    else goneFirst = [...goneFirst, i];
  }

  /** Crosses out the next dot: the last one left, second frame first. */
  function crossNext() {
    for (let i = c - 11; i >= 0; i--) {
      if (canCross(crossing, 'second', i)) return cross('second', i);
    }
    for (let i = 9; i >= 0; i--) {
      if (canCross(crossing, 'first', i)) return cross('first', i);
    }
  }

  /** Shows every crossed dot once the question ends. */
  function crossAll() {
    const { first, rest } = downToTen(c, b);
    goneSecond = Array.from({ length: first }, (_, i) => i);
    goneFirst = Array.from({ length: rest }, (_, i) => 9 - i);
  }

  function again() {
    goneFirst = [];
    goneSecond = [];
    wrong = [];
    solved = false;
  }

  function newTask() {
    const next = newPair(rand, { c, b });
    c = next.c;
    b = next.b;
    choice = differenceOptions(rand, c, b);
    again();
  }

  /** @param {number} i */
  function pickOption(i) {
    if (ended || wrong.includes(i)) return;
    if (i === choice.answer) {
      solved = true;
      crossAll();
    } else {
      wrong = [...wrong, i];
      if (wrong.length > 1) crossAll();
    }
  }
</script>

<div class="space-y-4">
  <p class="text-center text-4xl font-bold tabular-nums text-slate-800">
    {c} − {b} =
    <span class={ended ? 'text-emerald-700' : 'text-amber-600'}>{ended ? c - b : '?'}</span>
  </p>

  <div class="flex flex-wrap justify-center gap-4">
    <div class="space-y-1 text-center">
      <p class="text-lg font-semibold text-slate-700">Khung thứ nhất (10 chấm)</p>
      <TenFrame
        cells={cells.first}
        label="Khung thứ nhất"
        onpick={(i) => cross('first', i)}
        canPick={(i) => !ended && canCross(crossing, 'first', i)}
        pickLabel={(i) => `Gạch chấm thứ ${i + 1} ở khung thứ nhất`}
        full={goneFirst.length === 0 && goneSecond.length === c - 10}
      />
    </div>
    <div class="space-y-1 text-center">
      <p class="text-lg font-semibold text-slate-700">Khung thứ hai</p>
      <TenFrame
        cells={cells.second}
        label="Khung thứ hai"
        onpick={(i) => cross('second', i)}
        canPick={(i) => !ended && canCross(crossing, 'second', i)}
        pickLabel={(i) => `Gạch chấm thứ ${i + 1} ở khung thứ hai`}
      />
    </div>
  </div>

  <p class="text-center text-lg font-semibold text-slate-700" aria-hidden="true">
    Đã bớt: <span class="tabular-nums">{taken}</span> / {b} chấm
  </p>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      disabled={ended || taken >= b}
      onclick={crossNext}>Bớt 1 chấm</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={taken === 0 && wrong.length === 0}
      onclick={again}>Làm lại</button
    >
  </div>

  <p class="text-xl font-semibold text-slate-800">{c} − {b} bằng bao nhiêu?</p>
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
