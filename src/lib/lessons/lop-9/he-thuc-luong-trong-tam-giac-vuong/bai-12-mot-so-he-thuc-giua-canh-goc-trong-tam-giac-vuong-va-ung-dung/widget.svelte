<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { readNumber } from '#lib/core/decimal.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button, textInput } from '#lib/core/ui.js';
  import { along, arcPath, degText } from '#lib/core/visuals/angle-math.js';
  import { aimSentence, aimStatus, heightFrom, heightOk, metres } from './engine.js';

  // Scene: the ground is the line y = GROUND, the building's front face is at
  // x = WALL, K pixels per metre.
  const W = 360;
  const H = 260;
  const GROUND = 236;
  const WALL = 300;
  const K = 4.5;
  const EYE = 1.5;
  const D_MIN = 10;
  const D_MAX = 55;
  const A_MIN = 1;
  const A_MAX = 80;
  const AIM_R = 64;

  const BUILDINGS = [
    { value: 0, label: 'Toà nhà 1', height: 21.5 },
    { value: 1, label: 'Toà nhà 2', height: 28.3 },
    { value: 2, label: 'Toà nhà 3', height: 36.8 },
    { value: 3, label: 'Tháp nước', height: 16.4 },
  ];

  const inputId = $props.id();
  let which = $state(0);
  let d = $state(30);
  let alpha = $state(20);
  let typed = $state('');
  /** @type {null | 'ok' | 'bad' | 'invalid'} */
  let verdict = $state(null);

  const building = $derived(BUILDINGS[Number(which)]);
  const footX = $derived(WALL - d * K);
  const eyePt = $derived({ x: footX, y: GROUND - EYE * K });
  const topY = $derived(GROUND - building.height * K);
  const status = $derived(aimStatus(alpha, building.height, d, EYE));
  const aimPt = $derived(along(eyePt, AIM_R, alpha));
  // The sight line runs to the wall, or to the top edge of the drawing.
  const rayEnd = $derived.by(() => {
    const t = Math.tan((alpha * Math.PI) / 180);
    const atWall = { x: WALL, y: eyePt.y - (WALL - eyePt.x) * t };
    if (atWall.y >= 4) return atWall;
    return { x: eyePt.x + (eyePt.y - 4) / t, y: 4 };
  });
  const hitWall = $derived(rayEnd.x >= WALL - 0.01 && rayEnd.y >= topY);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  // Scratch points the drag action writes into; the values live in d and alpha.
  const footScratch = { x: 0, y: 0 };
  const aimScratch = { x: 0, y: 0 };

  const clampD = (/** @type {number} */ v) => Math.max(D_MIN, Math.min(D_MAX, Math.round(v)));
  const clampA = (/** @type {number} */ v) =>
    Math.max(A_MIN, Math.min(A_MAX, Math.round(v * 2) / 2));

  /** @param {number} v */
  function setD(v) {
    d = clampD(v);
    verdict = null;
  }
  /** @param {number} v */
  function setAlpha(v) {
    alpha = clampA(v);
    verdict = null;
  }

  const footOpts = $derived({
    point: footScratch,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => setD((WALL - footScratch.x) / K),
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy, big = false) =>
      setD(d - (dx || dy) * (big ? 5 : 1)),
  });
  const aimOpts = $derived({
    point: aimScratch,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () =>
      setAlpha((Math.atan2(eyePt.y - aimScratch.y, aimScratch.x - eyePt.x) * 180) / Math.PI),
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy, big = false) =>
      setAlpha(alpha + (dx || -dy) * (big ? 5 : 0.5)),
  });

  function check() {
    const value = readNumber(typed);
    if (value === null) verdict = 'invalid';
    else verdict = heightOk(value, d, alpha, EYE) ? 'ok' : 'bad';
  }

  const measured = $derived(heightFrom(d, alpha, EYE));
  const tanText = $derived(
    formatNumber(Math.round(Math.tan((alpha * Math.PI) / 180) * 1e4) / 1e4, 4),
  );
  const feedback = $derived.by(() => {
    if (status !== 'hit') return { tone: /** @type {const} */ ('info'), text: aimSentence(status) };
    if (verdict === 'ok')
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đúng rồi: h = 1,5 + ${d} · tan ${degText(alpha)} ≈ ${metres(measured)} m. Chiều cao thật của ${building.label.toLowerCase()} là ${metres(building.height)} m.`,
      };
    if (verdict === 'bad')
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Chưa đúng. Tam giác vuông có cạnh kề d = ${d} m và góc α = ${degText(alpha)}, nên cạnh đối bằng d · tan α ≈ ${d} · ${tanText}. Đừng quên cộng thêm chiều cao giác kế 1,5 m.`,
      };
    if (verdict === 'invalid')
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Hãy nhập một số, dùng dấu phẩy cho phần thập phân (ví dụ 23,4).',
      };
    return { tone: /** @type {const} */ ('ok'), text: aimSentence(status) };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn công trình cần đo"
    options={BUILDINGS.map((b) => ({ value: b.value, label: b.label }))}
    bind:value={which}
    onchange={() => (verdict = null)}
  />

  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {H}"
    class="block w-full touch-none select-none rounded-lg border border-slate-200 bg-sky-50"
    role="group"
    aria-label={`Người đo đứng cách chân ${building.label.toLowerCase()} ${d} m, giác kế cao 1,5 m, góc ngắm α = ${degText(alpha)}.`}
  >
    <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#d9f99d" />
    <line x1="0" y1={GROUND} x2={W} y2={GROUND} stroke="#4d7c0f" stroke-width="2" />
    <rect
      x={WALL}
      y={topY}
      width="44"
      height={GROUND - topY}
      fill="#cbd5e1"
      stroke="#475569"
      stroke-width="1.5"
    />
    {#each Array.from({ length: Math.floor(building.height / 4) }, (_, i) => i) as i (i)}
      <rect x={WALL + 8} y={GROUND - (i + 1) * 4 * K + 3} width="10" height="8" fill="#94a3b8" />
      <rect x={WALL + 26} y={GROUND - (i + 1) * 4 * K + 3} width="10" height="8" fill="#94a3b8" />
    {/each}
    <circle cx={WALL} cy={topY} r="3.5" fill="#0f172a" />

    <!-- horizontal through the eye, and the distance d on the ground -->
    <line
      x1={eyePt.x}
      y1={eyePt.y}
      x2={WALL}
      y2={eyePt.y}
      stroke="#64748b"
      stroke-width="1.2"
      stroke-dasharray="4 3"
    />
    <text
      x={(footX + WALL) / 2}
      y={GROUND + 16}
      text-anchor="middle"
      font-size="12"
      font-weight="700"
      fill="#1e3a8a">d = {d} m</text
    >

    <!-- sight line -->
    <line
      x1={eyePt.x}
      y1={eyePt.y}
      x2={rayEnd.x}
      y2={rayEnd.y}
      stroke={status === 'hit' ? '#059669' : '#d97706'}
      stroke-width="2"
    />
    {#if hitWall && status !== 'hit'}
      <circle cx={rayEnd.x} cy={rayEnd.y} r="3" fill="#d97706" />
    {/if}
    <path d={arcPath(eyePt, 0, alpha, 26)} fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text
      x={along(eyePt, 34, alpha / 2).x + 2}
      y={along(eyePt, 34, alpha / 2).y + 4}
      font-size="12"
      font-weight="700"
      fill="#0f172a">α</text
    >

    <!-- observer with the clinometer on a stand -->
    <line x1={footX} y1={GROUND} x2={footX} y2={eyePt.y} stroke="#334155" stroke-width="2" />
    <circle cx={eyePt.x} cy={eyePt.y} r="3" fill="#334155" />

    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Vị trí người đo, kéo ngang để đổi khoảng cách d"
      aria-valuemin={D_MIN}
      aria-valuemax={D_MAX}
      aria-valuenow={d}
      aria-valuetext={`d = ${d} mét`}
      style="cursor:grab; outline:none"
      use:draggable={footOpts}
    >
      <rect
        class="drag-knob"
        x={footX - 8}
        y={GROUND - 8}
        width="16"
        height="16"
        rx="4"
        fill="#1d4ed8"
        stroke="#fff"
        stroke-width="2"
      />
    </g>

    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Đầu tia ngắm, kéo để đổi góc α"
      aria-valuemin={A_MIN}
      aria-valuemax={A_MAX}
      aria-valuenow={alpha}
      aria-valuetext={`α = ${degText(alpha)}`}
      style="cursor:grab; outline:none"
      use:draggable={aimOpts}
    >
      <circle
        class="drag-knob"
        cx={aimPt.x}
        cy={aimPt.y}
        r="8"
        fill={status === 'hit' ? '#059669' : '#d97706'}
        stroke="#fff"
        stroke-width="2"
      />
    </g>
  </svg>

  <div class="flex flex-wrap items-center gap-2">
    <span class="text-sm font-semibold text-slate-700">Góc α = {degText(alpha)}</span>
    <button type="button" class={button.quiet} onclick={() => setAlpha(alpha - 0.5)}>
      Giảm α
    </button>
    <button type="button" class={button.quiet} onclick={() => setAlpha(alpha + 0.5)}>
      Tăng α
    </button>
  </div>

  {#if status === 'hit'}
    <form
      class="space-y-2"
      onsubmit={(e) => {
        e.preventDefault();
        check();
      }}
    >
      <label for={inputId} class="block text-sm font-semibold text-slate-700">
        Với d = {d} m, α = {degText(alpha)}, giác kế cao 1,5 m: chiều cao h (m, làm tròn đến hàng
        phần mười) là
      </label>
      <div class="flex gap-2">
        <input
          id={inputId}
          class="{textInput} max-w-40"
          inputmode="decimal"
          autocomplete="off"
          bind:value={typed}
        />
        <button type="submit" class={button.primary}>Kiểm tra</button>
      </div>
    </form>
  {/if}

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
