<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { BINS, EXPERIMENTS, cardsFor, draw, occurrences } from './engine.js';

  let expId = $state(EXPERIMENTS[0].id);
  /** @type {number[]} */
  let counts = $state([]);
  /** @type {number | null} */
  let last = $state(null);
  let announce = $state('');

  const exp = $derived(EXPERIMENTS.find((e) => e.id === expId) ?? EXPERIMENTS[0]);
  const deck = $derived(shuffled(cardsFor(exp), 29));
  const trials = $derived(counts.reduce((s, c) => s + c, 0));
  const lastOutcome = $derived(last === null ? null : exp.outcomes[last]);

  /** @param {string | number} id */
  function choose(id) {
    expId = String(id);
    counts = [];
    last = null;
    announce = `Đã chọn thí nghiệm: ${exp.label}.`;
  }

  /** @param {number} times */
  function run(times) {
    const next = exp.outcomes.map((_, i) => counts[i] ?? 0);
    let i = 0;
    for (let k = 0; k < times; k++) {
      i = draw(exp, Math.random());
      next[i]++;
    }
    counts = next;
    last = i;
    const o = exp.outcomes[i];
    announce =
      times === 1
        ? `Kết quả: ${exp.unit} ${o.label}.`
        : `Đã làm thêm ${times} lần, tổng ${trials} lần. Lần cuối: ${exp.unit} ${o.label}.`;
  }

  function clear() {
    counts = [];
    last = null;
    announce = 'Đã xoá các lần thử.';
  }

  /** @param {string} label */
  const ballColor = (label) => (label === 'xanh' ? '#2563eb' : '#dc2626');
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Thí nghiệm"
    options={EXPERIMENTS.map((e) => ({ value: e.id, label: e.label }))}
    value={expId}
    onchange={choose}
  />

  <div class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
    <p class="text-sm text-slate-800">{exp.setup}</p>
    <p class="text-sm text-slate-700">
      <span class="font-semibold">Các kết quả có thể:</span>
      {exp.id === 'bong'
        ? 'xanh, xanh, xanh, đỏ, đỏ (năm quả bóng)'
        : exp.outcomes.map((o) => o.label).join('; ')}
    </p>

    <div class="flex flex-wrap items-center gap-3">
      <div
        class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-2 border-slate-300 bg-white text-2xl font-bold text-slate-900 tabular-nums"
        aria-hidden="true"
      >
        {#if lastOutcome === null}
          ?
        {:else if exp.id === 'bong'}
          <span
            class="block h-10 w-10 rounded-full"
            style:background-color={ballColor(lastOutcome.label)}
          ></span>
        {:else}
          {lastOutcome.label}
        {/if}
      </div>
      <div class="flex flex-wrap gap-2">
        <button type="button" class={button.primary} onclick={() => run(1)}>Làm 1 lần</button>
        <button type="button" class={button.secondary} onclick={() => run(10)}>Làm 10 lần</button>
        <button type="button" class={button.quiet} onclick={clear} disabled={trials === 0}
          >Xoá</button
        >
      </div>
    </div>

    <table class="w-full border-collapse text-sm text-slate-800">
      <caption class="mb-1 text-left text-sm font-semibold text-slate-700">
        Biến cố đã xảy ra bao nhiêu lần trong {trials} lần thử?
      </caption>
      <thead class="bg-white text-slate-600">
        <tr>
          <th scope="col" class="border border-slate-200 px-2 py-1 text-left">Biến cố</th>
          <th scope="col" class="border border-slate-200 px-2 py-1 text-right">Số lần xảy ra</th>
        </tr>
      </thead>
      <tbody class="tabular-nums">
        {#each exp.events as e (e.id)}
          {@const hit = occurrences(e, exp, counts)}
          {@const happened = lastOutcome !== null && e.test(lastOutcome)}
          <tr class={happened ? 'bg-emerald-50' : ''}>
            <th scope="row" class="border border-slate-200 px-2 py-1 text-left font-normal">
              {e.text}
            </th>
            <td class="border border-slate-200 px-2 py-1 text-right whitespace-nowrap">
              {hit}/{trials}
              {#if lastOutcome !== null}
                <span class="ml-1 text-xs {happened ? 'text-emerald-700' : 'text-slate-500'}"
                  >{happened ? '(lần cuối: xảy ra)' : '(lần cuối: không)'}</span
                >
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <p class="text-xs text-slate-600">
      Lưu ý: một biến cố chưa xảy ra trong các lần thử chưa chắc là biến cố không thể. Hãy đối chiếu
      với tất cả các kết quả có thể ở trên.
    </p>
  </div>

  {#key exp.id}
    <CardSorter
      cards={deck}
      bins={BINS}
      hintOnWrong
      label="Xếp các biến cố lên thang: không thể, ngẫu nhiên, chắc chắn"
    />
  {/key}
  <p class="sr-only" aria-live="polite">{announce}</p>
</div>
