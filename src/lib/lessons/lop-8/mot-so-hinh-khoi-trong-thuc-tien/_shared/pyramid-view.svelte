<script>
  import { focusRing } from '#lib/core/ui.js';
  import {
    circumradius,
    inradius,
    pathOf,
    pyramidFaces,
    pyramidMeasures,
  } from './pyramid-geometry.js';
  import { clampPitch, drawOrder, turnByKey, viewPoint, wrapYaw } from '#lib/geom-engine/solid.js';

  /**
   * A regular pyramid S.(base) drawn in 3D that turns by drag or arrow keys
   * and unfolds into its net. Hidden edges are dashed while the solid is
   * closed, as in the book. Props:
   * - `n`: 3 (hình chóp tam giác đều) or 4 (hình chóp tứ giác đều);
   * - `a`: base side in cm; `h`: height in cm; `t`: unfolding, 0 closed to 1 flat;
   * - `view`: `{ yaw, pitch }` in degrees (bindable);
   * - `names`: names of the base vertices, the apex is S;
   * - `highlight`: id of a face to colour ('bottom', 'side-<i>'), or '';
   * - `lines`: draw the height SH and the slant height SI on face SAB;
   * - `maxSide`, `maxHeight`: the largest a and h the widget allows; the
   *   closed solid keeps one scale until it outgrows 60% of that size;
   * - `label`: what the drawing shows, for screen readers.
   * @type {{
   *   n: number;
   *   a: number;
   *   h: number;
   *   t?: number;
   *   view?: { yaw: number, pitch: number };
   *   names?: string[];
   *   highlight?: string;
   *   lines?: boolean;
   *   maxSide?: number;
   *   maxHeight?: number;
   *   label: string;
   * }}
   */
  let {
    n,
    a,
    h,
    t = 0,
    view = $bindable({ yaw: -20, pitch: 18 }),
    names = [],
    highlight = '',
    lines = false,
    maxSide = 8,
    maxHeight = 10,
    label,
  } = $props();

  const W = 360;
  const H = 300;
  const PAD = 22;
  const SIDE = '#6366F1';
  const BASE = '#F59E0B';
  const MARK = '#10B981';
  const HEIGHT = '#DC2626';
  const SLANT = '#059669';
  const TOP = 75;
  const SMALL = 0.6;

  const closed = $derived(t < 0.02);
  // Unfolding tilts the eye towards a top view, so the net is seen whole.
  const seen = $derived({
    yaw: view.yaw,
    pitch: view.pitch < TOP ? view.pitch + (TOP - view.pitch) * t : view.pitch,
  });
  // The closed solid keeps one scale while it is small, so the sliders are
  // seen to change it, and zooms out only as much as a large one needs.
  const unitClosed = $derived(
    (H / 2 - PAD) /
      Math.max(
        Math.hypot(circumradius(n, a), h / 2),
        SMALL * Math.hypot(circumradius(n, maxSide), maxHeight / 2),
      ),
  );
  // The flat net fits by its farthest point, the tip of a side triangle.
  const unitNet = $derived(
    (Math.min(W, H) / 2 - PAD) / (inradius(n, a) + pyramidMeasures(n, a, h).d),
  );
  const scale = $derived(Math.min(unitClosed, unitClosed + (unitNet - unitClosed) * t));
  const centre = $derived(viewPoint({ x: 0, y: 0, z: (h / 2) * (1 - t) }, seen));
  /** @param {{ x: number, y: number }} p */
  const toScreen = (p) => ({
    x: W / 2 + scale * (p.x - centre.x),
    y: H / 2 + scale * (p.y - centre.y),
  });
  /** @param {{ x: number, y: number, z: number }} p */
  const at = (p) => toScreen(viewPoint(p, seen));
  const solid = $derived(pyramidFaces(n, a, h, t));
  const faces = $derived(drawOrder(solid, seen, toScreen));

  /** Base vertices, the apex S, the foot H and the midpoint I of AB. */
  const points = $derived.by(() => {
    const bottom = solid.find((f) => f.id === 'bottom');
    const base = bottom ? [...bottom.pts].reverse() : [];
    const I = base.length
      ? { x: (base[0].x + base[1].x) / 2, y: (base[0].y + base[1].y) / 2, z: 0 }
      : { x: 0, y: 0, z: 0 };
    return { base, S: { x: 0, y: 0, z: h }, H: { x: 0, y: 0, z: 0 }, I };
  });

  /** Vertex names, pushed away from the middle of the drawing. */
  const labels = $derived.by(() => {
    if (!closed || names.length !== n) return [];
    const mid = at({ x: 0, y: 0, z: h / 3 });
    /** @type {{ name: string, p: { x: number, y: number, z: number } }[]} */
    const list = [
      ...points.base.map((p, i) => ({ name: names[i], p })),
      { name: 'S', p: points.S },
    ];
    const out = list.map(({ name, p }) => {
      const s = at(p);
      const dx = s.x - mid.x;
      const dy = s.y - mid.y;
      const d = Math.hypot(dx, dy) || 1;
      return { name, x: s.x + (dx / d) * 14, y: s.y + (dy / d) * 14 + 5 };
    });
    if (lines) {
      const hs = at(points.H);
      const is = at(points.I);
      out.push({ name: 'H', x: hs.x + 10, y: hs.y + 4 });
      out.push({ name: 'I', x: is.x, y: is.y + 18 });
    }
    return out;
  });

  /** @param {import('#lib/geom-engine/solid.js').Face} face */
  function fillOf(face) {
    if (face.id === highlight) return MARK;
    return face.kind === 'side' ? SIDE : BASE;
  }

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
    view = { yaw: wrapYaw(view.yaw - dx * 0.6), pitch: clampPitch(view.pitch + dy * 0.5) };
  }
  function up() {
    last = null;
  }
  /** @param {KeyboardEvent} e */
  function key(e) {
    const next = turnByKey(view, e.key, e.shiftKey);
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
          d={pathOf(f.screen)}
          fill={f.face.id === highlight ? MARK : 'none'}
          fill-opacity="0.25"
          stroke="#475569"
          stroke-width="1.5"
          stroke-dasharray="5 4"
          stroke-linejoin="round"
        />
      {:else}
        <path
          d={pathOf(f.screen)}
          fill={fillOf(f.face)}
          fill-opacity={closed ? (f.face.id === highlight ? 0.55 : 0.25) : 0.5}
          stroke="#1E293B"
          stroke-width="2"
          stroke-linejoin="round"
        />
      {/if}
    {/each}
    {#if closed && lines}
      {@const s = at(points.S)}
      {@const hh = at(points.H)}
      {@const ii = at(points.I)}
      <line
        x1={s.x}
        y1={s.y}
        x2={hh.x}
        y2={hh.y}
        stroke={HEIGHT}
        stroke-width="2.5"
        stroke-dasharray="6 4"
      />
      <line x1={hh.x} y1={hh.y} x2={ii.x} y2={ii.y} stroke="#475569" stroke-dasharray="3 3" />
      <line x1={s.x} y1={s.y} x2={ii.x} y2={ii.y} stroke={SLANT} stroke-width="3" />
      <circle cx={hh.x} cy={hh.y} r="3.5" fill={HEIGHT} />
      <circle cx={ii.x} cy={ii.y} r="3.5" fill={SLANT} />
    {/if}
    {#each labels as l (l.name)}
      <text
        x={l.x}
        y={l.y}
        text-anchor="middle"
        font-size="15"
        font-weight="700"
        fill="#0F172A"
        paint-order="stroke"
        stroke="#FFFFFF"
        stroke-width="3">{l.name}</text
      >
    {/each}
  </svg>
</div>
