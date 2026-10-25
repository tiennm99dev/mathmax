<script>
  import { untrack } from 'svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { sumRule } from './engine.js';

  const id = $props.id();

  let aIn = $state(24);
  let bIn = $state(36);
  let mIn = $state(6);
  /** @type {'yes' | 'no' | 'unknown' | null} */
  let guess = $state(null);

  /**
   * @param {unknown} v
   * @param {number} lo
   */
  const clean = (v, lo) => Math.max(lo, Math.min(9999, Math.trunc(Number(v)) || lo));

  const a = $derived(clean(aIn, 0));
  const b = $derived(clean(bIn, 0));
  const m = $derived(clean(mIn, 1));
  const s = $derived(sumRule(a, b, m));
  const expected = $derived(s.rule === 1 ? 'yes' : s.rule === 2 ? 'no' : 'unknown');

  $effect(() => {
    void a;
    void b;
    void m;
    untrack(() => (guess = null));
  });

  /** @param {boolean} d */
  const sign = (d) => (d ? '⋮' : '⋮̸');

  const CHOICES = /** @type {const} */ ([
    { value: 'yes', label: 'Tổng chia hết' },
    { value: 'no', label: 'Tổng không chia hết' },
    { value: 'unknown', label: 'Chưa kết luận được' },
  ]);
</script>

<div class="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
  <p class="font-semibold text-slate-900">
    Đoán trước khi cộng: tổng a + b có chia hết cho m không?
  </p>
  <div class="grid grid-cols-3 gap-3">
    <label class="block" for="{id}-a">
      <span class="text-sm font-semibold text-slate-700">a</span>
      <input id="{id}-a" type="number" min="0" bind:value={aIn} class="mt-1 {textInput}" />
    </label>
    <label class="block" for="{id}-b">
      <span class="text-sm font-semibold text-slate-700">b</span>
      <input id="{id}-b" type="number" min="0" bind:value={bIn} class="mt-1 {textInput}" />
    </label>
    <label class="block" for="{id}-m">
      <span class="text-sm font-semibold text-slate-700">m</span>
      <input id="{id}-m" type="number" min="1" bind:value={mIn} class="mt-1 {textInput}" />
    </label>
  </div>

  <p class="text-slate-800 tabular-nums">
    {a}
    {sign(s.aDiv)}
    {m} và {b}
    {sign(s.bDiv)}
    {m}.
  </p>

  <div class="flex flex-wrap gap-2" role="group" aria-label="Dự đoán của em">
    {#each CHOICES as c (c.value)}
      <button
        type="button"
        class={guess === c.value ? button.primary : button.secondary}
        aria-pressed={guess === c.value}
        onclick={() => (guess = c.value)}>{c.label}</button
      >
    {/each}
  </div>

  <div aria-live="polite">
    {#if guess !== null}
      <div
        class="rounded-lg border p-3 {guess === expected
          ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
          : 'border-rose-300 bg-rose-50 text-rose-950'}"
      >
        <p class="font-semibold">{guess === expected ? 'Đúng rồi!' : 'Chưa đúng.'}</p>
        {#if s.rule === 1}
          <p>Cả hai số hạng đều chia hết cho {m} nên tổng chia hết cho {m} (tính chất 1).</p>
        {:else if s.rule === 2}
          <p>
            Chỉ một số hạng không chia hết cho {m}, số hạng còn lại chia hết, nên tổng không chia
            hết cho {m} (tính chất 2).
          </p>
        {:else}
          <p>
            Cả hai số hạng đều không chia hết cho {m}: hai tính chất không áp dụng được, phải tính
            tổng mới biết.
          </p>
        {/if}
        <p class="mt-1 tabular-nums">
          Kiểm tra: {a} + {b} = {a + b}, và {a + b} = {m} · {Math.floor((a + b) / m)} + {(a + b) %
            m}, nên {a + b}
          {s.sumDiv ? '⋮' : '⋮̸'}
          {m}.
        </p>
      </div>
    {/if}
  </div>
</div>
