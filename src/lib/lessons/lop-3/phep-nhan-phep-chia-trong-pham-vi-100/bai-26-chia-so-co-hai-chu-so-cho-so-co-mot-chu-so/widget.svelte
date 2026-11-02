<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import DigitPad from '../_shared/digit-pad.svelte';
  import DivisionSheet from '../_shared/division-sheet.svelte';
  import KidNote from '../_shared/kid-note.svelte';
  import {
    asksOf,
    blocksAt,
    firstTask,
    makeTask,
    quotientText,
    sheetRows,
    stageMessage,
    wrongMessage,
  } from './engine.js';

  let kind = $state(/** @type {import('./engine.js').TaskKind} */ ('exact'));
  let task = $state(firstTask('exact'));
  let stage = $state(0);
  let tries = $state(0);
  let slip = $state('');
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const asks = $derived(asksOf(task));
  const done = $derived(stage === asks.length);
  const blocks = $derived(blocksAt(task, stage));
  const quotient = $derived(quotientText(task, stage));
  const message = $derived(slip || stageMessage(task, stage));
  const tone = $derived(done ? 'ok' : slip ? 'warn' : 'info');
  const columns = $derived(
    task.d === 2 ? 'grid-cols-2' : task.d === 3 ? 'grid-cols-3' : 'grid-cols-4',
  );

  /** @param {import('./engine.js').Task} next */
  function start(next) {
    task = next;
    stage = 0;
    tries = 0;
    slip = '';
  }

  /** @param {string | number} next */
  function chooseKind(next) {
    kind = /** @type {import('./engine.js').TaskKind} */ (next);
    start(firstTask(kind));
  }

  /** @param {number} digit */
  async function write(digit) {
    if (digit !== asks[stage].answer) {
      tries += 1;
      slip = wrongMessage(task, stage, digit, tries);
      return;
    }
    stage += 1;
    tries = 0;
    slip = '';
    if (stage === asks.length) {
      await tick();
      nextButton?.focus();
    }
  }
</script>

{#snippet blockRow(/** @type {number} */ tens, /** @type {number} */ ones)}
  <div class="flex min-h-11 flex-wrap items-end justify-center gap-1">
    {#each { length: tens } as _, i (i)}
      <span class="block h-11 w-2.5 rounded-sm border border-indigo-900 bg-indigo-400"></span>
    {/each}
    {#each { length: ones } as _, i (i)}
      <span class="block h-2.5 w-2.5 rounded-sm border border-amber-800 bg-amber-300"></span>
    {/each}
  </div>
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Chọn loại phép chia"
    hideLabel
    bind:value={kind}
    options={[
      { value: 'exact', label: 'Chia hết' },
      { value: 'rest', label: 'Chia có dư' },
    ]}
    onchange={chooseKind}
  />

  <div class="flex justify-center">
    <DivisionSheet
      rows={sheetRows(task, stage)}
      divisor={task.d}
      {quotient}
      label="Đặt tính {task.n} chia {task.d}. Thương đã viết: {quotient || 'chưa có'}."
    />
  </div>

  <div class="rounded-2xl bg-sky-50 p-3">
    <p class="mb-1 text-center text-lg font-semibold text-slate-700">Chưa chia</p>
    <div
      role="img"
      aria-label="Chưa chia: {blocks.pileTens} thanh chục và {blocks.pileOnes} khối đơn vị."
    >
      {@render blockRow(blocks.pileTens, blocks.pileOnes)}
    </div>
  </div>

  <div
    class="grid gap-2 {columns}"
    role="img"
    aria-label="{task.d} phần bằng nhau, mỗi phần {blocks.perTens} thanh chục và {blocks.perOnes} khối đơn vị."
  >
    {#each { length: task.d } as _, i (i)}
      <div class="rounded-xl border-2 border-indigo-300 bg-white p-2">
        {@render blockRow(blocks.perTens, blocks.perOnes)}
      </div>
    {/each}
  </div>

  <KidNote {tone} text={message} />

  {#if !done}
    <DigitPad label="Chọn chữ số" onpick={write} />
  {/if}

  <button
    type="button"
    class="min-h-12 text-lg {done ? button.primary : button.secondary}"
    bind:this={nextButton}
    onclick={() => start(makeTask(Math.random, kind, task))}>Phép chia khác</button
  >
</div>
