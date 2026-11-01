<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import ClockFace from '#lib/core/visuals/clock-face.svelte';
  import { formatDigital, fromMinutes, toMinutes } from '#lib/units-engine/clock.js';
  import { DAY_PARTS, dialNumber, namesOf, partOf } from '../_shared/time.js';
  import { TARGETS, checkTarget } from './engine.js';

  /** Colour of each row of hours, from morning to night. */
  const PART_TONES = /** @type {Record<string, string>} */ ({
    sang: 'bg-amber-50',
    trua: 'bg-yellow-100',
    chieu: 'bg-orange-100',
    toi: 'bg-indigo-100',
    dem: 'bg-slate-200',
  });

  let mode = $state('turn');
  let minutes = $state(toMinutes(13, 0));

  let round = $state(0);
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));
  const target = $derived(TARGETS[round % TARGETS.length]);

  const names = $derived(namesOf(minutes));
  const currentHour = $derived(fromMinutes(minutes).hours || 24);

  /** @param {number} hour 1 to 24 */
  function setHour(hour) {
    minutes = toMinutes(hour % 24, fromMinutes(minutes).minutes);
  }

  /** @param {number} hour 1 to 24 */
  function hourLabel(hour) {
    const part = partOf(toMinutes(hour % 24, 0));
    return hour > 12 ? `${hour} giờ, tức ${dialNumber(hour)} giờ ${part}` : `${hour} giờ ${part}`;
  }

  function check() {
    result = checkTarget(minutes, target.minutes);
  }

  function nextTarget() {
    round += 1;
    result = null;
    minutes = toMinutes(12, 0);
  }

  /** @param {string | number} value */
  function changeMode(value) {
    result = null;
    if (value === 'set') minutes = toMinutes(12, 0);
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn cách chơi"
    hideLabel
    bind:value={mode}
    onchange={changeMode}
    options={[
      { value: 'turn', label: 'Xoay kim, đọc giờ' },
      { value: 'set', label: 'Đặt đồng hồ' },
    ]}
  />

  {#if mode === 'set'}
    <p class="rounded-2xl bg-sky-50 px-4 py-3 text-xl font-bold text-slate-900" aria-live="polite">
      Em đặt đồng hồ chỉ {target.ask}.
    </p>
  {/if}

  <div class="mx-auto max-w-72">
    <ClockFace
      bind:minutes
      step={15}
      showReading={false}
      showDigital={mode === 'turn'}
      label="Đồng hồ"
      onchange={() => (result = null)}
    />
  </div>

  {#if mode === 'turn'}
    <div class="rounded-2xl bg-indigo-50 px-4 py-3" aria-live="polite">
      <p class="text-2xl font-bold text-indigo-900">{names[0]}</p>
      {#each names.slice(1) as name (name)}
        <p class="text-lg font-semibold text-slate-800">còn gọi là {name}</p>
      {/each}
    </div>

    <div class="space-y-2" role="group" aria-label="Chọn giờ trong một ngày">
      {#each DAY_PARTS as part (part.id)}
        <div class="rounded-2xl p-2 {PART_TONES[part.id]}">
          <p class="mb-1 text-base font-bold text-slate-800">{part.label}</p>
          <div class="grid grid-cols-5 gap-1 sm:grid-cols-10">
            {#each part.hours as hour (hour)}
              <button
                type="button"
                class="min-h-12 rounded-lg border-2 text-lg font-bold tabular-nums transition {focusRing} {hour ===
                currentHour
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
                aria-label={hourLabel(hour)}
                aria-pressed={hour === currentHour}
                onclick={() => setHour(hour)}>{hour}</button
              >
            {/each}
          </div>
        </div>
      {/each}
    </div>
    <p class="text-base text-slate-700">
      Đồng hồ điện tử đang hiện <b class="tabular-nums">{formatDigital(minutes)}</b>. Một ngày có 24
      ô giờ: em đếm từng ô từ 1 đến 24 nhé.
    </p>
  {:else}
    <div class="flex flex-wrap gap-3">
      {#if result?.ok}
        <button type="button" class="min-h-12 flex-1 text-lg {button.primary}" onclick={nextTarget}>
          Giờ khác
        </button>
      {:else}
        <button type="button" class="min-h-12 flex-1 text-lg {button.primary}" onclick={check}>
          Kiểm tra
        </button>
      {/if}
    </div>
    <p
      class="rounded-2xl px-4 py-3 text-lg font-semibold {result?.ok
        ? 'bg-emerald-100 text-emerald-900'
        : result
          ? 'bg-amber-100 text-amber-900'
          : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {result ? result.text : 'Kéo kim dài và kim ngắn, rồi bấm "Kiểm tra".'}
    </p>
  {/if}
</div>
