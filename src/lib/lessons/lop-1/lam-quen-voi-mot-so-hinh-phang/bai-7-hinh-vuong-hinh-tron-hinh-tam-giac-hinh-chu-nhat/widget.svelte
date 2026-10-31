<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import ObjectFigure from '../_shared/object-figure.svelte';
  import ShapeFigure from '../_shared/shape-figure.svelte';
  import { BINS, FIGURE_CARDS, OBJECT_CARDS, figureOf, objectOf } from './engine.js';

  /** `do-vat`: sort everyday objects; `hinh`: sort drawn shapes. */
  let deck = $state(/** @type {'do-vat' | 'hinh'} */ ('do-vat'));
</script>

{#snippet face(/** @type {import('#lib/core/card-sorter.js').SortCard} */ c)}
  {@const figure = figureOf(c.id)}
  {@const object = objectOf(c.id)}
  <span class="flex flex-col items-center gap-1">
    {#if figure}
      <ShapeFigure {figure} size={56} />
    {:else if object}
      <ObjectFigure id={object.id} size={56} decorative />
      <span class="text-base">{object.name}</span>
    {/if}
  </span>
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Chọn bộ thẻ"
    hideLabel
    bind:value={deck}
    options={[
      { value: 'do-vat', label: 'Đồ vật quanh em' },
      { value: 'hinh', label: 'Các hình' },
    ]}
  />
  <p class="text-xl font-semibold text-slate-800">
    {deck === 'do-vat'
      ? 'Mỗi đồ vật có dạng hình gì? Em xếp vào đúng ô nhé.'
      : 'Hình to, hình nhỏ, hình xoay nghiêng. Em xếp mỗi hình vào đúng ô nhé.'}
  </p>
  {#key deck}
    <CardSorter
      cards={deck === 'do-vat' ? OBJECT_CARDS : FIGURE_CARDS}
      bins={BINS}
      label={deck === 'do-vat' ? 'Xếp đồ vật theo hình' : 'Xếp các hình vào đúng ô'}
      {face}
      hintOnWrong
    />
  {/key}
</div>
