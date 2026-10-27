<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { fromSvg, toSvg, wrapDeg } from '../_shared/polar.js';
  import { centralAngle, chordText, minorArc, sentence } from './engine.js';

  // A circle of radius R = 4 cm; one centimetre is U units.
  const W = 340;
  const H = 300;
  const U = 30;
  const R = 4;
  const O = { x: W / 2, y: H / 2 };
  const RP = R * U;

  const COLORS = { minor: '#e11d48', major: '#2563eb', chord: '#0f172a' };

  let aPt = $state(toSvg(O, U, R, 200));
  let bPt = $state(toSvg(O, U, R, 310));
  const aDeg = $derived(wrapDeg(fromSvg(O, U, aPt).deg));
  const bDeg = $derived(wrapDeg(fromSvg(O, U, bPt).deg));

  const alpha = $derived(centralAngle(aDeg, bDeg));
  const minor = $derived(minorArc(aDeg, bDeg));
  const arcStart = $derived(toSvg(O, U, R, minor.from));
  const arcEnd = $derived(toSvg(O, U, R, minor.from + minor.sweep));
  const mid = $derived(minor.from + minor.sweep / 2);
  const minorLabel = $derived(toSvg(O, U, R + 0.55, mid));
  const majorLabel = $derived(toSvg(O, U, R + 0.55, mid + 180));
  const angleLabel = $derived(toSvg(O, U, 1.05, mid));
  const markA = $derived(toSvg(O, U, 0.6, minor.from));
  const markB = $derived(toSvg(O, U, 0.6, minor.from + minor.sweep));
  // The centre's name sits opposite the angle mark.
  const labelO = $derived(toSvg(O, U, 0.5, mid + 180));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  /**
   * Drag options for an end of the chord: it slides on the circle in whole
   * degrees and never lands on the other end.
   * @param {'A' | 'B'} which
   */
  function opts(which) {
    const pt = which === 'A' ? aPt : bPt;
    const set = (/** @type {number} */ deg) => {
      const other = which === 'A' ? bDeg : aDeg;
      const d = wrapDeg(deg);
      if (d === other) return;
      if (which === 'A') aPt = toSvg(O, U, R, d);
      else bPt = toSvg(O, U, R, d);
    };
    return {
      point: pt,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      projector: (/** @type {{ x: number, y: number }} */ p) => {
        const d = wrapDeg(fromSvg(O, U, p).deg);
        const other = which === 'A' ? bDeg : aDeg;
        return toSvg(O, U, R, d === other ? d + 1 : d);
      },
      onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy, big = false) => {
        const step = (dx || -dy) * (big ? 10 : 1);
        set((which === 'A' ? aDeg : bDeg) + step);
      },
    };
  }
  const aOpts = $derived(opts('A'));
  const bOpts = $derived(opts('B'));

  /** Puts B so that the central angle is `deg`. */
  function preset(/** @type {number} */ deg) {
    bPt = toSvg(O, U, R, wrapDeg(aDeg + deg));
  }

  const ends = $derived([
    { name: 'A', pt: aPt, deg: aDeg, opts: aOpts },
    { name: 'B', pt: bPt, deg: bDeg, opts: bOpts },
  ]);
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-[3fr_2fr]">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="block w-full touch-none select-none rounded-lg border border-slate-200 bg-white"
      role="group"
      aria-label={`Đường tròn tâm O bán kính 4 cm, dây AB với góc ở tâm AOB bằng ${alpha}°. Kéo A hoặc B trên đường tròn.`}
    >
      <!-- major arc first (the whole circle), then the minor arc on top -->
      <circle
        cx={O.x}
        cy={O.y}
        r={RP}
        fill="none"
        stroke={COLORS.major}
        stroke-width="3"
        stroke-dasharray={alpha === 180 ? '' : '7 5'}
      />
      <path
        d={`M ${arcStart.x} ${arcStart.y} A ${RP} ${RP} 0 0 0 ${arcEnd.x} ${arcEnd.y}`}
        fill="none"
        stroke={COLORS.minor}
        stroke-width="6"
        stroke-linecap="round"
      />
      <path
        d={`M ${O.x} ${O.y} L ${markA.x} ${markA.y} A ${0.6 * U} ${0.6 * U} 0 0 0 ${markB.x} ${markB.y} Z`}
        fill="#fde68a"
        stroke="#b45309"
        stroke-width="1.5"
      />
      <line x1={O.x} y1={O.y} x2={aPt.x} y2={aPt.y} stroke="#64748b" stroke-width="2" />
      <line x1={O.x} y1={O.y} x2={bPt.x} y2={bPt.y} stroke="#64748b" stroke-width="2" />
      <line
        x1={aPt.x}
        y1={aPt.y}
        x2={bPt.x}
        y2={bPt.y}
        stroke={COLORS.chord}
        stroke-width="3.5"
        stroke-linecap="round"
      />
      <circle cx={O.x} cy={O.y} r="4" fill="#0f172a" />
      <text
        x={labelO.x}
        y={labelO.y + 5}
        text-anchor="middle"
        font-size="14"
        font-weight="700"
        fill="#0f172a">O</text
      >
      <text
        x={angleLabel.x}
        y={angleLabel.y + 4}
        text-anchor="middle"
        font-size="12"
        font-weight="700"
        fill="#b45309">{alpha}°</text
      >
      <text
        x={minorLabel.x}
        y={minorLabel.y + 4}
        text-anchor="middle"
        font-size="12"
        font-weight="700"
        fill={COLORS.minor}>{alpha}°</text
      >
      <text
        x={majorLabel.x}
        y={majorLabel.y + 4}
        text-anchor="middle"
        font-size="12"
        font-weight="700"
        fill={COLORS.major}>{360 - alpha}°</text
      >

      {#each ends as end (end.name)}
        {@const lab = toSvg(O, U, R - 0.5, end.deg)}
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label={`Điểm ${end.name} trên đường tròn, phím mũi tên để di chuyển`}
          aria-valuemin={0}
          aria-valuemax={359}
          aria-valuenow={end.deg}
          aria-valuetext={`Góc AOB = ${alpha}°`}
          style="cursor:grab; outline:none"
          use:draggable={end.opts}
        >
          <circle
            class="drag-knob"
            cx={end.pt.x}
            cy={end.pt.y}
            r="9"
            fill="#0f172a"
            stroke="#fff"
            stroke-width="2"
          />
        </g>
        <text
          x={lab.x}
          y={lab.y + 5}
          text-anchor="middle"
          font-size="14"
          font-weight="700"
          fill="#0f172a">{end.name}</text
        >
      {/each}
    </svg>

    <div class="space-y-2">
      <table class="w-full text-sm tabular-nums">
        <caption class="sr-only">Góc ở tâm, số đo cung và độ dài dây</caption>
        <tbody>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">Góc ở tâm AOB</th>
            <td class="py-1.5 text-right font-semibold text-amber-700">{alpha}°</td>
          </tr>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 text-left font-semibold" style="color:{COLORS.minor}"
              >{alpha === 180 ? 'Nửa đường tròn' : 'sđ cung nhỏ AB'}</th
            >
            <td class="py-1.5 text-right font-semibold" style="color:{COLORS.minor}">{alpha}°</td>
          </tr>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 text-left font-semibold" style="color:{COLORS.major}"
              >{alpha === 180 ? 'Nửa còn lại' : 'sđ cung lớn AB'}</th
            >
            <td class="py-1.5 text-right font-semibold" style="color:{COLORS.major}"
              >{360 - alpha}°</td
            >
          </tr>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">Dây</th>
            <td class="py-1.5 text-right font-semibold text-slate-900">{chordText(R, alpha)}</td>
          </tr>
          <tr>
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">Đường kính</th>
            <td class="py-1.5 text-right font-semibold text-slate-900">2R = {2 * R} cm</td>
          </tr>
        </tbody>
      </table>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Đặt nhanh góc ở tâm">
        {#each [60, 90, 120, 180] as d (d)}
          <button type="button" class={button.quiet} onclick={() => preset(d)}>{d}°</button>
        {/each}
      </div>
    </div>
  </div>

  <FeedbackNote tone={alpha === 180 ? 'ok' : 'info'} text={sentence(R, alpha)} />
  <p class="text-sm text-slate-600">
    Kéo hai đầu A, B của dây (hoặc chọn rồi dùng phím mũi tên). Cung đỏ là cung nhỏ, nằm bên trong
    góc ở tâm; cung xanh nét đứt là cung lớn. Bấm 180° để thấy dây dài nhất: đường kính.
  </p>
</div>
