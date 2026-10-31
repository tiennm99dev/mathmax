<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { TOP } from '../_shared/number-words.js';
  import { SIGNS, SIGN_WORDS, checkSign, mouthFacing, newPair, sentence } from './engine.js';

  /** @typedef {import('./engine.js').Sign} Sign */

  /** `explore`: change both numbers and watch the crocodile. `quiz`: pick the sign. */
  let mode = $state(/** @type {'explore' | 'quiz'} */ ('explore'));
  let a = $state(7);
  let b = $state(4);
  /** @type {Sign | null} */
  let picked = $state(null);

  const result = $derived(picked === null ? null : checkSign(a, b, picked));
  const showCroc = $derived(mode === 'explore' || result?.ok === true);
  const facing = $derived(mouthFacing(a, b));
  const message = $derived(
    mode === 'explore'
      ? sentence(a, b)
      : result === null
        ? 'Em chọn dấu >, < hoặc = để đặt vào giữa hai số.'
        : result.text,
  );
  const solved = $derived(mode === 'quiz' && result?.ok === true);

  /** @param {'explore' | 'quiz'} next */
  function switchMode(next) {
    mode = next;
    picked = null;
    if (next === 'quiz') [a, b] = newPair([a, b]);
  }

  function newRound() {
    [a, b] = newPair([a, b]);
    picked = null;
  }

  /** Jaw paths of the crocodile: they draw the sign between the numbers. */
  const JAWS = {
    left: { upper: 'M30 14 L84 50', lower: 'M30 86 L84 50', eye: [70, 30] },
    right: { upper: 'M90 14 L36 50', lower: 'M90 86 L36 50', eye: [50, 30] },
    closed: { upper: 'M28 38 L92 38', lower: 'M28 62 L92 62', eye: [80, 24] },
  };
  const jaws = $derived(JAWS[facing]);
  const signText = $derived(facing === 'closed' ? '=' : facing === 'left' ? '>' : '<');

  /** Dot positions for a number, five to a row. */
  /** @param {number} n */
  const dots = (n) => Array.from({ length: n }, (_, i) => i);
</script>

{#snippet numberCard(/** @type {number} */ value)}
  <div class="flex flex-col items-center gap-2">
    <div
      class="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-indigo-500 bg-white text-5xl font-bold text-indigo-700 tabular-nums"
    >
      {value}
    </div>
    <div class="grid w-24 grid-cols-5 gap-1" aria-hidden="true">
      {#each dots(value) as i (i)}
        <span class="h-3.5 w-3.5 rounded-full bg-rose-500"></span>
      {/each}
    </div>
  </div>
{/snippet}

<div class="space-y-5">
  <SegmentedControl
    label="Chọn trò chơi"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'explore', label: 'Cá sấu so sánh' },
      { value: 'quiz', label: 'Đố em' },
    ]}
    onchange={(v) => switchMode(/** @type {'explore' | 'quiz'} */ (v))}
  />

  <div
    class="flex items-start justify-center gap-2 rounded-3xl border-4 p-3 {solved
      ? 'border-emerald-400 bg-emerald-50'
      : 'border-sky-300 bg-sky-50'}"
  >
    {@render numberCard(a)}
    <div class="flex h-20 w-28 items-center justify-center">
      {#if showCroc}
        <svg viewBox="0 0 120 100" class="h-20 w-24" role="img" aria-label="Dấu {signText}">
          <path
            d={jaws.upper}
            stroke="#16a34a"
            stroke-width="12"
            stroke-linecap="round"
            fill="none"
          />
          <path
            d={jaws.lower}
            stroke="#15803d"
            stroke-width="12"
            stroke-linecap="round"
            fill="none"
          />
          <circle
            cx={jaws.eye[0]}
            cy={jaws.eye[1]}
            r="7"
            fill="white"
            stroke="#14532d"
            stroke-width="2"
          />
          <circle cx={jaws.eye[0]} cy={jaws.eye[1]} r="3" fill="#14532d" />
        </svg>
      {:else}
        <span
          class="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-dashed border-slate-400 bg-white text-4xl font-bold text-slate-500"
          role="img"
          aria-label="Dấu chưa biết">?</span
        >
      {/if}
    </div>
    {@render numberCard(b)}
  </div>

  {#if mode === 'explore'}
    <div class="flex flex-wrap justify-center gap-4">
      <Stepper label="Số bên trái" bind:value={a} min={0} max={TOP} />
      <Stepper label="Số bên phải" bind:value={b} min={0} max={TOP} />
    </div>
  {:else}
    <div role="group" aria-label="Chọn dấu" class="flex flex-wrap justify-center gap-3">
      {#each SIGNS as s (s)}
        <button
          type="button"
          class="h-16 w-20 rounded-2xl border-4 text-4xl font-bold transition {focusRing} {picked ===
          s
            ? result?.ok
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-rose-500 bg-rose-50 text-rose-700'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-label="Dấu {s}, {SIGN_WORDS[s]}"
          aria-pressed={picked === s}
          onclick={() => (picked = s)}>{s}</button
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

  {#if mode === 'quiz'}
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newRound}>
      Bài khác
    </button>
  {/if}
</div>
