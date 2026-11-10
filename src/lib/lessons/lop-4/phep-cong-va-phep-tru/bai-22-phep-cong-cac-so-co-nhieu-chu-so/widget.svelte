<script>
  import ColumnSheet from '../_shared/column-sheet.svelte';
  import { TASKS } from './engine.js';
</script>

<ColumnSheet op="+" tasks={TASKS} />
