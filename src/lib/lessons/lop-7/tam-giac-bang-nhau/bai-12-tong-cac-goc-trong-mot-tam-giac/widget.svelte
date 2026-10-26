<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { along, directionTo, labelAt, sector, wedge } from '../_shared/triangle-math.js';
  import { placeVertex, readings } from './engine.js';

  const W = 400;
  const H = 320;
  const COLORS = { A: '#4F46E5', B: '#D97706', C: '#059669' };
  /** Centre of the straight angle the three torn angles are laid on. */
  const O = { x: 200, y: 300 };
  const R = 62;

  let mode = $state(/** @type {'ghep' | 'song-song' | 'goc-ngoai'} */ ('ghep'));
  let a = $state({ x: 130, y: 50 });
  let b = $state({ x: 40, y: 180 });
  let c = $state({ x: 300, y: 180 });
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const r = $derived(readings(a, b, c));

  /**
   * @param {{ x: number, y: number }} point
   * @param {() => [{ x: number, y: number }, { x: number, y: number }]} others
   */
  function dragOf(point, others) {
    return {
      point,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      keyStep: 10,
      keyShiftStep: 30,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => placeVertex(p, { x: point.x, y: point.y }, ...others()),
    };
  }
  const dragA = $derived(dragOf(a, () => [b, c]));
  const dragB = $derived(dragOf(b, () => [a, c]));
  const dragC = $derived(dragOf(c, () => [a, b]));

  const wA = $derived(wedge(a, b, c, 30));
  const wB = $derived(wedge(b, a, c, 30));
  const wC = $derived(wedge(c, a, b, 30));

  /** Line xy through A parallel to BC: Ax points the way C to B does. */
  const dirX = $derived(directionTo(c, b));
  const lineX = $derived(along(a, 120, dirX));
  const lineY = $derived(along(a, 120, dirX + 180));
  /** Angles at A equal to B and C (alternate interior angles). */
  const altB = $derived(wedge(a, lineX, b, 30));
  const altC = $derived(wedge(a, c, lineY, 30));

  /** Ray Cx, the extension of BC beyond C. */
  const ext = $derived.by(() => {
    const dir = directionTo(b, c);
    let len = 70;
    let p = along(c, len, dir);
    while (len > 25 && (p.x < 12 || p.x > W - 22 || p.y < 12 || p.y > H - 24)) {
      len -= 5;
      p = along(c, len, dir);
    }
    return p;
  });
  const wExt = $derived(wedge(c, a, ext, 24));

  /** The three angles torn off and laid side by side on a straight line. */
  const torn = $derived([
    { id: 'A', from: 0, sweep: r.A, color: COLORS.A },
    { id: 'B', from: r.A, sweep: r.B, color: COLORS.B },
    { id: 'C', from: r.A + r.B, sweep: r.C, color: COLORS.C },
  ]);

  /** @param {{ x: number, y: number }} v @param {number} mid @param {number} gap */
  const at = (v, mid, gap) => along(v, gap, mid);

  const feedback = $derived.by(() => {
    const sum = `Â + B̂ + Ĉ = ${r.A}° + ${r.B}° + ${r.C}° = 180°.`;
    if (mode === 'ghep')
      return `Ba góc ghép lại vừa khít một góc bẹt: ${sum} Kéo các đỉnh, tổng vẫn luôn là 180°.`;
    if (mode === 'song-song')
      return `Qua A kẻ xy song song với BC. xÂB = B̂ = ${r.B}° và yÂC = Ĉ = ${r.C}° (các cặp góc so le trong). Ba góc xÂB, BÂC, CÂy tạo thành góc bẹt xAy, nên ${sum}`;
    return `Góc ACx là góc ngoài tại đỉnh C, kề bù với góc C: ACx = 180° − ${r.C}° = ${r.exterior}°. Nó bằng tổng hai góc trong không kề với nó: Â + B̂ = ${r.A}° + ${r.B}° = ${r.A + r.B}°.`;
  });

  const kindText = $derived(
    r.kind === 'vuông'
      ? 'Tam giác ABC là tam giác vuông. Hai góc nhọn của nó phụ nhau (tổng bằng 90°).'
      : r.kind === 'tù'
        ? 'Tam giác ABC là tam giác tù: có một góc tù, hai góc còn lại nhọn.'
        : 'Tam giác ABC là tam giác nhọn: ba góc đều nhọn.',
  );

  /** @param {string | number} v */
  function changeMode(v) {
    mode = v === 'song-song' ? 'song-song' : v === 'goc-ngoai' ? 'goc-ngoai' : 'ghep';
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Quan sát"
    value={mode}
    onchange={changeMode}
    options={[
      { value: 'ghep', label: 'Ghép ba góc' },
      { value: 'song-song', label: 'Kẻ xy // BC' },
      { value: 'goc-ngoai', label: 'Góc ngoài' },
    ]}
  />

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    label="Tam giác ABC, kéo các đỉnh hoặc dùng phím mũi tên"
  >
    {#if mode === 'song-song'}
      <line
        x1={lineX.x}
        y1={lineX.y}
        x2={lineY.x}
        y2={lineY.y}
        stroke="#64748B"
        stroke-width="2"
        stroke-dasharray="6 4"
      />
      <text x={lineX.x} y={lineX.y - 6} font-size="13" font-style="italic" fill="#334155">x</text>
      <text x={lineY.x} y={lineY.y - 6} font-size="13" font-style="italic" fill="#334155">y</text>
      <path d={altB.path} fill={COLORS.B} fill-opacity="0.35" />
      <path d={altC.path} fill={COLORS.C} fill-opacity="0.35" />
    {/if}
    {#if mode === 'goc-ngoai'}
      <line x1={c.x} y1={c.y} x2={ext.x} y2={ext.y} stroke="#334155" stroke-width="2" />
      <text x={ext.x + 4} y={ext.y + 16} font-size="13" font-style="italic" fill="#334155">x</text>
      <path d={wExt.path} fill="#DB2777" fill-opacity="0.3" />
      {@const lp = at(c, wExt.mid, 40)}
      <text
        x={lp.x}
        y={lp.y + 4}
        font-size="12"
        font-weight="700"
        fill="#9D174D"
        text-anchor="middle">{r.exterior}°</text
      >
    {/if}

    <path d={wA.path} fill={COLORS.A} fill-opacity="0.3" />
    <path d={wB.path} fill={COLORS.B} fill-opacity="0.3" />
    <path d={wC.path} fill={COLORS.C} fill-opacity="0.3" />
    <polygon
      points="{a.x},{a.y} {b.x},{b.y} {c.x},{c.y}"
      fill="none"
      stroke="#1F2937"
      stroke-width="2"
      stroke-linejoin="round"
    />

    {#each [{ v: a, w: wA, m: r.A, col: COLORS.A }, { v: b, w: wB, m: r.B, col: COLORS.B }, { v: c, w: wC, m: r.C, col: COLORS.C }] as item, i (i)}
      {@const lp = at(item.v, item.w.mid, 44)}
      <text
        x={lp.x}
        y={lp.y + 4}
        font-size="12"
        font-weight="700"
        fill={item.col}
        text-anchor="middle">{item.m}°</text
      >
    {/each}

    {#each [{ p: a, n: 'A' }, { p: b, n: 'B' }, { p: c, n: 'C' }] as v (v.n)}
      {@const lp = labelAt(v.p, a, b, c, 22)}
      <text x={lp.x} y={lp.y} font-size="15" font-weight="700" fill="#111827" text-anchor="middle"
        >{v.n}</text
      >
    {/each}

    <DragPoint drag={dragA} r={9} label="Đỉnh A, kéo hoặc dùng phím mũi tên" />
    <DragPoint drag={dragB} r={9} label="Đỉnh B, kéo hoặc dùng phím mũi tên" />
    <DragPoint drag={dragC} r={9} label="Đỉnh C, kéo hoặc dùng phím mũi tên" />

    {#if mode === 'ghep'}
      <line
        x1={O.x - R - 40}
        y1={O.y}
        x2={O.x + R + 40}
        y2={O.y}
        stroke="#334155"
        stroke-width="2"
      />
      {#each torn as t (t.id)}
        {@const lp = along(O, R * 0.62, t.from + t.sweep / 2)}
        <path d={sector(O, t.from, t.sweep, R)} fill={t.color} fill-opacity="0.45" stroke="#fff" />
        <text
          x={lp.x}
          y={lp.y + 4}
          font-size="12"
          font-weight="700"
          fill="#111827"
          text-anchor="middle">{t.id}</text
        >
      {/each}
      <text x={O.x + R + 4} y={O.y - 8} font-size="12" fill="#334155">180°</text>
    {/if}
  </GeometryBoard>

  <p class="text-sm text-slate-600">
    Kéo ba đỉnh (hoặc chọn một đỉnh rồi dùng phím mũi tên, giữ Shift để đi xa hơn). Số đo được làm
    tròn đến độ.
  </p>
  <div class="space-y-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-800" aria-live="polite">
    <p>{feedback}</p>
    <p class="font-semibold">{kindText}</p>
  </div>
</div>
