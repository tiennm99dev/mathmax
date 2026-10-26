<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TransversalFigure from '../_shared/transversal-figure.svelte';
  import { along, degText, directionTo } from '../_shared/angle.js';
  import { PAIRS, PAIR_NAME, sub } from '../_shared/transversal.js';
  import { parallelPair, transversalDir } from './engine.js';

  const A = { x: 200, y: 95 };
  const GAP = 140;
  const HANDLE = 50;
  const LO = 40;
  const HI = 140;

  let gamma = $state(62);
  let P = $state(along(A, HANDLE, 62));
  /** @type {'dong-vi' | 'so-le-trong' | 'trong-cung-phia'} */
  let kind = $state('so-le-trong');
  let index = $state(0);
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  // b is the horizontal line GAP below a; c meets it at B.
  const B = $derived(along(A, GAP / Math.sin((gamma * Math.PI) / 180), gamma + 180));
  const pair = $derived(parallelPair(gamma, kind, index));

  /** @param {number} next */
  function setGamma(next) {
    gamma = Math.max(LO, Math.min(HI, next));
    P = along(A, HANDLE, gamma);
  }

  const drag = $derived({
    point: P,
    svg: () => svgEl ?? null,
    viewBox: { w: 400, h: 300 },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => along(A, HANDLE, transversalDir(directionTo(A, p), LO, HI)),
    onChange: () => {
      gamma = transversalDir(directionTo(A, P), LO, HI);
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setGamma(gamma + (dx < 0 || dy < 0 ? 1 : -1) * (big ? 10 : 1)),
  });

  const pairOptions = $derived(
    PAIRS[kind].map(([i, j], k) => ({ value: k, label: `Â${sub(i)} và B̂${sub(j)}` })),
  );

  /** @param {string | number} v */
  function changeKind(v) {
    kind =
      v === 'dong-vi' ? 'dong-vi' : v === 'trong-cung-phia' ? 'trong-cung-phia' : 'so-le-trong';
    index = 0;
  }

  const feedback = $derived.by(() => {
    const p = pair;
    const names = `Â${sub(p.i)} và B̂${sub(p.j)}`;
    const values = `Â${sub(p.i)} = ${degText(p.atA)}, B̂${sub(p.j)} = ${degText(p.atB)}`;
    if (kind === 'trong-cung-phia')
      return `${names} là hai góc trong cùng phía: ${values}, tổng bằng ${degText(p.sum)}. Vì a // b nên hai góc trong cùng phía luôn bù nhau.`;
    return `${names} là hai góc ${PAIR_NAME[kind]}: ${values}. Vì a // b nên chúng luôn bằng nhau, dù c nghiêng thế nào.`;
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Cặp góc"
      value={kind}
      onchange={changeKind}
      options={[
        { value: 'so-le-trong', label: 'So le trong' },
        { value: 'dong-vi', label: 'Đồng vị' },
        { value: 'trong-cung-phia', label: 'Trong cùng phía' },
      ]}
    />
    <SegmentedControl label="Chọn cặp" bind:value={index} options={pairOptions} />
  </div>

  <TransversalFigure
    bind:svgEl
    {A}
    {B}
    beta={0}
    {gamma}
    highlight={[
      { at: 'A', i: pair.i, color: '#4F46E5' },
      { at: 'B', i: pair.j, color: '#059669' },
    ]}
    label="Hai đường thẳng song song a và b bị đường thẳng c cắt tại A và B; đường thẳng c xoay được quanh A"
  >
    <DragPoint
      {drag}
      r={10}
      color="#7C3AED"
      label="Điểm trên đường thẳng c: kéo hoặc dùng phím mũi tên để xoay c quanh A, mỗi bước 1 độ, giữ Shift để bước 10 độ"
    />
  </TransversalFigure>

  <p
    class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800"
    aria-live="polite"
  >
    {feedback}
  </p>
</div>
