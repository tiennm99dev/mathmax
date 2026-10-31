<script>
  import { focusRing } from '#lib/core/ui.js';
  import ShapeFigure from '../_shared/shape-figure.svelte';
  import { COLORS, SHAPES, SHAPE_LOOKS, SHAPE_NAMES, shapeTitle } from '../_shared/shapes.js';

  /** @type {import('../_shared/shapes.js').ShapeKind | null} */
  let chosen = $state(null);

  /**
   * The big model of each shape on its button.
   * @param {import('../_shared/shapes.js').ShapeKind} kind
   * @returns {import('../_shared/shapes.js').Figure}
   */
  const model = (kind) => ({
    kind,
    color: COLORS[SHAPES.indexOf(kind)],
    size: 1,
    turn: 0,
    variant: 0,
  });

  /**
   * The same shape drawn three other ways: smaller, another colour, turned.
   * @param {import('../_shared/shapes.js').ShapeKind} kind
   * @returns {import('../_shared/shapes.js').Figure[]}
   */
  const others = (kind) => [
    { kind, color: COLORS[4], size: 0.55, turn: 0, variant: 1 },
    { kind, color: COLORS[5], size: 0.85, turn: kind === 'chu-nhat' ? 90 : 0, variant: 2 },
    { kind, color: COLORS[2], size: 0.8, turn: kind === 'tron' ? 0 : 25, variant: 0 },
  ];
</script>

<div class="space-y-4">
  <p class="text-xl font-semibold text-slate-800">Em chạm vào một hình để biết tên của hình.</p>
  <div role="group" aria-label="Bốn hình" class="grid grid-cols-2 gap-3 sm:grid-cols-4">
    {#each SHAPES as kind (kind)}
      <button
        type="button"
        class="flex min-h-32 flex-col items-center justify-center gap-1 rounded-2xl border-4 bg-white p-2 transition {focusRing} {chosen ===
        kind
          ? 'border-indigo-600'
          : 'border-slate-200 hover:border-indigo-300'}"
        aria-pressed={chosen === kind}
        aria-label={shapeTitle(kind)}
        onclick={() => (chosen = kind)}
      >
        <ShapeFigure figure={model(kind)} size={88} decorative />
        <span class="text-lg font-bold text-slate-800">{shapeTitle(kind)}</span>
      </button>
    {/each}
  </div>

  <div class="rounded-2xl bg-slate-100 px-4 py-3" aria-live="polite">
    {#if chosen}
      <p class="text-xl font-semibold text-slate-900">
        Đây là {SHAPE_NAMES[chosen]}. {SHAPE_LOOKS[chosen]}
      </p>
      <p class="mt-2 text-lg text-slate-700">
        To hay nhỏ, màu gì, xoay thế nào, nó vẫn là {SHAPE_NAMES[chosen]}:
      </p>
      <div class="mt-2 flex flex-wrap gap-3">
        {#each others(chosen) as figure, i (i)}
          <ShapeFigure {figure} size={72} />
        {/each}
      </div>
    {:else}
      <p class="text-xl font-semibold text-slate-800">Chưa chọn hình nào.</p>
    {/if}
  </div>
</div>
