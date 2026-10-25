<script>
  import { tick } from 'svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { buildSet, skillMap } from './drill.js';
  import { fmt, readNatural } from './format.js';

  /**
   * A generated practice set: questions drawn from several skills in random
   * order, scored at once, with the worked solution shown after a wrong
   * answer. The skill map colours each skill by first-attempt results and,
   * at the end, names the skills to review.
   * @type {{
   *   skills: import('./drill.js').Skill[];
   *   perSkill: number;
   *   mapLabel?: string;
   * }}
   */
  let { skills, perSkill, mapLabel = 'Bản đồ kĩ năng' } = $props();

  const STATUS = {
    todo: { cls: 'border-slate-200 bg-white text-slate-600', text: 'chưa làm' },
    good: { cls: 'border-emerald-300 bg-emerald-50 text-emerald-900', text: 'vững' },
    mixed: { cls: 'border-amber-300 bg-amber-50 text-amber-900', text: 'cần luyện thêm' },
    weak: { cls: 'border-rose-300 bg-rose-50 text-rose-900', text: 'cần ôn lại' },
  };

  const inputId = $props.id();

  // The first set is fixed so the prerendered page and the browser agree;
  // later sets use a fresh random seed.
  let seed = $state(1);
  let index = $state(0);
  /** @type {Array<boolean | null>} */
  let results = $state([]);
  let typed = $state('');
  let phase = $state(/** @type {'ask' | 'invalid' | 'right' | 'wrong'} */ ('ask'));
  /** @type {HTMLInputElement | undefined} */
  let input = $state();

  const questions = $derived(buildSet(skills, perSkill, seed));
  const map = $derived(skillMap(skills, questions, results));
  const finished = $derived(index >= questions.length);
  const current = $derived(finished ? null : questions[index]);
  const score = $derived(results.filter(Boolean).length);
  const toReview = $derived(map.filter((s) => s.status === 'weak' || s.status === 'mixed'));

  function check() {
    if (!current || phase === 'right' || phase === 'wrong') return;
    const value = readNatural(typed);
    if (value === null) {
      phase = 'invalid';
      return;
    }
    const ok = value === current.answer;
    const next = [...results];
    next[index] = ok;
    results = next;
    phase = ok ? 'right' : 'wrong';
  }

  async function advance() {
    index++;
    typed = '';
    phase = 'ask';
    await tick();
    input?.focus();
  }

  function restart() {
    seed = Math.floor(Math.random() * 2 ** 31) + 2;
    index = 0;
    results = [];
    typed = '';
    phase = 'ask';
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
          ].cls}"
        >
          <span class="font-semibold">{s.label}</span>
          <span class="shrink-0 tabular-nums">
            {s.right}/{s.total} · {STATUS[s.status].text}
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
        if (phase === 'right' || phase === 'wrong') advance();
        else check();
      }}
    >
      <p class="text-sm text-slate-600 tabular-nums">
        Câu {index + 1}/{questions.length} · đúng ngay lần đầu: {score}
      </p>
      <label for={inputId} class="block text-lg font-semibold text-slate-900"
        >{current.prompt}</label
      >
      <div class="flex flex-wrap gap-2">
        <input
          id={inputId}
          bind:this={input}
          bind:value={typed}
          class="{textInput} max-w-48"
          inputmode="numeric"
          autocomplete="off"
          readonly={phase === 'right' || phase === 'wrong'}
          aria-describedby="{inputId}-feedback"
        />
        {#if phase === 'right' || phase === 'wrong'}
          <button type="submit" class={button.primary}>
            {index + 1 === questions.length ? 'Xem kết quả' : 'Câu tiếp theo'}
          </button>
        {:else}
          <button type="submit" class={button.primary}>Kiểm tra</button>
        {/if}
      </div>

      <div id="{inputId}-feedback" aria-live="polite">
        {#if phase === 'invalid'}
          <p class="font-semibold text-amber-800">
            Hãy nhập một số tự nhiên, ví dụ 1024 hoặc 1 024.
          </p>
        {:else if phase === 'right'}
          <p
            class="rounded-lg border border-emerald-200 bg-emerald-50 p-3 font-semibold text-emerald-900"
          >
            Đúng rồi! Đáp số: {fmt(current.answer)}.
          </p>
        {:else if phase === 'wrong'}
          <div class="rounded-lg border border-rose-300 bg-rose-50 p-3 text-rose-950">
            <p class="font-semibold">Chưa đúng. Đáp số là {fmt(current.answer)}. Lời giải:</p>
            <ol class="mt-2 list-decimal space-y-1 pl-5 tabular-nums">
              {#each current.steps as step, i (i)}
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
        Em làm đúng ngay lần đầu {score}/{questions.length} câu.
      </p>
      <p class="text-slate-800">
        {toReview.length === 0
          ? 'Mọi kĩ năng đều vững. Thử một bộ đề mới để chắc chắn hơn nhé!'
          : `Nên ôn lại: ${toReview.map((s) => s.label).join('; ')}.`}
      </p>
      <button type="button" class={button.primary} onclick={restart}>Làm bộ đề mới</button>
    </div>
  {/if}
</div>
