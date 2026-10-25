<script>
  import { hub as copy } from './copy.vi.js';

  /**
   * `partial` shows how many lessons of a chapter are live (`live`/`total`).
   * @type {{ status: 'live' | 'partial' | 'stub', live?: number, total?: number }}
   */
  let { status, live = 0, total = 0 } = $props();
</script>

{#if status === 'live'}
  <span
    class="inline-block whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700"
    >{copy.live}</span
  >
{:else if status === 'partial'}
  <span
    class="inline-block whitespace-nowrap rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700"
    >{copy.partial(live, total)}</span
  >
{:else}
  <span
    class="inline-block whitespace-nowrap rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700"
    >{copy.comingSoon}</span
  >
{/if}
