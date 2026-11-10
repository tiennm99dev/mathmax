<script>
  /**
   * The big live sentence under a kid widget: green and starred once the child
   * got there, amber after a slip, grey otherwise.
   * @type {{ tone: 'ok' | 'warn' | 'info', text: string }}
   */
  let { tone, text } = $props();
</script>

<p
  class="rounded-2xl px-4 py-3 text-xl font-semibold {tone === 'ok'
    ? 'bg-emerald-100 text-emerald-900'
    : tone === 'warn'
      ? 'bg-amber-100 text-amber-900'
      : 'bg-slate-100 text-slate-800'}"
  aria-live="polite"
>
  {#if tone === 'ok'}<span aria-hidden="true">⭐ </span>{/if}{text}
</p>
