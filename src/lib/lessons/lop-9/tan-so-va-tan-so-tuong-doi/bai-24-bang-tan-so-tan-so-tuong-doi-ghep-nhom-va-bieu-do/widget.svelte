<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { focusRing } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { niceAxis } from '#lib/stats-engine/ticks.js';
  import {
    END,
    HEIGHTS,
    START,
    WIDTHS,
    classText,
    groupDetail,
    groupIndex,
    groupRows,
    percentText,
    widthNote,
  } from './engine.js';

  const W = 400;
  const H = 290;
  const LEFT = 50;
  const RIGHT = 16;
  const TOP = 22;
  const AXIS_Y = 200;
  const BAR = '#6366f1';
  const BAR_ON = '#f59e0b';
  const LINE = '#be123c';

  let widthChoice = $state(/** @type {string | number} */ (5));
  const width = $derived(Number(widthChoice));
  let measure = $state(/** @type {string | number} */ ('m'));
  let polygon = $state(false);
  let picked = $state(/** @type {number | null} */ (null));

  const rows = $derived(groupRows(HEIGHTS, START, END, width));
  const relative = $derived(measure === 'f');
  const valueOf = (/** @type {{ m: number, f: number }} */ r) => (relative ? r.f : r.m);
  const axis = $derived(niceAxis(0, Math.max(...rows.map(valueOf)), 5));
  const x = linear(START, END, LEFT, W - RIGHT);
  const y = $derived(linear(0, axis.max, AXIS_Y, TOP));
  const note = $derived(widthNote(rows, width));
  const labelEvery = $derived(rows.length > 10 ? 2 : 1);
  // Percent labels are wider than counts, so they need wider bars.
  const showValues = $derived(rows.length <= (relative ? 6 : 10));
  const points = $derived(rows.map((r) => `${x.map(r.mid)},${y.map(valueOf(r))}`).join(' '));

  /** Data dots stacked by value under the axis. */
  const dots = HEIGHTS.map((h, i) => {
    let level = 0;
    for (let j = 0; j < i; j++) if (HEIGHTS[j] === h) level++;
    return { h, cx: x.map(h + 0.5), cy: AXIS_Y + 12 + level * 8 };
  });

  /** @param {number} v */
  const valueText = (v) => (relative ? `${percentText(v)}%` : String(v));

  /** @param {number} i */
  function toggle(i) {
    picked = picked === i ? null : i;
  }

  /** @param {string | number} w */
  function pickWidth(w) {
    widthChoice = w;
    picked = null;
  }

  const pickedRow = $derived(picked === null ? null : rows[picked]);
  const pickedText = $derived(
    pickedRow === null
      ? 'Bấm vào một cột (hoặc dùng Tab rồi Enter) để xem nhóm đó gồm những dữ liệu nào.'
      : groupDetail(pickedRow, HEIGHTS.length),
  );

  const cell = 'border border-slate-200 px-3 py-1.5 text-center tabular-nums';
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Độ dài mỗi nhóm (cm)"
    bind:value={widthChoice}
    onchange={pickWidth}
    options={WIDTHS.map((w) => ({ value: w, label: `${w} cm` }))}
  />
  <div class="flex flex-wrap items-end gap-4">
    <SegmentedControl
      label="Trục đứng"
      bind:value={measure}
      options={[
        { value: 'm', label: 'Tần số' },
        { value: 'f', label: 'Tần số tương đối' },
      ]}
    />
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="h-5 w-5 accent-rose-700 {focusRing}" bind:checked={polygon} />
      Dạng đoạn thẳng (nối các điểm ứng với giá trị đại diện)
    </label>
  </div>

  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl select-none"
    role="group"
    aria-label={`Biểu đồ ${relative ? 'tần số tương đối' : 'tần số'} ghép nhóm dạng cột của chiều cao 40 học sinh, nhóm dài ${width} cm. ${rows.map((r) => `${classText(r)}: ${valueText(valueOf(r))}`).join('; ')}.`}
  >
    {#each axis.ticks as t (t)}
      <line x1={LEFT} x2={W - RIGHT} y1={y.map(t)} y2={y.map(t)} stroke="#e2e8f0" />
      <text x={LEFT - 6} y={y.map(t) + 4} text-anchor="end" font-size="15" fill="#475569"
        >{relative ? `${formatNumber(t)}%` : t}</text
      >
    {/each}

    {#each rows as r, i (r.lo)}
      {@const top = y.map(valueOf(r))}
      <g
        role="button"
        tabindex="0"
        class="cursor-pointer outline-none"
        aria-pressed={picked === i}
        aria-label={`Nhóm ${classText(r)}, tần số ${r.m}, tần số tương đối ${percentText(r.f)}%`}
        onclick={() => toggle(i)}
        onkeydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle(i);
          }
        }}
      >
        <rect
          x={x.map(r.lo)}
          y={TOP}
          width={x.map(r.hi) - x.map(r.lo)}
          height={AXIS_Y - TOP}
          fill="transparent"
        />
        <rect
          class="bar"
          x={x.map(r.lo)}
          y={top}
          width={x.map(r.hi) - x.map(r.lo)}
          height={AXIS_Y - top}
          fill={picked === i ? BAR_ON : BAR}
          fill-opacity="0.85"
          stroke="#fff"
          stroke-width="1.5"
        />
        {#if showValues && r.m > 0}
          <text
            x={(x.map(r.lo) + x.map(r.hi)) / 2}
            y={top - 5}
            text-anchor="middle"
            font-size="15"
            font-weight="700"
            fill="#334155">{valueText(valueOf(r))}</text
          >
        {/if}
      </g>
    {/each}

    {#if polygon}
      <polyline {points} fill="none" stroke={LINE} stroke-width="2.5" />
      {#each rows as r (r.lo)}
        <circle cx={x.map(r.mid)} cy={y.map(valueOf(r))} r="4" fill={LINE} />
      {/each}
    {/if}

    <line x1={LEFT} x2={W - RIGHT} y1={AXIS_Y} y2={AXIS_Y} stroke="#334155" stroke-width="1.5" />
    <line x1={LEFT} x2={LEFT} y1={TOP - 6} y2={AXIS_Y} stroke="#334155" stroke-width="1.5" />

    {#each dots as d, i (i)}
      <circle
        cx={d.cx}
        cy={d.cy}
        r="3.2"
        fill={picked !== null && groupIndex(d.h, START, width) === picked ? BAR_ON : '#64748b'}
      />
    {/each}

    {#each rows as r, i (r.lo)}
      {#if i % labelEvery === 0}
        <text x={x.map(r.lo)} y={H - 18} text-anchor="middle" font-size="15" fill="#334155"
          >{r.lo}</text
        >
      {/if}
      <line x1={x.map(r.lo)} x2={x.map(r.lo)} y1={AXIS_Y} y2={AXIS_Y + 5} stroke="#334155" />
    {/each}
    <text x={x.map(END)} y={H - 18} text-anchor="middle" font-size="15" fill="#334155">{END}</text>
    <text x={W - RIGHT} y={H - 2} text-anchor="end" font-size="14" fill="#64748b"
      >Chiều cao (cm); mỗi chấm xám là một học sinh</text
    >
  </svg>

  <FeedbackNote tone="info" text={note} />
  <FeedbackNote tone={pickedRow === null ? 'info' : 'ok'} text={pickedText} />

  <div class="max-w-full overflow-x-auto">
    <table class="mx-auto border-collapse bg-white text-sm text-slate-800">
      <caption class="pb-2 font-semibold text-slate-700">
        Bảng tần số và tần số tương đối ghép nhóm (n = 40)
      </caption>
      <thead class="bg-slate-50 font-semibold text-slate-600">
        <tr>
          <th scope="col" class={cell}>Nhóm (cm)</th>
          <th scope="col" class={cell}>Giá trị đại diện</th>
          <th scope="col" class={cell}>Tần số (m)</th>
          <th scope="col" class={cell}>Tần số tương đối (f)</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as r, i (r.lo)}
          <tr class={picked === i ? 'bg-amber-50 font-semibold' : ''}>
            <th scope="row" class={cell}>{classText(r)}</th>
            <td class={cell}>{formatNumber(r.mid)}</td>
            <td class={cell}>{r.m}</td>
            <td class={cell}>{percentText(r.f)}%</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  g:focus-visible .bar {
    stroke: #1e1b4b;
    stroke-width: 3;
  }
</style>
