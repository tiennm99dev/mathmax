<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { numText } from '#lib/core/algebra-text.js';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { curvePath } from '../_shared/quadratic.js';
  import { CHALLENGES, coefficients, equationTex, quickRootNote, vieteTex } from './engine.js';

  const plane = planeScale({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, width: 420, pad: 24 });
  const { mx, my, toX, unit } = plane;
  const CURVE = '#4f46e5';
  const R1 = '#059669';
  const R2 = '#ea580c';
  const LIMIT = 5;
  const clipId = $props.id();

  let aChoice = $state(/** @type {string | number} */ (1));
  const a = $derived(Number(aChoice));
  let challenge = $state(0);

  /** @param {number} px */
  const snapX = (px) => Math.max(-LIMIT, Math.min(LIMIT, Math.round(toX(px) * 2) / 2));

  let h1 = $state({ x: mx(3), y: my(0) });
  let h2 = $state({ x: mx(-1), y: my(0) });
  const x1 = $derived(snapX(h1.x));
  const x2 = $derived(snapX(h2.x));

  const project = (/** @type {{ x: number, y: number }} */ p) => ({ x: mx(snapX(p.x)), y: my(0) });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @param {{ x: number, y: number }} point */
  const opts = (point) => ({
    point,
    svg: () => svgEl ?? null,
    viewBox: { w: plane.width, h: plane.height },
    projector: project,
    pad: 0,
    keyStep: unit / 2,
    keyShiftStep: unit,
  });
  const opts1 = $derived(opts(h1));
  const opts2 = $derived(opts(h2));

  const coef = $derived(coefficients(a, x1, x2));
  const curve = $derived(curvePath((t) => a * (t - x1) * (t - x2), plane, 200));
  const lines = $derived(vieteTex(a, x1, x2));
  const quick = $derived(quickRootNote(coef.a, coef.b, coef.c));
  const current = $derived(CHALLENGES[challenge]);
  const met = $derived(current.test(x1, x2));
  const summary = $derived(
    `Hai nghiệm x₁ = ${numText(x1)}, x₂ = ${numText(x2)}: tổng S = ${numText(x1 + x2)} = −b/a, tích P = ${numText(x1 * x2)} = c/a.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hệ số a"
    bind:value={aChoice}
    options={[
      { value: 1, label: 'a = 1' },
      { value: 2, label: 'a = 2' },
      { value: -1, label: 'a = −1' },
    ]}
  />

  <CoordinatePlane
    bind:svgEl
    {plane}
    label={`Parabol y = a(x − x₁)(x − x₂) với a = ${numText(a)} cắt trục hoành tại hai nghiệm kéo được. ${summary}`}
  >
    <defs>
      <clipPath id={clipId}>
        <rect
          x={mx(plane.xMin)}
          y={my(plane.yMax)}
          width={mx(plane.xMax) - mx(plane.xMin)}
          height={my(plane.yMin) - my(plane.yMax)}
        />
      </clipPath>
    </defs>
    <g clip-path="url(#{clipId})">
      <path d={curve} fill="none" stroke={CURVE} stroke-width="2.5" />
    </g>
    {#each [{ h: opts1, x: x1, color: R1, name: 'x₁', dy: -14 }, { h: opts2, x: x2, color: R2, name: 'x₂', dy: x1 === x2 ? -30 : -14 }] as r (r.name)}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label={`Nghiệm ${r.name}, kéo dọc trục hoành`}
        aria-valuemin={-LIMIT}
        aria-valuemax={LIMIT}
        aria-valuenow={r.x}
        aria-valuetext={`${r.name} = ${numText(r.x)}`}
        style="cursor:grab; outline:none"
        use:draggable={r.h}
      >
        <circle
          class="drag-knob"
          cx={mx(r.x)}
          cy={my(0)}
          r="8"
          fill={r.color}
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text
        x={mx(r.x)}
        y={my(0) + r.dy}
        text-anchor="middle"
        font-size="12"
        font-weight="700"
        fill={r.color}>{r.name} = {numText(r.x)}</text
      >
    {/each}
  </CoordinatePlane>

  <div class="space-y-1 overflow-x-auto rounded-xl bg-indigo-50 p-3 text-center">
    <Tex math={equationTex(a, x1, x2)} display />
    <div class="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
      {#each lines as line, i (i)}
        <Tex math={line} display />
      {/each}
    </div>
  </div>

  <FeedbackNote tone="info" text={summary} />
  {#if quick}
    <FeedbackNote tone="ok" text={`Nhẩm nghiệm: ${quick}`} />
  {/if}

  <div class="space-y-2 rounded-xl bg-slate-50 p-3">
    <p class="text-sm font-semibold text-slate-700">
      Thử thách {challenge + 1}/{CHALLENGES.length}: {current.text}
    </p>
    <FeedbackNote
      tone={met ? 'ok' : 'info'}
      text={met ? `Đạt yêu cầu! ${current.done}` : 'Kéo hai nghiệm trên trục hoành để đạt yêu cầu.'}
    />
    <button
      type="button"
      class={button.secondary}
      onclick={() => (challenge = (challenge + 1) % CHALLENGES.length)}
    >
      Thử thách tiếp
    </button>
  </div>
</div>
