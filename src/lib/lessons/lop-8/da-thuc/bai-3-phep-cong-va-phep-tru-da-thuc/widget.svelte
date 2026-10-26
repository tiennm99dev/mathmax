<script>
  import { flip } from 'svelte/animate';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card as cardClass, focusRing } from '#lib/core/ui.js';
  import { reducedMotion } from '#lib/core/motion.js';
  import { MINUS, intText } from '#lib/core/number-format.js';
  import { mono, monoText, polyText, varKey, varText } from '../_shared/poly.js';
  import { PAIRS, columns, readCoef, result, rows } from './engine.js';

  /** @typedef {import('../_shared/poly.js').Mono} Mono */
  /** @typedef {{ id: string, m: Mono | null, first: boolean }} Slot */

  const LABELS = ['Cộng 1', 'Trừ 1', 'Cộng 2', 'Trừ 2'];

  let pairIndex = $state(0);
  /** @typedef {'start' | 'negated' | 'aligned' | 'done'} Step */
  let step = $state(/** @type {Step} */ ('start'));
  /** @type {string[]} */
  let typed = $state([]);
  /** @type {Array<boolean | null>} */
  let marks = $state([]);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  let note = $state({ tone: 'info', text: '' });

  const pair = $derived(PAIRS[pairIndex]);
  const sub = $derived(pair.op === '-');
  const r = $derived(rows(pair));
  const showNegated = $derived(sub && step !== 'start');
  const second = $derived(showNegated ? r.second : r.b);
  const cols = $derived(columns(r.a, r.second));
  const aligned = $derived(step === 'aligned' || step === 'done');
  const duration = $derived(reducedMotion() ? 0 : 450);

  /**
   * The cells of one row: its terms in written order, or one cell per column
   * (blank where the row has no such term) once aligned. A term keeps its id
   * across the two layouts, so it slides into its column.
   * @param {string} row
   * @param {Mono[]} terms
   * @param {'a' | 'b'} side
   * @returns {Slot[]}
   */
  function slots(row, terms, side) {
    if (!aligned) return terms.map((m, i) => ({ id: `${row}-${varKey(m)}`, m, first: i === 0 }));
    return cols.map((c, i) => {
      const m = side === 'a' ? c.a : c.b;
      return { id: m ? `${row}-${c.key}` : `${row}-gap-${c.key}`, m, first: i === 0 };
    });
  }

  /** @param {Mono} m @param {boolean} first */
  function signed(m, first) {
    if (first) return monoText(m);
    return `${m.coef < 0 ? MINUS : '+'} ${monoText(mono(Math.abs(m.coef), m.vars))}`;
  }

  const rowA = $derived(slots('a', r.a, 'a'));
  const rowB = $derived(slots('b', second, 'b'));

  function intro() {
    return sub
      ? 'Để trừ, trước hết đổi dấu mọi hạng tử của B: A − B = A + (−B).'
      : 'Bấm "Xếp cột" để đưa các hạng tử đồng dạng vào cùng một cột.';
  }

  function reset() {
    step = 'start';
    typed = [];
    marks = [];
    note = { tone: 'info', text: intro() };
  }
  reset();

  function negate() {
    step = 'negated';
    note = {
      tone: 'info',
      text: `Đổi dấu xong: −B = ${polyText(r.second)}. Giờ xếp các hạng tử đồng dạng vào cùng cột.`,
    };
  }

  function align() {
    step = 'aligned';
    typed = cols.map(() => '');
    marks = cols.map(() => null);
    note = {
      tone: 'info',
      text: 'Mỗi cột chứa các hạng tử đồng dạng. Nhập hệ số của tổng mỗi cột (cột trống coi như 0), rồi bấm "Kiểm tra".',
    };
  }

  function check() {
    const read = typed.map(readCoef);
    if (read.some((v) => v === null)) {
      note = { tone: 'warn', text: 'Hãy nhập một số nguyên vào mọi ô, ví dụ 3, −2 hoặc 0.' };
      return;
    }
    marks = cols.map((c, i) => read[i] === c.sum.coef);
    const wrong = marks.filter((m) => !m).length;
    if (wrong === 0) {
      step = 'done';
      note = {
        tone: 'ok',
        text: `Đúng hết! A ${sub ? MINUS : '+'} B = ${polyText(result(pair))}.`,
      };
    } else {
      const first = cols[marks.indexOf(false)];
      note = {
        tone: 'warn',
        text: `Còn ${wrong} cột chưa đúng. Ở cột ${varText(first.sum) || 'số'}, cộng hai hệ số ${intText(first.a?.coef ?? 0)} và ${intText(first.b?.coef ?? 0)}${sub ? ' (hàng dưới đã đổi dấu)' : ''}.`,
      };
    }
  }

  const cell =
    'flex h-11 w-[4.5rem] shrink-0 items-center justify-center rounded-lg text-sm sm:w-24 sm:text-base';
</script>

{#snippet row(
  /** @type {string} */ label,
  /** @type {Slot[]} */ items,
  /** @type {boolean} */ flash,
)}
  <div class="flex items-center gap-1">
    <span class="w-12 shrink-0 text-right text-sm font-bold text-slate-700">{label}</span>
    {#each items as s (s.id)}
      <div
        animate:flip={{ duration }}
        class="{cell} font-semibold tabular-nums {s.m
          ? flash
            ? 'border border-rose-300 bg-rose-50 text-rose-900'
            : 'border border-slate-300 bg-white text-slate-800'
          : 'border border-dashed border-slate-200 text-slate-300'}"
      >
        {s.m ? signed(s.m, s.first) : '·'}
      </div>
    {/each}
  </div>
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Phép tính"
    options={PAIRS.map((_, i) => ({ value: i, label: LABELS[i] }))}
    bind:value={pairIndex}
    onchange={(v) => {
      pairIndex = Number(v);
      reset();
    }}
  />

  <p class="text-sm text-slate-700 tabular-nums">
    A = <span class="font-semibold">{polyText(r.a)}</span>; B =
    <span class="font-semibold">{polyText(r.b)}</span>. Tính
    <span class="font-semibold">A {sub ? MINUS : '+'} B</span>.
  </p>

  <div class="{cardClass} overflow-x-auto p-3">
    <div class="w-max space-y-2" role="group" aria-label="Bảng xếp cột A {sub ? 'trừ' : 'cộng'} B">
      {@render row('A', rowA, false)}
      {@render row(showNegated ? `${MINUS}B` : 'B', rowB, showNegated && !aligned)}
      {#if aligned}
        <div class="ml-[3.25rem] border-t-2 border-slate-400"></div>
        <div class="flex items-start gap-1">
          <span
            class="flex h-11 w-12 shrink-0 items-center justify-end text-sm font-bold text-slate-700"
            >{sub ? `A ${MINUS} B` : 'A + B'}</span
          >
          {#each cols as c, i (c.key)}
            <label class="flex w-[4.5rem] shrink-0 flex-col items-center gap-0.5 sm:w-24">
              <input
                type="text"
                inputmode="numeric"
                autocomplete="off"
                disabled={step === 'done'}
                aria-label="Hệ số của cột {varText(c.sum) || 'số hạng tự do'}"
                class="h-11 w-full rounded-lg border px-1 text-center text-base font-semibold tabular-nums {focusRing} {marks[
                  i
                ] === true
                  ? 'border-emerald-500 bg-emerald-50'
                  : marks[i] === false
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-slate-300 bg-white'}"
                bind:value={typed[i]}
              />
              <span class="text-xs text-slate-500">{varText(c.sum) || 'số'}</span>
            </label>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <div class="flex flex-wrap gap-3">
    {#if step === 'start' && sub}
      <button type="button" class={button.primary} onclick={negate}
        >Đổi dấu các hạng tử của B</button
      >
    {:else if step === 'start' || step === 'negated'}
      <button type="button" class={button.primary} onclick={align}>Xếp cột</button>
    {:else if step === 'aligned'}
      <button type="button" class={button.primary} onclick={check}>Kiểm tra</button>
    {/if}
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
