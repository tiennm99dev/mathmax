<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import DigitPad from '../_shared/digit-pad.svelte';
  import KidNote from '../_shared/kid-note.svelte';
  import {
    areaLayout,
    askColumn,
    carryOf,
    digitOf,
    firstTask,
    makeTask,
    onesOf,
    partLines,
    sayColumn,
    tensOf,
    wrongMessage,
  } from './engine.js';

  const WIDTH = 320;
  const LEFT = 30;
  const TOP = 30;

  let kind = $state(/** @type {import('./engine.js').TaskKind} */ ('plain'));
  let task = $state(firstTask('plain'));
  /** @type {{ ones: number | null, tens: number | null }} */
  let written = $state({ ones: null, tens: null });
  let tries = $state(0);
  let slip = $state('');
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const place = $derived(written.ones === null ? 'ones' : written.tens === null ? 'tens' : null);
  const box = $derived(areaLayout(task, WIDTH, 180));
  const parts = $derived(partLines(task));
  const carry = $derived(carryOf(task));
  const tensColumns = $derived(tensOf(task.a) * 10);

  const message = $derived.by(() => {
    if (place === null) {
      return `${task.a} × ${task.b} = ${task.a * task.b}. ${sayColumn(task, 'ones')}. ${sayColumn(task, 'tens')}.`;
    }
    return slip || askColumn(task, place);
  });
  const tone = $derived(place === null ? 'ok' : slip ? 'warn' : 'info');

  /** @param {import('./engine.js').Task} next */
  function start(next) {
    task = next;
    written = { ones: null, tens: null };
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
    if (place === null) return;
    if (digit !== digitOf(task, place)) {
      tries += 1;
      slip = wrongMessage(task, place, digit, tries);
      return;
    }
    written[place] = digit;
    tries = 0;
    slip = '';
    if (place === null) {
      await tick();
      nextButton?.focus();
    }
  }

  /**
   * How strongly a part of the model shows: lit while its column is worked on
   * or once it is done.
   * @param {import('./engine.js').Place} part
   */
  const opacity = (part) => (place === part || written[part] !== null ? 1 : 0.35);

  const label = $derived(
    `Mô hình ${task.a} nhân ${task.b}: ${task.b} hàng, mỗi hàng ${tensColumns} ô màu xanh và ${onesOf(task.a)} ô màu cam.`,
  );
  const sheetLabel = $derived(
    `Đặt tính ${task.a} nhân ${task.b}. Hàng chục của kết quả: ${written.tens ?? 'chưa viết'}. Hàng đơn vị của kết quả: ${written.ones ?? 'chưa viết'}.${written.ones !== null && carry > 0 ? ` Đã nhớ ${carry}.` : ''}`,
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
      { value: 'carry', label: 'Có nhớ' },
    ]}
    onchange={chooseKind}
  />

  <svg
    viewBox="0 0 {LEFT + WIDTH + 6} {TOP + box.height + 6}"
    class="mx-auto block w-full max-w-md"
    role="img"
    aria-label={label}
  >
    <text
      x={LEFT - 10}
      y={TOP + box.height / 2}
      text-anchor="middle"
      dominant-baseline="middle"
      font-size="20"
      font-weight="700"
      fill="#334155">{task.b}</text
    >
    <text
      x={LEFT + box.tensWidth / 2}
      y={TOP - 10}
      text-anchor="middle"
      font-size="20"
      font-weight="700"
      fill="#3730a3">{tensColumns}</text
    >
    <text
      x={LEFT + box.tensWidth + box.onesWidth / 2}
      y={TOP - 10}
      text-anchor="middle"
      font-size="20"
      font-weight="700"
      fill="#b45309">{onesOf(task.a)}</text
    >
    <rect
      x={LEFT}
      y={TOP}
      width={box.tensWidth}
      height={box.height}
      fill="#a5b4fc"
      opacity={opacity('tens')}
    />
    <rect
      x={LEFT + box.tensWidth}
      y={TOP}
      width={box.onesWidth}
      height={box.height}
      fill="#fcd34d"
      opacity={opacity('ones')}
    />
    {#each { length: task.a + 1 } as _, i (i)}
      <line
        x1={LEFT + i * box.cell}
        y1={TOP}
        x2={LEFT + i * box.cell}
        y2={TOP + box.height}
        stroke="#1e293b"
        stroke-width={i % 10 === 0 ? 2 : 0.5}
      />
    {/each}
    {#each { length: task.b + 1 } as _, i (i)}
      <line
        x1={LEFT}
        y1={TOP + i * box.cell}
        x2={LEFT + task.a * box.cell}
        y2={TOP + i * box.cell}
        stroke="#1e293b"
        stroke-width={i === 0 || i === task.b ? 2 : 0.5}
      />
    {/each}
  </svg>

  <div class="flex flex-wrap items-start justify-center gap-4">
    <div
      class="inline-grid grid-cols-[2.5rem_3.5rem_3.5rem] rounded-2xl border-4 border-slate-300 bg-white p-2 text-4xl font-bold tabular-nums"
      role="img"
      aria-label={sheetLabel}
    >
      <span class={cellClass}></span>
      <span class={cellClass}>{tensOf(task.a)}</span>
      <span class={cellClass}>{onesOf(task.a)}</span>
      <span class={cellClass}>×</span>
      <span class="relative {cellClass}">
        {#if written.ones !== null && carry > 0}
          <span class="absolute right-1 top-0 text-xl text-rose-600">{carry}</span>
        {/if}
      </span>
      <span class={cellClass}>{task.b}</span>
      <span class="col-span-3 h-1 rounded bg-slate-700"></span>
      <span class={cellClass}></span>
      <span class="{cellClass} rounded-xl {place === 'tens' ? 'bg-indigo-100' : ''}"
        >{written.tens ?? ''}</span
      >
      <span class="{cellClass} rounded-xl {place === 'ones' ? 'bg-amber-100' : ''}"
        >{written.ones ?? ''}</span
      >
    </div>

    <ul class="space-y-2 text-xl font-semibold tabular-nums">
      {#if written.ones !== null}
        <li class="rounded-xl bg-amber-100 px-3 py-2 text-amber-950">{parts.ones}</li>
      {/if}
      {#if written.tens !== null}
        <li class="rounded-xl bg-indigo-100 px-3 py-2 text-indigo-950">{parts.tens}</li>
        <li class="rounded-xl bg-emerald-100 px-3 py-2 text-emerald-950">{parts.sum}</li>
      {/if}
    </ul>
  </div>

  <KidNote {tone} text={message} />

  {#if place !== null}
    <DigitPad label="Chọn chữ số để viết" onpick={write} />
  {/if}

  <button
    type="button"
    class="min-h-12 text-lg {place === null ? button.primary : button.secondary}"
    bind:this={nextButton}
    onclick={() => start(makeTask(Math.random, kind, task))}>Phép nhân khác</button
  >
</div>
