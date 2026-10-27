<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { numText } from '#lib/core/algebra-text.js';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { curvePath } from '../_shared/quadratic.js';
  import {
    CHALLENGES,
    passesThrough,
    shapeSentence,
    symmetrySentence,
    valueAt,
    widthSentence,
  } from './engine.js';

  const plane = planeScale({ xMin: -5, xMax: 5, yMin: -6, yMax: 6, width: 420, pad: 24 });
  const { mx, my, toX, unit } = plane;
  const CURVE = '#4f46e5';
  const REF = '#94a3b8';
  const MIRROR = '#0f766e';
  const TARGET = '#ea580c';
  const TABLE_X = [-2, -1, 0, 1, 2];
  const clipId = $props.id();

  let a = $state(1);
  let challenge = $state(0);

  // The point M on the parabola; x moves in steps of 0,5 and stays on the plot.
  const xLimit = $derived(
    a === 0 ? 4 : Math.min(4, Math.floor(Math.sqrt(6 / Math.abs(a)) * 2) / 2),
  );
  let handle = $state({ x: mx(1.5), y: my(2.25) });
  const x = $derived(Math.max(-xLimit, Math.min(xLimit, Math.round(toX(handle.x) * 2) / 2)));
  const y = $derived(valueAt(a, x));

  // When a larger |a| shrinks the range, pull the handle in with the shown
  // point, so the next arrow press moves M at once.
  $effect(() => {
    const hx = toX(handle.x);
    if (Math.abs(hx) > xLimit + 1e-9) {
      handle.x = mx(Math.sign(hx) * xLimit);
      handle.y = my(valueAt(a, Math.sign(hx) * xLimit));
    }
  });

  const snap = (/** @type {{ x: number, y: number }} */ p) => {
    const v = Math.max(-xLimit, Math.min(xLimit, Math.round(toX(p.x) * 2) / 2));
    return { x: mx(v), y: my(valueAt(a, v)) };
  };

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const dragOpts = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: plane.width, h: plane.height },
    projector: snap,
    pad: 0,
    keyStep: unit / 2,
    keyShiftStep: unit,
  });

  const curve = $derived(curvePath((t) => a * t * t, plane));
  const reference = $derived(curvePath((t) => (a < 0 ? -t * t : t * t), plane));
  const shape = $derived(shapeSentence(a));
  const target = $derived(CHALLENGES[challenge]);
  const met = $derived(passesThrough(a, target));

  const plotLabel = $derived(
    a === 0
      ? 'Với a = 0 đồ thị là trục hoành.'
      : `Parabol y = ${numText(a)}x², đỉnh O, trục đối xứng Oy. Điểm M(${numText(x)}; ${numText(y)}) và điểm đối xứng M′(${numText(-x)}; ${numText(y)}).`,
  );
</script>

<div class="space-y-4">
  <SliderField
    label="Hệ số a"
    bind:value={a}
    min={-3}
    max={3}
    step={0.25}
    format={(v) => numText(v)}
  />
  <p class="text-center text-lg font-semibold" style="color: {CURVE}">
    y = {a === 0 ? '0' : `${a === 1 ? '' : a === -1 ? '−' : numText(a)}x²`}
  </p>

  <CoordinatePlane bind:svgEl {plane} label={plotLabel}>
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
      {#if a !== 0 && Math.abs(a) !== 1}
        <path d={reference} fill="none" stroke={REF} stroke-width="1.5" stroke-dasharray="5 4" />
      {/if}
      {#if a === 0}
        <line
          x1={mx(plane.xMin)}
          y1={my(0)}
          x2={mx(plane.xMax)}
          y2={my(0)}
          stroke={CURVE}
          stroke-width="3"
        />
      {:else}
        <path d={curve} fill="none" stroke={CURVE} stroke-width="2.5" />
      {/if}
    </g>
    {#if a !== 0 && Math.abs(a) !== 1}
      <text x={mx(2.4)} y={my(a > 0 ? 4.6 : -4.6)} font-size="11" fill="#64748b"
        >{a > 0 ? 'y = x²' : 'y = −x²'}</text
      >
    {/if}

    <!-- The axis of symmetry. -->
    <line
      x1={mx(0)}
      y1={my(plane.yMax)}
      x2={mx(0)}
      y2={my(plane.yMin)}
      stroke={MIRROR}
      stroke-width="1"
      stroke-dasharray="2 4"
      opacity="0.7"
    />

    <!-- The challenge point. -->
    <circle
      cx={mx(target.x)}
      cy={my(target.y)}
      r="6"
      fill={met ? '#059669' : 'white'}
      stroke={met ? '#059669' : TARGET}
      stroke-width="2.5"
    />
    <text
      x={mx(target.x) + (target.x < 0 ? -9 : 9)}
      y={my(target.y) + (target.y > 0 ? 20 : -10)}
      text-anchor={target.x < 0 ? 'end' : 'start'}
      font-size="12"
      font-weight="700"
      fill={met ? '#059669' : TARGET}>A({numText(target.x)}; {numText(target.y)})</text
    >

    {#if a !== 0}
      {#if x !== 0}
        <line
          x1={mx(x)}
          y1={my(y)}
          x2={mx(-x)}
          y2={my(y)}
          stroke={MIRROR}
          stroke-width="1.2"
          stroke-dasharray="4 3"
        />
        <circle cx={mx(-x)} cy={my(y)} r="5.5" fill={MIRROR} />
        <text
          x={mx(-x) + (x > 0 ? -9 : 9)}
          y={my(y) + (a > 0 ? -8 : 16)}
          text-anchor={x > 0 ? 'end' : 'start'}
          font-size="12"
          font-weight="700"
          fill={MIRROR}>M′</text
        >
      {/if}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Điểm M trên parabol, kéo sang trái phải để đổi hoành độ"
        aria-valuemin={-xLimit}
        aria-valuemax={xLimit}
        aria-valuenow={x}
        aria-valuetext={`M(${numText(x)}; ${numText(y)})`}
        style="cursor:grab; outline:none"
        use:draggable={dragOpts}
      >
        <circle
          class="drag-knob"
          cx={mx(x)}
          cy={my(y)}
          r="8"
          fill={CURVE}
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text
        x={mx(x) + (x < 0 ? -12 : 12)}
        y={my(y) + (a > 0 ? -8 : 16)}
        text-anchor={x < 0 ? 'end' : 'start'}
        font-size="12"
        font-weight="700"
        fill={CURVE}>M({numText(x)}; {numText(y)})</text
      >
    {/if}
  </CoordinatePlane>

  <FeedbackNote tone={shape.tone} text={shape.text} />
  {#if a !== 0}
    <ul class="space-y-1 text-sm text-slate-700">
      <li>{widthSentence(a)}</li>
      <li>{symmetrySentence(a, x)}</li>
    </ul>
  {/if}

  <div class="overflow-x-auto">
    <table class="mx-auto border-collapse text-center text-sm tabular-nums">
      <caption class="mb-1 text-sm text-slate-600">Bảng giá trị của y = {numText(a)}x²</caption>
      <tbody>
        <tr>
          <th scope="row" class="border border-slate-300 bg-slate-50 px-3 py-1">x</th>
          {#each TABLE_X as t (t)}
            <td class="border border-slate-300 px-3 py-1">{numText(t)}</td>
          {/each}
        </tr>
        <tr>
          <th scope="row" class="border border-slate-300 bg-slate-50 px-3 py-1">y</th>
          {#each TABLE_X as t (t)}
            <td class="border border-slate-300 px-3 py-1">{numText(valueAt(a, t))}</td>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>

  <div class="space-y-2 rounded-xl bg-slate-50 p-3">
    <p class="text-sm font-semibold text-slate-700">
      Thử thách {challenge + 1}/{CHALLENGES.length}: kéo thanh trượt a để parabol đi qua điểm A({numText(
        target.x,
      )}; {numText(target.y)}).
    </p>
    <FeedbackNote
      tone={met ? 'ok' : 'info'}
      text={met
        ? `Đúng rồi! Với a = ${numText(a)}: ${numText(a)} · ${target.x < 0 ? `(${numText(target.x)})` : numText(target.x)}² = ${numText(target.y)}, nên A thuộc đồ thị.`
        : `Với a = ${numText(a)}, tại x = ${numText(target.x)} ta có y = ${numText(valueAt(a, target.x))} ≠ ${numText(target.y)}.`}
    />
    <button
      type="button"
      class={button.secondary}
      onclick={() => (challenge = (challenge + 1) % CHALLENGES.length)}
    >
      Điểm khác
    </button>
  </div>
</div>
