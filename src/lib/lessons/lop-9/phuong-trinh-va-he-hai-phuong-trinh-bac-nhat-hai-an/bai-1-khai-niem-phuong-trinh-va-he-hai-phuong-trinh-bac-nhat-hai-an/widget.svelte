<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { clipToBox } from '#lib/algebra-engine/system.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { intText } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { eqTex, eqText, pairText } from '../_shared/equation-text.js';
  import {
    check,
    checkLine,
    foundCount,
    isLinear,
    lineKind,
    record,
    systemShape,
    systemVerdict,
  } from './engine.js';

  const SPAN = 6;
  const plane = planeScale({ xMin: -SPAN, xMax: SPAN, yMin: -SPAN, yMax: SPAN });
  const { mx, my, toX, toY, unit } = plane;
  const LINE_1 = '#0f766e';
  const LINE_2 = '#4f46e5';
  const OK = '#059669';
  const BAD = '#e11d48';
  // Solutions to find before the solution set may be drawn.
  const ENOUGH = 3;

  let mode = $state(/** @type {'mot' | 'he'} */ ('mot'));
  let eq1 = $state({ a: 1, b: 2, c: 4 });
  let eq2 = $state({ a: 1, b: -1, c: 1 });

  // The draggable point lives in SVG pixels and always sits on a grid node.
  let handle = $state({ x: mx(0), y: my(0) });
  const point = $derived({ x: Math.round(toX(handle.x)), y: Math.round(toY(handle.y)) });

  /** @type {import('./engine.js').Tried[]} */
  let tried = $state([]);
  let showLine = $state(false);

  const linear1 = $derived(isLinear(eq1));
  const linear2 = $derived(isLinear(eq2));
  const seg1 = $derived(clipToBox(eq1, -SPAN, SPAN, -SPAN, SPAN));
  const seg2 = $derived(clipToBox(eq2, -SPAN, SPAN, -SPAN, SPAN));
  const found = $derived(foundCount(tried));
  const lineVisible = $derived(mode === 'he' || showLine);
  const pointOk = $derived(check(eq1, point).ok);

  const oneFeedback = $derived.by(() => {
    if (!linear1) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Khi a = b = 0, đây không phải phương trình bậc nhất hai ẩn. Hãy đổi a hoặc b.',
      };
    }
    const pair = pairText(point.x, point.y);
    return pointOk
      ? {
          tone: /** @type {const} */ ('ok'),
          text: `Thay ${pair}: ${checkLine(eq1, point)}. Cặp số ${pair} là một nghiệm.`,
        }
      : {
          tone: /** @type {const} */ ('info'),
          text: `Thay ${pair}: ${checkLine(eq1, point)}. Cặp số ${pair} không là nghiệm.`,
        };
  });

  const sysFeedback = $derived(
    linear1 && linear2
      ? systemVerdict(eq1, eq2, point)
      : { tone: /** @type {const} */ ('warn'), text: 'Mỗi phương trình cần a ≠ 0 hoặc b ≠ 0.' },
  );
  const shape = $derived(systemShape(eq1, eq2, SPAN));

  /** Keeps the dragged point on a grid node inside the plot. */
  const snap = (/** @type {{ x: number, y: number }} */ p) => ({
    x: mx(Math.max(-SPAN, Math.min(SPAN, Math.round(toX(p.x))))),
    y: my(Math.max(-SPAN, Math.min(SPAN, Math.round(toY(p.y))))),
  });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const dragOpts = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: plane.width, h: plane.height },
    projector: snap,
    pad: 0,
    keyStep: unit,
  });

  function keep() {
    if (!linear1) return;
    tried = record(tried, point, pointOk);
  }

  function clearTried() {
    tried = [];
    showLine = false;
  }

  /** A changed equation has other solutions, so the record starts over. */
  function equationChanged() {
    clearTried();
  }

  /** @param {number} a @param {number} b @param {number} c */
  function preset(a, b, c) {
    eq1 = { a, b, c };
    clearTried();
  }

  const plotLabel = $derived(
    mode === 'mot'
      ? `Mặt phẳng toạ độ với điểm M${pairText(point.x, point.y)}${lineVisible && linear1 ? ` và đường thẳng ${eqText(eq1.a, eq1.b, eq1.c)}` : ''}.`
      : `Mặt phẳng toạ độ với điểm M${pairText(point.x, point.y)}, đường thẳng (1) ${eqText(eq1.a, eq1.b, eq1.c)} và đường thẳng (2) ${eqText(eq2.a, eq2.b, eq2.c)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Xem"
    bind:value={mode}
    options={[
      { value: 'mot', label: 'Một phương trình' },
      { value: 'he', label: 'Hệ hai phương trình' },
    ]}
  />

  <div class="grid gap-3 sm:grid-cols-2">
    <fieldset class="min-w-0 rounded-lg border border-slate-200 bg-white p-3">
      <legend class="px-1 text-sm font-semibold text-teal-700">Phương trình (1)</legend>
      <div class="mb-2 text-center">
        <Tex math={eqTex(eq1.a, eq1.b, eq1.c)} ariaLabel={eqText(eq1.a, eq1.b, eq1.c)} />
      </div>
      <div class="flex flex-col gap-2">
        <Stepper
          label="a"
          bind:value={eq1.a}
          min={-5}
          max={5}
          format={intText}
          onchange={equationChanged}
        />
        <Stepper
          label="b"
          bind:value={eq1.b}
          min={-5}
          max={5}
          format={intText}
          onchange={equationChanged}
        />
        <Stepper
          label="c"
          bind:value={eq1.c}
          min={-10}
          max={10}
          format={intText}
          onchange={equationChanged}
        />
      </div>
    </fieldset>
    {#if mode === 'he'}
      <fieldset class="min-w-0 rounded-lg border border-slate-200 bg-white p-3">
        <legend class="px-1 text-sm font-semibold text-indigo-700">Phương trình (2)</legend>
        <div class="mb-2 text-center">
          <Tex math={eqTex(eq2.a, eq2.b, eq2.c)} ariaLabel={eqText(eq2.a, eq2.b, eq2.c)} />
        </div>
        <div class="flex flex-col gap-2">
          <Stepper label="a" bind:value={eq2.a} min={-5} max={5} format={intText} />
          <Stepper label="b" bind:value={eq2.b} min={-5} max={5} format={intText} />
          <Stepper label="c" bind:value={eq2.c} min={-10} max={10} format={intText} />
        </div>
      </fieldset>
    {:else}
      <div
        class="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
      >
        <p class="mb-2 font-semibold">Phương trình mẫu</p>
        <div class="flex flex-wrap gap-2">
          <button type="button" class={button.quiet} onclick={() => preset(1, 2, 4)}
            >x + 2y = 4</button
          >
          <button type="button" class={button.quiet} onclick={() => preset(2, -1, 1)}
            >2x − y = 1</button
          >
          <button type="button" class={button.quiet} onclick={() => preset(0, 1, 2)}
            >0x + y = 2</button
          >
          <button type="button" class={button.quiet} onclick={() => preset(1, 0, -3)}
            >x + 0y = −3</button
          >
        </div>
      </div>
    {/if}
  </div>

  <CoordinatePlane bind:svgEl {plane} label={plotLabel}>
    {#if lineVisible && seg1}
      <line
        x1={mx(seg1[0].x)}
        y1={my(seg1[0].y)}
        x2={mx(seg1[1].x)}
        y2={my(seg1[1].y)}
        stroke={LINE_1}
        stroke-width="2.5"
        stroke-linecap="round"
      />
    {/if}
    {#if mode === 'he' && seg2}
      <line
        x1={mx(seg2[0].x)}
        y1={my(seg2[0].y)}
        x2={mx(seg2[1].x)}
        y2={my(seg2[1].y)}
        stroke={LINE_2}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-dasharray="8 5"
      />
    {/if}

    {#if mode === 'mot'}
      {#each tried as t (`${t.x};${t.y}`)}
        {#if t.ok}
          <circle cx={mx(t.x)} cy={my(t.y)} r="5" fill={OK} />
        {:else}
          <path
            d="M {mx(t.x) - 4} {my(t.y) - 4} L {mx(t.x) + 4} {my(t.y) + 4} M {mx(t.x) + 4} {my(
              t.y,
            ) - 4} L {mx(t.x) - 4} {my(t.y) + 4}"
            stroke={BAD}
            stroke-width="2"
          />
        {/if}
      {/each}
    {/if}

    <g
      class="drag-handle"
      role="button"
      tabindex="0"
      aria-label="Điểm M{pairText(point.x, point.y)}, kéo hoặc dùng phím mũi tên để di chuyển"
      style="cursor:grab; outline:none"
      use:draggable={dragOpts}
    >
      <circle
        class="drag-knob"
        cx={handle.x}
        cy={handle.y}
        r="8"
        fill="#f59e0b"
        stroke="#fff"
        stroke-width="2"
      />
    </g>
    <text
      x={point.x > 2 ? handle.x - 11 : handle.x + 11}
      y={point.y > 4 ? handle.y + 22 : handle.y - 10}
      text-anchor={point.x > 2 ? 'end' : 'start'}
      font-size="12"
      font-weight="700"
      fill="#92400e"
      style="pointer-events:none">M{pairText(point.x, point.y)}</text
    >
  </CoordinatePlane>

  {#if mode === 'mot'}
    <FeedbackNote tone={oneFeedback.tone} text={oneFeedback.text} />
    <div class="flex flex-wrap items-center gap-2">
      <button type="button" class={button.primary} onclick={keep} disabled={!linear1}>
        Ghi lại điểm M
      </button>
      <button
        type="button"
        class={button.secondary}
        onclick={() => (showLine = !showLine)}
        disabled={!linear1 || found < ENOUGH}
        aria-pressed={showLine}
      >
        {showLine ? 'Ẩn tập nghiệm' : 'Vẽ tập nghiệm'}
      </button>
      <button type="button" class={button.quiet} onclick={clearTried}>Xoá các điểm</button>
    </div>
    <p class="text-sm text-slate-600" aria-live="polite">
      {#if !linear1}
        Chưa có phương trình bậc nhất hai ẩn.
      {:else if found < ENOUGH}
        Em đã tìm được {found} nghiệm. Tìm đủ {ENOUGH} nghiệm (chấm xanh) để vẽ tập nghiệm.
      {:else if showLine}
        Mọi nghiệm đều nằm trên {lineKind(eq1)}
        {eqText(eq1.a, eq1.b, eq1.c)}; mỗi điểm của nó cũng là một nghiệm.
      {:else}
        Em đã tìm được {found} nghiệm. Các chấm xanh có thẳng hàng không? Bấm "Vẽ tập nghiệm" để kiểm
        tra.
      {/if}
    </p>
  {:else}
    <div
      class="space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
    >
      <p>
        <span class="font-semibold text-teal-700">(1)</span>
        {linear1 ? checkLine(eq1, point) : 'a = b = 0'}
      </p>
      <p>
        <span class="font-semibold text-indigo-700">(2)</span>
        {linear2 ? checkLine(eq2, point) : 'a = b = 0'}
      </p>
    </div>
    <FeedbackNote tone={sysFeedback.tone} text={sysFeedback.text} />
    <p class="text-sm text-slate-600">{shape}</p>
  {/if}
</div>
