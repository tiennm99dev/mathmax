<script>
  /**
   * Counting sticks (que tính) drawn the way the book shows a two-digit
   * number: bundles of ten sticks tied with a band for the tens, loose
   * sticks for the ones. Static: the parent changes `tens` and `ones`.
   *
   * - `tens`: bundles of ten (0 to 10).
   * - `ones`: loose sticks (0 to 10; ten loose sticks are waiting to be tied).
   * - `small`: draws shorter sticks, for two numbers side by side.
   * @type {{ tens: number; ones: number; small?: boolean }}
   */
  let { tens, ones, small = false } = $props();

  const h = $derived(small ? 46 : 64);
  const label = $derived(
    tens === 0 && ones === 0
      ? 'Không có que tính nào'
      : `${tens} bó một chục que tính và ${ones} que tính rời`,
  );
</script>

<div class="flex flex-wrap items-end gap-x-3 gap-y-2" role="img" aria-label={label}>
  {#if tens > 0}
    <div class="flex flex-wrap items-end gap-1.5">
      {#each { length: tens } as _, i (i)}
        <svg width={small ? 22 : 30} height={h} viewBox="0 0 30 64" aria-hidden="true">
          {#each { length: 10 } as _, k (k)}
            <rect x={1 + k * 2.8} y="2" width="2.2" height="60" rx="1" fill="#f59e0b" />
          {/each}
          <rect x="0" y="27" width="30" height="8" rx="2" fill="#dc2626" />
        </svg>
      {/each}
    </div>
  {/if}
  {#if ones > 0}
    <div class="flex flex-wrap items-end gap-1.5">
      {#each { length: ones } as _, i (i)}
        <svg width={small ? 5 : 7} height={h} viewBox="0 0 7 64" aria-hidden="true">
          <rect x="1" y="2" width="5" height="60" rx="2" fill="#f59e0b" stroke="#b45309" />
        </svg>
      {/each}
    </div>
  {/if}
  {#if tens === 0 && ones === 0}
    <span class="text-lg text-slate-500">Chưa có que tính nào</span>
  {/if}
</div>
