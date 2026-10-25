<svelte:options namespace="svg" />

<path d="M20 9c0-3 2-5 5-6" stroke="#713f12" stroke-width="2" fill="none" stroke-linecap="round" />
<path d="M21 8c4-3 9-2 11 1-4 1-8 1-11-1z" fill="#16a34a" />
{#each [[13, 14], [20, 13], [27, 14], [16, 20], [24, 20], [12, 21], [28, 21], [20, 26], [15, 27], [25, 27], [20, 33]] as [x, y] (`${x},${y}`)}
  <circle cx={x} cy={y} r="4.2" fill="#7c3aed" stroke="#5b21b6" stroke-width="0.8" />
{/each}
