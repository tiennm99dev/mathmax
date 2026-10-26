<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { formatNumber, texNumber } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { colorAt } from '#lib/core/visuals/svg-math.js';
  import { SCENARIOS, sides, snapX, total, xForTop } from './engine.js';

  const W = 420;
  const H = 170;
  const LEFT = 30;
  const BAR_W = 360;
  const TOP_Y = 36;
  const BOTTOM_Y = 112;
  const BAR_H = 32;

  let index = $state(0);
  const s = $derived(SCENARIOS[index]);
  let x = $state(SCENARIOS[0].min + SCENARIOS[0].step * 5);
  let showSolution = $state(false);

  /** Pixel x of a bar value. @param {number} v */
  const px = (v) => LEFT + (v / s.scaleMax) * BAR_W;

  const handle = $state({ x: 0, y: TOP_Y + BAR_H / 2 });
  $effect(() => {
    handle.x = px(total(s.top(x)));
  });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  function onDrag() {
    const length = ((handle.x - LEFT) / BAR_W) * s.scaleMax;
    x = snapX(s, xForTop(s, length));
    handle.x = px(total(s.top(x)));
    handle.y = TOP_Y + BAR_H / 2;
  }

  /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy @param {boolean} big */
  function onKey(dx, dy, big) {
    const d = dx !== 0 ? dx : -dy;
    if (d === 0) return;
    x = snapX(s, x + d * s.step * (big ? 5 : 1));
  }

  const drag = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    projector: (/** @type {{x: number, y: number}} */ p) => ({
      x: Math.min(LEFT + BAR_W, Math.max(LEFT, p.x)),
      y: TOP_Y + BAR_H / 2,
    }),
    pad: 0,
    onChange: onDrag,
    onKeyMove: onKey,
  });

  /** @param {string | number} v */
  function choose(v) {
    const next = SCENARIOS[Number(v)];
    x = snapX(next, next.min + next.step * 5);
    showSolution = false;
  }

  const val = $derived(sides(s, x));
  const xText = $derived(formatNumber(x, 1));
  const equal = $derived(Math.abs(val.diff) < 1e-9);

  /** Bars as positioned segments. @param {import('./engine.js').Part[]} parts */
  function segments(parts) {
    let at = 0;
    return parts.map((p, i) => {
      const seg = { ...p, x0: px(at), x1: px(at + p.value), color: colorAt(i + 1) };
      at += p.value;
      return seg;
    });
  }
  const topSegs = $derived(segments(s.top(x)));
  const bottomSegs = $derived(segments(s.bottom(x)));

  /**
   * A table cell with x replaced by its value: 40x → 40 · 1,5.
   * @param {string} expr
   */
  function valueTex(expr) {
    const v = texNumber(formatNumber(x, 1));
    return expr.replace(/(\d)x/g, `$1 \\cdot ${v}`).replace(/\bx\b/g, v);
  }

  /** First letter in lower case: 'Quãng đường AB' → 'quãng đường AB'. @param {string} t */
  const lower = (t) => t.charAt(0).toLowerCase() + t.slice(1);

  const feedback = $derived(
    equal
      ? {
          tone: /** @type {const} */ ('ok'),
          text: `Hai thanh dài bằng nhau: với x = ${xText}, ${lower(s.topLabel)} bằng ${lower(s.bottomLabel)} (${formatNumber(val.left)} ${s.unit}). Đó là nghiệm của phương trình.`,
        }
      : {
          tone: /** @type {const} */ ('info'),
          text: `x = ${xText}: ${lower(s.topLabel)} là ${formatNumber(val.left)} ${s.unit}, ${lower(s.bottomLabel)} là ${formatNumber(val.right)} ${s.unit}. Thanh trên ${val.diff < 0 ? 'ngắn hơn' : 'dài hơn'} ${formatNumber(Math.abs(val.diff))} ${s.unit}.`,
        },
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Dạng bài toán"
    options={SCENARIOS.map((sc, i) => ({ value: i, label: sc.label }))}
    bind:value={index}
    onchange={choose}
  />

  <p class="text-slate-800">{s.story}</p>
  <p class="text-sm text-slate-700">
    <span class="font-semibold">Bước 1. Chọn ẩn:</span>
    {s.unknown} Điều kiện: <Tex math={s.condition} />.
  </p>

  <div class="overflow-x-auto">
    <table class="w-full border-collapse text-sm">
      <thead>
        <tr class="bg-slate-50">
          {#each s.head as h, i (i)}
            <th class="border border-slate-200 px-2 py-1 text-left font-semibold">{h}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each s.rows as row, r (r)}
          <tr>
            {#each row.cells as cell, c (c)}
              <td class="border border-slate-200 px-2 py-1">
                {#if c === 0}{cell}{:else}<Tex math={cell} />{/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <ul class="space-y-1 text-sm text-slate-700" aria-label="Giá trị khi x = {xText}">
    {#each s.rows as row, r (r)}
      <li>
        {row.cells[0]}:
        <Tex
          math={`${row.cells[row.cells.length - 1]} = ${valueTex(row.cells[row.cells.length - 1])} = ${texNumber(formatNumber(row.value(x)))}`}
        />
      </li>
    {/each}
  </ul>

  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-lg select-none rounded-lg border border-slate-200 bg-white"
    style="touch-action: none"
    role="group"
    aria-label="Sơ đồ hai thanh: {s.topLabel} và {s.bottomLabel}"
  >
    <text x={LEFT} y={TOP_Y - 8} font-size="12" fill="#334155" font-weight="600">{s.topLabel}</text>
    <text x={LEFT} y={BOTTOM_Y - 8} font-size="12" fill="#334155" font-weight="600"
      >{s.bottomLabel}</text
    >
    <rect x={LEFT} y={TOP_Y} width={BAR_W} height={BAR_H} fill="#f8fafc" stroke="#e2e8f0" />
    <rect x={LEFT} y={BOTTOM_Y} width={BAR_W} height={BAR_H} fill="#f8fafc" stroke="#e2e8f0" />
    {#each [{ segs: topSegs, y: TOP_Y }, { segs: bottomSegs, y: BOTTOM_Y }] as bar, b (b)}
      {#each bar.segs as seg, i (i)}
        {#if seg.x1 > seg.x0}
          <rect
            x={seg.x0}
            y={bar.y}
            width={seg.x1 - seg.x0}
            height={BAR_H}
            fill={seg.color}
            fill-opacity="0.85"
            stroke="#fff"
          />
          {#if seg.x1 - seg.x0 > 46}
            <text
              x={(seg.x0 + seg.x1) / 2}
              y={bar.y + BAR_H / 2 + 4}
              text-anchor="middle"
              font-size="11"
              fill="#fff"
              font-weight="600">{seg.label}</text
            >
          {/if}
        {/if}
      {/each}
    {/each}
    <line
      x1={px(val.right)}
      y1={TOP_Y - 4}
      x2={px(val.right)}
      y2={BOTTOM_Y + BAR_H + 4}
      stroke={equal ? '#059669' : '#64748b'}
      stroke-width="1.5"
      stroke-dasharray="4 3"
    />
    <DragPoint
      {drag}
      color="#D7263D"
      r={10}
      label="Giá trị của x: {xText}. Kéo sang trái phải hoặc dùng phím mũi tên để đổi x"
    />
  </svg>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <p class="text-sm text-slate-700">
    <span class="font-semibold">Bước 1 (tiếp). Lập phương trình:</span>
    hai thanh phải dài bằng nhau, nên <Tex math={s.equation} />.
  </p>

  <button type="button" class={button.secondary} onclick={() => (showSolution = !showSolution)}>
    {showSolution ? 'Ẩn lời giải' : 'Bước 2 và 3: giải và trả lời'}
  </button>
  {#if showSolution}
    <div class="space-y-1 rounded-xl bg-slate-50 p-3 text-slate-800">
      {#each s.solve as line, i (i)}
        <div><Tex math={(i > 0 ? '\\Leftrightarrow ' : '') + line} /></div>
      {/each}
      <p class="pt-1 text-sm">{s.answer}</p>
    </div>
  {/if}
</div>
