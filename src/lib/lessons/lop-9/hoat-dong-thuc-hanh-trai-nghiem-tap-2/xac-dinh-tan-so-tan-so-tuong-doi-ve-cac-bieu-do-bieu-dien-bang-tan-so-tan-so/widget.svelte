<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import PieChart from '#lib/core/visuals/pie-chart.svelte';
  import { button, focusRing, textInput } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import {
    DATASETS,
    FIRST_ROW,
    baseSheet,
    evaluator,
    expectedValues,
    layout,
    matches,
    modelFormulas,
    shiftFormula,
  } from './engine.js';

  /** @typedef {import('./engine.js').Value} Value */

  let setId = $state(DATASETS[0].id);
  let data = $state([...DATASETS[0].data]);
  /** @type {Record<string, string>} */
  let formulas = $state({});
  let selected = $state('E2');
  let draft = $state('');
  let chart = $state('cot');
  let message = $state('');
  const barId = $props.id();

  /** Feedback text is rich text: write a literal dollar of a cell reference as \\$. @param {string} t */
  const esc = (t) => t.replace(/\$/g, '\\$');

  const set = $derived(DATASETS.find((s) => s.id === setId) ?? DATASETS[0]);
  const lay = $derived(layout(set));
  const sheet = $derived({ ...baseSheet(set, data), ...formulas });
  const ev = $derived(evaluator(sheet));
  const expected = $derived(expectedValues(set, data));
  const rows = $derived(Array.from({ length: lay.k + 1 }, (_, i) => FIRST_ROW + i));
  const formulaCells = $derived(rows.flatMap((r) => [`E${r}`, `F${r}`]));
  const status = $derived(
    Object.fromEntries(
      formulaCells.map((a) => [a, formulas[a] ? matches(ev.value(a), expected[a]) : null]),
    ),
  );
  const right = $derived(formulaCells.filter((a) => status[a] === true).length);
  const filled = $derived(formulaCells.filter((a) => formulas[a]).length);

  /** @param {Value} v */
  const asNumber = (v) => (typeof v === 'number' && Number.isFinite(v) ? Math.max(0, v) : 0);
  const barData = $derived(
    set.categories.map((c, i) => ({
      label: String(c),
      value: asNumber(ev.value(`E${lay.row(i)}`)),
    })),
  );
  const pieData = $derived(
    set.categories.map((c, i) => ({
      label: String(c),
      value: asNumber(ev.value(`F${lay.row(i)}`)),
    })),
  );
  const barReady = $derived(barData.some((d) => d.value > 0));
  const pieReady = $derived(pieData.some((d) => d.value > 0));

  /**
   * What a cell shows: F as a percentage (Percent Style), errors as Excel writes them.
   * @param {string} addr
   */
  function shown(addr) {
    const v = ev.value(addr);
    if (v === null) return '';
    if (typeof v === 'string') return v;
    if (addr.startsWith('F')) return `${formatNumber(v * 100, 2)}%`;
    return formatNumber(v, 4);
  }

  /** @param {string} addr */
  function select(addr) {
    selected = addr;
    draft = formulas[addr] ?? '';
    message = '';
  }

  function enter() {
    const text = draft.trim();
    const next = { ...formulas };
    if (text) next[selected] = text;
    else delete next[selected];
    formulas = next;
    message = text
      ? `Đã nhập ${text} vào ô ${selected}: ô hiện ${shown(selected) || 'trống'}.`
      : `Đã xoá ô ${selected}.`;
  }

  /** Copies the selected formula down to the last category row, like the fill handle. */
  function fillDown() {
    const col = selected[0];
    const from = Number(selected.slice(1));
    const text = formulas[selected];
    if (!text) {
      message = `Ô ${selected} chưa có công thức để sao chép.`;
      return;
    }
    const next = { ...formulas };
    const last = lay.totalRow - 1;
    for (let r = from + 1; r <= last; r++) {
      const moved = shiftFormula(text, r - from);
      if (moved) next[`${col}${r}`] = moved;
    }
    formulas = next;
    message =
      from >= last
        ? `Ô ${selected} đã là hàng cuối của bảng.`
        : `Đã sao chép công thức của ${selected} xuống ${col}${from + 1}:${col}${last}. Ô ${col}${from + 1} nhận ${next[`${col}${from + 1}`]}.`;
  }

  function fillModel() {
    formulas = modelFormulas(set);
    draft = formulas[selected] ?? '';
    message = 'Đã điền công thức mẫu cho cả bảng.';
  }

  function clearAll() {
    formulas = {};
    draft = '';
    message = 'Đã xoá mọi công thức.';
  }

  function changeSet() {
    data = [...set.data];
    formulas = {};
    selected = 'E2';
    draft = '';
    message = '';
  }

  /** @param {number} j */
  function cycle(j) {
    const cats = set.categories.map(String);
    const now = cats.indexOf(String(data[j]));
    const value = set.categories[(now + 1) % cats.length];
    data = data.map((v, i) => (i === j ? value : v));
    message = `Ô A${FIRST_ROW + j} đổi thành ${value}. Bảng tần số và biểu đồ tự tính lại.`;
  }

  /** @param {(string | undefined)} text */
  const loose = (text) => !!text && /(^|[^$A-Z])\$?A\d/i.test(text.replace(/"[^"]*"/g, ''));

  const advice = $derived.by(() => {
    if (filled === 0)
      return {
        tone: /** @type {const} */ ('info'),
        text: `Chọn ô E${FIRST_ROW}, gõ =COUNTIF(${lay.dataRange};D${FIRST_ROW}) rồi bấm "Nhập". Sau đó sao chép công thức xuống các ô bên dưới.`,
      };
    // A wrong cell is explained first; a cell right only by luck comes next.
    const wrong = formulaCells.find((a) => status[a] === false);
    if (wrong) {
      const v = ev.value(wrong);
      const f = formulas[wrong];
      let why = `Ô ${wrong} hiện ${shown(wrong) || 'trống'}, chưa đúng.`;
      if (typeof v === 'string' && v.startsWith('#'))
        why += ` Lỗi ${v}: ${v === '#NAME?' ? 'tên hàm viết sai' : v === '#DIV/0!' ? 'chia cho ô trống hoặc bằng 0' : 'công thức hoặc ô tham chiếu chưa hợp lệ'}.`;
      else if (wrong.startsWith('E') && loose(f) && Number(wrong.slice(1)) > FIRST_ROW)
        why += ` Vùng dữ liệu đã trượt khi sao chép; viết ${lay.dataRange} để cố định vùng.`;
      else if (wrong.startsWith('F') && f && !f.includes('$') && Number(wrong.slice(1)) > FIRST_ROW)
        why += ` Ô tổng E${lay.totalRow} cần được cố định: $E$${lay.totalRow}.`;
      else if (wrong.startsWith('F')) why += ' Tần số tương đối = tần số : tổng số.';
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${right}/${formulaCells.length} ô đúng. ${why}`,
      };
    }
    const lucky = formulaCells.find(
      (a) =>
        a.startsWith('E') &&
        status[a] === true &&
        Number(a.slice(1)) > FIRST_ROW &&
        Number(a.slice(1)) < lay.totalRow &&
        loose(formulas[a]),
    );
    if (lucky)
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${right}/${formulaCells.length} ô đúng, nhưng ô ${lucky} chứa ${formulas[lucky]}: vùng dữ liệu đã trượt khi sao chép nên chỉ đúng nhờ may mắn (đổi ô A${FIRST_ROW} sẽ thấy sai). Viết ${lay.dataRange} để cố định vùng.`,
      };
    if (right === formulaCells.length)
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Bảng đúng hết ${formulaCells.length} ô. Đổi một ô dữ liệu ở cột A: tần số, tần số tương đối và biểu đồ tự cập nhật.`,
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: `${right}/${formulaCells.length} ô đúng. Còn ${formulaCells.length - filled} ô chưa có công thức.`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Dữ liệu"
    options={DATASETS.map((s) => ({ value: s.id, label: s.label }))}
    bind:value={setId}
    onchange={changeSet}
  />

  <section aria-label="Cột A: dữ liệu" class="space-y-2">
    <p class="text-sm font-semibold text-slate-700">
      Cột A, ô A{FIRST_ROW}:A{lay.lastDataRow}: {set.header.toLowerCase()} của {data.length} bạn (bấm
      vào ô để đổi giá trị)
    </p>
    <div class="grid grid-cols-3 gap-1 sm:grid-cols-6">
      {#each data as v, j (j)}
        <button
          type="button"
          class={`min-h-11 rounded border border-slate-300 bg-white px-1 py-1 text-left text-xs hover:bg-emerald-50 ${focusRing}`}
          aria-label={`Ô A${FIRST_ROW + j}: ${v}. Bấm để đổi`}
          onclick={() => cycle(j)}
        >
          <span class="block text-[10px] text-slate-500">A{FIRST_ROW + j}</span>
          <span class="font-semibold text-slate-800">{v}</span>
        </button>
      {/each}
    </div>
  </section>

  <div class="space-y-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
    <label for={barId} class="block text-sm font-semibold text-emerald-900"
      >Thanh công thức, ô {selected}</label
    >
    <div class="flex flex-wrap gap-2">
      <input
        id={barId}
        class={`${textInput} min-w-0 flex-1 font-mono text-base`}
        bind:value={draft}
        placeholder="=COUNTIF(...)"
        autocomplete="off"
        spellcheck="false"
        onkeydown={(e) => {
          if (e.key === 'Enter') enter();
        }}
      />
      <button type="button" class={button.primary} onclick={enter}>Nhập</button>
    </div>
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.secondary} onclick={fillDown}>Sao chép xuống dưới</button>
      <button type="button" class={button.quiet} onclick={fillModel}>Điền công thức mẫu</button>
      <button type="button" class={button.quiet} onclick={clearAll}>Xoá công thức</button>
    </div>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full min-w-[20rem] border-collapse text-sm tabular-nums">
      <caption class="pb-1 text-left text-sm text-slate-600"
        >Bảng tần số trong vùng D1:F{lay.totalRow}; chọn một ô ở cột E hoặc F để nhập công thức</caption
      >
      <thead>
        <tr class="bg-slate-100 text-slate-600">
          <th class="w-10 border border-slate-300 p-1" scope="col"></th>
          <th class="border border-slate-300 p-1" scope="col">D</th>
          <th class="border border-slate-300 p-1" scope="col">E</th>
          <th class="border border-slate-300 p-1" scope="col">F</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-slate-50 font-semibold">
          <th class="border border-slate-300 p-1 text-slate-500" scope="row">1</th>
          <td class="border border-slate-300 p-2">{set.header}</td>
          <td class="border border-slate-300 p-2">Tần số</td>
          <td class="border border-slate-300 p-2">Tần số tương đối</td>
        </tr>
        {#each rows as r (r)}
          <tr class={r === lay.totalRow ? 'font-semibold' : ''}>
            <th class="border border-slate-300 p-1 text-slate-500" scope="row">{r}</th>
            <td class="border border-slate-300 p-2">{sheet[`D${r}`]}</td>
            {#each ['E', 'F'] as col (col)}
              {@const addr = `${col}${r}`}
              {@const ok = status[addr]}
              <td class="border border-slate-300 p-0">
                <button
                  type="button"
                  class={`flex min-h-11 w-full items-center justify-between gap-1 px-2 text-right ${focusRing} ${
                    selected === addr ? 'outline-2 outline-emerald-600 bg-emerald-50' : 'bg-white'
                  }`}
                  aria-label={`Ô ${addr}${formulas[addr] ? `, công thức ${formulas[addr]}, giá trị ${shown(addr)}, ${ok ? 'đúng' : 'chưa đúng'}` : ', trống'}`}
                  aria-pressed={selected === addr}
                  onclick={() => select(addr)}
                >
                  <span aria-hidden="true" class={ok ? 'text-emerald-600' : 'text-rose-600'}
                    >{ok === true ? '✓' : ok === false ? '✗' : ''}</span
                  >
                  <span>{shown(addr)}</span>
                </button>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <p class="sr-only" aria-live="polite">{message}</p>
  {#if message}
    <p class="text-sm text-slate-600">{message}</p>
  {/if}
  <FeedbackNote tone={advice.tone} text={esc(advice.text)} />

  <SegmentedControl
    label="Biểu đồ"
    options={[
      { value: 'cot', label: 'Cột: tần số (D:E)' },
      { value: 'quat', label: 'Quạt tròn: tần số tương đối (D:F)' },
    ]}
    bind:value={chart}
  />
  {#if chart === 'cot'}
    {#if barReady}
      <BarChart
        data={barData}
        unit="Tần số"
        title={`Biểu đồ cột tần số: ${set.label.toLowerCase()}`}
      />
    {:else}
      <p class="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
        Cột E chưa có tần số nào, biểu đồ cột còn trống.
      </p>
    {/if}
  {:else if pieReady}
    <PieChart
      data={pieData}
      decimals={1}
      title={`Biểu đồ hình quạt tròn tần số tương đối: ${set.label.toLowerCase()}`}
    />
  {:else}
    <p class="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
      Cột F chưa có tần số tương đối nào, biểu đồ hình quạt tròn còn trống.
    </p>
  {/if}
</div>
