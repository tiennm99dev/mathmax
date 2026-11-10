<script>
  /**
   * A data table (bảng số liệu) as the grade 3 book prints it: a header row of
   * names, then a row per group, each headed by its name. Scrolls sideways
   * inside its card when wider than the screen.
   * @type {{ table: import('./visual.js').DataTable }}
   */
  let { table } = $props();

  const cell = 'border-2 border-slate-300 px-2 py-2 text-center';
</script>

<div class="overflow-x-auto rounded-2xl bg-white">
  <table class="w-full border-collapse text-lg text-slate-800">
    <caption class="pb-2 text-left text-base font-semibold text-slate-600">{table.caption}</caption>
    <thead>
      <tr>
        <th scope="col" class="{cell} bg-sky-100 text-left">{table.corner}</th>
        {#each table.head as name, i (i)}
          <th scope="col" class="{cell} bg-sky-50 font-semibold">{name}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each table.rows as row, r (r)}
        <tr>
          <th scope="row" class="{cell} bg-amber-50 text-left font-semibold">{row.label}</th>
          {#each row.cells as value, c (c)}
            <td class="{cell} text-xl font-bold tabular-nums">{value}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
