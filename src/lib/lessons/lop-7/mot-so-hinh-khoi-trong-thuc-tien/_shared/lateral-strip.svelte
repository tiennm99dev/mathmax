<script>
  import { formatNumber } from '#lib/core/number-format.js';

  /**
   * The side faces of a right prism laid side by side in one strip: a
   * rectangle as long as the base perimeter and as tall as the prism, which
   * is why S_xq = C_đáy · h. Props:
   * - `sides`: base edges in order, `{ name, len }` (cm);
   * - `h`: height (cm);
   * - `active`: index of a side face to colour, or -1.
   * @type {{ sides: { name: string, len: number }[], h: number, active?: number }}
   */
  let { sides, h, active = -1 } = $props();

  const W = 360;
  const PAD = 18;
  const total = $derived(sides.reduce((s, x) => s + x.len, 0));
  const k = $derived(Math.min((W - 2 * PAD) / total, 90 / h));
  const HT = $derived(h * k);
  const SVG_H = $derived(HT + 62);
  const starts = $derived(sides.map((_, i) => sides.slice(0, i).reduce((s, x) => s + x.len, 0)));
  const left = $derived((W - total * k) / 2);
  /** @param {number} v */
  const num = (v) => formatNumber(v, 2);
</script>

<svg
  viewBox="0 0 {W} {SVG_H}"
  class="block h-auto w-full"
  role="img"
  aria-label="Các mặt bên trải thành một hình chữ nhật dài {num(total)} cm (chu vi đáy), cao {num(
    h,
  )} cm"
>
  {#each sides as s, i (i)}
    <rect
      x={left + starts[i] * k}
      y={22}
      width={s.len * k}
      height={HT}
      fill={i === active ? '#10B981' : '#6366F1'}
      fill-opacity={i === active ? 0.55 : 0.18 + 0.1 * (i % 2)}
      stroke="#1E293B"
      stroke-width="1.5"
    />
    <text
      x={left + (starts[i] + s.len / 2) * k}
      y={22 + HT + 16}
      text-anchor="middle"
      font-size="12"
      fill="#334155">{s.name} = {num(s.len)}</text
    >
  {/each}
  <text
    x={left + (total * k) / 2}
    y={14}
    text-anchor="middle"
    font-size="12"
    font-weight="700"
    fill="#3730A3">Chu vi đáy C = {num(total)} cm</text
  >
  <text x={left + total * k + 4} y={22 + HT / 2 + 4} font-size="12" font-weight="700" fill="#0F172A"
    >h</text
  >
  <text x={W / 2} y={SVG_H - 6} text-anchor="middle" font-size="12" fill="#475569"
    >S_xq = C · h = {num(total)} · {num(h)} = {num(total * h)} cm²</text
  >
</svg>
