<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { fromSvg, toSvg, wrapDeg } from '../_shared/polar.js';
  import { half, ringLine, sectorLines } from './engine.js';

  // O in the middle; one centimetre is U units. Radii move in half
  // centimetres from 1 cm to 4,5 cm and are stored doubled (r2 = 2R).
  const W = 340;
  const H = 310;
  const U = 30;
  const O = { x: W / 2, y: H / 2 };
  const R2_MIN = 2;
  const R2_MAX = 9;

  let mode = $state(/** @type {'quat' | 'vanh'} */ ('quat'));

  let r2 = $state(6);
  let inner2 = $state(4);
  let n = $state(120);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const big = $derived(r2 / 2);
  const small = $derived(inner2 / 2);
  const nPt = $derived(toSvg(O, U, big, n));
  const rPt = $derived(toSvg(O, U, big, 0));
  const innerPt = $derived(toSvg(O, U, small, 180));

  const clampR2 = (/** @type {number} */ v, /** @type {number} */ lo, /** @type {number} */ hi) =>
    Math.max(lo, Math.min(hi, Math.round(v)));
  const outerLo = $derived(mode === 'vanh' ? inner2 + 1 : R2_MIN);

  /** Sets the outer radius and keeps the inner circle strictly inside it. */
  function setOuter(/** @type {number} */ v) {
    r2 = clampR2(v, outerLo, R2_MAX);
    if (inner2 > r2 - 1) inner2 = r2 - 1;
  }

  /** Degrees 0 to 359 read as an angle of 1° to 360° (0 is the full turn). */
  const turn = (/** @type {number} */ deg) => wrapDeg(deg) || 360;

  const nOpts = $derived({
    point: { ...nPt },
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      n = turn(fromSvg(O, U, p).deg);
      return toSvg(O, U, big, n);
    },
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy, bigStep = false) => {
      const d = (dx || -dy) * (bigStep ? 15 : 1);
      n = Math.max(1, Math.min(360, n + d));
    },
  });

  const rOpts = $derived({
    point: { ...rPt },
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      setOuter(((p.x - O.x) / U) * 2);
      return toSvg(O, U, r2 / 2, 0);
    },
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy) => {
      setOuter(r2 + (dx || -dy));
    },
  });

  const innerOpts = $derived({
    point: { ...innerPt },
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      inner2 = clampR2(((O.x - p.x) / U) * 2, 1, r2 - 1);
      return toSvg(O, U, inner2 / 2, 180);
    },
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy) => {
      inner2 = clampR2(inner2 + (-dx || -dy), 1, r2 - 1);
    },
  });

  const sectorPath = $derived(
    n >= 360
      ? ''
      : `M ${O.x} ${O.y} L ${rPt.x} ${rPt.y} A ${big * U} ${big * U} 0 ${n > 180 ? 1 : 0} 0 ${nPt.x} ${nPt.y} Z`,
  );
  const arcOnly = $derived(
    n >= 360
      ? ''
      : `M ${rPt.x} ${rPt.y} A ${big * U} ${big * U} 0 ${n > 180 ? 1 : 0} 0 ${nPt.x} ${nPt.y}`,
  );
  const lines = $derived(sectorLines(r2, n));
  // The centre's name sits opposite the middle of the sector.
  const labelO = $derived(toSvg(O, U, 0.5, mode === 'quat' ? n / 2 + 180 : 90));

  const feedback = $derived(
    mode === 'quat'
      ? `Hình quạt ${n}° chiếm ${lines.part} hình tròn, nên cung của nó dài bằng ${lines.part} chu vi và diện tích bằng ${lines.part} diện tích hình tròn bán kính ${half(r2)} cm.`
      : `Hình vành khuyên là phần nằm giữa hai đường tròn đồng tâm bán kính ${half(r2)} cm và ${half(inner2)} cm: lấy diện tích hình tròn lớn trừ diện tích hình tròn nhỏ.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hình đang xét"
    options={[
      { value: 'quat', label: 'Hình quạt tròn' },
      { value: 'vanh', label: 'Hình vành khuyên' },
    ]}
    bind:value={mode}
  />

  <div class="grid gap-3 md:grid-cols-[3fr_2fr]">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="block w-full touch-none select-none rounded-lg border border-slate-200 bg-white"
      role="group"
      aria-label={mode === 'quat'
        ? `Hình quạt tròn bán kính ${half(r2)} cm, góc ở tâm ${n}°. Kéo các điểm để đổi.`
        : `Hình vành khuyên giữa hai đường tròn bán kính ${half(r2)} cm và ${half(inner2)} cm.`}
    >
      {#if mode === 'quat'}
        <circle cx={O.x} cy={O.y} r={big * U} fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
        {#if n >= 360}
          <circle cx={O.x} cy={O.y} r={big * U} fill="#fde68a" stroke="#e11d48" stroke-width="5" />
        {:else}
          <path d={sectorPath} fill="#fde68a" stroke="#b45309" stroke-width="1.5" />
          <path d={arcOnly} fill="none" stroke="#e11d48" stroke-width="5" stroke-linecap="round" />
        {/if}
        <line x1={O.x} y1={O.y} x2={nPt.x} y2={nPt.y} stroke="#b45309" stroke-width="2" />
      {:else}
        <circle cx={O.x} cy={O.y} r={big * U} fill="#c7d2fe" stroke="#4338ca" stroke-width="2.5" />
        <circle cx={O.x} cy={O.y} r={small * U} fill="#fff" stroke="#4338ca" stroke-width="2.5" />
        <line x1={O.x} y1={O.y} x2={innerPt.x} y2={innerPt.y} stroke="#0f766e" stroke-width="2" />
        <text
          x={(O.x + innerPt.x) / 2}
          y={O.y - 8}
          text-anchor="middle"
          font-size="13"
          font-weight="700"
          fill="#0f766e">r</text
        >
      {/if}
      <line x1={O.x} y1={O.y} x2={rPt.x} y2={rPt.y} stroke="#334155" stroke-width="2" />
      <text
        x={(O.x + rPt.x) / 2}
        y={O.y + 18}
        text-anchor="middle"
        font-size="13"
        font-weight="700"
        fill="#334155">R</text
      >
      <circle cx={O.x} cy={O.y} r="4" fill="#0f172a" />
      <text
        x={labelO.x}
        y={labelO.y + 5}
        text-anchor="middle"
        font-size="14"
        font-weight="700"
        fill="#0f172a">O</text
      >

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Bán kính R, kéo ngang hoặc dùng phím mũi tên"
        aria-valuemin={outerLo / 2}
        aria-valuemax={R2_MAX / 2}
        aria-valuenow={big}
        aria-valuetext={`R = ${half(r2)} cm`}
        style="cursor:grab; outline:none"
        use:draggable={rOpts}
      >
        <circle
          class="drag-knob"
          cx={rPt.x}
          cy={rPt.y}
          r="8"
          fill="#334155"
          stroke="#fff"
          stroke-width="2"
        />
      </g>

      {#if mode === 'quat'}
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Đầu cung, kéo quanh tâm để đổi góc ở tâm n"
          aria-valuemin={1}
          aria-valuemax={360}
          aria-valuenow={n}
          aria-valuetext={`n = ${n}°`}
          style="cursor:grab; outline:none"
          use:draggable={nOpts}
        >
          <circle
            class="drag-knob"
            cx={nPt.x}
            cy={nPt.y}
            r="9"
            fill="#e11d48"
            stroke="#fff"
            stroke-width="2"
          />
        </g>
      {:else}
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Bán kính r của đường tròn nhỏ, kéo ngang hoặc dùng phím mũi tên"
          aria-valuemin={0.5}
          aria-valuemax={(r2 - 1) / 2}
          aria-valuenow={small}
          aria-valuetext={`r = ${half(inner2)} cm`}
          style="cursor:grab; outline:none"
          use:draggable={innerOpts}
        >
          <circle
            class="drag-knob"
            cx={innerPt.x}
            cy={innerPt.y}
            r="8"
            fill="#0f766e"
            stroke="#fff"
            stroke-width="2"
          />
        </g>
      {/if}
    </svg>

    <div class="space-y-2 text-sm">
      {#if mode === 'quat'}
        <p class="font-semibold text-slate-700">
          R = {half(r2)} cm, n = {n}°, phần hình tròn: {lines.part}
        </p>
        <div
          class="h-3 w-full overflow-hidden rounded-full bg-slate-100"
          role="img"
          aria-label={`Hình quạt chiếm ${lines.part} hình tròn`}
        >
          <div class="h-full bg-amber-400" style="width:{(n / 360) * 100}%"></div>
        </div>
        <p class="text-slate-600">{lines.circumference}</p>
        <p class="font-semibold text-rose-700">{lines.length}</p>
        <p class="font-semibold text-amber-800">{lines.area}</p>
        <div class="flex flex-wrap gap-2" role="group" aria-label="Đặt nhanh góc ở tâm">
          {#each [60, 90, 180, 360] as d (d)}
            <button type="button" class={button.quiet} onclick={() => (n = d)}>{d}°</button>
          {/each}
        </div>
      {:else}
        <p class="font-semibold text-slate-700">R = {half(r2)} cm, r = {half(inner2)} cm</p>
        <p class="font-semibold text-indigo-800">{ringLine(r2, inner2)}</p>
      {/if}
    </div>
  </div>

  <FeedbackNote tone="info" text={feedback} />
  <p class="text-sm text-slate-600">
    Kéo các chấm tròn (hoặc chọn rồi dùng phím mũi tên): chấm đỏ đổi góc ở tâm n, chấm xám đổi bán
    kính R, chấm xanh lục đổi bán kính r của hình tròn nhỏ.
  </p>
</div>
