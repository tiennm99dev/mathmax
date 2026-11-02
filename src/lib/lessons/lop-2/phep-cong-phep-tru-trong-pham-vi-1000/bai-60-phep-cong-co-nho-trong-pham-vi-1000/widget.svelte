<script>
  import LessonWorker from '../_shared/lesson-worker.svelte';
  import { ADD_CARRY_ONES, ADD_CARRY_TENS } from '../_shared/problems.js';
</script>

<LessonWorker
  switchLabel="Đủ 10 thì đổi ở hàng nào?"
  sets={[
    { label: 'Hàng đơn vị', problems: ADD_CARRY_ONES },
    { label: 'Hàng chục', problems: ADD_CARRY_TENS },
  ]}
/>
