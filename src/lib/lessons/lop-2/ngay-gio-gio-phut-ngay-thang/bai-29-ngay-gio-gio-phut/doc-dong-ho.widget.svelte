<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import ClockPicture from '#lib/core/kid/clock-picture.svelte';
  import { CLOCK_LABELS, buildClockRound } from './engine.js';
</script>

<ChoiceRound
  build={buildClockRound}
  labels={CLOCK_LABELS}
  allGood="Tuyệt vời! Em xem đồng hồ rất giỏi."
>
  {#snippet visual(q, _settled)}
    <div class="rounded-2xl bg-sky-50 p-3">
      <ClockPicture minutes={q.visual ?? 0} />
    </div>
  {/snippet}
</ChoiceRound>
