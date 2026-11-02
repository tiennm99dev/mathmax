<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Ruler from '#lib/core/kid/ruler.svelte';
  import { button } from '#lib/core/ui.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { clientToSvg } from '#lib/utils/svg.js';
  import { REACH, RULER_MAX, TASKS, markText, stepOf, stepText } from './engine.js';

  /** SVG units per centimetre. */
  const U = 22;
  const START_X = 62;
  const POINT_Y = 44;
  const RULER_Y = 62;
  const W = START_X + REACH * U + RULER_MAX * U + 40;
  const H = 112;

  let level = $state(0);
  let shift = $state(TASKS[0].shift);
  let end = $state(TASKS[0].end);
  let joined = $state(false);
  /** The ruler's 0 mark while it is being dragged, in cm. */
  /** @type {number | null} */
  let moving = $state(null);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const rulerPoint = { x: 0, y: 0 };
  let grab = 0;
  const task = $derived(TASKS[level]);
  const step = $derived(stepOf(shift, end, task.cm, joined));
  const zeroX = $derived(START_X + (moving ?? shift) * U);
  const endPoint = $state({ x: START_X + TASKS[0].end * U, y: POINT_Y });

  /** @param {number} v */
  function slideTo(v) {
    const next = Math.max(-REACH, Math.min(REACH, Math.round(v))) || 0;
    if (next !== shift) {
      shift = next;
      joined = false;
    }
  }

  /** @param {PointerEvent} e */
  function grabRuler(e) {
    if (!svgEl) return;
    grab = clientToSvg(svgEl, e.clientX, e.clientY, W, H).x / U - shift;
  }

  const rulerDrag = $derived({
    point: rulerPoint,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => {
      moving = Math.max(-REACH, Math.min(REACH, rulerPoint.x / U - grab));
    },
    onEnd: () => {
      const v = moving;
      moving = null;
      if (v !== null) slideTo(v);
    },
    /** @param {number} dx */
    onKeyMove: (dx) => slideTo(shift + dx),
  });

  /** @param {number} cm */
  function placeEnd(cm) {
    const next = Math.max(1, Math.min(RULER_MAX, cm));
    end = next;
    endPoint.x = START_X + next * U;
    endPoint.y = POINT_Y;
    joined = false;
  }

  const endDrag = $derived({
    point: endPoint,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number }} p */
    projector: (p) => {
      const cm = Math.max(1, Math.min(RULER_MAX, Math.round((p.x - START_X) / U)));
      return { x: START_X + cm * U, y: POINT_Y };
    },
    onChange: () => {
      end = Math.round((endPoint.x - START_X) / U);
      joined = false;
    },
    /** @param {number} dx */
    onKeyMove: (dx) => placeEnd(end + dx),
  });

  /** The join button turns off once used, so keyboard focus moves on to the next task. */
  function join() {
    nextButton?.focus();
    joined = true;
  }

  function nextTask() {
    level = (level + 1) % TASKS.length;
    shift = TASKS[level].shift;
    placeEnd(TASKS[level].end);
  }
</script>

<div class="space-y-4">
  <p class="text-xl font-semibold text-slate-800">
    Vẽ đoạn thẳng {task.name} dài {task.cm} cm.
  </p>

  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {H}"
    class="w-full touch-none rounded-2xl border border-slate-200 bg-amber-50 select-none"
    role="group"
    aria-label="Trang giấy có điểm {task.name[0]} đã chấm, điểm {task.name[1]} và thước kẻ."
  >
    {#if joined}
      <line
        x1={START_X}
        y1={POINT_Y}
        x2={endPoint.x}
        y2={POINT_Y}
        stroke="#059669"
        stroke-width="5"
        stroke-linecap="round"
      />
    {/if}
    <g
      class="drag-handle cursor-grab"
      role="slider"
      tabindex="0"
      aria-label="Thước kẻ. Vạch 0 {shift === 0
        ? 'trùng với điểm ' + task.name[0]
        : 'chưa trùng với điểm ' +
          task.name[0]}. Kéo, hoặc dùng phím mũi tên trái, phải để dịch thước."
      aria-valuemin={-REACH}
      aria-valuemax={REACH}
      aria-valuenow={shift}
      onpointerdown={grabRuler}
      use:draggable={rulerDrag}
    >
      <Ruler x={zeroX} y={RULER_Y} cm={RULER_MAX} unit={U} fontSize={19} />
      <rect
        class="drag-knob"
        x={zeroX - 14}
        y={RULER_Y}
        width={RULER_MAX * U + 50}
        height="40"
        rx="4"
        fill="transparent"
      />
    </g>
    <line
      x1={START_X}
      y1={POINT_Y}
      x2={START_X}
      y2={RULER_Y + 14}
      stroke={shift === 0 && moving === null ? '#059669' : '#94a3b8'}
      stroke-width="2"
      stroke-dasharray="4 3"
    />
    <line
      x1={endPoint.x}
      y1={POINT_Y}
      x2={endPoint.x}
      y2={RULER_Y + 14}
      stroke="#94a3b8"
      stroke-width="2"
      stroke-dasharray="4 3"
    />
    <circle cx={START_X} cy={POINT_Y} r="7" fill="#1e293b" />
    <text x={START_X} y={POINT_Y - 12} text-anchor="middle" font-size="18" font-weight="700"
      >{task.name[0]}</text
    >
    <DragPoint
      drag={endDrag}
      r={9}
      color="#e11d48"
      name={task.name[1]}
      nameDx={-6}
      nameDy={-14}
      label="Điểm {task.name[1]}, {markText(
        shift,
        end,
      )}. Kéo, hoặc dùng phím mũi tên trái, phải để di chuyển."
    />
  </svg>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {step === 4
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if step === 4}<span aria-hidden="true">⭐ </span>{/if}{stepText(task, shift, end, joined)}
  </p>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      disabled={step !== 3}
      onclick={join}>Nối {task.name[0]} với {task.name[1]}</button
    >
    <button
      bind:this={nextButton}
      type="button"
      class="min-h-12 text-lg {step === 4 ? button.primary : button.secondary}"
      onclick={nextTask}>Đoạn thẳng khác</button
    >
  </div>
</div>
