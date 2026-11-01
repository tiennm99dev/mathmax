<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nắm chắc phép cộng, phép trừ trong phạm vi 10."
>
  {#snippet visual(q)}
    {#if q.picture && q.groups}
      <div
        class="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-amber-50 p-3"
        role="img"
        aria-label="Hai nhóm hình: nhóm trái có {q.groups[0]}, nhóm phải có {q.groups[1]}"
      >
        {#each q.groups as n, g (g)}
          {#if g === 1}<span class="text-2xl font-bold text-slate-400" aria-hidden="true">và</span
            >{/if}
          <div class="flex max-w-48 flex-wrap justify-center gap-1 rounded-xl bg-white p-2">
            {#each { length: n } as _, i (i)}
              <Picture name={q.picture} size={40} decorative />
            {/each}
          </div>
        {/each}
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
