<script>
  import Picture from '#lib/core/kid/picture.svelte';
  import Ruler from '#lib/core/kid/ruler.svelte';
  import { pictures } from '#lib/core/kid/pictures/index.js';
  import { countLabel } from '#lib/core/kid/quiz.js';
  import { resultOf } from '#lib/core/kid/column.js';
  import ColumnBoard from './column-board.svelte';
  import Figure from './figure.svelte';
  import PlaceBlock from './place-block.svelte';
  import SolidFigure from './solid-figure.svelte';
  import { SOLID_LOOKS } from './solids.js';
  import MeasureSurveyVisual from './measure-survey-visual.svelte';

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
  const LETTERS = ['A', 'B', 'C', 'D'];
  const SOLID_COLORS = ['#60a5fa', '#f87171', '#fbbf24', '#a78bfa'];

  /**
   * The blocks of a number as lists a screen reader can count.
   * @param {{ hundreds: number, tens: number, ones: number }} b
   */
  const blocksLabel = (b) =>
    /** @type {Array<[string, number]>} */ ([
      ['tấm trăm', b.hundreds],
      ['thanh chục', b.tens],
      ['khối đơn vị', b.ones],
    ])
      .filter(([, n]) => n > 0)
      .map(([noun, n]) => countLabel(noun, n, settled))
      .join('. ');
</script>

{#if visual.type === 'column'}
  <div class="flex justify-center">
    <ColumnBoard
      a={visual.a}
      b={visual.b}
      op={visual.op}
      result={visual.shown ?? (settled ? resultOf(visual.a, visual.b, visual.op) : null)}
    />
  </div>
{:else if visual.type === 'chain'}
  <div
    class="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-amber-50 p-3 text-2xl font-bold tabular-nums"
    role="img"
    aria-label="Bắt đầu từ {visual.start}, rồi {visual.steps
      .map((s) => `${s.word} ${s.n}`)
      .join(', rồi ')}."
  >
    <span class="rounded-xl border-4 border-indigo-400 bg-white px-3 py-1">{visual.start}</span>
    {#each visual.steps as s, i (i)}
      <span class="text-lg text-slate-600">{s.sign} {s.n} →</span>
      <span class="rounded-xl border-4 border-dashed border-indigo-400 bg-white px-3 py-1"
        >{settled ? s.value : '?'}</span
      >
    {/each}
  </div>
{:else if visual.type === 'sequence'}
  <div
    class="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-amber-50 p-3 text-2xl font-bold tabular-nums"
    role="img"
    aria-label="Dãy số: {visual.items
      .map((n, i) => (i === visual.blank && !settled ? 'dấu hỏi' : n))
      .join(', ')}."
  >
    {#each visual.items as n, i (i)}
      {#if i === visual.blank}
        <span
          class="inline-flex h-12 min-w-16 items-center justify-center rounded-xl border-4 border-dashed border-indigo-400 bg-white px-2 text-indigo-600"
          >{settled ? n : '?'}</span
        >
      {:else}
        <span
          class="inline-flex h-12 min-w-16 items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-2"
          >{n}</span
        >
      {/if}
    {/each}
  </div>
{:else if visual.type === 'blocks'}
  <div
    class="flex flex-wrap items-end justify-center gap-3 rounded-2xl bg-sky-50 p-3"
    role="img"
    aria-label={blocksLabel(visual)}
  >
    {#each { length: visual.hundreds } as _, i (i)}
      <PlaceBlock kind="hundreds" />
    {/each}
    {#if visual.tens > 0}
      <div class="flex gap-1">
        {#each { length: visual.tens } as _, i (i)}
          <PlaceBlock kind="tens" />
        {/each}
      </div>
    {/if}
    {#if visual.ones > 0}
      <div class="grid grid-cols-3 gap-1">
        {#each { length: visual.ones } as _, i (i)}
          <PlaceBlock kind="ones" cell={8} />
        {/each}
      </div>
    {/if}
  </div>
{:else if visual.type === 'cards'}
  <div
    class="flex justify-center gap-3 rounded-2xl bg-amber-50 p-3"
    role="img"
    aria-label="Ba thẻ số: {visual.digits.join(', ')}."
  >
    {#each visual.digits as d, i (i)}
      <span
        class="inline-flex h-16 w-14 items-center justify-center rounded-xl border-4 border-indigo-400 bg-white text-3xl font-bold tabular-nums"
        >{d}</span
      >
    {/each}
  </div>
{:else if visual.type === 'table'}
  <div class="overflow-hidden rounded-2xl border-2 border-slate-300 bg-white">
    <table class="w-full text-left text-lg">
      <thead class="bg-slate-100">
        <tr>
          {#each visual.head as title (title)}
            <th scope="col" class="px-3 py-2 font-semibold">{title}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each visual.rows as [name, n] (name)}
          <tr class="border-t border-slate-200">
            <td class="px-3 py-2">{name}</td>
            <td class="px-3 py-2 font-bold tabular-nums">{n}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else if visual.type === 'groups'}
  <div
    class="flex flex-wrap justify-center gap-2 rounded-2xl bg-amber-50 p-2"
    role="img"
    aria-label="{visual.groups} nhóm, mỗi nhóm {visual.each} {pictures[visual.picture]}."
  >
    {#each { length: visual.groups } as _, g (g)}
      <div
        class="flex max-w-24 flex-wrap justify-center rounded-xl border-2 border-amber-300 bg-white p-1"
      >
        {#each { length: visual.each } as _, i (i)}
          <Picture name={visual.picture} size={26} decorative />
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
      <Ruler x={RULER_X} y={60} cm={RULER_CM} unit={UNIT} fontSize={18} />
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
{:else if visual.type === 'solids'}
  <div
    class="flex flex-wrap items-end justify-center gap-2 rounded-2xl bg-sky-50 p-3"
    role="img"
    aria-label={visual.kinds.map((k, i) => `Hình ${LETTERS[i]}: ${SOLID_LOOKS[k]}`).join('. ')}
  >
    {#each visual.kinds as kind, i (kind)}
      <div class="flex flex-col items-center">
        <SolidFigure {kind} color={SOLID_COLORS[i]} size={68} />
        <span class="text-lg font-bold text-slate-800">{LETTERS[i]}</span>
      </div>
    {/each}
  </div>
{:else}
  <MeasureSurveyVisual {visual} {settled} />
{/if}
