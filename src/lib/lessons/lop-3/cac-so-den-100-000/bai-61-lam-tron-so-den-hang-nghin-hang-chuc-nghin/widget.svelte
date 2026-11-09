<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { roundTo, roundWhy, roundingPlaces } from '../_shared/numbers-to-100000.js';
  import {
    BOOK_NUMBERS,
    START,
    fineStep,
    positionText,
    roundingHop,
    shiftWindow,
    windowFor,
  } from './engine.js';

  /** @typedef {import('./engine.js').RoundUnit} RoundUnit */

  let unit = $state(/** @type {RoundUnit} */ (1000));
  let value = $state(/** @type {number} */ (START[1000]));
  let lo = $state(windowFor(START[1000], 1000).lo);

  const hi = $derived(lo + unit);
  const mid = $derived(lo + unit / 2);
  const rounded = $derived(roundTo(value, unit));
  const hop = $derived(roundingHop(value, unit));
  const names = $derived(roundingPlaces(unit));

  /** @param {number} n */
  function jump(n) {
    value = n;
    lo = windowFor(n, unit).lo;
  }

  /** @param {string | number} next */
  function setUnit(next) {
    unit = next === 10000 ? 10000 : 1000;
    jump(START[unit]);
  }

  /** @param {-1 | 1} way */
  function shift(way) {
    const next = shiftWindow(lo, unit, way);
    value += next - lo;
    lo = next;
  }

  /** @param {-1 | 1} way */
  function nudge(way) {
    value = Math.min(hi, Math.max(lo, value + way * fineStep(unit)));
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Làm tròn đến"
    options={[
      { value: 1000, label: 'Hàng nghìn' },
      { value: 10000, label: 'Hàng chục nghìn' },
    ]}
    value={unit}
    onchange={setUnit}
  />

  <div class="flex items-center justify-center gap-2">
    <button
      type="button"
      class="min-h-12 min-w-12 text-xl {button.quiet} px-0"
      aria-label="Bớt {fmt(fineStep(unit))}"
      disabled={value <= lo}
      onclick={() => nudge(-1)}>−</button
    >
    <p class="min-w-36 text-center text-4xl font-bold text-indigo-700 tabular-nums">{fmt(value)}</p>
    <button
      type="button"
      class="min-h-12 min-w-12 text-xl {button.quiet} px-0"
      aria-label="Thêm {fmt(fineStep(unit))}"
      disabled={value >= hi}
      onclick={() => nudge(1)}>+</button
    >
  </div>

  <NumberLine
    min={lo}
    max={hi}
    step={unit / 10}
    subdivisions={10}
    labelEvery={5}
    {value}
    onchange={(v) => (value = v)}
    width={380}
    format={fmt}
    valueText={fmt}
    marks={[{ value: mid, color: '#dc2626' }]}
    hops={hop ? [{ ...hop, color: '#4f46e5' }] : []}
    label="Tia số từ {fmt(lo)} đến {fmt(hi)}, điểm giữa là {fmt(mid)}"
    markerLabel="Số cần làm tròn"
  />

  <div class="flex justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-base {button.quiet}"
      disabled={lo === 0}
      onclick={() => shift(-1)}>← Đoạn trước</button
    >
    <button
      type="button"
      class="min-h-12 text-base {button.quiet}"
      disabled={hi === 100000}
      onclick={() => shift(1)}>Đoạn sau →</button
    >
  </div>

  <div aria-live="polite" class="space-y-2">
    <FeedbackNote tone="info" text={positionText(value, unit)} />
    <FeedbackNote tone="ok" text={roundWhy(value, unit)} />
  </div>
  <p class="text-center text-lg font-semibold text-slate-800">
    Làm tròn đến {names.target}: <span class="text-indigo-700 tabular-nums">{fmt(rounded)}</span>
  </p>

  <div class="space-y-2">
    <p class="text-center text-base text-slate-600">Số trong sách:</p>
    <div class="flex flex-wrap justify-center gap-2">
      {#each BOOK_NUMBERS[unit] as n (n)}
        <button
          type="button"
          class="min-h-12 text-lg tabular-nums {n === value ? button.primary : button.secondary}"
          aria-pressed={n === value}
          onclick={() => jump(n)}>{fmt(n)}</button
        >
      {/each}
    </div>
  </div>
</div>
