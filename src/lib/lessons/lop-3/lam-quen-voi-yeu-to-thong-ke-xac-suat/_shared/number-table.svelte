<script>
  import DataSymbol from './data-symbol.svelte';

  /**
   * A data table (bảng số liệu) laid out the way the grade 3 book prints it:
   * the first row names the categories, the second gives each count. A count
   * of `null` shows as an empty cell still to fill. The table scrolls sideways
   * inside its card when it is wider than the screen.
   *
   * - `caption`: the table's title, read first.
   * - `nameHead`, `countHead`: the headers of the two rows ("Loại quả",
   *   "Số lượng").
   * - `columns`: `{ label, symbol?, count, highlight? }` per category.
   * @type {{
   *   caption: string;
   *   nameHead: string;
   *   countHead: string;
   *   columns: Array<{
   *     label: string;
   *     symbol?: import('./data.js').DataSymbol;
   *     count: number | null;
   *     highlight?: boolean;
   *   }>;
   * }}
   */
  let { caption, nameHead, countHead, columns } = $props();

  const cell = 'border-2 border-slate-300 px-2 py-2 text-center';
</script>

<div class="overflow-x-auto rounded-2xl bg-white">
  <table class="w-full border-collapse text-lg text-slate-800">
    <caption class="pb-2 text-left text-base font-semibold text-slate-600">{caption}</caption>
    <tbody>
      <tr>
        <th scope="row" class="{cell} bg-sky-100 text-left font-bold">{nameHead}</th>
        {#each columns as col, i (i)}
          <th scope="col" class="{cell} bg-sky-50 font-semibold">
            <span class="flex flex-col items-center gap-1">
              {#if col.symbol}<DataSymbol symbol={col.symbol} size={30} />{/if}
              <span class="text-base leading-tight">{col.label}</span>
            </span>
          </th>
        {/each}
      </tr>
      <tr>
        <th scope="row" class="{cell} bg-amber-100 text-left font-bold">{countHead}</th>
        {#each columns as col, i (i)}
          <td
            class="{cell} text-2xl font-bold tabular-nums transition-colors {col.highlight
              ? 'bg-emerald-100 text-emerald-900'
              : ''}"
          >
            {#if col.count === null}<span class="text-slate-400" aria-hidden="true">?</span><span
                class="sr-only">chưa điền</span
              >{:else}{col.count}{/if}
          </td>
        {/each}
      </tr>
    </tbody>
  </table>
</div>
