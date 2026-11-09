<script>
  import { cellsOf } from './figures.js';

  /**
   * A shape made of 1 cm² squares on a faint grid, for "count the squares"
   * area questions.
   *
   * - `rows`: the shape as rows of text, `X` a square and `.` an empty place.
   * - `label`: what a screen reader hears; it must not give the total while
   *   the question is open.
   * @type {{ rows: string[], label: string }}
   */
  let { rows, label } = $props();

  const CELL = 40;
  const PAD = 10;
  const cols = $derived(Math.max(...rows.map((r) => r.length)));
  const w = $derived(cols * CELL + 2 * PAD);
  const h = $derived(rows.length * CELL + 2 * PAD);
  const cells = $derived(cellsOf(rows));
</script>

<svg
  viewBox="0 0 {w} {h}"
  class="mx-auto block w-full max-w-xs"
  style:aspect-ratio="{w} / {h}"
  role="img"
  aria-label={label}
>
  {#each { length: cols + 1 } as _, c (c)}
    <line
      x1={PAD + c * CELL}
      y1={PAD}
      x2={PAD + c * CELL}
      y2={h - PAD}
      stroke="#e2e8f0"
      stroke-width="1"
    />
  {/each}
  {#each { length: rows.length + 1 } as _, r (r)}
    <line
      x1={PAD}
      y1={PAD + r * CELL}
      x2={w - PAD}
      y2={PAD + r * CELL}
      stroke="#e2e8f0"
      stroke-width="1"
    />
  {/each}
  {#each cells as cell (`${cell.row}-${cell.col}`)}
    <rect
      x={PAD + cell.col * CELL}
      y={PAD + cell.row * CELL}
      width={CELL}
      height={CELL}
      fill="#a5b4fc"
      stroke="#3730a3"
      stroke-width="2"
    />
  {/each}
</svg>
