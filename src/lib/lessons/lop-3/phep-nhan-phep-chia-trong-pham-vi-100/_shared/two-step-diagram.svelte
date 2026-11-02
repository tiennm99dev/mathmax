<script>
  import PaperStrip from './paper-strip.svelte';
  import { secondLabel, secondParts } from './two-step.js';

  /**
   * The book's summary of a two-step problem: one paper strip for each
   * quantity on one scale. The second shows "?" until `known`, and with `done`
   * a third strip joins both into the total.
   * @type {{
   *   story: import('./two-step.js').Story;
   *   known?: boolean;
   *   done?: boolean;
   * }}
   */
  let { story, known = false, done = false } = $props();

  const scale = $derived(story.total);
</script>

<div class="space-y-3">
  <div>
    <p class="mb-1 text-lg font-semibold text-slate-700">
      {story.first}: {story.a}
      {story.unit}
    </p>
    <PaperStrip
      label="{story.first}: {story.a} {story.unit}"
      {scale}
      parts={[{ size: story.a, tone: 'main', text: String(story.a) }]}
    />
  </div>
  <div>
    <p class="mb-1 text-lg font-semibold text-slate-700">
      {story.other}
      {story.link}: {known ? story.second : '?'}
      {story.unit}
    </p>
    <PaperStrip label={secondLabel(story, known)} {scale} parts={secondParts(story, known)} />
  </div>
  {#if done}
    <div>
      <p class="mb-1 text-lg font-semibold text-slate-700">
        {story.both}: {story.total}
        {story.unit}
      </p>
      <PaperStrip
        label="{story.both}: {story.a} cộng {story.second} bằng {story.total} {story.unit}"
        {scale}
        parts={[
          { size: story.a, tone: 'main', text: String(story.a) },
          { size: story.second, tone: 'copy', text: String(story.second) },
        ]}
      />
    </div>
  {/if}
</div>
