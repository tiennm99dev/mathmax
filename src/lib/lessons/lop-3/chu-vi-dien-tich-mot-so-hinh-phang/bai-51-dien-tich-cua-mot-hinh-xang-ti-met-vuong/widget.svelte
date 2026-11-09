<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { SvelteSet } from 'svelte/reactivity';
  import { SHAPES, areaOf, compareText, inShape, placeKey, tileText } from './engine.js';

  let index = $state(0);
  const placed = new SvelteSet();
  /** @type {Array<{ name: string, area: number }>} */
  let results = $state([]);

  const shape = $derived(SHAPES[index]);
  const total = $derived(areaOf(index));
  const cols = $derived(Math.max(...shape.rows.map((r) => r.length)));
  const covered = $derived(placed.size === total);
  const message = $derived(tileText(total, placed.size));
  const compare = $derived(compareText(results));

  /** @param {number} row @param {number} col */
  function toggle(row, col) {
    const key = placeKey(row, col);
    if (placed.has(key)) placed.delete(key);
    else placed.add(key);
    if (placed.size === total && !results.some((r) => r.name === shape.name)) {
      results = [...results, { name: shape.name, area: total }];
    }
  }

  function fillAll() {
    shape.rows.forEach((line, row) =>
      [...line].forEach((ch, col) => {
        if (ch === 'X') placed.add(placeKey(row, col));
      }),
    );
    if (!results.some((r) => r.name === shape.name)) {
      results = [...results, { name: shape.name, area: total }];
    }
  }

  function nextShape() {
    index = (index + 1) % SHAPES.length;
    placed.clear();
  }

  function clearTiles() {
    placed.clear();
  }
</script>

<div class="space-y-4">
  <div class="flex items-center justify-center gap-3">
    <span class="text-2xl font-bold text-slate-900">{shape.name}</span>
    <span class="flex items-center gap-2 text-base text-slate-700">
      <span
        class="inline-block h-6 w-6 rounded border-2 border-indigo-800 bg-indigo-400"
        aria-hidden="true"
      ></span>
      = 1 cm²
    </span>
  </div>

  <div
    class="mx-auto grid w-fit gap-1"
    style:grid-template-columns="repeat({cols}, 3.5rem)"
    role="group"
    aria-label="{shape.name}: các ô của hình, chạm để đặt hoặc bỏ ô vuông 1 cm²"
  >
    {#each shape.rows as _line, row (row)}
      {#each { length: cols } as _, col (col)}
        {#if inShape(shape.rows, row, col)}
          {@const on = placed.has(placeKey(row, col))}
          <button
            type="button"
            class="h-14 w-14 rounded-md border-2 text-sm font-bold {focusRing} {on
              ? 'border-indigo-800 bg-indigo-400 text-white'
              : 'border-dashed border-slate-500 bg-amber-50 text-slate-400 hover:bg-amber-100'}"
            aria-pressed={on}
            aria-label="Ô hàng {row + 1}, cột {col + 1}"
            onclick={() => toggle(row, col)}>{on ? '1 cm²' : ''}</button
          >
        {:else}
          <span class="h-14 w-14" aria-hidden="true"></span>
        {/if}
      {/each}
    {/each}
  </div>

  <FeedbackNote tone={covered ? 'ok' : 'info'} text={message} />
  {#if compare}
    <FeedbackNote tone="info" text={compare} />
  {/if}

  {#if results.length > 0}
    <ul class="flex flex-wrap justify-center gap-2" aria-label="Các hình đã lát">
      {#each results as r (r.name)}
        <li class="rounded-full bg-emerald-50 px-3 py-1 text-base font-semibold text-emerald-800">
          {r.name}: {r.area} cm²
        </li>
      {/each}
    </ul>
  {/if}

  <div class="flex flex-wrap justify-center gap-2">
    <button type="button" class="min-h-12 text-lg {button.primary}" onclick={nextShape}
      >Hình khác</button
    >
    <button
      type="button"
      class="min-h-12 text-lg aria-disabled:opacity-50 {button.secondary}"
      aria-disabled={covered}
      onclick={fillAll}>Lát kín giúp em</button
    >
    <button
      type="button"
      class="min-h-12 text-lg aria-disabled:opacity-50 {button.quiet}"
      aria-disabled={placed.size === 0}
      onclick={clearTiles}>Gỡ hết</button
    >
  </div>
</div>
