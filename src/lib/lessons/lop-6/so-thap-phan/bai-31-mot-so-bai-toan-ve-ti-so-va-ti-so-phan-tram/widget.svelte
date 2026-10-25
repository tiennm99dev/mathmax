<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { fmt, readNatural } from '#lib/core/number-format.js';
  import { DEPOSITS, GOODS, pctText, range, snapPercent, solve } from './engine.js';

  /** @typedef {import('./engine.js').Mode} Mode */

  const ORANGE = '#F46036';
  const BLUE = '#4F46E5';
  const W = 360;
  const H = 150;
  const X0 = 20;
  const L = 320;
  const BAR_Y = 52;
  const BAR_H = 38;

  let mode = $state(/** @type {Mode} */ ('sale'));
  let goodId = $state(GOODS[0].id);
  let deposit = $state(DEPOSITS[1]);
  let p10 = $state(250);
  let typed = $state('');
  let verdict = $state(/** @type {'' | 'right' | 'wrong' | 'invalid'} */ (''));
  let revealedKey = $state('');

  const base = $derived(
    mode === 'interest' ? deposit : (GOODS.find((g) => g.id === goodId) ?? GOODS[0]).price,
  );
  const s = $derived(solve(mode, base, p10));
  const key = $derived(`${mode}-${base}-${p10}`);
  const revealed = $derived(revealedKey === key);
  const r = $derived(range(mode));
  const xAt = (/** @type {number} */ q10) => X0 + (q10 / 1000) * L;
  const show = (/** @type {number} */ n, /** @type {boolean} */ known) =>
    known || revealed ? fmt(n) : '?';
  const wholeText = $derived(show(s.whole, mode !== 'original'));
  const markedText = $derived(show(s.marked, false));
  const restText = $derived(show(s.whole - s.marked, mode === 'original'));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };
  const drag = {
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => setP(snapPercent(mode, ((scratch.x - X0) / L) * 1000)),
    /** @param {number} dx @param {number} dy */
    onKeyMove: (dx, dy) => setP(snapPercent(mode, p10 + (dx - dy) * range(mode).step)),
  };

  /** @param {number} v */
  function setP(v) {
    if (v === p10) return;
    p10 = v;
    changed();
  }

  function changed() {
    typed = '';
    verdict = '';
  }

  function switchMode() {
    p10 = mode === 'interest' ? 65 : 250;
    changed();
  }

  function check() {
    const v = readNatural(typed);
    if (v === null) {
      verdict = 'invalid';
      return;
    }
    verdict = v === s.answer ? 'right' : 'wrong';
    if (verdict === 'right') revealedKey = key;
  }

  const feedback = $derived(
    verdict === 'right'
      ? `Đúng rồi! Đáp số: ${fmt(s.answer)} đồng.`
      : verdict === 'wrong'
        ? mode === 'interest'
          ? `Chưa đúng. Tiền lãi là ${pctText(p10)} của ${fmt(base)}: nhân ${fmt(base)} với ${pctText(p10)} rồi chia cho 100.`
          : mode === 'sale'
            ? `Chưa đúng. Tìm số tiền được giảm (${pctText(p10)} của giá cũ) rồi lấy giá cũ trừ đi.`
            : `Chưa đúng. Giá đã bán ứng với ${pctText(1000 - p10)} giá ban đầu: hãy chia giá đã bán cho ${pctText(1000 - p10)}.`
        : verdict === 'invalid'
          ? 'Hãy nhập số tiền là một số tự nhiên (ví dụ 345 000).'
          : '',
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Bài toán"
    options={[
      { value: 'sale', label: 'Giảm giá' },
      { value: 'original', label: 'Tìm giá ban đầu' },
      { value: 'interest', label: 'Lãi suất tiết kiệm' },
    ]}
    bind:value={mode}
    onchange={switchMode}
  />

  {#if mode === 'interest'}
    <SegmentedControl
      label="Số tiền gửi"
      options={DEPOSITS.map((d) => ({ value: d, label: `${fmt(d)} đồng` }))}
      bind:value={deposit}
      onchange={changed}
    />
  {:else}
    <SegmentedControl
      label="Món hàng"
      options={GOODS.map((g) => ({ value: g.id, label: g.name }))}
      bind:value={goodId}
      onchange={changed}
    />
  {/if}

  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl select-none"
    style:aspect-ratio="{W} / {H}"
    style:touch-action="none"
    role="group"
    aria-label="Thanh phần trăm: cả thanh là 100% ứng với {wholeText === '?'
      ? 'số chưa biết'
      : `${wholeText} đồng`}; phần {s.markedLabel} chiếm {pctText(p10)}"
  >
    <text x={X0 + L / 2} y="22" text-anchor="middle" font-size="18" font-weight="700" fill="#334155"
      >100% = {wholeText} đồng</text
    >
    <path d="M {X0} 40 v -8 h {L} v 8" fill="none" stroke="#64748b" stroke-width="2" />
    <rect
      x={X0}
      y={BAR_Y}
      width={L}
      height={BAR_H}
      fill="#fff"
      stroke="#334155"
      stroke-width="1.5"
    />
    <rect
      x={xAt(p10)}
      y={BAR_Y}
      width={L - (p10 / 1000) * L}
      height={BAR_H}
      fill={BLUE}
      fill-opacity="0.18"
    />
    <rect
      x={X0}
      y={BAR_Y}
      width={(p10 / 1000) * L}
      height={BAR_H}
      fill={ORANGE}
      fill-opacity="0.75"
    />
    {#each { length: 11 } as _, i (i)}
      <line
        x1={X0 + (i / 10) * L}
        y1={BAR_Y + BAR_H}
        x2={X0 + (i / 10) * L}
        y2={BAR_Y + BAR_H + 5}
        stroke="#64748b"
      />
    {/each}
    {#if mode !== 'interest'}
      <text
        x={X0 + ((p10 / 1000) * L + L) / 2}
        y={BAR_Y + BAR_H / 2 + 6}
        text-anchor="middle"
        font-size="15"
        font-weight="700"
        fill="#3730a3">{pctText(1000 - p10)}</text
      >
    {/if}
    <text x={X0 + 4} y={BAR_Y - 6} font-size="16" font-weight="700" fill="#9a3412"
      >{pctText(p10)} {s.markedLabel}: {markedText}</text
    >
    <text x={X0 + L} y={BAR_Y + BAR_H + 30} text-anchor="end" font-size="16" fill="#3730a3"
      >{mode === 'interest'
        ? `Gốc và lãi sau một năm: ${show(s.whole + s.marked, false)}`
        : `${s.restLabel}: ${restText}`}</text
    >

    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Tỉ số phần trăm"
      aria-valuemin={r.min / 10}
      aria-valuemax={r.max / 10}
      aria-valuenow={p10 / 10}
      aria-valuetext={pctText(p10)}
      style="cursor:grab; outline:none"
      use:draggable={drag}
    >
      <path
        class="drag-knob"
        d="M {xAt(p10)} {BAR_Y + BAR_H + 6} l -11 18 h 22 z"
        fill={ORANGE}
        stroke="#fff"
        stroke-width="2"
      />
    </g>
  </svg>
  <p class="text-sm text-slate-600">
    Kéo tam giác cam (hoặc dùng phím mũi tên) để đổi tỉ số phần trăm: {mode === 'interest'
      ? 'lãi suất từ 0,5% đến 20%, mỗi bước 0,5%'
      : 'mức giảm giá từ 5% đến 90%, mỗi bước 5%'}. Cả thanh luôn là 100%.
  </p>

  <div class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
    <p class="text-lg font-semibold text-slate-800">{s.question}</p>
    <form
      class="flex flex-wrap items-end gap-2"
      onsubmit={(e) => {
        e.preventDefault();
        check();
      }}
    >
      <label class="min-w-0 basis-full sm:flex-1 sm:basis-auto">
        <span class="mb-1 block text-sm font-semibold text-slate-700">Đáp số (đồng)</span>
        <input class={textInput} inputmode="numeric" autocomplete="off" bind:value={typed} />
      </label>
      <button type="submit" class={button.primary}>Kiểm tra</button>
      <button type="button" class={button.quiet} onclick={() => (revealedKey = key)}
        >Xem lời giải</button
      >
    </form>
    <p
      class="font-semibold {verdict === 'right' ? 'text-emerald-700' : 'text-rose-700'}"
      aria-live="polite"
    >
      {feedback}
    </p>
    {#if revealed}
      <ol class="list-decimal space-y-1 pl-6 text-slate-800">
        {#each s.steps as step (step)}<li>{step}</li>{/each}
      </ol>
    {/if}
  </div>
</div>
