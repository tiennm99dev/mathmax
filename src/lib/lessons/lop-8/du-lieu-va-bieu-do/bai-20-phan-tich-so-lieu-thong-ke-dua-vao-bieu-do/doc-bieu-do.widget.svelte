<script>
  import LineChart from '#lib/core/visuals/line-chart.svelte';

  // The chart read in the first worked example.
  const labels = ['Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12', 'Tháng 1'];
  const series = [{ name: 'Lượt mượn sách', values: [320, 410, 450, 380, 300] }];
</script>

<LineChart
  {labels}
  {series}
  unit="Lượt mượn"
  title="Số lượt mượn sách của thư viện trường theo tháng"
/>
