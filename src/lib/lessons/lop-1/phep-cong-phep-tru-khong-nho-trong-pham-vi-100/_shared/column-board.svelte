<script>
  import { signOf, signWord } from './column.js';

  /**
   * A calculation set out in columns ("đặt tính") as the book prints it: the
   * two numbers with ones under ones and tens under tens, the sign on the
   * left, a line, and the result digits written so far. Static: the parent
   * changes the props.
   *
   * - `a`, `b`, `op`: the calculation (`op` is '+' or '-').
   * - `written`: result digits written so far, `null` while still empty.
   * - `active`: the column being worked on, tinted, or null.
   * @type {{
   *   a: number;
   *   b: number;
   *   op: import('./column.js').Op;
   *   written: { tens: number | null; ones: number | null };
   *   active?: import('./column.js').Place | null;
   * }}
   */
  let { a, b, op, written, active = null } = $props();

  /** @param {number} n */
  const tensOf = (n) => (n >= 10 ? String(Math.floor(n / 10)) : '');
  /** @param {number} n */
  const onesOf = (n) => String(n % 10);

  const label = $derived.by(() => {
    const t = written.tens === null ? '?' : String(written.tens);
    const o = written.ones === null ? '?' : String(written.ones);
    return `Đặt tính: ${a} ${signWord(op)} ${b}. Hàng chục của kết quả: ${t}. Hàng đơn vị của kết quả: ${o}.`;
  });

  /** @param {import('./column.js').Place} place */
  function tint(place) {
    return active === place ? 'bg-indigo-100' : 'bg-white';
  }
</script>

<div
  class="inline-grid grid-cols-[2.5rem_4rem_4rem] overflow-hidden rounded-2xl border-4 border-slate-300 bg-white text-center text-4xl font-bold tabular-nums"
  role="img"
  aria-label={label}
>
  <span class="bg-white"></span>
  <span class="py-1 text-sm font-semibold text-slate-500 {tint('tens')}">Chục</span>
  <span class="py-1 text-sm font-semibold text-slate-500 {tint('ones')}">Đơn vị</span>

  <span class="bg-white"></span>
  <span class="py-1 text-slate-800 {tint('tens')}">{tensOf(a)}</span>
  <span class="py-1 text-slate-800 {tint('ones')}">{onesOf(a)}</span>

  <span class="self-start bg-white text-3xl text-slate-600">{signOf(op)}</span>
  <span class="py-1 text-slate-800 {tint('tens')}">{tensOf(b)}</span>
  <span class="py-1 text-slate-800 {tint('ones')}">{onesOf(b)}</span>

  <span class="col-span-3 mx-2 h-1 rounded bg-slate-700"></span>

  <span class="bg-white"></span>
  <span class="min-h-14 py-1 text-indigo-700 {tint('tens')}">{written.tens ?? ''}</span>
  <span class="min-h-14 py-1 text-indigo-700 {tint('ones')}">{written.ones ?? ''}</span>
</div>
