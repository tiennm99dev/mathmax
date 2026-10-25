<script>
  import { pictures } from './pictures/index.js';
  import Apple from './pictures/apple.svelte';
  import Banana from './pictures/banana.svelte';
  import Orange from './pictures/orange.svelte';
  import Strawberry from './pictures/strawberry.svelte';
  import Grapes from './pictures/grapes.svelte';
  import Fish from './pictures/fish.svelte';
  import Cat from './pictures/cat.svelte';
  import Chick from './pictures/chick.svelte';
  import Rabbit from './pictures/rabbit.svelte';
  import Butterfly from './pictures/butterfly.svelte';
  import Star from './pictures/star.svelte';
  import Flower from './pictures/flower.svelte';
  import Balloon from './pictures/balloon.svelte';
  import Pencil from './pictures/pencil.svelte';
  import Ball from './pictures/ball.svelte';
  import Coin from './pictures/coin.svelte';
  import Banknote from './pictures/banknote.svelte';
  import Block from './pictures/block.svelte';
  import Cube from './pictures/cube.svelte';

  /** @type {Record<import('./pictures/index.js').PictureName, import('svelte').Component>} */
  const shapes = {
    apple: Apple,
    banana: Banana,
    orange: Orange,
    strawberry: Strawberry,
    grapes: Grapes,
    fish: Fish,
    cat: Cat,
    chick: Chick,
    rabbit: Rabbit,
    butterfly: Butterfly,
    star: Star,
    flower: Flower,
    balloon: Balloon,
    pencil: Pencil,
    ball: Ball,
    coin: Coin,
    banknote: Banknote,
    block: Block,
    cube: Cube,
  };

  /**
   * One countable kid picture, drawn inline so no image is fetched. Works in
   * HTML and nested inside another SVG, where `x` and `y` place it.
   * @type {{
   *   name: import('./pictures/index.js').PictureName;
   *   size?: number;
   *   x?: number;
   *   y?: number;
   *   decorative?: boolean;
   * }}
   */
  let { name, size = 44, x, y, decorative = false } = $props();

  const Shape = $derived(shapes[name]);
</script>

<svg
  viewBox="0 0 40 40"
  width={size}
  height={size}
  {x}
  {y}
  role={decorative ? 'presentation' : 'img'}
  aria-label={decorative ? undefined : pictures[name]}
  aria-hidden={decorative ? 'true' : undefined}
  class="shrink-0"
>
  <Shape />
</svg>
