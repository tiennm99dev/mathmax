<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { PROBLEMS, judge, piecesOf, shownOrder, totalOf, widest } from './engine.js';

  const LABEL_W = 92;
  const BAR_W = 200;
  const ROW_H = 44;
  const W = 360;

  let id = $state(PROBLEMS[0].id);
  let done = $state(0);
  let note = $state(/** @type {{ tone: 'ok' | 'warn', text: string } | null} */ (null));
  /** @type {HTMLDivElement | undefined} */
  let choices = $state();

  const problem = $derived(PROBLEMS.find((p) => p.id === id) ?? PROBLEMS[0]);
  const pieces = $derived(piecesOf(problem));
  const scale = $derived(BAR_W / widest(problem));
  const step = $derived(problem.steps[done] ?? null);
  const order = $derived(step ? shownOrder(done, step.options.length) : []);
  /** Which bars are known: the given ones, and those found so far. */
  const known = $derived(
    problem.bars.map(
      (bar, i) => bar.from === undefined || problem.steps.slice(0, done).some((s) => s.finds === i),
    ),
  );
  const totalKnown = $derived(done >= problem.steps.length);
  const H = $derived(problem.bars.length * ROW_H + 40);
  const diagramText = $derived(
    problem.bars
      .map((bar, i) => `${bar.label}: ${known[i] ? fmt(bar.value) : 'chưa biết'}`)
      .join('; ') +
      `. Tất cả: ${totalKnown ? fmt(totalOf(problem)) : 'chưa biết'} ${problem.unit}.`,
  );

  /** @param {string | number} next */
  function choose(next) {
    id = String(next);
    done = 0;
    note = null;
  }

  /** @param {number} index */
  async function pick(index) {
    note = judge(problem, done, index);
    if (index === 0) {
      done += 1;
      await tick();
      choices?.querySelector('button')?.focus();
    }
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn bài toán"
    hideLabel
    value={id}
    options={PROBLEMS.map((p) => ({ value: p.id, label: p.title }))}
    onchange={choose}
  />

  <p class="text-lg leading-relaxed text-slate-800">{problem.text}</p>

  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block h-auto w-full max-w-md"
    role="img"
    aria-label="Sơ đồ đoạn thẳng. {diagramText}"
  >
    {#each problem.bars as bar, i (bar.label)}
      {@const y = 14 + i * ROW_H}
      <text
        x={LABEL_W - 6}
        y={y + 17}
        text-anchor="end"
        class="fill-slate-800 text-[15px] font-semibold">{bar.label}</text
      >
      {#each pieces[i] as piece, j (j)}
        {@const x = LABEL_W + piece.start * scale}
        {@const w = (piece.end - piece.start) * scale}
        <rect
          {x}
          {y}
          width={w}
          height="22"
          rx="3"
          class={piece.kind === 'solid'
            ? 'fill-sky-300 stroke-sky-700'
            : piece.kind === 'extra'
              ? 'fill-amber-300 stroke-amber-700'
              : 'fill-none stroke-slate-500'}
          stroke-width="1.5"
          stroke-dasharray={piece.kind === 'missing' ? '4 3' : undefined}
        />
        {#if piece.note}
          <text x={x + w / 2} y={y - 3} text-anchor="middle" class="fill-slate-700 text-[13px]"
            >{piece.note}</text
          >
        {/if}
      {/each}
      {@const end = Math.max(...pieces[i].map((p) => p.end))}
      <text
        x={LABEL_W + end * scale + 6}
        y={y + 17}
        class="text-[15px] font-bold {known[i] ? 'fill-indigo-700' : 'fill-rose-600'}"
        >{known[i] ? fmt(bar.value) : '?'}</text
      >
    {/each}
    <text
      x={LABEL_W - 6}
      y={H - 10}
      text-anchor="end"
      class="fill-slate-800 text-[15px] font-semibold">Tất cả</text
    >
    <text
      x={LABEL_W}
      y={H - 10}
      class="text-[15px] font-bold {totalKnown ? 'fill-indigo-700' : 'fill-rose-600'}"
      >{totalKnown ? fmt(totalOf(problem)) : '?'} {problem.unit}</text
    >
  </svg>

  {#if done > 0}
    <ol class="space-y-2 text-lg font-semibold">
      {#each problem.steps.slice(0, done) as s, i (i)}
        <li class="rounded-xl bg-indigo-50 px-3 py-2 text-indigo-950">
          {s.ask.split(':')[0]}: {s.options[0]} ({problem.unit})
        </li>
      {/each}
    </ol>
  {/if}

  {#if step}
    <p class="text-xl font-semibold text-slate-800">{step.ask}</p>
    <div class="grid gap-2" role="group" aria-label="Chọn phép tính đúng" bind:this={choices}>
      {#each order as k (k)}
        <button
          type="button"
          class="min-h-14 text-xl tabular-nums {button.quiet}"
          onclick={() => pick(k)}>{step.options[k]}</button
        >
      {/each}
    </div>
  {/if}

  <div aria-live="polite">
    {#if note || !step}
      <p
        class="rounded-2xl px-4 py-3 text-xl font-semibold {!step || note?.tone === 'ok'
          ? 'bg-emerald-100 text-emerald-900'
          : 'bg-amber-100 text-amber-900'}"
      >
        {#if !step}<span aria-hidden="true">⭐ </span>{problem.answer}{:else}{note?.text}{/if}
      </p>
    {/if}
  </div>

  {#if !step}
    <div bind:this={choices}>
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={() => choose(id)}
        >Giải lại</button
      >
    </div>
  {/if}
</div>
