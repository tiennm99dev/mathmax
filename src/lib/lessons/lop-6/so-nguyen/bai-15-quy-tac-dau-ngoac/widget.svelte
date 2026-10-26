<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { intText, operand } from '#lib/core/number-format.js';
  import {
    PRESETS,
    evaluate,
    oppositePairs,
    openTerms,
    stage,
    stageText,
    stepCount,
    stepTarget,
  } from './engine.js';

  /** @typedef {import('./engine.js').Group} Group */

  const OPTIONS = PRESETS.map((p, i) => ({ value: i, label: p.label }));

  let preset = $state(0);
  /** @type {Group[]} */
  let groups = $state(PRESETS[0].groups.map((g) => ({ ...g, terms: [...g.terms] })));
  let k = $state(0);

  const total = $derived(stepCount(groups));
  const value = $derived(evaluate(groups));
  const lines = $derived(Array.from({ length: k + 1 }, (_, i) => stage(groups, i)));
  const done = $derived(k >= total);
  const terms = $derived(openTerms(groups));
  const pairs = $derived(oppositePairs(terms));
  const announcement = $derived(describeStep(k));
  const quick = $derived(quickSum());

  /** @param {number} i */
  function choose(i) {
    preset = i;
    groups = PRESETS[i].groups.map((g) => ({ ...g, terms: [...g.terms] }));
    k = 0;
  }

  /**
   * Tokens as display text: a space before each one except right after an
   * opening bracket and before a closing one; a sign after another term is
   * spaced like an operation (− 12), a leading sign is not (−12).
   * @param {import('./engine.js').Token[]} tokens
   */
  function pieces(tokens) {
    return tokens.map((t, i) => {
      const prev = tokens[i - 1];
      const glued = i === 0 || prev.kind === 'open' || t.kind === 'close';
      const text =
        t.kind === 'open'
          ? `${t.sign}${t.sign ? ' ' : ''}(`
          : t.kind === 'close'
            ? ')'
            : glued || !t.sign
              ? `${t.sign}${t.body}`
              : `${t.sign} ${t.body}`;
      return { text, kind: t.kind, changed: t.changed, lead: glued ? '' : ' ' };
    });
  }

  /** @param {number} gi */
  function toggleSign(gi) {
    groups[gi].sign = groups[gi].sign === 1 ? -1 : 1;
    k = 0;
  }

  /** @param {number} step */
  function describeStep(step) {
    if (step === 0) return 'Biểu thức ban đầu, chưa bỏ ngoặc.';
    const target = stepTarget(groups, step);
    if (!target) return '';
    const g = groups[target.group];
    const t = g.terms[target.term];
    return g.sign < 0
      ? `Trước ngoặc là dấu "−": số hạng ${intText(t)} đổi dấu thành ${intText(-t)}.`
      : `Trước ngoặc là dấu "+": số hạng ${intText(t)} giữ nguyên dấu.`;
  }

  function quickSum() {
    if (pairs.length === 0) return '';
    const used = new Set(pairs.flat());
    const shown = pairs.map(([i, j]) => `${operand(terms[i])} + ${operand(terms[j])} = 0`);
    const rest = terms.filter((_, i) => !used.has(i));
    const restText = rest.length
      ? `; còn lại ${rest.map((v, i) => (i === 0 ? intText(v) : operand(v))).join(' + ')} = ${intText(value)}`
      : '';
    return `Tính nhanh: nhóm các số đối, ${shown.join(', ')}${restText}.`;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn tổng"
    options={OPTIONS}
    value={preset}
    onchange={(v) => choose(Number(v))}
  />

  <div class="flex flex-wrap items-center gap-2 text-sm text-slate-700">
    <span class="font-semibold">Đổi dấu trước ngoặc:</span>
    {#each groups as g, gi (gi)}
      {#if g.bracket}
        <button
          type="button"
          class={button.quiet}
          onclick={() => toggleSign(gi)}
          aria-label="Đổi dấu trước ngoặc thứ {groups.slice(0, gi + 1).filter((x) => x.bracket)
            .length}, hiện là {g.sign < 0 ? 'dấu trừ' : 'dấu cộng'}"
        >
          {g.sign < 0 ? '−' : '+'} ( … )
        </button>
      {/if}
    {/each}
  </div>

  <ol
    class="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4"
    aria-label="Các bước bỏ ngoặc"
  >
    {#each lines as tokens, li (li)}
      <li class="text-lg leading-loose tabular-nums text-slate-900 sm:text-2xl">
        <span class="inline-block w-5 text-slate-400" aria-hidden="true">{li === 0 ? '' : '='}</span
        >
        {#each pieces(tokens) as t, ti (ti)}{t.lead}<span
            class="whitespace-nowrap rounded {t.kind === 'term'
              ? ''
              : 'font-semibold text-amber-700'} {li === lines.length - 1 && t.changed
              ? 'flip bg-rose-100 px-0.5 font-bold text-rose-700'
              : ''}">{t.text}</span
          >{/each}
      </li>
    {/each}
  </ol>

  <p class="sr-only">Biểu thức hiện tại: {stageText(lines[lines.length - 1])}</p>
  <p class="font-semibold text-slate-800" aria-live="polite">{announcement}</p>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => k++} disabled={done}>
      Bỏ ngoặc tiếp một số hạng
    </button>
    <button type="button" class={button.secondary} onclick={() => (k = total)} disabled={done}>
      Bỏ hết ngoặc
    </button>
    <button type="button" class={button.quiet} onclick={() => (k = 0)} disabled={k === 0}>
      Làm lại
    </button>
  </div>

  <div class="rounded-xl border border-slate-200 bg-white p-4 text-slate-800">
    <p>
      Mỗi dòng đều có giá trị <strong class="tabular-nums">{intText(value)}</strong>: bỏ ngoặc không
      làm thay đổi giá trị của tổng.
    </p>
    {#if done && quick}
      <p class="mt-2 text-emerald-800">{quick}</p>
    {:else if !done}
      <p class="mt-2 text-sm text-slate-600">
        Bước {k}/{total}. Bấm vào dấu trước ngoặc để đổi "+" thành "−" và so sánh hai cách bỏ ngoặc.
      </p>
    {/if}
  </div>
</div>

<style>
  @media (prefers-reduced-motion: no-preference) {
    .flip {
      display: inline-block;
      animation: flip 0.5s ease-out;
    }
  }
  @keyframes flip {
    from {
      transform: rotateX(90deg);
    }
    to {
      transform: rotateX(0deg);
    }
  }
</style>
