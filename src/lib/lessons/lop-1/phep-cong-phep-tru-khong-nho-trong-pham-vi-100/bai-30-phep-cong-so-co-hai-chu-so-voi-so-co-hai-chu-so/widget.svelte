<script>
  import { button } from '#lib/core/ui.js';
  import ColumnQuiz from '../_shared/column-quiz.svelte';
  import { freshProblem } from '../_shared/column.js';

  // The first calculation is fixed so the prerendered page and the browser agree.
  let a = $state(21);
  let b = $state(14);

  function another() {
    const p = freshProblem(Math.random, 'add-two', { a, b });
    a = p.a;
    b = p.b;
  }
</script>

<div class="space-y-5">
  <p
    class="inline-block rounded-2xl border-4 border-indigo-500 bg-white px-4 py-2 text-4xl font-bold text-indigo-700 tabular-nums"
  >
    {a} + {b} = ?
  </p>

  {#key `${a}+${b}`}
    <ColumnQuiz {a} {b} op="+" sticks />
  {/key}

  <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={another}>
    Phép tính khác
  </button>
</div>
