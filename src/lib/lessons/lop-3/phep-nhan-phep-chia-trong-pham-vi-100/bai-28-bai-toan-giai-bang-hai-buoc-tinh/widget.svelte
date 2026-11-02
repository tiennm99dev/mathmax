<script>
  import { tick } from 'svelte';
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import KidNote from '../_shared/kid-note.svelte';
  import TwoStepDiagram from '../_shared/two-step-diagram.svelte';
  import { SCENES, answerLine, makeStory, solutionSteps } from '../_shared/two-step.js';
  import { KIND_LABELS, buildRound, stepOf } from './engine.js';

  const START_NOTE = 'Em đọc đề bài và nhìn sơ đồ. Số nào đã biết? Số nào còn thiếu?';

  let mode = $state(/** @type {'steps' | 'quiz'} */ ('steps'));
  let index = $state(0);
  let stage = $state(/** @type {import('./engine.js').Stage} */ ('need'));
  /** @type {number[]} */
  let wrong = $state([]);
  let note = $state(
    /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */ ({
      tone: 'info',
      text: START_NOTE,
    }),
  );
  /** @type {HTMLHeadingElement | undefined} */
  let heading = $state();

  const story = $derived(makeStory(SCENES[index]));
  const step = $derived(stepOf(story, stage));
  const known = $derived(stage === 'total' || stage === 'done');
  const solved = $derived(stage === 'done');
  const shownLines = $derived(solutionSteps(story).slice(0, solved ? 2 : known ? 1 : 0));
  const long = $derived(stage === 'need');

  /** @param {number} i */
  async function choose(i) {
    if (!step || wrong.includes(i)) return;
    if (i !== step.answer) {
      wrong = [...wrong, i];
      note = { tone: 'warn', text: step.slip };
      return;
    }
    note = { tone: 'ok', text: step.right };
    stage = step.next;
    wrong = [];
    await tick();
    heading?.focus();
  }

  async function next() {
    index = (index + 1) % SCENES.length;
    stage = 'need';
    wrong = [];
    note = { tone: 'info', text: START_NOTE };
    await tick();
    heading?.focus();
  }

  /** @param {number} i */
  function optionClass(i) {
    const shape = long ? 'min-h-16 px-4 text-left text-lg' : 'min-h-16 min-w-16 px-4 text-2xl';
    const base = `${shape} rounded-2xl border-4 font-bold tabular-nums transition ${focusRing}`;
    return wrong.includes(i)
      ? `${base} border-rose-400 bg-rose-50 text-rose-700 line-through`
      : `${base} border-slate-300 bg-white text-slate-800 hover:border-indigo-400`;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'steps', label: 'Giải từng bước' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'steps'}
    <p class="text-xl font-semibold text-slate-800">{story.text}</p>

    <TwoStepDiagram {story} {known} done={solved} />

    {#if shownLines.length > 0}
      <div class="rounded-2xl border-2 border-slate-200 bg-white p-3 text-lg">
        <p class="font-bold text-slate-700">Bài giải</p>
        {#each shownLines as line, i (i)}
          <p class="mt-1 text-slate-700">{line.title}</p>
          <p class="text-center text-xl font-bold tabular-nums text-slate-900">{line.line}</p>
        {/each}
        {#if solved}
          <p class="mt-1 text-right font-bold text-emerald-800">{answerLine(story)}</p>
        {/if}
      </div>
    {/if}

    <KidNote tone={note.tone} text={note.text} />

    {#if step}
      <h3 bind:this={heading} tabindex="-1" class="text-2xl font-bold text-slate-900 outline-none">
        {step.ask}
      </h3>
      <div
        role="group"
        aria-label="Chọn đáp án"
        class={long ? 'grid gap-3' : 'flex flex-wrap gap-3'}
      >
        {#each step.options as option, i (option)}
          <button
            type="button"
            class={optionClass(i)}
            aria-label={step.optionLabels?.[i] ?? option}
            aria-disabled={wrong.includes(i)}
            onclick={() => choose(i)}>{option}</button
          >
        {/each}
      </div>
    {:else}
      <h3 bind:this={heading} tabindex="-1" class="text-2xl font-bold text-slate-900 outline-none">
        Em đã giải xong bài toán bằng hai bước tính.
      </h3>
    {/if}

    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={next}
        >Bài khác</button
      >
    </div>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em biết tìm số còn thiếu trước, rồi mới trả lời câu hỏi của bài toán."
      listOptions={(q) => q.kind === 'need'}
    >
      {#snippet visual(q, settled)}
        {#if q.visual}
          <TwoStepDiagram story={q.visual} known={settled} done={settled} />
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
