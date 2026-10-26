<script>
  import DoubleBarChart from '#lib/core/visuals/double-bar-chart.svelte';

  /** Club sign-ups of two classes, referred to by the lesson's exercises. */
  const CLUBS = ['Bóng đá', 'Cờ vua', 'Vẽ', 'Hát'];
  const SERIES = [
    { name: 'Lớp 6A', color: '#1B998B', values: [12, 5, 7, 9] },
    { name: 'Lớp 6B', color: '#E9B10A', values: [9, 8, 7, 11] },
  ];
</script>

<DoubleBarChart
  categories={CLUBS}
  series={SERIES}
  max={14}
  unit="Số học sinh"
  title="Số học sinh lớp 6A và 6B đăng kí các câu lạc bộ"
/>
