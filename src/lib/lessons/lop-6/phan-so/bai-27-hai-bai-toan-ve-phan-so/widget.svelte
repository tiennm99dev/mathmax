<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { fmt, readNatural } from '#lib/core/number-format.js';
  import Stepper from '../_shared/stepper.svelte';
  import { snapParts, solve } from './engine.js';

  /** @typedef {import('./engine.js').Mode} Mode */

  const BLUE = '#4F46E5';
  const ORANGE = '#F46036';

  const W = 420;
  const H = 180;
  const X0 = 20;
  const L = 380;
  const BAR_Y = 58;
  const BAR_H = 40;

  let mode = $state(/** @type {Mode} */ ('part'));
  let n = $state(5);
  let m = $state(3);
  let k = $state(12);
  let typed = $state('');
  let verdict = $state(/** @type {'' | 'right' | 'wrong' | 'invalid'} */ (''));
  let revealedKey = $state('');
  let flipNote = $state('');

  const key = $derived(`${mode}-${m}-${n}-${k}`);
  const revealed = $derived(revealedKey === key);
  const s = $derived(solve(mode, m, n, k));
  const whole = $derived(n * k);
  const part = $derived(m * k);
  const wholeLabel = $derived(mode === 'part' || revealed ? fmt(whole) : '?');
  const partLabel = $derived(mode === 'whole' || revealed ? fmt(part) : '?');
  const xAt = (/** @type {number} */ i) => X0 + (i / n) * L;

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };
  const drag = {
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => setM(snapParts((scratch.x - X0) / L, n)),
    /** @param {number} dx @param {number} dy */
    onKeyMove: (dx, dy) => setM(Math.min(n, Math.max(1, m + dx - dy))),
  };

  /** @param {number} v */
  function setM(v) {
    if (v === m) return;
    m = v;
    changed();
  }

  function changed() {
    verdict = '';
    typed = '';
    flipNote = '';
  }

  function check() {
    const v = readNatural(typed);
    if (v === null) {
      verdict = 'invalid';
      return;
    }
    verdict = v === s.unknown ? 'right' : 'wrong';
    if (verdict === 'right') revealedKey = key;
  }

  function flip() {
    const wasPart = mode === 'part';
    mode = wasPart ? 'whole' : 'part';
    changed();
    flipNote = wasPart
      ? `Bài toán ngược: giữ nguyên sơ đồ, nay biết ${m}/${n} của số đó là ${fmt(part)} và phải tìm lại cả số.`
      : `Bài toán ngược: giữ nguyên sơ đồ, nay biết cả số là ${fmt(whole)} và phải tìm ${m}/${n} của nó.`;
  }

  const feedback = $derived(
    verdict === 'right'
      ? `Đúng rồi! Số cần tìm là ${fmt(s.unknown)}.`
      : verdict === 'wrong'
        ? mode === 'part'
          ? `Chưa đúng. Hãy tìm giá trị một phần trước: ${fmt(whole)} : ${n}, rồi lấy ${m} phần.`
          : `Chưa đúng. ${m} phần ứng với ${fmt(part)}; hãy tìm một phần rồi lấy đủ ${n} phần.`
        : verdict === 'invalid'
          ? 'Hãy nhập một số tự nhiên.'
          : '',
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Dạng bài toán"
    options={[
      { value: 'part', label: 'Tìm giá trị phân số của một số' },
      { value: 'whole', label: 'Tìm một số biết giá trị phân số' },
    ]}
    bind:value={mode}
    onchange={changed}
  />

  <div class="flex flex-wrap gap-x-6 gap-y-2">
    <Stepper
      label="Số phần (mẫu n)"
      bind:value={n}
      min={2}
      max={10}
      onchange={(v) => {
        if (m > v) m = v;
        changed();
      }}
    />
    <Stepper
      label={mode === 'part' ? 'Cả số đã biết' : 'Giá trị đã biết'}
      bind:value={k}
      min={1}
      max={20}
      format={(v) => fmt(mode === 'part' ? v * n : v * m)}
      onchange={changed}
    />
  </div>

  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl select-none"
    style:aspect-ratio="{W} / {H}"
    role="img"
    aria-label="Sơ đồ đoạn thẳng: cả số là {wholeLabel === '?'
      ? 'chưa biết'
      : wholeLabel}, chia {n} phần bằng nhau; {m} phần tô màu ứng với {partLabel === '?'
      ? 'số chưa biết'
      : partLabel}"
  >
    <!-- the whole, bracketed above -->
    <path
      d="M {X0} 40 v -10 h {L} v 10"
      fill="none"
      stroke={mode === 'part' ? BLUE : '#64748b'}
      stroke-width="2"
    />
    <text
      x={X0 + L / 2}
      y="22"
      text-anchor="middle"
      font-size="17"
      font-weight="700"
      fill={mode === 'part' ? BLUE : '#334155'}>Cả số: {wholeLabel}</text
    >

    {#each { length: n } as _, i (i)}
      <rect
        x={xAt(i)}
        y={BAR_Y}
        width={L / n}
        height={BAR_H}
        fill={i < m ? ORANGE : '#fff'}
        fill-opacity={i < m ? 0.75 : 1}
        stroke="#334155"
        stroke-width="1.5"
      />
      <text
        x={xAt(i) + L / n / 2}
        y={BAR_Y + BAR_H / 2 + 6}
        text-anchor="middle"
        font-size={n > 8 ? 13 : 16}
        fill="#0f172a">{revealed ? fmt(k) : '?'}</text
      >
    {/each}

    <!-- the marked part, bracketed below -->
    <path
      d="M {X0} {BAR_Y + BAR_H + 30} v 10 h {(m / n) * L} v -10"
      fill="none"
      stroke={ORANGE}
      stroke-width="2"
    />
    <text
      x={Math.min(W - 90, Math.max(X0 + 90, X0 + ((m / n) * L) / 2))}
      y={BAR_Y + BAR_H + 62}
      text-anchor="middle"
      font-size="17"
      font-weight="700"
      fill="#9a3412">{m}/{n} của số: {partLabel}</text
    >

    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Số phần được lấy (tử m)"
      aria-valuemin={1}
      aria-valuemax={n}
      aria-valuenow={m}
      aria-valuetext="{m} trên {n} phần"
      aria-orientation="horizontal"
      style="cursor:grab; outline:none"
      use:draggable={drag}
    >
      <path
        class="drag-knob"
        d="M {xAt(m)} {BAR_Y + BAR_H + 2} l -11 18 h 22 z"
        fill={ORANGE}
        stroke="#fff"
        stroke-width="2"
      />
    </g>
  </svg>
  <p class="text-sm text-slate-600">
    Kéo tam giác màu cam (hoặc dùng phím mũi tên) để đổi số phần được lấy. Số đã biết tăng theo từng
    phần, nên mọi kết quả đều là số tự nhiên.
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
        <span class="mb-1 block text-sm font-semibold text-slate-700">Số cần tìm</span>
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

  <div class="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
    <button type="button" class={button.secondary} onclick={flip}>Đổi chiều bài toán</button>
    <p class="min-w-0 text-slate-700 sm:flex-1" aria-live="polite">{flipNote}</p>
  </div>
</div>
