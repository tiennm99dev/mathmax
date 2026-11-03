<script>
  import { pointsAttr } from '#lib/utils/svg.js';
  import { cornerPath } from './scene.js';

  /**
   * Draws a `Scene` of `scene.js` on a white card that scales to its container.
   *
   * - `scene`: what to draw.
   * - `settled`: the question has ended, so `scene.reveal` and
   *   `scene.settledLabel` apply.
   * @type {{ scene: import('./scene.js').Scene, settled?: boolean }}
   */
  let { scene, settled = false } = $props();

  const INK = '#1e293b';
  const parts = $derived(settled && scene.reveal ? [scene, scene.reveal] : [scene]);
  const label = $derived(settled && scene.settledLabel ? scene.settledLabel : scene.label);
</script>

<svg
  viewBox="0 0 {scene.w} {scene.h}"
  class="mx-auto block w-full max-w-sm rounded-2xl border border-slate-200 bg-white"
  role="img"
  aria-label={label}
>
  {#each parts as part, k (k)}
    {#each part.polygons ?? [] as shape, i (i)}
      <polygon
        points={pointsAttr(shape.points)}
        fill="#e0f2fe"
        stroke={INK}
        stroke-width="3"
        stroke-linejoin="round"
      />
    {/each}
    {#each part.circles ?? [] as circle, i (i)}
      <circle
        cx={circle.c.x}
        cy={circle.c.y}
        r={circle.r}
        fill="#e0f2fe"
        stroke={INK}
        stroke-width="3"
      />
    {/each}
    {#each part.lines ?? [] as line, i (i)}
      <line
        x1={line.a.x}
        y1={line.a.y}
        x2={line.b.x}
        y2={line.b.y}
        stroke={INK}
        stroke-width="3"
        stroke-linecap="round"
      />
    {/each}
    {#each part.corners ?? [] as corner, i (i)}
      <path
        d={cornerPath(corner.at, corner.p, corner.q)}
        fill="none"
        stroke="#059669"
        stroke-width="3"
      />
    {/each}
    {#each part.dots ?? [] as dot, i (i)}
      <circle cx={dot.at.x} cy={dot.at.y} r="5" fill="#4f46e5" />
      <text
        x={dot.nameAt.x}
        y={dot.nameAt.y}
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="20"
        font-weight="700"
        fill={INK}>{dot.name}</text
      >
    {/each}
    {#each part.texts ?? [] as text, i (i)}
      <text
        x={text.x}
        y={text.y}
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="18"
        font-weight="600"
        fill="#b91c1c">{text.text}</text
      >
    {/each}
  {/each}
</svg>
