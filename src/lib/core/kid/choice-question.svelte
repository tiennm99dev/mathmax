<script>
  import { button, focusRing } from '#lib/core/ui.js';
  import { isSettled, optionName, optionText } from './quiz.js';

  /**
   * One kid tap-the-answer question: the prompt, an optional picture, large
   * option buttons and the feedback line. A wrong first tap shows the hint
   * and a second try; a second miss shows the answer. The parent keeps the
   * state (`tapOption` in `quiz.js` moves it on) and calls `focus()` to move
   * keyboard focus to the prompt of a new question. Once a question settles
   * its options leave the tab order, so Tab from the tapped option reaches the
   * next button. Used by
   * `choice-round.svelte` and `adaptive-quiz.svelte`.
   *
   * - `q`: the question (`KidQuestion` in `quiz.js`).
   * - `phase`, `wrong`: where the question is and the options tried.
   * - `onchoose(i)`: an option was tapped; `onnext()`: the next button.
   * - `nextLabel`: what the next button says once the question ends.
   * - `visual`: snippet drawing the question's picture, given the question
   *   and whether it has ended; it is drawn afresh for each question.
   * - `option`: snippet drawing an option's face, given the option and index;
   *   without it the button shows the option's text.
   * - `pictureOption`: which options are pictures, drawn in a square button.
   * - `listOptions`: which questions have sentence options, one per row.
   * @type {{
   *   q: import('./quiz.js').KidQuestion<any>;
   *   phase: import('./quiz.js').Phase;
   *   wrong: number[];
   *   onchoose: (i: number) => void;
   *   onnext: () => void;
   *   nextLabel: string;
   *   visual?: import('svelte').Snippet<[any, boolean]>;
   *   option?: import('svelte').Snippet<[any, number]>;
   *   pictureOption?: (option: import('./quiz.js').KidOption) => boolean;
   *   listOptions?: (q: any) => boolean;
   * }}
   */
  let { q, phase, wrong, onchoose, onnext, nextLabel, visual, option, pictureOption, listOptions } =
    $props();

  /** @type {HTMLHeadingElement | undefined} */
  let heading = $state();

  /** Moves keyboard focus to the prompt. */
  export function focus() {
    heading?.focus();
  }

  const settled = $derived(isSettled(phase));
  const long = $derived(q.options.some((o) => optionText(o).length > 3));
  const list = $derived(listOptions?.(q) ?? false);

  /** @param {number} i */
  function optionClass(i) {
    const picture = Boolean(option && pictureOption?.(q.options[i]));
    const shape = picture
      ? 'flex h-24 w-24 items-center justify-center p-1'
      : list
        ? 'min-h-16 px-4 text-left text-lg'
        : long
          ? 'min-h-16 min-w-16 px-4 text-xl'
          : 'min-h-16 min-w-16 px-3 text-3xl tabular-nums';
    // Once settled the colours change at once: a fading answer reads as not
    // yet marked beside the "Đáp án" line.
    const base = `${shape} rounded-2xl border-4 font-bold ${settled ? '' : 'transition'} ${focusRing}`;
    if (settled && i === q.answer) {
      return picture
        ? `${base} border-emerald-600 bg-emerald-100 text-emerald-900`
        : `${base} border-emerald-600 bg-emerald-600 text-white`;
    }
    if (wrong.includes(i)) {
      return picture
        ? `${base} border-rose-400 bg-rose-50 text-rose-700 opacity-60`
        : `${base} border-rose-400 bg-rose-50 text-rose-700 line-through`;
    }
    return `${base} border-slate-300 bg-white text-slate-800 hover:border-indigo-400`;
  }
</script>

<h3 bind:this={heading} tabindex="-1" class="text-2xl font-bold text-slate-900 outline-none">
  {q.prompt}
</h3>

{#key q}
  {@render visual?.(q, settled)}
{/key}

<div role="group" aria-label="Chọn đáp án" class={list ? 'grid gap-3' : 'flex flex-wrap gap-3'}>
  {#each q.options as opt, i (i)}
    <button
      type="button"
      class={optionClass(i)}
      aria-label={optionName(q, i)}
      aria-disabled={settled || wrong.includes(i)}
      tabindex={settled ? -1 : undefined}
      onclick={() => onchoose(i)}
    >
      {#if option}{@render option(opt, i)}{:else}{optionText(opt)}{/if}
    </button>
  {/each}
</div>

<p
  class="rounded-2xl px-4 py-3 text-xl font-semibold {phase === 'right'
    ? 'bg-emerald-100 text-emerald-900'
    : phase === 'ask'
      ? 'bg-slate-100 text-slate-800'
      : 'bg-amber-100 text-amber-900'}"
  aria-live="polite"
>
  {#if phase === 'ask'}
    Em chạm vào đáp án đúng.
  {:else if phase === 'retry'}
    Chưa đúng. Gợi ý: {q.hint} Em thử lại nhé.
  {:else if phase === 'right'}
    <span aria-hidden="true">⭐ </span>Đúng rồi! {q.solution}
  {:else}
    Đáp án: {q.solution}
  {/if}
</p>

{#if settled}
  <button type="button" class="min-h-12 text-lg {button.primary}" onclick={onnext}>
    {nextLabel}
  </button>
{/if}
