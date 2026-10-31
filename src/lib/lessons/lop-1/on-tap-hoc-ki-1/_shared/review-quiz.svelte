<script>
  import { tick, untrack } from 'svelte';
  import { rng } from '#lib/core/drill.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import QuizVisual from './quiz-visual.svelte';
  import { drawFresh, pickSkill, questionKey, skillMap, toReview } from './quiz.js';

  /**
   * A kid adaptive review set. Every part of the review is asked once
   * first; after that the next question comes from the part the child got
   * wrong most, and a coloured line says why it was chosen. A wrong first
   * tap shows a hint and a second try; a second miss shows the answer. The
   * skill map at the bottom colours each part by its first tries.
   *
   * - `skills`: question makers, one per part of the review.
   * - `length`: questions in one set.
   * - `allGood`: what the end card says when every part is right.
   * @type {{
   *   skills: import('./quiz.js').KidSkill[];
   *   length?: number;
   *   allGood: string;
   * }}
   */
  let { skills, length = 10, allGood } = $props();

  const STATUS = {
    todo: 'border-slate-200 bg-white text-slate-600',
    good: 'border-emerald-300 bg-emerald-50 text-emerald-900',
    mixed: 'border-amber-300 bg-amber-50 text-amber-900',
    weak: 'border-rose-300 bg-rose-50 text-rose-900',
  };
  const STATUS_TEXT = {
    todo: 'chưa làm',
    good: 'đã vững',
    mixed: 'luyện thêm',
    weak: 'cần ôn lại',
  };

  /**
   * A new set. The first one uses a fixed seed so the prerendered page and
   * the browser agree.
   * @param {number} seed
   */
  function freshSet(seed) {
    const rand = rng(seed);
    const pick = pickSkill(skills, [], rand);
    const q = drawFresh(pick.skill, new Set(), rand);
    return { rand, asked: new Set([questionKey(q)]), skill: pick.skill, reason: pick.reason, q };
  }

  let set = $state(untrack(() => freshSet(1)));
  /** @type {import('./quiz.js').Attempt[]} */
  let attempts = $state([]);
  /** @type {number[]} */
  let wrong = $state([]);
  /** `ask`: waiting; `retry`: one miss, hint shown; `right` / `shown`: done. */
  let phase = $state(/** @type {'ask' | 'retry' | 'right' | 'shown'} */ ('ask'));
  let finished = $state(false);
  /** @type {HTMLHeadingElement | undefined} */
  let heading = $state();

  const q = $derived(set.q);
  const ended = $derived(phase === 'right' || phase === 'shown');
  const map = $derived(skillMap(skills, attempts));
  const score = $derived(attempts.filter((a) => a.ok).length);
  const review = $derived(toReview(skills, attempts));
  const number = $derived(Math.min(length, attempts.length + (phase === 'ask' ? 1 : 0)));

  const reasonText = $derived(
    set.reason === 'new'
      ? `Phần mới: ${set.skill.label}.`
      : set.reason === 'weak'
        ? `Em còn sai phần ${set.skill.label}, mình luyện thêm nhé.`
        : `Ôn lại phần ${set.skill.label} cho chắc.`,
  );

  /** @param {number} option */
  function choose(option) {
    if (ended || wrong.includes(option)) return;
    const ok = option === q.answer;
    if (phase === 'ask') attempts = [...attempts, { skill: set.skill.id, ok }];
    if (ok) {
      phase = 'right';
      return;
    }
    wrong = [...wrong, option];
    phase = phase === 'ask' ? 'retry' : 'shown';
  }

  async function next() {
    wrong = [];
    phase = 'ask';
    if (attempts.length >= length) {
      finished = true;
      return;
    }
    const pick = pickSkill(skills, attempts, set.rand);
    const fresh = drawFresh(pick.skill, set.asked, set.rand);
    set.asked.add(questionKey(fresh));
    set = { ...set, skill: pick.skill, reason: pick.reason, q: fresh };
    await tick();
    heading?.focus();
  }

  function restart() {
    set = freshSet(Math.floor(Math.random() * 2 ** 31) + 2);
    attempts = [];
    wrong = [];
    phase = 'ask';
    finished = false;
  }

  /** @param {number} i */
  function optionClass(i) {
    const long = q.options.some((o) => o.length > 3);
    const base = `min-h-16 rounded-2xl border-4 px-4 font-bold transition ${long ? 'text-xl' : 'min-w-16 text-3xl tabular-nums'} ${focusRing}`;
    if (ended && i === q.answer) return `${base} border-emerald-600 bg-emerald-600 text-white`;
    if (wrong.includes(i)) return `${base} border-rose-400 bg-rose-50 text-rose-700 line-through`;
    return `${base} border-slate-300 bg-white text-slate-800 hover:border-indigo-400`;
  }
</script>

<div class="space-y-5">
  {#if !finished}
    <div class="flex flex-wrap items-center justify-between gap-2">
      <p class="text-base font-semibold text-slate-600 tabular-nums">
        Câu {number} / {length} · đúng ngay: {score}
      </p>
    </div>
    <p
      class="rounded-xl px-3 py-2 text-base font-semibold {set.reason === 'weak'
        ? 'bg-amber-100 text-amber-900'
        : 'bg-indigo-50 text-indigo-900'}"
    >
      {reasonText}
    </p>

    <h3 bind:this={heading} tabindex="-1" class="text-2xl font-bold text-slate-900 outline-none">
      {q.prompt}
    </h3>

    {#if q.visual}
      <QuizVisual visual={q.visual} />
    {/if}

    <div role="group" aria-label="Chọn đáp án" class="flex flex-wrap gap-3">
      {#each q.options as option, i (i)}
        <button
          type="button"
          class={optionClass(i)}
          aria-label={q.optionLabels?.[i] ?? option}
          aria-disabled={ended || wrong.includes(i)}
          onclick={() => choose(i)}>{option}</button
        >
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

    {#if ended}
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        {attempts.length < length ? 'Câu tiếp' : 'Xem kết quả'}
      </button>
    {/if}
  {:else}
    <div class="space-y-2 rounded-2xl bg-emerald-50 px-4 py-4 text-emerald-950" aria-live="polite">
      <p class="text-xl font-bold">
        <span aria-hidden="true">⭐ </span>Em làm đúng ngay {score} / {length} câu.
      </p>
      <p class="text-lg">
        {review.length === 0 ? allGood : `Em nên ôn lại: ${review.join(', ')}.`}
      </p>
    </div>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={restart}>
      Làm bộ bài khác
    </button>
  {/if}

  <section aria-label="Bản đồ kĩ năng">
    <h3 class="mb-2 text-base font-semibold text-slate-700">Bản đồ kĩ năng</h3>
    <ul class="grid gap-2 sm:grid-cols-2">
      {#each map as s (s.id)}
        <li
          class="flex items-center justify-between gap-2 rounded-xl border-2 px-3 py-2 text-base {STATUS[
            s.status
          ]}"
        >
          <span class="font-semibold">{s.label}</span>
          <span class="shrink-0 tabular-nums">{s.right}/{s.answered} · {STATUS_TEXT[s.status]}</span
          >
        </li>
      {/each}
    </ul>
  </section>
</div>
