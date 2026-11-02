<script>
  import { THINGS } from './solids.js';

  /**
   * An everyday thing with the form of a solid, drawn inline.
   *
   * - `id`: which thing (see `THINGS` in `solids.js`).
   * - `size`: width and height in CSS pixels.
   * - `decorative`: hide it from screen readers when a nearby label names it.
   *
   * @type {{ id: string, size?: number, decorative?: boolean }}
   */
  let { id, size = 64, decorative = false } = $props();

  const name = $derived(THINGS.find((t) => t.id === id)?.name ?? '');
  const ink = '#1e293b';
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 100 100"
  role={decorative ? undefined : 'img'}
  aria-label={decorative ? undefined : name}
  aria-hidden={decorative ? 'true' : undefined}
  class="shrink-0"
>
  {#snippet can(
    /** @type {number} */ x,
    /** @type {number} */ y,
    /** @type {number} */ w,
    /** @type {number} */ h,
    /** @type {string} */ body,
    /** @type {string} */ lid,
  )}
    <path
      d="M{x} {y} V{y + h} A{w / 2} {w / 5} 0 0 0 {x + w} {y + h} V{y} Z"
      fill={body}
      stroke={ink}
      stroke-width="3"
    />
    <ellipse cx={x + w / 2} cy={y} rx={w / 2} ry={w / 5} fill={lid} stroke={ink} stroke-width="3" />
  {/snippet}
  {#snippet ball(/** @type {string} */ fill, /** @type {number} */ r)}
    <circle cx="50" cy="50" {r} {fill} stroke={ink} stroke-width="3" />
    <ellipse
      cx={50 - r * 0.35}
      cy={50 - r * 0.4}
      rx={r * 0.24}
      ry={r * 0.16}
      fill="#fff"
      fill-opacity="0.75"
    />
  {/snippet}

  {#if id === 'lon-nuoc'}
    {@render can(28, 16, 44, 68, '#ef4444', '#e2e8f0')}
    <path d="M28 44 Q50 30 72 50 V62 Q50 44 28 56 Z" fill="#fff" />
    <ellipse cx="50" cy="16" rx="7" ry="2.5" fill="#64748b" />
  {:else if id === 'lon-sua'}
    {@render can(24, 22, 52, 56, '#bfdbfe', '#e2e8f0')}
    <rect x="24" y="42" width="52" height="20" fill="#2563eb" />
    <text x="50" y="57" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">SỮA</text>
  {:else if id === 'ong-nuoc'}
    <g transform="rotate(90 50 50)">
      {@render can(32, 6, 36, 84, '#94a3b8', '#475569')}
      <ellipse cx="50" cy="6" rx="10" ry="3.5" fill="#1e293b" />
    </g>
  {:else if id === 'khuc-go'}
    <g transform="rotate(90 50 50)">
      {@render can(26, 12, 48, 72, '#a16207', '#fde68a')}
      <ellipse cx="50" cy="12" rx="14" ry="5" fill="none" stroke="#a16207" stroke-width="2" />
      <ellipse cx="50" cy="12" rx="6" ry="2" fill="none" stroke="#a16207" stroke-width="2" />
    </g>
  {:else if id === 'cuc-pin'}
    <rect x="44" y="6" width="12" height="10" rx="2" fill="#94a3b8" stroke={ink} stroke-width="3" />
    {@render can(32, 16, 36, 68, '#16a34a', '#cbd5e1')}
    <text x="50" y="58" text-anchor="middle" font-size="22" font-weight="700" fill="#fff">+</text>
  {:else if id === 'coc-nuoc'}
    {@render can(28, 14, 44, 70, '#e0f2fe', '#f8fafc')}
    <path d="M30 38 Q50 46 70 38 V84 Q50 94 30 84 Z" fill="#38bdf8" fill-opacity="0.75" />
  {:else if id === 'qua-bong'}
    {@render ball('#fff', 40)}
    <polygon points="50,38 61,46 57,59 43,59 39,46" fill={ink} />
    {#each [0, 72, 144, 216, 288] as turn (turn)}
      <polygon points="42,11 58,11 55,19 45,19" fill={ink} transform="rotate({turn} 50 50)" />
    {/each}
    <path
      d="M50 38 V14 M61 46 L84 38 M57 59 L72 80 M43 59 L28 80 M39 46 L16 38"
      stroke={ink}
      stroke-width="3"
    />
  {:else if id === 'qua-cam'}
    {@render ball('#fb923c', 38)}
    <path d="M50 12 Q48 6 44 4" fill="none" stroke="#166534" stroke-width="4" />
    <path d="M51 12 Q62 2 72 8 Q62 16 51 12 Z" fill="#22c55e" stroke={ink} stroke-width="2" />
  {:else if id === 'qua-dia-cau'}
    <circle cx="50" cy="44" r="36" fill="#38bdf8" stroke={ink} stroke-width="3" />
    <path
      d="M34 22 Q50 20 52 32 Q44 44 32 40 Q24 32 34 22 Z M56 48 Q72 44 76 54 Q68 72 58 68 Q52 58 56 48 Z"
      fill="#4ade80"
      stroke="#166534"
      stroke-width="2"
    />
    <rect x="46" y="80" width="8" height="10" fill="#64748b" />
    <rect x="30" y="88" width="40" height="8" rx="3" fill="#475569" stroke={ink} stroke-width="2" />
  {:else if id === 'vien-bi'}
    {@render ball('#a78bfa', 28)}
    <path
      d="M30 58 Q50 42 76 56"
      fill="none"
      stroke="#fff"
      stroke-width="4"
      stroke-linecap="round"
    />
  {:else if id === 'den-long'}
    <line x1="50" y1="2" x2="50" y2="14" stroke={ink} stroke-width="3" />
    <rect x="42" y="10" width="16" height="6" fill="#facc15" stroke={ink} stroke-width="2" />
    <circle cx="50" cy="48" r="33" fill="#ef4444" stroke={ink} stroke-width="3" />
    <ellipse cx="50" cy="48" rx="16" ry="33" fill="none" stroke="#7f1d1d" stroke-width="2" />
    <rect x="42" y="80" width="16" height="6" fill="#facc15" stroke={ink} stroke-width="2" />
    <path d="M46 86 V98 M50 86 V98 M54 86 V98" stroke="#facc15" stroke-width="2" />
  {:else if id === 'qua-buoi'}
    {@render ball('#bef264', 42)}
    <path d="M50 8 V2" stroke="#166534" stroke-width="5" />
  {:else if id === 'hop-qua'}
    <polygon
      points="12,36 30,20 90,20 72,36"
      fill="#f9a8d4"
      stroke={ink}
      stroke-width="3"
      stroke-linejoin="round"
    />
    <polygon
      points="72,36 90,20 90,62 72,78"
      fill="#db2777"
      stroke={ink}
      stroke-width="3"
      stroke-linejoin="round"
    />
    <rect x="12" y="36" width="60" height="42" fill="#f472b6" stroke={ink} stroke-width="3" />
    <rect x="37" y="36" width="10" height="42" fill="#fde68a" />
    <polygon points="37,36 47,36 65,20 55,20" fill="#fde68a" />
  {:else if id === 'quyen-sach'}
    <polygon
      points="14,30 30,16 88,16 72,30"
      fill="#f8fafc"
      stroke={ink}
      stroke-width="3"
      stroke-linejoin="round"
    />
    <polygon
      points="72,30 88,16 88,70 72,84"
      fill="#e2e8f0"
      stroke={ink}
      stroke-width="3"
      stroke-linejoin="round"
    />
    <rect x="14" y="30" width="58" height="54" fill="#22c55e" stroke={ink} stroke-width="3" />
    <rect x="24" y="42" width="38" height="8" fill="#fff" />
  {:else if id === 'xuc-xac'}
    <polygon
      points="16,32 34,16 86,16 68,32"
      fill="#f1f5f9"
      stroke={ink}
      stroke-width="3"
      stroke-linejoin="round"
    />
    <polygon
      points="68,32 86,16 86,66 68,84"
      fill="#cbd5e1"
      stroke={ink}
      stroke-width="3"
      stroke-linejoin="round"
    />
    <rect x="16" y="32" width="52" height="52" rx="2" fill="#fff" stroke={ink} stroke-width="3" />
    {#each [[30, 46], [54, 46], [42, 58], [30, 70], [54, 70]] as [cx, cy] (`${cx}-${cy}`)}
      <circle {cx} {cy} r="4.5" fill="#dc2626" />
    {/each}
  {:else if id === 'rubik'}
    <polygon
      points="16,32 34,16 86,16 68,32"
      fill="#fde047"
      stroke={ink}
      stroke-width="3"
      stroke-linejoin="round"
    />
    <polygon
      points="68,32 86,16 86,66 68,84"
      fill="#22c55e"
      stroke={ink}
      stroke-width="3"
      stroke-linejoin="round"
    />
    <rect x="16" y="32" width="52" height="52" fill="#ef4444" stroke={ink} stroke-width="3" />
    <path
      d="M33.3 32 V84 M50.7 32 V84 M16 49.3 H68 M16 66.7 H68 M22 26.7 H74 M28 21.3 H80 M33.3 32 L51 16 M50.7 32 L68.5 16 M74 26.7 V77 M80 21.3 V71.7 M68 49.3 L86 33 M68 66.7 L86 50"
      fill="none"
      stroke={ink}
      stroke-width="2"
    />
  {/if}
</svg>
