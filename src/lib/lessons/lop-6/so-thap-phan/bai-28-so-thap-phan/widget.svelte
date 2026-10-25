<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { button } from '#lib/core/ui.js';
  import {
    LEVELS,
    PLACE,
    TARGETS,
    compareText,
    fractionText,
    judge,
    overview,
    places,
    snapTo,
    text,
    tick,
    ticks,
    zoomIn,
    zoomOut,
  } from './engine.js';

  const W = 380;
  const H = 118;
  const PAD = 30;
  const BASE = 74;

  let view = $state(overview());
  let v = $state(1000);
  let targetIndex = $state(0);
  let verdict = $state(/** @type {null | { ok: boolean, text: string }} */ (null));

  const target = $derived(TARGETS[targetIndex]);
  const marks = $derived(ticks(view));
  const step = $derived(tick(view.level));
  const p = $derived(places(v));
  const xOf = (/** @type {number} */ val) =>
    PAD + ((val - view.start) / (view.end - view.start)) * (W - 2 * PAD);
  const valOf = (/** @type {number} */ x) =>
    view.start + ((x - PAD) / (W - 2 * PAD)) * (view.end - view.start);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };
  const drag = {
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => setV(snapTo(view, valOf(scratch.x))),
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setV(snapTo(view, v + (dx - dy) * step * (big ? 5 : 1))),
  };

  /** @param {number} next */
  function setV(next) {
    if (next === v) return;
    v = next;
    verdict = null;
  }

  function zoomInHere() {
    view = zoomIn(view, v);
  }

  function zoomOutOnce() {
    view = zoomOut(view);
  }

  function nextTarget() {
    targetIndex = (targetIndex + 1) % TARGETS.length;
    verdict = null;
  }

  /** @param {number} i @param {number} count */
  const labelled = (i, count) => view.level === 0 || i === 0 || i === count - 1 || i === 5;

  const segmentText = $derived(
    view.level === 0
      ? 'Cả trục số từ −3 đến 3, mỗi khoảng là 1 đơn vị.'
      : `Đoạn từ ${text(view.start)} đến ${text(view.end)} được chia 10 phần, mỗi vạch cách nhau ${text(step)} (${PLACE[view.level]}).`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
    <p class="text-3xl font-bold tabular-nums text-indigo-700" aria-live="polite">
      <span class="sr-only">Điểm đang chọn: </span>{text(v)}
    </p>
    <table class="w-full max-w-md table-fixed border-collapse text-center text-sm">
      <thead>
        <tr class="text-slate-600">
          <th class="border border-slate-300 px-1 py-1 font-semibold">Dấu</th>
          <th class="border border-slate-300 px-1 py-1 font-semibold">Phần nguyên</th>
          <th class="border border-slate-300 px-1 py-1 font-semibold">Phần mười</th>
          <th class="border border-slate-300 px-1 py-1 font-semibold">Phần trăm</th>
          <th class="border border-slate-300 px-1 py-1 font-semibold">Phần nghìn</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-lg font-bold tabular-nums">
          <td class="border border-slate-300 py-1">{v < 0 ? '−' : v > 0 ? '+' : ''}</td>
          <td class="border border-slate-300 py-1">{p.int}</td>
          <td class="border border-slate-300 py-1 {view.level >= 1 ? 'bg-indigo-50' : ''}">
            {p.tenths}
          </td>
          <td class="border border-slate-300 py-1 {view.level >= 2 ? 'bg-indigo-50' : ''}">
            {p.hundredths}
          </td>
          <td class="border border-slate-300 py-1 {view.level >= 3 ? 'bg-indigo-50' : ''}">
            {p.thousandths}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="text-slate-700">
    Phân số thập phân: <strong class="tabular-nums">{text(v)} = {fractionText(v)}</strong>; so với
    0: <strong class="tabular-nums">{compareText(v, 0)}</strong>.
  </p>

  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-2xl select-none"
    style:aspect-ratio="{W} / {H}"
    style:touch-action="none"
    role="group"
    aria-label="Trục số phóng to. {segmentText}"
  >
    <line x1={PAD - 14} y1={BASE} x2={W - PAD + 14} y2={BASE} stroke="#334155" stroke-width="2" />
    <path d="M {W - PAD + 20} {BASE} l -9 -5 v 10 z" fill="#334155" />
    {#each marks as m, i (m)}
      {@const big = labelled(i, marks.length)}
      <line
        x1={xOf(m)}
        y1={BASE - (big ? 10 : 6)}
        x2={xOf(m)}
        y2={BASE + (big ? 10 : 6)}
        stroke={m === 0 ? '#0f172a' : '#475569'}
        stroke-width={big ? 2 : 1.2}
      />
      {#if big}
        <text
          x={xOf(m)}
          y={BASE + 30}
          text-anchor="middle"
          font-size="16"
          fill={m < 0 ? '#9f1239' : '#334155'}>{text(m)}</text
        >
      {/if}
    {/each}

    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Điểm trên trục số"
      aria-valuemin={view.start / 1000}
      aria-valuemax={view.end / 1000}
      aria-valuenow={v / 1000}
      aria-valuetext={text(v)}
      style="cursor:grab; outline:none"
      use:draggable={drag}
    >
      <line
        x1={xOf(v)}
        y1={BASE - 30}
        x2={xOf(v)}
        y2={BASE}
        stroke="#4F46E5"
        stroke-width="2"
        stroke-dasharray="3 3"
      />
      <circle
        class="drag-knob"
        cx={xOf(v)}
        cy={BASE}
        r="9"
        fill="#4F46E5"
        stroke="#fff"
        stroke-width="2"
      />
      <text
        x={Math.min(W - 34, Math.max(34, xOf(v)))}
        y={BASE - 38}
        text-anchor="middle"
        font-size="16"
        font-weight="700"
        fill="#3730a3">{text(v)}</text
      >
    </g>
  </svg>
  <p class="text-sm text-slate-600" aria-live="polite">{segmentText}</p>

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.primary}
      onclick={zoomInHere}
      disabled={view.level >= LEVELS - 1}>Phóng to quanh điểm</button
    >
    <button type="button" class={button.quiet} onclick={zoomOutOnce} disabled={view.level === 0}
      >Thu nhỏ</button
    >
  </div>
  <p class="text-sm text-slate-600">
    Kéo điểm tím (hoặc dùng phím mũi tên, giữ Shift để đi 5 vạch). Mỗi lần phóng to, đoạn chứa điểm
    được chia thành 10 phần bằng nhau: em nhìn thấy thêm một hàng thập phân.
  </p>

  <div class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
    <p class="text-lg font-semibold text-slate-800">
      Thử thách: đặt điểm tại <span class="tabular-nums text-indigo-700">{text(target)}</span>.
    </p>
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.secondary} onclick={() => (verdict = judge(v, target))}
        >Kiểm tra</button
      >
      <button type="button" class={button.quiet} onclick={nextTarget}>Số khác</button>
    </div>
    <p
      class="font-semibold {verdict?.ok ? 'text-emerald-700' : 'text-rose-700'}"
      aria-live="polite"
    >
      {verdict?.text ?? ''}
    </p>
  </div>
</div>
