<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import LineChart from '#lib/core/visuals/line-chart.svelte';
  import PieChart from '#lib/core/visuals/pie-chart.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import Pictograph from '#lib/core/visuals/pictograph.svelte';
  import { CHART_KINDS, DATA_SETS } from './engine.js';

  let setId = $state(DATA_SETS[0].id);
  /** @type {import('./engine.js').ChartKind} */
  let kind = $state('cot');

  const set = $derived(DATA_SETS.find((s) => s.id === setId) ?? DATA_SETS[0]);
  const verdict = $derived(set.verdict[kind]);
  const kindName = $derived(CHART_KINDS.find((k) => k.value === kind)?.label ?? '');
  const bars = $derived(set.labels.map((label, i) => ({ label, value: set.values[i] })));

  const setOptions = DATA_SETS.map((s) => ({ value: s.id, label: s.short }));

  const feedback = $derived.by(() => {
    const name = `Biểu đồ ${kindName.toLowerCase()}`;
    if (verdict.fit === 'best')
      return { tone: /** @type {const} */ ('ok'), text: `${name}: phù hợp nhất. ${verdict.why}` };
    if (verdict.fit === 'ok')
      return {
        tone: /** @type {const} */ ('info'),
        text: `${name}: dùng được nhưng chưa tốt nhất. ${verdict.why}`,
      };
    return {
      tone: /** @type {const} */ ('warn'),
      text: `${name}: không phù hợp. ${verdict.why}`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl label="Bộ dữ liệu" options={setOptions} bind:value={setId} />

  <div class="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-3">
    <p class="font-semibold text-slate-800">{set.title}</p>
    <p class="mb-2 text-sm text-slate-600">Mục đích: {set.purpose}</p>
    <table class="w-full text-center text-sm tabular-nums">
      <caption class="sr-only">Bảng thống kê: {set.title}</caption>
      <tbody>
        <tr class="border-b border-slate-200">
          {#each set.labels as l (l)}<th scope="col" class="px-1 py-1 font-semibold">{l}</th>{/each}
        </tr>
        <tr>
          {#each set.values as v, i (i)}<td class="px-1 py-1">{formatNumber(v)}</td>{/each}
        </tr>
      </tbody>
    </table>
  </div>

  <SegmentedControl label="Biểu diễn bằng biểu đồ" options={CHART_KINDS} bind:value={kind} />

  <div class="rounded-lg border border-slate-200 bg-white p-2">
    {#if kind === 'tranh'}
      <Pictograph
        labels={set.labels}
        values={set.values}
        icon={set.icon}
        unit={set.iconUnit}
        title="Biểu đồ tranh: {set.title}"
      />
    {:else if kind === 'cot'}
      <BarChart data={bars} unit={set.unit} title="Biểu đồ cột: {set.title}" />
    {:else if kind === 'quat'}
      <PieChart data={bars} title="Biểu đồ hình quạt tròn: {set.title}" />
    {:else}
      <LineChart
        labels={set.labels}
        series={[{ name: set.short, values: set.values }]}
        unit={set.unit}
        title="Biểu đồ đoạn thẳng: {set.title}"
      />
    {/if}
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
  {#if verdict.fit !== 'best'}
    <p class="text-sm text-slate-600">Thử các loại biểu đồ khác để tìm loại phù hợp nhất.</p>
  {/if}
</div>
