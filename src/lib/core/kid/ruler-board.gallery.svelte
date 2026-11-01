<script module>
  export const title = 'Thước kẻ, đồ vật và các bạn nhỏ';
</script>

<script>
  import KidFigure from './kid-figure.svelte';
  import RulerBoard from './ruler-board.svelte';
  import { KIDS, THINGS, rulerAdvice, inSentence } from './length.js';

  let shift = $state(2);
  const thing = THINGS[0];
</script>

<div class="space-y-3">
  <RulerBoard {thing} length={7} bind:shift showUnit />
  <p class="text-sm text-slate-600" aria-live="polite">
    {rulerAdvice(shift, 7, inSentence(thing.label))}
  </p>
  <svg
    viewBox="0 0 360 140"
    class="w-full max-w-md"
    role="img"
    aria-label="Bốn bạn nhỏ cao khác nhau"
  >
    <line x1="0" y1="130" x2="360" y2="130" stroke="#94a3b8" stroke-width="3" />
    {#each KIDS as kid, i (kid.id)}
      <KidFigure x={50 + i * 85} y={130} height={70 + i * 15} color={kid.color} />
    {/each}
  </svg>
</div>
