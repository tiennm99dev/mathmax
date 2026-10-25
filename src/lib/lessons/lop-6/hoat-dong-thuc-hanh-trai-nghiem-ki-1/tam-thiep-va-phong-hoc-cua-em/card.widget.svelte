<script>
  import { button } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { CARD_SHAPES, convexOverlap, placeInHalf, placedOutlines } from './engine.js';

  /** Card size in cm; the fold line is the vertical line through the middle. */
  const CARD_W = 16;
  const CARD_H = 12;
  const AXIS = CARD_W / 2;
  const SC = 24;
  const OX = 8;
  const OY = 8;
  const W = CARD_W * SC + 2 * OX;
  const H = CARD_H * SC + 2 * OY;
  const MAX = 6;
  const COLORS = ['#E11D48', '#2563EB', '#16A34A', '#D97706', '#7C3AED', '#0891B2'];

  /** @typedef {{ key: number, kind: string, x: number, y: number, handle: { x: number, y: number } }} Placed */

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let mirror = $state(true);
  let nextKey = 3;
  /** @type {Placed[]} */
  let placed = $state([make(0, 'thoi', 6, 1), make(1, 'vuong', 3, 7), make(2, 'thang-can', 1, 4)]);
  let message = $state('');

  /**
   * @param {number} key
   * @param {string} kind
   * @param {number} x
   * @param {number} y
   * @returns {Placed}
   */
  function make(key, kind, x, y) {
    const s = CARD_SHAPES[kind];
    const p = placeInHalf(s, x, y, AXIS, CARD_H);
    return { key, kind, ...p, handle: centre(kind, p.x, p.y) };
  }

  /** @param {string} kind @param {number} x @param {number} y */
  function centre(kind, x, y) {
    const s = CARD_SHAPES[kind];
    return { x: OX + (x + s.w / 2) * SC, y: OY + (y + s.h / 2) * SC };
  }

  /** @param {{ x: number, y: number }} p */
  const sx = (p) => `${OX + p.x * SC},${OY + p.y * SC}`;

  /** @param {Placed} item @param {number} x @param {number} y */
  function moveTo(item, x, y) {
    const p = placeInHalf(CARD_SHAPES[item.kind], x, y, AXIS, CARD_H);
    item.x = p.x;
    item.y = p.y;
    const c = centre(item.kind, p.x, p.y);
    item.handle.x = c.x;
    item.handle.y = c.y;
  }

  /** @param {Placed} item */
  function dragFor(item) {
    const s = CARD_SHAPES[item.kind];
    /** @param {{ x: number, y: number }} p */
    const toCorner = (p) => ({ x: (p.x - OX) / SC - s.w / 2, y: (p.y - OY) / SC - s.h / 2 });
    return {
      point: item.handle,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => {
        const c = toCorner(p);
        const q = placeInHalf(s, c.x, c.y, AXIS, CARD_H);
        return centre(item.kind, q.x, q.y);
      },
      onChange: () => {
        const c = toCorner(item.handle);
        moveTo(item, c.x, c.y);
      },
      /** @param {number} dx @param {number} dy */
      onKeyMove: (dx, dy) => moveTo(item, item.x + dx / 2, item.y + dy / 2),
    };
  }

  /** @param {string} kind */
  function add(kind) {
    if (placed.length >= MAX) {
      message = `Thiệp đã có ${MAX} hình ở nửa trái. Bỏ bớt một hình trước khi thêm.`;
      return;
    }
    placed.push(make(nextKey++, kind, 0, 0));
    message = `Đã thêm ${CARD_SHAPES[kind].name.toLowerCase()} ở góc trên bên trái. Kéo nó tới chỗ em muốn.`;
  }

  function removeLast() {
    const gone = placed.pop();
    if (gone) message = `Đã bỏ ${CARD_SHAPES[gone.kind].name.toLowerCase()} vừa thêm.`;
  }

  const half = $derived(placed.reduce((s, p) => s + CARD_SHAPES[p.kind].area, 0));
  /** Whether two shapes of the left half lie on top of each other. */
  const overlapping = $derived.by(() => {
    const outlines = placed.map((p) => placedOutlines(CARD_SHAPES[p.kind], p.x, p.y, AXIS).left);
    return outlines.some((o, i) => outlines.slice(i + 1).some((q) => convexOverlap(o, q)));
  });
  const total = $derived(mirror ? 2 * half : half);
  const cardArea = CARD_W * CARD_H;
  const summary = $derived(
    `Nửa trái có ${placed.length} hình, diện tích ${formatNumber(half)} cm². ` +
      (mirror
        ? `Cả hai nửa đối xứng nhau qua nếp gấp nên phần trang trí rộng 2 · ${formatNumber(half)} = ${formatNumber(total)} cm², bằng ${formatNumber((total / cardArea) * 100, 1)}% diện tích mặt thiệp ${cardArea} cm².`
        : `Bật "Vẽ đối xứng" để nửa phải lặp lại nửa trái qua nếp gấp.`) +
      (overlapping
        ? ' Lưu ý: có hình đang chồng lên hình khác, nên tổng trên lớn hơn phần mặt thiệp thật sự được phủ. Kéo các hình tách rời nhau để con số đúng.'
        : ''),
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-2">
    {#each Object.entries(CARD_SHAPES) as [kind, s] (kind)}
      <button type="button" class={button.quiet} onclick={() => add(kind)}>+ {s.name}</button>
    {/each}
  </div>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-lg"
    label="Mặt thiệp {CARD_W} cm × {CARD_H} cm; nếp gấp ở giữa là trục đối xứng; kéo các hình ở nửa trái"
  >
    <rect
      x={OX}
      y={OY}
      width={CARD_W * SC}
      height={CARD_H * SC}
      fill="#FFF7ED"
      stroke="#9A3412"
      stroke-width="2"
      rx="4"
    />
    {#each { length: CARD_W - 1 } as _, i (i)}
      <line
        x1={OX + (i + 1) * SC}
        y1={OY}
        x2={OX + (i + 1) * SC}
        y2={OY + CARD_H * SC}
        stroke="#FED7AA"
        stroke-width="1"
      />
    {/each}
    {#each { length: CARD_H - 1 } as _, i (i)}
      <line
        x1={OX}
        y1={OY + (i + 1) * SC}
        x2={OX + CARD_W * SC}
        y2={OY + (i + 1) * SC}
        stroke="#FED7AA"
        stroke-width="1"
      />
    {/each}
    {#each placed as item, i (item.key)}
      {@const o = placedOutlines(CARD_SHAPES[item.kind], item.x, item.y, AXIS)}
      <polygon
        points={o.left.map(sx).join(' ')}
        fill={COLORS[i % COLORS.length]}
        fill-opacity="0.55"
        stroke={COLORS[i % COLORS.length]}
        stroke-width="2"
        stroke-linejoin="round"
      />
      {#if mirror}
        <polygon
          points={o.right.map(sx).join(' ')}
          fill={COLORS[i % COLORS.length]}
          fill-opacity="0.35"
          stroke={COLORS[i % COLORS.length]}
          stroke-width="2"
          stroke-dasharray="5 3"
          stroke-linejoin="round"
        />
      {/if}
    {/each}
    <line
      x1={OX + AXIS * SC}
      y1={OY - 4}
      x2={OX + AXIS * SC}
      y2={OY + CARD_H * SC + 4}
      stroke="#7B2CBF"
      stroke-width="2.5"
      stroke-dasharray="10 6"
    />
    {#each placed as item (item.key)}
      <DragPoint
        drag={dragFor(item)}
        r={8}
        color="#1F2937"
        label="{CARD_SHAPES[item.kind]
          .name}: kéo hoặc dùng phím mũi tên để dời, mỗi bước nửa xăng-ti-mét"
      />
    {/each}
  </GeometryBoard>

  <div class="flex flex-wrap items-center gap-3">
    <label class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="h-5 w-5" bind:checked={mirror} />
      Vẽ đối xứng qua nếp gấp
    </label>
    <button type="button" class={button.quiet} onclick={removeLast} disabled={placed.length === 0}>
      Bỏ hình vừa thêm
    </button>
  </div>

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
    <p aria-live="polite">{summary}</p>
    {#if message}<p class="mt-2 text-slate-600" aria-live="polite">{message}</p>{/if}
    <ul class="mt-2 list-disc space-y-1 pl-5 text-slate-600">
      {#each Object.values(CARD_SHAPES) as s (s.name)}
        <li>{s.name}: S = {s.formula} cm²</li>
      {/each}
    </ul>
  </div>
</div>
