<script>
  import Picture from '#lib/core/kid/picture.svelte';
  import { pictures } from '#lib/core/kid/pictures/index.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    MAX_ON_PLATE,
    MAX_PLATES,
    MIN_PLATES,
    TASKS,
    plateMessage,
    readPlates,
  } from './engine.js';

  let round = $state(0);
  let plates = $state([0, 0]);

  const task = $derived(TASKS[round % TASKS.length]);
  const noun = $derived(pictures[task.picture]);
  const read = $derived(readPlates(plates));
  const solved = $derived(
    read.canMultiply && plates[0] === task.each && plates.length === task.plates,
  );
  const message = $derived(plateMessage(plates, task, noun));

  /** @param {number} i @param {number} delta */
  function change(i, delta) {
    const next = plates[i] + delta;
    if (next < 0 || next > MAX_ON_PLATE) return;
    plates[i] = next;
  }

  function addPlate() {
    if (plates.length < MAX_PLATES) plates.push(0);
  }

  function removePlate() {
    if (plates.length > MIN_PLATES) plates.pop();
  }

  function newRound() {
    round += 1;
    plates = [0, 0];
  }

  const big = 'min-h-12 text-lg aria-disabled:cursor-not-allowed aria-disabled:opacity-50';
  const small = `h-12 flex-1 rounded-xl border-2 border-slate-300 bg-white text-2xl font-bold text-slate-800 hover:border-indigo-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 ${focusRing}`;
</script>

<div class="space-y-4">
  <p class="text-xl font-semibold text-slate-800">
    Em xếp {task.plates} đĩa, mỗi đĩa {task.each}
    {noun}.
  </p>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="{big} {button.secondary}"
      aria-disabled={plates.length >= MAX_PLATES}
      onclick={addPlate}>Thêm đĩa</button
    >
    <button
      type="button"
      class="{big} {button.quiet}"
      aria-disabled={plates.length <= MIN_PLATES}
      onclick={removePlate}>Bớt đĩa</button
    >
  </div>

  <ul class="grid grid-cols-2 gap-3 sm:grid-cols-3">
    {#each plates as count, i (i)}
      <li class="rounded-3xl border-4 border-amber-300 bg-amber-50 p-2">
        <p class="text-center text-base font-semibold text-slate-700">Đĩa {i + 1}: {count} quả</p>
        <div class="flex min-h-[4.75rem] flex-wrap content-start justify-center gap-1 py-1">
          {#each { length: count } as _, k (k)}
            <Picture name={task.picture} size={34} decorative />
          {/each}
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            class={small}
            aria-label="Đĩa {i + 1}: bớt 1 {noun}"
            aria-disabled={count === 0}
            onclick={() => change(i, -1)}>−</button
          >
          <button
            type="button"
            class={small}
            aria-label="Đĩa {i + 1}: thêm 1 {noun}"
            aria-disabled={count >= MAX_ON_PLATE}
            onclick={() => change(i, 1)}>+</button
          >
        </div>
      </li>
    {/each}
  </ul>

  <div class="grid gap-2 rounded-2xl bg-slate-50 p-3 text-center tabular-nums">
    <p>
      <span class="block text-base font-semibold text-slate-600">Phép cộng</span>
      <span class="text-2xl font-bold text-slate-700">{read.sum}</span>
    </p>
    <p>
      <span class="block text-base font-semibold text-slate-600">Phép nhân</span>
      <span class="text-3xl font-bold {read.product ? 'text-indigo-700' : 'text-slate-400'}"
        >{read.product ?? '…'}</span
      >
    </p>
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {solved
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if solved}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newRound}>
    Bài khác
  </button>
</div>
