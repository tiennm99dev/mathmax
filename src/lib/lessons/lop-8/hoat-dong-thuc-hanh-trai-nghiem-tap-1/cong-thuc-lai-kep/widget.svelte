<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatFixed, formatNumber, texNumber } from '#lib/core/number-format.js';
  import {
    PERIODS,
    compoundAmount,
    expansionTex,
    niceTicks,
    periodRate,
    series,
    simpleAmount,
  } from './engine.js';

  /** @typedef {import('./engine.js').Period} Period */

  const W = 440;
  const H = 260;
  const L = 52;
  const R = 14;
  const T = 28;
  const B = 34;

  let principal = $state(100);
  let ratePct = $state(6);
  /** @type {Period} */
  let period = $state('nam');
  let periods = $state(5);
  let shownAt = $state(5);

  const info = $derived(PERIODS.find((p) => p.value === period) ?? PERIODS[0]);
  const maxPeriods = $derived(period === 'nam' ? 20 : 60);
  const r = $derived(periodRate(ratePct, period));
  const rows = $derived(series(principal, r, periods));
  const at = $derived(Math.min(shownAt, periods));
  const simple = $derived(simpleAmount(principal, r, at));
  const compound = $derived(compoundAmount(principal, r, at));
  const extra = $derived(compound - simple);
  const ticks = $derived(niceTicks(principal, rows[rows.length - 1].compound, 4));
  const yMin = $derived(ticks[0]);
  const yMax = $derived(ticks[ticks.length - 1]);

  /** @param {number} k */
  const px = (k) => L + (k / Math.max(periods, 1)) * (W - L - R);
  /** @param {number} v */
  const py = (v) => H - B - ((v - yMin) / Math.max(yMax - yMin, 1e-9)) * (H - T - B);

  const simplePath = $derived(
    rows.map((p, i) => `${i ? 'L' : 'M'}${px(p.k)} ${py(p.simple)}`).join(' '),
  );
  const compoundPath = $derived(
    rows.map((p, i) => `${i ? 'L' : 'M'}${px(p.k)} ${py(p.compound)}`).join(' '),
  );
  const xTicks = $derived(
    Array.from({ length: periods + 1 }, (_, k) => k).filter(
      (k) => k % Math.ceil(periods / 10) === 0 || k === periods,
    ),
  );

  /** Money in million đồng, at most three decimals. @param {number} v */
  const money = (v) => formatNumber(v, 3);
  /** @param {number} v */
  const texMoney = (v) => texNumber(formatNumber(v, 3));
  const rateText = $derived(formatNumber(r * 100, 4));

  const formula = $derived(
    `T = ${texMoney(principal)}\\cdot(1 + ${texNumber(formatNumber(r, 6))})^{${at}} \\approx ${texMoney(compound)}`,
  );

  /** @param {string | number} v */
  function pickPeriod(v) {
    period = /** @type {Period} */ (v);
    periods = period === 'nam' ? 5 : 24;
    shownAt = periods;
  }

  const verdict = $derived(
    at === 0
      ? 'Lúc mới gửi, hai cách tính đều có đúng số tiền gốc.'
      : at === 1
        ? `Sau 1 kì, lãi đơn và lãi kép bằng nhau: ${money(compound)} triệu đồng, vì chưa có tiền lãi nào được nhập vào gốc.`
        : `Sau ${at} ${info.unit}, lãi kép cho ${money(compound)} triệu đồng, nhiều hơn lãi đơn (${money(simple)} triệu đồng) là ${money(extra)} triệu đồng: đó là tiền lãi sinh ra từ tiền lãi.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Số tiền gốc P"
      bind:value={principal}
      min={10}
      max={500}
      step={10}
      unit="triệu đồng"
    />
    <SliderField
      label="Lãi suất"
      bind:value={ratePct}
      min={1}
      max={12}
      step={0.1}
      unit="%/năm"
      format={(v) => formatFixed(v, 1)}
    />
  </div>
  <SegmentedControl
    label="Kì hạn gửi"
    options={PERIODS.map((p) => ({ value: p.value, label: p.label }))}
    value={period}
    onchange={pickPeriod}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Thời gian gửi"
      bind:value={periods}
      min={1}
      max={maxPeriods}
      unit={info.unit}
      oninput={(v) => (shownAt = v)}
    />
    <SliderField
      label="Xem số tiền sau"
      bind:value={shownAt}
      min={0}
      max={periods}
      unit={info.unit}
    />
  </div>
  <p class="text-sm text-slate-600">
    Lãi suất mỗi kì: r = {rateText}% = {formatNumber(r, 6)}.
  </p>

  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label="Đồ thị số tiền theo số kì gửi: đường lãi đơn thẳng, đường lãi kép cong lên. Sau {at} {info.unit}: lãi đơn {money(
      simple,
    )} triệu đồng, lãi kép {money(compound)} triệu đồng."
  >
    {#each ticks as t (t)}
      <line x1={L} x2={W - R} y1={py(t)} y2={py(t)} stroke="#E2E8F0" />
      <text x={L - 6} y={py(t) + 4} font-size="11" text-anchor="end" fill="#475569"
        >{formatNumber(t)}</text
      >
    {/each}
    {#each xTicks as k (k)}
      <text x={px(k)} y={H - B + 16} font-size="11" text-anchor="middle" fill="#475569">{k}</text>
    {/each}
    <text x={W - R} y={H - 4} font-size="11" text-anchor="end" fill="#475569">số {info.unit}</text>
    <text x={4} y={14} font-size="11" fill="#475569">triệu đồng</text>
    <line x1={px(at)} x2={px(at)} y1={T} y2={H - B} stroke="#94A3B8" stroke-dasharray="4 4" />
    <path d={simplePath} fill="none" stroke="#0EA5E9" stroke-width="2.5" />
    <path d={compoundPath} fill="none" stroke="#7C3AED" stroke-width="2.5" />
    <circle cx={px(at)} cy={py(simple)} r="5" fill="#0EA5E9" />
    <circle cx={px(at)} cy={py(compound)} r="5" fill="#7C3AED" />
  </svg>
  <div class="flex flex-wrap gap-4 text-sm">
    <span class="flex items-center gap-2"
      ><span class="inline-block h-1 w-6 rounded bg-sky-500"></span>Lãi đơn: P(1 + nr)</span
    >
    <span class="flex items-center gap-2"
      ><span class="inline-block h-1 w-6 rounded bg-violet-600"></span>Lãi kép: P(1 + r)ⁿ</span
    >
  </div>

  <div class="grid gap-3 text-sm sm:grid-cols-3">
    <div class="rounded-lg bg-slate-50 p-3">
      <p class="text-slate-600">Gốc</p>
      <p class="text-lg font-semibold tabular-nums">{money(principal)} triệu</p>
    </div>
    <div class="rounded-lg bg-sky-50 p-3">
      <p class="text-slate-600">Lãi đơn sau {at} {info.unit}</p>
      <p class="text-lg font-semibold tabular-nums">{money(simple)} triệu</p>
    </div>
    <div class="rounded-lg bg-violet-50 p-3">
      <p class="text-slate-600">Lãi kép sau {at} {info.unit}</p>
      <p class="text-lg font-semibold tabular-nums">{money(compound)} triệu</p>
    </div>
  </div>

  <div class="overflow-x-auto rounded-lg border border-slate-200 p-3 text-sm">
    <p><Tex math={formula} /></p>
    {#if at === 1}
      <p class="mt-2">
        Sau 1 kì: <Tex math="P(1 + r) = P + Pr" />, đúng bằng số tiền lãi đơn; chưa có lãi của lãi.
      </p>
    {:else if at >= 2 && at <= 4}
      <p class="mt-2">
        Khai triển: <Tex math={`P(1 + r)^{${at}} = ${expansionTex(at)}`} />. Hai hạng tử đầu
        <Tex math={`P + ${at}Pr`} /> chính là số tiền lãi đơn; các hạng tử còn lại là lãi của lãi.
      </p>
    {/if}
  </div>

  <FeedbackNote tone={at >= 2 ? 'ok' : 'info'} text={verdict} />
</div>
