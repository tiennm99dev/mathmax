<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { passFocus } from '../_shared/pass-focus.js';
  import SceneFigure from '../_shared/scene-figure.svelte';
  import { cornerPath, nameAway } from '../_shared/scene.js';
  import {
    ANGLES,
    HEIGHT,
    KIND_LABELS,
    START,
    WIDTH,
    angleEnds,
    angleName,
    buildRound,
    checkMessage,
    isOnVertex,
    setSquare,
  } from './engine.js';

  let mode = $state(/** @type {'ee' | 'quiz'} */ ('ee'));
  let index = $state(0);
  const handle = $state({ ...START });
  /** What the child answered for each angle. */
  let answers = $state(/** @type {(boolean | null)[]} */ (ANGLES.map(() => null)));
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const card = $derived(ANGLES[index]);
  const ends = $derived(angleEnds(card));
  const on = $derived(isOnVertex(card, handle));
  const square = $derived(setSquare(card, handle));
  const said = $derived(answers[index]);
  const isRight = $derived(card.deg === 90);
  const answered = $derived(said !== null);
  const correct = $derived(answered && said === isRight);
  const message = $derived(checkMessage(card, on, said));
  const done = $derived(answers.filter((a) => a !== null).length);
  const score = $derived(answers.filter((a, i) => a === (ANGLES[i].deg === 90)).length);

  /** @param {number} next */
  function goTo(next) {
    index = next;
    handle.x = START.x;
    handle.y = START.y;
    passFocus(nextButton, svgEl?.querySelector('.drag-handle') ?? null);
  }

  /**
   * @param {boolean} right
   * @param {HTMLElement} pressed
   */
  function answer(right, pressed) {
    if (answers[index] !== null) return;
    answers[index] = right;
    passFocus(/** @type {HTMLButtonElement} */ (pressed), nextButton);
  }

  function again() {
    answers = ANGLES.map(() => null);
    goTo(0);
  }

  const drag = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: WIDTH, h: HEIGHT },
    keyStep: 20,
    keyShiftStep: 60,
    onEnd: () => {
      if (on) {
        handle.x = card.at.x;
        handle.y = card.at.y;
      }
    },
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'ee', label: 'Đặt ê ke' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'ee'}
    <p class="text-lg font-semibold text-slate-700">
      Góc {index + 1} / {ANGLES.length}: {angleName(card)}
    </p>

    <GeometryBoard
      width={WIDTH}
      height={HEIGHT}
      interactive
      bind:svgEl
      maxWidth="max-w-md"
      label="{angleName(card)}. Có một chiếc ê ke kéo được."
    >
      <line
        x1={card.at.x}
        y1={card.at.y}
        x2={ends.p.x}
        y2={ends.p.y}
        stroke="#1e293b"
        stroke-width="4"
      />
      <line
        x1={card.at.x}
        y1={card.at.y}
        x2={ends.q.x}
        y2={ends.q.y}
        stroke="#1e293b"
        stroke-width="4"
      />
      <circle cx={card.at.x} cy={card.at.y} r="6" fill="#1e293b" />
      <text x={card.at.x - 20} y={card.at.y + 24} font-size="20" font-weight="700"
        >{card.vertex}</text
      >
      <text
        x={nameAway(ends.p, card.at).x}
        y={nameAway(ends.p, card.at).y}
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="20"
        font-weight="700">{card.p}</text
      >
      <text
        x={nameAway(ends.q, card.at).x}
        y={nameAway(ends.q, card.at).y}
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="20"
        font-weight="700">{card.q}</text
      >

      <g aria-hidden="true">
        <polygon
          points={pointsAttr([square.corner, square.long, square.short])}
          fill="#fbbf24"
          fill-opacity="0.45"
          stroke="#b45309"
          stroke-width="3"
          stroke-linejoin="round"
        />
        <path
          d={cornerPath(square.corner, square.long, square.short, 16)}
          fill="none"
          stroke="#b45309"
          stroke-width="3"
        />
      </g>

      {#if answered && isRight}
        <path
          d={cornerPath(card.at, ends.p, ends.q, 22)}
          fill="none"
          stroke="#059669"
          stroke-width="4"
        />
      {/if}

      <DragPoint
        {drag}
        label="Góc vuông của ê ke. Kéo hoặc bấm phím mũi tên để đặt vào đỉnh {card.vertex}"
        color="#b45309"
        r={10}
      />
    </GeometryBoard>

    <div class="flex flex-wrap justify-center gap-3" role="group" aria-label="Em thấy góc này là">
      <button
        type="button"
        class="min-h-12 text-lg {button.secondary}"
        disabled={!on || answered}
        onclick={(e) => answer(true, e.currentTarget)}>Góc vuông</button
      >
      <button
        type="button"
        class="min-h-12 text-lg {button.secondary}"
        disabled={!on || answered}
        onclick={(e) => answer(false, e.currentTarget)}>Góc không vuông</button
      >
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {!answered
        ? 'bg-slate-100 text-slate-800'
        : correct
          ? 'bg-emerald-100 text-emerald-900'
          : 'bg-amber-100 text-amber-900'}"
      aria-live="polite"
    >
      {#if correct}<span aria-hidden="true">⭐ </span>{/if}{message}
    </p>

    <div class="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        disabled={!answered}
        bind:this={nextButton}
        onclick={() => (index + 1 < ANGLES.length ? goTo(index + 1) : again())}
      >
        {index + 1 < ANGLES.length ? 'Góc tiếp theo' : 'Kiểm tra lại từ đầu'}
      </button>
    </div>

    {#if done === ANGLES.length}
      <p class="text-center text-lg font-semibold text-slate-700">
        Em làm đúng {score} / {ANGLES.length} góc.
      </p>
    {/if}
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em đã biết đỉnh, cạnh của góc và nhận ra góc vuông."
    >
      {#snippet visual(q, settled)}
        {#if q.visual}
          <SceneFigure scene={q.visual} {settled} />
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
