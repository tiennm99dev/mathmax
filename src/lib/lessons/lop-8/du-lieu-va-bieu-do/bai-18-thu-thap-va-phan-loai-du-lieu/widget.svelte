<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import { KIND_BINS, KIND_CARDS, METHOD_BINS, METHOD_CARDS } from './engine.js';

  const methodDeck = shuffled(METHOD_CARDS, 11);
  const kindDeck = shuffled(KIND_CARDS, 23);

  let mode = $state('method');
  const modes = [
    { value: 'method', label: 'Cách thu thập' },
    { value: 'kind', label: 'Loại dữ liệu' },
  ];
</script>

<div class="space-y-4">
  <SegmentedControl label="Kho dữ liệu" options={modes} bind:value={mode} />

  {#if mode === 'method'}
    <div class="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
      <p class="mb-1 font-semibold">Hỏi: ai tạo ra dữ liệu?</p>
      <ul class="list-disc space-y-0.5 pl-5">
        <li>Tự quan sát, làm thí nghiệm, lập bảng hỏi, phỏng vấn: thu thập trực tiếp.</li>
        <li>Lấy từ nguồn có sẵn như sách, báo, trang web: thu thập gián tiếp.</li>
      </ul>
    </div>
    <CardSorter
      cards={methodDeck}
      bins={METHOD_BINS}
      hintOnWrong
      label="Xếp mỗi cách lấy dữ liệu vào ô thu thập trực tiếp hoặc thu thập gián tiếp"
    />
  {:else}
    <div class="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
      <p class="mb-1 font-semibold">Hỏi hai câu</p>
      <ul class="list-disc space-y-0.5 pl-5">
        <li>
          Dữ liệu là số? Nếu là số đếm thì là số liệu rời rạc; nếu là số đo, nhận giá trị tuỳ ý
          trong một khoảng, thì là số liệu liên tục.
        </li>
        <li>Dữ liệu không phải là số (định tính)? Các giá trị có xếp được thứ tự không?</li>
      </ul>
    </div>
    <CardSorter
      cards={kindDeck}
      bins={KIND_BINS}
      hintOnWrong
      label="Phân loại dữ liệu: số liệu rời rạc, số liệu liên tục, dữ liệu định tính sắp thứ tự được hoặc không"
    />
  {/if}
</div>
