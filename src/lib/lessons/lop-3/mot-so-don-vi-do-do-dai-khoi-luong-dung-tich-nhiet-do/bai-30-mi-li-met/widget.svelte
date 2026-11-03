<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import MmRuler from '../_shared/mm-ruler.svelte';
  import { RULER_CM, rulerLabel } from '../_shared/measure.js';
  import {
    FIRST_TASK,
    KIND_LABELS,
    buildRound,
    makeTask,
    stretchMessage,
    taskText,
  } from './engine.js';

  let mode = $state(/** @type {'ruler' | 'quiz'} */ ('ruler'));
  let task = $state(FIRST_TASK);
  let mm = $state(0);

  const solved = $derived(mm === task.mm);

  /** @param {number} delta */
  function nudge(delta) {
    mm = Math.max(0, Math.min(RULER_CM * 10, mm + delta));
  }

  function next() {
    task = makeTask(Math.random, task);
    mm = 0;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'ruler', label: 'Thước phóng to' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'ruler'}
    <p class="text-center text-2xl font-bold text-slate-800">{taskText(task)}</p>

    <MmRuler {mm} overview label={rulerLabel(mm, true)} onchange={(v) => (mm = v)} />

    <p class="text-center text-lg text-slate-700">
      Giữa hai vạch số có 10 khoảng nhỏ. Mỗi khoảng nhỏ dài 1 mm.
    </p>

    <FeedbackNote tone={solved ? 'ok' : 'info'} text={stretchMessage(task, mm)} />

    <div class="flex flex-wrap justify-center gap-3">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={() => nudge(1)}
        >Thêm 1 mm</button
      >
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={() => nudge(-1)}
        >Bớt 1 mm</button
      >
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={next}
        >Bài khác</button
      >
    </div>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em đọc thước và đổi mi-li-mét rất giỏi."
    >
      {#snippet visual(q, settled)}
        {#if q.visual}
          <MmRuler mm={q.visual.mm} label={rulerLabel(q.visual.mm, settled)} />
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
