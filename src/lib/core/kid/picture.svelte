<script>
  import { pictures } from './pictures.js';

  /**
   * One countable kid picture, drawn inline so no image is fetched.
   * @type {{ name: import('./pictures.js').PictureName, size?: number }}
   */
  let { name, size = 44 } = $props();
</script>

<svg
  viewBox="0 0 40 40"
  width={size}
  height={size}
  role="img"
  aria-label={pictures[name]}
  class="shrink-0"
>
  {#if name === 'apple'}
    <path
      d="M20 12c-3-3-11-3-12 6s5 17 9 17c1.5 0 2-1 3-1s1.5 1 3 1c4 0 10-8 9-17s-9-9-12-6z"
      fill="#e11d48"
    />
    <path
      d="M20 12c0-3 1-6 4-8"
      stroke="#713f12"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
    />
    <ellipse cx="26" cy="7" rx="4" ry="2" transform="rotate(-25 26 7)" fill="#16a34a" />
  {:else if name === 'star'}
    <path
      d="M20 3l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z"
      fill="#facc15"
      stroke="#ca8a04"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  {:else if name === 'fish'}
    <path d="M5 20c6-9 18-10 25 0-7 10-19 9-25 0z" fill="#38bdf8" />
    <path d="M29 20l8-7v14z" fill="#0284c7" />
    <circle cx="12" cy="18" r="2" fill="#0f172a" />
  {:else if name === 'flower'}
    {#each [0, 72, 144, 216, 288] as angle (angle)}
      <ellipse cx="20" cy="11" rx="5" ry="8" fill="#f472b6" transform="rotate({angle} 20 20)" />
    {/each}
    <circle cx="20" cy="20" r="5" fill="#facc15" />
  {:else if name === 'coin'}
    <circle cx="20" cy="20" r="16" fill="#fbbf24" stroke="#b45309" stroke-width="2" />
    <circle cx="20" cy="20" r="10" fill="none" stroke="#b45309" stroke-width="1.5" />
  {:else if name === 'block'}
    <rect
      x="6"
      y="6"
      width="28"
      height="28"
      rx="3"
      fill="#60a5fa"
      stroke="#1d4ed8"
      stroke-width="2"
    />
    <path d="M6 14h28" stroke="#1d4ed8" stroke-width="1" opacity="0.4" />
  {/if}
</svg>
