<script>
  import { tick } from 'svelte';
  import ChoiceQuestion from '#lib/core/kid/choice-question.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import { tapOption } from '#lib/core/kid/quiz.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import NumberTable from '../_shared/number-table.svelte';
  import { makeScene, questionsOf, sortStep, tableCounts } from './engine.js';

  let seed = $state(1);
  /** How many things of the heap are already sorted. */
  let done = $state(0);
  /** The group last tapped for the current thing, kept to show a wrong tap. */
  /** @type {number | null} */
  let missed = $state(null);
  /** The column that just grew, lit for a moment. */
  /** @type {number | null} */
  let grown = $state(null);
  let stage = $state(/** @type {'sort' | 'ask' | 'done'} */ ('sort'));
  let index = $state(0);
  /** @type {number[]} */
  let wrong = $state([]);
  let phase = $state(/** @type {import('#lib/core/kid/quiz.js').Phase} */ ('ask'));
  let message = $state('Em nhìn đồ vật ở giữa, rồi chạm vào nhóm của nó.');
  /** @type {ReturnType<typeof ChoiceQuestion> | undefined} */
  let question = $state();
  /** @type {HTMLParagraphElement | undefined} */
  let note = $state();

  const scene = $derived(makeScene(seed));
  const counts = $derived(tableCounts(scene, done));
  const allSorted = $derived(done === scene.items.length);
  const current = $derived(allSorted ? null : scene.rows[scene.items[done]]);
  const questions = $derived(questionsOf(scene, seed));
  const columns = $derived(
    scene.rows.map((r, i) => ({
      label: r.label,
      symbol: { picture: r.picture },
      count: counts[i],
      highlight: grown === i,
    })),
  );

  /** @param {number} group */
  function sortInto(group) {
    if (stage !== 'sort' || allSorted) return;
    const step = sortStep(scene, done, group);
    message = step.message;
    if (!step.ok) {
      missed = group;
      grown = null;
      return;
    }
    missed = null;
    grown = group;
    done += 1;
  }

  async function startQuestions() {
    stage = 'ask';
    index = 0;
    wrong = [];
    phase = 'ask';
    grown = null;
    await tick();
    question?.focus();
  }

  /** @param {number} option */
  function choose(option) {
    const step = tapOption({ phase, wrong }, option, questions[index].answer);
    phase = step.phase;
    wrong = step.wrong;
  }

  async function next() {
    wrong = [];
    phase = 'ask';
    if (index + 1 >= questions.length) {
      stage = 'done';
      message = 'Giỏi lắm! Em đã thu thập, phân loại, ghi chép số liệu và đọc được bảng số liệu.';
      await tick();
      note?.focus();
      return;
    }
    index += 1;
    await tick();
    question?.focus();
  }

  function newGame() {
    seed += 1;
    done = 0;
    missed = null;
    grown = null;
    stage = 'sort';
    index = 0;
    wrong = [];
    phase = 'ask';
    message = 'Đồ vật mới đây! Em chạm vào nhóm của từng đồ vật.';
  }
</script>

<div class="space-y-5">
  <p class="text-xl font-bold text-slate-800">{scene.theme.title}</p>

  {#if stage === 'sort'}
    <div class="flex items-center gap-4 rounded-2xl bg-amber-100 p-4">
      <div
        class="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border-4 border-amber-500 bg-white"
      >
        {#if current}
          <Picture name={current.picture} size={72} />
        {:else}
          <span class="text-4xl" aria-hidden="true">✓</span>
        {/if}
      </div>
      <p class="text-lg font-semibold text-slate-800">
        {#if current}
          Đồ vật thứ {done + 1} trong {scene.items.length}.
          <span class="block text-base font-normal text-slate-600"
            >Còn {scene.items.length - done} đồ vật chưa xếp.</span
          >
        {:else}
          Đã xếp hết {scene.items.length} đồ vật.
        {/if}
      </p>
    </div>

    <div class="grid grid-cols-3 gap-3" role="group" aria-label="Các nhóm">
      {#each scene.rows as row, i (row.picture)}
        <button
          type="button"
          class="flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl border-4 bg-white p-2 text-base font-bold text-slate-800 transition hover:border-indigo-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 {focusRing} {missed ===
          i
            ? 'border-rose-400 bg-rose-50'
            : 'border-slate-300'}"
          aria-label="Xếp vào nhóm {row.label}"
          aria-disabled={allSorted}
          onclick={() => sortInto(i)}
        >
          <Picture name={row.picture} size={44} decorative />
          <span class="text-center leading-tight">{row.label}</span>
        </button>
      {/each}
    </div>
  {/if}

  <NumberTable
    caption="Bảng số liệu: {scene.theme.title}"
    nameHead={scene.theme.head}
    countHead="Số lượng"
    {columns}
  />

  {#if stage === 'ask'}
    <ChoiceQuestion
      bind:this={question}
      q={questions[index]}
      {phase}
      {wrong}
      onchoose={choose}
      onnext={next}
      nextLabel={index + 1 < questions.length ? 'Câu tiếp' : 'Xem kết quả'}
    />
  {:else}
    <p
      bind:this={note}
      tabindex="-1"
      class="rounded-2xl px-4 py-3 text-xl font-semibold outline-none {stage === 'done' || allSorted
        ? 'bg-emerald-100 text-emerald-900'
        : missed !== null
          ? 'bg-amber-100 text-amber-900'
          : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if stage === 'done'}<span aria-hidden="true">⭐ </span>{/if}{message}
    </p>
  {/if}

  <div class="flex flex-wrap gap-3">
    {#if stage === 'sort' && allSorted}
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={startQuestions}>
        Đọc bảng số liệu
      </button>
    {/if}
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newGame}>
      Đồ vật khác
    </button>
  </div>
</div>
