<script>
  import { focusRing } from '#lib/core/ui.js';
  import { SHORT_DAYS, WEEKDAYS, monthRows, weekdayOf } from './time.js';

  /**
   * A month sheet of a wall calendar (tờ lịch tháng): one column per weekday,
   * thứ Hai first and Chủ nhật in red. With `ondate`, each date is a button; the
   * sheet then reaches into its card's padding on a phone, so seven 48 px columns
   * fit at 390 px without scrolling.
   *
   * - `month`: 1 to 12.
   * - `picked`: the date marked as chosen.
   * - `marks`: dates ringed in another colour (a week, a special day).
   * - `hidden`: dates left blank for the child to work out.
   * - `ondate(date)`: a date was tapped.
   * @type {{
   *   month: number;
   *   picked?: number | null;
   *   marks?: readonly number[];
   *   hidden?: readonly number[];
   *   ondate?: (date: number) => void;
   * }}
   */
  let { month, picked = null, marks = [], hidden = [], ondate } = $props();

  const rows = $derived(monthRows(month));

  /**
   * @param {number} date
   * @param {number} col
   */
  function tone(date, col) {
    if (date === picked) return 'border-indigo-600 bg-indigo-600 text-white';
    if (marks.includes(date)) return 'border-amber-400 bg-amber-100 text-slate-900';
    return `border-slate-200 bg-white ${col === 6 ? 'text-rose-600' : 'text-slate-800'}`;
  }
</script>

<div
  class="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white {ondate
    ? '-mx-4 sm:mx-0'
    : ''}"
>
  <div class="bg-rose-600 py-1 text-center text-lg font-bold text-white">Tháng {month}</div>
  <table class="w-full table-fixed border-separate border-spacing-0 {ondate ? 'min-w-84' : ''}">
    <thead>
      <tr>
        {#each SHORT_DAYS as day, col (day)}
          <th
            scope="col"
            class="py-1 text-sm font-bold {col === 6 ? 'text-rose-600' : 'text-slate-600'}"
            aria-label={WEEKDAYS[col]}>{day}</th
          >
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, r (r)}
        <tr>
          {#each row as date, col (col)}
            <td class="p-0 text-center">
              {#if date === null}
                <span class="block min-h-12" aria-hidden="true"></span>
              {:else if hidden.includes(date)}
                <span
                  class="flex min-h-12 items-center justify-center rounded-lg border-2 border-dashed border-rose-400 bg-rose-50 text-lg font-bold text-rose-600"
                  role="img"
                  aria-label="Ô trống, {WEEKDAYS[col]}">?</span
                >
              {:else if ondate}
                <button
                  type="button"
                  class="min-h-12 w-full rounded-lg border-2 text-lg font-bold tabular-nums transition hover:border-indigo-400 {focusRing} {tone(
                    date,
                    col,
                  )}"
                  aria-label="Ngày {date}, {WEEKDAYS[weekdayOf(month, date)]}"
                  aria-pressed={date === picked}
                  onclick={() => ondate(date)}>{date}</button
                >
              {:else}
                <span
                  class="flex min-h-12 items-center justify-center rounded-lg border-2 text-lg font-bold tabular-nums {tone(
                    date,
                    col,
                  )}">{date}</span
                >
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
