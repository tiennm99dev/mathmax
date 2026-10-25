<script>
  import Picture from '#lib/core/kid/picture.svelte';
  import { pictures } from '#lib/core/kid/pictures.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    CARDS,
    MAX_COUNT,
    NUMBER_WORDS,
    compareTray,
    moveObject,
    nextTarget,
    trayMessage,
  } from './engine.js';

  /** @type {import('#lib/core/kid/pictures.js').PictureName[]} */
  const THEMES = ['apple', 'star', 'fish', 'flower'];

  /** `fill`: put objects in the tray to match a number. `count`: count the tray, pick a card. */
  let mode = $state(/** @type {'fill' | 'count'} */ ('fill'));
  let round = $state(0);
  let target = $state(3);
  let inTray = $state(0);
  /** @type {number | null} */
  let picked = $state(null);

  const picture = $derived(THEMES[round % THEMES.length]);
  const noun = $derived(pictures[picture]);
  const shelf = $derived(MAX_COUNT - inTray);

  const fillState = $derived(compareTray(inTray, target));
  const fillMessage = $derived(trayMessage(inTray, target, noun));
  const countMessage = $derived(
    picked === null
      ? 'Em đếm số đồ vật trong khay rồi chạm vào thẻ số đúng.'
      : picked === target
        ? `Đúng rồi! Có ${target} ${noun}, số ${target} đọc là "${NUMBER_WORDS[target]}".`
        : `Chưa đúng. Em chạm vào từng ${noun} và đếm lại nhé.`,
  );
  const solved = $derived(mode === 'fill' ? fillState === 'match' : picked === target);

  function newRound() {
    round += 1;
    target = nextTarget(target);
    picked = null;
    inTray = mode === 'count' ? target : 0;
  }

  /** @param {'fill' | 'count'} next */
  function switchMode(next) {
    mode = next;
    picked = null;
    inTray = next === 'count' ? target : 0;
  }

  /** @param {'in' | 'out'} direction */
  function move(direction) {
    if (mode !== 'fill') return;
    inTray = moveObject(inTray, direction);
  }

  const objectButton = `flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition hover:scale-105 active:scale-95 ${focusRing}`;
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn trò chơi"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'fill', label: 'Xếp vào khay' },
      { value: 'count', label: 'Đếm và chọn số' },
    ]}
    onchange={(v) => switchMode(/** @type {'fill' | 'count'} */ (v))}
  />

  {#if mode === 'fill'}
    <div class="flex items-center gap-4">
      <div
        class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-indigo-500 bg-white text-5xl font-bold text-indigo-700 tabular-nums"
        aria-hidden="true"
      >
        {target}
      </div>
      <p class="text-xl font-semibold text-slate-800">
        Đặt {target}
        {noun} vào khay ("{NUMBER_WORDS[target]}").
      </p>
    </div>

    <div>
      <p class="mb-2 text-base font-semibold text-slate-600">Trên kệ (chạm để đặt vào khay)</p>
      <div class="flex min-h-[4.5rem] flex-wrap gap-3 rounded-2xl bg-amber-100 p-3">
        {#each { length: shelf } as _, i (i)}
          <button
            type="button"
            class={objectButton}
            aria-label="Đặt một {noun} vào khay"
            onclick={() => move('in')}
          >
            <Picture name={picture} size={44} />
          </button>
        {/each}
      </div>
    </div>
  {/if}

  <div>
    <p class="mb-2 text-base font-semibold text-slate-600">
      {mode === 'fill' ? 'Khay (chạm để lấy ra)' : 'Khay'}
    </p>
    <div
      class="flex min-h-[5.5rem] flex-wrap items-center gap-3 rounded-3xl border-4 border-dashed p-3 transition-colors {solved
        ? 'border-emerald-400 bg-emerald-50'
        : 'border-sky-300 bg-sky-50'}"
      role="group"
      aria-label="Khay có {inTray} {noun}"
    >
      {#if inTray === 0}
        <span class="px-2 text-lg text-slate-500">Khay đang trống</span>
      {/if}
      {#each { length: inTray } as _, i (i)}
        {#if mode === 'fill'}
          <button
            type="button"
            class={objectButton}
            aria-label="Lấy một {noun} ra khỏi khay"
            onclick={() => move('out')}
          >
            <Picture name={picture} size={44} />
          </button>
        {:else}
          <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Picture name={picture} size={44} />
          </span>
        {/if}
      {/each}
    </div>
  </div>

  {#if mode === 'count'}
    <div role="group" aria-label="Thẻ số" class="flex flex-wrap gap-3">
      {#each CARDS as value (value)}
        <button
          type="button"
          class="h-16 min-w-16 rounded-2xl border-4 px-3 text-3xl font-bold tabular-nums transition {focusRing} {picked ===
          value
            ? value === target
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-rose-500 bg-rose-50 text-rose-700'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-pressed={picked === value}
          onclick={() => (picked = value)}>{value}</button
        >
      {/each}
    </div>
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {solved
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if solved}<span aria-hidden="true">⭐ </span>{/if}{mode === 'fill'
      ? fillMessage
      : countMessage}
  </p>

  <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newRound}>
    Bài khác
  </button>
</div>
