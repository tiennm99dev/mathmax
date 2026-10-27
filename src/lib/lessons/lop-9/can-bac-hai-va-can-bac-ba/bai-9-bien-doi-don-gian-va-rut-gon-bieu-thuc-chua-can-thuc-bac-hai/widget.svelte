<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { PROBLEMS, RULES, judge, ruleOf, valuesText } from './engine.js';

  let pick = $state(0);
  let done = $state(0);
  let mistakes = $state(0);
  /** @type {{ ok: boolean, text: string } | null} */
  let verdict = $state(null);

  const problem = $derived(PROBLEMS[pick]);
  const finished = $derived(done >= problem.steps.length);
  // A comparison carries two numbers and moves on by arrows, not by equal signs.
  const lead = $derived(problem.values.length > 1 ? '\\rightarrow' : '=');

  function restart() {
    done = 0;
    mistakes = 0;
    verdict = null;
  }

  /** @param {import('./engine.js').RuleId} id */
  function choose(id) {
    if (finished) return;
    verdict = judge(problem, done, id);
    if (verdict.ok) done += 1;
    else mistakes += 1;
  }

  const options = PROBLEMS.map((p, i) => ({ value: i, label: `${i + 1}. ${p.title}` }));
</script>

<div class="space-y-4">
  <SegmentedControl label="Chọn bài" bind:value={pick} {options} onchange={restart} />

  <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-3">
    <p class="text-sm font-semibold text-slate-700">
      {problem.task}{problem.at ? ` (kiểm tra bằng số với ${problem.at})` : ''}:
    </p>
    <ol class="space-y-1" aria-label="Các bước biến đổi">
      <li
        class="flex flex-wrap items-center justify-between gap-2 rounded-md bg-slate-50 px-2 py-1"
      >
        <span class="min-w-0 overflow-x-auto"><Tex math={problem.tex} /></span>
        <span class="text-xs text-slate-500 tabular-nums">{valuesText(problem.values)}</span>
      </li>
      {#each problem.steps.slice(0, done) as step, i (i)}
        <li class="flex flex-wrap items-center justify-between gap-2 rounded-md px-2 py-1">
          <span class="min-w-0 overflow-x-auto"><Tex math={`${lead} ${step.tex}`} /></span>
          <span class="text-xs text-slate-500">
            {ruleOf(step.rule).label} · <span class="tabular-nums">{valuesText(step.values)}</span>
          </span>
        </li>
      {/each}
    </ol>
  </div>

  {#if !finished}
    <fieldset class="min-w-0">
      <legend class="mb-2 text-sm font-semibold text-slate-700">
        Bước {done + 1}: chọn quy tắc dùng tiếp theo
      </legend>
      <div class="grid gap-2 sm:grid-cols-2">
        {#each RULES as rule (rule.id)}
          <button
            type="button"
            class="{button.quiet} justify-start text-left text-sm"
            onclick={() => choose(rule.id)}
          >
            {rule.label}
          </button>
        {/each}
      </div>
    </fieldset>
  {/if}

  {#if verdict}
    <FeedbackNote tone={verdict.ok ? 'ok' : 'warn'} text={verdict.text} />
  {:else}
    <FeedbackNote tone="info" text="Chọn quy tắc biến đổi đầu tiên cho biểu thức trên." />
  {/if}

  {#if finished}
    <div class="flex flex-wrap items-center gap-3">
      <p class="text-sm text-slate-700">
        Hoàn thành {problem.steps.length} bước{mistakes
          ? `, chọn nhầm ${mistakes} lần`
          : ', không chọn nhầm lần nào'}.
      </p>
      <button type="button" class={button.secondary} onclick={restart}>Làm lại</button>
      {#if pick < PROBLEMS.length - 1}
        <button
          type="button"
          class={button.primary}
          onclick={() => {
            pick += 1;
            restart();
          }}>Bài tiếp theo</button
        >
      {/if}
    </div>
  {/if}
</div>
