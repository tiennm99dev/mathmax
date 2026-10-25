<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { intText } from '../_shared/integers.js';
  import {
    DIVISOR_CHOICES,
    MULTIPLE_CHOICES,
    explain,
    isTarget,
    progress,
    reach,
    setText,
    targets,
    withOpposites,
  } from './engine.js';

  /** @typedef {import('./engine.js').Mode} Mode */

  /** @type {Mode} */
  let mode = $state('uoc');
  let a = $state(DIVISOR_CHOICES[0]);
  let b = $state(MULTIPLE_CHOICES[0]);
  /** @type {Set<number>} */
  let found = $state(new Set());
  /** @type {Set<number>} */
  let missed = $state(new Set());
  /** @type {string | null} */
  let message = $state(null);

  const value = $derived(mode === 'uoc' ? a : b);
  const n = $derived(reach(mode, value));
  const columns = $derived(Array.from({ length: n }, (_, i) => i + 1));
  const all = $derived(targets(mode, value));
  const done = $derived(all.every((d) => found.has(d)));
  const canMirror = $derived([...found].some((d) => d !== 0 && !found.has(-d)));
  const status = $derived(progress(mode, value, found));
  const prompt = $derived(
    `Chạm vào một số trên lưới để kiểm tra xem nó có là ${mode === 'uoc' ? 'ước' : 'bội'} của ${intText(value)} không.`,
  );

  const MODES = [
    { value: 'uoc', label: 'Tìm ước' },
    { value: 'boi', label: 'Tìm bội' },
  ];
  const divisorOptions = DIVISOR_CHOICES.map((x) => ({ value: x, label: intText(x) }));
  const multipleOptions = MULTIPLE_CHOICES.map((x) => ({ value: x, label: intText(x) }));

  function reset() {
    found = new Set();
    missed = new Set();
    message = null;
  }

  /** @param {number} d */
  function tap(d) {
    message = explain(mode, value, d);
    if (isTarget(mode, value, d)) {
      found = new Set([...found, d]);
    } else {
      missed = new Set([...missed, d]);
    }
  }

  function mirror() {
    found = withOpposites(found);
    message =
      mode === 'uoc'
        ? `Nếu d là ước của ${intText(a)} thì −d cũng là ước của ${intText(a)}: mỗi ước dương kéo theo một ước âm cùng cột.`
        : `Nếu d là bội của ${intText(b)} thì −d cũng là bội của ${intText(b)}: các bội nằm đối xứng qua 0.`;
  }

  function showAll() {
    found = new Set(all);
    message = `${setText(mode, value)}.`;
  }

  /** @param {number} d */
  function cellClass(d) {
    if (found.has(d)) return 'border-emerald-500 bg-emerald-100 text-emerald-900';
    if (missed.has(d)) return 'border-rose-300 bg-rose-50 text-rose-700 line-through';
    return 'border-slate-300 bg-white text-slate-800 hover:bg-indigo-50';
  }

  /** @param {number} d */
  function cellLabel(d) {
    const what = mode === 'uoc' ? 'ước' : 'bội';
    if (found.has(d)) return `${intText(d)}, là ${what}`;
    if (missed.has(d)) return `${intText(d)}, không là ${what}`;
    return intText(d);
  }
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-4">
    <SegmentedControl label="Em muốn tìm" options={MODES} bind:value={mode} onchange={reset} />
    {#if mode === 'uoc'}
      <SegmentedControl
        label="Số nguyên a"
        options={divisorOptions}
        bind:value={a}
        onchange={reset}
      />
    {:else}
      <SegmentedControl
        label="Số nguyên b"
        options={multipleOptions}
        bind:value={b}
        onchange={reset}
      />
    {/if}
  </div>

  <p class="text-sm text-slate-600">
    Hàng trên là các số dương, hàng dưới là số đối của chúng: mỗi cột chứa một cặp số đối nhau. Ô
    xanh là {mode === 'uoc' ? 'ước' : 'bội'} em đã tìm thấy, ô đỏ gạch là số em thử nhưng không đúng.
  </p>

  <div class="flex justify-center">
    <button
      type="button"
      aria-label={cellLabel(0)}
      class="min-h-11 min-w-16 rounded-lg border-2 px-3 text-lg font-bold tabular-nums {cellClass(
        0,
      )} {focusRing}"
      onclick={() => tap(0)}>0</button
    >
  </div>

  <ul
    class="mx-auto grid max-w-xl grid-cols-6 gap-1.5 sm:grid-cols-9"
    aria-label="Lưới các số nguyên từ {intText(-n)} đến {intText(n)}"
  >
    {#each columns as d (d)}
      <li class="flex flex-col gap-1 rounded-lg bg-slate-50 p-1">
        {#each [d, -d] as x (x)}
          <button
            type="button"
            aria-label={cellLabel(x)}
            aria-pressed={found.has(x)}
            class="min-h-11 rounded-md border-2 text-base font-semibold tabular-nums {cellClass(
              x,
            )} {focusRing}"
            onclick={() => tap(x)}>{intText(x)}</button
          >
        {/each}
      </li>
    {/each}
  </ul>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={mirror} disabled={!canMirror}>
      Thêm các số đối
    </button>
    <button type="button" class={button.secondary} onclick={showAll} disabled={done}>
      Hiện tất cả
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  <div class="rounded-xl border border-slate-200 bg-white p-4" aria-live="polite">
    <p class="text-slate-800">{message ?? prompt}</p>
    <p class="mt-2 font-semibold {done ? 'text-emerald-700' : 'text-indigo-700'}">{status}</p>
  </div>
  <p class="text-sm text-slate-600">
    Mẹo: tìm các {mode === 'uoc' ? 'ước' : 'bội'} dương trước, rồi bấm "Thêm các số đối" để lật chúng
    xuống hàng dưới.
  </p>
</div>
