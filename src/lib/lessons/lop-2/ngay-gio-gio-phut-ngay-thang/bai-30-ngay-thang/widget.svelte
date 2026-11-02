<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import MonthSheet from '#lib/core/kid/month-sheet.svelte';
  import { MISSIONS, checkMission, dateSentence, monthSentence } from './engine.js';

  let mode = $state('look');

  let month = $state(5);
  let date = $state(/** @type {number | null} */ (null));

  let turn = $state(0);
  let picked = $state(/** @type {number | null} */ (null));
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));
  const mission = $derived(MISSIONS[turn % MISSIONS.length]);
  /** @type {HTMLParagraphElement | undefined} */
  let question = $state();

  /** @param {number} step */
  function turnMonth(step) {
    month = ((month - 1 + step + 12) % 12) + 1;
    date = null;
  }

  /** @param {number} given */
  function answer(given) {
    if (result?.ok) return;
    picked = given;
    result = checkMission(mission, given);
  }

  async function nextMission() {
    turn += 1;
    picked = null;
    result = null;
    // "Câu tiếp" is gone now: hand the focus to the new question.
    await tick();
    question?.focus();
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn cách chơi"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'look', label: 'Tra lịch' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'look'}
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
    <MonthSheet {month} picked={date} ondate={(d) => (date = d)} />
    <p
      class="rounded-2xl bg-indigo-50 px-4 py-3 text-xl font-semibold text-indigo-900"
      aria-live="polite"
    >
      {date === null ? 'Em chạm vào một ngày trên tờ lịch.' : dateSentence(month, date)}
    </p>
    <p class="text-lg text-slate-700">{monthSentence(month)}</p>
  {:else}
    <p
      bind:this={question}
      tabindex="-1"
      class="rounded-2xl bg-sky-50 px-4 py-3 text-xl font-bold text-slate-900 outline-none"
    >
      {mission.prompt}
    </p>
    <MonthSheet
      month={mission.month}
      picked={mission.way === 'tap' ? picked : null}
      hidden={mission.hidden ?? []}
      ondate={mission.way === 'tap' ? answer : undefined}
    />
    {#if mission.way === 'pick'}
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Các đáp án">
        {#each mission.options ?? [] as option, i (option)}
          <button
            type="button"
            class="min-h-12 rounded-xl border-2 px-3 text-lg font-semibold transition {focusRing} {picked ===
            i
              ? result?.ok
                ? 'border-emerald-600 bg-emerald-100 text-emerald-900'
                : 'border-amber-500 bg-amber-100 text-amber-900'
              : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
            aria-pressed={picked === i}
            onclick={() => answer(i)}>{option}</button
          >
        {/each}
      </div>
    {/if}
    <p
      class="rounded-2xl px-4 py-3 text-lg font-semibold {result?.ok
        ? 'bg-emerald-100 text-emerald-900'
        : result
          ? 'bg-amber-100 text-amber-900'
          : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {result ? result.text : 'Em nhìn tờ lịch rồi trả lời.'}
    </p>
    {#if result?.ok}
      <button type="button" class="min-h-12 w-full text-lg {button.primary}" onclick={nextMission}>
        Câu tiếp
      </button>
    {/if}
  {/if}
</div>
