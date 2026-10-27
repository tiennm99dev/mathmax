<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';

  /**
   * The live feedback line under a measuring widget: green when the
   * measurement is right, amber when a step went wrong, grey otherwise.
   * Screen readers hear every change. The text may carry inline `$...$` TeX,
   * so `$C_M$` or `$N_A$` shows as math.
   * @type {{ tone: 'ok' | 'warn' | 'info', text: string }}
   */
  let { tone, text } = $props();
</script>

<p
  class="rounded-xl px-4 py-3 text-sm font-semibold {tone === 'ok'
    ? 'bg-emerald-50 text-emerald-800'
    : tone === 'warn'
      ? 'bg-amber-50 text-amber-900'
      : 'bg-slate-100 text-slate-700'}"
  aria-live="polite"
>
  <LiveRichText {text} />
</p>
