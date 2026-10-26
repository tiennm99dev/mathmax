<script>
  import { button } from '#lib/core/ui.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TransversalFigure from '../_shared/transversal-figure.svelte';
  import { along, degText, directionTo } from '#lib/core/visuals/angle-math.js';
  import { PAIRS, PAIR_NAME, lineDir, sub } from '../_shared/transversal.js';
  import { GAMMAS, LIMIT, freshBeta, pairStatus } from './engine.js';

  const A = { x: 210, y: 92 };
  const SPAN = 165;
  const HANDLE = 120;
  const W = 400;

  let gi = $state(0);
  let beta = $state(14);
  /** @type {'dong-vi' | 'so-le-trong'} */
  let kind = $state('dong-vi');
  let index = $state(0);
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const gamma = $derived(GAMMAS[gi]);
  const B = $derived(along(A, SPAN, gamma + 180));
  // The handle sits on the end of b that stays inside the board.
  const side = $derived(B.x > W / 2 ? 180 : 0);
  let H = $state({ x: 0, y: 0 });
  $effect.pre(() => {
    const p = along(B, HANDLE, beta + side);
    H.x = p.x;
    H.y = p.y;
  });

  const status = $derived(pairStatus(beta, gamma, kind, index));

  /** @param {number} next */
  function setBeta(next) {
    beta = Math.max(-LIMIT, Math.min(LIMIT, next));
  }

  const drag = $derived({
    point: H,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: 300 },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => along(B, HANDLE, lineDir(directionTo(B, p), LIMIT) + side),
    onChange: () => setBeta(lineDir(directionTo(B, H), LIMIT)),
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const turn = dx < 0 || dy < 0 ? 1 : -1;
      setBeta(beta + turn * (side === 180 ? -1 : 1) * (big ? 5 : 1));
    },
  });

  const pairOptions = $derived(
    PAIRS[kind].map(([i, j], k) => ({ value: k, label: `Â${sub(i)} và B̂${sub(j)}` })),
  );

  /** @param {string | number} v */
  function changeKind(v) {
    kind = v === 'so-le-trong' ? 'so-le-trong' : 'dong-vi';
    index = 0;
  }

  function newTransversal() {
    gi = (gi + 1) % GAMMAS.length;
    beta = freshBeta(Math.random);
  }

  const feedback = $derived.by(() => {
    const s = status;
    const pair = `Â${sub(s.i)} và B̂${sub(s.j)} là hai góc ${PAIR_NAME[kind]}`;
    if (s.equal)
      return `${pair}, và Â${sub(s.i)} = B̂${sub(s.j)} = ${degText(s.atA)}. Theo dấu hiệu nhận biết, a // b. Hai đường thẳng không còn điểm chung nào.`;
    return `${pair}: Â${sub(s.i)} = ${degText(s.atA)}, B̂${sub(s.j)} = ${degText(s.atB)}. Hai góc chưa bằng nhau, a và b cắt nhau. Xoay b cho đến khi hai góc bằng nhau.`;
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Cặp góc"
      value={kind}
      onchange={changeKind}
      options={[
        { value: 'dong-vi', label: 'Đồng vị' },
        { value: 'so-le-trong', label: 'So le trong' },
      ]}
    />
    <SegmentedControl label="Chọn cặp" bind:value={index} options={pairOptions} />
  </div>

  <TransversalFigure
    bind:svgEl
    {A}
    {B}
    {beta}
    {gamma}
    highlight={[
      { at: 'A', i: status.i, color: '#4F46E5' },
      { at: 'B', i: status.j, color: status.equal ? '#059669' : '#D97706' },
    ]}
    label="Đường thẳng c cắt hai đường thẳng a và b tại A và B; đường thẳng b xoay được quanh B"
  >
    <DragPoint
      {drag}
      r={10}
      color="#0F766E"
      label="Điểm trên đường thẳng b: kéo hoặc dùng phím mũi tên để xoay b quanh B, mỗi bước 1 độ, giữ Shift để bước 5 độ"
    />
  </TransversalFigure>

  <p
    class="rounded-lg border p-3 text-sm {status.equal
      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
      : 'border-amber-300 bg-amber-50 text-amber-950'}"
    aria-live="polite"
  >
    {feedback}
  </p>

  <button type="button" class={button.quiet} onclick={newTransversal}>Đổi cát tuyến</button>
</div>
