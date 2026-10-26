<script>
  import { niceAxis } from '#lib/stats-engine/ticks.js';
  import { linear } from '#lib/core/visuals/svg-math.js';

  /**
   * A double bar chart (biểu đồ cột kép): two bars per category, one per
   * series, with a legend. Series can be hidden to look at one data set at a
   * time; a hidden series keeps its place so the categories do not move. With
   * `onselect`, each category group is a button (pointer, Enter or Space) that
   * picks the category to compare.
   *
   * @type {{
   *   categories: string[];
   *   series: Array<{ name: string, color: string, values: number[] }>;
   *   visible?: boolean[];
   *   selected?: number | null;
   *   onselect?: (i: number) => void;
   *   max?: number;
   *   unit?: string;
   *   title: string;
   *   width?: number;
   *   height?: number;
   * }}
   */
  let {
    categories,
    series,
    visible = series.map(() => true),
    selected = null,
    onselect,
    max,
    unit = '',
    title,
    width = 480,
    height = 300,
  } = $props();

  const LEFT = 44;
  const RIGHT = 10;
  const TOP = 30;
  const BOTTOM = 40;

  const peak = $derived(max ?? Math.max(1, ...series.flatMap((s) => s.values)));
  const axis = $derived(niceAxis(0, peak, 5));
  const y = $derived(linear(0, axis.max, height - BOTTOM, TOP));
  const slot = $derived((width - LEFT - RIGHT) / Math.max(1, categories.length));
  const barW = $derived(Math.min(30, (slot * 0.7) / series.length));
  /** @param {number} c @param {number} s */
  const barX = (c, s) => LEFT + slot * (c + 0.5) + (s - series.length / 2) * barW;

  const label = $derived(
    `${title}: ` +
      categories
        .map(
          (c, i) =>
            `${c}: ` +
            series
              .filter((_, s) => visible[s])
              .map((s) => `${s.name} ${s.values[i]}`)
              .join(', '),
        )
        .join('; '),
  );

  /** @param {KeyboardEvent} e @param {number} i */
  function key(e, i) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onselect?.(i);
    }
  }
</script>

<figure class="space-y-2">
  <svg
    viewBox="0 0 {width} {height}"
    class="mx-auto block w-full max-w-xl select-none"
    style:aspect-ratio="{width} / {height}"
    role={onselect ? 'group' : 'img'}
    aria-label={label}
  >
    {#each axis.ticks as t (t)}
      <line x1={LEFT} y1={y.map(t)} x2={width - RIGHT} y2={y.map(t)} stroke="#e2e8f0" />
      <text x={LEFT - 6} y={y.map(t) + 4} text-anchor="end" font-size="12" fill="#64748b">{t}</text>
    {/each}
    {#if unit}
      <text x={LEFT - 6} y={TOP - 14} font-size="12" font-weight="600" fill="#334155">{unit}</text>
    {/if}
    <line
      x1={LEFT}
      y1={TOP - 4}
      x2={LEFT}
      y2={height - BOTTOM}
      stroke="#334155"
      stroke-width="1.5"
    />
    <line
      x1={LEFT}
      y1={height - BOTTOM}
      x2={width - RIGHT}
      y2={height - BOTTOM}
      stroke="#334155"
      stroke-width="1.5"
    />

    {#each categories as cat, c (cat)}
      {@const gx = LEFT + slot * c}
      {#if selected === c}
        <rect
          x={gx + 2}
          y={TOP - 6}
          width={slot - 4}
          height={height - BOTTOM - TOP + 6}
          fill="#EEF2FF"
        />
      {/if}
      {#each series as s, k (s.name)}
        {#if visible[k]}
          {@const top = y.map(s.values[c])}
          <rect
            x={barX(c, k)}
            y={top}
            width={barW}
            height={height - BOTTOM - top}
            fill={s.color}
            rx="2"
          />
          <text
            x={barX(c, k) + barW / 2}
            y={top - 5}
            text-anchor="middle"
            font-size="12"
            font-weight="700"
            fill="#1e293b">{s.values[c]}</text
          >
        {/if}
      {/each}
      <text
        x={gx + slot / 2}
        y={height - BOTTOM + 20}
        text-anchor="middle"
        font-size="13"
        fill="#334155">{cat}</text
      >
      {#if onselect}
        <rect
          role="button"
          tabindex="0"
          aria-label="So sánh {cat}"
          aria-pressed={selected === c}
          class="cursor-pointer outline-none focus-visible:stroke-indigo-500"
          x={gx + 2}
          y={TOP - 6}
          width={slot - 4}
          height={height - TOP + 6 - 4}
          fill="transparent"
          stroke-width="2"
          onclick={() => onselect(c)}
          onkeydown={(e) => key(e, c)}
        />
      {/if}
    {/each}
  </svg>
  <figcaption
    class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-slate-700"
  >
    <span class="font-semibold">{title}</span>
    {#each series as s (s.name)}
      <span class="inline-flex items-center gap-1">
        <span class="inline-block h-3 w-3 rounded-sm" style:background={s.color} aria-hidden="true"
        ></span>
        {s.name}
      </span>
    {/each}
  </figcaption>
</figure>
