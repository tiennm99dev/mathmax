<script>
  /**
   * One place-value block drawn to scale: a small cube for 1 unit, a rod of
   * ten cells, a flat of ten by ten and a thousand cube. Decorative; the widget
   * says the count in words.
   * @type {{
   *   kind: import('#lib/core/kid/place-value.js').BlockKind;
   *   cell?: number;
   * }}
   */
  let { kind, cell = 4 } = $props();

  const LOOK = {
    'don-vi': { fill: '#fbbf24', line: '#b45309', cols: 1, rows: 1 },
    chuc: { fill: '#34d399', line: '#047857', cols: 1, rows: 10 },
    tram: { fill: '#60a5fa', line: '#1d4ed8', cols: 10, rows: 10 },
    nghin: { fill: '#a78bfa', line: '#6d28d9', cols: 10, rows: 10 },
  };
  /** How far the top and side of the thousand cube reach, in cells. */
  const DEPTH = 4;

  const look = $derived(LOOK[kind]);
  const depth = $derived(kind === 'nghin' ? DEPTH * cell : 0);
  const faceW = $derived(look.cols * cell);
  const faceH = $derived(look.rows * cell);
  const width = $derived(faceW + depth + 1);
  const height = $derived(faceH + depth + 1);
</script>

<svg {width} {height} viewBox="0 0 {width} {height}" class="block shrink-0" aria-hidden="true">
  {#if depth > 0}
    <path
      d="M 0.5 {depth + 0.5} l {depth} {-depth} h {faceW} l {-depth} {depth} z"
      fill="#c4b5fd"
      stroke={look.line}
    />
    <path
      d="M {faceW + 0.5} {depth + 0.5} l {depth} {-depth} v {faceH} l {-depth} {depth} z"
      fill="#8b5cf6"
      stroke={look.line}
    />
  {/if}
  <rect x="0.5" y={depth + 0.5} width={faceW} height={faceH} fill={look.fill} stroke={look.line} />
  {#each { length: look.cols - 1 } as _, i (i)}
    <line
      x1={0.5 + (i + 1) * cell}
      y1={depth + 0.5}
      x2={0.5 + (i + 1) * cell}
      y2={depth + 0.5 + faceH}
      stroke={look.line}
      stroke-width="0.5"
    />
  {/each}
  {#each { length: look.rows - 1 } as _, i (i)}
    <line
      x1="0.5"
      y1={depth + 0.5 + (i + 1) * cell}
      x2={0.5 + faceW}
      y2={depth + 0.5 + (i + 1) * cell}
      stroke={look.line}
      stroke-width="0.5"
    />
  {/each}
</svg>
