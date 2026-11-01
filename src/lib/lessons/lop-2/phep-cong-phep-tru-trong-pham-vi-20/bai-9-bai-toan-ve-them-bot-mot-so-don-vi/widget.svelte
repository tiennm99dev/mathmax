<script>
  import { rng } from '#lib/core/drill.js';
  import Picture from '#lib/core/kid/picture.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    THINGS,
    actMessage,
    newStory,
    operationOptions,
    result,
    resultOptions,
    solutionLines,
    storyText,
    summaryLines,
  } from './engine.js';

  // A fixed seed so the prerendered page and the browser agree.
  const rand = rng(9);

  /** @type {import('./engine.js').Story} */
  let story = $state({ thing: 1, kind: 'them', a: 9, b: 6 });
  /** Pictures added, or the indices crossed out. */
  let added = $state(0);
  /** @type {number[]} */
  let crossed = $state([]);
  /** @type {'act' | 'op' | 'result' | 'done'} */
  let step = $state('act');
  /** Options tried and wrong at the current step. */
  /** @type {number[]} */
  let wrong = $state([]);
  let choice = $state(resultOptions(rng(9), { thing: 1, kind: 'them', a: 9, b: 6 }));

  const thing = $derived(THINGS[story.thing]);
  const text = $derived(storyText(story));
  const acted = $derived(story.kind === 'them' ? added : crossed.length);
  const ops = $derived(operationOptions(story));
  const sign = $derived(story.kind === 'them' ? '+' : '−');

  const message = $derived.by(() => {
    if (step === 'act') return actMessage(story, acted);
    if (step === 'op') {
      return wrong.length > 0
        ? story.kind === 'them'
          ? 'Chưa đúng. Thêm vào thì số lượng nhiều lên: em làm phép cộng.'
          : 'Chưa đúng. Bớt đi thì số lượng ít đi: em làm phép trừ.'
        : story.kind === 'them'
          ? 'Thêm vào thì em làm phép tính gì?'
          : 'Bớt đi thì em làm phép tính gì?';
    }
    if (step === 'result') {
      return wrong.length > 0
        ? `Chưa đúng. Em đếm ${story.kind === 'them' ? 'tất cả' : 'những'} ${thing.name} ${story.kind === 'them' ? 'trong hình' : 'chưa bị gạch'} nhé.`
        : `${story.a} ${sign} ${story.b} bằng bao nhiêu?`;
    }
    return wrong.length > 1
      ? `Em xem nhé: ${story.a} ${sign} ${story.b} = ${result(story)}.`
      : `Đúng rồi! ${story.a} ${sign} ${story.b} = ${result(story)}.`;
  });

  function addOne() {
    if (story.kind !== 'them' || added >= story.b) return;
    added += 1;
    if (added === story.b) step = 'op';
  }

  /** @param {number} i */
  function cross(i) {
    if (story.kind !== 'bot' || crossed.includes(i) || crossed.length >= story.b) return;
    crossed = [...crossed, i];
    if (crossed.length === story.b) step = 'op';
  }

  /** @param {number} i */
  function pickOp(i) {
    if (step !== 'op' || wrong.includes(i)) return;
    if (i === ops.answer) {
      step = 'result';
      wrong = [];
    } else wrong = [...wrong, i];
  }

  /** @param {number} i */
  function pickResult(i) {
    if (step !== 'result' || wrong.includes(i)) return;
    if (i === choice.answer) step = 'done';
    else {
      wrong = [...wrong, i];
      if (wrong.length > 1) step = 'done';
    }
  }

  function restart() {
    added = 0;
    crossed = [];
    step = 'act';
    wrong = [];
  }

  function newTask() {
    story = newStory(rand, story);
    choice = resultOptions(rand, story);
    restart();
  }

  const optionBtn = `h-16 min-w-16 rounded-2xl border-4 px-4 text-3xl font-bold tabular-nums transition motion-reduce:transition-none ${focusRing}`;
</script>

<div class="space-y-4">
  <div class="space-y-1 rounded-2xl bg-sky-50 p-4 text-xl text-slate-800">
    <p>{text.start} <strong>{text.change}</strong></p>
    <p class="font-semibold">{text.question}</p>
  </div>

  <div
    class="flex max-w-[18rem] flex-wrap gap-1 rounded-2xl bg-amber-50 p-2 sm:max-w-[33rem]"
    role="group"
    aria-label="Hình: {story.kind === 'them'
      ? `${story.a + added} ${thing.name}, có ${added} ${thing.name} mới thêm`
      : `${story.a} ${thing.name}, đã gạch ${crossed.length} ${thing.name}`}"
  >
    {#each { length: story.a } as _, i (i)}
      {#if story.kind === 'bot' && !crossed.includes(i) && crossed.length < story.b}
        <button
          type="button"
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-white ring-2 ring-amber-300 hover:bg-amber-100 {focusRing}"
          aria-label="Gạch bớt {thing.name} thứ {i + 1}"
          onclick={() => cross(i)}
        >
          <Picture name={thing.picture} size={40} decorative />
        </button>
      {:else}
        <span
          class="relative flex h-12 w-12 items-center justify-center rounded-xl {crossed.includes(i)
            ? 'bg-slate-200 opacity-60'
            : 'bg-white'}"
          aria-hidden="true"
        >
          <Picture name={thing.picture} size={40} decorative />
          {#if crossed.includes(i)}
            <span
              class="absolute inset-0 flex items-center justify-center text-4xl font-bold text-rose-600"
              >✕</span
            >
          {/if}
        </span>
      {/if}
    {/each}
    {#each { length: added } as _, i (i)}
      <span
        class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 ring-2 ring-emerald-500"
        aria-hidden="true"
      >
        <Picture name={thing.picture} size={40} decorative />
      </span>
    {/each}
  </div>

  {#if story.kind === 'them'}
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      disabled={added >= story.b}
      onclick={addOne}>Thêm 1 {thing.name}</button
    >
  {/if}

  {#if step !== 'act'}
    <div role="group" aria-label="Chọn phép tính" class="flex flex-wrap gap-3">
      {#each ops.options as op, i (op)}
        <button
          type="button"
          class="{optionBtn} {step !== 'op' && i === ops.answer
            ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
            : step === 'op' && wrong.includes(i)
              ? 'border-rose-400 bg-rose-50 text-rose-700 line-through'
              : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-disabled={step !== 'op' || wrong.includes(i)}
          onclick={() => pickOp(i)}>{op}</button
        >
      {/each}
    </div>
  {/if}

  {#if step === 'result' || step === 'done'}
    <div role="group" aria-label="Chọn kết quả" class="flex flex-wrap gap-3">
      {#each choice.options as v, i (v)}
        <button
          type="button"
          class="{optionBtn} {step === 'done' && i === choice.answer
            ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
            : wrong.includes(i)
              ? 'border-rose-400 bg-rose-50 text-rose-700 line-through'
              : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-disabled={step === 'done' || wrong.includes(i)}
          onclick={() => pickResult(i)}>{v}</button
        >
      {/each}
    </div>
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {step === 'done'
      ? 'bg-emerald-100 text-emerald-900'
      : wrong.length > 0
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if step === 'done' && wrong.length < 2}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  {#if step === 'done'}
    <div class="grid gap-3 sm:grid-cols-2">
      <div class="rounded-2xl border-2 border-slate-200 bg-white p-4 text-lg">
        <p class="font-bold text-slate-700">Tóm tắt</p>
        {#each summaryLines(story) as line (line)}<p>{line}</p>{/each}
      </div>
      <div class="rounded-2xl border-2 border-emerald-300 bg-white p-4 text-lg">
        <p class="font-bold text-emerald-800">Bài giải</p>
        {#each solutionLines(story) as line (line)}<p>{line}</p>{/each}
      </div>
    </div>
  {/if}

  <div class="flex flex-wrap gap-3">
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newTask}>
      Câu chuyện khác
    </button>
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={restart}>Làm lại</button>
  </div>
</div>
