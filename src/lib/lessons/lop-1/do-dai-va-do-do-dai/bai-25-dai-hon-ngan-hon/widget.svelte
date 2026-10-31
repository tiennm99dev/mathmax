<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { clientToSvg } from '#lib/utils/svg.js';
  import KidFigure from '../_shared/kid-figure.svelte';
  import ThingShape from '../_shared/thing-shape.svelte';
  import { SPAN, landStart, makeRound, questionOf, roundMessage } from './engine.js';

  /** SVG units per board unit, and where the start line or the floor is. */
  const U = { length: 24, height: 20 };
  const LINE_X = 30;
  const FLOOR_Y = 290;
  const W = 430;
  const H = { length: 170, height: 310 };
  const ROW_Y = [55, 120];
  const COL_X = [130, 300];

  /** @type {import('../_shared/length.js').Dimension} */
  let dim = $state('length');
  let seed = $state(1);
  /** @type {[number, number]} */
  let starts = $state([...makeRound(1, 'length').starts]);
  /** Where a handle is while it is being dragged, in board units. */
  /** @type {[number | null, number | null]} */
  let moving = $state([null, null]);
  /** @type {number | null} */
  let picked = $state(null);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  let grab = 0;

  const round = $derived(makeRound(seed, dim));
  const message = $derived(roundMessage(round, starts, picked));
  const solved = $derived(picked !== null && message.tone === 'ok');
  const u = $derived(U[dim]);
  const h = $derived(H[dim]);

  /** Starts a new round: the seed or the dimension changed. */
  function reset() {
    const r = makeRound(seed, dim);
    starts = [r.starts[0], r.starts[1]];
    moving = [null, null];
    picked = null;
  }

  /** @param {number} i */
  const at = (i) => moving[i] ?? starts[i];

  /** Scratch points the drag action writes into. */
  const scratch = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  /** Board units from a pointer position along the compared direction. @param {{ x: number, y: number }} p */
  const unitsAt = (p) => (dim === 'length' ? (p.x - LINE_X) / u : (FLOOR_Y - p.y) / u);

  /** @param {number} i @param {PointerEvent} e */
  function grabItem(i, e) {
    if (!svgEl) return;
    const p = clientToSvg(svgEl, e.clientX, e.clientY, W, h);
    grab = unitsAt(p) - starts[i];
  }

  /** @param {number} i @param {number} value */
  function setStart(i, value) {
    const next = /** @type {[number, number]} */ ([...starts]);
    next[i] = landStart(value, round.sizes[i], dim);
    starts = next;
    if (!solved) picked = null;
  }

  /** @param {number} i */
  function dragFor(i) {
    const point = scratch[i];
    return {
      point,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h },
      pad: 0,
      onChange: () => {
        const v = Math.max(0, Math.min(SPAN[dim] - round.sizes[i], unitsAt(point) - grab));
        moving[i] = v;
      },
      onEnd: () => {
        const v = moving[i];
        moving[i] = null;
        if (v !== null) setStart(i, v);
      },
      /** @param {number} dx @param {number} dy */
      onKeyMove: (dx, dy) => setStart(i, starts[i] + (dim === 'length' ? dx : -dy)),
    };
  }

  /** @param {number} i */
  function itemLabel(i) {
    const where =
      starts[i] === 0
        ? dim === 'length'
          ? 'đã sát vạch xuất phát'
          : 'đã đứng trên mặt sàn'
        : `cách ${dim === 'length' ? 'vạch xuất phát' : 'mặt sàn'} ${starts[i]} ô`;
    const keys = dim === 'length' ? 'mũi tên trái, phải' : 'mũi tên lên, xuống';
    return `${round.labels[i]}, ${where}. Kéo, hoặc dùng phím ${keys} để di chuyển.`;
  }

  /** @param {number} i */
  function choose(i) {
    if (solved) return;
    picked = i;
  }

  function next() {
    seed += 1;
    reset();
  }

  /** @param {number} i */
  function answerClass(i) {
    const base = `min-h-14 rounded-2xl border-4 px-4 text-xl font-bold transition ${focusRing}`;
    if (picked === i && solved) return `${base} border-emerald-600 bg-emerald-600 text-white`;
    if (picked === i && message.tone === 'warn' && starts[0] === 0 && starts[1] === 0)
      return `${base} border-rose-400 bg-rose-50 text-rose-700`;
    return `${base} border-slate-300 bg-white text-slate-800 hover:border-indigo-400`;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn cách so sánh"
    hideLabel
    bind:value={dim}
    options={[
      { value: 'length', label: 'Dài hơn, ngắn hơn' },
      { value: 'height', label: 'Cao hơn, thấp hơn' },
    ]}
    onchange={(v) => {
      dim = /** @type {import('../_shared/length.js').Dimension} */ (v);
      reset();
    }}
  />

  <p class="text-xl font-semibold text-slate-800">
    {dim === 'length'
      ? 'Kéo hai vật sang trái cho sát vạch xuất phát màu đỏ.'
      : 'Kéo hai bạn xuống đứng trên mặt sàn.'}
  </p>

  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {h}"
    class="w-full max-w-xl touch-none rounded-2xl border border-slate-200 bg-white select-none"
    role="group"
    aria-label={dim === 'length'
      ? 'Bảng so độ dài với vạch xuất phát ở bên trái'
      : 'Bảng so chiều cao với mặt sàn ở dưới'}
  >
    {#if dim === 'length'}
      {#each { length: SPAN.length + 1 } as _, k (k)}
        <line
          x1={LINE_X + k * u}
          y1="20"
          x2={LINE_X + k * u}
          y2={h - 15}
          stroke="#e2e8f0"
          stroke-width="1"
        />
      {/each}
      <line x1={LINE_X} y1="12" x2={LINE_X} y2={h - 8} stroke="#dc2626" stroke-width="4" />
      <text x={LINE_X + 6} y="16" font-size="13" fill="#b91c1c">Vạch xuất phát</text>
      {#each [0, 1] as i (i)}
        <g
          class="drag-handle cursor-grab"
          role="slider"
          tabindex="0"
          aria-label={itemLabel(i)}
          aria-valuemin="0"
          aria-valuemax={SPAN.length - round.sizes[i]}
          aria-valuenow={starts[i]}
          onpointerdown={(e) => grabItem(i, e)}
          use:draggable={dragFor(i)}
        >
          <rect
            class="drag-knob"
            x={LINE_X + at(i) * u - 4}
            y={ROW_Y[i] - 14}
            width={round.sizes[i] * u + 8}
            height="28"
            rx="8"
            fill="transparent"
          />
          <ThingShape
            shape={round.shapes[i]}
            x={LINE_X + at(i) * u}
            y={ROW_Y[i]}
            length={round.sizes[i] * u}
            color={round.colors[i]}
          />
          <text
            x={LINE_X + at(i) * u}
            y={ROW_Y[i] + 30}
            font-size="16"
            font-weight="600"
            fill="#334155">{round.labels[i]}</text
          >
        </g>
      {/each}
    {:else}
      {#each { length: SPAN.height + 1 } as _, k (k)}
        <line
          x1="20"
          y1={FLOOR_Y - k * u}
          x2={W - 20}
          y2={FLOOR_Y - k * u}
          stroke="#e2e8f0"
          stroke-width="1"
        />
      {/each}
      <rect x="0" y={FLOOR_Y} width={W} height={h - FLOOR_Y} fill="#d6d3d1" />
      <line x1="0" y1={FLOOR_Y} x2={W} y2={FLOOR_Y} stroke="#dc2626" stroke-width="4" />
      <text x="10" y={FLOOR_Y + 16} font-size="13" fill="#7f1d1d">Mặt sàn</text>
      {#each [0, 1] as i (i)}
        {#if at(i) > 0}
          <rect
            x={COL_X[i] - 34}
            y={FLOOR_Y - at(i) * u}
            width="68"
            height={at(i) * u}
            fill="#a16207"
            stroke="#713f12"
            stroke-width="1.5"
          />
        {/if}
        <g
          class="drag-handle cursor-grab"
          role="slider"
          tabindex="0"
          aria-label={itemLabel(i)}
          aria-valuemin="0"
          aria-valuemax={SPAN.height - round.sizes[i]}
          aria-valuenow={starts[i]}
          onpointerdown={(e) => grabItem(i, e)}
          use:draggable={dragFor(i)}
        >
          <rect
            class="drag-knob"
            x={COL_X[i] - 30}
            y={FLOOR_Y - (at(i) + round.sizes[i]) * u - 4}
            width="60"
            height={round.sizes[i] * u + 8}
            rx="8"
            fill="transparent"
          />
          <KidFigure
            x={COL_X[i]}
            y={FLOOR_Y - at(i) * u}
            height={round.sizes[i] * u}
            color={round.colors[i]}
          />
          <text
            x={COL_X[i] + 42}
            y={FLOOR_Y - (at(i) + round.sizes[i] / 2) * u}
            font-size="16"
            font-weight="600"
            fill="#334155">{round.labels[i]}</text
          >
        </g>
      {/each}
    {/if}
  </svg>

  <p class="text-2xl font-bold text-slate-900">{questionOf(round)}</p>

  <div role="group" aria-label="Chọn câu trả lời" class="flex flex-wrap gap-3">
    {#each [0, 1] as i (i)}
      <button
        type="button"
        class={answerClass(i)}
        aria-pressed={picked === i}
        onclick={() => choose(i)}>{round.labels[i]}</button
      >
    {/each}
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {message.tone === 'ok'
      ? 'bg-emerald-100 text-emerald-900'
      : message.tone === 'warn'
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if solved}<span aria-hidden="true">⭐ </span>{/if}{message.text}
  </p>

  {#if solved}
    <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
      Lượt khác
    </button>
  {:else}
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={next}>
      Đổi đồ vật
    </button>
  {/if}
</div>
