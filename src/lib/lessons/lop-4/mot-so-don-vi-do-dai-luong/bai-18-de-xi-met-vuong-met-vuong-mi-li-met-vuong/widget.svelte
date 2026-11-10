<script>
  import { tick } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { FULL, LEVELS, fillBy, fillMessage } from './engine.js';

  /** Colours of the small squares at each level. */
  const FILLS = ['#34d399', '#60a5fa', '#f59e0b'];
  const CELL = 30;

  let index = $state(0);
  let filled = $state(0);

  const level = $derived(LEVELS[index]);
  const status = $derived(fillMessage(level, filled));
  const last = $derived(index === LEVELS.length - 1);
  const cells = Array.from({ length: FULL }, (_, i) => i);

  let controls = $state(/** @type {HTMLElement | null} */ (null));
  let zoomButton = $state(/** @type {HTMLButtonElement | null} */ (null));

  /** @param {number} change */
  async function fill(change) {
    filled = fillBy(filled, change);
    if (filled === FULL) {
      await tick();
      zoomButton?.focus();
    }
  }

  async function zoom() {
    index = last ? 0 : index + 1;
    filled = 0;
    await tick();
    controls?.querySelector('button')?.focus();
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-bold text-slate-800">
    Hình vuông cạnh {level.big.side}: 1 {level.big.symbol}
  </p>

  <svg
    viewBox="-4 -4 {CELL * 10 + 8} {CELL * 10 + 8}"
    class="mx-auto block w-full max-w-sm"
    role="img"
    aria-label="Hình vuông 1 {level.big.symbol} chia thành 100 ô vuông 1 {level.small
      .symbol}, đã tô {filled} ô"
  >
    {#each cells as i (i)}
      <rect
        x={(i % 10) * CELL}
        y={Math.floor(i / 10) * CELL}
        width={CELL}
        height={CELL}
        fill={i < filled ? FILLS[index] : '#ffffff'}
        stroke="#94a3b8"
        stroke-width="1"
      />
    {/each}
    <rect
      x="0"
      y="0"
      width={CELL * 10}
      height={CELL * 10}
      fill="none"
      stroke="#1e293b"
      stroke-width="3"
    />
    {#if !last}
      <rect x="0" y="0" width={CELL} height={CELL} fill="none" stroke="#be123c" stroke-width="3" />
    {/if}
  </svg>
  <p class="text-center text-base text-slate-600">
    Mỗi ô nhỏ là hình vuông cạnh {level.small.side}: 1 {level.small.symbol}.
    {#if !last}Ô viền đỏ là ô em sẽ phóng to.{/if}
  </p>

  <div class="grid grid-cols-2 gap-2" role="group" aria-label="Tô ô vuông" bind:this={controls}>
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={filled >= FULL}
      onclick={() => fill(10)}>Tô 1 hàng</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={filled >= FULL}
      onclick={() => fill(1)}>Tô 1 ô</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={filled === 0}
      onclick={() => fill(-1)}>Bỏ 1 ô</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={filled === 0}
      onclick={() => fill(-FULL)}>Xoá hết</button
    >
  </div>

  <p class="text-center text-2xl font-bold text-slate-800 tabular-nums" aria-hidden="true">
    {filled}
    {level.small.symbol}
  </p>

  <FeedbackNote tone={status.done ? 'ok' : 'info'} text={status.text} />

  {#if status.done}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        bind:this={zoomButton}
        onclick={zoom}
      >
        {last ? 'Bắt đầu lại từ 1 m²' : `Phóng to 1 ô ${level.small.symbol}`}
      </button>
    </div>
  {/if}
</div>
