<script>
  import { countLabel } from '#lib/core/kid/quiz.js';
  import ChartSymbol from './chart-symbol.svelte';

  /**
   * A kid picture chart (biểu đồ tranh): one row per category, one picture per
   * thing, every picture in a fixed column so the rows can be compared by eye.
   * Ten pictures fit on a line. Until `settled` the rows give no number, and a
   * screen reader hears one word per picture, so a child can still count.
   * @type {{
   *   rows: ReadonlyArray<{
   *     label: string;
   *     count: number;
   *     symbol: import('./survey.js').ChartSymbol;
   *   }>;
   *   title: string;
   *   settled?: boolean;
   * }}
   */
  let { rows, title, settled = false } = $props();

  const label = $derived(
    `${title}. ` +
      rows.map((r) => `${r.label}: ${countLabel('hình', r.count, settled)}`).join('. ') +
      '.',
  );
</script>

<figure class="rounded-2xl border border-slate-200 bg-white p-3" role="img" aria-label={label}>
  <figcaption class="mb-2 text-base font-bold text-slate-700">{title}</figcaption>
  <div class="space-y-2">
    {#each rows as row (row.label)}
      <div class="border-t border-slate-100 pt-2">
        <p class="text-base font-semibold text-slate-700">
          {row.label}{#if settled}: {row.count}{/if}
        </p>
        <div class="mt-1 grid min-h-7 grid-cols-10 gap-0.5">
          {#each { length: row.count } as _, i (i)}
            <span class="flex items-center justify-center">
              <ChartSymbol symbol={row.symbol} size={24} />
            </span>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</figure>
