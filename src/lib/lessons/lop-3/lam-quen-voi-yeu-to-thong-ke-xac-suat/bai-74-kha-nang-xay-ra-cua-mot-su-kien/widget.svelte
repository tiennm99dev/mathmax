<script>
  import ProbabilitySpinner from '#lib/core/visuals/probability-spinner.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { capitalize } from '#lib/core/kid/quiz.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    CHOICES,
    COLORS,
    MAX_CELLS,
    MIN_CELLS,
    PRESETS,
    colorOf,
    countsByColor,
    nextColor,
    outcomesText,
    possibility,
    reasonText,
    resize,
  } from './engine.js';

  /** @type {import('./engine.js').ColorId[]} */
  let cells = $state([...PRESETS[1].cells]);
  let size = $state(PRESETS[1].cells.length);
  let wanted = $state(/** @type {import('./engine.js').ColorId} */ ('xanh'));
  /** @type {import('./engine.js').Possibility | null} */
  let guess = $state(null);
  /** @type {number[]} */
  let counts = $state([]);
  /** Bumped whenever the wheel changes, so the spinner starts afresh. */
  let wheel = $state(0);

  const sectors = $derived(
    cells.map((id) => ({ label: capitalize(colorOf(id).name), color: colorOf(id).fill })),
  );
  const answer = $derived(possibility(cells, wanted));
  const right = $derived(guess === answer);
  const wantedName = $derived(colorOf(wanted).name);
  const stops = $derived(countsByColor(cells, counts));
  const spins = $derived(counts.reduce((s, c) => s + c, 0));
  const feedback = $derived(
    guess === null
      ? `Em đoán trước: kim dừng ở ô ${wantedName} là chắc chắn, có thể hay không thể?`
      : right
        ? `Đúng rồi! ${reasonText(cells, wanted)}`
        : `Chưa đúng. Em đếm xem vòng quay có mấy ô ${wantedName}, có ô màu nào khác không.`,
  );

  function changed() {
    guess = null;
    counts = [];
    wheel += 1;
  }

  /** @param {number} i */
  function repaint(i) {
    cells = cells.map((c, j) => (j === i ? nextColor(c) : c));
    changed();
  }

  /** @param {number} n */
  function setSize(n) {
    cells = resize(cells, n);
    changed();
  }

  /** @param {readonly import('./engine.js').ColorId[]} preset */
  function usePreset(preset) {
    cells = [...preset];
    size = preset.length;
    changed();
  }
</script>

<div class="space-y-5">
  <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn vòng quay có sẵn">
    {#each PRESETS as preset (preset.name)}
      <button
        type="button"
        class="min-h-12 text-base {button.quiet}"
        onclick={() => usePreset(preset.cells)}>{preset.name}</button
      >
    {/each}
  </div>

  <div class="space-y-3 rounded-2xl bg-amber-50 p-4">
    <Stepper label="Số ô" bind:value={size} min={MIN_CELLS} max={MAX_CELLS} onchange={setSize} />
    <p class="text-base font-semibold text-slate-600">Chạm vào một ô để đổi màu ô đó.</p>
    <div class="flex flex-wrap gap-2" role="group" aria-label="Màu các ô">
      {#each cells as cell, i (i)}
        {@const color = colorOf(cell)}
        <button
          type="button"
          class="h-14 w-14 rounded-2xl border-2 border-slate-700 text-lg font-bold text-white shadow-sm transition hover:scale-105 {focusRing}"
          style:background-color={color.fill}
          aria-label="Ô {i + 1}, màu {color.name}. Chạm để đổi màu."
          onclick={() => repaint(i)}>{i + 1}</button
        >
      {/each}
    </div>
  </div>

  <SegmentedControl
    label="Sự kiện: kim dừng ở ô màu nào?"
    bind:value={wanted}
    options={COLORS.map((c) => ({ value: c.id, label: `Ô ${c.name}` }))}
    onchange={() => (guess = null)}
  />

  <div>
    <p class="mb-2 text-xl font-semibold text-slate-800">
      Quay một lần. Kim dừng ở ô {wantedName} là:
    </p>
    <div role="group" aria-label="Em đoán" class="flex flex-wrap gap-3">
      {#each CHOICES as choice (choice.value)}
        <button
          type="button"
          class="min-h-14 rounded-2xl border-4 px-4 text-xl font-bold transition {focusRing} {guess ===
          choice.value
            ? right
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-rose-500 bg-rose-50 text-rose-700'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-pressed={guess === choice.value}
          onclick={() => (guess = choice.value)}>{choice.label}</button
        >
      {/each}
    </div>
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {guess !== null && right
      ? 'bg-emerald-100 text-emerald-900'
      : guess !== null
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if guess !== null && right}<span aria-hidden="true">⭐ </span>{/if}{feedback}
  </p>

  <div class="space-y-3 rounded-2xl bg-sky-50 p-4">
    <p class="text-lg font-semibold text-slate-800">Quay thử để kiểm tra. {outcomesText(cells)}</p>
    {#key wheel}
      <ProbabilitySpinner {sectors} bind:counts showTable={false} label="Vòng quay may mắn" />
    {/key}
    <ul class="flex flex-wrap gap-3 text-lg font-semibold text-slate-800">
      {#each COLORS as color (color.id)}
        <li class="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
          <span
            class="inline-block h-5 w-5 rounded"
            style:background-color={color.fill}
            aria-hidden="true"
          ></span>
          Ô {color.name}: {stops[color.id]} lần
        </li>
      {/each}
    </ul>
    {#if spins > 0}
      <p class="text-base text-slate-700">
        Đã quay {spins} lần. Kim dừng ở ô {wantedName}
        {stops[wanted]} lần{answer === 'khong-the'
          ? ', vì vòng quay không có ô màu này.'
          : answer === 'chac-chan'
            ? ', lần nào cũng vậy.'
            : '.'}
      </p>
    {/if}
  </div>
</div>
