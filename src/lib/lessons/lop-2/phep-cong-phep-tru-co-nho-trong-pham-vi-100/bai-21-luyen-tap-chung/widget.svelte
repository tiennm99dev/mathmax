<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import CarryBoard from '../_shared/carry-board.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  /**
   * The result digits once a column question ends.
   * @param {{ a: number, b: number }} v
   */
  function resultDigits(v) {
    const s = v.a + v.b;
    return { tens: Math.floor(s / 10), ones: s % 10 };
  }
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em cộng có nhớ trong phạm vi 100 rất giỏi."
>
  {#snippet visual(q, settled)}
    {#if q.visual}
      <div class="flex justify-center">
        <CarryBoard
          a={q.visual.a}
          b={q.visual.b}
          op="+"
          written={settled ? resultDigits(q.visual) : { tens: null, ones: null }}
          carried={settled}
        />
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
