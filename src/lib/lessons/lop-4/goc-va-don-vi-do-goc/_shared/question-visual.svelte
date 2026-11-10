<script>
  import ClockPicture from '#lib/core/kid/clock-picture.svelte';
  import AngleFigure from './angle-figure.svelte';

  /**
   * The picture above a question of this chapter: an angle figure (with or
   * without a protractor), a clock at a whole hour, or nothing.
   *
   * - `visual`: what to draw.
   * - `settled`: whether the question has ended; a figure keeps its
   *   measure back until then.
   * @type {{
   *   visual?: { type: 'figure', figure: import('./figure.js').Figure }
   *     | { type: 'clock', minutes: number }
   *     | { type: 'none' };
   *   settled: boolean;
   * }}
   */
  let { visual, settled } = $props();
</script>

{#if visual?.type === 'figure'}
  <AngleFigure figure={visual.figure} {settled} />
{:else if visual?.type === 'clock'}
  <ClockPicture minutes={visual.minutes} size="w-40" />
{/if}
