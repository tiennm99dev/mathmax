<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={2}
  mapLabel="Bản đồ kĩ năng chương IV"
  invalidText="Hãy nhập một số tự nhiên: số đo góc tính bằng độ (ví dụ 70) hoặc độ dài theo đơn vị đề bài cho (ví dụ 15)."
/>
