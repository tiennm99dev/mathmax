<script>
  import DoubleBarChart from '#lib/core/visuals/double-bar-chart.svelte';
  import { button } from '#lib/core/ui.js';
  import { BOYS, CLASSES, GIRLS, compareText, questions, total } from './engine.js';

  const SERIES = [
    { name: 'Nam', color: '#4F46E5', values: BOYS },
    { name: 'Nữ', color: '#F46036', values: GIRLS },
  ];
  const QUIZ = questions();

  let visible = $state([true, true]);
  /** @type {number | null} */
  let selected = $state(null);
  let q = $state(0);
  /** @type {null | { ok: boolean, text: string }} */
  let verdict = $state(null);

  const both = $derived(visible[0] && visible[1]);
  const shown = $derived(SERIES.filter((_, i) => visible[i]));

  const compare = $derived.by(() => {
    if (selected === null)
      return 'Chạm vào một lớp trên biểu đồ (hoặc chọn rồi nhấn Enter) để so sánh.';
    const i = selected;
    if (both) return compareText(CLASSES[i], BOYS[i], GIRLS[i]);
    if (shown.length === 1) {
      return `Lớp ${CLASSES[i]}: ${shown[0].values[i]} học sinh ${shown[0].name.toLowerCase()}. Bật cả hai bộ dữ liệu để so sánh nam và nữ.`;
    }
    return 'Hãy bật ít nhất một bộ dữ liệu.';
  });

  /** @param {number} k */
  function toggle(k) {
    visible[k] = !visible[k];
  }

  /** @param {number} i */
  function pick(i) {
    selected = i;
    const ok = QUIZ[q].answer.includes(i);
    verdict = {
      ok,
      text: ok
        ? `Đúng: ${compareText(CLASSES[i], BOYS[i], GIRLS[i])}`
        : `Chưa đúng. ${compareText(CLASSES[i], BOYS[i], GIRLS[i])} Hãy so sánh lại hai cột của mỗi lớp.`,
    };
  }

  function nextQuestion() {
    q = (q + 1) % QUIZ.length;
    verdict = null;
  }
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Bật tắt bộ dữ liệu">
    {#each SERIES as s, k (s.name)}
      <button
        type="button"
        class={visible[k] ? button.secondary : button.quiet}
        aria-pressed={visible[k]}
        onclick={() => toggle(k)}
      >
        <span class="inline-block h-3 w-3 rounded-sm" style:background={s.color} aria-hidden="true"
        ></span>
        {s.name}: {visible[k] ? 'đang hiện' : 'đang ẩn'}
      </button>
    {/each}
  </div>

  <DoubleBarChart
    categories={CLASSES}
    series={SERIES}
    {visible}
    {selected}
    onselect={(i) => (selected = i)}
    max={25}
    unit="Số học sinh"
    title="Số học sinh nam và nữ của khối 6"
  />

  <div class="grid gap-3 sm:grid-cols-2" aria-live="polite">
    <p class="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-950">
      <span class="font-semibold">So sánh.</span>
      {compare}
    </p>
    <p class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900">
      <span class="font-semibold">Tổng.</span>
      {#if shown.length === 0}
        Không có bộ dữ liệu nào đang hiện.
      {:else}
        {shown.map((s) => `${s.name}: ${total(s.values)} học sinh`).join('; ')}.
        {#if both}Cả khối có {total(BOYS) + total(GIRLS)} học sinh.{/if}
      {/if}
    </p>
  </div>

  <div class="rounded-lg border border-slate-200 p-3">
    <p class="text-sm font-semibold text-slate-700">
      Câu hỏi {q + 1}/{QUIZ.length}: {QUIZ[q].prompt}
    </p>
    <p class="mb-2 text-xs text-slate-600">Xem biểu đồ rồi chọn lớp bên dưới.</p>
    <div class="flex flex-wrap gap-2">
      {#each CLASSES as c, i (c)}
        <button type="button" class="{button.quiet} min-w-14" onclick={() => pick(i)}>{c}</button>
      {/each}
      <button type="button" class={button.secondary} onclick={nextQuestion}>Câu tiếp</button>
    </div>
    <p class="mt-2 min-h-5 text-sm" aria-live="polite">
      {#if verdict}
        <span class={verdict.ok ? 'text-emerald-700' : 'text-rose-700'}>{verdict.text}</span>
      {/if}
    </p>
  </div>
</div>
