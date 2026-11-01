<script>
  /**
   * Counting sticks (que tính) for a number to 100, the way the book draws
   * them: bundles of ten tied with a band for the tens, loose sticks for the
   * ones. Static: the parent changes the props. With no stick at all it says
   * so in words.
   *
   * - `tens`, `ones`: bundles and loose sticks (0 to 10 each; ten loose
   *   sticks are waiting to be tied).
   * - `crossTens`, `crossOnes`: how many of the last bundles and loose sticks
   *   are taken away (drawn faded and struck through), for subtraction.
   * - `extraOnes`: loose sticks just put in, drawn in blue after the others.
   * - `tone`: stick colour, `amber` for the first number, `sky` for the second.
   * - `highlight`: the column being worked on gets a ring.
   * - `small`: shorter sticks, for two numbers side by side.
   * @type {{
   *   tens: number;
   *   ones: number;
   *   crossTens?: number;
   *   crossOnes?: number;
   *   extraOnes?: number;
   *   tone?: 'amber' | 'sky';
   *   highlight?: 'ones' | 'tens' | null;
   *   small?: boolean;
   * }}
   */
  let {
    tens,
    ones,
    crossTens = 0,
    crossOnes = 0,
    extraOnes = 0,
    tone = 'amber',
    highlight = null,
    small = false,
  } = $props();

  const h = $derived(small ? 46 : 60);
  const empty = $derived(tens === 0 && ones + extraOnes === 0);

  const fill = $derived(tone === 'amber' ? '#f59e0b' : '#38bdf8');
  const edge = $derived(tone === 'amber' ? '#b45309' : '#0369a1');
  const label = $derived.by(() => {
    if (empty) return 'Không có que tính nào';
    const parts = [`${tens} bó một chục que tính và ${ones + extraOnes} que tính rời`];
    if (crossTens > 0 || crossOnes > 0) {
      parts.push(`bớt đi ${crossTens} bó và ${crossOnes} que rời`);
    }
    return parts.join(', ');
  });

  /** @param {'ones' | 'tens'} place */
  function ring(place) {
    const ring = highlight === place ? 'ring-4 ring-indigo-400 bg-indigo-50' : 'bg-transparent';
    return `${small ? '' : 'min-h-16'} ${ring}`;
  }
</script>

<div class="flex flex-wrap items-end gap-x-3 gap-y-2" role="img" aria-label={label}>
  {#if tens > 0}
    <div class="flex flex-wrap items-end gap-1.5 rounded-xl p-1 transition {ring('tens')}">
      {#each { length: tens } as _, i (i)}
        {@const gone = i >= tens - crossTens}
        <svg
          width={small ? 22 : 28}
          height={h}
          viewBox="0 0 30 64"
          aria-hidden="true"
          class="transition-opacity duration-500 motion-reduce:transition-none {gone
            ? 'opacity-30'
            : 'opacity-100'}"
        >
          {#each { length: 10 } as _, k (k)}
            <rect x={1 + k * 2.8} y="2" width="2.2" height="60" rx="1" {fill} />
          {/each}
          <rect x="0" y="27" width="30" height="8" rx="2" fill="#dc2626" />
          {#if gone}
            <line x1="2" y1="60" x2="28" y2="4" stroke="#be123c" stroke-width="4" />
          {/if}
        </svg>
      {/each}
    </div>
  {/if}
  {#if ones + extraOnes > 0}
    <div class="flex flex-wrap items-end gap-1.5 rounded-xl p-1 transition {ring('ones')}">
      {#each { length: ones } as _, i (i)}
        {@const gone = i >= ones - crossOnes}
        <svg
          width={small ? 6 : 8}
          height={h}
          viewBox="0 0 8 64"
          aria-hidden="true"
          class="overflow-visible transition-opacity duration-500 motion-reduce:transition-none {gone
            ? 'opacity-30'
            : 'opacity-100'}"
        >
          <rect x="1.5" y="2" width="5" height="60" rx="2" {fill} stroke={edge} />
          {#if gone}
            <line x1="-3" y1="50" x2="11" y2="14" stroke="#be123c" stroke-width="3" />
          {/if}
        </svg>
      {/each}
      {#each { length: extraOnes } as _, i (i)}
        <svg width={small ? 6 : 8} height={h} viewBox="0 0 8 64" aria-hidden="true">
          <rect x="1.5" y="2" width="5" height="60" rx="2" fill="#38bdf8" stroke="#0369a1" />
        </svg>
      {/each}
    </div>
  {/if}
  {#if empty}
    <span class="text-lg text-slate-500">Chưa có que tính nào</span>
  {/if}
</div>
