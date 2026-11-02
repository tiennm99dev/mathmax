<script>
  import { onDestroy } from 'svelte';
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { passFocus } from '../_shared/pass-focus.js';
  import SceneFigure from '../_shared/scene-figure.svelte';
  import { nameAway, pointAt } from '../_shared/scene.js';
  import {
    CENTRE,
    CM,
    KIND_LABELS,
    MAX_EXTRA,
    MAX_RADIUS,
    MIN_RADIUS,
    SIZE,
    TURN_SECONDS,
    TURN_STEP,
    buildRound,
    compassMessage,
    drawnArc,
    hingeOf,
    readRim,
    rimPoint,
  } from './engine.js';

  let mode = $state(/** @type {'compa' | 'quiz'} */ ('compa'));
  const tip = $state(rimPoint(3, 330));
  let sweep = $state(0);
  let extra = $state(0);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @type {(() => void) | null} */
  let stopTurn = null;
  /** @type {HTMLButtonElement | undefined} */
  let mainButton = $state();
  /** @type {HTMLButtonElement | undefined} */
  let extraButton = $state();

  const rim = $derived(readRim(tip));
  const radius = $derived(rim.radius);
  const deg = $derived(rim.deg);
  const r = $derived(radius * CM);
  const drawn = $derived(sweep >= 360);
  const turning = $derived(sweep > 0 && sweep < 360);
  const opposite = $derived(pointAt(CENTRE, r, deg + 180));
  const pencil = $derived(pointAt(CENTRE, r, deg + sweep));
  const hinge = $derived(hingeOf(pencil));
  const others = $derived(
    Array.from({ length: extra }, (_, i) => pointAt(CENTRE, r, deg + 30 + i * 60)),
  );
  const message = $derived(compassMessage(radius, drawn, extra));

  function stopAnimation() {
    stopTurn?.();
    stopTurn = null;
  }

  function turn() {
    stopAnimation();
    if (reducedMotion()) {
      sweep = 360;
      return;
    }
    sweep = 0.01;
    stopTurn = frameLoop((dt) => {
      const next = sweep + (dt / TURN_SECONDS) * 360;
      sweep = Math.min(360, next);
      if (next >= 360) stopAnimation();
    });
  }

  function restart() {
    stopAnimation();
    sweep = 0;
    extra = 0;
  }

  onDestroy(stopAnimation);

  const drag = $derived({
    point: tip,
    svg: () => svgEl ?? null,
    viewBox: { w: SIZE, h: SIZE },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      const next = readRim(p);
      return rimPoint(next.radius, next.deg);
    },
    /**
     * Left and right open or close the compass, up and down turn it.
     * @param {number} dx
     * @param {number} dy
     */
    onKeyMove: (dx, dy) => {
      const nextRadius = Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, radius + dx));
      const at = rimPoint(nextRadius, deg + dy * TURN_STEP);
      tip.x = at.x;
      tip.y = at.y;
    },
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'compa', label: 'Vẽ bằng compa' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'compa'}
    <GeometryBoard
      width={SIZE}
      height={SIZE}
      interactive
      bind:svgEl
      maxWidth="max-w-md"
      label="Bảng vẽ có compa ảo: một chân ở tâm O, chân kia là đầu bút P kéo được"
    >
      {#if drawn}
        <circle cx={CENTRE.x} cy={CENTRE.y} {r} fill="#e0f2fe" />
      {:else if !turning}
        <circle
          cx={CENTRE.x}
          cy={CENTRE.y}
          {r}
          fill="none"
          stroke="#cbd5e1"
          stroke-width="2"
          stroke-dasharray="3 8"
        />
      {/if}
      <path d={drawnArc(radius, deg, sweep)} fill="none" stroke="#1e293b" stroke-width="4" />

      {#if drawn}
        <line
          x1={opposite.x}
          y1={opposite.y}
          x2={tip.x}
          y2={tip.y}
          stroke="#2563eb"
          stroke-width="5"
        />
        <line x1={CENTRE.x} y1={CENTRE.y} x2={tip.x} y2={tip.y} stroke="#e11d48" stroke-width="6" />
        {#each others as point, i (i)}
          <line
            x1={CENTRE.x}
            y1={CENTRE.y}
            x2={point.x}
            y2={point.y}
            stroke="#e11d48"
            stroke-width="4"
          />
        {/each}
        <circle cx={opposite.x} cy={opposite.y} r="6" fill="#2563eb" />
        <text
          x={nameAway(opposite, CENTRE).x}
          y={nameAway(opposite, CENTRE).y}
          text-anchor="middle"
          dominant-baseline="middle"
          font-size="20"
          font-weight="700">Q</text
        >
      {/if}

      <circle cx={CENTRE.x} cy={CENTRE.y} r="6" fill="#1e293b" />
      <text x={CENTRE.x + 12} y={CENTRE.y + 24} font-size="20" font-weight="700">O</text>

      {#if !drawn}
        <g aria-hidden="true">
          <line
            x1={CENTRE.x}
            y1={CENTRE.y}
            x2={hinge.x}
            y2={hinge.y}
            stroke="#64748b"
            stroke-width="7"
            stroke-linecap="round"
          />
          <line
            x1={pencil.x}
            y1={pencil.y}
            x2={hinge.x}
            y2={hinge.y}
            stroke="#d97706"
            stroke-width="7"
            stroke-linecap="round"
          />
          <circle cx={hinge.x} cy={hinge.y} r="9" fill="#334155" />
        </g>
      {/if}

      <DragPoint
        {drag}
        label="Đầu bút P của compa, cách tâm O {radius} xăng-ti-mét. Kéo, hoặc bấm phím trái phải để mở compa, lên xuống để xoay."
        color="#e11d48"
      />
      <text
        x={nameAway(tip, CENTRE, 24).x}
        y={nameAway(tip, CENTRE, 24).y}
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="20"
        font-weight="700"
        style="pointer-events:none">P</text
      >
    </GeometryBoard>

    <div class="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        class="min-h-12 text-lg aria-disabled:opacity-50 {button.primary}"
        aria-disabled={turning}
        bind:this={mainButton}
        onclick={() => {
          if (turning) return;
          if (drawn) restart();
          else turn();
        }}
      >
        {drawn ? 'Vẽ lại' : 'Quay compa'}
      </button>
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        disabled={!drawn || extra >= MAX_EXTRA}
        bind:this={extraButton}
        onclick={() => {
          extra += 1;
          passFocus(extraButton, mainButton);
        }}
      >
        Vẽ thêm bán kính
      </button>
    </div>

    <div class="grid grid-cols-2 gap-3 text-center text-lg font-semibold" aria-hidden={!drawn}>
      <p class="rounded-2xl bg-rose-50 px-3 py-2 text-rose-800">
        Bán kính<br /><span class="text-3xl">{drawn ? `${radius} cm` : '?'}</span>
      </p>
      <p class="rounded-2xl bg-blue-50 px-3 py-2 text-blue-800">
        Đường kính<br /><span class="text-3xl">{drawn ? `${radius * 2} cm` : '?'}</span>
      </p>
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {drawn
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {message}
    </p>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em đã biết tâm, bán kính và đường kính của hình tròn."
    >
      {#snippet visual(q, settled)}
        {#if q.visual}
          <SceneFigure scene={q.visual} {settled} />
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
