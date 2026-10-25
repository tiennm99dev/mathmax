<script>
  import { niceAxis } from '#lib/stats-engine/ticks.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { fmt } from '#lib/core/number-format.js';

  /**
   * A column chart (biểu đồ cột) with one series, or a double column chart
   * (biểu đồ cột kép) with two, for categories with long names: each name
   * wraps onto two lines under its group. Bars of the favourite category are
   * outlined.
   *
   * @type {{
   *   categories: string[];
   *   series: Array<{ name: string, color: string, values: number[] }>;
   *   highlight?: number[];
   *   unit?: string;
   *   title: string;
   * }}
   */
  let { categories, series, highlight = [], unit = '', title } = $props();

  const W = 440;
  const H = 364;
  const LEFT = 46;
  const RIGHT = 8;
  const TOP = 30;
  const BOTTOM = 76;

  const peak = $derived(Math.max(5, ...series.flatMap((s) => s.values)) * 1.1);
  const axis = $derived(niceAxis(0, peak, 5));
  const y = $derived(linear(0, axis.max, H - BOTTOM, TOP));
  const slot = $derived((W - LEFT - RIGHT) / Math.max(1, categories.length));
  const barW = $derived(Math.min(34, (slot * 0.8) / series.length));
  /** @param {number} c @param {number} s */
  const barX = (c, s) => LEFT + slot * (c + 0.5) + (s - series.length / 2) * barW;

  /**
   * Wraps a name greedily into lines of at most 6 letters, so long names
   * such as "Thể dục nhịp điệu" fit under their group on a phone.
   * @param {string} name
   */
  function lines(name) {
    /** @type {string[]} */
    const out = [];
    for (const word of name.split(' ')) {
      const last = out.length ? out[out.length - 1] : null;
      if (last !== null && last.length + 1 + word.length <= 6)
        out[out.length - 1] = `${last} ${word}`;
      else out.push(word);
    }
    return out;
  }

  const label = $derived(
    `${title}: ` +
      categories
        .map((c, i) => `${c} ${series.map((s) => `${s.name} ${s.values[i]}`).join(', ')}`)
        .join('; '),
  );
</script>

<figure class="space-y-2">
  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-2xl select-none"
    style:aspect-ratio="{W} / {H}"
    role="img"
    aria-label={label}
  >
    {#each axis.ticks as t (t)}
      <line x1={LEFT} y1={y.map(t)} x2={W - RIGHT} y2={y.map(t)} stroke="#e2e8f0" />
      <text x={LEFT - 6} y={y.map(t) + 4} text-anchor="end" font-size="13" fill="#64748b"
        >{fmt(t)}</text
      >
    {/each}
    {#if unit}
      <text x={LEFT - 6} y={TOP - 14} font-size="12" font-weight="600" fill="#334155">{unit}</text>
    {/if}
    <line x1={LEFT} y1={TOP - 4} x2={LEFT} y2={H - BOTTOM} stroke="#334155" stroke-width="1.5" />
    <line
      x1={LEFT}
      y1={H - BOTTOM}
      x2={W - RIGHT}
      y2={H - BOTTOM}
      stroke="#334155"
      stroke-width="1.5"
    />
    {#each categories as cat, c (cat)}
      {#each series as s, k (s.name)}
        {@const top = y.map(s.values[c])}
        <rect
          x={barX(c, k)}
          y={top}
          width={barW}
          height={H - BOTTOM - top}
          fill={s.color}
          stroke={highlight.includes(c) ? '#0f172a' : 'none'}
          stroke-width="2"
          rx="2"
        />
        <text
          x={barX(c, k) + barW / 2}
          y={top - 5}
          text-anchor="middle"
          font-size={series.length > 1 ? 11 : 14}
          font-weight="700"
          fill="#1e293b">{s.values[c]}</text
        >
      {/each}
      {#each lines(cat) as line, j (j)}
        <text
          x={LEFT + slot * (c + 0.5)}
          y={H - BOTTOM + 18 + j * 16}
          text-anchor="middle"
          font-size="12.5"
          font-weight={highlight.includes(c) ? 700 : 400}
          fill="#334155">{line}</text
        >
      {/each}
    {/each}
  </svg>
  <figcaption
    class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-slate-700"
  >
    <span class="font-semibold">{title}</span>
    {#if series.length > 1}
      {#each series as s (s.name)}
        <span class="inline-flex items-center gap-1">
          <span
            class="inline-block h-3 w-3 rounded-sm"
            style:background={s.color}
            aria-hidden="true"
          ></span>
          {s.name}
        </span>
      {/each}
    {/if}
  </figcaption>
</figure>
