<script>
  import { button } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { along, directionTo, measure, norm, placeOf } from '../_shared/angle.js';
  import { arcPath, insidePath } from '../_shared/angle-draw.js';
  import { challengeResult } from './engine.js';

  const W = 400;
  const H = 300;
  const O = { x: 200, y: 165 };
  const R = 105;
  const STEP = 5;
  const START = { a: 15, b: 115, m: { x: 235, y: 95 } };

  /** Fixed points of the challenge, named as in the book's figures. */
  const MARKS = [
    { name: 'P', x: 330, y: 95 },
    { name: 'Q', x: 140, y: 60 },
    { name: 'R', x: 320, y: 250 },
    { name: 'S', x: 70, y: 200 },
    { name: 'T', x: 250, y: 45 },
  ];

  /** @param {number} deg */
  const onCircle = (deg) => along(O, R, norm(STEP * Math.round(deg / STEP)));

  let A = $state(onCircle(START.a));
  let B = $state(onCircle(START.b));
  let M = $state({ ...START.m });
  /** @type {Record<string, boolean>} */
  let picked = $state({});
  /** @type {null | ReturnType<typeof challengeResult>} */
  let verdict = $state(null);
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const a = $derived(directionTo(O, A));
  const b = $derived(directionTo(O, B));
  const m = $derived(measure(a, b));
  const place = $derived(placeOf(O, a, b, M));
  const xEnd = $derived(along(O, 520, a));
  const yEnd = $derived(along(O, 520, b));
  const xLabel = $derived(along(O, 150, a));
  const yLabel = $derived(along(O, 150, b));

  /**
   * @param {() => { x: number, y: number }} get
   * @param {(p: { x: number, y: number }) => void} set
   */
  function rayDrag(get, set) {
    const point = get();
    return {
      point,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => onCircle(directionTo(O, p)),
      onChange: () => (verdict = null),
      /** @param {number} dx @param {number} dy @param {boolean} big */
      onKeyMove: (dx, dy, big) => {
        const turn = dx > 0 || dy < 0 ? 1 : -1;
        set(onCircle(directionTo(O, point) + turn * (big ? 3 : 1) * STEP));
        verdict = null;
      },
    };
  }

  const dragA = $derived(
    rayDrag(
      () => A,
      (p) => (A = p),
    ),
  );
  const dragB = $derived(
    rayDrag(
      () => B,
      (p) => (B = p),
    ),
  );
  const dragM = $derived({
    point: M,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 10,
    keyStep: 5,
    keyShiftStep: 20,
  });

  const angleText = $derived.by(() => {
    if (m === 0) return 'Hai tia Ox và Oy đang trùng nhau. Hãy xoay một tia ra để có góc.';
    if (m === 180)
      return 'Hai tia Ox và Oy là hai tia đối nhau: góc xOy là góc bẹt. Đỉnh O, hai cạnh Ox, Oy.';
    return 'Góc xOy (cũng gọi là góc yOx, góc AOB hay góc O): đỉnh là O, hai cạnh là tia Ox và tia Oy.';
  });

  const pointText = $derived.by(() => {
    switch (place) {
      case 'dinh':
        return 'M trùng với đỉnh O, nên M không nằm trong góc xOy.';
      case 'canh-x':
        return 'M nằm trên cạnh Ox. Điểm trên cạnh không phải điểm trong của góc.';
      case 'canh-y':
        return 'M nằm trên cạnh Oy. Điểm trên cạnh không phải điểm trong của góc.';
      case 'trong':
        return 'M nằm trong góc xOy: M là một điểm trong của góc xOy.';
      case 'bet':
        return 'Góc xOy đang là góc bẹt; ta chỉ xét điểm trong của góc không phải góc bẹt.';
      case 'trung':
        return 'Hai cạnh trùng nhau nên chưa có góc để xét.';
      default:
        return 'M nằm ngoài góc xOy.';
    }
  });

  const canCheck = $derived(m !== 0 && m !== 180);

  /** @param {string} name */
  function toggle(name) {
    picked[name] = !picked[name];
    verdict = null;
  }

  function check() {
    const inside = MARKS.filter((p) => placeOf(O, a, b, p) === 'trong').map((p) => p.name);
    const chosen = MARKS.filter((p) => picked[p.name]).map((p) => p.name);
    verdict = challengeResult(inside, chosen);
  }

  function reset() {
    A = onCircle(START.a);
    B = onCircle(START.b);
    M = { ...START.m };
    picked = {};
    verdict = null;
  }
</script>

<div class="space-y-4">
  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Góc xOy có hai tia xoay được quanh đỉnh O, điểm M kéo được và năm điểm P, Q, R, S, T"
  >
    {#if canCheck}
      <path d={insidePath(O, a, b)} fill="#FDE68A" fill-opacity="0.45" />
      <path d={arcPath(O, a, b, 26)} fill="none" stroke="#B45309" stroke-width="2" />
    {/if}
    <line x1={O.x} y1={O.y} x2={xEnd.x} y2={xEnd.y} stroke="#4F46E5" stroke-width="3" />
    <line x1={O.x} y1={O.y} x2={yEnd.x} y2={yEnd.y} stroke="#1B998B" stroke-width="3" />
    <text
      x={xLabel.x}
      y={xLabel.y - 8}
      font-size="15"
      font-style="italic"
      font-weight="700"
      fill="#3730A3">x</text
    >
    <text
      x={yLabel.x}
      y={yLabel.y - 8}
      font-size="15"
      font-style="italic"
      font-weight="700"
      fill="#0F766E">y</text
    >

    {#each MARKS as p (p.name)}
      <circle
        cx={p.x}
        cy={p.y}
        r={picked[p.name] ? 7 : 5}
        fill={picked[p.name] ? '#F46036' : '#1F2937'}
      />
      <text x={p.x + 8} y={p.y - 8} font-size="14" font-weight="700" fill="#1F2937">{p.name}</text>
    {/each}

    <circle cx={O.x} cy={O.y} r="6" fill="#1F2937" />
    <text x={O.x - 6} y={O.y + 24} font-size="15" font-weight="700" fill="#1F2937">O</text>

    <DragPoint
      drag={dragA}
      r={10}
      name="A"
      nameDx={10}
      nameDy={18}
      label="Điểm A trên tia Ox: kéo hoặc dùng phím mũi tên để xoay tia Ox quanh O, mỗi bước 5 độ"
    />
    <DragPoint
      drag={dragB}
      r={10}
      color="#1B998B"
      name="B"
      nameDx={10}
      nameDy={18}
      label="Điểm B trên tia Oy: kéo hoặc dùng phím mũi tên để xoay tia Oy quanh O, mỗi bước 5 độ"
    />
    <DragPoint
      drag={dragM}
      r={9}
      color={place === 'trong' ? '#059669' : '#F46036'}
      name="M"
      label="Điểm M: kéo hoặc dùng phím mũi tên để di chuyển"
    />
  </GeometryBoard>

  <div class="grid gap-3 sm:grid-cols-2" aria-live="polite">
    <p class="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-950">
      <span class="font-semibold">Góc.</span>
      {angleText}
    </p>
    <p
      class="rounded-lg border p-3 text-sm {place === 'trong'
        ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
        : 'border-slate-200 bg-slate-50 text-slate-900'}"
    >
      <span class="font-semibold">Điểm M.</span>
      {pointText}
    </p>
  </div>

  <div class="rounded-lg border border-slate-200 p-3">
    <p class="mb-2 text-sm font-semibold text-slate-700">
      Thử thách: chọn tất cả các điểm nằm trong góc xOy rồi bấm Kiểm tra.
    </p>
    <div class="flex flex-wrap gap-2">
      {#each MARKS as p (p.name)}
        <button
          type="button"
          class="{picked[p.name] ? button.primary : button.quiet} min-w-12"
          aria-pressed={!!picked[p.name]}
          onclick={() => toggle(p.name)}>{p.name}</button
        >
      {/each}
      <button type="button" class={button.secondary} disabled={!canCheck} onclick={check}
        >Kiểm tra</button
      >
    </div>
    <p class="mt-2 text-sm" aria-live="polite">
      {#if !canCheck}
        <span class="text-slate-600">Xoay hai tia để có một góc không bẹt rồi mới kiểm tra.</span>
      {:else if verdict}
        <span class={verdict.ok ? 'text-emerald-700' : 'text-rose-700'}>{verdict.text}</span>
      {/if}
    </p>
  </div>

  <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
</div>
