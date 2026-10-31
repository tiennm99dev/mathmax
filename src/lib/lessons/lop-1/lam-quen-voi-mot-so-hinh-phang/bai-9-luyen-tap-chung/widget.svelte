<script>
  import { tick } from 'svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import ObjectFigure from '../_shared/object-figure.svelte';
  import ShapeFigure from '../_shared/shape-figure.svelte';
  import { SHAPE_NAMES } from '../_shared/shapes.js';
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
    await tick();
    heading?.focus();
  }

  function again() {
    seed += 1;
    index = 0;
    firstTry = [];
    wrong = [];
    phase = 'ask';
  }

  /** @param {number} i @param {boolean} picture */
  function optionClass(i, picture) {
    if (!q) return '';
    const shape = picture
      ? 'flex h-24 w-24 items-center justify-center p-1'
      : 'min-h-16 min-w-16 px-4 text-2xl';
    const base = `${shape} rounded-2xl border-4 font-bold transition ${focusRing}`;
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

    {#if q.figure}
      <div class="flex justify-center rounded-2xl bg-amber-50 p-3">
        <ShapeFigure figure={q.figure} size={140} decorative />
      </div>
    {:else if q.object}
      <div class="flex justify-center rounded-2xl bg-amber-50 p-3">
        <ObjectFigure id={q.object} size={140} />
      </div>
    {:else if q.scene}
      <div
        class="flex max-w-md flex-wrap gap-2 rounded-2xl bg-amber-50 p-3"
        role="img"
        aria-label="Bức tranh có nhiều hình: {q.scene.map((f) => SHAPE_NAMES[f.kind]).join(', ')}"
      >
        {#each q.scene as figure, i (i)}
          <ShapeFigure {figure} size={56} decorative />
        {/each}
      </div>
    {:else if q.sticks}
      <div class="flex justify-center rounded-2xl bg-amber-50 p-3">
        <svg
          viewBox="0 0 200 140"
          class="w-full max-w-xs"
          role="img"
          aria-label="Hình xếp bằng {q.sticks.length} que tính"
        >
          {#each q.sticks as s, i (i)}
            {@const len = Math.hypot(s.x2 - s.x1, s.y2 - s.y1)}
            {@const ux = (s.x2 - s.x1) / len}
            {@const uy = (s.y2 - s.y1) / len}
            <line
              x1={s.x1 + ux * 5}
              y1={s.y1 + uy * 5}
              x2={s.x2 - ux * 5}
              y2={s.y2 - uy * 5}
              stroke="#d97706"
              stroke-width="7"
              stroke-linecap="round"
            />
            <circle cx={s.x2 - ux * 8} cy={s.y2 - uy * 8} r="4.5" fill="#dc2626" />
          {/each}
        </svg>
      </div>
    {/if}

    <div role="group" aria-label="Chọn đáp án" class="flex flex-wrap gap-3">
      {#each q.options as option, i (i)}
        <button
          type="button"
          class={optionClass(i, Boolean(option.figure))}
          aria-label={option.label}
          aria-disabled={wrong.includes(i) || done}
          onclick={() => choose(i)}
        >
          {#if option.figure}
            <ShapeFigure figure={option.figure} size={80} decorative />
          {:else}
            {option.label}
          {/if}
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
        <p class="mt-2 text-lg">Tuyệt vời! Em đã nhận biết tốt các hình phẳng.</p>
      {/if}
    </div>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={again}>
      Làm bộ bài khác
    </button>
  {/if}
</div>
