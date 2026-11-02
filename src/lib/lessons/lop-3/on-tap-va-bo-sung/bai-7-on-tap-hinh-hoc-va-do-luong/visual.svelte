<script>
  import BalanceScale from '#lib/core/kid/balance-scale.svelte';
  import ClockPicture from '#lib/core/kid/clock-picture.svelte';
  import ShapeFigure from '#lib/core/kid/shape-figure.svelte';
  import Vessel from '#lib/core/kid/vessel.svelte';
  import { FIGURE_NAMES, plainFigure } from '#lib/core/kid/shapes.js';
  import BrokenLine from '../_shared/broken-line.svelte';
  import { POINTS, SOLID_LOOKS, SOLID_NAMES } from './engine.js';
  import SolidFigure from './solid-figure.svelte';

  /**
   * The picture of a review question (`Visual` in `engine.js`). Until the
   * question ends, a solid is described by its look, not its name, and the
   * next solid of a row stays a "?".
   * @type {{ visual: import('./engine.js').Visual, settled: boolean }}
   */
  let { visual, settled } = $props();

  const P = POINTS;
  const NAME_AT = /** @type {const} */ ([
    ['A', 0, -10],
    ['B', -14, 16],
    ['C', 14, 16],
    ['N', -16, 0],
    ['M', 16, 0],
    ['O', 0, -12],
  ]);
  const SEGMENTS = /** @type {const} */ ([
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'C'],
    ['B', 'M'],
    ['C', 'N'],
  ]);
  const W = 300;
  const CELL = 60;
</script>

{#if visual.type === 'solid'}
  <div class="flex justify-center rounded-2xl bg-sky-50 p-2">
    <div role="img" aria-label="Một khối {SOLID_LOOKS[visual.kind]}">
      <SolidFigure kind={visual.kind} size={110} />
    </div>
  </div>
{:else if visual.type === 'pattern'}
  <div
    class="flex flex-wrap items-center justify-center gap-1 rounded-2xl bg-sky-50 p-2"
    role="img"
    aria-label="{visual.row.map((k) => SOLID_NAMES[k]).join(', ')}, {settled
      ? SOLID_NAMES[visual.next]
      : 'khối chưa biết'}"
  >
    {#each visual.row as kind, i (i)}
      <SolidFigure {kind} size={46} />
    {/each}
    {#if settled}
      <SolidFigure kind={visual.next} size={46} />
    {:else}
      <span
        class="flex h-[46px] w-[46px] items-center justify-center rounded-xl border-2 border-dashed border-slate-400 text-2xl font-bold text-slate-600"
        >?</span
      >
    {/if}
  </div>
{:else if visual.type === 'points'}
  <svg
    viewBox="0 0 {W} 190"
    class="mx-auto block w-full max-w-xs select-none rounded-2xl bg-sky-50"
    role="img"
    aria-label="Hình tam giác ABC. Điểm N nằm trên cạnh AB, điểm M nằm trên cạnh AC. Đoạn thẳng BM và đoạn thẳng CN cắt nhau tại điểm O."
  >
    {#each SEGMENTS as [from, to] (from + to)}
      <line
        x1={P[from].x}
        y1={P[from].y}
        x2={P[to].x}
        y2={P[to].y}
        stroke="#1e3a8a"
        stroke-width="3"
      />
    {/each}
    {#each NAME_AT as [name, dx, dy] (name)}
      <circle cx={P[name].x} cy={P[name].y} r="4" fill="#1e3a8a" />
      <text
        x={P[name].x + dx}
        y={P[name].y + dy + 6}
        text-anchor="middle"
        font-size="18"
        font-weight="700"
        fill="#0f172a">{name}</text
      >
    {/each}
  </svg>
{:else if visual.type === 'broken'}
  <BrokenLine lengths={visual.lengths} />
{:else if visual.type === 'strip'}
  <svg
    viewBox="0 0 {visual.cells * CELL + 8} 84"
    class="mx-auto block w-full max-w-xs select-none rounded-2xl bg-sky-50"
    role="img"
    aria-label="Một hình chữ nhật được chia thành {visual.cells} ô xếp thành một hàng."
  >
    {#each { length: visual.cells } as _, i (i)}
      <rect
        x={4 + i * CELL}
        y="12"
        width={CELL}
        height="60"
        fill="#dbeafe"
        stroke="#1e3a8a"
        stroke-width="3"
      />
    {/each}
  </svg>
{:else if visual.type === 'shapes'}
  <div
    class="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-sky-50 p-2"
    role="img"
    aria-label={visual.shapes.map((s) => FIGURE_NAMES[s.kind]).join(', ')}
  >
    {#each visual.shapes as shape, i (i)}
      <ShapeFigure figure={{ ...plainFigure(shape.kind), turn: shape.turn }} size={64} decorative />
    {/each}
  </div>
{:else if visual.type === 'balance'}
  <BalanceScale left={visual.left} right={visual.right} />
{:else if visual.type === 'cans'}
  <div class="flex flex-wrap items-end justify-center gap-4 rounded-2xl bg-sky-50 p-2">
    {#each visual.litres as n, i (i)}
      <Vessel id="can" fill={1} size={i === 0 ? 96 : 64} label="Can {n} l" caption="{n} l" />
    {/each}
  </div>
{:else}
  <ClockPicture minutes={visual.minutes} />
{/if}
