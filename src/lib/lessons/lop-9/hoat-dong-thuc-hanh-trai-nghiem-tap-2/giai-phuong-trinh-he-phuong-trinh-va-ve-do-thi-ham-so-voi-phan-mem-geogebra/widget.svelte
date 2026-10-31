<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import Tex from '#lib/components/tex.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import {
    CasError,
    intersections,
    parseFunction,
    runCas,
    sameFunction,
    samplePieces,
    solvesTask,
  } from './engine.js';

  /** @typedef {import('./engine.js').CasResult} CasResult */
  /** @typedef {{ input: string, result: CasResult | null, error: string }} Row */

  const CAS_TASKS = [
    { id: 'a', label: 'Giải $x^2 - 4x + 10 = 0$.', eqs: ['x^2 - 4x + 10 = 0'] },
    { id: 'b', label: 'Giải $x + \\dfrac{9}{x - 1} = 7$.', eqs: ['x + 9/(x - 1) = 7'] },
    {
      id: 'c',
      label: 'Giải $x^2 - 2(\\sqrt{3} - 1)x - 2\\sqrt{3} = 0$.',
      eqs: ['x^2 - 2(sqrt(3) - 1)x - 2sqrt(3) = 0'],
    },
    {
      id: 'd',
      label: 'Giải $\\dfrac{x + 1}{x - 1} - \\dfrac{x - 1}{x + 1} = \\dfrac{4}{x^2 - 1}$.',
      eqs: ['(x + 1)/(x - 1) - (x - 1)/(x + 1) = 4/(x^2 - 1)'],
    },
    {
      id: 'e',
      label: 'Giải hệ $\\begin{cases} 3x - 2y = 4 \\\\ 2x + y = 5 \\end{cases}$',
      eqs: ['3x - 2y = 4', '2x + y = 5'],
    },
    {
      id: 'f',
      label: 'Giải hệ $\\begin{cases} 2x - y = 3 \\\\ -4x + 2y = 1 \\end{cases}$',
      eqs: ['2x - y = 3', '-4x + 2y = 1'],
    },
  ];

  const GRAPH_TASKS = [
    { id: 'g1', label: 'Vẽ parabol $y = 2x^2$.', fns: ['2x^2'] },
    { id: 'g2', label: 'Vẽ parabol $y = -0{,}5x^2$ (gõ -0.5x^2).', fns: ['-0.5x^2'] },
    {
      id: 'g3',
      label: 'Vẽ $y = x^2$ và $y = x + 2$, đọc toạ độ giao điểm.',
      fns: ['x^2', 'x + 2'],
    },
  ];

  const EXAMPLES =
    'Ví dụ: Solve(x^2 - 5x + 6 = 0), Solutions(2x - 3 = 0), NSolve(x^2 = 2), Solve({x + y = 3, x - y = 1}, {x, y}). Dùng dấu chấm cho số thập phân, sqrt(3) cho √3.';

  const plane = planeScale({ xMin: -5, xMax: 5, yMin: -4, yMax: 8, width: 400, pad: 24 });
  const COLORS = ['#2563EB', '#DC2626'];

  let mode = $state('cas');
  let line = $state('Solve(x^2 - 5x + 6 = 0)');
  /** @type {Row[]} */
  let rows = $state([]);
  /** @type {string[]} */
  let solved = $state([]);
  let f = $state('y = 2x^2');
  let g = $state('');

  const last = $derived(rows.at(-1));
  const parsed = $derived([f, g].map(readFunction));
  const fns = $derived(parsed.map((p) => p.node));
  const meets = $derived(fns[0] && fns[1] ? safeIntersections(fns[0], fns[1]) : []);
  const graphDone = $derived(
    GRAPH_TASKS.filter((t) =>
      t.fns.every((want) => {
        const w = parseFunction(want);
        return fns.some((n) => n && sameFunction(n, w));
      }),
    ).map((t) => t.id),
  );

  /** @param {string} text */
  function readFunction(text) {
    if (!text.trim()) return { node: null, error: '' };
    try {
      return { node: parseFunction(text), error: '' };
    } catch (e) {
      if (e instanceof CasError) return { node: null, error: e.message };
      throw e;
    }
  }

  /** @param {import('./engine.js').Node} a @param {import('./engine.js').Node} b */
  function safeIntersections(a, b) {
    try {
      return intersections(a, b);
    } catch (e) {
      if (e instanceof CasError) return [];
      throw e;
    }
  }

  function run() {
    const input = line.trim();
    if (!input) return;
    try {
      const result = runCas(input);
      rows = [...rows, { input, result, error: '' }];
      const now = CAS_TASKS.filter((t) => solvesTask(result, t.eqs)).map((t) => t.id);
      solved = [...new Set([...solved, ...now])];
    } catch (e) {
      if (!(e instanceof CasError)) throw e;
      rows = [...rows, { input, result: null, error: e.message }];
    }
  }

  /** @param {Array<{ x: number, y: number }>} pts */
  const pathOf = (pts) =>
    pts
      .map((p, i) => `${i ? 'L' : 'M'}${plane.mx(p.x).toFixed(1)} ${plane.my(p.y).toFixed(1)}`)
      .join(' ');

  const casNote = $derived.by(() => {
    if (!last)
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Gõ lệnh vào ô Nhập rồi bấm "Tính" (hoặc Enter). Thử ngay lệnh có sẵn.',
      };
    if (last.error) return { tone: /** @type {const} */ ('warn'), text: last.error };
    const r = /** @type {CasResult} */ (last.result);
    const task = CAS_TASKS.find((t) => solvesTask(r, t.eqs));
    return {
      tone: /** @type {'ok' | 'info'} */ (task ? 'ok' : 'info'),
      text: `${r.text}${task ? ` Hoàn thành nhiệm vụ ${task.id}.` : ''} (${solved.length}/${CAS_TASKS.length} nhiệm vụ)`,
    };
  });

  const graphNote = $derived.by(() => {
    const err = parsed.find((p) => p.error);
    if (err) return { tone: /** @type {const} */ ('warn'), text: err.error };
    const parts = [];
    if (fns[0] && fns[1])
      parts.push(
        meets.length
          ? `Hai đồ thị cắt nhau tại ${meets.map((p) => `$(${p.x.exact ? p.x.tex : `\\approx ${p.x.tex}`}; ${p.y.exact ? p.y.tex : `\\approx ${p.y.tex}`})$`).join(' và ')}.`
          : 'Hai đồ thị không cắt nhau trên mặt phẳng toạ độ.',
      );
    parts.push(`Đã xong ${graphDone.length}/${GRAPH_TASKS.length} nhiệm vụ vẽ đồ thị.`);
    return {
      tone: /** @type {'ok' | 'info'} */ (graphDone.length === GRAPH_TASKS.length ? 'ok' : 'info'),
      text: parts.join(' '),
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Cửa sổ"
    options={[
      { value: 'cas', label: 'Cửa sổ CAS: giải' },
      { value: 'graph', label: 'Vẽ đồ thị' },
    ]}
    bind:value={mode}
  />

  {#if mode === 'cas'}
    <ul class="grid gap-1 text-sm sm:grid-cols-2" aria-label="Nhiệm vụ giải">
      {#each CAS_TASKS as t (t.id)}
        <li
          class="rounded-lg px-3 py-2 {solved.includes(t.id)
            ? 'bg-emerald-50 text-emerald-900'
            : 'bg-slate-50 text-slate-800'}"
        >
          <span class="font-semibold">{solved.includes(t.id) ? '✓' : '○'} {t.id})</span>
          <LiveRichText text={t.label} />
        </li>
      {/each}
    </ul>

    <div class="space-y-2 rounded-lg border border-slate-300 p-3">
      <label for="cas-input" class="block text-sm font-semibold text-slate-700">Nhập</label>
      <div class="flex flex-wrap gap-2">
        <input
          id="cas-input"
          class={`${textInput} min-w-0 flex-1 font-mono text-base`}
          bind:value={line}
          autocomplete="off"
          spellcheck="false"
          onkeydown={(e) => {
            if (e.key === 'Enter') run();
          }}
        />
        <button type="button" class={button.primary} onclick={run}>Tính</button>
        <button type="button" class={button.quiet} onclick={() => (rows = [])}>Xoá</button>
      </div>
      <p class="text-xs text-slate-500">
        {EXAMPLES}
      </p>
    </div>

    {#if rows.length}
      <ol class="divide-y divide-slate-200 rounded-lg border border-slate-200 text-sm">
        {#each rows.slice(-6) as r, i (rows.length - Math.min(6, rows.length) + i)}
          <li class="grid grid-cols-[2rem_1fr] gap-2 p-2">
            <span class="text-slate-400">{rows.length - Math.min(6, rows.length) + i + 1}</span>
            <div class="min-w-0 space-y-1">
              <p class="font-mono break-all text-slate-800">{r.input}</p>
              <div class="overflow-x-auto text-indigo-800">
                {#if r.result}
                  <span aria-hidden="true">→ </span><Tex math={r.result.tex} />
                {:else}
                  <span class="text-amber-800">?</span>
                {/if}
              </div>
            </div>
          </li>
        {/each}
      </ol>
    {/if}
    <FeedbackNote tone={casNote.tone} text={casNote.text} />
  {:else}
    <ul class="grid gap-1 text-sm" aria-label="Nhiệm vụ vẽ đồ thị">
      {#each GRAPH_TASKS as t (t.id)}
        <li
          class="rounded-lg px-3 py-2 {graphDone.includes(t.id)
            ? 'bg-emerald-50 text-emerald-900'
            : 'bg-slate-50 text-slate-800'}"
        >
          <span class="font-semibold">{graphDone.includes(t.id) ? '✓' : '○'}</span>
          <LiveRichText text={t.label} />
        </li>
      {/each}
    </ul>
    <div class="grid gap-2 sm:grid-cols-2">
      <div>
        <label for="fn-f" class="mb-1 block text-sm font-semibold text-blue-700"
          >Hàm thứ nhất (xanh)</label
        >
        <input
          id="fn-f"
          class={`${textInput} font-mono text-base`}
          bind:value={f}
          autocomplete="off"
          spellcheck="false"
          placeholder="y = 2x^2"
        />
      </div>
      <div>
        <label for="fn-g" class="mb-1 block text-sm font-semibold text-red-700"
          >Hàm thứ hai (đỏ)</label
        >
        <input
          id="fn-g"
          class={`${textInput} font-mono text-base`}
          bind:value={g}
          autocomplete="off"
          spellcheck="false"
          placeholder="y = x + 2"
        />
      </div>
    </div>

    <CoordinatePlane
      {plane}
      interactive={false}
      label={`Đồ thị: ${[f, g].filter((s) => s.trim()).join('; ') || 'chưa có hàm số'}`}
    >
      {#snippet children(p)}
        {#each fns as fn, k (k)}
          {#if fn}
            {#each samplePieces(fn, p.xMin, p.xMax, p.yMin, p.yMax) as piece, j (j)}
              <path d={pathOf(piece)} fill="none" stroke={COLORS[k]} stroke-width="2.5" />
            {/each}
          {/if}
        {/each}
        {#each meets as m, j (j)}
          {#if m.x.value >= p.xMin && m.x.value <= p.xMax && m.y.value >= p.yMin && m.y.value <= p.yMax}
            <circle cx={p.mx(m.x.value)} cy={p.my(m.y.value)} r="5" fill="#16A34A" />
            <text
              x={p.mx(m.x.value) + 7}
              y={p.my(m.y.value) - 7}
              font-size="13"
              font-weight="700"
              fill="#166534">{String.fromCharCode(65 + j)}</text
            >
          {/if}
        {/each}
      {/snippet}
    </CoordinatePlane>
    <FeedbackNote tone={graphNote.tone} text={graphNote.text} />
  {/if}
</div>
