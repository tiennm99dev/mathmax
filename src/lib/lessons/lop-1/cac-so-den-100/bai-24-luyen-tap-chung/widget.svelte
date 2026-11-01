<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import CountingSticks from '#lib/core/kid/counting-sticks.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nắm chắc các số đến 100."
>
  {#snippet visual(q)}
    {#if q.sticks}
      <div class="rounded-2xl bg-amber-50 p-3">
        <CountingSticks tens={q.sticks.tens} ones={q.sticks.ones} />
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
