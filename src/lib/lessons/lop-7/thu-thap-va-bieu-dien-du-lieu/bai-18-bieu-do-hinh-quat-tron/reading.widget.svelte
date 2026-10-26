<script>
  import PieChart from '#lib/core/visuals/pie-chart.svelte';

  const data = [
    { label: 'Tốt', value: 20 },
    { label: 'Khá', value: 35 },
    { label: 'Đạt', value: 40 },
    { label: 'Chưa đạt', value: 5 },
  ];
</script>

<div class="space-y-2">
  <p class="text-center text-sm font-semibold text-slate-800">
    Kết quả học tập học kì I của học sinh khối 7
  </p>
  <PieChart {data} title="Kết quả học tập học kì I của học sinh khối 7" />
</div>
