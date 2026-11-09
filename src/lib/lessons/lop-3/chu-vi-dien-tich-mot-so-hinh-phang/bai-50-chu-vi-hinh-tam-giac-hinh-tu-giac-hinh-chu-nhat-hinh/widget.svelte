<script>
  import { onDestroy } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import CountStepper from '#lib/core/kid/count-stepper.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { button } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import SideFigure from '../_shared/side-figure.svelte';
  import {
    MAX_SIDE,
    MIN_SIDE,
    SHAPES,
    UNIT,
    antAt,
    cornersOf,
    fitWidth,
    shortcutText,
    sideName,
    walkText,
    wholeSides,
  } from './engine.js';

  /** @typedef {import('./engine.js').ShapeKind} ShapeKind */

  /** Seconds the ant takes for one side. */
  const SIDE_TIME = 0.8;

  let kind = $state(/** @type {ShapeKind} */ ('tam-giac'));
  let preset = $state(0);
  let length = $state(5);
  let width = $state(3);
  let side = $state(4);
  /** Whole sides the ant has finished. */
  let walked = $state(0);
  /** How far along the side it is crawling now, 0 to 1. */
  let t = $state(0);
  let crawling = $state(false);
  /** @type {(() => void) | null} */
  let stopLoop = null;

  const corners = $derived(cornersOf(kind, { preset, length, width, side }));
  const sides = $derived(wholeSides(corners));
  const letters = $derived(SHAPES[kind].letters);
  const done = $derived(walked >= sides.length);
  const message = $derived(walkText(kind, sides, walked));
  const shortcut = $derived(done ? shortcutText(kind, { length, width, side }) : null);
  const labels = $derived(sides.map((s) => `${s} ${UNIT}`));
  const figureLabel = $derived(
    `${SHAPES[kind].name} ${letters.join('')}, các cạnh: ` +
      sides.map((s, i) => `${sideName(letters, i)} ${s} ${UNIT}`).join(', '),
  );

  function halt() {
    stopLoop?.();
    stopLoop = null;
    crawling = false;
  }

  function restart() {
    halt();
    walked = 0;
    t = 0;
  }

  /** @param {string | number} value */
  function setKind(value) {
    kind = /** @type {ShapeKind} */ (value);
    restart();
  }

  function otherShape() {
    preset += 1;
    restart();
  }

  /** @param {number} v */
  function setLength(v) {
    length = Math.max(MIN_SIDE + 1, Math.min(MAX_SIDE, v));
    width = fitWidth(length, width);
    restart();
  }

  /** @param {number} v */
  function setWidth(v) {
    width = fitWidth(length, v);
    restart();
  }

  /** @param {number} v */
  function setSide(v) {
    side = Math.max(MIN_SIDE, Math.min(MAX_SIDE, v));
    restart();
  }

  function crawl() {
    if (done || crawling) return;
    if (reducedMotion()) {
      walked += 1;
      return;
    }
    crawling = true;
    let time = 0;
    stopLoop = frameLoop((dt) => {
      time += dt;
      t = Math.min(1, time / SIDE_TIME);
      if (t >= 1) {
        halt();
        walked += 1;
        t = 0;
      }
    });
  }

  onDestroy(halt);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hình"
    hideLabel
    value={kind}
    onchange={setKind}
    options={[
      { value: 'tam-giac', label: 'Tam giác' },
      { value: 'tu-giac', label: 'Tứ giác' },
      { value: 'chu-nhat', label: 'Chữ nhật' },
      { value: 'vuong', label: 'Vuông' },
    ]}
  />

  {#if kind === 'chu-nhat'}
    <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
      <div class="flex items-center gap-2">
        <span class="text-lg font-semibold">Chiều dài {length} cm</span>
        <CountStepper
          name="xăng-ti-mét chiều dài"
          value={length}
          min={MIN_SIDE + 1}
          max={MAX_SIDE}
          onchange={setLength}
        />
      </div>
      <div class="flex items-center gap-2">
        <span class="text-lg font-semibold">Chiều rộng {width} cm</span>
        <CountStepper
          name="xăng-ti-mét chiều rộng"
          value={width}
          min={MIN_SIDE}
          max={length - 1}
          onchange={setWidth}
        />
      </div>
    </div>
  {:else if kind === 'vuong'}
    <div class="flex items-center justify-center gap-2">
      <span class="text-lg font-semibold">Cạnh {side} cm</span>
      <CountStepper
        name="xăng-ti-mét cạnh"
        value={side}
        min={MIN_SIDE}
        max={MAX_SIDE}
        onchange={setSide}
      />
    </div>
  {/if}

  <SideFigure points={corners} {labels} names={[...letters]} label={figureLabel}>
    {#snippet children(toBoard)}
      {@const board = corners.map(toBoard)}
      {@const ant = toBoard(antAt(corners, walked, t))}
      {#if walked > 0}
        <polyline
          points={pointsAttr(done ? [...board, board[0]] : [...board.slice(0, walked + 1)])}
          fill="none"
          stroke="#dc2626"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0.7"
        />
      {/if}
      <g transform="translate({ant.x} {ant.y})" aria-hidden="true">
        <g stroke="#1e293b" stroke-width="2" stroke-linecap="round">
          <line x1="-9" y1="-8" x2="9" y2="8" />
          <line x1="-9" y1="8" x2="9" y2="-8" />
          <line x1="-11" y1="0" x2="11" y2="0" />
        </g>
        <circle cx="-7" cy="0" r="5" fill="#7c2d12" />
        <circle cx="0" cy="0" r="4" fill="#7c2d12" />
        <circle cx="7" cy="0" r="6" fill="#7c2d12" />
      </g>
    {/snippet}
  </SideFigure>

  <FeedbackNote tone={done ? 'ok' : 'info'} text={message} />
  {#if shortcut}
    <FeedbackNote tone="ok" text={shortcut} />
  {/if}

  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      disabled={done || crawling}
      onclick={crawl}>Bò tiếp</button
    >
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={restart}>Bò lại</button>
    {#if kind === 'tam-giac' || kind === 'tu-giac'}
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={otherShape}
        >Hình khác</button
      >
    {/if}
  </div>
</div>
