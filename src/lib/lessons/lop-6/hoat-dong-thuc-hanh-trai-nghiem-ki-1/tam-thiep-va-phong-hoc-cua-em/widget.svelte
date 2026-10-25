<script>
  import { formatNumber, texNumber } from '#lib/core/number-format.js';
  import Tex from '#lib/components/tex.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { LIGHT_STANDARD, roomReport, windowsNeeded } from './engine.js';

  const W = 400;
  const H = 260;
  const PAD = 30;

  let length = $state(9);
  let width = $state(6);
  let doorW = $state(1.2);
  let doorH = $state(2.2);
  let doors = $state(1);
  let winW = $state(1.4);
  let winH = $state(1.5);
  let windows = $state(3);

  const report = $derived(
    roomReport(length, width, [
      { width: doorW, height: doorH, count: doors },
      { width: winW, height: winH, count: windows },
    ]),
  );
  const extra = $derived(windowsNeeded(report.floor, report.open, winW * winH));

  /** SVG units per metre, so the room fits the board. */
  const scale = $derived(Math.min((W - 2 * PAD) / length, (H - 2 * PAD) / width));
  const x0 = $derived((W - length * scale) / 2);
  const y0 = $derived((H - width * scale) / 2);

  const winFit = $derived(windows * winW <= length);
  const doorFit = $derived(doors * doorW <= length);

  /**
   * Left ends of `count` openings of width `w` spread evenly along the wall.
   * @param {number} count
   * @param {number} w
   */
  function spread(count, w) {
    const gap = (length - count * w) / (count + 1);
    return Array.from({ length: count }, (_, i) => gap + i * (w + gap));
  }

  /** @param {number} v */
  const m = (v) => formatNumber(v, 2);
  /** @param {number} v */
  const t = (v) => texNumber(formatNumber(v, 2));

  const formula = $derived(
    `A = \\dfrac{S_2}{S_1} \\cdot 100 = \\dfrac{${t(report.open)}}{${t(report.floor)}} \\cdot 100 \\approx ${t(report.index)}`,
  );

  const verdict = $derived(
    report.ok
      ? `A ≈ ${m(report.index)} ≥ ${LIGHT_STANDARD}: phòng học đạt chuẩn về ánh sáng.`
      : `A ≈ ${m(report.index)} < ${LIGHT_STANDARD}: phòng học chưa đủ ánh sáng. Cần thêm ít nhất ${extra} cửa sổ cỡ ${m(winW)} m × ${m(winH)} m.`,
  );

  /** Light meter: 0 to 40 across the bar. */
  const meterMax = 40;
  const meterPct = $derived(Math.min(report.index, meterMax) / meterMax);
</script>

<div class="space-y-4">
  <GeometryBoard
    width={W}
    height={H}
    maxWidth="max-w-lg"
    label="Sơ đồ nền phòng học dài {m(length)} m, rộng {m(
      width,
    )} m, mỗi ô vuông là 1 mét vuông; cửa sổ ở tường trên, cửa ra vào ở tường dưới"
  >
    <rect
      x={x0}
      y={y0}
      width={length * scale}
      height={width * scale}
      fill="#FEF9C3"
      stroke="#334155"
      stroke-width="3"
    />
    {#each { length: Math.ceil(length) - 1 } as _, i (i)}
      <line
        x1={x0 + (i + 1) * scale}
        y1={y0}
        x2={x0 + (i + 1) * scale}
        y2={y0 + width * scale}
        stroke="#CBD5E1"
        stroke-width="1"
      />
    {/each}
    {#each { length: Math.ceil(width) - 1 } as _, i (i)}
      <line
        x1={x0}
        y1={y0 + (i + 1) * scale}
        x2={x0 + length * scale}
        y2={y0 + (i + 1) * scale}
        stroke="#CBD5E1"
        stroke-width="1"
      />
    {/each}
    {#if winFit}
      {#each spread(windows, winW) as left, i (i)}
        <line
          x1={x0 + left * scale}
          y1={y0}
          x2={x0 + (left + winW) * scale}
          y2={y0}
          stroke="#0EA5E9"
          stroke-width="7"
        />
      {/each}
    {/if}
    {#if doorFit}
      {#each spread(doors, doorW) as left, i (i)}
        <line
          x1={x0 + left * scale}
          y1={y0 + width * scale}
          x2={x0 + (left + doorW) * scale}
          y2={y0 + width * scale}
          stroke="#B45309"
          stroke-width="7"
        />
        <path
          d="M {x0 + left * scale} {y0 + width * scale - doorW * scale} A {doorW * scale} {doorW *
            scale} 0 0 1 {x0 + (left + doorW) * scale} {y0 + width * scale}"
          fill="none"
          stroke="#B45309"
          stroke-dasharray="3 3"
        />
      {/each}
    {/if}
    <text x={W / 2} y={y0 - 10} text-anchor="middle" font-size="13" fill="#0369A1">
      {m(length)} m · {windows} cửa sổ
    </text>
    <text
      x={x0 - 8}
      y={y0 + (width * scale) / 2}
      text-anchor="end"
      font-size="13"
      fill="#334155"
      dominant-baseline="middle">{m(width)} m</text
    >
    <text x={W / 2} y={y0 + width * scale + 20} text-anchor="middle" font-size="13" fill="#92400E">
      {doors} cửa ra vào
    </text>
  </GeometryBoard>

  {#if !winFit || !doorFit}
    <p class="text-sm text-amber-800">
      Các cửa không vừa chiều dài tường {m(length)} m nên sơ đồ không vẽ chúng, nhưng diện tích vẫn được
      tính.
    </p>
  {/if}

  <fieldset class="grid gap-3 sm:grid-cols-2">
    <legend class="mb-1 text-sm font-semibold text-slate-700">Nền phòng học</legend>
    <SliderField label="Chiều dài" bind:value={length} min={6} max={12} step={0.5} unit="m" />
    <SliderField label="Chiều rộng" bind:value={width} min={4} max={9} step={0.5} unit="m" />
  </fieldset>
  <fieldset class="grid gap-3 sm:grid-cols-3">
    <legend class="mb-1 text-sm font-semibold text-slate-700">Cửa ra vào</legend>
    <SliderField label="Số cửa ra vào" bind:value={doors} min={1} max={2} />
    <SliderField
      label="Rộng mỗi cửa ra vào"
      bind:value={doorW}
      min={0.8}
      max={2}
      step={0.1}
      unit="m"
    />
    <SliderField
      label="Cao mỗi cửa ra vào"
      bind:value={doorH}
      min={2}
      max={2.6}
      step={0.1}
      unit="m"
    />
  </fieldset>
  <fieldset class="grid gap-3 sm:grid-cols-3">
    <legend class="mb-1 text-sm font-semibold text-slate-700">Cửa sổ</legend>
    <SliderField label="Số cửa sổ" bind:value={windows} min={0} max={8} />
    <SliderField label="Rộng mỗi cửa sổ" bind:value={winW} min={0.6} max={2} step={0.1} unit="m" />
    <SliderField label="Cao mỗi cửa sổ" bind:value={winH} min={0.6} max={2} step={0.1} unit="m" />
  </fieldset>

  <div class="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
    <p>
      Diện tích nền: S₁ = {m(length)} · {m(width)} = {m(report.floor)} m².
    </p>
    <p>
      Diện tích các cửa: S₂ = {doors} · {m(doorW)} · {m(doorH)} + {windows} · {m(winW)} · {m(winH)} =
      {m(report.parts[0])} + {m(report.parts[1])} = {m(report.open)} m².
    </p>
    <Tex display math={formula} />
    <div
      class="relative h-5 overflow-hidden rounded-full bg-slate-200"
      role="meter"
      aria-label="Chỉ số ánh sáng A"
      aria-valuemin="0"
      aria-valuemax={meterMax}
      aria-valuenow={Math.min(Math.round(report.index * 100) / 100, meterMax)}
      aria-valuetext="A xấp xỉ {m(report.index)}"
    >
      <div
        class="h-full {report.ok ? 'bg-emerald-500' : 'bg-amber-500'}"
        style:width="{meterPct * 100}%"
      ></div>
      <div class="absolute inset-y-0 left-1/2 w-0.5 bg-slate-900"></div>
    </div>
    <p class="text-xs text-slate-500">Vạch đen ở giữa thanh là mức chuẩn A = 20.</p>
    <p
      class="rounded-lg p-3 font-semibold {report.ok
        ? 'bg-emerald-50 text-emerald-900'
        : 'bg-amber-50 text-amber-900'}"
      aria-live="polite"
    >
      {verdict}
    </p>
  </div>
</div>
