<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import ColumnBoard from '#lib/core/kid/column-board.svelte';
  import { resultOf } from '#lib/core/kid/column.js';
  import { KIND_LABELS, buildRound } from './engine.js';

  /**
   * The result digits once a column question ends.
   * @param {import('./engine.js').Visual} v
   */
  function resultDigits(v) {
    const r = resultOf(v.a, v.b, v.op);
    return { tens: Math.floor(r / 10), ones: r % 10 };
  }
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em cộng, trừ có nhớ trong phạm vi 100 rất giỏi."
>
  {#snippet visual(q, settled)}
    {#if q.visual}
      <div class="flex justify-center">
        <ColumnBoard
          a={q.visual.a}
          b={q.visual.b}
          op={q.visual.op}
          written={settled ? resultDigits(q.visual) : { tens: null, ones: null }}
          carried={settled}
        />
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
