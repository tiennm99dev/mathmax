<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import DigitPad from '../_shared/digit-pad.svelte';
  import KidNote from '../_shared/kid-note.svelte';
  import DivisionSheet from './division-sheet.svelte';
  import {
    firstTask,
    makeTask,
    quotientText,
    roundLines,
    sheetRows,
    stageMessage,
    stepsOf,
    wrongMessage,
  } from './engine.js';

  let kind = $state(/** @type {import('./engine.js').TaskKind} */ ('exact'));
  let task = $state(firstTask('exact'));
  let stage = $state(0);
  let tries = $state(0);
  let slip = $state('');
  /** @type {HTMLDivElement | undefined} */
  let controls = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const steps = $derived(stepsOf(task));
  const done = $derived(stage === steps.length);
  const step = $derived(done ? null : steps[stage]);
  const quotient = $derived(quotientText(task, stage));
  const lines = $derived(roundLines(task, stage));
  const message = $derived(slip || stageMessage(task, stage));
  const tone = $derived(done ? 'ok' : slip ? 'warn' : 'info');

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

  /** The control just pressed may be gone, so focus moves to what replaced it. */
  async function advance() {
    const before = step?.kind === 'down';
    stage += 1;
    tries = 0;
    slip = '';
    const after = step?.kind === 'down';
    if (done || before !== after) {
      await tick();
      (done ? nextButton : controls?.querySelector('button'))?.focus();
    }
  }

  /** @param {number} digit */
  function write(digit) {
    if (!step) return;
    if (digit !== step.answer) {
      tries += 1;
      slip = wrongMessage(task, stage, digit, tries);
      return;
    }
    advance();
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn loại phép chia"
    hideLabel
    bind:value={kind}
    options={[
      { value: 'exact', label: 'Chia hết' },
      { value: 'rest', label: 'Có dư' },
      { value: 'zero', label: 'Thương có số 0' },
      { value: 'two', label: 'Lấy hai chữ số' },
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

  <ul class="space-y-2 text-lg font-semibold tabular-nums">
    {#each lines as line, i (i)}
      <li class="rounded-xl bg-indigo-50 px-3 py-2 text-indigo-950">{line}</li>
    {/each}
  </ul>

  <KidNote {tone} text={message} />

  <div bind:this={controls}>
    {#if step?.kind === 'down'}
      <button type="button" class="min-h-14 w-full text-xl {button.primary}" onclick={advance}
        >Hạ {step.answer} xuống</button
      >
    {:else if step}
      <DigitPad label="Chọn chữ số" onpick={write} />
    {/if}
  </div>

  <button
    type="button"
    class="min-h-12 text-lg {done ? button.primary : button.secondary}"
    bind:this={nextButton}
    onclick={() => start(makeTask(Math.random, kind, task))}>Phép chia khác</button
  >
</div>
