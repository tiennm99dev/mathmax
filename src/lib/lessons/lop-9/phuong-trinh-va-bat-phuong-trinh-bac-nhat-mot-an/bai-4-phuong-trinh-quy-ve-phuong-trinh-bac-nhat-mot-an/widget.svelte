<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { rng } from '#lib/core/drill.js';
  import { intText } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import { factorText } from '../_shared/linear-text.js';
  import {
    SPAN,
    clearedText,
    clearingTex,
    conclusion,
    conditionMatches,
    conditionTex,
    equationTex,
    equationText,
    excluded,
    isAllowed,
    makeProblem,
    reason,
  } from './engine.js';

  const VALUES = Array.from({ length: 2 * SPAN + 1 }, (_, i) => i - SPAN);

  // The first problem is fixed so the prerendered page and the browser agree.
  let seed = $state(7);
  const problem = $derived(makeProblem(rng(seed)));

  /** @type {number[]} */
  let chosen = $state([]);
  let conditionDone = $state(false);
  let conditionTries = $state(0);
  let conditionNote = $state({
    tone: /** @type {'ok' | 'warn' | 'info'} */ ('info'),
    text: 'Chạm vào mọi giá trị của x làm cho ít nhất một mẫu bằng 0, rồi bấm "Kiểm tra ĐKXĐ".',
  });

  /** @type {Record<number, 'nhan' | 'loai'>} */
  let decisions = $state({});
  let decideNote = $state({
    tone: /** @type {'ok' | 'warn' | 'info'} */ ('info'),
    text: 'Với từng giá trị tìm được, chọn "Nhận" nếu nó thoả mãn ĐKXĐ, "Loại" nếu nó làm một mẫu bằng 0.',
  });

  const steps = $derived(clearingTex(problem));
  const roots = $derived(problem.roots);
  const allDecided = $derived(
    roots.every((r) => decisions[r] === (isAllowed(problem, r) ? 'nhan' : 'loai')),
  );

  function newProblem() {
    seed = Math.floor(Math.random() * 1e9);
    chosen = [];
    conditionDone = false;
    conditionTries = 0;
    decisions = {};
    conditionNote = {
      tone: 'info',
      text: 'Đề mới. Chạm vào mọi giá trị của x làm cho ít nhất một mẫu bằng 0, rồi bấm "Kiểm tra ĐKXĐ".',
    };
    decideNote = {
      tone: 'info',
      text: 'Với từng giá trị tìm được, chọn "Nhận" nếu nó thoả mãn ĐKXĐ, "Loại" nếu nó làm một mẫu bằng 0.',
    };
  }

  /** @param {number} v */
  function toggle(v) {
    if (conditionDone) return;
    chosen = chosen.includes(v) ? chosen.filter((x) => x !== v) : [...chosen, v];
  }

  function checkCondition() {
    const [u, v] = excluded(problem);
    if (conditionMatches(problem, chosen)) {
      conditionDone = true;
      conditionNote = {
        tone: 'ok',
        text: `Đúng: mẫu ${factorText(u)} bằng 0 khi x = ${intText(u)}, mẫu ${factorText(v)} bằng 0 khi x = ${intText(v)}. ĐKXĐ: x ≠ ${intText(u)} và x ≠ ${intText(v)}.`,
      };
      return;
    }
    conditionTries += 1;
    const extra = chosen.filter((x) => isAllowed(problem, x));
    const missing = [u, v].filter((x) => !chosen.includes(x));
    const parts = [];
    if (extra.length > 0) {
      parts.push(
        `Với x = ${extra.map(intText).join(', x = ')} không mẫu nào bằng 0, nên không cần loại.`,
      );
    }
    if (missing.length > 0) {
      parts.push(
        missing.length === 2
          ? 'Còn thiếu cả hai giá trị: cho từng mẫu bằng 0 rồi tìm x.'
          : `Còn thiếu một giá trị: cho mẫu còn lại bằng 0 rồi tìm x.`,
      );
    }
    conditionNote = { tone: 'warn', text: parts.join(' ') };
  }

  function showCondition() {
    chosen = excluded(problem);
    checkCondition();
  }

  /**
   * @param {number} r
   * @param {'nhan' | 'loai'} choice
   */
  function decide(r, choice) {
    decisions = { ...decisions, [r]: choice };
    const right = (isAllowed(problem, r) ? 'nhan' : 'loai') === choice;
    if (!right) {
      decideNote = {
        tone: 'warn',
        text:
          choice === 'nhan'
            ? `Chưa đúng: thay x = ${intText(r)} vào các mẫu, có mẫu nào bằng 0 không?`
            : `Chưa đúng: x = ${intText(r)} có làm mẫu nào bằng 0 đâu, so lại với ĐKXĐ.`,
      };
      return;
    }
    const done = roots.every((x) => decisions[x] === (isAllowed(problem, x) ? 'nhan' : 'loai'));
    decideNote = {
      tone: 'ok',
      text: done ? `${reason(problem, r)} ${conclusion(problem)}` : reason(problem, r),
    };
  }

  /** @param {number} v */
  function chipClass(v) {
    const on = chosen.includes(v);
    if (conditionDone && on) return 'border-rose-400 bg-rose-100 text-rose-800 line-through';
    if (on) return 'border-indigo-500 bg-indigo-100 text-indigo-900';
    return 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100';
  }
</script>

<div class="space-y-4">
  <div class="rounded-lg border border-slate-200 bg-white p-3 text-center">
    <p class="mb-1 text-sm font-semibold text-slate-600">Giải phương trình</p>
    <div class="overflow-x-auto py-1">
      <Tex math={equationTex(problem)} display ariaLabel={equationText(problem)} />
    </div>
    <button type="button" class="{button.quiet} mt-2" onclick={newProblem}>Đề mới</button>
  </div>

  <section class="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
    <h3 class="font-semibold text-slate-800">Bước 1. Tìm điều kiện xác định</h3>
    <p class="text-sm text-slate-600">
      Những giá trị nào của x làm cho một mẫu bằng 0? Các giá trị đó phải bị loại.
    </p>
    <div class="flex flex-wrap gap-1.5" role="group" aria-label="Các giá trị của x">
      {#each VALUES as v (v)}
        <button
          type="button"
          class="min-h-11 min-w-11 rounded-lg border px-2 font-semibold tabular-nums {focusRing} {chipClass(
            v,
          )}"
          aria-pressed={chosen.includes(v)}
          aria-label="x = {intText(v)}"
          disabled={conditionDone}
          onclick={() => toggle(v)}>{intText(v)}</button
        >
      {/each}
    </div>
    <FeedbackNote tone={conditionNote.tone} text={conditionNote.text} />
    {#if !conditionDone}
      <div class="flex flex-wrap gap-2">
        <button type="button" class={button.primary} onclick={checkCondition}>
          Kiểm tra ĐKXĐ
        </button>
        {#if conditionTries >= 2}
          <button type="button" class={button.quiet} onclick={showCondition}>Xem ĐKXĐ</button>
        {/if}
      </div>
    {/if}
  </section>

  {#if conditionDone}
    <section class="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <h3 class="font-semibold text-slate-800">Bước 2 và 3. Khử mẫu rồi giải</h3>
      <div class="text-center">
        <Tex math={`\\text{ĐKXĐ: } ${conditionTex(problem)}`} />
      </div>
      <ol class="space-y-1 overflow-x-auto text-center" aria-label="Các bước khử mẫu">
        {#each steps as step, i (i)}
          <li>
            <Tex math={step} ariaLabel={i === 1 ? clearedText(problem) : undefined} />
          </li>
        {/each}
      </ol>
      <p class="text-sm text-slate-700">
        Phương trình tích cho hai giá trị: x = {intText(roots[0])} và x = {intText(roots[1])}.
      </p>
    </section>

    <section class="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <h3 class="font-semibold text-slate-800">Bước 4. Đối chiếu với ĐKXĐ và kết luận</h3>
      <ul class="space-y-2">
        {#each roots as r (r)}
          {@const right = decisions[r] === (isAllowed(problem, r) ? 'nhan' : 'loai')}
          <li
            class="flex flex-wrap items-center gap-2 rounded-lg border p-2 {right
              ? isAllowed(problem, r)
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-rose-300 bg-rose-50'
              : 'border-slate-200 bg-white'}"
          >
            <span
              class="min-w-20 font-semibold tabular-nums {right && !isAllowed(problem, r)
                ? 'text-rose-700 line-through'
                : right
                  ? 'text-emerald-800'
                  : 'text-slate-800'}">x = {intText(r)}</span
            >
            <button
              type="button"
              class={button.quiet}
              aria-pressed={decisions[r] === 'nhan'}
              aria-label="Nhận x = {intText(r)}"
              onclick={() => decide(r, 'nhan')}>Nhận</button
            >
            <button
              type="button"
              class={button.quiet}
              aria-pressed={decisions[r] === 'loai'}
              aria-label="Loại x = {intText(r)}"
              onclick={() => decide(r, 'loai')}>Loại</button
            >
            {#if right}
              <span class="text-sm {isAllowed(problem, r) ? 'text-emerald-800' : 'text-rose-700'}">
                {isAllowed(problem, r) ? 'Thoả mãn ĐKXĐ' : 'Vi phạm ĐKXĐ'}
              </span>
            {/if}
          </li>
        {/each}
      </ul>
      <FeedbackNote tone={decideNote.tone} text={decideNote.text} />
      {#if allDecided}
        <p class="font-semibold text-slate-800">Kết luận: {conclusion(problem)}</p>
      {/if}
    </section>
  {/if}
</div>
