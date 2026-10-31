<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { countGone, feedback, freshBranch, MAX_BIRDS, MIN_BIRDS, toggleBird } from './engine.js';

  const MODES = [
    { value: 'bot', label: 'Bớt đi' },
    { value: 'tach', label: 'Tách ra' },
  ];

  const COLOURS = ['#f97316', '#0ea5e9', '#a855f7', '#22c55e', '#eab308'];

  let mode = $state(/** @type {import('./engine.js').Mode} */ ('bot'));
  let total = $state(6);
  let gone = $state(freshBranch(6));
  /** @type {HTMLDivElement | undefined} */
  let scene = $state();

  const k = $derived(countGone(gone));
  const rest = $derived(total - k);
  const message = $derived(feedback(mode, total, k));

  function reset() {
    gone = freshBranch(total);
  }

  /**
   * In "Tách ra" a tapped bird moves to the other row, so its button is
   * replaced; keep keyboard focus on that bird in its new place.
   * @param {number} i
   */
  async function tap(i) {
    gone = toggleBird(gone, i);
    if (mode !== 'tach') return;
    await tick();
    const moved = /** @type {HTMLButtonElement | null | undefined} */ (
      scene?.querySelector(`button[data-bird="${i}"]`)
    );
    moved?.focus();
  }

  /** @param {number} i */
  function birdLabel(i) {
    if (!gone[i]) {
      return `Chim thứ ${i + 1} trên cành. Chạm để ${mode === 'bot' ? 'bay đi' : 'xuống đất'}`;
    }
    return `Chim thứ ${i + 1} đã ${mode === 'bot' ? 'bay đi' : 'xuống đất'}. Chạm để về cành`;
  }

  const birdButton = `flex h-14 w-14 items-center justify-center rounded-2xl transition duration-500 motion-reduce:transition-none ${focusRing}`;
</script>

{#snippet bird(/** @type {string} */ colour)}
  <svg viewBox="0 0 40 40" width="44" height="44" aria-hidden="true">
    <ellipse cx="19" cy="24" rx="12" ry="9" fill={colour} />
    <circle cx="29" cy="15" r="7" fill={colour} />
    <path d="M35 14l5 2-5 2z" fill="#f59e0b" />
    <circle cx="31" cy="13.5" r="1.6" fill="#0f172a" />
    <path d="M10 22c4-6 11-6 13 0-4 3-9 3-13 0z" fill="#ffffff" opacity="0.55" />
    <path d="M7 24l-6-3 2 6z" fill={colour} />
    <path d="M16 32v5M22 32v5" stroke="#78350f" stroke-width="1.6" />
  </svg>
{/snippet}

<div class="space-y-5">
  <SegmentedControl label="Ý nghĩa phép trừ" options={MODES} bind:value={mode} onchange={reset} />

  <Stepper
    label="Số chim lúc đầu"
    bind:value={total}
    min={MIN_BIRDS}
    max={MAX_BIRDS}
    onchange={reset}
  />

  <div bind:this={scene} class="rounded-3xl bg-sky-50 p-3">
    <ul class="flex min-h-16 flex-wrap justify-center gap-1" aria-label="Cành cây">
      {#each gone as g, i (i)}
        <li>
          {#if mode === 'bot' || !g}
            <button
              type="button"
              class="{birdButton} {g
                ? '-translate-y-4 border-2 border-dashed border-sky-300 opacity-30'
                : 'hover:bg-white'}"
              aria-label={birdLabel(i)}
              aria-pressed={g}
              data-bird={i}
              onclick={() => tap(i)}
            >
              {@render bird(COLOURS[i % COLOURS.length])}
            </button>
          {:else}
            <span class="block h-14 w-14" aria-hidden="true"></span>
          {/if}
        </li>
      {/each}
    </ul>
    <div class="h-3 rounded-full bg-amber-800" aria-hidden="true"></div>

    {#if mode === 'tach'}
      <ul
        class="mt-4 flex min-h-16 flex-wrap justify-center gap-1 rounded-2xl bg-lime-100 p-1"
        aria-label="Dưới đất"
      >
        {#each gone as g, i (i)}
          {#if g}
            <li>
              <button
                type="button"
                class="{birdButton} hover:bg-white"
                aria-label={birdLabel(i)}
                aria-pressed={g}
                data-bird={i}
                onclick={() => tap(i)}
              >
                {@render bird(COLOURS[i % COLOURS.length])}
              </button>
            </li>
          {/if}
        {/each}
      </ul>
    {/if}
  </div>

  <p class="text-center text-5xl font-bold text-slate-900 tabular-nums" aria-hidden="true">
    {total} <span class="text-rose-600">−</span>
    {k} = <span class="text-emerald-700">{rest}</span>
  </p>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {k === 0 || k === total
      ? 'bg-amber-100 text-amber-900'
      : 'bg-emerald-100 text-emerald-900'}"
    aria-live="polite"
  >
    {message}
  </p>

  <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={reset}>
    Gọi chim về cành
  </button>
</div>
