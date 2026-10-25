<script>
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';
  import { button } from '#lib/core/ui.js';
  import { formatNumber, texNumber } from '#lib/core/number-format.js';
  import Tex from '#lib/components/tex.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { parallelogramPieces, rhombusPieces, trapezoidPieces } from './engine.js';

  const W = 420;
  const H = 240;
  const SC = 28; // SVG units per centimetre
  const MODES = [
    { value: 'binh-hanh', label: 'Hình bình hành' },
    { value: 'thoi', label: 'Hình thoi' },
    { value: 'thang', label: 'Hình thang' },
  ];
  const FILL = { still: '#2E86AB', moving: '#F46036', copy: '#1B998B' };

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t = tweened(0, { duration: reducedMotion ? 0 : 1400, easing: cubicInOut });

  let mode = $state('binh-hanh');
  // Parallelogram: base, height, how far the top side leans.
  let pa = $state(6);
  let ph = $state(4);
  let ps = $state(2);
  // Rhombus: the two diagonals.
  let rm = $state(8);
  let rn = $state(4);
  // Isosceles trapezoid: bases and height.
  let ta = $state(7);
  let tb = $state(3);
  let th = $state(4);

  const cut = $derived($t > 0.999);

  /** Where each mode's origin sits on the board. */
  const ORIGIN = {
    'binh-hanh': { x: 40, y: 190 },
    thoi: { x: 210, y: 130 },
    thang: { x: 24, y: 190 },
  };

  const pieces = $derived(
    mode === 'binh-hanh'
      ? parallelogramPieces(pa, ph, Math.min(ps, pa), $t)
      : mode === 'thoi'
        ? rhombusPieces(rm, rn, $t)
        : trapezoidPieces(ta, Math.min(tb, ta - 1), th, $t),
  );
  const origin = $derived(ORIGIN[/** @type {keyof typeof ORIGIN} */ (mode)]);

  /** @param {{ x: number, y: number }[]} pts */
  const svgPoints = (pts) =>
    pts.map((p) => `${origin.x + p.x * SC},${origin.y - p.y * SC}`).join(' ');

  /** @param {number} v */
  const n = (v) => texNumber(formatNumber(v, 1));

  const formula = $derived.by(() => {
    if (mode === 'binh-hanh')
      return `S = a \\cdot h = ${n(pa)} \\cdot ${n(ph)} = ${n(pa * ph)}\\ \\text{cm}^2`;
    if (mode === 'thoi')
      return `S = \\dfrac{1}{2} m \\cdot n = \\dfrac{1}{2} \\cdot ${n(rm)} \\cdot ${n(rn)} = ${n((rm * rn) / 2)}\\ \\text{cm}^2`;
    const b = Math.min(tb, ta - 1);
    return `S = \\dfrac{(a + b) \\cdot h}{2} = \\dfrac{(${n(ta)} + ${n(b)}) \\cdot ${n(th)}}{2} = ${n(((ta + b) * th) / 2)}\\ \\text{cm}^2`;
  });

  const explain = $derived.by(() => {
    if (mode === 'binh-hanh')
      return cut
        ? `Tam giác cắt theo đường cao đã chuyển sang bên phải: được hình chữ nhật dài ${formatNumber(pa)} cm, rộng ${formatNumber(ph)} cm. Diện tích không đổi, nên S = ${formatNumber(pa * ph)} cm².`
        : `Hình bình hành có cạnh đáy a = ${formatNumber(pa)} cm, chiều cao h = ${formatNumber(ph)} cm. Bấm "Cắt ghép" để chuyển tam giác màu cam sang bên kia.`;
    if (mode === 'thoi')
      return cut
        ? `Hai tam giác nhỏ đã lấp hai góc: được hình chữ nhật dài m = ${formatNumber(rm)} cm, rộng n : 2 = ${formatNumber(rn / 2)} cm. Vậy S = ${formatNumber((rm * rn) / 2)} cm².`
        : `Hình thoi có hai đường chéo m = ${formatNumber(rm)} cm, n = ${formatNumber(rn)} cm. Bấm "Cắt ghép": cắt theo đường chéo m, rồi cắt nửa dưới theo đường chéo n.`;
    const b = Math.min(tb, ta - 1);
    return cut
      ? `Hai hình thang bằng nhau ghép thành hình bình hành có đáy a + b = ${formatNumber(ta + b)} cm, chiều cao ${formatNumber(th)} cm. Một hình thang bằng nửa hình đó: S = ${formatNumber(((ta + b) * th) / 2)} cm².`
      : `Hình thang có đáy a = ${formatNumber(ta)} cm, b = ${formatNumber(b)} cm, chiều cao h = ${formatNumber(th)} cm. Bấm "Cắt ghép" để quay một bản sao nửa vòng quanh trung điểm cạnh bên.`;
  });

  function toggle() {
    t.set(cut ? 0 : 1);
  }
  /** Changing the shape puts the pieces back. */
  function reset() {
    t.set(0, { duration: 0 });
  }
</script>

<div class="space-y-4">
  <SegmentedControl label="Chọn hình" options={MODES} bind:value={mode} onchange={reset} />

  <GeometryBoard
    width={W}
    height={H}
    maxWidth="max-w-lg"
    label="Cắt ghép {MODES.find(
      (m) => m.value === mode,
    )?.label.toLowerCase()} để tìm công thức diện tích"
  >
    {#each pieces as piece, i (i)}
      <polygon
        points={svgPoints(piece.pts)}
        fill={FILL[piece.role]}
        fill-opacity={piece.role === 'still' ? 0.3 : 0.55}
        stroke={FILL[piece.role]}
        stroke-width="2"
        stroke-linejoin="round"
      />
    {/each}
    {#if mode === 'binh-hanh' && !cut}
      <line
        x1={origin.x + Math.min(ps, pa) * SC}
        y1={origin.y}
        x2={origin.x + Math.min(ps, pa) * SC}
        y2={origin.y - ph * SC}
        stroke="#1F2937"
        stroke-dasharray="5 4"
        stroke-width="1.5"
      />
      <text x={origin.x + Math.min(ps, pa) * SC + 4} y={origin.y - (ph * SC) / 2} font-size="14"
        >h</text
      >
      <text x={origin.x + (pa * SC) / 2} y={origin.y + 20} font-size="14">a</text>
    {:else if mode === 'thoi' && !cut}
      <line
        x1={origin.x - (rm * SC) / 2}
        y1={origin.y}
        x2={origin.x + (rm * SC) / 2}
        y2={origin.y}
        stroke="#1F2937"
        stroke-dasharray="5 4"
        stroke-width="1.5"
      />
      <line
        x1={origin.x}
        y1={origin.y - (rn * SC) / 2}
        x2={origin.x}
        y2={origin.y + (rn * SC) / 2}
        stroke="#1F2937"
        stroke-dasharray="5 4"
        stroke-width="1.5"
      />
      <text x={origin.x + (rm * SC) / 4} y={origin.y - 6} font-size="14">m</text>
      <text x={origin.x + 6} y={origin.y + (rn * SC) / 4 + 6} font-size="14">n</text>
    {:else if mode === 'thang' && !cut}
      <text x={origin.x + (ta * SC) / 2} y={origin.y + 20} font-size="14">a</text>
      <text x={origin.x + (ta * SC) / 2} y={origin.y - th * SC - 8} font-size="14">b</text>
    {/if}
  </GeometryBoard>

  {#if mode === 'binh-hanh'}
    <div class="grid gap-3 sm:grid-cols-3">
      <SliderField label="Cạnh đáy a" bind:value={pa} min={3} max={8} unit="cm" oninput={reset} />
      <SliderField label="Chiều cao h" bind:value={ph} min={2} max={5} unit="cm" oninput={reset} />
      <SliderField label="Độ nghiêng" bind:value={ps} min={1} max={3} unit="cm" oninput={reset} />
    </div>
  {:else if mode === 'thoi'}
    <div class="grid gap-3 sm:grid-cols-2">
      <SliderField label="Đường chéo m" bind:value={rm} min={2} max={8} unit="cm" oninput={reset} />
      <SliderField label="Đường chéo n" bind:value={rn} min={2} max={6} unit="cm" oninput={reset} />
    </div>
  {:else}
    <div class="grid gap-3 sm:grid-cols-3">
      <SliderField label="Đáy lớn a" bind:value={ta} min={4} max={7} unit="cm" oninput={reset} />
      <SliderField label="Đáy nhỏ b" bind:value={tb} min={1} max={5} unit="cm" oninput={reset} />
      <SliderField label="Chiều cao h" bind:value={th} min={2} max={5} unit="cm" oninput={reset} />
    </div>
    {#if tb >= ta}
      <p class="text-sm text-amber-800">
        Đáy nhỏ phải ngắn hơn đáy lớn, nên b được lấy bằng {formatNumber(ta - 1)} cm.
      </p>
    {/if}
  {/if}

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={toggle}>
      {cut ? 'Trả về hình ban đầu' : 'Cắt ghép'}
    </button>
  </div>

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
    <Tex display math={formula} />
    <p class="mt-2 text-sm text-slate-700" aria-live="polite">{explain}</p>
  </div>
</div>
