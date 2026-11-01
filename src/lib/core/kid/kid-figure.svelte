<svelte:options namespace="svg" />

<script>
  /**
   * A child standing with the feet on the point (`x`, `y`) and the top of the
   * head `height` SVG units above it: head, body, arms and legs scale with
   * the height so a taller child looks taller, not only bigger.
   * @type {{ x: number; y: number; height: number; color: string }}
   */
  let { x, y, height, color } = $props();

  const head = $derived(Math.max(9, height * 0.13));
  const neck = $derived(y - height + head * 2);
  const hip = $derived(y - height * 0.42);
  const w = $derived(Math.max(14, height * 0.2));
</script>

<line
  x1={x - w / 4}
  y1={hip}
  x2={x - w / 4}
  y2={y}
  stroke="#334155"
  stroke-width="5"
  stroke-linecap="round"
/>
<line
  x1={x + w / 4}
  y1={hip}
  x2={x + w / 4}
  y2={y}
  stroke="#334155"
  stroke-width="5"
  stroke-linecap="round"
/>
<line
  x1={x - w / 2}
  y1={neck + 6}
  x2={x - w}
  y2={hip - 4}
  stroke={color}
  stroke-width="5"
  stroke-linecap="round"
/>
<line
  x1={x + w / 2}
  y1={neck + 6}
  x2={x + w}
  y2={hip - 4}
  stroke={color}
  stroke-width="5"
  stroke-linecap="round"
/>
<rect x={x - w / 2} y={neck} width={w} height={hip - neck + 2} rx="5" fill={color} />
<circle cx={x} cy={y - height + head} r={head} fill="#fcd9b6" stroke="#92400e" stroke-width="1.5" />
<circle cx={x - head / 3} cy={y - height + head * 0.9} r="1.6" fill="#1e293b" />
<circle cx={x + head / 3} cy={y - height + head * 0.9} r="1.6" fill="#1e293b" />
<path
  d="M{x - head * 0.95} {y - height + head * 0.75} Q{x} {y - height - head * 0.35} {x +
    head * 0.95} {y - height + head * 0.75}"
  fill="#1e293b"
/>
