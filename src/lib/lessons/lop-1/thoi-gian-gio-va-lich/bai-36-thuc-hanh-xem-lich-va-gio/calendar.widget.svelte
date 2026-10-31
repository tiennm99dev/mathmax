<script>
  import { button, focusRing } from '#lib/core/ui.js';
  import CalendarSheet from '../_shared/calendar-sheet.svelte';
  import { dayTitle, WEEKDAYS } from '../_shared/time.js';
  import {
    MONTH,
    MONTH_LENGTH,
    missionFeedback,
    missionOf,
    sheetSentences,
    weekdayOn,
  } from './engine.js';

  let date = $state(1);
  let mission = $state(0);
  /** @type {number | null} */
  let picked = $state(null);

  const goal = $derived(missionOf(mission));
  const found = $derived(date === goal);
  const sentences = $derived(sheetSentences(date));
  const solved = $derived(found && picked === weekdayOn(goal));

  /** @param {number} step */
  function flip(step) {
    date = Math.min(MONTH_LENGTH, Math.max(1, date + step));
    picked = null;
  }

  function nextMission() {
    mission += 1;
    picked = null;
  }
</script>

<div class="space-y-5">
  <p class="text-xl font-semibold text-slate-800">
    Em lật lịch tìm tờ ngày {goal} tháng {MONTH}. Ngày đó là thứ mấy?
  </p>

  <div class="flex items-center justify-center gap-3">
    <button
      type="button"
      class="min-h-14 min-w-14 text-2xl {button.quiet}"
      aria-label="Lật về tờ trước"
      disabled={date === 1}
      onclick={() => flip(-1)}>◀</button
    >
    <CalendarSheet month={MONTH} {date} weekday={weekdayOn(date)} />
    <button
      type="button"
      class="min-h-14 min-w-14 text-2xl {button.quiet}"
      aria-label="Lật sang tờ sau"
      disabled={date === MONTH_LENGTH}
      onclick={() => flip(1)}>▶</button
    >
  </div>

  <div class="flex flex-wrap justify-center gap-2">
    <button type="button" class="min-h-12 {button.quiet}" onclick={() => flip(-7)}>
      Lùi 1 tuần
    </button>
    <button type="button" class="min-h-12 {button.quiet}" onclick={() => flip(7)}>
      Tới 1 tuần
    </button>
  </div>

  <ul class="space-y-1 rounded-2xl bg-slate-100 px-4 py-3 text-lg" aria-live="polite">
    <li class="font-semibold text-slate-800">{sentences[0]}</li>
    <li class="text-slate-700">{sentences[1]}</li>
  </ul>

  {#if found}
    <div
      role="group"
      aria-label="Ngày {goal} tháng {MONTH} là thứ mấy?"
      class="flex flex-wrap gap-2"
    >
      {#each WEEKDAYS as _, i (i)}
        <button
          type="button"
          class="min-h-12 rounded-2xl border-4 px-3 text-lg font-bold transition {focusRing} {picked ===
          i
            ? i === weekdayOn(goal)
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-rose-500 bg-rose-50 text-rose-700'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-pressed={picked === i}
          onclick={() => (picked = i)}>{dayTitle(i)}</button
        >
      {/each}
    </div>
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {solved
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if solved}<span aria-hidden="true">⭐ </span>{/if}{!found
      ? `Tờ này là ngày ${date}. Em lật tiếp đến ngày ${goal} nhé.`
      : picked === null
        ? 'Tìm thấy rồi! Em chạm vào thứ ghi trên tờ lịch.'
        : missionFeedback(goal, picked)}
  </p>

  {#if solved}
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={nextMission}>
      Tìm ngày khác
    </button>
  {/if}
</div>
