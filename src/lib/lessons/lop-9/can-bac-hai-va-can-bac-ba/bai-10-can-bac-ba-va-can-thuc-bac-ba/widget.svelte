<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { intText } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { rootValue } from '../_shared/root-text.js';
  import { cbrtText, cubeFaces, cubeRoot, cubeSentence } from './engine.js';

  // Plot of y = x³: x from −5,5 to 5,5 and y from −130 to 130.
  const W = 300;
  const H = 280;
  const PAD = 16;
  const X_SPAN = 5.5;
  const Y_SPAN = 130;
  const A_MAX = 125;
  const sx = (/** @type {number} */ x) => PAD + ((x + X_SPAN) / (2 * X_SPAN)) * (W - 2 * PAD);
  const sy = (/** @type {number} */ y) => PAD + ((Y_SPAN - y) / (2 * Y_SPAN)) * (H - 2 * PAD);
  const vy = (/** @type {number} */ py) => Y_SPAN - ((py - PAD) / (H - 2 * PAD)) * 2 * Y_SPAN;
  const UNIT_Y = (H - 2 * PAD) / (2 * Y_SPAN);

  const CURVE = (() => {
    let d = '';
    for (let i = 0; i <= 200; i++) {
      const x = -X_SPAN + (2 * X_SPAN * i) / 200;
      const y = x ** 3;
      if (Math.abs(y) > Y_SPAN) continue;
      d += `${d ? 'L' : 'M'} ${sx(x).toFixed(1)} ${sy(y).toFixed(1)} `;
    }
    return d.trim();
  })();
  const X_TICKS = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
  const Y_TICKS = [-125, -64, -27, 27, 64, 125];
  const PRESETS = [-125, -27, -8, 1, 10, 64];

  let handle = $state({ x: sx(0), y: sy(27) });
  const a = $derived(Math.max(-A_MAX, Math.min(A_MAX, Math.round(vy(handle.y)))));
  const root = $derived(cubeRoot(a));
  const negative = $derived(a < 0);

  const snap = (/** @type {{ x: number, y: number }} */ p) => ({
    x: sx(0),
    y: sy(Math.max(-A_MAX, Math.min(A_MAX, Math.round(vy(p.y))))),
  });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const dragOpts = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    projector: snap,
    pad: 0,
    keyStep: UNIT_Y,
    keyShiftStep: UNIT_Y * 10,
  });

  /** @param {number} v */
  function setA(v) {
    handle = { x: sx(0), y: sy(v) };
  }

  // Cube: edge |∛a| times 22 px, in its own drawing.
  const EDGE_PX = 22;
  const edge = $derived(Math.abs(root) * EDGE_PX);
  const faces = $derived(cubeFaces(30, 160, edge));
  const rootText = $derived.by(() => {
    const v = rootValue(Math.abs(root));
    return `${v.sign} ${negative && root !== 0 ? '−' : ''}${v.text}`;
  });
  const edgeText = $derived.by(() => {
    const v = rootValue(Math.abs(root));
    return `${v.exact ? '' : 'khoảng '}${v.text}`;
  });
  const palette = $derived(
    negative
      ? { front: '#fecdd3', top: '#ffe4e6', side: '#fda4af', stroke: '#be123c' }
      : { front: '#c7d2fe', top: '#e0e7ff', side: '#a5b4fc', stroke: '#3730a3' },
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="block w-full touch-none select-none rounded-lg border border-slate-200 bg-white"
      role="group"
      aria-label={`Đồ thị y = x³ và đường thẳng y = ${intText(a)}; chúng cắt nhau tại đúng một điểm có hoành độ ${cbrtText(a)} ${rootText}.`}
    >
      <line x1={PAD} y1={sy(0)} x2={W - PAD} y2={sy(0)} stroke="#334155" stroke-width="1.2" />
      <line x1={sx(0)} y1={PAD} x2={sx(0)} y2={H - PAD} stroke="#334155" stroke-width="1.2" />
      {#each X_TICKS as t (t)}
        <line x1={sx(t)} y1={sy(0) - 3} x2={sx(t)} y2={sy(0) + 3} stroke="#334155" />
        <text x={sx(t)} y={sy(0) + 14} text-anchor="middle" font-size="9" fill="#475569"
          >{intText(t)}</text
        >
      {/each}
      {#each Y_TICKS as t (t)}
        <line x1={sx(0) - 3} y1={sy(t)} x2={sx(0) + 3} y2={sy(t)} stroke="#334155" />
        <text x={sx(0) - 6} y={sy(t) + 3} text-anchor="end" font-size="9" fill="#475569"
          >{intText(t)}</text
        >
      {/each}
      <path d={CURVE} fill="none" stroke="#4f46e5" stroke-width="2.5" />
      <text x={sx(3.3)} y={sy(120)} font-size="12" font-weight="700" fill="#4f46e5">y = x³</text>

      <line x1={PAD} y1={sy(a)} x2={W - PAD} y2={sy(a)} stroke="#d97706" stroke-width="1.8" />
      <line
        x1={sx(root)}
        y1={sy(a)}
        x2={sx(root)}
        y2={sy(0)}
        stroke={palette.stroke}
        stroke-width="1.2"
        stroke-dasharray="3 3"
      />
      <circle cx={sx(root)} cy={sy(a)} r="5.5" fill={palette.stroke} />
      <circle cx={sx(root)} cy={sy(0)} r="3.5" fill={palette.stroke} />

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Số a, kéo lên xuống trên trục tung"
        aria-valuemin={-A_MAX}
        aria-valuemax={A_MAX}
        aria-valuenow={a}
        aria-valuetext={`a = ${intText(a)}`}
        style="cursor:grab; outline:none"
        use:draggable={dragOpts}
      >
        <rect
          class="drag-knob"
          x={sx(0) - 9}
          y={sy(a) - 9}
          width="18"
          height="18"
          rx="4"
          fill="#d97706"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text
        x={sx(0) + (negative ? 14 : -14)}
        y={sy(a) + (negative ? 16 : -8)}
        text-anchor={negative ? 'start' : 'end'}
        font-size="12"
        font-weight="700"
        fill="#92400e">a = {intText(a)}</text
      >
    </svg>

    <svg
      viewBox="0 0 200 180"
      class="block w-full select-none rounded-lg border border-slate-200 bg-white"
      role="img"
      aria-label={`Khối lập phương thể tích ${intText(Math.abs(a))}, cạnh ${edgeText}.`}
    >
      {#if edge > 0}
        <polygon
          points={faces.front}
          fill={palette.front}
          stroke={palette.stroke}
          stroke-width="1.5"
        />
        <polygon points={faces.top} fill={palette.top} stroke={palette.stroke} stroke-width="1.5" />
        <polygon
          points={faces.side}
          fill={palette.side}
          stroke={palette.stroke}
          stroke-width="1.5"
        />
      {/if}
      <text
        x="100"
        y="176"
        text-anchor="middle"
        font-size="12"
        font-weight="700"
        fill={palette.stroke}>{cbrtText(a)} {rootText}</text
      >
    </svg>
  </div>

  <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn nhanh số a">
    {#each PRESETS as p (p)}
      <button type="button" class="{button.quiet} min-w-14" onclick={() => setA(p)}
        >{intText(p)}</button
      >
    {/each}
  </div>

  <FeedbackNote tone={negative ? 'warn' : 'ok'} text={cubeSentence(a)} />
  <p class="text-sm text-slate-600">
    Khác với y = x², đường thẳng y = a luôn cắt y = x³ tại đúng một điểm, dù a dương, âm hay bằng 0:
    mọi số thực đều có đúng một căn bậc ba.
  </p>
</div>
