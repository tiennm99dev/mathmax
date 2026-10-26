<script>
  import { button } from '#lib/core/ui.js';
  import { fmt } from '#lib/core/number-format.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { along, directionTo } from '#lib/core/visuals/angle-math.js';
  import { lineDir } from '../_shared/transversal.js';
  import { TILT, meetLine, record } from './engine.js';

  const W = 400;
  const H = 300;
  const M = { x: 200, y: 95 };
  const LINE_Y = 235;
  const HANDLE = 110;
  const FAR = 900;

  let phi = $state(25);
  let P = $state(along(M, HANDLE, 25));
  /** @type {number[]} */
  let tried = $state([]);
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const meet = $derived(meetLine(M, LINE_Y, phi));
  const inside = $derived(!meet.parallel && meet.N.x > 6 && meet.N.x < W - 6);
  const parallelFound = $derived(tried.includes(0));
  const crossing = $derived(tried.filter((t) => t !== 0).length);

  /** @param {number} next */
  function setPhi(next) {
    phi = Math.max(-TILT, Math.min(TILT, next));
    P = along(M, HANDLE, phi);
  }

  const drag = $derived({
    point: P,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => along(M, HANDLE, lineDir(directionTo(M, p), TILT)),
    onChange: () => {
      phi = lineDir(directionTo(M, P), TILT);
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setPhi(phi + (dx < 0 || dy < 0 ? 1 : -1) * (big ? 10 : 1)),
  });

  const status = $derived.by(() => {
    if (meet.parallel)
      return 'Đường thẳng qua M này không cắt a dù kéo dài bao xa: nó song song với a.';
    const d = fmt(Math.round(meet.dist));
    if (inside)
      return `Đường thẳng này cắt a tại N, cách chân đường vuông góc H khoảng ${d} đơn vị.`;
    return `Đường thẳng này vẫn cắt a, nhưng ở ngoài khung hình: giao điểm cách H khoảng ${d} đơn vị. Nghiêng càng ít, giao điểm càng xa.`;
  });

  const summary = $derived.by(() => {
    if (tried.length === 0) return 'Chưa ghi lại đường thẳng nào.';
    const head = `Đã ghi ${tried.length} đường thẳng qua M: ${crossing} đường cắt a`;
    return parallelFound
      ? `${head}, đúng 1 đường không cắt a. Mọi đường khác qua M đều cắt a: qua M chỉ có một đường thẳng song song với a.`
      : `${head}, chưa có đường nào song song với a. Hãy tìm đường thẳng qua M không cắt a.`;
  });

  const ends = $derived([along(M, FAR, phi + 180), along(M, FAR, phi)]);
</script>

<div class="space-y-4">
  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Điểm M nằm ngoài đường thẳng a; một đường thẳng qua M xoay được"
  >
    {#each tried as t (t)}
      {@const e = [along(M, FAR, t + 180), along(M, FAR, t)]}
      <line
        x1={e[0].x}
        y1={e[0].y}
        x2={e[1].x}
        y2={e[1].y}
        stroke={t === 0 ? '#059669' : '#94A3B8'}
        stroke-width="1.2"
        stroke-dasharray="4 4"
      />
    {/each}
    <line x1="0" y1={LINE_Y} x2={W} y2={LINE_Y} stroke="#1F2937" stroke-width="2.5" />
    <text x={W - 22} y={LINE_Y - 8} font-size="15" font-style="italic" font-weight="700">a</text>
    <line
      x1={M.x}
      y1={M.y}
      x2={M.x}
      y2={LINE_Y}
      stroke="#CBD5E1"
      stroke-width="1"
      stroke-dasharray="3 3"
    />
    <text x={M.x + 6} y={LINE_Y + 18} font-size="13" fill="#64748B">H</text>
    <line
      x1={ends[0].x}
      y1={ends[0].y}
      x2={ends[1].x}
      y2={ends[1].y}
      stroke={meet.parallel ? '#059669' : '#4F46E5'}
      stroke-width="2.5"
    />
    {#if inside && !meet.parallel}
      <circle cx={meet.N.x} cy={meet.N.y} r="5" fill="#DC2626" />
      <text x={meet.N.x - 5} y={meet.N.y + 22} font-size="14" font-weight="700" fill="#DC2626"
        >N</text
      >
    {/if}
    <circle cx={M.x} cy={M.y} r="4" fill="#1F2937" />
    <text x={M.x - 8} y={M.y - 10} font-size="14" font-weight="700">M</text>
    <DragPoint
      {drag}
      r={10}
      color={meet.parallel ? '#059669' : '#4F46E5'}
      label="Điểm trên đường thẳng qua M: kéo hoặc dùng phím mũi tên để xoay đường thẳng, mỗi bước 1 độ, giữ Shift để bước 10 độ"
    />
  </GeometryBoard>

  <p
    class="rounded-lg border p-3 text-sm {meet.parallel
      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
      : 'border-slate-200 bg-slate-50 text-slate-800'}"
    aria-live="polite"
  >
    Độ nghiêng của đường thẳng qua M so với a: {Math.abs(phi)}°. {status}
  </p>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => (tried = record(tried, phi))}
      >Ghi lại đường thẳng này</button
    >
    <button type="button" class={button.quiet} onclick={() => (tried = [])}
      >Xoá các đường đã ghi</button
    >
  </div>
  <p class="text-sm text-slate-700" aria-live="polite">{summary}</p>
</div>
