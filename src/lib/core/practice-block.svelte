<script>
  import { onMount } from 'svelte';
  import ExerciseCard from './exercise-card.svelte';
  import { loadSolved, saveSolved } from './practice-state.js';
  import { practice as copy } from './copy.vi.js';

  /**
   * The practice list with a per-viewer "đã làm" tick. Progress is read after
   * mount and saved through try/catch helpers, so the block works the same when
   * storage is unavailable.
   * @type {{
   *   exercises: import('./content-schema.js').Exercise[];
   *   storageKey: string;
   * }}
   */
  let { exercises, storageKey } = $props();

  /** @type {number[]} */
  let solved = $state([]);

  onMount(() => {
    solved = loadSolved(storageKey, exercises.length);
  });

  /** @param {number} i */
  function markSolved(i) {
    if (solved.includes(i)) return;
    solved = [...solved, i].sort((a, b) => a - b);
    saveSolved(storageKey, solved);
  }
</script>

<div class="space-y-4">
  <p class="text-sm text-slate-500" aria-live="polite">
    {copy.progress(solved.length, exercises.length)}
  </p>
  {#each exercises as exercise, i (i)}
    <ExerciseCard {exercise} n={i + 1} solved={solved.includes(i)} onsolved={() => markSolved(i)} />
  {/each}
</div>
