<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import {
    CAPTIONS,
    KINDS,
    boxMessage,
    dotRows,
    dotsOf,
    firstTask,
    judge,
    makeTask,
  } from './engine.js';

  const KIND_OPTIONS = /** @type {import('./engine.js').TaskKind[]} */ ([
    'thua-so',
    'so-bi-chia',
    'so-chia',
  ]).map((value) => ({ value, label: KINDS[value].label }));

  let kind = $state(/** @type {import('./engine.js').TaskKind} */ ('thua-so'));
  let task = $state(firstTask('thua-so'));
  let guess = $state(1);

  const solved = $derived(judge(task, guess) === 'right');
  const rows = $derived(dotRows(task, guess));
  const message = $derived(boxMessage(task, guess));
  const steps = $derived(task.maxGuess > 20 ? [-10, -1, 1, 10] : [-1, 1]);

  /** @param {string | number} next */
  function chooseKind(next) {
    kind = /** @type {import('./engine.js').TaskKind} */ (next);
    task = firstTask(kind);
    guess = 1;
  }

  function newTask() {
    task = makeTask(Math.random, kind, task);
    guess = 1;
  }

  /** @param {number} delta */
  function move(delta) {
    guess = Math.max(1, Math.min(task.maxGuess, guess + delta));
  }

  const DOT = /** @type {const} */ ({
    in: 'bg-indigo-500',
    empty: 'border-2 border-slate-400 bg-white',
    extra: 'bg-rose-400',
  });
  const stepClass = `min-h-14 min-w-14 flex-1 px-1 text-xl tabular-nums ${button.quiet}`;
</script>

{#snippet part(/** @type {number | null} */ value)}
  {#if value === null}
    <span
      class="inline-flex h-14 min-w-14 items-center justify-center rounded-xl border-4 px-1 {solved
        ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
        : 'border-amber-500 bg-amber-200 text-amber-950'}"
    >
      {solved ? guess : '?'}
    </span>
  {:else}
    <span>{value}</span>
  {/if}
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Chọn cách tìm"
    hideLabel
    bind:value={kind}
    options={KIND_OPTIONS}
    onchange={chooseKind}
  />

  <p class="flex items-center justify-center gap-2 text-4xl font-bold tabular-nums text-slate-800">
    {@render part(task.before)}
    <span>{task.op}</span>
    {@render part(task.after)}
    <span>=</span>
    <span>{task.result}</span>
  </p>

  <div
    class="flex flex-col items-center gap-1 rounded-2xl bg-sky-50 p-2"
    role="img"
    aria-label="Em cần {task.target} chấm, số đang thử cho {dotsOf(
      task,
      guess,
    )} chấm, mỗi hàng {task.perRow} chấm."
  >
    {#each rows as line, r (r)}
      <div class="flex gap-1">
        {#each line as dot, i (i)}
          <span class="block h-4 w-4 rounded-full {DOT[dot]}"></span>
        {/each}
      </div>
    {/each}
  </div>
  <p class="text-center text-lg font-semibold text-slate-600">{CAPTIONS[task.kind]}</p>

  <div class="rounded-2xl border-2 border-slate-200 p-3">
    <p class="mb-2 text-center text-xl font-semibold text-slate-800">
      Em thử số trong hộp là:
      <span class="text-3xl font-bold tabular-nums text-indigo-700">{guess}</span>
    </p>
    <div class="flex gap-2" role="group" aria-label="Đổi số thử">
      {#each steps as d (d)}
        <button
          type="button"
          class={stepClass}
          aria-label="{d > 0 ? 'Thêm' : 'Bớt'} {Math.abs(d)}"
          onclick={() => move(d)}>{d > 0 ? `+${d}` : `−${-d}`}</button
        >
      {/each}
    </div>
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {solved
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if solved}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  <button
    type="button"
    class="min-h-12 text-lg {solved ? button.primary : button.secondary}"
    onclick={newTask}>Bài khác</button
  >
</div>
