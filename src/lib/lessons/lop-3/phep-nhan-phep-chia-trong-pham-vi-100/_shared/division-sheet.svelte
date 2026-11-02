<script>
  /**
   * A division set out in columns as the book prints it. Static: the parent
   * changes the props as the child works.
   * @type {{
   *   rows: import('./division.js').SheetRow[];
   *   divisor: number;
   *   quotient: string;
   *   label: string;
   * }}
   */
  let { rows, divisor, quotient, label } = $props();

  const cell = 'flex h-11 w-9 items-center justify-center';
  const tint = 'rounded-lg bg-amber-200';
</script>

<div
  class="inline-flex rounded-2xl border-4 border-slate-300 bg-white p-3 text-3xl font-bold tabular-nums"
  role="img"
  aria-label={label}
>
  <div class="border-r-4 border-slate-700 pr-2">
    {#each rows as row, i (i)}
      <div class="flex {row.line ? 'border-b-4 border-slate-400' : ''}">
        <span class="{cell} {row.active ? tint : ''}">{row.t}</span>
        <span class="{cell} {row.active === 'both' ? tint : ''}">{row.o}</span>
      </div>
    {/each}
  </div>
  <div class="min-w-20">
    <div class="flex h-11 items-center justify-center border-b-4 border-slate-700 px-2">
      {divisor}
    </div>
    <div class="flex h-11 items-center justify-center px-2 text-indigo-700">{quotient}</div>
  </div>
</div>
