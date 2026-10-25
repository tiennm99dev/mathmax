<script>
  import { percentages } from '#lib/stats-engine/frequency.js';
  import { formatNumber } from '#lib/units-engine/format.js';
  import { focusRing } from '../ui.js';

  /**
   * A statistics table (bảng thống kê): one row per category with its count,
   * optional tally marks drawn in SVG (bảng kiểm đếm, bundles of five) and
   * optional percentages that add up to 100. With `editable`, each count is
   * a number field with − and + buttons, so the table can feed a chart.
   * It is an HTML table rather than SVG so screen readers can walk it by cell.
   *
   * - `rows` (bindable): `{ label, count }`. Bind it to read edits; the
   *   component replaces the array on each change.
   * - `headers`: column titles for the category and the count.
   * - `showTally`, `showPercent`, `showTotal`: extra columns and the total row.
   * - `caption`: the table's title, read out first.
   *
   * @type {{
   *   rows?: Array<{ label: string, count: number }>;
   *   headers?: { label: string, count: string, tally?: string, percent?: string };
   *   showTally?: boolean;
   *   showPercent?: boolean;
   *   showTotal?: boolean;
   *   editable?: boolean;
   *   max?: number;
   *   caption?: string;
   *   onchange?: (rows: Array<{ label: string, count: number }>) => void;
   * }}
   */
  let {
    rows = $bindable([]),
    headers = { label: 'Loại', count: 'Số lượng', tally: 'Kiểm đếm', percent: 'Tỉ lệ' },
    showTally = false,
    showPercent = false,
    showTotal = true,
    editable = false,
    max = 99,
    caption = '',
    onchange,
  } = $props();

  const total = $derived(rows.reduce((s, r) => s + r.count, 0));
  const pct = $derived(percentages(rows.map((r) => r.count)));

  /** @param {number} i @param {number} count */
  function setCount(i, count) {
    const next = Math.max(0, Math.min(max, Math.round(Number.isFinite(count) ? count : 0)));
    if (next === rows[i].count) return;
    rows = rows.map((r, j) => (j === i ? { ...r, count: next } : r));
    onchange?.(rows);
  }

  const cell = 'border border-slate-200 px-3 py-2';
  const stepper = `h-11 w-11 shrink-0 rounded-lg border border-slate-300 bg-white text-lg font-bold text-slate-700 hover:bg-slate-100 ${focusRing}`;
</script>

{#snippet tally(/** @type {number} */ n)}
  <!-- Bundles of five: four strokes and a slash across them. -->
  <span class="inline-flex flex-wrap gap-2" aria-hidden="true">
    {#each { length: Math.ceil(n / 5) } as _, b (b)}
      {@const inBundle = Math.min(5, n - b * 5)}
      <svg width="30" height="24" viewBox="0 0 30 24">
        {#each { length: Math.min(4, inBundle) } as _, k (k)}
          <line x1={4 + k * 6} y1="3" x2={4 + k * 6} y2="21" stroke="#334155" stroke-width="2.2" />
        {/each}
        {#if inBundle === 5}
          <line x1="0" y1="18" x2="28" y2="6" stroke="#D7263D" stroke-width="2.2" />
        {/if}
      </svg>
    {/each}
  </span>
{/snippet}

<div class="max-w-full overflow-x-auto">
  <table class="mx-auto border-collapse bg-white text-left text-slate-800">
    {#if caption}
      <caption class="pb-2 text-center font-semibold text-slate-700">{caption}</caption>
    {/if}
    <thead class="bg-slate-50 text-sm font-semibold text-slate-600">
      <tr>
        <th scope="col" class={cell}>{headers.label}</th>
        {#if showTally}<th scope="col" class={cell}>{headers.tally ?? 'Kiểm đếm'}</th>{/if}
        <th scope="col" class="{cell} text-right">{headers.count}</th>
        {#if showPercent}<th scope="col" class="{cell} text-right">{headers.percent ?? 'Tỉ lệ'}</th
          >{/if}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, i (i)}
        <tr>
          <th scope="row" class="{cell} font-medium">{row.label}</th>
          {#if showTally}<td class={cell}>{@render tally(row.count)}</td>{/if}
          <td class="{cell} text-right tabular-nums">
            {#if editable}
              <div class="flex items-center justify-end gap-1">
                <button
                  type="button"
                  class={stepper}
                  aria-label="Bớt 1 {row.label}"
                  disabled={row.count <= 0}
                  onclick={() => setCount(i, row.count - 1)}>−</button
                >
                <input
                  type="number"
                  inputmode="numeric"
                  min="0"
                  {max}
                  class="h-11 w-16 rounded-lg border border-slate-300 px-2 text-right text-lg tabular-nums {focusRing}"
                  aria-label="{headers.count} {row.label}"
                  value={row.count}
                  onchange={(e) => setCount(i, Number(e.currentTarget.value))}
                />
                <button
                  type="button"
                  class={stepper}
                  aria-label="Thêm 1 {row.label}"
                  disabled={row.count >= max}
                  onclick={() => setCount(i, row.count + 1)}>+</button
                >
              </div>
            {:else}
              {row.count}
            {/if}
          </td>
          {#if showPercent}
            <td class="{cell} text-right tabular-nums">{formatNumber(pct[i])}%</td>
          {/if}
        </tr>
      {/each}
    </tbody>
    {#if showTotal}
      <tfoot class="bg-slate-50 font-semibold">
        <tr>
          <th scope="row" class={cell}>Tổng</th>
          {#if showTally}<td class={cell}></td>{/if}
          <td class="{cell} text-right tabular-nums">{total}</td>
          {#if showPercent}<td class="{cell} text-right tabular-nums"
              >{total > 0 ? '100%' : '0%'}</td
            >{/if}
        </tr>
      </tfoot>
    {/if}
  </table>
</div>
