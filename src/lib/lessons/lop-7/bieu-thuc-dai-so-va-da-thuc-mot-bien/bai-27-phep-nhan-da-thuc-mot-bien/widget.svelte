<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { colorAt } from '#lib/core/visuals/svg-math.js';
  import { polyTex, polyText, termText, termTex, termsTex } from '../_shared/poly.js';
  import { PRODUCTS, cellTex, grid, productTex, sumCells } from './engine.js';

  let id = $state(PRODUCTS[0].id);
  /** @type {string[]} */
  let open = $state([]);
  let message = $state('Chạm vào một ô để tính tích của hai hạng tử ở hàng và cột của ô đó.');
  /** @type {[number, number] | null} */
  let last = $state(null);

  const product = $derived(PRODUCTS.find((x) => x.id === id) ?? PRODUCTS[0]);
  const g = $derived(grid(product.p, product.q));
  const total = $derived(g.rows.length * g.cols.length);
  const done = $derived(open.length === total);
  const result = $derived(sumCells(g.cells));
  const degrees = $derived([...new Set(g.cells.flat().map((t) => t.e))].sort((a, b) => b - a));
  /** Products of equal degree, as TeX sums, for the collecting step. */
  const groups = $derived(
    degrees.map((e) => {
      const terms = g.cells.flat().filter((t) => t.e === e);
      const sum = result[e] ?? 0;
      return {
        e,
        tex: `${termsTex(terms)}${terms.length > 1 ? ` = ${sum === 0 ? '0' : termTex({ c: sum, e })}` : ''}`,
      };
    }),
  );
  // An area picture only makes sense for two binomials with positive terms.
  const area = $derived(
    product.p.length <= 2 &&
      product.q.length <= 2 &&
      [...product.p, ...product.q].every((c) => c > 0),
  );

  const uid = $props.id();

  const X = 110;
  const U = 22;
  /** @param {{ c: number, e: number }} t */
  const len = (t) => (t.e === 1 ? t.c * X : t.c * U);

  /** @param {number} e */
  const tint = (e) => `background-color: ${colorAt(e)}22; border-color: ${colorAt(e)};`;

  /** @param {string | number} next */
  function choose(next) {
    id = String(next);
    open = [];
    last = null;
    message = 'Chạm vào một ô để tính tích của hai hạng tử ở hàng và cột của ô đó.';
  }

  /** @param {number} i @param {number} j */
  function reveal(i, j) {
    const key = `${i}-${j}`;
    if (!open.includes(key)) open = [...open, key];
    last = [i, j];
    const a = g.rows[i];
    const b = g.cols[j];
    message = `${termText(a)} nhân ${termText(b)} bằng ${termText(g.cells[i][j])}: nhân hai hệ số, cộng hai số mũ.`;
    if (open.length === total) message += ` Đã tính mọi ô: tích bằng ${polyText(result)}.`;
  }

  function revealAll() {
    open = g.rows.flatMap((_, i) => g.cols.map((_, j) => `${i}-${j}`));
    last = null;
    message = `Đã tính mọi ô. Cộng các ô cùng màu (cùng bậc), tích bằng ${polyText(result)}.`;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn phép nhân"
    options={PRODUCTS.map((x) => ({ value: x.id, label: x.label }))}
    value={id}
    onchange={choose}
  />

  <p class="text-center text-sm text-slate-600" id="{uid}-cap">
    Bảng nhân: hàng là các hạng tử của thừa số thứ nhất, cột là các hạng tử của thừa số thứ hai
  </p>
  <div class="overflow-x-auto">
    <table class="mx-auto border-collapse text-center text-lg" aria-labelledby="{uid}-cap">
      <thead>
        <tr>
          <th scope="col" class="p-2 text-base"><Tex math="\times" /></th>
          {#each g.cols as c, j (j)}
            <th scope="col" class="border border-slate-300 bg-slate-100 p-2"
              ><Tex math={termTex(c)} /></th
            >
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each g.rows as r, i (i)}
          <tr>
            <th scope="row" class="border border-slate-300 bg-slate-100 p-2"
              ><Tex math={termTex(r)} /></th
            >
            {#each g.cols as c, j (j)}
              {@const cell = g.cells[i][j]}
              {@const shown = open.includes(`${i}-${j}`)}
              <td class="border border-slate-300 p-0">
                <button
                  type="button"
                  class="flex min-h-14 w-full min-w-20 items-center justify-center border-2 border-transparent px-2 py-2 {focusRing}"
                  style={shown ? tint(cell.e) : ''}
                  aria-label={shown
                    ? `${termText(r)} nhân ${termText(c)} bằng ${termText(cell)}`
                    : `Ô ${termText(r)} nhân ${termText(c)}, chưa tính. Bấm để tính.`}
                  onclick={() => reveal(i, j)}
                >
                  {#if shown}
                    <Tex math={termTex(cell)} />
                  {:else}
                    <span class="text-slate-400" aria-hidden="true">?</span>
                  {/if}
                </button>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex flex-wrap justify-center gap-2">
    <button type="button" class={button.quiet} disabled={done} onclick={revealAll}
      >Tính tất cả các ô</button
    >
    <button
      type="button"
      class={button.quiet}
      disabled={open.length === 0}
      onclick={() => choose(id)}>Làm lại</button
    >
  </div>

  <div class="text-center text-sm text-slate-600">
    {#if last}
      <p class="overflow-x-auto text-lg text-slate-800" aria-hidden="true">
        <Tex math={cellTex(g.rows[last[0]], g.cols[last[1]])} />
      </p>
    {/if}
    <p aria-live="polite">{message}</p>
  </div>

  {#if area}
    {@const W = g.cols.reduce((s, t) => s + len(t), 0)}
    {@const H = g.rows.reduce((s, t) => s + len(t), 0)}
    <figure class="mx-auto max-w-sm">
      <svg
        viewBox="-30 -24 {W + 40} {H + 34}"
        class="w-full"
        role="img"
        aria-label="Mô hình diện tích: hình chữ nhật có hai cạnh là hai thừa số, chia thành các hình nhỏ, mỗi hình là một tích hạng tử"
      >
        {#each g.rows as r, i (i)}
          {@const y = g.rows.slice(0, i).reduce((s, t) => s + len(t), 0)}
          <text x="-6" y={y + len(r) / 2 + 4} font-size="12" text-anchor="end" fill="#334155"
            >{termText(r)}</text
          >
          {#each g.cols as c, j (j)}
            {@const x = g.cols.slice(0, j).reduce((s, t) => s + len(t), 0)}
            {@const cell = g.cells[i][j]}
            <rect
              {x}
              {y}
              width={len(c)}
              height={len(r)}
              fill={open.includes(`${i}-${j}`) ? colorAt(cell.e) : '#F1F5F9'}
              fill-opacity={open.includes(`${i}-${j}`) ? 0.35 : 1}
              stroke="#334155"
            />
            {#if open.includes(`${i}-${j}`)}
              <text
                x={x + len(c) / 2}
                y={y + len(r) / 2 + 4}
                font-size="12"
                text-anchor="middle"
                fill="#0F172A">{termText(cell)}</text
              >
            {/if}
          {/each}
        {/each}
        {#each g.cols as c, j (j)}
          {@const x = g.cols.slice(0, j).reduce((s, t) => s + len(t), 0)}
          <text x={x + len(c) / 2} y="-8" font-size="12" text-anchor="middle" fill="#334155"
            >{termText(c)}</text
          >
        {/each}
      </svg>
      <figcaption class="text-center text-sm text-slate-600">
        Diện tích cả hình chữ nhật bằng tổng diện tích các hình nhỏ.
      </figcaption>
    </figure>
  {/if}

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
    {#if done}
      <p class="font-semibold text-slate-700">Cộng các ô cùng màu (cùng bậc):</p>
      <ul class="mt-1 space-y-1">
        {#each groups as grp (grp.e)}
          <li class="overflow-x-auto"><Tex math={grp.tex} /></li>
        {/each}
      </ul>
      <p class="mt-2 overflow-x-auto font-semibold text-emerald-700">
        <Tex math={`${productTex(product.p, product.q)} = ${polyTex(result)}`} />
      </p>
    {:else}
      <p class="text-slate-700">
        Đã tính {open.length} trên {total} ô. Tính đủ các ô rồi cộng các ô cùng màu.
      </p>
    {/if}
  </div>
</div>
