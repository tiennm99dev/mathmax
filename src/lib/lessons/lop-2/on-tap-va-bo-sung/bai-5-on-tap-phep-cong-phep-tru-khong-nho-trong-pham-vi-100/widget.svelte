<script>
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import ColumnBoard from '#lib/core/kid/column-board.svelte';
  import { REVIEW_SKILLS } from '../_shared/review-skills.js';

  /**
   * The result digits once a column question ends; a one-digit result
   * leaves the tens empty, as the book writes it.
   * @param {{ a: number, b: number, op: '+' | '-' }} v
   */
  function resultDigits(v) {
    const c = v.op === '+' ? v.a + v.b : v.a - v.b;
    return { tens: c >= 10 ? Math.floor(c / 10) : null, ones: c % 10 };
  }
</script>

<AdaptiveQuiz
  skills={REVIEW_SKILLS}
  length={12}
  allGood="Tuyệt vời! Em đã nắm chắc phép cộng, phép trừ không nhớ trong phạm vi 100."
>
  {#snippet visual(q, settled)}
    {#if q.visual}
      <div class="flex justify-center">
        <ColumnBoard
          a={q.visual.a}
          b={q.visual.b}
          op={q.visual.op}
          written={settled ? resultDigits(q.visual) : { tens: null, ones: null }}
        />
      </div>
    {/if}
  {/snippet}
</AdaptiveQuiz>
