<script>
  import { PLACES, valueOf } from '#lib/core/kid/place-value.js';
  import PlaceBlock from '../_shared/place-block.svelte';
  import { button } from '#lib/core/ui.js';

  /**
   * A place-value chart: one column each for hundreds, tens and ones, with
   * their blocks and a big − and + pair. The digits under the blocks write the
   * number.
   *
   * - `counts`: blocks in each column.
   * - `name`: what a screen reader calls this chart.
   * - `mark`: the column that decides a comparison, tinted, or null.
   * - `onchange(counts)`: a block was added or taken away.
   * @type {{
   *   counts: { hundreds: number, tens: number, ones: number };
   *   name: string;
   *   mark?: import('#lib/core/kid/place-value.js').PlaceKey | null;
   *   onchange: (counts: { hundreds: number, tens: number, ones: number }) => void;
   * }}
   */
  let { counts, name, mark = null, onchange } = $props();

  const CELL = { hundreds: 3, tens: 4, ones: 8 };

  /**
   * @param {import('#lib/core/kid/place-value.js').PlaceKey} key
   * @param {number} delta
   */
  function change(key, delta) {
    onchange({ ...counts, [key]: counts[key] + delta });
  }

  const step = `min-h-12 min-w-12 px-0 text-2xl ${button.quiet}`;
</script>

<div role="group" aria-label="{name}: số {valueOf(counts)}" class="grid grid-cols-3 gap-1">
  {#each PLACES as place (place.key)}
    <div
      class="flex flex-col items-center gap-1 rounded-2xl py-1 ring-2 ring-inset {mark === place.key
        ? 'bg-amber-50 ring-amber-400'
        : 'bg-sky-50 ring-slate-200'}"
    >
      <p class="text-sm font-semibold text-slate-600">{place.title}</p>
      <div class="flex min-h-24 flex-wrap items-end justify-center gap-0.5" aria-hidden="true">
        {#each { length: counts[place.key] } as _, i (i)}
          <PlaceBlock kind={place.key} cell={CELL[place.key]} />
        {/each}
      </div>
      <p class="text-3xl font-bold tabular-nums text-slate-800">{counts[place.key]}</p>
      <div class="flex gap-0.5">
        <button
          type="button"
          class={step}
          aria-label="{name}: bớt 1 {place.blockName}"
          disabled={counts[place.key] <= 0}
          onclick={() => change(place.key, -1)}>−</button
        >
        <button
          type="button"
          class={step}
          aria-label="{name}: thêm 1 {place.blockName}"
          disabled={counts[place.key] >= 9}
          onclick={() => change(place.key, 1)}>+</button
        >
      </div>
    </div>
  {/each}
</div>
