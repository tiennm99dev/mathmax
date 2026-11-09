<script>
  import { button } from '#lib/core/ui.js';

  /**
   * A big − and + pair for one place of a number, with 48 px touch targets.
   * The value itself is shown by the widget.
   * @type {{
   *   name: string;
   *   value: number;
   *   min?: number;
   *   max?: number;
   *   onchange: (value: number) => void;
   * }}
   */
  let { name, value, min = 0, max = 9, onchange } = $props();
</script>

<div class="flex items-center justify-center gap-2">
  <button
    type="button"
    class="min-h-12 min-w-12 text-2xl {button.quiet} px-0"
    aria-label="Bớt 1 {name}"
    disabled={value <= min}
    onclick={() => onchange(value - 1)}>−</button
  >
  <button
    type="button"
    class="min-h-12 min-w-12 text-2xl {button.quiet} px-0"
    aria-label="Thêm 1 {name}"
    disabled={value >= max}
    onclick={() => onchange(value + 1)}>+</button
  >
</div>
