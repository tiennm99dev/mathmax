<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { PAIRS, checkSign, columns, scanSteps } from './engine.js';

  const SIGNS = /** @type {const} */ (['>', '<', '=']);
  const SIGN_NAMES = { '>': 'lớn hơn', '<': 'bé hơn', '=': 'bằng' };

  let index = $state(0);
  /** How many scan steps are shown. */
  let shown = $state(0);
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));

  const pair = $derived(PAIRS[index % PAIRS.length]);
  const a = $derived(pair[0]);
  const b = $derived(pair[1]);
  const cols = $derived(columns(a, b));
  const steps = $derived(scanSteps(a, b));
  const visible = $derived(steps.slice(0, shown));
  /** Places already checked and found equal, and the deciding one. */
  const checked = $derived(new Set(visible.filter((s) => !s.differs).map((s) => s.exp)));
  const decider = $derived(visible.find((s) => s.differs) ?? null);
  const solved = $derived(result?.ok === true);
  /** Columns a longer number has alone, lit when the count of digits decides. */
  const extra = $derived(decider !== null && decider.exp === null);

  /**
   * The colour of one cell.
   * @param {{ exp: number, top: number | null, bottom: number | null }} col
   */
  function tone(col) {
    if (decider && decider.exp === col.exp)
      return 'bg-amber-300 text-slate-900 ring-2 ring-amber-500';
    if (extra && (col.top === null || col.bottom === null)) return 'bg-amber-200 text-slate-900';
    if (checked.has(col.exp)) return 'bg-emerald-100 text-emerald-900';
    return 'bg-white text-slate-900';
  }

  /** @param {'>' | '<' | '='} sign */
  function pick(sign) {
    if (solved) return;
    result = checkSign(a, b, sign);
    if (result.ok) shown = steps.length;
  }

  function next() {
    index += 1;
    shown = 0;
    result = null;
  }
</script>

<div class="space-y-4">
  <p class="text-center text-lg font-semibold text-slate-700">
    Em so sánh hai số. Chạm "Xem hàng tiếp" để so sánh từng hàng.
  </p>

  <div
    class="mx-auto grid w-fit gap-1"
    style:grid-template-columns="repeat({cols.length}, auto)"
    role="img"
    aria-label="Số trên {fmt(a)}, số dưới {fmt(b)}"
  >
    {#each cols as col (col.exp)}
      <span
        class="flex h-11 w-7 items-center justify-center rounded-lg text-2xl font-bold tabular-nums {col.top ===
        null
          ? ''
          : tone(col)} {col.exp % 3 === 2 && col.exp < cols.length - 1 ? 'ml-2' : ''}"
        >{col.top ?? ''}</span
      >
    {/each}
    {#each cols as col (col.exp)}
      <span
        class="flex h-11 w-7 items-center justify-center rounded-lg text-2xl font-bold tabular-nums {col.bottom ===
        null
          ? ''
          : tone(col)} {col.exp % 3 === 2 && col.exp < cols.length - 1 ? 'ml-2' : ''}"
        >{col.bottom ?? ''}</span
      >
    {/each}
  </div>

  <ul class="space-y-1 text-lg text-slate-700" aria-live="polite">
    {#each visible as step, i (i)}
      <li class={step.differs ? 'font-bold text-amber-800' : ''}>{step.text}</li>
    {/each}
  </ul>

  <div class="flex justify-center">
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={shown >= steps.length}
      onclick={() => (shown += 1)}>Xem hàng tiếp</button
    >
  </div>

  <p class="text-center text-xl font-semibold text-slate-800 tabular-nums">
    {fmt(a)} <span class="text-indigo-700">?</span>
    {fmt(b)}
  </p>
  <div class="grid grid-cols-3 gap-2" role="group" aria-label="Chọn dấu">
    {#each SIGNS as sign (sign)}
      <button
        type="button"
        class="min-h-14 text-3xl font-bold {button.quiet}"
        aria-label="Dấu {SIGN_NAMES[sign]}"
        disabled={solved}
        onclick={() => pick(sign)}>{sign}</button
      >
    {/each}
  </div>

  <FeedbackNote
    tone={result === null ? 'info' : result.ok ? 'ok' : 'warn'}
    text={result?.text ?? 'Em chọn dấu >, < hoặc =.'}
  />

  {#if solved}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Cặp số khác
      </button>
    </div>
  {/if}
</div>
