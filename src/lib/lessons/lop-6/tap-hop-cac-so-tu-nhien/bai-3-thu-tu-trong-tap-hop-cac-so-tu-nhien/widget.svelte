<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { clamp, linear } from '#lib/core/visuals/svg-math.js';
  import { button } from '#lib/core/ui.js';
  import { CHALLENGES, compare, predecessor, relationSentence, successor } from './engine.js';

  const MAX = 20;
  const W = 420;
  const H = 160;
  const PAD = 30;
  const BASE = 72;
  const x = linear(0, MAX, PAD, W - PAD - 14);
  const ticks = Array.from({ length: MAX + 1 }, (_, i) => i);

  let a = $state(4);
  let b = $state(11);
  let challenge = $state(0);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratchA = { x: 0, y: 0 };
  const scratchB = { x: 0, y: 0 };

  /** @param {number} v */
  const fit = (v) => clamp(Math.round(v), 0, MAX);

  /**
   * Drag parameters for one marker.
   * @param {{ x: number, y: number }} scratch
   * @param {(v: number) => void} set
   * @param {() => number} get
   */
  function dragFor(scratch, set, get) {
    return {
      point: scratch,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      onChange: () => set(fit(x.invert(scratch.x))),
      /** @param {number} dx @param {number} dy @param {boolean} big */
      onKeyMove: (dx, dy, big) => set(fit(get() + (dx - dy) * (big ? 5 : 1))),
    };
  }

  const dragA = dragFor(
    scratchA,
    (v) => (a = v),
    () => a,
  );
  const dragB = dragFor(
    scratchB,
    (v) => (b = v),
    () => b,
  );

  const sign = $derived(compare(a, b));
  const current = $derived(CHALLENGES[challenge]);
  const done = $derived(current.check(a, b));
  const before = $derived(predecessor(a));

  function nextChallenge() {
    challenge = (challenge + 1) % CHALLENGES.length;
  }
</script>

<div class="space-y-4">
  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full select-none"
    style:aspect-ratio="{W} / {H}"
    style:touch-action="none"
    role="group"
    aria-label="Tia số từ 0 đến 20 với hai điểm a và b"
  >
    <line x1={PAD} y1={BASE} x2={W - 8} y2={BASE} stroke="#334155" stroke-width="2" />
    <path d="M {W - 4} {BASE} l -10 -5 v 10 z" fill="#334155" />
    <circle cx={x.map(0)} cy={BASE} r="3.5" fill="#334155" />
    {#each ticks as t (t)}
      <line
        x1={x.map(t)}
        y1={BASE - 6}
        x2={x.map(t)}
        y2={BASE + 6}
        stroke="#334155"
        stroke-width="1.5"
      />
      {#if t % 2 === 0}
        <text x={x.map(t)} y={BASE + 66} text-anchor="middle" font-size="18" fill="#475569"
          >{t}</text
        >
      {/if}
    {/each}

    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Điểm a"
      aria-valuemin={0}
      aria-valuemax={MAX}
      aria-valuenow={a}
      aria-orientation="horizontal"
      style="cursor:grab; outline:none"
      use:draggable={dragA}
    >
      <rect
        class="drag-hit"
        x={x.map(a) - 16}
        y={BASE - 46}
        width="32"
        height="46"
        fill="transparent"
        stroke="none"
      />
      <path
        class="drag-knob"
        d="M {x.map(a)} {BASE - 3} l -10 -16 h 20 z"
        fill="#D7263D"
        stroke="#fff"
        stroke-width="2"
      />
      <text
        x={x.map(a)}
        y={BASE - 24}
        text-anchor="middle"
        font-size="20"
        font-weight="700"
        stroke="none"
        fill="#D7263D">a = {a}</text
      >
    </g>

    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Điểm b"
      aria-valuemin={0}
      aria-valuemax={MAX}
      aria-valuenow={b}
      aria-orientation="horizontal"
      style="cursor:grab; outline:none"
      use:draggable={dragB}
    >
      <rect
        class="drag-hit"
        x={x.map(b) - 16}
        y={BASE}
        width="32"
        height="34"
        fill="transparent"
        stroke="none"
      />
      <path
        class="drag-knob"
        d="M {x.map(b)} {BASE + 3} l -10 16 h 20 z"
        fill="#1B6CA8"
        stroke="#fff"
        stroke-width="2"
      />
      <text
        x={x.map(b)}
        y={BASE + 40}
        text-anchor="middle"
        font-size="20"
        font-weight="700"
        stroke="none"
        fill="#1B6CA8">b = {b}</text
      >
    </g>
  </svg>

  <p class="text-center text-sm text-slate-600">
    Kéo hai điểm hoặc chọn một điểm rồi dùng phím mũi tên (Shift để nhảy 5 đơn vị).
  </p>

  <div class="rounded-xl border border-slate-200 bg-white p-4" aria-live="polite">
    <p class="text-center text-3xl font-bold tabular-nums text-slate-900">
      <span class="text-[#D7263D]">{a}</span>
      <span class="mx-2">{sign}</span>
      <span class="text-[#1B6CA8]">{b}</span>
    </p>
    <p class="mt-2 text-slate-700">{relationSentence(a, b)}</p>
    <p class="mt-1 text-slate-700">
      Số liền sau của {a} là {successor(a)};
      {before === null
        ? 'số 0 không có số liền trước vì 0 là số tự nhiên nhỏ nhất.'
        : `số liền trước của ${a} là ${before}.`}
    </p>
  </div>

  <div
    class="rounded-xl border p-4 {done
      ? 'border-emerald-300 bg-emerald-50'
      : 'border-amber-300 bg-amber-50'}"
  >
    <p class="text-sm font-semibold text-slate-600">
      Thử thách {challenge + 1}/{CHALLENGES.length}
    </p>
    <p class="text-lg text-slate-900">{current.text}</p>
    <p class="mt-1 font-semibold {done ? 'text-emerald-700' : 'text-amber-800'}" aria-live="polite">
      {done ? '✓ Đúng rồi!' : 'Chưa thoả mãn, hãy di chuyển các điểm.'}
    </p>
    <button type="button" class="mt-2 {button.secondary}" onclick={nextChallenge}
      >Thử thách tiếp theo</button
    >
  </div>
</div>

<style>
  .drag-handle:focus-visible path {
    stroke: #4f46e5;
    stroke-width: 3;
  }
</style>
