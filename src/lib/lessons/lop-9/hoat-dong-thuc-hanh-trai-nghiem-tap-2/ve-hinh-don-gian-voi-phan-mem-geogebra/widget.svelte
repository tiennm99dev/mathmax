<script>
  import { button } from '#lib/core/ui.js';
  import { formatFixed } from '#lib/core/number-format.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { cross, dist } from '#lib/geom-engine/plane.js';
  import { FIGURES, UNIT, construction } from './engine.js';

  /** @typedef {import('./engine.js').Figure} Figure */
  /** @typedef {{ x: number, y: number }} Pt */
  /** @typedef {'O' | 'B' | 'M' | 'A' | 'Bt' | 'C'} Handle */

  const W = 400;
  const H = 300;
  const EDGE = 14;
  const FAR = 1200;

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let figure = $state(/** @type {Figure} */ ('tiep-tuyen-tai'));
  let shown = $state(1);
  /** @type {Record<Handle, Pt>} */
  let pts = $state({
    O: { x: 150, y: 150 },
    B: { x: 230, y: 150 },
    M: { x: 340, y: 90 },
    A: { x: 120, y: 60 },
    Bt: { x: 60, y: 250 },
    C: { x: 340, y: 240 },
  });

  const isTriangle = $derived(figure === 'ngoai-tiep' || figure === 'noi-tiep');
  const built = $derived(
    construction(figure, {
      O: pts.O,
      B: pts.B,
      M: pts.M,
      tri: [pts.A, pts.Bt, pts.C],
    }),
  );
  const steps = $derived(built.steps);
  const at = $derived(Math.min(shown, steps.length));
  const done = $derived(at >= steps.length);
  const drawn = $derived(steps.slice(0, at).flatMap((s) => s.draw));
  const current = $derived(steps[at - 1]);

  /** @type {Handle[]} */
  const handles = $derived(
    isTriangle ? ['A', 'Bt', 'C'] : figure === 'tiep-tuyen-qua' ? ['O', 'B', 'M'] : ['O', 'B'],
  );
  /** Names the drag handles already write, so drawn points skip them. @type {string[]} */
  const handleNames = $derived(handles.map((h) => (h === 'Bt' ? 'B' : String(h))));

  /** @param {Pt} p */
  const inside = (p) => p.x >= EDGE && p.x <= W - EDGE && p.y >= EDGE && p.y <= H - EDGE;

  /** @param {Record<Handle, Pt>} next */
  function fits(next) {
    if (isTriangle) {
      const [a, b, c] = [next.A, next.Bt, next.C];
      if (![a, b, c].every(inside)) return false;
      if (Math.min(dist(a, b), dist(b, c), dist(c, a)) < 50) return false;
      return Math.abs(cross(a, b, c)) / 2 >= 2500;
    }
    const r = dist(next.O, next.B);
    // M never covers O or B, so every handle stays within reach of the pointer.
    const apart =
      figure !== 'tiep-tuyen-qua' || Math.min(dist(next.M, next.O), dist(next.M, next.B)) >= 16;
    return inside(next.O) && inside(next.B) && inside(next.M) && r >= 30 && r <= 120 && apart;
  }

  /**
   * Moves handle `h` to `q`; moving O carries B along so the radius stays.
   * @param {Handle} h @param {Pt} q
   */
  function tryMove(h, q) {
    const next = { ...pts, [h]: { x: q.x, y: q.y } };
    if (h === 'O') next.B = { x: pts.B.x + q.x - pts.O.x, y: pts.B.y + q.y - pts.O.y };
    if (fits(next)) pts = next;
  }

  /** @param {Handle} h */
  function dragFor(h) {
    const p = pts[h];
    return {
      point: { x: p.x, y: p.y },
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      /** @param {Pt} q */
      projector: (q) => {
        tryMove(h, { x: Math.round(q.x / 2) * 2, y: Math.round(q.y / 2) * 2 });
        return { x: pts[h].x, y: pts[h].y };
      },
      /** @param {number} dx @param {number} dy @param {boolean} big */
      onKeyMove: (dx, dy, big) => {
        const s = big ? 20 : 4;
        tryMove(h, { x: p.x + dx * s, y: p.y + dy * s });
      },
    };
  }

  /** @param {string | number} value */
  function choose(value) {
    figure = /** @type {Figure} */ (value);
    shown = 1;
  }

  /** @param {Pt} p @param {Pt} d */
  function longLine(p, d) {
    const k = FAR / Math.hypot(d.x, d.y);
    return { x1: p.x - d.x * k, y1: p.y - d.y * k, x2: p.x + d.x * k, y2: p.y + d.y * k };
  }

  /** Small square marking a right angle. @param {Pt} o @param {Pt} u @param {Pt} v */
  function rightMark(o, u, v) {
    const s = 10;
    const lu = Math.hypot(u.x, u.y);
    const lv = Math.hypot(v.x, v.y);
    const a = { x: o.x + (u.x / lu) * s, y: o.y + (u.y / lu) * s };
    const b = { x: o.x + (v.x / lv) * s, y: o.y + (v.y / lv) * s };
    const c = { x: a.x + (v.x / lv) * s, y: a.y + (v.y / lv) * s };
    return `M ${a.x} ${a.y} L ${c.x} ${c.y} L ${b.x} ${b.y}`;
  }

  /** @param {import('./engine.js').Measure} x */
  const show = (x) =>
    x.unit === 'deg' ? `${formatFixed(x.value, 1)}°` : `${formatFixed(x.value, 2)} đơn vị`;

  const status = $derived(
    done
      ? `${built.ok ? 'Xong.' : 'Chưa dựng được.'} ${built.verdict}`
      : `Bước ${at}/${steps.length}, công cụ "${current.tool}": ${current.text}`,
  );

  /** @type {Record<Handle, string>} */
  const HANDLE_TEXT = {
    O: 'Tâm O: kéo hoặc dùng phím mũi tên để dời cả đường tròn',
    B: 'Điểm B trên đường tròn: kéo để đổi bán kính và vị trí điểm B',
    M: 'Điểm M: kéo hoặc dùng phím mũi tên để dời M',
    A: 'Đỉnh A: kéo hoặc dùng phím mũi tên để dời',
    Bt: 'Đỉnh B: kéo hoặc dùng phím mũi tên để dời',
    C: 'Đỉnh C: kéo hoặc dùng phím mũi tên để dời',
  };
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hình cần dựng"
    options={[...FIGURES]}
    value={figure}
    onchange={choose}
  />

  <ol class="space-y-1 text-sm">
    {#each steps as s, i (i)}
      <li
        class="rounded-lg px-3 py-2 {i === at - 1
          ? 'bg-indigo-50 font-semibold text-indigo-900'
          : i < at
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
      onclick={() => (shown = Math.max(1, at - 1))}
      disabled={at <= 1}>Bước trước</button
    >
    <button
      type="button"
      class={button.primary}
      onclick={() => (shown = Math.min(steps.length, at + 1))}
      disabled={done}>Bước tiếp</button
    >
    <button type="button" class={button.quiet} onclick={() => (shown = steps.length)}
      >Dựng hết</button
    >
    <button type="button" class={button.quiet} onclick={() => (shown = 1)}>Làm lại</button>
  </div>

  <div class="grid gap-3 md:grid-cols-[1fr_14rem]">
    <GeometryBoard
      bind:svgEl
      width={W}
      height={H}
      interactive
      maxWidth="max-w-xl"
      label={`Vùng vẽ mô phỏng GeoGebra: ${FIGURES.find((f) => f.value === figure)?.label.toLowerCase()}, các điểm màu xanh kéo được`}
    >
      {#each { length: Math.floor(W / UNIT) } as _, i (i)}
        <line
          x1={(i + 1) * UNIT}
          y1="0"
          x2={(i + 1) * UNIT}
          y2={H}
          stroke="#E2E8F0"
          stroke-width="1"
        />
      {/each}
      {#each { length: Math.floor(H / UNIT) } as _, i (i)}
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
          <circle
            cx={o.c.x}
            cy={o.c.y}
            r={o.r}
            fill="none"
            stroke={o.color ?? (o.faint ? '#94A3B8' : '#334155')}
            stroke-width={o.faint ? 1.5 : 2.5}
            stroke-dasharray={o.faint ? '5 4' : null}
          />
        {:else if o.kind === 'line'}
          {@const l = longLine(o.p, o.d)}
          <line
            {...l}
            stroke={o.color ?? (o.faint ? '#94A3B8' : '#334155')}
            stroke-width={o.faint ? 1.5 : 2.5}
            stroke-dasharray={o.faint ? '6 5' : null}
          />
          {#if o.name}
            <text
              x={o.p.x + (o.d.x / Math.hypot(o.d.x, o.d.y)) * 70 + 8}
              y={o.p.y + (o.d.y / Math.hypot(o.d.x, o.d.y)) * 70 - 6}
              font-size="15"
              font-style="italic"
              fill="#6D28D9">{o.name}</text
            >
          {/if}
        {:else if o.kind === 'segment'}
          <line
            x1={o.a.x}
            y1={o.a.y}
            x2={o.b.x}
            y2={o.b.y}
            stroke={o.faint ? '#94A3B8' : '#334155'}
            stroke-width={o.faint ? 1.5 : 2.5}
            stroke-dasharray={o.faint ? '5 4' : null}
          />
        {:else if o.kind === 'right'}
          <path d={rightMark(o.at, o.u, o.v)} fill="none" stroke="#16A34A" stroke-width="1.8" />
        {/if}
      {/each}
      {#each drawn as o, i (i)}
        {#if o.kind === 'point' && !handleNames.includes(o.name)}
          <circle cx={o.p.x} cy={o.p.y} r="4.5" fill="#475569" />
          <text x={o.p.x + 7} y={o.p.y - 7} font-size="14" fill="#1F2937">{o.name}</text>
        {/if}
      {/each}
      {#each handles as h (h)}
        <DragPoint
          drag={dragFor(h)}
          r={7}
          color="#1565C0"
          name={h === 'Bt' ? 'B' : h}
          nameDx={10}
          nameDy={h === 'C' || h === 'Bt' ? 20 : -10}
          label={HANDLE_TEXT[h]}
        />
      {/each}
    </GeometryBoard>

    <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
      <p class="mb-2 font-semibold text-slate-700">Đo trên hình</p>
      {#if done && built.measures.length}
        <ul class="space-y-1 tabular-nums text-slate-800">
          {#each built.measures as x (x.label)}
            <li>{x.label} = {show(x)}</li>
          {/each}
        </ul>
      {:else}
        <p class="text-slate-600">Làm hết các bước để xem số đo.</p>
      {/if}
      <p class="mt-2 text-xs text-slate-500">
        Mỗi ô lưới dài 1 đơn vị. Kéo các điểm màu xanh: hình dựng và số đo thay đổi theo, nhưng các
        tính chất vẫn đúng.
      </p>
    </div>
  </div>

  <p
    class="rounded-lg p-3 text-sm {done
      ? built.ok
        ? 'bg-emerald-50 font-semibold text-emerald-900'
        : 'bg-amber-50 font-semibold text-amber-900'
      : 'bg-slate-50 text-slate-800'}"
    aria-live="polite"
  >
    {status}
  </p>
</div>
