<script>
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { CARDS, SETS, chainText, judge, memberships } from './engine.js';

  /** @typedef {import('./engine.js').SetId} SetId */
  /** @typedef {import('./engine.js').NumberCard} NumberCard */

  /** @type {string[]} card ids in the order they were placed */
  let placed = $state([]);
  /** @type {string | null} */
  let selected = $state(null);
  /** @type {string | null} the placed card shown on the number line */
  let focus = $state(null);
  let feedback = $state('Chọn một thẻ số, rồi chọn ô của tập hợp nhỏ nhất chứa số đó.');
  /** @type {'none' | 'good' | 'bad'} */
  let tone = $state('none');

  const byId = (/** @type {string | null} */ id) => CARDS.find((c) => c.id === id) ?? null;
  const pool = $derived(CARDS.filter((c) => !placed.includes(c.id)));
  const placedCards = $derived(placed.map((id) => /** @type {NumberCard} */ (byId(id))));
  const focusCard = $derived(byId(focus));
  const finished = $derived(placed.length === CARDS.length);

  /** @param {SetId} region */
  const inRegion = (region) => placedCards.filter((c) => c.set === region);

  const marks = $derived([
    ...placedCards.filter((c) => c.id !== focus).map((c) => ({ value: c.value, color: '#94a3b8' })),
    ...(focusCard
      ? [
          { value: focusCard.value, label: focusCard.label, color: '#4f46e5' },
          ...(focusCard.value !== 0
            ? [{ value: -focusCard.value, label: 'số đối', color: '#7c3aed' }]
            : []),
        ]
      : []),
  ]);

  /** @param {string} id */
  function choose(id) {
    selected = selected === id ? null : id;
    const c = byId(selected);
    if (c) {
      feedback = `Đã chọn ${c.label}. Chọn ô của tập hợp nhỏ nhất chứa số này.`;
      tone = 'none';
    }
  }

  /** @param {SetId} region */
  function drop(region) {
    const c = byId(selected);
    if (!c) {
      feedback = 'Hãy chọn một thẻ số trước.';
      tone = 'bad';
      return;
    }
    const verdict = judge(c, region);
    feedback = verdict.text;
    if (verdict.result !== 'right') {
      tone = 'bad';
      return;
    }
    tone = 'good';
    placed = [...placed, c.id];
    focus = c.id;
    selected = null;
  }

  function reset() {
    placed = [];
    selected = null;
    focus = null;
    tone = 'none';
    feedback = 'Chọn một thẻ số, rồi chọn ô của tập hợp nhỏ nhất chứa số đó.';
  }

  const SET = Object.fromEntries(SETS.map((s) => [s.id, s]));
</script>

{#snippet region(/** @type {SetId} */ id)}
  <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
    <button
      type="button"
      class="{selected ? button.secondary : button.quiet} min-h-11"
      onclick={() => drop(id)}
    >
      <span class="font-serif text-lg font-bold">{SET[id].name}</span>
      <span class="text-sm">{SET[id].title}</span>
    </button>
  </div>
  <ul class="flex min-h-11 flex-wrap gap-1" aria-label="Các số đã đặt vào {SET[id].name}">
    {#each inRegion(id) as c (c.id)}
      <li>
        <button
          type="button"
          class="rounded-md border px-2 py-1 text-sm font-semibold tabular-nums {focus === c.id
            ? 'border-indigo-500 bg-indigo-100 text-indigo-900'
            : 'border-slate-300 bg-white text-slate-800'} {focusRing}"
          aria-pressed={focus === c.id}
          onclick={() => (focus = c.id)}>{c.label}</button
        >
      </li>
    {/each}
  </ul>
{/snippet}

<div class="space-y-4">
  <div>
    <p class="mb-1 text-sm font-semibold text-slate-700">
      Thẻ số chưa đặt ({pool.length}/{CARDS.length})
    </p>
    <div class="flex flex-wrap gap-2">
      {#each pool as c (c.id)}
        <button
          type="button"
          class="{selected === c.id ? button.primary : button.quiet} tabular-nums"
          aria-pressed={selected === c.id}
          onclick={() => choose(c.id)}>{c.label}</button
        >
      {/each}
      {#if pool.length === 0}
        <p class="text-emerald-800">Em đã đặt hết các thẻ.</p>
      {/if}
    </div>
  </div>

  <div class="rounded-2xl border-2 border-slate-400 bg-slate-50 p-2 sm:p-3">
    <p class="mb-2 px-1 font-semibold text-slate-700">
      <span class="font-serif text-lg font-bold">ℝ</span> Tập hợp các số thực
    </p>
    <div class="grid gap-2 md:grid-cols-[2fr_1fr]">
      <div class="rounded-xl border-2 border-sky-400 bg-sky-50 p-2">
        {@render region('Q')}
        <div class="rounded-xl border-2 border-teal-400 bg-teal-50 p-2">
          {@render region('Z')}
          <div class="rounded-xl border-2 border-emerald-500 bg-emerald-50 p-2">
            {@render region('N')}
          </div>
        </div>
      </div>
      <div class="rounded-xl border-2 border-amber-400 bg-amber-50 p-2">
        {@render region('I')}
      </div>
    </div>
  </div>

  <p
    aria-live="polite"
    class="min-h-6 font-semibold {tone === 'good'
      ? 'text-emerald-700'
      : tone === 'bad'
        ? 'text-rose-700'
        : 'text-slate-700'}"
  >
    {feedback}
  </p>

  {#if placedCards.length > 0}
    <div class="rounded-lg border border-slate-200 bg-white p-2">
      <NumberLine
        min={-5}
        max={5}
        step={1}
        subdivisions={2}
        value={null}
        interactive={false}
        {marks}
        label="Trục số thực từ −5 đến 5 với các số đã đặt"
      />
      {#if focusCard}
        <ul class="mt-2 space-y-1 px-2 text-slate-800">
          <li>
            <span class="font-semibold">{focusCard.label}</span>
            {focusCard.set === 'I' ? '≈' : '='}
            {formatNumber(focusCard.value, focusCard.set === 'I' ? 3 : 4)} thuộc
            {memberships(focusCard).join(', ')}.
          </li>
          <li>Số đối: {focusCard.opposite}.</li>
          <li>
            Giá trị tuyệt đối (khoảng cách từ điểm {focusCard.label} đến điểm 0): |{focusCard.label}|
            =
            {focusCard.abs}.
          </li>
        </ul>
      {/if}
    </div>
  {/if}

  {#if finished}
    <div class="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-950">
      <p class="font-semibold">Sắp xếp theo thứ tự tăng dần (từ trái sang phải trên trục số):</p>
      <p class="mt-1 tabular-nums">{chainText(placedCards)}</p>
    </div>
  {/if}

  <button type="button" class={button.quiet} onclick={reset}>Làm lại từ đầu</button>
</div>
