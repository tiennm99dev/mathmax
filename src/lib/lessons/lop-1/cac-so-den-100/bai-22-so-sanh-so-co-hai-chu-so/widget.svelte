<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import StickBundles from '../_shared/stick-bundles.svelte';
  import { SIGNS, SIGN_WORDS } from '../_shared/numbers.js';
  import { bump, compare, decidingPlace, randomPair, valueOf } from './engine.js';

  /** `see`: change the numbers and watch the sign. `guess`: pick the sign. */
  let mode = $state(/** @type {'see' | 'guess'} */ ('see'));
  // Fixed first numbers so the prerendered page and the browser agree.
  let sides = $state([
    { tens: 4, ones: 2 },
    { tens: 2, ones: 5 },
  ]);
  /** @type {string | null} */
  let picked = $state(null);

  const result = $derived(compare(sides[0], sides[1]));
  const place = $derived(decidingPlace(sides[0], sides[1]));
  const revealed = $derived(mode === 'see' || picked === result.sign);
  const solved = $derived(mode === 'guess' && picked === result.sign);

  const message = $derived(
    mode === 'see' || picked === result.sign
      ? `${solved ? 'Đúng rồi! ' : ''}${result.reason}`
      : picked === null
        ? 'Em so sánh hàng chục trước, rồi chạm vào dấu đúng.'
        : place === 'tens'
          ? 'Chưa đúng. Em đếm số bó chục ở hai bên nhé.'
          : place === 'ones'
            ? 'Chưa đúng. Số bó chục bằng nhau, em đếm số que rời nhé.'
            : 'Chưa đúng. Em đếm lại cả bó chục và que rời nhé.',
  );

  /** @param {number} i @param {'tens' | 'ones'} p @param {number} d */
  function change(i, p, d) {
    sides[i] = bump(sides[i], p, d);
  }

  /** @param {'see' | 'guess'} next */
  function switchMode(next) {
    mode = next;
    picked = null;
    if (next === 'guess') sides = randomPair();
  }

  function newPair() {
    sides = randomPair();
    picked = null;
  }

  const NAMES = ['bên trái', 'bên phải'];
  const step = `inline-flex h-12 w-12 items-center justify-center rounded-xl border-4 border-slate-300 bg-white text-2xl font-bold text-slate-800 disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`;
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn trò chơi"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'see', label: 'Đổi số, xem dấu' },
      { value: 'guess', label: 'Em chọn dấu' },
    ]}
    onchange={(v) => switchMode(/** @type {'see' | 'guess'} */ (v))}
  />

  <div class="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
    {#each sides as side, i (i)}
      {#if i === 1}
        <div
          class="mt-6 flex h-16 w-12 items-center justify-center rounded-2xl border-4 text-4xl font-bold {revealed
            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
            : 'border-dashed border-slate-300 bg-white text-slate-400'}"
          aria-hidden="true"
        >
          {revealed ? result.sign : '?'}
        </div>
      {/if}
      <div class="min-w-0 space-y-2 rounded-2xl bg-amber-50 p-2">
        <p class="text-center text-4xl font-bold text-indigo-700 tabular-nums">
          {valueOf(side)}
        </p>
        <div
          class="rounded-xl p-1 {revealed && place === 'tens'
            ? 'bg-rose-100 ring-2 ring-rose-300'
            : ''}"
        >
          <p class="text-sm font-semibold text-slate-600">{side.tens} chục</p>
          <StickBundles tens={side.tens} ones={0} small />
        </div>
        <div
          class="rounded-xl p-1 {revealed && place === 'ones'
            ? 'bg-sky-100 ring-2 ring-sky-300'
            : ''}"
        >
          <p class="text-sm font-semibold text-slate-600">{side.ones} đơn vị</p>
          {#if side.ones > 0}
            <StickBundles tens={0} ones={side.ones} small />
          {:else}
            <span class="text-sm text-slate-500">không có que rời</span>
          {/if}
        </div>
        {#if mode === 'see'}
          <div class="space-y-1">
            <p class="text-sm font-semibold text-slate-600">Chục</p>
            <div class="flex items-center justify-between gap-1">
              <button
                type="button"
                class={step}
                aria-label="Bớt một chục ở số {NAMES[i]}"
                disabled={side.tens <= 1}
                onclick={() => change(i, 'tens', -1)}>−</button
              >
              <button
                type="button"
                class={step}
                aria-label="Thêm một chục ở số {NAMES[i]}"
                disabled={side.tens >= 9}
                onclick={() => change(i, 'tens', 1)}>+</button
              >
            </div>
            <p class="text-sm font-semibold text-slate-600">Đơn vị</p>
            <div class="flex items-center justify-between gap-1">
              <button
                type="button"
                class={step}
                aria-label="Bớt một đơn vị ở số {NAMES[i]}"
                disabled={side.ones <= 0}
                onclick={() => change(i, 'ones', -1)}>−</button
              >
              <button
                type="button"
                class={step}
                aria-label="Thêm một đơn vị ở số {NAMES[i]}"
                disabled={side.ones >= 9}
                onclick={() => change(i, 'ones', 1)}>+</button
              >
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  {#if mode === 'guess'}
    <div role="group" aria-label="Chọn dấu" class="flex flex-wrap gap-3">
      {#each SIGNS as sign (sign)}
        <button
          type="button"
          class="h-16 w-16 rounded-2xl border-4 text-4xl font-bold transition {focusRing} {picked ===
          sign
            ? sign === result.sign
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-rose-500 bg-rose-50 text-rose-700'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-label="Dấu {SIGN_WORDS[sign]}"
          aria-pressed={picked === sign}
          disabled={solved}
          onclick={() => (picked = sign)}>{sign}</button
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
    {#if solved}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  {#if mode === 'guess'}
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newPair}>
      Cặp số khác
    </button>
  {/if}
</div>
