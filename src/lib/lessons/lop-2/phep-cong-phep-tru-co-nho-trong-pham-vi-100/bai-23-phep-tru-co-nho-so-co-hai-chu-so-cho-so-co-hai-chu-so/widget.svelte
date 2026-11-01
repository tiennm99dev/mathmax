<script>
  import { rng } from '#lib/core/drill.js';
  import { button } from '#lib/core/ui.js';
  import CarryQuiz from '../_shared/carry-quiz.svelte';
  import { freshCarry } from '../_shared/carry.js';

  // A fixed seed so the prerendered page and the browser agree.
  const rand = rng(23);

  let problem = $state({ a: 62, b: 37 });

  function newTask() {
    problem = freshCarry(rand, 'sub-two', problem);
  }
</script>

<div class="space-y-4">
  {#key problem}
    <CarryQuiz a={problem.a} b={problem.b} op="-" sticks />
  {/key}
  <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newTask}>
    Phép tính khác
  </button>
</div>
