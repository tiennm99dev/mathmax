<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { EXPRESSIONS, isExact, num, startValues } from './engine.js';

  let id = $state(EXPRESSIONS[0].id);
  /** @type {Record<string, Record<string, number>>} */
  const values = $state(Object.fromEntries(EXPRESSIONS.map((e) => [e.id, startValues(e)])));

  const expr = $derived(EXPRESSIONS.find((e) => e.id === id) ?? EXPRESSIONS[0]);
  const v = $derived(values[expr.id]);
  const result = $derived(expr.value(v));
  const exact = $derived(result === null || isExact(result));
  const chain = $derived(
    result === null
      ? ''
      : `\\begin{aligned} &${expr.tex} \\\\ &= ${expr.steps(v).join(' \\\\ &= ')} \\\\ &${exact ? '=' : '\\approx'} ${num(Math.round(result * 100) / 100)} \\end{aligned}`,
  );
  const assignment = $derived(
    expr.vars.map((d) => `${d.name} = ${formatNumber(v[d.name])}`).join(', '),
  );
  const resultText = $derived(
    result === null
      ? 'không xác định'
      : `${exact ? '' : 'khoảng '}${formatNumber(Math.round(result * 100) / 100)}`,
  );

  function reset() {
    values[expr.id] = startValues(expr);
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn biểu thức"
    options={EXPRESSIONS.map((e) => ({ value: e.id, label: e.title }))}
    bind:value={id}
  />

  <div class="rounded-lg border border-slate-200 bg-white p-4 text-center">
    <p class="text-sm text-slate-600">
      Biểu thức đại số với các biến {expr.vars.map((d) => d.name).join(', ')}
    </p>
    <p class="mt-1 text-2xl"><Tex math={expr.tex} /></p>
    <p class="mt-1 text-sm text-slate-600">Ý nghĩa: {expr.meaning}.</p>
  </div>

  <div class="grid gap-4 sm:grid-cols-2">
    {#each expr.vars as d (expr.id + d.name)}
      <SliderField
        label={d.label}
        bind:value={values[expr.id][d.name]}
        min={d.min}
        max={d.max}
        step={d.step}
        format={(x) => formatNumber(x)}
      />
    {/each}
  </div>

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
    <p class="text-sm font-semibold text-slate-700">
      Thay {assignment} vào biểu thức rồi thực hiện các phép tính:
    </p>
    <div class="mt-2 overflow-x-auto">
      {#if result !== null}
        <Tex math={chain} display />
      {/if}
    </div>
    <p class="mt-2 font-semibold text-emerald-700" aria-live="polite">
      Giá trị của biểu thức tại {assignment} là {resultText}.
    </p>
    {#if !exact}
      <p class="mt-1 text-sm text-slate-600">
        Kết quả là số thập phân vô hạn, đã làm tròn đến hàng phần trăm.
      </p>
    {/if}
  </div>

  <button type="button" class={button.quiet} onclick={reset}>Đặt lại giá trị ban đầu</button>
</div>
