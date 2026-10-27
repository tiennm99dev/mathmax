<script>
  import Tex from '#lib/components/tex.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { arcPath, along, bisectorDir, directionTo } from '#lib/core/visuals/angle-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { quadAngles, splittingSide } from '#lib/geom-engine/plane.js';
  import { roundToTotal } from '#lib/core/number-format.js';
  import { splitAlongDiagonal } from '../_shared/quad.js';

  const W = 400;
  const H = 300;
  const NAMES = ['A', 'B', 'C', 'D'];
  const START = [
    { x: 90, y: 70 },
    { x: 300, y: 50 },
    { x: 340, y: 240 },
    { x: 60, y: 220 },
  ];
  const TRI1 = '#1B998B';
  const TRI2 = '#F46036';

  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  let pts = $state(START.map((p) => ({ ...p })));
  let split = $state('none');
  let announcement = $state('');
  /** @type {ReturnType<typeof setTimeout> | null} */ let timer = null;

  // A vertex this close to the line through a side counts as on it.
  const side = $derived(splittingSide(pts, 400));
  const convex = $derived(side === -1);
  const shown = $derived(roundToTotal(quadAngles(pts), 360));
  const i0 = $derived(split === 'BD' ? 1 : 0);
  const parts = $derived(splitAlongDiagonal(pts, shown, /** @type {0 | 1} */ (i0)));

  /** @param {number} d */
  const deg = (d) => `${d}^\\circ`;
  /** @param {number} i */
  const hat = (i) => `\\widehat{${NAMES[i]}}`;

  const sumTex = $derived(
    `${[0, 1, 2, 3].map(hat).join(' + ')} = ${shown.map(deg).join(' + ')} = 360^\\circ`,
  );
  const sumLabel = $derived(`Tổng bốn góc: ${shown.join(' + ')} = 360 độ`);

  /** Triangle rows for the chosen diagonal: names and the three printed angles. */
  const triangles = $derived.by(() => {
    const i = i0;
    const P = NAMES[i];
    const Q = NAMES[i + 1];
    const R = NAMES[i + 2];
    const S = NAMES[(i + 3) % 4];
    return [
      { name: `${P}${Q}${R}`, angles: [parts.p[0], shown[i + 1], parts.r[0]], color: TRI1 },
      { name: `${P}${R}${S}`, angles: [parts.p[1], shown[(i + 3) % 4], parts.r[1]], color: TRI2 },
    ];
  });

  const splitTex = $derived.by(() => {
    const i = i0;
    const j = i + 2;
    const p = parts.p;
    const r = parts.r;
    return `${hat(i)} + ${hat(j)} = (${deg(p[0])} + ${deg(p[1])}) + (${deg(r[0])} + ${deg(r[1])})`;
  });

  const feedback = $derived.by(() => {
    if (!convex) {
      const a = NAMES[side];
      const b = NAMES[(side + 1) % 4];
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Không phải tứ giác lồi: hai đỉnh ${NAMES[(side + 2) % 4]}, ${NAMES[(side + 3) % 4]} không cùng nằm về một phía của đường thẳng ${a}${b} (hoặc có đỉnh nằm trên nó). Kéo các đỉnh để được tứ giác lồi.`,
      };
    }
    if (split === 'none') {
      return {
        tone: /** @type {const} */ ('info'),
        text: `ABCD là tứ giác lồi. Tổng bốn góc là ${shown.join('° + ')}° = 360°. Chọn một đường chéo để xem vì sao.`,
      };
    }
    const [t1, t2] = triangles;
    return {
      tone: /** @type {const} */ ('ok'),
      text: `Đường chéo chia tứ giác thành tam giác ${t1.name} và tam giác ${t2.name}. Mỗi tam giác có tổng ba góc 180°, nên tổng các góc của tứ giác là 180° + 180° = 360°.`,
    };
  });

  /** @param {number} i */
  const dragOf = (i) => ({
    point: pts[i],
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 20,
    keyStep: 2,
    keyShiftStep: 10,
    onChange: () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        announcement = convex
          ? `Góc A ${shown[0]} độ, góc B ${shown[1]} độ, góc C ${shown[2]} độ, góc D ${shown[3]} độ. Tổng 360 độ.`
          : 'Tứ giác không lồi.';
      }, 300);
    },
  });

  /** @param {number} i */
  const near = (i) => pts[(i + 3) % 4];
  /** @param {number} i */
  const next = (i) => pts[(i + 1) % 4];
  /** @param {number} i */
  const dirs = (i) => [directionTo(pts[i], near(i)), directionTo(pts[i], next(i))];
  /** Where a vertex name goes: just outside the quadrilateral. @param {number} i */
  const nameAt = (i) => {
    const [a, b] = dirs(i);
    return along(pts[i], 24, bisectorDir(a, b) + 180);
  };
  /** @param {number} i */
  const labelAt = (i) => {
    const [a, b] = dirs(i);
    return along(pts[i], 44, bisectorDir(a, b));
  };

  function reset() {
    pts = START.map((p) => ({ ...p }));
    split = 'none';
    announcement = 'Đã đặt lại tứ giác.';
  }
</script>

<div class="space-y-4">
  <div aria-live="polite" aria-atomic="true" class="sr-only">{announcement}</div>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-lg"
    label="Tứ giác ABCD với bốn đỉnh kéo được"
  >
    {#if convex && split !== 'none'}
      {@const i = i0}
      <polygon
        points={pointsAttr([pts[i], pts[i + 1], pts[i + 2]])}
        fill={TRI1}
        fill-opacity="0.18"
      />
      <polygon
        points={pointsAttr([pts[i], pts[i + 2], pts[(i + 3) % 4]])}
        fill={TRI2}
        fill-opacity="0.18"
      />
      <line
        x1={pts[i].x}
        y1={pts[i].y}
        x2={pts[i + 2].x}
        y2={pts[i + 2].y}
        stroke="#475569"
        stroke-width="2"
        stroke-dasharray="6 5"
      />
    {:else}
      <polygon points={pointsAttr(pts)} fill={convex ? '#6366F1' : '#F59E0B'} fill-opacity="0.1" />
    {/if}
    <polygon points={pointsAttr(pts)} fill="none" stroke="#1F2937" stroke-width="2.5" />

    {#if convex}
      {#each pts as p, i (i)}
        {@const [a, b] = dirs(i)}
        {@const at = labelAt(i)}
        <path d={arcPath(p, a, b, 22)} fill="none" stroke="#4F46E5" stroke-width="2" />
        <text
          x={at.x}
          y={at.y + 5}
          text-anchor="middle"
          font-size="13"
          font-weight="600"
          fill="#3730A3">{shown[i]}°</text
        >
      {/each}
    {/if}

    {#each NAMES as name, i (name)}
      {@const at = nameAt(i)}
      <DragPoint
        drag={dragOf(i)}
        r={10}
        color="#4F46E5"
        label="Đỉnh {name}: kéo hoặc dùng phím mũi tên để di chuyển"
      />
      <text
        x={at.x}
        y={at.y + 5}
        text-anchor="middle"
        font-size="15"
        font-weight="700"
        fill="#1F2937"
        pointer-events="none">{name}</text
      >
    {/each}
  </GeometryBoard>

  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Chia tứ giác bằng đường chéo"
      options={[
        { value: 'none', label: 'Không chia' },
        { value: 'AC', label: 'Đường chéo AC' },
        { value: 'BD', label: 'Đường chéo BD' },
      ]}
      bind:value={split}
    />
    <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  {#if convex}
    <div
      class="space-y-2 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm"
    >
      {#if split !== 'none'}
        {#each triangles as t (t.name)}
          <p>
            <span class="font-semibold" style:color={t.color}>Tam giác {t.name}:</span>
            <Tex
              math={`${t.angles.map(deg).join(' + ')} = 180^\\circ`}
              ariaLabel={`${t.angles.join(' + ')} = 180 độ`}
            />
          </p>
        {/each}
        <p>
          <Tex
            math={splitTex}
            ariaLabel="Hai góc bị đường chéo chia đôi bằng tổng các phần của chúng"
          />
        </p>
      {/if}
      <p><Tex math={sumTex} ariaLabel={sumLabel} /></p>
    </div>
  {/if}
</div>
