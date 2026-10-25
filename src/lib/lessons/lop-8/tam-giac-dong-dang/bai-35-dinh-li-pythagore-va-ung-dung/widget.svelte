<script>
  import { button } from '#lib/core/ui.js';
  import { formatFixed, texNumber } from '#lib/core/number-format.js';
  import Tex from '#lib/components/tex.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { squareA, squareB, squareC, morphSquareA, morphSquareB, polyPoints } from './engine.js';

  // The viewBox has to hold the square on the hypotenuse too, which reaches
  // FOOT_X + a to the right and APEX_Y - b above. With both legs capped at
  // LEG_MAX the drawing stays inside [0, VIEW] for every reachable R.
  const VIEW = 520;
  // Apex A stays on y = APEX_Y and foot H on x = FOOT_X; the right-angle vertex R is dragged.
  const APEX_Y = 200,
    FOOT_X = 320;
  // Min leg keeps the triangle non-degenerate; max keeps every square on canvas.
  const LEG_MIN = 40,
    LEG_MAX = 150;
  const INIT = { x: 200, y: 320 };

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let R = $state({ ...INIT });
  /** @type {'idle'|'animating'|'proven'} */ let phase = $state('idle');
  let announcement = $state('');
  /** @type {ReturnType<typeof setTimeout>|null} */ let debounceId = null;

  const tp = tweened(0, { duration: reducedMotion ? 0 : 2000, easing: cubicOut });

  // ── Derived geometry ──────────────────────────────────────────────────────
  const A = $derived({ x: R.x, y: APEX_Y });
  const H = $derived({ x: FOOT_X, y: R.y });
  const a = $derived(R.y - APEX_Y);
  const b = $derived(FOOT_X - R.x);
  const c = $derived(Math.hypot(a, b));
  const sqA = $derived(squareA(A, R));
  const sqB = $derived(squareB(R, H));
  const sqC = $derived(squareC(A, H, a, b));
  // Phase A: shear-a moves in first half of tween; phase B: shear-b in second half
  const tA = $derived(Math.min(1, $tp * 2));
  const tB = $derived(Math.max(0, $tp * 2 - 1));
  const shearA = $derived(morphSquareA(A, R, H, a, b, tA));
  const shearB = $derived(morphSquareB(R, H, a, b, tB));
  /** @param {number} v */
  const one = (v) => formatFixed(v, 1);
  /** @param {number} v */
  const texOne = (v) => texNumber(one(v));
  const texSides = $derived(`a=${texOne(a)},\\;b=${texOne(b)},\\;c=${texOne(c)}`);
  const texNums = $derived(`${texOne(a * a)}+${texOne(b * b)}=${texOne(c * c)}`);

  /** @param {{ x: number; y: number }} p */
  const clampR = (p) => ({
    x: Math.max(FOOT_X - LEG_MAX, Math.min(FOOT_X - LEG_MIN, p.x)),
    y: Math.max(APEX_Y + LEG_MIN, Math.min(APEX_Y + LEG_MAX, p.y)),
  });
  const dragOpts = $derived({
    point: R,
    svg: () => svgEl ?? null,
    viewBox: { w: VIEW, h: VIEW },
    projector: clampR,
    pad: 0,
    keyStep: 1,
    keyShiftStep: 10,
    onChange: () => {
      if (debounceId) clearTimeout(debounceId);
      debounceId = setTimeout(() => {
        announcement = `Cạnh a=${one(a)}, b=${one(b)}, huyền c=${one(c)}`;
      }, 300);
    },
  });

  async function prove() {
    if (phase === 'animating') return;
    phase = 'animating';
    tp.set(0, { duration: 0 });
    await tp.set(1);
    phase = 'proven';
  }
  function reset() {
    phase = 'idle';
    tp.set(0, { duration: 0 });
    R = { ...INIT };
    announcement = '';
  }

  if (import.meta.env.DEV) {
    /** Shoelace area of a closed polygon. */
    const polyArea = (/** @type {{x:number,y:number}[]} */ pts) => {
      let sum = 0;
      for (let i = 0; i < pts.length; i++) {
        const q = pts[(i + 1) % pts.length];
        sum += pts[i].x * q.y - q.x * pts[i].y;
      }
      return Math.abs(sum) / 2;
    };
    $effect(() => {
      // The morph is built from shears and rotations, so each polygon must
      // keep its area at every frame. This is what silently broke before.
      if (Math.abs(polyArea(shearA) - a * a) > 0.01)
        console.error(`[pythagoras] square-a area drifted: ${polyArea(shearA)} vs ${a * a}`);
      if (Math.abs(polyArea(shearB) - b * b) > 0.01)
        console.error(`[pythagoras] square-b area drifted: ${polyArea(shearB)} vs ${b * b}`);
    });
  }
</script>

<div class="space-y-4">
  <!-- aria-live: announces a/b/c when vertex moves (debounced 300ms) -->
  <div aria-live="polite" aria-atomic="true" class="sr-only">{announcement}</div>

  <div>
    <GeometryBoard
      bind:svgEl
      width={VIEW}
      height={VIEW}
      interactive
      maxWidth="max-w-md"
      label="Ba hình vuông dựng trên ba cạnh của tam giác vuông"
    >
      <!-- Square-c (orange/hypotenuse) behind everything -->
      <polygon
        points={polyPoints(sqC)}
        fill="#F46036"
        fill-opacity={phase === 'proven' ? '0.15' : '0.35'}
        stroke="#F46036"
        stroke-width="1.5"
      />

      {#if phase === 'idle'}
        <polygon
          points={polyPoints(sqA)}
          fill="#D7263D"
          fill-opacity="0.45"
          stroke="#D7263D"
          stroke-width="1.5"
        />
        <polygon
          points={polyPoints(sqB)}
          fill="#1B998B"
          fill-opacity="0.45"
          stroke="#1B998B"
          stroke-width="1.5"
        />
      {:else}
        <!-- Shear-a morphs from square-a into the a²-sub-rectangle of square-c -->
        <polygon
          points={polyPoints(shearA)}
          fill="#D7263D"
          fill-opacity="0.65"
          stroke="#D7263D"
          stroke-width="1.5"
        />
        <!-- Shear-b morphs from square-b into the b²-sub-rectangle of square-c -->
        <polygon
          points={polyPoints(shearB)}
          fill="#1B998B"
          fill-opacity="0.65"
          stroke="#1B998B"
          stroke-width="1.5"
        />
      {/if}

      <!-- Triangle -->
      <polygon
        points="{A.x},{A.y} {R.x},{R.y} {H.x},{H.y}"
        fill="#e2e8f0"
        fill-opacity="0.7"
        stroke="#475569"
        stroke-width="2"
      />
      <!-- Right-angle box at R -->
      <rect
        x={R.x}
        y={R.y - 12}
        width="12"
        height="12"
        fill="none"
        stroke="#475569"
        stroke-width="1.5"
      />

      <!-- Labels -->
      <text x={R.x - 18} y={(APEX_Y + R.y) / 2} font-size="14" font-weight="700" fill="#D7263D"
        >a</text
      >
      <text x={(R.x + FOOT_X) / 2} y={R.y + 18} font-size="14" font-weight="700" fill="#1B998B"
        >b</text
      >
      <text
        x={(R.x + FOOT_X) / 2 + 6}
        y={(APEX_Y + R.y) / 2 - 10}
        font-size="14"
        font-weight="700"
        fill="#F46036">c</text
      >
      <text x={A.x + 6} y={A.y - 6} font-size="13" fill="#475569">A</text>
      <text x={H.x + 6} y={H.y + 4} font-size="13" fill="#475569">H</text>

      <!-- Draggable right-angle vertex -->
      <DragPoint
        drag={dragOpts}
        r={14}
        color="#D7263D"
        label="Đỉnh góc vuông R — kéo hoặc dùng phím mũi tên để thay đổi tam giác"
      />
      <text
        x={R.x - 5}
        y={R.y + 5}
        font-size="13"
        font-weight="700"
        fill="#fff"
        pointer-events="none">R</text
      >
    </GeometryBoard>
    <p class="mt-2 text-center text-sm text-slate-600">
      Kéo điểm R (góc vuông, màu đỏ) hoặc dùng phím mũi tên. Nhấn "Chứng minh" để xem hoạt hình cắt
      ghép.
    </p>
  </div>

  <!-- Live KaTeX panel -->
  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
    <div class="mb-2 text-sm text-slate-700">
      <Tex math={texSides} ariaLabel="a={one(a)}, b={one(b)}, c={one(c)}" />
    </div>
    <Tex display math="a^2 + b^2 = c^2" />
    <div class="mt-1 text-sm text-slate-600 tabular-nums">
      <Tex math={texNums} ariaLabel="{one(a * a)} + {one(b * b)} = {one(c * c)}" />
    </div>
  </div>

  <!-- Action buttons -->
  <div class="flex flex-wrap gap-3">
    <button type="button" onclick={prove} disabled={phase === 'animating'} class={button.primary}
      >Chứng minh</button
    >
    <button type="button" onclick={reset} class={button.quiet}>Đặt lại</button>
  </div>
</div>
