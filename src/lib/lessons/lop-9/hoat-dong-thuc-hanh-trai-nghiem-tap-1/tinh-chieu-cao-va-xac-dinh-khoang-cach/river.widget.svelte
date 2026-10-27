<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { readNumber } from '#lib/core/decimal.js';
  import { formatFixed } from '#lib/core/number-format.js';
  import { button, textInput } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import { arcPath, directionTo, rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import { angleAtC, distanceAcross } from './engine.js';

  // Top view: this bank along y = BANK, A at x = AX, K px per metre.
  const W = 400;
  const H = 250;
  const BANK = 200;
  const AX = 40;
  const K = 5;
  const AC_MIN = 8;
  const AC_MAX = 64;

  const PLACES = [
    { value: 'muong', label: 'Mương', ab: 18 },
    { value: 'kenh', label: 'Kênh', ab: 26 },
    { value: 'song', label: 'Sông', ab: 33 },
  ];

  let placeKey = $state('kenh');
  let ac = $state(30);
  let typed = $state('');
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let result = $state(null);
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const place = $derived(PLACES.find((p) => p.value === placeKey) ?? PLACES[1]);
  const A = { x: AX, y: BANK };
  const B = $derived({ x: AX, y: BANK - place.ab * K });
  const C = $derived({ x: AX + ac * K, y: BANK });
  // The clinometer laid flat reads the angle ACB to the nearest degree.
  const angle = $derived(Math.round(angleAtC(place.ab, ac)));
  const fromReadings = $derived(distanceAcross(ac, angle));

  const handle = $state({ x: AX + 30 * K, y: BANK });
  $effect(() => {
    handle.x = C.x;
    handle.y = BANK;
  });

  /** @param {number} v */
  function setAc(v) {
    ac = clamp(Math.round(v), AC_MIN, AC_MAX);
    result = null;
  }

  const drag = {
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      setAc((p.x - AX) / K);
      return { x: AX + ac * K, y: BANK };
    },
    /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} _dy @param {boolean} big */
    onKeyMove: (dx, _dy, big) => setAc(ac + dx * (big ? 5 : 1)),
  };

  function check() {
    const v = readNumber(typed);
    if (v === null) {
      result = {
        tone: 'warn',
        text: 'Hãy nhập một số, dùng dấu phẩy cho phần thập phân (ví dụ 25,2).',
      };
      return;
    }
    result =
      Math.abs(v - fromReadings) <= 0.1
        ? {
            tone: 'ok',
            text: `Đúng! AB = ${ac} · tan ${angle}° ≈ ${formatFixed(fromReadings, 1)} m. Khoảng cách thật là ${place.ab} m; chênh lệch là do góc chỉ đọc được đến độ. Chọn C sao cho góc C gần 45° thì sai số nhỏ nhất.`,
          }
        : {
            tone: 'warn',
            text: `Chưa đúng. Tam giác ABC vuông tại A: AB là cạnh đối, AC là cạnh kề của góc C, nên AB = AC · tan C = ${ac} · tan ${angle}°.`,
          };
  }

  const describe = $derived(
    `Nhìn từ trên xuống: A ở bờ bên này, cây B ở bờ bên kia, AB vuông góc với bờ. Điểm C trên bờ cách A ${ac} m, giác kế đặt tại C đo được góc ACB = ${angle}°.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chỗ cần đo"
    options={PLACES.map((p) => ({ value: p.value, label: p.label }))}
    bind:value={placeKey}
    onchange={() => (result = null)}
  />

  <GeometryBoard bind:svgEl width={W} height={H} interactive maxWidth="max-w-xl" label={describe}>
    <rect x="0" y="0" width={W} height={B.y - 6} fill="#DCFCE7" />
    <rect x="0" y={B.y - 6} width={W} height={BANK - B.y + 6} fill="#BAE6FD" />
    <rect x="0" y={BANK} width={W} height={H - BANK} fill="#DCFCE7" />
    <line x1="0" x2={W} y1={BANK} y2={BANK} stroke="#166534" stroke-width="1.5" />

    <line
      x1={A.x}
      y1={A.y}
      x2={B.x}
      y2={B.y}
      stroke="#0F172A"
      stroke-width="1.5"
      stroke-dasharray="5 4"
    />
    <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#B45309" stroke-width="2.5" />
    <line
      x1={C.x}
      y1={C.y}
      x2={B.x}
      y2={B.y}
      stroke="#DC2626"
      stroke-width="1.6"
      stroke-dasharray="6 4"
    />
    <path
      d={rightMarkPath(A, directionTo(A, B), directionTo(A, C), 9)}
      fill="none"
      stroke="#0F172A"
      stroke-width="1.2"
    />
    <path
      d={arcPath(C, directionTo(C, A), directionTo(C, B), 26)}
      fill="none"
      stroke="#DC2626"
      stroke-width="1.5"
    />
    <text x={C.x - 34} y={C.y - 8} font-size="11" font-weight="700" text-anchor="end" fill="#DC2626"
      >{angle}°</text
    >

    <circle cx={B.x} cy={B.y} r="9" fill="#16A34A" />
    <text x={B.x + 14} y={B.y + 4} font-size="12" font-weight="700" fill="#14532D">B</text>
    <circle cx={A.x} cy={A.y} r="3.5" fill="#0F172A" />
    <text x={A.x - 6} y={A.y + 16} font-size="12" font-weight="700" text-anchor="end" fill="#0F172A"
      >A</text
    >
    <text x={C.x} y={C.y + 30} font-size="12" font-weight="700" text-anchor="middle" fill="#B45309"
      >C</text
    >
    <text x={(A.x + C.x) / 2} y={BANK + 16} font-size="11" text-anchor="middle" fill="#1E293B"
      >AC = {ac} m</text
    >
    <text x={A.x + 8} y={(A.y + B.y) / 2} font-size="12" font-weight="700" fill="#0F172A">?</text>

    <DragPoint
      {drag}
      r={8}
      color="#B45309"
      label="Điểm C trên bờ, cách A {ac} mét: kéo hoặc dùng phím mũi tên trái phải để dời, giữ Shift để dời 5 mét"
    />
  </GeometryBoard>

  <div class="grid gap-2 rounded-lg bg-slate-50 p-3 text-sm tabular-nums sm:grid-cols-2">
    <p>Đo bằng thước dây: AC = {ac} m</p>
    <p>Đo bằng giác kế: góc ACB = {angle}°</p>
  </div>

  <FeedbackNote tone="info" text={describe} />

  <form
    class="flex flex-wrap items-end gap-2"
    onsubmit={(e) => {
      e.preventDefault();
      check();
    }}
  >
    <label class="min-w-0 flex-1">
      <span class="mb-1 block text-sm font-semibold text-slate-700"
        >Khoảng cách AB (m, hàng phần mười)</span
      >
      <input class={textInput} inputmode="decimal" autocomplete="off" bind:value={typed} />
    </label>
    <button type="submit" class={button.primary}>Kiểm tra</button>
  </form>
  {#if result}
    <FeedbackNote tone={result.tone} text={result.text} />
  {/if}
</div>
