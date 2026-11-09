<script>
  import { formatNumber } from '#lib/core/number-format.js';
  import { iconRow } from '#lib/stats-engine/frequency.js';
  import Picture from '#lib/core/kid/picture.svelte';

  /**
   * A picture chart (biểu đồ tranh): one row per category, each icon standing
   * for `icon` of `unit` (such as 'cây'); a remainder is drawn as the matching
   * part of an icon, so 35 with `icon` 10 shows three and a half icons. The
   * key under the chart says what one icon stands for. `item` picks the icon:
   * a green `'circle'` (the default), a small `'dot'`, or a kid picture by
   * name (`'apple'`, `'flower'`, see `kid/pictures/index.js`).
   * @type {{
   *   labels: string[];
   *   values: number[];
   *   icon: number;
   *   unit: string;
   *   title: string;
   *   item?: 'circle' | 'dot' | import('#lib/core/kid/pictures/index.js').PictureName;
   * }}
   */
  let { labels, values, icon, unit, title, item = 'circle' } = $props();

  const uid = $props.id();
  const SIZE = 26;
  const GAP = 6;
  const LABEL_W = 70;

  const rows = $derived(values.map((v) => iconRow(v, icon)));
  const maxIcons = $derived(Math.max(...rows.map((r) => r.whole + (r.part > 0 ? 1 : 0)), 1));
  const width = $derived(LABEL_W + maxIcons * (SIZE + GAP) + GAP);
  const ROW_H = SIZE + 10;
  const height = $derived(rows.length * ROW_H + 8);
</script>

{#snippet icon1(/** @type {number} */ x, /** @type {number} */ y)}
  {#if item === 'circle'}
    <circle cx={x + SIZE / 2} cy={y + SIZE / 2} r={SIZE / 2} fill="#16a34a" />
    <circle cx={x + SIZE / 2 - 4} cy={y + SIZE / 2 - 4} r="4" fill="#bbf7d0" />
  {:else if item === 'dot'}
    <circle cx={x + SIZE / 2} cy={y + SIZE / 2} r={SIZE / 4} fill="#334155" />
  {:else}
    <Picture name={item} size={SIZE} {x} {y} decorative />
  {/if}
{/snippet}

<figure class="mx-auto w-full max-w-xl">
  <svg
    viewBox="0 0 {width} {height}"
    class="mx-auto block w-full"
    style:max-width="{Math.round(width * 1.4)}px"
    role="img"
    aria-label="{title}: {labels
      .map((l, i) => `${l} ${formatNumber(values[i])}`)
      .join(', ')}. Mỗi biểu tượng ứng với {icon} {unit}."
  >
    {#each rows as r, i (i)}
      {@const y = 4 + i * ROW_H}
      <text x="4" y={y + SIZE / 2 + 5} font-size="14" font-weight="600" fill="#334155"
        >{labels[i]}</text
      >
      <line
        x1={LABEL_W - 6}
        y1={y - 2}
        x2={LABEL_W - 6}
        y2={y + SIZE + 4}
        stroke="#cbd5e1"
        stroke-width="1"
      />
      {#each Array.from({ length: r.whole }) as _, k (k)}
        {@render icon1(LABEL_W + k * (SIZE + GAP), y)}
      {/each}
      {#if r.part > 0}
        {@const x0 = LABEL_W + r.whole * (SIZE + GAP)}
        <clipPath id="{uid}-clip-{i}">
          <rect x={x0} {y} width={SIZE * r.part} height={SIZE} />
        </clipPath>
        <circle
          cx={x0 + SIZE / 2}
          cy={y + SIZE / 2}
          r={SIZE / 2 - 1}
          fill="none"
          stroke="#86efac"
          stroke-dasharray="3 3"
        />
        <g clip-path="url(#{uid}-clip-{i})">{@render icon1(x0, y)}</g>
      {/if}
    {/each}
  </svg>
  <figcaption class="mt-2 text-center text-sm text-slate-600">
    {#if item === 'circle'}
      <span aria-hidden="true" class="inline-block h-3 w-3 rounded-full bg-green-600 align-middle"
      ></span>
    {:else if item === 'dot'}
      <span aria-hidden="true" class="inline-block h-2 w-2 rounded-full bg-slate-700 align-middle"
      ></span>
    {:else}
      <span class="inline-block align-middle"><Picture name={item} size={18} decorative /></span>
    {/if}
    = {icon}
    {unit}
  </figcaption>
</figure>
