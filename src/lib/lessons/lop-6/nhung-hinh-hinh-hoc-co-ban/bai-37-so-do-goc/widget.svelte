<script>
  import { button, textInput } from '#lib/core/ui.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { KIND_NAME, along, directionTo, kindOf } from '../_shared/angle.js';
  import { arcPath, rightMarkPath } from '../_shared/angle-draw.js';
  import {
    foldUpper,
    judgeReading,
    measureFrom,
    newMeasure,
    rayDirection,
    readDegrees,
  } from './engine.js';

  const W = 400;
  const H = 250;
  const O = { x: 200, y: 212 };
  const RIM = 168;
  const HANDLE = 182;
  const START = 50;

  const KIND_STYLE = {
    nhon: 'border-sky-300 bg-sky-50 text-sky-950',
    vuong: 'border-emerald-300 bg-emerald-50 text-emerald-950',
    tu: 'border-amber-300 bg-amber-50 text-amber-950',
    bet: 'border-rose-300 bg-rose-50 text-rose-950',
  };

  /** @type {'phai' | 'trai'} */
  let side = $state('phai');
  let m = $state(START);
  let Y = $state(along(O, HANDLE, START));
  let showValue = $state(true);
  let typed = $state('');
  /** @type {null | { ok: boolean, text: string }} */
  let verdict = $state(null);
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  const inputId = $props.id();

  const xDir = $derived(side === 'phai' ? 0 : 180);
  const yDir = $derived(rayDirection(m, side));
  const xEnd = $derived(along(O, 205, xDir));
  const yEnd = $derived(along(O, 230, yDir));
  const kind = $derived(m === 0 ? null : kindOf(m));

  const ticks = Array.from({ length: 181 }, (_, d) => {
    const len = d % 10 === 0 ? 16 : d % 5 === 0 ? 10 : 5;
    return { d, p: along(O, RIM, d), q: along(O, RIM - len, d), long: d % 10 === 0 };
  });
  const labels = Array.from({ length: 19 }, (_, i) => {
    const d = i * 10;
    return { d, inner: along(O, RIM - 46, d), outer: along(O, RIM - 26, d) };
  });

  /** @param {number} next */
  function setMeasure(next) {
    m = Math.max(0, Math.min(180, next));
    Y = along(O, HANDLE, rayDirection(m, side));
    verdict = null;
  }

  const dragY = $derived({
    point: Y,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => along(O, HANDLE, foldUpper(directionTo(O, p))),
    onChange: () => {
      m = measureFrom(foldUpper(directionTo(O, Y)), side);
      verdict = null;
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setMeasure(m + (dx > 0 || dy < 0 ? 1 : -1) * (big ? 10 : 1)),
  });

  /** @param {string | number} v */
  function changeSide(v) {
    side = v === 'trai' ? 'trai' : 'phai';
    setMeasure(m);
  }

  function fresh() {
    setMeasure(newMeasure(Math.random, m));
    typed = '';
    showValue = false;
  }

  function check() {
    verdict = judgeReading(m, readDegrees(typed));
  }

  const kindText = $derived.by(() => {
    if (kind === null) return 'Hai tia Ox, Oy trùng nhau: chưa có góc. Kéo cạnh Oy ra.';
    const name = KIND_NAME[kind];
    if (!showValue) return `Đây là ${name}. Hãy đọc số đo trên thước rồi nhập vào ô bên dưới.`;
    switch (kind) {
      case 'nhon':
        return `Góc xOy = ${m}°, nhỏ hơn 90°: đây là góc nhọn.`;
      case 'vuong':
        return 'Góc xOy = 90°: đây là góc vuông.';
      case 'tu':
        return `Góc xOy = ${m}°, lớn hơn 90° và nhỏ hơn 180°: đây là góc tù.`;
      default:
        return 'Góc xOy = 180°: hai cạnh là hai tia đối nhau, đây là góc bẹt.';
    }
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Cạnh Ox nằm"
      value={side}
      onchange={changeSide}
      options={[
        { value: 'phai', label: 'Bên phải' },
        { value: 'trai', label: 'Bên trái' },
      ]}
    />
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="h-5 w-5" bind:checked={showValue} />
      Hiện số đo
    </label>
  </div>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Thước đo góc ảo đặt lên góc xOy, tâm thước trùng đỉnh O; cạnh Oy xoay được"
  >
    <path
      d="M {O.x - RIM} {O.y} A {RIM} {RIM} 0 0 1 {O.x + RIM} {O.y} Z"
      fill="#EFF6FF"
      fill-opacity="0.9"
      stroke="#3B82F6"
      stroke-width="1.5"
    />
    <path
      d="M {O.x - (RIM - 56)} {O.y} A {RIM - 56} {RIM - 56} 0 0 1 {O.x + RIM - 56} {O.y}"
      fill="none"
      stroke="#93C5FD"
      stroke-width="1"
    />
    {#each ticks as t (t.d)}
      <line
        x1={t.p.x}
        y1={t.p.y}
        x2={t.q.x}
        y2={t.q.y}
        stroke="#1E3A8A"
        stroke-width={t.long ? 1.2 : 0.6}
      />
    {/each}
    {#each labels as l (l.d)}
      <text
        x={l.outer.x}
        y={l.outer.y + 4}
        font-size="11"
        text-anchor="middle"
        fill={side === 'trai' ? '#B91C1C' : '#64748B'}
        font-weight={side === 'trai' ? 700 : 400}>{180 - l.d}</text
      >
      <text
        x={l.inner.x}
        y={l.inner.y + 4}
        font-size="10"
        text-anchor="middle"
        fill={side === 'phai' ? '#B91C1C' : '#64748B'}
        font-weight={side === 'phai' ? 700 : 400}>{l.d}</text
      >
    {/each}

    {#if kind === 'vuong'}
      <path d={rightMarkPath(O, xDir, yDir, 18)} fill="none" stroke="#059669" stroke-width="2" />
    {:else if kind}
      <path d={arcPath(O, xDir, yDir, 30)} fill="none" stroke="#B45309" stroke-width="2" />
    {/if}
    <line x1={O.x} y1={O.y} x2={xEnd.x} y2={xEnd.y} stroke="#4F46E5" stroke-width="3" />
    <line x1={O.x} y1={O.y} x2={yEnd.x} y2={yEnd.y} stroke="#1B998B" stroke-width="3" />
    <text
      x={side === 'phai' ? xEnd.x - 14 : xEnd.x + 4}
      y={xEnd.y + 18}
      font-size="15"
      font-style="italic"
      font-weight="700"
      fill="#3730A3">x</text
    >
    <circle cx={O.x} cy={O.y} r="4" fill="#1F2937" />
    <text x={O.x - 5} y={O.y + 22} font-size="14" font-weight="700" fill="#1F2937">O</text>
    {#if showValue}
      <text x={O.x + 8} y={O.y - 40} font-size="14" font-weight="700" fill="#B45309">{m}°</text>
    {/if}
    <DragPoint
      drag={dragY}
      r={10}
      color="#1B998B"
      name="y"
      label="Cạnh Oy: kéo hoặc dùng phím mũi tên để xoay, mỗi bước 1 độ, giữ Shift để bước 10 độ"
    />
  </GeometryBoard>

  <p
    class="rounded-lg border p-3 text-sm {kind ? KIND_STYLE[kind] : 'border-slate-200 bg-slate-50'}"
    aria-live="polite"
  >
    {kindText}
  </p>

  <div class="rounded-lg border border-slate-200 p-3">
    <p class="mb-2 text-sm text-slate-700">
      Tự đọc thước: bấm <span class="font-semibold">Góc mới</span> (số đo sẽ được ẩn), đọc số ở vạch mà
      cạnh Oy đi qua trên thang có vạch 0 nằm ở cạnh Ox (các số tô đỏ), rồi kiểm tra.
    </p>
    <div class="flex flex-wrap items-end gap-2">
      <button type="button" class={button.primary} onclick={fresh}>Góc mới</button>
      <div>
        <label for={inputId} class="block text-sm font-semibold text-slate-700">Số đo (độ)</label>
        <input
          id={inputId}
          class="{textInput} w-28"
          inputmode="numeric"
          autocomplete="off"
          bind:value={typed}
          onkeydown={(e) => e.key === 'Enter' && check()}
        />
      </div>
      <button type="button" class={button.secondary} onclick={check}>Kiểm tra</button>
    </div>
    <p class="mt-2 text-sm" aria-live="polite">
      {#if verdict}
        <span class={verdict.ok ? 'text-emerald-700' : 'text-rose-700'}>{verdict.text}</span>
      {/if}
    </p>
  </div>
</div>
