<script>
  import ReadAloud from '../read-aloud.svelte';
  import { speechText } from '../speech-text.js';

  /**
   * One idea per card for the kid layout, with a "Nghe" button that reads the
   * card's own text.
   * @type {{
   *   children: import('svelte').Snippet;
   *   what: string;
   *   speak?: boolean;
   *   tone?: 'plain' | 'accent' | 'success';
   *   labelledby?: string;
   * }}
   */
  let { children, what, speak = true, tone = 'plain', labelledby } = $props();

  /** @type {HTMLElement | undefined} */
  let body = $state();

  const tones = {
    plain: 'border-slate-200 bg-white',
    accent: 'border-indigo-200 bg-indigo-50',
    success: 'border-emerald-200 bg-emerald-50',
  };
</script>

<section
  class="rounded-3xl border-2 p-5 shadow-sm sm:p-6 {tones[tone]}"
  aria-labelledby={labelledby}
>
  <div bind:this={body} class="space-y-4">
    {@render children()}
  </div>
  {#if speak}
    <div class="mt-4 flex justify-end">
      <ReadAloud {what} getText={() => speechText(body)} />
    </div>
  {/if}
</section>
