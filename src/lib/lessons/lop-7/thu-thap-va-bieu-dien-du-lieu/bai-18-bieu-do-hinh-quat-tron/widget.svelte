<script>
  import PieChart from '#lib/core/visuals/pie-chart.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { CHALLENGES, START, TOTAL, check, rows } from './engine.js';

  let data = $state(START.map((d) => ({ ...d })));
  let mode = $state('tu-do');

  const table = $derived(rows(data));
  const challenge = $derived(CHALLENGES.find((c) => c.id === mode));
  const status = $derived(challenge ? check(data, challenge) : null);
  const pct = (/** @type {number} */ p) => `${formatNumber(p, 1)}%`;
  const deg = (/** @type {number} */ a) => `${formatNumber(a, 1)}°`;
  const message = $derived(
    status
      ? status.text
      : table
          .map((r) => `${r.label}: ${r.count} bạn, ${pct(r.percent)}, góc ${deg(r.angle)}`)
          .join('; ') + '.',
  );

  function reset() {
    data = START.map((d) => ({ ...d }));
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Nhiệm vụ"
    options={[
      { value: 'tu-do', label: 'Tự do' },
      { value: 'phan-tram', label: 'Theo phần trăm' },
      { value: 'so-ban', label: 'Theo số bạn' },
      { value: 'goc', label: 'Theo góc ở tâm' },
    ]}
    bind:value={mode}
  />

  {#if challenge}
    <p class="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-950">
      {challenge.text}
    </p>
  {/if}

  <PieChart
    bind:data
    interactive
    decimals={1}
    snapPercent={2.5}
    title="Phương tiện đến trường của {TOTAL} học sinh lớp 7A"
  />

  <div class="overflow-x-auto">
    <table class="w-full min-w-72 text-sm">
      <caption class="pb-1 text-left text-xs text-slate-500">
        Mỗi bạn ứng với 100% : {TOTAL} = 2,5% và 360° : {TOTAL} = 9°.
      </caption>
      <thead>
        <tr class="border-b border-slate-300 text-left text-slate-600">
          <th class="py-1 pr-2 font-semibold">Phương tiện</th>
          <th class="py-1 pr-2 text-right font-semibold">Số bạn</th>
          <th class="py-1 pr-2 text-right font-semibold">Tỉ lệ</th>
          <th class="py-1 text-right font-semibold">Góc ở tâm</th>
        </tr>
      </thead>
      <tbody>
        {#each table as r, i (i)}
          <tr class="border-b border-slate-100">
            <td class="py-1 pr-2">{r.label}</td>
            <td class="py-1 pr-2 text-right tabular-nums">{r.count}</td>
            <td class="py-1 pr-2 text-right tabular-nums">{pct(r.percent)}</td>
            <td class="py-1 text-right tabular-nums">{deg(r.angle)}</td>
          </tr>
        {/each}
        <tr class="font-semibold">
          <td class="py-1 pr-2">Tổng</td>
          <td class="py-1 pr-2 text-right tabular-nums">{TOTAL}</td>
          <td class="py-1 pr-2 text-right tabular-nums">100%</td>
          <td class="py-1 text-right tabular-nums">360°</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
  </div>

  <p
    aria-live="polite"
    class="rounded-lg p-3 text-sm {status?.done
      ? 'bg-emerald-50 font-semibold text-emerald-900'
      : 'bg-slate-50 text-slate-800'}"
  >
    {message}
  </p>
</div>
