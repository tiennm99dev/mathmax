<script>
  import RichText from './rich-text.svelte';
  import Callout from './callout.svelte';

  /**
   * One rendered content block. Widget blocks look up their component in
   * `widgets` by name (`<name>.widget.svelte`).
   * @type {{
   *   block: import('./content-schema.js').RenderedBlock;
   *   widgets?: Record<string, import('svelte').Component<any>>;
   * }}
   */
  let { block, widgets = {} } = $props();
</script>

{#if block.type === 'p'}
  <RichText as="p" class="leading-relaxed text-slate-800" html={block.html} />
{:else if block.type === 'tex'}
  <RichText as="div" class="overflow-x-auto py-1 text-slate-900" html={block.html} />
{:else if block.type === 'list'}
  <svelte:element
    this={block.ordered ? 'ol' : 'ul'}
    class="space-y-1 pl-6 leading-relaxed text-slate-800 {block.ordered
      ? 'list-decimal'
      : 'list-disc'}"
  >
    {#each block.items as item, i (i)}
      <li><RichText html={item} /></li>
    {/each}
  </svelte:element>
{:else if block.type === 'callout'}
  <Callout tone={block.tone} title={block.title} html={block.html} />
{:else if block.type === 'table'}
  <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table class="w-full border-collapse text-left tabular-nums">
      {#if block.caption}
        <caption class="px-3 py-2 text-left text-sm text-slate-600">
          <RichText html={block.caption} />
        </caption>
      {/if}
      <thead>
        <tr class="border-b-2 border-slate-300 bg-slate-50">
          {#each block.head as cell, i (i)}
            <th scope="col" class="px-3 py-2 font-semibold text-slate-700">
              <RichText html={cell} />
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each block.rows as row, r (r)}
          <tr class="border-b border-slate-200 last:border-b-0">
            {#each row as cell, c (c)}
              <td class="px-3 py-2 text-slate-800"><RichText html={cell} /></td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else if block.type === 'widget'}
  {@const Widget = widgets[block.name]}
  {#if Widget}
    <div class="rounded-xl border border-slate-200 bg-white p-3 sm:p-4"><Widget /></div>
  {/if}
{/if}
