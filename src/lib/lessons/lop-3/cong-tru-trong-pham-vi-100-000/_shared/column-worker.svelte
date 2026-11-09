<script>
  import { tick, untrack } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import ColumnSheet from './column-sheet.svelte';
  import DigitPad from './digit-pad.svelte';
  import KidNote from './kid-note.svelte';
  import {
    PLACE_NAMES,
    askFor,
    borrowLabel,
    drawColumn,
    equation,
    planOf,
    sheetAt,
    stepsOf,
    wrongFor,
  } from './columns.js';

  /**
   * The learner works a calculation within 100 000 in columns, right to left:
   * taps the digit of each column, and in a subtraction first borrows 1 from
   * the next column when the top digit is too small. Carries appear on the
   * sheet as they are made. A wrong digit gets a nudge; a second one shows the
   * working. The finished columns are read out in the book's words.
   *
   * - `op`: '+' or '-'.
   * - `kinds`: the cases to choose from, each with its first task.
   * - `aside`: an optional picture drawn under the sheet, given the task and
   *   how many columns are finished from the ones.
   * @type {{
   *   op: import('./columns.js').Op;
   *   kinds: Array<{ value: import('./columns.js').CarryKind, label: string, first: import('./columns.js').Task }>;
   *   switchLabel: string;
   *   nextLabel: string;
   *   aside?: import('svelte').Snippet<[import('./columns.js').Task, number]>;
   * }}
   */
  let { op, kinds, switchLabel, nextLabel, aside } = $props();

  let kind = $state(untrack(() => kinds[0].value));
  let task = $state(untrack(() => kinds[0].first));
  let done = $state(0);
  let tries = $state(0);
  let slip = $state('');
  /** @type {HTMLDivElement | undefined} */
  let controls = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const plan = $derived(planOf(task.a, task.b, op));
  const action = $derived(plan[done] ?? null);
  const sheet = $derived(sheetAt(task.a, task.b, op, done));
  const said = $derived(stepsOf(task.a, task.b, op).slice(0, sheet.finished));
  const message = $derived(
    action === null ? `Đúng rồi! ${equation(task.a, task.b, op)}.` : slip || askFor(action, op),
  );
  const tone = $derived(action === null ? 'ok' : slip ? 'warn' : 'info');

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

  /** Moves on; the focus follows when the control under it changes. */
  async function advance() {
    const before = action?.type;
    done += 1;
    tries = 0;
    slip = '';
    const after = plan[done]?.type;
    if (before !== after) {
      await tick();
      (after ? controls?.querySelector('button') : nextButton)?.focus();
    }
  }

  /** @param {number} digit */
  function write(digit) {
    if (action?.type !== 'digit') return;
    if (digit !== action.step.digit) {
      tries += 1;
      slip = wrongFor(action.step, op, digit, tries);
      return;
    }
    advance();
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label={switchLabel}
    hideLabel
    bind:value={kind}
    options={kinds.map(({ value, label }) => ({ value, label }))}
    onchange={chooseKind}
  />

  <div class="flex flex-wrap items-start justify-center gap-4">
    <ColumnSheet a={task.a} b={task.b} {op} {sheet} />
    {#if said.length > 0}
      <ol class="min-w-0 flex-1 basis-56 space-y-2 text-lg font-semibold">
        {#each said as step (step.col)}
          <li class="rounded-xl bg-indigo-50 px-3 py-2 text-indigo-950">{step.say}.</li>
        {/each}
      </ol>
    {/if}
  </div>

  {@render aside?.(task, sheet.finished)}

  <KidNote {tone} text={message} />

  <div bind:this={controls}>
    {#if action?.type === 'borrow'}
      <button type="button" class="min-h-14 w-full text-xl {button.primary}" onclick={advance}
        >{borrowLabel(action.step)}</button
      >
    {:else if action}
      <DigitPad label="Chọn chữ số viết ở hàng {PLACE_NAMES[action.step.col]}" onpick={write} />
    {/if}
  </div>

  <button
    type="button"
    class="min-h-12 text-lg {action === null ? button.primary : button.secondary}"
    bind:this={nextButton}
    onclick={() => start(drawColumn(Math.random, op, kind, task))}>{nextLabel}</button
  >
</div>
