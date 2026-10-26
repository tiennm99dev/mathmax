<script>
  import { button } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { COLS, ROWS, TASKS, allPoints, name, rectangleCorners, snapPoint } from './engine.js';

  const CELL = 40;
  const PAD = 20;
  const W = PAD * 2 + CELL * COLS;
  const H = PAD * 2 + CELL * ROWS;
  const FIXED = '#1F2937';
  const MOVABLE = '#4F46E5';

  /** @param {number} x */
  const sx = (x) => PAD + CELL * x;
  /** @param {number} y */
  const sy = (y) => PAD + CELL * (ROWS - y);

  let at = $state(0);
  /** @type {import('./engine.js').Pts} */
  let moved = $state({ ...TASKS[0].start });
  /** @type {Record<string, boolean>} */
  let solved = $state({});
  /** @type {{ ok: boolean, msg: string } | null} */
  let verdict = $state(null);
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const task = $derived(TASKS[at]);
  const pts = $derived(allPoints(task, moved));
  const readout = $derived(task.readout?.(pts) ?? '');
  const score = $derived(TASKS.filter((t) => solved[t.id]).length);
  const rect = $derived(task.id === 'chu-nhat' ? rectangleCorners(pts.A, pts.C) : null);

  /** @param {number} i */
  function open(i) {
    at = i;
    moved = { ...TASKS[i].start };
    verdict = null;
  }

  function reset() {
    moved = { ...task.start };
    verdict = null;
  }

  function check() {
    verdict = task.check(pts);
    if (verdict.ok) solved = { ...solved, [task.id]: true };
  }

  /** @param {string} n @param {import('./engine.js').Pt} p */
  function place(n, p) {
    if (moved[n].x === p.x && moved[n].y === p.y) return;
    moved = { ...moved, [n]: p };
    verdict = null;
  }

  /** @param {string} n */
  function dragFor(n) {
    const point = { x: sx(moved[n].x), y: sy(moved[n].y) };
    return {
      point,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      onChange: () => place(n, snapPoint((point.x - PAD) / CELL, ROWS - (point.y - PAD) / CELL)),
      /** @param {number} dx @param {number} dy */
      onKeyMove: (dx, dy) => place(n, snapPoint(moved[n].x + dx, moved[n].y - dy)),
    };
  }

  /** @param {string[]} names */
  const polyline = (names) =>
    names
      .map((n) => pts[n])
      .filter(Boolean)
      .map((p) => `${sx(p.x)},${sy(p.y)}`)
      .join(' ');

  const cols = Array.from({ length: COLS + 1 }, (_, i) => i);
  const rows = Array.from({ length: ROWS + 1 }, (_, i) => i);
</script>

<div class="space-y-4">
  <div role="group" aria-label="Chọn bài dựng hình" class="flex flex-wrap gap-2">
    {#each TASKS as t, i (t.id)}
      <button
        type="button"
        class="{i === at ? button.primary : button.quiet} min-w-11 px-3"
        aria-pressed={i === at}
        aria-label="Bài {i + 1}: {t.title}{solved[t.id] ? ', đã dựng đúng' : ''}"
        onclick={() => open(i)}
      >
        {i + 1}{solved[t.id] ? ' ✓' : ''}
      </button>
    {/each}
  </div>

  <p class="text-sm text-slate-600 tabular-nums">
    Đã dựng đúng {score}/{TASKS.length} bài.
  </p>
  <p class="text-lg font-semibold text-slate-900">
    Bài {at + 1}. {task.title}: {task.text}
  </p>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Lưới ô vuông cạnh 1 cm để dựng hình: {task.text}"
  >
    {#each cols as i (i)}
      <line x1={sx(i)} y1={sy(0)} x2={sx(i)} y2={sy(ROWS)} stroke="#E2E8F0" stroke-width="1" />
    {/each}
    {#each rows as j (j)}
      <line x1={sx(0)} y1={sy(j)} x2={sx(COLS)} y2={sy(j)} stroke="#E2E8F0" stroke-width="1" />
    {/each}

    {#if task.axis !== undefined}
      <line
        x1={sx(task.axis)}
        y1={sy(ROWS) - 10}
        x2={sx(task.axis)}
        y2={sy(0) + 10}
        stroke="#D97706"
        stroke-width="2"
        stroke-dasharray="8 6"
      />
      <text x={sx(task.axis) + 8} y={sy(ROWS) + 6} font-size="15" font-style="italic" fill="#B45309"
        >d</text
      >
    {/if}

    {#if task.ray}
      {@const o = pts[task.ray]}
      <line
        x1={sx(o.x)}
        y1={sy(o.y)}
        x2={sx(COLS)}
        y2={sy(o.y)}
        stroke={FIXED}
        stroke-width="2.5"
      />
      <text x={sx(COLS) - 14} y={sy(o.y) + 20} font-size="15" font-style="italic" fill={FIXED}
        >x</text
      >
    {/if}

    {#if rect}
      <polygon
        points={rect.map((p) => `${sx(p.x)},${sy(p.y)}`).join(' ')}
        fill="#EEF2FF"
        stroke={MOVABLE}
        stroke-width="2.5"
      />
      <text
        x={sx(rect[1].x) + 6}
        y={sy(rect[1].y) + 18}
        font-size="14"
        font-weight="700"
        fill={FIXED}>B</text
      >
      <text
        x={sx(rect[3].x) - 18}
        y={sy(rect[3].y) - 6}
        font-size="14"
        font-weight="700"
        fill={FIXED}>D</text
      >
    {/if}

    {#each task.lines as names, i (i)}
      <polyline
        points={polyline(names)}
        fill={names[0] === names[names.length - 1] ? '#EEF2FF' : 'none'}
        fill-opacity="0.6"
        stroke={FIXED}
        stroke-width="2.5"
        stroke-linejoin="round"
      />
    {/each}

    {#each Object.entries(task.fixed) as [n, p] (n)}
      <circle cx={sx(p.x)} cy={sy(p.y)} r="5" fill={FIXED} />
      <text x={sx(p.x) + 8} y={sy(p.y) - 8} font-size="14" font-weight="700" fill={FIXED}>{n}</text>
    {/each}

    {#each Object.keys(task.start) as n (task.id + n)}
      <DragPoint
        drag={dragFor(n)}
        r={10}
        color={MOVABLE}
        name={n}
        label="Điểm {n} tại ô {name(moved[n])}; kéo hoặc dùng phím mũi tên để di chuyển"
      />
    {/each}
  </GeometryBoard>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={check}>Kiểm tra</button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
    {#if at < TASKS.length - 1}
      <button type="button" class={button.secondary} onclick={() => open(at + 1)}
        >Bài tiếp theo</button
      >
    {/if}
  </div>

  <div aria-live="polite" class="space-y-2">
    {#if readout}
      <p class="rounded-lg bg-slate-50 px-3 py-2 text-slate-800 tabular-nums">{readout}</p>
    {/if}
    {#if verdict}
      <p
        class="rounded-lg border p-3 font-semibold {verdict.ok
          ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
          : 'border-rose-300 bg-rose-50 text-rose-950'}"
      >
        {verdict.ok ? '' : 'Chưa đúng. '}{verdict.msg}
      </p>
    {/if}
    {#if score === TASKS.length}
      <p class="font-semibold text-indigo-900">Em đã dựng đúng cả {TASKS.length} bài. Tuyệt vời!</p>
    {/if}
  </div>
</div>
