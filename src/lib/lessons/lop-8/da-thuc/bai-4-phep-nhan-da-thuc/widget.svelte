<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { button, card as cardClass, focusRing } from '#lib/core/ui.js';
  import { intText, operand } from '#lib/core/number-format.js';
  import { evalPoly, monoOperand, monoText, polyText, products } from '../_shared/poly.js';
  import { PRODUCTS, cells, factors, likeGroups, product } from './engine.js';

  const GROUP_CLASS = [
    'border-sky-500 bg-sky-50 text-sky-900',
    'border-amber-500 bg-amber-50 text-amber-900',
    'border-violet-500 bg-violet-50 text-violet-900',
  ];

  let preset = $state(0);
  /** @type {boolean[]} */
  let shown = $state([]);
  let collected = $state(false);
  let x = $state(2);
  let y = $state(-1);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  let note = $state({ tone: 'info', text: '' });

  const item = $derived(PRODUCTS[preset]);
  const f = $derived(factors(item));
  const list = $derived(cells(f.a, f.b));
  const groups = $derived(likeGroups(list));
  const allShown = $derived(shown.length === list.length && shown.every(Boolean));
  const result = $derived(product(item));
  const hasVarY = $derived([...f.a, ...f.b].some((t) => 'y' in t.vars));
  const values = $derived({ x, y });
  const va = $derived(evalPoly(f.a, values));
  const vb = $derived(evalPoly(f.b, values));
  const vr = $derived(evalPoly(result, values));

  /** @param {import('../_shared/poly.js').Mono[]} p */
  const factorText = (p) => (p.length > 1 ? `(${polyText(p)})` : monoText(p[0]));
  const title = $derived(`${factorText(f.a)} · ${factorText(f.b)}`);

  function reset() {
    shown = list.map(() => false);
    collected = false;
    note = {
      tone: 'info',
      text: `Mỗi ô là tích của hạng tử đầu hàng với hạng tử đầu cột. Chạm từng ô để tính (${list.length} ô).`,
    };
  }
  reset();

  /** @param {number} k */
  function reveal(k) {
    if (shown[k]) return;
    shown[k] = true;
    const c = list[k];
    const left = shown.filter((s) => !s).length;
    note = {
      tone: 'info',
      text: `${monoOperand(c.a)} · ${monoOperand(c.b)} = ${monoText(c.p)}. ${left > 0 ? `Còn ${left} ô.` : 'Đã đủ các ô: bấm "Cộng các ô và thu gọn".'}`,
    };
  }

  function showAll() {
    shown = list.map(() => true);
    note = { tone: 'info', text: 'Đã điền mọi ô. Bấm "Cộng các ô và thu gọn".' };
  }

  function collect() {
    collected = true;
    const like = groups.some((g) => g >= 0);
    note = {
      tone: 'ok',
      text: `${title} = ${polyText(products(f.a, f.b))} = ${polyText(result)}.${like ? ' Các ô cùng màu là hạng tử đồng dạng, đã được cộng lại.' : ''}`,
    };
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Phép nhân"
    options={PRODUCTS.map((_, i) => ({ value: i, label: `Phép ${i + 1}` }))}
    bind:value={preset}
    onchange={(v) => {
      preset = Number(v);
      reset();
    }}
  />

  <p class="text-base font-semibold text-slate-800 tabular-nums">Tính {title}</p>

  <div class="{cardClass} overflow-x-auto p-3">
    <table class="w-full border-separate border-spacing-1 text-center tabular-nums">
      <caption class="sr-only">Mô hình diện tích của tích {title}</caption>
      <thead>
        <tr>
          <th scope="col" class="w-14 text-xs font-semibold text-slate-500">×</th>
          {#each f.b as t, j (j)}
            <th
              scope="col"
              class="rounded-lg bg-slate-100 px-2 py-2 text-sm font-bold text-slate-800 sm:text-base"
              >{monoText(t)}</th
            >
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each f.a as s, i (i)}
          <tr>
            <th
              scope="row"
              class="rounded-lg bg-slate-100 px-2 py-2 text-sm font-bold text-slate-800 sm:text-base"
              >{monoText(s)}</th
            >
            {#each f.b as t, j (j)}
              {@const k = i * f.b.length + j}
              {@const c = list[k]}
              <td>
                <button
                  type="button"
                  class="h-14 w-full min-w-16 rounded-lg border-2 px-1 text-sm font-semibold transition sm:text-base {focusRing} {shown[
                    k
                  ]
                    ? collected && groups[k] >= 0
                      ? GROUP_CLASS[groups[k] % GROUP_CLASS.length]
                      : 'border-emerald-400 bg-white text-slate-800'
                    : 'border-dashed border-slate-300 bg-slate-50 text-slate-400 hover:bg-indigo-50'}"
                  aria-label={shown[k] && c
                    ? `${monoText(s)} nhân ${monoText(t)} bằng ${monoText(c.p)}`
                    : `Tính ${monoText(s)} nhân ${monoText(t)}`}
                  onclick={() => reveal(k)}>{shown[k] && c ? monoText(c.p) : '?'}</button
                >
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex flex-wrap gap-3">
    {#if !allShown}
      <button type="button" class={button.secondary} onclick={showAll}>Điền tất cả các ô</button>
    {/if}
    <button
      type="button"
      class={button.primary}
      disabled={!allShown || collected}
      onclick={collect}
    >
      Cộng các ô và thu gọn
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />

  {#if collected}
    <div class="{cardClass} space-y-3 p-3">
      <p class="text-sm font-semibold text-slate-700">Thử lại bằng giá trị cụ thể</p>
      <div class="flex flex-wrap gap-4">
        <Stepper label="Giá trị x" bind:value={x} min={-5} max={5} format={intText} />
        {#if hasVarY}
          <Stepper label="Giá trị y" bind:value={y} min={-5} max={5} format={intText} />
        {/if}
      </div>
      <p class="text-sm text-slate-700 tabular-nums" aria-live="polite">
        Hai thừa số: {intText(va)} và {intText(vb)}, tích {operand(va)} · {operand(vb)} =
        <span class="font-semibold">{intText(va * vb)}</span>. Kết quả thu gọn có giá trị
        <span class="font-semibold">{intText(vr)}</span>
        {va * vb === vr ? '— bằng nhau.' : '— khác nhau!'}
      </p>
    </div>
  {/if}
</div>
