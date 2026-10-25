<script>
  import { button } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { collinear, inRect, lineInRect, lineRelation, onLine, same } from './engine.js';

  // A grid of 11 × 7 cells; points snap to its nodes.
  const COLS = 11;
  const ROWS = 7;
  const CELL = 40;
  const PAD = 20;
  const W = COLS * CELL + 2 * PAD;
  const H = ROWS * CELL + 2 * PAD;
  const RECT = { x0: 0, y0: 0, x1: COLS, y1: ROWS };
  const NAMES = ['A', 'B', 'C', 'D'];
  const COLORS = ['#4F46E5', '#4F46E5', '#1B998B', '#1B998B'];
  const START = [
    { x: 1, y: 5 },
    { x: 9, y: 1 },
    { x: 5, y: 5 },
    { x: 10, y: 6 },
  ];

  const TASKS = [
    { id: 'thang-hang', text: 'Đặt điểm C sao cho ba điểm A, B, C thẳng hàng.' },
    { id: 'song-song', text: 'Làm cho hai đường thẳng AB và CD song song.' },
    { id: 'trung-nhau', text: 'Làm cho hai đường thẳng AB và CD trùng nhau.' },
  ];

  /** @param {number} g */
  const sx = (g) => PAD + g * CELL;

  let grid = $state(START.map((p) => ({ ...p })));
  let screen = $state(START.map((p) => ({ x: sx(p.x), y: sx(p.y) })));
  /** @type {Record<string, boolean>} */
  let done = $state({});
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  /** @param {number} i */
  function dragFor(i) {
    return {
      point: screen[i],
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => ({
        x: sx(clamp(Math.round((p.x - PAD) / CELL), 0, COLS)),
        y: sx(clamp(Math.round((p.y - PAD) / CELL), 0, ROWS)),
      }),
      onChange: () => {
        grid[i] = {
          x: Math.round((screen[i].x - PAD) / CELL),
          y: Math.round((screen[i].y - PAD) / CELL),
        };
      },
      /** @param {number} dx @param {number} dy */
      onKeyMove: (dx, dy) => {
        const g = { x: clamp(grid[i].x + dx, 0, COLS), y: clamp(grid[i].y + dy, 0, ROWS) };
        grid[i] = g;
        screen[i] = { x: sx(g.x), y: sx(g.y) };
      },
    };
  }

  function reset() {
    grid = START.map((p) => ({ ...p }));
    screen = START.map((p) => ({ x: sx(p.x), y: sx(p.y) }));
    done = {};
  }

  const [A, B, C, D] = $derived(grid);
  const abOk = $derived(!same(A, B));
  const cdOk = $derived(!same(C, D));
  const lineAB = $derived(abOk ? lineInRect(A, B, RECT) : null);
  const lineCD = $derived(cdOk ? lineInRect(C, D, RECT) : null);
  const relation = $derived(lineRelation(A, B, C, D));
  const cOnAB = $derived(abOk && onLine(C, A, B));
  const abc = $derived(collinear(A, B, C));

  const pointText = $derived.by(() => {
    if (!abOk)
      return 'Hai điểm A và B đang trùng nhau, nên chưa có đường thẳng AB. Hãy kéo tách chúng ra.';
    if (same(C, A) || same(C, B))
      return 'Điểm C đang trùng với điểm A hoặc điểm B. Hãy chọn ba điểm phân biệt.';
    return abc
      ? 'C ∈ AB: điểm C thuộc đường thẳng AB, nên ba điểm A, B, C thẳng hàng.'
      : 'C ∉ AB: điểm C không thuộc đường thẳng AB, nên ba điểm A, B, C không thẳng hàng.';
  });

  const lineText = $derived.by(() => {
    switch (relation.kind) {
      case 'khong-xac-dinh':
        return 'Cần hai điểm phân biệt để có một đường thẳng.';
      case 'trung-nhau':
        return 'Hai đường thẳng AB và CD trùng nhau: mọi điểm của đường này đều thuộc đường kia.';
      case 'song-song':
        return 'Hai đường thẳng AB và CD song song: chúng không có điểm chung nào, kéo dài mãi cũng không gặp nhau.';
      default:
        return inRect(relation.point, RECT)
          ? 'Hai đường thẳng AB và CD cắt nhau: chúng có đúng một điểm chung là giao điểm I.'
          : 'Hai đường thẳng AB và CD cắt nhau: giao điểm của chúng nằm ngoài khung vẽ, nhưng vẫn có đúng một điểm chung.';
    }
  });

  $effect(() => {
    if (abc && !done['thang-hang']) done['thang-hang'] = true;
    if (relation.kind === 'song-song' && !done['song-song']) done['song-song'] = true;
    if (relation.kind === 'trung-nhau' && !done['trung-nhau']) done['trung-nhau'] = true;
  });

  const solved = $derived(TASKS.filter((t) => done[t.id]).length);
</script>

<div class="space-y-4">
  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Bảng vẽ ô vuông có bốn điểm A, B, C, D và hai đường thẳng AB, CD"
  >
    {#each { length: COLS + 1 } as _, i (i)}
      <line x1={sx(i)} y1={PAD} x2={sx(i)} y2={H - PAD} stroke="#E2E8F0" stroke-width="1" />
    {/each}
    {#each { length: ROWS + 1 } as _, j (j)}
      <line x1={PAD} y1={sx(j)} x2={W - PAD} y2={sx(j)} stroke="#E2E8F0" stroke-width="1" />
    {/each}

    {#if lineAB}
      <line
        x1={sx(lineAB[0].x)}
        y1={sx(lineAB[0].y)}
        x2={sx(lineAB[1].x)}
        y2={sx(lineAB[1].y)}
        stroke="#4F46E5"
        stroke-width={relation.kind === 'trung-nhau' ? 6 : 2.5}
        stroke-opacity={relation.kind === 'trung-nhau' ? 0.35 : 1}
      />
    {/if}
    {#if lineCD}
      <line
        x1={sx(lineCD[0].x)}
        y1={sx(lineCD[0].y)}
        x2={sx(lineCD[1].x)}
        y2={sx(lineCD[1].y)}
        stroke="#1B998B"
        stroke-width="2.5"
        stroke-dasharray={relation.kind === 'trung-nhau' ? '8 6' : null}
      />
    {/if}

    {#if relation.kind === 'cat-nhau' && inRect(relation.point, RECT)}
      <circle
        cx={sx(relation.point.x)}
        cy={sx(relation.point.y)}
        r="6"
        fill="#F46036"
        stroke="#fff"
        stroke-width="2"
      />
      <text
        x={sx(relation.point.x) + 9}
        y={sx(relation.point.y) + 18}
        font-size="14"
        font-weight="700"
        fill="#C2410C">I</text
      >
    {/if}

    {#each screen as _, i (i)}
      <DragPoint
        drag={dragFor(i)}
        r={9}
        color={i === 2 && cOnAB ? '#F46036' : COLORS[i]}
        name={NAMES[i]}
        label="Điểm {NAMES[i]}: kéo hoặc dùng phím mũi tên, mỗi bước một ô"
      />
    {/each}
  </GeometryBoard>

  <div class="grid gap-3 sm:grid-cols-2" aria-live="polite">
    <p class="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-950">
      <span class="font-semibold">Ba điểm A, B, C.</span>
      {pointText}
    </p>
    <p class="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-950">
      <span class="font-semibold">Hai đường thẳng AB, CD.</span>
      {lineText}
    </p>
  </div>

  <div class="rounded-lg border border-slate-200 p-3">
    <p class="mb-2 text-sm font-semibold text-slate-700">
      Thử thách ({solved}/{TASKS.length})
    </p>
    <ul class="space-y-1 text-sm">
      {#each TASKS as t (t.id)}
        <li class={done[t.id] ? 'text-emerald-700' : 'text-slate-700'}>
          <span aria-hidden="true">{done[t.id] ? '✓' : '○'}</span>
          {t.text}
          <span class="sr-only">{done[t.id] ? '(đã làm được)' : '(chưa làm)'}</span>
        </li>
      {/each}
    </ul>
  </div>

  <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
</div>
