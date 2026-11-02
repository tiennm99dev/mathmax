<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import KidNote from '../_shared/kid-note.svelte';
  import PaperStrip from '../_shared/paper-strip.svelte';
  import {
    FIRST_TASK,
    KIND_LABELS,
    buildRound,
    copyMessage,
    makeTask,
    maxCopies,
    stripScale,
    sumText,
  } from './engine.js';

  let mode = $state(/** @type {'strip' | 'quiz'} */ ('strip'));
  let task = $state(FIRST_TASK);
  let copies = $state(1);

  const scale = $derived(stripScale(task));
  const solved = $derived(copies === task.times);
  const over = $derived(copies > task.times);

  /** @param {number} delta */
  function change(delta) {
    copies = Math.max(1, Math.min(maxCopies(task), copies + delta));
  }

  function next() {
    task = makeTask(Math.random, task);
    copies = 1;
  }

  /**
   * @param {number} n
   * @param {number} count
   * @param {number} right copies drawn in the plain colour
   */
  function copyParts(n, count, right) {
    return Array.from({ length: count }, (_, i) => ({
      size: n,
      tone: /** @type {import('../_shared/strip.js').StripTone} */ (i < right ? 'copy' : 'extra'),
      text: String(n),
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
      Gấp {task.n} lên {task.times} lần
    </p>

    <div class="space-y-3">
      <div>
        <p class="mb-1 text-lg font-semibold text-slate-700">Băng ban đầu</p>
        <PaperStrip
          label="Băng ban đầu dài {task.n}"
          {scale}
          parts={[{ size: task.n, tone: 'main', text: String(task.n) }]}
        />
      </div>
      <div>
        <p class="mb-1 text-lg font-semibold text-slate-700">Em nhân bản: {copies} băng</p>
        <PaperStrip
          label="{copies} băng, mỗi băng dài {task.n}"
          {scale}
          parts={copyParts(task.n, copies, task.times)}
        />
      </div>
      <p class="text-center text-2xl font-bold tabular-nums text-slate-700">
        {sumText(task.n, copies)}
      </p>
      {#if solved}
        <div>
          <p class="mb-1 text-lg font-semibold text-slate-700">
            Nếu chỉ thêm {task.times} đơn vị: {task.n} + {task.times} = {task.n + task.times}
          </p>
          <PaperStrip
            label="Băng dài {task.n} thêm {task.times} đơn vị"
            {scale}
            parts={[
              { size: task.n, tone: 'main', text: String(task.n) },
              { size: task.times, tone: 'plus', text: String(task.times) },
            ]}
          />
        </div>
      {/if}
    </div>

    <KidNote tone={solved ? 'ok' : over ? 'warn' : 'info'} text={copyMessage(task, copies)} />

    <div class="flex flex-wrap justify-center gap-3">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={() => change(1)}
        >Nhân bản thêm một băng</button
      >
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={() => change(-1)}
        >Bớt một băng</button
      >
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={next}
        >Bài khác</button
      >
    </div>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em phân biệt được gấp lên một số lần và thêm một số đơn vị."
    >
      {#snippet visual(q)}
        {#if q.visual}
          {@const { n, times } = q.visual}
          <div class="space-y-2">
            <PaperStrip
              label="Băng trên dài {n}"
              scale={n * times}
              parts={[{ size: n, tone: 'main', text: String(n) }]}
            />
            <PaperStrip
              label="Băng dưới gồm {times} băng như băng trên"
              scale={n * times}
              parts={copyParts(n, times, times)}
            />
          </div>
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
