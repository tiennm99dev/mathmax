<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { toNumber } from '#lib/fraction-engine/index.js';
  import { valueText } from '../_shared/numbers.js';
  import { AREAS, SIDE_MAX, change, lengthRange, snapLength, widthFor } from './engine.js';

  const VIEW_W = 360;
  const VIEW_H = 360;
  const OX = 36;
  const OY = 330;
  const U = 26;
  const MAX_ROWS = 6;

  /** @param {number} x */
  const sx = (x) => OX + x * U;
  /** @param {number} y */
  const sy = (y) => OY - y * U;

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let area = $state(24);
  let x = $state(4);
  /** @type {number[]} */
  let recorded = $state([]);
  let announcement = $state('');
  /** @type {ReturnType<typeof setTimeout> | null} */ let timer = null;

  const y = $derived(widthFor(area, x));
  const yNum = $derived(toNumber(y));
  const handle = $state({ x: sx(4), y: sy(6) });

  $effect(() => {
    handle.x = sx(x);
    handle.y = sy(yNum);
  });

  /**
   * An exact value, with a rounded decimal when it is a repeating fraction.
   * @param {import('#lib/fraction-engine/fraction.js').Fraction} f
   */
  function exact(f) {
    const t = valueText(f);
    return t.includes('/') ? `${t} ≈ ${formatNumber(toNumber(f), 2)}` : t;
  }

  /**
   * "gấp 3/2 lần" when a side grows, "chỉ bằng 2/3 lúc trước" when it shrinks.
   * @param {import('#lib/fraction-engine/fraction.js').Fraction} f
   */
  const scaled = (f) =>
    f.n > f.d ? `gấp ${valueText(f)} lần` : `chỉ bằng ${valueText(f)} lúc trước`;

  const last = $derived(recorded.length ? recorded[recorded.length - 1] : null);
  const delta = $derived(last !== null && last !== x ? change(area, last, x) : null);

  const drag = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: VIEW_W, h: VIEW_H },
    pad: 0,
    keyStep: U / 2,
    keyShiftStep: U * 2,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      const nx = snapLength(area, (p.x - OX) / U);
      return { x: sx(nx), y: sy(area / nx) };
    },
    onChange: () => {
      x = snapLength(area, (handle.x - OX) / U);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        announcement = `Chiều dài ${formatNumber(x)} cm, chiều rộng ${exact(y)} cm, diện tích ${area} cm vuông`;
      }, 300);
    },
  });

  /** @param {string | number} v */
  function chooseArea(v) {
    area = Number(v);
    x = snapLength(area, Math.max(lengthRange(area).min, 4));
    recorded = [];
  }

  function record() {
    if (recorded.includes(x)) return;
    recorded = [...recorded, x].slice(-MAX_ROWS);
  }

  const grid = Array.from({ length: SIDE_MAX + 1 }, (_, i) => i);
</script>

<div class="space-y-4">
  <div aria-live="polite" aria-atomic="true" class="sr-only">{announcement}</div>

  <SegmentedControl
    label="Diện tích cố định"
    options={AREAS.map((a) => ({ value: a, label: `${a} cm²` }))}
    bind:value={area}
    onchange={chooseArea}
  />

  <GeometryBoard
    bind:svgEl
    width={VIEW_W}
    height={VIEW_H}
    interactive
    maxWidth="max-w-md"
    label="Hình chữ nhật diện tích {area} xăng-ti-mét vuông, chiều dài {formatNumber(x)} cm"
  >
    {#each grid as g (g)}
      <line x1={sx(g)} x2={sx(g)} y1={sy(SIDE_MAX)} y2={OY} stroke="#E2E8F0" />
      <line x1={OX} x2={sx(SIDE_MAX)} y1={sy(g)} y2={sy(g)} stroke="#E2E8F0" />
      {#if g % 2 === 0 && g > 0}
        <text x={sx(g)} y={OY + 16} font-size="11" text-anchor="middle" fill="#64748B">{g}</text>
        <text x={OX - 6} y={sy(g) + 4} font-size="11" text-anchor="end" fill="#64748B">{g}</text>
      {/if}
    {/each}
    <rect
      x={OX}
      y={sy(yNum)}
      width={x * U}
      height={yNum * U}
      fill="#6366F1"
      fill-opacity="0.25"
      stroke="#4F46E5"
      stroke-width="2"
    />
    <text
      x={OX + (x * U) / 2}
      y={OY - 8}
      font-size="13"
      font-weight="700"
      fill="#3730A3"
      text-anchor="middle">x = {formatNumber(x)}</text
    >
    <text x={OX + 6} y={sy(yNum / 2) + 4} font-size="13" font-weight="700" fill="#3730A3"
      >y = {formatNumber(yNum, 2)}</text
    >
    <line x1={OX} x2={sx(SIDE_MAX)} y1={OY} y2={OY} stroke="#334155" stroke-width="1.5" />
    <line x1={OX} x2={OX} y1={sy(SIDE_MAX)} y2={OY} stroke="#334155" stroke-width="1.5" />
    <DragPoint
      {drag}
      r={10}
      color="#D7263D"
      label="Đỉnh của hình chữ nhật. Kéo hoặc dùng phím mũi tên trái, phải để đổi chiều dài"
    />
  </GeometryBoard>
  <p class="text-center text-sm text-slate-600">
    Kéo đỉnh đỏ sang trái, sang phải (hoặc dùng phím mũi tên). Mỗi ô vuông nhỏ là 1 cm²; diện tích
    luôn giữ bằng {area} cm².
  </p>

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
    <p class="tabular-nums text-slate-800">
      Chiều dài x = {formatNumber(x)} cm, chiều rộng y = {exact(y)} cm, x · y = {area} cm².
    </p>
    {#if delta}
      <p class="mt-2 font-semibold text-emerald-700" aria-live="polite">
        So với lần ghi trước (x = {formatNumber(/** @type {number} */ (last))}): chiều dài
        {scaled(delta.lengthFactor)} thì chiều rộng {scaled(delta.widthFactor)}. Hai hệ số {valueText(
          delta.lengthFactor,
        )} và {valueText(delta.widthFactor)} là hai số nghịch đảo của nhau.
      </p>
    {:else}
      <p class="mt-2 text-slate-600">
        Bấm "Ghi lại" để lưu cặp giá trị, rồi kéo đỉnh để so sánh với lần ghi trước.
      </p>
    {/if}
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={record}>Ghi lại cặp (x; y)</button>
    <button type="button" class={button.quiet} onclick={() => (recorded = [])}>Xoá bảng</button>
  </div>

  {#if recorded.length}
    <div class="overflow-x-auto">
      <table class="mx-auto border-collapse text-center tabular-nums">
        <thead>
          <tr class="bg-slate-100">
            <th scope="col" class="border border-slate-300 px-3 py-1">Chiều dài x (cm)</th>
            <th scope="col" class="border border-slate-300 px-3 py-1">Chiều rộng y (cm)</th>
            <th scope="col" class="border border-slate-300 px-3 py-1">x · y (cm²)</th>
          </tr>
        </thead>
        <tbody>
          {#each recorded as rx (rx)}
            <tr>
              <td class="border border-slate-300 px-3 py-1">{formatNumber(rx)}</td>
              <td class="border border-slate-300 px-3 py-1">{exact(widthFor(area, rx))}</td>
              <td class="border border-slate-300 px-3 py-1 font-semibold text-emerald-700"
                >{area}</td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
