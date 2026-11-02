<script>
  import ShapeFigure from '#lib/core/kid/shape-figure.svelte';
  import { COLORS } from '#lib/core/kid/shapes.js';

  /**
   * One solid drawn still on its own square canvas: a standing cylinder, a
   * sphere, or a box or cube from core's `shape-figure`. Hidden from screen
   * readers: the parent names it.
   * @type {{ kind: import('./engine.js').SolidKind, color?: string, size?: number }}
   */
  let { kind, color = COLORS[3], size = 64 } = $props();

  const id = $props.id();
  const ink = '#1e293b';
</script>

{#if kind === 'hop-chu-nhat' || kind === 'lap-phuong'}
  <ShapeFigure figure={{ kind, color, size: 1, turn: 0, variant: 0 }} {size} decorative />
{:else}
  <svg width={size} height={size} viewBox="-6 -6 112 112" aria-hidden="true" class="shrink-0">
    <defs>
      <linearGradient id="{id}-side">
        <stop offset="0" stop-color="#000" stop-opacity="0.22" />
        <stop offset="0.35" stop-color="#fff" stop-opacity="0.35" />
        <stop offset="1" stop-color="#000" stop-opacity="0.28" />
      </linearGradient>
      <radialGradient id="{id}-ball" cx="0.36" cy="0.32" r="0.75">
        <stop offset="0" stop-color="#fff" stop-opacity="0.75" />
        <stop offset="0.45" stop-color="#fff" stop-opacity="0" />
        <stop offset="1" stop-color="#000" stop-opacity="0.32" />
      </radialGradient>
    </defs>
    {#if kind === 'cau'}
      <circle cx="50" cy="50" r="42" fill={color} />
      <circle cx="50" cy="50" r="42" fill="url(#{id}-ball)" stroke={ink} stroke-width="3" />
    {:else}
      <g stroke-width="3" stroke-linejoin="round">
        <path d="M24 18 V82 A26 10 0 0 0 76 82 V18 Z" fill={color} />
        <path d="M24 18 V82 A26 10 0 0 0 76 82 V18 Z" fill="url(#{id}-side)" stroke={ink} />
        <ellipse cx="50" cy="18" rx="26" ry="10" fill={color} />
        <ellipse cx="50" cy="18" rx="26" ry="10" fill="#fff" fill-opacity="0.4" stroke={ink} />
      </g>
    {/if}
  </svg>
{/if}
