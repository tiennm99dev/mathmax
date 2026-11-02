<script>
  import { tick } from 'svelte';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { estimateStars } from '#lib/core/kid/length.js';
  import { capitalize } from '#lib/core/kid/quiz.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    ROUNDS,
    TAPES,
    UNIT_WORDS,
    gameSummary,
    guessPrompt,
    makeGame,
    resultMessage,
    startGuess,
    tapeFeedback,
  } from './engine.js';

  // The first game is fixed so the prerendered page and the browser agree.
  let seed = $state(1);
  let index = $state(0);
  let guess = $state(startGuess(makeGame(1)[0]));
  /** `guess`: set a guess. `measure`: pull the tape. `done`: the tape reached the end. */
  let phase = $state(/** @type {'guess' | 'measure' | 'done'} */ ('guess'));
  let pulled = $state(1);
  /** @type {number[]} */
  let stars = $state([]);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @type {SVGGElement | undefined} */
  let handleEl = $state();
  /** @type {HTMLElement | undefined} */
  let nextEl = $state();

  const game = $derived(makeGame(seed));
  const finished = $derived(index >= ROUNDS);
  const item = $derived(game[Math.min(index, ROUNDS - 1)]);
  const tape = $derived(TAPES[item.unit]);
  const total = $derived(stars.reduce((a, b) => a + b, 0));
  const message = $derived(
    finished
      ? gameSummary(stars)
      : phase === 'guess'
        ? guessPrompt(item)
        : phase === 'measure'
          ? tapeFeedback(item, pulled)
          : resultMessage(item, guess),
  );

  const W = 360;
  const H = 140;
  const X0 = 34;
  const point = { x: 0, y: 0 };
  const endX = $derived(X0 + pulled * tape.step);
  const itemEnd = $derived(X0 + item.amount * tape.step);
  // Small marks: every dm on a tape in metres, none between numbers on a tape in dm.
  const smallMarks = $derived(item.unit === 'm' ? pulled * 10 : 0);

  /** @param {number} delta */
  function bump(delta) {
    guess = Math.max(1, Math.min(tape.max, guess + delta));
  }

  async function startMeasure() {
    pulled = 1;
    phase = 'measure';
    await tick();
    handleEl?.focus();
  }

  /** @param {number} v */
  function setPulled(v) {
    if (phase !== 'measure') return;
    pulled = Math.max(1, Math.min(tape.max, Math.round(v)));
  }

  async function settle() {
    if (phase !== 'measure' || pulled !== item.amount) return;
    stars = [...stars, estimateStars(guess, item.amount)];
    phase = 'done';
    await tick();
    nextEl?.focus();
  }

  const drag = $derived({
    point,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => setPulled((point.x - X0) / tape.step),
    onEnd: settle,
    /**
     * @param {number} dx
     * @param {number} dy
     */
    onKeyMove: (dx, dy) => {
      setPulled(pulled + (dx || -dy));
      settle();
    },
  });

  function next() {
    index += 1;
    phase = 'guess';
    pulled = 1;
    if (index < ROUNDS) guess = startGuess(game[index]);
  }

  function again() {
    seed += 1;
    index = 0;
    stars = [];
    phase = 'guess';
    pulled = 1;
    guess = startGuess(game[0]);
  }

  const stepButton = `h-14 w-14 rounded-2xl border-4 border-indigo-300 bg-white text-3xl font-bold text-indigo-700 hover:bg-indigo-50 disabled:opacity-40 ${focusRing}`;
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
    <div class="rounded-2xl bg-sky-50 p-2">
      <svg
        bind:this={svgEl}
        viewBox="0 0 {W} {H}"
        class="w-full touch-none select-none"
        role="group"
        aria-label="{capitalize(item.name)} vẽ thành một thanh màu. {phase === 'guess'
          ? `Đoạn mẫu dài 1 ${UNIT_WORDS[item.unit]}.`
          : 'Thước dây nằm dưới thanh màu.'}"
      >
        <text x={X0} y="17" font-size="17" font-weight="700" fill="#1e293b"
          >{capitalize(item.name)}</text
        >
        <rect
          x={X0}
          y="23"
          width={item.amount * tape.step}
          height="22"
          rx="4"
          fill={item.color}
          stroke="#334155"
        />

        {#if phase === 'guess'}
          <rect
            x={X0}
            y="66"
            width={tape.step}
            height="14"
            fill="#c7d2fe"
            stroke="#4338ca"
            stroke-width="1.5"
          />
          <text x={X0 + tape.step + 8} y="79" font-size="17" font-weight="600" fill="#3730a3"
            >Đoạn mẫu 1 {item.unit}</text
          >
        {:else}
          <line
            x1={itemEnd}
            y1="45"
            x2={itemEnd}
            y2="66"
            stroke={pulled === item.amount ? '#059669' : '#94a3b8'}
            stroke-width="2"
            stroke-dasharray="4 3"
          />
          <rect x="4" y="60" width={X0 - 16} height="48" rx="6" fill="#475569" />
          <rect
            x={X0 - 12}
            y="66"
            width={pulled * tape.step + 12}
            height="36"
            fill="#fde68a"
            stroke="#b45309"
          />
          {#each { length: smallMarks + 1 } as _, k (k)}
            <line
              x1={X0 + (k * tape.step) / 10}
              y1="66"
              x2={X0 + (k * tape.step) / 10}
              y2="72"
              stroke="#78350f"
              stroke-width="1"
            />
          {/each}
          {#each { length: pulled + 1 } as _, n (n)}
            <line
              x1={X0 + n * tape.step}
              y1="66"
              x2={X0 + n * tape.step}
              y2="78"
              stroke="#451a03"
              stroke-width="1.8"
            />
            <text
              x={X0 + n * tape.step}
              y="95"
              text-anchor="middle"
              font-size="16"
              font-weight="600"
              fill="#451a03">{n}</text
            >
          {/each}
          <g
            bind:this={handleEl}
            class="drag-handle {phase === 'measure' ? 'cursor-grab' : ''}"
            role="slider"
            tabindex={phase === 'measure' ? 0 : -1}
            aria-label="Đầu thước dây. Kéo, hoặc dùng phím mũi tên để kéo dài hay thu lại."
            aria-valuemin={1}
            aria-valuemax={tape.max}
            aria-valuenow={pulled}
            aria-valuetext="{pulled} {UNIT_WORDS[item.unit]}"
            use:draggable={drag}
          >
            <line x1={endX} y1="102" x2={endX} y2="112" stroke="#4f46e5" stroke-width="3" />
            <circle
              class="drag-knob"
              cx={endX}
              cy="122"
              r="12"
              fill="#4f46e5"
              stroke="#fff"
              stroke-width="2.5"
            />
          </g>
        {/if}
      </svg>
    </div>

    {#if phase === 'guess'}
      <div class="flex items-center gap-4" role="group" aria-label="Em đoán">
        <button
          type="button"
          class={stepButton}
          aria-label="Bớt 1 {UNIT_WORDS[item.unit]}"
          disabled={guess <= 1}
          onclick={() => bump(-1)}>−</button
        >
        <p
          class="min-w-24 text-center text-4xl font-bold text-slate-900 tabular-nums"
          aria-live="polite"
        >
          {guess} <span class="text-2xl">{item.unit}</span>
        </p>
        <button
          type="button"
          class={stepButton}
          aria-label="Thêm 1 {UNIT_WORDS[item.unit]}"
          disabled={guess >= tape.max}
          onclick={() => bump(1)}>+</button
        >
      </div>
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={startMeasure}
        >Đo thử</button
      >
    {:else}
      <p class="text-lg text-slate-700">Em đoán: <strong>{guess} {item.unit}</strong></p>
    {/if}
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {phase === 'done' || finished
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {message}
  </p>

  {#if finished}
    <button type="button" class="min-h-12 text-lg {button.primary}" onclick={again}>Chơi lại</button
    >
  {:else if phase === 'done'}
    <button
      type="button"
      bind:this={nextEl}
      class="min-h-12 text-lg {button.primary}"
      onclick={next}>{index + 1 < ROUNDS ? 'Đồ vật tiếp' : 'Xem kết quả'}</button
    >
  {/if}
</div>
