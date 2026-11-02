<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import ColumnBoard from '../_shared/column-board.svelte';
  import { resultDigits } from '../_shared/column-three.js';
  import { KIND_LABELS, buildRound } from './engine.js';

  const LIST_KINDS = ['lon-be', 'sai'];
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em cộng, trừ trong phạm vi 1000 rất giỏi."
  listOptions={(q) => LIST_KINDS.includes(q.kind)}
>
  {#snippet visual(q, settled)}
    {#if q.visual}
      <div class="flex justify-center">
        <ColumnBoard
          a={q.visual.a}
          b={q.visual.b}
          op={q.visual.op}
          written={settled
            ? resultDigits(q.visual.a, q.visual.b, q.visual.op)
            : { ones: null, tens: null, hundreds: null }}
        />
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
