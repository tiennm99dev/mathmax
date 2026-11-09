<script module>
  export const title = 'Cân đĩa, bình đựng nước và ca 1 l';
</script>

<script>
  import BalanceScale from './balance-scale.svelte';
  import Cup from './cup.svelte';
  import Vessel from './vessel.svelte';
  import { VESSELS } from './capacity.js';
</script>

<div class="space-y-4">
  <BalanceScale
    left={[{ kind: 'thing', id: 'melon', kg: 4 }]}
    right={[
      { kind: 'weight', kg: 2 },
      { kind: 'weight', kg: 1 },
    ]}
  />
  <BalanceScale
    left={[{ kind: 'thing', name: 'Túi cam', kg: 3 }]}
    right={[{ kind: 'thing', name: 'Túi táo', kg: 3 }]}
  />
  <BalanceScale
    left={[{ kind: 'thing', name: 'Túi kẹo', kg: 800 }]}
    right={[
      { kind: 'weight', kg: 500, unit: 'g' },
      { kind: 'weight', kg: 200, unit: 'g' },
      { kind: 'weight', kg: 100, unit: 'g' },
    ]}
  />
  <div class="flex flex-wrap items-end gap-3">
    {#each VESSELS as v, i (v.id)}
      <Vessel id={v.id} fill={(i + 1) / VESSELS.length} label={v.name} caption={v.name} size={80} />
    {/each}
    <Cup full />
    <Cup full={false} />
  </div>
</div>
