<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import ObjectFigure from '#lib/core/kid/object-figure.svelte';
  import ShapeFigure from '#lib/core/kid/shape-figure.svelte';
  import { FIGURE_NAMES } from '#lib/core/kid/shapes.js';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nhận biết tốt các hình phẳng."
  pictureOption={(o) => typeof o !== 'string' && Boolean(o.figure)}
>
  {#snippet visual(q)}
    {#if q.figure}
      <div class="flex justify-center rounded-2xl bg-amber-50 p-3">
        <ShapeFigure figure={q.figure} size={140} decorative />
      </div>
    {:else if q.object}
      <div class="flex justify-center rounded-2xl bg-amber-50 p-3">
        <ObjectFigure id={q.object} size={140} />
      </div>
    {:else if q.scene}
      <div
        class="flex max-w-md flex-wrap gap-2 rounded-2xl bg-amber-50 p-3"
        role="img"
        aria-label="Bức tranh có nhiều hình: {q.scene.map((f) => FIGURE_NAMES[f.kind]).join(', ')}"
      >
        {#each q.scene as figure, i (i)}
          <ShapeFigure {figure} size={56} decorative />
        {/each}
      </div>
    {:else if q.sticks}
      <div class="flex justify-center rounded-2xl bg-amber-50 p-3">
        <svg
          viewBox="0 0 200 140"
          class="w-full max-w-xs"
          role="img"
          aria-label="Hình xếp bằng {q.sticks.length} que tính"
        >
          {#each q.sticks as s, i (i)}
            {@const len = Math.hypot(s.x2 - s.x1, s.y2 - s.y1)}
            {@const ux = (s.x2 - s.x1) / len}
            {@const uy = (s.y2 - s.y1) / len}
            <line
              x1={s.x1 + ux * 5}
              y1={s.y1 + uy * 5}
              x2={s.x2 - ux * 5}
              y2={s.y2 - uy * 5}
              stroke="#d97706"
              stroke-width="7"
              stroke-linecap="round"
            />
            <circle cx={s.x2 - ux * 8} cy={s.y2 - uy * 8} r="4.5" fill="#dc2626" />
          {/each}
        </svg>
      </div>
    {/if}
  {/snippet}
  {#snippet option(o)}
    {#if o.figure}
      <ShapeFigure figure={o.figure} size={80} decorative />
    {:else}
      {o.label}
    {/if}
  {/snippet}
</ChoiceRound>
