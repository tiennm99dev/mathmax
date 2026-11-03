<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { mulColumns } from '../_shared/columns.js';
  import DigitPad from '../_shared/digit-pad.svelte';
  import KidNote from '../_shared/kid-note.svelte';
  import {
    askColumn,
    doneMessage,
    firstTask,
    makeTask,
    partLines,
    rowBlocks,
    sumLine,
    wrongMessage,
  } from './engine.js';

  const ROW = 24;
  const HEAD = 26;
  const START = { hundreds: 4, tens: 112, ones: 216 };

  let kind = $state(/** @type {import('./engine.js').TaskKind} */ ('plain'));
  let task = $state(firstTask('plain'));
  /** How many columns are written, from the ones. */
  let written = $state(0);
  let tries = $state(0);
  let slip = $state('');
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const columns = $derived(mulColumns(task.a, task.b));
  const done = $derived(written === columns.length);
  const blocks = $derived(rowBlocks(task));
  const parts = $derived(partLines(task));
  const digitsOfA = $derived(String(task.a).split(''));
  const message = $derived(done ? doneMessage(task) : slip || askColumn(task, written));
  const tone = $derived(done ? 'ok' : slip ? 'warn' : 'info');

  /** @param {import('./engine.js').Task} next */
  function start(next) {
    task = next;
    written = 0;
    tries = 0;
    slip = '';
  }

  /** @param {string | number} next */
  function chooseKind(next) {
    kind = /** @type {import('./engine.js').TaskKind} */ (next);
    start(firstTask(kind));
  }

  /** @param {number} digit */
  async function write(digit) {
    if (done) return;
    if (digit !== columns[written].digit) {
      tries += 1;
      slip = wrongMessage(task, written, digit, tries);
      return;
    }
    written += 1;
    tries = 0;
    slip = '';
    if (written === columns.length) {
      await tick();
      nextButton?.focus();
    }
  }

  /**
   * A column of the answer: the sheet draws hundreds first, `column` counts
   * from the ones.
   * @param {number} column
   */
  const answerDigit = (column) => (column < written ? String(columns[column].digit) : '');
  /** @param {number} column */
  const activeTint = (column) =>
    column === written ? ['bg-amber-100', 'bg-indigo-100', 'bg-rose-100'][column] : '';
  /**
   * The carry waiting above a column: shown once the column before is written.
   * @param {number} column
   */
  const carryAbove = (column) => (written >= column ? columns[column].carryIn : 0);
  /** @param {number} column */
  const opacity = (column) => (column <= written ? 1 : 0.3);

  const modelLabel = $derived(
    `Mô hình ${task.a} nhân ${task.b}: ${task.b} hàng, mỗi hàng ${blocks.hundreds} trăm, ${blocks.tens} chục và ${blocks.ones} đơn vị.`,
  );
  const sheetLabel = $derived(
    `Đặt tính ${task.a} nhân ${task.b}. Kết quả đã viết: ${
      written === 0
        ? 'chưa có'
        : columns
            .slice(0, written)
            .map((c) => c.digit)
            .reverse()
            .join(' ')
    }.`,
  );
  const cellClass = 'flex h-14 items-center justify-center';
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn loại phép nhân"
    hideLabel
    bind:value={kind}
    options={[
      { value: 'plain', label: 'Không nhớ' },
      { value: 'one', label: 'Nhớ một lần' },
      { value: 'two', label: 'Nhớ hai lần' },
    ]}
    onchange={chooseKind}
  />

  <svg
    viewBox="0 0 320 {HEAD + task.b * ROW + 2}"
    class="mx-auto block w-full max-w-md"
    role="img"
    aria-label={modelLabel}
  >
    <text x="50" y="18" text-anchor="middle" font-size="15" font-weight="700" fill="#be123c"
      >{blocks.hundreds} trăm</text
    >
    <text x="158" y="18" text-anchor="middle" font-size="15" font-weight="700" fill="#3730a3"
      >{blocks.tens} chục</text
    >
    <text x="264" y="18" text-anchor="middle" font-size="15" font-weight="700" fill="#b45309"
      >{blocks.ones} đơn vị</text
    >
    {#each { length: task.b } as _, row (row)}
      {@const y = HEAD + row * ROW}
      <g opacity={opacity(2)}>
        {#each { length: blocks.hundreds } as _, i (i)}
          <rect
            x={START.hundreds + i * 24}
            {y}
            width="21"
            height="21"
            fill="#fda4af"
            stroke="#881337"
          />
        {/each}
      </g>
      <g opacity={opacity(1)}>
        {#each { length: blocks.tens } as _, i (i)}
          <rect
            x={START.tens + i * 10}
            {y}
            width="7"
            height="21"
            rx="1"
            fill="#a5b4fc"
            stroke="#312e81"
          />
        {/each}
      </g>
      <g opacity={opacity(0)}>
        {#each { length: blocks.ones } as _, i (i)}
          <rect
            x={START.ones + i * 11}
            y={y + 7}
            width="8"
            height="8"
            rx="1"
            fill="#fcd34d"
            stroke="#92400e"
          />
        {/each}
      </g>
    {/each}
  </svg>

  <div class="flex flex-wrap items-start justify-center gap-4">
    <div
      class="inline-grid grid-cols-[2.25rem_3rem_3rem_3rem] rounded-2xl border-4 border-slate-300 bg-white p-2 text-4xl font-bold tabular-nums"
      role="img"
      aria-label={sheetLabel}
    >
      <span class={cellClass}></span>
      {#each digitsOfA as digit, i (i)}
        <span class={cellClass}>{digit}</span>
      {/each}
      <span class={cellClass}>×</span>
      {#each [2, 1] as column (column)}
        <span class="relative {cellClass}">
          {#if carryAbove(column) > 0}
            <span class="absolute right-1 top-0 text-xl text-rose-600">{carryAbove(column)}</span>
          {/if}
        </span>
      {/each}
      <span class={cellClass}>{task.b}</span>
      <span class="col-span-4 h-1 rounded bg-slate-700"></span>
      <span class={cellClass}></span>
      {#each [2, 1, 0] as column (column)}
        <span class="{cellClass} rounded-xl {activeTint(column)}">{answerDigit(column)}</span>
      {/each}
    </div>

    <ul class="space-y-2 text-xl font-semibold tabular-nums">
      {#each parts as line, i (i)}
        {#if i < written}
          <li
            class="rounded-xl px-3 py-2 {[
              'bg-amber-100 text-amber-950',
              'bg-indigo-100 text-indigo-950',
              'bg-rose-100 text-rose-950',
            ][i]}"
          >
            {line}
          </li>
        {/if}
      {/each}
      {#if done}
        <li class="rounded-xl bg-emerald-100 px-3 py-2 text-emerald-950">{sumLine(task)}</li>
      {/if}
    </ul>
  </div>

  <KidNote {tone} text={message} />

  {#if !done}
    <DigitPad label="Chọn chữ số để viết" onpick={write} />
  {/if}

  <button
    type="button"
    class="min-h-12 text-lg {done ? button.primary : button.secondary}"
    bind:this={nextButton}
    onclick={() => start(makeTask(Math.random, kind, task))}>Phép nhân khác</button
  >
</div>
