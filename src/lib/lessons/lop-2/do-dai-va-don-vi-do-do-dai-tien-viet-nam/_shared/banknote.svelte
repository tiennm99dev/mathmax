<script>
  import { NOTE_WORDS } from './money.js';

  /**
   * A drawn banknote of the lesson, one colour per value with its number
   * large. A plain teaching picture, not a copy of the real note.
   *
   * - `value`: 100, 200, 500 or 1000.
   * - `small`: a narrower note, for a row of many notes.
   * - `decorative`: hides it from screen readers, when the button or sentence
   *   around it already says the value.
   * @type {{ value: import('./money.js').Note; small?: boolean; decorative?: boolean }}
   */
  let { value, small = false, decorative = false } = $props();

  const COLORS = {
    100: { fill: '#fde68a', edge: '#b45309', ink: '#78350f' },
    200: { fill: '#fecaca', edge: '#b91c1c', ink: '#7f1d1d' },
    500: { fill: '#bfdbfe', edge: '#1d4ed8', ink: '#1e3a8a' },
    1000: { fill: '#ddd6fe', edge: '#6d28d9', ink: '#4c1d95' },
  };

  const color = $derived(COLORS[value]);
</script>

<svg
  viewBox="0 0 96 52"
  class="shrink-0 {small ? 'w-16' : 'w-24'}"
  role={decorative ? undefined : 'img'}
  aria-hidden={decorative ? 'true' : undefined}
  aria-label={decorative ? undefined : `Tờ ${NOTE_WORDS[value]}`}
>
  <rect
    x="1.5"
    y="1.5"
    width="93"
    height="49"
    rx="5"
    fill={color.fill}
    stroke={color.edge}
    stroke-width="2"
  />
  <rect
    x="6"
    y="6"
    width="84"
    height="40"
    rx="3"
    fill="none"
    stroke={color.edge}
    stroke-width="1"
    opacity="0.5"
  />
  <text x="48" y="28" text-anchor="middle" font-size="22" font-weight="800" fill={color.ink}
    >{value}</text
  >
  <text x="48" y="42" text-anchor="middle" font-size="12" font-weight="600" fill={color.ink}
    >đồng</text
  >
</svg>
