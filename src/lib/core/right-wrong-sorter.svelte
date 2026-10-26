<script>
  import CardSorter from './card-sorter.svelte';
  import { shuffled } from './card-sorter.js';

  /**
   * Sort actions (how to measure, how to use a tool safely) into "Làm đúng"
   * and "Làm sai", each placement checked at once with its reason. The deck
   * order is fixed by `seed`.
   * @type {{
   *   label: string;
   *   actions: Array<{ id: string, label: string, ok: boolean, why: string }>;
   *   seed: number;
   * }}
   */
  let { label, actions, seed } = $props();

  const BINS = [
    { id: 'dung', label: 'Làm đúng' },
    { id: 'sai', label: 'Làm sai' },
  ];
  const cards = $derived(
    shuffled(
      actions.map((a) => ({ id: a.id, label: a.label, bin: a.ok ? 'dung' : 'sai', why: a.why })),
      seed,
    ),
  );
</script>

<CardSorter {cards} bins={BINS} {label} hintOnWrong />
