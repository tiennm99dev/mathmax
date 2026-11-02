<script>
  import { button } from '#lib/core/ui.js';
  import TallyMarks from '../_shared/tally-marks.svelte';
  import { tallyWords } from '../_shared/survey.js';

  let count = $state(4);

  /** @param {number} delta */
  function bump(delta) {
    count = Math.min(12, Math.max(0, count + delta));
  }
</script>

<div class="space-y-3">
  <div class="flex min-h-16 items-center rounded-2xl bg-slate-50 p-3">
    <TallyMarks {count} settled />
  </div>
  <p class="text-xl font-semibold text-slate-800" aria-live="polite">
    {count === 0 ? 'Chưa có vạch nào.' : `${tallyWords(count)}: số ${count}.`}
  </p>
  <div class="flex gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={count >= 12}
      onclick={() => bump(1)}>Thêm một vạch</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={count <= 0}
      onclick={() => bump(-1)}>Bớt một vạch</button
    >
  </div>
</div>
