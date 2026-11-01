<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import KidFigure from '#lib/core/kid/kid-figure.svelte';
  import Ruler from '#lib/core/kid/ruler.svelte';
  import ThingShape from '#lib/core/kid/thing-shape.svelte';
  import { RULER_CM } from '#lib/core/kid/length.js';
  import { KIND_LABELS, buildRound } from './engine.js';

  /** SVG units per cm in the pictures, and the line every thing starts from. */
  const U = 22;
  const X0 = 24;
  const SW = X0 + RULER_CM * U + 48;
  const FLOOR = 196;

  /**
   * What the picture shows, for screen readers, without giving the answer.
   * @param {import('./engine.js').Scene} scene
   */
  function sceneLabel(scene) {
    if (scene.type === 'things') {
      const names = scene.items.map((it) => it.thing.label.toLowerCase()).join(', ');
      return `Các vật nằm thẳng hàng ở đầu bên trái: ${names}.`;
    }
    if (scene.type === 'kids') {
      return `Ba bạn đứng cạnh nhau trên mặt sàn: ${scene.items.map((it) => it.kid.label).join(', ')}.`;
    }
    return `${scene.thing.label} nằm trên thước kẻ, vạch 0 thẳng với đầu bên trái. Đầu bên phải ở vạch ${scene.length}.`;
  }
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nắm chắc cách so sánh và đo độ dài."
>
  {#snippet visual(q)}
    {#if q.scene}
      {@const scene = q.scene}
      {#if scene.type === 'things'}
        <svg
          viewBox="0 0 {SW} {scene.items.length * 52 + 16}"
          class="w-full max-w-xl rounded-2xl border border-slate-200 bg-white"
          role="img"
          aria-label={sceneLabel(scene)}
        >
          <line
            x1={X0}
            y1="6"
            x2={X0}
            y2={scene.items.length * 52 + 10}
            stroke="#dc2626"
            stroke-width="3"
          />
          {#each scene.items as it, i (i)}
            <ThingShape
              shape={it.thing.shape}
              x={X0}
              y={26 + i * 52}
              length={it.length * U}
              color={it.thing.color}
            />
            <text x={X0 + 4} y={52 + i * 52} font-size="16" font-weight="600" fill="#334155"
              >{it.thing.label}</text
            >
          {/each}
        </svg>
      {:else if scene.type === 'kids'}
        <svg
          viewBox="0 0 {SW} {FLOOR + 30}"
          class="w-full max-w-xl rounded-2xl border border-slate-200 bg-white"
          role="img"
          aria-label={sceneLabel(scene)}
        >
          <rect x="0" y={FLOOR} width={SW} height="30" fill="#d6d3d1" />
          {#each scene.items as it, i (i)}
            <KidFigure
              x={(SW * (2 * i + 1)) / 6}
              y={FLOOR}
              height={it.height * 20}
              color={it.kid.color}
            />
            <text
              x={(SW * (2 * i + 1)) / 6}
              y={FLOOR + 21}
              text-anchor="middle"
              font-size="15"
              font-weight="600"
              fill="#1e293b">{it.kid.label}</text
            >
          {/each}
        </svg>
      {:else}
        <svg
          viewBox="0 0 {SW} 104"
          class="w-full max-w-xl rounded-2xl border border-slate-200 bg-amber-50"
          role="img"
          aria-label={sceneLabel(scene)}
        >
          <ThingShape
            shape={scene.thing.shape}
            x={X0 + 10}
            y={30}
            length={scene.length * U}
            color={scene.thing.color}
          />
          <Ruler x={X0 + 10} y={46} cm={RULER_CM} unit={U} />
        </svg>
      {/if}
    {/if}
  {/snippet}
</ChoiceRound>
