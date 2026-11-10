<script>
  import { fmt } from '#lib/core/number-format.js';
  import { columnValue, sheetRows } from './columns.js';

  /**
   * An operation set out in columns as the book prints it. While the question
   * is open only the task is drawn; once it has ended, the result (and for a
   * division the working).
   * @type {{
   *   visual:
   *     | { type: 'column', op: import('./columns.js').ColumnOp, a: number, b: number }
   *     | { type: 'div', n: number, d: number };
   *   settled: boolean;
   * }}
   */
  let { visual, settled } = $props();

  const WORDS = { '+': 'cộng', '−': 'trừ', '×': 'nhân' };
  const box =
    'inline-flex rounded-2xl border-4 border-slate-300 bg-white p-3 text-2xl font-bold tabular-nums';
  const cell = 'flex h-9 w-6 items-center justify-center';

  /**
   * The digits of `n` right-aligned in `size` cells.
   * @param {number} n
   * @param {number} size
   */
  const cells = (n, size) => String(n).padStart(size, ' ').split('');
</script>

<div class="flex justify-center overflow-x-auto">
  {#if visual.type === 'column'}
    {@const result = columnValue(visual.op, visual.a, visual.b)}
    {@const size = Math.max(
      String(visual.a).length,
      String(visual.b).length,
      String(result).length,
    )}
    <div
      class={box}
      role="img"
      aria-label="Đặt tính: {fmt(visual.a)} {WORDS[visual.op]} {fmt(visual.b)}.{settled
        ? ` Kết quả: ${fmt(result)}.`
        : ''}"
    >
      <span class="flex h-[4.5rem] w-6 items-center justify-center text-slate-600">{visual.op}</span
      >
      <div>
        <div class="flex">
          {#each cells(visual.a, size) as d, i (i)}<span class={cell}>{d}</span>{/each}
        </div>
        <div class="flex border-b-4 border-slate-700">
          {#each cells(visual.b, size) as d, i (i)}<span class={cell}>{d}</span>{/each}
        </div>
        <div class="flex text-indigo-700">
          {#if settled}
            {#each cells(result, size) as d, i (i)}<span class={cell}>{d}</span>{/each}
          {:else}
            <span class="{cell} w-full">?</span>
          {/if}
        </div>
      </div>
    </div>
  {:else}
    {@const q = Math.floor(visual.n / visual.d)}
    {@const rows = sheetRows(visual.n, visual.d)}
    <div
      class={box}
      role="img"
      aria-label="Đặt tính: {fmt(visual.n)} chia {visual.d}.{settled
        ? ` Thương: ${fmt(q)}${visual.n % visual.d > 0 ? `, số dư: ${visual.n % visual.d}` : ''}.`
        : ''}"
    >
      <div class="border-r-4 border-slate-700 pr-2">
        {#each settled ? rows : rows.slice(0, 1) as row, r (r)}
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
