<script>
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { FAIL, addModel, subModel } from './engine.js';

  const MODES = [
    { value: 'cong', label: 'a + b' },
    { value: 'giao-hoan', label: 'a + b và b + a' },
    { value: 'tru', label: 'a − b' },
  ];

  let mode = $state('cong');
  let a = $state(7);
  let b = $state(5);

  const first = $derived(mode === 'tru' ? subModel(a, b) : addModel(a, b));
  const second = $derived(mode === 'giao-hoan' ? addModel(b, a) : null);

  /**
   * Marks for the start and end of a model.
   * @param {import('./engine.js').HopModel} m
   * @param {number} start
   */
  function marksOf(m, start) {
    const out = [{ value: start, label: String(start), color: '#334155' }];
    if (m.result !== null && m.result !== start) {
      out.push({ value: m.result, label: String(m.result), color: '#1B998B' });
    }
    if (!m.ok) out.push({ value: 0, label: '?', color: FAIL });
    return out;
  }
</script>

<div class="space-y-4">
  <SegmentedControl label="Phép tính" options={MODES} bind:value={mode} />
  <div class="grid gap-4 sm:grid-cols-2">
    <SliderField label="a" bind:value={a} min={0} max={15} />
    <SliderField label="b" bind:value={b} min={0} max={15} />
  </div>

  <div class="space-y-1">
    <p class="font-semibold text-slate-700">
      {mode === 'tru' ? 'a − b' : 'a + b'}: bắt đầu từ điểm {a}
    </p>
    <NumberLine
      min={0}
      max={30}
      labelEvery={5}
      width={360}
      interactive={false}
      marks={marksOf(first, a)}
      hops={first.hops}
      label="Tia số minh hoạ {first.equation}"
    />
  </div>

  {#if second}
    <div class="space-y-1">
      <p class="font-semibold text-slate-700">b + a: bắt đầu từ điểm {b}</p>
      <NumberLine
        min={0}
        max={30}
        labelEvery={5}
        width={360}
        interactive={false}
        marks={marksOf(second, b)}
        hops={second.hops}
        label="Tia số minh hoạ {second.equation}"
      />
    </div>
  {/if}

  <div
    class="rounded-xl border p-4 {first.ok
      ? 'border-emerald-200 bg-emerald-50'
      : 'border-rose-300 bg-rose-50'}"
    aria-live="polite"
  >
    <p class="text-2xl font-bold tabular-nums {first.ok ? 'text-emerald-800' : 'text-rose-800'}">
      {first.equation}
    </p>
    {#if second}
      <p class="text-2xl font-bold tabular-nums text-emerald-800">{second.equation}</p>
      <p class="mt-2 text-slate-800">
        Hai cách nhảy đều tới điểm {a + b}: {a} + {b} = {b} + {a}. Đó là tính chất giao hoán.
      </p>
    {:else}
      <p class="mt-2 text-slate-800">{first.message}</p>
    {/if}
  </div>
</div>
