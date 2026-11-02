<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import PictureGroups from '../_shared/picture-groups.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em nhân và chia rất giỏi."
  listOptions={(q) => q.kind === 'lap'}
>
  {#snippet visual(q, settled)}
    {#if q.visual}
      <PictureGroups
        each={q.visual.each}
        groups={q.visual.groups}
        grouped={settled || !q.visual.loose}
        picture="star"
        noun="ngôi sao"
      />
    {/if}
  {/snippet}
</ChoiceRound>
