<script>
  import { button, focusRing } from '../ui.js';

  /**
   * Base-ten blocks in a place-value chart: thousand cubes, hundred flats,
   * ten rods and unit cubes. Each column has − and + buttons; tapping a block
   * (or focusing it and pressing Enter) breaks it into ten of the next place
   * down, and "Gộp 10" regroups ten blocks into one of the next place up. The
   * total and its expanded form update as the blocks change.
   *
   * - `counts` (bindable): blocks per place, `{ thousands, hundreds, tens, ones }`.
   *   Bind it to read changes; the component replaces the object on each edit.
   * - `places`: how many columns, from ones (1) up to thousands (4); 3 by default.
   * - `max`: most blocks a column may hold (19, so a broken block still fits).
   *
   * @type {{
   *   counts?: { thousands?: number, hundreds?: number, tens?: number, ones?: number };
   *   places?: 1 | 2 | 3 | 4;
   *   interactive?: boolean;
   *   max?: number;
   *   onchange?: (counts: { thousands: number, hundreds: number, tens: number, ones: number }, total: number) => void;
   * }}
   */
  let {
    counts = $bindable({ hundreds: 1, tens: 2, ones: 3 }),
    places = 3,
    interactive = true,
    max = 19,
    onchange,
  } = $props();

  /** @typedef {'thousands' | 'hundreds' | 'tens' | 'ones'} Place */
  /** @type {Array<{ key: Place, name: string, short: string, value: number }>} */
  const ALL = [
    { key: 'thousands', name: 'Nghìn', short: 'nghìn', value: 1000 },
    { key: 'hundreds', name: 'Trăm', short: 'trăm', value: 100 },
    { key: 'tens', name: 'Chục', short: 'chục', value: 10 },
    { key: 'ones', name: 'Đơn vị', short: 'đơn vị', value: 1 },
  ];
  const columns = $derived(ALL.slice(4 - places));
  const full = $derived({
    thousands: counts.thousands ?? 0,
    hundreds: counts.hundreds ?? 0,
    tens: counts.tens ?? 0,
    ones: counts.ones ?? 0,
  });
  const total = $derived(columns.reduce((s, c) => s + full[c.key] * c.value, 0));
  const expanded = $derived(
    columns
      .filter((c) => full[c.key] > 0)
      .map((c) => `${full[c.key]} ${c.short}`)
      .join(' '),
  );
  let announce = $state('');

  /** @param {Partial<Record<Place, number>>} patch @param {string} message */
  function update(patch, message) {
    const next = { ...full, ...patch };
    if (Object.values(next).some((v) => v < 0 || v > max)) return;
    counts = next;
    announce = message;
    onchange?.(
      next,
      columns.reduce((s, c) => s + next[c.key] * c.value, 0),
    );
  }

  /** @param {number} i column index */
  function breakDown(i) {
    const c = columns[i];
    const lower = columns[i + 1];
    if (!lower || full[c.key] === 0) return;
    update(
      { [c.key]: full[c.key] - 1, [lower.key]: full[lower.key] + 10 },
      `Đổi 1 ${c.short} thành 10 ${lower.short}.`,
    );
  }

  /** @param {number} i column index */
  function regroup(i) {
    const c = columns[i];
    const upper = columns[i - 1];
    if (!upper || full[c.key] < 10) return;
    update(
      { [c.key]: full[c.key] - 10, [upper.key]: full[upper.key] + 1 },
      `Gộp 10 ${c.short} thành 1 ${upper.short}.`,
    );
  }

  /** Blocks drawn per column; more are summarised as a count. */
  const SHOWN = 20;
</script>

{#snippet block(/** @type {Place} */ key, /** @type {number} */ k)}
  {#if key === 'ones'}
    {@const x = (k % 5) * 18}
    {@const y = Math.floor(k / 5) * 18}
    <rect x={x + 1} y={y + 1} width="15" height="15" rx="2" fill="#fbbf24" stroke="#b45309" />
  {:else if key === 'tens'}
    {@const x = (k % 10) * 18}
    {@const y = Math.floor(k / 10) * 156}
    <rect x={x + 1} y={y + 1} width="15" height="150" rx="2" fill="#34d399" stroke="#047857" />
    {#each { length: 9 } as _, j (j)}
      <line
        x1={x + 1}
        y1={y + 16 + j * 15}
        x2={x + 16}
        y2={y + 16 + j * 15}
        stroke="#047857"
        stroke-width="0.8"
      />
    {/each}
  {:else if key === 'hundreds'}
    {@const x = (k % 2) * 82}
    {@const y = Math.floor(k / 2) * 82}
    <rect x={x + 1} y={y + 1} width="76" height="76" rx="2" fill="#60a5fa" stroke="#1d4ed8" />
    {#each { length: 9 } as _, j (j)}
      <line
        x1={x + 1 + (j + 1) * 7.6}
        y1={y + 1}
        x2={x + 1 + (j + 1) * 7.6}
        y2={y + 77}
        stroke="#1d4ed8"
        stroke-width="0.6"
      />
      <line
        x1={x + 1}
        y1={y + 1 + (j + 1) * 7.6}
        x2={x + 77}
        y2={y + 1 + (j + 1) * 7.6}
        stroke="#1d4ed8"
        stroke-width="0.6"
      />
    {/each}
  {:else}
    {@const x = (k % 2) * 82}
    {@const y = Math.floor(k / 2) * 82}
    <path d="M {x + 12} {y + 2} h 64 l -12 12 h -64 z" fill="#c4b5fd" stroke="#6d28d9" />
    <path d="M {x + 76} {y + 2} v 64 l -12 12 v -64 z" fill="#8b5cf6" stroke="#6d28d9" />
    <rect {x} y={y + 14} width="64" height="64" fill="#a78bfa" stroke="#6d28d9" />
  {/if}
{/snippet}

<div class="space-y-3">
  <div class="grid gap-2" style:grid-template-columns="repeat({columns.length}, minmax(0, 1fr))">
    {#each columns as c, i (c.key)}
      {@const n = full[c.key]}
      {@const shown = Math.min(n, SHOWN)}
      {@const vb =
        c.key === 'ones'
          ? { w: 90, h: Math.max(18, Math.ceil(shown / 5) * 18) }
          : c.key === 'tens'
            ? { w: 180, h: Math.max(156, Math.ceil(shown / 10) * 156) }
            : { w: 160, h: Math.max(82, Math.ceil(shown / 2) * 82) }}
      <section
        class="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white"
        aria-label={c.name}
      >
        <h3 class="border-b border-slate-200 py-1 text-center text-sm font-bold text-slate-700">
          {c.name}
        </h3>
        <div class="flex min-h-28 flex-1 items-start justify-center p-2">
          {#if n > 0}
            {#if interactive && i < columns.length - 1}
              <button
                type="button"
                class="w-full rounded-lg {focusRing}"
                aria-label="Đổi 1 {c.short} thành 10 {columns[i + 1].short}"
                onclick={() => breakDown(i)}
              >
                <svg
                  viewBox="0 0 {vb.w} {vb.h}"
                  class="block w-full"
                  style:max-height="12rem"
                  aria-hidden="true"
                >
                  {#each { length: shown } as _, k (k)}{@render block(c.key, k)}{/each}
                </svg>
              </button>
            {:else}
              <svg
                viewBox="0 0 {vb.w} {vb.h}"
                class="block w-full"
                style:max-height="12rem"
                aria-hidden="true"
              >
                {#each { length: shown } as _, k (k)}{@render block(c.key, k)}{/each}
              </svg>
            {/if}
          {/if}
        </div>
        <p class="text-center text-2xl font-bold tabular-nums text-slate-800">
          {n}{#if n > SHOWN}<span class="sr-only"> (hiện {SHOWN})</span>{/if}
        </p>
        {#if interactive}
          <div class="flex flex-wrap justify-center gap-1 p-2">
            <button
              type="button"
              class="{button.quiet} px-3"
              aria-label="Bớt 1 {c.short}"
              disabled={n <= 0}
              onclick={() => update({ [c.key]: n - 1 }, `Còn ${n - 1} ${c.short}.`)}>−</button
            >
            <button
              type="button"
              class="{button.quiet} px-3"
              aria-label="Thêm 1 {c.short}"
              disabled={n >= max}
              onclick={() => update({ [c.key]: n + 1 }, `Có ${n + 1} ${c.short}.`)}>+</button
            >
            {#if i > 0}
              <button
                type="button"
                class="{button.secondary} px-3 text-sm"
                disabled={n < 10}
                onclick={() => regroup(i)}>Gộp 10</button
              >
            {/if}
          </div>
        {/if}
      </section>
    {/each}
  </div>
  <p class="text-center text-lg text-slate-800" aria-live="polite">
    {#if expanded}{expanded} =
    {/if}<strong class="text-2xl tabular-nums">{total}</strong>
  </p>
  <p class="sr-only" aria-live="polite">{announce}</p>
</div>
