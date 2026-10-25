<script>
  import RichText from './rich-text.svelte';
  import { lesson as lessonCopy, steps as copy } from './copy.vi.js';
  import { button, card } from './ui.js';

  /**
   * A worked example whose steps are revealed one at a time; the answer
   * appears once every step is shown.
   * @type {{ example: import('./content-schema.js').Example, n: number }}
   */
  let { example, n } = $props();

  const id = $props.id();
  let shown = $state(0);

  const total = $derived(example.steps.length);
  const done = $derived(shown >= total);
</script>

<section class="{card} p-4 sm:p-5" aria-labelledby="{id}-title">
  <h3 id="{id}-title" class="mb-2 text-lg font-bold text-slate-900">
    {lessonCopy.example}
    {n}
  </h3>
  <div class="mb-3 leading-relaxed text-slate-800">
    <span class="font-semibold text-slate-600">{copy.problem}:</span>
    <RichText html={example.problem} />
  </div>

  <ol class="mb-3 space-y-2" aria-live="polite">
    {#each example.steps.slice(0, shown) as step, i (i)}
      <li class="flex gap-3 rounded-lg bg-slate-50 px-3 py-2">
        <span
          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700"
          aria-hidden="true">{i + 1}</span
        >
        <span class="sr-only">{copy.step} {i + 1}:</span>
        <RichText html={step} class="leading-relaxed text-slate-800" />
      </li>
    {/each}
  </ol>

  {#if done}
    <p class="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-900">
      <span class="font-semibold">{copy.answer}:</span>
      <RichText html={example.answer} />
    </p>
  {/if}

  <div class="flex flex-wrap items-center gap-2">
    <button
      type="button"
      class={button.quiet}
      disabled={shown === 0}
      onclick={() => (shown = Math.max(0, shown - 1))}>{copy.prev}</button
    >
    {#if done}
      <button type="button" class={button.secondary} onclick={() => (shown = 0)}
        >{copy.restart}</button
      >
    {:else}
      <button type="button" class={button.primary} onclick={() => (shown += 1)}>{copy.next}</button>
      <button type="button" class={button.quiet} onclick={() => (shown = total)}>{copy.all}</button>
    {/if}
    <span class="text-sm text-slate-500">{copy.progress(shown, total)}</span>
  </div>
</section>
