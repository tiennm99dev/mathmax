<script module>
  export const title = 'Que tính';
</script>

<script>
  import Stepper from '#lib/core/stepper.svelte';
  import CountingSticks from './counting-sticks.svelte';
  import { readNumber, sticksWords } from './numbers.js';

  let tens = $state(4);
  let ones = $state(3);
</script>

<div class="space-y-3">
  <div class="flex flex-wrap gap-4">
    <Stepper label="Bó một chục" bind:value={tens} min={0} max={10} />
    <Stepper label="Que rời" bind:value={ones} min={0} max={9} />
  </div>
  <CountingSticks {tens} {ones} />
  <p class="text-sm text-slate-600 tabular-nums">
    {sticksWords(Math.min(99, tens * 10 + ones))} · {readNumber(tens * 10 + ones)}
  </p>
  <p class="text-sm text-slate-600">Phép trừ 57 − 23, tô vòng hàng đơn vị, nhỏ và thêm que xanh:</p>
  <div class="flex flex-wrap items-end gap-6">
    <CountingSticks tens={5} ones={7} crossTens={2} crossOnes={3} highlight="ones" />
    <CountingSticks tens={2} ones={4} extraOnes={3} tone="sky" small />
    <CountingSticks tens={0} ones={0} />
  </div>
</div>
