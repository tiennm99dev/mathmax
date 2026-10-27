<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatFixed } from '#lib/core/number-format.js';
  import { along, arcPath, bisectorDir, directionTo } from '#lib/core/visuals/angle-math.js';
  import { angleAt, dist } from '#lib/geom-engine/plane.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { units } from '../_shared/quad.js';

  const W = 400;
  const H = 280;
  // The long base DC lies on y = BASE_Y; D stays put, C slides along it.
  const BASE_Y = 230;
  const D = { x: 50, y: BASE_Y };
  const TOP_MIN = 60;
  const TOP_MAX = 170;
  const MIN_BASE = 40;
  // Within this many SVG units of the symmetric (or upright) position, a
  // vertex snaps onto it, so the special trapezoids can be reached exactly.
  const SNAP = 7;

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let A = $state({ x: 110, y: 100 });
  let B = $state({ x: 250, y: 100 });
  let C = $state({ x: 350, y: BASE_Y });
  let showDiagonals = $state(true);
  let announcement = $state('');
  /** @type {ReturnType<typeof setTimeout> | null} */ let timer = null;

  const symX = $derived(D.x + C.x - A.x);
  const angD = $derived(angleAt(D, C, A));
  const angC = $derived(angleAt(C, D, B));
  const isosceles = $derived(Math.abs(B.x - symX) < 1e-6);
  const shownD = $derived(Math.round(angD));
  const shownC = $derived(isosceles ? shownD : Math.round(angC));
  const ad = $derived(units(dist(A, D)));
  const bc = $derived(isosceles ? ad : units(dist(B, C)));
  const ac = $derived(units(dist(A, C)));
  const bd = $derived(isosceles ? ac : units(dist(B, D)));
  const square = $derived(Math.abs(A.x - D.x) < 1e-6 || Math.abs(B.x - C.x) < 1e-6);
  // Equal legs are judged on the printed lengths: a trapezoid whose legs are
  // parallel has equal legs without being isosceles, and the table must say so.
  const legsEqual = $derived(ad === bc);
  const diagonalsEqual = $derived(ac === bd);

  /** @param {number} v */
  const len = (v) => formatFixed(v, 1);

  const feedback = $derived.by(() => {
    if (isosceles) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Hai góc kề đáy DC bằng nhau (${shownD}°), nên ABCD là hình thang cân. Quan sát: AD = BC = ${len(ad)} và hai đường chéo AC = BD = ${len(ac)}.`,
      };
    }
    const kind = square ? 'hình thang vuông' : 'hình thang';
    if (legsEqual) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Hai cạnh bên AD = BC = ${len(ad)} nhưng D̂ = ${shownD}°, Ĉ = ${shownC}°: hai góc kề đáy DC không bằng nhau, nên ABCD là ${kind} nhưng không cân. Hình thang có hai cạnh bên bằng nhau chưa chắc là hình thang cân. Hai đường chéo: AC = ${len(ac)}, BD = ${len(bd)}.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `D̂ = ${shownD}°, Ĉ = ${shownC}°: hai góc kề đáy DC chưa bằng nhau, nên ABCD là ${kind} nhưng không cân. Hai cạnh bên AD = ${len(ad)}, BC = ${len(bc)}; hai đường chéo AC = ${len(ac)}, BD = ${len(bd)}.`,
    };
  });

  function announce() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      announcement = feedback.text;
    }, 400);
  }

  /**
   * Keeps the top base AB parallel to DC and at least MIN_BASE long, then,
   * when `snap` is set, snaps B to the isosceles (or upright) position when
   * it is close, so B follows while A or C moves.
   * @param {boolean} [snap]
   */
  function fixB(snap = true) {
    B.y = A.y;
    B.x = Math.max(A.x + MIN_BASE, Math.min(W - 20, B.x));
    if (!snap) return;
    if (Math.abs(B.x - symX) < SNAP && symX > A.x + MIN_BASE - 1e-9) B.x = symX;
    else if (Math.abs(B.x - C.x) < SNAP) B.x = C.x;
  }

  /**
   * Snaps `x` onto `target` only when it comes closer to it than `from`, so a
   * small arrow-key step can still leave a snapped position.
   * @param {number} x @param {number} from @param {number} target
   */
  const snapIn = (x, from, target) => {
    const d = Math.abs(x - target);
    return d < SNAP && d < Math.abs(from - target);
  };

  const dragA = $derived({
    point: A,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: 2,
    keyShiftStep: 10,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      let x = Math.max(20, Math.min(C.x - MIN_BASE - 10, p.x));
      if (snapIn(x, A.x, D.x)) x = D.x;
      return { x, y: Math.max(TOP_MIN, Math.min(TOP_MAX, p.y)) };
    },
    onChange: () => {
      fixB();
      announce();
    },
  });
  const dragB = $derived({
    point: B,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: 2,
    keyShiftStep: 10,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      let x = p.x;
      if (symX > A.x + MIN_BASE - 1e-9 && snapIn(x, B.x, symX)) x = symX;
      else if (snapIn(x, B.x, C.x)) x = C.x;
      return { x, y: A.y };
    },
    onChange: () => {
      fixB(false);
      announce();
    },
  });
  const dragC = $derived({
    point: C,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: 2,
    keyShiftStep: 10,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => ({ x: Math.max(A.x + MIN_BASE + 10, Math.min(W - 20, p.x)), y: BASE_Y }),
    onChange: () => {
      fixB();
      announce();
    },
  });

  function makeIsosceles() {
    // When the symmetric B would leave AB too short, widen DC, then move A left.
    if (symX < A.x + MIN_BASE) C.x = W - 20;
    if (D.x + C.x - A.x < A.x + MIN_BASE) A.x = (D.x + C.x - MIN_BASE) / 2;
    B.y = A.y;
    B.x = D.x + C.x - A.x;
    announce();
  }

  function reset() {
    A.x = 110;
    A.y = 100;
    B.x = 250;
    B.y = 100;
    C.x = 350;
    announce();
  }

  /**
   * Where the angle label of vertex `o` goes: along the bisector of its angle,
   * so it stays inside the angle however the top base is dragged.
   * @param {{ x: number, y: number }} o @param {{ x: number, y: number }} p
   * @param {{ x: number, y: number }} q @param {number} r
   */
  const inAngle = (o, p, q, r) => along(o, r, bisectorDir(directionTo(o, p), directionTo(o, q)));
  const labelA = $derived(inAngle(A, D, B, 38));
  // When the two top labels would meet, B's moves further down its bisector.
  const labelB = $derived.by(() => {
    const near = inAngle(B, A, C, 38);
    return Math.abs(near.x - labelA.x) < 36 ? inAngle(B, A, C, 58) : near;
  });

  const arcs = $derived([
    { o: A, p: D, q: B, v: 180 - shownD, name: 'A' },
    { o: B, p: A, q: C, v: 180 - shownC, name: 'B' },
    { o: C, p: B, q: D, v: shownC, name: 'C' },
    { o: D, p: C, q: A, v: shownD, name: 'D' },
  ]);
</script>

<div class="space-y-4">
  <div aria-live="polite" aria-atomic="true" class="sr-only">{announcement}</div>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-lg"
    label="Hình thang ABCD có đáy AB song song với đáy DC"
  >
    <polygon
      points={pointsAttr([A, B, C, D])}
      fill={isosceles ? '#10B981' : '#6366F1'}
      fill-opacity="0.12"
      stroke="#1F2937"
      stroke-width="2.5"
    />
    {#if showDiagonals}
      <line
        x1={A.x}
        y1={A.y}
        x2={C.x}
        y2={C.y}
        stroke="#D7263D"
        stroke-width="2"
        stroke-dasharray="6 5"
      />
      <line
        x1={B.x}
        y1={B.y}
        x2={D.x}
        y2={D.y}
        stroke="#1B998B"
        stroke-width="2"
        stroke-dasharray="6 5"
      />
    {/if}
    {#if isosceles}
      <TickMarks from={A} to={D} count={1} color="#047857" />
      <TickMarks from={B} to={C} count={1} color="#047857" />
    {/if}

    {#each arcs as a (a.name)}
      {@const d1 = directionTo(a.o, a.p)}
      {@const d2 = directionTo(a.o, a.q)}
      <path
        d={arcPath(a.o, d1, d2, 20)}
        fill="none"
        stroke={a.name === 'C' || a.name === 'D' ? '#D97706' : '#4F46E5'}
        stroke-width="2"
      />
    {/each}
    <text x={D.x + 32} y={D.y - 10} font-size="13" font-weight="600" fill="#B45309">{shownD}°</text>
    <text
      x={C.x - 32}
      y={C.y - 10}
      text-anchor="end"
      font-size="13"
      font-weight="600"
      fill="#B45309">{shownC}°</text
    >
    <text
      x={labelA.x}
      y={labelA.y + 5}
      text-anchor="middle"
      font-size="13"
      font-weight="600"
      fill="#3730A3">{180 - shownD}°</text
    >
    <text
      x={labelB.x}
      y={labelB.y + 5}
      text-anchor="middle"
      font-size="13"
      font-weight="600"
      fill="#3730A3">{180 - shownC}°</text
    >

    <circle cx={D.x} cy={D.y} r="5" fill="#1F2937" />
    <text x={D.x - 6} y={D.y + 22} font-size="15" font-weight="700" fill="#1F2937">D</text>
    <DragPoint drag={dragA} r={10} label="Đỉnh A: kéo hoặc dùng phím mũi tên" />
    <DragPoint drag={dragB} r={10} label="Đỉnh B: kéo sang trái, phải hoặc dùng phím mũi tên" />
    <DragPoint
      drag={dragC}
      r={10}
      color="#D97706"
      label="Đỉnh C: kéo dọc đáy DC hoặc dùng phím mũi tên"
    />
    <text x={A.x - 6} y={A.y - 16} font-size="15" font-weight="700" fill="#1F2937">A</text>
    <text x={B.x - 6} y={B.y - 16} font-size="15" font-weight="700" fill="#1F2937">B</text>
    <text x={C.x - 6} y={C.y + 26} font-size="15" font-weight="700" fill="#1F2937">C</text>
  </GeometryBoard>

  <div class="flex flex-wrap items-center gap-3">
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" bind:checked={showDiagonals} class="h-5 w-5 accent-indigo-600" />
      Hiện hai đường chéo
    </label>
    <button type="button" class={button.secondary} onclick={makeIsosceles}
      >Làm thành hình thang cân</button
    >
    <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <div class="overflow-x-auto">
    <table class="w-full min-w-72 text-sm tabular-nums">
      <thead>
        <tr class="text-left text-slate-600">
          <th class="py-1 pr-3 font-semibold">So sánh</th>
          <th class="py-1 pr-3 font-semibold">Số đo</th>
          <th class="py-1 font-semibold">Bằng nhau?</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-t border-slate-200">
          <td class="py-1 pr-3">Góc kề đáy D̂, Ĉ</td>
          <td class="py-1 pr-3">{shownD}°, {shownC}°</td>
          <td class="py-1">{isosceles ? 'Có' : 'Không'}</td>
        </tr>
        <tr class="border-t border-slate-200">
          <td class="py-1 pr-3">Cạnh bên AD, BC</td>
          <td class="py-1 pr-3">{len(ad)}; {len(bc)}</td>
          <td class="py-1">{legsEqual ? 'Có' : 'Không'}</td>
        </tr>
        <tr class="border-t border-slate-200">
          <td class="py-1 pr-3">Đường chéo AC, BD</td>
          <td class="py-1 pr-3">{len(ac)}; {len(bd)}</td>
          <td class="py-1">{diagonalsEqual ? 'Có' : 'Không'}</td>
        </tr>
        <tr class="border-t border-slate-200">
          <td class="py-1 pr-3">Â + D̂ (hai góc kề cạnh bên)</td>
          <td class="py-1 pr-3">{180 - shownD}° + {shownD}° = 180°</td>
          <td class="py-1">Luôn bù nhau</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
