<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale, colorAt } from '#lib/core/visuals/svg-math.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import Tex from '#lib/components/tex.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import {
    CasError,
    FRACTION_TASKS,
    GRAPH_TASKS,
    checkFraction,
    coordText,
    intercepts,
    linearForm,
    lineTex,
    parseGraph,
    run,
    samplePath,
  } from './engine.js';

  let tab = $state('cas');

  // ------------------------------------------------------------ CAS window
  /** @typedef {{ input: string, tex?: string, note?: string, error?: string }} Row */

  /** @param {string} input @returns {Row} */
  function evaluate(input) {
    try {
      return { input, ...run(input) };
    } catch (e) {
      return { input, error: e instanceof CasError ? e.message : 'Không tính được dòng này.' };
    }
  }

  const EXAMPLES = [
    '(x^2 - 1)/(x^2 + 2x + 1)',
    '1/(x - 1) - 2/(x^2 - 1)',
    'Factor(x^3 - 4x)',
    'Solutions(4.8 - 2.5(x + 3) = x + 0.5(2 - 6x))',
  ];

  /** @type {Row[]} */
  let rows = $state([evaluate('Simplify((x^2 - 4)/(x^2 - 2x))')]);
  let line = $state('');
  let casAnnounce = $state('');

  /** @param {string} input */
  function submit(input) {
    const text = input.trim();
    if (!text) return;
    const row = evaluate(text);
    rows = [...rows, row];
    line = '';
    casAnnounce = row.error
      ? `Dòng ${rows.length}: lỗi. ${row.error}`
      : `Dòng ${rows.length}: đã tính xong.${row.note ? ' ' + row.note : ''}`;
  }

  // ------------------------------------------------------- fraction tasks
  let taskId = $state(FRACTION_TASKS[0].id);
  const task = $derived(FRACTION_TASKS.find((t) => t.id === taskId) ?? FRACTION_TASKS[0]);
  let answer = $state('');
  /** @type {{ ok: boolean, message: string } | null} */
  let verdict = $state(null);
  let reveal = $state(false);

  /** @param {string | number} v */
  function pickTask(v) {
    taskId = String(v);
    answer = '';
    verdict = null;
    reveal = false;
  }

  function check() {
    verdict = answer.trim()
      ? checkFraction(task, answer)
      : { ok: false, message: 'Hãy gõ kết quả trước khi kiểm tra.' };
  }

  // -------------------------------------------------------------- graphing
  const plane = planeScale({ xMin: -10, xMax: 10, yMin: -10, yMax: 10 });
  const NAMES = ['f', 'g', 'h', 'p', 'q', 'r'];
  const uid = $props.id();
  const clipId = `${uid}-board`;

  /** @typedef {import('./engine.js').GraphEntry & { color: string }} Entry */

  /** @type {Entry[]} */
  let entries = $state([{ ...parseGraph('y = 2x + 1', 'f'), color: colorAt(0) }]);
  let graphLine = $state('');
  let graphError = $state('');
  let sliderA = $state(1);
  let sliderB = $state(0);
  let graphAnnounce = $state('');
  let graphTaskId = $state(GRAPH_TASKS[0].id);
  const graphTask = $derived(GRAPH_TASKS.find((t) => t.id === graphTaskId) ?? GRAPH_TASKS[0]);

  const params = $derived({ a: sliderA, b: sliderB });
  const showSliders = $derived(entries.some((e) => e.usesSliders));

  const drawn = $derived(
    entries.map((e) => {
      const lin = linearForm(e.node, params);
      return {
        entry: e,
        lin,
        cut: lin ? intercepts(lin) : null,
        runs: samplePath(e.node, params, plane.xMin, plane.xMax, plane.yMin, plane.yMax),
      };
    }),
  );

  const taskDone = $derived(
    drawn.some(
      (d) =>
        d.lin && Math.abs(d.lin.a - graphTask.a) < 1e-9 && Math.abs(d.lin.b - graphTask.b) < 1e-9,
    ),
  );

  function addGraph() {
    const text = graphLine.trim();
    if (!text) return;
    const used = new Set(entries.map((e) => e.name));
    const free = NAMES.find((n) => !used.has(n)) ?? `f${entries.length + 1}`;
    try {
      const entry = parseGraph(text, free);
      if (used.has(entry.name)) {
        entries = entries.filter((e) => e.name !== entry.name);
      }
      const color = colorAt(
        NAMES.indexOf(entry.name) >= 0 ? NAMES.indexOf(entry.name) : entries.length,
      );
      entries = [...entries, { ...entry, color }];
      graphLine = '';
      graphError = '';
      const lin = linearForm(entry.node, params);
      graphAnnounce = lin
        ? `Đã vẽ ${entry.name}: ${describeLine(lin)}`
        : `Đã vẽ ${entry.name}. Đây không phải hàm số bậc nhất.`;
    } catch (e) {
      graphError = e instanceof CasError ? e.message : 'Không vẽ được hàm số này.';
      graphAnnounce = graphError;
    }
  }

  /** @param {string} name */
  function removeGraph(name) {
    entries = entries.filter((e) => e.name !== name);
    graphAnnounce = `Đã xoá ${name}.`;
  }

  /** @param {{ a: number, b: number }} lin */
  function describeLine(lin) {
    const cut = intercepts(lin);
    const oy = `cắt trục Oy tại (0; ${coordText(cut.y)})`;
    if (cut.x === null) {
      return cut.y === 0
        ? 'đường thẳng trùng với trục Ox.'
        : `đường thẳng song song với Ox, ${oy}.`;
    }
    return `${oy}, cắt trục Ox tại (${coordText(cut.x)}; 0).`;
  }

  /** @param {{ x: number, y: number }[]} pts */
  const pathOf = (pts) =>
    pts.map((p, i) => `${i ? 'L' : 'M'}${round(plane.mx(p.x))} ${round(plane.my(p.y))}`).join(' ');

  /** @param {number} v */
  const round = (v) => Math.round(v * 10) / 10;

  /** @param {number} x @param {number} y */
  const inside = (x, y) => x >= plane.xMin && x <= plane.xMax && y >= plane.yMin && y <= plane.yMax;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    options={[
      { value: 'cas', label: 'Cửa sổ CAS' },
      { value: 'bai-tap', label: 'Bài tập phân thức' },
      { value: 'do-thi', label: 'Vẽ đồ thị' },
    ]}
    bind:value={tab}
  />

  {#if tab === 'cas'}
    <div class="rounded-lg border border-slate-300 bg-white">
      <p
        class="border-b border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700"
      >
        CAS (mô phỏng, biến x)
      </p>
      <ol class="divide-y divide-slate-200">
        {#each rows as row, i (i)}
          <li class="grid grid-cols-[2rem_1fr] gap-x-2 px-2 py-2">
            <span class="pt-0.5 text-right text-sm text-slate-500">{i + 1}</span>
            <div class="min-w-0">
              <p class="font-mono text-sm break-all text-slate-800">{row.input}</p>
              {#if row.error}
                <p class="mt-1 text-sm text-rose-700">{row.error}</p>
              {:else if row.tex}
                <p class="mt-1 overflow-x-auto text-indigo-800">
                  <span aria-hidden="true">→ </span><Tex math={row.tex} />
                </p>
                {#if row.note}<p class="mt-1 text-sm text-slate-600">{row.note}</p>{/if}
              {/if}
            </div>
          </li>
        {/each}
        <li class="grid grid-cols-[2rem_1fr] gap-x-2 px-2 py-2">
          <span class="pt-3 text-right text-sm text-slate-500">{rows.length + 1}</span>
          <form
            class="flex gap-2"
            onsubmit={(e) => {
              e.preventDefault();
              submit(line);
            }}
          >
            <input
              bind:value={line}
              class="{textInput} font-mono text-base"
              aria-label="Dòng nhập lệnh CAS"
              placeholder="Ví dụ (x^2 - 1)/(x + 1)"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
            />
            <button type="submit" class={button.primary}>Tính</button>
          </form>
        </li>
      </ol>
    </div>
    <div class="text-sm">
      <p class="mb-1 font-semibold text-slate-700">Thử nhanh:</p>
      <div class="flex flex-wrap gap-2">
        {#each EXAMPLES as ex (ex)}
          <button type="button" class="{button.quiet} font-mono text-sm" onclick={() => submit(ex)}
            >{ex}</button
          >
        {/each}
        <button type="button" class={button.quiet} onclick={() => (rows = [])}>Xoá hết</button>
      </div>
    </div>
    <p class="text-xs text-slate-500">
      Gõ như trong GeoGebra: tử và mẫu đặt trong ngoặc, x^2 là x², dấu / là phép chia. Lệnh:
      Simplify (rút gọn), Factor (phân tích tử và mẫu), Solve và Solutions (giải phương trình). Bản
      mô phỏng chỉ tính với biến x; phân thức hai biến hãy làm trong GeoGebra thật.
    </p>
    <p class="sr-only" aria-live="polite">{casAnnounce}</p>
  {:else if tab === 'bai-tap'}
    <SegmentedControl
      label="Chọn bài"
      options={FRACTION_TASKS.map((t) => ({ value: t.id, label: t.label }))}
      value={taskId}
      onchange={pickTask}
    />
    <div class="overflow-x-auto rounded-lg bg-slate-50 p-3">
      <Tex math={task.prompt} display />
    </div>
    <p class="text-sm text-slate-700">
      Tự tính trên giấy, gõ kết quả dạng (tử)/(mẫu) đã rút gọn, ví dụ (x - 1)/(x + 3), rồi bấm "Kiểm
      tra". Sau đó xem GeoGebra làm bằng lệnh nào.
    </p>
    <form
      class="space-y-2"
      onsubmit={(e) => {
        e.preventDefault();
        check();
      }}
    >
      <label class="block text-sm font-semibold text-slate-700">
        Kết quả
        <input
          bind:value={answer}
          class="{textInput} mt-1 font-mono text-base"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
        />
      </label>
      <div class="flex flex-wrap gap-2">
        <button type="submit" class={button.primary}>Kiểm tra</button>
        <button type="button" class={button.quiet} onclick={() => (reveal = !reveal)}>
          {reveal ? 'Ẩn cách làm bằng CAS' : 'Xem cách làm bằng CAS'}
        </button>
      </div>
    </form>
    {#if verdict}
      <FeedbackNote tone={verdict.ok ? 'ok' : 'warn'} text={verdict.message} />
    {/if}
    {#if reveal}
      <div class="rounded-lg border border-slate-300 bg-white p-3 text-sm">
        <p>Gõ vào dòng lệnh CAS:</p>
        <p class="my-1 font-mono break-all text-slate-900">{task.command}</p>
        <p>GeoGebra cho kết quả:</p>
        <p class="mt-1 overflow-x-auto text-indigo-800"><Tex math={task.resultTex} /></p>
      </div>
    {/if}
  {:else}
    <SegmentedControl
      label="Đồ thị cần vẽ"
      options={GRAPH_TASKS.map((t) => ({ value: t.id, label: t.label }))}
      bind:value={graphTaskId}
    />
    <FeedbackNote
      tone={taskDone ? 'ok' : 'info'}
      text={taskDone
        ? `Đúng rồi! Đồ thị ${graphTask.label} đã có trên màn hình.`
        : `Gõ hàm số ${graphTask.label} vào ô nhập để vẽ đồ thị của nó.`}
    />
    <form
      class="flex gap-2"
      onsubmit={(e) => {
        e.preventDefault();
        addGraph();
      }}
    >
      <input
        bind:value={graphLine}
        class="{textInput} font-mono text-base"
        aria-label="Ô nhập hàm số"
        placeholder="Nhập: y = -3x + 3"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
      />
      <button type="submit" class={button.primary}>Vẽ</button>
    </form>
    {#if graphError}<p class="text-sm text-rose-700">{graphError}</p>{/if}

    <div class="grid gap-4 md:grid-cols-[1fr_16rem]">
      <CoordinatePlane {plane} label="Mặt phẳng toạ độ với các đồ thị đã vẽ" interactive={false}>
        {#snippet children(p)}
          <clipPath id={clipId}>
            <rect
              x={p.mx(p.xMin)}
              y={p.my(p.yMax)}
              width={p.mx(p.xMax) - p.mx(p.xMin)}
              height={p.my(p.yMin) - p.my(p.yMax)}
            />
          </clipPath>
          {#each drawn as d (d.entry.name)}
            {#each d.runs as pts, k (k)}
              <path
                d={pathOf(pts)}
                fill="none"
                stroke={d.entry.color}
                stroke-width="2.5"
                clip-path="url(#{clipId})"
              />
            {/each}
            {#if d.cut}
              {#if inside(0, d.cut.y)}
                <circle cx={p.mx(0)} cy={p.my(d.cut.y)} r="4" fill={d.entry.color} />
              {/if}
              {#if d.cut.x !== null && inside(d.cut.x, 0)}
                <circle cx={p.mx(d.cut.x)} cy={p.my(0)} r="4" fill={d.entry.color} />
              {/if}
            {/if}
          {/each}
        {/snippet}
      </CoordinatePlane>

      <div class="space-y-3">
        <p class="text-sm font-semibold text-slate-700">Danh sách đối tượng</p>
        {#if !entries.length}
          <p class="text-sm text-slate-500">Chưa có đồ thị nào.</p>
        {/if}
        <ul class="space-y-2">
          {#each drawn as d (d.entry.name)}
            <li class="rounded-lg border border-slate-200 p-2 text-sm">
              <div class="flex items-start justify-between gap-2">
                <p class="min-w-0">
                  <span
                    class="mr-1 inline-block h-3 w-3 rounded-full align-middle"
                    style:background={d.entry.color}
                    aria-hidden="true"
                  ></span>
                  <span class="font-semibold">{d.entry.name}:</span>
                  {#if d.lin}
                    <Tex math={lineTex(d.lin)} />
                  {:else}
                    <span class="font-mono">{d.entry.input}</span>
                  {/if}
                </p>
                <button
                  type="button"
                  class="min-h-11 min-w-11 rounded-lg text-slate-500 hover:bg-slate-100"
                  aria-label="Xoá {d.entry.name}"
                  onclick={() => removeGraph(d.entry.name)}>✕</button
                >
              </div>
              {#if d.lin}
                <p class="mt-1 text-slate-600">
                  {d.lin.a === 0
                    ? 'Hàm hằng: '
                    : `Hệ số góc ${formatNumber(d.lin.a)}; `}{describeLine(d.lin)}
                </p>
              {:else}
                <p class="mt-1 text-amber-800">
                  Không phải hàm số bậc nhất: đồ thị không là đường thẳng.
                </p>
              {/if}
            </li>
          {/each}
        </ul>
        {#if showSliders}
          <div class="space-y-2 rounded-lg bg-slate-50 p-3">
            <p class="text-sm text-slate-600">Thanh trượt cho a và b, như GeoGebra tự tạo:</p>
            <SliderField label="a" bind:value={sliderA} min={-5} max={5} step={0.5} />
            <SliderField label="b" bind:value={sliderB} min={-5} max={5} step={0.5} />
          </div>
        {/if}
      </div>
    </div>
    <p class="text-xs text-slate-500">
      Gõ y = 2x + 1 hoặc g(x) = 0.5x - 4. Gõ y = a x + b để có thanh trượt và xem a, b làm đồ thị
      thay đổi thế nào. Chấm tròn là giao điểm của đường thẳng với hai trục.
    </p>
    <p class="sr-only" aria-live="polite">{graphAnnounce}</p>
  {/if}
</div>
