<script>
  import { onDestroy } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { frameLoop } from '#lib/core/motion.js';
  import { button } from '#lib/core/ui.js';
  import { guessMessage, stopwatchReading } from './engine.js';

  const TARGET = 10;

  let mode = $state(/** @type {'xem' | 'doan'} */ ('xem'));
  let elapsed = $state(0);
  let running = $state(false);
  let message = $state('Em bấm "Bắt đầu" rồi đếm nhẩm theo đồng hồ.');
  let stop = () => {};
  /** When the running stopwatch was started, from `performance.now()`. */
  let startedAt = 0;

  const reading = $derived(stopwatchReading(elapsed));
  const hidden = $derived(mode === 'doan' && running);

  function start() {
    elapsed = 0;
    running = true;
    message =
      mode === 'doan'
        ? `Đồng hồ đang chạy nhưng bị che. Em đếm nhẩm, đủ ${TARGET} giây thì bấm "Dừng".`
        : 'Đồng hồ đang chạy. Cứ 60 giây là 1 phút.';
    // Read the real clock each frame: frames pause in a background tab and
    // the loop caps each step, so adding up frame steps would lose time.
    startedAt = performance.now();
    stop = frameLoop(() => {
      elapsed = (performance.now() - startedAt) / 1000;
    });
  }

  function halt() {
    stop();
    elapsed = (performance.now() - startedAt) / 1000;
    running = false;
    message =
      mode === 'doan'
        ? guessMessage(TARGET, elapsed)
        : `Đồng hồ chạy được ${reading.text}.${reading.seconds >= 60 ? ` Đó là ${reading.seconds} giây.` : ''}`;
  }

  /** @param {string | number} value */
  function switchMode(value) {
    stop();
    running = false;
    elapsed = 0;
    mode = value === 'doan' ? 'doan' : 'xem';
    message =
      mode === 'doan'
        ? `Thử thách: em bấm "Dừng" khi em nghĩ đã đủ ${TARGET} giây, không nhìn đồng hồ.`
        : 'Em bấm "Bắt đầu" rồi đếm nhẩm theo đồng hồ.';
  }

  onDestroy(() => stop());
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    options={[
      { value: 'xem', label: 'Đồng hồ bấm giây' },
      { value: 'doan', label: 'Đoán 10 giây' },
    ]}
    value={mode}
    onchange={switchMode}
  />

  <div
    class="mx-auto flex h-40 w-40 flex-col items-center justify-center rounded-full border-8 border-slate-700 bg-white"
    role="timer"
    aria-label={hidden ? 'Đồng hồ đang bị che' : `Đồng hồ chỉ ${reading.text}`}
  >
    <p class="text-4xl font-bold text-slate-800 tabular-nums">
      {hidden ? '??:??' : reading.face}
    </p>
    <p class="text-sm text-slate-500">phút : giây</p>
  </div>
  {#if !hidden}
    <p class="text-center text-xl font-semibold text-slate-700 tabular-nums" aria-hidden="true">
      {reading.seconds} giây
    </p>
  {/if}

  <div class="flex justify-center">
    <!-- One button whose label changes, so keyboard focus stays on it. -->
    <button
      type="button"
      class="min-h-14 min-w-40 text-xl {button.primary}"
      onclick={running ? halt : start}>{running ? 'Dừng' : 'Bắt đầu'}</button
    >
  </div>

  <FeedbackNote tone={!running && elapsed > 0 ? 'ok' : 'info'} text={message} />
</div>
