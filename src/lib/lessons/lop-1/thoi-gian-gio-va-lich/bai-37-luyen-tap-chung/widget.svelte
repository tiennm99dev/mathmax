<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import CalendarSheet from '../_shared/calendar-sheet.svelte';
  import ClockPicture from '../_shared/clock-picture.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã biết xem giờ đúng, xem lịch và các ngày trong tuần."
>
  {#snippet visual(q)}
    {#if q.scene}
      <div class="flex justify-center">
        {#if q.scene.type === 'clock'}
          <ClockPicture hour={q.scene.hour} size="w-48 max-w-full" />
        {:else}
          <CalendarSheet month={q.scene.month} date={q.scene.date} weekday={q.scene.weekday} />
        {/if}
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
