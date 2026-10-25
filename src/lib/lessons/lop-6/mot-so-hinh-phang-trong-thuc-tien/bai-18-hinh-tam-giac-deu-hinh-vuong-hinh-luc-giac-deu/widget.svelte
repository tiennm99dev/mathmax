<script>
  import { button } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { clamp, snap } from '#lib/core/visuals/svg-math.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import {
    CM,
    SQUARE_STEPS,
    dist,
    hexTriangles,
    hexagon,
    polyPoints,
    snapApex,
    squareCorners,
    triangleStatus,
  } from './engine.js';

  const W = 400;
  const H = 320;
  const MODES = [
    { value: 'tam-giac', label: 'Tam giác đều' },
    { value: 'hinh-vuong', label: 'Hình vuông' },
    { value: 'luc-giac', label: 'Lục giác đều' },
  ];
  const TRI_COLORS = ['#D7263D', '#F46036', '#E2A400', '#1B998B', '#2E86AB', '#7B2CBF'];

  let mode = $state('tam-giac');

  /** @param {number} v */
  const cm = (v) => `${formatFixed(v, 1)} cm`;

  // ── Equilateral triangle: A fixed, B slides along the base line, C free ──
  const A = { x: 80, y: 280 };
  let B = $state({ x: 240, y: 280 });
  let C = $state({ x: 300, y: 70 });
  let showArcs = $state(true);
  /** @type {SVGSVGElement | undefined} */ let triSvg = $state();

  const tri = $derived(triangleStatus(A, B, C));
  const r = $derived(dist(A, B));
  const triText = $derived(
    tri.equilateral
      ? `Tam giác ABC đều: AB = BC = CA = ${cm(tri.ab)}.`
      : tri.onA
        ? `C nằm trên cung tâm A (CA = AB) nhưng CB = ${cm(tri.cb)}, chưa bằng AB = ${cm(tri.ab)}.`
        : tri.onB
          ? `C nằm trên cung tâm B (CB = AB) nhưng CA = ${cm(tri.ca)}, chưa bằng AB = ${cm(tri.ab)}.`
          : `CA = ${cm(tri.ca)}, CB = ${cm(tri.cb)}, AB = ${cm(tri.ab)}. Hãy đưa C tới chỗ hai cung cắt nhau.`,
  );

  const dragB = $derived({
    point: B,
    svg: () => triSvg ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: CM / 2,
    keyShiftStep: CM,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => ({ x: clamp(snap(p.x, CM / 2, A.x), A.x + 2 * CM, A.x + 5 * CM), y: A.y }),
  });
  const dragC = $derived({
    point: C,
    svg: () => triSvg ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: 1,
    keyShiftStep: 10,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => ({ x: clamp(p.x, 16, W - 16), y: clamp(p.y, 16, H - 16) }),
    // A pointer drop close to an apex lands on it; arrow keys move freely.
    onEnd: () => {
      const s = snapApex(A, B, C);
      if (s) C = s;
    },
  });

  // ── Square drawn with a ruler and a set square, step by step ──
  let side = $state(3);
  let step = $state(1);
  const SA = { x: 120, y: 285 };
  const sq = $derived(squareCorners(SA, side * CM));
  const [a, b, c, d] = $derived(sq);

  // ── Regular hexagon from six equilateral triangles ──
  let hexSide = $state(3);
  let placed = $state(0);
  const O = { x: 200, y: 160 };
  const hexR = $derived(hexSide * CM);
  const hexP = $derived(hexagon(O, hexR));
  const tris = $derived(hexTriangles(O, hexR, placed));
  const hexText = $derived(
    placed < 6
      ? `Đã ghép ${placed}/6 tam giác đều cạnh ${cm(hexSide)} quanh điểm O.`
      : `Sáu tam giác đều ghép kín thành lục giác đều ABCDEF: sáu cạnh đều bằng ${cm(hexSide)}, ba đường chéo chính AD = BE = CF = ${cm(2 * hexSide)}.`,
  );

  const status = $derived(
    mode === 'tam-giac' ? triText : mode === 'hinh-vuong' ? SQUARE_STEPS[step - 1] : hexText,
  );
</script>

<div class="space-y-4">
  <SegmentedControl label="Chọn hình để vẽ" options={MODES} bind:value={mode} />

  {#if mode === 'tam-giac'}
    <GeometryBoard
      bind:svgEl={triSvg}
      width={W}
      height={H}
      interactive
      maxWidth="max-w-md"
      label="Dựng tam giác đều ABC bằng thước và compa"
    >
      {#if showArcs}
        <circle
          cx={A.x}
          cy={A.y}
          {r}
          fill="none"
          stroke="#2E86AB"
          stroke-dasharray="5 5"
          stroke-width="1.5"
        />
        <circle
          cx={B.x}
          cy={B.y}
          {r}
          fill="none"
          stroke="#1B998B"
          stroke-dasharray="5 5"
          stroke-width="1.5"
        />
      {/if}
      <polygon
        points={polyPoints([A, B, C])}
        fill={tri.equilateral ? '#1B998B' : '#94a3b8'}
        fill-opacity="0.18"
        stroke={tri.equilateral ? '#1B998B' : '#475569'}
        stroke-width="2.5"
      />
      {#if tri.equilateral}
        <TickMarks from={A} to={B} count={1} color="#1B998B" />
        <TickMarks from={B} to={C} count={1} color="#1B998B" />
        <TickMarks from={C} to={A} count={1} color="#1B998B" />
      {/if}
      <circle cx={A.x} cy={A.y} r="5" fill="#1F2937" />
      <text x={A.x - 18} y={A.y + 20} font-size="15" font-weight="700" fill="#1F2937">A</text>
      <DragPoint
        drag={dragB}
        color="#1B998B"
        name="B"
        nameDx={6}
        nameDy={28}
        label="Điểm B: dùng mũi tên trái, phải để đổi độ dài AB, mỗi bước 0,5 cm"
      />
      <DragPoint
        drag={dragC}
        color="#D7263D"
        name="C"
        label="Điểm C: kéo hoặc dùng phím mũi tên tới chỗ hai cung tròn cắt nhau"
      />
    </GeometryBoard>
    <div class="flex flex-wrap items-center gap-3">
      <button type="button" class={button.quiet} onclick={() => (showArcs = !showArcs)}>
        {showArcs ? 'Ẩn vết compa' : 'Hiện vết compa'}
      </button>
      <button
        type="button"
        class={button.quiet}
        onclick={() => {
          B = { x: 240, y: 280 };
          C = { x: 300, y: 70 };
        }}>Đặt lại</button
      >
    </div>
  {:else if mode === 'hinh-vuong'}
    <GeometryBoard
      width={W}
      height={H}
      maxWidth="max-w-md"
      label="Vẽ hình vuông ABCD bằng thước và êke, bước {step} trên 4"
    >
      {#if step >= 4}
        <polygon points={polyPoints(sq)} fill="#2E86AB" fill-opacity="0.15" />
        <line
          x1={a.x}
          y1={a.y}
          x2={c.x}
          y2={c.y}
          stroke="#7B2CBF"
          stroke-dasharray="6 4"
          stroke-width="1.5"
        />
        <line
          x1={b.x}
          y1={b.y}
          x2={d.x}
          y2={d.y}
          stroke="#7B2CBF"
          stroke-dasharray="6 4"
          stroke-width="1.5"
        />
      {/if}
      {#if step >= 2}
        <line x1={a.x} y1={a.y + 20} x2={a.x} y2="20" stroke="#94a3b8" stroke-width="1" />
        <rect
          x={a.x}
          y={a.y - 14}
          width="14"
          height="14"
          fill="none"
          stroke="#475569"
          stroke-width="1.5"
        />
        <line x1={a.x} y1={a.y} x2={d.x} y2={d.y} stroke="#2E86AB" stroke-width="3" />
        <circle cx={d.x} cy={d.y} r="5" fill="#1F2937" />
        <text x={d.x - 20} y={d.y - 6} font-size="15" font-weight="700">D</text>
      {/if}
      {#if step >= 3}
        <line x1={b.x} y1={b.y + 20} x2={b.x} y2="20" stroke="#94a3b8" stroke-width="1" />
        <rect
          x={b.x - 14}
          y={b.y - 14}
          width="14"
          height="14"
          fill="none"
          stroke="#475569"
          stroke-width="1.5"
        />
        <line x1={b.x} y1={b.y} x2={c.x} y2={c.y} stroke="#2E86AB" stroke-width="3" />
        <circle cx={c.x} cy={c.y} r="5" fill="#1F2937" />
        <text x={c.x + 8} y={c.y - 6} font-size="15" font-weight="700">C</text>
      {/if}
      {#if step >= 4}
        <line x1={d.x} y1={d.y} x2={c.x} y2={c.y} stroke="#2E86AB" stroke-width="3" />
        <TickMarks from={a} to={b} count={1} color="#2E86AB" />
        <TickMarks from={b} to={c} count={1} color="#2E86AB" />
        <TickMarks from={c} to={d} count={1} color="#2E86AB" />
        <TickMarks from={d} to={a} count={1} color="#2E86AB" />
      {/if}
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#2E86AB" stroke-width="3" />
      <circle cx={a.x} cy={a.y} r="5" fill="#1F2937" />
      <circle cx={b.x} cy={b.y} r="5" fill="#1F2937" />
      <text x={a.x - 20} y={a.y + 18} font-size="15" font-weight="700">A</text>
      <text x={b.x + 8} y={b.y + 18} font-size="15" font-weight="700">B</text>
    </GeometryBoard>
    <SliderField label="Cạnh hình vuông" bind:value={side} min={2} max={5} step={0.5} unit="cm" />
    <div class="flex flex-wrap gap-3">
      <button
        type="button"
        class={button.quiet}
        disabled={step <= 1}
        onclick={() => (step = Math.max(1, step - 1))}>Bước trước</button
      >
      <button
        type="button"
        class={button.primary}
        disabled={step >= 4}
        onclick={() => (step = Math.min(4, step + 1))}>Bước tiếp</button
      >
    </div>
    {#if step >= 4}
      <p class="text-sm text-slate-700">
        Đo được: bốn cạnh đều bằng {cm(side)}, bốn góc đều vuông, hai đường chéo AC = BD ≈
        {formatNumber(side * Math.SQRT2, 1)} cm.
      </p>
    {/if}
  {:else}
    <GeometryBoard
      width={W}
      height={H}
      maxWidth="max-w-md"
      label="Ghép sáu tam giác đều quanh điểm O thành hình lục giác đều"
    >
      {#each hexP as p, i (i)}
        <line
          x1={O.x}
          y1={O.y}
          x2={p.x}
          y2={p.y}
          stroke="#cbd5e1"
          stroke-dasharray="3 4"
          stroke-width="1"
        />
      {/each}
      {#each tris as t, i (i)}
        <polygon
          points={polyPoints(t)}
          fill={TRI_COLORS[i]}
          fill-opacity="0.35"
          stroke={TRI_COLORS[i]}
          stroke-width="2"
        />
      {/each}
      {#if placed === 6}
        <polygon points={polyPoints(hexP)} fill="none" stroke="#1F2937" stroke-width="3" />
        {#each [0, 1, 2] as i (i)}
          <line
            x1={hexP[i].x}
            y1={hexP[i].y}
            x2={hexP[i + 3].x}
            y2={hexP[i + 3].y}
            stroke="#1F2937"
            stroke-dasharray="7 4"
            stroke-width="1.5"
          />
        {/each}
        {#each hexP as p, i (i)}
          <text
            x={O.x + (p.x - O.x) * 1.12 - 5}
            y={O.y + (p.y - O.y) * 1.12 + 5}
            font-size="15"
            font-weight="700">{'ABCDEF'[i]}</text
          >
        {/each}
      {/if}
      <circle cx={O.x} cy={O.y} r="4" fill="#1F2937" />
      <text x={O.x + 6} y={O.y - 6} font-size="13" fill="#1F2937">O</text>
    </GeometryBoard>
    <SliderField
      label="Cạnh mỗi tam giác đều"
      bind:value={hexSide}
      min={2}
      max={3.5}
      step={0.5}
      unit="cm"
    />
    <div class="flex flex-wrap gap-3">
      <button
        type="button"
        class={button.primary}
        disabled={placed >= 6}
        onclick={() => (placed = Math.min(6, placed + 1))}>Ghép thêm một tam giác</button
      >
      <button
        type="button"
        class={button.quiet}
        disabled={placed <= 0}
        onclick={() => (placed = Math.max(0, placed - 1))}>Bỏ bớt</button
      >
    </div>
  {/if}

  <p class="rounded-lg bg-slate-50 p-3 text-sm text-slate-800" aria-live="polite">{status}</p>
</div>
