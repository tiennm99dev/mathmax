<script>
  import { focusRing } from '#lib/core/ui.js';
  import { divLine, mulLine } from './times.js';

  /**
   * The ten rows of a multiplication or division table. Rows the child has not
   * found yet keep their result as a "?", and the current row stands out. With
   * `onpick` each row is a button that chooses it.
   *
   * - `op`: the multiplication (`nhan`) or division (`chia`) table.
   * - `found(n)`: whether row `n` shows its result.
   * - `active`: the current row, or 0 for none.
   * @type {{
   *   base: number;
   *   op?: 'nhan' | 'chia';
   *   found?: (n: number) => boolean;
   *   active?: number;
   *   onpick?: (n: number) => void;
   * }}
   */
  let { base, op = 'nhan', found = () => true, active = 0, onpick } = $props();

  const rows = Array.from({ length: 10 }, (_, i) => i + 1);

  /** @param {number} n */
  function line(n) {
    if (op === 'nhan') return found(n) ? mulLine(base, n) : `${base} × ${n} = ?`;
    return found(n) ? divLine(base, n) : `${base * n} : ${base} = ?`;
  }

  /** @param {number} n */
  function tone(n) {
    if (n === active) return 'bg-amber-200 text-amber-950';
    return found(n) ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-600';
  }
</script>

<ol
  class="grid grid-flow-col grid-cols-2 grid-rows-5 gap-2"
  aria-label="{op === 'nhan' ? 'Bảng nhân' : 'Bảng chia'} {base}"
>
  {#each rows as n (n)}
    <li>
      {#if onpick}
        <button
          type="button"
          class="min-h-12 w-full rounded-xl px-2 py-2 text-center text-lg font-bold tabular-nums {tone(
            n,
          )} {focusRing}"
          aria-pressed={n === active}
          onclick={() => onpick(n)}>{line(n)}</button
        >
      {:else}
        <div class="rounded-xl px-2 py-2 text-center text-lg font-bold tabular-nums {tone(n)}">
          {line(n)}
        </div>
      {/if}
    </li>
  {/each}
</ol>
