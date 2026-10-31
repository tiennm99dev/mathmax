<script>
  import ClockFace from '#lib/core/visuals/clock-face.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { toMinutes } from '#lib/units-engine/clock.js';
  import ClockPicture from '../_shared/clock-picture.svelte';
  import { hourOptions } from '../_shared/time.js';
  import { judgeClock, readFeedback, targetHour } from './engine.js';

  /** `set`: drag the hands to the asked hour. `read`: read a clock, pick the hour. */
  let mode = $state(/** @type {'set' | 'read'} */ ('set'));
  let round = $state(0);
  let minutes = $state(toMinutes(7, 0));
  /** @type {number | null} */
  let picked = $state(null);

  const target = $derived(targetHour(round));
  const judged = $derived(judgeClock(minutes, target));
  const options = $derived(hourOptions(target));
  const solved = $derived(mode === 'set' ? judged.state === 'right' : picked === target);

  function newRound() {
    round += 1;
    picked = null;
  }

  /** @param {number} value */
  function choose(value) {
    picked = value;
  }
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn trò chơi"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'set', label: 'Đặt giờ' },
      { value: 'read', label: 'Đọc giờ' },
    ]}
    onchange={() => (picked = null)}
  />

  {#if mode === 'set'}
    <div class="flex items-center gap-4">
      <div
        class="flex h-20 min-w-28 shrink-0 items-center justify-center rounded-2xl border-4 border-indigo-500 bg-white px-3 text-3xl font-bold text-indigo-700 tabular-nums"
        aria-hidden="true"
      >
        {target} giờ
      </div>
      <p class="text-xl font-semibold text-slate-800">
        Em kéo kim cho đồng hồ chỉ {target} giờ.
      </p>
    </div>
    <div class="mx-auto max-w-xs">
      <ClockFace bind:minutes step={5} showMinuteTicks={false} showReading={false} />
    </div>
    <p class="text-center text-base text-slate-600">
      Kim ngắn màu đen là <b>kim giờ</b>. Kim dài màu đỏ là <b>kim phút</b>.
    </p>
  {:else}
    <p class="text-xl font-semibold text-slate-800">Đồng hồ chỉ mấy giờ?</p>
    <div class="flex justify-center">
      <ClockPicture hour={target} size="w-56 max-w-full" />
    </div>
    <div role="group" aria-label="Chọn giờ" class="flex flex-wrap justify-center gap-3">
      {#each options as value (value)}
        <button
          type="button"
          class="h-16 min-w-24 rounded-2xl border-4 px-3 text-2xl font-bold tabular-nums transition {focusRing} {picked ===
          value
            ? value === target
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-rose-500 bg-rose-50 text-rose-700'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-pressed={picked === value}
          onclick={() => choose(value)}>{value} giờ</button
        >
      {/each}
    </div>
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {solved
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if solved}<span aria-hidden="true"
        >⭐
      </span>{/if}{#if mode === 'set'}{judged.text}{:else if picked === null}Em nhìn kim ngắn rồi
      chạm vào giờ đúng.{:else}{readFeedback(picked, target)}{/if}
  </p>

  <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newRound}>
    Bài khác
  </button>
</div>
