<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { fromSvg, tenths, toSvg, wrapDeg } from '../_shared/polar.js';
  import { WORDS, cm, inAxis, position, sentence, throughCentre } from './engine.js';

  // O in the middle; one centimetre is U units. OM goes up to 6,2 cm.
  const W = 340;
  const H = 320;
  const U = 24;
  const O = { x: W / 2, y: H / 2 };
  const OM_MAX = 62;

  const COLORS = { trong: '#2563eb', tren: '#059669', ngoai: '#e11d48' };

  /** R in tenths of a cm (the slider works in cm). */
  let rCm = $state(4);
  const r = $derived(Math.round(rCm * 10));

  let mPt = $state(toSvg(O, U, 3, 40));
  const polarM = $derived(fromSvg(O, U, mPt));
  const om = $derived(Math.round(polarM.dist * 10));
  const mDeg = $derived(wrapDeg(polarM.deg));

  let mode = $state(/** @type {'none' | 'centre' | 'axis'} */ ('none'));
  let axis = $state(60);

  const pos = $derived(position(om, r));
  const imageDeg = $derived(
    mode === 'centre' ? throughCentre(mDeg) : mode === 'axis' ? inAxis(mDeg, axis) : mDeg,
  );
  const mImg = $derived(toSvg(O, U, om / 10, imageDeg));
  const axisA = $derived(toSvg(O, U, 6.6, axis));
  const axisB = $derived(toSvg(O, U, 6.6, axis + 180));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  /** Moves M to `t` tenths of a cm from O in direction `deg`. */
  function place(/** @type {number} */ t, /** @type {number} */ deg) {
    mPt = toSvg(O, U, Math.max(0, Math.min(OM_MAX, t)) / 10, wrapDeg(deg));
  }

  const mOpts = $derived({
    point: mPt,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      const q = fromSvg(O, U, p);
      return toSvg(O, U, tenths(q.dist, 0, OM_MAX, r) / 10, wrapDeg(q.deg));
    },
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy, big = false) => {
      if (dy) place(om - dy * (big ? 5 : 1), mDeg);
      else place(om, mDeg - dx * (big ? 15 : 5));
    },
  });

  const len = (/** @type {number} */ t) => formatNumber(t / 10, 1);
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-[3fr_2fr]">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="block w-full touch-none select-none rounded-lg border border-slate-200 bg-white"
      role="group"
      aria-label={`Đường tròn tâm O bán kính ${cm(r)} và điểm M với OM = ${cm(om)}. Kéo M để đổi vị trí.`}
    >
      <!-- the disc and its circle -->
      <circle cx={O.x} cy={O.y} r={(r / 10) * U} fill="#ecfdf5" stroke="#059669" stroke-width="3" />

      {#if mode === 'axis'}
        <line
          x1={axisA.x}
          y1={axisA.y}
          x2={axisB.x}
          y2={axisB.y}
          stroke="#7c3aed"
          stroke-width="2"
          stroke-dasharray="6 4"
        />
        <text x={axisA.x} y={axisA.y - 6} font-size="13" font-weight="700" fill="#7c3aed">d</text>
      {/if}

      {#if mode !== 'none'}
        <line
          x1={mPt.x}
          y1={mPt.y}
          x2={mImg.x}
          y2={mImg.y}
          stroke="#94a3b8"
          stroke-width="1.5"
          stroke-dasharray="3 3"
        />
        <line x1={O.x} y1={O.y} x2={mImg.x} y2={mImg.y} stroke="#7c3aed" stroke-width="2.5" />
        <circle cx={mImg.x} cy={mImg.y} r="6" fill="#7c3aed" />
        <text x={mImg.x + 9} y={mImg.y - 8} font-size="14" font-weight="700" fill="#7c3aed">M′</text
        >
      {/if}

      <line x1={O.x} y1={O.y} x2={mPt.x} y2={mPt.y} stroke={COLORS[pos]} stroke-width="3" />
      <circle cx={O.x} cy={O.y} r="4" fill="#0f172a" />
      <text x={O.x - 16} y={O.y + 16} font-size="14" font-weight="700" fill="#0f172a">O</text>

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Điểm M. Mũi tên lên, xuống đổi khoảng cách OM; mũi tên trái, phải quay M quanh O"
        aria-valuemin={0}
        aria-valuemax={OM_MAX / 10}
        aria-valuenow={om / 10}
        aria-valuetext={`OM = ${cm(om)}, M ${WORDS[pos].text}`}
        style="cursor:grab; outline:none"
        use:draggable={mOpts}
      >
        <circle
          class="drag-knob"
          cx={mPt.x}
          cy={mPt.y}
          r="9"
          fill={COLORS[pos]}
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text x={mPt.x + 10} y={mPt.y + 20} font-size="14" font-weight="700" fill="#0f172a">M</text>
    </svg>

    <div class="space-y-3">
      <SliderField label="Bán kính R" bind:value={rCm} min={1} max={5} step={0.1} unit="cm" />
      <table class="w-full text-sm tabular-nums">
        <caption class="sr-only">So sánh OM với bán kính</caption>
        <tbody>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">OM</th>
            <td class="py-1.5 text-right font-semibold" style="color:{COLORS[pos]}">{len(om)} cm</td
            >
          </tr>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">R</th>
            <td class="py-1.5 text-right font-semibold text-emerald-700">{len(r)} cm</td>
          </tr>
          <tr>
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">So sánh</th>
            <td class="py-1.5 text-right font-semibold" style="color:{COLORS[pos]}"
              >OM {WORDS[pos].sign} R</td
            >
          </tr>
        </tbody>
      </table>
      <SegmentedControl
        label="Lấy điểm đối xứng của M"
        options={[
          { value: 'none', label: 'Không' },
          { value: 'centre', label: 'Qua tâm O' },
          { value: 'axis', label: 'Qua trục d' },
        ]}
        bind:value={mode}
      />
      {#if mode === 'axis'}
        <SliderField
          label="Hướng của trục d (đi qua O)"
          bind:value={axis}
          min={0}
          max={179}
          step={1}
          unit="°"
        />
      {/if}
    </div>
  </div>

  <FeedbackNote tone={pos === 'tren' ? 'ok' : 'info'} text={sentence(om, r, mode)} />
  <p class="text-sm text-slate-600">
    Kéo M (hoặc dùng phím mũi tên) và đổi bán kính. M nằm trên đường tròn đúng khi OM = R. Bật điểm
    đối xứng để thấy: M thuộc đường tròn thì M′ cũng thuộc đường tròn, với mọi trục d đi qua O.
  </p>
</div>
