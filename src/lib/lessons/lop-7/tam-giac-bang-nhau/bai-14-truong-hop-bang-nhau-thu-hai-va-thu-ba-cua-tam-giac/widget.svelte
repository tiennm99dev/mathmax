<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { degText } from '#lib/core/visuals/angle-math.js';
  import { labelAt, lenText, wedge } from '../_shared/triangle-math.js';
  import { build, isCase, measures } from './engine.js';

  const W = 400;
  const H = 280;
  const PAD = 34;
  const MAX_K = 40;
  const GIVEN = '#DB2777';
  const FILLS = ['#4F46E5', '#D97706'];

  let mode = $state(/** @type {import('./engine.js').Mode} */ ('cgc'));
  /** @type {import('./engine.js').Data} */
  let d = $state({ a: 5, b: 4, c: 3.5, A: 70, B: 35, C: 55 });

  const MODES = [
    { value: 'cgc', label: 'c.g.c' },
    { value: 'gcg', label: 'g.c.g' },
    { value: 'ccg', label: 'Hai cạnh, góc không xen giữa' },
    { value: 'ggg', label: 'Ba góc' },
  ];

  /** @param {string | number} v */
  function changeMode(v) {
    mode = v === 'gcg' || v === 'ccg' || v === 'ggg' ? v : 'cgc';
    if (mode === 'ccg') d = { ...d, B: 30, c: 6, b: 4 };
    if (mode === 'ggg') d = { ...d, A: 70, B: 50 };
    if (mode === 'gcg') d = { ...d, a: 5, B: 40, C: 60 };
    if (mode === 'cgc') d = { ...d, c: 3.5, A: 70, b: 4 };
  }

  const tris = $derived(build(mode, d));

  /** Fixed scale (cm to SVG units), shrunk only when the drawing would not fit. */
  const view = $derived.by(() => {
    const pts = tris.flatMap((t) => [t.A, t.B, t.C]);
    if (pts.length === 0) return null;
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const w = Math.max(...xs) - minX || 1;
    const h = Math.max(...ys) - minY || 1;
    const k = Math.min(MAX_K, (W - 2 * PAD) / w, (H - 2 * PAD) / h);
    const ox = (W - w * k) / 2;
    const oy = (H - h * k) / 2;
    /** @param {{ x: number, y: number }} p */
    const map = (p) => ({ x: ox + (p.x - minX) * k, y: oy + (p.y - minY) * k });
    return { k, shapes: tris.map((t) => ({ A: map(t.A), B: map(t.B), C: map(t.C) })) };
  });

  const ms = $derived(tris.map(measures));

  /** Which sides and angles are the given data, for highlighting. */
  const given = $derived(
    {
      cgc: { sides: ['AB', 'AC'], angles: ['A'] },
      gcg: { sides: ['BC'], angles: ['B', 'C'] },
      ccg: { sides: ['AB', 'AC'], angles: ['B'] },
      ggg: { sides: [], angles: ['A', 'B', 'C'] },
    }[mode],
  );

  /** Names of the vertices of the first and second triangle. */
  const NAMES = [
    { A: 'A', B: 'B', C: 'C' },
    { A: "A'", B: '', C: "C'" },
  ];
  const namesFor = $derived(
    mode === 'ccg' && tris.length === 2
      ? [
          { A: 'A', B: 'B', C: 'C₁' },
          { A: '', B: '', C: 'C₂' },
        ]
      : NAMES,
  );

  const feedback = $derived.by(() => {
    if (tris.length === 0) {
      if (mode === 'ccg')
        return 'Không dựng được tam giác: cạnh AC ngắn hơn khoảng cách từ A đến đường thẳng BC.';
      return 'Không dựng được tam giác: tổng hai góc đã cho phải nhỏ hơn 180°.';
    }
    const m = ms[0];
    if (mode === 'cgc')
      return `Biết hai cạnh AB, AC và góc xen giữa Â, chỉ dựng được đúng một tam giác: BC = ${lenText(m.a)} cm, B̂ = ${degText(m.B)}, Ĉ = ${degText(m.C)}. Mọi tam giác có cùng ba dữ kiện này đều bằng nhau (c.g.c).`;
    if (mode === 'gcg')
      return `Biết cạnh BC và hai góc kề B̂, Ĉ, chỉ dựng được đúng một tam giác: Â = ${degText(m.A)}, AB = ${lenText(m.c)} cm, AC = ${lenText(m.b)} cm. Mọi tam giác có cùng ba dữ kiện này đều bằng nhau (g.c.g).`;
    if (mode === 'ccg') {
      if (tris.length === 2)
        return `Có hai tam giác ABC₁ và ABC₂ khác nhau (BC₁ = ${lenText(ms[0].a)} cm, BC₂ = ${lenText(ms[1].a)} cm) cùng có AB, AC và B̂ như nhau. Hai cạnh và một góc không xen giữa chưa đủ để kết luận hai tam giác bằng nhau.`;
      if (d.b < d.c)
        return `Với số đo này chỉ có một tam giác (BC = ${lenText(m.a)} cm): AC vừa bằng khoảng cách từ A đến đường thẳng BC, tam giác vuông tại C. Tăng AC một chút (vẫn ngắn hơn AB) sẽ có hai tam giác. Vì vậy đây không phải là một trường hợp bằng nhau.`;
      return `Với số đo này chỉ có một tam giác (BC = ${lenText(m.a)} cm). Nhưng thử AC ngắn hơn AB: sẽ có hai tam giác. Vì vậy đây không phải là một trường hợp bằng nhau.`;
    }
    return `Hai tam giác ABC và A'BC' có ba góc bằng nhau (Â = ${degText(ms[0].A)}, B̂ = ${degText(ms[0].B)}, Ĉ = ${degText(ms[0].C)}) nhưng BC = ${lenText(ms[0].a)} cm, BC' = ${lenText(ms[1].a)} cm: chúng không bằng nhau. Ba góc không xác định độ lớn của tam giác.`;
  });

  /** @param {number} v */
  const cm = (v) => `${lenText(v)} cm`;
  /** @param {number} v */
  const deg = (v) => degText(v);
</script>

<div class="space-y-4">
  <SegmentedControl label="Dữ kiện đã cho" value={mode} onchange={changeMode} options={MODES} />

  <div class="grid gap-3 sm:grid-cols-3">
    {#if mode === 'cgc'}
      <SliderField label="AB" bind:value={d.c} min={2} max={6} step={0.5} format={cm} />
      <SliderField label="Góc A" bind:value={d.A} min={20} max={150} format={deg} />
      <SliderField label="AC" bind:value={d.b} min={2} max={6} step={0.5} format={cm} />
    {:else if mode === 'gcg'}
      <SliderField label="Góc B" bind:value={d.B} min={15} max={140} format={deg} />
      <SliderField label="BC" bind:value={d.a} min={3} max={8} step={0.5} format={cm} />
      <SliderField label="Góc C" bind:value={d.C} min={15} max={140} format={deg} />
    {:else if mode === 'ccg'}
      <SliderField label="Góc B" bind:value={d.B} min={20} max={80} format={deg} />
      <SliderField label="AB" bind:value={d.c} min={3} max={7} step={0.5} format={cm} />
      <SliderField label="AC" bind:value={d.b} min={1} max={7} step={0.5} format={cm} />
    {:else}
      <SliderField label="Góc A" bind:value={d.A} min={20} max={120} format={deg} />
      <SliderField label="Góc B" bind:value={d.B} min={20} max={120} format={deg} />
    {/if}
  </div>

  <GeometryBoard
    width={W}
    height={H}
    label="Các tam giác dựng được từ dữ kiện đã chọn; dữ kiện đã cho tô màu hồng"
  >
    {#if view}
      {#each view.shapes as s, i (i)}
        {@const names = namesFor[i]}
        <polygon
          points="{s.A.x},{s.A.y} {s.B.x},{s.B.y} {s.C.x},{s.C.y}"
          fill={FILLS[i]}
          fill-opacity="0.12"
          stroke={FILLS[i]}
          stroke-width="2"
          stroke-dasharray={i === 1 ? '7 4' : null}
          stroke-linejoin="round"
        />
        {#each given.angles as v (v)}
          {@const at = v === 'A' ? s.A : v === 'B' ? s.B : s.C}
          {@const p = v === 'A' ? s.B : s.A}
          {@const q = v === 'C' ? s.B : s.C}
          <path d={wedge(at, p, q, 22).path} fill={GIVEN} fill-opacity={i === 0 ? 0.35 : 0.2} />
        {/each}
        {#each given.sides as side (side)}
          {@const p = side === 'BC' ? s.B : s.A}
          {@const q = side === 'AB' ? s.B : s.C}
          <line
            x1={p.x}
            y1={p.y}
            x2={q.x}
            y2={q.y}
            stroke={GIVEN}
            stroke-width="4"
            stroke-opacity={i === 0 ? 1 : 0.5}
            stroke-linecap="round"
          />
        {/each}
        {#each ['A', 'B', 'C'] as v (v)}
          {@const name = names[/** @type {'A' | 'B' | 'C'} */ (v)]}
          {@const at = v === 'A' ? s.A : v === 'B' ? s.B : s.C}
          {#if name}
            {@const lp = labelAt(at, s.A, s.B, s.C, 16)}
            <text
              x={lp.x}
              y={lp.y}
              font-size="14"
              font-weight="700"
              fill="#111827"
              text-anchor="middle">{name}</text
            >
          {/if}
        {/each}
      {/each}
    {:else}
      <text x={W / 2} y={H / 2} font-size="15" fill="#9F1239" text-anchor="middle"
        >Không dựng được tam giác</text
      >
    {/if}
  </GeometryBoard>

  <p
    class="rounded-lg p-3 text-sm {isCase(mode)
      ? 'bg-emerald-50 text-emerald-900'
      : 'bg-amber-50 text-amber-900'}"
    aria-live="polite"
  >
    {feedback}
  </p>
</div>
