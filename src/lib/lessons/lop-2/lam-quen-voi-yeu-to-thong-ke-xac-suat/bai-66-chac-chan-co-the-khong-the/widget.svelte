<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    CHOICES,
    COLORS,
    PRESETS,
    colorOf,
    drawBall,
    nextColor,
    possibility,
    reasonText,
  } from './engine.js';

  /** @type {import('./engine.js').ColorId[]} */
  let balls = $state([...PRESETS[1].balls]);
  let wanted = $state(/** @type {import('./engine.js').ColorId} */ ('xanh'));
  /** @type {import('./engine.js').Possibility | null} */
  let guess = $state(null);
  /** @type {import('./engine.js').ColorId | null} */
  let last = $state(null);
  let hits = $state(0);
  let misses = $state(0);

  const answer = $derived(possibility(balls, wanted));
  const right = $derived(guess === answer);
  const wantedName = $derived(colorOf(wanted).name);
  const feedback = $derived(
    guess === null
      ? `Em nhìn hộp và đoán: em có lấy được bóng ${wantedName} không?`
      : right
        ? `Đúng rồi! ${reasonText(balls, wanted)}`
        : `Chưa đúng. Em đếm xem trong hộp có mấy bóng ${wantedName}, có bóng màu nào khác không.`,
  );
  const drawText = $derived(
    last === null
      ? 'Em chạm "Lấy thử một quả". Lấy xong, em bỏ bóng lại vào hộp.'
      : `Em lấy được bóng ${colorOf(last).name}. Bóng ${wantedName}: ${hits} lần. Bóng màu khác: ${misses} lần.`,
  );

  function clearRound() {
    guess = null;
    last = null;
    hits = 0;
    misses = 0;
  }

  /** @param {number} i */
  function repaint(i) {
    balls = balls.map((b, j) => (j === i ? nextColor(b) : b));
    clearRound();
  }

  /** @param {readonly import('./engine.js').ColorId[]} preset */
  function usePreset(preset) {
    balls = [...preset];
    wanted = 'xanh';
    clearRound();
  }

  function draw() {
    last = drawBall(balls, Math.random);
    if (last === wanted) hits += 1;
    else misses += 1;
  }
</script>

<div class="space-y-5">
  <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn hộp có sẵn">
    {#each PRESETS as preset (preset.name)}
      <button
        type="button"
        class="min-h-12 text-base {button.quiet}"
        onclick={() => usePreset(preset.balls)}>{preset.name}</button
      >
    {/each}
  </div>

  <div>
    <p class="mb-2 text-base font-semibold text-slate-600">Hộp bóng (chạm vào bóng để đổi màu)</p>
    <div
      class="grid grid-cols-3 justify-items-center gap-3 rounded-3xl border-4 border-amber-700 bg-amber-100 p-4"
      role="group"
      aria-label="Hộp bóng"
    >
      {#each balls as ball, i (i)}
        {@const color = colorOf(ball)}
        <button
          type="button"
          class="h-16 w-16 rounded-full border-2 border-slate-700 text-xl font-bold shadow-sm transition hover:scale-105 {focusRing}"
          style:background-color={color.fill}
          style:color={color.ink}
          aria-label="Quả bóng {i + 1}, màu {color.name}. Chạm để đổi màu."
          onclick={() => repaint(i)}
        >
          {color.mark}
        </button>
      {/each}
    </div>
  </div>

  <SegmentedControl
    label="Em muốn lấy bóng màu nào?"
    bind:value={wanted}
    options={COLORS.map((c) => ({ value: c.id, label: `Bóng ${c.name}` }))}
    onchange={clearRound}
  />

  <div>
    <p class="mb-2 text-xl font-semibold text-slate-800">
      Em lấy một quả. Em lấy được bóng {wantedName} là:
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

  {#if guess !== null && right}
    <div class="space-y-3 rounded-2xl bg-sky-50 p-4">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={draw}>
        Lấy thử một quả
      </button>
      <p class="text-lg font-semibold text-slate-800" aria-live="polite">{drawText}</p>
    </div>
  {/if}
</div>
