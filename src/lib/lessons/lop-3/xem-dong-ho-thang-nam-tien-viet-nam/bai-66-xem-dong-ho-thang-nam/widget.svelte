<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import MonthSheet from '#lib/core/kid/month-sheet.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import ClockFace from '#lib/core/visuals/clock-face.svelte';
  import QuizVisual from '../_shared/quiz-visual.svelte';
  import { WEEKDAYS } from '#lib/core/kid/time.js';
  import { dialText, later, monthDaysText, weekdayOf } from '../_shared/time.js';
  import { KIND_LABELS, START, TARGETS, buildRound, clockAdvice } from './engine.js';

  let mode = $state(/** @type {'clock' | 'calendar' | 'quiz'} */ ('clock'));

  let turn = $state(0);
  let minutes = $state(START);
  const target = $derived(TARGETS[turn % TARGETS.length]);
  const advice = $derived(clockAdvice(target, minutes));

  let month = $state(1);
  let date = $state(/** @type {number | null} */ (null));

  /** @param {number} step */
  function turnMonth(step) {
    month = ((month - 1 + step + 12) % 12) + 1;
    date = null;
  }

  function nextTime() {
    turn += 1;
    minutes = START;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'clock', label: 'Quay kim' },
      { value: 'calendar', label: 'Xem lịch' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'clock'}
    <p class="text-center text-2xl font-bold text-balance text-slate-800">
      Quay kim để đồng hồ chỉ {dialText(target)}
    </p>
    <ClockFace bind:minutes step={1} showReading={false} label="Đồng hồ em quay" />
    <div class="grid grid-cols-2 gap-3">
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        onclick={() => (minutes = later(minutes, -1))}>Lùi 1 phút</button
      >
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        onclick={() => (minutes = later(minutes, 1))}>Thêm 1 phút</button
      >
    </div>
    <FeedbackNote tone={advice.ok ? 'ok' : 'info'} text={advice.text} />
    <p class="text-lg text-slate-700">
      Mỗi vạch nhỏ là 1 phút. Kim dài đi từ một số đến số tiếp theo là 5 phút.
    </p>
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={nextTime}
        >Giờ khác</button
      >
    </div>
  {:else if mode === 'calendar'}
    <div class="flex items-center justify-between gap-2">
      <button
        type="button"
        class="min-h-12 min-w-12 text-lg {button.quiet}"
        aria-label="Tháng trước"
        onclick={() => turnMonth(-1)}>‹</button
      >
      <p class="text-xl font-bold text-slate-900" aria-live="polite">
        Tháng {month} có {monthDaysText(month)}
      </p>
      <button
        type="button"
        class="min-h-12 min-w-12 text-lg {button.quiet}"
        aria-label="Tháng sau"
        onclick={() => turnMonth(1)}>›</button
      >
    </div>
    <MonthSheet {month} picked={date} ondate={(d) => (date = d)} />
    <FeedbackNote
      tone="info"
      text={date === null
        ? 'Em chạm vào một ngày trên tờ lịch.'
        : `Ngày ${date} tháng ${month} là ${WEEKDAYS[weekdayOf(month, date)]}.`}
    />
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em xem đồng hồ đến từng phút và xem lịch rất giỏi."
    >
      {#snippet visual(q)}
        <QuizVisual visual={q.visual} />
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
