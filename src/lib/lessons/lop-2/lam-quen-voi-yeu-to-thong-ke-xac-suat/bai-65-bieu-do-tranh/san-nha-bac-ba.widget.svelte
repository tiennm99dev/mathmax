<script>
  import PictureChart from '../_shared/picture-chart.svelte';

  /** A finished picture chart to look at; the rows give no number, so the child counts. */
  const rows = [
    { label: 'Gà', count: 8, symbol: { emoji: '🐔' } },
    { label: 'Ngỗng', count: 5, symbol: { emoji: '🦢' } },
    { label: 'Vịt', count: 6, symbol: { emoji: '🦆' } },
  ];
</script>

<PictureChart {rows} title="Biểu đồ tranh: sân nhà bác Ba" />
