<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import PieChart from '#lib/core/visuals/pie-chart.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { BAR_TASK, PIE_TASK, exactPercents, mismatches } from './engine.js';

  const BAR_START = [10, 10, 10, 10];
  const PIE_START = [20, 30, 30, 20];
  const pieTarget = exactPercents(PIE_TASK.values);
  const pieTotal = PIE_TASK.values.reduce((a, b) => a + b, 0);

  let mode = $state('cot');
  let bars = $state(BAR_TASK.labels.map((label, i) => ({ label, value: BAR_START[i] })));
  // The slices are kept in percent, so their total is always 100.
  let slices = $state(PIE_TASK.labels.map((label, i) => ({ label, value: PIE_START[i] })));
  // Remounts a chart on reset, so an interactive chart re-reads its data.
  let round = $state(0);

  const modes = [
    { value: 'cot', label: 'Bảng → biểu đồ cột' },
    { value: 'quat', label: 'Bảng → biểu đồ quạt' },
  ];

  const barWrong = $derived(
    mismatches(
      BAR_TASK.values,
      bars.map((b) => b.value),
    ),
  );
  const pieWrong = $derived(
    mismatches(
      pieTarget,
      slices.map((s) => s.value),
    ),
  );

  function reset() {
    bars = BAR_TASK.labels.map((label, i) => ({ label, value: BAR_START[i] }));
    slices = PIE_TASK.labels.map((label, i) => ({ label, value: PIE_START[i] }));
    round += 1;
  }

  const feedback = $derived.by(() => {
    if (mode === 'cot') {
      if (barWrong.length === 0)
        return {
          tone: /** @type {const} */ ('ok'),
          text: 'Chính xác! Chiều cao mỗi cột bằng đúng số ki-lô-gam trong bảng.',
        };
      const i = barWrong[0];
      return {
        tone: /** @type {const} */ ('info'),
        text: `Còn ${barWrong.length} cột chưa khớp. Cột ${BAR_TASK.labels[i]} đang ở ${formatNumber(bars[i].value)} kg, bảng ghi ${formatNumber(BAR_TASK.values[i])} kg: kéo đầu cột ${bars[i].value < BAR_TASK.values[i] ? 'lên' : 'xuống'}.`,
      };
    }
    if (pieWrong.length === 0)
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Chính xác! ${PIE_TASK.labels.map((l, i) => `${l} ${formatNumber(pieTarget[i])}%`).join(', ')}; tổng là 100%.`,
      };
    const i = pieWrong[0];
    return {
      tone: /** @type {const} */ ('info'),
      text: `Còn ${pieWrong.length} phần chưa khớp. ${PIE_TASK.labels[i]} đang chiếm ${formatNumber(slices[i].value)}%. Hãy tính: ${PIE_TASK.values[i]} : ${pieTotal} · 100% = ?`,
    };
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl label="Chuyển từ bảng sang biểu đồ" options={modes} bind:value={mode} />
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  {#if mode === 'cot'}
    <div class="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-3">
      <table class="w-full text-center text-sm tabular-nums">
        <caption class="mb-1 text-left font-semibold text-slate-800"
          >Khối lượng giấy vụn (kg) thu gom được</caption
        >
        <tbody>
          <tr class="border-b border-slate-200">
            <th scope="row" class="px-1 py-1 text-left">Lớp</th>
            {#each BAR_TASK.labels as l (l)}<th scope="col" class="px-1 py-1">{l}</th>{/each}
          </tr>
          <tr>
            <th scope="row" class="px-1 py-1 text-left">Khối lượng (kg)</th>
            {#each BAR_TASK.values as v, i (i)}<td class="px-1 py-1">{v}</td>{/each}
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-sm text-slate-600">
      Kéo đầu mỗi cột (hoặc chọn cột rồi dùng phím mũi tên lên, xuống) để cột cao đúng như bảng. Mỗi
      nấc là 2 kg.
    </p>
    {#key round}
      <BarChart
        bind:data={bars}
        interactive
        step={BAR_TASK.step}
        max={BAR_TASK.max}
        unit="kg"
        title="Biểu đồ cột em đang vẽ"
      />
    {/key}
  {:else}
    <div class="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-3">
      <table class="w-full text-center text-sm tabular-nums">
        <caption class="mb-1 text-left font-semibold text-slate-800"
          >Môn thể thao yêu thích của {pieTotal} học sinh lớp 8B</caption
        >
        <tbody>
          <tr class="border-b border-slate-200">
            <th scope="row" class="px-1 py-1 text-left">Môn</th>
            {#each PIE_TASK.labels as l (l)}<th scope="col" class="px-1 py-1">{l}</th>{/each}
          </tr>
          <tr>
            <th scope="row" class="px-1 py-1 text-left">Số học sinh</th>
            {#each PIE_TASK.values as v, i (i)}<td class="px-1 py-1">{v}</td>{/each}
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-sm text-slate-600">
      Tính tỉ lệ phần trăm của mỗi môn, rồi kéo các nút trên đường tròn (hoặc dùng phím mũi tên) để
      mỗi hình quạt chiếm đúng tỉ lệ ấy. Mỗi nấc là 5%.
    </p>
    {#key round}
      <PieChart bind:data={slices} interactive snapPercent={5} title="Biểu đồ quạt em đang vẽ" />
    {/key}
  {/if}

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
