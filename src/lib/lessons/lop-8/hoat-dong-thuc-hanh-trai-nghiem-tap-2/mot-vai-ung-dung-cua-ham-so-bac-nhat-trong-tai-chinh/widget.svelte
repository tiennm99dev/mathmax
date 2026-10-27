<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { breakEven, crossing, niceCeil, strips, ticksTo, valueAt } from './engine.js';

  /** @typedef {import('./engine.js').Line} Line */

  const W = 440;
  const H = 280;
  const L = 58;
  const R = 14;
  const T = 24;
  const B = 36;

  const MODES = [
    { value: 'so-sanh', label: 'So sánh hai gói cước' },
    { value: 'hoa-von', label: 'Chi phí và doanh thu' },
  ];

  let mode = $state('so-sanh');

  // Two plans: an installation fee plus a monthly fee (nghìn đồng).
  let feeA = $state(150);
  let monthlyA = $state(110);
  let feeB = $state(0);
  let monthlyB = $state(120);
  let months = $state(36);
  let atMonth = $state(18);

  // A workshop: fixed cost per month, cost and price of one product (nghìn đồng).
  let fixed = $state(15000);
  let unitCost = $state(30);
  let price = $state(80);
  let sold = $state(450);

  const even = $derived(breakEven(fixed, unitCost, price));
  const maxSold = $derived(niceCeil(even === null ? 1000 : Math.max(2 * even, 100)));
  const shownSold = $derived(Math.min(sold, maxSold));

  /** @type {Line} */
  const first = $derived(mode === 'so-sanh' ? { a: monthlyA, b: feeA } : { a: unitCost, b: fixed });
  /** @type {Line} */
  const second = $derived(mode === 'so-sanh' ? { a: monthlyB, b: feeB } : { a: price, b: 0 });
  const xMax = $derived(mode === 'so-sanh' ? months : maxSold);
  const at = $derived(mode === 'so-sanh' ? Math.min(atMonth, months) : shownSold);
  const yTop = $derived(
    niceCeil(Math.max(valueAt(first, xMax), valueAt(second, xMax), first.b, second.b, 1)),
  );
  const yTicks = $derived(ticksTo(yTop, 4));
  const yMax = $derived(yTicks[yTicks.length - 1]);
  const xTicks = $derived(ticksTo(xMax, 6));
  const cut = $derived(crossing(first, second));
  const cutInside = $derived(cut !== null && cut.x >= 0 && cut.x <= xMax);
  const parts = $derived(strips(first, second, xMax));

  /** @param {number} x */
  const px = (x) => L + (x / xMax) * (W - L - R);
  /** @param {number} y */
  const py = (y) => H - B - (Math.max(Math.min(y, yMax * 1.05), -yMax * 0.05) / yMax) * (H - T - B);

  /** @param {Line} line */
  const seg = (line) => `M${px(0)} ${py(valueAt(line, 0))} L${px(xMax)} ${py(valueAt(line, xMax))}`;

  /** @param {number} v */
  const money = (v) => formatNumber(Math.round(v * 100) / 100, 2);

  const names = $derived(
    mode === 'so-sanh'
      ? { first: 'Công ty A', second: 'Công ty B', unit: 'tháng' }
      : { first: 'Chi phí C(x)', second: 'Doanh thu R(x)', unit: 'sản phẩm' },
  );

  /** Colour of a strip: in the cost-revenue view green is profit, red is loss. @param {number} sign */
  function fillOf(sign) {
    if (mode === 'hoa-von') return sign > 0 ? '#16A34A' : '#DC2626';
    // sign > 0: B costs more, so A is cheaper there and takes A's colour.
    return sign > 0 ? '#F59E0B' : '#0EA5E9';
  }

  const yA = $derived(valueAt(first, at));
  const yB = $derived(valueAt(second, at));

  const verdict = $derived.by(() => {
    if (mode === 'so-sanh') {
      const head = `Sau ${formatNumber(at)} tháng: A tốn ${money(yA)}, B tốn ${money(yB)} nghìn đồng.`;
      const tail =
        Math.abs(yA - yB) < 1e-9
          ? ' Hai công ty tốn như nhau.'
          : yA < yB
            ? ` Chọn A rẻ hơn ${money(yB - yA)} nghìn đồng.`
            : ` Chọn B rẻ hơn ${money(yA - yB)} nghìn đồng.`;
      const meet = !cut
        ? ' Hai đường song song: cước tháng bằng nhau nên không bao giờ hai chi phí bằng nhau (trừ khi phí lắp đặt cũng bằng nhau).'
        : cutInside
          ? ` Hai đường cắt nhau tại tháng ${formatNumber(cut.x, 2)}: từ đó trở đi công ty có cước tháng thấp hơn có lợi hơn.`
          : '';
      return head + tail + meet;
    }
    const gain = yB - yA;
    const head = `Bán ${formatNumber(at)} sản phẩm: doanh thu ${money(yB)}, chi phí ${money(yA)} nghìn đồng.`;
    if (even === null)
      return `${head} Giá bán không lớn hơn chi phí một sản phẩm, nên bán càng nhiều càng lỗ: không có điểm hoà vốn.`;
    const state =
      Math.abs(gain) < 1e-9
        ? ' Đúng điểm hoà vốn: không lãi, không lỗ.'
        : gain > 0
          ? ` Lãi ${money(gain)} nghìn đồng.`
          : ` Lỗ ${money(-gain)} nghìn đồng.`;
    return `${head}${state} Điểm hoà vốn: x = ${formatNumber(fixed)} : (${formatNumber(price)} − ${formatNumber(unitCost)}) ≈ ${formatNumber(even, 2)} sản phẩm.`;
  });

  const tone = $derived(
    mode === 'hoa-von' ? (even !== null && yB - yA >= 0 ? 'ok' : 'warn') : 'info',
  );
</script>

<div class="space-y-4">
  <SegmentedControl label="Tình huống" options={MODES} bind:value={mode} />

  {#if mode === 'so-sanh'}
    <div class="grid gap-3 sm:grid-cols-2">
      <div class="space-y-2 rounded-lg bg-amber-50 p-3">
        <p class="text-sm font-semibold text-amber-900">Công ty A: y = {monthlyA}x + {feeA}</p>
        <SliderField
          label="Phí lắp đặt A"
          bind:value={feeA}
          min={0}
          max={500}
          step={10}
          unit="nghìn đồng"
        />
        <SliderField
          label="Cước tháng A"
          bind:value={monthlyA}
          min={50}
          max={200}
          step={5}
          unit="nghìn đồng"
        />
      </div>
      <div class="space-y-2 rounded-lg bg-sky-50 p-3">
        <p class="text-sm font-semibold text-sky-900">Công ty B: y = {monthlyB}x + {feeB}</p>
        <SliderField
          label="Phí lắp đặt B"
          bind:value={feeB}
          min={0}
          max={500}
          step={10}
          unit="nghìn đồng"
        />
        <SliderField
          label="Cước tháng B"
          bind:value={monthlyB}
          min={50}
          max={200}
          step={5}
          unit="nghìn đồng"
        />
      </div>
    </div>
    <div class="grid gap-3 sm:grid-cols-2">
      <SliderField
        label="Thời gian xem"
        bind:value={months}
        min={12}
        max={60}
        step={6}
        unit="tháng"
      />
      <SliderField label="Xem chi phí sau" bind:value={atMonth} min={0} max={months} unit="tháng" />
    </div>
  {:else}
    <div class="grid gap-3 sm:grid-cols-3">
      <SliderField
        label="Chi phí cố định F"
        bind:value={fixed}
        min={1000}
        max={30000}
        step={500}
        unit="nghìn đồng"
      />
      <SliderField
        label="Chi phí mỗi sản phẩm v"
        bind:value={unitCost}
        min={10}
        max={150}
        step={5}
        unit="nghìn đồng"
      />
      <SliderField
        label="Giá bán mỗi sản phẩm p"
        bind:value={price}
        min={10}
        max={200}
        step={5}
        unit="nghìn đồng"
      />
    </div>
    <SliderField
      label="Số sản phẩm bán x"
      bind:value={sold}
      min={0}
      max={maxSold}
      step={maxSold >= 500 ? 10 : 1}
      unit="sản phẩm"
    />
    <p class="text-sm text-slate-600">
      C(x) = {formatNumber(fixed)} + {formatNumber(unitCost)}x; R(x) = {formatNumber(price)}x (nghìn
      đồng).
    </p>
  {/if}

  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label="Đồ thị hai hàm số bậc nhất {names.first} và {names.second} theo số {names.unit}. {cut &&
    cutInside
      ? `Hai đường cắt nhau tại x = ${formatNumber(cut.x, 2)}, y = ${money(cut.y)}.`
      : 'Hai đường không cắt nhau trong khung.'}"
  >
    {#each yTicks as t (t)}
      <line x1={L} x2={W - R} y1={py(t)} y2={py(t)} stroke="#E2E8F0" />
      <text x={L - 6} y={py(t) + 4} font-size="10" text-anchor="end" fill="#475569"
        >{formatNumber(t)}</text
      >
    {/each}
    {#each xTicks as t (t)}
      {#if t <= xMax}
        <text x={px(t)} y={H - B + 15} font-size="10" text-anchor="middle" fill="#475569"
          >{formatNumber(t)}</text
        >
      {/if}
    {/each}
    <line x1={L} x2={W - R} y1={py(0)} y2={py(0)} stroke="#334155" />
    <line x1={L} x2={L} y1={T} y2={H - B} stroke="#334155" />
    <text x={W - R} y={H - 4} font-size="11" text-anchor="end" fill="#475569">x ({names.unit})</text
    >
    <text x={4} y={14} font-size="11" fill="#475569">y (nghìn đồng)</text>

    {#each parts as part, i (i)}
      {#if part.sign !== 0}
        <polygon
          points={part.points.map((p) => `${px(p.x)},${py(p.y)}`).join(' ')}
          fill={fillOf(part.sign)}
          fill-opacity="0.16"
        />
      {/if}
    {/each}

    <line x1={px(at)} x2={px(at)} y1={T} y2={H - B} stroke="#94A3B8" stroke-dasharray="4 4" />
    <path
      d={seg(first)}
      stroke={mode === 'so-sanh' ? '#D97706' : '#DC2626'}
      stroke-width="2.5"
      fill="none"
    />
    <path
      d={seg(second)}
      stroke={mode === 'so-sanh' ? '#0284C7' : '#16A34A'}
      stroke-width="2.5"
      fill="none"
    />
    <circle cx={px(at)} cy={py(yA)} r="4.5" fill={mode === 'so-sanh' ? '#D97706' : '#DC2626'} />
    <circle cx={px(at)} cy={py(yB)} r="4.5" fill={mode === 'so-sanh' ? '#0284C7' : '#16A34A'} />
    {#if cut && cutInside}
      <circle cx={px(cut.x)} cy={py(cut.y)} r="6" fill="white" stroke="#7C3AED" stroke-width="3" />
      <text
        x={px(cut.x) + (px(cut.x) > W - 140 ? -8 : 8)}
        y={py(cut.y) + 18}
        font-size="11"
        font-weight="700"
        text-anchor={px(cut.x) > W - 140 ? 'end' : 'start'}
        fill="#6D28D9"
        >{mode === 'hoa-von' ? 'Hoà vốn' : 'Bằng nhau'} ({formatNumber(cut.x, 2)}; {money(
          cut.y,
        )})</text
      >
    {/if}
  </svg>

  <div class="flex flex-wrap gap-4 text-sm">
    {#if mode === 'so-sanh'}
      <span class="flex items-center gap-2"
        ><span class="inline-block h-1 w-6 rounded bg-amber-600"></span>Công ty A</span
      >
      <span class="flex items-center gap-2"
        ><span class="inline-block h-1 w-6 rounded bg-sky-600"></span>Công ty B</span
      >
      <span class="flex items-center gap-2"
        ><span class="inline-block h-3 w-4 rounded bg-amber-200"></span>A rẻ hơn</span
      >
      <span class="flex items-center gap-2"
        ><span class="inline-block h-3 w-4 rounded bg-sky-200"></span>B rẻ hơn</span
      >
    {:else}
      <span class="flex items-center gap-2"
        ><span class="inline-block h-1 w-6 rounded bg-red-600"></span>Chi phí C(x)</span
      >
      <span class="flex items-center gap-2"
        ><span class="inline-block h-1 w-6 rounded bg-green-600"></span>Doanh thu R(x)</span
      >
      <span class="flex items-center gap-2"
        ><span class="inline-block h-3 w-4 rounded bg-green-200"></span>Vùng lãi</span
      >
      <span class="flex items-center gap-2"
        ><span class="inline-block h-3 w-4 rounded bg-red-200"></span>Vùng lỗ</span
      >
    {/if}
  </div>

  <FeedbackNote {tone} text={verdict} />
</div>
