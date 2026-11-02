<script>
  import { tick } from 'svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import ClockFace from '#lib/core/visuals/clock-face.svelte';
  import { toMinutes } from '#lib/units-engine/clock.js';
  import MonthSheet from '#lib/core/kid/month-sheet.svelte';
  import { capitalize } from '#lib/core/kid/quiz.js';
  import { ACTIVITIES, PLAN_MONTH, WEEK, checkPlacement, planLine, planOf } from './engine.js';

  const START = 'Em chọn một việc, chạm vào ngày trên lịch, đặt đồng hồ rồi bấm "Ghi vào lịch".';

  /** @type {string[]} */
  let placed = $state([]);
  let current = $state(ACTIVITIES[0].id);
  let date = $state(/** @type {number | null} */ (null));
  let minutes = $state(toMinutes(12, 0));
  let message = $state(START);
  let lastOk = $state(false);

  const activity = $derived(ACTIVITIES.find((a) => a.id === current) ?? ACTIVITIES[0]);
  const done = $derived(placed.length === ACTIVITIES.length);
  const plan = $derived(planOf(placed));
  /** @type {HTMLParagraphElement | undefined} */
  let feedback = $state();
  /** @type {Array<HTMLButtonElement | undefined>} */
  const buttons = $state([]);

  /** @param {string} id */
  function select(id) {
    if (placed.includes(id)) return;
    current = id;
    date = null;
    lastOk = false;
    message = START;
  }

  async function attach() {
    const res = checkPlacement(activity, date, minutes);
    lastOk = res.ok;
    message = res.text;
    if (!res.ok) return;
    placed = [...placed, activity.id];
    const next = ACTIVITIES.find((a) => !placed.includes(a.id));
    if (next) current = next.id;
    else message = `${res.text} Em đã lập xong lịch cả tuần!`;
    date = null;
    minutes = toMinutes(12, 0);
    // "Ghi vào lịch" is gone once the plan is full: keep the focus on the result.
    if (done) {
      await tick();
      feedback?.focus();
    }
  }

  async function reset() {
    placed = [];
    current = ACTIVITIES[0].id;
    date = null;
    minutes = toMinutes(12, 0);
    lastOk = false;
    message = START;
    // "Làm lại" is gone now: hand the focus back to the first activity.
    await tick();
    buttons[0]?.focus();
  }
</script>

<div class="space-y-4">
  <p class="text-xl font-semibold text-slate-800">
    Hôm nay là thứ Hai, ngày 16 tháng 5. Em lập lịch cho tuần này.
  </p>

  <div role="group" aria-label="Các việc trong tuần" class="grid gap-2 sm:grid-cols-2">
    {#each ACTIVITIES as a, i (a.id)}
      {@const isDone = placed.includes(a.id)}
      <button
        bind:this={buttons[i]}
        type="button"
        class="flex min-h-16 items-center gap-2 rounded-2xl border-4 px-3 py-2 text-left text-lg font-semibold transition {focusRing} {isDone
          ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
          : a.id === current
            ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
            : 'border-slate-200 bg-white text-slate-800 hover:border-indigo-300'}"
        aria-pressed={a.id === current && !isDone}
        aria-disabled={isDone}
        onclick={() => select(a.id)}
      >
        <span class="text-2xl" aria-hidden="true">{isDone ? '✅' : a.icon}</span>
        <span>{a.label}<br /><span class="text-base font-normal">{a.when}</span></span>
      </button>
    {/each}
  </div>

  {#if !done}
    <MonthSheet month={PLAN_MONTH} picked={date} marks={WEEK} ondate={(d) => (date = d)} />
    <div class="mx-auto max-w-64">
      <ClockFace bind:minutes step={15} showReading={false} label="Đồng hồ" />
    </div>
    <button type="button" class="min-h-12 w-full text-lg {button.primary}" onclick={attach}>
      Ghi vào lịch: {activity.label}
    </button>
  {/if}

  <p
    bind:this={feedback}
    tabindex="-1"
    class="rounded-2xl px-4 py-3 text-lg font-semibold outline-none {lastOk
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {message}
  </p>

  {#if plan.length > 0}
    <div class="rounded-2xl border-2 border-slate-200 bg-white p-3">
      <p class="mb-2 text-lg font-bold text-slate-800">Lịch tuần của em</p>
      <ol class="space-y-2 text-lg text-slate-800">
        {#each plan as a (a.id)}
          <li><b>{a.label}:</b> {capitalize(planLine(a))}</li>
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
