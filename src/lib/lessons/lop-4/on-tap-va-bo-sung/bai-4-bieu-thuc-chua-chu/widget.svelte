<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { EXPRESSIONS, givenText, reachedGoal, startValues, substitution } from './engine.js';

  let id = $state(EXPRESSIONS[0].id);
  let values = $state(startValues(EXPRESSIONS[0]));

  const expr = $derived(EXPRESSIONS.find((e) => e.id === id) ?? EXPRESSIONS[0]);
  const value = $derived(expr.value(values));
  const sentence = $derived(substitution(expr, values));
  const reached = $derived(reachedGoal(expr, values));
  const unit = $derived(expr.shape === 'none' ? '' : ' cm');

  /** Pixels per centimetre in the drawing. */
  const SCALE = 4.5;
  const W = 300;
  const H = 160;
  const sq = $derived(values.a * SCALE);
  const rw = $derived(values.a * SCALE);
  const rh = $derived(values.b * SCALE);

  /** @param {string | number} next */
  function choose(next) {
    const e = EXPRESSIONS.find((x) => x.id === next);
    if (!e) return;
    id = e.id;
    values = startValues(e);
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn biểu thức"
    hideLabel
    value={id}
    options={EXPRESSIONS.map((e) => ({ value: e.id, label: e.text }))}
    onchange={choose}
  />

  <p class="text-center text-xl font-semibold text-slate-800">
    Biểu thức <strong class="text-indigo-700">{expr.text}</strong>
    {#if expr.meaning}<span class="block text-base font-normal text-slate-600"
        >là {expr.meaning}.</span
      >{/if}
  </p>

  {#if expr.shape !== 'none'}
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block h-auto w-full max-w-sm"
      role="img"
      aria-label="Hình có {givenText(expr, values)}, đơn vị xăng-ti-mét."
    >
      {#if expr.shape === 'square'}
        <rect
          x={(W - sq) / 2}
          y={(H - sq) / 2}
          width={sq}
          height={sq}
          class="fill-sky-100 stroke-sky-600"
          stroke-width="3"
        />
        <text x={W / 2} y={(H - sq) / 2 - 6} text-anchor="middle" class="fill-slate-800 text-sm"
          >a = {values.a} cm</text
        >
      {:else if expr.shape === 'rect'}
        <rect
          x={(W - rw) / 2}
          y={(H - rh) / 2}
          width={rw}
          height={rh}
          class="fill-amber-100 stroke-amber-600"
          stroke-width="3"
        />
        <text x={W / 2} y={(H - rh) / 2 - 6} text-anchor="middle" class="fill-slate-800 text-sm"
          >a = {values.a} cm</text
        >
        <text x={(W + rw) / 2 + 6} y={H / 2 + 5} text-anchor="start" class="fill-slate-800 text-sm"
          >b = {values.b} cm</text
        >
      {:else}
        <polygon
          points="60,140 240,140 120,25"
          class="fill-emerald-100 stroke-emerald-600"
          stroke-width="3"
        />
        <text x="150" y="156" text-anchor="middle" class="fill-slate-800 text-sm"
          >a = {values.a} cm</text
        >
        <text x="190" y="78" text-anchor="start" class="fill-slate-800 text-sm"
          >b = {values.b} cm</text
        >
        <text x="84" y="78" text-anchor="end" class="fill-slate-800 text-sm">c = {values.c} cm</text
        >
      {/if}
    </svg>
  {/if}

  <div class="space-y-3 rounded-2xl bg-slate-50 p-3">
    {#each expr.letters as l (l.letter)}
      <SliderField
        label="Thay {l.name} bằng số"
        bind:value={values[l.letter]}
        min={l.min}
        max={l.max}
        unit={unit.trim()}
      />
    {/each}
  </div>

  <p
    class="rounded-2xl bg-indigo-50 px-4 py-3 text-xl font-semibold text-indigo-950"
    aria-live="polite"
  >
    {sentence}
  </p>

  <p
    class="rounded-2xl px-4 py-3 text-lg font-semibold {reached
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if reached}
      <span aria-hidden="true">⭐ </span>Đúng rồi! Giá trị của biểu thức là {fmt(value)}{unit}.
    {:else}
      {expr.goal.ask}
    {/if}
  </p>
</div>
