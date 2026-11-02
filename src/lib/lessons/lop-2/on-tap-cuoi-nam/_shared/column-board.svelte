<script>
  import { signOf, signWord } from '#lib/core/kid/column.js';

  /**
   * A calculation set out in columns as the book prints it, for numbers up to
   * three digits: the two numbers with ones under ones, the sign on the left,
   * a line and the result, which stays empty while `result` is null. Static:
   * the parent changes the props.
   * @type {{
   *   a: number;
   *   b: number;
   *   op: import('#lib/core/kid/column.js').Op;
   *   result?: number | null;
   * }}
   */
  let { a, b, op, result = null } = $props();

  const TITLES = ['Đơn vị', 'Chục', 'Trăm'];

  /**
   * The digits of a number from the left, padded with empty places.
   * @param {number | null} n
   * @param {number} width
   * @returns {string[]}
   */
  function cells(n, width) {
    const text = n === null ? '' : String(n);
    return text.padStart(width, ' ').split('');
  }

  const width = $derived(Math.max(String(a).length, String(b).length, String(result ?? '').length));
  const titles = $derived(TITLES.slice(0, width).reverse());
  const label = $derived(
    `Đặt tính: ${a} ${signWord(op)} ${b}. ${result === null ? 'Chưa có kết quả.' : `Kết quả viết là ${result}.`}`,
  );
</script>

<div
  class="inline-grid overflow-hidden rounded-2xl border-4 border-slate-300 bg-white text-center text-3xl font-bold tabular-nums"
  style="grid-template-columns: 2rem repeat({width}, 3.25rem)"
  role="img"
  aria-label={label}
>
  <span></span>
  {#each titles as title (title)}
    <span class="py-1 text-xs font-semibold text-slate-600">{title}</span>
  {/each}

  <span></span>
  {#each cells(a, width) as d, i (i)}
    <span class="py-1 text-slate-800">{d}</span>
  {/each}

  <span class="self-start text-2xl text-slate-600">{signOf(op)}</span>
  {#each cells(b, width) as d, i (i)}
    <span class="min-h-11 py-1 text-slate-800">{d}</span>
  {/each}

  <span class="mx-2 h-1 rounded bg-slate-700" style="grid-column: 1 / -1"></span>

  <span></span>
  {#each cells(result, width) as d, i (i)}
    <span class="min-h-12 py-1 text-indigo-700">{d}</span>
  {/each}
</div>
