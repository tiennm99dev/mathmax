<script>
  import { focusRing } from '#lib/core/ui.js';
  import { prismFaces, viewCentre } from './prism-geometry.js';
  import { clampPitch, drawOrder, turnByKey, viewPoint, wrapYaw } from '#lib/geom-engine/solid.js';

  /**
   * A right prism drawn in 3D that turns by drag or arrow keys and unfolds
   * into its net. Hidden edges are dashed while the solid is closed, as in
   * the book. Props:
   * - `base`: base polygon in cm, counter-clockwise seen from above;
   * - `h`: height in cm; `t`: unfolding, 0 closed to 1 flat;
   * - `view`: `{ yaw, pitch }` in degrees (bindable);
   * - `names`: names of the base vertices; the top ones get a prime (A → A');
   * - `highlight`: id of a face to colour ('bottom', 'top', 'side-<i>'), or '';
   * - `grid`: draw a 1 cm grid on faces whose sides are whole numbers;
   * - `unit`: pixels per cm when closed; while it unfolds the view zooms out
   *   just enough for the net to fit and tilts towards a top view;
   * - `label`: what the drawing shows, for screen readers.
   * @type {{
   *   base: { x: number, y: number }[];
   *   h: number;
   *   t?: number;
   *   view?: { yaw: number, pitch: number };
   *   names?: string[];
   *   highlight?: string;
   *   grid?: boolean;
   *   unit?: number;
   *   label: string;
   * }}
   */
  let {
    base,
    h,
    t = 0,
    view = $bindable({ yaw: -28, pitch: 24 }),
    names = [],
    highlight = '',
    grid = false,
    unit = 26,
    label,
  } = $props();

  const W = 360;
  const H = 300;
  const SIDE = '#6366F1';
  const CAP = '#F59E0B';
  const MARK = '#10B981';
  const TOP = 70;

  const PAD = 16;
  const closed = $derived(t < 0.02);
  // Unfolding tilts the eye towards a top view, so the net is seen whole.
  const seen = $derived({
    yaw: view.yaw,
    pitch: view.pitch < TOP ? view.pitch + (TOP - view.pitch) * t : view.pitch,
  });
  /** Largest scale at which the flat net fits the drawing in this view. */
  const fitNet = $derived.by(() => {
    const c = viewPoint(viewCentre(base, h, 1), seen);
    let rx = 0;
    let ry = 0;
    for (const f of prismFaces(base, h, 1)) {
      for (const p of f.pts) {
        const v = viewPoint(p, seen);
        rx = Math.max(rx, Math.abs(v.x - c.x));
        ry = Math.max(ry, Math.abs(v.y - c.y));
      }
    }
    return Math.min(unit, (W / 2 - PAD) / (rx || 1), (H / 2 - PAD) / (ry || 1));
  });
  const scale = $derived(unit + (fitNet - unit) * t);
  const centre = $derived(viewPoint(viewCentre(base, h, t), seen));
  /** @param {{ x: number, y: number }} p */
  const toScreen = (p) => ({
    x: W / 2 + scale * (p.x - centre.x),
    y: H / 2 + scale * (p.y - centre.y),
  });
  const faces = $derived(drawOrder(prismFaces(base, h, t), seen, toScreen));

  /** @param {{ x: number, y: number }[]} pts */
  const path = (pts) =>
    pts.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';

  /**
   * Lines of a 1 cm grid on a rectangular face with whole-number sides.
   * @param {import('#lib/geom-engine/solid.js').Face} face
   */
  function gridLines(face) {
    if (face.pts.length !== 4) return [];
    const [p0, p1, p2, p3] = face.pts;
    const L1 = Math.hypot(p1.x - p0.x, p1.y - p0.y, p1.z - p0.z);
    const L2 = Math.hypot(p3.x - p0.x, p3.y - p0.y, p3.z - p0.z);
    if (Math.abs(L1 - Math.round(L1)) > 1e-6 || Math.abs(L2 - Math.round(L2)) > 1e-6) return [];
    /** @param {{ x: number, y: number, z: number }} a @param {{ x: number, y: number, z: number }} b @param {number} k */
    const lerp = (a, b, k) => ({
      x: a.x + (b.x - a.x) * k,
      y: a.y + (b.y - a.y) * k,
      z: a.z + (b.z - a.z) * k,
    });
    const lines = [];
    for (let i = 1; i < Math.round(L1); i++)
      lines.push([lerp(p0, p1, i / L1), lerp(p3, p2, i / L1)]);
    for (let j = 1; j < Math.round(L2); j++)
      lines.push([lerp(p0, p3, j / L2), lerp(p1, p2, j / L2)]);
    return lines.map(([a, b]) => [toScreen(viewPoint(a, seen)), toScreen(viewPoint(b, seen))]);
  }

  /** Vertex names, pushed away from the middle of the drawing. */
  const labels = $derived.by(() => {
    if (!closed || names.length !== base.length) return [];
    const mid = toScreen(viewPoint(viewCentre(base, h, 0), seen));
    const corners = [
      ...base.map((p, i) => ({ p: { x: p.x, y: p.y, z: 0 }, name: names[i] })),
      ...base.map((p, i) => ({ p: { x: p.x, y: p.y, z: h }, name: `${names[i]}'` })),
    ];
    return corners.map(({ p, name }) => {
      const s = toScreen(viewPoint(p, seen));
      const dx = s.x - mid.x;
      const dy = s.y - mid.y;
      const d = Math.hypot(dx, dy) || 1;
      return { name, x: s.x + (dx / d) * 13, y: s.y + (dy / d) * 13 + 5 };
    });
  });

  /** @param {import('#lib/geom-engine/solid.js').Face} face */
  function fillOf(face) {
    if (face.id === highlight) return MARK;
    return face.kind === 'side' ? SIDE : CAP;
  }

  /** Lowest tilt: a little below the ground, so the bottom face can be seen. */
  const MIN_PITCH = -10;

  /** @type {{ x: number, y: number } | null} */
  let last = null;
  /** @param {PointerEvent} e */
  function down(e) {
    last = { x: e.clientX, y: e.clientY };
    /** @type {HTMLElement} */ (e.currentTarget).setPointerCapture(e.pointerId);
  }
  /** @param {PointerEvent} e */
  function move(e) {
    if (!last) return;
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    last = { x: e.clientX, y: e.clientY };
    view = {
      yaw: wrapYaw(view.yaw - dx * 0.6),
      pitch: clampPitch(view.pitch + dy * 0.5, MIN_PITCH),
    };
  }
  function up() {
    last = null;
  }
  /** @param {KeyboardEvent} e */
  function key(e) {
    const next = turnByKey(view, e.key, e.shiftKey, MIN_PITCH);
    if (!next) return;
    e.preventDefault();
    view = next;
  }
</script>

<div
  role="slider"
  tabindex="0"
  aria-label="{label}. Kéo hoặc dùng phím mũi tên để xoay hình"
  aria-valuemin={-180}
  aria-valuemax={180}
  aria-valuenow={Math.round(view.yaw)}
  aria-valuetext="Xoay {Math.round(view.yaw)} độ, nhìn từ trên xuống {Math.round(view.pitch)} độ"
  class="cursor-grab touch-none rounded-xl border border-slate-200 bg-white active:cursor-grabbing {focusRing}"
  onpointerdown={down}
  onpointermove={move}
  onpointerup={up}
  onpointercancel={up}
  onkeydown={key}
>
  <svg viewBox="0 0 {W} {H}" class="block h-auto w-full select-none" aria-hidden="true">
    {#each faces as f (f.face.id)}
      {#if closed && !f.front}
        <path
          d={path(f.screen)}
          fill={f.face.id === highlight ? MARK : 'none'}
          fill-opacity="0.25"
          stroke="#475569"
          stroke-width="1.5"
          stroke-dasharray="5 4"
          stroke-linejoin="round"
        />
      {:else}
        <path
          d={path(f.screen)}
          fill={fillOf(f.face)}
          fill-opacity={closed ? (f.face.id === highlight ? 0.55 : 0.3) : f.front ? 0.6 : 0.45}
          stroke="#1E293B"
          stroke-width="2"
          stroke-linejoin="round"
        />
        {#if grid}
          {#each gridLines(f.face) as [a, b], i (i)}
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#1E293B"
              stroke-opacity="0.35"
              stroke-width="1"
            />
          {/each}
        {/if}
      {/if}
    {/each}
    {#each labels as l (l.name)}
      <text
        x={l.x}
        y={l.y}
        text-anchor="middle"
        font-size="14"
        font-weight="700"
        fill="#0F172A"
        paint-order="stroke"
        stroke="#FFFFFF"
        stroke-width="3">{l.name}</text
      >
    {/each}
  </svg>
</div>
