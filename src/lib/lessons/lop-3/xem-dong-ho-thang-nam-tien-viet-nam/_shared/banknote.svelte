<script>
  import { fmt } from '#lib/core/number-format.js';
  import { NOTE_WORDS } from './money.js';

  /**
   * A drawn banknote from 1 000 to 100 000 đồng, one colour per value with
   * its number large. A plain teaching picture, not a copy of the real note.
   *
   * - `value`: one of `NOTES`.
   * - `small`: a narrower note, for a row of many notes.
   * - `decorative`: hidden from screen readers, when the button or sentence
   *   around it already says the value.
   * @type {{ value: import('./money.js').Note; small?: boolean; decorative?: boolean }}
   */
  let { value, small = false, decorative = false } = $props();

  const COLORS = {
    1000: { fill: '#fef3c7', edge: '#b45309', ink: '#78350f' },
    2000: { fill: '#e7e5e4', edge: '#78716c', ink: '#44403c' },
    5000: { fill: '#dbeafe', edge: '#1d4ed8', ink: '#1e3a8a' },
    10000: { fill: '#fde68a', edge: '#a16207', ink: '#713f12' },
    20000: { fill: '#bae6fd', edge: '#0369a1', ink: '#0c4a6e' },
    50000: { fill: '#fbcfe8', edge: '#be185d', ink: '#831843' },
    100000: { fill: '#bbf7d0', edge: '#15803d', ink: '#14532d' },
  };

  const color = $derived(COLORS[value]);
</script>

<svg
  viewBox="0 0 120 60"
  class="shrink-0 {small ? 'w-24' : 'w-32'}"
  role={decorative ? undefined : 'img'}
  aria-hidden={decorative ? 'true' : undefined}
  aria-label={decorative ? undefined : `Tờ ${NOTE_WORDS[value]}`}
>
  <rect
    x="1.5"
    y="1.5"
    width="117"
    height="57"
    rx="6"
    fill={color.fill}
    stroke={color.edge}
    stroke-width="2"
  />
  <rect
    x="6"
    y="6"
    width="108"
    height="48"
    rx="4"
    fill="none"
    stroke={color.edge}
    stroke-width="1"
    opacity="0.5"
  />
  <text x="60" y="32" text-anchor="middle" font-size="22" font-weight="800" fill={color.ink}
    >{fmt(value)}</text
  >
  <text x="60" y="48" text-anchor="middle" font-size="12" font-weight="600" fill={color.ink}
    >đồng</text
  >
</svg>
