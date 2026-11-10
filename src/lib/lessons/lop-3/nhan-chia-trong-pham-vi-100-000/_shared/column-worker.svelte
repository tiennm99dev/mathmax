<script>
  import { tick, untrack } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import ColumnSheet from './column-sheet.svelte';
  import DigitPad from './digit-pad.svelte';
  import KidNote from './kid-note.svelte';
  import { PLACE_NAMES, askFor, drawMul, mulSteps, mulText, sheetAt, wrongFor } from './columns.js';

  /**
   * The learner multiplies a five-digit number by a digit in columns, right
   * to left, tapping the digit of each column. Carries appear on the sheet as
   * they are made. A wrong digit gets a nudge; a second one shows the working.
   * The finished columns are read out in the book's words.
   *
   * - `kinds`: the cases to choose from, each with its first task.
   * - `aside`: an optional picture drawn under the sheet, given the task and
   *   how many columns are finished from the ones.
   * @type {{
   *   kinds: Array<{ value: import('./columns.js').CarryKind, label: string, first: import('./columns.js').Task }>;
   *   aside?: import('svelte').Snippet<[import('./columns.js').Task, number]>;
   * }}
   */
  let { kinds, aside } = $props();

  let kind = $state(untrack(() => kinds[0].value));
  let task = $state(untrack(() => kinds[0].first));
  let done = $state(0);
  let tries = $state(0);
  let slip = $state('');
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const steps = $derived(mulSteps(task.a, task.b));
  const step = $derived(steps[done] ?? null);
  const sheet = $derived(sheetAt(task.a, task.b, done));
  const said = $derived(steps.slice(0, sheet.finished));
  const message = $derived(
    step === null ? `Đúng rồi! ${mulText(task.a, task.b)}.` : slip || askFor(step),
  );
  const tone = $derived(step === null ? 'ok' : slip ? 'warn' : 'info');

  /** @param {import('./columns.js').Task} next */
  function start(next) {
    task = next;
    done = 0;
    tries = 0;
    slip = '';
  }

  /** @param {string | number} next */
  function chooseKind(next) {
    const found = kinds.find((k) => k.value === next);
    if (found) start(found.first);
  }

  /** @param {number} digit */
  async function write(digit) {
    if (!step) return;
    if (digit !== step.digit) {
      tries += 1;
      slip = wrongFor(step, digit, tries);
      return;
    }
    done += 1;
    tries = 0;
    slip = '';
    if (done === steps.length) {
      await tick();
      nextButton?.focus();
    }
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn loại phép nhân"
    hideLabel
    bind:value={kind}
    options={kinds.map(({ value, label }) => ({ value, label }))}
    onchange={chooseKind}
  />

  <div class="flex flex-wrap items-start justify-center gap-4">
    <ColumnSheet a={task.a} b={task.b} {sheet} />
    {#if said.length > 0}
      <ol class="min-w-0 flex-1 basis-56 space-y-2 text-lg font-semibold">
        {#each said as s (s.col)}
          <li class="rounded-xl bg-indigo-50 px-3 py-2 text-indigo-950">{s.say}.</li>
        {/each}
      </ol>
    {/if}
  </div>

  {@render aside?.(task, sheet.finished)}

  <KidNote {tone} text={message} />

  {#if step}
    <DigitPad label="Chọn chữ số viết ở hàng {PLACE_NAMES[step.col]}" onpick={write} />
  {/if}

  <button
    type="button"
    class="min-h-12 text-lg {step === null ? button.primary : button.secondary}"
    bind:this={nextButton}
    onclick={() => start(drawMul(Math.random, kind, task))}>Phép nhân khác</button
  >
</div>
