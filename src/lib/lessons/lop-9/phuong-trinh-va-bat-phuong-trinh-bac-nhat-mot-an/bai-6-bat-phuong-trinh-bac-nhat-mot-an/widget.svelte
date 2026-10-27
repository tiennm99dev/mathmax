<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber, intText } from '#lib/core/number-format.js';
  import {
    boundText,
    checkText,
    closed,
    inequalityTex,
    inequalityText,
    isSolution,
    pointsRight,
    solutionText,
    solve,
    steps,
  } from './engine.js';

  const MIN = -10;
  const MAX = 10;
  const W = 360;
  const H = 96;
  const PAD = 20;
  const UNIT = (W - 2 * PAD) / (MAX - MIN);
  const LINE_Y = 52;
  const GOOD = '#059669';

  /** @param {number} v */
  const sx = (v) => PAD + (v - MIN) * UNIT;
  /** @param {number} px */
  const vx = (px) => MIN + (px - PAD) / UNIT;

  let a = $state(-3);
  let b = $state(6);
  let sign = $state(/** @type {import('./engine.js').Sign} */ ('ge'));

  let handle = $state({ x: sx(4), y: LINE_Y });
  const testX = $derived(Math.round(vx(handle.x) * 2) / 2);

  const linear = $derived(a !== 0);
  const sol = $derived(linear ? solve(a, b, sign) : null);
  const lines = $derived(linear ? steps(a, b, sign) : []);
  const testOk = $derived(isSolution(a, b, sign, testX));

  /** Keeps the test point on the line, on a multiple of 0,5. */
  const snapPoint = (/** @type {{ x: number, y: number }} */ p) => {
    const v = Math.max(MIN, Math.min(MAX, Math.round(vx(p.x) * 2) / 2));
    return { x: sx(v), y: LINE_Y };
  };

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const dragOpts = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    projector: snapPoint,
    pad: 0,
    keyStep: UNIT / 2,
    keyShiftStep: UNIT,
  });

  const TICKS = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);

  const ray = $derived.by(() => {
    if (!sol) return null;
    const x0 = sx(sol.bound);
    const right = pointsRight(sol.sign);
    return { x0, from: right ? x0 : PAD - 6, to: right ? W - PAD + 6 : x0, right };
  });

  /** Hatch strokes over the part of the line that is not in the solution set. */
  const hatches = $derived.by(() => {
    if (!ray) return [];
    const lo = ray.right ? PAD : ray.x0 + 4;
    const hi = ray.right ? ray.x0 - 4 : W - PAD;
    /** @type {number[]} */
    const out = [];
    for (let x = lo; x <= hi; x += 7) out.push(x);
    return out;
  });

  const lineLabel = $derived(
    sol
      ? `Trục số từ ${intText(MIN)} đến ${MAX}. Tập nghiệm ${solutionText(a, b, sign)} được tô màu, đầu mút ${closed(sol.sign) ? 'thuộc' : 'không thuộc'} tập nghiệm; phần còn lại bị gạch bỏ.`
      : `Trục số từ ${intText(MIN)} đến ${MAX}.`,
  );

  const feedback = $derived(
    linear
      ? {
          tone: /** @type {'ok' | 'info'} */ (testOk ? 'ok' : 'info'),
          text: `${checkText(a, b, sign, testX)} Điểm ${testOk ? 'nằm trong' : 'nằm ngoài'} phần được tô.`,
        }
      : {
          tone: /** @type {const} */ ('warn'),
          text: 'Với a = 0, đây không phải bất phương trình bậc nhất một ẩn. Hãy kéo a khác 0.',
        },
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <div class="min-w-0 space-y-2 rounded-lg border border-slate-200 bg-white p-3">
      <SliderField label="Hệ số a" bind:value={a} min={-5} max={5} format={intText} />
      <SliderField label="Hệ số b" bind:value={b} min={-10} max={10} format={intText} />
    </div>
    <div class="min-w-0 space-y-2 rounded-lg border border-slate-200 bg-white p-3">
      <SegmentedControl
        label="Dấu của bất phương trình"
        bind:value={sign}
        options={[
          { value: 'lt', label: '<' },
          { value: 'gt', label: '>' },
          { value: 'le', label: '≤' },
          { value: 'ge', label: '≥' },
        ]}
      />
      <div class="text-center text-lg">
        <Tex math={inequalityTex(a, b, sign)} ariaLabel={inequalityText(a, b, sign)} />
      </div>
    </div>
  </div>

  {#if linear}
    <ol
      class="space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-3"
      aria-label="Các bước giải"
    >
      {#each lines as line, i (i)}
        <li
          class="flex flex-wrap items-center justify-between gap-2 rounded-md px-2 py-1 {line.flips
            ? 'bg-amber-100 ring-1 ring-amber-400'
            : ''}"
        >
          <Tex math={line.tex} />
          <span class="text-sm {line.flips ? 'font-semibold text-amber-900' : 'text-slate-600'}"
            >{line.note}</span
          >
        </li>
      {/each}
    </ol>
    <p class="text-sm text-slate-700" aria-live="polite">
      Nghiệm của bất phương trình là {solutionText(a, b, sign)}.
      {#if a < 0}
        Hệ số a âm nên khi chia, chiều của bất phương trình đổi ngược.
      {:else}
        Hệ số a dương nên chiều được giữ nguyên.
      {/if}
    </p>
  {/if}

  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {H}"
    class="block w-full touch-none select-none"
    role="group"
    aria-label={lineLabel}
  >
    <line x1={PAD - 8} y1={LINE_Y} x2={W - PAD + 8} y2={LINE_Y} stroke="#334155" stroke-width="2" />
    <polygon
      points="{W - PAD + 14},{LINE_Y} {W - PAD + 6},{LINE_Y - 5} {W - PAD + 6},{LINE_Y + 5}"
      fill="#334155"
    />
    {#each TICKS as t (t)}
      <line
        x1={sx(t)}
        y1={LINE_Y - 4}
        x2={sx(t)}
        y2={LINE_Y + 4}
        stroke="#334155"
        stroke-width="1.5"
      />
      {#if t % 2 === 0}
        <text x={sx(t)} y={LINE_Y + 20} text-anchor="middle" font-size="11" fill="#475569"
          >{intText(t)}</text
        >
      {/if}
    {/each}

    {#if ray && sol}
      {#each hatches as x (x)}
        <line
          x1={x}
          y1={LINE_Y + 6}
          x2={x + 6}
          y2={LINE_Y - 6}
          stroke="#94a3b8"
          stroke-width="1.5"
        />
      {/each}
      <line
        x1={ray.from}
        y1={LINE_Y}
        x2={ray.to}
        y2={LINE_Y}
        stroke={GOOD}
        stroke-width="6"
        stroke-linecap="round"
        opacity="0.75"
      />
      <text
        x={ray.x0}
        y={LINE_Y + 7}
        text-anchor="middle"
        font-size="26"
        font-weight="700"
        fill={GOOD}
        >{pointsRight(sol.sign)
          ? closed(sol.sign)
            ? '['
            : '('
          : closed(sol.sign)
            ? ']'
            : ')'}</text
      >
      <text x={ray.x0} y="16" text-anchor="middle" font-size="12" font-weight="700" fill={GOOD}
        >{boundText(a, b)}</text
      >
    {/if}

    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Điểm thử x"
      aria-valuemin={MIN}
      aria-valuemax={MAX}
      aria-valuenow={testX}
      aria-valuetext={`x = ${formatNumber(testX, 1)}`}
      style="cursor:grab; outline:none"
      use:draggable={dragOpts}
    >
      <circle
        class="drag-knob"
        cx={handle.x}
        cy={LINE_Y}
        r="8"
        fill={linear && testOk ? GOOD : '#e11d48'}
        stroke="#fff"
        stroke-width="2"
      />
    </g>
    <text
      x={handle.x}
      y={LINE_Y + 36}
      text-anchor="middle"
      font-size="12"
      font-weight="700"
      fill="#1e293b"
      style="pointer-events:none">x = {formatNumber(testX, 1)}</text
    >
  </svg>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
