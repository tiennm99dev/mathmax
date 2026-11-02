<script>
  /** One wrapped sweet, decoration only; the parent's label says how many. */
  /** @type {{ size?: number }} */
  let { size = 28 } = $props();
</script>

<svg viewBox="0 0 40 24" width={size} height={size * 0.6} aria-hidden="true" class="block">
  <path d="M10 12 L1 4 L1 20 Z" fill="#f472b6" stroke="#9d174d" stroke-width="1.5" />
  <path d="M30 12 L39 4 L39 20 Z" fill="#f472b6" stroke="#9d174d" stroke-width="1.5" />
  <ellipse cx="20" cy="12" rx="11" ry="9" fill="#ec4899" stroke="#9d174d" stroke-width="1.5" />
  <path d="M15 7 Q20 12 15 17" fill="none" stroke="#fdf2f8" stroke-width="2" />
</svg>
