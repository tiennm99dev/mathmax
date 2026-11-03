<script>
  import BalanceScale from '#lib/core/kid/balance-scale.svelte';
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Cylinder from '../_shared/cylinder.svelte';
  import DialScale from '../_shared/dial-scale.svelte';
  import MmRuler from '../_shared/mm-ruler.svelte';
  import Thermometer from '../_shared/thermometer.svelte';
  import { cylinderLabel, dialLabel, rulerLabel, thermometerLabel } from '../_shared/measure.js';
  import { KIND_LABELS, buildRound } from './engine.js';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đọc dụng cụ đo và tính với mi-li-mét, gam, mi-li-lít, độ C rất giỏi."
>
  {#snippet visual(q, settled)}
    {#if q.visual?.type === 'ruler'}
      <MmRuler mm={q.visual.mm} label={rulerLabel(q.visual.mm, settled)} />
    {:else if q.visual?.type === 'dial'}
      <DialScale g={q.visual.g} label={dialLabel(q.visual.g, settled)} />
    {:else if q.visual?.type === 'cylinder'}
      <Cylinder ml={q.visual.ml} label={cylinderLabel(q.visual.ml, settled)} />
    {:else if q.visual?.type === 'thermometer'}
      <Thermometer t={q.visual.t} label={thermometerLabel(q.visual.t, settled)} />
    {:else if q.visual?.type === 'balance'}
      <BalanceScale left={q.visual.left} right={q.visual.right} />
    {:else if q.visual?.type === 'bags'}
      <div class="mx-auto grid max-w-80 gap-2">
        {#each q.visual.scales as scale, i (i)}
          <BalanceScale left={scale.left} right={scale.right} />
        {/each}
      </div>
    {:else if q.visual?.type === 'chain'}
      <div
        class="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-lg font-bold"
        aria-hidden="true"
      >
        <span class="rounded-xl border-2 border-indigo-400 bg-indigo-50 px-2 py-2 whitespace-nowrap"
          >{q.visual.start}</span
        >
        {#each q.visual.steps as step, i (i)}
          <span class="flex flex-col items-center px-1 text-base text-slate-700">
            <span class="whitespace-nowrap">{step.sign}</span>
            <span>→</span>
          </span>
          <span
            class="rounded-xl border-2 border-slate-400 bg-white px-2 py-2 whitespace-nowrap text-slate-900"
            >{settled ? step.value : '?'}</span
          >
        {/each}
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
