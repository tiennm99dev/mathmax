<script>
  import { polar } from '#lib/core/visuals/svg-math.js';

  /**
   * A still analog clock showing a whole hour: the short hour hand on
   * `hour`, the long minute hand on 12. Screen readers hear where the two
   * hands point, which is what a child reads off the dial.
   *
   * - `hour`: 1 to 12 (0 to 23 also works; 15 shows as 3).
   * - `label`: overrides the spoken description.
   * - `size`: CSS width class of the picture.
   * @type {{ hour: number, label?: string, size?: string }}
   */
  let { hour, label, size = 'w-40' } = $props();

  const S = 200;
  const C = S / 2;
  const R = 92;
  const dial = $derived(hour % 12 || 12);
  const hourTip = $derived(polar(C, C, R * 0.5, (dial % 12) * 30));
  const minuteTip = polar(C, C, R * 0.8, 0);
</script>

<svg
  viewBox="0 0 {S} {S}"
  class="{size} block shrink-0 select-none"
  role="img"
  aria-label={label ?? `Đồng hồ: kim ngắn chỉ số ${dial}, kim dài chỉ số 12.`}
>
  <circle cx={C} cy={C} r={R} fill="#fff" stroke="#334155" stroke-width="5" />
  {#each { length: 12 } as _, h (h)}
    {@const a = polar(C, C, R - 4, h * 30)}
    {@const b = polar(C, C, R - 12, h * 30)}
    {@const t = polar(C, C, R - 27, h * 30)}
    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#334155" stroke-width="3" />
    <text x={t.x} y={t.y + 7} text-anchor="middle" font-size="19" font-weight="700" fill="#1e293b"
      >{h === 0 ? 12 : h}</text
    >
  {/each}
  <line
    x1={C}
    y1={C}
    x2={hourTip.x}
    y2={hourTip.y}
    stroke="#1e293b"
    stroke-width="8"
    stroke-linecap="round"
  />
  <line
    x1={C}
    y1={C}
    x2={minuteTip.x}
    y2={minuteTip.y}
    stroke="#D7263D"
    stroke-width="5"
    stroke-linecap="round"
  />
  <circle cx={C} cy={C} r="6" fill="#1e293b" />
</svg>
