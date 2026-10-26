<script>
  import { untrack } from 'svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { isDone, isRetry, nextPhase, rng } from '#lib/core/drill.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { format as fracText } from '#lib/fraction-engine/index.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import { readValue, sameValue } from '#lib/core/adaptive.js';
  import { EXPERIMENTS, chartQuestion, experimental, runTrials, tallyOutcomes } from './engine.js';

  let mode = $state('chart');
  const inputId = $props.id();

  // Chart reading: the first chart is seeded so the prerendered page matches.
  const rand = rng(1);
  let chart = $state(untrack(() => chartQuestion(rand)));
  let chartTyped = $state('');
  /** @type {import('#lib/core/drill.js').DrillPhase} */
  let chartPhase = $state('ask');
  let chartScore = $state({ right: 0, asked: 0 });

  function checkChart() {
    if (isDone(chartPhase)) return;
    const v = readValue(chartTyped.replace(/%\s*$/, ''));
    const ok = v === null ? null : v.d === 1 && v.n === chart.answer;
    const first = !isRetry(chartPhase);
    chartPhase = nextPhase(chartPhase, ok);
    if (ok === null) return;
    if (first) chartScore = { right: chartScore.right + (ok ? 1 : 0), asked: chartScore.asked + 1 };
    if (chartPhase === 'retry') chartTyped = '';
  }

  function nextChart() {
    chart = chartQuestion(rand);
    chartTyped = '';
    chartPhase = 'ask';
  }

  // Experiments: trials use Math.random, so they only run after a click.
  let expId = $state(EXPERIMENTS[0].id);
  /** @type {string[]} */
  let results = $state([]);
  let expTyped = $state('');
  /** @type {null | 'right' | 'wrong' | 'invalid'} */
  let expVerdict = $state(null);
  let expScore = $state({ right: 0, asked: 0 });
  // Only the first answer for a given set of trials counts towards the score.
  let scoredAt = -1;

  const exp = $derived(EXPERIMENTS.find((e) => e.id === expId) ?? EXPERIMENTS[0]);
  const tally = $derived(tallyOutcomes(exp, results));
  const prob = $derived(experimental(exp, results));

  /** @param {number} n */
  function run(n) {
    results = [...results, ...runTrials(exp, n, Math.random)];
    expTyped = '';
    expVerdict = null;
  }

  function clearTrials() {
    results = [];
    scoredAt = -1;
    expTyped = '';
    expVerdict = null;
  }

  function checkExp() {
    if (!prob) return;
    const v = readValue(expTyped);
    if (v === null) {
      expVerdict = 'invalid';
      return;
    }
    const ok = sameValue(v, prob.value);
    expVerdict = ok ? 'right' : 'wrong';
    if (scoredAt !== results.length) {
      scoredAt = results.length;
      expScore = { right: expScore.right + (ok ? 1 : 0), asked: expScore.asked + 1 };
    }
  }

  const MODES = [
    { value: 'chart', label: 'Đọc biểu đồ' },
    { value: 'exp', label: 'Thí nghiệm' },
  ];
  const EXP_OPTIONS = EXPERIMENTS.map((e) => ({ value: e.id, label: e.label }));
</script>

<div class="space-y-4">
  <SegmentedControl label="Phần ôn tập" options={MODES} bind:value={mode} />

  {#if mode === 'chart'}
    <p class="text-sm text-slate-600 tabular-nums">
      Đúng ngay lần đầu: {chartScore.right}/{chartScore.asked} câu
    </p>
    <BarChart data={chart.data} title={chart.title} unit={chart.unit} max={20} />
    <p class="text-center text-sm font-semibold text-slate-700">{chart.title}</p>
    <form
      class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
      onsubmit={(e) => {
        e.preventDefault();
        if (isDone(chartPhase)) nextChart();
        else checkChart();
      }}
    >
      <label for="{inputId}-chart" class="block text-lg font-semibold text-slate-900"
        >{chart.prompt}</label
      >
      <div class="flex flex-wrap gap-2">
        <input
          id="{inputId}-chart"
          bind:value={chartTyped}
          class="{textInput} max-w-40"
          inputmode="numeric"
          autocomplete="off"
          readonly={isDone(chartPhase)}
          aria-describedby="{inputId}-chart-feedback"
        />
        <button type="submit" class={button.primary}
          >{isDone(chartPhase) ? 'Câu mới' : 'Kiểm tra'}</button
        >
      </div>
      <div id="{inputId}-chart-feedback" aria-live="polite" class="space-y-2">
        {#if chartPhase === 'invalid' || chartPhase === 'retry-invalid'}
          <p class="font-semibold text-amber-800">Hãy nhập một số tự nhiên.</p>
        {/if}
        {#if isRetry(chartPhase)}
          <p class="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-950">
            Chưa đúng. Gợi ý: {chart.hint} Thử lại nhé.
          </p>
        {/if}
        {#if chartPhase === 'right' || chartPhase === 'fixed'}
          <p
            class="rounded-lg border border-emerald-200 bg-emerald-50 p-3 font-semibold text-emerald-900"
          >
            Đúng rồi! {chart.steps.join(' ')}
          </p>
        {:else if chartPhase === 'wrong'}
          <div class="rounded-lg border border-rose-300 bg-rose-50 p-3 text-rose-950">
            <p class="font-semibold">Chưa đúng. Đáp số là {chart.answer}. Lời giải:</p>
            <ol class="mt-2 list-decimal space-y-1 pl-5">
              {#each chart.steps as step, i (i)}
                <li>{step}</li>
              {/each}
            </ol>
          </div>
        {/if}
      </div>
    </form>
  {:else}
    <SegmentedControl
      label="Thí nghiệm"
      options={EXP_OPTIONS}
      bind:value={expId}
      onchange={clearTrials}
    />
    <p class="text-slate-800">
      Mỗi lần thử: {exp.action}. Sự kiện A: <strong>{exp.event}</strong>.
    </p>
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.secondary} onclick={() => run(1)}>Thử 1 lần</button>
      <button type="button" class={button.secondary} onclick={() => run(10)}>Thử 10 lần</button>
      <button type="button" class={button.secondary} onclick={() => run(50)}>Thử 50 lần</button>
      <button type="button" class={button.quiet} onclick={clearTrials}>Làm lại từ đầu</button>
    </div>

    <table class="w-full max-w-md border-collapse text-left tabular-nums">
      <caption class="mb-1 text-left text-sm font-semibold text-slate-700">
        Kết quả sau {results.length} lần thử
      </caption>
      <thead>
        <tr class="border-b border-slate-300">
          <th scope="col" class="py-1 pr-3">Kết quả</th>
          <th scope="col" class="py-1">Số lần</th>
        </tr>
      </thead>
      <tbody>
        {#each tally as t (t.outcome)}
          <tr class="border-b border-slate-100 {exp.happens(t.outcome) ? 'bg-indigo-50' : ''}">
            <td class="py-1 pr-3">{t.outcome}{exp.happens(t.outcome) ? ' (A xảy ra)' : ''}</td>
            <td class="py-1">{t.count}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <p class="text-sm text-slate-600 tabular-nums">
      Tính đúng: {expScore.right}/{expScore.asked} lần
    </p>
    {#if prob}
      <form
        class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
        onsubmit={(e) => {
          e.preventDefault();
          checkExp();
        }}
      >
        <label for="{inputId}-exp" class="block text-lg font-semibold text-slate-900">
          Xác suất thực nghiệm của sự kiện A sau {prob.total} lần thử là bao nhiêu? (Nhập phân số như
          7/20 hoặc số thập phân.)
        </label>
        <div class="flex flex-wrap gap-2">
          <input
            id="{inputId}-exp"
            bind:value={expTyped}
            class="{textInput} max-w-40"
            autocomplete="off"
            aria-describedby="{inputId}-exp-feedback"
          />
          <button type="submit" class={button.primary}>Kiểm tra</button>
        </div>
        <div id="{inputId}-exp-feedback" aria-live="polite">
          {#if expVerdict === 'invalid'}
            <p class="font-semibold text-amber-800">
              Hãy nhập một phân số (ví dụ 7/20) hoặc một số thập phân.
            </p>
          {:else if expVerdict === 'right'}
            <p
              class="rounded-lg border border-emerald-200 bg-emerald-50 p-3 font-semibold text-emerald-900"
            >
              Đúng rồi! A xảy ra {prob.hits} lần trong {prob.total} lần thử: {prob.hits}/{prob.total}
              = {fracText(prob.value)} ≈ {formatNumber(prob.hits / prob.total, 2)}. Thử thêm nhiều
              lần để thấy tỉ số ổn định dần.
            </p>
          {:else if expVerdict === 'wrong'}
            <p class="rounded-lg border border-rose-300 bg-rose-50 p-3 text-rose-950">
              Chưa đúng. Đếm số lần A xảy ra (các dòng tô màu) rồi chia cho tổng số lần thử {prob.total}.
            </p>
          {/if}
        </div>
      </form>
    {:else}
      <p class="text-slate-700">Bấm một nút "Thử" để bắt đầu thí nghiệm.</p>
    {/if}
  {/if}
</div>
