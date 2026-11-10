<script>
  import { tick } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { centuryOf, centuryWhy, centuryYears, roman } from '../_shared/measures.js';
  import {
    EVENTS,
    centuriesAround,
    centuryChoices,
    checkCentury,
    moveYear,
    placeInCentury,
  } from './engine.js';

  const STEPS = [-100, -10, -1, 1, 10, 100];

  let year = $state(2026);
  let eventIndex = $state(0);
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));
  /** Centuries already tried and wrong for this event. */
  let tried = $state(/** @type {number[]} */ ([]));

  const shown = $derived(centuriesAround(year));
  const current = $derived(centuryOf(year));
  const event = $derived(EVENTS[eventIndex % EVENTS.length]);
  const choices = $derived(centuryChoices(event.year));
  const solved = $derived(result?.ok === true);

  let nextButton = $state(/** @type {HTMLButtonElement | null} */ (null));
  let options = $state(/** @type {HTMLElement | null} */ (null));

  /** @param {number} century */
  async function pick(century) {
    if (solved || tried.includes(century)) return;
    result = checkCentury(event.year, century);
    if (!result.ok) {
      tried = [...tried, century];
      return;
    }
    year = event.year;
    await tick();
    nextButton?.focus();
  }

  async function nextEvent() {
    eventIndex += 1;
    result = null;
    tried = [];
    await tick();
    options?.querySelector('button')?.focus();
  }
</script>

<div class="space-y-4">
  <p class="text-center text-lg font-semibold text-slate-700">
    Dòng thời gian: mỗi đoạn là một thế kỉ, dài 100 năm.
  </p>

  <div class="flex gap-1" role="img" aria-label={centuryWhy(year)}>
    {#each shown as c (c)}
      {@const [first, last] = centuryYears(c)}
      <div
        class="relative flex-1 rounded-lg border-2 px-1 pt-1 pb-6 text-center {c === current
          ? 'border-amber-500 bg-amber-100'
          : 'border-slate-200 bg-white'}"
      >
        <p class="text-xl font-bold text-slate-800">{roman(c)}</p>
        <p class="text-[11px] leading-tight text-slate-600">{first}<br />–{last}</p>
        {#if c === current}
          <span
            class="absolute bottom-1 h-4 w-1.5 -translate-x-1/2 rounded bg-rose-600"
            style:left="{8 + placeInCentury(year) * 84}%"
          ></span>
        {/if}
      </div>
    {/each}
  </div>

  <p class="text-center text-3xl font-bold text-rose-700 tabular-nums" aria-hidden="true">
    Năm {year}
  </p>
  <div class="grid grid-cols-3 gap-2" role="group" aria-label="Chọn năm">
    {#each STEPS as step (step)}
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        aria-label="{step > 0 ? 'Thêm' : 'Bớt'} {Math.abs(step)} năm"
        onclick={() => (year = moveYear(year, step))}>{step > 0 ? '+' : '−'}{Math.abs(step)}</button
      >
    {/each}
  </div>
  <FeedbackNote tone="info" text={centuryWhy(year)} />

  <div class="space-y-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3">
    <p class="text-lg font-semibold text-slate-800">
      Đố em: Năm {event.year}, {event.text}. Năm {event.year} thuộc thế kỉ nào?
    </p>
    <div class="grid grid-cols-3 gap-2" role="group" aria-label="Chọn thế kỉ" bind:this={options}>
      {#each choices.options as c (c)}
        <button
          type="button"
          class="min-h-14 text-2xl font-bold {button.quiet} {tried.includes(c)
            ? 'line-through'
            : ''}"
          aria-label="Thế kỉ {roman(c)}"
          aria-disabled={solved || tried.includes(c)}
          onclick={() => pick(c)}>{roman(c)}</button
        >
      {/each}
    </div>
    <FeedbackNote
      tone={result === null ? 'info' : result.ok ? 'ok' : 'warn'}
      text={result?.text ?? 'Em nhớ: thế kỉ kết thúc ở năm tròn trăm.'}
    />
    {#if solved}
      <div class="flex justify-center">
        <button
          type="button"
          class="min-h-12 text-lg {button.primary}"
          bind:this={nextButton}
          onclick={nextEvent}>Câu đố khác</button
        >
      </div>
    {/if}
  </div>
</div>
