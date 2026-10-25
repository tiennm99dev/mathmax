<script>
  import { button } from '#lib/core/ui.js';
  import { createGridState } from './grid-interaction.svelte.js';

  /** One colour per small prime; a Map avoids numeric-literal indexing issues. */
  const PRIME_COLORS = new Map([
    [2, '#D7263D'],
    [3, '#1B998B'],
    [5, '#F46036'],
    [7, '#5E60CE'],
  ]);

  const TARGET_PRIMES = [2, 3, 5, 7];

  const grid = createGridState((p, mults) =>
    mults.length
      ? `Đã gạch các bội của ${p}: ${mults.join(', ')}`
      : `${p} không còn bội nào trên lưới`,
  );

  /** @param {number} n */
  function cellColor(n) {
    return grid.markedPrimes.includes(n) ? PRIME_COLORS.get(n) : null;
  }
</script>

<div class="space-y-4">
  <ul class="flex flex-wrap gap-3" aria-label="Chú giải màu">
    {#each TARGET_PRIMES as p (p)}
      <li class="inline-flex items-center gap-1.5 text-sm">
        <span
          class="inline-block h-3.5 w-3.5 shrink-0 rounded-sm"
          style="background:{PRIME_COLORS.get(p)}"
          aria-hidden="true"
        ></span>
        <span style="color:{PRIME_COLORS.get(p)}" class="font-medium">Bội của {p}</span>
      </li>
    {/each}
  </ul>

  <div
    role="grid"
    aria-label="Lưới số 1 đến 100"
    aria-readonly={grid.rippling ? 'true' : 'false'}
    class="mx-auto grid w-full max-w-lg select-none grid-cols-10 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200"
  >
    {#each { length: 10 } as _, row (row)}
      <div role="row" class="contents">
        {#each { length: 10 } as _, col (col)}
          {@const idx = row * 10 + col}
          {@const n = idx + 1}
          {@const dotPrimes = grid.crossings.get(n) ?? []}
          {@const isCrossed = dotPrimes.length > 0}
          {@const color = cellColor(n)}
          <button
            type="button"
            role="gridcell"
            tabindex={idx === grid.focusIndex ? 0 : -1}
            bind:this={grid.cellRefs[idx]}
            onclick={() => grid.handleCellActivate(n)}
            onkeydown={(e) => grid.handleKeydown(e, idx)}
            aria-label="{n}{isCrossed ? ` — bội của ${dotPrimes.join(' và ')}` : ''}{color
              ? ' — số nguyên tố đã chọn'
              : ''}"
            aria-disabled={n === 1 ? 'true' : undefined}
            class="relative flex aspect-square w-full flex-col items-center justify-center bg-white text-xs font-semibold tabular-nums transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 sm:text-sm
              {n === 1 ? 'cursor-default text-slate-300' : ''}
              {isCrossed ? 'opacity-50' : ''}
              {grid.shakeIndex === idx ? 'animate-[sieve-shake_0.35s_ease]' : ''}"
            style="{color ? `box-shadow:inset 0 0 0 2px ${color};` : ''}{isCrossed
              ? 'text-decoration:line-through;'
              : ''}"
          >
            <span>{n}</span>
            {#if dotPrimes.length > 0}
              <span
                class="absolute bottom-0.5 left-0 right-0 flex justify-center gap-0.5"
                aria-hidden="true"
              >
                {#each dotPrimes as dp (dp)}
                  <span
                    class="h-1 w-1 shrink-0 rounded-full"
                    style="background:{PRIME_COLORS.get(dp)}"
                  ></span>
                {/each}
              </span>
            {/if}
          </button>
        {/each}
      </div>
    {/each}
  </div>

  <div class="flex justify-center">
    <button type="button" onclick={grid.handleReset} class={button.quiet}>Đặt lại</button>
  </div>

  <div aria-live="polite" aria-atomic="true" class="sr-only">{grid.announcement}</div>
</div>

<style>
  @keyframes -global-sieve-shake {
    0%,
    100% {
      transform: translateX(0);
    }
    20%,
    60% {
      transform: translateX(-3px);
    }
    40%,
    80% {
      transform: translateX(3px);
    }
  }
</style>
