<script>
  import { button, focusRing, textInput } from '#lib/core/ui.js';
  import { fmt, formatNumber, readNatural } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import {
    GROUPS,
    PRESETS,
    balanceVerdict,
    budgetReport,
    compareWithTarget,
    roundTo,
  } from './engine.js';

  const STEP = 10000;
  const MAX = 99990000;
  /** The split a group of students agreed on in the book: 50 % – 40 % – 10 %. */
  const TARGET = [50, 40, 10];

  let preset = $state(PRESETS[0].value);
  /** @type {import('./engine.js').Item[]} */
  let items = $state(PRESETS[0].items.map((it) => ({ ...it })));
  let income = $state(PRESETS[0].income);
  let nextId = $state(100);

  const period = $derived(PRESETS.find((p) => p.value === preset)?.period ?? 'tháng');
  const report = $derived(budgetReport(items, income));
  const pct2 = (/** @type {number} */ v) => formatNumber(roundTo(v, 2), 2);
  const compare = $derived(compareWithTarget(report.groups, TARGET));
  const verdict = $derived(balanceVerdict(report.total, income, fmt, pct2));
  const chart = $derived(
    report.groups.map((g) => ({ label: g.short, value: roundTo(g.percent, 0), color: g.color })),
  );

  /** @param {string | number} value */
  function choose(value) {
    const p = PRESETS.find((x) => x.value === value) ?? PRESETS[0];
    preset = p.value;
    items = p.items.map((it) => ({ ...it }));
    income = p.income;
  }

  /** @param {number} n */
  const clampMoney = (n) => Math.max(0, Math.min(MAX, Math.round(n / STEP) * STEP));

  /** @param {number} i @param {number} delta */
  function nudge(i, delta) {
    items[i].amount = clampMoney(items[i].amount + delta);
  }

  /**
   * Reads a typed amount; an unreadable entry puts the old value back.
   * @param {Event} e
   * @param {(n: number) => void} set
   * @param {number} old
   */
  function typed(e, set, old) {
    const el = /** @type {HTMLInputElement} */ (e.currentTarget);
    const n = readNatural(el.value);
    const v = n === null ? old : clampMoney(n);
    set(v);
    el.value = fmt(v);
  }

  function addItem() {
    items.push({ id: nextId, label: 'Khoản chi mới', amount: 50000, group: 'phat-sinh' });
    nextId += 1;
  }

  /** @param {number} i */
  function removeItem(i) {
    items.splice(i, 1);
  }

  const statusText = {
    ok: 'gần mức dự kiến',
    over: 'cao hơn dự kiến',
    under: 'thấp hơn dự kiến',
  };
  const headId = $props.id();
  const small = `h-11 w-11 shrink-0 rounded-lg border border-slate-300 bg-white text-lg font-bold text-slate-700 hover:bg-slate-100 ${focusRing}`;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn bảng dữ liệu ban đầu"
    options={PRESETS.map((p) => ({ value: p.value, label: p.label }))}
    value={preset}
    onchange={choose}
  />

  <label class="block max-w-sm">
    <span class="mb-1 block text-sm font-semibold text-slate-700"
      >Số tiền có thể chi trong một {period} (đồng)</span
    >
    <input
      class={textInput}
      inputmode="numeric"
      value={fmt(income)}
      onchange={(e) => typed(e, (v) => (income = v), income)}
    />
  </label>

  <section aria-labelledby={headId} class="space-y-2">
    <p id={headId} class="text-sm font-semibold text-slate-700">
      Bảng thu chi: sửa tên, số tiền và chọn nhóm cho từng khoản
    </p>
    <ul class="space-y-2">
      {#each items as it, i (it.id)}
        <li class="grid gap-2 rounded-lg border border-slate-200 p-2 sm:grid-cols-[1fr_auto]">
          <div class="flex gap-1">
            <input
              class="{textInput} text-base"
              aria-label="Tên khoản chi thứ {i + 1}"
              bind:value={it.label}
            />
            <button
              type="button"
              class={small}
              aria-label="Xoá khoản {it.label}"
              onclick={() => removeItem(i)}>×</button
            >
          </div>
          <div class="flex items-center gap-1">
            <button
              type="button"
              class={small}
              aria-label="Bớt 10 000 đồng cho khoản {it.label}"
              onclick={() => nudge(i, -STEP)}>−</button
            >
            <input
              class="{textInput} min-w-0 flex-1 text-right text-base"
              inputmode="numeric"
              aria-label="Số tiền khoản {it.label}, đồng"
              value={fmt(it.amount)}
              onchange={(e) => typed(e, (v) => (it.amount = v), it.amount)}
            />
            <button
              type="button"
              class={small}
              aria-label="Thêm 10 000 đồng cho khoản {it.label}"
              onclick={() => nudge(i, STEP)}>+</button
            >
            <span class="ml-auto w-16 text-right font-semibold tabular-nums text-slate-800"
              >{pct2(report.rows[i]?.percent ?? 0)}%</span
            >
          </div>
          <select
            class="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-2 text-sm sm:col-span-2 {focusRing}"
            aria-label="Nhóm của khoản {it.label}"
            bind:value={it.group}
          >
            {#each GROUPS as g (g.value)}
              <option value={g.value}>{g.label}</option>
            {/each}
          </select>
        </li>
      {/each}
    </ul>
    <p class="flex justify-between rounded-lg bg-slate-50 p-2 text-sm font-semibold tabular-nums">
      <span>Tổng cộng</span>
      <span>{fmt(report.total)} đồng ({report.total ? 100 : 0}%)</span>
    </p>
  </section>
  <button type="button" class={button.quiet} onclick={addItem}>Thêm khoản chi</button>

  <div class="grid gap-4 md:grid-cols-2">
    <div class="space-y-3">
      <p class="text-sm font-semibold text-slate-700">Bảng phân tích theo nhóm</p>
      <ul class="space-y-2 text-sm">
        {#each report.groups as g, k (g.value)}
          <li class="rounded-lg border border-slate-200 p-2">
            <span
              class="mr-1 inline-block h-3 w-3 rounded-sm"
              style:background={g.color}
              aria-hidden="true"
            ></span>
            <span class="font-semibold">{g.label}</span>: {fmt(g.amount)} đồng, khoảng
            <span class="font-semibold tabular-nums">{formatNumber(roundTo(g.percent, 0))}%</span>
            ({pct2(g.percent)}%), {statusText[
              /** @type {'ok' | 'over' | 'under'} */ (compare[k].status)
            ]} ({TARGET[k]}%).
          </li>
        {/each}
      </ul>
      <svg
        viewBox="0 0 300 28"
        class="block w-full"
        role="img"
        aria-label="Tỉ lệ ba nhóm chi trên một thanh 100%"
      >
        {#each report.groups as g, k (g.value)}
          {@const x = report.groups.slice(0, k).reduce((s, h) => s + h.percent, 0) * 3}
          <rect {x} y="2" width={g.percent * 3} height="24" fill={g.color} />
        {/each}
        {#if !report.total}
          <rect x="0" y="2" width="300" height="24" fill="#E2E8F0" />
        {/if}
      </svg>
    </div>
    <BarChart
      data={chart}
      max={100}
      unit="Tỉ lệ (%)"
      title="Biểu đồ cột tỉ lệ ba nhóm chi"
      width={320}
      height={240}
    />
  </div>

  <p
    class="rounded-lg p-3 text-sm {report.total > income
      ? 'bg-rose-50 font-semibold text-rose-900'
      : 'bg-emerald-50 text-emerald-900'}"
    aria-live="polite"
  >
    Tổng chi {fmt(report.total)} đồng, bằng {pct2(report.spentOfIncome)}% số tiền có. {verdict}
  </p>
</div>
