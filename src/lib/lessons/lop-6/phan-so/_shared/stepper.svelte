<script>
  import { focusRing } from '#lib/core/ui.js';

  /**
   * A labelled whole-number stepper: − and + buttons around the value. The
   * buttons are real buttons, so Tab, Enter and Space work, and the value is
   * announced politely when it changes.
   * @type {{
   *   label: string;
   *   value: number;
   *   min: number;
   *   max: number;
   *   format?: (v: number) => string;
   *   onchange?: (v: number) => void;
   * }}
   */
  let { label, value = $bindable(), min, max, format = (v) => String(v), onchange } = $props();

  const id = $props.id();

  /** @param {number} delta */
  function bump(delta) {
    const next = Math.min(max, Math.max(min, value + delta));
    if (next === value) return;
    value = next;
    onchange?.(next);
  }

  const btn = `inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 bg-white text-xl font-bold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`;
</script>

<div class="flex min-w-0 items-center gap-2" role="group" aria-labelledby="{id}-label">
  <span id="{id}-label" class="text-sm font-semibold text-slate-700">{label}</span>
  <button
    type="button"
    class={btn}
    onclick={() => bump(-1)}
    disabled={value <= min}
    aria-label="Giảm {label}">−</button
  >
  <output class="w-10 text-center text-lg font-bold tabular-nums text-indigo-700" aria-live="polite"
    >{format(value)}</output
  >
  <button
    type="button"
    class={btn}
    onclick={() => bump(1)}
    disabled={value >= max}
    aria-label="Tăng {label}">+</button
  >
</div>
