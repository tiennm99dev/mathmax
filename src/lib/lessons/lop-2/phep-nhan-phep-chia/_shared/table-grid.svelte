<script>
  /**
   * The ten rows of a multiplication table, filled in as a child builds it:
   * rows up to `shown` give their product, later rows wait with a "?", and the
   * newest row stands out.
   * @type {{ base: number, shown: number }}
   */
  let { base, shown } = $props();
</script>

<ol
  class="grid grid-flow-col grid-cols-2 grid-rows-5 gap-2"
  aria-label="Bảng nhân {base}, đã lập {shown} dòng"
>
  {#each { length: 10 } as _, i (i)}
    {@const n = i + 1}
    <li
      class="rounded-xl px-3 py-2 text-center text-xl font-bold tabular-nums {n === shown
        ? 'bg-amber-200 text-amber-950'
        : n < shown
          ? 'bg-emerald-100 text-emerald-900'
          : 'bg-slate-100 text-slate-600'}"
    >
      {base} × {n} = {n <= shown ? base * n : '?'}
    </li>
  {/each}
</ol>
