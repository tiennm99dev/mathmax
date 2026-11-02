<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SolidFigure from '../_shared/solid-figure.svelte';
  import StackFigure from '../_shared/stack-figure.svelte';
  import ThingFigure from '../_shared/thing-figure.svelte';
  import { SOLID_NAMES } from '../_shared/solids.js';
  import { KIND_LABELS, buildRound } from './engine.js';

  /** @param {import('#lib/core/kid/quiz.js').KidOption} o */
  const pictureOption = (o) => typeof o !== 'string';

  /** @param {Array<import('../_shared/solids.js').SolidKind | null>} items */
  const rowLabel = (items) => items.map((k) => (k ? SOLID_NAMES[k] : 'dấu hỏi')).join(', ');
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em nhận dạng khối trụ, khối cầu và giải bài toán rất giỏi."
  {pictureOption}
>
  {#snippet visual(q, _settled)}
    {@const v = q.visual}
    {#if v}
      <div class="flex flex-wrap items-end justify-center gap-1 rounded-2xl bg-sky-50 p-3">
        {#if v.type === 'solid'}
          <SolidFigure kind={v.kind} color={v.color} lying={v.lying} size={120} decorative />
          <span class="sr-only">Một khối trong hình.</span>
        {:else if v.type === 'thing'}
          <ThingFigure id={v.id} size={120} />
        {:else if v.type === 'scene'}
          <div
            role="img"
            aria-label={rowLabel(v.items)}
            class="flex flex-wrap justify-center gap-1"
          >
            {#each v.items as kind, i (i)}
              <SolidFigure
                {kind}
                color={['#60a5fa', '#f87171', '#fbbf24', '#a78bfa'][i % 4]}
                size={52}
                decorative
              />
            {/each}
          </div>
        {:else if v.type === 'pattern'}
          <div
            role="img"
            aria-label={rowLabel(v.items)}
            class="flex flex-wrap justify-center gap-1"
          >
            {#each v.items as kind, i (i)}
              {#if kind}
                <SolidFigure {kind} size={52} decorative />
              {:else}
                <span
                  class="flex h-13 w-13 items-center justify-center rounded-xl border-4 border-dashed border-indigo-500 text-3xl font-bold text-indigo-700"
                  >?</span
                >
              {/if}
            {/each}
          </div>
        {:else if v.type === 'cells'}
          <ul class="grid w-full grid-cols-2 gap-2">
            {#each v.cells as cell (cell.expr)}
              <li
                class="flex items-center gap-2 rounded-xl bg-white p-2 text-xl font-bold tabular-nums"
              >
                <SolidFigure kind={cell.kind} size={44} decorative />
                <span
                  >{cell.expr}<span class="sr-only">, ô dạng {SOLID_NAMES[cell.kind]}</span></span
                >
              </li>
            {/each}
          </ul>
        {:else if v.type === 'blocks'}
          <ul class="flex flex-wrap justify-center gap-2">
            {#each v.blocks as block, i (i)}
              <li class="flex flex-col items-center text-lg font-bold">
                <SolidFigure
                  kind={block.kind}
                  color={block.kind === 'cau' ? '#fbbf24' : '#34d399'}
                  lying={block.kind === 'tru'}
                  size={72}
                  decorative
                />
                <span><span class="sr-only">{SOLID_NAMES[block.kind]}: </span>{block.kg} kg</span>
              </li>
            {/each}
          </ul>
        {:else if v.type === 'stack'}
          <StackFigure rows={v.rows} size={v.rows === 5 ? 40 : 48} />
        {/if}
      </div>
    {/if}
  {/snippet}
  {#snippet option(opt, _i)}
    {#if typeof opt === 'string'}
      {opt}
    {:else if opt.thing}
      <ThingFigure id={opt.thing} size={76} decorative />
    {:else}
      <SolidFigure kind={opt.solid} size={76} decorative />
    {/if}
  {/snippet}
</ChoiceRound>
