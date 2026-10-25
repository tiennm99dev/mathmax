<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { clamp, linear } from '#lib/core/visuals/svg-math.js';
  import { button } from '#lib/core/ui.js';
  import { intText, kindOf } from '../_shared/integers.js';
  import { CHALLENGES, START, compare, relationSentence, temperatureSentence } from './engine.js';

  // Thermometer: a vertical number line, positive direction upwards.
  const TW = 150;
  const TH = 330;
  const T_MIN = -20;
  const T_MAX = 40;
  const TUBE_X = 70;
  const ty = linear(T_MIN, T_MAX, 270, 24);
  const tTicks = Array.from({ length: (T_MAX - T_MIN) / 5 + 1 }, (_, i) => T_MIN + 5 * i);

  // Horizontal number line from −10 to 10, positive direction to the right.
  const MAX = 10;
  const W = 440;
  const H = 160;
  const PAD = 24;
  const BASE = 76;
  const x = linear(-MAX, MAX, PAD, W - PAD - 14);
  const ticks = Array.from({ length: 2 * MAX + 1 }, (_, i) => i - MAX);

  let temp = $state(-5);
  let a = $state(START.a);
  let b = $state(START.b);
  let challenge = $state(0);

  /** @type {SVGSVGElement | undefined} */
  let thermoEl = $state();
  /** @type {SVGSVGElement | undefined} */
  let lineEl = $state();
  const scratchT = { x: 0, y: 0 };
  const scratchA = { x: 0, y: 0 };
  const scratchB = { x: 0, y: 0 };

  const dragT = {
    point: scratchT,
    svg: () => thermoEl ?? null,
    viewBox: { w: TW, h: TH },
    pad: 0,
    onChange: () => (temp = clamp(Math.round(ty.invert(scratchT.y)), T_MIN, T_MAX)),
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => (temp = clamp(temp + (dx - dy) * (big ? 5 : 1), T_MIN, T_MAX)),
  };

  /** @param {number} v */
  const fit = (v) => clamp(Math.round(v), -MAX, MAX);

  /**
   * Drag parameters for one marker on the horizontal line.
   * @param {{ x: number, y: number }} scratch
   * @param {(v: number) => void} set
   * @param {() => number} get
   */
  function dragFor(scratch, set, get) {
    return {
      point: scratch,
      svg: () => lineEl ?? null,
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
  const level = $derived(ty.map(temp));

  function nextChallenge() {
    challenge = (challenge + 1) % CHALLENGES.length;
  }
</script>

<div class="space-y-6">
  <section aria-label="Nhiệt kế" class="flex flex-wrap items-center gap-4">
    <svg
      bind:this={thermoEl}
      viewBox="0 0 {TW} {TH}"
      class="mx-auto block w-36 shrink-0 select-none sm:mx-0"
      style:aspect-ratio="{TW} / {TH}"
      style:touch-action="none"
      role="group"
      aria-label="Nhiệt kế từ âm 20 đến 40 độ C"
    >
      <rect
        x={TUBE_X - 9}
        y={ty.map(T_MAX) - 10}
        width="18"
        height={ty.map(T_MIN) - ty.map(T_MAX) + 20}
        rx="9"
        fill="#f1f5f9"
        stroke="#64748b"
        stroke-width="2"
      />
      <circle cx={TUBE_X} cy={ty.map(T_MIN) + 28} r="20" fill="#dc2626" stroke="#64748b" />
      <rect
        x={TUBE_X - 5}
        y={level}
        width="10"
        height={ty.map(T_MIN) + 20 - level}
        fill={temp < 0 ? '#2563eb' : '#dc2626'}
      />
      {#each tTicks as t (t)}
        <line
          x1={TUBE_X + 11}
          y1={ty.map(t)}
          x2={TUBE_X + (t % 10 === 0 ? 24 : 18)}
          y2={ty.map(t)}
          stroke={t === 0 ? '#0f172a' : '#475569'}
          stroke-width={t === 0 ? 2.5 : 1.5}
        />
        {#if t % 10 === 0}
          <text
            x={TUBE_X + 28}
            y={ty.map(t) + 5}
            font-size="14"
            font-weight={t === 0 ? 700 : 400}
            fill="#334155">{intText(t)}</text
          >
        {/if}
      {/each}
      <text x={TUBE_X + 28} y={ty.map(T_MAX) - 14} font-size="13" fill="#334155">°C</text>

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Mức nhiệt độ"
        aria-valuemin={T_MIN}
        aria-valuemax={T_MAX}
        aria-valuenow={temp}
        aria-valuetext="{intText(temp)} độ C"
        aria-orientation="vertical"
        style="cursor:grab; outline:none"
        use:draggable={dragT}
      >
        <path
          class="drag-knob"
          d="M {TUBE_X - 12} {level} l -16 -10 v 20 z"
          fill="#4f46e5"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
    </svg>

    <div class="min-w-0 flex-1 space-y-2" aria-live="polite">
      <p class="text-3xl font-bold tabular-nums {temp < 0 ? 'text-blue-700' : 'text-red-700'}">
        {intText(temp)} °C
      </p>
      <p class="text-slate-700">{temperatureSentence(temp)}</p>
      <p class="text-sm text-slate-600">
        {intText(temp)} là {kindOf(temp)}. Nhiệt kế là một trục số thẳng đứng: chiều dương hướng lên
        trên, nhiệt độ càng thấp thì số càng nhỏ.
      </p>
      <p class="text-sm text-slate-500">
        Kéo tam giác tím hoặc chọn nó rồi dùng phím mũi tên (Shift để đổi 5 độ).
      </p>
    </div>
  </section>

  <section aria-label="So sánh hai số nguyên trên trục số" class="space-y-3">
    <svg
      bind:this={lineEl}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full select-none"
      style:aspect-ratio="{W} / {H}"
      style:touch-action="none"
      role="group"
      aria-label="Trục số từ âm 10 đến 10 với hai điểm a và b"
    >
      <line x1={PAD - 10} y1={BASE} x2={W - 8} y2={BASE} stroke="#334155" stroke-width="2" />
      <path d="M {W - 4} {BASE} l -10 -5 v 10 z" fill="#334155" />
      {#each ticks as t (t)}
        <line
          x1={x.map(t)}
          y1={BASE - (t === 0 ? 9 : 6)}
          x2={x.map(t)}
          y2={BASE + (t === 0 ? 9 : 6)}
          stroke={t < 0 ? '#2563eb' : t > 0 ? '#dc2626' : '#0f172a'}
          stroke-width={t === 0 ? 2.5 : 1.5}
        />
        {#if t % 2 === 0}
          <text
            x={x.map(t)}
            y={BASE + 62}
            text-anchor="middle"
            font-size="15"
            fill={t < 0 ? '#1d4ed8' : t > 0 ? '#b91c1c' : '#0f172a'}>{intText(t)}</text
          >
        {/if}
      {/each}

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Điểm a"
        aria-valuemin={-MAX}
        aria-valuemax={MAX}
        aria-valuenow={a}
        aria-valuetext={intText(a)}
        aria-orientation="horizontal"
        style="cursor:grab; outline:none"
        use:draggable={dragA}
      >
        <path
          class="drag-knob"
          d="M {x.map(a)} {BASE - 3} l -10 -16 h 20 z"
          fill="#7c3aed"
          stroke="#fff"
          stroke-width="2"
        />
        <text
          x={x.map(a)}
          y={BASE - 24}
          text-anchor="middle"
          font-size="18"
          font-weight="700"
          fill="#7c3aed">a = {intText(a)}</text
        >
      </g>

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Điểm b"
        aria-valuemin={-MAX}
        aria-valuemax={MAX}
        aria-valuenow={b}
        aria-valuetext={intText(b)}
        aria-orientation="horizontal"
        style="cursor:grab; outline:none"
        use:draggable={dragB}
      >
        <path
          class="drag-knob"
          d="M {x.map(b)} {BASE + 3} l -10 16 h 20 z"
          fill="#0f766e"
          stroke="#fff"
          stroke-width="2"
        />
        <text
          x={x.map(b)}
          y={BASE + 38}
          text-anchor="middle"
          font-size="18"
          font-weight="700"
          fill="#0f766e">b = {intText(b)}</text
        >
      </g>
    </svg>

    <p class="text-center text-sm text-slate-600">
      Kéo hai điểm hoặc chọn một điểm rồi dùng phím mũi tên (Shift để nhảy 5 đơn vị).
    </p>

    <div class="rounded-xl border border-slate-200 bg-white p-4" aria-live="polite">
      <p class="text-center text-3xl font-bold tabular-nums text-slate-900">
        <span class="text-violet-700">{intText(a)}</span>
        <span class="mx-2">{sign}</span>
        <span class="text-teal-700">{intText(b)}</span>
      </p>
      <p class="mt-2 text-slate-700">{relationSentence(a, b)}</p>
      <p class="mt-1 text-sm text-slate-600">
        a là {kindOf(a)}; b là {kindOf(b)}. Số liền trước của a là {intText(a - 1)}, số liền sau của
        a là {intText(a + 1)}.
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
      <p
        class="mt-1 font-semibold {done ? 'text-emerald-700' : 'text-amber-800'}"
        aria-live="polite"
      >
        {done ? '✓ Đúng rồi!' : 'Chưa thoả mãn, hãy di chuyển các điểm.'}
      </p>
      <button type="button" class="mt-2 {button.secondary}" onclick={nextChallenge}
        >Thử thách tiếp theo</button
      >
    </div>
  </section>
</div>
