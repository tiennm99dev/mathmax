<script>
  import { pointsAttr } from '#lib/utils/svg.js';

  /**
   * A broken line (đường gấp khúc) with its points named the book's way (A, B,
   * C, D, E, G) and each segment's length written on it. The drawing is not to
   * scale: the child adds the written lengths. Up to five segments.
   * @type {{ lengths: readonly number[], unit?: string }}
   */
  let { lengths, unit = 'cm' } = $props();

  const NAMES = ['A', 'B', 'C', 'D', 'E', 'G'];
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
      .map((l, i) => `đoạn ${NAMES[i]}${NAMES[i + 1]} dài ${l} ${unit}`)
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
    <circle cx={p.x} cy={p.y} r="4" fill="#1e3a8a" />
    <text
      x={p.x}
      y={i % 2 === 0 ? p.y + 24 : p.y - 12}
      text-anchor="middle"
      font-size="18"
      font-weight="700"
      fill="#0f172a">{NAMES[i]}</text
    >
  {/each}
  {#each lengths as l, i (i)}
    <text
      x={(points[i].x + points[i + 1].x) / 2}
      y={(points[i].y + points[i + 1].y) / 2 + 5}
      text-anchor="middle"
      font-size="15"
      font-weight="700"
      fill="#b91c1c"
      stroke="#f0f9ff"
      stroke-width="5"
      paint-order="stroke">{l} {unit}</text
    >
  {/each}
</svg>
