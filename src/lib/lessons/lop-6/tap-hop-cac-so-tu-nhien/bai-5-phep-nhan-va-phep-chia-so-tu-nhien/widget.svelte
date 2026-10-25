<script>
  import SliderField from '#lib/core/slider-field.svelte';
  import { divide, divisionEquation, divisionSentence, gridRows } from './engine.js';

  let a = $state(23);
  let b = $state(5);

  const qr = $derived(divide(a, b));
  const rows = $derived(gridRows(a, b));
</script>

<div class="space-y-4">
  <div class="grid gap-4 sm:grid-cols-2">
    <SliderField label="Số bị chia a" bind:value={a} min={0} max={60} />
    <SliderField label="Số chia b" bind:value={b} min={1} max={12} />
  </div>

  <div
    class="max-h-96 min-h-24 space-y-1 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-3"
    role="img"
    aria-label="{a} ô vuông xếp thành các hàng {b} ô: {qr.q} hàng đầy{qr.r
      ? ` và ${qr.r} ô thừa`
      : ''}"
  >
    {#each rows as row, i (i)}
      <div class="flex items-center gap-1">
        <span class="w-7 shrink-0 text-right text-xs tabular-nums text-slate-500"
          >{row[0] === 'full' ? i + 1 : 'dư'}</span
        >
        {#each row as cell, j (j)}
          <span
            class="h-6 w-6 shrink-0 rounded-sm border sm:h-7 sm:w-7 {cell === 'full'
              ? 'border-indigo-700 bg-indigo-500'
              : 'border-orange-700 bg-orange-400'}"
          ></span>
        {/each}
      </div>
    {:else}
      <p class="py-6 text-center text-sm italic text-slate-500">a = 0: không có ô nào.</p>
    {/each}
  </div>

  <ul class="flex flex-wrap gap-4 text-sm" aria-label="Chú giải">
    <li class="inline-flex items-center gap-1.5">
      <span class="h-3.5 w-3.5 rounded-sm bg-indigo-500" aria-hidden="true"></span>
      Mỗi hàng đầy: {b} ô (số chia)
    </li>
    <li class="inline-flex items-center gap-1.5">
      <span class="h-3.5 w-3.5 rounded-sm bg-orange-400" aria-hidden="true"></span>
      Ô thừa: số dư
    </li>
  </ul>

  <div
    class="rounded-xl border p-4 {qr.r === 0
      ? 'border-emerald-200 bg-emerald-50'
      : 'border-orange-200 bg-orange-50'}"
    aria-live="polite"
  >
    <p class="text-2xl font-bold tabular-nums text-slate-900">{divisionEquation(a, b)}</p>
    <p class="mt-1 text-sm tabular-nums text-slate-700">
      a = b · q + r với q = {qr.q}, r = {qr.r} và 0 ≤ r &lt; b
    </p>
    <p class="mt-2 text-slate-800">{divisionSentence(a, b)}</p>
  </div>
</div>
