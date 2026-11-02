<script>
  import { button } from '#lib/core/ui.js';
  import ClockPicture from '#lib/core/kid/clock-picture.svelte';
  import { WALK_START, WALK_STEP, walkMessage } from './engine.js';

  let walked = $state(0);
  const chips = Array.from({ length: 12 }, (_, i) => (i + 1) * WALK_STEP);
</script>

<div class="space-y-3">
  <ClockPicture minutes={WALK_START + walked} />
  <ol class="grid grid-cols-6 gap-1" aria-label="Số phút kim dài đã đi">
    {#each chips as chip (chip)}
      <li
        class="rounded-lg py-2 text-center text-base font-bold tabular-nums {chip <= walked
          ? 'bg-rose-600 text-white'
          : 'bg-slate-100 text-slate-600'}"
      >
        {chip}
      </li>
    {/each}
  </ol>
  <p
    class="rounded-2xl bg-slate-100 px-4 py-3 text-lg font-semibold text-slate-800"
    aria-live="polite"
  >
    {walkMessage(walked)}
  </p>
  <button
    type="button"
    class="min-h-12 w-full text-lg {walked < 60 ? button.primary : button.secondary}"
    onclick={() => (walked = walked < 60 ? walked + WALK_STEP : 0)}
  >
    {walked < 60 ? 'Kim dài đi thêm 5 phút' : 'Làm lại'}
  </button>
</div>
