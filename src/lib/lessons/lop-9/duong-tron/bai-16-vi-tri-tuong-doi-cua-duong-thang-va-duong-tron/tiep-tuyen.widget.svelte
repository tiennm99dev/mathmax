<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import { fromSvg, tenths, toSvg, wrapDeg } from '../_shared/polar.js';
  import { len, tangentSentence, tangentText, tangents } from './engine.js';

  // Circle (O; 3 cm); M stays outside, from 3,4 cm to 6 cm from O.
  const W = 340;
  const H = 330;
  const U = 24;
  const O = { x: W / 2, y: H / 2 };
  const R = 30;
  const OM_MIN = 34;
  const OM_MAX = 60;

  let om = $state(50);
  let dir = $state(20);

  const mPt = $derived(toSvg(O, U, om / 10, dir));
  const t = $derived(tangents(om / 10, R / 10));
  const aDeg = $derived(dir + t.half);
  const bDeg = $derived(dir - t.half);
  const aPt = $derived(toSvg(O, U, R / 10, aDeg));
  const bPt = $derived(toSvg(O, U, R / 10, bDeg));
  // Each tangent is drawn a little past its point of contact.
  const aFar = $derived({ x: aPt.x + (aPt.x - mPt.x) * 0.35, y: aPt.y + (aPt.y - mPt.y) * 0.35 });
  const bFar = $derived({ x: bPt.x + (bPt.x - mPt.x) * 0.35, y: bPt.y + (bPt.y - mPt.y) * 0.35 });
  const labelA = $derived(toSvg(O, U, R / 10 + 0.5, aDeg));
  const labelB = $derived(toSvg(O, U, R / 10 + 0.5, bDeg));
  const labelM = $derived(toSvg(O, U, om / 10 + 0.55, dir));

  /** Direction (degrees) from point p to point q, counter-clockwise. */
  const toward = (
    /** @type {{ x: number, y: number }} */ p,
    /** @type {{ x: number, y: number }} */ q,
  ) => (Math.atan2(p.y - q.y, q.x - p.x) * 180) / Math.PI;

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const mOpts = $derived({
    point: { ...mPt },
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      const q = fromSvg(O, U, p);
      om = tenths(q.dist, OM_MIN, OM_MAX);
      dir = wrapDeg(q.deg);
      return toSvg(O, U, om / 10, dir);
    },
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy, big = false) => {
      if (dy) om = Math.max(OM_MIN, Math.min(OM_MAX, om - dy * (big ? 5 : 1)));
      else dir = wrapDeg(dir - dx * (big ? 15 : 5));
    },
  });
</script>

<div class="space-y-3">
  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-md touch-none select-none overflow-hidden rounded-lg border border-slate-200 bg-white"
    role="group"
    aria-label={`Đường tròn tâm O bán kính 3 cm, điểm M ngoài đường tròn với OM = ${len(om)} cm và hai tiếp tuyến MA, MB. Kéo M để đổi.`}
  >
    <path
      d={`M ${O.x} ${O.y} L ${aPt.x} ${aPt.y} L ${mPt.x} ${mPt.y} L ${bPt.x} ${bPt.y} Z`}
      fill="#ecfdf5"
    />
    <circle cx={O.x} cy={O.y} r={(R / 10) * U} fill="none" stroke="#334155" stroke-width="2.5" />
    <line x1={mPt.x} y1={mPt.y} x2={aFar.x} y2={aFar.y} stroke="#2563eb" stroke-width="3" />
    <line x1={mPt.x} y1={mPt.y} x2={bFar.x} y2={bFar.y} stroke="#2563eb" stroke-width="3" />
    <line x1={O.x} y1={O.y} x2={aPt.x} y2={aPt.y} stroke="#7c3aed" stroke-width="2" />
    <line x1={O.x} y1={O.y} x2={bPt.x} y2={bPt.y} stroke="#7c3aed" stroke-width="2" />
    <line
      x1={O.x}
      y1={O.y}
      x2={mPt.x}
      y2={mPt.y}
      stroke="#b45309"
      stroke-width="2"
      stroke-dasharray="6 4"
    />
    <path
      d={rightMarkPath(aPt, toward(aPt, O), toward(aPt, mPt), 9)}
      fill="none"
      stroke="#7c3aed"
      stroke-width="1.5"
    />
    <path
      d={rightMarkPath(bPt, toward(bPt, O), toward(bPt, mPt), 9)}
      fill="none"
      stroke="#7c3aed"
      stroke-width="1.5"
    />
    <circle cx={aPt.x} cy={aPt.y} r="4.5" fill="#2563eb" />
    <circle cx={bPt.x} cy={bPt.y} r="4.5" fill="#2563eb" />
    <text
      x={labelA.x}
      y={labelA.y + 5}
      text-anchor="middle"
      font-size="14"
      font-weight="700"
      fill="#0f172a">A</text
    >
    <text
      x={labelB.x}
      y={labelB.y + 5}
      text-anchor="middle"
      font-size="14"
      font-weight="700"
      fill="#0f172a">B</text
    >
    <circle cx={O.x} cy={O.y} r="4" fill="#0f172a" />
    <text x={O.x - 16} y={O.y + 5} font-size="14" font-weight="700" fill="#0f172a">O</text>

    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Điểm M ngoài đường tròn. Mũi tên lên, xuống đổi OM; trái, phải quay M quanh O"
      aria-valuemin={OM_MIN / 10}
      aria-valuemax={OM_MAX / 10}
      aria-valuenow={om / 10}
      aria-valuetext={`OM = ${len(om)} cm, MA = MB ${tangentText(om, R)} cm`}
      style="cursor:grab; outline:none"
      use:draggable={mOpts}
    >
      <circle
        class="drag-knob"
        cx={mPt.x}
        cy={mPt.y}
        r="9"
        fill="#b45309"
        stroke="#fff"
        stroke-width="2"
      />
    </g>
    <text
      x={labelM.x}
      y={labelM.y + 5}
      text-anchor="middle"
      font-size="14"
      font-weight="700"
      fill="#0f172a">M</text
    >
  </svg>
  <p class="text-sm font-semibold text-slate-700">OM = {len(om)} cm, R = {len(R)} cm</p>
  <FeedbackNote tone="info" text={tangentSentence(om, R)} />
</div>
