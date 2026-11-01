<script>
  import { OBJECTS } from './shapes.js';

  /**
   * An everyday object whose face has one of the four shapes, drawn inline.
   *
   * - `id`: which object (see `OBJECTS` in `shapes.js`).
   * - `size`: width and height in CSS pixels.
   * - `decorative`: hide it from screen readers when a nearby label names it.
   *
   * @type {{ id: import('./shapes.js').ObjectId, size?: number, decorative?: boolean }}
   */
  let { id, size = 64, decorative = false } = $props();

  const name = $derived(OBJECTS.find((o) => o.id === id)?.name ?? '');
  const ink = '#1e293b';
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 100 100"
  role={decorative ? undefined : 'img'}
  aria-label={decorative ? undefined : name}
  aria-hidden={decorative ? 'true' : undefined}
>
  {#if id === 'dong-ho'}
    <circle cx="50" cy="50" r="42" fill="#fde68a" stroke={ink} stroke-width="4" />
    <circle cx="50" cy="50" r="34" fill="#fff" stroke={ink} stroke-width="2" />
    {#each [0, 90, 180, 270] as a (a)}
      <line
        x1="50"
        y1="19"
        x2="50"
        y2="25"
        stroke={ink}
        stroke-width="3"
        transform="rotate({a} 50 50)"
      />
    {/each}
    <line x1="50" y1="50" x2="50" y2="28" stroke={ink} stroke-width="4" stroke-linecap="round" />
    <line x1="50" y1="50" x2="66" y2="50" stroke={ink} stroke-width="4" stroke-linecap="round" />
    <circle cx="50" cy="50" r="3" fill={ink} />
  {:else if id === 'dong-xu'}
    <circle cx="50" cy="50" r="40" fill="#facc15" stroke="#a16207" stroke-width="4" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="#a16207" stroke-width="2" />
    <text x="50" y="60" text-anchor="middle" font-size="28" font-weight="700" fill="#a16207">1</text
    >
  {:else if id === 'cai-dia'}
    <circle cx="50" cy="50" r="42" fill="#e0f2fe" stroke={ink} stroke-width="3" />
    <circle cx="50" cy="50" r="28" fill="#fff" stroke="#7dd3fc" stroke-width="3" />
  {:else if id === 'banh-chung'}
    <rect
      x="16"
      y="16"
      width="68"
      height="68"
      rx="3"
      fill="#4ade80"
      stroke="#166534"
      stroke-width="4"
    />
    <line x1="38" y1="16" x2="38" y2="84" stroke="#fef3c7" stroke-width="4" />
    <line x1="62" y1="16" x2="62" y2="84" stroke="#fef3c7" stroke-width="4" />
    <line x1="16" y1="38" x2="84" y2="38" stroke="#fef3c7" stroke-width="4" />
    <line x1="16" y1="62" x2="84" y2="62" stroke="#fef3c7" stroke-width="4" />
  {:else if id === 'cua-so'}
    <rect x="16" y="16" width="68" height="68" fill="#bae6fd" stroke="#92400e" stroke-width="6" />
    <line x1="50" y1="16" x2="50" y2="84" stroke="#92400e" stroke-width="5" />
    <line x1="16" y1="50" x2="84" y2="50" stroke="#92400e" stroke-width="5" />
  {:else if id === 'vien-gach'}
    <rect x="16" y="16" width="68" height="68" fill="#fecaca" />
    <polygon points="50,24 76,50 50,76 24,50" fill="#fca5a5" stroke="#991b1b" stroke-width="2" />
    <circle cx="50" cy="50" r="9" fill="#fef3c7" stroke="#991b1b" stroke-width="2" />
    <rect x="16" y="16" width="68" height="68" fill="none" stroke="#991b1b" stroke-width="4" />
  {:else if id === 'bien-bao'}
    <line x1="50" y1="78" x2="50" y2="98" stroke="#64748b" stroke-width="6" />
    <polygon
      points="50,8 92,80 8,80"
      fill="#fde047"
      stroke="#dc2626"
      stroke-width="7"
      stroke-linejoin="round"
    />
    <line x1="50" y1="34" x2="50" y2="58" stroke={ink} stroke-width="7" stroke-linecap="round" />
    <circle cx="50" cy="69" r="4" fill={ink} />
  {:else if id === 'co-duoi-nheo'}
    <line x1="18" y1="8" x2="18" y2="96" stroke="#78350f" stroke-width="6" stroke-linecap="round" />
    <polygon
      points="21,12 90,34 21,56"
      fill="#f87171"
      stroke={ink}
      stroke-width="3"
      stroke-linejoin="round"
    />
  {:else if id === 'e-ke'}
    <polygon
      points="14,10 14,90 88,90"
      fill="#c4b5fd"
      stroke="#4c1d95"
      stroke-width="4"
      stroke-linejoin="round"
    />
    <polygon points="26,44 26,78 54,78" fill="#fff" stroke="#4c1d95" stroke-width="2" />
    {#each [24, 36, 48, 60, 72] as y (y)}
      <line x1="14" y1={y} x2="20" y2={y} stroke="#4c1d95" stroke-width="2" />
    {/each}
  {:else if id === 'quyen-vo'}
    <rect
      x="22"
      y="8"
      width="56"
      height="84"
      rx="3"
      fill="#93c5fd"
      stroke="#1e3a8a"
      stroke-width="4"
    />
    <rect
      x="32"
      y="22"
      width="36"
      height="16"
      rx="2"
      fill="#fff"
      stroke="#1e3a8a"
      stroke-width="2"
    />
    <line x1="22" y1="8" x2="22" y2="92" stroke="#1e3a8a" stroke-width="8" />
  {:else if id === 'cua-ra-vao'}
    <rect x="26" y="4" width="48" height="92" fill="#d97706" stroke="#78350f" stroke-width="4" />
    <rect x="33" y="12" width="34" height="34" fill="none" stroke="#78350f" stroke-width="2" />
    <rect x="33" y="54" width="34" height="34" fill="none" stroke="#78350f" stroke-width="2" />
    <circle cx="66" cy="50" r="4" fill="#fde68a" stroke="#78350f" stroke-width="1.5" />
  {:else}
    <rect x="6" y="22" width="88" height="58" fill="#ef4444" stroke="#7f1d1d" stroke-width="3" />
    <polygon
      points="50,33 54.7,45.5 68,45.5 57.2,53.5 61.2,66.5 50,58.5 38.8,66.5 42.8,53.5 32,45.5 45.3,45.5"
      fill="#facc15"
    />
  {/if}
</svg>
