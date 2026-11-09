<script>
  import { button } from '#lib/core/ui.js';

  /**
   * Ten big digit buttons, for writing one digit of a calculation.
   * @type {{ label: string, onpick: (digit: number) => void }}
   */
  let { label, onpick } = $props();

  const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<div class="grid grid-cols-5 gap-2" role="group" aria-label={label}>
  {#each DIGITS as digit (digit)}
    <button
      type="button"
      class="min-h-14 px-0 text-2xl tabular-nums {button.quiet}"
      onclick={() => onpick(digit)}>{digit}</button
    >
  {/each}
</div>
