<script>
  import { tick } from 'svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button, textInput } from './ui.js';
  import {
    buildSet,
    hintsFor,
    isDone,
    isRetry,
    nextPhase,
    readAnswer,
    skillMap,
    withUnit,
  } from './drill.js';
  import { fmt, readNatural } from './number-format.js';
  import { drill as copy, hints as hintCopy } from './copy.vi.js';

  /**
   * A generated practice drill: questions drawn from several skills in random
   * order and checked at once. A wrong first answer opens a hint ladder and
   * a second try; only a second miss shows the full worked solution. The
   * skill map colours each skill by first-attempt results and, at the end,
   * names the skills to review.
   *
   * - `skills`: generators (see `drill.js`); each question may carry its own
   *   `hints`, otherwise the solution steps before the answer are the ladder.
   * - `read`, `format`: how typed text becomes a number and how an answer is
   *   written; natural numbers grouped the book's way by default. A question
   *   may bring its own `read`, and its own `unit`: a unit typed after the
   *   number is accepted only when it is that question's unit.
   * - `invalidText`: what to say when `read` returns null.
   * - Prompts, hints and solution steps are rich text: inline `$...$` TeX
   *   such as `$S_{xq}$` shows as math.
   * @type {{
   *   skills: import('./drill.js').Skill[];
   *   perSkill: number;
   *   mapLabel?: string;
   *   read?: (text: string) => number | null;
   *   format?: (n: number) => string;
   *   invalidText?: string;
   * }}
   */
  let {
    skills,
    perSkill,
    mapLabel = copy.skillMap,
    read = readNatural,
    format = fmt,
    invalidText = copy.invalid,
  } = $props();

  const STATUS = {
    todo: 'border-slate-200 bg-white text-slate-600',
    doing: 'border-sky-200 bg-sky-50 text-sky-900',
    good: 'border-emerald-300 bg-emerald-50 text-emerald-900',
    mixed: 'border-amber-300 bg-amber-50 text-amber-900',
    weak: 'border-rose-300 bg-rose-50 text-rose-900',
  };

  const inputId = $props.id();

  // The first set is fixed so the prerendered page and the browser agree;
  // later sets use a fresh random seed.
  let seed = $state(1);
  let index = $state(0);
  /** @type {Array<boolean | null>} */
  let results = $state([]);
  let typed = $state('');
  /** @type {import('./drill.js').DrillPhase} */
  let phase = $state('ask');
  let hintsShown = $state(0);
  // The last input carried a unit that this question does not take.
  let unitIssue = $state(false);
  /** @type {HTMLInputElement | undefined} */
  let input = $state();

  const questions = $derived(buildSet(skills, perSkill, seed));
  const map = $derived(skillMap(skills, questions, results));
  const finished = $derived(index >= questions.length);
  const current = $derived(finished ? null : questions[index]);
  const ladder = $derived(current ? hintsFor(current) : []);
  const score = $derived(results.filter(Boolean).length);
  const toReview = $derived(map.filter((s) => s.status === 'weak' || s.status === 'mixed'));
  const done = $derived(isDone(phase));
  const answerText = $derived(current ? withUnit(format(current.answer), current.unit) : '');
  const bareNumbers = $derived(read === readNatural && !current?.unit && !current?.read);

  async function check() {
    if (!current || done) return;
    const got = readAnswer(current, typed, read);
    unitIssue = got === 'unit';
    const value = got === 'unit' ? null : got;
    const ok = value === null ? null : value === current.answer;
    const first = !isRetry(phase);
    phase = nextPhase(phase, ok);
    if (ok === null) return;
    if (first) {
      const next = [...results];
      next[index] = ok;
      results = next;
    }
    if (phase === 'retry') {
      hintsShown = Math.min(1, ladder.length);
      typed = '';
      await tick();
      input?.focus();
    }
  }

  async function advance() {
    index++;
    typed = '';
    unitIssue = false;
    phase = 'ask';
    hintsShown = 0;
    await tick();
    input?.focus();
  }

  function restart() {
    seed = Math.floor(Math.random() * 2 ** 31) + 2;
    index = 0;
    results = [];
    typed = '';
    unitIssue = false;
    phase = 'ask';
    hintsShown = 0;
  }
</script>

<div class="space-y-4">
  <section aria-label={mapLabel}>
    <h3 class="mb-2 text-sm font-semibold text-slate-700">{mapLabel}</h3>
    <ul class="grid gap-2 sm:grid-cols-2">
      {#each map as s (s.id)}
        <li
          class="flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm {STATUS[
            s.status
          ]}"
        >
          <span class="font-semibold">{s.label}</span>
          <span class="shrink-0 tabular-nums">
            {s.right}/{s.total} · {copy.status[s.status]}
          </span>
        </li>
      {/each}
    </ul>
  </section>

  {#if current}
    <form
      class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
      onsubmit={(e) => {
        e.preventDefault();
        if (done) advance();
        else check();
      }}
    >
      <p class="text-sm text-slate-600 tabular-nums">
        {copy.progress(index + 1, questions.length, score)}
      </p>
      <label for={inputId} class="block text-lg font-semibold text-slate-900"
        ><LiveRichText text={current.prompt} /></label
      >
      <div class="flex flex-wrap gap-2">
        <input
          id={inputId}
          bind:this={input}
          bind:value={typed}
          class="{textInput} max-w-48"
          inputmode={bareNumbers ? 'numeric' : 'text'}
          autocomplete="off"
          readonly={done}
          aria-describedby="{inputId}-feedback"
        />
        {#if done}
          <button type="submit" class={button.primary}>
            {index + 1 === questions.length ? copy.results : copy.next}
          </button>
        {:else}
          <button type="submit" class={button.primary}>{copy.check}</button>
        {/if}
      </div>

      <div id="{inputId}-feedback" class="space-y-2" aria-live="polite">
        {#if phase === 'invalid' || phase === 'retry-invalid'}
          <p class="font-semibold text-amber-800">
            {unitIssue ? copy.unit(current.unit) : invalidText}
          </p>
        {/if}
        {#if isRetry(phase)}
          <p class="font-semibold text-rose-900">{copy.retry}</p>
        {/if}
        {#if isRetry(phase) || phase === 'fixed' || phase === 'wrong'}
          {#if hintsShown > 0}
            <ol class="space-y-2" aria-label={hintCopy.title}>
              {#each ladder.slice(0, hintsShown) as hint, i (i)}
                <li class="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-950">
                  <span class="font-semibold">{hintCopy.title} {i + 1}:</span>
                  <LiveRichText text={hint} />
                </li>
              {/each}
            </ol>
          {/if}
          {#if isRetry(phase) && hintsShown < ladder.length}
            <button type="button" class={button.quiet} onclick={() => (hintsShown += 1)}
              >{hintCopy.show(hintsShown + 1, ladder.length)}</button
            >
          {/if}
        {/if}
        {#if phase === 'right' || phase === 'fixed'}
          <p
            class="rounded-lg border border-emerald-200 bg-emerald-50 p-3 font-semibold text-emerald-900"
          >
            {phase === 'right' ? copy.right(answerText) : copy.fixed(answerText)}
          </p>
        {:else if phase === 'wrong'}
          <div class="rounded-lg border border-rose-300 bg-rose-50 p-3 text-rose-950">
            <p class="font-semibold">{copy.wrong(answerText)}</p>
            <ol class="mt-2 list-decimal space-y-1 pl-5 tabular-nums">
              {#each current.steps as step, i (i)}
                <li><LiveRichText text={step} /></li>
              {/each}
            </ol>
          </div>
        {/if}
      </div>
    </form>
  {:else}
    <div class="space-y-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4" aria-live="polite">
      <p class="text-lg font-bold text-slate-900">{copy.summary(score, questions.length)}</p>
      <p class="text-slate-800">
        {toReview.length === 0 ? copy.allGood : copy.review(toReview.map((s) => s.label))}
      </p>
      <button type="button" class={button.primary} onclick={restart}>{copy.restart}</button>
    </div>
  {/if}
</div>
