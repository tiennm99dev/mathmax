<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import { BINS, CARDS, QUESTIONS } from './engine.js';

  const deck = shuffled(CARDS, 38);
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800">
      <p class="mb-1 font-semibold">Phiếu hỏi của lớp 6A</p>
      <ol class="list-decimal space-y-0.5 pl-5">
        {#each QUESTIONS as q (q)}
          <li>{q}</li>
        {/each}
      </ol>
    </div>
    <div class="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
      <p class="mb-1 font-semibold">Tiêu chí hợp lí</p>
      <ul class="list-disc space-y-0.5 pl-5">
        <li>Đúng định dạng: trả lời đúng điều được hỏi, số người là số tự nhiên.</li>
        <li>Nằm trong phạm vi dự kiến: chiều cao, thời gian, điểm số phải có thể xảy ra.</li>
      </ul>
    </div>
  </div>

  <CardSorter
    cards={deck}
    bins={BINS}
    hintOnWrong
    label="Phân loại các câu trả lời của phiếu hỏi: số liệu, dữ liệu không phải số, hoặc không hợp lí"
  />
</div>
