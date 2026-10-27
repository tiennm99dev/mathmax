<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { formatNumber, texNumber } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    PROBLEMS,
    bank,
    cellKey,
    isComplete,
    placeTile,
    rowEquation,
    rowTex,
    solve,
  } from './engine.js';

  let problemId = $state(PROBLEMS[0].id);
  const problem = $derived(PROBLEMS.find((p) => p.id === problemId) ?? PROBLEMS[0]);

  /** @type {import('./engine.js').Placements} */
  let placements = $state({});
  /** @type {string | null} */
  let selected = $state(null);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  let feedback = $state({
    tone: 'info',
    text: 'Chọn một thẻ biểu thức (hoặc kéo nó), rồi chọn ô của bảng để đặt vào.',
  });

  const pool = $derived(bank(problem, placements));
  const done = $derived(isComplete(problem, placements));
  const sol = $derived(solve(problem));
  const filled = $derived(Object.keys(placements).length);
  const systemTex = $derived(
    `\\begin{cases} ${rowTex(problem, 0)} \\\\ ${rowTex(problem, 1)} \\end{cases}`,
  );
  const solutionTex = $derived(
    `x = ${texNumber(formatNumber(sol.x))},\\; y = ${texNumber(formatNumber(sol.y))}`,
  );

  /** @param {string} id */
  function choose(id) {
    problemId = id;
    placements = {};
    selected = null;
    feedback = {
      tone: 'info',
      text: 'Bài toán mới. Chọn một thẻ biểu thức, rồi chọn ô của bảng để đặt vào.',
    };
  }

  /** @param {string} tile */
  function pick(tile) {
    selected = selected === tile ? null : tile;
    if (selected) feedback = { tone: 'info', text: `Đã chọn thẻ "${tile}". Chọn ô để đặt thẻ.` };
  }

  /**
   * @param {number} row
   * @param {number} col
   * @param {string | null} tile
   */
  function drop(row, col, tile) {
    if (placements[cellKey(row, col)] !== undefined) return;
    if (!tile) {
      feedback = { tone: 'info', text: 'Hãy chọn một thẻ biểu thức trước.' };
      return;
    }
    const result = placeTile(problem, placements, row, col, tile);
    placements = result.placements;
    selected = null;
    feedback = { tone: result.ok ? 'ok' : 'warn', text: result.message };
    if (isComplete(problem, result.placements)) {
      feedback = {
        tone: 'ok',
        text: 'Bảng đã đủ. Mỗi hàng cho một phương trình; xem hệ và lời giải bên dưới.',
      };
    }
  }

  /**
   * @param {DragEvent} e
   * @param {string} tile
   */
  function dragStart(e, tile) {
    selected = tile;
    e.dataTransfer?.setData('text/plain', tile);
  }

  /**
   * @param {DragEvent} e
   * @param {number} row
   * @param {number} col
   */
  function dropOn(e, row, col) {
    e.preventDefault();
    drop(row, col, e.dataTransfer?.getData('text/plain') || selected);
  }

  function reset() {
    choose(problemId);
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Bài toán"
    value={problemId}
    options={PROBLEMS.map((p) => ({ value: p.id, label: p.label }))}
    onchange={(v) => choose(String(v))}
  />

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800">
    <p>{problem.story}</p>
    <p class="mt-2 font-semibold">{problem.unknowns}</p>
    <p class="text-slate-600">Điều kiện: {problem.condition}</p>
  </div>

  <div>
    <p class="mb-2 text-sm font-semibold text-slate-700">Thẻ biểu thức</p>
    <div class="flex flex-wrap gap-2" role="group" aria-label="Thẻ biểu thức chưa đặt">
      {#each pool as tile (tile)}
        <button
          type="button"
          draggable="true"
          class="min-h-11 min-w-12 rounded-lg border px-3 py-2 font-semibold tabular-nums {focusRing} {selected ===
          tile
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'}"
          aria-pressed={selected === tile}
          onclick={() => pick(tile)}
          ondragstart={(e) => dragStart(e, tile)}
        >
          {tile}
        </button>
      {/each}
      {#if pool.length === 0}
        <span class="text-sm text-slate-500">Đã dùng hết thẻ.</span>
      {/if}
    </div>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full table-fixed border-collapse text-sm">
      <caption class="sr-only"
        >Bảng dữ kiện: mỗi hàng là một phương trình, ô 1 cộng ô 2 bằng ô 3</caption
      >
      <thead>
        <tr>
          <th class="w-1/4 border border-slate-200 bg-slate-100 p-1"></th>
          {#each problem.cols as col (col)}
            <th scope="col" class="border border-slate-200 bg-slate-100 p-1 font-semibold">{col}</th
            >
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each problem.rows as row, r (row.label)}
          <tr>
            <th scope="row" class="border border-slate-200 bg-slate-50 p-1 text-left font-semibold">
              {row.label}
            </th>
            {#each row.cells as _cell, c (c)}
              {@const value = placements[cellKey(r, c)]}
              <td class="border border-slate-200 p-1">
                <button
                  type="button"
                  class="min-h-11 w-full rounded-md border-2 border-dashed px-1 font-semibold tabular-nums {focusRing} {value
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                    : 'border-slate-300 bg-white text-slate-400 hover:bg-indigo-50'}"
                  aria-label="Ô {row.label}, {problem.cols[c]}: {value ?? 'trống'}"
                  disabled={value !== undefined}
                  onclick={() => drop(r, c, selected)}
                  ondragover={(e) => e.preventDefault()}
                  ondrop={(e) => dropOn(e, r, c)}
                >
                  {value ?? '?'}
                </button>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <div class="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
    <p class="mb-1 font-semibold">Phương trình đọc từ bảng</p>
    {#each problem.rows as row, r (row.label)}
      <p>
        ({r + 1}) {row.label}:
        <span class="font-semibold tabular-nums">{rowEquation(problem, placements, r) ?? '…'}</span>
      </p>
    {/each}
  </div>

  {#if done}
    <div
      class="space-y-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-950"
    >
      <p class="font-semibold">Bước 1. Hệ phương trình</p>
      <div class="text-center"><Tex math={systemTex} ariaLabel="Hệ phương trình vừa lập" /></div>
      <p class="font-semibold">Bước 2. Giải hệ</p>
      <div class="text-center"><Tex math={solutionTex} ariaLabel="Nghiệm của hệ" /></div>
      <p class="font-semibold">Bước 3. Kiểm tra điều kiện và trả lời</p>
      <p>
        {problem.valid(sol.x, sol.y)
          ? `x = ${formatNumber(sol.x)} và y = ${formatNumber(sol.y)} thoả mãn điều kiện ${problem.condition}`
          : 'Nghiệm không thoả mãn điều kiện, bài toán không có đáp số.'}
      </p>
      <p class="font-semibold">{problem.answer(sol.x, sol.y)}</p>
    </div>
  {:else}
    <p class="text-sm text-slate-600">Đã điền {filled}/6 ô.</p>
  {/if}

  <button type="button" class={button.quiet} onclick={reset}>Làm lại bài này</button>
</div>
