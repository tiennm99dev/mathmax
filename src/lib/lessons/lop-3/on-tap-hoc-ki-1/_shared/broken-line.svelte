<script>
  import { pointsAttr } from '#lib/utils/svg.js';

  /**
   * A broken line (đường gấp khúc) with its points named the book's way and
   * each segment's length written on it, not to scale: the child adds the
   * written lengths.
   * @type {{ lengths: readonly number[] }}
   */
  let { lengths } = $props();

  const NAMES = ['A', 'B', 'C', 'D', 'E'];
  const W = 340;
  const H = 130;
  const PAD = 24;

  const points = $derived(
    Array.from({ length: lengths.length + 1 }, (_, i) => ({
      x: PAD + (i * (W - 2 * PAD)) / lengths.length,
      y: i % 2 === 0 ? 96 : 34,
    })),
  );
  const label = $derived(
    `Đường gấp khúc ${NAMES.slice(0, lengths.length + 1).join('')}: ${lengths
      .map((l, i) => `đoạn ${NAMES[i]}${NAMES[i + 1]} dài ${l} mi-li-mét`)
      .join(', ')}.`,
  );
</script>

<svg
  viewBox="0 0 {W} {H}"
  class="mx-auto block w-full max-w-sm select-none rounded-2xl bg-sky-50"
  role="img"
  aria-label={label}
>
  <polyline
    points={pointsAttr(points)}
    fill="none"
    stroke="#1e3a8a"
    stroke-width="3"
    stroke-linejoin="round"
  />
  {#each points as p, i (i)}
    <circle cx={p.x} cy={p.y} r="4.5" fill="#1e3a8a" />
    <text
      x={p.x}
      y={i % 2 === 0 ? p.y + 24 : p.y - 12}
      text-anchor="middle"
      font-size="18"
      font-weight="700"
      fill="#0f172a">{NAMES[i]}</text
    >
  {/each}
  {#each lengths as length, i (i)}
    <text
      x={(points[i].x + points[i + 1].x) / 2 - 25}
      y={(points[i].y + points[i + 1].y) / 2 + (i % 2 === 0 ? -6 : 17)}
      text-anchor="middle"
      font-size="16"
      font-weight="600"
      fill="#b91c1c">{length} mm</text
    >
  {/each}
</svg>
