<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { compare, compareSentence } from './engine.js';

  let a = $state(2);
  let b = $state(8);
  const c = $derived(compare(a, b));
</script>

<div class="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
  <p class="text-sm font-semibold text-slate-700">Thử với hai số không âm bất kì</p>
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="a" bind:value={a} min={0} max={50} format={fmt} />
    <SliderField label="b" bind:value={b} min={0} max={50} format={fmt} />
  </div>
  <table class="w-full text-sm tabular-nums">
    <caption class="sr-only"
      >So sánh căn của tích, tích các căn, căn của tổng và tổng các căn</caption
    >
    <tbody>
      <tr class="bg-emerald-50">
        <th scope="row" class="px-2 py-1 text-left font-semibold">√a · √b</th>
        <td class="px-2 py-1">{c.product.sign} {c.product.text}</td>
        <th scope="row" class="px-2 py-1 text-left font-semibold">√(ab) = √{fmt(a * b)}</th>
        <td class="px-2 py-1">{c.ofProduct.sign} {c.ofProduct.text}</td>
      </tr>
      <tr class={c.sumEqual ? 'bg-slate-50' : 'bg-rose-50'}>
        <th scope="row" class="px-2 py-1 text-left font-semibold">√a + √b</th>
        <td class="px-2 py-1">{c.sum.sign} {c.sum.text}</td>
        <th scope="row" class="px-2 py-1 text-left font-semibold">√(a + b) = √{fmt(a + b)}</th>
        <td class="px-2 py-1">{c.ofSum.sign} {c.ofSum.text}</td>
      </tr>
    </tbody>
  </table>
  <FeedbackNote tone={c.sumEqual ? 'info' : 'warn'} text={compareSentence(a, b)} />
</div>
