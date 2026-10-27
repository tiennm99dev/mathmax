<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { button } from '#lib/core/ui.js';
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import PieChart from '#lib/core/visuals/pie-chart.svelte';
  import { colorAt } from '#lib/core/visuals/svg-math.js';
  import {
    DATASETS,
    MAX_COUNT,
    detailText,
    relativeRows,
    roundedText,
    scaleFactor,
  } from './engine.js';

  let which = $state(/** @type {string | number} */ (0));
  const set = $derived(DATASETS[Number(which)]);
  let counts = $state([...DATASETS[0].counts]);
  let view = $state(/** @type {string | number} */ ('pie'));
  let picked = $state(/** @type {string | number} */ (0));

  const rows = $derived(relativeRows(counts));
  const n = $derived(counts.reduce((s, m) => s + m, 0));
  const k = $derived(scaleFactor(counts, set.counts));
  const detail = $derived(detailText(set.values[Number(picked)], counts[Number(picked)] ?? 0, n));
  const freqBars = $derived(
    set.values.map((v, i) => ({ label: v, value: counts[i], color: colorAt(i) })),
  );
  const relBars = $derived(
    set.values.map((v, i) => ({
      label: v,
      value: Math.round(rows[i].f * 10) / 10,
      color: colorAt(i),
    })),
  );
  const slices = $derived(
    set.values.map((v, i) => ({ label: v, value: counts[i], color: colorAt(i) })),
  );

  /** @param {string | number} i */
  function pickSet(i) {
    counts = [...DATASETS[Number(i)].counts];
    picked = 0;
  }

  const canDouble = $derived(counts.every((m) => m * 2 <= MAX_COUNT));
  const cell = 'border border-slate-200 px-3 py-2';
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Mẫu dữ liệu"
    bind:value={which}
    onchange={pickSet}
    options={DATASETS.map((d, i) => ({ value: i, label: d.label }))}
  />

  <div class="grid gap-2 rounded-xl bg-slate-50 p-3 sm:grid-cols-2">
    {#each set.values as v, i (v)}
      <Stepper
        label={`Tần số của ${v}`}
        bind:value={counts[i]}
        min={0}
        max={MAX_COUNT}
        onchange={() => (picked = i)}
      />
    {/each}
  </div>

  <div class="max-w-full overflow-x-auto">
    <table class="mx-auto border-collapse bg-white text-slate-800">
      <caption class="pb-2 text-center font-semibold text-slate-700">
        Bảng tần số và tần số tương đối ({set.label.toLowerCase()})
      </caption>
      <thead class="bg-slate-50 text-sm font-semibold text-slate-600">
        <tr>
          <th scope="col" class={cell}>Giá trị (x)</th>
          <th scope="col" class={cell}>Tần số (m)</th>
          <th scope="col" class={cell}>Tần số tương đối (f)</th>
          <th scope="col" class={cell}>Góc ở tâm</th>
        </tr>
      </thead>
      <tbody>
        {#each set.values as v, i (v)}
          <tr class={Number(picked) === i ? 'bg-indigo-50' : ''}>
            <th scope="row" class="{cell} text-left">
              <span
                class="mr-1 inline-block h-3 w-3 rounded-sm"
                style="background:{colorAt(i)}"
                aria-hidden="true"
              ></span>{v}
            </th>
            <td class="{cell} text-center tabular-nums">{counts[i]}</td>
            <td class="{cell} text-center tabular-nums">{roundedText(rows[i].f)}%</td>
            <td class="{cell} text-center tabular-nums">{roundedText(rows[i].angle)}°</td>
          </tr>
        {/each}
        <tr class="bg-slate-50 font-semibold">
          <th scope="row" class="{cell} text-left">Cộng</th>
          <td class="{cell} text-center tabular-nums">n = {n}</td>
          <td class="{cell} text-center tabular-nums">{n > 0 ? '100%' : '0%'}</td>
          <td class="{cell} text-center tabular-nums">{n > 0 ? '360°' : '0°'}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.secondary}
      disabled={!canDouble}
      onclick={() => (counts = counts.map((m) => m * 2))}>Nhân đôi mọi tần số</button
    >
    <button type="button" class={button.quiet} onclick={() => (counts = [...set.counts])}
      >Khôi phục dữ liệu</button
    >
  </div>

  <SegmentedControl
    label="Xem chi tiết giá trị"
    bind:value={picked}
    options={set.values.map((v, i) => ({ value: i, label: v }))}
  />
  <FeedbackNote tone="info" text={detail} />
  {#if k !== null}
    <FeedbackNote
      tone="ok"
      text={`Mọi tần số đều gấp ${k} lần, cỡ mẫu cũng gấp ${k} lần, nên mọi tần số tương đối giữ nguyên: biểu đồ tần số tương đối không đổi, chỉ biểu đồ tần số thay đổi.`}
    />
  {/if}

  <SegmentedControl
    label="Biểu đồ"
    bind:value={view}
    options={[
      { value: 'freq', label: 'Tần số (cột)' },
      { value: 'rel', label: 'Tần số tương đối (cột)' },
      { value: 'pie', label: 'Tần số tương đối (quạt tròn)' },
    ]}
  />
  {#if n === 0}
    <p class="text-sm text-slate-500">Cỡ mẫu bằng 0, chưa vẽ được biểu đồ.</p>
  {:else if view === 'freq'}
    <BarChart data={freqBars} unit="Tần số" title={`Biểu đồ tần số: ${set.label.toLowerCase()}`} />
  {:else if view === 'rel'}
    <BarChart
      data={relBars}
      max={100}
      unit="Tần số tương đối (%)"
      title={`Biểu đồ tần số tương đối dạng cột: ${set.label.toLowerCase()}`}
    />
  {:else}
    <PieChart
      data={slices}
      decimals={1}
      title={`Biểu đồ tần số tương đối dạng hình quạt tròn: ${set.label.toLowerCase()}`}
    />
  {/if}
</div>
