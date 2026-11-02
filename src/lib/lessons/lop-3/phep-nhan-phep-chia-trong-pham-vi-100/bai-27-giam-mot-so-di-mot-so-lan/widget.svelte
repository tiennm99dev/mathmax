<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import KidNote from '../_shared/kid-note.svelte';
  import PaperStrip from '../_shared/paper-strip.svelte';
  import {
    FIRST_TASK,
    KIND_LABELS,
    MAX_PARTS,
    buildRound,
    cutMessage,
    makeTask,
    pieceText,
  } from './engine.js';

  let mode = $state(/** @type {'strip' | 'quiz'} */ ('strip'));
  let task = $state(FIRST_TASK);
  let parts = $state(1);

  const solved = $derived(parts === task.times);
  const over = $derived(parts > task.times);

  /** @param {number} delta */
  function change(delta) {
    parts = Math.max(1, Math.min(MAX_PARTS, parts + delta));
  }

  function next() {
    task = makeTask(Math.random, task);
    parts = 1;
  }

  /**
   * The whole strip in equal pieces; once the cut is right, only the first stays.
   * @param {number} n
   * @param {number} count
   * @param {boolean} kept
   */
  function pieces(n, count, kept) {
    const text = pieceText(n, count);
    return Array.from({ length: count }, (_, i) => ({
      size: n / count,
      tone: /** @type {import('../_shared/strip.js').StripTone} */ (
        !kept || i === 0 ? 'copy' : 'faded'
      ),
      text,
    }));
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'strip', label: 'Băng giấy' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'strip'}
    <p class="text-center text-3xl font-bold text-slate-800">
      Giảm {task.n} đi {task.times} lần
    </p>

    <div class="space-y-3">
      <div>
        <p class="mb-1 text-lg font-semibold text-slate-700">Băng ban đầu dài {task.n}</p>
        <PaperStrip
          label="Băng dài {task.n}, cắt thành {parts} phần bằng nhau"
          scale={task.n}
          parts={pieces(task.n, parts, solved)}
        />
      </div>
      {#if solved}
        <div>
          <p class="mb-1 text-lg font-semibold text-slate-700">Sau khi giảm</p>
          <PaperStrip
            label="Băng còn lại dài {task.n / task.times}"
            scale={task.n}
            parts={[{ size: task.n / task.times, tone: 'main', text: String(task.n / task.times) }]}
          />
        </div>
        <p class="text-center text-lg font-semibold text-slate-700">
          Nếu chỉ bớt đi {task.times} đơn vị: {task.n} − {task.times} = {task.n - task.times}
        </p>
      {/if}
    </div>

    <KidNote tone={solved ? 'ok' : over ? 'warn' : 'info'} text={cutMessage(task, parts)} />

    <div class="flex flex-wrap justify-center gap-3">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={() => change(1)}
        >Cắt thêm một phần</button
      >
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={() => change(-1)}
        >Bớt một phần</button
      >
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={next}
        >Bài khác</button
      >
    </div>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em phân biệt được giảm đi một số lần và bớt đi một số đơn vị."
    >
      {#snippet visual(q)}
        {#if q.visual}
          <PaperStrip
            label="Băng dài {q.visual.n} được cắt thành {q.visual
              .times} phần bằng nhau, giữ lại 1 phần"
            scale={q.visual.n}
            parts={pieces(q.visual.n, q.visual.times, true).map((p) => ({ ...p, text: '' }))}
          />
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
