<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    MAX_FACTOR,
    MIN_FACTOR,
    PART_NAMES,
    QUESTIONS,
    gridText,
    isRightPart,
    partFeedback,
    swapText,
  } from './engine.js';

  let mode = $state(/** @type {'name' | 'quiz'} */ ('name'));
  let a = $state(2);
  let b = $state(5);
  let swapped = $state(false);

  let index = $state(0);
  /** @type {number | null} */
  let tapped = $state(null);

  const q = $derived(QUESTIONS[index % QUESTIONS.length]);
  const shownA = $derived(mode === 'quiz' ? q.a : a);
  const shownB = $derived(mode === 'quiz' ? q.b : b);
  const product = $derived(shownA * shownB);
  const right = $derived(tapped !== null && isRightPart(q.ask, tapped));

  const message = $derived.by(() => {
    if (mode === 'name') return swapped ? swapText(a, b) : gridText(a, b);
    if (tapped === null) {
      return q.ask === 'tich' ? 'Em chạm vào số là tích.' : 'Em chạm vào một số là thừa số.';
    }
    return partFeedback(q.ask, tapped, q.a, q.b);
  });

  /** @param {number} delta */
  function bumpA(delta) {
    const next = a + delta;
    if (next < MIN_FACTOR || next > MAX_FACTOR) return;
    a = next;
    swapped = false;
  }

  /** @param {number} delta */
  function bumpB(delta) {
    const next = b + delta;
    if (next < MIN_FACTOR || next > MAX_FACTOR) return;
    b = next;
    swapped = false;
  }

  function swap() {
    [a, b] = [b, a];
    swapped = true;
  }

  function nextQuestion() {
    index += 1;
    tapped = null;
  }

  const stepBtn = `h-12 w-12 rounded-xl border-2 border-slate-300 bg-white text-2xl font-bold text-slate-800 hover:border-indigo-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 ${focusRing}`;
</script>

{#snippet stepper(
  /** @type {string} */ label,
  /** @type {number} */ value,
  /** @type {(delta: number) => void} */ bump,
)}
  <div
    class="flex items-center justify-between gap-2 rounded-2xl bg-slate-50 p-2"
    role="group"
    aria-label={label}
  >
    <span class="text-lg font-semibold text-slate-700">{label}</span>
    <span class="flex items-center gap-2">
      <button
        type="button"
        class={stepBtn}
        aria-label="Giảm {label}"
        aria-disabled={value <= MIN_FACTOR}
        onclick={() => bump(-1)}>−</button
      >
      <output class="w-8 text-center text-2xl font-bold tabular-nums text-indigo-700"
        >{value}</output
      >
      <button
        type="button"
        class={stepBtn}
        aria-label="Tăng {label}"
        aria-disabled={value >= MAX_FACTOR}
        onclick={() => bump(1)}>+</button
      >
    </span>
  </div>
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'name', label: 'Xem tên gọi' },
      { value: 'quiz', label: 'Đố em' },
    ]}
    onchange={() => (tapped = null)}
  />

  {#if mode === 'name'}
    <div class="grid gap-2 sm:grid-cols-2">
      {@render stepper('Số chấm mỗi hàng', a, bumpA)}
      {@render stepper('Số hàng', b, bumpB)}
    </div>
  {/if}

  <div
    class="mx-auto flex w-fit flex-col gap-1.5 rounded-2xl bg-sky-50 p-3"
    role="img"
    aria-label="{shownB} hàng, mỗi hàng {shownA} chấm"
  >
    {#each { length: shownB } as _, r (r)}
      <div class="flex gap-1.5">
        {#each { length: shownA } as _, c (c)}
          <span class="h-6 w-6 rounded-full bg-indigo-500"></span>
        {/each}
      </div>
    {/each}
  </div>

  {#if mode === 'name'}
    <div class="flex items-start justify-center gap-2 text-center tabular-nums">
      {#each [shownA, '×', shownB, '=', product] as part, i (i)}
        <div class="min-w-8">
          <p
            class="text-4xl font-bold {i === 4
              ? 'text-emerald-700'
              : i % 2 === 0
                ? 'text-indigo-700'
                : 'text-slate-500'}"
          >
            {part}
          </p>
          {#if i % 2 === 0}
            <p
              class="mt-1 text-base font-semibold {i === 4
                ? 'text-emerald-800'
                : 'text-indigo-800'}"
            >
              {PART_NAMES[i / 2]}
            </p>
          {/if}
        </div>
      {/each}
    </div>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={swap}>
      Đổi chỗ hai thừa số
    </button>
  {:else}
    <div
      class="flex items-center justify-center gap-2 tabular-nums"
      role="group"
      aria-label="Phép nhân"
    >
      {#each [q.a, q.b, product] as value, i (i)}
        <button
          type="button"
          class="h-16 min-w-16 rounded-2xl border-4 px-2 text-3xl font-bold transition motion-reduce:transition-none {focusRing} {tapped ===
          i
            ? right
              ? 'border-emerald-600 bg-emerald-100 text-emerald-900'
              : 'border-rose-400 bg-rose-50 text-rose-700'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-label={i === 0
            ? `Số ${value}, trước dấu nhân`
            : i === 1
              ? `Số ${value}, sau dấu nhân`
              : `Số ${value}, sau dấu bằng`}
          aria-pressed={tapped === i}
          onclick={() => (tapped = i)}>{value}</button
        >
        {#if i < 2}
          <span class="text-3xl font-bold text-slate-500" aria-hidden="true"
            >{i === 0 ? '×' : '='}</span
          >
        {/if}
      {/each}
    </div>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={nextQuestion}>
      Câu khác
    </button>
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {mode === 'quiz' && tapped !== null
      ? right
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-amber-100 text-amber-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {message}
  </p>
</div>
