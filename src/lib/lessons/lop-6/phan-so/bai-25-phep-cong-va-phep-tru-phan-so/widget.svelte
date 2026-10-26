<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import Stepper from '#lib/core/stepper.svelte';
  import Frac from '#lib/core/frac.svelte';
  import { fracText } from '#lib/core/fractions.js';
  import { lcm } from '#lib/numtheory-engine/index.js';
  import { combine, resultCells, workLines } from './engine.js';

  const W = 150;
  const H = 96;
  const GAP = 24;
  const BLUE = '#4F46E5';
  const ORANGE = '#F46036';

  let a = $state(1);
  let b = $state(2);
  let c = $state(1);
  let d = $state(3);
  let op = $state(/** @type {'+' | '-'} */ ('+'));
  let stage = $state(0);

  const tooBig = $derived(op === '-' && a * d < c * b);
  const cells = $derived(tooBig ? [] : resultCells(a, b, c, d, op));
  const rects = $derived(Math.max(1, ...cells.map((x) => x.rect + 1)));
  const result = $derived(combine(a, b, c, d, op));
  const lines = $derived(tooBig ? [] : workLines(a, b, c, d, op));
  const sign = $derived(op === '+' ? '+' : '−');
  const viewH = $derived(stage === 2 ? H * 2 + GAP + 34 : H + 22);

  const message = $derived.by(() => {
    if (tooBig)
      return `${fracText(a, b)} nhỏ hơn ${fracText(c, d)}, nên hiệu là số âm và không bớt được trên hình. Hãy tăng ${fracText(a, b)} hoặc giảm ${fracText(c, d)}.`;
    if (stage === 0)
      return `${fracText(a, b)} là ${a} cột trên ${b} cột, ${fracText(c, d)} là ${c} hàng trên ${d} hàng. Các phần chưa cùng cỡ nên chưa ${op === '+' ? 'cộng' : 'trừ'} được.`;
    if (stage === 1)
      return `Kẻ thêm để mỗi hình có ${b} · ${d} = ${b * d} ô bằng nhau: ${fracText(a, b)} = ${fracText(a * d, b * d)} và ${fracText(c, d)} = ${fracText(c * b, b * d)}.`;
    const top = op === '+' ? a * d + c * b : a * d - c * b;
    return op === '+'
      ? `Gộp lại: ${a * d} + ${c * b} = ${top} ô, tức ${fracText(top, b * d)}${result.d !== b * d ? ` = ${fracText(result.n, result.d)}` : ''}.`
      : `Bớt ${c * b} ô từ ${a * d} ô, còn ${top} ô, tức ${fracText(top, b * d)}${result.d !== b * d ? ` = ${fracText(result.n, result.d)}` : ''}.`;
  });

  function changed() {
    stage = 0;
  }
  /** @param {number} v */
  function setB(v) {
    if (a > v) a = v;
    changed();
  }
  /** @param {number} v */
  function setD(v) {
    if (c > v) c = v;
    changed();
  }

  /**
   * Cell rectangle in a figure of `cols` × `rows` cells at offset (x0, y0).
   * @param {number} x0 @param {number} y0 @param {number} cols @param {number} rows
   * @param {number} col @param {number} row
   */
  const cell = (x0, y0, cols, rows, col, row) => ({
    x: x0 + (col * W) / cols,
    y: y0 + (row * H) / rows,
    w: W / cols,
    h: H / rows,
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Phép tính"
    options={[
      { value: '+', label: 'Cộng' },
      { value: '-', label: 'Trừ' },
    ]}
    bind:value={op}
    onchange={changed}
  />

  <div class="grid gap-3 sm:grid-cols-2">
    <div
      class="space-y-2 rounded-xl border border-indigo-200 p-3"
      role="group"
      aria-label="Phân số thứ nhất (tô theo cột)"
    >
      <p class="text-sm font-semibold text-indigo-700">Phân số thứ nhất (tô theo cột)</p>
      <Stepper label="Tử" bind:value={a} min={0} max={b} onchange={changed} />
      <Stepper label="Mẫu" bind:value={b} min={2} max={6} onchange={setB} />
    </div>
    <div
      class="space-y-2 rounded-xl border border-orange-200 p-3"
      role="group"
      aria-label="Phân số thứ hai (tô theo hàng)"
    >
      <p class="text-sm font-semibold text-orange-700">Phân số thứ hai (tô theo hàng)</p>
      <Stepper label="Tử" bind:value={c} min={0} max={d} onchange={changed} />
      <Stepper label="Mẫu" bind:value={d} min={2} max={6} onchange={setD} />
    </div>
  </div>

  <div class="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
    <Frac n={a} d={b} size="lg" />
    <span class="text-2xl font-bold text-slate-500" aria-hidden="true">{sign}</span>
    <span class="sr-only">{op === '+' ? 'cộng' : 'trừ'}</span>
    <Frac n={c} {d} size="lg" />
    {#if stage === 2 && !tooBig}
      <span class="text-2xl font-bold text-slate-500" aria-hidden="true">=</span>
      <span class="sr-only">bằng</span>
      <Frac n={result.n} d={result.d} size="lg" />
    {/if}
  </div>

  <svg
    viewBox="0 0 {W * 2 + GAP + 8} {viewH}"
    class="mx-auto block w-full max-w-lg"
    role="img"
    aria-label="Hình chữ nhật biểu diễn {fracText(a, b)} và {fracText(c, d)}{stage >= 1
      ? `, chia lưới ${b} cột × ${d} hàng`
      : ''}{stage === 2 && !tooBig ? `; kết quả ${fracText(result.n, result.d)}` : ''}"
  >
    {#each [0, 1] as which (which)}
      {@const x0 = 4 + which * (W + GAP)}
      {@const cols = which === 0 ? b : stage >= 1 ? b : 1}
      {@const rows = which === 0 ? (stage >= 1 ? d : 1) : d}
      {#each { length: cols } as _, col (col)}
        {#each { length: rows } as _r, row (row)}
          {@const r = cell(x0, 4, cols, rows, col, row)}
          {@const on = which === 0 ? col < a : row < c}
          <rect
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            fill={on ? (which === 0 ? BLUE : ORANGE) : '#fff'}
            fill-opacity={on ? 0.75 : 1}
            stroke="#334155"
            stroke-width="1"
          />
        {/each}
      {/each}
      <rect x={x0} y="4" width={W} height={H} fill="none" stroke="#0f172a" stroke-width="2" />
      <text x={x0 + W / 2} y={H + 20} text-anchor="middle" font-size="14" fill="#334155"
        >{which === 0
          ? fracText(stage >= 1 ? a * d : a, stage >= 1 ? b * d : b)
          : fracText(stage >= 1 ? c * b : c, stage >= 1 ? b * d : d)}</text
      >
    {/each}

    {#if stage === 2 && !tooBig}
      {#each { length: rects } as _, rect (rect)}
        {@const x0 = 4 + rect * (W + GAP)}
        {@const y0 = H + GAP + 10}
        {#each { length: b } as _c, col (col)}
          {#each { length: d } as _r, row (row)}
            {@const r = cell(x0, y0, b, d, col, row)}
            {@const hit = cells.find((x) => x.rect === rect && x.col === col && x.row === row)}
            <rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              fill={hit
                ? hit.kind === 'a'
                  ? BLUE
                  : hit.kind === 'b'
                    ? ORANGE
                    : '#fecaca'
                : '#fff'}
              fill-opacity={hit ? 0.75 : 1}
              stroke="#334155"
              stroke-width="1"
            />
            {#if hit?.kind === 'removed'}
              <line
                x1={r.x + 3}
                y1={r.y + 3}
                x2={r.x + r.w - 3}
                y2={r.y + r.h - 3}
                stroke="#b91c1c"
                stroke-width="2"
              />
            {/if}
          {/each}
        {/each}
        <rect x={x0} y={y0} width={W} height={H} fill="none" stroke="#0f172a" stroke-width="2" />
      {/each}
    {/if}
  </svg>

  <p class="font-semibold text-slate-800" aria-live="polite">{message}</p>

  {#if stage === 2 && lines.length}
    <ol class="list-decimal space-y-1 pl-6 text-slate-700">
      {#each lines as line, i (i)}<li>{line}</li>{/each}
    </ol>
    {#if b !== d && lcm(b, d) < b * d}
      <p class="text-sm text-slate-600">
        Lưới {b} × {d} dùng mẫu chung {b * d}; quy đồng với BCNN({b}, {d}) = {lcm(b, d)} cho mẫu nhỏ hơn,
        nhưng kết quả sau khi rút gọn vẫn như nhau.
      </p>
    {/if}
  {/if}

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.primary}
      onclick={() => stage++}
      disabled={stage >= 2 || tooBig}
    >
      {stage === 0 ? 'Chia lưới cùng cỡ' : op === '+' ? 'Gộp phần tô' : 'Bớt phần tô'}
    </button>
    <button type="button" class={button.quiet} onclick={() => (stage = 0)} disabled={stage === 0}
      >Làm lại</button
    >
  </div>
</div>
