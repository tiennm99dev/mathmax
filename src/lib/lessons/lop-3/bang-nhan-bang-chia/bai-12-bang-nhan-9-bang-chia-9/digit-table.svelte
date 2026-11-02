<script>
  import { focusRing } from '#lib/core/ui.js';
  import { BASE, digitsOf } from './engine.js';

  /**
   * The table of 9 with its digits coloured: tens in blue, ones in orange, and a
   * strip of nine squares split the same way, which draws a staircase down the
   * rows because the digits always add up to 9. Tap a row to read it.
   * @type {{ rows: number, active: number, onpick: (n: number) => void }}
   */
  let { rows, active, onpick } = $props();

  const NINE = Array.from({ length: BASE }, (_, i) => i);
</script>

<ol class="space-y-1" aria-label="Bảng nhân 9 tô màu chữ số">
  {#each { length: rows } as _, r (r)}
    {@const n = r + 1}
    {@const { tens, ones } = digitsOf(n)}
    <li>
      <button
        type="button"
        class="flex min-h-12 w-full items-center gap-2 rounded-xl px-2 text-lg font-bold tabular-nums {n ===
        active
          ? 'bg-amber-100'
          : 'bg-slate-50'} {focusRing}"
        aria-pressed={n === active}
        aria-label="9 nhân {n} bằng {BASE * n}. Chữ số hàng chục {tens}, chữ số hàng đơn vị {ones}."
        onclick={() => onpick(n)}
      >
        <span class="w-16 shrink-0 text-right text-slate-800">9 × {n}</span>
        <span class="shrink-0 text-slate-500">=</span>
        <span class="flex w-14 shrink-0 justify-center gap-0.5" aria-hidden="true">
          <span
            class="w-6 rounded text-center {tens === 0
              ? 'bg-sky-50 text-sky-800'
              : 'bg-sky-200 text-sky-950'}">{tens}</span
          >
          <span class="w-6 rounded bg-orange-200 text-center text-orange-950">{ones}</span>
        </span>
        <span class="flex min-w-0 flex-1 gap-px" aria-hidden="true">
          {#each NINE as i (i)}
            <span class="h-4 flex-1 rounded-sm {i < tens ? 'bg-sky-500' : 'bg-orange-400'}"></span>
          {/each}
        </span>
      </button>
    </li>
  {/each}
</ol>
