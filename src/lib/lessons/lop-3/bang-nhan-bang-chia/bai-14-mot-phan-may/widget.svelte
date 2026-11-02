<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Frac from '#lib/core/frac.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import PartOption from '../_shared/part-option.svelte';
  import PartVisual from '../_shared/part-visual.svelte';
  import { passFocus } from '../_shared/pass-focus.js';
  import { BOX, equalFigure, sliceAngles, slicePath, slicePoint } from '../_shared/parts.js';
  import {
    KIND_LABELS,
    SHARES,
    SLICE_COUNTS,
    buildRound,
    leftOver,
    pizzaMessage,
    shareMessage,
  } from './engine.js';

  let mode = $state(/** @type {'banh' | 'chia' | 'quiz'} */ ('banh'));

  let slices = $state(4);
  /** @type {number[]} */
  let coloured = $state([]);
  const angles = $derived(sliceAngles(equalFigure('circle', slices).sizes));
  const oneColoured = $derived(coloured.length === 1);

  /** @param {number} i */
  function toggle(i) {
    coloured = coloured.includes(i) ? coloured.filter((c) => c !== i) : [...coloured, i];
  }

  let shareIndex = $state(0);
  let plates = $state(3);
  let rounds = $state(0);
  let pickedPlate = $state(-1);
  const share = $derived(SHARES[shareIndex]);
  const left = $derived(leftOver(share.total, plates, rounds));
  const dealt = $derived(left === 0);

  let dealButton = $state(/** @type {HTMLButtonElement | undefined} */ (undefined));
  let plateButtons = $state(/** @type {HTMLButtonElement[]} */ ([]));

  function restart() {
    rounds = 0;
    pickedPlate = -1;
  }

  function nextShare() {
    shareIndex = (shareIndex + 1) % SHARES.length;
    plates = SHARES[shareIndex].plates[1];
    restart();
  }

  const big = 'min-h-12 text-lg disabled:cursor-not-allowed disabled:opacity-50';
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'banh', label: 'Cắt bánh' },
      { value: 'chia', label: 'Chia đều' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'banh'}
    <SegmentedControl
      label="Cắt bánh thành mấy phần bằng nhau?"
      bind:value={slices}
      options={SLICE_COUNTS.map((n) => ({ value: n, label: String(n) }))}
      onchange={() => (coloured = [])}
    />

    <div class="flex items-center justify-center gap-4">
      <svg
        viewBox="0 0 {BOX} {BOX}"
        class="block w-full max-w-[280px]"
        role="group"
        aria-label="Chiếc bánh pizza được chia thành {slices} phần bằng nhau"
      >
        {#each angles as slice, i (i)}
          <path
            d={slicePath(slice)}
            role="button"
            tabindex="0"
            aria-pressed={coloured.includes(i)}
            aria-label="Phần {i + 1}"
            class="cursor-pointer stroke-amber-900 outline-none focus-visible:stroke-indigo-600 {coloured.includes(
              i,
            )
              ? 'fill-rose-400'
              : 'fill-amber-100 hover:fill-amber-200'}"
            stroke-width="1"
            onclick={() => toggle(i)}
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle(i);
              }
            }}
          />
          {@const spot = slicePoint(slice.mid, 30)}
          <circle
            cx={spot.x}
            cy={spot.y}
            r={slices > 6 ? 3 : 4.5}
            class="pointer-events-none fill-amber-700"
            aria-hidden="true"
          />
        {/each}
      </svg>
    </div>

    <div
      class="flex min-h-20 items-center justify-center text-indigo-700"
      aria-hidden={!oneColoured}
    >
      {#if oneColoured}
        <Frac n={1} d={slices} size="lg" />
      {/if}
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {oneColoured
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if oneColoured}<span aria-hidden="true">⭐ </span>{/if}{pizzaMessage(
        slices,
        coloured.length,
      )}
    </p>
  {:else if mode === 'chia'}
    <SegmentedControl
      label="Chia vào mấy đĩa?"
      bind:value={plates}
      options={share.plates.map((n) => ({ value: n, label: `${n} đĩa` }))}
      onchange={restart}
    />

    {#if left > 0}
      <div
        class="flex flex-wrap justify-center gap-1 rounded-2xl bg-sky-50 p-2"
        role="img"
        aria-label="Còn {left} {share.noun} chưa chia"
      >
        {#each { length: left } as _, i (i)}
          <Picture name={share.picture} size={28} decorative />
        {/each}
      </div>
    {/if}

    <div class="flex flex-wrap justify-center gap-2">
      {#each { length: plates } as _, p (p)}
        <button
          type="button"
          bind:this={plateButtons[p]}
          class="flex min-h-[72px] min-w-[72px] max-w-[136px] flex-wrap items-center justify-center gap-1 rounded-full border-4 p-2 disabled:cursor-default {pickedPlate ===
          p
            ? 'border-rose-500 bg-rose-100'
            : 'border-slate-300 bg-white'}"
          disabled={!dealt}
          aria-pressed={pickedPlate === p}
          aria-label="Đĩa {p + 1}, có {rounds} {share.unit}"
          onclick={() => (pickedPlate = p)}
        >
          {#each { length: rounds } as _, i (i)}
            <Picture name={share.picture} size={26} decorative />
          {/each}
        </button>
      {/each}
    </div>

    <div class="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        class="{big} {button.primary}"
        disabled={dealt}
        bind:this={dealButton}
        onclick={() => {
          rounds += 1;
          passFocus(dealButton, plateButtons[0]);
        }}>Chia 1 lượt</button
      >
      <button type="button" class="{big} {button.quiet}" onclick={restart}>Chia lại</button>
      <button type="button" class="{big} {button.quiet}" onclick={nextShare}>Bài khác</button>
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {pickedPlate >= 0
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {shareMessage(share, plates, rounds, pickedPlate >= 0)}
    </p>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em đã biết đọc và tìm một phần mấy."
      pictureOption={(o) => typeof o !== 'string' && Boolean(o.figure)}
    >
      {#snippet visual(q, settled)}
        {#if q.visual}
          <PartVisual visual={q.visual} {settled} />
        {/if}
      {/snippet}
      {#snippet option(opt)}
        <PartOption option={opt} />
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
