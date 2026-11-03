<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Thermometer from '../_shared/thermometer.svelte';
  import { COLD_END, HOT_END, degText, thermometerLabel } from '../_shared/measure.js';
  import { KIND_LABELS, SCENES, buildRound, sceneMessage } from './engine.js';

  let mode = $state(/** @type {'drag' | 'quiz'} */ ('drag'));
  let scene = $state(SCENES[2]);
  let t = $state(15);

  const solved = $derived(t === scene.t);

  /** @param {number} delta */
  function nudge(delta) {
    t = Math.max(COLD_END, Math.min(HOT_END, t + delta));
  }

  /** @param {import('#lib/core/kid/quiz.js').KidQuestion<{ t: number }>} q */
  function longOptions(q) {
    return q.kind !== 'read';
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'drag', label: 'Nhiệt kế' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'drag'}
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3" role="group" aria-label="Chọn tình huống">
      {#each SCENES as s (s.id)}
        <button
          type="button"
          aria-pressed={s.id === scene.id}
          class="flex min-h-16 items-center gap-2 rounded-2xl border-4 px-2 py-1 text-left font-semibold {focusRing} {s.id ===
          scene.id
            ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
            : 'border-slate-300 bg-white text-slate-800'}"
          onclick={() => (scene = s)}
        >
          <span class="text-2xl" aria-hidden="true">{s.icon}</span>
          <span class="leading-tight">{s.name}<br />{degText(s.t)}</span>
        </button>
      {/each}
    </div>

    <p class="text-center text-2xl font-bold text-slate-800">
      Kéo cột đỏ đến {degText(scene.t)}
    </p>

    <Thermometer {t} label={thermometerLabel(t, true)} onchange={(v) => (t = v)} />

    <FeedbackNote tone={solved ? 'ok' : 'info'} text={sceneMessage(scene, t)} />

    <div class="flex flex-wrap justify-center gap-3">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={() => nudge(1)}
        >Tăng 1 °C</button
      >
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={() => nudge(-1)}
        >Giảm 1 °C</button
      >
    </div>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em đọc nhiệt kế rất giỏi."
      listOptions={longOptions}
    >
      {#snippet visual(q, settled)}
        {#if q.visual}
          <Thermometer t={q.visual.t} label={thermometerLabel(q.visual.t, settled)} />
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
