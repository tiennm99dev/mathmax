<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { degText, lenText, rightMark } from '../_shared/triangle-math.js';
  import { CASES, compare, legs, measures } from './engine.js';

  const W = 400;
  const H = 300;
  const ORIGIN = { x: 70, y: 262 };
  const MAX_K = 36;
  const REF = '#64748B';
  const MINE = '#4F46E5';

  let ci = $state(0);
  const info = $derived(CASES[ci]);
  let p = $state(4);
  let q = $state(2.5);

  /** @param {string | number} v */
  function changeCase(v) {
    ci = Number(v);
    const c = CASES[ci];
    p = Math.min(c.range[0].max, c.given[0] + 2 * c.range[0].step);
    q = Math.max(c.range[1].min, c.given[1] - 3 * c.range[1].step);
  }

  const ref = $derived(
    measures(/** @type {{ e: number, f: number }} */ (legs(info.id, info.given[0], info.given[1]))),
  );
  const mineLegs = $derived(legs(info.id, p, q));
  const mine = $derived(mineLegs ? measures(mineLegs) : null);
  const cmp = $derived(compare(info, p, q));

  const k = $derived.by(() => {
    const w = Math.max(ref.leg1, mine?.leg1 ?? 0);
    const h = Math.max(ref.leg2, mine?.leg2 ?? 0);
    return Math.min(MAX_K, (W - ORIGIN.x - 30) / w, (ORIGIN.y - 30) / h);
  });

  /** @param {{ leg1: number, leg2: number }} m */
  function corners(m) {
    return {
      A: ORIGIN,
      B: { x: ORIGIN.x + m.leg1 * k, y: ORIGIN.y },
      C: { x: ORIGIN.x, y: ORIGIN.y - m.leg2 * k },
    };
  }
  const R = $derived(corners(ref));
  const M = $derived(mine ? corners(mine) : null);

  /** @param {number} v @param {'cm' | '°'} unit */
  const show = (v, unit) => (unit === 'cm' ? `${lenText(v)} cm` : degText(v));

  const rows = $derived(
    mine
      ? [
          { abc: 'AB', def: 'DE', a: ref.leg1, d: mine.leg1, unit: /** @type {const} */ ('cm') },
          { abc: 'AC', def: 'DF', a: ref.leg2, d: mine.leg2, unit: /** @type {const} */ ('cm') },
          { abc: 'BC', def: 'EF', a: ref.hyp, d: mine.hyp, unit: /** @type {const} */ ('cm') },
          { abc: 'Góc B', def: 'Góc E', a: ref.E, d: mine.E, unit: /** @type {const} */ ('°') },
          { abc: 'Góc C', def: 'Góc F', a: ref.F, d: mine.F, unit: /** @type {const} */ ('°') },
        ]
      : [],
  );

  const feedback = $derived.by(() => {
    if (!mine) return 'Không có tam giác vuông nào: cạnh góc vuông phải ngắn hơn cạnh huyền.';
    if (cmp.congruent)
      return `${info.data[0]} = ${info.ref[0]} và ${info.data[1]} = ${info.ref[1]}: hai tam giác vuông trùng khít, mọi cạnh và góc còn lại cũng bằng nhau. △DEF = △ABC (${info.name}).`;
    const wrong = info.data.filter((_, i) => !cmp.ok[i]);
    return `Chưa bằng nhau: ${wrong.join(' và ')} khác ${info.ref.filter((_, i) => !cmp.ok[i]).join(' và ')}. Chỉnh hai thanh trượt cho đến khi hai dữ kiện bằng dữ kiện của △ABC.`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Cặp dữ kiện"
    value={ci}
    onchange={changeCase}
    options={CASES.map((c, i) => ({ value: i, label: c.short }))}
  />

  <p class="rounded-lg bg-slate-50 p-3 text-sm text-slate-800">
    △ABC vuông tại A có {info.ref[0]} = {show(info.given[0], info.range[0].unit)} và {info.ref[1]}
    = {show(info.given[1], info.range[1].unit)}. Dựng △DEF vuông tại D từ hai dữ kiện {info
      .data[0]},
    {info.data[1]}.
  </p>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label={info.data[0]}
      bind:value={p}
      min={info.range[0].min}
      max={info.range[0].max}
      step={info.range[0].step}
      format={(v) => show(v, info.range[0].unit)}
    />
    <SliderField
      label={info.data[1]}
      bind:value={q}
      min={info.range[1].min}
      max={info.range[1].max}
      step={info.range[1].step}
      format={(v) => show(v, info.range[1].unit)}
    />
  </div>

  <GeometryBoard
    width={W}
    height={H}
    label="Tam giác ABC (xám) và tam giác DEF (tím) đặt chung đỉnh góc vuông"
  >
    <polygon
      points="{R.A.x},{R.A.y} {R.B.x},{R.B.y} {R.C.x},{R.C.y}"
      fill={REF}
      fill-opacity="0.18"
      stroke={REF}
      stroke-width="2"
    />
    <path d={rightMark(R.A, R.B, R.C, 12)} fill="none" stroke="#334155" stroke-width="1.5" />
    <text x={R.B.x + 4} y={R.B.y + 20} font-size="14" font-weight="700" fill={REF}>B</text>
    <text x={R.C.x - 22} y={R.C.y + 4} font-size="14" font-weight="700" fill={REF}>C</text>
    <text x={ORIGIN.x - 34} y={ORIGIN.y + 20} font-size="14" font-weight="700" fill="#111827"
      >A, D</text
    >
    {#if M}
      <polygon
        points="{M.A.x},{M.A.y} {M.B.x},{M.B.y} {M.C.x},{M.C.y}"
        fill={MINE}
        fill-opacity={cmp.congruent ? 0.25 : 0.06}
        stroke={MINE}
        stroke-width="2.5"
        stroke-dasharray={cmp.congruent ? null : '7 4'}
      />
      <text x={M.B.x + 4} y={M.B.y - 8} font-size="14" font-weight="700" fill={MINE}>E</text>
      <text x={M.C.x + 8} y={M.C.y - 4} font-size="14" font-weight="700" fill={MINE}>F</text>
    {/if}
  </GeometryBoard>

  {#if mine}
    <table class="w-full text-sm tabular-nums">
      <caption class="sr-only">So sánh các cạnh và góc của hai tam giác</caption>
      <thead>
        <tr class="text-left text-slate-600">
          <th class="py-1 font-semibold">△ABC</th>
          <th class="py-1 font-semibold">△DEF</th>
          <th class="py-1 font-semibold">So sánh</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row.abc)}
          {@const same = Math.abs(row.a - row.d) < 1e-6}
          <tr class="border-t border-slate-200">
            <td class="py-1">{row.abc} = {show(row.a, row.unit)}</td>
            <td class="py-1">{row.def} = {show(row.d, row.unit)}</td>
            <td class="py-1 font-semibold {same ? 'text-emerald-700' : 'text-slate-400'}"
              >{same ? 'bằng nhau' : 'khác'}</td
            >
          </tr>
        {/each}
      </tbody>
    </table>
    <p class="text-xs text-slate-500">Các số đo được làm tròn đến một chữ số thập phân.</p>
  {/if}

  <p
    class="rounded-lg p-3 text-sm {cmp.congruent
      ? 'bg-emerald-50 text-emerald-900'
      : 'bg-amber-50 text-amber-900'}"
    aria-live="polite"
  >
    {feedback}
  </p>
</div>
