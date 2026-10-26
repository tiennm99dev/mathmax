<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { compare } from '#lib/fraction-engine/index.js';
  import { fracText, readWritten, texFrac } from '../_shared/rational.js';
  import {
    EQUATIONS,
    balanced,
    equationTex,
    isX,
    isolated,
    move,
    sideTex,
    solution,
    termText,
    tilt,
  } from './engine.js';

  /** @typedef {import('./engine.js').Equation} Equation */

  /** @type {Array<'left' | 'right'>} */
  const SIDES = ['left', 'right'];

  const uid = $props.id();

  let index = $state(0);
  /** @type {Equation[]} */
  let history = $state([EQUATIONS[0]]);
  let mode = $state('flip');
  let message = $state('');
  let typed = $state('');
  let verdict = $state('');
  let revealed = $state(false);

  const eq = $derived(history[history.length - 1]);
  const x = $derived(solution(EQUATIONS[index]));
  const level = $derived(balanced(eq, x));
  const diff = $derived(tilt(eq, x));
  // The heavier side goes down: left heavier turns the beam anticlockwise.
  const angle = $derived.by(() => {
    if (level) return 0;
    const d = diff.n / diff.d;
    return (d > 0 ? -1 : 1) * Math.max(4, Math.min(14, Math.abs(d) * 10));
  });
  const done = $derived(level && isolated(eq));

  const PIVOT = { x: 180, y: 70 };
  const HALF = 130;
  const rad = $derived((angle * Math.PI) / 180);
  const leftEnd = $derived({
    x: PIVOT.x - HALF * Math.cos(rad),
    y: PIVOT.y - HALF * Math.sin(rad),
  });
  const rightEnd = $derived({
    x: PIVOT.x + HALF * Math.cos(rad),
    y: PIVOT.y + HALF * Math.sin(rad),
  });

  /** @param {number} i */
  function choose(i) {
    index = i;
    history = [EQUATIONS[i]];
    message = '';
    typed = '';
    verdict = '';
    revealed = false;
  }

  /**
   * @param {'left' | 'right'} side
   * @param {number} i
   */
  function moveTerm(side, i) {
    const t = eq[side][i];
    // x stays put, and moving a 0 would change nothing.
    if (isX(t) || t.v.n === 0) return;
    const flip = mode === 'flip';
    const next = move(eq, side, i, flip);
    history = [...history, next];
    const where = side === 'left' ? 'vế phải' : 'vế trái';
    if (balanced(next, x)) {
      message = `Chuyển ${termText(t, true)} sang ${where} và đổi dấu: cân vẫn thăng bằng.`;
    } else {
      message = `Chuyển ${termText(t, true)} sang ${where} mà giữ nguyên dấu: cân bị lệch! Hai vế không còn bằng nhau. Nhấn "Hoàn tác".`;
    }
    verdict = '';
    revealed = false;
  }

  function undo() {
    if (history.length > 1) history = history.slice(0, -1);
    message = '';
  }

  function checkX() {
    const w = readWritten(typed);
    if (!w) {
      verdict = 'Hãy nhập một phân số dạng a/b, số nguyên hoặc số thập phân.';
      return;
    }
    verdict =
      compare(w.f, x) === 0
        ? `Đúng rồi! x = ${fracText(x)}.`
        : 'Chưa đúng. Hãy tính lại tổng các số ở vế không chứa x.';
  }

  const otherSide = $derived(eq.left.some(isX) ? eq.right : eq.left);
  const otherTex = $derived(sideTex(otherSide));
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn đẳng thức">
    {#each EQUATIONS as _, i (i)}
      <button
        type="button"
        class={i === index ? button.primary : button.quiet}
        aria-pressed={i === index}
        onclick={() => choose(i)}>Bài {i + 1}</button
      >
    {/each}
  </div>

  <div class="rounded-xl border border-slate-200 bg-white p-3">
    <div class="text-center text-xl">
      <Tex display math={equationTex(eq)} />
    </div>
    <svg
      viewBox="0 0 360 190"
      class="mx-auto block w-full max-w-md"
      role="img"
      aria-label={level ? 'Cân thăng bằng' : 'Cân bị lệch'}
    >
      <polygon points="180,70 150,170 210,170" fill="#cbd5e1" />
      <rect x="120" y="170" width="120" height="8" rx="3" fill="#94a3b8" />
      <line
        x1={leftEnd.x}
        y1={leftEnd.y}
        x2={rightEnd.x}
        y2={rightEnd.y}
        stroke={level ? '#1B998B' : '#D7263D'}
        stroke-width="6"
        stroke-linecap="round"
      />
      <circle cx={PIVOT.x} cy={PIVOT.y} r="7" fill="#334155" />
      {#each [leftEnd, rightEnd] as end, k (k)}
        <line x1={end.x} y1={end.y} x2={end.x - 30} y2={end.y + 45} stroke="#64748b" />
        <line x1={end.x} y1={end.y} x2={end.x + 30} y2={end.y + 45} stroke="#64748b" />
        <path
          d="M {end.x - 40} {end.y + 45} Q {end.x} {end.y + 75} {end.x + 40} {end.y + 45} Z"
          fill={k === 0 ? '#c7d2fe' : '#fde68a'}
          stroke="#475569"
        />
        <text x={end.x} y={end.y + 62} text-anchor="middle" font-size="13" fill="#334155"
          >{k === 0 ? 'Vế trái' : 'Vế phải'}</text
        >
      {/each}
    </svg>
    <p
      class="text-center font-semibold {level ? 'text-emerald-700' : 'text-rose-700'}"
      aria-live="polite"
    >
      {level ? 'Cân thăng bằng: hai vế bằng nhau.' : 'Cân bị lệch: hai vế không bằng nhau.'}
    </p>
  </div>

  <SegmentedControl
    label="Khi chuyển một số hạng sang vế kia"
    options={[
      { value: 'flip', label: 'Đổi dấu số hạng' },
      { value: 'keep', label: 'Giữ nguyên dấu (thử)' },
    ]}
    bind:value={mode}
  />

  <div class="grid grid-cols-2 gap-3">
    {#each SIDES as side (side)}
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-2">
        <p class="mb-2 text-sm font-semibold text-slate-700">
          {side === 'left' ? 'Vế trái' : 'Vế phải'}
        </p>
        <div class="flex flex-wrap gap-2">
          {#each eq[side] as t, i (i)}
            {#if isX(t) || t.v.n === 0}
              <span
                class="inline-flex min-h-11 items-center rounded-lg px-3 font-bold {isX(t)
                  ? 'bg-indigo-600 text-white'
                  : 'border border-slate-300 bg-white text-slate-700'}">{termText(t, i === 0)}</span
              >
            {:else}
              <button
                type="button"
                class={button.secondary}
                disabled={done}
                aria-label="Chuyển số hạng {termText(t, true)} sang {side === 'left'
                  ? 'vế phải'
                  : 'vế trái'}"
                onclick={() => moveTerm(side, i)}>{termText(t, i === 0)}</button
              >
            {/if}
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <p aria-live="polite" class="min-h-6 font-semibold text-slate-800">{message}</p>

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.quiet} disabled={history.length < 2} onclick={undo}
      >Hoàn tác</button
    >
    <button type="button" class={button.quiet} onclick={() => choose(index)}>Làm lại</button>
  </div>

  {#if done}
    <div class="space-y-3 rounded-lg border border-emerald-300 bg-emerald-50 p-3">
      <p class="font-semibold text-emerald-900">
        x đã đứng một mình ở một vế. Hãy tính vế còn lại để tìm x.
      </p>
      <form
        class="flex flex-wrap items-end gap-2"
        onsubmit={(e) => {
          e.preventDefault();
          checkX();
        }}
      >
        <div class="min-w-40 flex-1">
          <label for="{uid}-x" class="mb-1 block text-sm font-semibold text-slate-700">x =</label>
          <input id="{uid}-x" class={textInput} bind:value={typed} autocomplete="off" />
        </div>
        <button type="submit" class={button.primary}>Kiểm tra</button>
        <button type="button" class={button.quiet} onclick={() => (revealed = true)}
          >Xem lời giải</button
        >
      </form>
      <p aria-live="polite" class="font-semibold text-slate-800">{verdict}</p>
      {#if revealed}
        <div class="overflow-x-auto">
          <Tex display math={`x = ${otherTex} = ${texFrac(x)}`} />
        </div>
      {/if}
    </div>
  {/if}
</div>
