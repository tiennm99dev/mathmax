<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { rng } from '#lib/core/drill.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import { fmt } from '#lib/core/number-format.js';
  import { call, columns, decText, makeProblem, multiply, plan } from './engine.js';

  /** @typedef {import('./engine.js').Op} Op */

  // Fixed seed: the prerendered page and the browser start on the same problem.
  const rand = rng(29);

  let op = $state(/** @type {Op} */ ('+'));
  let signed = $state(false);
  let problem = $state(makeProblem(rand, '+', false));

  /** @type {Array<'' | 'right' | 'wrong'>} */
  let marks = $state([]);
  /** @type {string[]} */
  let typed = $state([]);
  let signChoice = $state(/** @type {0 | 1 | -1} */ (0));
  let comma = $state(0);
  let message = $state('');
  /** @type {Array<HTMLInputElement | undefined>} */
  let inputs = $state([]);

  const pl = $derived(plan(op, problem.x, problem.y));
  const board = $derived(pl.work === 'mul' ? null : columns(pl.work, pl.p, pl.q));
  const product = $derived(pl.work === 'mul' ? multiply(pl.p, pl.q) : null);
  const signDone = $derived(!pl.signed || signChoice === pl.sign);
  const order = $derived(board ? [...board.cols].reverse() : []);
  const nextCol = $derived(
    board ? board.cols.findIndex((c) => c.required && marks[c.i] !== 'right') : -1,
  );
  const finished = $derived(
    signDone && (board ? nextCol === -1 : product !== null && comma === product.commaAt),
  );
  const symbol = $derived(pl.work === 'add' ? '+' : pl.work === 'sub' ? '−' : '×');

  function reset() {
    marks = [];
    typed = [];
    signChoice = 0;
    comma = 0;
    message = '';
  }

  function fresh() {
    problem = makeProblem(rand, op, signed);
    reset();
  }

  /** @param {0 | 1 | -1} s */
  function chooseSign(s) {
    signChoice = s;
    message =
      s === pl.sign
        ? `Đúng: kết quả là số ${s === 1 ? 'dương' : 'âm'}. ${pl.reasons.join(' ')}`
        : pl.work === 'mul'
          ? 'Chưa đúng. Hai thừa số cùng dấu thì tích dương, khác dấu thì tích âm.'
          : 'Chưa đúng. Hai số cùng dấu hay khác dấu? Nếu khác dấu, hãy so sánh số dương với số đối của số âm.';
  }

  /** @param {number} i */
  async function checkDigit(i) {
    if (!board) return;
    const col = board.cols[i];
    const raw = (typed[i] ?? '').trim();
    if (raw === '') {
      marks[i] = '';
      return;
    }
    if (!/^\d$/.test(raw)) {
      marks[i] = 'wrong';
      message = 'Mỗi ô chỉ ghi một chữ số từ 0 đến 9.';
      return;
    }
    if (Number(raw) === col.digit) {
      marks[i] = 'right';
      message = `Đúng! ${col.why}`;
      await tick();
      const next = board.cols.findIndex((c) => c.required && marks[c.i] !== 'right');
      if (next !== -1) inputs[next]?.focus();
    } else {
      marks[i] = 'wrong';
      const carry = col.carryIn ? ' (nhớ cả 1 từ cột bên phải)' : '';
      message =
        pl.work === 'add'
          ? `Chưa đúng ở ${col.place}. Cộng ${col.da} + ${col.db}${carry}, chỉ viết chữ số hàng đơn vị của tổng.`
          : `Chưa đúng ở ${col.place}. Trừ ${col.da} − ${col.db}${carry}; nếu không trừ được thì lấy thêm 10 rồi nhớ 1 sang cột bên trái.`;
    }
  }

  /** @param {number} at */
  function placeComma(at) {
    if (!product) return;
    comma = at;
    const decimals = product.digits.length - at;
    message =
      at === product.commaAt
        ? `Đúng! Hai thừa số có ${pl.p.k} + ${pl.q.k} = ${product.k} chữ số ở phần thập phân, nên tách ${product.k} chữ số ở bên phải tích.`
        : `Chưa đúng: em đang tách ${decimals} chữ số ở phần thập phân. Hãy đếm số chữ số ở phần thập phân của cả hai thừa số.`;
  }

  /** One cell of the column layout. */
  const cellClass = 'flex h-11 w-9 items-center justify-center text-2xl tabular-nums';
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-4">
    <SegmentedControl
      label="Phép tính"
      options={[
        { value: '+', label: 'Cộng' },
        { value: '-', label: 'Trừ' },
        { value: '×', label: 'Nhân' },
      ]}
      bind:value={op}
      onchange={fresh}
    />
    <label class="flex min-h-11 items-center gap-2 font-semibold text-slate-700">
      <input type="checkbox" class="h-5 w-5 {focusRing}" bind:checked={signed} onchange={fresh} />
      Có số thập phân âm
    </label>
    <button type="button" class={button.quiet} onclick={fresh}>Bài mới</button>
  </div>

  <p class="text-2xl font-bold tabular-nums text-slate-800">
    {call(problem.x, op, problem.y)} = {finished ? decText(pl.answer) : '?'}
  </p>

  {#if pl.signed}
    <div class="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p class="font-semibold text-slate-800">Bước 1. Kết quả là số dương hay số âm?</p>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class={signChoice === 1 ? button.primary : button.secondary}
          aria-pressed={signChoice === 1}
          onclick={() => chooseSign(1)}>Số dương</button
        >
        <button
          type="button"
          class={signChoice === -1 ? button.primary : button.secondary}
          aria-pressed={signChoice === -1}
          onclick={() => chooseSign(-1)}>Số âm</button
        >
      </div>
      {#if signDone}
        <ul class="list-disc space-y-1 pl-6 text-slate-700">
          {#each pl.reasons as r (r)}<li>{r}</li>{/each}
        </ul>
      {/if}
    </div>
  {/if}

  <div class="space-y-3 rounded-xl border border-slate-200 p-4 {signDone ? '' : 'opacity-50'}">
    <p class="font-semibold text-slate-800">
      {pl.signed ? 'Bước 2. ' : ''}Đặt tính rồi tính {decText(pl.p)}
      {symbol}
      {decText(pl.q)}
    </p>

    {#if board}
      <div class="overflow-x-auto">
        <div
          class="inline-grid gap-y-1 font-mono"
          role="group"
          aria-label="Bảng đặt tính thẳng cột"
        >
          <!-- carries -->
          <div class="flex items-end text-sm font-bold text-rose-600" aria-hidden="true">
            <span class="w-9"></span>
            {#each order as c (c.i)}
              <span class="flex h-5 w-9 items-end justify-center"
                >{c.carryIn && c.i > 0 && marks[c.i - 1] === 'right' ? '1' : ''}</span
              >
              {#if c.i === board.k && board.k > 0}<span class="w-3"></span>{/if}
            {/each}
          </div>
          {#each [0, 1] as row (row)}
            <div class="flex">
              <span class="{cellClass} text-slate-500">{row === 1 ? symbol : ''}</span>
              {#each order as c (c.i)}
                {@const shown = row === 0 ? c.shownA : c.shownB}
                {@const digit = row === 0 ? c.da : c.db}
                <span
                  class="{cellClass} {shown ? 'text-slate-900' : 'text-slate-300'} {nextCol === c.i
                    ? 'rounded bg-indigo-50'
                    : ''}">{shown ? digit : c.i < board.k ? '0' : ''}</span
                >
                {#if c.i === board.k && board.k > 0}<span
                    class="flex w-3 items-end justify-center pb-1 text-2xl">,</span
                  >{/if}
              {/each}
            </div>
          {/each}
          <div class="ml-9 border-t-2 border-slate-700"></div>
          <div class="flex">
            <span class={cellClass}></span>
            {#each order as c (c.i)}
              {#if c.required}
                <input
                  bind:this={inputs[c.i]}
                  class="h-11 w-9 rounded border text-center text-2xl tabular-nums {focusRing} {marks[
                    c.i
                  ] === 'right'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : marks[c.i] === 'wrong'
                      ? 'border-rose-500 bg-rose-50 text-rose-800'
                      : 'border-slate-300 bg-white'}"
                  inputmode="numeric"
                  maxlength="1"
                  autocomplete="off"
                  aria-label="Chữ số {c.place} của kết quả"
                  disabled={!signDone || (c.i !== nextCol && marks[c.i] !== 'right')}
                  bind:value={typed[c.i]}
                  oninput={() => checkDigit(c.i)}
                />
              {:else}
                <span class={cellClass}></span>
              {/if}
              {#if c.i === board.k && board.k > 0}<span
                  class="flex w-3 items-end justify-center pb-1 text-2xl">,</span
                >{/if}
            {/each}
          </div>
        </div>
      </div>
      <p class="text-sm text-slate-600">
        Các số được viết thẳng cột sao cho dấu phẩy thẳng hàng; chữ số 0 màu nhạt là chữ số thêm vào
        cho phần thập phân dài bằng nhau. Điền kết quả từ phải sang trái, mỗi ô một chữ số; dấu phẩy
        của kết quả đặt thẳng dấu phẩy của hai số.
      </p>
    {:else if product}
      <p class="text-slate-800">
        Nhân như nhân hai số tự nhiên (tạm bỏ dấu phẩy):
        <strong class="tabular-nums">{fmt(pl.p.n)} × {fmt(pl.q.n)} = {fmt(product.P)}</strong>.
      </p>
      <p class="text-slate-800">
        Đếm số chữ số ở phần thập phân của cả hai thừa số, rồi chạm vào chỗ đặt dấu phẩy trong tích
        (đếm từ phải sang trái{product.digits.length > String(product.P).length
          ? '; các chữ số 0 ở đầu được thêm vào cho đủ chỗ'
          : ''}).
      </p>
      <div
        class="flex flex-wrap items-center font-mono text-2xl"
        role="group"
        aria-label="Chọn chỗ đặt dấu phẩy"
      >
        {#each product.digits.split('') as ch, j (j)}
          {#if j > 0}
            <button
              type="button"
              class="mx-0.5 h-11 w-9 rounded border text-xl font-bold {focusRing} {comma === j
                ? j === product.commaAt
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-rose-500 bg-rose-50 text-rose-700'
                : 'border-dashed border-slate-300 text-slate-400 hover:bg-slate-100'}"
              aria-label="Đặt dấu phẩy sau {j} chữ số đầu, còn {product.digits.length -
                j} chữ số ở phần thập phân"
              aria-pressed={comma === j}
              disabled={!signDone}
              onclick={() => placeComma(j)}>{comma === j ? ',' : '·'}</button
            >
          {/if}
          <span class="w-7 text-center tabular-nums">{ch}</span>
        {/each}
      </div>
    {/if}
  </div>

  <p
    class="min-h-6 font-semibold {message.startsWith('Đúng')
      ? 'text-emerald-700'
      : 'text-rose-700'}"
    aria-live="polite"
  >
    {message}
  </p>
  {#if finished}
    <p class="rounded-xl bg-emerald-50 p-3 font-semibold text-emerald-900" aria-live="polite">
      Kết quả: {call(problem.x, op, problem.y)} = {decText(pl.answer)}{pl.sign === -1
        ? ' (đặt dấu "−" trước kết quả tính được)'
        : ''}. Bấm "Bài mới" để làm bài khác.
    </p>
  {/if}
</div>
