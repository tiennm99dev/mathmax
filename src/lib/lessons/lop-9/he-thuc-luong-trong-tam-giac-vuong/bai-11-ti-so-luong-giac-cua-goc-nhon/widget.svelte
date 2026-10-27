<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { arcPath, rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import { legsForAngleB, ratioText, ratios, sentence, sidesOf, specialAt } from './engine.js';

  // Drawing: A at the bottom left, B on the horizontal leg, C on the vertical
  // leg; one unit of length is U pixels.
  const W = 340;
  const H = 260;
  const U = 24;
  const A = { x: 40, y: 224 };
  const AB_MAX = 11;
  const AC_MAX = 8;
  const MIN = 1;
  const STEP = 0.5;

  const COLORS = { opp: '#e11d48', adj: '#2563eb', hyp: '#7c3aed' };

  const clampLen = (/** @type {number} */ v, /** @type {number} */ max) =>
    Math.max(MIN, Math.min(max, v));
  const snapLen = (/** @type {number} */ v, /** @type {number} */ max) =>
    clampLen(Math.round(v / STEP) * STEP, max);

  let bPt = $state({ x: A.x + 8 * U, y: A.y });
  let cPt = $state({ x: A.x, y: A.y - 6 * U });
  /** @type {'B' | 'C'} */
  let vertex = $state('B');

  const ab = $derived(clampLen((bPt.x - A.x) / U, AB_MAX));
  const ac = $derived(clampLen((A.y - cPt.y) / U, AC_MAX));
  const sides = $derived(sidesOf(vertex, ab, ac));
  const r = $derived(ratios(sides.opp, sides.adj));
  const exact = $derived(specialAt(r.deg));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const bOpts = $derived({
    point: bPt,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => ({
      x: A.x + snapLen((p.x - A.x) / U, AB_MAX) * U,
      y: A.y,
    }),
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy, big = false) => {
      const d = dx || -dy;
      bPt = { x: A.x + snapLen(ab + d * (big ? 2 : STEP), AB_MAX) * U, y: A.y };
    },
  });
  const cOpts = $derived({
    point: cPt,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => ({
      x: A.x,
      y: A.y - snapLen((A.y - p.y) / U, AC_MAX) * U,
    }),
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy, big = false) => {
      const d = -dy || dx;
      cPt = { x: A.x, y: A.y - snapLen(ac + d * (big ? 2 : STEP), AC_MAX) * U };
    },
  });

  /** @param {number} newAb @param {number} newAc */
  function setLegs(newAb, newAc) {
    bPt = { x: A.x + newAb * U, y: A.y };
    cPt = { x: A.x, y: A.y - newAc * U };
  }

  /** Sets angle B (or C, when C is the chosen angle) to a special value. */
  function preset(/** @type {number} */ deg) {
    const angleB = vertex === 'B' ? deg : 90 - deg;
    const legs = legsForAngleB(angleB, 6);
    setLegs(legs.ab, legs.ac);
  }

  /** Scales the triangle and keeps its angles, when it still fits. */
  function scale(/** @type {number} */ k) {
    const nb = ab * k;
    const nc = ac * k;
    if (nb > AB_MAX || nc > AC_MAX || nb < MIN || nc < MIN) return;
    setLegs(nb, nc);
  }
  const canGrow = $derived(ab * 1.5 <= AB_MAX && ac * 1.5 <= AC_MAX);
  const canShrink = $derived(ab / 1.5 >= MIN && ac / 1.5 >= MIN);

  const B = $derived({ x: A.x + ab * U, y: A.y });
  const C = $derived({ x: A.x, y: A.y - ac * U });
  const angB = $derived((Math.atan2(ac, ab) * 180) / Math.PI);
  // Directions (degrees, counter-clockwise) of the sides at the chosen vertex.
  const arc = $derived(
    vertex === 'B' ? arcPath(B, 180, 180 - angB, 26) : arcPath(C, 270, 270 + (90 - angB), 26),
  );
  const oppSeg = $derived(vertex === 'B' ? [A, C] : [A, B]);
  const adjSeg = $derived(vertex === 'B' ? [A, B] : [A, C]);
  const len = (/** @type {number} */ v) => formatNumber(Math.round(v * 100) / 100, 2);

  const rows = $derived([
    {
      name: 'sin',
      frac: `${sides.oppName}/BC`,
      num: `${len(sides.opp)}/${len(r.hyp)}`,
      value: r.sin,
      ex: exact?.sin,
    },
    {
      name: 'cos',
      frac: `${sides.adjName}/BC`,
      num: `${len(sides.adj)}/${len(r.hyp)}`,
      value: r.cos,
      ex: exact?.cos,
    },
    {
      name: 'tan',
      frac: `${sides.oppName}/${sides.adjName}`,
      num: `${len(sides.opp)}/${len(sides.adj)}`,
      value: r.tan,
      ex: exact?.tan,
    },
    {
      name: 'cot',
      frac: `${sides.adjName}/${sides.oppName}`,
      num: `${len(sides.adj)}/${len(sides.opp)}`,
      value: r.cot,
      ex: exact?.cot,
    },
  ]);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Góc nhọn đang xét"
    options={[
      { value: 'B', label: 'Góc B' },
      { value: 'C', label: 'Góc C' },
    ]}
    bind:value={vertex}
  />

  <div class="grid gap-3 md:grid-cols-[3fr_2fr]">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="block w-full touch-none select-none rounded-lg border border-slate-200 bg-white"
      role="group"
      aria-label={`Tam giác ABC vuông tại A, AB = ${len(ab)}, AC = ${len(ac)}, BC ≈ ${len(Math.hypot(ab, ac))}. Kéo B hoặc C để đổi hình.`}
    >
      <!-- legs and hypotenuse, coloured by their role for the chosen angle -->
      <line
        x1={adjSeg[0].x}
        y1={adjSeg[0].y}
        x2={adjSeg[1].x}
        y2={adjSeg[1].y}
        stroke={COLORS.adj}
        stroke-width="5"
        stroke-linecap="round"
      />
      <line
        x1={oppSeg[0].x}
        y1={oppSeg[0].y}
        x2={oppSeg[1].x}
        y2={oppSeg[1].y}
        stroke={COLORS.opp}
        stroke-width="5"
        stroke-linecap="round"
      />
      <line
        x1={B.x}
        y1={B.y}
        x2={C.x}
        y2={C.y}
        stroke={COLORS.hyp}
        stroke-width="5"
        stroke-linecap="round"
      />
      <path d={rightMarkPath(A, 0, 90, 12)} fill="none" stroke="#334155" stroke-width="1.5" />
      <path d={arc} fill="none" stroke="#0f172a" stroke-width="2" />

      <text x={A.x - 14} y={A.y + 16} font-size="14" font-weight="700" fill="#0f172a">A</text>
      <text
        x={(A.x + B.x) / 2}
        y={A.y + 20}
        text-anchor="middle"
        font-size="12"
        font-weight="700"
        fill={vertex === 'B' ? COLORS.adj : COLORS.opp}>{len(ab)}</text
      >
      <text
        x={A.x - 8}
        y={(A.y + C.y) / 2 + 4}
        text-anchor="end"
        font-size="12"
        font-weight="700"
        fill={vertex === 'B' ? COLORS.opp : COLORS.adj}>{len(ac)}</text
      >
      <text
        x={(B.x + C.x) / 2 + 8}
        y={(B.y + C.y) / 2 - 6}
        font-size="12"
        font-weight="700"
        fill={COLORS.hyp}>{len(r.hyp)}</text
      >

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Đỉnh B, kéo ngang để đổi độ dài AB"
        aria-valuemin={MIN}
        aria-valuemax={AB_MAX}
        aria-valuenow={Math.round(ab * 100) / 100}
        aria-valuetext={`AB = ${len(ab)}`}
        style="cursor:grab; outline:none"
        use:draggable={bOpts}
      >
        <circle
          class="drag-knob"
          cx={B.x}
          cy={B.y}
          r="9"
          fill="#0f172a"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text x={B.x + 4} y={B.y + 22} font-size="14" font-weight="700" fill="#0f172a">B</text>

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Đỉnh C, kéo dọc để đổi độ dài AC"
        aria-valuemin={MIN}
        aria-valuemax={AC_MAX}
        aria-valuenow={Math.round(ac * 100) / 100}
        aria-valuetext={`AC = ${len(ac)}`}
        style="cursor:grab; outline:none"
        use:draggable={cOpts}
      >
        <circle
          class="drag-knob"
          cx={C.x}
          cy={C.y}
          r="9"
          fill="#0f172a"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text x={C.x + 14} y={C.y + 4} font-size="14" font-weight="700" fill="#0f172a">C</text>
    </svg>

    <div class="space-y-2">
      <ul class="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
        <li style="color:{COLORS.opp}">Cạnh đối: {sides.oppName}</li>
        <li style="color:{COLORS.adj}">Cạnh kề: {sides.adjName}</li>
        <li style="color:{COLORS.hyp}">Cạnh huyền: BC</li>
      </ul>
      <table class="w-full text-sm tabular-nums">
        <caption class="sr-only">Bốn tỉ số lượng giác của góc {vertex}</caption>
        <tbody>
          {#each rows as row (row.name)}
            <tr class="border-b border-slate-100">
              <th scope="row" class="py-1.5 pr-2 text-left font-semibold text-slate-700"
                >{row.name}
                {vertex}</th
              >
              <td class="py-1.5 pr-2 text-slate-600">= {row.frac}</td>
              <td class="py-1.5 pr-2 text-slate-600">= {row.num}</td>
              <td class="py-1.5 font-semibold text-indigo-700">{ratioText(row.value, row.ex)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <div class="flex flex-wrap gap-2" role="group" aria-label="Đặt góc đặc biệt hoặc đổi cỡ tam giác">
    {#each [30, 45, 60] as d (d)}
      <button type="button" class={button.quiet} onclick={() => preset(d)}
        >Góc {vertex} = {d}°</button
      >
    {/each}
    <button type="button" class={button.quiet} disabled={!canShrink} onclick={() => scale(1 / 1.5)}
      >Thu nhỏ</button
    >
    <button type="button" class={button.quiet} disabled={!canGrow} onclick={() => scale(1.5)}
      >Phóng to</button
    >
  </div>

  <FeedbackNote tone={exact ? 'ok' : 'info'} text={sentence(vertex, ab, ac)} />
  <p class="text-sm text-slate-600">
    Bấm "Thu nhỏ" hoặc "Phóng to": các cạnh đổi nhưng góc giữ nguyên, và bốn tỉ số cũng giữ nguyên.
    Tỉ số lượng giác chỉ phụ thuộc vào độ lớn của góc.
  </p>
</div>
