<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { readNumber } from '#lib/core/decimal.js';
  import {
    MAX_ROWS,
    RELATION_NAME,
    SITUATIONS,
    classify,
    niceMax,
    rejectX,
    situation,
    verdict,
  } from './engine.js';

  /** @typedef {import('./engine.js').Relation} Relation */

  /** @param {number} v */
  const num = (v) => formatNumber(v, 4);

  let id = $state(SITUATIONS[0].id);
  const s = $derived(situation(id));
  /** @type {number[]} */
  let xs = $state([...SITUATIONS[0].start]);
  let typed = $state('');
  let error = $state('');
  /** @type {Relation | null} */
  let choice = $state(null);

  const rows = $derived(xs.map((x) => ({ x, y: s.f(x) })));
  const found = $derived(classify(rows));
  const result = $derived(choice ? verdict(s, choice, num) : null);
  const solved = $derived(result?.ok === true);

  /** @param {string | number} v */
  function pick(v) {
    id = String(v);
    xs = [...situation(id).start];
    typed = '';
    error = '';
    choice = null;
  }

  /** @param {SubmitEvent} e */
  function add(e) {
    e.preventDefault();
    const x = readNumber(typed);
    const why = rejectX(s, x, xs);
    if (why) {
      error = why;
      return;
    }
    xs = [...xs, /** @type {number} */ (x)].slice(-MAX_ROWS);
    typed = '';
    error = '';
    choice = null;
  }

  function clear() {
    xs = [...s.start];
    error = '';
    choice = null;
  }

  // The chart: axes from 0 to a round maximum above every value in the table.
  const W = 360;
  const H = 250;
  const L = 48;
  const R = 14;
  const T = 14;
  const B = 34;
  const xTop = $derived(niceMax(Math.max(...xs)));
  const yTop = $derived(niceMax(Math.max(...rows.map((r) => r.y))));
  /** @param {number} x */
  const px = (x) => L + (x / xTop) * (W - L - R);
  /** @param {number} y */
  const py = (y) => H - B - (y / yTop) * (H - T - B);
  const ticks = [0, 1, 2, 3, 4, 5];

  /** The graph of the rule, kept inside the chart, once the learner has named it. */
  const curve = $derived.by(() => {
    if (!solved) return '';
    const pts = [];
    for (let i = 1; i <= 120; i++) {
      const x = (xTop * i) / 120;
      const y = s.f(x);
      if (y <= yTop) pts.push(`${px(x).toFixed(1)} ${py(y).toFixed(1)}`);
    }
    if (s.relation !== 'nghich') pts.unshift(`${px(0).toFixed(1)} ${py(s.f(0)).toFixed(1)}`);
    return pts.length > 1 ? `M ${pts.join(' L ')}` : '';
  });

  const chartLabel = $derived(
    `Các điểm (x; y) của bảng: ${rows.map((r) => `(${num(r.x)}; ${num(r.y)})`).join(', ')}`,
  );

  /** @type {{ value: Relation, label: string }[]} */
  const CHOICES = [
    { value: 'thuan', label: 'Tỉ lệ thuận' },
    { value: 'nghich', label: 'Tỉ lệ nghịch' },
    { value: 'khac', label: 'Không tỉ lệ' },
  ];
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Tình huống"
    options={SITUATIONS.map((t) => ({ value: t.id, label: t.label }))}
    bind:value={id}
    onchange={pick}
  />

  <p class="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-950">
    {s.story} Gọi x là {s.xName.toLowerCase()}, y là {s.yName.toLowerCase()}.
  </p>

  <form class="flex flex-wrap items-end gap-2" onsubmit={add}>
    <label
      class="flex w-full min-w-0 flex-col gap-1 text-sm font-semibold text-slate-700 sm:w-auto sm:flex-1"
    >
      Nhập một giá trị của x ({s.xUnit})
      <input
        class={textInput}
        inputmode="decimal"
        autocomplete="off"
        bind:value={typed}
        placeholder="ví dụ 25 hoặc 2,5"
      />
    </label>
    <button type="submit" class={button.primary}>Thêm vào bảng</button>
    <button type="button" class={button.quiet} onclick={clear}>Làm lại</button>
  </form>
  {#if error}
    <p class="text-sm font-semibold text-amber-800" role="alert">{error}</p>
  {/if}

  <div class="overflow-x-auto">
    <table class="w-full min-w-80 border-collapse text-center text-sm tabular-nums">
      <caption class="mb-1 text-left text-slate-600">
        Bảng giá trị (tối đa {MAX_ROWS} dòng)
      </caption>
      <thead>
        <tr class="bg-slate-100">
          <th scope="col" class="border border-slate-200 px-2 py-1">x ({s.xUnit})</th>
          <th scope="col" class="border border-slate-200 px-2 py-1">y ({s.yUnit})</th>
          <th scope="col" class="border border-slate-200 px-2 py-1">y : x</th>
          <th scope="col" class="border border-slate-200 px-2 py-1">x · y</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as r (r.x)}
          <tr>
            <td class="border border-slate-200 px-2 py-1">{num(r.x)}</td>
            <td class="border border-slate-200 px-2 py-1 font-semibold">{num(r.y)}</td>
            <td
              class="border border-slate-200 px-2 py-1 {solved && s.relation === 'thuan'
                ? 'font-semibold text-emerald-700'
                : ''}">{num(r.y / r.x)}</td
            >
            <td
              class="border border-slate-200 px-2 py-1 {solved && s.relation === 'nghich'
                ? 'font-semibold text-emerald-700'
                : ''}">{num(r.x * r.y)}</td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block h-auto w-full max-w-md rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label={chartLabel}
  >
    {#each ticks as i (i)}
      {@const gx = px((xTop * i) / 5)}
      {@const gy = py((yTop * i) / 5)}
      <line x1={gx} x2={gx} y1={T} y2={H - B} stroke="#E2E8F0" />
      <line x1={L} x2={W - R} y1={gy} y2={gy} stroke="#E2E8F0" />
      {#if i > 0}
        <text x={gx} y={H - B + 15} font-size="11" text-anchor="middle" fill="#64748B"
          >{num((xTop * i) / 5)}</text
        >
        <text x={L - 5} y={gy + 4} font-size="11" text-anchor="end" fill="#64748B"
          >{num((yTop * i) / 5)}</text
        >
      {/if}
    {/each}
    <line x1={L} x2={W - R} y1={H - B} y2={H - B} stroke="#334155" stroke-width="1.5" />
    <line x1={L} x2={L} y1={T} y2={H - B} stroke="#334155" stroke-width="1.5" />
    <text x={W - R} y={H - 4} font-size="12" text-anchor="end" fill="#334155" font-weight="700"
      >x</text
    >
    <text x={L - 30} y={T + 4} font-size="12" fill="#334155" font-weight="700">y</text>
    <text x={L - 5} y={H - B + 15} font-size="11" text-anchor="end" fill="#64748B">O</text>
    {#if curve}
      <path d={curve} fill="none" stroke="#10B981" stroke-width="2.5" stroke-linejoin="round" />
    {/if}
    {#each rows as r (r.x)}
      <circle cx={px(r.x)} cy={py(r.y)} r="5.5" fill="#4F46E5" stroke="#FFFFFF" stroke-width="2" />
    {/each}
  </svg>

  <fieldset class="space-y-2">
    <legend class="text-sm font-semibold text-slate-700">
      Theo bảng giá trị, y và x là hai đại lượng:
    </legend>
    <div class="flex flex-wrap gap-2">
      {#each CHOICES as c (c.value)}
        <button
          type="button"
          class={choice === c.value ? button.secondary : button.quiet}
          aria-pressed={choice === c.value}
          disabled={found === null}
          onclick={() => (choice = c.value)}>{c.label}</button
        >
      {/each}
    </div>
  </fieldset>

  {#if found === null}
    <FeedbackNote
      tone="info"
      text="Thêm ít nhất một giá trị nữa của x để so sánh các cột y : x và x · y."
    />
  {:else if result}
    <FeedbackNote tone={result.ok ? 'ok' : 'warn'} text={result.text} />
  {:else}
    <FeedbackNote
      tone="info"
      text="So sánh các số ở cột y : x và cột x · y, rồi chọn: {RELATION_NAME.thuan}, {RELATION_NAME.nghich} hay không tỉ lệ?"
    />
  {/if}
</div>
