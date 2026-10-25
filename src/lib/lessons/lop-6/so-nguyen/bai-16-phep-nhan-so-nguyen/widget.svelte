<script>
  import { button, focusRing } from '#lib/core/ui.js';
  import { intText, operand } from '../_shared/integers.js';
  import {
    COLS,
    RANGE,
    ROWS,
    STEPS,
    isOpen,
    reason,
    signClass,
    signRule,
    stepCaption,
  } from './engine.js';

  const gridId = $props.id();

  let step = $state(0);
  let a = $state(3);
  let b = $state(-2);

  const open = $derived(isOpen(a, b, step));
  const cellId = (/** @type {number} */ x, /** @type {number} */ y) => `${gridId}-${x}-${y}`;

  /** @param {KeyboardEvent} e */
  function onKey(e) {
    const moves = /** @type {Record<string, [number, number]>} */ ({
      ArrowUp: [1, 0],
      ArrowDown: [-1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    });
    const m = moves[e.key];
    // A key pressed on a focused cell bubbles up to the grid: move only once.
    if (!m || e.defaultPrevented) return;
    e.preventDefault();
    a = Math.max(-RANGE, Math.min(RANGE, a + m[0]));
    b = Math.max(-RANGE, Math.min(RANGE, b + m[1]));
  }
</script>

<div class="space-y-4">
  <p class="text-sm text-slate-600">
    Hàng là thừa số thứ nhất a, cột là thừa số thứ hai b. Chọn một ô bằng cách chạm, hoặc chọn bảng
    rồi dùng phím mũi tên.
  </p>

  <div
    role="grid"
    tabindex="0"
    aria-label="Bảng nhân a · b với a, b từ âm {RANGE} đến {RANGE}"
    aria-activedescendant={cellId(a, b)}
    class="mx-auto grid max-w-md grid-cols-10 gap-0.5 rounded-lg text-center text-sm tabular-nums sm:text-base {focusRing}"
    onkeydown={onKey}
  >
    <div role="row" class="contents">
      <div role="columnheader" class="py-1 font-bold text-slate-500">a · b</div>
      {#each COLS as y (y)}
        <div
          role="columnheader"
          class="py-1 font-bold {y === b ? 'text-indigo-700' : 'text-slate-600'}"
        >
          {intText(y)}
        </div>
      {/each}
    </div>
    {#each ROWS as x (x)}
      <div role="row" class="contents">
        <div
          role="rowheader"
          class="py-1 font-bold {x === a ? 'text-indigo-700' : 'text-slate-600'}"
        >
          {intText(x)}
        </div>
        {#each COLS as y (y)}
          {@const shown = isOpen(x, y, step)}
          <div
            id={cellId(x, y)}
            role="gridcell"
            tabindex="-1"
            aria-selected={x === a && y === b}
            aria-label="{intText(x)} nhân {intText(y)}: {shown ? intText(x * y) : 'chưa mở'}"
            class="flex min-h-9 cursor-pointer items-center justify-center rounded {shown
              ? signClass(x * y)
              : 'bg-slate-200 text-slate-400'} {x === a && y === b ? 'ring-2 ring-indigo-600' : ''}"
            onclick={() => {
              a = x;
              b = y;
            }}
            onkeydown={onKey}
          >
            {shown ? intText(x * y) : '?'}
          </div>
        {/each}
      </div>
    {/each}
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => step++} disabled={step >= STEPS}>
      Mở tiếp theo quy luật
    </button>
    <button
      type="button"
      class={button.secondary}
      onclick={() => (step = STEPS)}
      disabled={step >= STEPS}>Mở hết</button
    >
    <button type="button" class={button.quiet} onclick={() => (step = 0)} disabled={step === 0}
      >Đóng lại</button
    >
  </div>
  <p class="text-slate-700" aria-live="polite">{stepCaption(step)}</p>

  <div class="rounded-xl border border-slate-200 bg-white p-4" aria-live="polite">
    <p class="text-2xl font-bold tabular-nums text-slate-900">
      {operand(a)} · {operand(b)} = {open ? intText(a * b) : '?'}
    </p>
    {#if open}
      <p class="mt-2 text-slate-700">{reason(a, b)}</p>
      <p class="mt-1 font-semibold {a * b < 0 ? 'text-rose-700' : 'text-emerald-700'}">
        {signRule(a, b)}
      </p>
    {:else}
      <p class="mt-2 text-slate-600">
        Ô này chưa mở. Em thử đoán trước, rồi bấm "Mở tiếp theo quy luật" để kiểm tra.
      </p>
    {/if}
  </div>
  <p class="text-sm text-slate-600">
    Màu xanh: tích dương; màu đỏ: tích âm; màu xám: tích bằng 0. Mở hết bảng và quan sát bốn góc.
  </p>
</div>
