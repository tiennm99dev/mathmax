<script>
  /**
   * A container (chai, bình, can or xô) drawn in SVG with water up to a
   * level. The water rises or falls smoothly unless reduced motion is asked
   * for. A drawing only: the widget around it holds the controls.
   *
   * - `id`: which container (`VesselId` in `capacity.js`).
   * - `fill`: how full it is, from 0 (empty) to 1 (full).
   * - `label`: what a screen reader hears.
   * - `size`: width in CSS pixels.
   * - `caption`: the container's name, shown under it.
   * @type {{
   *   id: import('./capacity.js').VesselId;
   *   fill: number;
   *   label: string;
   *   size?: number;
   *   caption?: string;
   * }}
   */
  let { id, fill, label, size = 120, caption } = $props();

  const uid = $props.id();

  /** Body outline and the top and bottom of the water space. */
  const SHAPES = {
    bottle: {
      body: 'M42 6 H58 V24 Q72 30 72 44 V108 Q72 114 66 114 H34 Q28 114 28 108 V44 Q28 30 42 24 Z',
      top: 10,
    },
    jar: { body: 'M30 26 H70 Q82 70 72 114 H28 Q18 70 30 26 Z', top: 28 },
    can: {
      body: 'M18 36 Q18 28 26 28 H74 Q82 28 82 36 V108 Q82 114 76 114 H24 Q18 114 18 108 Z',
      top: 30,
    },
    bucket: { body: 'M12 34 H88 L78 114 H22 Z', top: 36 },
  };

  const shape = $derived(SHAPES[id]);
  const level = $derived(Math.max(0, Math.min(1, fill)));
</script>

<figure class="flex shrink-0 flex-col items-center gap-1">
  <svg
    viewBox="0 0 100 120"
    width={size}
    height={size * 1.2}
    role="img"
    aria-label={label}
    class="shrink-0"
  >
    <defs>
      <clipPath id="{uid}-body"><path d={shape.body} /></clipPath>
    </defs>
    {#if id === 'jar'}
      <path d="M70 40 Q94 44 88 70 Q84 84 72 88" fill="none" stroke="#475569" stroke-width="5" />
    {:else if id === 'can'}
      <rect
        x="34"
        y="16"
        width="34"
        height="12"
        rx="5"
        fill="none"
        stroke="#475569"
        stroke-width="5"
      />
      <rect x="20" y="18" width="10" height="12" rx="2" fill="#dc2626" />
    {:else if id === 'bucket'}
      <path d="M14 34 Q50 -6 86 34" fill="none" stroke="#475569" stroke-width="3" />
    {/if}
    <path d={shape.body} fill="#f1f5f9" />
    <g clip-path="url(#{uid}-body)">
      <rect
        x="0"
        y={shape.top}
        width="100"
        height={114 - shape.top}
        fill="#38bdf8"
        class="transition-transform duration-500 motion-reduce:transition-none"
        style="transform-box: fill-box; transform-origin: bottom; transform: scaleY({level})"
      />
    </g>
    <path d={shape.body} fill="none" stroke="#475569" stroke-width="2.5" />
    {#if id === 'bottle'}
      <rect x="40" y="2" width="20" height="7" rx="2" fill="#2563eb" />
    {/if}
  </svg>
  {#if caption}<figcaption class="text-lg font-semibold text-slate-700">{caption}</figcaption>{/if}
</figure>
