<script>
  import { fmt } from '#lib/core/number-format.js';
  import { DIAL_MAX, dialAngle, dialPoint } from './measure.js';

  /**
   * A dial scale (cân đồng hồ) from 0 to 1 000 g: a number at every 100 g, a
   * small mark at every 50 g, and a needle that turns smoothly unless reduced
   * motion is asked for. A drawing only: the widget around it holds the controls.
   *
   * - `g`: what lies on the plate, in grams.
   * - `label`: what a screen reader hears.
   * @type {{ g: number, label: string }}
   */
  let { g, label } = $props();

  const CENTER = { x: 120, y: 142 };
  const MARKS = Array.from({ length: DIAL_MAX / 50 + 1 }, (_, i) => i * 50);
</script>

<svg viewBox="0 0 240 256" class="mx-auto block w-full max-w-72" role="img" aria-label={label}>
  <rect x="50" y="8" width="140" height="12" rx="6" fill="#94a3b8" />
  <rect x="108" y="18" width="24" height="20" fill="#64748b" />
  <circle cx={CENTER.x} cy={CENTER.y} r="108" fill="#fff" stroke="#475569" stroke-width="5" />
  {#each MARKS as mark (mark)}
    {@const big = mark % 100 === 0}
    {@const a = dialPoint(mark, 100, CENTER)}
    {@const b = dialPoint(mark, big ? 86 : 92, CENTER)}
    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#334155" stroke-width={big ? 2.5 : 1.2} />
    {#if big}
      {@const t = dialPoint(mark, 68, CENTER)}
      <text x={t.x} y={t.y + 5} text-anchor="middle" font-size="14" font-weight="700" fill="#1e293b"
        >{fmt(mark)}</text
      >
    {/if}
  {/each}
  <text x={CENTER.x} y={CENTER.y + 62} text-anchor="middle" font-size="18" fill="#334155">g</text>
  <line
    x1={CENTER.x}
    y1={CENTER.y + 12}
    x2={CENTER.x}
    y2={CENTER.y - 90}
    stroke="#dc2626"
    stroke-width="3.5"
    stroke-linecap="round"
    class="motion-safe:transition-transform motion-safe:duration-300"
    style="transform-origin: {CENTER.x}px {CENTER.y}px; transform: rotate({dialAngle(g)}deg)"
  />
  <circle cx={CENTER.x} cy={CENTER.y} r="7" fill="#dc2626" />
</svg>
