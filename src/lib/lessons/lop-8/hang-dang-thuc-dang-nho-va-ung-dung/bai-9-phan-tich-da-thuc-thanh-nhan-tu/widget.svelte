<script>
  import Tex from '#lib/components/tex.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { PUZZLES, arrange, factorTex, groupingTex, polyTex } from './engine.js';

  const X = 120; // px for the unknown length x, deliberately not a whole number of units
  const U = 24; // px for length 1
  const PAD = 30;
  const SQ = '#6366F1';
  const STRIP = '#1B998B';
  const UNIT = '#F4A261';

  /** @param {{ p: number, q: number }} pz */
  const plain = ({ p, q }) => `x² + ${p === 1 ? '' : p}x${q === 0 ? '' : ` + ${q}`}`;

  const options = PUZZLES.map((pz, i) => ({ value: i, label: plain(pz) }));

  /** @type {string | number} */
  let choice = $state(1);
  let m = $state(0);

  const puzzle = $derived(PUZZLES[Number(choice)]);
  const fit = $derived(arrange(puzzle, m));

  // Sized for the chosen polynomial, so the scale stays put while m changes.
  const maxSide = $derived(X + puzzle.p * U);
  const width = $derived(Math.max(maxSide, puzzle.q * (U + 2)) + 2 * PAD);
  const height = $derived(maxSide + 2 * PAD + (puzzle.q > 0 ? 2 * U : 0));

  // Cells of the m × n corner, and which of them hold a unit square.
  const cells = $derived(
    Array.from({ length: fit.corner }, (_, k) => ({
      col: k % fit.m,
      row: Math.floor(k / fit.m),
      filled: k < puzzle.q,
    })),
  );
  const tray = $derived(Array.from({ length: fit.leftover }, (_, k) => k));

  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  const feedback = $derived.by(() => {
    const side = (/** @type {number} */ k) => (k === 0 ? 'x' : `x + ${k}`);
    if (fit.status === 'ok') {
      return {
        tone: 'ok',
        text: `Xếp được hình chữ nhật! Hai cạnh là ${side(fit.m)} và ${side(fit.n)}.`,
      };
    }
    if (fit.status === 'short') {
      return {
        tone: 'warn',
        text: `Góc chỉ có ${fit.m} × ${fit.n} = ${fit.corner} ô nhưng đa thức có ${puzzle.q} ô đơn vị: còn thừa ${fit.leftover} ô. Hãy chia lại các thanh x.`,
      };
    }
    return {
      tone: 'warn',
      text: `Góc có ${fit.m} × ${fit.n} = ${fit.corner} ô nhưng chỉ có ${puzzle.q} ô đơn vị: còn trống ${fit.missing} ô. Hãy chia lại các thanh x.`,
    };
  });

  function changePuzzle() {
    m = 0;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Đa thức cần phân tích"
    {options}
    bind:value={choice}
    onchange={changePuzzle}
  />

  <Stepper label="Số thanh x đặt bên phải hình vuông" bind:value={m} min={0} max={puzzle.p} />
  <p class="text-sm text-slate-600">
    Còn lại {fit.n} thanh x nằm ở phía dưới. Có {puzzle.p} thanh x và {puzzle.q} ô đơn vị.
  </p>

  <figure class="rounded-lg border border-slate-200 bg-white p-3">
    <svg
      viewBox="0 0 {width} {height}"
      class="mx-auto block max-h-[26rem] w-full"
      role="img"
      aria-label="Hình vuông x × x, {fit.m} thanh x bên phải, {fit.n} thanh x phía dưới, góc {fit.m} × {fit.n} ô; {fit.status ===
      'ok'
        ? 'các mảnh tạo thành hình chữ nhật'
        : 'chưa tạo thành hình chữ nhật'}"
    >
      <g transform="translate({PAD} {PAD})">
        <rect width={X} height={X} fill={SQ} fill-opacity="0.35" stroke={SQ} stroke-width="1.5" />
        <text
          x={X / 2}
          y={X / 2}
          text-anchor="middle"
          dominant-baseline="middle"
          font-size="16"
          font-weight="700"
          fill="#312e81">x²</text
        >

        {#each Array.from({ length: fit.m }, (_, i) => i) as i (i)}
          <rect
            x={X + i * U}
            y="0"
            width={U}
            height={X}
            fill={STRIP}
            fill-opacity="0.4"
            stroke={STRIP}
            stroke-width="1.5"
          />
        {/each}
        {#each Array.from({ length: fit.n }, (_, j) => j) as j (j)}
          <rect
            x="0"
            y={X + j * U}
            width={X}
            height={U}
            fill={STRIP}
            fill-opacity="0.4"
            stroke={STRIP}
            stroke-width="1.5"
          />
        {/each}
        {#each cells as c (`${c.col}-${c.row}`)}
          <rect
            x={X + c.col * U}
            y={X + c.row * U}
            width={U}
            height={U}
            fill={c.filled ? UNIT : 'white'}
            fill-opacity={c.filled ? 0.75 : 1}
            stroke={c.filled ? UNIT : '#e11d48'}
            stroke-width="1.5"
            stroke-dasharray={c.filled ? undefined : '3 3'}
          />
        {/each}

        {#if fit.status === 'ok'}
          <rect
            width={X + fit.m * U}
            height={X + fit.n * U}
            fill="none"
            stroke="#047857"
            stroke-width="3"
          />
        {/if}

        <text
          x={(X + fit.m * U) / 2}
          y="-10"
          text-anchor="middle"
          font-size="14"
          font-weight="600"
          fill="#1f2937">{fit.m === 0 ? 'x' : `x + ${fit.m}`}</text
        >
        <text
          x="-10"
          y={(X + fit.n * U) / 2}
          text-anchor="middle"
          font-size="14"
          font-weight="600"
          fill="#1f2937"
          transform="rotate(-90 -10 {(X + fit.n * U) / 2})"
          >{fit.n === 0 ? 'x' : `x + ${fit.n}`}</text
        >
      </g>

      {#if tray.length > 0}
        <g transform="translate({PAD} {height - PAD - U})">
          <text x="0" y={-6} font-size="12" fill="#9f1239">Ô đơn vị chưa xếp được:</text>
          {#each tray as k (k)}
            <rect
              x={k * (U + 2)}
              y="0"
              width={U}
              height={U}
              fill={UNIT}
              fill-opacity="0.75"
              stroke={UNIT}
              stroke-width="1.5"
            />
          {/each}
        </g>
      {/if}
    </svg>
  </figure>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  {#if fit.status === 'ok'}
    <div
      class="space-y-1 overflow-x-auto rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-slate-800"
    >
      <Tex display math={`${polyTex(puzzle)} = ${factorTex(fit.m, fit.n)}`} />
      <p class="text-sm text-slate-600">Đọc lại bằng nhóm hạng tử:</p>
      {#each groupingTex(fit.m, fit.n) as line (line)}
        <Tex display math={line} />
      {/each}
    </div>
  {/if}
</div>
