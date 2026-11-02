<script>
  /**
   * Rows of dots, `base` in each. Rows that are `ringed` carry a coloured ring
   * and the running count at their end; the others stay plain.
   * @type {{ base: number, rows: number, ringed: number, label: string, size?: number }}
   */
  let { base, rows, ringed, label, size = 26 } = $props();
</script>

<div
  class="flex flex-col items-center gap-1 rounded-2xl bg-sky-50 p-2"
  role="img"
  aria-label={label}
>
  {#each { length: rows } as _, r (r)}
    <div class="flex items-center gap-2">
      <div
        class="flex gap-1 rounded-full border-4 p-1 {r < ringed
          ? 'border-indigo-400 bg-white'
          : 'border-transparent'}"
      >
        {#each { length: base } as _, i (i)}
          <span
            class="block rounded-full {r < ringed ? 'bg-indigo-500' : 'bg-amber-400'}"
            style="width: {size}px; height: {size}px"
          ></span>
        {/each}
      </div>
      <span class="w-8 text-lg font-bold tabular-nums text-indigo-700"
        >{r < ringed ? base * (r + 1) : ''}</span
      >
    </div>
  {/each}
</div>
