<svelte:options namespace="svg" />

<script>
  /**
   * A school ruler with centimetre marks, drawn inside a parent SVG: a long
   * mark and its number at every centimetre, a short mark at every half,
   * and "cm" at the right end. Static: the parent places it.
   *
   * - `x`: where the 0 mark is, in SVG units.
   * - `y`: the ruler's top edge, where the marks start.
   * - `cm`: the last number on the ruler.
   * - `unit`: SVG units per centimetre.
   * @type {{ x: number; y: number; cm: number; unit: number }}
   */
  let { x, y, cm, unit } = $props();

  const PAD = 14;
  const H = 40;
</script>

<rect
  x={x - PAD}
  {y}
  width={cm * unit + PAD * 2 + 22}
  height={H}
  rx="4"
  fill="#fde68a"
  stroke="#b45309"
  stroke-width="1.5"
/>
{#each { length: cm * 2 + 1 } as _, k (k)}
  <line
    x1={x + (k * unit) / 2}
    y1={y}
    x2={x + (k * unit) / 2}
    y2={y + (k % 2 === 0 ? 14 : 8)}
    stroke="#451a03"
    stroke-width={k === 0 ? 2.5 : 1.5}
  />
{/each}
{#each { length: cm + 1 } as _, n (n)}
  <text
    x={x + n * unit}
    y={y + 31}
    text-anchor="middle"
    font-size="16"
    font-weight={n === 0 ? 700 : 500}
    fill={n === 0 ? '#b91c1c' : '#451a03'}>{n}</text
  >
{/each}
<text x={x + cm * unit + 22} y={y + 31} text-anchor="middle" font-size="12" fill="#451a03">cm</text>
