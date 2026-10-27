<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { readNumber } from '#lib/core/decimal.js';
  import { button, textInput } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import { alignDistance, heightFromShadow, shadowLength, sightHeight, toCm } from './engine.js';

  const W = 440;
  const H = 250;
  const PAD = 16;
  const GROUND = 226;
  const SPAN = 34; // metres shown across the board
  const SX = (W - 2 * PAD) / SPAN;
  const TOP_M = (GROUND - 8) / SX; // highest metre still on the board

  const TREES = [
    { value: 'bang', label: 'Cây bàng', h: 7.2 },
    { value: 'phuong', label: 'Cây phượng', h: 9.6 },
    { value: 'sao', label: 'Cây sao', h: 12 },
  ];
  const MODES = [
    { value: 'bong', label: 'Đo bằng bóng nắng' },
    { value: 'ngam', label: 'Ngắm qua đỉnh cọc' },
  ];

  // Shadow scene: tree at x = 3 m, stake at x = 28 m.
  const TREE_SHADOW_X = 3;
  const STAKE_SHADOW_X = 28;
  // Sighting scene: eye on the ground at x = 1 m, tree at x = 31 m.
  const EYE_X = 1;
  const TREE_SIGHT_X = 31;
  const CT = TREE_SIGHT_X - EYE_X;
  const STAKE_MIN = 2;
  const STAKE_MAX = 29.5;

  /** @param {number} m */
  const px = (m) => PAD + m * SX;
  /** @param {number} m */
  const py = (m) => GROUND - m * SX;
  /** @param {number} p */
  const toM = (p) => (p - PAD) / SX;

  let mode = $state('bong');
  let treeKey = $state('phuong');
  let sun = $state(40);
  let stakeH = $state(1.5);
  let stakeX = $state(12); // metres, sighting scene
  let typed = $state('');
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let result = $state(null);
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const tree = $derived(TREES.find((t) => t.value === treeKey) ?? TREES[1]);
  const treeX = $derived(mode === 'bong' ? TREE_SHADOW_X : TREE_SIGHT_X);

  // Shadow mode readings.
  const treeShadow = $derived(shadowLength(tree.h, sun));
  const stakeShadow = $derived(shadowLength(stakeH, sun));
  const sReading = $derived(toCm(stakeShadow));
  const bigSReading = $derived(toCm(treeShadow));

  // Sighting mode readings.
  const ca = $derived(stakeX - EYE_X);
  const caReading = $derived(toCm(ca));
  const hit = $derived(sightHeight(stakeH, ca, CT));
  const target = $derived(alignDistance(stakeH, tree.h, CT) + EYE_X);
  const aligned = $derived(Math.abs(stakeX - target) <= 0.06);

  // The sight line from the eye through the stake top, clipped to the board.
  const sightEnd = $derived(
    hit <= TOP_M ? { x: TREE_SIGHT_X, y: hit } : { x: EYE_X + (ca * TOP_M) / stakeH, y: TOP_M },
  );

  const handle = $state({ x: px(12), y: py(1.5) });
  $effect(() => {
    handle.x = px(stakeX);
    handle.y = py(stakeH);
  });

  const drag = {
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      const m = Math.round(clamp(toM(p.x), STAKE_MIN, STAKE_MAX) * 20) / 20;
      stakeX = m;
      result = null;
      return { x: px(m), y: py(stakeH) };
    },
    /** @param {number} dx @param {number} _dy @param {boolean} big */
    onKeyMove: (dx, _dy, big) => {
      const m = Math.round(clamp(stakeX + dx * (big ? 1 : 0.1), STAKE_MIN, STAKE_MAX) * 100) / 100;
      stakeX = m;
      result = null;
    },
  };

  /** Height the learner should get from the readings on screen. */
  const fromReadings = $derived(
    mode === 'bong'
      ? heightFromShadow(stakeH, sReading, bigSReading)
      : sightHeight(stakeH, caReading, CT),
  );

  /** @param {number} v */
  const m2 = (v) => `${formatFixed(v, 2)} m`;

  function check() {
    const v = readNumber(typed);
    if (v === null) {
      result = { tone: 'warn', text: 'Hãy nhập một số, ví dụ 9,6.' };
      return;
    }
    if (mode === 'ngam' && !aligned) {
      result = {
        tone: 'warn',
        text: 'Mắt, đỉnh cọc và ngọn cây chưa thẳng hàng. Kéo cọc cho tia ngắm đi đúng qua ngọn cây rồi mới đo.',
      };
      return;
    }
    const good = Math.abs(v - fromReadings) <= 0.05 || Math.abs(v - tree.h) <= 0.15;
    result = good
      ? {
          tone: 'ok',
          text: `Đúng! Theo số đo, cây cao khoảng ${formatNumber(fromReadings, 2)} m. Chiều cao thật của ${tree.label.toLowerCase()} là ${formatNumber(tree.h, 2)} m; chênh lệch nhỏ là do số đo được làm tròn đến xentimét.`,
        }
      : {
          tone: 'warn',
          text:
            mode === 'bong'
              ? 'Chưa đúng. Hai tam giác (cọc, bóng cọc) và (cây, bóng cây) đồng dạng: chiều cao cây = h · S : s.'
              : 'Chưa đúng. Cọc song song với cây, theo định lí Thalès: chiều cao cây = h · CT : CA.',
        };
  }

  const status = $derived(
    mode === 'bong'
      ? `Mặt trời cao ${sun}°. Cọc cao ${m2(stakeH)} có bóng ${m2(sReading)}; bóng cây dài ${m2(bigSReading)}. Tỉ số chiều cao : bóng của cọc là ${formatNumber(stakeH / sReading, 3)}, của cây cũng vậy.`
      : aligned
        ? `Thẳng hàng! Mắt C, đỉnh cọc và ngọn cây nằm trên một đường thẳng. CA = ${m2(caReading)}, CT = ${m2(CT)}.`
        : `Tia ngắm qua đỉnh cọc chạm thân cây ở độ cao khoảng ${formatNumber(hit, 1)} m, ${hit > tree.h ? 'cao hơn ngọn cây: dời cọc ra xa mắt' : 'thấp hơn ngọn cây: dời cọc lại gần mắt'}.`,
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-3">
    <SegmentedControl
      label="Cách đo"
      options={MODES}
      bind:value={mode}
      onchange={() => (result = null)}
    />
    <SegmentedControl
      label="Chọn cây"
      options={TREES.map((t) => ({ value: t.value, label: t.label }))}
      bind:value={treeKey}
      onchange={() => (result = null)}
    />
  </div>
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Chiều cao cọc h"
      bind:value={stakeH}
      min={1}
      max={2.5}
      step={0.1}
      unit="m"
      format={(v) => formatFixed(v, 1)}
      oninput={() => (result = null)}
    />
    {#if mode === 'bong'}
      <SliderField
        label="Độ cao mặt trời"
        bind:value={sun}
        min={30}
        max={65}
        unit="°"
        oninput={() => (result = null)}
      />
    {/if}
  </div>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive={mode === 'ngam'}
    maxWidth="max-w-xl"
    label={mode === 'bong'
      ? `Cảnh đo bằng bóng nắng: cây và cọc thẳng đứng, tia nắng song song tạo bóng trên mặt đất. ${status}`
      : `Cảnh ngắm: mắt ở điểm C sát mặt đất, cọc kéo được dọc mặt đất, cây ở xa. ${status}`}
  >
    <rect x="0" y="0" width={W} height={GROUND} fill="#F0F9FF" />
    <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#DCFCE7" />
    <line x1="0" x2={W} y1={GROUND} y2={GROUND} stroke="#166534" stroke-width="1.5" />

    <!-- tree: trunk and a pointed crown, its top is the point measured -->
    <rect
      x={px(treeX) - 3}
      y={py(tree.h * 0.35)}
      width="6"
      height={tree.h * 0.35 * SX}
      fill="#92400E"
    />
    <polygon
      points="{px(treeX)},{py(tree.h)} {px(treeX) - 18},{py(tree.h * 0.3)} {px(treeX) + 18},{py(
        tree.h * 0.3,
      )}"
      fill="#16A34A"
      fill-opacity="0.85"
    />

    {#if mode === 'bong'}
      <circle cx="40" cy="26" r="13" fill="#FACC15" />
      <!-- shadows -->
      <line
        x1={px(TREE_SHADOW_X)}
        x2={px(TREE_SHADOW_X + treeShadow)}
        y1={GROUND + 3}
        y2={GROUND + 3}
        stroke="#475569"
        stroke-width="5"
        stroke-opacity="0.6"
      />
      <line
        x1={px(STAKE_SHADOW_X)}
        x2={px(STAKE_SHADOW_X + stakeShadow)}
        y1={GROUND + 3}
        y2={GROUND + 3}
        stroke="#475569"
        stroke-width="5"
        stroke-opacity="0.6"
      />
      <!-- parallel sun rays through the two tops -->
      <line
        x1={px(TREE_SHADOW_X)}
        y1={py(tree.h)}
        x2={px(TREE_SHADOW_X + treeShadow)}
        y2={GROUND}
        stroke="#CA8A04"
        stroke-width="1.5"
        stroke-dasharray="5 4"
      />
      <line
        x1={px(STAKE_SHADOW_X)}
        y1={py(stakeH)}
        x2={px(STAKE_SHADOW_X + stakeShadow)}
        y2={GROUND}
        stroke="#CA8A04"
        stroke-width="1.5"
        stroke-dasharray="5 4"
      />
      <line
        x1={px(STAKE_SHADOW_X)}
        x2={px(STAKE_SHADOW_X)}
        y1={GROUND}
        y2={py(stakeH)}
        stroke="#7C2D12"
        stroke-width="4"
      />
      <text
        x={px(TREE_SHADOW_X + treeShadow / 2)}
        y={GROUND + 18}
        font-size="11"
        text-anchor="middle"
        fill="#1E293B">S = {m2(bigSReading)}</text
      >
      <text
        x={px(STAKE_SHADOW_X + stakeShadow / 2)}
        y={GROUND + 18}
        font-size="11"
        text-anchor="middle"
        fill="#1E293B">s = {m2(sReading)}</text
      >
      <text
        x={px(STAKE_SHADOW_X) - 6}
        y={py(stakeH) - 6}
        font-size="11"
        text-anchor="end"
        fill="#7C2D12">h = {m2(stakeH)}</text
      >
      <text
        x={px(TREE_SHADOW_X) + 8}
        y={py(tree.h) - 4}
        font-size="12"
        font-weight="700"
        fill="#166534">H = ?</text
      >
    {:else}
      <line
        x1={px(EYE_X)}
        y1={GROUND}
        x2={px(sightEnd.x)}
        y2={py(sightEnd.y)}
        stroke={aligned ? '#16A34A' : '#DC2626'}
        stroke-width="1.8"
        stroke-dasharray="6 4"
      />
      {#if hit <= TOP_M}
        <circle cx={px(TREE_SIGHT_X)} cy={py(hit)} r="4" fill={aligned ? '#16A34A' : '#DC2626'} />
      {/if}
      <circle cx={px(EYE_X)} cy={GROUND} r="5" fill="#1E293B" />
      <text
        x={px(EYE_X)}
        y={GROUND + 18}
        font-size="12"
        font-weight="700"
        text-anchor="middle"
        fill="#1E293B">C</text
      >
      <line
        x1={px(stakeX)}
        x2={px(stakeX)}
        y1={GROUND}
        y2={py(stakeH)}
        stroke="#7C2D12"
        stroke-width="4"
      />
      <text
        x={px(stakeX)}
        y={GROUND + 18}
        font-size="12"
        font-weight="700"
        text-anchor="middle"
        fill="#7C2D12">A</text
      >
      <text
        x={px(TREE_SIGHT_X)}
        y={GROUND + 18}
        font-size="12"
        font-weight="700"
        text-anchor="middle"
        fill="#166534">T</text
      >
      <text
        x={(px(EYE_X) + px(stakeX)) / 2}
        y={GROUND + 18}
        font-size="11"
        text-anchor="middle"
        fill="#1E293B">{m2(caReading)}</text
      >
      <DragPoint
        {drag}
        r={7}
        color="#B45309"
        label="Đỉnh cọc, cọc cách mắt {formatNumber(
          caReading,
          2,
        )} mét: kéo hoặc dùng phím mũi tên trái phải để dời cọc, giữ Shift để dời 1 mét"
      />
    {/if}
  </GeometryBoard>

  <div class="grid gap-2 rounded-lg bg-slate-50 p-3 text-sm tabular-nums sm:grid-cols-3">
    {#if mode === 'bong'}
      <p>Cọc: h = {m2(stakeH)}</p>
      <p>Bóng cọc: s = {m2(sReading)}</p>
      <p>Bóng cây: S = {m2(bigSReading)}</p>
    {:else}
      <p>Cọc: h = {m2(stakeH)}</p>
      <p>Mắt đến cọc: CA = {m2(caReading)}</p>
      <p>Mắt đến gốc cây: CT = {m2(CT)}</p>
    {/if}
  </div>

  <FeedbackNote tone={mode === 'ngam' && aligned ? 'ok' : 'info'} text={status} />

  <form
    class="flex flex-wrap items-end gap-2"
    onsubmit={(e) => {
      e.preventDefault();
      check();
    }}
  >
    <label class="min-w-0 flex-1">
      <span class="mb-1 block text-sm font-semibold text-slate-700"
        >Chiều cao cây em tính được (m)</span
      >
      <input class={textInput} inputmode="decimal" autocomplete="off" bind:value={typed} />
    </label>
    <button type="submit" class={button.primary}>Kiểm tra</button>
  </form>
  {#if result}
    <FeedbackNote tone={result.tone} text={result.text} />
  {/if}
</div>
