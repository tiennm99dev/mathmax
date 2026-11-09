<script>
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    CHALLENGES,
    COLS,
    CORNER_NAMES,
    ROWS,
    challengeNote,
    meets,
    partLengths,
    pathText,
    refusal,
    refusalText,
  } from './engine.js';

  /** Size of one grid cell in the overlay's units. */
  const CELL = 100;
  const WIDTH = COLS * CELL;
  const HEIGHT = ROWS * CELL;

  /** @type {import('./engine.js').Spot[]} */
  let path = $state([]);
  let level = $state(0);
  /** Message for a refused dot, until the next good tap. */
  let refused = $state('');
  /** The dot that keeps Tab focus, moved by the arrow keys. */
  let focus = $state({ c: 0, r: 0 });
  /** @type {HTMLElement | undefined} */
  let grid = $state();

  const challenge = $derived(CHALLENGES[level]);
  const parts = $derived(partLengths(path));
  const done = $derived(meets(path, challenge));
  const note = $derived(challengeNote(path, challenge));

  /** @param {{ c: number, r: number }} p */
  const cx = (p) => (p.c + 0.5) * CELL;
  /** @param {{ c: number, r: number }} p */
  const cy = (p) => (p.r + 0.5) * CELL;

  /** @param {number} c @param {number} r */
  const cornerAt = (c, r) => path.findIndex((p) => p.c === c && p.r === r);

  /** @param {number} c @param {number} r */
  function tap(c, r) {
    if (done) return;
    const next = { c, r };
    const why = refusal(path, next);
    if (why) {
      refused = refusalText(why);
      return;
    }
    refused = '';
    path = [...path, next];
  }

  /** Keeps keyboard focus on the board when a button is about to turn off. */
  function focusBoard() {
    /** @type {HTMLElement | null | undefined} */ (grid?.querySelector('[tabindex="0"]'))?.focus();
  }

  function undo() {
    if (path.length === 1) focusBoard();
    path = path.slice(0, -1);
    refused = '';
  }

  function clear() {
    focusBoard();
    path = [];
    refused = '';
  }

  function nextChallenge() {
    level = (level + 1) % CHALLENGES.length;
    clear();
  }

  /** @param {KeyboardEvent} e */
  function onKey(e) {
    const moves = /** @type {Record<string, [number, number]>} */ ({
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    });
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    const c = Math.max(0, Math.min(COLS - 1, focus.c + move[0]));
    const r = Math.max(0, Math.min(ROWS - 1, focus.r + move[1]));
    focus = { c, r };
    /** @type {HTMLElement | null | undefined} */ (
      grid?.querySelector(`[data-dot="${c}-${r}"]`)
    )?.focus();
  }

  /** @param {number} c @param {number} r */
  function dotLabel(c, r) {
    const i = cornerAt(c, r);
    const where = `Chấm hàng ${r + 1}, cột ${c + 1}`;
    return i >= 0 ? `${where}, điểm ${CORNER_NAMES[i]}` : where;
  }
</script>

<div class="space-y-4">
  <p class="text-xl font-semibold text-slate-800">
    Thử thách: vẽ đường gấp khúc gồm {challenge.parts} đoạn thẳng, dài {challenge.cm} cm.
  </p>

  <div class="relative mx-auto w-full max-w-lg select-none" style:aspect-ratio="{COLS} / {ROWS}">
    <div
      bind:this={grid}
      role="group"
      aria-label="Bảng chấm, mỗi bước giữa hai chấm cạnh nhau dài 1 cm. Dùng phím mũi tên để đi giữa các chấm."
      class="absolute inset-0 grid rounded-2xl border border-slate-200 bg-white"
      style:grid-template-columns="repeat({COLS}, 1fr)"
      style:grid-template-rows="repeat({ROWS}, 1fr)"
    >
      {#each { length: ROWS } as _, r (r)}
        {#each { length: COLS } as _, c (c)}
          <button
            type="button"
            data-dot="{c}-{r}"
            class="flex items-center justify-center rounded-xl {focusRing}"
            tabindex={focus.c === c && focus.r === r ? 0 : -1}
            aria-label={dotLabel(c, r)}
            onclick={() => {
              focus = { c, r };
              tap(c, r);
            }}
            onkeydown={onKey}
          >
            <span class="block h-3 w-3 rounded-full bg-slate-300"></span>
          </button>
        {/each}
      {/each}
    </div>
    <svg
      viewBox="0 0 {WIDTH} {HEIGHT}"
      class="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {#each parts as len, i (i)}
        <line
          x1={cx(path[i])}
          y1={cy(path[i])}
          x2={cx(path[i + 1])}
          y2={cy(path[i + 1])}
          stroke="#4f46e5"
          stroke-width="8"
          stroke-linecap="round"
        />
        <text
          x={(cx(path[i]) + cx(path[i + 1])) / 2 +
            (path[i].c !== path[i + 1].c ? 0 : path[i].c === COLS - 1 ? -70 : 50)}
          y={(cy(path[i]) + cy(path[i + 1])) / 2 + (path[i].c === path[i + 1].c ? -4 : 34)}
          text-anchor="middle"
          font-size="28"
          font-weight="700"
          fill="#3730a3">{len} cm</text
        >
      {/each}
      {#each path as p, i (i)}
        <circle cx={cx(p)} cy={cy(p)} r="15" fill="#e11d48" />
        <text x={cx(p) - 40} y={cy(p) - 18} font-size="32" font-weight="700" fill="#1e293b"
          >{CORNER_NAMES[i]}</text
        >
      {/each}
    </svg>
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {done
      ? 'bg-emerald-100 text-emerald-900'
      : refused
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if done}<span aria-hidden="true">⭐ </span>{/if}{done ? 'Đúng rồi! ' : ''}{refused ||
      `${pathText(path)} ${note}`.trim()}
  </p>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={path.length === 0}
      onclick={undo}>Xoá đoạn cuối</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={path.length === 0}
      onclick={clear}>Vẽ lại</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {done ? button.primary : button.secondary}"
      onclick={nextChallenge}>Thử thách khác</button
    >
  </div>
</div>
