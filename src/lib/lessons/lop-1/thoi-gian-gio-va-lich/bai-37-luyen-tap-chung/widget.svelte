<script>
  import { tick } from 'svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import CalendarSheet from '../_shared/calendar-sheet.svelte';
  import ClockPicture from '../_shared/clock-picture.svelte';
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
  /** @type {HTMLDivElement | undefined} */
  let summary = $state();

  const round = $derived(buildRound(seed));
  const finished = $derived(index >= round.length);
  const q = $derived(finished ? null : round[index]);
  const score = $derived(firstTry.filter((r) => r === true).length);
  const weak = $derived(weakKinds(round, firstTry));
  const settled = $derived(phase === 'right' || phase === 'shown');

  /** @param {number} option */
  function choose(option) {
    if (!q || settled || wrong.includes(option)) return;
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
    (heading ?? summary)?.focus();
  }

  async function again() {
    seed += 1;
    index = 0;
    firstTry = [];
    wrong = [];
    phase = 'ask';
    await tick();
    heading?.focus();
  }

  /** @param {number} i */
  function optionClass(i) {
    if (!q) return '';
    const base = `min-h-14 min-w-16 rounded-2xl border-4 px-4 text-xl font-bold transition ${focusRing}`;
    if (settled && i === q.answer) return `${base} border-emerald-600 bg-emerald-600 text-white`;
    if (wrong.includes(i)) return `${base} border-rose-400 bg-rose-50 text-rose-700 line-through`;
    return `${base} border-slate-300 bg-white text-slate-800 hover:border-indigo-400`;
  }
</script>

<div class="space-y-5">
  <div class="flex flex-wrap items-center justify-between gap-3">
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

    {#if q.scene}
      <div class="flex justify-center">
        {#if q.scene.type === 'clock'}
          <ClockPicture hour={q.scene.hour} size="w-48 max-w-full" />
        {:else}
          <CalendarSheet month={q.scene.month} date={q.scene.date} weekday={q.scene.weekday} />
        {/if}
      </div>
    {/if}

    <div role="group" aria-label="Chọn đáp án" class="flex flex-wrap gap-3">
      {#each q.options as option, i (i)}
        <button
          type="button"
          class={optionClass(i)}
          aria-disabled={wrong.includes(i) || settled}
          onclick={() => choose(i)}>{option}</button
        >
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

    {#if settled}
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        {index + 1 < round.length ? 'Câu tiếp' : 'Xem kết quả'}
      </button>
    {/if}
  {:else}
    <div
      bind:this={summary}
      tabindex="-1"
      class="rounded-2xl bg-emerald-50 px-4 py-4 text-xl text-emerald-950 outline-none"
      aria-live="polite"
    >
      <p class="font-bold">
        <span aria-hidden="true">⭐ </span>Em làm đúng ngay {score} / {round.length} câu.
      </p>
      {#if weak.length > 0}
        <p class="mt-2 text-lg">Em ôn lại: {weak.join(', ')}.</p>
      {:else}
        <p class="mt-2 text-lg">
          Tuyệt vời! Em đã biết xem giờ đúng, xem lịch và các ngày trong tuần.
        </p>
      {/if}
    </div>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={again}>
      Làm bộ bài khác
    </button>
  {/if}
</div>
