<script>
  import { tick } from 'svelte';
  import ChoiceQuestion from '#lib/core/kid/choice-question.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import { tapOption } from '#lib/core/kid/quiz.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import TallyMarks from '../_shared/tally-marks.svelte';
  import { makeScene, questionsOf, strokes } from './engine.js';

  let seed = $state(1);
  /** Indices of the things already counted. */
  /** @type {number[]} */
  let counted = $state([]);
  let stage = $state(/** @type {'count' | 'ask' | 'done'} */ ('count'));
  let index = $state(0);
  /** @type {number[]} */
  let wrong = $state([]);
  let phase = $state(/** @type {import('#lib/core/kid/quiz.js').Phase} */ ('ask'));
  let message = $state('Em chạm vào từng đồ vật. Mỗi lần chạm, em ghi một vạch vào đúng hàng.');
  /** @type {ReturnType<typeof ChoiceQuestion> | undefined} */
  let question = $state();

  const scene = $derived(makeScene(seed));
  const tally = $derived(strokes(scene, counted));
  const allCounted = $derived(counted.length === scene.items.length);
  const questions = $derived(questionsOf(scene, seed));
  /** A row's number shows once its question has been answered. */
  const known = $derived(stage === 'done' ? 3 : stage === 'ask' ? Math.min(index, 3) : 0);

  /** @param {number} i */
  function toggle(i) {
    if (stage !== 'count') return;
    const row = scene.rows[scene.items[i]];
    if (counted.includes(i)) {
      counted = counted.filter((c) => c !== i);
      message = `Em bỏ một vạch ở hàng ${row.label}.`;
      return;
    }
    counted = [...counted, i];
    message =
      counted.length === scene.items.length
        ? 'Em đã đếm hết các đồ vật. Em chạm "Đọc bảng kiểm đếm" nhé.'
        : `Em ghi một vạch vào hàng ${row.label}.`;
  }

  async function startQuestions() {
    stage = 'ask';
    index = 0;
    wrong = [];
    phase = 'ask';
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
      message = 'Em đã thu thập, phân loại và kiểm đếm xong! Em viết được số của mỗi loại.';
      return;
    }
    index += 1;
    await tick();
    question?.focus();
  }

  function newGame() {
    seed += 1;
    counted = [];
    stage = 'count';
    index = 0;
    wrong = [];
    phase = 'ask';
    message = 'Đồ vật mới đây! Em chạm vào từng đồ vật để ghi vạch.';
  }
</script>

<div class="space-y-5">
  <div>
    <p class="mb-2 text-base font-semibold text-slate-600">Đồ vật lẫn lộn</p>
    <div class="flex flex-wrap gap-2 rounded-2xl bg-amber-100 p-3" role="group" aria-label="Đồ vật">
      {#each scene.items as row, i (i)}
        {@const done = counted.includes(i)}
        <button
          type="button"
          class="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition {focusRing} {done
            ? 'border-emerald-500 bg-emerald-50'
            : 'border-transparent bg-white shadow-sm hover:scale-105'}"
          aria-label="{scene.rows[row].label}, {done ? 'đã đếm' : 'chưa đếm'}"
          aria-pressed={done}
          aria-disabled={stage !== 'count'}
          onclick={() => toggle(i)}
        >
          <span class={done ? 'opacity-40' : ''}>
            <Picture name={scene.rows[row].picture} size={40} decorative />
          </span>
          {#if done}
            <span
              aria-hidden="true"
              class="absolute right-0.5 bottom-0 text-lg font-bold text-emerald-700">✓</span
            >
          {/if}
        </button>
      {/each}
    </div>
  </div>

  <table class="w-full border-collapse overflow-hidden rounded-2xl bg-white text-lg text-slate-800">
    <caption class="pb-2 text-left text-base font-semibold text-slate-600"> Bảng kiểm đếm </caption>
    <thead class="bg-slate-50 text-base font-semibold text-slate-600">
      <tr>
        <th scope="col" class="border border-slate-200 p-2 text-left">Loại</th>
        <th scope="col" class="border border-slate-200 p-2 text-left">Vạch</th>
        <th scope="col" class="border border-slate-200 p-2">Số</th>
      </tr>
    </thead>
    <tbody>
      {#each scene.rows as row, r (row.picture)}
        <tr>
          <th scope="row" class="w-14 border border-slate-200 p-2">
            <span class="flex justify-center">
              <Picture name={row.picture} size={36} />
            </span>
          </th>
          <td class="border border-slate-200 p-2">
            <TallyMarks count={tally[r]} settled={r < known} />
          </td>
          <td class="w-14 border border-slate-200 p-2 text-center text-2xl font-bold tabular-nums">
            {r < known ? row.count : '?'}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

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
      class="rounded-2xl px-4 py-3 text-xl font-semibold {stage === 'done' || allCounted
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if stage === 'done'}<span aria-hidden="true">⭐ </span>{/if}{message}
    </p>
  {/if}

  <div class="flex flex-wrap gap-3">
    {#if stage === 'count' && allCounted}
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={startQuestions}>
        Đọc bảng kiểm đếm
      </button>
    {/if}
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newGame}>
      Đồ vật khác
    </button>
  </div>
</div>
