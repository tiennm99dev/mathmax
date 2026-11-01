<script>
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import { optionText } from '#lib/core/kid/quiz.js';
  import QuizVisual from './quiz-visual.svelte';

  /**
   * The adaptive review of this chapter: the next question comes from the part
   * the child is weakest at, with sentence options one per row.
   *
   * - `skills`: the parts of the review.
   * - `length`: questions in one set.
   * - `allGood`: what the end card says when every part is right.
   * @type {{
   *   skills: import('./visual.js').ReviewSkill[];
   *   length?: number;
   *   allGood: string;
   * }}
   */
  let { skills, length = 12, allGood } = $props();
</script>

<AdaptiveQuiz
  {skills}
  {length}
  {allGood}
  listOptions={(q) => q.options.some((o) => optionText(o).length > 16)}
>
  {#snippet visual(q, settled)}
    {#if q.visual}<QuizVisual visual={q.visual} {settled} />{/if}
  {/snippet}
</AdaptiveQuiz>
