<script>
  import ClockFace from '#lib/core/visuals/clock-face.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { toMinutes } from '#lib/units-engine/clock.js';
  import ClockPicture from '../_shared/clock-picture.svelte';
  import { ROUTINES, hourOfDay } from '../_shared/time.js';
  import { checkRoutine } from './engine.js';

  /** Ids of the routines whose time has been set right. */
  /** @type {string[]} */
  let placed = $state([]);
  let current = $state(ROUTINES[0].id);
  let minutes = $state(toMinutes(12, 0));
  let message = $state('Em chọn một việc, đặt kim đồng hồ đúng giờ rồi bấm "Gắn giờ".');
  let lastOk = $state(false);

  const routine = $derived(ROUTINES.find((r) => r.id === current) ?? ROUTINES[0]);
  const done = $derived(placed.length === ROUTINES.length);
  const schedule = $derived(ROUTINES.filter((r) => placed.includes(r.id)));

  /** @param {string} id */
  function select(id) {
    if (placed.includes(id)) return;
    current = id;
    lastOk = false;
    message = `Em đặt đồng hồ chỉ giờ "${ROUTINES.find((r) => r.id === id)?.label}".`;
  }

  function attach() {
    const res = checkRoutine(minutes, routine);
    lastOk = res.ok;
    if (!res.ok) {
      message = res.text;
      return;
    }
    placed = [...placed, routine.id];
    const next = ROUTINES.find((r) => !placed.includes(r.id));
    message = next
      ? `${res.text} Tiếp theo: ${next.label}.`
      : `${res.text} Em đã xếp xong cả ngày!`;
    if (next) current = next.id;
  }

  function reset() {
    placed = [];
    current = ROUTINES[0].id;
    minutes = toMinutes(12, 0);
    lastOk = false;
    message = 'Em chọn một việc, đặt kim đồng hồ đúng giờ rồi bấm "Gắn giờ".';
  }
</script>

<div class="space-y-5">
  <p class="text-xl font-semibold text-slate-800">Một ngày của bạn Nam</p>
  <div role="group" aria-label="Các việc trong ngày" class="grid grid-cols-2 gap-3 sm:grid-cols-3">
    {#each ROUTINES as r (r.id)}
      {@const isDone = placed.includes(r.id)}
      <button
        type="button"
        class="flex min-h-16 items-center gap-2 rounded-2xl border-4 px-3 py-2 text-left text-lg font-semibold transition {focusRing} {isDone
          ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
          : r.id === current
            ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
            : 'border-slate-200 bg-white text-slate-800 hover:border-indigo-300'}"
        aria-pressed={r.id === current && !isDone}
        aria-disabled={isDone}
        onclick={() => select(r.id)}
      >
        <span class="text-2xl" aria-hidden="true">{isDone ? '✅' : r.icon}</span>
        <span>
          {r.label}<br /><span class="text-base font-normal">{hourOfDay(r.hour)}</span>
        </span>
      </button>
    {/each}
  </div>

  {#if !done}
    <div class="mx-auto max-w-xs">
      <ClockFace
        bind:minutes
        step={5}
        showMinuteTicks={false}
        showReading={false}
        label="Đồng hồ của Nam"
      />
    </div>
    <button type="button" class="min-h-12 w-full text-lg {button.primary}" onclick={attach}>
      Gắn giờ: {routine.label}
    </button>
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {lastOk
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if lastOk}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  {#if schedule.length > 0}
    <div class="rounded-2xl border-2 border-slate-200 bg-white p-3">
      <p class="mb-2 text-lg font-bold text-slate-800">Thời gian biểu của Nam</p>
      <ol class="space-y-2">
        {#each schedule as r (r.id)}
          <li class="flex items-center gap-3 text-lg">
            <ClockPicture hour={r.hour} size="w-14" />
            <span><b>{hourOfDay(r.hour)}</b>: {r.label.toLowerCase()}</span>
          </li>
        {/each}
      </ol>
    </div>
  {/if}

  {#if done}
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={reset}>
      Làm lại
    </button>
  {/if}
</div>
