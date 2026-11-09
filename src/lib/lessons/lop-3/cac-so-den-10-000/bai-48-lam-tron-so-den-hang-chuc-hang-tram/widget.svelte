<script>
  import { onDestroy } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { roundTo } from '../_shared/numbers-to-10000.js';
  import {
    HIGH,
    LOW,
    NUMBERS,
    along,
    ballText,
    guessVerdict,
    hillHeight,
    marksAround,
  } from './engine.js';

  /** @typedef {import('./engine.js').Unit} Unit */

  const W = 360;
  const LEFT = 30;
  const RIGHT = 330;
  const BASE = 130;
  const RISE = 62;
  const BALL = 12;
  /** Seconds the roll takes. */
  const ROLL_TIME = 0.9;

  let unit = $state(/** @type {Unit} */ (10));
  let round = $state(0);
  let n = $state(/** @type {number} */ (NUMBERS[10][0]));
  /** Where the ball is drawn, 0 to 1 along the hill. */
  let shown = $state(along(NUMBERS[10][0], 10));
  /** @type {{ ok: boolean, text: string } | null} */
  let verdict = $state(null);
  /** @type {(() => void) | null} */
  let stopRoll = null;

  const marks = $derived(marksAround(n, unit));
  const ticks = $derived(Array.from({ length: 11 }, (_, i) => marks.lo + (i * unit) / 10));
  const rolled = $derived(verdict !== null);

  /** @param {number} t */
  const xAt = (t) => LEFT + t * (RIGHT - LEFT);
  /** @param {number} t */
  const yAt = (t) => BASE - RISE * hillHeight(t);

  function halt() {
    stopRoll?.();
    stopRoll = null;
  }

  /** @param {number} value */
  function setNumber(value) {
    halt();
    n = Math.min(HIGH, Math.max(LOW, value));
    shown = along(n, unit);
    verdict = null;
  }

  /** @param {string | number} value */
  function setUnit(value) {
    unit = value === 100 ? 100 : 10;
    round = 0;
    setNumber(NUMBERS[unit][0]);
  }

  function nextNumber() {
    round += 1;
    const list = NUMBERS[unit];
    setNumber(list[round % list.length]);
  }

  /** @param {number} guess */
  function release(guess) {
    if (rolled) return;
    verdict = guessVerdict(n, unit, guess);
    const end = roundTo(n, unit) === marks.lo ? 0 : 1;
    if (reducedMotion()) {
      shown = end;
      return;
    }
    const start = shown;
    let time = 0;
    halt();
    stopRoll = frameLoop((dt) => {
      time += dt;
      const k = Math.min(1, time / ROLL_TIME);
      shown = start + (end - start) * k * k;
      if (k >= 1) halt();
    });
  }

  onDestroy(halt);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Làm tròn đến"
    options={[
      { value: 10, label: 'Hàng chục' },
      { value: 100, label: 'Hàng trăm' },
    ]}
    value={unit}
    onchange={setUnit}
  />

  <div class="flex items-center justify-center gap-2">
    <button
      type="button"
      class="min-h-12 min-w-12 text-xl {button.quiet} px-0"
      aria-label="Bớt 1"
      disabled={n <= LOW}
      onclick={() => setNumber(n - 1)}>−1</button
    >
    <p class="min-w-28 text-center text-4xl font-bold text-indigo-700 tabular-nums">{fmt(n)}</p>
    <button
      type="button"
      class="min-h-12 min-w-12 text-xl {button.quiet} px-0"
      aria-label="Thêm 1"
      disabled={n >= HIGH}
      onclick={() => setNumber(n + 1)}>+1</button
    >
  </div>

  <svg viewBox="0 0 {W} 180" class="mx-auto block w-full max-w-md" aria-hidden="true">
    <polygon
      points="{LEFT},{BASE} {xAt(0.5)},{BASE - RISE} {RIGHT},{BASE}"
      fill="#fef3c7"
      stroke="#b45309"
      stroke-width="3"
      stroke-linejoin="round"
    />
    <line x1={LEFT} y1={BASE + 12} x2={RIGHT} y2={BASE + 12} stroke="#334155" stroke-width="2" />
    {#each ticks as v, i (i)}
      {@const big = i === 0 || i === 10}
      <line
        x1={xAt(i / 10)}
        y1={BASE + (big ? 4 : 7)}
        x2={xAt(i / 10)}
        y2={BASE + (big ? 20 : 17)}
        stroke={i === 5 ? '#dc2626' : '#334155'}
        stroke-width={big ? 3 : 1.5}
      />
      {#if big || i === 5}
        <text
          x={xAt(i / 10)}
          y={BASE + 40}
          text-anchor="middle"
          font-size={big ? 18 : 14}
          font-weight={big ? 700 : 400}
          fill={i === 5 ? '#dc2626' : '#1e293b'}>{fmt(v)}</text
        >
      {/if}
    {/each}
    <circle cx={xAt(shown)} cy={yAt(shown) - BALL - 1} r={BALL} fill="#4f46e5" />
    <circle cx={xAt(shown) - 4} cy={yAt(shown) - BALL - 5} r="3.5" fill="#c7d2fe" />
  </svg>

  <FeedbackNote tone="info" text={ballText(n, unit)} />

  <div class="grid grid-cols-2 gap-2" role="group" aria-label="Đoán viên bi lăn về đâu">
    {#each [marks.lo, marks.hi] as mark (mark)}
      <button
        type="button"
        class="min-h-14 text-lg {button.secondary}"
        disabled={rolled}
        onclick={() => release(mark)}>Lăn về {fmt(mark)}</button
      >
    {/each}
  </div>

  {#if verdict}
    <FeedbackNote tone={verdict.ok ? 'ok' : 'warn'} text={verdict.text} />
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={nextNumber}>
        Số khác
      </button>
    </div>
  {/if}
</div>
