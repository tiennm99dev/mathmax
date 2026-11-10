<script>
  import ClockPicture from '#lib/core/kid/clock-picture.svelte';
  import { clockLabel } from './measure.js';

  /**
   * A still clock at a time to the minute, with a spoken description of where
   * the hands point that never says the time itself.
   * @type {{ minutes: number }}
   */
  let { minutes } = $props();
</script>

<ClockPicture {minutes} size="w-44" label={clockLabel(minutes)} />
