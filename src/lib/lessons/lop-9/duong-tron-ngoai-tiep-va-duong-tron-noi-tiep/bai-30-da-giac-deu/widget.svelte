<script>
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber, texNumber } from '#lib/core/number-format.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    centralAngle,
    imageOf,
    interiorAngle,
    keepingAngles,
    keepingSteps,
    magnet,
    polygonName,
    vertices,
  } from './engine.js';

  const W = 400;
  const H = 400;
  const O = { x: 200, y: 200 };
  const R = 140;

  let n = $state(5);
  let alphaRaw = $state(0);
  let direction = $state('thuan');
  /** Keeping angles found so far for the current n, as steps k (1…n). */
  let found = $state(/** @type {number[]} */ ([]));

  const alpha = $derived(magnet(n, alphaRaw));
  const clockwise = $derived(direction === 'thuan');
  const steps = $derived(keepingSteps(n, alpha));
  const keeps = $derived(steps !== null && alpha > 0);
  const base = $derived(vertices(n, O, R));
  const turned = $derived(vertices(n, O, R, clockwise ? alpha : -alpha));

  const deg = (/** @type {number} */ v) => formatNumber(Math.round(v * 10) / 10, 1);
  const tdeg = (/** @type {number} */ v) => `${texNumber(deg(v))}^\\circ`;

  $effect(() => {
    if (keeps && steps !== null && !found.includes(steps)) found = [...found, steps];
  });

  /** @param {number} value */
  function setN(value) {
    n = value;
    alphaRaw = 0;
    found = [];
  }

  const dirWord = $derived(clockwise ? 'thuận chiều' : 'ngược chiều');

  const note = $derived.by(() => {
    if (alpha === 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Kéo thanh "Góc quay" để quay ${polygonName(n)} quanh tâm $O$.`,
      };
    }
    if (keeps && steps !== null) {
      const maps = [1, 2]
        .map((i) => `$A_{${i}} \\to A_{${imageOf(n, i, steps, clockwise)}}$`)
        .join(', ');
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Phép quay ${dirWord} $${tdeg(alpha)}$ tâm $O$ biến ${maps}, … mỗi đỉnh thành một đỉnh: giữ nguyên ${polygonName(n)}.`,
      };
    }
    return {
      tone: /** @type {const} */ ('warn'),
      text: `Quay $${tdeg(alpha)}$: hình mới lệch khỏi hình cũ. Góc quay phải là bội của $360^\\circ : ${n} = ${tdeg(centralAngle(n))}$.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="grid gap-4 sm:grid-cols-2">
    <SliderField label="Số cạnh n" value={n} min={3} max={12} oninput={(v) => setN(v)} />
    <SliderField
      label="Góc quay α"
      bind:value={alphaRaw}
      min={0}
      max={360}
      unit="°"
      format={() => deg(alpha)}
    />
  </div>
  <SegmentedControl
    label="Chiều quay"
    bind:value={direction}
    options={[
      { value: 'thuan', label: 'Thuận chiều kim đồng hồ' },
      { value: 'nguoc', label: 'Ngược chiều kim đồng hồ' },
    ]}
  />

  <GeometryBoard
    width={W}
    height={H}
    maxWidth="max-w-md"
    label="{polygonName(n)} nội tiếp đường tròn tâm O, hình gốc nét đứt và hình sau khi quay {deg(
      alpha,
    )} độ {dirWord}"
  >
    <circle cx={O.x} cy={O.y} r={R} fill="none" stroke="#CBD5E1" stroke-width="1.5" />
    <polygon
      points={pointsAttr(base)}
      fill="none"
      stroke="#94A3B8"
      stroke-width="2"
      stroke-dasharray="6 5"
    />
    {#each base as P, i (i)}
      {@const lx = O.x + ((P.x - O.x) * (R + 22)) / R}
      {@const ly = O.y + ((P.y - O.y) * (R + 22)) / R}
      <text
        x={lx}
        y={ly}
        font-size="14"
        font-weight="700"
        fill="#64748B"
        text-anchor="middle"
        dominant-baseline="middle">A<tspan font-size="10" dy="4">{i + 1}</tspan></text
      >
    {/each}

    <line x1={O.x} y1={O.y} x2={base[0].x} y2={base[0].y} stroke="#94A3B8" stroke-dasharray="3 3" />
    <polygon
      points={pointsAttr(turned)}
      fill={keeps ? '#D1FAE5' : '#E0E7FF'}
      fill-opacity="0.75"
      stroke={keeps ? '#059669' : '#4F46E5'}
      stroke-width="2.5"
    />
    <line x1={O.x} y1={O.y} x2={turned[0].x} y2={turned[0].y} stroke="#DC2626" stroke-width="2" />
    <circle cx={turned[0].x} cy={turned[0].y} r="7" fill="#DC2626" />
    <circle cx={O.x} cy={O.y} r="4" fill="#334155" />
    <text x={O.x + 8} y={O.y + 16} font-size="14" font-weight="700" fill="#334155">O</text>
  </GeometryBoard>

  <div class="grid grid-cols-2 gap-2 text-center text-sm tabular-nums">
    <p class="rounded-lg bg-slate-50 p-2">Góc ở tâm: 360° : {n} = {deg(centralAngle(n))}°</p>
    <p class="rounded-lg bg-slate-50 p-2">Mỗi góc của đa giác: {deg(interiorAngle(n))}°</p>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />

  <div class="space-y-2">
    <p class="text-sm font-semibold text-slate-700" aria-live="polite">
      Góc quay giữ nguyên hình đã tìm được: {found.length}/{n}
    </p>
    <ul class="flex flex-wrap gap-2" aria-label="Các góc quay giữ nguyên hình">
      {#each keepingAngles(n) as a, i (a)}
        <li
          class="rounded-full px-3 py-1 text-sm tabular-nums {found.includes(i + 1)
            ? 'bg-emerald-100 text-emerald-800'
            : 'bg-slate-100 text-slate-400'}"
        >
          {found.includes(i + 1) ? `${deg(a)}°` : '?'}
        </li>
      {/each}
    </ul>
    <button type="button" class={button.quiet} onclick={() => (found = [])}>Tìm lại từ đầu</button>
  </div>
  <p class="text-sm text-slate-500">
    Hình nét đứt là vị trí ban đầu; chấm đỏ đánh dấu ảnh của đỉnh A₁ sau phép quay.
  </p>
</div>
