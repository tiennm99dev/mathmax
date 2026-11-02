<script>
  import SolidFigure from './solid-figure.svelte';

  /**
   * Cylinder boxes in a stack: one on the top row, then two, three, and so on
   * down. The screen-reader name lists the rows, so a child can still add them.
   *
   * - `rows`: how many rows; `size`: the width of one box in CSS pixels.
   * @type {{ rows: number, size?: number }}
   */
  let { rows, size = 44 } = $props();

  const rowList = $derived(Array.from({ length: rows }, (_, i) => i + 1));
</script>

<div
  role="img"
  aria-label="Các hộp dạng khối trụ xếp chồng, từ trên xuống: {rowList
    .map((n) => `hàng ${n} hộp`)
    .join(', ')}"
  class="flex flex-col items-center"
>
  {#each rowList as n (n)}
    <div class="-mt-2 flex justify-center first:mt-0">
      {#each { length: n }, i (i)}
        <span class="-mx-1"><SolidFigure kind="tru" color="#fbbf24" {size} decorative /></span>
      {/each}
    </div>
  {/each}
</div>
