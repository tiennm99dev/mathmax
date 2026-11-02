<script>
  import Banknote from '../_shared/banknote.svelte';
  import { NOTES, NOTE_WORDS } from '../_shared/money.js';
</script>

<ul class="grid grid-cols-2 gap-3">
  {#each NOTES as value (value)}
    <li class="flex flex-col items-center gap-1 rounded-2xl bg-slate-50 p-3 text-center">
      <Banknote {value} />
      <span class="text-lg font-semibold text-slate-800">{NOTE_WORDS[value]}</span>
    </li>
  {/each}
</ul>
