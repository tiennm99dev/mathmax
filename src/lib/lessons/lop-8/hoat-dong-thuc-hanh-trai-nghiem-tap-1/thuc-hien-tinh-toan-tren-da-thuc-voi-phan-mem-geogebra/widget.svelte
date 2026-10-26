<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { CasError, TASKS, checkTask, run, valueTex } from './engine.js';

  /** @typedef {{ input: string, tex?: string, error?: string }} Row */

  const TEMPLATES = [
    { label: 'Expand( )', text: 'Expand()' },
    { label: 'Factor( )', text: 'Factor()' },
    { label: 'Division( , )', text: 'Division(, )' },
  ];

  const EXAMPLES = [
    '(3x^2 + 2x)(x - 4)',
    'Expand((x + 2y)^3)',
    'Factor(x^3 - 9x)',
    'Division(x^3 - 2x^2 + 5, x - 3)',
  ];

  let tab = $state('cas');

  // CAS window
  /** @type {Row[]} */
  let rows = $state([evaluate('Expand((x - 2)(x + 3))')]);
  let line = $state('');
  /** @type {HTMLInputElement | undefined} */
  let lineEl = $state();
  let announce = $state('');

  /** @param {string} input @returns {Row} */
  function evaluate(input) {
    try {
      return { input, tex: valueTex(run(input)) };
    } catch (e) {
      return {
        input,
        error: e instanceof CasError ? e.message : 'Không tính được biểu thức này.',
      };
    }
  }

  function submit() {
    const input = line.trim();
    if (!input) return;
    const row = evaluate(input);
    rows = [...rows, row];
    line = '';
    announce = row.error
      ? `Dòng ${rows.length}: lỗi. ${row.error}`
      : `Dòng ${rows.length}: đã tính xong, kết quả hiện bên dưới dòng lệnh.`;
  }

  /** @param {string} text */
  function insert(text) {
    line = line ? `${text.replace('()', `(${line})`)}` : text;
    lineEl?.focus();
  }

  // Checked tasks
  let taskId = $state(TASKS[0].id);
  const task = $derived(TASKS.find((t) => t.id === taskId) ?? TASKS[0]);
  let answer = $state('');
  let remainder = $state('');
  /** @type {{ ok: boolean, message: string } | null} */
  let verdict = $state(null);
  let reveal = $state(false);
  const casTex = $derived(valueTex(run(task.command)));

  /** @param {string | number} v */
  function pickTask(v) {
    taskId = String(v);
    answer = '';
    remainder = '';
    verdict = null;
    reveal = false;
  }

  function check() {
    verdict = answer.trim()
      ? checkTask(task, answer, remainder)
      : { ok: false, message: 'Hãy gõ kết quả trước khi kiểm tra.' };
  }

  const formHint = $derived(
    task.form === 'factored'
      ? 'Gõ tích các nhân tử, ví dụ 2x(x - 3)(x + 1).'
      : task.form === 'division'
        ? 'Gõ thương và số dư, mỗi ô một đa thức.'
        : 'Gõ tổng các đơn thức, không còn dấu ngoặc, ví dụ 4x^2 - 3xy + 1/2y^2.',
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    options={[
      { value: 'cas', label: 'Cửa sổ CAS' },
      { value: 'bai-tap', label: 'Bài tập kiểm tra' },
    ]}
    bind:value={tab}
  />

  {#if tab === 'cas'}
    <div class="rounded-lg border border-slate-300 bg-white">
      <p
        class="border-b border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700"
      >
        CAS (mô phỏng)
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
              submit();
            }}
          >
            <input
              bind:this={lineEl}
              bind:value={line}
              class="{textInput} font-mono text-base"
              aria-label="Dòng nhập lệnh CAS"
              placeholder="Nhập biểu thức hoặc lệnh"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
            />
            <button type="submit" class={button.primary}>Tính</button>
          </form>
        </li>
      </ol>
    </div>
    <div class="flex flex-wrap gap-2">
      {#each TEMPLATES as t (t.label)}
        <button
          type="button"
          class="{button.quiet} font-mono text-sm"
          onclick={() => insert(t.text)}>{t.label}</button
        >
      {/each}
      <button type="button" class={button.quiet} onclick={() => (rows = [])}>Xoá hết</button>
    </div>
    <div class="text-sm">
      <p class="mb-1 font-semibold text-slate-700">Thử nhanh:</p>
      <div class="flex flex-wrap gap-2">
        {#each EXAMPLES as ex (ex)}
          <button
            type="button"
            class="{button.quiet} font-mono text-sm"
            onclick={() => {
              line = ex;
              submit();
            }}>{ex}</button
          >
        {/each}
      </div>
    </div>
    <p class="text-xs text-slate-500">
      Gõ như trong GeoGebra: x^2 là x², 2xy là 2·x·y, 1/3x là ⅓x. Lệnh Factor ở đây phân tích trên
      các số hữu tỉ, tìm các nhân tử bậc nhất có hệ số nhỏ.
    </p>
    <p class="sr-only" aria-live="polite">{announce}</p>
  {:else}
    <SegmentedControl
      label="Chọn bài"
      options={TASKS.map((t) => ({ value: t.id, label: t.label }))}
      value={taskId}
      onchange={pickTask}
    />
    <div class="overflow-x-auto rounded-lg bg-slate-50 p-3">
      <Tex math={task.prompt} display />
    </div>
    <p class="text-sm text-slate-700">
      Tự làm trên giấy, gõ kết quả rồi bấm "Kiểm tra". Sau đó xem GeoGebra làm bằng lệnh nào. {formHint}
    </p>
    <form
      class="space-y-2"
      onsubmit={(e) => {
        e.preventDefault();
        check();
      }}
    >
      <label class="block text-sm font-semibold text-slate-700">
        {task.form === 'division' ? 'Thương' : 'Kết quả'}
        <input
          bind:value={answer}
          class="{textInput} mt-1 font-mono text-base"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
        />
      </label>
      {#if task.form === 'division'}
        <label class="block text-sm font-semibold text-slate-700">
          Số dư
          <input
            bind:value={remainder}
            class="{textInput} mt-1 font-mono text-base"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
          />
        </label>
      {/if}
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
        <p class="mt-1 overflow-x-auto text-indigo-800"><Tex math={casTex} /></p>
        {#if task.form === 'division'}
          <p class="mt-1 text-slate-600">Số thứ nhất trong ngoặc là thương, số thứ hai là số dư.</p>
        {/if}
      </div>
    {/if}
  {/if}
</div>
