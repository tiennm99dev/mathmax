<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nắm chắc các số từ 0 đến 10."
>
  {#snippet visual(q)}
    {#if q.picture && q.shown}
      <div
        class="flex max-w-md flex-wrap gap-2 rounded-2xl bg-amber-50 p-3"
        role="img"
        aria-label="Hình để đếm"
      >
        {#each { length: q.shown } as _, i (i)}
          <Picture name={q.picture} size={44} decorative />
        {/each}
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
