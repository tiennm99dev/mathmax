<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import {
    COLS,
    cellFact,
    cellValue,
    cellsWith,
    hasCell,
    moveCell,
    relatedText,
    rowsOf,
    targetText,
    targetsOf,
  } from './engine.js';

  const MODES = [
    { value: 'cong', label: 'Bảng cộng' },
    { value: 'tru', label: 'Bảng trừ' },
  ];

  let mode = $state(/** @type {import('./engine.js').Mode} */ ('cong'));
  let row = $state(3);
  let col = $state(2);
  /** Result whose cells are lit, or null. */
  let target = $state(/** @type {number | null} */ (null));
  let hidden = $state(false);
  /** Cells shown while results are hidden, as "r-c" keys. */
  let opened = $state(/** @type {string[]} */ ([]));
  /** @type {HTMLTableElement | undefined} */
  let table = $state();

  const rows = $derived(rowsOf(mode));
  const lit = $derived(target === null ? [] : cellsWith(mode, target).map(([r, c]) => `${r}-${c}`));
  const sign = $derived(mode === 'cong' ? '+' : '−');
  const message = $derived(
    target !== null
      ? targetText(mode, target)
      : `Hàng ${row}, cột ${col}: ${cellFact(mode, row, col)}. ${relatedText(mode, row, col)}`,
  );

  function changeMode() {
    row = mode === 'cong' ? 3 : 5;
    col = 2;
    target = null;
    opened = [`${row}-${col}`];
  }

  /** @param {number} r @param {number} c */
  function pick(r, c) {
    row = r;
    col = c;
    target = null;
    const key = `${r}-${c}`;
    if (hidden && !opened.includes(key)) opened = [...opened, key];
  }

  /** @param {KeyboardEvent} e */
  async function onKey(e) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault();
    const [r, c] = moveCell(mode, row, col, e.key);
    pick(r, c);
    await tick();
    table?.querySelector(`[data-cell="${r}-${c}"]`)?.closest('button')?.focus();
  }

  /** @param {number} t */
  function light(t) {
    target = target === t ? null : t;
  }

  /** @param {number} r @param {number} c */
  function cellClass(r, c) {
    const key = `${r}-${c}`;
    const base = `h-9 w-full rounded-md text-lg font-bold tabular-nums transition ${focusRing}`;
    if (lit.includes(key)) return `${base} bg-amber-300 text-amber-950`;
    if (target === null && r === row && c === col) return `${base} bg-indigo-600 text-white`;
    if (target === null && (r === row || c === col)) return `${base} bg-indigo-100 text-indigo-900`;
    return `${base} bg-white text-slate-800 hover:bg-indigo-50`;
  }

  /** @param {number} r @param {number} c */
  function shownValue(r, c) {
    return hidden && !opened.includes(`${r}-${c}`) ? '?' : String(cellValue(mode, r, c));
  }
</script>

<div class="space-y-4">
  <SegmentedControl label="Bảng" options={MODES} bind:value={mode} onchange={changeMode} />

  <label class="flex min-h-12 items-center gap-3 text-lg">
    <input
      type="checkbox"
      class="h-6 w-6 {focusRing}"
      bind:checked={hidden}
      onchange={() => (opened = [`${row}-${col}`])}
    />
    Che kết quả để tự đố mình
  </label>

  <div class="overflow-x-auto">
    <table
      bind:this={table}
      class="w-full min-w-[19rem] table-fixed border-separate border-spacing-0.5 rounded-xl bg-slate-100 p-1"
      aria-label={mode === 'cong' ? 'Bảng cộng trong phạm vi 10' : 'Bảng trừ trong phạm vi 10'}
    >
      <thead>
        <tr>
          <th scope="col" class="text-xl text-rose-600">{sign}</th>
          {#each COLS as c (c)}
            <th
              scope="col"
              class="rounded-md text-lg tabular-nums {target === null && c === col
                ? 'bg-indigo-200 text-indigo-950'
                : 'text-slate-600'}">{c}</th
            >
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each rows as r (r)}
          <tr>
            <th
              scope="row"
              class="rounded-md text-lg tabular-nums {target === null && r === row
                ? 'bg-indigo-200 text-indigo-950'
                : 'text-slate-600'}">{r}</th
            >
            {#each COLS as c (c)}
              <td>
                {#if hasCell(mode, r, c)}
                  <button
                    type="button"
                    class={cellClass(r, c)}
                    tabindex={r === row && c === col ? 0 : -1}
                    aria-label="{r} {mode === 'cong' ? 'cộng' : 'trừ'} {c}{hidden &&
                    !opened.includes(`${r}-${c}`)
                      ? ''
                      : ` bằng ${cellValue(mode, r, c)}`}"
                    aria-pressed={r === row && c === col}
                    onclick={() => pick(r, c)}
                    onkeydown={onKey}><span data-cell="{r}-{c}">{shownValue(r, c)}</span></button
                  >
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <p
    class="rounded-2xl bg-emerald-100 px-4 py-3 text-xl font-semibold text-emerald-900"
    aria-live="polite"
  >
    {message}
  </p>

  <div>
    <p class="mb-2 text-base font-semibold text-slate-600">Tô sáng các ô có kết quả bằng</p>
    <div class="flex flex-wrap gap-2" role="group" aria-label="Tô sáng các ô có kết quả bằng">
      {#each targetsOf(mode) as t (t)}
        <button
          type="button"
          class="h-12 min-w-12 rounded-xl border-2 text-xl font-bold tabular-nums {focusRing} {target ===
          t
            ? 'border-amber-500 bg-amber-300 text-amber-950'
            : 'border-slate-300 bg-white text-slate-800'}"
          aria-pressed={target === t}
          onclick={() => light(t)}>{t}</button
        >
      {/each}
    </div>
  </div>
</div>
