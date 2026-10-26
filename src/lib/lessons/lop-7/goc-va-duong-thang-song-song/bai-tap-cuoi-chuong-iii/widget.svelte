<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={2}
  mapLabel="Bản đồ kĩ năng chương III"
  invalidText="Hãy nhập một số tự nhiên: số đo góc tính bằng độ (ví dụ 135) hoặc số cặp đường thẳng (ví dụ 6)."
/>
