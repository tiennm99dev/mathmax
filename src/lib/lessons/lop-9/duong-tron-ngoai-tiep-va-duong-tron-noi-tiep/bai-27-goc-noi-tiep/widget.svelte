<script>
  import { formatFixed } from '#lib/core/number-format.js';
  import {
    circle,
    pointOnCircle,
    projectToCircle,
    angleAtVertex,
    subtendedArc,
  } from '#lib/geom-engine/circle.js';
  import { dist, EPSILON_LEN } from '#lib/geom-engine/vec.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';

  const VIEW = 400;
  const C = circle(VIEW / 2, VIEW / 2, 150);
  const A = pointOnCircle(C, 150);
  const B = pointOnCircle(C, 30);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  let M = $state(pointOnCircle(C, 270));

  const inscribed = $derived(angleAtVertex(A, M, B));

  // The arc AB that M does NOT sit on — the arc ∠AMB actually subtends. It is
  // the major arc (> 180°) whenever M is on the minor arc, which is why the
  // fixed central angle ∠AOB alone does not describe the relationship.
  const arc = $derived(subtendedArc(C, A, B, M));

  // ∠AMB degenerates when M reaches either endpoint of the chord.
  const atEndpoint = $derived(dist(M, A) < EPSILON_LEN || dist(M, B) < EPSILON_LEN);

  /** @param {{x: number, y: number}} p */
  const projector = (p) => projectToCircle(p, C);
  const dragOpts = $derived({
    point: M,
    svg: () => svgEl ?? null,
    viewBox: { w: VIEW, h: VIEW },
    projector,
    pad: 0,
  });
</script>

<div class="space-y-4">
  <div class="text-sm tabular-nums" aria-live="polite">
    {#if atEndpoint}
      <p class="text-slate-500">Chưa xác định: M đang trùng với A hoặc B</p>
    {:else}
      <div class="flex items-baseline justify-between gap-3">
        <span
          ><strong style="color:#D7263D">Góc nội tiếp ∠AMB:</strong>
          {formatFixed(inscribed, 1)}°</span
        >
        <span><strong style="color:#1B998B">Cung bị chắn AB:</strong> {formatFixed(arc, 1)}°</span>
      </div>
      <p class="mt-1 text-slate-600">
        Góc nội tiếp = nửa cung bị chắn: {formatFixed(inscribed, 1)}° = {formatFixed(arc, 1)}° / 2
      </p>
    {/if}
  </div>

  <div>
    <GeometryBoard
      bind:svgEl
      width={VIEW}
      height={VIEW}
      interactive
      maxWidth="max-w-md"
      label="Kéo điểm M (đỏ) quanh đường tròn hoặc dùng phím mũi tên"
    >
      <circle
        cx={C.center.x}
        cy={C.center.y}
        r={C.radius}
        fill="none"
        stroke="#999"
        stroke-width="2"
      />

      <line
        x1={C.center.x}
        y1={C.center.y}
        x2={A.x}
        y2={A.y}
        stroke="#D0D0D0"
        stroke-width="1"
        stroke-dasharray="4 4"
      />
      <line
        x1={C.center.x}
        y1={C.center.y}
        x2={B.x}
        y2={B.y}
        stroke="#D0D0D0"
        stroke-width="1"
        stroke-dasharray="4 4"
      />

      <line x1={A.x} y1={A.y} x2={M.x} y2={M.y} stroke="#444" stroke-width="2" />
      <line x1={B.x} y1={B.y} x2={M.x} y2={M.y} stroke="#444" stroke-width="2" />

      <circle cx={C.center.x} cy={C.center.y} r="3" fill="#888" />
      <text x={C.center.x + 8} y={C.center.y - 2} font-size="14" fill="#888">O</text>

      <circle cx={A.x} cy={A.y} r="6" fill="#1B998B" />
      <text x={A.x - 18} y={A.y + 18} font-size="14" font-weight="700" fill="#1B998B">A</text>

      <circle cx={B.x} cy={B.y} r="6" fill="#1B998B" />
      <text x={B.x + 10} y={B.y + 18} font-size="14" font-weight="700" fill="#1B998B">B</text>

      <DragPoint
        drag={dragOpts}
        r={14}
        color="#D7263D"
        name="M"
        nameDy={-8}
        nameColor="#D7263D"
        label="Điểm M trên đường tròn — kéo hoặc dùng phím mũi tên"
      />
    </GeometryBoard>
    <p class="mt-2 text-center text-sm text-slate-500">
      Kéo điểm M (đỏ) quanh đường tròn hoặc dùng phím mũi tên
    </p>
  </div>
</div>
