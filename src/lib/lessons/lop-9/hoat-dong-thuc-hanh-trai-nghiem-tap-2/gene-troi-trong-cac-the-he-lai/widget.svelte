<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import { rng } from '#lib/core/drill.js';
  import { ratioText } from '#lib/core/fractions.js';
  import { fmt, formatFixed } from '#lib/core/number-format.js';
  import {
    GENOTYPES,
    dominantCount,
    normal,
    outcomeCounts,
    punnett,
    selfedGeneration,
    showsDominant,
    tally,
    toss,
  } from './engine.js';

  /** @typedef {import('./engine.js').Genotype} Genotype */

  const MODES = [
    { value: 'punnett', label: 'Bảng Punnett' },
    { value: 'coins', label: 'Tung đồng xu' },
    { value: 'generations', label: 'Qua nhiều thế hệ' },
  ];
  const PARENTS = GENOTYPES.map((g) => ({ value: g, label: g }));
  const RED = '#DC2626';

  let mode = $state('punnett');
  let father = $state(/** @type {Genotype} */ ('Aa'));
  let mother = $state(/** @type {Genotype} */ ('Aa'));
  /** @type {string[]} */
  let pairs = $state([]);
  let batch = $state(0);
  let generation = $state(2);

  const square = $derived(punnett(father, mother));
  const counts = $derived(outcomeCounts(father, mother));
  const dominant = $derived(dominantCount(father, mother));
  const tossed = $derived(tally(pairs));
  const tossedDominant = $derived(tossed.AA + tossed.Aa);
  const last = $derived(pairs.at(-1) ?? '');
  const gen = $derived(selfedGeneration(generation));

  /** @param {string} genotype */
  const flower = (genotype) => (showsDominant(genotype) ? 'hoa đỏ' : 'hoa trắng');
  /** @param {number} n @param {number} d */
  const share = (n, d) => ratioText(n, d);
  /** @param {number} n @param {number} total */
  const rel = (n, total) => (total === 0 ? '–' : formatFixed(n / total, 2));

  const punnettNote = $derived.by(() => {
    const parts = GENOTYPES.filter((g) => counts[g] > 0).map((g) => `${g}: ${share(counts[g], 4)}`);
    const text = `Bố ${father} × mẹ ${mother}: 4 kết quả đồng khả năng. Xác suất kiểu gene ${parts.join('; ')}. Xác suất cây con có gene trội (hoa đỏ) là ${share(dominant, 4)}, hoa trắng là ${share(4 - dominant, 4)}.`;
    return text;
  });

  const coinNote = $derived.by(() => {
    const n = pairs.length;
    if (n === 0)
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Chưa tung lần nào. Bấm "Tung 1 lần", "Tung 10 lần" hoặc "Tung 100 lần".',
      };
    const head = `Lần ${fmt(n)}: bố cho ${last[0]}, mẹ cho ${last[1]}, được ${normal(last)} (${flower(last)}).`;
    const rate = `Sau ${fmt(n)} lần: tần số tương đối của hoa đỏ là ${rel(tossedDominant, n)}, xác suất lí thuyết là ${share(dominant, 4)}.`;
    return {
      tone: /** @type {'ok' | 'info'} */ (n >= 100 ? 'ok' : 'info'),
      text: `${head} ${rate}${n >= 100 ? ' Càng tung nhiều lần, tần số tương đối càng gần xác suất.' : ''}`,
    };
  });

  const genNote = $derived.by(() => {
    const { den, counts: c } = gen;
    return `F${generation}: AA chiếm ${share(c.AA, den)}, Aa chiếm ${share(c.Aa, den)}, aa chiếm ${share(c.aa, den)}. Tỉ lệ cây có gene trội (hoa đỏ) là ${share(c.AA + c.Aa, den)}.`;
  });

  /** @param {number} times */
  function run(times) {
    batch += 1;
    const rand = rng(batch * 7919 + pairs.length);
    const more = Array.from({ length: times }, () => toss(rand, father, mother));
    pairs = [...pairs, ...more];
  }

  function clear() {
    pairs = [];
  }
</script>

{#snippet bloom(/** @type {string} */ genotype, /** @type {number} */ size)}
  <svg
    width={size}
    height={size}
    viewBox="-12 -12 24 24"
    aria-hidden="true"
    class="inline-block align-middle"
  >
    {#each [0, 72, 144, 216, 288] as turn (turn)}
      <ellipse
        cx="0"
        cy="-6"
        rx="4.2"
        ry="6"
        transform={`rotate(${turn})`}
        fill={showsDominant(genotype) ? RED : '#FFFFFF'}
        stroke={showsDominant(genotype) ? '#991B1B' : '#94A3B8'}
        stroke-width="1"
      />
    {/each}
    <circle r="2.6" fill="#FACC15" />
  </svg>
{/snippet}

<div class="space-y-4">
  <SegmentedControl label="Chế độ" options={MODES} bind:value={mode} />

  {#if mode !== 'generations'}
    <div class="grid gap-3 sm:grid-cols-2">
      <SegmentedControl
        label="Kiểu gene của bố"
        options={PARENTS}
        bind:value={father}
        onchange={clear}
      />
      <SegmentedControl
        label="Kiểu gene của mẹ"
        options={PARENTS}
        bind:value={mother}
        onchange={clear}
      />
    </div>
  {/if}

  {#if mode === 'punnett'}
    <div class="overflow-x-auto">
      <table class="mx-auto border-collapse text-center text-base">
        <caption class="pb-2 text-sm text-slate-600">
          Bảng Punnett: hàng là gene bố cho, cột là gene mẹ cho
        </caption>
        <thead>
          <tr>
            <th class="h-12 w-20 border border-slate-300 bg-slate-100 text-sm" scope="col"
              >Bố \ Mẹ</th
            >
            {#each [0, 1] as j (j)}
              <th class="h-12 w-24 border border-slate-300 bg-rose-50 font-bold" scope="col"
                >{mother[j]}</th
              >
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each [0, 1] as i (i)}
            <tr>
              <th class="h-16 border border-slate-300 bg-sky-50 font-bold" scope="row"
                >{father[i]}</th
              >
              {#each [0, 1] as j (j)}
                <td
                  class="h-16 border border-slate-300"
                  aria-label={`Bố cho ${father[i]}, mẹ cho ${mother[j]}: kiểu gene ${normal(square[i][j])}, ${flower(square[i][j])}`}
                >
                  <span class="block font-semibold">{square[i][j]}</span>
                  {@render bloom(square[i][j], 26)}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="grid gap-2 rounded-lg bg-slate-50 p-3 text-sm tabular-nums sm:grid-cols-3">
      {#each GENOTYPES as g (g)}
        <p>P({g}) = {share(counts[g], 4)}</p>
      {/each}
      <p class="font-semibold text-red-700">P(hoa đỏ) = {share(dominant, 4)}</p>
      <p class="font-semibold text-slate-700">P(hoa trắng) = {share(4 - dominant, 4)}</p>
    </div>
    <FeedbackNote tone="info" text={punnettNote} />
  {:else if mode === 'coins'}
    <p class="text-sm text-slate-700">
      Đồng xu xanh là "bố" ({father}), đồng xu đỏ là "mẹ" ({mother}): mỗi mặt ghi một gene. Mỗi lần
      tung hai đồng xu cho một cây con.
    </p>
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={() => run(1)}>Tung 1 lần</button>
      <button type="button" class={button.secondary} onclick={() => run(10)}>Tung 10 lần</button>
      <button type="button" class={button.secondary} onclick={() => run(100)}>Tung 100 lần</button>
      <button type="button" class={button.quiet} onclick={clear}>Làm lại</button>
    </div>
    <div class="flex items-center justify-center gap-4" aria-hidden="true">
      <span
        class="flex h-14 w-14 items-center justify-center rounded-full border-4 border-sky-700 bg-sky-100 text-xl font-bold text-sky-900"
        >{last ? last[0] : '?'}</span
      >
      <span
        class="flex h-14 w-14 items-center justify-center rounded-full border-4 border-rose-700 bg-rose-100 text-xl font-bold text-rose-900"
        >{last ? last[1] : '?'}</span
      >
      {#if last}
        {@render bloom(last, 44)}
      {/if}
    </div>
    <div class="overflow-x-auto">
      <table class="w-full min-w-[20rem] border-collapse text-sm tabular-nums">
        <thead>
          <tr class="bg-slate-100">
            <th class="border border-slate-300 p-2 text-left" scope="col">Kết quả</th>
            <th class="border border-slate-300 p-2" scope="col">Tần số</th>
            <th class="border border-slate-300 p-2" scope="col">Tần số tương đối</th>
            <th class="border border-slate-300 p-2" scope="col">Xác suất</th>
          </tr>
        </thead>
        <tbody>
          {#each GENOTYPES as g (g)}
            <tr>
              <th class="border border-slate-300 p-2 text-left" scope="row">Kiểu gene {g}</th>
              <td class="border border-slate-300 p-2 text-center">{fmt(tossed[g])}</td>
              <td class="border border-slate-300 p-2 text-center">{rel(tossed[g], pairs.length)}</td
              >
              <td class="border border-slate-300 p-2 text-center">{share(counts[g], 4)}</td>
            </tr>
          {/each}
          <tr class="bg-red-50">
            <th class="border border-slate-300 p-2 text-left" scope="row">Hoa đỏ (có A)</th>
            <td class="border border-slate-300 p-2 text-center">{fmt(tossedDominant)}</td>
            <td class="border border-slate-300 p-2 text-center"
              >{rel(tossedDominant, pairs.length)}</td
            >
            <td class="border border-slate-300 p-2 text-center">{share(dominant, 4)}</td>
          </tr>
          <tr>
            <th class="border border-slate-300 p-2 text-left" scope="row">Hoa trắng (aa)</th>
            <td class="border border-slate-300 p-2 text-center">{fmt(tossed.aa)}</td>
            <td class="border border-slate-300 p-2 text-center">{rel(tossed.aa, pairs.length)}</td>
            <td class="border border-slate-300 p-2 text-center">{share(4 - dominant, 4)}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <FeedbackNote tone={coinNote.tone} text={coinNote.text} />
  {:else}
    <p class="text-sm text-slate-700">
      P: hoa đỏ thuần chủng AA × hoa trắng aa cho F1 toàn Aa. Từ F1, mỗi thế hệ cây tự thụ phấn: cây
      AA, aa giữ nguyên kiểu gene; cây Aa cho con theo tỉ lệ 1 AA : 2 Aa : 1 aa.
    </p>
    <SliderField label="Thế hệ" bind:value={generation} min={1} max={8} format={(v) => `F${v}`} />
    <svg
      viewBox="0 0 400 70"
      class="block w-full rounded-lg border border-slate-200 bg-white"
      role="img"
      aria-label={genNote}
    >
      {#each GENOTYPES as g, i (g)}
        {@const before = GENOTYPES.slice(0, i).reduce((s, h) => s + gen.counts[h], 0)}
        {@const x = 10 + (380 * before) / gen.den}
        {@const w = (380 * gen.counts[g]) / gen.den}
        {#if w > 0}
          <rect
            {x}
            y="10"
            width={w}
            height="34"
            fill={g === 'AA' ? '#B91C1C' : g === 'Aa' ? '#F87171' : '#F1F5F9'}
            stroke="#475569"
          />
          {#if w > 34}
            <text
              x={x + w / 2}
              y="32"
              font-size="13"
              font-weight="700"
              text-anchor="middle"
              fill={g === 'aa' ? '#0F172A' : '#FFFFFF'}>{g}</text
            >
          {/if}
        {/if}
      {/each}
      <text x="10" y="62" font-size="11" fill="#475569">0</text>
      <text x="390" y="62" font-size="11" text-anchor="end" fill="#475569">1</text>
    </svg>
    <div class="grid gap-2 rounded-lg bg-slate-50 p-3 text-sm tabular-nums sm:grid-cols-4">
      {#each GENOTYPES as g (g)}
        <p>{g}: {share(gen.counts[g], gen.den)}</p>
      {/each}
      <p class="font-semibold text-red-700">
        Hoa đỏ: {share(gen.counts.AA + gen.counts.Aa, gen.den)}
      </p>
    </div>
    <FeedbackNote tone="info" text={genNote} />
  {/if}
</div>
