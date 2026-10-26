<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { PAGE_74_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={PAGE_74_SKILLS}
  perSkill={4}
  invalidText="Hãy nhập một số tự nhiên: số đo góc tính bằng độ (ví dụ 65) hoặc độ dài theo đơn vị đề bài cho (ví dụ 32)."
/>
