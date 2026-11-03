<script>
  import { fmt } from '#lib/core/number-format.js';
  import { sheetRows } from './columns.js';

  /**
   * A multiplication or division set out in columns as the book prints it. While
   * the question is open only the task is drawn; once it has ended, the working
   * and the result.
   * @type {{
   *   visual: { type: 'mul', a: number, b: number } | { type: 'div', n: number, d: number };
   *   settled: boolean;
   * }}
   */
  let { visual, settled } = $props();

  const box =
    'inline-flex rounded-2xl border-4 border-slate-300 bg-white p-3 text-2xl font-bold tabular-nums';
  const cell = 'flex h-9 w-7 items-center justify-center';
</script>

<div class="flex justify-center">
  {#if visual.type === 'mul'}
    <div
      class={box}
      role="img"
      aria-label="Đặt tính: {visual.a} nhân {visual.b}.{settled
        ? ` Kết quả: ${fmt(visual.a * visual.b)}.`
        : ''}"
    >
      <span class="flex h-[4.5rem] w-7 items-center justify-center text-slate-600">×</span>
      <div class="min-w-16 text-right">
        <div class="h-9 leading-9">{visual.a}</div>
        <div class="h-9 border-b-4 border-slate-700 leading-9">{visual.b}</div>
        <div class="h-9 leading-9 text-indigo-700">
          {settled ? visual.a * visual.b : '?'}
        </div>
      </div>
    </div>
  {:else}
    {@const q = Math.floor(visual.n / visual.d)}
    <div
      class={box}
      role="img"
      aria-label="Đặt tính: {visual.n} chia {visual.d}.{settled
        ? ` Thương: ${q}${visual.n % visual.d > 0 ? `, số dư: ${visual.n % visual.d}` : ''}.`
        : ''}"
    >
      <div class="border-r-4 border-slate-700 pr-2">
        {#each settled ? sheetRows(visual.n, visual.d) : sheetRows(visual.n, visual.d).slice(0, 1) as row, r (r)}
          <div class="flex {row.line ? 'border-b-4 border-slate-400' : ''}">
            {#each row.cells as digit, c (c)}
              <span class={cell}>{digit}</span>
            {/each}
          </div>
        {/each}
      </div>
      <div class="min-w-16">
        <div class="flex h-9 items-center justify-center border-b-4 border-slate-700 px-2">
          {visual.d}
        </div>
        <div class="flex h-9 items-center justify-center px-2 text-indigo-700">
          {settled ? q : '?'}
        </div>
      </div>
    </div>
  {/if}
</div>
