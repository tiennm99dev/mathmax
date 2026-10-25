<script>
  import { focusRing } from './ui.js';

  /**
   * A labelled range input that shows its current value. `format` turns the
   * value into display text, which is also what screen readers announce.
   * @type {{
   *   label: string;
   *   value: number;
   *   min: number;
   *   max: number;
   *   step?: number;
   *   unit?: string;
   *   format?: (value: number) => string;
   *   oninput?: (value: number) => void;
   * }}
   */
  let {
    label,
    value = $bindable(),
    min,
    max,
    step = 1,
    unit = '',
    format = (v) => String(v).replace('.', ','),
    oninput,
  } = $props();

  const id = $props.id();
  const display = $derived(unit ? `${format(value)} ${unit}` : format(value));
</script>

<div class="min-w-0">
  <div class="mb-1 flex items-baseline justify-between gap-3">
    <label for={id} class="text-sm font-semibold text-slate-700 in-[.kid]:text-base">{label}</label>
    <output for={id} class="font-semibold tabular-nums text-indigo-700">{display}</output>
  </div>
  <input
    {id}
    type="range"
    class="h-11 w-full cursor-pointer rounded accent-indigo-600 in-[.kid]:h-12 {focusRing}"
    {min}
    {max}
    {step}
    aria-valuetext={display}
    bind:value
    oninput={() => oninput?.(value)}
  />
</div>
