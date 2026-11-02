<script>
  import LessonWorker from '../_shared/lesson-worker.svelte';
  import { ADD_PLAIN } from '../_shared/problems.js';
</script>

<LessonWorker sets={[{ label: 'Cộng không nhớ', problems: ADD_PLAIN }]} />
