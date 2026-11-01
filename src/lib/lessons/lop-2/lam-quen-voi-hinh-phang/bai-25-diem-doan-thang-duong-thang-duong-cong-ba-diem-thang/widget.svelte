<script>
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { button } from '#lib/core/ui.js';
  import { lineThrough } from '../_shared/figures.js';
  import {
    GOALS,
    HEIGHT,
    WIDTH,
    allDots,
    inLine,
    nearestFree,
    stepDot,
    trioText,
  } from './engine.js';

  /** @type {readonly ('A' | 'B' | 'C')[]} */
  const NAMES = ['A', 'B', 'C'];
  const DOTS = allDots();

  /** @param {number} i */
  const startOf = (i) => ({
    A: { ...GOALS[i].start.A },
    B: { ...GOALS[i].start.B },
    C: { ...GOALS[i].start.C },
  });

  let level = $state(0);
  let pts = $state(startOf(0));
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const goal = $derived(GOALS[level]);
  const done = $derived(goal.met(pts));
  const straight = $derived(inLine(pts));
  const edge = $derived(lineThrough(pts.A, pts.B, WIDTH, HEIGHT));
  const message = $derived(done ? goal.done : trioText(pts));

  /** @param {'A' | 'B' | 'C'} name */
  const others = (name) => NAMES.filter((n) => n !== name).map((n) => pts[n]);

  /** @param {'A' | 'B' | 'C'} name */
  function dragFor(name) {
    return {
      point: pts[name],
      svg: () => svgEl ?? null,
      viewBox: { w: WIDTH, h: HEIGHT },
      pad: 0,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => nearestFree(p, others(name)),
      /** @param {number} dx @param {number} dy */
      onKeyMove: (dx, dy) => {
        pts[name] = stepDot(pts[name], dx, dy, others(name));
      },
    };
  }

  function nextGoal() {
    level = (level + 1) % GOALS.length;
    pts = startOf(level);
  }
</script>

<div class="space-y-4">
  <p class="text-xl font-semibold text-slate-800">{goal.text}</p>

  <svg
    bind:this={svgEl}
    viewBox="0 0 {WIDTH} {HEIGHT}"
    class="mx-auto block w-full max-w-lg touch-none rounded-2xl border border-slate-200 bg-white select-none"
    role="group"
    aria-label="Bảng chấm có ba điểm A, B, C. Đường nét đứt là thước đặt qua hai điểm A và B."
  >
    {#each DOTS as d (`${d.x},${d.y}`)}
      <circle cx={d.x} cy={d.y} r="4" fill="#cbd5e1" />
    {/each}
    <line
      x1={edge[0].x}
      y1={edge[0].y}
      x2={edge[1].x}
      y2={edge[1].y}
      stroke={straight ? '#059669' : '#94a3b8'}
      stroke-width={straight ? 4 : 2.5}
      stroke-dasharray={straight ? undefined : '10 7'}
    />
    {#each NAMES as name (name)}
      <DragPoint
        drag={dragFor(name)}
        r={13}
        color={name === 'C' ? '#e11d48' : '#4F46E5'}
        {name}
        nameDx={16}
        nameDy={-14}
        label="Điểm {name}. Kéo, hoặc dùng phím mũi tên để di chuyển sang chấm bên cạnh."
      />
    {/each}
  </svg>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {done
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if done}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  <button
    type="button"
    class="min-h-12 text-lg {done ? button.primary : button.secondary}"
    onclick={nextGoal}>Thử thách khác</button
  >
</div>
