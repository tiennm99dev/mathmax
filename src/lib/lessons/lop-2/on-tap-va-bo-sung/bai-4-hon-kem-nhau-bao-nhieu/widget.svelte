<script>
  import { rng } from '#lib/core/drill.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    MAX,
    MIN,
    answerOptions,
    compareRows,
    explain,
    extraBlocks,
    newRows,
    question,
  } from './engine.js';

  // A fixed seed so the prerendered page and the browser agree.
  const rand = rng(4);

  let top = $state(9);
  let bottom = $state(6);
  /** Whether the blocks are paired and the extra part is tinted and counted. */
  let paired = $state(false);
  /** @type {number[]} */
  let wrong = $state([]);
  let solved = $state(false);
  let choice = $state(answerOptions(rng(4), 9, 6));

  const cmp = $derived(compareRows(top, bottom));
  const extraTop = $derived(extraBlocks(top, bottom));
  const extraBottom = $derived(extraBlocks(bottom, top));

  const message = $derived.by(() => {
    if (solved) return `Đúng rồi! ${explain(top, bottom)}`;
    if (wrong.length > 1) return `Em xem nhé: ${explain(top, bottom)}`;
    if (wrong.length === 1) {
      if (paired && cmp.diff === 0) {
        return 'Chưa đúng. Hai hàng có số khối bằng nhau, không còn khối nào thừa.';
      }
      return paired
        ? 'Chưa đúng. Em đếm các khối màu cam: đó là phần hơn.'
        : 'Chưa đúng. Em chạm "Ghép cặp" để thấy phần hơn rồi đếm nhé.';
    }
    if (paired) {
      return cmp.diff === 0
        ? 'Mỗi khối hàng trên đều có bạn ở hàng dưới. Không còn khối nào thừa.'
        : `Các khối đã ghép cặp. Còn ${cmp.more === 'top' ? 'hàng trên' : 'hàng dưới'} có các khối màu cam chưa có bạn.`;
    }
    return 'Em so sánh hai hàng khối. Chạm "Ghép cặp" để tô phần hơn.';
  });

  function refresh() {
    paired = false;
    wrong = [];
    solved = false;
    choice = answerOptions(rand, top, bottom);
  }

  /** @param {'top' | 'bottom'} row @param {number} delta */
  function bump(row, delta) {
    if (row === 'top') top = Math.max(MIN, Math.min(MAX, top + delta));
    else bottom = Math.max(MIN, Math.min(MAX, bottom + delta));
    refresh();
  }

  function newTask() {
    const next = newRows(rand, { top, bottom });
    top = next.top;
    bottom = next.bottom;
    refresh();
  }

  /** @param {number} i */
  function pickOption(i) {
    if (solved || wrong.includes(i) || wrong.length > 1) return;
    if (i === choice.answer) {
      solved = true;
      paired = true;
    } else {
      wrong = [...wrong, i];
      if (wrong.length > 1) paired = true;
    }
  }

  const stepBtn = `h-12 w-12 rounded-xl border-2 border-slate-300 bg-white text-2xl font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 ${focusRing}`;
</script>

{#snippet row(
  /** @type {'top' | 'bottom'} */ which,
  /** @type {number} */ n,
  /** @type {number[]} */ extra,
)}
  {@const name = which === 'top' ? 'Hàng trên' : 'Hàng dưới'}
  <div class="space-y-1">
    <div class="flex items-center gap-2" role="group" aria-label="{name}: {n} khối">
      <span class="w-24 text-lg font-semibold text-slate-700">{name}</span>
      <button
        type="button"
        class={stepBtn}
        disabled={n <= MIN}
        aria-label="Bớt một khối ở {name.toLowerCase()}"
        onclick={() => bump(which, -1)}>−</button
      >
      <span class="w-10 text-center text-3xl font-bold tabular-nums" aria-live="polite">{n}</span>
      <button
        type="button"
        class={stepBtn}
        disabled={n >= MAX}
        aria-label="Thêm một khối ở {name.toLowerCase()}"
        onclick={() => bump(which, 1)}>+</button
      >
    </div>
    <div class="flex h-7 gap-[3px]" aria-hidden="true">
      {#each { length: n } as _, i (i)}
        {@const isExtra = paired && extra.includes(i)}
        <span
          class="flex h-7 w-4 shrink-0 items-center justify-center rounded-sm border-2 text-xs font-bold {isExtra
            ? 'border-orange-600 bg-orange-400 text-white'
            : which === 'top'
              ? 'border-sky-700 bg-sky-400'
              : 'border-violet-700 bg-violet-400'} {paired && !isExtra ? 'opacity-60' : ''}"
          >{isExtra ? extra.indexOf(i) + 1 : ''}</span
        >
      {/each}
    </div>
  </div>
{/snippet}

<div class="space-y-4">
  <div class="space-y-1 overflow-x-auto rounded-2xl bg-amber-50 p-3">
    {@render row('top', top, extraTop)}
    <div class="flex h-4 gap-[3px] pl-0" aria-hidden="true">
      {#if paired}
        {#each { length: Math.min(top, bottom) } as _, i (i)}
          <span class="flex w-4 shrink-0 justify-center"
            ><span class="h-4 w-0.5 bg-slate-500"></span></span
          >
        {/each}
      {/if}
    </div>
    {@render row('bottom', bottom, extraBottom)}
  </div>

  <p class="sr-only">
    Hàng trên có {top} khối, hàng dưới có {bottom} khối.{paired && cmp.diff > 0
      ? ` Phần hơn có ${cmp.diff} khối được tô màu cam.`
      : ''}
  </p>

  <button
    type="button"
    class="min-h-12 text-lg {button.primary}"
    disabled={paired}
    onclick={() => (paired = true)}>Ghép cặp và tô phần hơn</button
  >

  <p class="text-xl font-semibold text-slate-800">{question(top, bottom)}</p>
  <div role="group" aria-label="Chọn số khối" class="flex flex-wrap gap-3">
    {#each choice.options as v, i (v)}
      <button
        type="button"
        class="h-16 min-w-16 rounded-2xl border-4 px-3 text-3xl font-bold tabular-nums transition {focusRing} {solved &&
        i === choice.answer
          ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
          : wrong.includes(i)
            ? 'border-rose-400 bg-rose-50 text-rose-700 line-through'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
        aria-disabled={wrong.includes(i) || solved}
        onclick={() => pickOption(i)}>{v}</button
      >
    {/each}
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {solved
      ? 'bg-emerald-100 text-emerald-900'
      : wrong.length > 0
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if solved}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newTask}>
    Đề khác
  </button>
</div>
