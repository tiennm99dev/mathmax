<script>
  /**
   * A pan balance (cân đĩa) drawn in SVG. The heavier pan goes down and the
   * beam tips towards it; when both pans weigh the same the beam is level.
   * Things are drawn with their name and without their mass, so the child has
   * to read the balance.
   * @type {{ scale: import('./visual.js').Scale }}
   */
  let { scale } = $props();

  const PIVOT = { x: 170, y: 40 };
  const ARM = 118;
  const HANG = 90;
  const PAN = 104;
  const TILT = 9;
  const GAP = 3;
  const panY = PIVOT.y + HANG;

  const COLORS = ['#fde68a', '#bbf7d0', '#fecaca', '#bfdbfe', '#ddd6fe'];

  /** @param {readonly import('./visual.js').Load[]} loads */
  const total = (loads) => loads.reduce((s, l) => s + l.kg, 0);

  const diff = $derived(total(scale.right) - total(scale.left));
  const angle = $derived(Math.sign(diff) * TILT);
  const drop = $derived(ARM * Math.sin((angle * Math.PI) / 180));

  /** @param {import('./visual.js').Load} l */
  const widthOf = (l) => (l.kind === 'thing' ? 86 : 28 + 2 * l.kg);

  /**
   * The loads in one row centred on the pan, each with its left edge.
   * @param {readonly import('./visual.js').Load[]} loads
   */
  function row(loads) {
    const width = loads.reduce((s, l) => s + widthOf(l), 0) + GAP * (loads.length - 1);
    let x = -width / 2;
    return loads.map((load) => {
      const item = { load, x, w: widthOf(load) };
      x += item.w + GAP;
      return item;
    });
  }

  /** @param {string} name */
  function colorOf(name) {
    return COLORS[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % COLORS.length];
  }

  /** @param {readonly import('./visual.js').Load[]} loads */
  const sideText = (loads) =>
    loads.map((l) => (l.kind === 'thing' ? l.name : `quả cân ${l.kg} kg`)).join(', ');

  const label = $derived.by(() => {
    const tilt =
      diff === 0
        ? 'Cân thăng bằng.'
        : diff < 0
          ? 'Đĩa bên trái thấp hơn.'
          : 'Đĩa bên phải thấp hơn.';
    return `Cân đĩa. Đĩa bên trái: ${sideText(scale.left)}. Đĩa bên phải: ${sideText(scale.right)}. ${tilt}`;
  });
</script>

{#snippet pan(/** @type {number} */ cx, /** @type {readonly import('./visual.js').Load[]} */ loads)}
  <line x1={cx} y1={PIVOT.y} x2={cx - PAN / 2} y2={panY} stroke="#64748b" stroke-width="1.5" />
  <line x1={cx} y1={PIVOT.y} x2={cx + PAN / 2} y2={panY} stroke="#64748b" stroke-width="1.5" />
  {#each row(loads) as it, i (i)}
    {@const x = cx + it.x}
    {#if it.load.kind === 'weight'}
      {@const h = 26 + it.load.kg}
      <rect x={x + it.w / 2 - 4} y={panY - h - 5} width="8" height="7" rx="2" fill="#334155" />
      <path
        d="M{x + 3} {panY - h} H{x + it.w - 3} L{x + it.w} {panY} H{x} Z"
        fill="#475569"
        stroke="#1e293b"
      />
      <text
        x={x + it.w / 2}
        y={panY - h / 2 + 4}
        text-anchor="middle"
        font-size="13"
        font-weight="700"
        fill="#fff">{it.load.kg} kg</text
      >
    {:else}
      <rect
        {x}
        y={panY - 36}
        width={it.w}
        height="36"
        rx="10"
        fill={colorOf(it.load.name)}
        stroke="#475569"
        stroke-width="1.5"
      />
      <text
        x={x + it.w / 2}
        y={panY - 14}
        text-anchor="middle"
        font-size="13"
        font-weight="700"
        fill="#1e293b">{it.load.name}</text
      >
    {/if}
  {/each}
  <path
    d="M{cx - PAN / 2 - 4} {panY} H{cx + PAN / 2 + 4} Q{cx + PAN / 2} {panY + 14} {cx} {panY +
      14} Q{cx - PAN / 2} {panY + 14} {cx - PAN / 2 - 4} {panY} Z"
    fill="#cbd5e1"
    stroke="#475569"
    stroke-width="1.5"
  />
{/snippet}

<svg viewBox="0 0 340 190" class="mx-auto block w-full max-w-md" role="img" aria-label={label}>
  <rect x="120" y="172" width="100" height="12" rx="4" fill="#64748b" />
  <path
    d="M{PIVOT.x - 10} 172 L{PIVOT.x - 4} {PIVOT.y} H{PIVOT.x + 4} L{PIVOT.x + 10} 172 Z"
    fill="#94a3b8"
  />
  <g style="transform: translateY({-drop}px)">
    {@render pan(PIVOT.x - ARM, scale.left)}
  </g>
  <g style="transform: translateY({drop}px)">
    {@render pan(PIVOT.x + ARM, scale.right)}
  </g>
  <g style="transform-origin: {PIVOT.x}px {PIVOT.y}px; transform: rotate({angle}deg)">
    <rect
      x={PIVOT.x - ARM - 4}
      y={PIVOT.y - 4}
      width={2 * ARM + 8}
      height="8"
      rx="4"
      fill="#475569"
    />
    <path
      d="M{PIVOT.x} {PIVOT.y - 24} V{PIVOT.y - 8}"
      stroke="#ef4444"
      stroke-width="3"
      stroke-linecap="round"
    />
  </g>
  <circle cx={PIVOT.x} cy={PIVOT.y} r="9" fill="#1e293b" />
</svg>
