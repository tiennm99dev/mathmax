<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import LineChart from '#lib/core/visuals/line-chart.svelte';
  import {
    MAX_VALUES,
    SAMPLE,
    SCORES,
    TARGETS,
    compareToTarget,
    frequencyRows,
    summaryText,
  } from './engine.js';

  let mode = $state(/** @type {string | number} */ ('free'));
  let chart = $state(/** @type {string | number} */ ('bar'));
  let values = $state(/** @type {number[]} */ ([...SAMPLE]));
  let target = $state(0);
  /** The value picked in the table; its data are highlighted in the sample. */
  let picked = $state(/** @type {number | null} */ (null));

  const rows = $derived(frequencyRows(values));
  const n = $derived(values.length);
  const summary = $derived(summaryText(values));
  const challenge = $derived(compareToTarget(values, TARGETS[target]));
  const bars = $derived(rows.map((r) => ({ label: String(r.value), value: r.count })));
  const line = $derived([{ name: 'Tần số', values: rows.map((r) => r.count) }]);

  /** @param {number} v */
  function add(v) {
    if (values.length < MAX_VALUES) values = [...values, v];
  }

  /** @param {number} i */
  function remove(i) {
    values = values.filter((_, j) => j !== i);
  }

  /** @param {string | number} m */
  function setMode(m) {
    values = m === 'free' ? [...SAMPLE] : [];
    picked = null;
  }

  function nextTarget() {
    target = (target + 1) % TARGETS.length;
    values = [];
    picked = null;
  }

  const addId = $props.id();
  const cell = 'border border-slate-200 px-3 py-2 text-center';
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    bind:value={mode}
    onchange={setMode}
    options={[
      { value: 'free', label: 'Tự do' },
      { value: 'challenge', label: 'Thử thách' },
    ]}
  />

  {#if mode === 'challenge'}
    <div class="space-y-2 rounded-xl bg-amber-50 p-3">
      <p class="text-sm font-semibold text-amber-900">
        Thử thách {target + 1}/{TARGETS.length}: tạo một mẫu dữ liệu có bảng tần số dưới đây.
      </p>
      <div class="max-w-full overflow-x-auto">
        <table class="mx-auto border-collapse bg-white text-slate-800">
          <tbody>
            <tr>
              <th scope="row" class="{cell} bg-slate-50 text-left">Giá trị (x)</th>
              {#each TARGETS[target] as r (r.value)}
                <td class={cell}>{r.value}</td>
              {/each}
            </tr>
            <tr>
              <th scope="row" class="{cell} bg-slate-50 text-left">Tần số (m)</th>
              {#each TARGETS[target] as r (r.value)}
                <td class={cell}>{r.count}</td>
              {/each}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  {/if}

  <div class="space-y-2">
    <p class="text-sm font-semibold text-slate-700" id={addId}>Thêm một điểm kiểm tra vào mẫu:</p>
    <div class="flex flex-wrap gap-2" role="group" aria-labelledby={addId}>
      {#each SCORES as v (v)}
        <button
          type="button"
          class="{button.quiet} min-w-11 tabular-nums"
          aria-label={`Thêm một điểm ${v}`}
          disabled={n >= MAX_VALUES}
          onclick={() => add(v)}>{v}</button
        >
      {/each}
    </div>
  </div>

  <div class="space-y-2 rounded-xl bg-slate-50 p-3">
    <p class="text-sm font-semibold text-slate-700">
      Mẫu dữ liệu ({n} giá trị). Bấm vào một dữ liệu để bỏ nó khỏi mẫu.
    </p>
    {#if n === 0}
      <p class="text-sm text-slate-500">Mẫu đang trống.</p>
    {:else}
      <ul class="flex flex-wrap gap-1.5" aria-label="Các dữ liệu của mẫu">
        {#each values as v, i (i)}
          <li>
            <button
              type="button"
              class="min-h-11 min-w-11 rounded-lg border px-2 font-semibold tabular-nums {picked ===
              v
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'} {focusRing}"
              aria-label={`Bỏ dữ liệu thứ ${i + 1}: điểm ${v}`}
              onclick={() => remove(i)}>{v}</button
            >
          </li>
        {/each}
      </ul>
    {/if}
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class={button.quiet}
        disabled={n === 0}
        onclick={() => {
          values = [];
          picked = null;
        }}>Xoá hết</button
      >
      {#if mode === 'free'}
        <button type="button" class={button.quiet} onclick={() => (values = [...SAMPLE])}
          >Dữ liệu mẫu</button
        >
      {:else}
        <button type="button" class={button.secondary} onclick={nextTarget}>Thử thách khác</button>
      {/if}
    </div>
  </div>

  {#if mode === 'challenge'}
    <FeedbackNote tone={challenge.done ? 'ok' : 'info'} text={challenge.text} />
  {/if}

  <div class="space-y-2">
    <p class="text-sm font-semibold text-slate-700">
      Bảng tần số tự lập từ mẫu. Bấm một giá trị để tô các dữ liệu bằng nó.
    </p>
    {#if n === 0}
      <p class="text-sm text-slate-500">Thêm dữ liệu để thấy bảng tần số.</p>
    {:else}
      <div class="max-w-full overflow-x-auto">
        <table class="mx-auto border-collapse bg-white text-slate-800">
          <caption class="sr-only">Bảng tần số của mẫu dữ liệu</caption>
          <tbody>
            <tr>
              <th scope="row" class="{cell} bg-slate-50 text-left">Giá trị (x)</th>
              {#each rows as r (r.value)}
                <td class="border border-slate-200 p-0">
                  <button
                    type="button"
                    class="min-h-11 w-full min-w-11 px-2 font-semibold tabular-nums {picked ===
                    r.value
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-700 hover:bg-indigo-50'} {focusRing}"
                    aria-pressed={picked === r.value}
                    aria-label={`Giá trị ${r.value}, tần số ${r.count}. Tô các dữ liệu bằng ${r.value}`}
                    onclick={() => (picked = picked === r.value ? null : r.value)}>{r.value}</button
                  >
                </td>
              {/each}
              <td class="{cell} bg-slate-50 font-semibold">Cộng</td>
            </tr>
            <tr>
              <th scope="row" class="{cell} bg-slate-50 text-left">Tần số (m)</th>
              {#each rows as r (r.value)}
                <td class="{cell} tabular-nums {picked === r.value ? 'bg-indigo-50 font-bold' : ''}"
                  >{r.count}</td
                >
              {/each}
              <td class="{cell} bg-slate-50 font-semibold tabular-nums">n = {n}</td>
            </tr>
          </tbody>
        </table>
      </div>
    {/if}
  </div>

  <FeedbackNote tone="info" text={summary} />

  <SegmentedControl
    label="Dạng biểu đồ tần số"
    bind:value={chart}
    options={[
      { value: 'bar', label: 'Dạng cột' },
      { value: 'line', label: 'Dạng đoạn thẳng' },
    ]}
  />
  {#if n > 0}
    {#if chart === 'bar'}
      <BarChart data={bars} unit="Tần số" title="Biểu đồ tần số dạng cột của điểm kiểm tra" />
    {:else}
      <LineChart
        labels={bars.map((b) => b.label)}
        series={line}
        unit="Tần số"
        width={380}
        height={260}
        title="Biểu đồ tần số dạng đoạn thẳng của điểm kiểm tra"
      />
    {/if}
    <p class="text-center text-sm text-slate-600">Trục ngang: điểm kiểm tra; trục đứng: tần số.</p>
  {/if}
</div>
