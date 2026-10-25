<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { PRESETS, allowedOps, applyOp, pieces, toText, tokenize, whyNot } from './engine.js';

  const OPTIONS = PRESETS.map((_, i) => ({ value: i, label: `Biểu thức ${i + 1}` }));

  let preset = $state(0);
  let tokens = $state(tokenize(PRESETS[0]));
  /** @type {Array<{ line: string, step: string }>} */
  let history = $state([]);
  let mistakes = $state(0);
  let message = $state('Chọn dấu của phép tính em sẽ làm đầu tiên.');
  let tone = $state(/** @type {'info' | 'good' | 'bad'} */ ('info'));

  const parts = $derived(pieces(tokens));
  const done = $derived(tokens.length === 1);
  const start = $derived(toText(tokenize(PRESETS[preset])));

  /** @param {number} i */
  function load(i) {
    tokens = tokenize(PRESETS[i]);
    history = [];
    mistakes = 0;
    tone = 'info';
    message = 'Chọn dấu của phép tính em sẽ làm đầu tiên.';
  }

  /**
   * @param {number} index
   * @param {boolean} [shown] the step was done for the learner
   */
  function pick(index, shown = false) {
    const why = whyNot(tokens, index);
    if (why) {
      mistakes++;
      tone = 'bad';
      message = `Chưa đúng thứ tự. ${why}`;
      return;
    }
    const r = applyOp(tokens, index);
    tokens = r.tokens;
    history = [...history, { line: toText(r.tokens), step: r.step }];
    tone = 'good';
    message =
      tokens.length === 1
        ? `Xong! Giá trị của biểu thức là ${toText(tokens)}.`
        : `${shown ? 'Bước tiếp theo' : 'Đúng'}: ${r.step}. Chọn phép tính tiếp theo.`;
  }

  /**
   * Spoken form of the power whose sign is at `index`, e.g. "5 mũ 2".
   * @param {number} index
   */
  function powerLabel(index) {
    const [b, e] = [tokens[index - 1], tokens[index + 1]];
    const base = b?.kind === 'num' ? String(b.value) : 'biểu thức trong ngoặc';
    return `${base} mũ ${e?.kind === 'num' ? e.value : ''}`;
  }

  function showStep() {
    const next = allowedOps(tokens)[0];
    if (next !== undefined) pick(next, true);
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn biểu thức"
    options={OPTIONS}
    bind:value={preset}
    onchange={(v) => load(Number(v))}
  />

  <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
    <p class="text-sm text-slate-600">
      Biểu thức ban đầu: <span class="tabular-nums">{start}</span>
    </p>
    <div
      class="mt-3 flex flex-wrap items-center gap-x-1 gap-y-2 text-2xl font-semibold tabular-nums text-slate-900"
      role="group"
      aria-label="Biểu thức hiện tại: {toText(tokens)}. Chọn một dấu phép tính."
    >
      {#if history.length > 0}<span class="mr-1 text-slate-500" aria-hidden="true">=</span>{/if}
      {#each parts as p (p.index)}
        {#if p.kind === 'op'}
          <button
            type="button"
            class="min-h-11 min-w-11 rounded-lg border-2 border-indigo-300 bg-white px-2 text-indigo-700 hover:bg-indigo-50 {focusRing}"
            aria-label="Tính phép {p.text === '·'
              ? 'nhân'
              : p.text === ':'
                ? 'chia'
                : p.text === '+'
                  ? 'cộng'
                  : 'trừ'} này"
            onclick={() => pick(p.index)}>{p.text}</button
          >
        {:else if p.kind === 'pow'}
          <button
            type="button"
            class="-ml-1 min-h-11 min-w-9 self-start rounded-lg border-2 border-amber-300 bg-white px-1 text-lg text-amber-700 hover:bg-amber-50 {focusRing}"
            aria-label="Nâng lên lũy thừa: {powerLabel(p.index)}"
            onclick={() => pick(p.index)}>{p.text}</button
          >
        {:else}
          <span>{p.text}</span>
        {/if}
      {/each}
    </div>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.secondary} onclick={showStep} disabled={done}>
      Làm giúp một bước
    </button>
    <button type="button" class={button.quiet} onclick={() => load(preset)}>Làm lại</button>
  </div>

  <div
    class="rounded-xl border p-4 {tone === 'good'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
      : tone === 'bad'
        ? 'border-rose-300 bg-rose-50 text-rose-900'
        : 'border-slate-200 bg-white text-slate-800'}"
    aria-live="polite"
  >
    <p class="font-semibold">{message}</p>
    {#if done}
      <p class="mt-1 text-sm">
        {mistakes === 0
          ? 'Em chọn đúng thứ tự ở mọi bước.'
          : `Em chọn sai thứ tự ${mistakes} lần. Thử lại để làm đúng ngay từ đầu nhé.`}
      </p>
    {/if}
  </div>

  {#if history.length > 0}
    <ol
      class="space-y-1 rounded-xl border border-slate-200 bg-white p-4 tabular-nums"
      aria-label="Các bước đã làm"
    >
      <li class="text-slate-700">{start}</li>
      {#each history as h, i (i)}
        <li class="flex flex-wrap items-baseline gap-x-3">
          <span class="text-slate-900">= {h.line}</span>
          <span class="text-sm text-slate-500">({h.step})</span>
        </li>
      {/each}
    </ol>
  {/if}
</div>
