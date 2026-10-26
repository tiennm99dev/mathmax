<script>
  import FractionBars from '#lib/core/visuals/fraction-bars.svelte';
  import { button } from '#lib/core/ui.js';
  import Stepper from '#lib/core/stepper.svelte';
  import Frac from '#lib/core/frac.svelte';
  import { fracText } from '#lib/core/fractions.js';
  import { equivalents, relate, simplest } from './engine.js';

  const MAX_DEN = 24;

  let a = $state(2);
  let b = $state(3);
  let mine = $state([{ numerator: 1, denominator: 6, color: '#F46036' }]);
  let flip = $state(false);
  /** @type {string[]} */
  let found = $state([]);

  const target = $derived([{ numerator: a, denominator: b, color: '#4F46E5' }]);
  const c = $derived(mine[0].numerator);
  const d = $derived(mine[0].denominator);
  const rel = $derived(relate(a, b, c, d));
  const all = $derived(equivalents(a, b, MAX_DEN));
  const low = $derived(simplest(a, b));

  const feedback = $derived.by(() => {
    if (!rel.equal) {
      const side = rel.order > 0 ? 'dài hơn' : 'ngắn hơn';
      const tip =
        d % low.d === 0
          ? `Gợi ý: ${d} = ${low.d} · ${d / low.d}, hãy nhân cả tử và mẫu của ${fracText(low.n, low.d)} với ${d / low.d}.`
          : `Mẫu ${d} không phải bội của ${low.d}, nên không có phân số nào mẫu ${d} bằng ${fracText(a, b)}. Hãy đổi mẫu.`;
      return `Băng dưới ${side} băng trên: ${fracText(c, d)} ≠ ${fracText(a, b)} vì ${a}·${d} = ${rel.ad} còn ${b}·${c} = ${rel.bc}. ${tip}`;
    }
    const check = `${a}·${d} = ${rel.ad} = ${b}·${c}`;
    if (rel.how === 'same')
      return `Hai băng như nhau. Thử đổi mẫu của băng dưới để tìm phân số khác bằng ${fracText(a, b)}.`;
    if (rel.how === 'expand')
      return `Hai băng tô dài bằng nhau! Nhân cả tử và mẫu của ${fracText(a, b)} với ${rel.k} được ${fracText(c, d)}. Kiểm tra: ${check}.`;
    if (rel.how === 'reduce')
      return `Hai băng tô dài bằng nhau! Chia cả tử và mẫu của ${fracText(a, b)} cho ${rel.k} được ${fracText(c, d)}. Kiểm tra: ${check}.`;
    return `Hai băng tô dài bằng nhau! Cả hai cùng bằng phân số tối giản ${fracText(low.n, low.d)}. Kiểm tra: ${check}.`;
  });

  $effect(() => {
    if (!rel.equal) return;
    const key = `${c}/${d}`;
    if (!found.includes(key)) found = [...found, key];
  });

  /** @param {number} next */
  function setMineDen(next) {
    mine = [{ ...mine[0], denominator: next, numerator: Math.min(mine[0].numerator, next) }];
  }

  function resetFound() {
    found = [];
  }

  /** @param {number} nextB */
  function setB(nextB) {
    if (a > nextB) a = nextB;
    resetFound();
  }
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-x-6 gap-y-2">
    <Stepper label="Tử băng trên" bind:value={a} min={1} max={b} onchange={resetFound} />
    <Stepper label="Mẫu băng trên" bind:value={b} min={2} max={12} onchange={setB} />
  </div>

  <div class="space-y-1">
    <FractionBars bars={target} interactive={false} label="Băng trên: phân số {a}/{b}" />
    <FractionBars bind:bars={mine} label="Băng dưới: kéo mép phần tô hoặc chạm vào ô để đổi tử" />
  </div>

  <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
    <Stepper label="Mẫu băng dưới" value={d} min={1} max={MAX_DEN} onchange={setMineDen} />
    <label class="flex min-h-11 items-center gap-2 text-sm text-slate-700">
      <input type="checkbox" class="h-5 w-5" bind:checked={flip} />
      Đổi dấu cả tử và mẫu của băng dưới
    </label>
  </div>

  <div class="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
    <Frac n={a} d={b} />
    <span class="text-2xl font-bold text-slate-500" aria-hidden="true">{rel.equal ? '=' : '≠'}</span
    >
    <span class="sr-only">{rel.equal ? 'bằng' : 'không bằng'}</span>
    {#if flip}
      <Frac n={-c} d={-d} signed />
    {:else}
      <Frac n={c} {d} />
    {/if}
    <span class="text-sm text-slate-600">
      {a} · {flip ? `(−${d})` : d}
      {rel.equal ? '=' : '≠'}
      {b} · {flip ? `(−${c})` : c}
    </span>
  </div>

  <p class="font-semibold text-slate-800" aria-live="polite">{feedback}</p>
  {#if flip}
    <p class="text-sm text-slate-700">
      Nhân cả tử và mẫu với −1 không đổi phân số: {fracText(c, d)} = (−{c})/(−{d}). Ta thường viết
      phân số với mẫu dương.
    </p>
  {/if}

  <div class="rounded-xl border border-slate-200 bg-white p-4">
    <p class="text-sm text-slate-700">
      Em đã tìm được {found.length}/{all.length} phân số bằng {fracText(a, b)} có mẫu dương không quá
      {MAX_DEN}:
    </p>
    <ul class="mt-2 flex flex-wrap gap-2" aria-label="Các phân số bằng nhau đã tìm được">
      {#each all as f (f.d)}
        {@const got = found.includes(`${f.n}/${f.d}`)}
        <li
          class="rounded-lg border px-2 py-1 text-sm tabular-nums {got
            ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
            : 'border-dashed border-slate-300 text-slate-400'}"
        >
          {got ? `${f.n}/${f.d}` : `?/${f.d}`}
        </li>
      {/each}
    </ul>
    <p class="mt-2 text-sm text-slate-600">
      Phân số tối giản: {fracText(low.n, low.d)}{low.g > 1
        ? ` (chia cả tử và mẫu của ${fracText(a, b)} cho ƯCLN = ${low.g})`
        : ''}.
    </p>
    <button type="button" class="{button.quiet} mt-2" onclick={resetFound}>Xoá danh sách</button>
  </div>
</div>
