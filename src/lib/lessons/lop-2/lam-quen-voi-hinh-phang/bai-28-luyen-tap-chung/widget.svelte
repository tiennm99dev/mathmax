<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Figure from '../_shared/figure.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em nhận biết các hình và tính độ dài đường gấp khúc rất giỏi."
>
  {#snippet visual(q, _settled)}
    {#if q.visual}
      <div class="rounded-2xl bg-sky-50 p-3">
        <Figure figure={q.visual} />
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
