<script>
  import LineChart from '#lib/core/visuals/line-chart.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { fmt } from '#lib/core/number-format.js';
  import { GOALS, START, YEARS, changes, describe } from './engine.js';

  const NAME = 'Số cây trồng được';
  let series = $state([{ name: NAME, values: [...START] }]);
  let mode = $state('tu-do');

  const values = $derived(series[0].values);
  const steps = $derived(changes(values));
  const lines = $derived(describe(YEARS, values, 'cây'));
  const goal = $derived(GOALS.find((g) => g.id === mode));
  const met = $derived(goal ? goal.met(values) : false);

  function reset() {
    series = [{ name: NAME, values: [...START] }];
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Nhiệm vụ"
    options={[
      { value: 'tu-do', label: 'Tự do' },
      ...GOALS.map((g) => ({ value: g.id, label: g.label })),
    ]}
    bind:value={mode}
  />

  {#if goal}
    <p class="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-950">
      {goal.text}
    </p>
  {/if}

  <p class="text-center text-sm font-semibold text-slate-800">
    Số cây câu lạc bộ Môi trường trồng được từ năm 2019 đến năm 2024
  </p>
  <LineChart
    labels={YEARS}
    bind:series
    interactive
    min={0}
    max={300}
    step={10}
    unit="Số cây"
    title="Số cây câu lạc bộ Môi trường trồng được từ năm 2019 đến năm 2024"
  />

  <ul
    class="grid grid-cols-2 gap-2 text-sm sm:grid-cols-5"
    aria-label="Thay đổi giữa hai năm liên tiếp"
  >
    {#each steps as d, i (i)}
      <li
        class="rounded-lg border px-2 py-1 text-center {d > 0
          ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
          : d < 0
            ? 'border-rose-200 bg-rose-50 text-rose-900'
            : 'border-slate-200 bg-slate-50 text-slate-700'}"
      >
        <span class="block text-xs">{YEARS[i]} → {YEARS[i + 1]}</span>
        <span class="font-semibold tabular-nums"
          >{d > 0 ? `▲ tăng ${fmt(d)}` : d < 0 ? `▼ giảm ${fmt(-d)}` : '= không đổi'}</span
        >
      </li>
    {/each}
  </ul>

  <div aria-live="polite" class="space-y-1 rounded-lg bg-slate-50 p-3 text-sm text-slate-800">
    {#if goal}
      <p class="font-semibold {met ? 'text-emerald-800' : 'text-amber-800'}">
        {met ? 'Đã đạt nhiệm vụ!' : 'Chưa đạt nhiệm vụ, kéo tiếp các điểm nhé.'}
      </p>
    {/if}
    {#each lines as line (line)}
      <p>{line}</p>
    {/each}
  </div>

  <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
</div>
