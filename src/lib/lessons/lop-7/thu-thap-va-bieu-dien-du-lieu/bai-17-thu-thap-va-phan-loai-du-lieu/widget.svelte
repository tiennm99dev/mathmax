<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import { BINS, CARDS } from './engine.js';

  const deck = shuffled(CARDS, 17);
</script>

<div class="space-y-4">
  <div class="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
    <p class="mb-1 font-semibold">Cách phân loại</p>
    <ul class="list-disc space-y-0.5 pl-5">
      <li>Dữ liệu ghi bằng số đo hoặc số đếm là số liệu.</li>
      <li>
        Dữ liệu ghi bằng chữ, kí hiệu là dữ liệu không phải là số; hỏi tiếp: các giá trị có xếp được
        theo thứ tự (từ thấp đến cao, từ ít đến nhiều) hay không?
      </li>
    </ul>
  </div>

  <CardSorter
    cards={deck}
    bins={BINS}
    hintOnWrong
    label="Phân loại dữ liệu: số liệu, dữ liệu không phải số sắp thứ tự được, dữ liệu không phải số không sắp thứ tự được"
  />
</div>
