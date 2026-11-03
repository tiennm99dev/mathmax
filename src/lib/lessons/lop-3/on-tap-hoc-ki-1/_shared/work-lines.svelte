<script>
  import { workSteps } from './expression.js';

  /**
   * The working of an expression written line under line as the book does, with
   * the operation done at each line tinted. Shown once the question has ended.
   * @type {{ text: string, settled: boolean }}
   */
  let { text, settled } = $props();

  const steps = $derived(workSteps(text));
</script>

{#if settled}
  <ol class="rounded-2xl bg-sky-50 px-4 py-3 text-2xl font-bold tabular-nums text-slate-800">
    {#each steps as step, i (i)}
      <li>
        {i > 0 ? '= ' : ''}{step.before}{#if step.now}<mark
            class="rounded-md bg-amber-200 px-1 text-slate-900">{step.now}</mark
          >{/if}{step.after}
      </li>
    {/each}
  </ol>
{/if}
