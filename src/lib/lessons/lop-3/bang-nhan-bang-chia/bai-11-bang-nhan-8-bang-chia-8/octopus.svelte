<script>
  /** One octopus with its 8 arms, decorative: the sea around it carries the label. */
  const ARMS = [10, 18, 26, 34, 42, 50, 58, 66];
</script>

<svg viewBox="0 0 76 72" class="w-full" aria-hidden="true">
  {#each ARMS as x, i (x)}
    <path
      d="M {30 + i * 2.3} 34 Q {x} 52 {x + (i % 2 ? 3 : -3)} 68"
      fill="none"
      stroke="#7c3aed"
      stroke-width="4"
      stroke-linecap="round"
    />
  {/each}
  <ellipse cx="38" cy="22" rx="20" ry="18" fill="#a78bfa" />
  <circle cx="30" cy="20" r="4" fill="white" />
  <circle cx="46" cy="20" r="4" fill="white" />
  <circle cx="30" cy="21" r="2" fill="#1e293b" />
  <circle cx="46" cy="21" r="2" fill="#1e293b" />
  <path d="M 32 29 Q 38 34 44 29" fill="none" stroke="#4c1d95" stroke-width="2" />
</svg>
