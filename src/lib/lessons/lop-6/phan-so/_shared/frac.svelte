<script>
  import { MINUS, fracText } from './fractions.js';

  /**
   * A fraction drawn stacked, numerator over a bar over denominator, in plain
   * HTML so widgets need no KaTeX. Screen readers hear the text form, such
   * as '−3/4'. With `whole`, a mixed number '1 3/4' is drawn. A denominator
   * of 1 is left out, so 6/1 shows as 6.
   * @type {{ n: number; d: number; whole?: number; signed?: boolean; size?: 'md' | 'lg' }}
   */
  let { n, d, whole, signed = false, size = 'md' } = $props();

  // `signed` keeps the sign written as given (3/−4); otherwise the sign goes
  // to the numerator and the denominator is shown positive.
  const num = $derived(signed ? n : d < 0 ? -n : n);
  const den = $derived(signed ? d : Math.abs(d));
  /** @param {number} v */
  const txt = (v) => (v < 0 ? `${MINUS}${-v}` : String(v));
  const spoken = $derived(
    whole !== undefined
      ? `${whole} và ${num}/${den}`
      : signed
        ? `${txt(n)}/${txt(d)}`
        : fracText(n, d),
  );
  const big = $derived(size === 'lg' ? 'text-2xl' : 'text-lg');
</script>

<span class="inline-flex items-center gap-1 align-middle {big} font-semibold tabular-nums">
  <span class="sr-only">{spoken}</span>
  {#if whole !== undefined}<span aria-hidden="true">{whole}</span>{/if}
  {#if den === 1 && !signed}
    <span aria-hidden="true">{txt(num)}</span>
  {:else}
    <span class="inline-flex flex-col items-center leading-tight" aria-hidden="true">
      <span class="px-0.5">{txt(num)}</span>
      <span class="w-full border-t-2 border-current"></span>
      <span class="px-0.5">{txt(den)}</span>
    </span>
  {/if}
</span>
