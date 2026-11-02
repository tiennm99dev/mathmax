<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { passFocus } from '../_shared/pass-focus.js';
  import TableGrid from '../_shared/table-grid.svelte';
  import { divLine, mulLine } from '../_shared/times.js';
  import { BASE, MAX_OCTOPUSES, backwardsMessage, buildMessage } from './engine.js';
  import MemoryCards from './memory-cards.svelte';
  import Octopus from './octopus.svelte';

  let mode = $state(/** @type {'lap' | 'nhan' | 'chia'} */ ('lap'));
  /** Octopuses in the sea. */
  let count = $state(2);

  let more = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));
  let fewer = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));

  const big = 'min-h-12 text-lg disabled:cursor-not-allowed disabled:opacity-50';
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'lap', label: 'Lập bảng' },
      { value: 'nhan', label: 'Thẻ nhân 8' },
      { value: 'chia', label: 'Thẻ chia 8' },
    ]}
  />

  {#if mode === 'lap'}
    <div class="text-center tabular-nums">
      <p class="text-3xl font-bold text-slate-800">{mulLine(BASE, count)}</p>
      <p class="mt-1 text-2xl font-bold text-indigo-700">{divLine(BASE, count)}</p>
    </div>

    <div
      class="grid grid-cols-5 gap-1 rounded-2xl bg-sky-100 p-2"
      role="img"
      aria-label="{count} con bạch tuộc, mỗi con 8 cái vòi, tất cả {BASE * count} cái vòi."
    >
      {#each { length: count } as _, i (i)}
        <Octopus />
      {/each}
    </div>

    <div class="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        class="{big} {button.primary}"
        disabled={count >= MAX_OCTOPUSES}
        bind:this={more}
        onclick={() => {
          count += 1;
          passFocus(more, fewer);
        }}>Thêm 1 con</button
      >
      <button
        type="button"
        class="{big} {button.quiet}"
        disabled={count <= 1}
        bind:this={fewer}
        onclick={() => {
          count -= 1;
          passFocus(fewer, more);
        }}>Bớt 1 con</button
      >
    </div>

    <div
      class="space-y-2 rounded-2xl px-4 py-3 text-xl font-semibold {count === MAX_OCTOPUSES
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      <p>{buildMessage(count)}</p>
      <p class="text-indigo-800">{backwardsMessage(count)}</p>
    </div>

    <TableGrid base={BASE} found={(n) => n <= count} active={count} />
  {/if}

  <!-- Both decks stay mounted so a child who switches keeps the boxes of each. -->
  <div class:hidden={mode !== 'nhan'}><MemoryCards op="nhan" seed={1} /></div>
  <div class:hidden={mode !== 'chia'}><MemoryCards op="chia" seed={2} /></div>
</div>
