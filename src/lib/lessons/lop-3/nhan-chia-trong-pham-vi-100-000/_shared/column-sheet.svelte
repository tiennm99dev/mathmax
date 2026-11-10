<script>
  import { fmt } from '#lib/core/number-format.js';
  import { COLUMNS, PLACE_NAMES, digitsOf } from './columns.js';

  /**
   * A five-digit number times a digit set out in columns as the book prints
   * it: the place names on top, the digit under the ones, the × sign on the
   * left, a line and the product digits written so far. A carry shows small
   * and red above the column it goes to. Static: the parent changes `sheet`.
   * @type {{ a: number, b: number, sheet: import('./columns.js').Sheet }}
   */
  let { a, b, sheet } = $props();

  /** Columns from the left, as indices from the ones. */
  const ORDER = Array.from({ length: COLUMNS }, (_, i) => COLUMNS - 1 - i);
  const TITLES = ['Đơn vị', 'Chục', 'Trăm', 'Nghìn', 'Chục nghìn'];

  const top = $derived(digitsOf(a));
  const bottom = $derived(digitsOf(b));

  const label = $derived.by(() => {
    const result = ORDER.map((c) => sheet.written[c])
      .filter((d) => d !== '')
      .join(' ');
    return `Đặt tính ${fmt(a)} nhân ${b}. Kết quả đã viết: ${result || 'chưa có'}.${
      sheet.active === null ? '' : ` Đang tính hàng ${PLACE_NAMES[sheet.active]}.`
    }`;
  });

  /** @param {number} col */
  const tint = (col) => (sheet.active === col ? 'bg-amber-100' : 'bg-white');
  const cell = 'relative flex h-12 items-center justify-center';
</script>

<div
  class="inline-grid grid-cols-[1.75rem_repeat(5,3.25rem)] overflow-hidden rounded-2xl border-4 border-slate-300 bg-white text-center text-3xl font-bold tabular-nums"
  role="img"
  aria-label={label}
>
  <span></span>
  {#each ORDER as col (col)}
    <span
      class="flex items-end justify-center py-1 text-xs font-semibold leading-tight text-slate-600 {tint(
        col,
      )}">{TITLES[col]}</span
    >
  {/each}

  <span></span>
  {#each ORDER as col (col)}
    <span class="{cell} text-slate-800 {tint(col)}">
      {#if sheet.carries[col] > 0}
        <span class="pop absolute right-0.5 top-0 text-base leading-5 text-rose-600"
          >{sheet.carries[col]}</span
        >
      {/if}
      {top[col] ?? ''}
    </span>
  {/each}

  <span class="self-start pt-1 text-2xl text-slate-600">×</span>
  {#each ORDER as col (col)}
    <span class="{cell} text-slate-800 {tint(col)}">{bottom[col] ?? ''}</span>
  {/each}

  <span class="col-span-6 mx-2 h-1 rounded bg-slate-700"></span>

  <span></span>
  {#each ORDER as col (col)}
    <span class="{cell} text-indigo-700 {tint(col)}">{sheet.written[col]}</span>
  {/each}
</div>

<style>
  .pop {
    display: inline-block;
  }

  @media (prefers-reduced-motion: no-preference) {
    .pop {
      animation: pop-in 500ms ease-out both;
    }
  }

  @keyframes pop-in {
    from {
      opacity: 0;
      transform: translateX(-1.5rem) scale(1.4);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }
</style>
