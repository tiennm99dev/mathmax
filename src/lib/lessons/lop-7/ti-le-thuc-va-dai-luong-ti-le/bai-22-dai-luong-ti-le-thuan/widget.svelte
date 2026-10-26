<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { snap } from '#lib/core/visuals/svg-math.js';
  import { fraction } from '#lib/fraction-engine/index.js';
  import { valueText } from '../_shared/numbers.js';
  import { isProportional, tableFor } from './engine.js';

  const VIEW_W = 360;
  const VIEW_H = 320;
  const PAD = 30;
  const X_MIN = -4;
  const X_MAX = 4;
  const Y_MIN = -14;
  const Y_MAX = 14;
  const UX = (VIEW_W - 2 * PAD) / (X_MAX - X_MIN);
  const UY = (VIEW_H - 2 * PAD) / (Y_MAX - Y_MIN);
  const XS = [1, 2, 3, 4];
  const EXTRA = 2;

  /** @param {number} x */
  const mx = (x) => PAD + (x - X_MIN) * UX;
  /** @param {number} y */
  const my = (y) => PAD + (Y_MAX - y) * UY;
  /** @param {number} px */
  const toX = (px) => (px - PAD) / UX + X_MIN;

  const uid = $props.id();
  const clipId = `${uid}-clip`;
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let k = $state(2);
  /** @type {'thuan' | 'them'} */
  let mode = $state('thuan');
  let px = $state(2.5);
  let announcement = $state('');
  /** @type {ReturnType<typeof setTimeout> | null} */ let timer = null;

  const b = $derived(mode === 'thuan' ? 0 : EXTRA);
  const rows = $derived(tableFor(k, b, XS));
  const pRow = $derived(tableFor(k, b, [px])[0]);
  const proportional = $derived(isProportional(rows));
  const handle = $state({ x: mx(2.5), y: my(5) });

  $effect(() => {
    handle.x = mx(px);
    handle.y = my(Math.max(Y_MIN, Math.min(Y_MAX, k * px + b)));
  });

  const n = (/** @type {number} */ v) => formatNumber(v, 2);
  const ratioText = (/** @type {number | null} */ r) => (r === null ? 'không xác định' : n(r));
  // k moves in steps of 0,5, so k = m/2 and 1/k = 2/m exactly.
  const inverse = $derived(k === 0 ? '' : valueText(fraction(2, Math.round(2 * k))));
  const formula = $derived(mode === 'thuan' ? `y = ${n(k)} · x` : `y = ${n(k)} · x + ${EXTRA}`);

  // The line y = kx + b drawn across the visible x range and clipped by the board.
  const line = $derived({
    x1: mx(X_MIN),
    y1: my(k * X_MIN + b),
    x2: mx(X_MAX),
    y2: my(k * X_MAX + b),
  });

  const drag = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: VIEW_W, h: VIEW_H },
    pad: 0,
    keyStep: UX / 2,
    keyShiftStep: UX * 2,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      const x = Math.max(X_MIN, Math.min(X_MAX, snap(toX(p.x), 0.5)));
      return { x: mx(x), y: my(Math.max(Y_MIN, Math.min(Y_MAX, k * x + b))) };
    },
    onChange: () => {
      px = Math.max(X_MIN, Math.min(X_MAX, snap(toX(handle.x), 0.5)));
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        announcement = `x = ${n(px)}, y = ${n(pRow.y)}, y : x = ${ratioText(pRow.ratio)}`;
      }, 300);
    },
  });

  const gridX = Array.from({ length: X_MAX - X_MIN + 1 }, (_, i) => X_MIN + i);
  const gridY = Array.from({ length: (Y_MAX - Y_MIN) / 2 + 1 }, (_, i) => Y_MIN + 2 * i);
</script>

<div class="space-y-4">
  <div aria-live="polite" aria-atomic="true" class="sr-only">{announcement}</div>

  <div class="grid gap-4 sm:grid-cols-2 sm:items-end">
    <SegmentedControl
      label="Công thức"
      options={[
        { value: 'thuan', label: 'y = k · x' },
        { value: 'them', label: `y = k · x + ${EXTRA}` },
      ]}
      bind:value={mode}
    />
    <SliderField label="Hệ số k" bind:value={k} min={-3} max={3} step={0.5} format={n} />
  </div>

  <GeometryBoard
    bind:svgEl
    width={VIEW_W}
    height={VIEW_H}
    interactive
    maxWidth="max-w-md"
    label="Các cặp giá trị (x; y) của công thức {formula}"
  >
    <defs>
      <clipPath id={clipId}>
        <rect x={PAD} y={PAD} width={VIEW_W - 2 * PAD} height={VIEW_H - 2 * PAD} />
      </clipPath>
    </defs>
    {#each gridX as gx (gx)}
      <line x1={mx(gx)} x2={mx(gx)} y1={PAD} y2={VIEW_H - PAD} stroke="#E2E8F0" />
      {#if gx !== 0}
        <text x={mx(gx)} y={my(0) + 14} font-size="10" text-anchor="middle" fill="#64748B"
          >{formatNumber(gx)}</text
        >
      {/if}
    {/each}
    {#each gridY as gy (gy)}
      <line x1={PAD} x2={VIEW_W - PAD} y1={my(gy)} y2={my(gy)} stroke="#E2E8F0" />
      {#if gy !== 0 && gy % 4 === 0}
        <text x={mx(0) - 5} y={my(gy) + 3} font-size="10" text-anchor="end" fill="#64748B"
          >{formatNumber(gy)}</text
        >
      {/if}
    {/each}
    <line x1={PAD} x2={VIEW_W - PAD} y1={my(0)} y2={my(0)} stroke="#334155" stroke-width="1.5" />
    <line x1={mx(0)} x2={mx(0)} y1={PAD} y2={VIEW_H - PAD} stroke="#334155" stroke-width="1.5" />
    <text x={VIEW_W - PAD + 4} y={my(0) + 4} font-size="12" fill="#334155">x</text>
    <text x={mx(0) + 5} y={PAD - 6} font-size="12" fill="#334155">y</text>
    <text x={mx(0) - 12} y={my(0) + 14} font-size="11" fill="#334155">O</text>

    <line
      {...line}
      clip-path="url(#{clipId})"
      stroke={proportional ? '#059669' : '#D97706'}
      stroke-width="2"
      stroke-dasharray="6 4"
    />
    {#each rows as r (r.x)}
      {#if r.y >= Y_MIN && r.y <= Y_MAX}
        <circle cx={mx(r.x)} cy={my(r.y)} r="5" fill="#1F2937" />
      {/if}
    {/each}
    <DragPoint
      {drag}
      r={10}
      color="#4F46E5"
      name="P"
      label="Điểm P(x; y), kéo hoặc dùng phím mũi tên trái, phải để đổi x"
    />
  </GeometryBoard>

  <div class="overflow-x-auto">
    <table class="mx-auto border-collapse text-center tabular-nums">
      <caption class="mb-1 text-sm text-slate-600">Bảng giá trị của {formula}</caption>
      <tbody>
        <tr>
          <th scope="row" class="border border-slate-300 bg-slate-100 px-3 py-1">x</th>
          {#each rows as r (r.x)}<td class="border border-slate-300 px-3 py-1">{n(r.x)}</td>{/each}
          <td class="border border-slate-300 bg-indigo-50 px-3 py-1 font-semibold">{n(px)}</td>
        </tr>
        <tr>
          <th scope="row" class="border border-slate-300 bg-slate-100 px-3 py-1">y</th>
          {#each rows as r (r.x)}<td class="border border-slate-300 px-3 py-1">{n(r.y)}</td>{/each}
          <td class="border border-slate-300 bg-indigo-50 px-3 py-1 font-semibold">{n(pRow.y)}</td>
        </tr>
        <tr>
          <th scope="row" class="border border-slate-300 bg-slate-100 px-3 py-1">y : x</th>
          {#each rows as r (r.x)}<td class="border border-slate-300 px-3 py-1"
              >{ratioText(r.ratio)}</td
            >{/each}
          <td class="border border-slate-300 bg-indigo-50 px-3 py-1 font-semibold"
            >{ratioText(pRow.ratio)}</td
          >
        </tr>
      </tbody>
    </table>
    <p class="mt-1 text-center text-xs text-slate-500">Cột tô màu là điểm P em đang kéo.</p>
  </div>

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4" aria-live="polite">
    {#if k === 0}
      <p class="font-semibold text-rose-700">
        Với k = 0 thì {mode === 'thuan' ? 'y luôn bằng 0' : `y luôn bằng ${EXTRA}`}. Định nghĩa đại
        lượng tỉ lệ thuận đòi hỏi hệ số k khác 0.
      </p>
    {:else if proportional}
      <p class="font-semibold text-emerald-700">
        Mọi tỉ số y : x đều bằng {n(k)}: y tỉ lệ thuận với x theo hệ số tỉ lệ {n(k)}, và x tỉ lệ
        thuận với y theo hệ số {inverse}.
      </p>
      <p class="mt-1 text-slate-700">
        Từ x = 1 lên x = 3 (gấp 3 lần), y đi từ {n(rows[0].y)} đến {n(rows[2].y)}, cũng gấp 3 lần.
        Các điểm (x; y) nằm trên một đường thẳng đi qua gốc O.
      </p>
    {:else}
      <p class="font-semibold text-amber-800">
        Các tỉ số y : x khác nhau ({rows.map((r) => ratioText(r.ratio)).join('; ')}), nên y không tỉ
        lệ thuận với x, dù y vẫn thay đổi đều theo x.
      </p>
      <p class="mt-1 text-slate-700">
        Từ x = 1 lên x = 3 (gấp 3 lần), y đi từ {n(rows[0].y)} đến {n(rows[2].y)}: không gấp 3 lần.
        Đường thẳng không đi qua gốc O vì phần cộng thêm {EXTRA}.
      </p>
    {/if}
  </div>
</div>
