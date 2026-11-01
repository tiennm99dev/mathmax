<script generics="Q extends import('./quiz.js').KidQuestion<any>">
  import { tick } from 'svelte';
  import { button } from '#lib/core/ui.js';
  import ChoiceQuestion from './choice-question.svelte';
  import { tapOption, weakLabels } from './quiz.js';

  /**
   * A fixed kid practice round of tap-the-answer questions, the mixed
   * practice of a "Luyện tập chung" lesson. A row of dots shows each
   * question's first try; a wrong first tap shows a hint and a second try, a
   * second miss shows the answer. The end card gives the first-try score and
   * the parts to review, and "Làm bộ bài khác" builds a new round.
   *
   * - `build(seed)`: the round's questions, each with a `kind`. The first
   *   round uses seed 1, so the prerendered page and the browser agree.
   * - `labels`: kind → what it practises, in the order the review lists them.
   * - `allGood`: what the end card says when every first try was right.
   * - `visual`, `option`, `pictureOption`, `listOptions`: as in `choice-question.svelte`.
   * @type {{
   *   build: (seed: number) => Q[];
   *   labels: Readonly<Record<string, string>>;
   *   allGood: string;
   *   visual?: import('svelte').Snippet<[Q, boolean]>;
   *   option?: import('svelte').Snippet<[any, number]>;
   *   pictureOption?: (option: import('./quiz.js').KidOption) => boolean;
   *   listOptions?: (q: Q) => boolean;
   * }}
   */
  let { build, labels, allGood, visual, option, pictureOption, listOptions } = $props();

  let seed = $state(1);
  let index = $state(0);
  /** @type {Array<boolean | null>} */
  let firstTry = $state([]);
  /** Options already tried and wrong for the current question. */
  /** @type {number[]} */
  let wrong = $state([]);
  let phase = $state(/** @type {import('./quiz.js').Phase} */ ('ask'));
  /** @type {ReturnType<typeof ChoiceQuestion> | undefined} */
  let question = $state();
  /** @type {HTMLDivElement | undefined} */
  let summary = $state();

  const round = $derived(build(seed));
  const finished = $derived(index >= round.length);
  const q = $derived(finished ? null : round[index]);
  const score = $derived(firstTry.filter((r) => r === true).length);
  const weak = $derived(weakLabels(round, firstTry, labels));

  /** @param {number} option */
  function choose(option) {
    if (!q) return;
    const step = tapOption({ phase, wrong }, option, q.answer);
    if (step.first !== null) firstTry[index] = step.first;
    phase = step.phase;
    wrong = step.wrong;
  }

  async function next() {
    index += 1;
    wrong = [];
    phase = 'ask';
    await tick();
    if (question) question.focus();
    else summary?.focus();
  }

  async function again() {
    seed += 1;
    index = 0;
    firstTry = [];
    wrong = [];
    phase = 'ask';
    await tick();
    question?.focus();
  }

  /** @param {number} i */
  function dotText(i) {
    if (firstTry[i] === true) return 'đúng ngay';
    if (firstTry[i] === false) return 'cần thử lại';
    return 'chưa làm';
  }
</script>

<div class="space-y-5">
  <div class="flex flex-wrap items-center justify-between gap-3">
    <p class="text-base font-semibold text-slate-600">
      {#if q}Câu {index + 1} / {round.length} · {labels[q.kind ?? ''] ?? ''}{:else}Xong bộ bài{/if}
    </p>
    <ol class="flex gap-1" aria-label="Kết quả từng câu">
      {#each round as _, i (i)}
        <li
          class="h-3 w-3 rounded-full {firstTry[i] === true
            ? 'bg-emerald-500'
            : firstTry[i] === false
              ? 'bg-amber-400'
              : i === index
                ? 'bg-indigo-500'
                : 'bg-slate-200'}"
          aria-label="Câu {i + 1}: {dotText(i)}"
        ></li>
      {/each}
    </ol>
  </div>

  {#if q}
    <ChoiceQuestion
      bind:this={question}
      {q}
      {phase}
      {wrong}
      onchoose={choose}
      onnext={next}
      nextLabel={index + 1 < round.length ? 'Câu tiếp' : 'Xem kết quả'}
      {visual}
      {option}
      {pictureOption}
      {listOptions}
    />
  {:else}
    <div
      bind:this={summary}
      tabindex="-1"
      class="rounded-2xl bg-emerald-50 px-4 py-4 text-xl text-emerald-950 outline-none"
      aria-live="polite"
    >
      <p class="font-bold">
        <span aria-hidden="true">⭐ </span>Em làm đúng ngay {score} / {round.length} câu.
      </p>
      <p class="mt-2 text-lg">
        {weak.length > 0 ? `Em ôn lại: ${weak.join(', ')}.` : allGood}
      </p>
    </div>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={again}>
      Làm bộ bài khác
    </button>
  {/if}
</div>
