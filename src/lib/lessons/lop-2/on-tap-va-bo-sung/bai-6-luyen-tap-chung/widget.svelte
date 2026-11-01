<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import ColumnBoard from '#lib/core/kid/column-board.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  /** Spacing of the ray's ticks and its left margin, in SVG units. */
  const GAP = 64;
  const LEFT = 32;

  /**
   * The result digits once a column question ends; a one-digit result
   * leaves the tens empty, as the book writes it.
   * @param {{ a: number, b: number, op: '+' | '-' }} v
   */
  function resultDigits(v) {
    const c = v.op === '+' ? v.a + v.b : v.a - v.b;
    return { tens: c >= 10 ? Math.floor(c / 10) : null, ones: c % 10 };
  }

  /**
   * The hidden number of a ray: the neighbours on each side meet halfway.
   * @param {Array<number | null>} numbers
   */
  function hiddenValue(numbers) {
    const at = numbers.indexOf(null);
    return (Number(numbers[at - 1]) + Number(numbers[at + 1])) / 2;
  }

  /**
   * What a screen reader hears for the ray.
   * @param {Array<number | null>} numbers
   * @param {boolean} settled
   */
  function rayLabel(numbers, settled) {
    const shown = numbers.map((n) =>
      n === null ? (settled ? String(hiddenValue(numbers)) : 'ô trống') : String(n),
    );
    return `Tia số: ${shown.join(', ')}.`;
  }
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nắm chắc các kiến thức ôn tập đầu năm lớp 2."
>
  {#snippet visual(q, settled)}
    {#if q.visual?.type === 'column'}
      <div class="flex justify-center">
        <ColumnBoard
          a={q.visual.a}
          b={q.visual.b}
          op={q.visual.op}
          written={settled ? resultDigits(q.visual) : { tens: null, ones: null }}
        />
      </div>
    {:else if q.visual?.type === 'ray'}
      {@const numbers = q.visual.numbers}
      <svg
        viewBox="0 0 {LEFT * 2 + GAP * 4 + 24} 96"
        class="mx-auto block w-full max-w-md"
        role="img"
        aria-label={rayLabel(numbers, settled)}
      >
        <line
          x1="8"
          y1="40"
          x2={LEFT * 2 + GAP * 4 + 12}
          y2="40"
          stroke="currentColor"
          stroke-width="3"
        />
        <path d="M {LEFT * 2 + GAP * 4 + 20} 40 l -12 -7 v 14 z" fill="currentColor" />
        {#each numbers as n, i (i)}
          {@const x = LEFT + i * GAP}
          <line x1={x} y1="30" x2={x} y2="50" stroke="currentColor" stroke-width="3" />
          {#if n === null}
            <rect
              x={x - 24}
              y="56"
              width="48"
              height="34"
              rx="8"
              class={settled
                ? 'fill-emerald-100 stroke-emerald-600'
                : 'fill-amber-100 stroke-amber-500'}
              stroke-width="2"
            />
            <text {x} y="80" text-anchor="middle" class="fill-current text-[22px] font-bold">
              {settled ? hiddenValue(numbers) : '?'}
            </text>
          {:else}
            <text {x} y="80" text-anchor="middle" class="fill-current text-[22px]">{n}</text>
          {/if}
        {/each}
      </svg>
    {/if}
  {/snippet}
</ChoiceRound>
