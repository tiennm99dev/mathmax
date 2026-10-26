<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { SHAPES, dist, imagePolygon, perimeter } from './engine.js';

  const W = 400;
  const H = 300;
  /** SVG units per grid square (ô). */
  const UNIT = 20;
  const GRID_X = Array.from({ length: W / UNIT + 1 }, (_, i) => i * UNIT);
  const GRID_Y = Array.from({ length: H / UNIT + 1 }, (_, i) => i * UNIT);
  const NAMES = ['A', 'B', 'C', 'D', 'E', 'G', 'H'];
  const SHAPE_OPTIONS = [
    { value: 'tam-giac', label: 'Tam giác' },
    { value: 'nha', label: 'Ngôi nhà' },
    { value: 'mui-ten', label: 'Mũi tên' },
  ];
  const MODES = [
    { value: 've', label: 'Vẽ hình phối cảnh' },
    { value: 'tim', label: 'Tìm tâm phối cảnh' },
  ];

  /** @typedef {{ x: number, y: number }} Pt */

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  let mode = $state('ve');

  // Drawing mode: a shape with draggable vertices, a draggable centre O and k.
  let shapeKey = $state('tam-giac');
  let verts = $state(SHAPES['tam-giac'].map((p) => ({ ...p })));
  let O = $state({ x: 100, y: 220 });
  let k = $state(1.5);

  const img = $derived(imagePolygon(O, k, verts));

  /** @param {string | number} key */
  function pickShape(key) {
    verts = SHAPES[/** @type {keyof typeof SHAPES} */ (key)].map((p) => ({ ...p }));
  }

  // Finding mode: H and H′ are given; the learner places a guess G for O.
  const PUZZLES = [
    {
      centre: { x: 60, y: 250 },
      k: 2.5,
      pts: [
        { x: 130, y: 170 },
        { x: 160, y: 190 },
        { x: 120, y: 200 },
      ],
    },
    {
      centre: { x: 340, y: 60 },
      k: 0.4,
      pts: [
        { x: 140, y: 160 },
        { x: 240, y: 210 },
        { x: 120, y: 260 },
      ],
    },
  ];
  let puzzle = $state(0);
  let guess = $state({ x: 300, y: 250 });
  let showLines = $state(false);
  const P = $derived(PUZZLES[puzzle]);
  const pImg = $derived(imagePolygon(P.centre, P.k, P.pts));
  const found = $derived(dist(guess, P.centre) < 8);

  function nextPuzzle() {
    puzzle = (puzzle + 1) % PUZZLES.length;
    guess = { x: puzzle === 0 ? 300 : 60, y: 250 };
    showLines = false;
  }

  /** @param {number} v */
  const snap5 = (v) => Math.round(v / 5) * 5;
  /** @param {Pt} p */
  const snap = (p) => ({ x: snap5(p.x), y: snap5(p.y) });

  /** @param {Pt} point */
  const dragOf = (point) => ({
    point,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    projector: snap,
    keyStep: 5,
    keyShiftStep: 20,
  });

  /** @param {Pt[]} pts */
  const poly = (pts) => pts.map((p) => `${p.x},${p.y}`).join(' ');
  /** @param {number} v */
  const len = (v) => formatFixed(v / UNIT, 2);
  /** @param {number} v */
  const ratio = (v) => formatFixed(v, 2);

  /**
   * A dashed guide through `from` and `to`, carried on past `to` far enough
   * to cross the board.
   * @param {Pt} from @param {Pt} to
   */
  function guide(from, to) {
    const d = dist(from, to) || 1;
    const ux = (to.x - from.x) / d;
    const uy = (to.y - from.y) / d;
    return {
      x1: from.x - ux * 600,
      y1: from.y - uy * 600,
      x2: to.x + ux * 600,
      y2: to.y + uy * 600,
    };
  }

  /**
   * Where to write a vertex name: 13 units from the vertex, away from the
   * centroid of its polygon, so names sit outside the shape.
   * @param {Pt} p @param {Pt[]} pts
   */
  function nameAt(p, pts) {
    const gx = pts.reduce((sum, q) => sum + q.x, 0) / pts.length;
    const gy = pts.reduce((sum, q) => sum + q.y, 0) / pts.length;
    const d = Math.hypot(p.x - gx, p.y - gy) || 1;
    return { x: p.x + ((p.x - gx) / d) * 13, y: p.y + ((p.y - gy) / d) * 13 + 4 };
  }

  const drawFeedback = $derived.by(() => {
    const kt = formatNumber(k, 2);
    if (k === 1) return `k = 1: H′ trùng với H.`;
    return k > 1
      ? `k = ${kt} > 1: H′ là hình phóng to của H, mọi đoạn thẳng dài gấp ${kt} lần.`
      : `k = ${kt} < 1: H′ là hình thu nhỏ của H, mọi đoạn thẳng chỉ bằng ${kt} lần.`;
  });

  const guessRatios = $derived(
    P.pts.map((p, i) => {
      const d = dist(guess, p);
      return d < 1e-9 ? null : dist(guess, pImg[i]) / d;
    }),
  );
</script>

<div class="space-y-4">
  <SegmentedControl label="Hoạt động" options={MODES} bind:value={mode} />

  {#if mode === 've'}
    <SegmentedControl
      label="Hình H"
      options={SHAPE_OPTIONS}
      bind:value={shapeKey}
      onchange={pickShape}
    />
  {/if}

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    label={mode === 've'
      ? 'Hình H, tâm phối cảnh O và hình H′ đồng dạng phối cảnh với H'
      : 'Hai hình đồng dạng phối cảnh H và H′; tìm tâm phối cảnh'}
  >
    {#each GRID_X as x (x)}
      <line x1={x} y1="0" x2={x} y2={H} stroke="#F1F5F9" />
    {/each}
    {#each GRID_Y as y (y)}
      <line x1="0" y1={y} x2={W} y2={y} stroke="#F1F5F9" />
    {/each}

    {#if mode === 've'}
      {#each verts as v, i (i)}
        {@const far = k >= 1 ? img[i] : v}
        <line
          x1={O.x}
          y1={O.y}
          x2={far.x}
          y2={far.y}
          stroke="#94A3B8"
          stroke-width="1.2"
          stroke-dasharray="4 4"
        />
      {/each}
      <polygon
        points={poly(img)}
        fill="#F46036"
        fill-opacity="0.18"
        stroke="#F46036"
        stroke-width="2.5"
      />
      <polygon
        points={poly(verts)}
        fill="#4F46E5"
        fill-opacity="0.2"
        stroke="#4F46E5"
        stroke-width="2.5"
      />
      {#each img as p, i (i)}
        {@const at = nameAt(p, img)}
        <text x={at.x} y={at.y} text-anchor="middle" font-size="12" font-weight="700" fill="#C2410C"
          >{NAMES[i]}′</text
        >
      {/each}
      {#each verts as v, i (i)}
        <DragPoint
          drag={dragOf(v)}
          r={7}
          color="#4F46E5"
          name={NAMES[i]}
          nameDx={-16}
          nameDy={-8}
          label="Đỉnh {NAMES[i]} của hình H, kéo hoặc dùng phím mũi tên"
        />
      {/each}
      <DragPoint
        drag={dragOf(O)}
        r={9}
        color="#D7263D"
        name="O"
        nameDx={-18}
        nameDy={18}
        label="Tâm phối cảnh O, kéo hoặc dùng phím mũi tên"
      />
    {:else}
      {#if showLines}
        {#each P.pts as p, i (i)}
          {@const g = guide(pImg[i], p)}
          <line {...g} stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4 4" />
        {/each}
      {/if}
      <polygon
        points={poly(P.pts)}
        fill="#4F46E5"
        fill-opacity="0.2"
        stroke="#4F46E5"
        stroke-width="2.5"
      />
      <polygon
        points={poly(pImg)}
        fill="#F46036"
        fill-opacity="0.18"
        stroke="#F46036"
        stroke-width="2.5"
      />
      {#each P.pts as p, i (i)}
        {@const at = nameAt(p, P.pts)}
        {@const at2 = nameAt(pImg[i], pImg)}
        <text x={at.x} y={at.y} text-anchor="middle" font-size="12" font-weight="700" fill="#3730A3"
          >{NAMES[i]}</text
        >
        <text
          x={at2.x}
          y={at2.y}
          text-anchor="middle"
          font-size="12"
          font-weight="700"
          fill="#C2410C">{NAMES[i]}′</text
        >
      {/each}
      <DragPoint
        drag={dragOf(guess)}
        r={9}
        color={found ? '#059669' : '#D7263D'}
        name="O"
        nameDx={-18}
        nameDy={18}
        label="Điểm O em đoán là tâm phối cảnh, kéo hoặc dùng phím mũi tên"
      />
    {/if}
  </GeometryBoard>

  {#if mode === 've'}
    <SliderField
      label="Tỉ số k"
      bind:value={k}
      min={0.25}
      max={2.5}
      step={0.25}
      format={(v) => formatNumber(v, 2)}
    />
    <div class="grid gap-2 text-sm tabular-nums sm:grid-cols-2">
      <p>
        OA = {len(dist(O, verts[0]))} ô, OA′ = {len(dist(O, img[0]))} ô, OA′ : OA =
        <strong>{dist(O, verts[0]) > 0 ? ratio(dist(O, img[0]) / dist(O, verts[0])) : '—'}</strong>
      </p>
      <p>
        AB = {len(dist(verts[0], verts[1]))} ô, A′B′ = {len(dist(img[0], img[1]))} ô, A′B′ : AB =
        <strong
          >{dist(verts[0], verts[1]) > 0
            ? ratio(dist(img[0], img[1]) / dist(verts[0], verts[1]))
            : '—'}</strong
        >
      </p>
      <p class="sm:col-span-2">
        Chu vi H = {len(perimeter(verts))} ô, chu vi H′ = {len(perimeter(img))} ô.
      </p>
    </div>
    <FeedbackNote tone="info" text={drawFeedback} />
  {:else}
    <div class="flex flex-wrap gap-3">
      <button type="button" class={button.secondary} onclick={() => (showLines = !showLines)}
        >{showLines ? 'Ẩn' : 'Hiện'} các đường AA′, BB′, CC′</button
      >
      <button type="button" class={button.quiet} onclick={nextPuzzle}>Đổi đề</button>
    </div>
    <p class="text-sm tabular-nums">
      Với điểm O đang đặt:
      {#each guessRatios as r, i (i)}
        <span class="mr-3 inline-block"
          >O{NAMES[i]}′ : O{NAMES[i]} = <strong>{r === null ? '—' : ratio(r)}</strong></span
        >
      {/each}
    </p>
    <FeedbackNote
      tone={found ? 'ok' : 'info'}
      text={found
        ? `Đúng rồi! Các đường AA′, BB′, CC′ đồng quy tại O, và OA′ : OA = OB′ : OB = OC′ : OC = ${formatNumber(P.k, 2)}. Đó là tỉ số đồng dạng phối cảnh.`
        : 'Kéo điểm O tới chỗ ba tỉ số OA′ : OA, OB′ : OB, OC′ : OC bằng nhau. Gợi ý: tâm phối cảnh nằm trên mọi đường thẳng nối hai điểm tương ứng.'}
    />
  {/if}
</div>
