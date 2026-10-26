<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const bins = [
    { id: 'so', label: 'Biểu thức số (không có biến)' },
    { id: 'mot', label: 'Biểu thức đại số một biến' },
    { id: 'nhieu', label: 'Biểu thức đại số nhiều biến' },
  ];

  const cards = shuffled(
    [
      {
        id: 'c1',
        label: '29 + 6 · 7',
        bin: 'so',
        why: 'Chỉ có các số nối với nhau bởi dấu phép tính.',
      },
      {
        id: 'c2',
        label: '45 : 5 − 3 · (6 + 4)',
        bin: 'so',
        why: 'Chỉ gồm các số và dấu phép tính, dấu ngoặc.',
      },
      { id: 'c3', label: '4x² − 1', bin: 'mot', why: 'Chỉ có một chữ x đại diện cho số.' },
      { id: 'c4', label: 'y³ + 1', bin: 'mot', why: 'Biến duy nhất là y.' },
      {
        id: 'c5',
        label: '2(a + b)',
        bin: 'nhieu',
        why: 'Có hai biến a và b (chiều dài và chiều rộng).',
      },
      {
        id: 'c6',
        label: 'x² + y − z³ + 2',
        bin: 'nhieu',
        why: 'Có ba biến x, y, z.',
      },
      {
        id: 'c7',
        label: '3,5 · 2² − 1',
        bin: 'so',
        why: 'Không có chữ nào; 2² là lũy thừa của một số.',
      },
      {
        id: 'c8',
        label: 'πr²',
        bin: 'mot',
        why: 'π là một số (khoảng 3,14), không phải biến; biến duy nhất là r.',
      },
    ],
    7,
  );
</script>

<CardSorter {cards} {bins} label="Phân loại biểu thức số và biểu thức đại số" hintOnWrong />
