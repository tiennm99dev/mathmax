<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import ClockPicture from '#lib/core/kid/clock-picture.svelte';
  import MonthSheet from '#lib/core/kid/month-sheet.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em xem đồng hồ và xem lịch rất giỏi."
  listOptions={(q) => q.kind === 'bai-toan'}
>
  {#snippet visual(q, _settled)}
    {#if q.visual?.clock !== undefined}
      <div class="rounded-2xl bg-sky-50 p-3">
        <ClockPicture minutes={q.visual.clock} />
      </div>
    {:else if q.visual?.month}
      <MonthSheet month={q.visual.month} marks={q.visual.marks ?? []} />
    {/if}
  {/snippet}
</ChoiceRound>
