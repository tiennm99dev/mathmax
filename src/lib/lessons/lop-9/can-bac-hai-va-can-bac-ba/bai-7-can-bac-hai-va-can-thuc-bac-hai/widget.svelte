<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { numText } from '#lib/core/algebra-text.js';
  import { absSentence, curvePath, rootLabel, rootsSentence, squareRoots } from './engine.js';

  const plane = planeScale({ xMin: -4, xMax: 10, yMin: -4, yMax: 10, width: 420, pad: 24 });
  const { mx, my, toX, toY, unit } = plane;
  const PARABOLA = '#4f46e5';
  const SQRT = '#0f766e';
  const ABS = '#9333ea';
  const LINE = '#d97706';
  const A_MIN = -3;
  const A_MAX = 9;
  const X_MAX = 3;

  let mode = $state(/** @type {'can' | 'hdt'} */ ('can'));

  // Handle of the line y = a, on the y-axis; a moves in steps of 0,25.
  let aHandle = $state({ x: mx(0), y: my(4) });
  const a = $derived(Math.max(A_MIN, Math.min(A_MAX, Math.round(toY(aHandle.y) * 4) / 4)));
  // Handle of the point (x; x²) on the parabola; x moves in steps of 0,5.
  let xHandle = $state({ x: mx(-2), y: my(4) });
  const x = $derived(Math.max(-X_MAX, Math.min(X_MAX, Math.round(toX(xHandle.x) * 2) / 2)));

  const roots = $derived(squareRoots(a));

  const snapA = (/** @type {{ x: number, y: number }} */ p) => {
    const v = Math.max(A_MIN, Math.min(A_MAX, Math.round(toY(p.y) * 4) / 4));
    return { x: mx(0), y: my(v) };
  };
  const snapX = (/** @type {{ x: number, y: number }} */ p) => {
    const v = Math.max(-X_MAX, Math.min(X_MAX, Math.round(toX(p.x) * 2) / 2));
    return { x: mx(v), y: my(v * v) };
  };

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const aOpts = $derived({
    point: aHandle,
    svg: () => svgEl ?? null,
    viewBox: { w: plane.width, h: plane.height },
    projector: snapA,
    pad: 0,
    keyStep: unit / 4,
    keyShiftStep: unit,
  });
  const xOpts = $derived({
    point: xHandle,
    svg: () => svgEl ?? null,
    viewBox: { w: plane.width, h: plane.height },
    projector: snapX,
    pad: 0,
    keyStep: unit / 2,
    keyShiftStep: unit,
  });

  const parabola = curvePath((t) => t * t, -4, 4, plane, 10);
  const sqrtCurve = curvePath((t) => Math.sqrt(t), 0, 10, plane, 10, 200);
  const absCurve = curvePath((t) => Math.abs(t), -4, 4, plane, 10, 2);

  const feedback = $derived(
    mode === 'can'
      ? {
          tone: /** @type {'ok' | 'info' | 'warn'} */ (roots.count === 0 ? 'warn' : 'ok'),
          text: rootsSentence(a),
        }
      : {
          tone: /** @type {'ok' | 'info' | 'warn'} */ (x < 0 ? 'warn' : 'ok'),
          text: absSentence(x),
        },
  );

  const plotLabel = $derived(
    mode === 'can'
      ? `Parabol y = x², đồ thị y = √x và đường thẳng y = ${numText(a)}. ${rootsSentence(a)}`
      : `Parabol y = x² và đồ thị y = √(x²) = |x|, điểm có hoành độ x = ${numText(x)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Xem"
    bind:value={mode}
    options={[
      { value: 'can', label: 'Căn bậc hai của a' },
      { value: 'hdt', label: '√(x²) = |x|' },
    ]}
  />

  <CoordinatePlane bind:svgEl {plane} label={plotLabel}>
    <path d={parabola} fill="none" stroke={PARABOLA} stroke-width="2.5" />
    <text x={mx(-3.95)} y={my(5.5)} font-size="12" font-weight="700" fill={PARABOLA}>y = x²</text>

    {#if mode === 'can'}
      <line
        x1={mx(-4)}
        y1={my(-4)}
        x2={mx(10)}
        y2={my(10)}
        stroke="#94a3b8"
        stroke-width="1.2"
        stroke-dasharray="5 4"
      />
      <text x={mx(7.2)} y={my(7.9)} font-size="11" fill="#64748b">y = x</text>
      <path d={sqrtCurve} fill="none" stroke={SQRT} stroke-width="2.5" />
      <text x={mx(7.6)} y={my(3.2)} font-size="12" font-weight="700" fill={SQRT}>y = √x</text>

      <line
        x1={mx(-4)}
        y1={my(a)}
        x2={mx(10)}
        y2={my(a)}
        stroke={LINE}
        stroke-width="2"
        stroke-dasharray={roots.count === 0 ? '6 4' : undefined}
      />
      {#if roots.count > 0}
        {@const r = roots.root}
        <line
          x1={mx(r)}
          y1={my(a)}
          x2={mx(r)}
          y2={my(0)}
          stroke={PARABOLA}
          stroke-width="1"
          stroke-dasharray="3 3"
        />
        <line
          x1={mx(-r)}
          y1={my(a)}
          x2={mx(-r)}
          y2={my(0)}
          stroke={PARABOLA}
          stroke-width="1"
          stroke-dasharray="3 3"
        />
        <line
          x1={mx(r)}
          y1={my(a)}
          x2={mx(a)}
          y2={my(r)}
          stroke={SQRT}
          stroke-width="1"
          stroke-dasharray="2 3"
        />
        <circle cx={mx(a)} cy={my(r)} r="5" fill={SQRT} />
        <circle cx={mx(r)} cy={my(a)} r="5.5" fill={PARABOLA} />
        <circle cx={mx(-r)} cy={my(a)} r="5.5" fill={PARABOLA} />
        {#if r > 0}
          <text x={mx(r)} y={my(0) + 14} text-anchor="middle" font-size="11" font-weight="700"
            >{rootLabel(a)}</text
          >
          <text x={mx(-r)} y={my(0) + 14} text-anchor="middle" font-size="11" font-weight="700"
            >−{rootLabel(a)}</text
          >
        {/if}
      {/if}

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Số a, kéo lên xuống trên trục tung"
        aria-valuemin={A_MIN}
        aria-valuemax={A_MAX}
        aria-valuenow={a}
        aria-valuetext={`a = ${numText(a)}`}
        style="cursor:grab; outline:none"
        use:draggable={aOpts}
      >
        <rect
          class="drag-knob"
          x={mx(0) - 9}
          y={my(a) - 9}
          width="18"
          height="18"
          rx="4"
          fill={LINE}
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text x={mx(0) + 14} y={my(a) - 8} font-size="12" font-weight="700" fill="#92400e"
        >a = {numText(a)}</text
      >
    {:else}
      <path d={absCurve} fill="none" stroke={ABS} stroke-width="2.5" />
      <text x={mx(4.2)} y={my(4.6)} font-size="12" font-weight="700" fill={ABS}
        >y = √(x²) = |x|</text
      >
      <line
        x1={mx(x)}
        y1={my(x * x)}
        x2={mx(x)}
        y2={my(0)}
        stroke="#64748b"
        stroke-width="1"
        stroke-dasharray="3 3"
      />
      <circle cx={mx(x)} cy={my(Math.abs(x))} r="5.5" fill={ABS} />
      <text
        x={mx(x) + (x < 0 ? -8 : 8)}
        y={my(Math.abs(x)) + 4}
        text-anchor={x < 0 ? 'end' : 'start'}
        font-size="11"
        font-weight="700"
        fill={ABS}>{numText(Math.abs(x))}</text
      >
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Điểm trên parabol, kéo sang trái phải để đổi x"
        aria-valuemin={-X_MAX}
        aria-valuemax={X_MAX}
        aria-valuenow={x}
        aria-valuetext={`x = ${numText(x)}`}
        style="cursor:grab; outline:none"
        use:draggable={xOpts}
      >
        <circle
          class="drag-knob"
          cx={mx(x)}
          cy={my(x * x)}
          r="8"
          fill={PARABOLA}
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text
        x={mx(x) + 12}
        y={my(x * x) + 4}
        text-anchor="start"
        font-size="11"
        font-weight="700"
        fill={PARABOLA}>({numText(x)}; {numText(x * x)})</text
      >
    {/if}
  </CoordinatePlane>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
  <p class="text-sm text-slate-600">
    {#if mode === 'can' && a >= 0}
      Đồ thị y = √x là phần bên phải của parabol y = x² lật qua đường thẳng y = x: điểm ({numText(
        a,
      )}; √{numText(a)}) trên y = √x ứng với điểm (√{numText(a)}; {numText(a)}) trên parabol.
    {:else if mode === 'can'}
      Căn thức √x chỉ xác định khi x ≥ 0, nên đồ thị y = √x không có điểm nào bên trái trục tung.
    {:else}
      Hai điểm x và −x cho cùng một x², nên √(x²) không phân biệt được dấu của x: nó luôn bằng |x|.
    {/if}
  </p>
</div>
