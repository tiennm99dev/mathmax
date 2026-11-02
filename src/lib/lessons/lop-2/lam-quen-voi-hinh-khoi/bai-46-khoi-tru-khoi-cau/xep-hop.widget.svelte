<script>
  import { button } from '#lib/core/ui.js';
  import StackFigure from '../_shared/stack-figure.svelte';
  import { stackSum, stackTotal } from '../_shared/solids.js';

  /** The child adds or takes away rows and sees the count of boxes grow. */

  const MAX_ROWS = 5;
  let rows = $state(1);
</script>

<div class="space-y-4">
  <div class="flex min-h-48 items-end justify-center overflow-x-auto rounded-2xl bg-sky-50 p-3">
    <StackFigure {rows} size={rows === MAX_ROWS ? 40 : 48} />
  </div>
  <div class="flex flex-wrap justify-center gap-3">
    <button
      type="button"
      class="{button.primary} min-h-12 text-lg"
      disabled={rows === MAX_ROWS}
      onclick={() => (rows += 1)}
    >
      Thêm một hàng
    </button>
    <button
      type="button"
      class="{button.quiet} min-h-12 text-lg"
      disabled={rows === 1}
      onclick={() => (rows -= 1)}
    >
      Bớt một hàng
    </button>
  </div>
  <p
    class="rounded-2xl bg-slate-100 px-4 py-3 text-xl font-semibold text-slate-800"
    aria-live="polite"
  >
    {rows === 1
      ? 'Một hàng có 1 hộp.'
      : `${rows} hàng: ${stackSum(rows)}. Có tất cả ${stackTotal(rows)} hộp.`}
  </p>
</div>
