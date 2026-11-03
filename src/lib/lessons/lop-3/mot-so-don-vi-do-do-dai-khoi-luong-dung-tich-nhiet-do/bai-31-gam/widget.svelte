<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import DialScale from '../_shared/dial-scale.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { DIAL_MAX, dialLabel, gramText } from '../_shared/measure.js';
  import {
    FIRST_TARGET,
    KIND_LABELS,
    THINGS,
    buildRound,
    fits,
    makeTarget,
    plateGrams,
    weighMessage,
  } from './engine.js';

  let mode = $state(/** @type {'scale' | 'quiz'} */ ('scale'));
  let target = $state(FIRST_TARGET);
  /** @type {string[]} */
  let placed = $state([]);
  let full = $state(false);

  const g = $derived(plateGrams(placed));
  const solved = $derived(g === target);
  const note = $derived(
    full
      ? `Cân này chỉ cân được đến ${gramText(DIAL_MAX)}. Em nhấc bớt đồ ra.`
      : weighMessage(target, g),
  );

  /** @param {import('./engine.js').ScaleThing} thing */
  function toggle(thing) {
    if (placed.includes(thing.id)) {
      placed = placed.filter((id) => id !== thing.id);
      full = false;
    } else if (fits(placed, thing)) {
      placed = [...placed, thing.id];
      full = false;
    } else {
      full = true;
    }
  }

  function next() {
    target = makeTarget(Math.random, target);
    placed = [];
    full = false;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'scale', label: 'Cân đồng hồ' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'scale'}
    <p class="text-center text-2xl font-bold text-balance text-slate-800">
      Đặt đồ lên cân để kim chỉ {gramText(target)}
    </p>

    <DialScale {g} label={dialLabel(g, true)} />

    <FeedbackNote tone={solved ? 'ok' : full ? 'warn' : 'info'} text={note} />

    <div
      class="grid grid-cols-2 gap-3 sm:grid-cols-3"
      role="group"
      aria-label="Đồ vật để đặt lên cân"
    >
      {#each THINGS as thing (thing.id)}
        {@const on = placed.includes(thing.id)}
        <button
          type="button"
          aria-pressed={on}
          class="flex min-h-20 items-center gap-2 rounded-2xl border-4 px-2 py-1 text-left font-semibold {focusRing} {on
            ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
            : 'border-slate-300 bg-white text-slate-800'}"
          onclick={() => toggle(thing)}
        >
          <Picture name={thing.picture} size={44} decorative />
          <span class="leading-tight">{thing.name}<br />{gramText(thing.g)}</span>
        </button>
      {/each}
    </div>

    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={next}
        >Bài khác</button
      >
    </div>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em đọc cân và đổi ki-lô-gam ra gam rất giỏi."
    >
      {#snippet visual(q, settled)}
        {#if q.visual}
          <DialScale g={q.visual.g} label={dialLabel(q.visual.g, settled)} />
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
