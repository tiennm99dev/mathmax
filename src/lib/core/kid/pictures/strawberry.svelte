<svelte:options namespace="svg" />

<path d="M8 15c0-3 5-4 12-4s12 1 12 4c0 9-7 19-12 21-5-2-12-12-12-21z" fill="#dc2626" />
<path d="M12 11l3-5 3 4 2-5 2 5 3-4 3 5z" fill="#16a34a" />
{#each [[14, 18], [20, 17], [26, 18], [16, 24], [24, 24], [20, 30]] as [x, y] (`${x},${y}`)}
  <ellipse cx={x} cy={y} rx="1" ry="1.5" fill="#fde68a" />
{/each}
