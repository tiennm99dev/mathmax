<script>
  import { button, focusRing } from '#lib/core/ui.js';
  import RulerBoard from '../_shared/ruler-board.svelte';
  import { estimateMessage, estimateStars, inSentence } from '../_shared/length.js';
  import { GUESS_MAX, GUESS_MIN, ROUNDS, gameSummary, makeGame, startGuess } from './engine.js';

  // The first game is fixed so the prerendered page and the browser agree.
  let seed = $state(1);
  let index = $state(0);
  let guess = $state(startGuess(1));
  /** `guess`: set a guess. `measure`: slide the ruler to measure. */
  let phase = $state(/** @type {'guess' | 'measure'} */ ('guess'));
  let shift = $state(makeGame(1)[0].shift);
  /** @type {number[]} */
  let stars = $state([]);

  const game = $derived(makeGame(seed));
  const finished = $derived(index >= ROUNDS);
  const item = $derived(finished ? game[ROUNDS - 1] : game[index]);
  const noun = $derived(inSentence(item.thing.label));
  const measured = $derived(phase === 'measure' && shift === 0);
  const won = $derived(estimateStars(guess, item.length));
  const total = $derived(stars.reduce((a, b) => a + b, 0));

  const message = $derived(
    finished
      ? gameSummary(stars)
      : phase === 'guess'
        ? `Em nhìn ${noun} và ô 1 cm ở góc. Em đoán ${noun} dài mấy xăng-ti-mét? Bấm − hoặc + rồi bấm "Đo bằng thước".`
        : measured
          ? estimateMessage(guess, item.length, noun)
          : `Em đoán ${guess} cm. Bây giờ kéo thước cho vạch 0 thẳng với đầu ${noun} để đo.`,
  );

  /** @param {number} delta */
  function bump(delta) {
    guess = Math.max(GUESS_MIN, Math.min(GUESS_MAX, guess + delta));
  }

  function measure() {
    phase = 'measure';
  }

  function next() {
    stars = [...stars, won];
    index += 1;
    phase = 'guess';
    if (index < ROUNDS) shift = game[index].shift;
  }

  function again() {
    seed += 1;
    index = 0;
    stars = [];
    phase = 'guess';
    guess = startGuess(seed);
    shift = makeGame(seed)[0].shift;
  }

  const stepButton = `h-14 w-14 rounded-2xl border-4 border-indigo-300 bg-white text-3xl font-bold text-indigo-700 hover:bg-indigo-50 disabled:opacity-40 ${focusRing}`;
</script>

<div class="space-y-4">
  <div class="flex items-center justify-between gap-3">
    <p class="text-base font-semibold text-slate-600">
      {#if finished}Hết lượt{:else}Vật {index + 1} / {ROUNDS}{/if}
    </p>
    <p class="text-base font-semibold text-amber-700">
      <span aria-hidden="true">⭐</span>
      {total} sao
    </p>
  </div>

  {#if !finished}
    {#key `${seed}-${index}`}
      <RulerBoard
        thing={item.thing}
        length={item.length}
        bind:shift
        showRuler={phase === 'measure'}
        showUnit
      />
    {/key}

    {#if phase === 'guess'}
      <div class="flex items-center gap-4" role="group" aria-label="Em đoán độ dài">
        <button
          type="button"
          class={stepButton}
          aria-label="Bớt 1 xăng-ti-mét"
          disabled={guess <= GUESS_MIN}
          onclick={() => bump(-1)}>−</button
        >
        <p
          class="min-w-24 text-center text-4xl font-bold text-slate-900 tabular-nums"
          aria-live="polite"
        >
          {guess} <span class="text-2xl">cm</span>
        </p>
        <button
          type="button"
          class={stepButton}
          aria-label="Thêm 1 xăng-ti-mét"
          disabled={guess >= GUESS_MAX}
          onclick={() => bump(1)}>+</button
        >
      </div>
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={measure}>
        Đo bằng thước
      </button>
    {/if}
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {measured || finished
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if measured}<span aria-hidden="true">{'⭐'.repeat(won) || '🙂'} </span>{/if}{message}
  </p>

  {#if finished}
    <button type="button" class="min-h-12 text-lg {button.primary}" onclick={again}>
      Chơi lại
    </button>
  {:else if measured}
    <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
      {index + 1 < ROUNDS ? 'Vật tiếp theo' : 'Xem kết quả'}
    </button>
  {/if}
</div>
