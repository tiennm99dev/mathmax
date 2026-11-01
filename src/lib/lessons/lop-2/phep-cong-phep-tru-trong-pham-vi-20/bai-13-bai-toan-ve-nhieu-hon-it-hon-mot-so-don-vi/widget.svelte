<script>
  import { tick } from 'svelte';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { rng } from '#lib/core/drill.js';
  import Picture from '#lib/core/kid/picture.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    PAIRS,
    compareResult,
    compareSolution,
    compareSummary,
    compareText,
    newCompareStory,
  } from '../_shared/compare-stories.js';
  import { MAX_LEN, clampLen, drawMessage, operationOptions, resultOptions } from './engine.js';

  // A fixed seed so the prerendered page and the browser agree.
  const rand = rng(13);

  /** SVG layout: names on the left, one part of a segment is U wide. */
  const W = 380;
  const H = 168;
  const LEFT = 64;
  const U = 15;
  const ROW = [34, 108];
  const BAR = 24;

  /** @type {import('../_shared/compare-stories.js').CompareStory} */
  let story = $state({ pair: 0, kind: 'nhieu', a: 6, k: 2 });
  let len = $state(6);
  /** Length while a drag is under way, or null. */
  let moving = $state(/** @type {number | null} */ (null));
  let moved = $state(false);
  /** @type {'draw' | 'op' | 'result' | 'done'} */
  let step = $state('draw');
  /** Options tried and wrong at the current step. */
  let wrong = $state(/** @type {number[]} */ ([]));
  let choice = $state(resultOptions(rng(13), { pair: 0, kind: 'nhieu', a: 6, k: 2 }));
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @type {HTMLElement | undefined} */
  let opsEl = $state();

  const pair = $derived(PAIRS[story.pair]);
  const text = $derived(compareText(story));
  const target = $derived(compareResult(story));
  const shown = $derived(moving ?? len);
  const ops = $derived(operationOptions(story));
  const sign = $derived(story.kind === 'nhieu' ? '+' : '−');
  const draw = $derived(drawMessage(story, shown, moved));

  const message = $derived.by(() => {
    if (step === 'draw') return draw.text;
    if (step === 'op') {
      if (wrong.length > 0)
        return story.kind === 'nhieu'
          ? 'Chưa đúng. Nhiều hơn thì em làm phép cộng.'
          : 'Chưa đúng. Ít hơn thì em làm phép trừ.';
      return `${story.kind === 'nhieu' ? 'Nhiều hơn' : 'Ít hơn'} thì em làm phép tính gì?`;
    }
    if (step === 'result')
      return wrong.length > 0
        ? `Chưa đúng. Em đếm số phần của đoạn ${pair.who[1]} nhé.`
        : `${story.a} ${sign} ${story.k} bằng bao nhiêu?`;
    return wrong.length > 1
      ? `Em xem nhé: ${story.a} ${sign} ${story.k} = ${target}.`
      : `Đúng rồi! ${story.a} ${sign} ${story.k} = ${target}.`;
  });

  const tone = $derived(
    step === 'draw' ? draw.tone : step === 'done' ? 'ok' : wrong.length > 0 ? 'warn' : 'info',
  );

  /** @param {number} next */
  async function setLen(next) {
    if (step !== 'draw') return;
    len = clampLen(next);
    moved = true;
    if (len === target) {
      step = 'op';
      await tick();
      opsEl?.querySelector('button')?.focus();
    }
  }

  const scratch = { x: 0, y: 0 };
  const drag = $derived({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => {
      moving = clampLen((scratch.x - LEFT) / U);
    },
    onEnd: () => {
      const v = moving;
      moving = null;
      if (v !== null) setLen(v);
    },
    /** @param {number} dx @param {number} dy */
    onKeyMove: (dx, dy) => setLen(len + (dx || -dy)),
  });

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
    len = story.a;
    moving = null;
    moved = false;
    step = 'draw';
    wrong = [];
  }

  function newTask() {
    story = newCompareStory(rand, story);
    choice = resultOptions(rand, story);
    restart();
  }

  /** x of the end of a segment `n` parts long. @param {number} n */
  const xAt = (n) => LEFT + n * U;

  const optionBtn = `h-16 min-w-16 rounded-2xl border-4 px-4 text-3xl font-bold tabular-nums transition motion-reduce:transition-none ${focusRing}`;
</script>

<div class="space-y-4">
  <div class="space-y-1 rounded-2xl bg-sky-50 p-4 text-xl text-slate-800">
    <p class="flex items-center gap-2">
      <Picture name={pair.picture} size={36} decorative />
      <span>{text.start} <strong>{text.change}</strong></span>
    </p>
    <p class="font-semibold">{text.question}</p>
  </div>

  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {H}"
    class="w-full max-w-xl touch-none select-none rounded-2xl bg-white ring-2 ring-slate-200"
    role="group"
    aria-label="Sơ đồ đoạn thẳng: đoạn của {pair.who[0]} dài {story.a} phần, đoạn của {pair
      .who[1]} dài {shown} phần."
  >
    {#each [0, 1] as r (r)}
      <text x="6" y={ROW[r] + 18} font-size="16" font-weight="700" fill="#334155"
        >{pair.who[r]}</text
      >
    {/each}

    <line
      x1={xAt(story.a)}
      y1={ROW[0] - 6}
      x2={xAt(story.a)}
      y2={ROW[1] + BAR + 6}
      stroke="#94a3b8"
      stroke-width="2"
      stroke-dasharray="4 4"
    />

    <!-- The first segment and its number. -->
    {#each { length: story.a } as _, i (i)}
      <rect
        x={xAt(i) + 1}
        y={ROW[0]}
        width={U - 2}
        height={BAR}
        rx="3"
        fill="#f43f5e"
        stroke="#be123c"
      />
    {/each}
    <text
      x={(LEFT + xAt(story.a)) / 2}
      y={ROW[0] - 8}
      font-size="16"
      font-weight="700"
      text-anchor="middle"
      fill="#be123c">{story.a} {pair.unit}</text
    >

    <!-- The second segment. -->
    {#each { length: shown } as _, i (i)}
      <rect
        x={xAt(i) + 1}
        y={ROW[1]}
        width={U - 2}
        height={BAR}
        rx="3"
        fill={i >= story.a ? '#34d399' : '#38bdf8'}
        stroke={i >= story.a ? '#047857' : '#0369a1'}
      />
    {/each}
    {#if shown < story.a}
      <rect
        x={xAt(shown) + 1}
        y={ROW[1]}
        width={(story.a - shown) * U - 2}
        height={BAR}
        rx="3"
        fill="none"
        stroke="#f59e0b"
        stroke-width="2"
        stroke-dasharray="4 3"
      />
    {/if}
    {#if shown !== story.a}
      {@const from = xAt(Math.min(shown, story.a))}
      {@const to = xAt(Math.max(shown, story.a))}
      <path
        d="M {from} {ROW[1] - 4} v -6 H {to} v 6"
        fill="none"
        stroke="#b45309"
        stroke-width="2"
      />
      <text
        x={(from + to) / 2}
        y={ROW[1] - 14}
        font-size="15"
        font-weight="700"
        text-anchor="middle"
        fill="#b45309">{Math.abs(shown - story.a)}</text
      >
    {/if}
    <text
      x={(LEFT + xAt(shown)) / 2}
      y={ROW[1] + BAR + 22}
      font-size="18"
      font-weight="700"
      text-anchor="middle"
      fill="#0369a1">{step === 'done' ? `${target} ${pair.unit}` : '?'}</text
    >

    {#if step === 'draw'}
      <g
        class="drag-handle cursor-grab"
        role="slider"
        tabindex="0"
        aria-label="Đầu đoạn của {pair
          .who[1]}. Kéo, hoặc dùng phím mũi tên trái, phải để kéo dài, rút ngắn."
        aria-valuemin="1"
        aria-valuemax={MAX_LEN}
        aria-valuenow={shown}
        aria-valuetext="{shown} phần"
        use:draggable={drag}
      >
        <circle
          class="drag-knob"
          cx={xAt(shown)}
          cy={ROW[1] + BAR / 2}
          r="11"
          fill="#ffffff"
          stroke="#4f46e5"
          stroke-width="4"
        />
      </g>
    {/if}
  </svg>

  {#if step === 'draw'}
    <div class="flex flex-wrap gap-3">
      <button
        type="button"
        class="min-h-12 text-lg {button.secondary}"
        disabled={len <= 1}
        onclick={() => setLen(len - 1)}>Rút ngắn 1 phần</button
      >
      <button
        type="button"
        class="min-h-12 text-lg {button.secondary}"
        disabled={len >= MAX_LEN}
        onclick={() => setLen(len + 1)}>Kéo dài 1 phần</button
      >
    </div>
  {:else}
    <div bind:this={opsEl} role="group" aria-label="Chọn phép tính" class="flex flex-wrap gap-3">
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
    class="rounded-2xl px-4 py-3 text-xl font-semibold {tone === 'ok'
      ? 'bg-emerald-100 text-emerald-900'
      : tone === 'warn'
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if step === 'done' && wrong.length < 2}<span class="mr-1" aria-hidden="true">⭐</span
      >{/if}{message}
  </p>

  {#if step === 'done'}
    <div class="grid gap-3 sm:grid-cols-2">
      <div class="rounded-2xl border-2 border-slate-200 bg-white p-4 text-lg">
        <p class="font-bold text-slate-700">Tóm tắt</p>
        {#each compareSummary(story) as line (line)}<p>{line}</p>{/each}
      </div>
      <div class="rounded-2xl border-2 border-emerald-300 bg-white p-4 text-lg">
        <p class="font-bold text-emerald-800">Bài giải</p>
        {#each compareSolution(story) as line (line)}<p>{line}</p>{/each}
      </div>
    </div>
  {/if}

  <div class="flex flex-wrap gap-3">
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newTask}>
      Bài toán khác
    </button>
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={restart}>Làm lại</button>
  </div>
</div>
