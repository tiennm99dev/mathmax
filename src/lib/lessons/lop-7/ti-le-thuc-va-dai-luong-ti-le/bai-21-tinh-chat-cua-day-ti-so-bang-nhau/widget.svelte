<script>
  import Tex from '#lib/components/tex.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { colorAt } from '#lib/core/visuals/svg-math.js';
  import { button } from '#lib/core/ui.js';
  import { formatNumber, texNumber } from '#lib/core/number-format.js';
  import { TASKS, answerFor, judge, partValue, piecesFrom, snap, startCuts } from './engine.js';

  const VIEW_W = 400;
  const VIEW_H = 170;
  const L = 20;
  const W = 360;
  const BAR_Y = 60;
  const BAR_H = 50;
  const HANDLE_Y = 30;
  const LETTERS = ['x', 'y', 'z'];

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let taskId = $state(TASKS[0].id);
  const task = $derived(TASKS.find((t) => t.id === taskId) ?? TASKS[0]);

  /** @param {number} v */
  const toPx = (v) => L + (v / task.total) * W;
  /** @param {number} px */
  const toValue = (px) => ((px - L) / W) * task.total;

  /**
   * Handles at the starting cuts of a task.
   * @param {import('./engine.js').Task} t
   */
  const handlesOf = (t) => startCuts(t).map((c) => ({ x: L + (c / t.total) * W, y: HANDLE_Y }));

  let handles = $state(handlesOf(TASKS[0]));
  let showParts = $state(false);
  let announcement = $state('');
  /** @type {ReturnType<typeof setTimeout> | null} */ let timer = null;

  const cuts = $derived(handles.map((h) => snap(toValue(h.x), task.step, 0, task.total)));
  const pieces = $derived(piecesFrom(cuts, task.total));
  const verdict = $derived(judge(task, pieces));
  const ratioSum = $derived(task.ratio.reduce((s, r) => s + r, 0));
  const edges = $derived([0, ...cuts, task.total]);

  /** @param {string} id */
  function chooseTask(id) {
    const next = TASKS.find((t) => t.id === id) ?? TASKS[0];
    taskId = next.id;
    handles = handlesOf(next);
    showParts = false;
    announcement = '';
  }

  function showAnswer() {
    const ans = answerFor(task);
    let acc = 0;
    handles = ans.slice(0, -1).map((p) => {
      acc += p;
      return { x: toPx(acc), y: HANDLE_Y };
    });
    announce();
  }

  function announce() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      const list = pieces.map((p, i) => `${task.names[i]}: ${formatNumber(p)}`).join('; ');
      announcement = verdict.ok ? `${list}. Đúng tỉ lệ.` : `${list}. Chưa đúng tỉ lệ.`;
    }, 300);
  }

  /** @param {number} i */
  function dragFor(i) {
    return {
      point: handles[i],
      svg: () => svgEl ?? null,
      viewBox: { w: VIEW_W, h: VIEW_H },
      pad: 0,
      keyStep: (W * task.step) / task.total,
      keyShiftStep: (W * task.step * 5) / task.total,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => {
        const lo = i === 0 ? task.step : cuts[i - 1] + task.step;
        const hi = i === handles.length - 1 ? task.total - task.step : cuts[i + 1] - task.step;
        return { x: toPx(snap(toValue(p.x), task.step, lo, hi)), y: HANDLE_Y };
      },
      onChange: announce,
    };
  }

  const fmt = (/** @type {number} */ v) => formatNumber(v, 2);
  const tex = (/** @type {number} */ v) => texNumber(formatNumber(v, 2));

  const chainTex = $derived(
    `${task.ratio.map((r, i) => `\\frac{${LETTERS[i]}}{${r}}`).join(' = ')} = \\frac{${LETTERS.slice(
      0,
      task.ratio.length,
    ).join(
      ' + ',
    )}}{${task.ratio.join(' + ')}} = \\frac{${task.total}}{${ratioSum}} = ${tex(partValue(task))}`,
  );
</script>

<div class="space-y-4">
  <div aria-live="polite" aria-atomic="true" class="sr-only">{announcement}</div>

  <SegmentedControl
    label="Bài toán"
    options={TASKS.map((t) => ({ value: t.id, label: t.label }))}
    bind:value={taskId}
    onchange={(v) => chooseTask(String(v))}
  />
  <p class="font-semibold text-slate-800">{task.story}</p>

  <GeometryBoard
    bind:svgEl
    width={VIEW_W}
    height={VIEW_H}
    interactive
    maxWidth="max-w-xl"
    label="Thanh biểu diễn {task.total} {task.unit} được chia thành {task.ratio.length} phần"
  >
    {#each pieces as p, i (i)}
      <rect
        x={toPx(edges[i])}
        y={BAR_Y}
        width={Math.max(0, toPx(edges[i + 1]) - toPx(edges[i]))}
        height={BAR_H}
        fill={colorAt(i)}
        fill-opacity="0.35"
        stroke={colorAt(i)}
        stroke-width="1.5"
      />
      {#if toPx(edges[i + 1]) - toPx(edges[i]) > 34}
        <text
          x={(toPx(edges[i]) + toPx(edges[i + 1])) / 2}
          y={BAR_Y + BAR_H / 2 + 6}
          text-anchor="middle"
          font-size="16"
          font-weight="700"
          fill="#1F2937">{fmt(p)}</text
        >
        <text
          x={(toPx(edges[i]) + toPx(edges[i + 1])) / 2}
          y={BAR_Y + BAR_H + 22}
          text-anchor="middle"
          font-size="13"
          fill="#475569">{task.names[i]}</text
        >
      {/if}
    {/each}

    {#if showParts}
      {#each Array.from({ length: ratioSum - 1 }, (_, j) => j + 1) as j (j)}
        <line
          x1={toPx(j * partValue(task))}
          x2={toPx(j * partValue(task))}
          y1={BAR_Y - 4}
          y2={BAR_Y + BAR_H + 4}
          stroke="#334155"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />
      {/each}
    {/if}

    <text x={L} y={BAR_Y + BAR_H + 50} font-size="12" fill="#64748B">0</text>
    <text x={L + W} y={BAR_Y + BAR_H + 50} font-size="12" fill="#64748B" text-anchor="end"
      >{task.total} {task.unit}</text
    >

    {#each handles as h, i (i)}
      <line
        x1={h.x}
        x2={h.x}
        y1={HANDLE_Y}
        y2={BAR_Y + BAR_H}
        stroke="#1F2937"
        stroke-width="3"
        pointer-events="none"
      />
      <DragPoint
        drag={dragFor(i)}
        r={11}
        color="#4F46E5"
        label="Vết cắt thứ {i + 1}, đang ở {formatNumber(
          cuts[i],
        )} {task.unit}. Kéo hoặc dùng phím mũi tên trái, phải"
      />
    {/each}
  </GeometryBoard>
  <p class="text-center text-sm text-slate-600">
    Kéo các vết cắt (chấm xanh) hoặc dùng phím mũi tên để chia thanh thành các phần theo đúng tỉ lệ {task.ratio.join(
      ' : ',
    )}.
  </p>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.secondary} onclick={() => (showParts = !showParts)}
      >{showParts ? 'Ẩn' : 'Hiện'} {ratioSum} phần bằng nhau</button
    >
    <button type="button" class={button.quiet} onclick={showAnswer}>Xem đáp án</button>
    <button type="button" class={button.quiet} onclick={() => chooseTask(task.id)}>Đặt lại</button>
  </div>

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
    <p class="text-sm text-slate-700">
      Lấy mỗi phần chia cho số tỉ lệ của nó:
      {#each pieces as p, i (i)}
        <span class="mr-3 inline-block tabular-nums"
          >{task.names[i]}: {fmt(p)} : {task.ratio[i]} = {fmt(p / task.ratio[i])}</span
        >
      {/each}
    </p>
    {#if verdict.ok}
      <p class="mt-2 font-semibold text-emerald-700">
        Đúng tỉ lệ! Các thương đều bằng {fmt(verdict.k)}: mỗi phần bằng nhau có giá trị {fmt(
          verdict.k,
        )}
        {task.unit}.
      </p>
      <div class="mt-2 overflow-x-auto">
        <Tex display math={chainTex} />
      </div>
    {:else}
      <p class="mt-2 font-semibold text-amber-800">
        Chưa đúng: các thương phải bằng nhau. Phần của {task.names[verdict.high]} đang nhiều quá, phần
        của {task.names[verdict.low]} đang ít quá so với tỉ lệ.
      </p>
    {/if}
  </div>
</div>
