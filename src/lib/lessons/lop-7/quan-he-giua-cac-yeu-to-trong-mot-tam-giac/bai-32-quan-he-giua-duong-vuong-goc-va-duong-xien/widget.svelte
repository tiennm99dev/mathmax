<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { degText, directionTo, rightMarkPath, sectorPath } from '#lib/core/visuals/angle-math.js';
  import { frame } from '../_shared/triangle-board.js';
  import { BOX, obliqueLength, placeA, placeM, readings } from './engine.js';

  const W = 400;
  const H = 250;
  const U = 30;
  const OY = 215;
  const { toSvg, fromSvg } = frame(U, 200, OY);
  const PERP = '#059669';
  const OBL = '#4F46E5';

  /** @param {number} v */
  const len = (v) => formatNumber(v, 2);

  let a = $state(toSvg({ x: -2, y: 4 }));
  let m = $state(toSvg({ x: 3, y: 0 }));
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const dragA = $derived({
    point: a,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: U / 2,
    keyShiftStep: U * 2,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => toSvg(placeA(fromSvg(p))),
  });
  const dragM = $derived({
    point: m,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: U / 2,
    keyShiftStep: U * 2,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => toSvg(placeM(fromSvg(p))),
  });

  const A = $derived(placeA(fromSvg(a)));
  const M = $derived(placeM(fromSvg(m)));
  const r = $derived(readings(A, M));
  const pH = $derived(toSvg(r.H));

  // The chart under the board: AM against the position of M on d.
  const CH = 130;
  const KY = 7.5;
  /** @param {number} v */
  const cy = (v) => CH - 10 - v * KY;
  const curve = $derived.by(() => {
    const parts = [];
    for (let x = BOX.minX; x <= BOX.maxX + 1e-9; x += 0.1) {
      const p = toSvg({ x, y: 0 });
      parts.push(`${parts.length ? 'L' : 'M'} ${p.x} ${cy(obliqueLength(A, x))}`);
    }
    return parts.join(' ');
  });

  const feedback = $derived(
    r.atH
      ? `M trùng H: AM là đường vuông góc, AM = AH = ${len(r.AH)}. Đây là đoạn ngắn nhất từ A đến d, và cũng là khoảng cách từ A đến đường thẳng d.`
      : `AM là đường xiên: AM = ${len(r.AM)} > AH = ${len(r.AH)}. Trong tam giác AHM vuông tại H, góc H = 90° là góc lớn nhất, nên cạnh đối diện AM là cạnh lớn nhất (góc AMH = ${degText(r.atM)} nhỏ hơn 90°).`,
  );
</script>

<div class="space-y-4">
  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    label="Điểm A kéo được ở ngoài đường thẳng d, chân đường vuông góc H và điểm M kéo được trên d"
  >
    {#each Array.from({ length: 13 }, (_, i) => i - 6) as gx (gx)}
      <line x1={200 + gx * U} y1="0" x2={200 + gx * U} y2={H} stroke="#F1F5F9" />
    {/each}
    {#each Array.from({ length: 8 }, (_, i) => i - 1) as gy (gy)}
      <line x1="0" y1={OY - gy * U} x2={W} y2={OY - gy * U} stroke="#F1F5F9" />
    {/each}

    <line x1="0" y1={OY} x2={W} y2={OY} stroke="#1F2937" stroke-width="2.5" />
    <text x={W - 16} y={OY - 8} font-size="15" font-style="italic" font-weight="700" fill="#1F2937"
      >d</text
    >

    <line
      x1={a.x}
      y1={a.y}
      x2={pH.x}
      y2={pH.y}
      stroke={PERP}
      stroke-width="3"
      stroke-dasharray={r.atH ? '' : '7 5'}
    />
    <path
      d={rightMarkPath(pH, directionTo(pH, a), r.atH || M.x > A.x ? 0 : 180, 10)}
      fill="none"
      stroke={PERP}
      stroke-width="1.5"
    />
    {#if !r.atH}
      <path
        d={sectorPath(m, directionTo(m, a), directionTo(m, pH), 22)}
        fill="#D97706"
        fill-opacity="0.3"
      />
      <line x1={a.x} y1={a.y} x2={m.x} y2={m.y} stroke={OBL} stroke-width="3" />
    {/if}

    <circle cx={pH.x} cy={pH.y} r="4" fill={PERP} />
    <text
      x={M.x >= A.x ? pH.x - 6 : pH.x + 6}
      y={pH.y + 20}
      text-anchor={M.x >= A.x ? 'end' : 'start'}
      font-size="14"
      font-weight="700"
      fill="#047857">H</text
    >

    <DragPoint
      drag={dragA}
      r={8}
      color="#1F2937"
      name="A"
      label="Điểm A, kéo hoặc dùng phím mũi tên"
    />
    <DragPoint
      drag={dragM}
      r={8}
      color={OBL}
      name="M"
      nameDx={8}
      nameDy={24}
      label="Điểm M trên đường thẳng d, kéo hoặc dùng phím mũi tên trái phải"
    />
  </GeometryBoard>

  <figure class="space-y-1">
    <svg
      viewBox="0 0 {W} {CH}"
      class="mx-auto block w-full rounded-lg border border-slate-200 bg-white"
      role="img"
      aria-label="Đồ thị độ dài AM theo vị trí của M trên d, thấp nhất khi M trùng H"
    >
      <line x1="0" y1={cy(0)} x2={W} y2={cy(0)} stroke="#CBD5E1" />
      <line x1="0" y1={cy(r.AH)} x2={W} y2={cy(r.AH)} stroke={PERP} stroke-dasharray="4 4" />
      <text x="6" y={cy(r.AH) + (r.AH >= 2 ? 14 : -5)} font-size="12" fill="#047857"
        >AH = {len(r.AH)}</text
      >
      <path d={curve} fill="none" stroke={OBL} stroke-width="2" />
      <circle cx={pH.x} cy={cy(r.AH)} r="4" fill={PERP} />
      <line x1={m.x} y1={cy(0)} x2={m.x} y2={cy(r.AM)} stroke={OBL} stroke-opacity="0.4" />
      <circle cx={m.x} cy={cy(r.AM)} r="5" fill={OBL} />
    </svg>
    <figcaption class="text-xs text-slate-500">
      Đường cong cho biết độ dài AM khi M chạy trên d (vị trí của M thẳng hàng với bảng ở trên).
      Điểm thấp nhất nằm ngay dưới H.
    </figcaption>
  </figure>

  <dl class="grid grid-cols-3 gap-2 text-sm tabular-nums">
    <div class="rounded-lg bg-emerald-50 p-2">
      <dt class="text-emerald-800">AH (vuông góc)</dt>
      <dd class="font-semibold">{len(r.AH)}</dd>
    </div>
    <div class="rounded-lg bg-indigo-50 p-2">
      <dt class="text-indigo-800">AM</dt>
      <dd class="font-semibold">{len(r.AM)}</dd>
    </div>
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-600">HM</dt>
      <dd class="font-semibold">{len(r.HM)}</dd>
    </div>
  </dl>

  <p
    class="rounded-lg p-3 text-sm {r.atH
      ? 'bg-emerald-50 text-emerald-900'
      : 'bg-indigo-50 text-indigo-950'}"
    aria-live="polite"
  >
    {feedback}
  </p>
</div>
