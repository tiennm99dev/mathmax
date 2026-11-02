<script module>
  export const title = 'Đồng hồ và tờ lịch tháng';
</script>

<script>
  import ClockPicture from './clock-picture.svelte';
  import MonthSheet from './month-sheet.svelte';
  import { partText } from './time.js';

  let picked = $state(/** @type {number | null} */ (12));
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-center gap-4">
    <ClockPicture minutes={8 * 60} size="w-32" />
    <ClockPicture minutes={15 * 60 + 30} size="w-32" />
    <p class="text-slate-700">{partText(15 * 60 + 30)}</p>
  </div>
  <MonthSheet month={10} {picked} marks={[20]} ondate={(d) => (picked = d)} />
</div>
