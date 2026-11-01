<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import PositionScene from '../_shared/position-scene.svelte';
  import { SCENES } from '../_shared/positions.js';
  import SolidView from '../_shared/solid-view.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  let view = $state({ yaw: -30, pitch: 22 });
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nhận biết tốt các khối và vị trí."
  listOptions={(q) => Boolean(q.scene)}
>
  {#snippet visual(q, settled)}
    {#if q.boxes}
      <div class="mx-auto max-w-xs">
        <SolidView boxes={q.boxes} bind:view width={220} height={180} label={q.boxLabel ?? ''} />
        {#if q.kind !== 'dem'}
          <p class="mt-1 text-center text-sm text-slate-500">Kéo để xoay khối.</p>
        {/if}
      </div>
    {:else if q.scene}
      <div class="rounded-2xl border-2 border-slate-200 bg-white p-1">
        <PositionScene scene={SCENES[q.scene]} at={q.place} tone={settled ? 'ok' : 'none'} />
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
