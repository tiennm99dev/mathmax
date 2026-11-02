<script>
  import { signOf, signWord } from '#lib/core/kid/column.js';
  import { digitAt } from './column-three.js';

  /**
   * A three-digit calculation set out in columns as the book prints it: the
   * two numbers with ones under ones, the sign on the left, a line and the
   * result digits written so far. Static: the parent changes the props. The
   * small carried 1 ("nhớ 1") shows in the column that receives it.
   *
   * - `written`: result digits written so far, `null` while still empty.
   * - `carried`: the column holding the carried 1, or null.
   * - `active`: the column being worked on, tinted, or null.
   * @type {{
   *   a: number;
   *   b: number;
   *   op: import('#lib/core/kid/column.js').Op;
   *   written: Record<import('./column-three.js').Place, number | null>;
   *   carried?: import('./column-three.js').Place | null;
   *   active?: import('./column-three.js').Place | null;
   * }}
   */
  let { a, b, op, written, carried = null, active = null } = $props();

  /** @type {Array<{ key: import('./column-three.js').Place, title: string }>} */
  const COLUMNS = [
    { key: 'hundreds', title: 'Trăm' },
    { key: 'tens', title: 'Chục' },
    { key: 'ones', title: 'Đơn vị' },
  ];

  const label = $derived.by(() => {
    const parts = COLUMNS.map(
      (c) => `hàng ${c.title.toLowerCase()} ${written[c.key] === null ? '?' : written[c.key]}`,
    );
    const carry = carried ? ' Đã nhớ 1.' : '';
    return `Đặt tính: ${a} ${signWord(op)} ${b}.${carry} Kết quả: ${parts.join(', ')}.`;
  });

  /** @param {import('./column-three.js').Place} place */
  const tint = (place) => (active === place ? 'bg-indigo-100' : 'bg-white');
</script>

<div
  class="inline-grid grid-cols-[2rem_3.25rem_3.25rem_3.25rem] overflow-hidden rounded-2xl border-4 border-slate-300 bg-white text-center text-3xl font-bold tabular-nums"
  role="img"
  aria-label={label}
>
  <span class="bg-white"></span>
  {#each COLUMNS as c (c.key)}
    <span class="py-1 text-xs font-semibold text-slate-600 {tint(c.key)}">{c.title}</span>
  {/each}

  <span class="bg-white"></span>
  {#each COLUMNS as c (c.key)}
    <span class="py-1 text-slate-800 {tint(c.key)}">{digitAt(a, c.key) ?? ''}</span>
  {/each}

  <span class="self-start bg-white text-2xl text-slate-600">{signOf(op)}</span>
  {#each COLUMNS as c (c.key)}
    <span class="relative min-h-11 py-1 text-slate-800 {tint(c.key)}">
      {digitAt(b, c.key) ?? ''}
      {#if carried === c.key}
        <span
          class="absolute left-0.5 top-0 rounded-full bg-rose-100 px-1 text-base leading-5 text-rose-700"
          >1</span
        >
      {/if}
    </span>
  {/each}

  <span class="col-span-4 mx-2 h-1 rounded bg-slate-700"></span>

  <span class="bg-white"></span>
  {#each COLUMNS as c (c.key)}
    <span class="min-h-12 py-1 text-indigo-700 {tint(c.key)}">{written[c.key] ?? ''}</span>
  {/each}
</div>
