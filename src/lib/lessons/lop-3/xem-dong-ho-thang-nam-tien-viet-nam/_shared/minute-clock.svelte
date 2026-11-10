<script>
  import { polar } from '#lib/core/visuals/svg-math.js';
  import { handAngles } from '#lib/units-engine/clock.js';
  import { handsWords } from './time.js';

  /**
   * A still analog clock with the 60 small minute marks, for reading a time
   * to the minute. The long hand reaches the marks, so a child can count
   * them. Screen readers hear where the two hands point, never the time.
   *
   * - `minutes`: the time as minutes since 0:00.
   * - `size`: CSS width class of the picture.
   * - `label`: overrides the spoken description.
   * @type {{ minutes: number, size?: string, label?: string }}
   */
  let { minutes, size = 'w-52', label } = $props();

  const S = 200;
  const C = S / 2;
  const R = 92;
  const angles = $derived(handAngles(minutes));
  const hourTip = $derived(polar(C, C, R * 0.42, angles.hour));
  const minuteTip = $derived(polar(C, C, R - 10, angles.minute));
</script>

<svg
  viewBox="0 0 {S} {S}"
  class="{size} mx-auto block shrink-0 select-none"
  role="img"
  aria-label={label ?? `Đồng hồ: ${handsWords(minutes)}.`}
>
  <circle cx={C} cy={C} r={R} fill="#fff" stroke="#334155" stroke-width="5" />
  {#each { length: 60 } as _, m (m)}
    {@const big = m % 5 === 0}
    {@const a = polar(C, C, R - 4, m * 6)}
    {@const b = polar(C, C, R - (big ? 13 : 9), m * 6)}
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={big ? '#334155' : '#94a3b8'}
      stroke-width={big ? 3 : 1.5}
    />
  {/each}
  {#each { length: 12 } as _, h (h)}
    {@const t = polar(C, C, R - 28, h * 30)}
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
    stroke-width="4"
    stroke-linecap="round"
  />
  <circle cx={C} cy={C} r="6" fill="#1e293b" />
</svg>
