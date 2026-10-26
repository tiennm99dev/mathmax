<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { degText, rightMark, wedge } from '../_shared/triangle-math.js';
  import { A, B, placeM, readings } from './engine.js';

  const W = 400;
  const H = 300;
  const U = 30;
  const OX = 200;
  const OY = 200;
  const ANGLE = '#D97706';
  const SIDE = '#4F46E5';

  /** Lengths keep two decimals, so 6,04 never reads as 6. @param {number} v */
  const lenText = (v) => formatNumber(v, 2);
  /** @param {{ x: number, y: number }} p grid units to SVG */
  const px = (p) => ({ x: OX + p.x * U, y: OY - p.y * U });
  /** @param {{ x: number, y: number }} p SVG to grid units */
  const un = (p) => ({ x: (p.x - OX) / U, y: (OY - p.y) / U });

  let mode = $state(/** @type {'tren-d' | 'tu-do'} */ ('tren-d'));
  let m = $state(px({ x: 0, y: 4 }));
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const drag = $derived({
    point: m,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: U / 2,
    keyShiftStep: U * 2,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => px(placeM(un(p), mode)),
  });

  /** @param {string | number} v */
  function changeMode(v) {
    mode = v === 'tu-do' ? 'tu-do' : 'tren-d';
    const next = px(placeM(un(m), mode));
    m.x = next.x;
    m.y = next.y;
  }

  const M = $derived(un(m));
  const r = $derived(readings(M));
  const pA = px(A);
  const pB = px(B);
  const pO = px({ x: 0, y: 0 });
  const wA = $derived(wedge(pA, pB, m, 26));
  const wB = $derived(wedge(pB, pA, m, 26));
  const wM = $derived(wedge(m, pA, pB, 22));

  const gridX = Array.from({ length: 13 }, (_, i) => i - 6);
  const gridY = Array.from({ length: 10 }, (_, i) => i - 3);

  const lengths = $derived(`MA = ${lenText(r.MA)}, MB = ${lenText(r.MB)}`);

  const feedback = $derived.by(() => {
    if (!r.triangle) {
      if (r.onD)
        return `M trùng trung điểm O của AB: MA = MB = 3. O nằm trên đường trung trực d, nhưng M, A, B thẳng hàng nên chưa có tam giác.`;
      return `M nằm trên đường thẳng AB và khác O: ${lengths}, MA ≠ MB. Kéo M ra khỏi AB.`;
    }
    if (r.equilateral)
      return `MA = MB = AB = 6: tam giác MAB đều. Mỗi góc của nó bằng 60°: góc MAB = góc MBA = góc AMB = 60°.`;
    if (r.onD)
      return `M nằm trên đường trung trực d nên MA = MB = ${lenText(r.MA)}. Tam giác MAB cân tại M, hai góc ở đáy bằng nhau: góc MAB = góc MBA = ${degText(r.atA)}; góc ở đỉnh AMB = ${degText(r.atM)}.`;
    const side = M.x < 0 ? 'A' : 'B';
    const extra = r.apexes.includes('A')
      ? ` Riêng ở đây AM = AB = 6: tam giác MAB cân tại A, nên góc AMB = góc ABM = ${degText(r.atM)}.`
      : r.apexes.includes('B')
        ? ` Riêng ở đây BM = BA = 6: tam giác MAB cân tại B, nên góc AMB = góc BAM = ${degText(r.atM)}.`
        : '';
    return `M không nằm trên d: ${lengths}, MA ≠ MB (M gần ${side} hơn). Điểm cách đều A và B phải nằm trên đường trung trực d.${extra}`;
  });

  const status = $derived(r.onD ? 'Trên đường trung trực d' : 'Ngoài đường trung trực d');
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Điểm M"
    value={mode}
    onchange={changeMode}
    options={[
      { value: 'tren-d', label: 'Chạy trên d' },
      { value: 'tu-do', label: 'Kéo tự do' },
    ]}
  />

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    label="Đoạn thẳng AB, đường trung trực d và điểm M kéo được"
  >
    {#each gridX as gx (gx)}
      <line x1={OX + gx * U} y1="0" x2={OX + gx * U} y2={H} stroke="#F1F5F9" />
    {/each}
    {#each gridY as gy (gy)}
      <line x1="0" y1={OY - gy * U} x2={W} y2={OY - gy * U} stroke="#F1F5F9" />
    {/each}

    <line
      x1={OX}
      y1="4"
      x2={OX}
      y2={H - 4}
      stroke="#059669"
      stroke-width="2"
      stroke-dasharray="7 5"
    />
    <text x={OX + 8} y={H - 10} font-size="14" font-style="italic" font-weight="700" fill="#047857"
      >d</text
    >
    <path
      d={rightMark(pO, pB, { x: OX, y: 0 }, 10)}
      fill="none"
      stroke="#047857"
      stroke-width="1.5"
    />

    {#if r.triangle}
      <path d={wA.path} fill={ANGLE} fill-opacity={r.apexes.includes('M') ? 0.45 : 0.18} />
      <path d={wB.path} fill={ANGLE} fill-opacity={r.apexes.includes('M') ? 0.45 : 0.18} />
      {#if r.equilateral}
        <path d={wM.path} fill={ANGLE} fill-opacity="0.45" />
      {/if}
      <polygon
        points="{pA.x},{pA.y} {pB.x},{pB.y} {m.x},{m.y}"
        fill={SIDE}
        fill-opacity="0.06"
        stroke="none"
      />
    {/if}

    <line x1={m.x} y1={m.y} x2={pA.x} y2={pA.y} stroke={SIDE} stroke-width="2.5" />
    <line x1={m.x} y1={m.y} x2={pB.x} y2={pB.y} stroke={SIDE} stroke-width="2.5" />
    <line x1={pA.x} y1={pA.y} x2={pB.x} y2={pB.y} stroke="#1F2937" stroke-width="3" />

    <TickMarks from={pA} to={pO} count={1} color="#1F2937" />
    <TickMarks from={pO} to={pB} count={1} color="#1F2937" />
    {#if r.equalMAMB && r.triangle}
      <TickMarks from={m} to={pA} count={2} color={SIDE} />
      <TickMarks from={m} to={pB} count={2} color={SIDE} />
    {/if}

    <circle cx={pA.x} cy={pA.y} r="4" fill="#1F2937" />
    <circle cx={pB.x} cy={pB.y} r="4" fill="#1F2937" />
    <circle cx={pO.x} cy={pO.y} r="3.5" fill="#047857" />
    <text x={pA.x - 18} y={pA.y + 20} font-size="15" font-weight="700" fill="#111827">A</text>
    <text x={pB.x + 6} y={pB.y + 20} font-size="15" font-weight="700" fill="#111827">B</text>
    <text x={pO.x - 16} y={pO.y + 20} font-size="14" font-weight="700" fill="#047857">O</text>

    <DragPoint
      {drag}
      r={9}
      name="M"
      nameDx={12}
      nameDy={-10}
      label="Điểm M, kéo hoặc dùng phím mũi tên (giữ Shift để đi xa hơn)"
    />
  </GeometryBoard>

  <p class="text-sm text-slate-600">
    Mỗi ô lưới dài 1 đơn vị, AB = 6, O là trung điểm của AB. Ở chế độ «Chạy trên d», M chỉ di chuyển
    trên đường trung trực d; ở chế độ «Kéo tự do», M đi theo từng nửa ô. Độ dài làm tròn đến hai chữ
    số thập phân, số đo góc đến một chữ số thập phân.
  </p>

  <dl class="grid grid-cols-2 gap-2 text-sm tabular-nums sm:grid-cols-4">
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-500">MA</dt>
      <dd class="font-semibold">{lenText(r.MA)}</dd>
    </div>
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-500">MB</dt>
      <dd class="font-semibold">{lenText(r.MB)}</dd>
    </div>
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-500">Góc MAB</dt>
      <dd class="font-semibold">{r.triangle ? degText(r.atA) : '—'}</dd>
    </div>
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-500">Góc MBA</dt>
      <dd class="font-semibold">{r.triangle ? degText(r.atB) : '—'}</dd>
    </div>
  </dl>

  <div
    class="space-y-1 rounded-lg p-3 text-sm {r.onD
      ? 'bg-emerald-50 text-emerald-900'
      : 'bg-amber-50 text-amber-900'}"
    aria-live="polite"
  >
    <p class="font-semibold">{status}</p>
    <p>{feedback}</p>
  </div>
</div>
