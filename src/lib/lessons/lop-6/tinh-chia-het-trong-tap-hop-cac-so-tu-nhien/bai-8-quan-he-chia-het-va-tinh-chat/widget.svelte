<script>
  import { tick, untrack } from 'svelte';
  import { SvelteSet } from 'svelte/reactivity';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing, textInput } from '#lib/core/ui.js';
  import { divisorsOf, multiplesUpTo } from '../_shared/divisibility.js';
  import { SIZE, moveIndex, relation, scoreGuess } from './engine.js';

  const MAX = SIZE * SIZE;
  const CELLS = Array.from({ length: MAX }, (_, i) => i + 1);
  const inputId = $props.id();

  let typed = $state(12);
  let mode = $state(/** @type {'xem' | 'tim'} */ ('xem'));
  /** @type {number | null} */
  let selected = $state(null);
  let focusIndex = $state(0);
  let checked = $state(false);
  const guesses = new SvelteSet();
  /** @type {HTMLButtonElement[]} */
  const cellRefs = [];

  const n = $derived(Math.max(1, Math.min(MAX, Math.trunc(Number(typed)) || 1)));
  const divisors = $derived(divisorsOf(n));
  const divisorSet = $derived(new Set(divisors));
  const divisorsText = $derived(`{${divisors.join('; ')}}`);
  const multiples = $derived(multiplesUpTo(n, MAX, false));
  const multipleSet = $derived(new Set(multiples));
  const info = $derived(selected === null ? null : relation(selected, n));
  const score = $derived(checked ? scoreGuess(guesses, n) : null);
  const showDivisors = $derived(mode === 'xem' || checked);

  // A new number or mode starts a fresh round.
  $effect(() => {
    void n;
    void mode;
    untrack(() => {
      guesses.clear();
      checked = false;
      selected = null;
    });
  });

  /** @param {number} k */
  function activate(k) {
    focusIndex = k - 1;
    if (mode === 'tim' && !checked) {
      if (guesses.has(k)) guesses.delete(k);
      else guesses.add(k);
    }
    selected = k;
  }

  /**
   * @param {KeyboardEvent} e
   * @param {number} idx
   */
  async function onKey(e, idx) {
    const next = moveIndex(idx, e.key);
    if (next === null) return;
    e.preventDefault();
    focusIndex = next;
    await tick();
    cellRefs[next]?.focus();
  }

  /** @param {number} delta */
  function nudge(delta) {
    typed = Math.max(1, Math.min(MAX, n + delta));
  }

  /** @param {number} k */
  function cellClass(k) {
    const isMult = multipleSet.has(k);
    const isDiv = divisorSet.has(k);
    const guessed = guesses.has(k);
    let cls = 'bg-white text-slate-700';
    if (isMult) cls = 'bg-indigo-500 text-white';
    const found = mode === 'tim' && checked && guessed && isDiv;
    if (showDivisors && isDiv)
      cls += found ? ' ring-4 ring-inset ring-emerald-500' : ' ring-4 ring-inset ring-amber-400';
    if (mode === 'tim' && guessed && !checked) cls += ' ring-4 ring-inset ring-sky-500';
    if (mode === 'tim' && checked && guessed && !isDiv) cls += ' ring-4 ring-inset ring-rose-500';
    if (selected === k) cls += ' outline outline-2 outline-slate-900 z-10';
    return cls;
  }

  /** @param {number} k */
  function cellLabel(k) {
    const parts = [String(k)];
    if (multipleSet.has(k)) parts.push(`bội của ${n}`);
    if (showDivisors && divisorSet.has(k)) parts.push(`ước của ${n}`);
    if (mode === 'tim' && guesses.has(k)) parts.push('đã chọn');
    return parts.join(', ');
  }
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-4">
    <div>
      <label for={inputId} class="mb-1 block text-sm font-semibold text-slate-700"
        >Số n đã chọn (1 đến 100)</label
      >
      <div class="flex items-center gap-2">
        <button type="button" class={button.quiet} aria-label="Giảm n" onclick={() => nudge(-1)}
          >−</button
        >
        <input
          id={inputId}
          type="number"
          min="1"
          max={MAX}
          bind:value={typed}
          class="{textInput} w-24 text-center"
        />
        <button type="button" class={button.quiet} aria-label="Tăng n" onclick={() => nudge(1)}
          >+</button
        >
      </div>
    </div>
    <SegmentedControl
      label="Chế độ"
      options={[
        { value: 'xem', label: 'Xem ước và bội' },
        { value: 'tim', label: 'Tự tìm ước' },
      ]}
      bind:value={mode}
    />
  </div>

  <ul class="flex flex-wrap gap-4 text-sm text-slate-700" aria-label="Chú giải">
    <li class="flex items-center gap-2">
      <span class="inline-block h-4 w-4 rounded bg-indigo-500" aria-hidden="true"></span> Bội của {n}
    </li>
    <li class="flex items-center gap-2">
      <span class="inline-block h-4 w-4 rounded ring-4 ring-inset ring-amber-400" aria-hidden="true"
      ></span>
      Ước của {n}
    </li>
    {#if mode === 'tim'}
      <li class="flex items-center gap-2">
        <span class="inline-block h-4 w-4 rounded ring-4 ring-inset ring-sky-500" aria-hidden="true"
        ></span> Em chọn
      </li>
    {/if}
  </ul>

  <div
    role="group"
    aria-label="Lưới số từ 1 đến 100. Dùng phím mũi tên để di chuyển, Enter để chọn."
    class="mx-auto grid w-full max-w-lg grid-cols-10 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200"
  >
    {#each CELLS as k, idx (k)}
      <button
        type="button"
        bind:this={cellRefs[idx]}
        tabindex={idx === focusIndex ? 0 : -1}
        aria-label={cellLabel(k)}
        aria-pressed={mode === 'tim' ? guesses.has(k) : undefined}
        onclick={() => activate(k)}
        onkeydown={(e) => onKey(e, idx)}
        class="relative flex aspect-square w-full items-center justify-center text-xs font-semibold tabular-nums sm:text-sm {focusRing} {cellClass(
          k,
        )}">{k}</button
      >
    {/each}
  </div>

  {#if mode === 'tim'}
    <div class="flex flex-wrap items-center gap-2">
      <button
        type="button"
        class={button.primary}
        disabled={checked || guesses.size === 0}
        onclick={() => (checked = true)}>Kiểm tra</button
      >
      <button
        type="button"
        class={button.quiet}
        onclick={() => {
          guesses.clear();
          checked = false;
        }}>Làm lại</button
      >
      <span class="text-sm text-slate-600">Chạm vào các ô em cho là ước của {n}.</span>
    </div>
  {/if}

  <div class="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4" aria-live="polite">
    {#if score}
      <p class="font-semibold {score.done ? 'text-emerald-800' : 'text-rose-800'}">
        {score.done
          ? `Chính xác! ${n} có ${divisors.length} ước.`
          : `Em chọn đúng ${score.right.length}/${divisors.length} ước (viền xanh lá); ô viền vàng là ước còn thiếu, viền đỏ là chọn nhầm.`}
        {#if score.wrong.length}
          Chọn nhầm: {score.wrong.join('; ')} ({n} không chia hết cho các số này).
        {/if}
        {#if score.missed.length}
          Còn thiếu: {score.missed.join('; ')}.
        {/if}
      </p>
    {/if}
    {#if info && selected !== null}
      <p class="text-slate-900">
        <span class="font-semibold">{selected} = {n} · {info.q} + {info.r}</span>
        {#if info.isMultiple}
          — dư 0, nên {selected} ⋮ {n}: {selected} là bội của {n}.
        {:else}
          — dư {info.r} ≠ 0, nên {selected} không chia hết cho {n}.
        {/if}
      </p>
      <p class="text-slate-900">
        {#if info.isDivisor}
          {n} = {selected} · {info.cofactor}, nên {n} ⋮ {selected}: {selected} là ước của {n}.
        {:else if mode === 'xem' || checked}
          {n} không chia hết cho {selected}, nên {selected} không là ước của {n}.
        {/if}
      </p>
    {:else}
      <p class="text-slate-600">Chạm vào một ô để xem phép chia của số đó cho {n}.</p>
    {/if}
    {#if showDivisors}
      <p class="text-sm text-slate-700">
        Ư({n}) = {divisorsText} — {divisors.length} ước.
      </p>
    {/if}
    <p class="text-sm text-slate-700">
      Các bội của {n} trên lưới: {multiples.length > 12
        ? `${multiples.slice(0, 12).join('; ')}; …`
        : multiples.join('; ')} ({multiples.length} số).
    </p>
  </div>
</div>
