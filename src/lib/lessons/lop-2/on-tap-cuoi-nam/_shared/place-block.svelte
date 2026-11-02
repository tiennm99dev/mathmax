<script>
  /**
   * One place-value block drawn to scale: a flat of ten by ten cells, a rod of
   * ten cells or one small cube. Decorative; the parent says the count in words.
   * @type {{ kind: 'hundreds' | 'tens' | 'ones', cell?: number }}
   */
  let { kind, cell = 5 } = $props();

  const LOOK = {
    hundreds: { fill: '#60a5fa', line: '#1d4ed8', cols: 10, rows: 10 },
    tens: { fill: '#34d399', line: '#047857', cols: 1, rows: 10 },
    ones: { fill: '#fbbf24', line: '#b45309', cols: 1, rows: 1 },
  };

  const look = $derived(LOOK[kind]);
  const w = $derived(look.cols * cell);
  const h = $derived(look.rows * cell);
</script>

<svg width={w + 1} height={h + 1} viewBox="0 0 {w + 1} {h + 1}" class="block" aria-hidden="true">
  <rect x="0.5" y="0.5" width={w} height={h} fill={look.fill} stroke={look.line} />
  {#each { length: look.cols - 1 } as _, i (i)}
    <line
      x1={0.5 + (i + 1) * cell}
      y1="0.5"
      x2={0.5 + (i + 1) * cell}
      y2={0.5 + h}
      stroke={look.line}
      stroke-width="0.4"
    />
  {/each}
  {#each { length: look.rows - 1 } as _, i (i)}
    <line
      x1="0.5"
      y1={0.5 + (i + 1) * cell}
      x2={0.5 + w}
      y2={0.5 + (i + 1) * cell}
      stroke={look.line}
      stroke-width="0.4"
    />
  {/each}
</svg>
