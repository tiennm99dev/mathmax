<script>
  import ProbabilitySpinner from '#lib/core/visuals/probability-spinner.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { pickWeighted } from '#lib/stats-engine/probability.js';
  import { button, textInput } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { format as fracText } from '#lib/fraction-engine/fraction.js';
  import {
    EVENTS,
    MAX_CELLS,
    cells,
    countRatio,
    favourable,
    fracTex,
    hits,
    minCells,
    trueProbability,
    weights,
  } from './engine.js';

  const HIT = '#f59e0b';
  const MISS = '#64748b';

  let n = $state(6);
  /** @type {import('./engine.js').WheelMode} */
  let mode = $state('deu');
  let eventId = $state('chan');
  /** @type {number[]} */
  let counts = $state([]);
  let announce = $state('');
  const selectId = $props.id();

  const event = $derived(EVENTS.find((e) => e.id === eventId) ?? EVENTS[0]);
  const w = $derived(weights(n, mode));
  const fav = $derived(favourable(n, event.test));
  const sectors = $derived(
    cells(n).map((k, i) => ({
      label: String(k),
      weight: w[i],
      color: event.test(k) ? HIT : MISS,
    })),
  );
  const counted = $derived(countRatio(n, event.test));
  const truth = $derived(trueProbability(n, mode, event.test));
  const trials = $derived(counts.reduce((s, c) => s + (c ?? 0), 0));
  const hit = $derived(hits(counts, event.test));
  const ratio = $derived(trials === 0 ? null : hit / trials);

  function clear() {
    counts = [];
  }

  /** @param {number} value */
  function setCells(value) {
    n = value;
    clear();
  }

  /** @param {string | number} value */
  function setMode(value) {
    mode = value === 'lech' ? 'lech' : 'deu';
    n = Math.max(n, minCells(mode));
    clear();
    announce =
      mode === 'deu'
        ? 'Các ô bằng nhau: các kết quả đồng khả năng.'
        : 'Ô số 1 chiếm nửa vòng quay: các kết quả không còn đồng khả năng.';
  }

  function spinHundred() {
    const next = cells(n).map((_, i) => counts[i] ?? 0);
    for (let k = 0; k < 100; k++) next[pickWeighted(w, Math.random())]++;
    counts = next;
    announce = `Đã quay thêm 100 lần, tổng ${trials} lần. Biến cố xảy ra ${hit} lần.`;
  }
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Số ô của vòng quay"
      value={n}
      min={minCells(mode)}
      max={MAX_CELLS}
      oninput={setCells}
    />
    <SegmentedControl
      label="Kích thước các ô"
      options={[
        { value: 'deu', label: 'Các ô bằng nhau' },
        { value: 'lech', label: 'Ô số 1 chiếm nửa vòng' },
      ]}
      value={mode}
      onchange={setMode}
    />
  </div>

  <div>
    <label for={selectId} class="mb-1 block text-sm font-semibold text-slate-700">Biến cố A</label>
    <select id={selectId} class="{textInput} text-base" bind:value={eventId}>
      {#each EVENTS as e (e.id)}
        <option value={e.id}>{e.label}</option>
      {/each}
    </select>
    <p class="mt-1 text-xs text-slate-600">Ô màu cam làm A xảy ra; ô màu xám thì không.</p>
  </div>

  {#key `${n}-${mode}`}
    <ProbabilitySpinner {sectors} bind:counts showTable={false} label="Vòng quay may mắn {n} ô" />
  {/key}
  <div class="flex justify-center">
    <button type="button" class={button.secondary} onclick={spinHundred}>Quay 100 lần</button>
  </div>

  <div class="grid gap-3 sm:grid-cols-2" aria-live="polite">
    <div
      class="space-y-1 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-950"
    >
      <p class="font-semibold">Lí thuyết</p>
      <p>Các kết quả có thể: ô {cells(n).join('; ')}.</p>
      <p>
        Kết quả làm A xảy ra: {fav.length === 0 ? 'không có ô nào' : `ô ${fav.join('; ')}`} ({fav.length}
        trong {n} ô).
      </p>
      {#if mode === 'deu'}
        <p>
          {n} ô bằng nhau nên {n} kết quả đồng khả năng:
          <Tex
            math={`P(A) = \\frac{${fav.length}}{${n}}${fav.length === counted.n && n === counted.d ? '' : ` = ${fracTex(counted)}`}`}
            ariaLabel="P của A bằng {fracText(counted)}"
          />
        </p>
      {:else}
        <p>
          Các ô không bằng nhau nên các kết quả <strong>không</strong> đồng khả năng. Đếm ô cho
          <Tex math={`\\frac{${fav.length}}{${n}}`} ariaLabel="{fav.length} phần {n}" />, nhưng tính
          theo phần vòng tròn thì
          <Tex math={`P(A) = ${fracTex(truth)}`} ariaLabel="P của A bằng {fracText(truth)}" />.
        </p>
      {/if}
    </div>
    <div
      class="space-y-1 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950"
    >
      <p class="font-semibold">Thực nghiệm</p>
      {#if ratio === null}
        <p>Chưa quay lần nào. Bấm "Quay", "Quay 10 lần" hoặc "Quay 100 lần".</p>
      {:else}
        <p>Sau {trials} lần quay, A xảy ra {hit} lần.</p>
        <p>
          Tỉ số {hit}/{trials} ≈ {formatNumber(ratio, 2)}; P(A) ≈ {formatNumber(
            truth.n / truth.d,
            2,
          )}.
        </p>
        <p class="text-xs">Quay càng nhiều lần, tỉ số này thường càng gần P(A).</p>
      {/if}
    </div>
  </div>
  <p class="sr-only" aria-live="polite">{announce}</p>
</div>
