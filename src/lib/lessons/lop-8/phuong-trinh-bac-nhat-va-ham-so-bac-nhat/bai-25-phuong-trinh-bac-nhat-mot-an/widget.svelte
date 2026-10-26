<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { button } from '#lib/core/ui.js';
  import { PUZZLES, apply, equationTex, solvedValue, tilt, divisorToIsolate } from './engine.js';

  /** @typedef {import('./engine.js').Scale} Scale */
  /** @typedef {import('./engine.js').Move} Move */
  /** @typedef {import('./engine.js').Where} Where */

  const PIVOT = { x: 210, y: 70 };
  const ARM = 140;
  const STRING = 100;
  const PAN_W = 120;

  let puzzle = $state(0);
  /** @type {Array<{ scale: Scale, note: string }>} */
  let history = $state([{ scale: { left: PUZZLES[0].left, right: PUZZLES[0].right }, note: '' }]);
  /** @type {Where} */
  let where = $state('both');
  let k = $state(2);
  let message = $state('');

  const current = $derived(history[history.length - 1].scale);
  const solution = $derived(PUZZLES[puzzle].solution);
  const diff = $derived(tilt(current, solution));
  // Left heavier → left pan down → a counter-clockwise (negative) turn.
  const angle = $derived(-Math.max(-12, Math.min(12, diff * 3)));
  const drop = $derived(ARM * Math.sin((angle * Math.PI) / 180));
  const value = $derived(solvedValue(current));
  const nextK = $derived(divisorToIsolate(current));

  /** @param {string | number} v */
  function choosePuzzle(v) {
    const p = PUZZLES[Number(v)];
    history = [{ scale: { left: p.left, right: p.right }, note: '' }];
    message = '';
  }

  const WHERE_TEXT = { both: 'ở cả hai đĩa', left: 'chỉ ở đĩa trái', right: 'chỉ ở đĩa phải' };

  /** @param {Move} move */
  function act(move) {
    const r = apply(current, move, where);
    if (!r.ok) {
      message = r.reason;
      return;
    }
    const what =
      move.kind === 'remove-x'
        ? 'Bớt 1 hộp x'
        : move.kind === 'remove-one'
          ? 'Bớt 1 quả cân'
          : `Chia cho ${move.k}`;
    history = [...history, { scale: r.scale, note: `${what} ${WHERE_TEXT[where]}` }];
    message = '';
  }

  function undo() {
    if (history.length > 1) history = history.slice(0, -1);
    message = '';
  }

  const feedback = $derived.by(() => {
    if (message) return { tone: /** @type {const} */ ('warn'), text: message };
    if (diff !== 0) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Cân bị lệch về đĩa ${diff > 0 ? 'trái' : 'phải'}: em chỉ làm ở một đĩa nên hai vế không còn bằng nhau. Bấm "Hoàn tác" và làm cùng một việc ở cả hai đĩa.`,
      };
    }
    if (value !== null) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Cân thăng bằng và một đĩa chỉ còn một hộp x: x = ${value}. Thử lại với phương trình ban đầu: hai vế đều bằng ${PUZZLES[puzzle].left.x * value + PUZZLES[puzzle].left.c}.`,
      };
    }
    if (nextK) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Cân vẫn thăng bằng. Một đĩa có ${nextK} hộp x: hãy chia mỗi đĩa thành ${nextK} phần bằng nhau.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text:
        history.length === 1
          ? 'Cân đang thăng bằng: hai vế bằng nhau. Bớt cùng một thứ ở cả hai đĩa để một đĩa chỉ còn hộp x.'
          : 'Cân vẫn thăng bằng: phương trình mới tương đương phương trình cũ. Tiếp tục bớt để một đĩa chỉ còn hộp x.',
    };
  });

  /**
   * Positions of the boxes and weights on a pan whose plate is at (cx, y).
   * @param {import('./engine.js').Pan} pan
   * @param {number} cx
   */
  function layout(pan, cx) {
    /** @type {Array<{ kind: 'x' | 'one', x: number, y: number }>} */
    const items = [];
    const left = cx - PAN_W / 2;
    let row = 0;
    for (let i = 0; i < pan.x; i++) {
      if (i > 0 && i % 5 === 0) row++;
      items.push({ kind: 'x', x: left + 1 + (i % 5) * 24, y: -24 - row * 26 });
    }
    const base = pan.x > 0 ? -(row + 1) * 26 : 0;
    for (let i = 0; i < pan.c; i++) {
      const r = Math.floor(i / 6);
      items.push({ kind: 'one', x: left + 10 + (i % 6) * 20, y: base - 10 - r * 20 });
    }
    return items;
  }

  const leftCx = PIVOT.x - ARM;
  const rightCx = PIVOT.x + ARM;
  const plateY = PIVOT.y + STRING;
  const leftItems = $derived(layout(current.left, leftCx));
  const rightItems = $derived(layout(current.right, rightCx));

  /** @param {import('./engine.js').Pan} p */
  const panText = (p) => `${p.x} hộp x và ${p.c} quả cân`;
  const svgLabel = $derived(
    `Cân đĩa: đĩa trái có ${panText(current.left)}, đĩa phải có ${panText(current.right)}. ${
      diff === 0 ? 'Cân thăng bằng.' : `Cân lệch về đĩa ${diff > 0 ? 'trái' : 'phải'}.`
    }`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn bài cân"
    options={PUZZLES.map((p, i) => ({ value: i, label: `Bài ${i + 1}` }))}
    bind:value={puzzle}
    onchange={choosePuzzle}
  />

  <svg
    viewBox="0 0 420 270"
    class="mx-auto block w-full max-w-md select-none rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label={svgLabel}
  >
    <polygon points="{PIVOT.x},{PIVOT.y} {PIVOT.x - 40},255 {PIVOT.x + 40},255" fill="#cbd5e1" />
    <rect x={PIVOT.x - 70} y="255" width="140" height="8" rx="3" fill="#94a3b8" />
    <g
      class="transition-transform duration-500 motion-reduce:transition-none"
      style="transform: rotate({angle}deg); transform-origin: {PIVOT.x}px {PIVOT.y}px"
    >
      <rect x={PIVOT.x - ARM} y={PIVOT.y - 4} width={ARM * 2} height="8" rx="4" fill="#475569" />
    </g>
    <circle cx={PIVOT.x} cy={PIVOT.y} r="7" fill="#334155" />

    {#each [{ cx: leftCx, items: leftItems, dy: -drop }, { cx: rightCx, items: rightItems, dy: drop }] as pan, i (i)}
      <g
        class="transition-transform duration-500 motion-reduce:transition-none"
        style="transform: translateY({pan.dy}px)"
      >
        <line x1={pan.cx} y1={PIVOT.y} x2={pan.cx - PAN_W / 2 + 4} y2={plateY} stroke="#94a3b8" />
        <line x1={pan.cx} y1={PIVOT.y} x2={pan.cx + PAN_W / 2 - 4} y2={plateY} stroke="#94a3b8" />
        <rect x={pan.cx - PAN_W / 2} y={plateY} width={PAN_W} height="6" rx="3" fill="#64748b" />
        {#each pan.items as it, j (j)}
          {#if it.kind === 'x'}
            <rect
              x={it.x}
              y={plateY + it.y}
              width="22"
              height="22"
              rx="3"
              fill="#4f46e5"
              stroke="#312e81"
            />
            <text
              x={it.x + 11}
              y={plateY + it.y + 15}
              text-anchor="middle"
              font-size="13"
              font-style="italic"
              font-weight="700"
              fill="#fff">x</text
            >
          {:else}
            <circle cx={it.x} cy={plateY + it.y} r="8.5" fill="#f59e0b" stroke="#b45309" />
            <text
              x={it.x}
              y={plateY + it.y + 4}
              text-anchor="middle"
              font-size="10"
              font-weight="700"
              fill="#78350f">1</text
            >
          {/if}
        {/each}
      </g>
    {/each}
  </svg>

  <div class="overflow-x-auto text-center">
    <Tex display math={equationTex(current)} ariaLabel="Phương trình {equationTex(current)}" />
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <SegmentedControl
    label="Làm trên"
    options={[
      { value: 'both', label: 'Cả hai đĩa' },
      { value: 'left', label: 'Chỉ đĩa trái' },
      { value: 'right', label: 'Chỉ đĩa phải' },
    ]}
    bind:value={where}
  />

  <div class="flex flex-wrap items-center gap-2">
    <button type="button" class={button.secondary} onclick={() => act({ kind: 'remove-x' })}>
      Bớt 1 hộp x
    </button>
    <button type="button" class={button.secondary} onclick={() => act({ kind: 'remove-one' })}>
      Bớt 1 quả cân
    </button>
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <Stepper label="Số phần k" bind:value={k} min={2} max={6} />
    <button type="button" class={button.secondary} onclick={() => act({ kind: 'divide', k })}>
      Chia mỗi đĩa thành {k} phần, giữ 1 phần
    </button>
  </div>

  <div>
    <p class="mb-1 text-sm font-semibold text-slate-700">Các phương trình em đã viết:</p>
    <ol class="space-y-1 text-sm text-slate-700">
      {#each history as h, i (i)}
        <li class="flex flex-wrap items-baseline gap-2">
          <Tex math={equationTex(h.scale)} />
          {#if h.note}
            <span class="text-slate-500">({h.note})</span>
          {/if}
        </li>
      {/each}
    </ol>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={undo} disabled={history.length < 2}>
      Hoàn tác
    </button>
    <button type="button" class={button.quiet} onclick={() => choosePuzzle(puzzle)}>Làm lại</button>
  </div>
</div>
