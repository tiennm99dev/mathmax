<script module>
  export const title = 'Bộ câu hỏi chạm cho bé';
</script>

<script>
  import { rng } from '#lib/core/drill.js';
  import ChoiceRound from './choice-round.svelte';
  import CountingSticks from './counting-sticks.svelte';
  import { addText, compareSign, readNumber } from './numbers.js';
  import { numberOptions, signOptions } from './quiz.js';

  const LABELS = { add: 'Phép cộng', compare: 'So sánh', sticks: 'Đếm que tính' };

  /**
   * Three small questions from a seed; the sticks question shows its number.
   * @param {number} seed
   * @returns {import('./quiz.js').KidQuestion<number>[]}
   */
  function build(seed) {
    const rand = rng(seed);
    const a = 1 + Math.floor(rand() * 5);
    const b = 1 + Math.floor(rand() * 4);
    const n = 21 + Math.floor(rand() * 60);
    return [
      {
        kind: 'add',
        prompt: `${a} + ${b} = ?`,
        ...numberOptions(rand, a + b),
        hint: `Em đếm thêm ${b} từ ${a}.`,
        solution: `${addText(a, b)}.`,
      },
      {
        kind: 'compare',
        prompt: `${a + b} ? ${b}`,
        ...signOptions(compareSign(a + b, b)),
        hint: 'Số nào lớn hơn?',
        solution: `${a + b} ${compareSign(a + b, b)} ${b}.`,
      },
      {
        kind: 'sticks',
        prompt: 'Có bao nhiêu que tính?',
        visual: n,
        ...numberOptions(rand, n, 10, 99),
        hint: 'Mỗi bó là một chục.',
        solution: `Có ${n} que tính, đọc là ${readNumber(n)}.`,
      },
    ];
  }
</script>

<ChoiceRound {build} labels={LABELS} allGood="Tuyệt vời! Em làm đúng cả ba câu.">
  {#snippet visual(q)}
    {#if typeof q.visual === 'number'}
      <CountingSticks tens={Math.floor(q.visual / 10)} ones={q.visual % 10} />
    {/if}
  {/snippet}
</ChoiceRound>
