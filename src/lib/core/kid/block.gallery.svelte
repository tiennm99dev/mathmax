<script module>
  export const title = 'Khối đơn vị, thanh chục, tấm trăm và nút đếm';
</script>

<script>
  import Block from './block.svelte';
  import BlockPile from './block-pile.svelte';
  import CountStepper from './count-stepper.svelte';

  let tens = $state(3);
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-3">
    <Block kind="don-vi" cell={8} />
    <Block kind="chuc" cell={6} />
    <Block kind="tram" cell={4} />
    <Block kind="nghin" cell={3} />
  </div>
  <BlockPile hundreds={2} {tens} ones={5} />
  <CountStepper name="chục" value={tens} onchange={(v) => (tens = v)} />
  <p class="text-center text-lg font-semibold tabular-nums">{200 + tens * 10 + 5}</p>
</div>
