<script>
  import { tick } from 'svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import PositionScene from '../_shared/position-scene.svelte';
  import { SCENES } from '../_shared/positions.js';
  import SolidView from '../_shared/solid-view.svelte';
  import { KIND_LABELS, buildRound, weakKinds } from './engine.js';

  // The first round is fixed so the prerendered page and the browser agree.
  let seed = $state(1);
  let index = $state(0);
  /** @type {Array<boolean | null>} */
  let firstTry = $state([]);
  /** Options already tried and wrong for the current question. */
  /** @type {number[]} */
  let wrong = $state([]);
  /** `ask`: waiting; `retry`: one miss, hint shown; `right` / `shown`: done. */
  let phase = $state(/** @type {'ask' | 'retry' | 'right' | 'shown'} */ ('ask'));
  let view = $state({ yaw: -30, pitch: 22 });
  /** @type {HTMLHeadingElement | undefined} */
  let heading = $state();

  const round = $derived(buildRound(seed));
  const finished = $derived(index >= round.length);
  const q = $derived(finished ? null : round[index]);
  const score = $derived(firstTry.filter((r) => r === true).length);
  const weak = $derived(weakKinds(round, firstTry));
  const done = $derived(phase === 'right' || phase === 'shown');

  /** @param {number} option */
  function choose(option) {
    if (!q || done || wrong.includes(option)) return;
    if (option === q.answer) {
      if (phase === 'ask') firstTry[index] = true;
      phase = 'right';
      return;
    }
    wrong = [...wrong, option];
    if (phase === 'ask') {
      firstTry[index] = false;
      phase = 'retry';
    } else {
      phase = 'shown';
    }
  }

  async function next() {
    index += 1;
    wrong = [];
    phase = 'ask';
    view = { yaw: -30, pitch: 22 };
    await tick();
    heading?.focus();
  }

  function again() {
    seed += 1;
    index = 0;
    firstTry = [];
    wrong = [];
    phase = 'ask';
    view = { yaw: -30, pitch: 22 };
  }

  /** @param {number} i */
  function optionClass(i) {
    if (!q) return '';
    const base = `min-h-16 min-w-16 rounded-2xl border-4 px-4 text-xl font-bold transition ${focusRing}`;
    if (done && i === q.answer) return `${base} border-emerald-600 bg-emerald-100 text-emerald-900`;
    if (wrong.includes(i)) return `${base} border-rose-400 bg-rose-50 text-rose-700 opacity-60`;
    return `${base} border-slate-300 bg-white text-slate-800 hover:border-indigo-400`;
  }
</script>

<div class="space-y-5">
  <div class="flex items-center justify-between gap-3">
    <p class="text-base font-semibold text-slate-600">
      {#if finished}Xong bộ bài{:else}Câu {index + 1} / {round.length} · {q
          ? KIND_LABELS[q.kind]
          : ''}{/if}
    </p>
    <ol class="flex gap-1" aria-label="Kết quả từng câu">
      {#each round as _, i (i)}
        <li
          class="h-3 w-3 rounded-full {firstTry[i] === true
            ? 'bg-emerald-500'
            : firstTry[i] === false
              ? 'bg-amber-400'
              : i === index
                ? 'bg-indigo-500'
                : 'bg-slate-200'}"
          aria-label="Câu {i + 1}: {firstTry[i] === true
            ? 'đúng ngay'
            : firstTry[i] === false
              ? 'cần thử lại'
              : 'chưa làm'}"
        ></li>
      {/each}
    </ol>
  </div>

  {#if q}
    <h3 bind:this={heading} tabindex="-1" class="text-2xl font-bold text-slate-900 outline-none">
      {q.prompt}
    </h3>

    {#if q.boxes}
      <div class="mx-auto max-w-xs">
        {#key index}
          <SolidView boxes={q.boxes} bind:view width={220} height={180} label={q.boxLabel ?? ''} />
        {/key}
        {#if q.kind !== 'dem'}
          <p class="mt-1 text-center text-sm text-slate-500">Kéo để xoay khối.</p>
        {/if}
      </div>
    {:else if q.scene}
      <div class="rounded-2xl border-2 border-slate-200 bg-white p-1">
        <PositionScene scene={SCENES[q.scene]} at={q.place} tone={done ? 'ok' : 'none'} />
      </div>
    {/if}

    <div
      role="group"
      aria-label="Chọn đáp án"
      class={q.scene ? 'grid gap-3' : 'flex flex-wrap gap-3'}
    >
      {#each q.options as option, i (i)}
        <button
          type="button"
          class="{optionClass(i)} {q.scene ? 'text-left text-lg' : ''}"
          aria-disabled={wrong.includes(i) || done}
          onclick={() => choose(i)}
        >
          {option}
        </button>
      {/each}
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {phase === 'right'
        ? 'bg-emerald-100 text-emerald-900'
        : phase === 'ask'
          ? 'bg-slate-100 text-slate-800'
          : 'bg-amber-100 text-amber-900'}"
      aria-live="polite"
    >
      {#if phase === 'ask'}
        Em chạm vào đáp án đúng.
      {:else if phase === 'retry'}
        Chưa đúng. Gợi ý: {q.hint} Em thử lại nhé.
      {:else if phase === 'right'}
        <span aria-hidden="true">⭐ </span>Đúng rồi! {q.solution}
      {:else}
        Đáp án: {q.solution}
      {/if}
    </p>

    {#if done}
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        {index + 1 < round.length ? 'Câu tiếp' : 'Xem kết quả'}
      </button>
    {/if}
  {:else}
    <div class="rounded-2xl bg-emerald-50 px-4 py-4 text-xl text-emerald-950" aria-live="polite">
      <p class="font-bold">
        <span aria-hidden="true">⭐ </span>Em làm đúng ngay {score} / {round.length} câu.
      </p>
      {#if weak.length > 0}
        <p class="mt-2 text-lg">Em ôn lại: {weak.join(', ')}.</p>
      {:else}
        <p class="mt-2 text-lg">Tuyệt vời! Em đã nhận biết tốt các khối và vị trí.</p>
      {/if}
    </div>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={again}>
      Làm bộ bài khác
    </button>
  {/if}
</div>
