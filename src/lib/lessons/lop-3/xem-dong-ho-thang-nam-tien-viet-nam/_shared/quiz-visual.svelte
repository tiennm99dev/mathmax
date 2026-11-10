<script>
  import MonthSheet from '#lib/core/kid/month-sheet.svelte';
  import Banknote from './banknote.svelte';
  import MinuteClock from './minute-clock.svelte';
  import { isNote } from './money.js';

  /**
   * The picture above a question of the chapter's rounds: a clock, a
   * calendar sheet with the asked date ringed, or a row of banknotes.
   * @type {{ visual?: import('./questions.js').Visual }}
   */
  let { visual } = $props();
</script>

{#if visual?.clock !== undefined}
  <MinuteClock minutes={visual.clock} />
{:else if visual?.month !== undefined}
  <MonthSheet month={visual.month} marks={visual.marks ?? []} />
{:else if visual?.notes}
  <div class="flex flex-wrap justify-center gap-2">
    {#each visual.notes as value, i (i)}
      {#if isNote(value)}<Banknote {value} small={visual.notes.length > 2} />{/if}
    {/each}
  </div>
{/if}
