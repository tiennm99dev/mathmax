<script>
  import { button } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { FIGURES, construction, dist, rotate } from './engine.js';

  const W = 400;
  const H = 300;
  /** SVG units per GeoGebra unit: the grid square. */
  const UNIT = 40;
  const MIN_AB = 40;
  const MAX_AB = 100;
  const EDGE = 8;

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  /** @type {import('./engine.js').Figure} */
  let figure = $state('tam-giac-deu');
  let shown = $state(1);
  const START_A = { x: 150, y: 200 };
  const START_B = { x: 240, y: 200 };
  let a = $state({ ...START_A });
  let b = $state({ ...START_B });

  const built = $derived(construction(figure, a, b));
  const steps = $derived(built.steps);
  const done = $derived(shown >= steps.length);
  const drawn = $derived(steps.slice(0, shown).flatMap((s) => s.draw));
  const current = $derived(steps[Math.min(shown, steps.length) - 1]);

  /**
   * Whether every constructed point of `fig` would stay on the board.
   * @param {import('./engine.js').Figure} fig
   * @param {{ x: number, y: number }} p
   * @param {{ x: number, y: number }} q
   */
  function fits(fig, p, q) {
    const d = dist(p, q);
    if (d < MIN_AB - 1e-6 || d > MAX_AB + 1e-6) return false;
    const all = construction(fig, p, q)
      .steps.flatMap((s) => s.draw)
      .flatMap((o) =>
        o.kind === 'point'
          ? [o.p]
          : o.kind === 'polygon'
            ? o.pts
            : o.kind === 'segment'
              ? [o.a, o.b]
              : [],
      );
    return all.every((o) => o.x >= EDGE && o.x <= W - EDGE && o.y >= EDGE && o.y <= H - EDGE);
  }

  /**
   * Drag params for one free point; a move that would push the figure off
   * the board, or make AB too short or too long, is refused.
   * @param {'a' | 'b'} which
   */
  function dragFor(which) {
    const point = which === 'a' ? a : b;
    /** @param {{ x: number, y: number }} p */
    const allowed = (p) => (which === 'a' ? fits(figure, p, b) : fits(figure, a, p));
    return {
      point,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => {
        const q = { x: Math.round(p.x / 5) * 5, y: Math.round(p.y / 5) * 5 };
        return allowed(q) ? q : { x: point.x, y: point.y };
      },
      /** @param {number} dx @param {number} dy @param {boolean} big */
      onKeyMove: (dx, dy, big) => {
        const s = big ? 20 : 5;
        const q = { x: point.x + dx * s, y: point.y + dy * s };
        if (allowed(q)) {
          point.x = q.x;
          point.y = q.y;
        }
      },
    };
  }

  /** @param {string | number} value */
  function choose(value) {
    figure = /** @type {import('./engine.js').Figure} */ (value);
    shown = 1;
    if (!fits(figure, a, b)) {
      a.x = START_A.x;
      a.y = START_A.y;
      b.x = START_B.x;
      b.y = START_B.y;
    }
  }

  /** @param {number} v */
  const len = (v) => formatFixed(v / UNIT, 2);

  /**
   * SVG arc for an angle mark at `at`, from the ray towards `from`, turning
   * `deg` counterclockwise.
   * @param {{ x: number, y: number }} at
   * @param {{ x: number, y: number }} from
   * @param {number} deg
   */
  function arc(at, from, deg) {
    const r = 22;
    const d = dist(at, from);
    const p = { x: at.x + ((from.x - at.x) / d) * r, y: at.y + ((from.y - at.y) / d) * r };
    const q = rotate(p, at, deg);
    return `M ${at.x} ${at.y} L ${p.x} ${p.y} A ${r} ${r} 0 0 0 ${q.x} ${q.y} Z`;
  }

  const status = $derived(
    done
      ? `Xong. ${built.verdict}`
      : `Bước ${shown}/${steps.length} – công cụ "${current.tool}": ${current.text}`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hình cần vẽ"
    options={[...FIGURES]}
    value={figure}
    onchange={choose}
  />

  <ol class="space-y-1 text-sm">
    {#each steps as s, i (i)}
      <li
        class="rounded-lg px-3 py-2 {i === shown - 1
          ? 'bg-indigo-50 font-semibold text-indigo-900'
          : i < shown
            ? 'text-slate-500'
            : 'text-slate-400'}"
      >
        <span class="mr-1 inline-block rounded bg-white px-1.5 text-xs ring-1 ring-slate-300"
          >{s.tool}</span
        >
        {i + 1}. {s.text}
      </li>
    {/each}
  </ol>

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.quiet}
      onclick={() => (shown = Math.max(1, shown - 1))}
      disabled={shown <= 1}
    >
      Bước trước
    </button>
    <button
      type="button"
      class={button.primary}
      onclick={() => (shown = Math.min(steps.length, shown + 1))}
      disabled={done}
    >
      Bước tiếp
    </button>
    <button type="button" class={button.quiet} onclick={() => (shown = 1)}>Làm lại</button>
  </div>

  <div class="grid gap-3 md:grid-cols-[1fr_12rem]">
    <GeometryBoard
      bind:svgEl
      width={W}
      height={H}
      interactive
      maxWidth="max-w-lg"
      label="Vùng làm việc mô phỏng GeoGebra: dựng {FIGURES.find(
        (f) => f.value === figure,
      )?.label.toLowerCase()} từ hai điểm A và B kéo được"
    >
      {#each { length: W / UNIT - 1 } as _, i (i)}
        <line
          x1={(i + 1) * UNIT}
          y1="0"
          x2={(i + 1) * UNIT}
          y2={H}
          stroke="#E2E8F0"
          stroke-width="1"
        />
      {/each}
      {#each { length: H / UNIT } as _, i (i)}
        <line
          x1="0"
          y1={(i + 1) * UNIT}
          x2={W}
          y2={(i + 1) * UNIT}
          stroke="#E2E8F0"
          stroke-width="1"
        />
      {/each}
      {#each drawn as o, i (i)}
        {#if o.kind === 'circle'}
          <circle cx={o.c.x} cy={o.c.y} r={o.r} fill="none" stroke="#64748B" stroke-width="1.5" />
        {:else if o.kind === 'polygon'}
          <polygon
            points={o.pts.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="#A0522D"
            fill-opacity="0.15"
            stroke="#A0522D"
            stroke-width="2.5"
            stroke-linejoin="round"
          />
        {:else if o.kind === 'segment'}
          <line x1={o.a.x} y1={o.a.y} x2={o.b.x} y2={o.b.y} stroke="#334155" stroke-width="2.5" />
        {:else if o.kind === 'angle'}
          <path d={arc(o.at, o.from, o.deg)} fill="#16A34A" fill-opacity="0.3" stroke="#16A34A" />
        {/if}
      {/each}
      {#each drawn as o, i (i)}
        {#if o.kind === 'point' && o.name !== 'A' && o.name !== 'B'}
          <circle cx={o.p.x} cy={o.p.y} r="5" fill="#475569" />
          <text x={o.p.x + 8} y={o.p.y - 8} font-size="14" fill="#1F2937">{o.name}</text>
        {/if}
      {/each}
      <DragPoint
        drag={dragFor('a')}
        r={8}
        color="#1565C0"
        name="A"
        nameDx={-18}
        nameDy={18}
        label="Điểm A: kéo hoặc dùng phím mũi tên để dời; hình dựng theo sẽ thay đổi theo"
      />
      <DragPoint
        drag={dragFor('b')}
        r={8}
        color="#1565C0"
        name="B"
        nameDx={10}
        nameDy={18}
        label="Điểm B: kéo hoặc dùng phím mũi tên để dời; hình dựng theo sẽ thay đổi theo"
      />
    </GeometryBoard>

    <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
      <p class="mb-2 font-semibold text-slate-700">Đo trên hình</p>
      {#if done}
        <ul class="space-y-1 tabular-nums text-slate-800">
          {#each built.measures as m (m.label)}
            <li>
              {m.label} = {m.unit === 'deg' ? `${formatNumber(m.value, 1)}°` : len(m.value)}
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-slate-600">Dựng xong hình để đo độ dài các cạnh và số đo các góc.</p>
      {/if}
      <p class="mt-2 text-xs text-slate-500">Mỗi ô lưới dài 1 đơn vị.</p>
    </div>
  </div>

  <p
    class="rounded-lg p-3 text-sm {done
      ? 'bg-emerald-50 font-semibold text-emerald-900'
      : 'bg-slate-50 text-slate-800'}"
    aria-live="polite"
  >
    {status}
  </p>
</div>
