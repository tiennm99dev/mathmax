<script>
  import MonthSheet from '#lib/core/kid/month-sheet.svelte';
  import { WEEKDAYS, dayTitle } from '#lib/core/kid/time.js';
  import { rng } from '#lib/core/drill.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { checkMission, checkWeekday, makeMission } from './engine.js';

  let mode = $state(/** @type {'birthday' | 'challenge'} */ ('birthday'));

  let month = $state(6);
  let date = $state(/** @type {number | null} */ (null));
  let birthday = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));

  const rand = rng(67);
  let mission = $state(makeMission(rand));
  let tapped = $state(/** @type {number | null} */ (null));
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));
  let stars = $state(0);
  let missed = $state(false);

  /** @param {number} step */
  function turnMonth(step) {
    month = ((month - 1 + step + 12) % 12) + 1;
    date = null;
    birthday = null;
  }

  /** @param {number} d */
  function pickBirthday(d) {
    date = d;
    birthday = null;
  }

  /** @param {number} given */
  function answer(given) {
    if (result?.ok) return;
    if (mission.kind === 'date') tapped = given;
    result = checkMission(mission, given);
    if (result.ok && !missed) stars += 1;
    if (!result.ok) missed = true;
  }

  /** @param {number} d */
  function tapDate(d) {
    if (mission.kind === 'date') answer(d);
    else tapped = d;
  }

  function nextMission() {
    mission = makeMission(rand);
    tapped = null;
    result = null;
    missed = false;
  }
</script>

{#snippet weekdayButtons(/** @type {(day: number) => void} */ onpick)}
  <div class="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Chọn thứ">
    {#each WEEKDAYS as _, day (day)}
      <button
        type="button"
        class="min-h-12 rounded-xl border-2 border-slate-300 bg-white px-2 text-lg font-semibold text-slate-800 hover:border-indigo-400 {focusRing}"
        onclick={() => onpick(day)}>{dayTitle(day)}</button
      >
    {/each}
  </div>
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'birthday', label: 'Sinh nhật em' },
      { value: 'challenge', label: 'Thử thách tra lịch' },
    ]}
  />

  {#if mode === 'birthday'}
    <p class="text-xl font-semibold text-slate-800">
      Em chọn tháng sinh, rồi chạm vào ngày sinh nhật của em.
    </p>
    <div class="flex items-center justify-between gap-2">
      <button
        type="button"
        class="min-h-12 min-w-12 text-lg {button.quiet}"
        aria-label="Tháng trước"
        onclick={() => turnMonth(-1)}>‹</button
      >
      <p class="text-xl font-bold text-slate-900" aria-live="polite">Tháng {month}</p>
      <button
        type="button"
        class="min-h-12 min-w-12 text-lg {button.quiet}"
        aria-label="Tháng sau"
        onclick={() => turnMonth(1)}>›</button
      >
    </div>
    <MonthSheet {month} picked={date} ondate={pickBirthday} />
    {#if date !== null}
      <p class="text-xl font-semibold text-slate-800">
        Sinh nhật em ngày {date} tháng {month} là thứ mấy?
      </p>
      {@render weekdayButtons((day) => {
        if (date !== null) birthday = checkWeekday(month, date, day);
      })}
    {/if}
    <FeedbackNote
      tone={birthday ? (birthday.ok ? 'ok' : 'warn') : 'info'}
      text={birthday?.text ??
        (date === null
          ? 'Lịch trên là lịch của một năm. Năm khác, thứ của ngày sinh nhật có thể khác.'
          : 'Em chọn thứ của ngày sinh nhật.')}
    />
  {:else}
    <p class="text-lg font-semibold text-slate-700" aria-live="polite">Số sao: {stars}</p>
    <p class="text-xl font-semibold text-slate-900">{mission.prompt}</p>
    <MonthSheet
      month={mission.month}
      picked={tapped}
      marks={result?.ok && mission.kind === 'date' ? [mission.answer] : []}
      ondate={tapDate}
    />
    {#if mission.kind === 'weekday'}
      {@render weekdayButtons(answer)}
    {/if}
    <FeedbackNote
      tone={result ? (result.ok ? 'ok' : 'warn') : 'info'}
      text={result?.text ??
        (mission.kind === 'date'
          ? 'Em chạm vào ngày đúng trên tờ lịch.'
          : 'Em tìm ngày trên tờ lịch, rồi chọn thứ.')}
    />
    {#if result?.ok}
      <div class="flex justify-center">
        <button type="button" class="min-h-12 text-lg {button.primary}" onclick={nextMission}
          >Thử thách khác</button
        >
      </div>
    {/if}
  {/if}
</div>
