<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatFixed } from '#lib/core/number-format.js';
  import { arcPath, directionTo } from '#lib/core/visuals/angle-math.js';
  import {
    diagonalPoint,
    dist,
    isConvex,
    pointsAttr,
    quadAngles,
    roundToTotal,
    units,
  } from '../_shared/quad.js';

  const W = 400;
  const H = 280;
  const PAD = 20;
  // In the free mode C snaps onto the parallelogram position within this many units.
  const SNAP = 9;
  const START = {
    A: { x: 70, y: 220 },
    B: { x: 270, y: 220 },
    D: { x: 130, y: 70 },
  };

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let mode = $state('hbh');
  let A = $state({ ...START.A });
  let B = $state({ ...START.B });
  let D = $state({ ...START.D });
  let C = $state({ x: START.B.x + START.D.x - START.A.x, y: START.B.y + START.D.y - START.A.y });
  let announcement = $state('');
  /** @type {ReturnType<typeof setTimeout> | null} */ let timer = null;

  const free = $derived(mode === 'free');
  const pts = $derived([A, B, C, D]);
  const convex = $derived(isConvex(pts, 400));
  // C sits exactly at B + D − A: true in the parallelogram mode, and in the
  // free mode once C has snapped there.
  const isPara = $derived(
    Math.abs(C.x - (B.x + D.x - A.x)) < 1e-6 && Math.abs(C.y - (B.y + D.y - A.y)) < 1e-6,
  );
  const O = $derived(diagonalPoint(A, B, C, D));

  /** Printed angles: a parallelogram's come from Â alone, so equal angles print equal. */
  const angles = $derived.by(() => {
    if (isPara) {
      const a = Math.round(quadAngles(pts)[0]);
      return [a, 180 - a, a, 180 - a];
    }
    return roundToTotal(quadAngles(pts), 360);
  });
  const sides = $derived.by(() => {
    const ab = units(dist(A, B));
    const ad = units(dist(A, D));
    return isPara ? [ab, ad, ab, ad] : [ab, units(dist(B, C)), units(dist(C, D)), ad];
  });
  const halves = $derived.by(() => {
    if (!O) return null;
    const oa = units(dist(O, A));
    const ob = units(dist(O, B));
    return isPara ? [oa, oa, ob, ob] : [oa, units(dist(O, C)), ob, units(dist(O, D))];
  });

  /** Angle in degrees between the lines PQ and RS (0 when parallel). */
  const lineGap = (
    /** @type {{ x: number, y: number }} */ P,
    /** @type {{ x: number, y: number }} */ Q,
    /** @type {{ x: number, y: number }} */ R,
    /** @type {{ x: number, y: number }} */ S,
  ) => {
    const d = Math.abs(
      ((Math.atan2(Q.y - P.y, Q.x - P.x) - Math.atan2(S.y - R.y, S.x - R.x)) * 180) / Math.PI,
    );
    const m = d % 180;
    return Math.min(m, 180 - m);
  };

  // Each row is judged on the numbers it prints, so a tick never contradicts them.
  const checks = $derived.by(() => {
    const [ab, bc, cd, da] = sides;
    const [a, b, c, d] = angles;
    const parallel = isPara || (lineGap(A, B, D, C) < 0.5 && lineGap(A, D, B, C) < 0.5);
    return [
      { id: 'song-song', name: 'Các cạnh đối song song: AB ∥ CD và AD ∥ BC', ok: parallel },
      {
        id: 'canh',
        name: `Cạnh đối: AB = ${len(ab)}, CD = ${len(cd)}; AD = ${len(da)}, BC = ${len(bc)}`,
        ok: ab === cd && da === bc,
      },
      {
        id: 'goc',
        name: `Góc đối: Â = ${a}°, Ĉ = ${c}°; B̂ = ${b}°, D̂ = ${d}°`,
        ok: a === c && b === d,
      },
      {
        id: 'cheo',
        name: halves
          ? `Đường chéo: OA = ${len(halves[0])}, OC = ${len(halves[1])}; OB = ${len(halves[2])}, OD = ${len(halves[3])}`
          : 'Đường chéo: không cắt nhau',
        ok: !!halves && halves[0] === halves[1] && halves[2] === halves[3],
      },
    ];
  });

  const feedback = $derived.by(() => {
    if (!convex) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: free
          ? 'ABCD không phải tứ giác lồi. Kéo các đỉnh để được một tứ giác lồi.'
          : 'Ba đỉnh gần thẳng hàng nên hình bị dẹt. Kéo A, B hoặc D ra xa hơn.',
      };
    }
    if (isPara) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: free
          ? 'C đã vào đúng chỗ: các cạnh đối song song, nên ABCD là hình bình hành. Cùng lúc, các cạnh đối bằng nhau, các góc đối bằng nhau và O là trung điểm của mỗi đường chéo.'
          : 'Dù kéo thế nào, hình bình hành vẫn có các cạnh đối bằng nhau, các góc đối bằng nhau và hai đường chéo cắt nhau tại trung điểm O của mỗi đường.',
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: 'ABCD chưa là hình bình hành. Kéo C để tìm vị trí làm cả bốn dòng dưới đây cùng đúng; nhận ra rằng chúng luôn đúng cùng một lúc.',
    };
  });

  /** @param {number} v */
  function len(v) {
    return formatFixed(v, 1);
  }

  function announce() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      announcement = feedback.text;
    }, 400);
  }

  /** @param {number} v @param {number} lo @param {number} hi */
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  /**
   * In the parallelogram mode C = B + D − A must stay on the board too, which
   * bounds the dragged vertex (`sign` is −1 for A, +1 for B and D).
   * @param {{ x: number, y: number }} p proposed point
   * @param {{ x: number, y: number }} rest B + D − A without the dragged vertex
   * @param {1 | -1} sign
   */
  function keepC(p, rest, sign) {
    let x = clamp(p.x, PAD, W - PAD);
    let y = clamp(p.y, PAD, H - PAD);
    if (!free) {
      // C = rest + sign · p must lie in [PAD, W − PAD] × [PAD, H − PAD].
      x =
        sign === 1
          ? clamp(x, PAD - rest.x, W - PAD - rest.x)
          : clamp(x, rest.x - W + PAD, rest.x - PAD);
      y =
        sign === 1
          ? clamp(y, PAD - rest.y, H - PAD - rest.y)
          : clamp(y, rest.y - H + PAD, rest.y - PAD);
    }
    return { x, y };
  }

  function placeC() {
    if (!free) {
      C.x = B.x + D.x - A.x;
      C.y = B.y + D.y - A.y;
    }
    announce();
  }

  const base = {
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: 2,
    keyShiftStep: 10,
  };
  const dragA = $derived({
    ...base,
    point: A,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => keepC(p, { x: B.x + D.x, y: B.y + D.y }, -1),
    onChange: placeC,
  });
  const dragB = $derived({
    ...base,
    point: B,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => keepC(p, { x: D.x - A.x, y: D.y - A.y }, 1),
    onChange: placeC,
  });
  const dragD = $derived({
    ...base,
    point: D,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => keepC(p, { x: B.x - A.x, y: B.y - A.y }, 1),
    onChange: placeC,
  });
  const dragC = $derived({
    ...base,
    point: C,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      const tx = B.x + D.x - A.x;
      const ty = B.y + D.y - A.y;
      if (Math.hypot(p.x - tx, p.y - ty) < SNAP) return { x: tx, y: ty };
      return { x: clamp(p.x, PAD, W - PAD), y: clamp(p.y, PAD, H - PAD) };
    },
    onChange: announce,
  });

  /** @param {string | number} value */
  function switchMode(value) {
    if (value === 'free') {
      // Start the free quadrilateral off the parallelogram so there is something to find.
      C.x = clamp(C.x + 34, PAD, W - PAD);
      C.y = clamp(C.y + 18, PAD, H - PAD);
    } else {
      C.x = B.x + D.x - A.x;
      C.y = B.y + D.y - A.y;
    }
    announce();
  }

  function reset() {
    Object.assign(A, START.A);
    Object.assign(B, START.B);
    Object.assign(D, START.D);
    C.x = B.x + D.x - A.x;
    C.y = B.y + D.y - A.y;
    if (free) C.x += 34;
    announce();
  }

  const names = $derived([
    { p: A, name: 'A', dx: -18, dy: 18 },
    { p: B, name: 'B', dx: 10, dy: 20 },
    { p: C, name: 'C', dx: 12, dy: -10 },
    { p: D, name: 'D', dx: -20, dy: -10 },
  ]);
</script>

<div class="space-y-4">
  <div aria-live="polite" aria-atomic="true" class="sr-only">{announcement}</div>

  <SegmentedControl
    label="Chế độ"
    options={[
      { value: 'hbh', label: 'Hình bình hành' },
      { value: 'free', label: 'Tứ giác bất kì' },
    ]}
    bind:value={mode}
    onchange={switchMode}
  />

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-lg"
    label={free ? 'Tứ giác ABCD có bốn đỉnh kéo được' : 'Hình bình hành ABCD, kéo các đỉnh A, B, D'}
  >
    <polygon
      points={pointsAttr(pts)}
      fill={isPara ? '#10B981' : '#6366F1'}
      fill-opacity="0.12"
      stroke="#1F2937"
      stroke-width="2.5"
    />
    {#if convex && O}
      <line
        x1={A.x}
        y1={A.y}
        x2={C.x}
        y2={C.y}
        stroke="#D7263D"
        stroke-width="1.8"
        stroke-dasharray="6 5"
      />
      <line
        x1={B.x}
        y1={B.y}
        x2={D.x}
        y2={D.y}
        stroke="#1B998B"
        stroke-width="1.8"
        stroke-dasharray="6 5"
      />
      {#if isPara}
        <TickMarks from={A} to={O} count={1} color="#D7263D" />
        <TickMarks from={O} to={C} count={1} color="#D7263D" />
        <TickMarks from={B} to={O} count={2} color="#1B998B" />
        <TickMarks from={O} to={D} count={2} color="#1B998B" />
      {/if}
      <circle cx={O.x} cy={O.y} r="4" fill="#1F2937" />
      <text x={O.x + 8} y={O.y - 8} font-size="14" font-weight="700" fill="#1F2937">O</text>
    {/if}
    {#if convex}
      {#each pts as p, i (i)}
        {@const a = directionTo(p, pts[(i + 3) % 4])}
        {@const b = directionTo(p, pts[(i + 1) % 4])}
        <path
          d={arcPath(p, a, b, 18)}
          fill="none"
          stroke={i % 2 === 0 ? '#4F46E5' : '#D97706'}
          stroke-width="2"
        />
      {/each}
    {/if}

    <DragPoint drag={dragA} r={10} label="Đỉnh A: kéo hoặc dùng phím mũi tên" />
    <DragPoint drag={dragB} r={10} label="Đỉnh B: kéo hoặc dùng phím mũi tên" />
    <DragPoint drag={dragD} r={10} label="Đỉnh D: kéo hoặc dùng phím mũi tên" />
    {#if free}
      <DragPoint
        drag={dragC}
        r={10}
        color="#D97706"
        label="Đỉnh C: kéo hoặc dùng phím mũi tên để tìm vị trí làm ABCD thành hình bình hành"
      />
    {:else}
      <circle cx={C.x} cy={C.y} r="6" fill="#1F2937" />
    {/if}
    {#each names as n (n.name)}
      <text
        x={n.p.x + n.dx}
        y={n.p.y + n.dy}
        font-size="15"
        font-weight="700"
        fill="#1F2937"
        pointer-events="none">{n.name}</text
      >
    {/each}
  </GeometryBoard>

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  {#if convex}
    <ul class="space-y-1 text-sm tabular-nums" aria-label="Các dấu hiệu đo được">
      {#each checks as c (c.id)}
        <li class="flex items-start gap-2">
          <span
            class="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold {c.ok
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-slate-200 text-slate-600'}"
            aria-hidden="true">{c.ok ? '✓' : '✗'}</span
          >
          <span>{c.name}<span class="sr-only">: {c.ok ? 'đúng' : 'chưa đúng'}</span></span>
        </li>
      {/each}
    </ul>
  {/if}
</div>
