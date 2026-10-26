<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { NAME, classify, ends, inequalities, longest } from './engine.js';

  const W = 400;
  const H = 260;
  /** @type {Record<'a' | 'b' | 'c', string>} */
  const COLOR = { a: '#1F2937', b: '#D97706', c: '#4F46E5' };
  /** @type {('a' | 'b' | 'c')[]} */
  const SIDES = ['a', 'b', 'c'];
  const PRESETS = [
    [5, 3, 4],
    [7, 2, 3],
    [5, 2, 3],
    [2, 3, 9],
    [6, 6, 6],
  ];

  let a = $state(6);
  let b = $state(4);
  let c = $state(3);

  /** @param {number} v */
  const n = (v) => formatNumber(v, 1);

  const kind = $derived(classify(a, b, c));
  const e = $derived(ends(a, b, c));
  const checks = $derived(inequalities(a, b, c));
  const big = $derived(longest(a, b, c));

  /** Fits B, C and the stick ends into the board, y up. */
  const view = $derived.by(() => {
    const pts = [{ x: 0, y: 0 }, { x: a, y: 0 }, e.p, e.q];
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    const k = Math.min(26, (W - 70) / (maxX - minX || 1), (H - 80) / (maxY || 1));
    const ox = (W - (maxX - minX) * k) / 2 - minX * k;
    const oy = H - 40 - (H - 80 - maxY * k) / 2;
    /** @param {{ x: number, y: number }} p */
    const at = (p) => ({ x: ox + p.x * k, y: oy - p.y * k });
    return { k, at };
  });
  const pB = $derived(view.at({ x: 0, y: 0 }));
  const pC = $derived(view.at({ x: a, y: 0 }));
  const pP = $derived(view.at(e.p));
  const pQ = $derived(view.at(e.q));

  const feedback = $derived.by(() => {
    const L = NAME[big];
    const others = SIDES.filter((s) => s !== big).map((s) => NAME[s]);
    const s = { a, b, c };
    const rest = a + b + c - s[big];
    if (kind === 'triangle')
      return `Ghép được tam giác ABC. Cạnh lớn nhất ${L} = ${n(s[big])} nhỏ hơn tổng hai cạnh còn lại ${others.join(' + ')} = ${n(rest)}, nên cả ba bất đẳng thức tam giác đều đúng.`;
    if (kind === 'flat')
      return `Không ghép được tam giác: ${L} = ${n(s[big])} đúng bằng ${others.join(' + ')} = ${n(rest)}. Hai que kia chỉ chạm nhau khi nằm thẳng trên ${L}, ba điểm A, B, C thẳng hàng.`;
    return `Không ghép được tam giác: ${L} = ${n(s[big])} lớn hơn ${others.join(' + ')} = ${n(rest)}. Hai đầu que còn cách nhau ${n(e.gap)}, dù có xoay thế nào cũng không chạm.`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Que BC (a)"
      bind:value={a}
      min={1}
      max={12}
      step={0.5}
      unit="cm"
      format={n}
    />
    <SliderField
      label="Que CA (b)"
      bind:value={b}
      min={1}
      max={12}
      step={0.5}
      unit="cm"
      format={n}
    />
    <SliderField
      label="Que AB (c)"
      bind:value={c}
      min={1}
      max={12}
      step={0.5}
      unit="cm"
      format={n}
    />
  </div>

  <div class="flex flex-wrap gap-2" role="group" aria-label="Bộ ba độ dài có sẵn (BC, CA, AB)">
    {#each PRESETS as [pa, pb, pc] (`${pa}-${pb}-${pc}`)}
      <button
        type="button"
        class={button.quiet}
        onclick={() => {
          a = pa;
          b = pb;
          c = pc;
        }}>{pa}; {pb}; {pc}</button
      >
    {/each}
  </div>

  <GeometryBoard
    width={W}
    height={H}
    label="Ba que BC, CA, AB; que BC nằm ngang, hai que kia xoay quanh B và C để tìm đỉnh A"
  >
    <circle
      cx={pB.x}
      cy={pB.y}
      r={c * view.k}
      fill="none"
      stroke={COLOR.c}
      stroke-opacity="0.35"
      stroke-dasharray="5 5"
    />
    <circle
      cx={pC.x}
      cy={pC.y}
      r={b * view.k}
      fill="none"
      stroke={COLOR.b}
      stroke-opacity="0.35"
      stroke-dasharray="5 5"
    />
    {#if kind === 'triangle'}
      <polygon
        points="{pB.x},{pB.y} {pC.x},{pC.y} {pP.x},{pP.y}"
        fill="#059669"
        fill-opacity="0.1"
      />
    {/if}
    <line
      x1={pB.x}
      y1={pB.y}
      x2={pC.x}
      y2={pC.y}
      stroke={COLOR.a}
      stroke-width="6"
      stroke-linecap="round"
    />
    <line
      x1={pB.x}
      y1={pB.y}
      x2={pP.x}
      y2={pP.y}
      stroke={COLOR.c}
      stroke-width={kind === 'triangle' ? 6 : 4}
      stroke-linecap="round"
      transform={kind === 'triangle' ? '' : 'translate(0 -8)'}
    />
    <line
      x1={pC.x}
      y1={pC.y}
      x2={pQ.x}
      y2={pQ.y}
      stroke={COLOR.b}
      stroke-width={kind === 'triangle' ? 6 : 4}
      stroke-linecap="round"
      transform={kind === 'triangle' ? '' : 'translate(0 -16)'}
    />
    {#if kind === 'short'}
      <line
        x1={pP.x}
        y1={pP.y + 14}
        x2={pQ.x}
        y2={pQ.y + 14}
        stroke="#DC2626"
        stroke-width="3"
        stroke-dasharray="4 3"
      />
      <text
        x={(pP.x + pQ.x) / 2}
        y={pP.y + 32}
        text-anchor="middle"
        font-size="13"
        font-weight="700"
        fill="#DC2626">hở {n(e.gap)} cm</text
      >
    {/if}
    <circle cx={pB.x} cy={pB.y} r="4" fill="#111827" />
    <circle cx={pC.x} cy={pC.y} r="4" fill="#111827" />
    <text x={pB.x - 6} y={pB.y + 22} font-size="15" font-weight="700" fill="#111827">B</text>
    <text x={pC.x - 4} y={pC.y + 22} font-size="15" font-weight="700" fill="#111827">C</text>
    {#if kind === 'triangle'}
      <circle cx={pP.x} cy={pP.y} r="4" fill="#059669" />
      <text x={pP.x - 5} y={pP.y - 10} font-size="15" font-weight="700" fill="#047857">A</text>
    {/if}
  </GeometryBoard>

  <p class="text-sm text-slate-600">
    Que AB quay quanh B (đường tròn nét đứt màu tím), que CA quay quanh C (đường tròn màu cam). Đỉnh
    A phải nằm trên cả hai đường tròn. Khi không ghép được, hai que được đặt dọc theo đường thẳng BC
    sao cho hai đầu tự do gần nhau nhất.
  </p>

  <ul class="space-y-1 text-sm tabular-nums" aria-label="Ba bất đẳng thức tam giác">
    {#each checks as q (q.side)}
      <li
        class="rounded-lg px-3 py-2 {q.ok
          ? 'bg-emerald-50 text-emerald-900'
          : 'bg-red-50 text-red-900'}"
      >
        {NAME[q.left[0]]} + {NAME[q.left[1]]}
        = {n(q.sum)}
        {q.ok ? '>' : '≤'}
        {NAME[q.side]} = {n(q.right)}
        <span class="font-semibold">{q.ok ? '✓ đúng' : '✗ sai'}</span>
      </li>
    {/each}
  </ul>

  <p
    class="rounded-lg p-3 text-sm font-semibold {kind === 'triangle'
      ? 'bg-emerald-50 text-emerald-900'
      : 'bg-amber-50 text-amber-900'}"
    aria-live="polite"
  >
    {feedback}
  </p>
</div>
