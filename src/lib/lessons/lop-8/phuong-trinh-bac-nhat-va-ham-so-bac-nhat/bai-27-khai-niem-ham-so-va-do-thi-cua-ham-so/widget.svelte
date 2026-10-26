<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { intText } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { FUNCTIONS, TARGETS, graphRuns, place } from './engine.js';

  const plane = planeScale();
  const { mx, my, toX, toY } = plane;
  const box = { xMin: plane.xMin, xMax: plane.xMax, yMin: plane.yMin, yMax: plane.yMax };

  /** @type {'machine' | 'read'} */
  let mode = $state('machine');

  // Function machine.
  let fnIndex = $state(0);
  let x = $state(1);
  /** @type {Array<{ x: number, y: number }>} */
  let points = $state([]);
  let showGraph = $state(false);
  let machineNote = $state('Chọn x rồi bấm "Tính y và chấm điểm".');

  const fn = $derived(FUNCTIONS[fnIndex]);
  const runs = $derived(graphRuns(fn.f, box));
  const inside = (/** @type {{ x: number, y: number }} */ p) =>
    p.x >= box.xMin && p.x <= box.xMax && p.y >= box.yMin && p.y <= box.yMax;

  /** @param {number} v */
  const tx = (v) => intText(v);
  /** TeX for an integer: the hyphen minus KaTeX expects. @param {number} v */
  const tn = (v) => String(v);

  const valueTex = $derived.by(() => {
    const rule = fn.tex.replace('y = ', '');
    if (!rule.includes('x')) return `f(${tn(x)}) = ${rule}`;
    const arg = x < 0 ? `(${x})` : String(x);
    const subst = rule.replace(/(\d)x/g, `$1 \\cdot ${arg}`).replace(/x/g, arg);
    return `f(${tn(x)}) = ${subst} = ${tn(fn.f(x))}`;
  });

  function feed() {
    const y = fn.f(x);
    const p = { x, y };
    if (!points.some((q) => q.x === x)) {
      points = [...points, p].sort((a, b) => a.x - b.x);
    }
    machineNote = inside(p)
      ? `x = ${tx(x)} cho y = f(${tx(x)}) = ${tx(y)}. Đã chấm điểm (${tx(x)}; ${tx(y)}).`
      : `x = ${tx(x)} cho y = ${tx(y)}. Điểm (${tx(x)}; ${tx(y)}) nằm ngoài khung vẽ, nhưng vẫn thuộc đồ thị.`;
  }

  /** @param {string | number} v */
  function chooseFn(v) {
    fnIndex = Number(v);
    points = [];
    showGraph = false;
    machineNote = 'Chọn x rồi bấm "Tính y và chấm điểm".';
  }

  function fillAll() {
    /** @type {Array<{ x: number, y: number }>} */
    const all = [];
    for (let v = -5; v <= 5; v++) all.push({ x: v, y: fn.f(v) });
    points = all;
    machineNote = `Đã chấm các điểm với x từ −5 đến 5. Các điểm này đều nằm trên đồ thị của ${fn.text}.`;
  }

  // Reading coordinates.
  let target = $state(0);
  const m = $state({ x: mx(0), y: my(0) });
  const mxv = $derived(Math.round(toX(m.x)));
  const myv = $derived(Math.round(toY(m.y)));
  const goal = $derived(TARGETS[target]);
  const hit = $derived(mxv === goal.x && myv === goal.y);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const snap = (/** @type {{ x: number, y: number }} */ p) => {
    const cx = Math.max(box.xMin, Math.min(box.xMax, Math.round(toX(p.x))));
    const cy = Math.max(box.yMin, Math.min(box.yMax, Math.round(toY(p.y))));
    return { x: mx(cx), y: my(cy) };
  };

  const drag = $derived({
    point: m,
    svg: () => svgEl ?? null,
    viewBox: { w: plane.width, h: plane.height },
    projector: snap,
    pad: 0,
    keyStep: plane.unit,
    keyShiftStep: plane.unit * 5,
  });

  const readNote = $derived(
    hit
      ? `Đúng rồi! M(${tx(mxv)}; ${tx(myv)}) có hoành độ ${tx(mxv)} và tung độ ${tx(myv)}; điểm này ${place(mxv, myv)}.`
      : `M đang ở (${tx(mxv)}; ${tx(myv)}): hoành độ ${tx(mxv)}, tung độ ${tx(myv)}; M ${place(mxv, myv)}.`,
  );

  function nextTarget() {
    target = (target + 1) % TARGETS.length;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hoạt động"
    options={[
      { value: 'machine', label: 'Máy hàm số' },
      { value: 'read', label: 'Đọc toạ độ' },
    ]}
    bind:value={mode}
  />

  {#if mode === 'machine'}
    <SegmentedControl
      label="Hàm số"
      options={FUNCTIONS.map((f, i) => ({ value: i, label: f.text }))}
      bind:value={fnIndex}
      onchange={chooseFn}
    />
    <div class="flex flex-wrap items-center gap-3">
      <Stepper label="Giá trị của x" bind:value={x} min={-6} max={6} format={tx} />
      <button type="button" class={button.primary} onclick={feed}>Tính y và chấm điểm</button>
    </div>
    <div class="overflow-x-auto text-center">
      <Tex display math={valueTex} ariaLabel="f({tx(x)}) = {tx(fn.f(x))}" />
    </div>
  {:else}
    <p class="text-slate-800">
      Kéo điểm M (hoặc chọn M rồi dùng phím mũi tên) đến điểm <Tex
        math={`(${tn(goal.x)};\\ ${tn(goal.y)})`}
      />.
    </p>
  {/if}

  <CoordinatePlane
    bind:svgEl
    {plane}
    interactive={mode === 'read'}
    label={mode === 'machine'
      ? `Mặt phẳng toạ độ với ${points.length} điểm của đồ thị ${fn.text}`
      : 'Mặt phẳng toạ độ với điểm M kéo được'}
  >
    {#if mode === 'machine'}
      {#if showGraph}
        {#each runs as run, i (i)}
          <polyline
            points={run.map((p) => `${mx(p.x)},${my(p.y)}`).join(' ')}
            fill="none"
            stroke="#1B998B"
            stroke-width="2"
            stroke-opacity="0.7"
          />
        {/each}
      {/if}
      {#each points.filter(inside) as p (p.x)}
        <circle cx={mx(p.x)} cy={my(p.y)} r="5" fill="#D7263D" stroke="#fff" stroke-width="1.5" />
      {/each}
    {:else}
      <circle
        cx={mx(goal.x)}
        cy={my(goal.y)}
        r="9"
        fill="none"
        stroke={hit ? '#059669' : '#F46036'}
        stroke-width="2"
        stroke-dasharray="3 2"
      />
      <line x1={m.x} y1={m.y} x2={m.x} y2={my(0)} stroke="#64748b" stroke-dasharray="4 3" />
      <line x1={m.x} y1={m.y} x2={mx(0)} y2={m.y} stroke="#64748b" stroke-dasharray="4 3" />
      <DragPoint
        {drag}
        color="#4F46E5"
        r={9}
        name="M"
        label="Điểm M tại ({tx(mxv)}; {tx(myv)}). Kéo hoặc dùng phím mũi tên"
      />
    {/if}
  </CoordinatePlane>

  {#if mode === 'machine'}
    <FeedbackNote tone="info" text={machineNote} />
    {#if points.length}
      <div class="overflow-x-auto">
        <table class="border-collapse text-sm">
          <tbody>
            <tr>
              <th class="border border-slate-200 bg-slate-50 px-2 py-1"><Tex math="x" /></th>
              {#each points as p (p.x)}
                <td class="border border-slate-200 px-2 py-1 text-center">{tx(p.x)}</td>
              {/each}
            </tr>
            <tr>
              <th class="border border-slate-200 bg-slate-50 px-2 py-1"><Tex math="y" /></th>
              {#each points as p (p.x)}
                <td class="border border-slate-200 px-2 py-1 text-center">{tx(p.y)}</td>
              {/each}
            </tr>
          </tbody>
        </table>
      </div>
    {/if}
    <div class="flex flex-wrap items-center gap-3">
      <button type="button" class={button.secondary} onclick={fillAll}>Chấm nhiều điểm</button>
      <label
        class="flex min-h-11 cursor-pointer select-none items-center gap-2 text-sm text-slate-700"
      >
        <input type="checkbox" bind:checked={showGraph} class="h-5 w-5 accent-indigo-600" />
        Hiện toàn bộ đồ thị
      </label>
      <button type="button" class="ml-auto {button.quiet}" onclick={() => chooseFn(fnIndex)}
        >Xoá các điểm</button
      >
    </div>
  {:else}
    <FeedbackNote tone={hit ? 'ok' : 'info'} text={readNote} />
    <button type="button" class={button.secondary} onclick={nextTarget}>Điểm khác</button>
  {/if}
</div>
