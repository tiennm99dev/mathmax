<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { fmt, formatNumber } from '#lib/core/number-format.js';
  import { colorAt } from '#lib/core/visuals/svg-math.js';
  import { axisFrom } from '#lib/stats-engine/ticks.js';
  import { BAR_DATA, LINE_DATA, heightShare, looksTimes, percentChange } from './engine.js';

  const W = 480;
  const H = 300;
  const LEFT = 58;
  const RIGHT = 14;
  const TOP = 16;
  const BOTTOM = 34;
  const PW = W - LEFT - RIGHT;
  const PH = H - TOP - BOTTOM;

  let mode = $state('cot');
  let barBase = $state(BAR_DATA.maxBase - 4);
  let lineBase = $state(LINE_DATA.maxBase);

  const data = $derived(mode === 'cot' ? BAR_DATA : LINE_DATA);
  const base = $derived(mode === 'cot' ? barBase : lineBase);
  const axis = $derived(axisFrom(base, Math.max(...data.values)));
  const ticks = $derived(axis.ticks);
  const band = $derived(PW / data.labels.length);

  /** @param {number} v */
  const yOf = (v) => TOP + PH * (1 - heightShare(v, base, axis.top));
  /** @param {number} i */
  const xOf = (i) => LEFT + band * (i + 0.5);

  const points = $derived(data.values.map((v, i) => `${xOf(i)},${yOf(v)}`).join(' '));

  /** @param {number} n */
  const num = (n) => (Number.isInteger(n) ? fmt(n) : formatNumber(n, 2));

  /** "3" for a whole ratio, "khoảng 1,13" otherwise. @param {number} n */
  const times = (n) =>
    Math.abs(n - Math.round(n)) < 1e-9 ? num(Math.round(n)) : `khoảng ${formatNumber(n, 2)}`;

  const feedback = $derived.by(() => {
    const v = data.values;
    if (mode === 'cot') {
      const a = v[0];
      const b = v[v.length - 1];
      const looks = looksTimes(a, b, base);
      const real = b / a;
      const text = `Trên hình, cột của ${data.labels.at(-1)} cao gấp ${times(looks)} lần cột của ${data.labels[0]}. Thực tế ${data.labels.at(-1)} bán ${b} sản phẩm, ${data.labels[0]} bán ${a} sản phẩm: ${base === 0 ? 'đúng là' : 'chỉ'} gấp ${times(real)} lần.`;
      if (base === 0)
        return {
          tone: /** @type {const} */ ('ok'),
          text: `Trục đứng bắt đầu từ 0: chiều cao các cột tỉ lệ đúng với số liệu. ${text}`,
        };
      return {
        tone: looks > real * 1.5 ? /** @type {const} */ ('warn') : /** @type {const} */ ('info'),
        text: `Trục đứng bắt đầu từ ${num(base)}, không phải 0. ${text} Biểu đồ đang phóng đại sự chênh lệch.`,
      };
    }
    const first = v[0];
    const last = v[v.length - 1];
    const rise = (heightShare(last, base, axis.top) - heightShare(first, base, axis.top)) * 100;
    const pct = percentChange(first, last);
    const text = `Từ ${data.labels[0]} đến ${data.labels.at(-1)}, đường đi lên ${num(Math.round(rise))}% chiều cao biểu đồ. Thực tế số học sinh tăng từ ${num(first)} lên ${num(last)}, tức ${num(last - first)} bạn, khoảng ${formatNumber(pct, 1)}%.`;
    if (base === 0)
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Trục đứng bắt đầu từ 0: đường gần như nằm ngang, đúng với mức tăng nhỏ. ${text}`,
      };
    return {
      tone: rise > 3 * pct ? /** @type {const} */ ('warn') : /** @type {const} */ ('info'),
      text: `Trục đứng bắt đầu từ ${num(base)}. ${text} Đường trông dốc hơn nhiều so với thực tế.`,
    };
  });

  const modes = [
    { value: 'cot', label: 'Biểu đồ cột' },
    { value: 'doan', label: 'Biểu đồ đoạn thẳng' },
  ];
</script>

<div class="space-y-4">
  <SegmentedControl label="Loại biểu đồ" options={modes} bind:value={mode} />

  {#if mode === 'cot'}
    <SliderField
      label="Trục đứng bắt đầu từ"
      bind:value={barBase}
      min={0}
      max={BAR_DATA.maxBase}
      step={BAR_DATA.step}
      unit="sản phẩm"
    />
  {:else}
    <SliderField
      label="Trục đứng bắt đầu từ"
      bind:value={lineBase}
      min={0}
      max={LINE_DATA.maxBase}
      step={LINE_DATA.step}
      unit="học sinh"
      format={num}
    />
  {/if}

  <figure class="mx-auto w-full max-w-xl">
    <figcaption class="mb-1 text-center text-sm font-semibold text-slate-700">
      {data.title}
    </figcaption>
    <svg
      viewBox="0 0 {W} {H}"
      class="block w-full"
      role="img"
      aria-label="{data.title}, trục đứng từ {num(base)} đến {num(axis.top)}: {data.labels
        .map((l, i) => `${l} ${num(data.values[i])}`)
        .join(', ')}"
    >
      {#each ticks as t, k (k)}
        <line x1={LEFT} x2={W - RIGHT} y1={yOf(t)} y2={yOf(t)} stroke="#e2e8f0" />
        <text
          x={LEFT - 6}
          y={yOf(t) + 5}
          text-anchor="end"
          font-size="16"
          fill={k === 0 && base > 0 ? '#be123c' : '#475569'}
          font-weight={k === 0 && base > 0 ? '700' : '400'}>{num(t)}</text
        >
      {/each}
      {#if mode === 'cot'}
        {#each data.values as v, i (i)}
          {@const y = yOf(v)}
          <rect
            x={xOf(i) - band * 0.3}
            {y}
            width={band * 0.6}
            height={TOP + PH - y}
            fill={colorAt(i)}
            rx="3"
          />
          <text x={xOf(i)} y={y - 6} text-anchor="middle" font-size="16" font-weight="700"
            >{num(v)}</text
          >
        {/each}
      {:else}
        <polyline {points} fill="none" stroke="#4f46e5" stroke-width="3" />
        {#each data.values as v, i (i)}
          <circle cx={xOf(i)} cy={yOf(v)} r="5" fill="#4f46e5" />
          <text x={xOf(i)} y={yOf(v) - 10} text-anchor="middle" font-size="15" font-weight="700"
            >{num(v)}</text
          >
        {/each}
      {/if}
      <line x1={LEFT} x2={LEFT} y1={TOP} y2={TOP + PH} stroke="#334155" stroke-width="1.5" />
      <line
        x1={LEFT}
        x2={W - RIGHT}
        y1={TOP + PH}
        y2={TOP + PH}
        stroke="#334155"
        stroke-width="1.5"
      />
      {#each data.labels as l, i (l)}
        <text x={xOf(i)} y={H - 10} text-anchor="middle" font-size="16" fill="#334155">{l}</text>
      {/each}
    </svg>
  </figure>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
