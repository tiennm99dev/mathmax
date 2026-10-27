<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { directionTo, sectorPath } from '#lib/core/visuals/angle-math.js';
  import { labelSpot } from '#lib/geom-engine/plane.js';
  import { COLS, LINES, ROWS, keepsTriangle, midline, midpoints, snapCell } from './engine.js';

  /** @typedef {import('./engine.js').Pt} Pt */
  /** @typedef {import('./engine.js').LineId} LineId */
  /** @typedef {'A' | 'B' | 'C'} Name */

  const U = 40;
  const PAD = 24;
  const W = COLS * U + 2 * PAD;
  const H = ROWS * U + 2 * PAD;

  /** @type {Record<Name, Pt>} */
  let tri = $state({ A: { x: 4, y: 1 }, B: { x: 1, y: 7 }, C: { x: 11, y: 7 } });
  /** @type {LineId} */
  let lineId = $state('MN');
  let showAll = $state(false);

  /** @param {Pt} p */
  const toSvg = (p) => ({ x: PAD + p.x * U, y: PAD + p.y * U });
  /** @param {Pt} p */
  const toGrid = (p) => ({ x: (p.x - PAD) / U, y: (p.y - PAD) / U });

  const mids = $derived(midpoints(tri));
  const line = $derived(midline(tri, lineId));
  const cfg = $derived(LINES[lineId]);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  /** @param {Name} name */
  const others = (name) =>
    /** @type {Name[]} */ (['A', 'B', 'C']).filter((n) => n !== name).map((n) => tri[n]);

  /** @param {Name} name @param {Pt} cell */
  function moveTo(name, cell) {
    const [o1, o2] = others(name);
    if (keepsTriangle(cell, o1, o2)) tri[name] = cell;
  }

  /** @param {Name} name */
  const dragFor = (name) => ({
    point: toSvg(tri[name]),
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {Pt} raw */
    projector: (raw) => {
      moveTo(name, snapCell(toGrid(raw)));
      return toSvg(tri[name]);
    },
    /** @param {number} dx @param {number} dy */
    onKeyMove: (dx, dy) => moveTo(name, snapCell({ x: tri[name].x + dx, y: tri[name].y + dy })),
  });
  const dragA = $derived(dragFor('A'));
  const dragB = $derived(dragFor('B'));
  const dragC = $derived(dragFor('C'));

  const sA = $derived(toSvg(tri.A));
  const sB = $derived(toSvg(tri.B));
  const sC = $derived(toSvg(tri.C));
  const sM = $derived(toSvg(mids.M));
  const sN = $derived(toSvg(mids.N));
  const sP = $derived(toSvg(mids.P));
  const lp = $derived(toSvg(line.p));
  const lq = $derived(toSvg(line.q));
  const lx = $derived(toSvg(line.X));
  const ly = $derived(toSvg(line.Y));

  /** @param {number} v */
  const cm = (v) => formatNumber(v, 2);
  /** @param {number} v */
  const deg = (v) => `${formatNumber(v, 1)}°`;

  const angleNames = $derived({
    mid: `${cfg.v}${cfg.p}${cfg.q}`,
    side: `${cfg.v}${cfg.x}${cfg.y}`,
  });

  const feedback = $derived(
    `${cfg.p}${cfg.q} ≈ ${cm(line.length)} cm, ${cfg.side} ≈ ${cm(line.side)} cm, ` +
      `2 · ${cfg.p}${cfg.q} ≈ ${cm(2 * line.length)} cm. ` +
      `Góc ${angleNames.mid} = góc ${angleNames.side} ≈ ${deg(line.angleMid)} (đồng vị), nên ${cfg.p}${cfg.q} ∥ ${cfg.side}.`,
  );

  const lineOptions = [
    { value: 'MN', label: 'MN' },
    { value: 'NP', label: 'NP' },
    { value: 'MP', label: 'MP' },
  ];

  /** Grid lines, one per cell. */
  const gridX = Array.from({ length: COLS + 1 }, (_, k) => PAD + k * U);
  const gridY = Array.from({ length: ROWS + 1 }, (_, k) => PAD + k * U);

  /**
   * Filled mark of the angle at V between rays VP and VQ.
   * @param {Pt} V @param {Pt} P @param {Pt} Q @param {number} r
   */
  const arc = (V, P, Q, r) => sectorPath(V, directionTo(V, P), directionTo(V, Q), r);
  const sV = $derived(toSvg(line.V));

  // Vertex names sit outside the triangle and stay on the board at its edges.
  const vertexLabels = $derived.by(() => {
    const G = { x: (sA.x + sB.x + sC.x) / 3, y: (sA.y + sB.y + sC.y) / 3 };
    return [
      { n: 'A', ...labelSpot(sA, G, 24, W, H) },
      { n: 'B', ...labelSpot(sB, G, 24, W, H) },
      { n: 'C', ...labelSpot(sC, G, 24, W, H) },
    ];
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-4">
    <SegmentedControl label="Đường trung bình" options={lineOptions} bind:value={lineId} />
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="h-5 w-5 {focusRing}" bind:checked={showAll} />
      Hiện cả ba đường trung bình
    </label>
  </div>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Tam giác ABC trên lưới ô vuông 1 cm với các trung điểm M, N, P"
  >
    {#each gridX as x (x)}
      <line x1={x} y1={PAD} x2={x} y2={H - PAD} stroke="#E2E8F0" />
    {/each}
    {#each gridY as y (y)}
      <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#E2E8F0" />
    {/each}

    {#if showAll}
      <!-- The three midlines cut ABC into four equal triangles. -->
      <polygon points="{sA.x},{sA.y} {sM.x},{sM.y} {sN.x},{sN.y}" fill="#FDE68A" opacity="0.7" />
      <polygon points="{sM.x},{sM.y} {sB.x},{sB.y} {sP.x},{sP.y}" fill="#BBF7D0" opacity="0.7" />
      <polygon points="{sN.x},{sN.y} {sP.x},{sP.y} {sC.x},{sC.y}" fill="#BFDBFE" opacity="0.7" />
      <polygon points="{sM.x},{sM.y} {sN.x},{sN.y} {sP.x},{sP.y}" fill="#FBCFE8" opacity="0.7" />
    {/if}

    <polygon
      points="{sA.x},{sA.y} {sB.x},{sB.y} {sC.x},{sC.y}"
      fill={showAll ? 'none' : '#EEF2FF'}
      stroke="#334155"
      stroke-width="2"
      stroke-linejoin="round"
    />

    <!-- Corresponding angles. -->
    <path d={arc(lp, sV, lq, 22)} fill="#FCA5A5" opacity="0.8" />
    <path d={arc(lx, sV, ly, 22)} fill="#FCA5A5" opacity="0.8" />

    <line x1={lx.x} y1={lx.y} x2={ly.x} y2={ly.y} stroke="#4F46E5" stroke-width="4" />
    {#if showAll}
      <line x1={sM.x} y1={sM.y} x2={sN.x} y2={sN.y} stroke="#64748B" stroke-width="2" />
      <line x1={sN.x} y1={sN.y} x2={sP.x} y2={sP.y} stroke="#64748B" stroke-width="2" />
      <line x1={sM.x} y1={sM.y} x2={sP.x} y2={sP.y} stroke="#64748B" stroke-width="2" />
    {/if}
    <line x1={lp.x} y1={lp.y} x2={lq.x} y2={lq.y} stroke="#D7263D" stroke-width="4" />

    {#each [{ p: sM, n: 'M' }, { p: sN, n: 'N' }, { p: sP, n: 'P' }] as mp (mp.n)}
      <circle cx={mp.p.x} cy={mp.p.y} r="5" fill="#0F766E" stroke="#fff" stroke-width="1.5" />
      <text x={mp.p.x + 8} y={mp.p.y + 18} font-size="20" font-weight="700" fill="#0F766E"
        >{mp.n}</text
      >
    {/each}

    {#each vertexLabels as v (v.n)}
      <text
        x={v.x}
        y={v.y}
        dy="0.35em"
        text-anchor="middle"
        font-size="20"
        font-weight="700"
        fill="#1F2937"
        pointer-events="none">{v.n}</text
      >
    {/each}
    <DragPoint
      drag={dragA}
      r={10}
      color="#4F46E5"
      label="Đỉnh A. Kéo hoặc dùng phím mũi tên để dời từng ô."
    />
    <DragPoint
      drag={dragB}
      r={10}
      color="#4F46E5"
      label="Đỉnh B. Kéo hoặc dùng phím mũi tên để dời từng ô."
    />
    <DragPoint
      drag={dragC}
      r={10}
      color="#4F46E5"
      label="Đỉnh C. Kéo hoặc dùng phím mũi tên để dời từng ô."
    />
  </GeometryBoard>

  <p class="text-center text-sm text-slate-600">
    Kéo các đỉnh A, B, C (mỗi ô vuông cạnh 1 cm). Đoạn đỏ là đường trung bình {cfg.p}{cfg.q}, đoạn
    xanh là cạnh {cfg.side}.
  </p>

  <dl class="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
    <div class="rounded-lg bg-rose-50 p-3">
      <dt class="text-rose-800">{cfg.p}{cfg.q}</dt>
      <dd class="font-semibold tabular-nums">{cm(line.length)} cm</dd>
    </div>
    <div class="rounded-lg bg-indigo-50 p-3">
      <dt class="text-indigo-800">{cfg.side}</dt>
      <dd class="font-semibold tabular-nums">{cm(line.side)} cm</dd>
    </div>
    <div class="rounded-lg bg-slate-100 p-3">
      <dt class="text-slate-700">Góc {angleNames.mid}</dt>
      <dd class="font-semibold tabular-nums">{deg(line.angleMid)}</dd>
    </div>
    <div class="rounded-lg bg-slate-100 p-3">
      <dt class="text-slate-700">Góc {angleNames.side}</dt>
      <dd class="font-semibold tabular-nums">{deg(line.angleSide)}</dd>
    </div>
  </dl>

  <FeedbackNote tone="ok" text={feedback} />
</div>
