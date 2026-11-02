<script>
  import RichText from './rich-text.svelte';
  import { calloutLabel } from './copy.vi.js';

  /**
   * @type {{
   *   tone: import('./content-schema.js').CalloutTone;
   *   title?: string | null;
   *   html?: string;
   *   kid?: boolean;
   *   children?: import('svelte').Snippet;
   * }}
   */
  let { tone, title = null, html = '', kid = false, children } = $props();

  const label = $derived(calloutLabel(tone, kid));

  const id = $props.id();

  const tones = {
    definition: 'border-indigo-500 bg-indigo-50 text-indigo-800',
    theorem: 'border-emerald-500 bg-emerald-50 text-emerald-800',
    note: 'border-sky-500 bg-sky-50 text-sky-800',
    warning: 'border-amber-500 bg-amber-50 text-amber-800',
  };
</script>

<aside class="rounded-r-xl border-l-4 px-4 py-3 {tones[tone]}" aria-labelledby={id}>
  <p {id} class="mb-1 font-bold">
    <span class="text-sm uppercase tracking-wide">{label}</span>
    {#if title && title !== label}
      <span class="text-slate-900">· <RichText html={title} /></span>
    {/if}
  </p>
  <div class="leading-relaxed text-slate-800">
    {#if children}
      {@render children()}
    {:else}
      <RichText {html} />
    {/if}
  </div>
</aside>
