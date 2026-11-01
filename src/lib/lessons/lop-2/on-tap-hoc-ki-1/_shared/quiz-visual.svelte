<script>
  import ColumnBoard from '#lib/core/kid/column-board.svelte';
  import Ruler from '#lib/core/kid/ruler.svelte';
  import ShapeFigure from '#lib/core/kid/shape-figure.svelte';
  import { FIGURE_NAMES, plainFigure } from '#lib/core/kid/shapes.js';
  import { MINUS } from '#lib/core/number-format.js';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import { resultOf, towerRows } from './arith-skills.js';
  import Balance from './balance.svelte';
  import ClockPicture from './clock-picture.svelte';
  import Figure from './figure.svelte';

  /**
   * The picture above a review question (`Visual` in `visual.js`). Numbers the
   * child has to work out stay hidden until the question ends; screen readers
   * hear the same facts the picture shows.
   * @type {{ visual: import('./visual.js').Visual, settled: boolean }}
   */
  let { visual, settled } = $props();

  /** Ruler marks, in SVG units per centimetre. */
  const UNIT = 26;
  const RULER_X = 20;
  const RULER_CM = 12;

  /** @param {import('./visual.js').Op} op */
  const signOf = (op) => (op === '+' ? '+' : MINUS);

  /**
   * The values along a chain, the start number first.
   * @param {number} start
   * @param {{ op: import('./visual.js').Op, n: number }[]} steps
   */
  function chainValues(start, steps) {
    const values = [start];
    for (const s of steps) values.push(resultOf(values[values.length - 1], s.n, s.op));
    return values;
  }
</script>

{#if visual.type === 'column'}
  {@const c = resultOf(visual.a, visual.b, visual.op)}
  <div class="flex justify-center">
    <ColumnBoard
      a={visual.a}
      b={visual.b}
      op={visual.op}
      written={settled
        ? { tens: c >= 10 ? Math.floor(c / 10) : null, ones: c % 10 }
        : { tens: null, ones: null }}
    />
  </div>
{:else if visual.type === 'chain'}
  {@const values = chainValues(visual.start, visual.steps)}
  <div
    class="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-amber-50 p-3 text-2xl font-bold tabular-nums"
    role="img"
    aria-label="Bắt đầu từ {visual.start}, rồi {visual.steps
      .map((s) => `${s.op === '+' ? 'cộng' : 'trừ'} ${s.n}`)
      .join(', rồi ')}."
  >
    <span class="rounded-xl border-4 border-indigo-400 bg-white px-3 py-1">{visual.start}</span>
    {#each visual.steps as s, i (i)}
      <span class="text-lg text-slate-600">{signOf(s.op)}{s.n} →</span>
      <span class="rounded-xl border-4 border-dashed border-indigo-400 bg-white px-3 py-1"
        >{settled ? values[i + 1] : '?'}</span
      >
    {/each}
  </div>
{:else if visual.type === 'tower'}
  {@const rows = towerRows(visual.base)}
  <div
    class="flex flex-col-reverse items-center gap-1 rounded-2xl bg-amber-50 p-3 text-2xl font-bold tabular-nums"
    role="img"
    aria-label="Tháp số ba hàng. Hàng dưới cùng là {visual.base.join(', ')}."
  >
    {#each rows as row, r (r)}
      <div class="flex gap-1">
        {#each row as n, i (i)}
          <span
            class="inline-flex h-12 w-14 items-center justify-center rounded-lg border-2 {r === 0
              ? 'border-indigo-400 bg-white'
              : 'border-dashed border-indigo-400 bg-indigo-50'}"
            >{r === 0 || settled ? n : '?'}</span
          >
        {/each}
      </div>
    {/each}
  </div>
{:else if visual.type === 'figure'}
  <div class="rounded-2xl bg-sky-50 p-3">
    <Figure figure={visual.figure} />
  </div>
{:else if visual.type === 'ruler'}
  {@const [p, q] = [...visual.name]}
  {@const x0 = RULER_X + visual.from * UNIT}
  {@const x1 = RULER_X + visual.to * UNIT}
  <div class="rounded-2xl bg-sky-50 p-3">
    <svg
      viewBox="0 0 382 110"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label="Đoạn thẳng {visual.name} đặt trên thước: đầu {p} ở vạch {visual.from}, đầu {q} ở vạch {visual.to}."
    >
      <Ruler x={RULER_X} y={60} cm={RULER_CM} unit={UNIT} />
      <line x1={x0} y1="48" x2={x1} y2="48" stroke="#3730a3" stroke-width="4" />
      {#each [{ x: x0, name: p }, { x: x1, name: q }] as d (d.name)}
        <circle cx={d.x} cy="48" r="5" fill="#1e293b" />
        <line x1={d.x} y1="48" x2={d.x} y2="60" stroke="#1e293b" stroke-dasharray="3 3" />
        <text x={d.x} y="34" text-anchor="middle" font-size="18" font-weight="700" fill="#1e293b"
          >{d.name}</text
        >
      {/each}
    </svg>
  </div>
{:else if visual.type === 'pattern'}
  <div
    class="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-amber-50 p-3"
    role="img"
    aria-label="{visual.figures.map((k) => FIGURE_NAMES[k]).join(', ')}, dấu hỏi."
  >
    {#each visual.figures as kind, i (i)}
      <ShapeFigure figure={plainFigure(kind)} size={44} decorative />
    {/each}
    <span
      class="inline-flex h-12 w-12 items-center justify-center rounded-lg border-4 border-dashed border-indigo-400 bg-white text-3xl font-bold text-indigo-600"
      aria-hidden="true">?</span
    >
  </div>
{:else if visual.type === 'scales'}
  <div class="space-y-2 rounded-2xl bg-sky-50 p-2">
    {#each visual.scales as scale, i (i)}
      <Balance {scale} />
    {/each}
  </div>
{:else if visual.type === 'cups'}
  <div class="space-y-3 rounded-2xl bg-sky-50 p-3">
    {#each visual.groups as group (group.name)}
      <div role="img" aria-label="{group.name}: {group.n} ca 1 l đầy nước.">
        <p class="mb-1 text-lg font-bold text-slate-800">{group.name}</p>
        <div class="flex flex-wrap gap-1">
          {#each { length: group.n } as _, i (i)}
            <svg viewBox="0 0 40 48" width="36" height="43" aria-hidden="true" class="shrink-0">
              <path
                d="M30 14 Q39 16 37 26 Q35 34 29 34"
                fill="none"
                stroke="#475569"
                stroke-width="3"
              />
              <path d="M6 10 H30 L28 44 H8 Z" fill="#38bdf8" stroke="#475569" stroke-width="2" />
              <text
                x="18"
                y="31"
                text-anchor="middle"
                font-size="12"
                font-weight="700"
                fill="#0c4a6e">1 l</text
              >
            </svg>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{:else if visual.type === 'clock'}
  <div class="rounded-2xl bg-sky-50 p-3">
    <ClockPicture minutes={visual.minutes} />
  </div>
{:else if visual.type === 'number-line'}
  {@const line = visual}
  {@const hole = line.min + line.blank * line.step}
  <div class="rounded-2xl bg-sky-50 p-3">
    <NumberLine
      min={line.min}
      max={line.min + (line.count - 1) * line.step}
      step={line.step}
      interactive={false}
      format={(v) => (v === hole && !settled ? '?' : String(v))}
      width={360}
      label="Tia số từ {line.min}, mỗi vạch hơn vạch trước {line.step}. Vạch thứ {line.blank +
        1} là dấu hỏi."
    />
  </div>
{/if}
