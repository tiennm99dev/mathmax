<script>
  import Block from './block.svelte';

  /**
   * The blocks of a number laid out: flats, rods, then small cubes. Decorative;
   * the widget says the number in words. `cells` sets the drawn size per place.
   * @type {{
   *   hundreds?: number;
   *   tens?: number;
   *   ones?: number;
   *   cells?: { hundreds: number, tens: number, ones: number };
   * }}
   */
  let { hundreds = 0, tens = 0, ones = 0, cells = { hundreds: 4, tens: 4, ones: 8 } } = $props();
</script>

<div class="flex flex-wrap items-end justify-center gap-1" aria-hidden="true">
  {#each { length: hundreds } as _, i (i)}
    <Block kind="tram" cell={cells.hundreds} />
  {/each}
  {#each { length: tens } as _, i (i)}
    <Block kind="chuc" cell={cells.tens} />
  {/each}
  {#each { length: ones } as _, i (i)}
    <Block kind="don-vi" cell={cells.ones} />
  {/each}
</div>
