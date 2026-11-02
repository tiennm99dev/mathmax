<script>
  import { signOf, signWord } from '#lib/core/kid/column.js';
  import { PLACE_NAMES, VALUES, digitOf } from './columns.js';

  /**
   * A calculation set out in columns as the book prints it, for numbers up to
   * three digits: ones under ones, the sign on the left, a line and the result
   * digits written so far. Static: the parent changes the props. The small
   * carried 1 ("nhớ 1") shows in the column that receives it.
   *
   * - `written`: result digits by column, ones first; null while still empty.
   * - `carried`: the column holding the carried 1, or null.
   * - `active`: the column being worked on, tinted, or null.
   * - `width`: how many columns to draw.
   * @type {{
   *   a: number;
   *   b: number;
   *   op: import('#lib/core/kid/column.js').Op;
   *   written: Array<number | null>;
   *   width: number;
   *   carried?: number | null;
   *   active?: number | null;
   * }}
   */
  let { a, b, op, written, width, carried = null, active = null } = $props();

  const columns = $derived(Array.from({ length: width }, (_, i) => width - 1 - i));
  const label = $derived.by(() => {
    const parts = columns.map((i) => `hàng ${PLACE_NAMES[i]} ${written[i] ?? 'chưa viết'}`);
    const carry = carried !== null ? ` Đã nhớ 1 sang hàng ${PLACE_NAMES[carried]}.` : '';
    return `Đặt tính: ${a} ${signWord(op)} ${b}.${carry} Kết quả: ${parts.join(', ')}.`;
  });

  /** @param {number} i */
  const tint = (i) => (active === i ? 'bg-indigo-100' : 'bg-white');
  /**
   * @param {number} n
   * @param {number} i
   */
  const digit = (n, i) => digitOf(n, VALUES[i]) ?? '';
</script>

<div
  class="inline-grid overflow-hidden rounded-2xl border-4 border-slate-300 bg-white text-center text-3xl font-bold tabular-nums"
  style="grid-template-columns: 2rem repeat({width}, 3.25rem)"
  role="img"
  aria-label={label}
>
  <span></span>
  {#each columns as i (i)}
    <span class="py-1 text-xs font-semibold text-slate-600 first-letter:uppercase {tint(i)}"
      >{PLACE_NAMES[i]}</span
    >
  {/each}

  <span></span>
  {#each columns as i (i)}
    <span class="py-1 text-slate-800 {tint(i)}">{digit(a, i)}</span>
  {/each}

  <span class="self-start text-2xl text-slate-600">{signOf(op)}</span>
  {#each columns as i (i)}
    <span class="relative min-h-11 py-1 text-slate-800 {tint(i)}">
      {digit(b, i)}
      {#if carried === i}
        <span
          class="absolute left-0.5 top-0 rounded-full bg-rose-100 px-1 text-base leading-5 text-rose-700"
          >1</span
        >
      {/if}
    </span>
  {/each}

  <span class="mx-2 h-1 rounded bg-slate-700" style="grid-column: 1 / -1"></span>

  <span></span>
  {#each columns as i (i)}
    <span class="min-h-12 py-1 text-indigo-700 {tint(i)}">{written[i] ?? ''}</span>
  {/each}
</div>
