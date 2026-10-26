<script>
  import { tick, untrack } from 'svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { isDone, isRetry, nextPhase, rng } from '#lib/core/drill.js';
  import { hints as hintCopy } from '#lib/core/copy.vi.js';
  import { drawQuestion, nextSkill, readValue, sameValue, statusOf, tally } from './adaptive.js';

  /**
   * An adaptive review set. Each skill is asked once first; after that the
   * next question comes from the skill with the most wrong first attempts
   * (weighted at random, see `adaptive.js`), and the board says why it chose
   * it. A wrong first answer opens the hint ladder and a second try; a second
   * miss shows the full solution. The skill map scores first attempts.
   *
   * - `skills`: question generators, one per part of the review.
   * - `length`: questions in one set (12).
   * - `mapLabel`: heading of the skill map.
   * @type {{
   *   skills: import('./adaptive.js').ReviewSkill[];
   *   length?: number;
   *   mapLabel?: string;
   * }}
   */
  let { skills, length = 12, mapLabel = 'Bản đồ kĩ năng' } = $props();

  const STATUS = {
    todo: 'border-slate-200 bg-white text-slate-600',
    good: 'border-emerald-300 bg-emerald-50 text-emerald-900',
    mixed: 'border-amber-300 bg-amber-50 text-amber-900',
    weak: 'border-rose-300 bg-rose-50 text-rose-900',
  };
  const STATUS_TEXT = {
    todo: 'chưa làm',
    good: 'vững',
    mixed: 'cần luyện thêm',
    weak: 'cần ôn lại',
  };

  const inputId = $props.id();

  /**
   * One set: a random source and the questions drawn so far. The first set
   * uses a fixed seed so the prerendered page and the browser agree.
   * @param {number} seed
   */
  function freshSet(seed) {
    const rand = rng(seed);
    const pick = nextSkill(skills, [], rand);
    const q = drawQuestion(pick.skill, new Set(), rand);
    return { rand, asked: new Set([q.prompt]), skill: pick.skill, reason: pick.reason, q };
  }

  let set = $state(untrack(() => freshSet(1)));
  /** @type {import('./adaptive.js').Attempt[]} */
  let attempts = $state([]);
  let typed = $state('');
  /** @type {import('#lib/core/drill.js').DrillPhase} */
  let phase = $state('ask');
  let hintsShown = $state(0);
  /** @type {HTMLInputElement | undefined} */
  let input = $state();

  let finished = $state(false);
  const map = $derived(
    tally(skills, attempts).map((s) => ({ ...s, status: statusOf(s.right, s.answered) })),
  );
  const score = $derived(attempts.filter((a) => a.ok).length);
  const toReview = $derived(map.filter((s) => s.status === 'weak' || s.status === 'mixed'));
  const done = $derived(isDone(phase));
  const ladder = $derived(set.q.hints);
  const at = $derived(Math.min(length, attempts.length + (done || isRetry(phase) ? 0 : 1)));

  const reasonText = $derived(
    set.reason === 'new'
      ? `Câu khởi động phần ${set.skill.label}.`
      : set.reason === 'weak'
        ? `Em còn sai ở phần ${set.skill.label}, nên đề chọn thêm một câu phần này.`
        : `Ôn lại phần ${set.skill.label} cho chắc.`,
  );

  async function check() {
    if (done) return;
    const value = readValue(typed);
    const ok = value === null ? null : sameValue(value, set.q.answer);
    const first = !isRetry(phase);
    phase = nextPhase(phase, ok);
    if (ok === null) return;
    if (first) attempts = [...attempts, { skill: set.skill.id, ok }];
    if (phase === 'retry') {
      hintsShown = Math.min(1, ladder.length);
      typed = '';
      await tick();
      input?.focus();
    }
  }

  async function advance() {
    typed = '';
    hintsShown = 0;
    if (attempts.length >= length) {
      finished = true;
      return;
    }
    const pick = nextSkill(skills, attempts, set.rand);
    const q = drawQuestion(pick.skill, set.asked, set.rand);
    set.asked.add(q.prompt);
    set = { ...set, skill: pick.skill, reason: pick.reason, q };
    phase = 'ask';
    await tick();
    input?.focus();
  }

  function restart() {
    set = freshSet(Math.floor(Math.random() * 2 ** 31) + 2);
    attempts = [];
    finished = false;
    typed = '';
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
          <span class="shrink-0 tabular-nums">{s.right}/{s.answered} · {STATUS_TEXT[s.status]}</span
          >
        </li>
      {/each}
    </ul>
  </section>

  {#if !finished}
    <form
      class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
      onsubmit={(e) => {
        e.preventDefault();
        if (done) advance();
        else check();
      }}
    >
      <p class="text-sm text-slate-600 tabular-nums">
        Câu {at}/{length} · đúng ngay lần đầu: {score}
      </p>
      <p class="rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-900">{reasonText}</p>
      <label for={inputId} class="block text-lg font-semibold text-slate-900">{set.q.prompt}</label>
      <div class="flex flex-wrap gap-2">
        <input
          id={inputId}
          bind:this={input}
          bind:value={typed}
          class="{textInput} max-w-48"
          autocomplete="off"
          readonly={done}
          aria-describedby="{inputId}-feedback"
        />
        <button type="submit" class={button.primary}>
          {#if !done}Kiểm tra{:else if attempts.length >= length}Xem kết quả{:else}Câu tiếp theo{/if}
        </button>
      </div>

      <div id="{inputId}-feedback" class="space-y-2" aria-live="polite">
        {#if phase === 'invalid' || phase === 'retry-invalid'}
          <p class="font-semibold text-amber-800">
            Hãy nhập một số: số nguyên (−12), số thập phân (3,75) hoặc phân số (5/6).
          </p>
        {/if}
        {#if isRetry(phase)}
          <p class="font-semibold text-rose-900">
            Chưa đúng. Em xem gợi ý rồi thử lại lần nữa nhé.
          </p>
        {/if}
        {#if (isRetry(phase) || phase === 'fixed' || phase === 'wrong') && hintsShown > 0}
          <ol class="space-y-2" aria-label={hintCopy.title}>
            {#each ladder.slice(0, hintsShown) as hint, i (i)}
              <li class="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-950">
                <span class="font-semibold">{hintCopy.title} {i + 1}:</span>
                {hint}
              </li>
            {/each}
          </ol>
        {/if}
        {#if isRetry(phase) && hintsShown < ladder.length}
          <button type="button" class={button.quiet} onclick={() => (hintsShown += 1)}
            >{hintCopy.show(hintsShown + 1, ladder.length)}</button
          >
        {/if}
        {#if phase === 'right' || phase === 'fixed'}
          <p
            class="rounded-lg border border-emerald-200 bg-emerald-50 p-3 font-semibold text-emerald-900"
          >
            {phase === 'right' ? 'Đúng rồi!' : 'Đúng rồi ở lần thử thứ hai!'} Đáp số: {set.q
              .display}.
          </p>
        {:else if phase === 'wrong'}
          <div class="rounded-lg border border-rose-300 bg-rose-50 p-3 text-rose-950">
            <p class="font-semibold">Chưa đúng. Đáp số là {set.q.display}. Lời giải:</p>
            <ol class="mt-2 list-decimal space-y-1 pl-5 tabular-nums">
              {#each set.q.steps as step, i (i)}
                <li>{step}</li>
              {/each}
            </ol>
          </div>
        {/if}
      </div>
    </form>
  {:else}
    <div class="space-y-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4" aria-live="polite">
      <p class="text-lg font-bold text-slate-900">
        Em làm đúng ngay lần đầu {score}/{length} câu.
      </p>
      <p class="text-slate-800">
        {toReview.length === 0
          ? 'Mọi phần đều vững. Thử một đề mới để chắc chắn hơn nhé!'
          : `Nên ôn lại: ${toReview.map((s) => s.label).join('; ')}.`}
      </p>
      <button type="button" class={button.primary} onclick={restart}>Làm đề mới</button>
    </div>
  {/if}
</div>
