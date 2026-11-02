<script>
  import { tick } from 'svelte';
  import { button } from '#lib/core/ui.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { exprText } from '#lib/core/kid/column.js';
  import ColumnWorker from './column-worker.svelte';

  /**
   * The widget of a theory lesson: one calculation at a time on the block
   * board, with a button for another. Several `sets` get a switch between them,
   * named by `switchLabel`.
   * @type {{
   *   switchLabel?: string;
   *   sets: ReadonlyArray<{ label: string, problems: readonly import('./problems.js').Problem[] }>;
   * }}
   */
  let { switchLabel = 'Dạng phép tính', sets } = $props();

  let setIndex = $state(0);
  let index = $state(0);
  /** Bumped on "Làm lại", so the same calculation starts again. */
  let run = $state(0);
  /** @type {HTMLParagraphElement | undefined} */
  let heading = $state();

  const problems = $derived(sets[setIndex].problems);
  const problem = $derived(problems[index % problems.length]);

  async function focusHeading() {
    await tick();
    heading?.focus();
  }

  function next() {
    index += 1;
    focusHeading();
  }

  function again() {
    run += 1;
    focusHeading();
  }

  /** @param {string | number} value */
  function chooseSet(value) {
    setIndex = Number(value);
    index = 0;
  }
</script>

<div class="space-y-4">
  {#if sets.length > 1}
    <SegmentedControl
      label={switchLabel}
      options={sets.map((s, i) => ({ value: i, label: s.label }))}
      value={setIndex}
      onchange={chooseSet}
    />
  {/if}

  <p
    bind:this={heading}
    tabindex="-1"
    class="text-center text-4xl font-bold tabular-nums text-slate-800 outline-none"
  >
    {exprText(problem.a, problem.b, problem.op)} = ?
  </p>

  {#key `${setIndex}-${index}-${run}`}
    <ColumnWorker a={problem.a} b={problem.b} op={problem.op} />
  {/key}

  <div class="flex flex-wrap justify-center gap-3">
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={again}>Làm lại</button>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={next}
      >Phép tính khác</button
    >
  </div>
</div>
