<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import BlockPile from '../_shared/block-pile.svelte';
  import { KIND_LABELS, buildRound, lineLabel, pileLabel, tickText } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã vững các số trong phạm vi 1000."
  listOptions={(q) => q.kind === 'doc' || q.kind === 'tong' || q.kind === 'bai-toan'}
>
  {#snippet visual(q, settled)}
    {#if q.visual?.type === 'pile'}
      <div role="img" aria-label={pileLabel(q.visual, settled)}>
        <BlockPile
          hundreds={q.visual.hundreds}
          tens={q.visual.tens}
          ones={q.visual.ones}
          cells={{ hundreds: 5, tens: 5, ones: 9 }}
        />
      </div>
    {:else if q.visual?.type === 'line'}
      {@const line = q.visual}
      <NumberLine
        min={line.start}
        max={line.start + line.step * (line.count - 1)}
        step={line.step}
        interactive={false}
        width={380}
        format={(v) => tickText(line, v, settled)}
        label={lineLabel(line, settled)}
      />
    {/if}
  {/snippet}
</ChoiceRound>
