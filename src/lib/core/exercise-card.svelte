<script>
  import RichText from './rich-text.svelte';
  import HintLadder from './hint-ladder.svelte';
  import OrderInput from './order-input.svelte';
  import MatchInput from './match-input.svelte';
  import Picture from './kid/picture.svelte';
  import { pictures } from './kid/pictures.js';
  import { checkAnswer } from './answer-check.js';
  import { scrambledOrder } from './practice-state.js';
  import { practice as copy } from './copy.vi.js';
  import { button, card, focusRing, textInput } from './ui.js';

  /** @typedef {import('./answer-check.js').CheckResult} CheckResult */

  /**
   * One practice exercise: prompt, the input its type needs, a check button
   * with feedback, and the hint ladder. Rich fields arrive as HTML.
   * @type {{
   *   exercise: import('./content-schema.js').Exercise;
   *   n: number;
   *   solved?: boolean;
   *   onsolved?: () => void;
   * }}
   */
  let { exercise, n, solved = false, onsolved } = $props();

  const id = $props.id();
  const promptId = `${id}-prompt`;
  const feedbackId = `${id}-feedback`;

  const initialOrder = () => (exercise.type === 'order' ? scrambledOrder(exercise.answer) : []);

  let typed = $state('');
  /** @type {number | null} */
  let picked = $state(null);
  /** @type {number[]} */
  let checked = $state([]);
  let arrangement = $state(initialOrder());
  /** @type {Array<[number, number]>} */
  let pairs = $state([]);
  let result = $state(/** @type {CheckResult | null} */ (null));

  const correct = $derived(result?.correct ?? false);

  /**
   * Number cards for a count exercise: the authored choices, else 0-10, else
   * the run of ten that holds the answer.
   * @param {number} answer
   */
  function decade(answer) {
    const start = answer <= 10 ? 0 : Math.floor((answer - 1) / 10) * 10 + 1;
    const end = answer <= 10 ? 10 : start + 9;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  function response() {
    switch (exercise.type) {
      case 'number':
      case 'fraction':
      case 'text':
        return typed;
      case 'choice':
      case 'count':
        return picked;
      case 'multi':
        return checked;
      case 'order':
        return arrangement;
      case 'match':
        return pairs;
    }
  }

  function check() {
    result = checkAnswer(exercise, response());
    if (result.correct) onsolved?.();
  }

  function retry() {
    typed = '';
    picked = null;
    checked = [];
    arrangement = initialOrder();
    pairs = [];
    result = null;
  }

  /** Drops stale feedback as soon as the learner changes a wrong answer. */
  function edited() {
    if (result && !result.correct) result = null;
  }

  /** @param {SubmitEvent} event */
  function submit(event) {
    event.preventDefault();
    if (!correct) check();
  }

  const option = `flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border-2 border-slate-200 bg-white px-3 py-2 transition hover:border-indigo-300 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-indigo-500 has-[:disabled]:cursor-default in-[.kid]:min-h-12`;
</script>

<article class="{card} p-4 sm:p-5" aria-labelledby={promptId}>
  <div class="mb-2 flex items-center justify-between gap-3">
    <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">
      {copy.exercise(n)}
    </h3>
    {#if solved}
      <span class="flex items-center gap-1 text-sm font-semibold text-emerald-700">
        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" fill="currentColor"
          ><path
            d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z"
          /></svg
        >
        {copy.done}
      </span>
    {/if}
  </div>

  <RichText
    as="p"
    id={promptId}
    html={exercise.prompt}
    class="mb-3 leading-relaxed text-slate-900"
  />

  <form class="space-y-3" onsubmit={submit} novalidate>
    {#if exercise.type === 'number' || exercise.type === 'fraction' || exercise.type === 'text'}
      <div class="flex items-center gap-2">
        <input
          type="text"
          class="{textInput} max-w-xs"
          aria-labelledby={promptId}
          aria-describedby={feedbackId}
          aria-invalid={result !== null && !correct}
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          inputmode={exercise.type === 'number' && exercise.answer >= 0 ? 'decimal' : 'text'}
          placeholder={exercise.type === 'number'
            ? copy.numberPlaceholder
            : exercise.type === 'fraction'
              ? copy.fractionPlaceholder
              : copy.textPlaceholder}
          disabled={correct}
          bind:value={typed}
          oninput={edited}
        />
        {#if exercise.type === 'number' && exercise.unit}
          <span class="text-lg text-slate-700">
            <span class="sr-only">{copy.unit}:</span>{exercise.unit}
          </span>
        {/if}
      </div>
    {:else if exercise.type === 'choice' || exercise.type === 'multi'}
      <fieldset
        aria-labelledby={promptId}
        aria-describedby={feedbackId}
        class="grid gap-2 sm:grid-cols-2"
      >
        {#each exercise.options as html, i (i)}
          <label class={option}>
            {#if exercise.type === 'choice'}
              <input
                type="radio"
                name="{id}-choice"
                value={i}
                class="h-5 w-5 shrink-0 accent-indigo-600"
                disabled={correct}
                bind:group={picked}
                onchange={edited}
              />
            {:else}
              <input
                type="checkbox"
                value={i}
                class="h-5 w-5 shrink-0 accent-indigo-600"
                disabled={correct}
                bind:group={checked}
                onchange={edited}
              />
            {/if}
            <RichText {html} class="leading-relaxed" />
          </label>
        {/each}
      </fieldset>
    {:else if exercise.type === 'order'}
      <OrderInput
        items={exercise.items}
        bind:value={arrangement}
        labelledby={promptId}
        disabled={correct}
        onchange={edited}
      />
    {:else if exercise.type === 'match'}
      <MatchInput
        left={exercise.left}
        right={exercise.right}
        bind:value={pairs}
        labelledby={promptId}
        disabled={correct}
        onchange={edited}
      />
    {:else if exercise.type === 'count'}
      {@const ex = exercise}
      <div
        class="flex flex-wrap gap-2 rounded-xl bg-slate-50 p-3"
        role="group"
        aria-label={pictures[ex.picture]}
      >
        {#each { length: ex.answer } as _, i (i)}
          <Picture name={ex.picture} size={48} />
        {/each}
      </div>
      <div role="group" aria-label={copy.countCards} class="flex flex-wrap gap-2">
        {#each ex.choices ?? decade(ex.answer) as value (value)}
          <button
            type="button"
            class="h-14 min-w-14 rounded-xl border-2 px-3 text-2xl font-bold tabular-nums transition {focusRing} {picked ===
            value
              ? 'border-indigo-600 bg-indigo-600 text-white'
              : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
            aria-pressed={picked === value}
            aria-describedby={feedbackId}
            disabled={correct}
            onclick={() => {
              picked = value;
              check();
            }}>{value}</button
          >
        {/each}
      </div>
    {/if}

    <div class="flex flex-wrap items-center gap-2">
      {#if exercise.type !== 'count'}
        <button type="submit" class={button.primary} disabled={correct}>{copy.check}</button>
      {/if}
      {#if result}
        <button type="button" class={button.quiet} onclick={retry}>{copy.retry}</button>
      {/if}
    </div>

    <p
      id={feedbackId}
      role="status"
      class="min-h-6 font-semibold {correct ? 'text-emerald-700' : 'text-rose-700'}"
    >
      {result ? copy.feedback[result.reason] : ''}
    </p>
  </form>

  <HintLadder hints={exercise.hints} solution={exercise.solution} revealSolution={correct} />
</article>
