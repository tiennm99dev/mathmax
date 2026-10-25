<script>
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import { CLUBS } from './clubs.js';
</script>

<figure class="space-y-2">
  <BarChart
    data={CLUBS}
    max={50}
    unit="Số học sinh"
    title="Số học sinh khối 6 tham gia các câu lạc bộ"
  />
  <figcaption class="text-center text-sm font-semibold text-slate-700">
    Số học sinh khối 6 tham gia các câu lạc bộ
  </figcaption>
</figure>
