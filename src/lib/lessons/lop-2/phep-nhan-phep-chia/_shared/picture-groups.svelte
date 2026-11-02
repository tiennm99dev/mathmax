<script>
  import Picture from '#lib/core/kid/picture.svelte';
  import { groupsLabel } from './divide.js';

  /**
   * The pictures of a multiplication or division: `groups` boxes of `each`
   * pictures, or, while `grouped` is false, all of them loose in one box for a
   * child to share out in the head.
   * @type {{
   *   each: number;
   *   groups: number;
   *   grouped?: boolean;
   *   picture?: import('#lib/core/kid/pictures/index.js').PictureName;
   *   noun?: string;
   * }}
   */
  let { each, groups, grouped = true, picture = 'apple', noun = 'quả táo' } = $props();

  const boxes = $derived(grouped ? Array.from({ length: groups }, () => each) : [each * groups]);
</script>

<div
  class="flex flex-wrap justify-center gap-2 rounded-2xl bg-amber-50 p-2"
  role="img"
  aria-label={groupsLabel(noun, each, groups, grouped)}
>
  {#each boxes as count, b (b)}
    <div class="flex flex-wrap justify-center rounded-xl border-2 border-amber-300 bg-white p-1">
      {#each { length: count } as _, i (i)}
        <Picture name={picture} size={22} decorative />
      {/each}
    </div>
  {/each}
</div>
