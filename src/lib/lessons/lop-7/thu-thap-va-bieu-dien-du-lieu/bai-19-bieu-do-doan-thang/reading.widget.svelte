<script>
  import LineChart from '#lib/core/visuals/line-chart.svelte';

  const labels = ['7 giờ', '9 giờ', '11 giờ', '13 giờ', '15 giờ', '17 giờ'];
  const series = [{ name: 'Nhiệt độ', values: [24, 27, 31, 33, 32, 29] }];
</script>

<div class="space-y-2">
  <p class="text-center text-sm font-semibold text-slate-800">
    Nhiệt độ ở Hà Nội vào một ngày mùa hè
  </p>
  <LineChart
    {labels}
    {series}
    min={0}
    max={40}
    unit="Nhiệt độ (°C)"
    title="Nhiệt độ ở Hà Nội vào một ngày mùa hè"
  />
</div>
