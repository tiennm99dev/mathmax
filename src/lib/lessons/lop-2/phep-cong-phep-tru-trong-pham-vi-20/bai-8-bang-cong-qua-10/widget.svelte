<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { ADD_TABLE } from '../_shared/facts.js';
  import { GROUPS, buildDeck, cardReason, roundResult, timeText } from './engine.js';

  let group = $state(/** @type {import('./engine.js').Group} */ ('tat-ca'));
  let seed = $state(1);
  let started = $state(false);
  let index = $state(0);
  /** @type {boolean[]} */
  let marks = $state([]);
  /** Option tapped on the current card, or null before the tap. */
  let picked = $state(/** @type {number | null} */ (null));
  let elapsed = $state(0);
  /** When the round started, in ms; 0 while no round runs. */
  let startAt = 0;
  /** Facts answered right (`a+b` keys) and missed, over every round. */
  let known = $state(/** @type {Record<string, 'right' | 'missed'>} */ ({}));
  /** @type {HTMLElement | undefined} */
  let cardEl = $state();

  const deck = $derived(buildDeck(group, seed));
  const finished = $derived(started && index >= deck.length);
  const card = $derived(started && !finished ? deck[index] : null);
  const flipped = $derived(picked !== null);
  const right = $derived(card !== null && picked === card.answer);
  const result = $derived(finished ? roundResult(deck, marks) : null);

  $effect(() => {
    if (!started || finished) return;
    const id = setInterval(() => (elapsed = Math.floor((Date.now() - startAt) / 1000)), 250);
    return () => clearInterval(id);
  });

  async function start() {
    started = true;
    index = 0;
    marks = [];
    picked = null;
    elapsed = 0;
    startAt = Date.now();
    await tick();
    cardEl?.focus();
  }

  function changeGroup() {
    started = false;
    seed += 1;
    index = 0;
    marks = [];
    picked = null;
    elapsed = 0;
  }

  /** @param {number} i */
  function pick(i) {
    if (!card || flipped) return;
    picked = i;
    const ok = i === card.answer;
    marks = [...marks, ok];
    known = { ...known, [`${card.a}+${card.b}`]: ok ? 'right' : 'missed' };
    if (index === deck.length - 1) elapsed = Math.floor((Date.now() - startAt) / 1000);
  }

  async function next() {
    index += 1;
    picked = null;
    await tick();
    cardEl?.focus();
  }

  async function again() {
    seed += 1;
    await start();
  }

  /** The table in the book's columns, 9 + ... down to 2 + .... */
  const columns = [9, 8, 7, 6, 5, 4, 3, 2].map((a) => ADD_TABLE.filter((f) => f.a === a));
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Bộ thẻ"
    options={GROUPS.map((g) => ({ value: g.value, label: g.label }))}
    bind:value={group}
    onchange={changeGroup}
  />

  {#if !started}
    <div class="space-y-3 rounded-2xl bg-indigo-50 p-4">
      <p class="text-xl font-semibold text-slate-800">
        Bộ thẻ có {deck.length} phép cộng. Mỗi thẻ, em chạm vào kết quả đúng. Đồng hồ sẽ đếm giờ.
      </p>
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={start}>
        Bắt đầu
      </button>
    </div>
  {:else if card}
    <div class="flex items-center justify-between text-lg font-semibold text-slate-700">
      <span bind:this={cardEl} tabindex="-1" class="rounded {focusRing}"
        >Thẻ {index + 1} / {deck.length}</span
      >
      <span class="tabular-nums" aria-label="Thời gian: {timeText(elapsed)}"
        >⏱ {timeText(elapsed)}</span
      >
    </div>

    <div class="perspective-distant mx-auto h-44 w-full max-w-sm">
      <div
        class="relative h-full w-full transition-transform duration-500 transform-3d motion-reduce:transition-none {flipped
          ? 'rotate-y-180'
          : ''}"
      >
        <div
          class="absolute inset-0 flex items-center justify-center rounded-3xl border-4 border-indigo-300 bg-white text-6xl font-bold tabular-nums text-slate-800 shadow backface-hidden"
          aria-hidden="true"
        >
          {card.a} + {card.b}
        </div>
        <div
          class="absolute inset-0 flex rotate-y-180 flex-col items-center justify-center gap-2 rounded-3xl border-4 p-3 text-center backface-hidden {right
            ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
            : 'border-amber-500 bg-amber-50 text-amber-900'}"
          aria-hidden="true"
        >
          <span class="text-5xl font-bold tabular-nums"
            >{card.a} + {card.b} = {card.a + card.b}</span
          >
          <span class="text-lg">{cardReason(card)}</span>
        </div>
      </div>
    </div>

    <div role="group" aria-label="Chọn kết quả" class="flex flex-wrap justify-center gap-3">
      {#each card.options as v, i (v)}
        <button
          type="button"
          class="h-16 min-w-16 rounded-2xl border-4 px-3 text-3xl font-bold tabular-nums transition motion-reduce:transition-none {focusRing} {flipped &&
          i === card.answer
            ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
            : picked === i
              ? 'border-rose-400 bg-rose-50 text-rose-700 line-through'
              : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-disabled={flipped}
          onclick={() => pick(i)}>{v}</button
        >
      {/each}
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {!flipped
        ? 'bg-slate-100 text-slate-800'
        : right
          ? 'bg-emerald-100 text-emerald-900'
          : 'bg-amber-100 text-amber-900'}"
      aria-live="polite"
    >
      {#if !flipped}
        {card.a} + {card.b} bằng bao nhiêu?
      {:else if right}
        <span aria-hidden="true">⭐ </span>Đúng rồi! {card.a} + {card.b} = {card.a + card.b}.
      {:else}
        Chưa đúng. {card.a} + {card.b} = {card.a + card.b}. {cardReason(card)}
      {/if}
    </p>

    {#if flipped}
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        {index === deck.length - 1 ? 'Xem kết quả' : 'Thẻ tiếp theo'}
      </button>
    {/if}
  {:else if result}
    <div class="space-y-3 rounded-2xl bg-emerald-50 p-4" aria-live="polite">
      <p class="text-2xl font-bold text-emerald-900">
        Em đúng {result.right} / {result.total} thẻ trong {timeText(elapsed)}.
      </p>
      <p class="text-xl text-slate-800">{result.verdict}</p>
      {#if result.missed.length > 0}
        <ul class="flex flex-wrap gap-2">
          {#each result.missed as fact (fact)}
            <li
              class="rounded-xl bg-white px-3 py-2 text-xl font-semibold tabular-nums text-amber-900 ring-2 ring-amber-300"
            >
              {fact}
            </li>
          {/each}
        </ul>
      {/if}
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={again}>
        Chơi bộ thẻ khác
      </button>
    </div>
  {/if}

  <div class="space-y-2">
    <p class="text-lg font-semibold text-slate-700">
      Bảng cộng (qua 10): phép cộng em làm đúng tô xanh, phép cộng cần ôn tô cam. Khi đang chơi, kết
      quả được che đi.
    </p>
    <div class="flex flex-wrap gap-2">
      {#each columns as col (col[0].a)}
        <ul class="w-[5.5rem] space-y-1" aria-label="{col[0].a} cộng với một số">
          {#each col as f (`${f.a}+${f.b}`)}
            {@const mark = known[`${f.a}+${f.b}`]}
            {@const shown = !started || finished || mark !== undefined}
            <li
              class="rounded-md px-1.5 py-0.5 text-base tabular-nums {mark === 'right'
                ? 'bg-emerald-100 text-emerald-900'
                : mark === 'missed'
                  ? 'bg-amber-100 font-semibold text-amber-900'
                  : 'bg-slate-50 text-slate-700'}"
            >
              {f.a} + {f.b} = {shown ? f.a + f.b : '?'}<span class="sr-only"
                >{mark === 'right' ? ', đã làm đúng' : mark === 'missed' ? ', cần ôn' : ''}</span
              >
            </li>
          {/each}
        </ul>
      {/each}
    </div>
  </div>
</div>
