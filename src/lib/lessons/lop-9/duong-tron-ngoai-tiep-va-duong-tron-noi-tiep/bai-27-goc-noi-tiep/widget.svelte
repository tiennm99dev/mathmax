<script>
  import {
    circle,
    pointOnCircle,
    projectToCircle,
    angleAtVertex,
    subtendedArc,
  } from '#lib/geom-engine/circle.js';
  import { dist, EPSILON_LEN } from '#lib/geom-engine/vec.js';
  import { draggable } from '#lib/actions/draggable.svelte.js';

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
          {inscribed.toFixed(1)}°</span
        >
        <span><strong style="color:#1B998B">Cung bị chắn AB:</strong> {arc.toFixed(1)}°</span>
      </div>
      <p class="mt-1 text-slate-600">
        Góc nội tiếp = nửa cung bị chắn: {inscribed.toFixed(1)}° = {arc.toFixed(1)}° / 2
      </p>
    {/if}
  </div>

  <div>
    <svg
      bind:this={svgEl}
      viewBox="0 0 {VIEW} {VIEW}"
      preserveAspectRatio="xMidYMid meet"
      class="block w-full max-w-md mx-auto bg-white rounded-lg border border-slate-200"
      style="touch-action:none; aspect-ratio:1/1"
      role="img"
      aria-label="Kéo điểm M (đỏ) quanh đường tròn hoặc dùng phím mũi tên"
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

      <circle
        cx={M.x}
        cy={M.y}
        r="14"
        fill="#D7263D"
        stroke="#fff"
        stroke-width="2"
        role="button"
        tabindex="0"
        aria-label="Điểm M trên đường tròn — kéo hoặc dùng phím mũi tên"
        style="cursor:grab; outline:none"
        use:draggable={dragOpts}
      />
      <text x={M.x + 12} y={M.y - 8} font-size="14" font-weight="700" fill="#D7263D">M</text>
    </svg>
    <p class="mt-2 text-center text-sm text-slate-500">
      Kéo điểm M (đỏ) quanh đường tròn hoặc dùng phím mũi tên
    </p>
  </div>
</div>
