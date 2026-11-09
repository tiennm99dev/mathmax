<script>
  import { balanceText, heavierSide, panLayout, totalKg, weightLabel } from './mass.js';

  /**
   * A pan balance (cân đĩa) drawn in SVG. The heavier pan goes down and the
   * beam tips towards it; when both pans weigh the same the beam is level.
   * Things are drawn without their mass, so the child has to read the
   * balance: a known thing (`id`) as its picture, anything else (`name`) as a
   * labelled box. A drawing only: the widget around it holds the controls.
   * Labels stay readable on a 390 px phone, and a pan holds three rows of
   * loads under the beam.
   *
   * - `left`, `right`: the loads on each pan (`Load` in `mass.js`).
   * - `label`: what a screen reader hears, by default both pans and the lower
   *   one (`balanceText`).
   * @type {{
   *   left: readonly import('./mass.js').Load[];
   *   right: readonly import('./mass.js').Load[];
   *   label?: string;
   * }}
   */
  let { left, right, label } = $props();

  const NAMED_COLORS = ['#fde68a', '#bbf7d0', '#fecaca', '#bfdbfe', '#ddd6fe'];

  /** @param {string} name */
  function colorOf(name) {
    return NAMED_COLORS[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % NAMED_COLORS.length];
  }

  const PIVOT = { x: 170, y: 64 };
  const ARM = 118;
  const HANG = 140;
  const PAN = 104;
  const TILT = 9;

  const side = $derived(heavierSide(totalKg(left), totalKg(right)));
  const angle = $derived(side === 'level' ? 0 : side === 'right' ? TILT : -TILT);
  const drop = $derived(ARM * Math.sin((angle * Math.PI) / 180));
  const leftItems = $derived(panLayout(left, PAN));
  const rightItems = $derived(panLayout(right, PAN));

  const panY = PIVOT.y + HANG;
</script>

{#snippet pan(/** @type {number} */ cx, /** @type {ReturnType<typeof panLayout>} */ items)}
  <line x1={cx} y1={PIVOT.y} x2={cx - PAN / 2} y2={panY} stroke="#64748b" stroke-width="1.5" />
  <line x1={cx} y1={PIVOT.y} x2={cx + PAN / 2} y2={panY} stroke="#64748b" stroke-width="1.5" />
  {#each items as it, i (i)}
    {@const x = cx + it.x}
    {@const y = panY + it.y - it.h}
    {#if it.load.kind === 'weight'}
      <g>
        <rect x={x + it.w / 2 - 4} y={y - 5} width="8" height="7" rx="2" fill="#334155" />
        <path
          d="M{x + 3} {y + 2} H{x + it.w - 3} L{x + it.w} {y + it.h} H{x} Z"
          fill="#475569"
          stroke="#1e293b"
          stroke-width="1"
        />
        <text
          x={x + it.w / 2}
          y={y + it.h / 2 + 6}
          text-anchor="middle"
          font-size="16"
          font-weight="700"
          fill="#fff">{weightLabel(it.load)}</text
        >
      </g>
    {:else if 'name' in it.load}
      <rect
        {x}
        {y}
        width={it.w}
        height={it.h}
        rx="10"
        fill={colorOf(it.load.name)}
        stroke="#475569"
        stroke-width="1.5"
      />
      <text
        x={x + it.w / 2}
        y={y + it.h / 2 + 6}
        text-anchor="middle"
        font-size="16"
        font-weight="700"
        fill="#1e293b">{it.load.name}</text
      >
    {:else}
      {@const id = it.load.id}
      {#if id === 'pomelo'}
        <circle
          cx={x + it.w / 2}
          cy={y + it.h / 2 + 1}
          r={it.h / 2 - 1}
          fill="#a3e635"
          stroke="#4d7c0f"
        />
        <path d="M{x + it.w / 2} {y + 2} q 8 -8 14 -2 q -6 6 -14 2" fill="#15803d" />
      {:else if id === 'bag'}
        <rect
          x={x + 2}
          y={y + 4}
          width={it.w - 4}
          height={it.h - 4}
          rx="4"
          fill="#f8fafc"
          stroke="#2563eb"
          stroke-width="2"
        />
        <path
          d="M{x + 6} {y + 4} L{x + it.w / 2} {y - 1} L{x + it.w - 6} {y + 4}"
          fill="#bfdbfe"
          stroke="#2563eb"
        />
        <text
          x={x + it.w / 2}
          y={y + it.h / 2 + 6}
          text-anchor="middle"
          font-size="8"
          font-weight="700"
          fill="#1d4ed8">ĐƯỜNG</text
        >
      {:else if id === 'melon'}
        <ellipse
          cx={x + it.w / 2}
          cy={y + it.h / 2}
          rx={it.w / 2}
          ry={it.h / 2}
          fill="#16a34a"
          stroke="#14532d"
        />
        {#each [-14, 0, 14] as dx (dx)}
          <path
            d="M{x + it.w / 2 + dx} {y + 2} q {dx / 2} {it.h / 2 - 2} 0 {it.h - 4}"
            fill="none"
            stroke="#14532d"
            stroke-width="2.5"
          />
        {/each}
      {:else if id === 'pumpkin'}
        {#each [-16, 0, 16] as dx (dx)}
          <ellipse
            cx={x + it.w / 2 + dx}
            cy={y + it.h / 2 + 2}
            rx="14"
            ry={it.h / 2 - 2}
            fill="#f97316"
            stroke="#c2410c"
          />
        {/each}
        <rect x={x + it.w / 2 - 3} y={y - 2} width="6" height="8" rx="2" fill="#65a30d" />
      {:else if id === 'box'}
        <rect
          {x}
          {y}
          width={it.w}
          height={it.h}
          fill="#d6a76a"
          stroke="#92400e"
          stroke-width="1.5"
        />
        <line x1={x} y1={y + 10} x2={x + it.w} y2={y + 10} stroke="#92400e" />
        <text
          x={x + it.w / 2}
          y={y + it.h / 2 + 10}
          text-anchor="middle"
          font-size="10"
          font-weight="700"
          fill="#78350f">SÁCH</text
        >
      {:else}
        <path
          d="M{x + 8} {y + 10} Q{x} {y + it.h} {x + 8} {y + it.h} H{x + it.w - 8} Q{x + it.w} {y +
            it.h} {x + it.w - 8} {y + 10} Z"
          fill="#fef3c7"
          stroke="#a16207"
          stroke-width="1.5"
        />
        <path
          d="M{x + 12} {y + 10} L{x + it.w / 2} {y + 2} L{x + it.w - 12} {y + 10}"
          fill="#fde68a"
          stroke="#a16207"
        />
        <text
          x={x + it.w / 2}
          y={y + it.h / 2 + 10}
          text-anchor="middle"
          font-size="10"
          font-weight="700"
          fill="#92400e">GẠO</text
        >
      {/if}
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

<svg
  viewBox="0 0 340 296"
  class="mx-auto block w-full max-w-md"
  role="img"
  aria-label={label ?? balanceText(left, right)}
>
  <rect x="120" y="278" width="100" height="12" rx="4" fill="#64748b" />
  <path
    d="M{PIVOT.x - 10} 278 L{PIVOT.x - 4} {PIVOT.y} H{PIVOT.x + 4} L{PIVOT.x + 10} 278 Z"
    fill="#94a3b8"
  />
  <g
    class="transition-transform duration-500 motion-reduce:transition-none"
    style="transform: translateY({-drop}px)"
  >
    {@render pan(PIVOT.x - ARM, leftItems)}
  </g>
  <g
    class="transition-transform duration-500 motion-reduce:transition-none"
    style="transform: translateY({drop}px)"
  >
    {@render pan(PIVOT.x + ARM, rightItems)}
  </g>
  <g
    class="transition-transform duration-500 motion-reduce:transition-none"
    style="transform-origin: {PIVOT.x}px {PIVOT.y}px; transform: rotate({angle}deg)"
  >
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
