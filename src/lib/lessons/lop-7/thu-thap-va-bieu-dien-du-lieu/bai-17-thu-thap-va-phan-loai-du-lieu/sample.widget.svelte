<script>
  import { button, focusRing } from '#lib/core/ui.js';
  import { colorAt } from '#lib/core/visuals/svg-math.js';
  import { PLANS, SCHOOL, SCHOOL_PERCENT, SPORTS, compare, surveyed } from './engine.js';

  let planId = $state(PLANS[0].id);
  // Fixed first seed so the prerendered page and the browser agree.
  let seed = $state(1);

  const plan = $derived(PLANS.find((p) => p.id === planId) ?? PLANS[0]);
  const sample = $derived(surveyed(planId, seed));
  const result = $derived(compare(sample));
  const message = $derived(
    `${plan.detail} Kết quả mẫu: ${SPORTS.map((s, i) => `${s} ${result.percent[i]}%`).join(', ')}. ` +
      `Chênh lệch lớn nhất so với toàn trường: ${result.gap} điểm phần trăm. ${plan.why}`,
  );
</script>

<div class="space-y-4">
  <p class="text-sm text-slate-700">
    Trường có {SCHOOL.length} học sinh ở 16 lớp (khối 6 đến khối 9). Ta muốn biết môn thể thao học sinh
    toàn trường yêu thích nhất. Chọn một cách khảo sát và so sánh kết quả với toàn trường.
  </p>

  <div class="grid gap-2 sm:grid-cols-2" role="group" aria-label="Chọn cách khảo sát">
    {#each PLANS as p (p.id)}
      <button
        type="button"
        class="min-h-11 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition {focusRing} {p.id ===
        planId
          ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}"
        aria-pressed={p.id === planId}
        onclick={() => (planId = p.id)}
      >
        {p.label}
      </button>
    {/each}
  </div>

  <div class="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
    <p class="text-sm font-semibold text-slate-800">
      Số bạn được hỏi: {sample.length}
    </p>
    {#each SPORTS as sport, i (sport)}
      <div class="space-y-1">
        <p class="text-sm font-semibold text-slate-800">{sport}</p>
        <div class="flex items-center gap-2 text-xs text-slate-600">
          <span class="w-20 shrink-0">Mẫu</span>
          <div class="h-4 flex-1 rounded bg-slate-100">
            <div
              class="h-4 rounded"
              style:width="{result.percent[i]}%"
              style:background-color={colorAt(i)}
            ></div>
          </div>
          <span class="w-10 shrink-0 text-right font-semibold tabular-nums"
            >{result.percent[i]}%</span
          >
        </div>
        <div class="flex items-center gap-2 text-xs text-slate-600">
          <span class="w-20 shrink-0">Toàn trường</span>
          <div class="h-4 flex-1 rounded bg-slate-100">
            <div class="h-4 rounded bg-slate-400" style:width="{SCHOOL_PERCENT[i]}%"></div>
          </div>
          <span class="w-10 shrink-0 text-right font-semibold tabular-nums"
            >{SCHOOL_PERCENT[i]}%</span
          >
        </div>
      </div>
    {/each}
  </div>

  {#if plan.random}
    <button type="button" class={button.secondary} onclick={() => (seed += 1)}>
      Khảo sát lại (chọn ngẫu nhiên lần khác)
    </button>
  {/if}

  <p
    aria-live="polite"
    class="rounded-lg p-3 text-sm {plan.representative
      ? 'bg-emerald-50 text-emerald-900'
      : 'bg-rose-50 text-rose-900'}"
  >
    {message}
  </p>
</div>
