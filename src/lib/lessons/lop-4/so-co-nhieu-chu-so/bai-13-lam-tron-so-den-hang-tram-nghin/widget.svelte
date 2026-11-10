<script>
  import { tick } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { readBig } from '../_shared/big-numbers.js';
  import { button } from '#lib/core/ui.js';
  import { QUIZ, STEP, STRETCHES, checkPick, marksAround, roundNote } from './engine.js';

  const MARK = '#4f46e5';
  const GOAL = '#059669';

  let mode = $state(/** @type {string | number} */ ('drag'));
  let stretch = $state(0);
  let value = $state(/** @type {number | null} */ (STRETCHES[0] + 30000));
  let quizIndex = $state(0);
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));

  const low = $derived(STRETCHES[stretch]);
  const dragNote = $derived(roundNote(value ?? low));
  const quizN = $derived(QUIZ[quizIndex % QUIZ.length]);
  const quizMarks = $derived(marksAround(quizN));

  const lineLow = $derived(mode === 'drag' ? low : quizMarks.low);
  const shown = $derived(mode === 'drag' ? (value ?? low) : quizN);
  const marks = $derived([
    { value: lineLow, color: MARK },
    { value: lineLow + STEP, color: MARK },
  ]);
  const hops = $derived(
    mode === 'drag' && value !== null && value !== dragNote.target
      ? [{ from: value, to: dragNote.target, label: 'làm tròn', color: GOAL }]
      : [],
  );

  /**
   * Only the halfway tick is labelled on the line; the two marks are written
   * under it, so their long numbers are never cut at the ends.
   * @param {number} v
   */
  const tickText = (v) => (v === lineLow + STEP / 2 ? fmt(v) : '');

  function nextStretch() {
    stretch = (stretch + 1) % STRETCHES.length;
    value = STRETCHES[stretch] + 30000;
  }

  /** @param {'low' | 'high'} pick */
  function pick(pick) {
    if (result?.ok) return;
    result = checkPick(quizN, pick);
  }

  /** The two mark buttons, focused again when a new number is asked. */
  let choices = $state(/** @type {HTMLElement | null} */ (null));

  async function nextQuiz() {
    quizIndex += 1;
    result = null;
    await tick();
    choices?.querySelector('button')?.focus();
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    hideLabel
    options={[
      { value: 'drag', label: 'Kéo số' },
      { value: 'quiz', label: 'Đố em' },
    ]}
    bind:value={mode}
  />

  <p class="text-center text-3xl font-bold text-slate-900 tabular-nums">{fmt(shown)}</p>

  {#if mode === 'drag'}
    <NumberLine
      min={lineLow}
      max={lineLow + STEP}
      step={10000}
      labelEvery={5}
      bind:value
      {marks}
      {hops}
      format={tickText}
      valueText={(v) => readBig(v)}
      width={360}
      label="Tia số từ {fmt(lineLow)} đến {fmt(lineLow + STEP)}"
      markerLabel="Số cần làm tròn"
    />
    <p
      class="flex justify-between text-base font-bold text-indigo-700 tabular-nums"
      aria-hidden="true"
    >
      <span>Mốc {fmt(lineLow)}</span><span>Mốc {fmt(lineLow + STEP)}</span>
    </p>
    <FeedbackNote tone="info" text={dragNote.text} />
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={nextStretch}>
        Đoạn tia số khác
      </button>
    </div>
  {:else}
    <NumberLine
      min={lineLow}
      max={lineLow + STEP}
      step={10000}
      labelEvery={5}
      value={quizN}
      interactive={false}
      {marks}
      format={tickText}
      width={360}
      label="Tia số từ {fmt(lineLow)} đến {fmt(lineLow + STEP)}"
    />
    <p
      class="flex justify-between text-base font-bold text-indigo-700 tabular-nums"
      aria-hidden="true"
    >
      <span>Mốc {fmt(lineLow)}</span><span>Mốc {fmt(lineLow + STEP)}</span>
    </p>
    <p class="text-center text-lg text-slate-700">
      Làm tròn {fmt(quizN)} đến hàng trăm nghìn được số nào?
    </p>
    <div class="grid grid-cols-2 gap-2" role="group" aria-label="Chọn mốc" bind:this={choices}>
      <button
        type="button"
        class="min-h-14 text-xl tabular-nums {button.quiet}"
        onclick={() => pick('low')}>{fmt(quizMarks.low)}</button
      >
      <button
        type="button"
        class="min-h-14 text-xl tabular-nums {button.quiet}"
        onclick={() => pick('high')}>{fmt(quizMarks.high)}</button
      >
    </div>
    <FeedbackNote
      tone={result === null ? 'info' : result.ok ? 'ok' : 'warn'}
      text={result?.text ?? 'Em chạm vào mốc mà số được làm tròn đến.'}
    />
    {#if result?.ok}
      <div class="flex justify-center">
        <button type="button" class="min-h-12 text-lg {button.primary}" onclick={nextQuiz}>
          Số khác
        </button>
      </div>
    {/if}
  {/if}
</div>
