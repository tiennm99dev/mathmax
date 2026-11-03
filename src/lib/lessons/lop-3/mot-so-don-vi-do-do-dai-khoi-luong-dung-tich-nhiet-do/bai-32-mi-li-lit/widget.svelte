<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Vessel from '#lib/core/kid/vessel.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import Cylinder from '../_shared/cylinder.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { CYLINDER_MAX, cylinderLabel, mlText } from '../_shared/measure.js';
  import {
    FIRST_TARGET,
    KIND_LABELS,
    buildRound,
    makeTarget,
    pour,
    pourMessage,
  } from './engine.js';

  let mode = $state(/** @type {'pour' | 'quiz'} */ ('pour'));
  let target = $state(FIRST_TARGET);
  let ml = $state(0);

  const solved = $derived(ml === target);
  const left = $derived(CYLINDER_MAX - ml);

  function next() {
    target = makeTarget(Math.random, target);
    ml = 0;
  }

  /** Sets the mark that shows a full litre in the cylinder as the task. */
  function wholeLitre() {
    target = CYLINDER_MAX;
    ml = 0;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'pour', label: 'Rót nước' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'pour'}
    <p class="text-center text-2xl font-bold text-slate-800">
      Rót nước đến vạch {mlText(target)}
    </p>

    <div class="flex flex-wrap items-end justify-center gap-4">
      <Vessel
        id="bottle"
        fill={left / CYLINDER_MAX}
        size={110}
        caption="Chai 1 l"
        label="Chai 1 l còn {mlText(left)} nước"
      />
      <Cylinder {ml} label={cylinderLabel(ml, true)} />
    </div>

    <FeedbackNote tone={solved ? 'ok' : 'info'} text={pourMessage(target, ml)} />

    <div class="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        onclick={() => (ml = pour(ml, 100))}>Rót 100 ml</button
      >
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        onclick={() => (ml = pour(ml, 50))}>Rót 50 ml</button
      >
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        onclick={() => (ml = pour(ml, -50))}>Đổ bớt 50 ml</button
      >
    </div>
    <div class="flex flex-wrap justify-center gap-3">
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={next}
        >Bài khác</button
      >
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={wholeLitre}
        >Thử rót hết chai 1 l</button
      >
    </div>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em đọc vạch ống đong và đổi lít ra mi-li-lít rất giỏi."
    >
      {#snippet visual(q, settled)}
        {#if q.visual}
          <Cylinder ml={q.visual.ml} label={cylinderLabel(q.visual.ml, settled)} />
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
