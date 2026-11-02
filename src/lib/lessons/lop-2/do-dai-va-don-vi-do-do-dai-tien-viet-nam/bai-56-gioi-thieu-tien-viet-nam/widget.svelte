<script>
  import { tick } from 'svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import Banknote from '../_shared/banknote.svelte';
  import { NOTES, NOTE_WORDS, sumNotes } from '../_shared/money.js';
  import { GOODS, MAX_TRAY, SWAPS, payFeedback, swapFeedback } from './engine.js';

  let mode = $state(/** @type {'shop' | 'swap'} */ ('shop'));

  let goodIndex = $state(0);
  /** @type {import('../_shared/money.js').Note[]} */
  let tray = $state([]);

  let swapIndex = $state(0);
  let count = $state(0);

  /** @type {HTMLElement | undefined} */
  let panel = $state();
  /** @type {HTMLElement | undefined} */
  let nextEl = $state();

  const good = $derived(GOODS[goodIndex]);
  const swap = $derived(SWAPS[swapIndex]);
  const feedback = $derived(mode === 'shop' ? payFeedback(good, tray) : swapFeedback(swap, count));

  async function focusNext() {
    await tick();
    nextEl?.focus();
  }

  /** @param {import('../_shared/money.js').Note} value */
  async function addNote(value) {
    if (feedback.done || tray.length >= MAX_TRAY) return;
    tray = [...tray, value];
    if (sumNotes(tray) === good.price) focusNext();
    else if (tray.length >= MAX_TRAY) {
      await tick();
      /** @type {HTMLElement | null | undefined} */ (panel?.querySelector('[data-note]'))?.focus();
    }
  }

  /**
   * Takes one note off the tray and keeps keyboard focus on the tray or the notes.
   * @param {number} i
   */
  async function removeNote(i) {
    if (feedback.done) return;
    tray = tray.filter((_, j) => j !== i);
    await tick();
    /** @type {HTMLElement | null | undefined} */ (
      panel?.querySelector('[data-note]') ?? panel?.querySelector('[data-add]')
    )?.focus();
  }

  function countOne() {
    if (feedback.done) return;
    count += 1;
    if (count * swap.small === swap.big) focusNext();
  }

  function next() {
    if (mode === 'shop') {
      goodIndex = (goodIndex + 1) % GOODS.length;
      tray = [];
    } else {
      swapIndex = (swapIndex + 1) % SWAPS.length;
      count = 0;
    }
  }

  const noteBtn = `flex min-h-14 items-center justify-center rounded-2xl border-4 border-slate-300 bg-white p-1 hover:border-indigo-400 disabled:opacity-40 ${focusRing}`;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Trò chơi"
    hideLabel
    options={[
      { value: 'shop', label: 'Cửa hàng' },
      { value: 'swap', label: 'Đổi tiền' },
    ]}
    bind:value={mode}
  />

  <div bind:this={panel} class="space-y-3">
    {#if mode === 'shop'}
      <div class="flex items-center gap-3 rounded-2xl bg-sky-50 p-3">
        <Picture name={good.picture} size={72} decorative />
        <p class="text-xl text-slate-800">
          Em mua <strong>{good.name}</strong>. Giá:
          <strong class="text-indigo-700">{good.price} đồng</strong>.
        </p>
      </div>

      <div role="group" aria-label="Chọn tờ tiền để trả" class="grid grid-cols-2 gap-2">
        {#each NOTES as value (value)}
          <button
            type="button"
            data-add
            class={noteBtn}
            disabled={feedback.done || tray.length >= MAX_TRAY}
            aria-label="Đặt tờ {NOTE_WORDS[value]}"
            onclick={() => addNote(value)}><Banknote {value} decorative /></button
          >
        {/each}
      </div>

      <div class="rounded-2xl bg-amber-50 p-3">
        <p class="mb-2 text-lg font-semibold text-slate-700">
          Tiền em đặt: <span class="tabular-nums">{sumNotes(tray)} đồng</span>
        </p>
        {#if tray.length > 0}
          <div role="group" aria-label="Tiền đã đặt, chạm để bỏ bớt" class="flex flex-wrap gap-2">
            {#each tray as value, i (i)}
              <button
                type="button"
                data-note
                class="min-h-12 rounded-xl hover:opacity-70 {focusRing}"
                aria-label="Bỏ tờ {NOTE_WORDS[value]}"
                aria-disabled={feedback.done}
                onclick={() => removeNote(i)}><Banknote {value} small decorative /></button
              >
            {/each}
          </div>
        {/if}
      </div>
    {:else}
      <div class="flex items-center gap-3 rounded-2xl bg-sky-50 p-3">
        <Banknote value={swap.big} />
        <p class="text-xl text-slate-800">
          Đổi tờ <strong>{swap.big} đồng</strong> lấy các tờ
          <strong class="text-indigo-700">{swap.small} đồng</strong>. Cần mấy tờ?
        </p>
      </div>

      <button
        type="button"
        class={noteBtn}
        data-add
        disabled={feedback.done}
        aria-label="Đếm thêm 1 tờ {NOTE_WORDS[swap.small]}"
        onclick={countOne}
        ><Banknote value={swap.small} decorative />
        <span class="ml-2 text-xl font-bold text-slate-700" aria-hidden="true">+ 1 tờ</span></button
      >

      <div class="rounded-2xl bg-amber-50 p-3">
        <p class="mb-2 text-lg font-semibold text-slate-700">
          Đã đếm: <span class="tabular-nums">{count} tờ, {count * swap.small} đồng</span>
        </p>
        <div class="flex flex-wrap gap-2" aria-hidden="true">
          {#each { length: count } as _, i (i)}
            <Banknote value={swap.small} small decorative />
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {feedback.done
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if feedback.done}<span aria-hidden="true">⭐ </span>{/if}{feedback.text}
  </p>

  <button
    type="button"
    bind:this={nextEl}
    class="min-h-12 text-lg {feedback.done ? button.primary : button.secondary}"
    onclick={next}>{mode === 'shop' ? 'Món khác' : 'Đổi tờ khác'}</button
  >
</div>
