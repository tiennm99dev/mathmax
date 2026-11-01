<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { clientToSvg } from '#lib/utils/svg.js';
  import { RULER_CM, inSentence, snapShift } from './length.js';
  import Ruler from './ruler.svelte';
  import ThingShape from './thing-shape.svelte';

  /**
   * A thing lying on the table with a centimetre ruler under it that slides
   * left and right, by drag or by the arrow keys, landing on whole
   * centimetres. `shift` is where the ruler's 0 mark is, in cm from the
   * thing's left end (0: measured right), and the parent reads it.
   *
   * - `thing`, `length` (cm): what lies on the table.
   * - `shift`: bindable, from -`reach` to `reach`.
   * - `showRuler`: false hides the ruler, for guessing first.
   * - `showUnit`: draws a 1 cm square in the corner to guess against.
   * @type {{
   *   thing: import('./length.js').Thing;
   *   length: number;
   *   shift: number;
   *   reach?: number;
   *   showRuler?: boolean;
   *   showUnit?: boolean;
   *   onmove?: () => void;
   * }}
   */
  let {
    thing,
    length,
    shift = $bindable(),
    reach = 2,
    showRuler = true,
    showUnit = false,
    onmove,
  } = $props();

  const U = 22;
  const ITEM_X = 30 + 2 * U;
  const ITEM_Y = 44;
  const RULER_Y = 58;
  const W = ITEM_X + 2 * U + RULER_CM * U + 48;
  const H = 110;

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @type {number | null} */
  let moving = $state(null);
  let grab = 0;
  const point = { x: 0, y: 0 };

  const zeroX = $derived(ITEM_X + (moving ?? shift) * U);
  const noun = $derived(inSentence(thing.label));
  const where = $derived(
    shift === 0
      ? `Vạch 0 thẳng với đầu trái của ${noun}.`
      : `Vạch 0 lệch ${Math.abs(shift)} cm sang ${shift > 0 ? 'phải' : 'trái'} so với đầu ${noun}.`,
  );

  /** @param {PointerEvent} e */
  function grabRuler(e) {
    if (!svgEl) return;
    const p = clientToSvg(svgEl, e.clientX, e.clientY, W, H);
    grab = (p.x - ITEM_X) / U - shift;
  }

  /** @param {number} v */
  function land(v) {
    const next = snapShift(v, reach);
    if (next !== shift) {
      shift = next;
      onmove?.();
    }
  }

  const drag = $derived({
    point,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => {
      moving = Math.max(-reach, Math.min(reach, (point.x - ITEM_X) / U - grab));
    },
    onEnd: () => {
      const v = moving;
      moving = null;
      if (v !== null) land(v);
    },
    /** @param {number} dx */
    onKeyMove: (dx) => land(shift + dx),
  });
</script>

<svg
  bind:this={svgEl}
  viewBox="0 0 {W} {H}"
  class="w-full max-w-2xl touch-none rounded-2xl border border-slate-200 bg-amber-50 select-none"
  role="group"
  aria-label="{thing.label} nằm trên bàn{showRuler ? ', có thước kẻ ở dưới' : ''}"
>
  {#if showUnit}
    <rect
      x={W - 70}
      y="8"
      width={U}
      height={U}
      fill="#c7d2fe"
      stroke="#4338ca"
      stroke-width="1.5"
    />
    <text x={W - 42} y="24" font-size="13" fill="#3730a3">1 cm</text>
  {/if}
  <ThingShape shape={thing.shape} x={ITEM_X} y={ITEM_Y} length={length * U} color={thing.color} />
  {#if showRuler}
    <line
      x1={ITEM_X}
      y1={ITEM_Y - 16}
      x2={ITEM_X}
      y2={RULER_Y}
      stroke={shift === 0 && moving === null ? '#059669' : '#94a3b8'}
      stroke-width="2"
      stroke-dasharray="4 3"
    />
    <g
      class="drag-handle cursor-grab"
      role="slider"
      tabindex="0"
      aria-label="Thước kẻ. {where} Kéo, hoặc dùng phím mũi tên trái, phải để dịch thước."
      aria-valuemin={-reach}
      aria-valuemax={reach}
      aria-valuenow={shift}
      onpointerdown={grabRuler}
      use:draggable={drag}
    >
      <Ruler x={zeroX} y={RULER_Y} cm={RULER_CM} unit={U} />
      <rect
        class="drag-knob"
        x={zeroX - 14}
        y={RULER_Y}
        width={RULER_CM * U + 50}
        height="40"
        rx="4"
        fill="none"
      />
    </g>
  {/if}
</svg>
