<script>
  import { tick } from 'svelte';
  import { capitalize } from '#lib/core/kid/quiz.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import BalanceScale from '#lib/core/kid/balance-scale.svelte';
  import Cup from '#lib/core/kid/cup.svelte';
  import Vessel from '#lib/core/kid/vessel.svelte';
  import { CUPS, pourMessage } from '#lib/core/kid/capacity.js';
  import {
    MAX_WEIGHTS,
    WEIGHTS,
    sortedWeights,
    weighMessage,
    weightsText,
  } from '#lib/core/kid/mass.js';
  import {
    GUESS_MAX,
    GUESS_MIN,
    ROUNDS,
    checkMessage,
    gameSummary,
    guessPrompt,
    guessStars,
    itemName,
    makeGame,
    startGuess,
    unitOf,
  } from './engine.js';

  // The first game is fixed so the prerendered page and the browser agree.
  let seed = $state(1);
  let index = $state(0);
  let guess = $state(startGuess(1));
  /** `guess`: set a guess. `check`: weigh or pour to check it. */
  let phase = $state(/** @type {'guess' | 'check'} */ ('guess'));
  /** @type {number[]} */
  let weights = $state([]);
  let poured = $state(0);
  /** @type {number[]} */
  let stars = $state([]);

  /** @type {HTMLElement | undefined} */
  let controls = $state();
  /** @type {HTMLElement | undefined} */
  let nextEl = $state();

  const game = $derived(makeGame(seed));
  const finished = $derived(index >= ROUNDS);
  const item = $derived(finished ? game[ROUNDS - 1] : game[index]);
  const name = $derived(itemName(item));
  const unit = $derived(unitOf(item));
  const sum = $derived(weights.reduce((s, w) => s + w, 0));
  const checked = $derived(
    phase === 'check' && (item.kind === 'mass' ? sum === item.amount : poured === item.amount),
  );
  const won = $derived(guessStars(guess, item.amount));
  const total = $derived(stars.reduce((a, b) => a + b, 0));

  /** @type {import('#lib/core/kid/mass.js').Load[]} */
  const left = $derived(
    item.kind === 'mass' ? [{ kind: 'thing', id: item.id, kg: item.amount }] : [],
  );
  /** @type {import('#lib/core/kid/mass.js').Load[]} */
  const right = $derived(sortedWeights(weights).map((kg) => ({ kind: 'weight', kg })));

  const scaleText = $derived(
    `Cân đĩa. Đĩa bên trái: ${name}. Đĩa bên phải: ${
      weights.length > 0 ? `quả cân ${weightsText(sortedWeights(weights))}` : 'chưa có quả cân'
    }. ${sum === item.amount ? 'Cân thăng bằng.' : sum < item.amount ? 'Đĩa bên trái thấp hơn.' : 'Đĩa bên phải thấp hơn.'}`,
  );

  const message = $derived(
    finished
      ? gameSummary(stars)
      : phase === 'guess'
        ? guessPrompt(item)
        : checked
          ? checkMessage(item, guess)
          : item.kind === 'mass'
            ? weighMessage(name, item.amount, weights)
            : pourMessage(name, item.amount, poured),
  );

  /** @param {number} delta */
  function bump(delta) {
    guess = Math.max(GUESS_MIN, Math.min(GUESS_MAX, guess + delta));
  }

  async function check() {
    phase = 'check';
    await tick();
    controls?.querySelector('button')?.focus();
  }

  async function focusNext() {
    await tick();
    nextEl?.focus();
  }

  /**
   * Puts a weight of `kg` on the pan. Once level, focus moves to the next
   * button; when the pan is full but not level, to the weights to take off.
   * @param {number} kg
   */
  async function addWeight(kg) {
    if (checked || weights.length >= MAX_WEIGHTS) return;
    weights = [...weights, kg];
    if (weights.reduce((s, w) => s + w, 0) === item.amount) focusNext();
    else if (weights.length >= MAX_WEIGHTS) {
      await tick();
      /** @type {HTMLElement | null | undefined} */ (
        controls?.querySelector('[data-weight]')
      )?.focus();
    }
  }

  /** @param {number} kg */
  async function removeWeight(kg) {
    const i = weights.lastIndexOf(kg);
    if (i < 0) return;
    weights = weights.filter((_, j) => j !== i);
    await tick();
    /** @type {HTMLElement | null | undefined} */ (
      controls?.querySelector('[data-weight]') ?? controls?.querySelector('button')
    )?.focus();
  }

  function pourOne() {
    if (poured >= item.amount) return;
    poured += 1;
    if (poured === item.amount) focusNext();
  }

  function next() {
    stars = [...stars, won];
    index += 1;
    phase = 'guess';
    weights = [];
    poured = 0;
    guess = startGuess(seed * 10 + index);
  }

  function again() {
    seed += 1;
    index = 0;
    stars = [];
    phase = 'guess';
    weights = [];
    poured = 0;
    guess = startGuess(seed);
  }

  const stepButton = `h-14 w-14 rounded-2xl border-4 border-indigo-300 bg-white text-3xl font-bold text-indigo-700 hover:bg-indigo-50 disabled:opacity-40 ${focusRing}`;
  const bigBtn = `min-h-14 rounded-2xl border-4 px-4 text-xl font-bold transition motion-reduce:transition-none ${focusRing}`;
</script>

<div class="space-y-4">
  <div class="flex items-center justify-between gap-3">
    <p class="text-base font-semibold text-slate-600">
      {#if finished}Hết lượt{:else}Đồ vật {index + 1} / {ROUNDS}{/if}
    </p>
    <p class="text-base font-semibold text-amber-700">
      <span aria-hidden="true">⭐</span>
      {total} sao
    </p>
  </div>

  {#if !finished}
    <div class="rounded-2xl bg-sky-50 p-3">
      {#if item.kind === 'mass'}
        <BalanceScale {left} {right} label={scaleText} />
      {:else}
        <div class="flex flex-wrap items-end gap-4">
          <Vessel
            id={item.id}
            fill={phase === 'check' ? (item.amount - poured) / item.amount : 1}
            label={phase === 'check' && poured === item.amount
              ? `${capitalize(name)} đã hết nước`
              : poured > 0
                ? `${capitalize(name)} còn nước`
                : `${capitalize(name)} đầy nước`}
            caption={capitalize(name)}
            size={110}
          />
          {#if phase === 'check'}
            <div
              class="flex min-w-0 flex-1 flex-wrap gap-1"
              role="img"
              aria-label="{poured} ca 1 l đầy nước"
            >
              {#each { length: CUPS } as _, i (i)}
                <Cup full={i < poured} size={34} />
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    </div>

    {#if phase === 'guess'}
      <div class="flex items-center gap-4" role="group" aria-label="Em đoán">
        <button
          type="button"
          class={stepButton}
          aria-label="Bớt 1 {item.kind === 'mass' ? 'ki-lô-gam' : 'lít'}"
          disabled={guess <= GUESS_MIN}
          onclick={() => bump(-1)}>−</button
        >
        <p
          class="min-w-24 text-center text-4xl font-bold text-slate-900 tabular-nums"
          aria-live="polite"
        >
          {guess} <span class="text-2xl">{unit}</span>
        </p>
        <button
          type="button"
          class={stepButton}
          aria-label="Thêm 1 {item.kind === 'mass' ? 'ki-lô-gam' : 'lít'}"
          disabled={guess >= GUESS_MAX}
          onclick={() => bump(1)}>+</button
        >
      </div>
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={check}>
        {item.kind === 'mass' ? 'Cân thử' : 'Đong thử'}
      </button>
    {:else}
      <p class="text-lg text-slate-700">Em đoán: <strong>{guess} {unit}</strong></p>
      <div bind:this={controls} class="space-y-3">
        {#if item.kind === 'mass'}
          <div role="group" aria-label="Thêm quả cân" class="flex flex-wrap gap-3">
            {#each WEIGHTS as kg (kg)}
              <button
                type="button"
                class="{bigBtn} border-slate-400 bg-slate-700 text-white hover:bg-slate-800 disabled:opacity-40"
                disabled={checked || weights.length >= MAX_WEIGHTS}
                aria-label="Thêm quả cân {kg} ki-lô-gam"
                onclick={() => addWeight(kg)}>+ {kg} kg</button
              >
            {/each}
          </div>
          {#if weights.length > 0 && !checked}
            <div
              role="group"
              aria-label="Quả cân trên đĩa, chạm để bỏ bớt"
              class="flex flex-wrap gap-2"
            >
              {#each sortedWeights(weights) as kg, i (i)}
                <button
                  type="button"
                  data-weight
                  class="min-h-12 rounded-xl border-2 border-slate-300 bg-white px-3 text-lg font-semibold text-slate-700 hover:border-rose-400 {focusRing}"
                  aria-label="Bỏ quả cân {kg} ki-lô-gam"
                  onclick={() => removeWeight(kg)}>{kg} kg <span aria-hidden="true">✕</span></button
                >
              {/each}
            </div>
          {/if}
        {:else}
          <button
            type="button"
            class="min-h-14 rounded-2xl px-5 text-xl {button.primary}"
            disabled={checked}
            onclick={pourOne}>Rót 1 l</button
          >
        {/if}
      </div>
    {/if}
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {checked || finished
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if checked}<span aria-hidden="true">{'⭐'.repeat(won) || '🙂'} </span>{/if}{message}
  </p>

  {#if finished}
    <button type="button" class="min-h-12 text-lg {button.primary}" onclick={again}>
      Chơi lại
    </button>
  {:else if checked}
    <button
      type="button"
      bind:this={nextEl}
      class="min-h-12 text-lg {button.primary}"
      onclick={next}
    >
      {index + 1 < ROUNDS ? 'Đồ vật tiếp theo' : 'Xem kết quả'}
    </button>
  {/if}
</div>
