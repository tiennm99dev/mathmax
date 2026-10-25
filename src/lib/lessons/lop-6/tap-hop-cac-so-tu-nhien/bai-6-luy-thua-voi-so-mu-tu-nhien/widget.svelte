<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import { colorAt } from '#lib/core/visuals/svg-math.js';
  import { fmt, powText } from '../_shared/format.js';
  import { blockCopies, power, powerLine, productModel, quotientModel } from './engine.js';

  const MODES = [
    { value: 'may', label: 'Máy nhân' },
    { value: 'nhan', label: 'Nhân hai lũy thừa' },
    { value: 'chia', label: 'Chia hai lũy thừa' },
  ];
  const BASES = [
    { value: 2, label: 'a = 2' },
    { value: 3, label: 'a = 3' },
    { value: 10, label: 'a = 10' },
  ];
  /** Largest exponent the machine draws, so at most about a thousand blocks. */
  const MACHINE_MAX = /** @type {Record<number, number>} */ ({ 2: 7, 3: 5, 10: 3 });

  let mode = $state('may');
  let a = $state(2);
  let n = $state(3);
  let m1 = $state(3);
  let n1 = $state(2);
  let m2 = $state(5);
  let n2 = $state(2);

  const maxN = $derived(MACHINE_MAX[a]);
  const copies = $derived(blockCopies(a, n));
  const product = $derived(productModel(a, m1, n1));
  const quotient = $derived(quotientModel(a, m2, Math.min(n2, m2)));

  const announcement = $derived.by(() => {
    if (mode === 'may') {
      return n === 0
        ? `${powerLine(a, 0)}. Bấm nhân để bắt đầu.`
        : `${powerLine(a, n)}: ${a} phần, mỗi phần ${fmt(power(a, n - 1))} khối.`;
    }
    if (mode === 'nhan') {
      return `${product.equation}: có ${m1} + ${n1} = ${product.exponent} thừa số ${a}. Kiểm tra: ${product.check}.`;
    }
    const k = Math.min(n2, m2);
    return `${quotient.equation}: bỏ đi ${k} thừa số ${a}, còn ${m2} − ${k} = ${quotient.exponent} thừa số. Kiểm tra: ${quotient.check}.`;
  });

  /** @param {string | number} b */
  function setBase(b) {
    a = Number(b);
    n = Math.min(n, MACHINE_MAX[a]);
  }
</script>

<div class="space-y-4">
  <SegmentedControl label="Chế độ" options={MODES} bind:value={mode} />
  <SegmentedControl label="Cơ số" options={BASES} bind:value={a} onchange={setBase} />

  {#if mode === 'may'}
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class={button.primary}
        disabled={n >= maxN}
        onclick={() => (n = Math.min(n + 1, maxN))}
      >
        Nhân thêm với {a}
      </button>
      <button
        type="button"
        class={button.secondary}
        disabled={n === 0}
        onclick={() => (n = Math.max(n - 1, 0))}
      >
        Bớt một lần nhân
      </button>
      <button type="button" class={button.quiet} onclick={() => (n = 0)}>Về {powText(a, 0)}</button>
    </div>

    <div
      class="flex min-h-24 flex-wrap content-start gap-0.5 rounded-xl border border-slate-200 bg-slate-50 p-3"
      role="img"
      aria-label="{fmt(power(a, n))} khối vuông{n > 0
        ? `, chia thành ${a} phần bằng nhau, mỗi phần ${fmt(power(a, n - 1))} khối`
        : ''}"
    >
      {#each copies as c, i (i)}
        <span
          class="shrink-0 rounded-[2px] {copies.length > 300 ? 'h-1.5 w-1.5' : 'h-3 w-3'}"
          style="background-color: {colorAt(c)}"
        ></span>
      {/each}
    </div>

    <ol class="flex flex-wrap gap-2 text-sm tabular-nums" aria-label="Các lũy thừa đã qua">
      {#each Array.from({ length: n + 1 }, (_, k) => k) as k (k)}
        <li
          class="rounded-lg border px-2 py-1 {k === n
            ? 'border-indigo-400 bg-indigo-50 font-semibold text-indigo-800'
            : 'border-slate-200 bg-white text-slate-600'}"
        >
          {powText(a, k)} = {fmt(power(a, k))}
        </li>
      {/each}
    </ol>

    <div class="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
      <p class="text-2xl font-bold tabular-nums text-slate-900">{powerLine(a, n)}</p>
      <p class="mt-1 text-sm text-slate-700">
        Cơ số {a}, số mũ {n}. Mỗi lần bấm nhân, đống khối được nhân lên {a} lần: số mũ tăng thêm 1.
      </p>
    </div>
  {:else if mode === 'nhan'}
    <div class="grid gap-4 sm:grid-cols-2">
      <SliderField label="Số mũ m" bind:value={m1} min={0} max={5} />
      <SliderField label="Số mũ n" bind:value={n1} min={0} max={5} />
    </div>
    <div
      class="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-3"
      aria-hidden="true"
    >
      {#each product.factors as f, i (i)}
        <span
          class="inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-1 font-bold tabular-nums text-white {f ===
          'm'
            ? 'bg-indigo-600'
            : 'bg-orange-500'}">{a}</span
        >
      {:else}
        <span class="text-slate-500">Không có thừa số nào: tích bằng 1.</span>
      {/each}
    </div>
    <p class="text-sm text-slate-700">
      <span class="font-semibold text-indigo-700">{m1} thừa số của {powText(a, m1)}</span> và
      <span class="font-semibold text-orange-600">{n1} thừa số của {powText(a, n1)}</span> ghép lại
      thành
      {product.exponent} thừa số {a}.
    </p>
    <div class="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
      <p class="text-2xl font-bold tabular-nums text-slate-900">{product.equation}</p>
      <p class="mt-1 tabular-nums text-slate-700">Kiểm tra: {product.check}</p>
    </div>
  {:else}
    <div class="grid gap-4 sm:grid-cols-2">
      <SliderField
        label="Số mũ của số bị chia m"
        bind:value={m2}
        min={1}
        max={8}
        oninput={(v) => (n2 = Math.min(n2, v))}
      />
      <SliderField label="Số mũ của số chia n" bind:value={n2} min={0} max={m2} />
    </div>
    <div
      class="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-3"
      aria-hidden="true"
    >
      {#each quotient.factors as f, i (i)}
        <span
          class="inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-1 font-bold tabular-nums {f ===
          'kept'
            ? 'bg-emerald-600 text-white'
            : 'border-2 border-dashed border-slate-300 bg-white text-slate-400 line-through'}"
          >{a}</span
        >
      {/each}
    </div>
    <p class="text-sm text-slate-700">
      Chia cho {powText(a, Math.min(n2, m2))} là bỏ đi {Math.min(n2, m2)} thừa số {a} (gạch chéo), còn
      lại
      {quotient.exponent} thừa số.{quotient.exponent === 0
        ? ` Không còn thừa số nào: ${powText(a, 0)} = 1.`
        : ''}
    </p>
    <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <p class="text-2xl font-bold tabular-nums text-slate-900">{quotient.equation}</p>
      <p class="mt-1 tabular-nums text-slate-700">Kiểm tra: {quotient.check}</p>
    </div>
  {/if}

  <p class="sr-only" aria-live="polite">{announcement}</p>
</div>
