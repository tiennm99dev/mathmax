<script>
  import { button } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { PRESETS, TYPE_NAMES, classify, counts, lengthText, properties } from './engine.js';

  // Grid of 11 × 8 one-centimetre cells.
  const COLS = 11;
  const ROWS = 8;
  const CELL = 32;
  const PAD = 24;
  const W = COLS * CELL + 2 * PAD;
  const H = ROWS * CELL + 2 * PAD;
  const NAMES = ['A', 'B', 'C', 'D'];
  const COLORS = ['#D7263D', '#1B998B', '#2E86AB', '#7B2CBF'];

  const TARGETS = [
    { value: 'hinh-chu-nhat', label: 'Hình chữ nhật' },
    { value: 'hinh-thoi', label: 'Hình thoi' },
    { value: 'hinh-binh-hanh', label: 'Hình bình hành' },
    { value: 'hinh-thang-can', label: 'Hình thang cân' },
  ];

  /** @param {number} g */
  const sx = (g) => PAD + g * CELL;

  /** Grid points of the four vertices. */
  let grid = $state(PRESETS['hinh-binh-hanh'].map((p) => ({ ...p })));
  /** Screen positions the drag handles move; snapped back onto the grid. */
  let screen = $state(PRESETS['hinh-binh-hanh'].map((p) => ({ x: sx(p.x), y: sx(p.y) })));
  let target = $state('hinh-thoi');
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  /** @param {Array<{ x: number, y: number }>} pts */
  function load(pts) {
    grid = pts.map((p) => ({ ...p }));
    screen = pts.map((p) => ({ x: sx(p.x), y: sx(p.y) }));
  }

  /** @param {number} i */
  function dragFor(i) {
    return {
      point: screen[i],
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => {
        const gx = clamp(Math.round((p.x - PAD) / CELL), 0, COLS);
        const gy = clamp(Math.round((p.y - PAD) / CELL), 0, ROWS);
        return { x: sx(gx), y: sx(gy) };
      },
      onChange: () => {
        grid[i] = {
          x: Math.round((screen[i].x - PAD) / CELL),
          y: Math.round((screen[i].y - PAD) / CELL),
        };
      },
      /** @param {number} dx @param {number} dy */
      onKeyMove: (dx, dy) => {
        const gx = clamp(grid[i].x + dx, 0, COLS);
        const gy = clamp(grid[i].y + dy, 0, ROWS);
        grid[i] = { x: gx, y: gy };
        screen[i] = { x: sx(gx), y: sx(gy) };
      },
    };
  }

  const type = $derived(classify(grid));
  const props = $derived(properties(grid));
  const convex = $derived(type !== 'khong-loi');
  const met = $derived(counts(type, /** @type {import('./engine.js').QuadType} */ (target)));
  const targetName = $derived(TARGETS.find((t) => t.value === target)?.label ?? '');

  /** @param {number} v */
  const f = (v) => formatNumber(v, 1);
  const sideText = $derived(
    ['AB', 'BC', 'CD', 'DA'].map((n, i) => `${n} ${lengthText(props.sides2[i], f)}`).join(' · '),
  );
  const diagText = $derived(
    `AC ${lengthText(props.diagonals2[0], f)} · BD ${lengthText(props.diagonals2[1], f)}`,
  );

  const checks = $derived([
    { label: 'Bốn cạnh bằng nhau', ok: props.allSidesEqual },
    { label: 'Các cạnh đối bằng nhau', ok: props.oppositeSidesEqual },
    { label: 'AB song song với CD', ok: props.abParallelCd },
    { label: 'AD song song với BC', ok: props.bcParallelDa },
    { label: 'Bốn góc vuông', ok: props.rightAngles === 4 },
    { label: 'Hai đường chéo bằng nhau', ok: props.diagonalsEqual },
    { label: 'Hai đường chéo vuông góc', ok: props.diagonalsPerpendicular },
    { label: 'Hai đường chéo cắt nhau tại trung điểm mỗi đường', ok: props.diagonalsBisect },
  ]);

  const status = $derived(
    !convex
      ? 'Bốn điểm chưa tạo thành tứ giác lồi: có ba điểm thẳng hàng hoặc các cạnh cắt nhau.'
      : type === target
        ? `Đạt: ABCD là ${targetName.toLowerCase()}.`
        : met
          ? `Đạt: ABCD là ${TYPE_NAMES[type].toLowerCase()}, mà ${TYPE_NAMES[type].toLowerCase()} cũng là một ${targetName.toLowerCase()}.`
          : `Đây là: ${TYPE_NAMES[type].toLowerCase()}. Hãy kéo các đỉnh để được ${targetName.toLowerCase()}.`,
  );
  const mid = $derived({
    x: (screen[0].x + screen[2].x) / 2,
    y: (screen[0].y + screen[2].y) / 2,
  });
</script>

<div class="space-y-4">
  <SegmentedControl label="Thử thách: tạo hình" options={TARGETS} bind:value={target} />

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-lg"
    label="Tứ giác ABCD trên lưới ô vuông 1 cm, các đỉnh kéo được"
  >
    {#each { length: COLS + 1 } as _, i (i)}
      <line x1={sx(i)} y1={PAD} x2={sx(i)} y2={H - PAD} stroke="#e2e8f0" stroke-width="1" />
    {/each}
    {#each { length: ROWS + 1 } as _, j (j)}
      <line x1={PAD} y1={sx(j)} x2={W - PAD} y2={sx(j)} stroke="#e2e8f0" stroke-width="1" />
    {/each}
    <polygon
      points={screen.map((p) => `${p.x},${p.y}`).join(' ')}
      fill={met ? '#1B998B' : '#2E86AB'}
      fill-opacity="0.15"
      stroke={met ? '#1B998B' : '#334155'}
      stroke-width="2.5"
      stroke-linejoin="round"
    />
    <line
      x1={screen[0].x}
      y1={screen[0].y}
      x2={screen[2].x}
      y2={screen[2].y}
      stroke="#F46036"
      stroke-dasharray="6 4"
      stroke-width="1.5"
    />
    <line
      x1={screen[1].x}
      y1={screen[1].y}
      x2={screen[3].x}
      y2={screen[3].y}
      stroke="#F46036"
      stroke-dasharray="6 4"
      stroke-width="1.5"
    />
    {#if props.diagonalsBisect && convex}
      <circle cx={mid.x} cy={mid.y} r="4" fill="#F46036" />
    {/if}
    {#each screen as _, i (i)}
      <DragPoint
        drag={dragFor(i)}
        color={COLORS[i]}
        name={NAMES[i]}
        label="Đỉnh {NAMES[i]}: kéo hoặc dùng phím mũi tên, mỗi bước một ô"
      />
    {/each}
  </GeometryBoard>

  <div class="flex flex-wrap gap-2">
    {#each TARGETS as t (t.value)}
      <button type="button" class={button.quiet} onclick={() => load(PRESETS[t.value])}
        >Mẫu {t.label.toLowerCase()}</button
      >
    {/each}
  </div>

  <p
    class="rounded-lg p-3 text-sm font-semibold {met
      ? 'bg-emerald-50 text-emerald-900'
      : 'bg-slate-50 text-slate-800'}"
    aria-live="polite"
  >
    {status}
  </p>

  <div class="grid gap-3 sm:grid-cols-2">
    <div class="rounded-lg border border-slate-200 p-3 text-sm text-slate-700">
      <p class="font-semibold">Độ dài (cm)</p>
      <p class="tabular-nums">{sideText}</p>
      <p class="tabular-nums">Đường chéo: {diagText}</p>
    </div>
    <ul class="rounded-lg border border-slate-200 p-3 text-sm" aria-label="Các đặc điểm của ABCD">
      {#each checks as c (c.label)}
        <li class={c.ok && convex ? 'text-emerald-800' : 'text-slate-500'}>
          <span aria-hidden="true">{c.ok && convex ? '✓' : '✗'}</span>
          <span class="sr-only">{c.ok && convex ? 'Có' : 'Không'}:</span>
          {c.label}
        </li>
      {/each}
    </ul>
  </div>
</div>
