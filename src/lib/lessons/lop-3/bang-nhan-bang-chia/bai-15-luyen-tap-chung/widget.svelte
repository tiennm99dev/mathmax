<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import PartOption from '../_shared/part-option.svelte';
  import PartVisual from '../_shared/part-visual.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';
  import ProductTriangle from './product-triangle.svelte';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nắm chắc bảng nhân, bảng chia và một phần mấy."
  pictureOption={(o) => typeof o !== 'string' && Boolean(o.figure)}
>
  {#snippet visual(q, settled)}
    {#if q.visual?.type === 'triangle'}
      <ProductTriangle visual={q.visual} {settled} />
    {:else if q.visual}
      <PartVisual visual={q.visual} {settled} />
    {/if}
  {/snippet}
  {#snippet option(opt)}
    <PartOption option={opt} />
  {/snippet}
</ChoiceRound>
