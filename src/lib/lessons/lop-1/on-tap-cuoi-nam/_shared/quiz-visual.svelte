<script>
  import ClockPicture from '#lib/core/kid/clock-picture.svelte';
  import CountingSticks from '#lib/core/kid/counting-sticks.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import { pictures } from '#lib/core/kid/pictures/index.js';
  import Ruler from '#lib/core/kid/ruler.svelte';
  import ShapeFigure from '#lib/core/kid/shape-figure.svelte';
  import ThingShape from '#lib/core/kid/thing-shape.svelte';
  import { THINGS, inSentence } from '#lib/core/kid/length.js';
  import { countLabel, takeawayLabel } from '#lib/core/kid/quiz.js';
  import { FIGURE_NAMES, plainFigure } from '#lib/core/kid/shapes.js';
  import { RULER_TO } from './measure-skills.js';

  /**
   * The picture above a year-end review question: groups of pictures to
   * count, a group with some pictures crossed out, a row of shapes (with a
   * "?" box for a pattern), counting sticks, a whole-hour clock, things
   * lying from one left end (on a centimetre ruler or not), or animals in a
   * row. Each picture has one text label for screen readers that describes
   * what is drawn (where the clock hands point). Pictures to count are named
   * one by one until the question ends, so the label never states the answer.
   * @type {{ visual: import('./visual.js').Visual, settled?: boolean }}
   */
  let { visual, settled = false } = $props();

  /** SVG units per centimetre, and where the 0 mark of the strips is. */
  const UNIT = 22;
  const X0 = 20;
  const STRIP_GAP = 34;

  /** @param {string} id */
  function thingOf(id) {
    return THINGS.find((t) => t.id === id) ?? THINGS[0];
  }

  const label = $derived.by(() => {
    switch (visual.type) {
      case 'groups':
        return visual.groups.map((g) => countLabel(pictures[g.picture], g.n, settled)).join(' và ');
      case 'takeaway':
        return takeawayLabel(pictures[visual.picture], visual.total, visual.gone, settled);
      case 'figures': {
        const names = visual.figures.map((k) => FIGURE_NAMES[k]).join(', ');
        return visual.blank ? `${names}, dấu hỏi` : names;
      }
      case 'sticks':
        return `${visual.tens} bó một chục que tính và ${visual.ones} que tính rời`;
      case 'clock':
        return `Đồng hồ: kim ngắn chỉ số ${visual.hour}, kim dài chỉ số 12.`;
      case 'strips': {
        const all = visual.strips.map((s) => inSentence(thingOf(s.thing).label));
        const names = all.length > 1 ? `${all.slice(0, -1).join(', ')} và ${all.at(-1)}` : all[0];
        return visual.ruler
          ? `${names} đặt trên thước, đầu bên trái ở vạch 0`
          : `${names} đặt thẳng một đầu bên trái`;
      }
      default:
        return `Từ trái sang phải: ${visual.pictures.map((p) => pictures[p]).join(', ')}`;
    }
  });

  const stripsHeight = $derived(
    visual.type === 'strips' ? visual.strips.length * STRIP_GAP + (visual.ruler ? 54 : 6) : 0,
  );
</script>

<div
  class="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-amber-50 p-3"
  role="img"
  aria-label={label}
>
  {#if visual.type === 'groups'}
    {#each visual.groups as g, i (i)}
      <div class="flex max-w-56 flex-wrap justify-center gap-1 rounded-xl bg-white p-2">
        {#each { length: g.n } as _, j (j)}
          <Picture name={g.picture} size={40} decorative />
        {/each}
      </div>
    {/each}
  {:else if visual.type === 'takeaway'}
    <div class="flex max-w-72 flex-wrap justify-center gap-1 rounded-xl bg-white p-2">
      {#each { length: visual.total } as _, j (j)}
        {@const gone = j >= visual.total - visual.gone}
        <span class="relative inline-flex {gone ? 'opacity-50' : ''}">
          <Picture name={visual.picture} size={40} decorative />
          {#if gone}
            <svg
              class="absolute inset-0"
              viewBox="0 0 40 40"
              width="40"
              height="40"
              aria-hidden="true"
            >
              <line
                x1="4"
                y1="36"
                x2="36"
                y2="4"
                stroke="#e11d48"
                stroke-width="4"
                stroke-linecap="round"
              />
            </svg>
          {/if}
        </span>
      {/each}
    </div>
  {:else if visual.type === 'figures'}
    {#each visual.figures as kind, i (i)}
      <ShapeFigure
        figure={plainFigure(kind)}
        size={visual.figures.length > 1 ? 48 : 120}
        decorative
      />
    {/each}
    {#if visual.blank}
      <span
        class="inline-flex h-12 w-12 items-center justify-center rounded-lg border-4 border-dashed border-indigo-400 bg-white text-3xl font-bold text-indigo-600"
        aria-hidden="true">?</span
      >
    {/if}
  {:else if visual.type === 'sticks'}
    <div aria-hidden="true">
      <CountingSticks tens={visual.tens} ones={visual.ones} />
    </div>
  {:else if visual.type === 'clock'}
    <ClockPicture minutes={visual.hour * 60} size="w-40" decorative />
  {:else if visual.type === 'strips'}
    <div class="w-full space-y-1">
      <svg
        viewBox="0 0 {X0 + RULER_TO * UNIT + 50} {stripsHeight}"
        class="block w-full max-w-md"
        aria-hidden="true"
      >
        {#if !visual.ruler}
          <line
            x1={X0}
            y1="0"
            x2={X0}
            y2={stripsHeight}
            stroke="#94a3b8"
            stroke-width="2"
            stroke-dasharray="4 4"
          />
        {/if}
        {#each visual.strips as s, i (i)}
          {@const thing = thingOf(s.thing)}
          <ThingShape
            shape={thing.shape}
            x={X0}
            y={20 + i * STRIP_GAP}
            length={s.cm * UNIT}
            color={thing.color}
          />
        {/each}
        {#if visual.ruler}
          <Ruler x={X0} y={visual.strips.length * STRIP_GAP + 8} cm={RULER_TO} unit={UNIT} />
        {/if}
      </svg>
      {#if visual.strips.length > 1}
        <ul
          class="flex flex-wrap justify-center gap-x-4 text-base text-slate-700"
          aria-hidden="true"
        >
          {#each visual.strips as s, i (i)}
            {@const thing = thingOf(s.thing)}
            <li class="flex items-center gap-1">
              <span class="inline-block h-3 w-6 rounded" style:background={thing.color}></span>
              {thing.label}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {:else}
    <div class="flex items-end gap-4 border-b-4 border-emerald-700 px-2 pb-1">
      {#each visual.pictures as p, i (i)}
        <Picture name={p} size={64} decorative />
      {/each}
    </div>
  {/if}
</div>
