<script>
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import {
    PUZZLES,
    RULES,
    apply,
    exprTex,
    isDone,
    sameValue,
    value,
    valueText,
    valueTex,
  } from './engine.js';

  /** @typedef {import('./engine.js').Expr} Expr */

  let puzzle = $state(0);
  /** @type {Expr} */
  let expr = $state(PUZZLES[0]);
  /** @type {Array<{ tex: string, rule: string }>} */
  let history = $state([]);
  /** @type {{ tone: 'good' | 'bad' | 'info', text: string, before?: string, after?: string } | null} */
  let feedback = $state(null);
  let mistakes = $state(0);

  const current = $derived(value(expr));
  const done = $derived(isDone(expr));

  /** @param {number} i */
  function choose(i) {
    puzzle = i;
    expr = PUZZLES[i];
    history = [];
    feedback = null;
    mistakes = 0;
  }

  /** @param {import('./engine.js').Rule} rule */
  function play(rule) {
    if (done) return;
    const res = apply(expr, rule.id);
    if ('reason' in res) {
      feedback = { tone: 'info', text: `Thẻ "${rule.title}" chưa dùng được: ${res.reason}` };
      return;
    }
    const before = `${exprTex(expr)} = ${valueTex(current)}`;
    const afterValue = value(res.next);
    const after = valueTex(afterValue);
    if (!sameValue(afterValue, current)) {
      mistakes++;
      feedback = {
        tone: 'bad',
        text: `Kiểm tra bằng giá trị: biểu thức mới có giá trị khác biểu thức cũ, nên thẻ "${rule.title}" là quy tắc sai. Biểu thức được giữ nguyên.`,
        before,
        after: `${exprTex(res.next)} = ${after}`,
      };
      return;
    }
    history = [...history, { tex: exprTex(res.next), rule: rule.title }];
    expr = res.next;
    feedback = {
      tone: 'good',
      text: isDone(res.next)
        ? `Xong! Biểu thức đã là một lũy thừa duy nhất, giá trị vẫn bằng ${valueText(afterValue)}.`
        : `Đúng quy tắc: giá trị không đổi.`,
      before,
      after: `${exprTex(res.next)} = ${after}`,
    };
  }
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn biểu thức">
    {#each PUZZLES as _, i (i)}
      <button
        type="button"
        class={i === puzzle ? button.primary : button.quiet}
        aria-pressed={i === puzzle}
        onclick={() => choose(i)}>Biểu thức {i + 1}</button
      >
    {/each}
  </div>

  <div class="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-slate-900">
    <p class="text-sm font-semibold text-slate-700">Biểu thức hiện tại</p>
    <div class="overflow-x-auto text-lg">
      <Tex display math={exprTex(PUZZLES[puzzle])} />
      {#each history as h, i (i)}
        <div class="flex flex-wrap items-center justify-center gap-x-3">
          <Tex display math={`= ${h.tex}`} />
          <span class="text-xs text-slate-600">({h.rule})</span>
        </div>
      {/each}
    </div>
    <p class="mt-2 text-sm text-slate-700">
      Giá trị: <Tex math={valueTex(current)} />
    </p>
  </div>

  <div>
    <p class="mb-2 text-sm font-semibold text-slate-700">
      Thẻ quy tắc. Chọn một thẻ để áp dụng vào biểu thức (từ trái sang phải); có thẻ đúng và thẻ
      sai.
    </p>
    <ul class="grid gap-2 sm:grid-cols-2">
      {#each RULES as r (r.id)}
        <li>
          <button
            type="button"
            class="{button.quiet} w-full flex-col items-start! text-left"
            disabled={done}
            onclick={() => play(r)}
            aria-label="Thẻ {r.title}"
          >
            <span class="text-sm font-semibold">{r.title}</span>
            <Tex math={r.tex} />
          </button>
        </li>
      {/each}
    </ul>
  </div>

  <div aria-live="polite">
    {#if feedback}
      <div
        class="rounded-lg border p-3 {feedback.tone === 'good'
          ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
          : feedback.tone === 'bad'
            ? 'border-rose-300 bg-rose-50 text-rose-900'
            : 'border-amber-300 bg-amber-50 text-amber-900'}"
      >
        <p class="font-semibold">{feedback.text}</p>
        {#if feedback.before && feedback.after}
          <p class="mt-1 overflow-x-auto">
            Trước: <Tex math={feedback.before} />; sau:
            <Tex math={feedback.after} />
            <span class="font-bold">{feedback.tone === 'good' ? '(bằng nhau)' : '(khác nhau)'}</span
            >
          </p>
        {/if}
      </div>
    {/if}
  </div>

  {#if done}
    <p class="text-sm text-slate-600">
      Em dùng {history.length} bước{mistakes > 0 ? `, chọn nhầm thẻ sai ${mistakes} lần` : ''}. Chọn
      biểu thức khác để luyện tiếp.
    </p>
  {/if}
</div>
