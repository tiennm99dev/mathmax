<script>
  /**
   * A five-fingered hand. `faded` draws the place where a hand has not been
   * added yet. The picture is decorative: the counts around it are the text.
   * @type {{ faded?: boolean }}
   */
  let { faded = false } = $props();

  const FINGERS = [
    { x: 12, y: 8, h: 24 },
    { x: 20, y: 3, h: 29 },
    { x: 28, y: 5, h: 27 },
    { x: 36, y: 11, h: 21 },
  ];
  const skin = $derived(faded ? '#f1f5f9' : '#fcd9a8');
  const line = $derived(faded ? '#cbd5e1' : '#b45309');
</script>

<svg viewBox="0 0 48 60" class="block h-auto w-full" aria-hidden="true">
  <g fill={skin} stroke={line} stroke-width="1.5" stroke-dasharray={faded ? '3 2' : undefined}>
    <rect x="3" y="27" width="8" height="20" rx="4" transform="rotate(-28 7 40)" />
    {#each FINGERS as f (f.x)}
      <rect x={f.x} y={f.y} width="7" height={f.h} rx="3.5" />
    {/each}
    <rect x="11" y="28" width="33" height="28" rx="9" />
  </g>
</svg>
