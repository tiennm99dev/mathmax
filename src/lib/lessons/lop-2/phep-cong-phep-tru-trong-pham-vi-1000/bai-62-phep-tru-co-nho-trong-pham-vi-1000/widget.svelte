<script>
  import LessonWorker from '../_shared/lesson-worker.svelte';
  import { SUB_CARRY_HUNDREDS, SUB_CARRY_TENS } from '../_shared/problems.js';
</script>

<LessonWorker
  switchLabel="Thiếu thì tháo khối nào?"
  sets={[
    { label: 'Tháo thanh chục', problems: SUB_CARRY_TENS },
    { label: 'Tháo tấm trăm', problems: SUB_CARRY_HUNDREDS },
  ]}
/>
