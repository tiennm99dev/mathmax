<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import { isSquare } from '#lib/core/decimal.js';
  import { MAX_AREA, MAX_LEVEL, MIN_AREA, bracketText, tryDigit } from './engine.js';

  const UNITS = 8;
  const U = 36;
  const PAD = 14;
  const W = PAD * 2 + UNITS * U;
  const H = W;
  const X0 = PAD;
  const Y0 = PAD + UNITS * U;

  let area = $state(2);
  /** Digits confirmed so far: 0 before the whole part is found. */
  let found = $state(0);
  /** @type {import('./engine.js').Attempt[]} */
  let attempts = $state([]);
  let message = $state('');

  const side = $derived(Math.sqrt(area));
  /** The square is too small to hold its label. */
  const small = $derived(side * U < 64);
  const exact = $derived(isSquare(area));
  const level = $derived(found);
  const finished = $derived(found > MAX_LEVEL || (exact && found > 0));
  const known = $derived(found > 0 ? bracketText(area, found - 1) : null);
  const step = $derived(found > 0 ? 10 ** -(found - 1) : 1);
  const lineMin = $derived(known ? known.loValue - step : 0);
  const lineMax = $derived(known ? known.hiValue + step : UNITS);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };
  const drag = {
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => {
      const s = Math.max((scratch.x - X0) / U, (Y0 - scratch.y) / U, 0);
      setArea(Math.round(s * s));
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setArea(area + (dx - dy) * (big ? 5 : 1)),
  };

  /** @param {number} next */
  function setArea(next) {
    const a = clamp(Math.round(next), MIN_AREA, MAX_AREA);
    if (a === area) return;
    area = a;
    restart();
  }

  function restart() {
    found = 0;
    attempts = [];
    message = '';
  }

  /** @param {number} k */
  function tryIt(k) {
    if (finished) return;
    // `level` follows `found`, so keep the level this try belongs to.
    const at = level;
    const a = tryDigit(area, at, k);
    const what = at === 0 ? 'số' : 'chữ số';
    if (a.status === 'big') {
      attempts = [...attempts, a];
      message = `${a.candidate}² = ${a.square} > ${area}: ${a.candidate} quá lớn, hãy thử ${what} nhỏ hơn.`;
      return;
    }
    if (a.status === 'small') {
      attempts = [...attempts, a];
      message = `${a.candidate}² = ${a.square} < ${area}, nhưng ${what} lớn hơn vẫn có thể được. Hãy thử ${what} lớn hơn.`;
      return;
    }
    attempts = [];
    found = at + 1;
    const b = bracketText(area, at);
    if (a.exact) {
      message = `${a.candidate}² = ${area}. Vậy √${area} = ${a.candidate}: cạnh là số tự nhiên, một số hữu tỉ.`;
    } else {
      message = `Đúng! ${b.lo}² = ${b.loSquare} < ${area} < ${b.hiSquare} = ${b.hi}², nên ${b.lo} < √${area} < ${b.hi}.`;
    }
  }
</script>

<div class="space-y-4">
  <SliderField
    label="Diện tích hình vuông S"
    bind:value={area}
    min={MIN_AREA}
    max={MAX_AREA}
    unit="đơn vị diện tích"
    oninput={restart}
  />

  <div class="grid gap-4 md:grid-cols-[minmax(0,20rem)_1fr]">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xs select-none"
      style:aspect-ratio="{W} / {H}"
      style:touch-action="none"
      role="group"
      aria-label="Hình vuông có diện tích {area}, cạnh bằng căn bậc hai số học của {area}, xấp xỉ {formatNumber(
        side,
        3,
      )}"
    >
      {#each Array.from({ length: UNITS + 1 }, (_, i) => i) as i (i)}
        <line x1={X0 + i * U} y1={PAD} x2={X0 + i * U} y2={Y0} stroke="#e2e8f0" />
        <line x1={X0} y1={PAD + i * U} x2={X0 + UNITS * U} y2={PAD + i * U} stroke="#e2e8f0" />
      {/each}
      <rect
        x={X0}
        y={Y0 - side * U}
        width={side * U}
        height={side * U}
        fill="#c7d2fe"
        fill-opacity="0.75"
        stroke="#4f46e5"
        stroke-width="2"
      />
      <text
        x={small ? X0 + side * U + 18 : X0 + (side * U) / 2}
        y={Y0 - (side * U) / 2 + 6}
        text-anchor={small ? 'start' : 'middle'}
        font-size="18"
        font-weight="700"
        fill="#312e81">S = {area}</text
      >
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Góc hình vuông: kéo hoặc dùng phím mũi tên để đổi diện tích"
        aria-valuemin={MIN_AREA}
        aria-valuemax={MAX_AREA}
        aria-valuenow={area}
        aria-valuetext="Diện tích {area}"
        style="cursor:grab; outline:none"
        use:draggable={drag}
      >
        <circle
          class="drag-knob"
          cx={X0 + side * U}
          cy={Y0 - side * U}
          r="10"
          fill="#4f46e5"
          stroke="white"
          stroke-width="3"
        />
      </g>
    </svg>

    <div class="min-w-0 space-y-3">
      <p class="text-slate-800">
        Cạnh x thoả mãn <span class="font-semibold">x² = {area}</span>, nên
        <span class="font-semibold">x = √{area}</span>.
        {#if finished && exact}
          √{area} = {Math.round(side)} là số tự nhiên.
        {:else if finished}
          Máy tính cho √{area} ≈ {formatNumber(side, 9)}.
        {/if}
      </p>

      {#if !finished}
        <div>
          <p class="mb-1 text-sm font-semibold text-slate-700">
            {#if level === 0}
              Tìm số tự nhiên n lớn nhất có n² ≤ {area}:
            {:else}
              Tìm chữ số thứ {level} sau dấu phẩy: {known?.lo}{level > 1 ? '' : ','}…
            {/if}
          </p>
          <div class="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {#each Array.from({ length: 10 }, (_, k) => k) as k (k)}
              {@const tried = attempts.find((a) => a.digit === k)}
              <button
                type="button"
                class="{tried ? button.quiet : button.secondary} px-0 {tried?.status === 'big'
                  ? 'text-rose-700'
                  : tried?.status === 'small'
                    ? 'text-amber-700'
                    : ''}"
                aria-label={level === 0 ? `Thử n = ${k}` : `Thử chữ số ${k}`}
                onclick={() => tryIt(k)}>{k}</button
              >
            {/each}
          </div>
        </div>
      {/if}

      {#if attempts.length > 0}
        <ul class="space-y-0.5 text-sm tabular-nums text-slate-700">
          {#each attempts as a (a.digit)}
            <li>
              {a.candidate}² = {a.square}
              {a.status === 'big' ? '>' : '<'}
              {area}
            </li>
          {/each}
        </ul>
      {/if}

      <p aria-live="polite" class="min-h-6 font-semibold text-indigo-800">{message}</p>

      {#if finished && !exact}
        <p class="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-950">
          {area} không phải là bình phương của một số tự nhiên, nên √{area} là số vô tỉ: em có thể chặn
          thêm bao nhiêu chữ số tuỳ ý, nhưng các chữ số thập phân không bao giờ lặp lại theo chu kì.
        </p>
      {/if}
      <button type="button" class={button.quiet} onclick={restart}>Tìm lại từ đầu</button>
    </div>
  </div>

  {#if known}
    <div class="rounded-lg border border-slate-200 bg-white p-2">
      <p class="px-2 text-sm text-slate-700">
        {#if exact}
          √{area} = {known.lo} trên trục số:
        {:else}
          √{area} nằm giữa {known.lo} và {known.hi} trên trục số:
        {/if}
      </p>
      {#key `${area}-${found}`}
        <NumberLine
          min={lineMin}
          max={lineMax}
          {step}
          subdivisions={10}
          value={side}
          interactive={false}
          marks={[
            { value: known.loValue, label: known.lo, color: '#1B998B' },
            { value: known.hiValue, label: known.hi, color: '#1B998B' },
          ]}
          format={(v) => formatNumber(v, Math.max(0, found - 1))}
          label="Trục số từ {formatNumber(lineMin, found)} đến {formatNumber(lineMax, found)}"
          markerLabel="Điểm √{area}"
        />
      {/key}
    </div>
  {/if}
</div>
