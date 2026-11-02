<script>
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import { optionText } from '#lib/core/kid/quiz.js';
  import { SKILLS } from './engine.js';
  import Visual from './visual.svelte';
</script>

<AdaptiveQuiz
  skills={SKILLS}
  length={12}
  allGood="Tuyệt vời! Em đã nắm chắc hình học và đo lường."
  listOptions={(q) => q.options.some((o) => optionText(o).length > 12)}
>
  {#snippet visual(q, settled)}
    {#if q.visual}<Visual visual={q.visual} {settled} />{/if}
  {/snippet}
</AdaptiveQuiz>
