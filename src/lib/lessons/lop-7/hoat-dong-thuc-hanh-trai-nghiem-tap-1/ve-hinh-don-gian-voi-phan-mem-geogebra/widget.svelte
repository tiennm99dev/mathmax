<script>
  import { button } from '#lib/core/ui.js';
  import { formatFixed } from '#lib/core/number-format.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import {
    FIGURES,
    angleAt,
    bisectorLine,
    construction,
    dist,
    distToLine,
    placeTriangle,
    projectOnLine,
  } from './engine.js';

  const W = 440;
  const H = 330;
  /** SVG units per length unit on the free figures: one grid square. */
  const UNIT = 44;
  const EDGE = 12;
  const FAR = 1200;

  /** @typedef {import('./engine.js').Figure} Figure */
  /** @typedef {{ x: number, y: number }} Pt */

  /** Starting free points of each figure that has draggable points. */
  const START = {
    'song-song': { a: { x: 100, y: 250 }, b: { x: 340, y: 230 }, m: { x: 220, y: 110 } },
    'phan-giac': { a: { x: 110, y: 250 }, b: { x: 370, y: 250 }, m: { x: 300, y: 80 } },
    'trung-truc': { a: { x: 130, y: 210 }, b: { x: 310, y: 210 }, m: { x: 220, y: 90 } },
  };

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let figure = $state(/** @type {Figure} */ ('song-song'));
  let shown = $state(1);
  let a = $state({ ...START['song-song'].a });
  let b = $state({ ...START['song-song'].b });
  let m = $state({ ...START['song-song'].m });
  /** Signed offset of M from the midpoint I along g, for the perpendicular bisector. */
  let mt = $state(-120);
  let ab = $state(4);
  let bc = $state(5);
  let ca = $state(6);
  let angle = $state(60);

  const isTriangle = $derived(figure === 'ccc' || figure === 'cgc');
  const built = $derived(
    construction(figure, { a, b, m, unit: UNIT, ab, bc, ca, angle, w: W, h: H }),
  );
  const steps = $derived(built.steps);
  const at = $derived(Math.min(shown, steps.length));
  const done = $derived(at >= steps.length);
  const drawn = $derived(steps.slice(0, at).flatMap((s) => s.draw));
  const current = $derived(steps[at - 1]);
  const place = $derived(
    isTriangle
      ? placeTriangle(figure === 'ccc' ? 'ccc' : 'cgc', {
          a,
          b,
          m,
          unit: UNIT,
          ab,
          bc,
          ca,
          angle,
          w: W,
          h: H,
        })
      : null,
  );
  const grid = $derived(place ? place.scale : UNIT);
  const origin = $derived(place ? place.A : { x: 0, y: 0 });

  /** Names drawn as drag handles, so the board does not draw them twice. */
  const handles = $derived(
    figure === 'song-song'
      ? ['A', 'B', ...(at >= 2 ? ['M'] : [])]
      : figure === 'phan-giac'
        ? ['A', 'B', 'C']
        : figure === 'trung-truc'
          ? ['A', 'B', ...(at >= 4 ? ['M'] : [])]
          : [],
  );

  /** @param {Pt} p */
  const inside = (p) => p.x >= EDGE && p.x <= W - EDGE && p.y >= EDGE && p.y <= H - EDGE;

  /**
   * M on the perpendicular bisector of AB, `t` px from the midpoint.
   * @param {Pt} p @param {Pt} q @param {number} t
   */
  function onBisector(p, q, t) {
    const { i, d } = bisectorLine(p, q);
    const k = t / Math.hypot(d.x, d.y);
    return { x: i.x + d.x * k, y: i.y + d.y * k };
  }

  /**
   * Whether the free points `p`, `q`, `r` keep the figure readable on the board.
   * @param {Pt} p @param {Pt} q @param {Pt} r
   */
  function fits(p, q, r) {
    if (![p, q, r].every(inside)) return false;
    if (figure === 'song-song') return dist(p, q) >= 80 && distToLine(r, p, q) >= 30;
    if (figure === 'phan-giac') {
      const deg = angleAt(q, p, r);
      return dist(p, q) >= 80 && dist(p, r) >= 80 && deg >= 20 && deg <= 160;
    }
    return dist(p, q) >= 80;
  }

  /**
   * Moves free point `which` to `q` when the figure still fits.
   * @param {'a' | 'b' | 'm'} which @param {Pt} q
   */
  function tryMove(which, q) {
    const na = which === 'a' ? q : a;
    const nb = which === 'b' ? q : b;
    let nm = which === 'm' ? q : m;
    let t = mt;
    if (figure === 'trung-truc') {
      if (which === 'm') {
        const { i, d } = bisectorLine(na, nb);
        const foot = projectOnLine(q, i, d);
        t = ((foot.x - i.x) * d.x + (foot.y - i.y) * d.y) / Math.hypot(d.x, d.y);
      }
      nm = onBisector(na, nb, t);
    }
    if (!fits(na, nb, nm)) return;
    a = { ...na };
    b = { ...nb };
    m = { ...nm };
    mt = t;
  }

  /** Drag params for one free point. @param {'a' | 'b' | 'm'} which */
  function dragFor(which) {
    const point = which === 'a' ? a : which === 'b' ? b : m;
    return {
      point: { x: point.x, y: point.y },
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      /** @param {Pt} p */
      projector: (p) => {
        tryMove(which, { x: Math.round(p.x / 5) * 5, y: Math.round(p.y / 5) * 5 });
        const now = which === 'a' ? a : which === 'b' ? b : m;
        return { x: now.x, y: now.y };
      },
      /** @param {number} dx @param {number} dy @param {boolean} big */
      onKeyMove: (dx, dy, big) => {
        const s = big ? 20 : 5;
        tryMove(which, { x: point.x + dx * s, y: point.y + dy * s });
      },
    };
  }

  /** @param {string | number} value */
  function choose(value) {
    figure = /** @type {Figure} */ (value);
    shown = 1;
    if (figure === 'song-song' || figure === 'phan-giac' || figure === 'trung-truc') {
      const s = START[figure];
      a = { ...s.a };
      b = { ...s.b };
      m = { ...s.m };
      mt = -120;
      if (figure === 'trung-truc') m = onBisector(a, b, mt);
    }
  }

  /**
   * Both ends of a long segment through `p` with direction `d`, wider than the board.
   * @param {Pt} p @param {Pt} d
   */
  function longLine(p, d) {
    const k = FAR / Math.hypot(d.x, d.y);
    return { x1: p.x - d.x * k, y1: p.y - d.y * k, x2: p.x + d.x * k, y2: p.y + d.y * k };
  }

  /**
   * Where to write a line's name: along the line from `p`, on the board.
   * @param {Pt} p @param {Pt} d
   */
  function lineLabel(p, d) {
    const len = Math.hypot(d.x, d.y);
    for (const s of [150, -150, 90, -90, 40]) {
      const q = { x: p.x + (d.x / len) * s + 10, y: p.y + (d.y / len) * s - 8 };
      if (q.x > 16 && q.x < W - 16 && q.y > 16 && q.y < H - 8) return q;
    }
    return { x: p.x + 10, y: p.y - 8 };
  }

  /**
   * SVG path for the angle mark at `at` between the rays to `from` and `to`.
   * @param {Pt} at @param {Pt} from @param {Pt} to
   */
  function arc(at, from, to) {
    const r = 22;
    const u = { x: from.x - at.x, y: from.y - at.y };
    const v = { x: to.x - at.x, y: to.y - at.y };
    const lu = Math.hypot(u.x, u.y);
    const lv = Math.hypot(v.x, v.y);
    const p = { x: at.x + (u.x / lu) * r, y: at.y + (u.y / lu) * r };
    const q = { x: at.x + (v.x / lv) * r, y: at.y + (v.y / lv) * r };
    const sweep = u.x * v.y - u.y * v.x > 0 ? 1 : 0;
    return `M ${at.x} ${at.y} L ${p.x} ${p.y} A ${r} ${r} 0 0 ${sweep} ${q.x} ${q.y} Z`;
  }

  const unitName = $derived(isTriangle ? 'cm' : 'đơn vị');
  /** @param {import('./engine.js').Measure} x */
  const show = (x) =>
    x.unit === 'deg' ? `${formatFixed(x.value, 2)}°` : `${formatFixed(x.value, 2)} ${unitName}`;

  const status = $derived(
    done
      ? `${built.ok ? 'Xong.' : 'Không dựng được.'} ${built.verdict}`
      : `Bước ${at}/${steps.length} – công cụ "${current.tool}": ${current.text}`,
  );

  /** @param {number} v */
  const cm = (v) => formatFixed(v, 1);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn việc cần dựng"
    options={[...FIGURES]}
    value={figure}
    onchange={choose}
  />

  {#if figure === 'ccc'}
    <div class="grid gap-3 sm:grid-cols-3">
      <SliderField label="AB" bind:value={ab} min={1} max={8} step={0.5} unit="cm" format={cm} />
      <SliderField label="BC" bind:value={bc} min={1} max={8} step={0.5} unit="cm" format={cm} />
      <SliderField label="CA" bind:value={ca} min={1} max={8} step={0.5} unit="cm" format={cm} />
    </div>
  {:else if figure === 'cgc'}
    <div class="grid gap-3 sm:grid-cols-3">
      <SliderField label="AB" bind:value={ab} min={1} max={8} step={0.5} unit="cm" format={cm} />
      <SliderField label="AC" bind:value={ca} min={1} max={8} step={0.5} unit="cm" format={cm} />
      <SliderField
        label="Góc BAC"
        bind:value={angle}
        min={10}
        max={170}
        step={5}
        format={(v) => `${v}°`}
      />
    </div>
  {/if}

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
      disabled={at <= 1}
    >
      Bước trước
    </button>
    <button
      type="button"
      class={button.primary}
      onclick={() => (shown = Math.min(steps.length, at + 1))}
      disabled={done}
    >
      Bước tiếp
    </button>
    <button type="button" class={button.quiet} onclick={() => (shown = 1)}>Làm lại</button>
  </div>

  <div class="grid gap-3 md:grid-cols-[1fr_13rem]">
    <GeometryBoard
      bind:svgEl
      width={W}
      height={H}
      interactive={!isTriangle}
      maxWidth="max-w-xl"
      label="Vùng làm việc mô phỏng GeoGebra: {FIGURES.find(
        (f) => f.value === figure,
      )?.label.toLowerCase()}{isTriangle ? '' : ', các điểm kéo được'}"
    >
      {#each { length: Math.ceil(W / grid) * 2 + 2 } as _, i (i)}
        {@const x = (origin.x % grid) + (i - Math.ceil(W / grid)) * grid}
        {#if x > 0 && x < W}
          <line x1={x} y1="0" x2={x} y2={H} stroke="#E2E8F0" stroke-width="1" />
        {/if}
      {/each}
      {#each { length: Math.ceil(H / grid) * 2 + 2 } as _, i (i)}
        {@const y = (origin.y % grid) + (i - Math.ceil(H / grid)) * grid}
        {#if y > 0 && y < H}
          <line x1="0" y1={y} x2={W} y2={y} stroke="#E2E8F0" stroke-width="1" />
        {/if}
      {/each}
      {#each drawn as o, i (i)}
        {#if o.kind === 'circle'}
          <circle
            cx={o.c.x}
            cy={o.c.y}
            r={o.r}
            fill="none"
            stroke="#94A3B8"
            stroke-width="1.5"
            stroke-dasharray={done && built.ok ? '4 4' : null}
          />
        {:else if o.kind === 'line'}
          {@const l = longLine(o.p, o.d)}
          {@const t = lineLabel(o.p, o.d)}
          <line
            {...l}
            stroke={o.dashed ? '#94A3B8' : o.name === 'g' ? '#7C3AED' : '#334155'}
            stroke-width={o.dashed ? 1.5 : 2.5}
            stroke-dasharray={o.dashed ? '6 5' : null}
          />
          {#if o.name}
            <text
              x={t.x}
              y={t.y}
              font-size="15"
              font-style="italic"
              fill={o.name === 'g' ? '#6D28D9' : '#1F2937'}>{o.name}</text
            >
          {/if}
        {:else if o.kind === 'ray'}
          {@const d = { x: o.through.x - o.p.x, y: o.through.y - o.p.y }}
          {@const k = FAR / Math.hypot(d.x, d.y)}
          <line
            x1={o.p.x}
            y1={o.p.y}
            x2={o.p.x + d.x * k}
            y2={o.p.y + d.y * k}
            stroke={o.name === 't' ? '#7C3AED' : '#334155'}
            stroke-width="2.5"
          />
          {#if o.name}
            <text
              x={o.through.x + 8}
              y={o.through.y - 8}
              font-size="15"
              font-style="italic"
              fill="#6D28D9">{o.name}</text
            >
          {/if}
        {:else if o.kind === 'segment'}
          <line x1={o.a.x} y1={o.a.y} x2={o.b.x} y2={o.b.y} stroke="#334155" stroke-width="2.5" />
        {:else if o.kind === 'angle'}
          <path d={arc(o.at, o.from, o.to)} fill="#16A34A" fill-opacity="0.25" stroke="#16A34A" />
        {/if}
      {/each}
      {#each drawn as o, i (i)}
        {#if o.kind === 'point' && !handles.includes(o.name)}
          <circle cx={o.p.x} cy={o.p.y} r="5" fill="#475569" />
          <text x={o.p.x + 8} y={o.p.y - 8} font-size="14" fill="#1F2937">{o.name}</text>
        {/if}
      {/each}
      {#if handles.includes('A')}
        <DragPoint
          drag={dragFor('a')}
          r={8}
          color="#1565C0"
          name="A"
          nameDx={-18}
          nameDy={18}
          label="Điểm A: kéo hoặc dùng phím mũi tên để dời; hình dựng thay đổi theo"
        />
      {/if}
      {#if handles.includes('B')}
        <DragPoint
          drag={dragFor('b')}
          r={8}
          color="#1565C0"
          name="B"
          nameDx={10}
          nameDy={18}
          label="Điểm B: kéo hoặc dùng phím mũi tên để dời; hình dựng thay đổi theo"
        />
      {/if}
      {#if handles.includes('M') || handles.includes('C')}
        {@const nm = figure === 'phan-giac' ? 'C' : 'M'}
        <DragPoint
          drag={dragFor('m')}
          r={8}
          color={figure === 'trung-truc' ? '#7C3AED' : '#1565C0'}
          name={nm}
          nameDx={10}
          nameDy={-10}
          label={figure === 'trung-truc'
            ? 'Điểm M trên đường trung trực g: kéo hoặc dùng phím mũi tên để dời M dọc theo g'
            : `Điểm ${nm}: kéo hoặc dùng phím mũi tên để dời; hình dựng thay đổi theo`}
        />
      {/if}
    </GeometryBoard>

    <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
      <p class="mb-2 font-semibold text-slate-700">Đo trên hình</p>
      {#if done && built.measures.length}
        <ul class="space-y-1 tabular-nums text-slate-800">
          {#each built.measures as x (x.label)}
            <li>{x.label} = {show(x)}</li>
          {/each}
        </ul>
      {:else if done}
        <p class="text-rose-700">Không có giao điểm C nên không có gì để đo.</p>
      {:else}
        <p class="text-slate-600">Làm hết các bước để đo độ dài và số đo góc.</p>
      {/if}
      <p class="mt-2 text-xs text-slate-500">
        {isTriangle
          ? 'Mỗi ô lưới dài 1 cm. Kéo thanh trượt để đổi số liệu: hình dựng lại ngay.'
          : 'Mỗi ô lưới dài 1 đơn vị. Kéo các điểm màu xanh để xem các số đo thay đổi ra sao.'}
      </p>
    </div>
  </div>

  <p
    class="rounded-lg p-3 text-sm {done
      ? built.ok
        ? 'bg-emerald-50 font-semibold text-emerald-900'
        : 'bg-rose-50 font-semibold text-rose-900'
      : 'bg-slate-50 text-slate-800'}"
    aria-live="polite"
  >
    {status}
  </p>
</div>
