<svelte:options namespace="svg" />

{#each [0, 72, 144, 216, 288] as angle (angle)}
  <ellipse cx="20" cy="11" rx="5" ry="8" fill="#f472b6" transform="rotate({angle} 20 20)" />
{/each}
<circle cx="20" cy="20" r="5" fill="#facc15" />
