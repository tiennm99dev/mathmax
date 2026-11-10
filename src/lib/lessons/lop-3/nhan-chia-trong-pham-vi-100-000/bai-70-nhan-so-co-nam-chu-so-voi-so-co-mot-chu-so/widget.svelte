<script>
  import { fmt } from '#lib/core/number-format.js';
  import ColumnWorker from '../_shared/column-worker.svelte';
  import { PLACE_NAMES } from '../_shared/columns.js';
  import { partsOf, partsSum } from './engine.js';

  const TONES = [
    'border-amber-400 bg-amber-50 text-amber-950',
    'border-sky-400 bg-sky-50 text-sky-950',
    'border-emerald-400 bg-emerald-50 text-emerald-950',
    'border-rose-400 bg-rose-50 text-rose-950',
    'border-violet-400 bg-violet-50 text-violet-950',
  ];
</script>

{#snippet parts(
  /** @type {import('../_shared/columns.js').Task} */ task,
  /** @type {number} */ finished,
)}
  {@const list = partsOf(task)}
  {@const all = finished >= String(task.a).length}
  <div class="space-y-2">
    <p class="text-center text-base font-semibold text-slate-700">
      Tách {fmt(task.a)} theo hàng, rồi nhân từng phần với {task.b}:
    </p>
    <ul class="space-y-1" aria-label="Tách {fmt(task.a)} theo hàng">
      {#each [...list].reverse() as part (part.col)}
        {@const ready = finished > part.col}
        <li
          class="flex items-center justify-between gap-2 rounded-xl border-2 px-3 py-1.5 text-lg font-semibold tabular-nums {TONES[
            part.col
          ]} {ready ? '' : 'opacity-60'}"
        >
          <span class="text-sm font-medium">{PLACE_NAMES[part.col]}</span>
          <span>
            {fmt(part.value)} × {task.b} =
            {#if ready}
              <strong>{fmt(part.product)}</strong>
            {:else}
              <span aria-hidden="true">?</span><span class="sr-only">chưa tính</span>
            {/if}
          </span>
        </li>
      {/each}
    </ul>
    {#if all}
      <p
        class="rounded-xl bg-emerald-100 px-3 py-2 text-center text-lg font-semibold text-emerald-950"
      >
        {partsSum(task)}
      </p>
    {/if}
  </div>
{/snippet}

<ColumnWorker
  kinds={[
    { value: 'plain', label: 'Không nhớ', first: { a: 12132, b: 3 } },
    { value: 'one', label: 'Nhớ một lần', first: { a: 21314, b: 3 } },
    { value: 'many', label: 'Nhớ nhiều lần', first: { a: 31504, b: 3 } },
  ]}
  aside={parts}
/>
