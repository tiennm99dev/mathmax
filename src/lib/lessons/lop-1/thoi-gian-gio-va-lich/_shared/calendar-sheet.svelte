<script>
  import { dayTitle } from './time.js';

  /**
   * One page of a tear-off wall calendar (tờ lịch): the month on top, the
   * date in big digits, the weekday underneath, as the book pictures it.
   * Chủ nhật is printed in red, as on real calendars.
   * @type {{ month: number, date: number, weekday: number }}
   */
  let { month, date, weekday } = $props();

  const sunday = $derived(weekday === 6);
</script>

<div
  class="w-44 shrink-0 overflow-hidden rounded-2xl border-4 border-slate-300 bg-white text-center shadow-sm"
  role="img"
  aria-label="Tờ lịch: {dayTitle(weekday)}, ngày {date} tháng {month}."
>
  <div class="bg-rose-600 py-1 text-lg font-bold text-white">Tháng {month}</div>
  <div
    class="py-1 text-7xl leading-tight font-black tabular-nums {sunday
      ? 'text-rose-600'
      : 'text-slate-900'}"
  >
    {date}
  </div>
  <div class="pb-2 text-xl font-bold {sunday ? 'text-rose-600' : 'text-slate-700'}">
    {dayTitle(weekday)}
  </div>
</div>
