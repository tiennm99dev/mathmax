<script>
  import ColumnWorker from '../_shared/column-worker.svelte';
</script>

<ColumnWorker
  op="+"
  switchLabel="Chọn loại phép cộng"
  nextLabel="Phép cộng khác"
  kinds={[
    { value: 'plain', label: 'Không nhớ', first: { a: 23415, b: 51362 } },
    { value: 'one', label: 'Nhớ một lần', first: { a: 34528, b: 21345 } },
    { value: 'many', label: 'Nhớ nhiều lần', first: { a: 45637, b: 28485 } },
  ]}
/>
