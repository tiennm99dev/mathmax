<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { mlText } from '../_shared/measure.js';
  import {
    CUP_PUZZLES,
    EMPTY_CUPS,
    cupsMessage,
    cupsSolved,
    idleReason,
    moveCups,
  } from './engine.js';

  const CUP_IDS = /** @type {const} */ (['big', 'small']);
  /** Drawn height of the fuller cup, in SVG units. */
  const TALL = 120;
  const BOTTOM = 130;

  let index = $state(0);
  let cups = $state(EMPTY_CUPS);
  let moves = $state(0);
  /** @type {string | null} */
  let idle = $state(null);

  const puzzle = $derived(CUP_PUZZLES[index]);
  const solved = $derived(cupsSolved(puzzle, cups));
  const note = $derived(idle ?? cupsMessage(puzzle, cups));

  /**
   * @param {import('./engine.js').CupAct} act
   * @param {import('./engine.js').CupId} id
   */
  function act(act, id) {
    if (solved) return;
    idle = idleReason(puzzle, cups, act, id);
    if (idle) return;
    cups = moveCups(puzzle, cups, act, id);
    moves += 1;
  }

  function restart() {
    cups = EMPTY_CUPS;
    moves = 0;
    idle = null;
  }

  function next() {
    index = (index + 1) % CUP_PUZZLES.length;
    restart();
  }

  /** @param {number} ml */
  const heightOf = (ml) => (ml / puzzle.big) * TALL;
</script>

<div class="space-y-4">
  <p class="text-center text-2xl font-bold text-balance text-slate-800">
    Chỉ dùng hai cốc, em lấy đúng <span class="whitespace-nowrap">{mlText(puzzle.target)}</span> nước
    từ thùng
  </p>

  <div class="grid grid-cols-2 gap-3">
    {#each CUP_IDS as id (id)}
      {@const size = puzzle[id]}
      <div class="flex flex-col gap-2 rounded-2xl bg-slate-50 p-2 text-center">
        <svg
          viewBox="0 0 100 136"
          class="mx-auto block h-36 w-auto"
          role="img"
          aria-label="Cốc {mlText(size)}, không có vạch chia, đang có {mlText(cups[id])} nước."
        >
          <rect
            x="24"
            y={BOTTOM - heightOf(cups[id])}
            width="52"
            height={heightOf(cups[id])}
            fill="#38bdf8"
            class="motion-safe:transition-all motion-safe:duration-300"
          />
          <path
            d="M24 {BOTTOM - heightOf(size)} V{BOTTOM} H76 V{BOTTOM - heightOf(size)}"
            fill="none"
            stroke="#475569"
            stroke-width="3"
          />
        </svg>
        <p class="text-lg leading-tight font-bold text-slate-900">Cốc {mlText(size)}</p>
        <p class="text-slate-700">
          Đang có <span class="whitespace-nowrap">{mlText(cups[id])}</span>
        </p>
        <div class="grid gap-2" role="group" aria-label="Việc làm với cốc {mlText(size)}">
          <button
            type="button"
            class="min-h-12 rounded-xl border-2 border-sky-500 bg-white px-1 font-semibold text-slate-800 {focusRing} {solved
              ? 'opacity-50'
              : ''}"
            aria-disabled={solved}
            aria-label="Múc đầy cốc {mlText(size)}"
            onclick={() => act('fill', id)}>Múc đầy</button
          >
          <button
            type="button"
            class="min-h-12 rounded-xl border-2 border-indigo-500 bg-white px-1 font-semibold text-slate-800 {focusRing} {solved
              ? 'opacity-50'
              : ''}"
            aria-disabled={solved}
            aria-label="Rót cốc {mlText(size)} sang cốc kia"
            onclick={() => act('pour', id)}>Rót sang cốc kia</button
          >
          <button
            type="button"
            class="min-h-12 rounded-xl border-2 border-slate-400 bg-white px-1 font-semibold text-slate-800 {focusRing} {solved
              ? 'opacity-50'
              : ''}"
            aria-disabled={solved}
            aria-label="Đổ hết cốc {mlText(size)}"
            onclick={() => act('empty', id)}>Đổ hết</button
          >
        </div>
      </div>
    {/each}
  </div>

  <FeedbackNote tone={solved ? 'ok' : idle ? 'warn' : 'info'} text={note} />

  <div class="flex flex-wrap items-center justify-center gap-3">
    <span class="text-lg text-slate-700">Em đã làm {moves} bước.</span>
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={restart}>Làm lại</button>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={next}
      >Bài khác</button
    >
  </div>
</div>
