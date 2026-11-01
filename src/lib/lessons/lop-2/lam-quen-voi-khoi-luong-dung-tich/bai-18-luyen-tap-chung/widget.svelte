<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { capitalize } from '#lib/core/kid/quiz.js';
  import BalanceScale from '../_shared/balance-scale.svelte';
  import Cup from '../_shared/cup.svelte';
  import Vessel from '../_shared/vessel.svelte';
  import { vessel } from '../_shared/capacity.js';
  import { massThing, weightsText } from '../_shared/mass.js';
  import { KIND_LABELS, buildRound } from './engine.js';

  /**
   * What a screen reader hears for a balance of the round.
   * @param {import('./engine.js').Visual & { type: 'scale' }} v
   */
  function scaleText(v) {
    /** @param {import('../_shared/mass.js').Load[]} loads */
    const side = (loads) => {
      const weights = loads.flatMap((l) => (l.kind === 'weight' ? [l.kg] : []));
      if (weights.length > 0) return `quả cân ${weightsText(weights)}`;
      return loads.map((l) => (l.kind === 'thing' ? massThing(l.id).name : '')).join(' và ');
    };
    const l = v.left.reduce((s, x) => s + x.kg, 0);
    const r = v.right.reduce((s, x) => s + x.kg, 0);
    const tilt =
      l === r ? 'Cân thăng bằng.' : l > r ? 'Đĩa bên trái thấp hơn.' : 'Đĩa bên phải thấp hơn.';
    return `Cân đĩa. Đĩa bên trái: ${side(v.left)}. Đĩa bên phải: ${side(v.right)}. ${tilt}`;
  }
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đọc cân, đếm số lít và tính với kg, l rất giỏi."
>
  {#snippet visual(q, _settled)}
    {#if q.visual?.type === 'scale'}
      <div class="rounded-2xl bg-sky-50 p-2">
        <BalanceScale left={q.visual.left} right={q.visual.right} label={scaleText(q.visual)} />
      </div>
    {:else if q.visual?.type === 'cups'}
      <div class="flex flex-wrap items-end justify-center gap-3 rounded-2xl bg-sky-50 p-3">
        <Vessel
          id={q.visual.id}
          fill={0}
          label="{vessel(q.visual.id).name} đã rót hết nước"
          caption={capitalize(vessel(q.visual.id).name)}
          size={80}
        />
        <div
          class="flex max-w-[15rem] flex-wrap gap-1"
          role="img"
          aria-label="{q.visual.l} ca 1 l đầy nước"
        >
          {#each { length: q.visual.l } as _, i (i)}
            <Cup full size={34} />
          {/each}
        </div>
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
