<script module>
  export const title = 'Hình phẳng, khối và đồ vật cho bé';
</script>

<script>
  import ObjectFigure from './object-figure.svelte';
  import ShapeFigure from './shape-figure.svelte';
  import { COLORS, FIGURE_NAMES, OBJECTS, plainFigure } from './shapes.js';

  const KINDS = /** @type {const} */ ([
    'vuong',
    'tron',
    'tam-giac',
    'chu-nhat',
    'lap-phuong',
    'hop-chu-nhat',
  ]);
</script>

<div class="space-y-4">
  <ul class="flex flex-wrap gap-4">
    {#each KINDS as kind (kind)}
      <li class="flex flex-col items-center gap-1 text-sm text-slate-600">
        <ShapeFigure figure={plainFigure(kind)} size={72} />
        {FIGURE_NAMES[kind]}
      </li>
    {/each}
  </ul>
  <p class="text-sm text-slate-600">Cùng một hình, khác màu, khác cỡ, xoay và biến thể:</p>
  <ul class="flex flex-wrap gap-2">
    {#each [0, 1, 2] as variant (variant)}
      <li>
        <ShapeFigure
          figure={{
            kind: 'tam-giac',
            color: COLORS[variant],
            size: 0.8,
            turn: variant * 40,
            variant,
          }}
        />
      </li>
      <li>
        <ShapeFigure
          figure={{
            kind: 'chu-nhat',
            color: COLORS[variant + 3],
            size: 1,
            turn: 90 * variant,
            variant,
          }}
        />
      </li>
    {/each}
  </ul>
  <ul class="flex flex-wrap gap-3">
    {#each OBJECTS as object (object.id)}
      <li class="flex flex-col items-center gap-1 text-xs text-slate-600">
        <ObjectFigure id={object.id} size={56} />
        {object.name}
      </li>
    {/each}
  </ul>
</div>
