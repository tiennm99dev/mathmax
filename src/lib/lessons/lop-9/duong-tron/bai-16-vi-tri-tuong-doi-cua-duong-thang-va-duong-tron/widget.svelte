<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import { fromSvg, tenths, toSvg, wrapDeg } from '../_shared/polar.js';
  import { COMMON, halfChord, len, lineSentence, relation } from './engine.js';

  // Circle (O; 3 cm); one centimetre is U units. The line a is drawn through
  // H, perpendicular to OH, so dragging H moves and turns the line; d = OH.
  const W = 340;
  const H = 320;
  const U = 30;
  const O = { x: W / 2, y: H / 2 };
  const R = 30; // tenths of a cm
  const D_MAX = 50;

  const COLORS = { cat: '#2563eb', 'tiep-xuc': '#059669', khong: '#e11d48' };
  const WORDS = { cat: 'Cắt nhau', 'tiep-xuc': 'Tiếp xúc', khong: 'Không giao nhau' };

  let d = $state(18);
  let dir = $state(70);

  const hPt = $derived(toSvg(O, U, d / 10, dir));
  const rel = $derived(relation(d, R));
  const half = $derived(halfChord(d / 10, R / 10));
  const along = $derived(dir + 90);
  const lineA = $derived(toSvg(hPt, U, 12, along));
  const lineB = $derived(toSvg(hPt, U, 12, along + 180));
  const ptA = $derived(toSvg(hPt, U, half, along + 180));
  const ptB = $derived(toSvg(hPt, U, half, along));
  const labelA = $derived(toSvg(ptA, U, 0.45, dir));
  const labelB = $derived(toSvg(ptB, U, 0.45, dir));
  const labelH = $derived(toSvg(hPt, U, 0.5, dir));
  const labelLine = $derived(toSvg(hPt, U, 3.6, along));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const hOpts = $derived({
    point: { ...hPt },
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      const q = fromSvg(O, U, p);
      d = tenths(q.dist, 0, D_MAX, R);
      if (d > 0) dir = wrapDeg(q.deg);
      return toSvg(O, U, d / 10, dir);
    },
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy, big = false) => {
      if (dy) d = Math.max(0, Math.min(D_MAX, d - dy * (big ? 5 : 1)));
      else dir = wrapDeg(dir - dx * (big ? 15 : 5));
    },
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-[3fr_2fr]">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="block w-full touch-none select-none overflow-hidden rounded-lg border border-slate-200 bg-white"
      role="group"
      aria-label={`Đường tròn tâm O bán kính 3 cm và đường thẳng a cách tâm ${len(d)} cm. Kéo điểm H để dời đường thẳng.`}
    >
      <circle
        cx={O.x}
        cy={O.y}
        r={(R / 10) * U}
        fill="#f8fafc"
        stroke="#334155"
        stroke-width="2.5"
      />
      <line
        x1={lineA.x}
        y1={lineA.y}
        x2={lineB.x}
        y2={lineB.y}
        stroke={COLORS[rel]}
        stroke-width="3"
      />
      <text x={labelLine.x} y={labelLine.y - 6} font-size="14" font-weight="700" fill={COLORS[rel]}
        >a</text
      >
      {#if d > 0}
        <line
          x1={O.x}
          y1={O.y}
          x2={hPt.x}
          y2={hPt.y}
          stroke="#7c3aed"
          stroke-width="2"
          stroke-dasharray="5 4"
        />
        <path
          d={rightMarkPath(hPt, dir + 180, along, 10)}
          fill="none"
          stroke="#7c3aed"
          stroke-width="1.5"
        />
      {/if}
      {#if rel === 'cat'}
        {#each [{ p: ptA, l: labelA, n: 'A' }, { p: ptB, l: labelB, n: 'B' }] as q (q.n)}
          <circle cx={q.p.x} cy={q.p.y} r="5" fill={COLORS.cat} />
          <text
            x={q.l.x}
            y={q.l.y + 5}
            text-anchor="middle"
            font-size="14"
            font-weight="700"
            fill={COLORS.cat}>{q.n}</text
          >
        {/each}
      {/if}
      <circle cx={O.x} cy={O.y} r="4" fill="#0f172a" />
      <text x={O.x - 16} y={O.y + 5} font-size="14" font-weight="700" fill="#0f172a">O</text>

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Điểm H, chân đường vuông góc từ O đến a. Mũi tên lên, xuống đổi khoảng cách d; trái, phải quay đường thẳng"
        aria-valuemin={0}
        aria-valuemax={D_MAX / 10}
        aria-valuenow={d / 10}
        aria-valuetext={`d = ${len(d)} cm, ${WORDS[rel].toLowerCase()}`}
        style="cursor:grab; outline:none"
        use:draggable={hOpts}
      >
        <circle
          class="drag-knob"
          cx={hPt.x}
          cy={hPt.y}
          r="9"
          fill={COLORS[rel]}
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text
        x={labelH.x}
        y={labelH.y + 5}
        text-anchor="middle"
        font-size="14"
        font-weight="700"
        fill="#0f172a">H</text
      >
    </svg>

    <div class="space-y-2">
      <table class="w-full text-sm tabular-nums">
        <caption class="sr-only">So sánh khoảng cách d với bán kính R</caption>
        <tbody>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">d = OH</th>
            <td class="py-1.5 text-right font-semibold" style="color:{COLORS[rel]}">{len(d)} cm</td>
          </tr>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">R</th>
            <td class="py-1.5 text-right font-semibold text-slate-900">{len(R)} cm</td>
          </tr>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">Vị trí</th>
            <td class="py-1.5 text-right font-semibold" style="color:{COLORS[rel]}"
              >{WORDS[rel]} (d {rel === 'cat' ? '<' : rel === 'khong' ? '>' : '='} R)</td
            >
          </tr>
          <tr>
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">Số điểm chung</th>
            <td class="py-1.5 text-right font-semibold" style="color:{COLORS[rel]}"
              >{COMMON[rel]}</td
            >
          </tr>
        </tbody>
      </table>
      <p class="text-sm text-slate-600">
        Thử kéo H ra đúng đường tròn: đường thẳng chỉ còn chạm đường tròn tại một điểm và luôn vuông
        góc với bán kính OH.
      </p>
    </div>
  </div>

  <FeedbackNote tone={rel === 'tiep-xuc' ? 'ok' : 'info'} text={lineSentence(d, R)} />
</div>
