<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { viewPoint } from '#lib/geom-engine/solid.js';
  import {
    linePath,
    num,
    piText,
    rim,
    rimRuns,
    sectionRadius,
    sphereMeasures,
    unionPath,
  } from '../_shared/round-solids.js';

  /**
   * A sphere of radius R cut by a horizontal plane at distance d from its
   * centre O. The plane is dragged up and down (or moved with the arrow
   * keys); the cut is a circle with centre I and radius r = √(R² − d²),
   * read off the right triangle OIM. Through O the cut is a great circle
   * (hình tròn lớn) of radius R.
   */

  const W = 360;
  const H = 320;
  const UNIT = 24;
  const VIEW = { yaw: 0, pitch: 15 };
  const COS = Math.cos((VIEW.pitch * Math.PI) / 180);
  const CX = W / 2 - 24;
  const CY = H / 2;
  const STEP = 0.5;
  const CUT = '#0D9488';

  let R = $state(4);
  let d = $state(2);

  /** @param {{ x: number, y: number, z: number }} p */
  const at = (p) => {
    const v = viewPoint(p, VIEW);
    return { x: CX + UNIT * v.x, y: CY + UNIT * v.y };
  };

  const r = $derived(sectionRadius(R, d));
  const m = $derived(sphereMeasures(R));
  const edge = $derived(R + 1.2);
  const plane = $derived(
    unionPath([
      [
        { x: -edge, y: -edge, z: d },
        { x: edge, y: -edge, z: d },
        { x: edge, y: edge, z: d },
        { x: -edge, y: edge, z: d },
      ].map(at),
    ]),
  );
  const equator = $derived(rimRuns(rim(R, 0, 0, 360, 96), VIEW));
  const section = $derived(r > 1e-9 ? rim(r, d, 0, 360, 96).map(at) : []);
  const O = $derived(at({ x: 0, y: 0, z: 0 }));
  const I = $derived(at({ x: 0, y: 0, z: d }));
  const M = $derived(at({ x: r, y: 0, z: d }));
  const handle = $derived(at({ x: edge, y: 0, z: d }));

  /** @param {number} v */
  function setD(v) {
    const next = Math.max(-R, Math.min(R, Math.round(v / STEP) * STEP));
    if (next !== d) d = next;
  }

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };
  const drag = {
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => setD((CY - scratch.y) / (UNIT * COS)),
    /** @param {number} _dx @param {number} dy @param {boolean} big */
    onKeyMove: (_dx, dy, big) => setD(d - dy * STEP * (big ? 2 : 1)),
  };

  const feedback = $derived.by(() => {
    if (Math.abs(d) >= R) {
      return `Mặt phẳng cách tâm O đúng d = R = ${num(R)} cm: nó chỉ chạm mặt cầu tại một điểm, không cắt ra hình tròn nào. Kéo mặt phẳng vào gần tâm hơn.`;
    }
    if (d === 0) {
      return `Mặt phẳng đi qua tâm O: mặt cắt là một hình tròn lớn, có tâm O và bán kính bằng bán kính hình cầu, r = R = ${num(R)} cm. Diện tích hình tròn lớn: πR² = ${piText(R * R)} ≈ ${num(Math.PI * R * R)} cm². Đường tròn biên của nó là một đường tròn lớn của mặt cầu.`;
    }
    const r2 = R * R - d * d;
    const exact = Math.abs(r - Math.round(r)) < 1e-9;
    return `Mặt cắt là hình tròn tâm I, bán kính r = IM. Tam giác OIM vuông tại I có cạnh huyền OM = R: $r^2 = R^2 - d^2$ = ${num(R)}² − ${num(Math.abs(d))}² = ${num(r2, 2)}, nên r ${exact ? '=' : '≈'} ${num(r, 2)} cm. Diện tích mặt cắt: πr² ≈ ${num(Math.PI * r2)} cm², nhỏ hơn hình tròn lớn (≈ ${num(Math.PI * R * R)} cm²). Mặt phẳng càng xa tâm, hình tròn cắt càng nhỏ.`;
  });
</script>

<div class="space-y-4">
  <div class="rounded-xl border border-slate-200 bg-white">
    <svg bind:this={svgEl} viewBox="0 0 {W} {H}" class="block h-auto w-full touch-none select-none">
      <title>Hình cầu tâm O bán kính {num(R)} cm bị cắt bởi một mặt phẳng</title>
      <circle cx={O.x} cy={O.y} r={R * UNIT} fill="#E0F2FE" fill-opacity="0.6" />
      {#each equator.filter((run) => !run.front) as run, i (i)}
        <path
          d={linePath(run.pts.map(at))}
          fill="none"
          stroke="#64748B"
          stroke-width="1.2"
          stroke-dasharray="5 4"
        />
      {/each}
      <path d={plane} fill="#94A3B8" fill-opacity="0.18" stroke="#64748B" stroke-width="1" />
      {#if section.length}
        <path
          d={unionPath([section])}
          fill={CUT}
          fill-opacity={d === 0 ? 0.45 : 0.32}
          stroke={CUT}
          stroke-width="2.5"
        />
      {/if}
      {#each equator.filter((run) => run.front) as run, i (i)}
        <path d={linePath(run.pts.map(at))} fill="none" stroke="#64748B" stroke-width="1.2" />
      {/each}
      <circle cx={O.x} cy={O.y} r={R * UNIT} fill="none" stroke="#0F172A" stroke-width="2" />
      <line x1={O.x} y1={O.y} x2={I.x} y2={I.y} stroke="#DC2626" stroke-width="2.5" />
      {#if r > 1e-9}
        <line x1={I.x} y1={I.y} x2={M.x} y2={M.y} stroke={CUT} stroke-width="3" />
        <line x1={O.x} y1={O.y} x2={M.x} y2={M.y} stroke="#4F46E5" stroke-width="2.5" />
        <circle cx={M.x} cy={M.y} r="3.5" fill="#4F46E5" />
        {#if d === 0}
          <text
            x={(O.x + M.x) / 2}
            y={O.y - 8}
            text-anchor="middle"
            font-size="13"
            font-weight="700"
            fill="#4F46E5">r = R</text
          >
        {:else}
          <text
            x={(O.x + M.x) / 2 + 4}
            y={(O.y + M.y) / 2 + (d > 0 ? 16 : -8)}
            font-size="13"
            font-weight="700"
            fill="#4F46E5">R</text
          >
          <text
            x={(I.x + M.x) / 2}
            y={I.y + (d > 0 ? -8 : 16)}
            text-anchor="middle"
            font-size="13"
            font-weight="700"
            fill={CUT}>r</text
          >
        {/if}
        <text
          x={M.x + 4}
          y={M.y + (d >= 0 ? 18 : -10)}
          font-size="14"
          font-weight="700"
          fill="#0F172A"
          paint-order="stroke"
          stroke="#FFFFFF"
          stroke-width="3">M</text
        >
      {/if}
      {#if d !== 0}
        <text
          x={O.x - 8}
          y={(O.y + I.y) / 2 + 4}
          text-anchor="end"
          font-size="13"
          font-weight="700"
          fill="#DC2626">d</text
        >
        <text
          x={I.x - 8}
          y={I.y + (d > 0 ? -6 : 14)}
          text-anchor="end"
          font-size="14"
          font-weight="700"
          fill="#0F172A"
          paint-order="stroke"
          stroke="#FFFFFF"
          stroke-width="3">I</text
        >
      {/if}
      <circle cx={O.x} cy={O.y} r="3.5" fill="#0F172A" />
      <text
        x={O.x - 8}
        y={O.y + (d > 0 ? 16 : d < 0 ? -8 : 16)}
        text-anchor="end"
        font-size="14"
        font-weight="700"
        fill="#0F172A"
        paint-order="stroke"
        stroke="#FFFFFF"
        stroke-width="3">O</text
      >
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Mặt phẳng cắt. Kéo lên xuống hoặc dùng phím mũi tên lên, xuống"
        aria-valuemin={-R}
        aria-valuemax={R}
        aria-valuenow={d}
        aria-valuetext="Cách tâm {num(Math.abs(d))} cm, {d > 0
          ? 'phía trên'
          : d < 0
            ? 'phía dưới'
            : 'đi qua tâm'}"
        style="cursor:grab; outline:none"
        use:draggable={drag}
      >
        <circle
          class="drag-knob"
          cx={handle.x}
          cy={handle.y}
          r="11"
          fill="#4F46E5"
          stroke="#FFFFFF"
          stroke-width="2"
        />
        <path
          d="M{handle.x - 4} {handle.y - 3}l4 -5l4 5M{handle.x - 4} {handle.y + 3}l4 5l4 -5"
          fill="none"
          stroke="#FFFFFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  </div>

  <SliderField
    label="Bán kính hình cầu R"
    bind:value={R}
    min={2}
    max={5}
    unit="cm"
    oninput={() => setD(d)}
  />

  <dl class="grid grid-cols-1 gap-2 text-sm tabular-nums sm:grid-cols-3">
    <div class="rounded-lg bg-teal-50 p-2">
      <dt class="text-teal-800">Mặt cắt: r = √(R² − d²)</dt>
      <dd class="font-semibold">
        r {Math.abs(r - Math.round(r)) < 1e-9 ? '=' : '≈'}
        {num(r, 2)} cm (d = {num(d)} cm)
      </dd>
    </div>
    <div class="rounded-lg bg-indigo-50 p-2">
      <dt class="text-indigo-800">S = 4πR²</dt>
      <dd class="font-semibold">{piText(m.k.area)} ≈ {num(m.area)} cm²</dd>
    </div>
    <div class="rounded-lg bg-sky-50 p-2">
      <dt class="text-sky-800">V = ⁴⁄₃πR³</dt>
      <dd class="font-semibold">{piText(m.k.volume)} ≈ {num(m.volume)} cm³</dd>
    </div>
  </dl>

  <p class="rounded-lg bg-teal-50 p-3 text-sm text-teal-950" aria-live="polite">
    <LiveRichText text={feedback} />
  </p>
</div>
