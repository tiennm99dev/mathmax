<script>
  /**
   * One 1 l mug (ca 1 l), empty or full of water, marked "1 l".
   * @type {{ full: boolean, size?: number }}
   */
  let { full, size = 40 } = $props();

  const uid = $props.id();
  const body = 'M6 8 H30 L28 44 H8 Z';
</script>

<svg viewBox="0 0 40 48" width={size} height={size * 1.2} aria-hidden="true" class="shrink-0">
  <defs>
    <clipPath id="{uid}-cup"><path d={body} /></clipPath>
  </defs>
  <path d="M30 14 Q39 16 37 26 Q35 34 29 34" fill="none" stroke="#475569" stroke-width="3" />
  <path d={body} fill="#fff" />
  <g clip-path="url(#{uid}-cup)">
    <rect
      x="0"
      y="10"
      width="40"
      height="34"
      fill="#38bdf8"
      class="transition-transform duration-300 motion-reduce:transition-none"
      style="transform-box: fill-box; transform-origin: bottom; transform: scaleY({full ? 1 : 0})"
    />
  </g>
  <path d={body} fill="none" stroke="#475569" stroke-width="2" />
  <text
    x="18"
    y="31"
    text-anchor="middle"
    font-size="12"
    font-weight="700"
    fill={full ? '#0c4a6e' : '#64748b'}>1 l</text
  >
</svg>
