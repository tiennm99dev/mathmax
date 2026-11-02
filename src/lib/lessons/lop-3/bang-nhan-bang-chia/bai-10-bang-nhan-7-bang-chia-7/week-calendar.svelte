<script>
  import { BASE, WEEK_DAYS, calendarRows } from './engine.js';

  /**
   * A calendar sheet of whole weeks. The days of ringed weeks are coloured with
   * the running count on their Sunday; the other days stay plain, and with
   * `numbers` off they show no day number, so the sheet can be counted.
   * @type {{ weeks: number, ringed: number, label: string, numbers?: boolean }}
   */
  let { weeks, ringed, label, numbers = true } = $props();

  const rows = $derived(calendarRows(weeks));
</script>

<div class="rounded-2xl bg-sky-50 p-2" role="img" aria-label={label}>
  <div class="grid grid-cols-7 gap-1">
    {#each WEEK_DAYS as day (day)}
      <span
        class="text-center text-sm font-bold {day === 'CN' ? 'text-rose-700' : 'text-slate-600'}"
        >{day}</span
      >
    {/each}
    {#each rows as week, w (w)}
      {#each week as day (day)}
        {@const isRinged = w < ringed}
        {@const isEnd = day % BASE === 0}
        <span
          class="flex h-9 items-center justify-center rounded-lg text-base font-semibold tabular-nums {isRinged &&
          isEnd
            ? 'bg-indigo-600 text-white'
            : isRinged
              ? 'bg-indigo-200 text-indigo-950'
              : 'bg-white text-slate-500'}"
        >
          {numbers || isRinged ? day : ''}
        </span>
      {/each}
    {/each}
  </div>
</div>
