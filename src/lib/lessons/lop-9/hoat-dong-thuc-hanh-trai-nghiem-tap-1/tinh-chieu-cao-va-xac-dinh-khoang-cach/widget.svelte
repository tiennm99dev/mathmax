<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { readNumber } from '#lib/core/decimal.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { button, textInput } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import { elevationTo, heightFrom, plumbReading } from './engine.js';

  // Schoolyard: ground at y = GROUND, the object at x = OBJ_X, K px per metre.
  const W = 400;
  const H = 270;
  const GROUND = 244;
  const OBJ_X = 372;
  const K = 8;
  const EYE = 1.5;
  const D_MIN = 6;
  const D_MAX = 40;
  const AIM_R = 70;
  // The clinometer close-up in the top-left corner.
  const DIAL = { x: 82, y: 70 };
  const DIAL_R = 58;
  const RAD = Math.PI / 180;

  const OBJECTS = [
    { value: 'co', label: 'Cột cờ', h: 12.4, name: 'cột cờ' },
    { value: 'cay', label: 'Cây bàng', h: 8.6, name: 'cây bàng' },
    { value: 'nha', label: 'Nhà đa năng', h: 15.2, name: 'nhà đa năng' },
  ];

  let objKey = $state('co');
  let d = $state(20);
  let alpha = $state(20);
  let typedAlpha = $state('');
  let typedH = $state('');
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let result = $state(null);
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const obj = $derived(OBJECTS.find((o) => o.value === objKey) ?? OBJECTS[0]);
  const footX = $derived(OBJ_X - d * K);
  const eye = $derived({ x: footX, y: GROUND - EYE * K });
  const trueAlpha = $derived(elevationTo(obj.h, d, EYE));
  const aligned = $derived(Math.abs(alpha - trueAlpha) <= 0.5);
  const reading = $derived(plumbReading(alpha));
  const hitH = $derived(heightFrom(d, alpha, EYE));

  /** @param {number} m */
  const py = (m) => GROUND - m * K;

  // The sight line, clipped at the object or the top of the board.
  const rayEnd = $derived.by(() => {
    const t = Math.tan(alpha * RAD);
    const atObj = { x: OBJ_X, y: eye.y - (OBJ_X - eye.x) * t };
    return atObj.y >= 4 ? atObj : { x: eye.x + (eye.y - 4) / t, y: 4 };
  });

  const feet = $state({ x: OBJ_X - 20 * K, y: GROUND });
  const aim = $state({ x: 0, y: 0 });
  $effect(() => {
    feet.x = footX;
    feet.y = GROUND;
    aim.x = eye.x + AIM_R * Math.cos(alpha * RAD);
    aim.y = eye.y - AIM_R * Math.sin(alpha * RAD);
  });

  /** @param {number} v */
  function setD(v) {
    d = clamp(Math.round(v * 2) / 2, D_MIN, D_MAX);
    result = null;
  }
  /** @param {number} v */
  function setAlpha(v) {
    alpha = clamp(Math.round(v), 2, 75);
    result = null;
  }

  const feetDrag = {
    point: feet,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      setD((OBJ_X - p.x) / K);
      return { x: OBJ_X - d * K, y: GROUND };
    },
    /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} _dy @param {boolean} big */
    onKeyMove: (dx, _dy, big) => setD(d - dx * (big ? 5 : 0.5)),
  };
  const aimDrag = {
    point: aim,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      setAlpha(Math.atan2(eye.y - p.y, p.x - eye.x) / RAD);
      return { x: eye.x + AIM_R * Math.cos(alpha * RAD), y: eye.y - AIM_R * Math.sin(alpha * RAD) };
    },
    /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setAlpha(alpha + (dx || -dy) * (big ? 5 : 1)),
  };

  // Clinometer close-up: the protractor's straight edge lies along the straw,
  // its scale counted from the eye end; the plumb line hangs straight down.
  const u = $derived({ x: Math.cos(alpha * RAD), y: -Math.sin(alpha * RAD) });
  const n = $derived({ x: Math.sin(alpha * RAD), y: Math.cos(alpha * RAD) });
  /** @param {number} theta @param {number} r */
  const scalePt = (theta, r) => ({
    x: DIAL.x + r * (-u.x * Math.cos(theta * RAD) + n.x * Math.sin(theta * RAD)),
    y: DIAL.y + r * (-u.y * Math.cos(theta * RAD) + n.y * Math.sin(theta * RAD)),
  });
  const protractor = $derived.by(() => {
    const a = scalePt(0, DIAL_R);
    const b = scalePt(180, DIAL_R);
    // From the eye end through the down side to the far end: on screen this
    // turns counter-clockwise whatever the tilt, so the sweep flag is 0.
    return `M ${a.x} ${a.y} A ${DIAL_R} ${DIAL_R} 0 0 0 ${b.x} ${b.y} Z`;
  });
  const TICKS = Array.from({ length: 19 }, (_, i) => i * 10);

  const status = $derived(
    aligned
      ? `Tia ngắm đi đúng qua đỉnh ${obj.name}. Đọc số đo trên giác kế và khoảng cách d.`
      : `Tia ngắm chạm ${obj.name} ở độ cao khoảng ${formatNumber(hitH, 1)} m, ${hitH > obj.h ? 'cao hơn đỉnh: hạ ống ngắm xuống' : 'thấp hơn đỉnh: nâng ống ngắm lên'}.`,
  );

  function check() {
    if (!aligned) {
      result = {
        tone: 'warn',
        text: 'Chưa ngắm trúng đỉnh. Quay ống ngắm cho tia ngắm đi qua đỉnh rồi mới đọc số đo.',
      };
      return;
    }
    const a = readNumber(typedAlpha);
    const h = readNumber(typedH);
    if (a === null || h === null) {
      result = {
        tone: 'warn',
        text: 'Hãy nhập cả góc nâng và chiều cao, dùng dấu phẩy cho phần thập phân (ví dụ 12,4).',
      };
      return;
    }
    if (a !== alpha) {
      result = {
        tone: 'warn',
        text: `Góc nâng chưa đúng. Dây dọi chỉ vạch ${reading}° trên thang đo tính từ đầu mắt ngắm, nên góc nâng α = 90° − ${reading}°.`,
      };
      return;
    }
    const want = heightFrom(d, alpha, EYE);
    if (Math.abs(h - want) <= 0.1) {
      result = {
        tone: 'ok',
        text: `Đúng! H = 1,5 + ${formatNumber(d, 1)} · tan ${alpha}° ≈ ${formatFixed(want, 1)} m. Chiều cao thật của ${obj.name} là ${formatNumber(obj.h, 1)} m; chênh lệch nhỏ là do góc chỉ đọc được đến độ.`,
      };
    } else {
      result = {
        tone: 'warn',
        text: `Chưa đúng. Phần cao hơn mắt là d · tan α = ${formatNumber(d, 1)} · tan ${alpha}°; nhớ cộng thêm chiều cao giác kế 1,5 m.`,
      };
    }
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Vật cần đo"
    options={OBJECTS.map((o) => ({ value: o.value, label: o.label }))}
    bind:value={objKey}
    onchange={() => (result = null)}
  />

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label={`Sân trường: giác kế cao 1,5 m đặt cách chân ${obj.name} ${formatNumber(d, 1)} m. Dây dọi trên giác kế chỉ vạch ${reading}°. ${status}`}
  >
    <rect x="0" y="0" width={W} height={GROUND} fill="#F0F9FF" />
    <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#DCFCE7" />
    <line x1="0" x2={W} y1={GROUND} y2={GROUND} stroke="#166534" stroke-width="1.5" />

    {#if obj.value === 'co'}
      <line x1={OBJ_X} x2={OBJ_X} y1={GROUND} y2={py(obj.h)} stroke="#475569" stroke-width="3" />
      <polygon
        points="{OBJ_X},{py(obj.h)} {OBJ_X - 24},{py(obj.h) + 8} {OBJ_X},{py(obj.h) + 16}"
        fill="#DC2626"
      />
    {:else if obj.value === 'cay'}
      <rect x={OBJ_X - 3} y={py(obj.h * 0.4)} width="6" height={obj.h * 0.4 * K} fill="#92400E" />
      <polygon
        points="{OBJ_X},{py(obj.h)} {OBJ_X - 22},{py(obj.h * 0.35)} {OBJ_X + 22},{py(obj.h * 0.35)}"
        fill="#16A34A"
        fill-opacity="0.85"
      />
    {:else}
      <rect
        x={OBJ_X}
        y={py(obj.h)}
        width={W - OBJ_X}
        height={obj.h * K}
        fill="#FDE68A"
        stroke="#92400E"
        stroke-width="1.5"
      />
    {/if}
    <circle cx={OBJ_X} cy={py(obj.h)} r="3" fill="#0F172A" />

    <!-- horizontal through the eye and the sight line -->
    <line x1={eye.x} x2={OBJ_X} y1={eye.y} y2={eye.y} stroke="#94A3B8" stroke-dasharray="4 4" />
    <line
      x1={eye.x}
      y1={eye.y}
      x2={rayEnd.x}
      y2={rayEnd.y}
      stroke={aligned ? '#16A34A' : '#DC2626'}
      stroke-width="1.8"
      stroke-dasharray="6 4"
    />

    <!-- tape from the clinometer to the foot -->
    <line
      x1={footX}
      x2={OBJ_X}
      y1={GROUND + 10}
      y2={GROUND + 10}
      stroke="#B45309"
      stroke-width="1.5"
    />
    <text x={(footX + OBJ_X) / 2} y={GROUND + 22} font-size="11" text-anchor="middle" fill="#1E293B"
      >d = {formatNumber(d, 1)} m</text
    >

    <!-- clinometer on its stand -->
    <line x1={footX} x2={footX} y1={GROUND} y2={eye.y} stroke="#334155" stroke-width="3" />
    <line
      x1={eye.x}
      y1={eye.y}
      x2={eye.x + 16 * u.x}
      y2={eye.y + 16 * u.y}
      stroke="#334155"
      stroke-width="4"
    />

    <!-- close-up of the clinometer -->
    <rect
      x={DIAL.x - 74}
      y={DIAL.y - 64}
      width="148"
      height="160"
      rx="8"
      fill="#FFFFFF"
      stroke="#CBD5E1"
    />
    <path d={protractor} fill="#FEF3C7" stroke="#92400E" stroke-width="1.2" />
    {#each TICKS as t (t)}
      {@const a = scalePt(t, DIAL_R)}
      {@const b = scalePt(t, DIAL_R - (t % 30 === 0 ? 9 : 5))}
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#92400E" stroke-width="1" />
      {#if t % 30 === 0}
        {@const l = scalePt(t, DIAL_R - 19)}
        <text x={l.x} y={l.y + 4} font-size="11" text-anchor="middle" fill="#78350F">{t}</text>
      {/if}
    {/each}
    <line
      x1={DIAL.x - 64 * u.x}
      y1={DIAL.y - 64 * u.y}
      x2={DIAL.x + 64 * u.x}
      y2={DIAL.y + 64 * u.y}
      stroke="#334155"
      stroke-width="4"
      stroke-linecap="round"
    />
    <line
      x1={DIAL.x}
      y1={DIAL.y}
      x2={DIAL.x}
      y2={DIAL.y + DIAL_R + 4}
      stroke="#1D4ED8"
      stroke-width="1.2"
    />
    <circle cx={DIAL.x} cy={DIAL.y + DIAL_R + 6} r="3.5" fill="#1D4ED8" />
    <text
      x={DIAL.x - 66 * u.x}
      y={DIAL.y - 66 * u.y - 6}
      font-size="11"
      text-anchor="middle"
      fill="#334155">mắt</text
    >
    <text
      x={DIAL.x}
      y={DIAL.y + 86}
      font-size="13"
      font-weight="700"
      text-anchor="middle"
      fill="#1D4ED8">dây dọi: {reading}°</text
    >

    <DragPoint
      drag={aimDrag}
      r={7}
      color="#DC2626"
      label="Đầu ống ngắm: kéo hoặc dùng phím mũi tên lên xuống để quay ống ngắm, giữ Shift để quay 5 độ"
    />
    <DragPoint
      drag={feetDrag}
      r={8}
      color="#B45309"
      label="Chân giác kế, cách chân {obj.name} {formatNumber(
        d,
        1,
      )} mét: kéo hoặc dùng phím mũi tên trái phải để dời, giữ Shift để dời 5 mét"
    />
  </GeometryBoard>

  <div class="grid gap-2 rounded-lg bg-slate-50 p-3 text-sm tabular-nums sm:grid-cols-3">
    <p>Giác kế cao: 1,5 m</p>
    <p>Khoảng cách d = {formatNumber(d, 1)} m</p>
    <p>Dây dọi chỉ vạch: {reading}°</p>
  </div>

  <FeedbackNote tone={aligned ? 'ok' : 'info'} text={status} />

  <form
    class="grid gap-2 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
    onsubmit={(e) => {
      e.preventDefault();
      check();
    }}
  >
    <label class="min-w-0">
      <span class="mb-1 block text-sm font-semibold text-slate-700">Góc nâng α (độ)</span>
      <input class={textInput} inputmode="decimal" autocomplete="off" bind:value={typedAlpha} />
    </label>
    <label class="min-w-0">
      <span class="mb-1 block text-sm font-semibold text-slate-700"
        >Chiều cao H (m, hàng phần mười)</span
      >
      <input class={textInput} inputmode="decimal" autocomplete="off" bind:value={typedH} />
    </label>
    <button type="submit" class={button.primary}>Kiểm tra</button>
  </form>
  {#if result}
    <FeedbackNote tone={result.tone} text={result.text} />
  {/if}
</div>
