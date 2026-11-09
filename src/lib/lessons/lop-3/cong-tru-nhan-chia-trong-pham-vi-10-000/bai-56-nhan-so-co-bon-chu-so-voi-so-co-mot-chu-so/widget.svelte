<script>
  import { fmt } from '#lib/core/number-format.js';
  import ColumnWorker from '../_shared/column-worker.svelte';
  import { partsOf, partsSum } from './engine.js';

  const TONES = [
    'border-amber-400 bg-amber-50 text-amber-950',
    'border-sky-400 bg-sky-50 text-sky-950',
    'border-emerald-400 bg-emerald-50 text-emerald-950',
    'border-rose-400 bg-rose-50 text-rose-950',
  ];
</script>

{#snippet area(
  /** @type {import('../_shared/columns.js').Task} */ task,
  /** @type {number} */ finished,
)}
  {@const parts = partsOf(task)}
  <div class="space-y-2">
    <p class="text-center text-base font-semibold text-slate-700">
      Tách {fmt(task.a)} theo hàng, rồi nhân từng phần với {task.b}:
    </p>
    <div class="flex items-stretch gap-1">
      <span
        class="flex w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl font-bold"
        aria-hidden="true">×{task.b}</span
      >
      <ul class="grid flex-1 grid-cols-4 gap-1" aria-label="Mô hình tách {fmt(task.a)} theo hàng">
        {#each [...parts].reverse() as part (part.col)}
          <li
            class="flex min-h-24 flex-col items-center justify-between rounded-xl border-2 px-1 py-2 text-center tabular-nums {TONES[
              part.col
            ]} {finished > part.col ? '' : 'opacity-60'}"
          >
            <span class="text-base font-semibold">{fmt(part.value)}</span>
            {#if finished > part.col}
              <span class="text-lg font-bold">{fmt(part.product)}</span>
            {:else}
              <span class="text-lg font-bold"
                ><span aria-hidden="true">?</span><span class="sr-only">chưa tính</span></span
              >
            {/if}
          </li>
        {/each}
      </ul>
    </div>
    {#if finished >= parts.length}
      <p
        class="rounded-xl bg-emerald-100 px-3 py-2 text-center text-lg font-semibold text-emerald-950"
      >
        {partsSum(task)}
      </p>
    {/if}
  </div>
{/snippet}

<ColumnWorker
  op="×"
  switchLabel="Chọn loại phép nhân"
  nextLabel="Phép nhân khác"
  kinds={[
    { value: 'plain', label: 'Không nhớ', first: { a: 1213, b: 3 } },
    { value: 'one', label: 'Nhớ một lần', first: { a: 2018, b: 4 } },
    { value: 'many', label: 'Nhớ nhiều lần', first: { a: 1427, b: 3 } },
  ]}
  aside={area}
/>
