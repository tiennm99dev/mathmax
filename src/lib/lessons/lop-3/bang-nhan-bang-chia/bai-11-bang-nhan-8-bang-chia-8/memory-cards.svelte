<script>
  import { tick } from 'svelte';
  import { button } from '#lib/core/ui.js';
  import {
    KNOWN_BOX,
    answerCard,
    boxCounts,
    cardMessage,
    cardOptions,
    cardPrompt,
    newDeck,
    nextCard,
  } from './engine.js';

  /**
   * One deck of memory cards with its three boxes. The deck updates as soon as a
   * card is answered; the card stays up with its answer until "Thẻ tiếp theo".
   * @type {{ op: import('./engine.js').Op, seed: number }}
   */
  let { op, seed } = $props();

  // svelte-ignore state_referenced_locally
  let deck = $state(newDeck(op, seed));
  /** The card just answered, with the option tapped. */
  let told = $state(
    /** @type {{ n: number, picked: number, right: boolean, box: number } | null} */ (null),
  );
  let plays = $state(0);

  const waiting = $derived(nextCard(deck));
  const n = $derived(told ? told.n : waiting?.n);
  const counts = $derived(boxCounts(deck));
  const options = $derived(n === undefined ? null : cardOptions(deck.op, n));

  let answers = $state(/** @type {HTMLDivElement | undefined} */ (undefined));
  let nextButton = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));
  let againButton = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));

  /** @param {number} picked */
  async function answer(picked) {
    if (told || n === undefined || !options) return;
    // `n` follows the deck, so hold on to the card before the deck moves on.
    const asked = n;
    const right = picked === options.answer;
    deck = answerCard(deck, asked, right);
    const box = deck.cards.find((c) => c.n === asked)?.box ?? 0;
    told = { n: asked, picked, right, box };
    await tick();
    nextButton?.focus();
  }

  async function next() {
    told = null;
    await tick();
    if (waiting) answers?.querySelector('button')?.focus();
    else againButton?.focus();
  }

  async function again() {
    plays += 1;
    deck = newDeck(deck.op, seed + plays);
    told = null;
    await tick();
    answers?.querySelector('button')?.focus();
  }

  const BOXES = $derived([
    { label: 'Thẻ mới', count: counts.fresh, tone: 'bg-slate-100 text-slate-800' },
    { label: 'Đang nhớ', count: counts.learning, tone: 'bg-amber-100 text-amber-950' },
    { label: 'Đã thuộc', count: counts.known, tone: 'bg-emerald-100 text-emerald-900' },
  ]);

  /** @param {number} i */
  function optionTone(i) {
    if (!told || !options) return button.secondary;
    if (i === options.answer) return 'rounded-xl bg-emerald-600 font-bold text-white';
    if (i === told.picked) return 'rounded-xl bg-rose-200 font-bold text-rose-950';
    return 'rounded-xl bg-slate-100 font-bold text-slate-500';
  }
</script>

<div class="space-y-4">
  <ul class="grid grid-cols-3 gap-2" aria-label="Ba hộp thẻ">
    {#each BOXES as box (box.label)}
      <li class="rounded-2xl px-1 py-2 text-center {box.tone}">
        <span class="block text-base font-semibold">{box.label}</span>
        <span class="block text-3xl font-bold tabular-nums">{box.count}</span>
      </li>
    {/each}
  </ul>

  {#if n !== undefined && options}
    <p
      class="rounded-2xl border-4 border-indigo-300 bg-indigo-50 px-4 py-8 text-center text-4xl font-bold tabular-nums text-indigo-950"
    >
      {cardPrompt(deck.op, n)}
    </p>

    <div class="grid grid-cols-2 gap-3" role="group" aria-label="Chọn đáp án" bind:this={answers}>
      {#each options.options as option, i (option)}
        <button
          type="button"
          class="min-h-14 text-2xl tabular-nums {optionTone(i)}"
          aria-disabled={told !== null}
          onclick={() => answer(i)}>{option}</button
        >
      {/each}
    </div>
  {:else}
    <p class="rounded-2xl bg-emerald-100 px-4 py-8 text-center text-2xl font-bold text-emerald-900">
      <span aria-hidden="true">⭐ </span>Em đã thuộc cả 10 thẻ!
    </p>
  {/if}

  <p
    class="min-h-16 rounded-2xl px-4 py-3 text-xl font-semibold {told?.right
      ? 'bg-emerald-100 text-emerald-900'
      : told
        ? 'bg-amber-100 text-amber-950'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if told}
      {cardMessage(deck.op, told.n, told.right, told.box)}
    {:else if waiting}
      Em chọn đáp án đúng. Trả lời đúng {KNOWN_BOX} lần thì thẻ vào hộp "Đã thuộc".
    {:else}
      Em giỏi lắm! Em có thể luyện lại từ đầu.
    {/if}
  </p>

  {#if told}
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      bind:this={nextButton}
      onclick={next}>Thẻ tiếp theo</button
    >
  {:else if !waiting}
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      bind:this={againButton}
      onclick={again}>Luyện lại</button
    >
  {/if}
</div>
