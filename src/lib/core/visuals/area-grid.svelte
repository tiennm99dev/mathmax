<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { clamp } from './svg-math.js';

  /**
   * A square grid with a shaded rectangle of `cols` × `rows` unit squares,
   * anchored at the top-left. Drag the corner handle, or use the arrow keys
   * on it (left/right change `cols`, up/down change `rows`), to show area as
   * counting squares and multiplication as rows times columns.
   *
   * - `maxCols`, `maxRows`: size of the grid.
   * - `cols`, `rows` (bindable): the shaded rectangle.
   * - `unit`: what one square is called, for the caption and screen readers.
   * - `showCaption`: print 'cols × rows = area unit' under the grid.
   *
   * @type {{
   *   maxCols?: number;
   *   maxRows?: number;
   *   cols?: number;
   *   rows?: number;
   *   interactive?: boolean;
   *   unit?: string;
   *   showCaption?: boolean;
   *   color?: string;
   *   label?: string;
   *   onchange?: (size: { cols: number, rows: number }) => void;
   * }}
   */
  let {
    maxCols = 10,
    maxRows = 8,
    cols = $bindable(3),
    rows = $bindable(2),
    interactive = true,
    unit = 'ô vuông',
    showCaption = true,
    color = '#4F46E5',
    label = 'Lưới ô vuông',
    onchange,
  } = $props();

  const CELL = 36;
  const PAD = 28;
  const width = $derived(PAD * 2 + maxCols * CELL);
  const height = $derived(PAD * 2 + maxRows * CELL);
  const corner = $derived({ x: PAD + cols * CELL, y: PAD + rows * CELL });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  /** @param {number} c @param {number} r */
  function setSize(c, r) {
    const nc = clamp(Math.round(c), 1, maxCols);
    const nr = clamp(Math.round(r), 1, maxRows);
    if (nc === cols && nr === rows) return;
    cols = nc;
    rows = nr;
    onchange?.({ cols: nc, rows: nr });
  }

  const drag = $derived({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: width, h: height },
    pad: 0,
    onChange: () => setSize((scratch.x - PAD) / CELL, (scratch.y - PAD) / CELL),
    /** @param {number} dx @param {number} dy */
    onKeyMove: (dx, dy) => setSize(cols + dx, rows + dy),
  });
</script>

<figure class="space-y-2">
  <svg
    bind:this={svgEl}
    viewBox="0 0 {width} {height}"
    class="mx-auto block w-full max-w-lg select-none"
    style:aspect-ratio="{width} / {height}"
    style:touch-action={interactive ? 'none' : null}
    role="group"
    aria-label={label}
  >
    <rect
      x={PAD}
      y={PAD}
      width={cols * CELL}
      height={rows * CELL}
      fill={color}
      fill-opacity="0.35"
    />
    {#each { length: maxCols + 1 } as _, c (c)}
      <line
        x1={PAD + c * CELL}
        y1={PAD}
        x2={PAD + c * CELL}
        y2={PAD + maxRows * CELL}
        stroke="#cbd5e1"
        stroke-width="1"
      />
    {/each}
    {#each { length: maxRows + 1 } as _, r (r)}
      <line
        x1={PAD}
        y1={PAD + r * CELL}
        x2={PAD + maxCols * CELL}
        y2={PAD + r * CELL}
        stroke="#cbd5e1"
        stroke-width="1"
      />
    {/each}
    <rect
      x={PAD}
      y={PAD}
      width={cols * CELL}
      height={rows * CELL}
      fill="none"
      stroke={color}
      stroke-width="3"
    />
    <text
      x={PAD + (cols * CELL) / 2}
      y={PAD - 9}
      text-anchor="middle"
      font-size="16"
      font-weight="700"
      fill={color}>{cols}</text
    >
    <text
      x={PAD - 9}
      y={PAD + (rows * CELL) / 2 + 6}
      text-anchor="end"
      font-size="16"
      font-weight="700"
      fill={color}>{rows}</text
    >

    {#if interactive}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Góc hình chữ nhật: phím trái phải đổi số cột, lên xuống đổi số hàng"
        aria-valuemin={1}
        aria-valuemax={maxCols * maxRows}
        aria-valuenow={cols * rows}
        aria-valuetext="{cols} cột, {rows} hàng, {cols * rows} {unit}"
        style="cursor:nwse-resize; outline:none"
        use:draggable={drag}
      >
        <circle class="drag-hit" cx={corner.x} cy={corner.y} r="20" fill="transparent" />
        <circle
          class="drag-knob"
          cx={corner.x}
          cy={corner.y}
          r="11"
          fill={color}
          stroke="#fff"
          stroke-width="2"
        />
      </g>
    {/if}
  </svg>
  {#if showCaption}
    <figcaption
      class="text-center text-lg font-semibold tabular-nums text-slate-800"
      aria-live="polite"
    >
      {cols} × {rows} = {cols * rows}
      {unit}
    </figcaption>
  {/if}
</figure>
