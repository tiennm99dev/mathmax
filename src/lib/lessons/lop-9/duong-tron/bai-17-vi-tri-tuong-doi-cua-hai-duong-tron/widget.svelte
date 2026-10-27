<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { dist } from '#lib/geom-engine/plane.js';
  import { fromSvg, toSvg, wrapDeg } from '../_shared/polar.js';
  import { COMMON, WORDS, chordFoot, len, relation, sentence } from './engine.js';

  // Circle (O; 3 cm) stays put; the learner drags the centre O′ of the
  // circle (O′; r) and picks r < R. One centimetre is U units.
  const W = 340;
  const H = 330;
  const U = 18;
  const O = { x: W / 2, y: H / 2 };
  const R = 30; // tenths of a cm
  const D_MAX = 65;

  const COLORS = {
    cat: '#2563eb',
    'tiep-xuc-ngoai': '#059669',
    'tiep-xuc-trong': '#059669',
    'ngoai-nhau': '#e11d48',
    'dung-nhau': '#d97706',
    'dong-tam': '#d97706',
  };

  let d = $state(45);
  let dir = $state(20);
  let rCm = $state(2);
  const r = $derived(Math.round(rCm * 10));

  const rel = $derived(relation(d, R, r));
  const o2 = $derived(toSvg(O, U, d / 10, dir));
  const foot = $derived(chordFoot(d / 10, R / 10, r / 10));
  const common = $derived.by(() => {
    if (!foot) return [];
    const h = toSvg(O, U, foot.a, dir);
    if (foot.h < 1e-6) return [{ p: h, name: 'A' }];
    return [
      { p: toSvg(h, U, foot.h, dir + 90), name: 'A' },
      { p: toSvg(h, U, foot.h, dir - 90), name: 'B' },
    ];
  });
  // The O′ label goes beside O′ on the side farthest from the common points,
  // so it never sits on A or B.
  const labelO2 = $derived.by(() => {
    if (d === 0) return { x: O.x + 18, y: O.y - 14 };
    const spots = [dir - 90, dir + 90, dir].map((deg) => toSvg(o2, U, 1.1, deg));
    const room = (/** @type {{ x: number, y: number }} */ s) =>
      Math.min(Infinity, ...common.map((q) => dist(s, q.p)));
    return spots.reduce((best, s) => (room(s) > room(best) + 1 ? s : best));
  });
  const labelO = $derived(d > 0 ? toSvg(O, U, 0.7, dir + 180) : { x: O.x - 14, y: O.y + 14 });

  /**
   * Snaps a distance (tenths) onto 0, R − r or R + r when a finger lands
   * within 1,5 tenths of it, so tangency can be reached exactly.
   * @param {number} cm
   */
  function snapDist(cm) {
    const raw = cm * 10;
    for (const m of [0, R - r, R + r]) if (Math.abs(raw - m) < 1.5) return m;
    return Math.max(0, Math.min(D_MAX, Math.round(raw)));
  }

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const dragOpts = $derived({
    point: { ...o2 },
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      const q = fromSvg(O, U, p);
      d = snapDist(q.dist);
      if (d > 0) dir = wrapDeg(q.deg);
      return toSvg(O, U, d / 10, dir);
    },
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy, big = false) => {
      if (dy) d = Math.max(0, Math.min(D_MAX, d - dy * (big ? 5 : 1)));
      else dir = wrapDeg(dir - dx * (big ? 15 : 5));
    },
  });

  // Distance strip: 0 to D_MAX tenths along a line, zones split at R − r and R + r.
  const SX0 = 16;
  const SX1 = W - 16;
  const sx = (/** @type {number} */ t) => SX0 + ((SX1 - SX0) * t) / D_MAX;
  const ZONES = $derived([
    { from: 0, to: R - r, color: COLORS['dung-nhau'], label: 'đựng nhau' },
    { from: R - r, to: R + r, color: COLORS.cat, label: 'cắt nhau' },
    { from: R + r, to: D_MAX, color: COLORS['ngoai-nhau'], label: 'ngoài nhau' },
  ]);

  const sign = $derived(
    rel === 'cat'
      ? 'R − r < d < R + r'
      : rel === 'tiep-xuc-ngoai'
        ? 'd = R + r'
        : rel === 'tiep-xuc-trong'
          ? 'd = R − r'
          : rel === 'ngoai-nhau'
            ? 'd > R + r'
            : rel === 'dung-nhau'
              ? 'd < R − r'
              : 'd = 0',
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 md:grid-cols-[3fr_2fr]">
    <div class="space-y-2">
      <svg
        bind:this={svgEl}
        viewBox="0 0 {W} {H}"
        class="block w-full touch-none select-none overflow-hidden rounded-lg border border-slate-200 bg-white"
        role="group"
        aria-label={`Đường tròn (O; 3 cm) và đường tròn (O′; ${len(r)} cm), đoạn nối tâm ${len(d)} cm. Kéo tâm O′ để dời đường tròn nhỏ.`}
      >
        <circle
          cx={O.x}
          cy={O.y}
          r={(R / 10) * U}
          fill="#f8fafc"
          stroke="#334155"
          stroke-width="2.5"
        />
        <circle
          cx={o2.x}
          cy={o2.y}
          r={(r / 10) * U}
          fill={COLORS[rel]}
          fill-opacity="0.08"
          stroke={COLORS[rel]}
          stroke-width="2.5"
        />
        {#if d > 0}
          <line
            x1={O.x}
            y1={O.y}
            x2={o2.x}
            y2={o2.y}
            stroke="#7c3aed"
            stroke-width="2"
            stroke-dasharray="5 4"
          />
        {/if}
        {#if common.length === 2}
          <line
            x1={common[0].p.x}
            y1={common[0].p.y}
            x2={common[1].p.x}
            y2={common[1].p.y}
            stroke={COLORS.cat}
            stroke-width="2"
          />
        {/if}
        {#each common as q (q.name)}
          {@const lab = toSvg(q.p, U, 0.75, q.name === 'B' ? dir - 90 : dir + 90)}
          <circle cx={q.p.x} cy={q.p.y} r="5" fill={COLORS[rel]} />
          <text
            x={lab.x}
            y={lab.y + 5}
            text-anchor="middle"
            font-size="14"
            font-weight="700"
            fill={COLORS[rel]}>{q.name}</text
          >
        {/each}
        <circle cx={O.x} cy={O.y} r="4" fill="#0f172a" />
        <text
          x={labelO.x}
          y={labelO.y + 5}
          text-anchor="middle"
          font-size="14"
          font-weight="700"
          fill="#0f172a">O</text
        >
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Tâm O′. Mũi tên lên, xuống đổi đoạn nối tâm d; trái, phải quay quanh O"
          aria-valuemin={0}
          aria-valuemax={D_MAX / 10}
          aria-valuenow={d / 10}
          aria-valuetext={`d = ${len(d)} cm, ${WORDS[rel].toLowerCase()}`}
          style="cursor:grab; outline:none"
          use:draggable={dragOpts}
        >
          <circle
            class="drag-knob"
            cx={o2.x}
            cy={o2.y}
            r="8"
            fill={COLORS[rel]}
            stroke="#fff"
            stroke-width="2"
          />
        </g>
        <text
          x={labelO2.x}
          y={labelO2.y + 5}
          text-anchor="middle"
          font-size="14"
          font-weight="700"
          fill={COLORS[rel]}>O′</text
        >
      </svg>

      <svg
        viewBox="0 0 {W} 64"
        class="block w-full select-none"
        role="img"
        aria-label={`Trục đo d từ 0 đến ${len(D_MAX)} cm: R − r = ${len(R - r)} cm, R + r = ${len(R + r)} cm, d = ${len(d)} cm.`}
      >
        {#each ZONES as z (z.label)}
          {#if z.to > z.from}
            <rect
              x={sx(z.from)}
              y="18"
              width={sx(z.to) - sx(z.from)}
              height="10"
              fill={z.color}
              fill-opacity="0.25"
            />
            {#if sx(z.to) - sx(z.from) > 64}
              <text
                x={(sx(z.from) + sx(z.to)) / 2}
                y="12"
                text-anchor="middle"
                font-size="11"
                fill={z.color}>{z.label}</text
              >
            {/if}
          {/if}
        {/each}
        {#each [{ t: R - r, n: 'R − r' }, { t: R + r, n: 'R + r' }] as m (m.n)}
          <line x1={sx(m.t)} y1="14" x2={sx(m.t)} y2="32" stroke="#059669" stroke-width="2.5" />
          <text x={sx(m.t)} y="58" text-anchor="middle" font-size="11" fill="#059669"
            >{len(m.t)}</text
          >
        {/each}
        <path d="M {sx(d)} 29 l -6 11 h 12 z" fill={COLORS[rel]} stroke="#fff" />
        <text
          x={sx(d) + 10}
          y="42"
          text-anchor="start"
          font-size="11"
          font-weight="700"
          fill={COLORS[rel]}>d</text
        >
      </svg>
    </div>

    <div class="space-y-3">
      <SliderField
        label="Bán kính r của (O′)"
        bind:value={rCm}
        min={0.5}
        max={2.5}
        step={0.5}
        unit="cm"
        format={(v) => formatNumber(v, 1)}
      />
      <table class="w-full text-sm tabular-nums">
        <caption class="sr-only">So sánh đoạn nối tâm d với R + r và R − r</caption>
        <tbody>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">d = OO′</th>
            <td class="py-1.5 text-right font-semibold" style="color:{COLORS[rel]}">{len(d)} cm</td>
          </tr>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">R + r</th>
            <td class="py-1.5 text-right font-semibold text-slate-900">{len(R + r)} cm</td>
          </tr>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">R − r</th>
            <td class="py-1.5 text-right font-semibold text-slate-900">{len(R - r)} cm</td>
          </tr>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">Vị trí</th>
            <td class="py-1.5 text-right font-semibold" style="color:{COLORS[rel]}"
              >{WORDS[rel]} ({sign})</td
            >
          </tr>
          <tr>
            <th scope="row" class="py-1.5 text-left font-semibold text-slate-700">Số điểm chung</th>
            <td class="py-1.5 text-right font-semibold" style="color:{COLORS[rel]}"
              >{COMMON[rel]}</td
            >
          </tr>
        </tbody>
      </table>
      <p class="text-sm text-slate-600">
        R = 3 cm. Thử kéo O′ đến đúng vạch R + r rồi R − r trên trục: hai đường tròn chỉ còn chạm
        nhau tại một điểm nằm trên đường nối tâm.
      </p>
    </div>
  </div>

  <FeedbackNote
    tone={rel === 'tiep-xuc-ngoai' || rel === 'tiep-xuc-trong' ? 'ok' : 'info'}
    text={sentence(d, R, r)}
  />
</div>
