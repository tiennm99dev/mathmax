<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import { readTo1000 } from '../_shared/place-value.js';
  import { TARGETS, WHOLE, hop, lineOf, targetNote, zoomIn, zoomOut } from './engine.js';

  /** @type {import('./engine.js').View} */
  let view = $state(WHOLE);
  let round = $state(0);

  const target = $derived(TARGETS[round % TARGETS.length]);
  const line = $derived(lineOf(view));
  const note = $derived(targetNote(view, target));
  const found = $derived(view.value === target);

  function next() {
    round += 1;
    view = zoomOut(view);
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Tìm số <strong class="text-2xl text-indigo-700 tabular-nums">{target}</strong> trên tia số.
  </p>

  <div class="rounded-2xl bg-sky-50 p-2">
    <p class="text-center font-semibold text-slate-700">
      {view.start === null
        ? 'Cả tia số: các mốc tròn trăm'
        : `Phóng to từ ${line.min} đến ${line.max}: các mốc tròn chục`}
    </p>
    <NumberLine
      min={line.min}
      max={line.max}
      step={line.step}
      width={380}
      labelEvery={2}
      format={(v) => String(v)}
      valueText={(v) => `${v}, đọc là ${readTo1000(v)}`}
      label="Tia số từ {line.min} đến {line.max}, mỗi mốc cách nhau {line.step}"
      markerLabel="Điểm trên tia số"
      bind:value={() => view.value, (v) => (view = { ...view, value: v ?? line.min })}
    />
    <p class="text-center text-lg font-semibold text-slate-800">
      Điểm đỏ ở số <strong class="text-2xl tabular-nums">{view.value}</strong>
    </p>
  </div>

  <div class="grid grid-cols-2 gap-2">
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={view.value <= line.min}
      onclick={() => (view = hop(view, -1))}>← Lùi {line.step}</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={view.value >= line.max}
      onclick={() => (view = hop(view, 1))}>Tiến {line.step} →</button
    >
    {#if view.start === null}
      <button
        type="button"
        class="col-span-2 min-h-12 text-lg {button.quiet}"
        onclick={() => (view = zoomIn(view))}>Phóng to quanh số {view.value}</button
      >
    {:else}
      <button
        type="button"
        class="col-span-2 min-h-12 text-lg {button.quiet}"
        onclick={() => (view = zoomOut(view))}>Thu nhỏ về cả tia số</button
      >
    {/if}
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />

  {#if found}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Tìm số khác
      </button>
    </div>
  {/if}
</div>
