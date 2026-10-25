<script>
  import { onDestroy } from 'svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { SHAPES, halfTurn, isCenter, rotate } from '../_shared/symmetry.js';
  import { SIZE, svgPoints, toScreen, toSnappedUnits } from '../_shared/board.js';

  const IDS = [
    'doan-thang',
    'tam-giac-deu',
    'hinh-vuong',
    'hinh-chu-nhat',
    'hinh-thoi',
    'hinh-binh-hanh',
    'hinh-thang-can',
    'luc-giac-deu',
    'hinh-tron',
    'chu-h',
    'chu-n',
    'chu-t',
  ];
  const LIMIT = 4;
  const selectId = $props.id();

  /** Where to look for the centre, offered after a few misses. */
  const TIPS = /** @type {Record<string, string>} */ ({
    'doan-thang': 'Thử trung điểm của đoạn thẳng.',
    'tam-giac-deu':
      'Quay nửa vòng, đỉnh trên cùng luôn chĩa xuống dưới: tam giác đều không có tâm đối xứng.',
    'hinh-vuong': 'Thử giao điểm của hai đường chéo.',
    'hinh-chu-nhat': 'Thử giao điểm của hai đường chéo.',
    'hinh-thoi': 'Thử giao điểm của hai đường chéo.',
    'hinh-binh-hanh': 'Thử giao điểm của hai đường chéo.',
    'hinh-thang-can':
      'Quay nửa vòng, đáy lớn sẽ nằm phía trên: hình thang cân không có tâm đối xứng.',
    'luc-giac-deu': 'Thử giao điểm của ba đường chéo chính.',
    'hinh-tron': 'Thử tâm của hình tròn.',
    'chu-h': 'Thử điểm chính giữa nét ngang.',
    'chu-n': 'Thử điểm chính giữa nét chéo.',
    'chu-t': 'Quay nửa vòng, chữ T bị lộn ngược: chữ T không có tâm đối xứng.',
  });

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let shapeId = $state('hinh-binh-hanh');
  let center = $state({ x: 1, y: 1 });
  let screenO = $state(toScreen({ x: 1, y: 1 }));
  let angle = $state(0);
  let misses = $state(0);
  let foundIt = $state(false);
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();
  /** @type {number | undefined} */ let frame;

  const shape = $derived(SHAPES[shapeId]);
  const turned = $derived(shape.points.map((q) => rotate(q, center, angle)));
  const done = $derived(angle === 180);
  const ok = $derived(done && isCenter(shape.points, center));
  /** A vertex and its image, to show that O is the midpoint between them. */
  const probe = $derived({ from: shape.points[0], to: halfTurn(shape.points[0], center) });

  function stop() {
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
  }
  onDestroy(stop);

  function settle() {
    if (!done) return;
    if (isCenter(shape.points, center)) foundIt = true;
    else misses += 1;
  }

  function spin() {
    stop();
    if (reducedMotion) {
      angle = 180;
      settle();
      return;
    }
    const from = angle >= 180 ? 0 : angle;
    const start = performance.now();
    const ms = 1200 * ((180 - from) / 180);
    /** @param {number} now */
    const step = (now) => {
      const t = Math.min(1, (now - start) / ms);
      angle = t >= 1 ? 180 : Math.round(from + (180 - from) * t);
      if (t < 1) frame = requestAnimationFrame(step);
      else {
        frame = undefined;
        settle();
      }
    };
    frame = requestAnimationFrame(step);
  }

  /** @param {{ x: number, y: number }} c */
  function moveCenter(c) {
    stop();
    center = c;
    screenO = toScreen(c);
    angle = 0;
  }

  /** @param {string} id */
  function chooseShape(id) {
    stop();
    shapeId = id;
    angle = 0;
    misses = 0;
    foundIt = false;
  }

  const oDrag = $derived({
    point: screenO,
    svg: () => svgEl ?? null,
    viewBox: { w: SIZE, h: SIZE },
    pad: 0,
    /** @param {{ x: number, y: number }} s */
    projector: (s) => toScreen(toSnappedUnits(s, LIMIT)),
    onChange: () => {
      stop();
      center = toSnappedUnits(screenO, LIMIT);
      angle = 0;
    },
    /** @param {number} dx @param {number} dy */
    onKeyMove: (dx, dy) =>
      moveCenter(toSnappedUnits(toScreen({ x: center.x + dx / 2, y: center.y - dy / 2 }), LIMIT)),
  });

  const oText = $derived(`O(${formatNumber(center.x)}; ${formatNumber(center.y)})`);
  const status = $derived(
    !done
      ? angle === 0
        ? `Chọn điểm O rồi bấm "Quay nửa vòng". Hình màu cam là hình sau khi quay quanh O.`
        : `Đã quay ${formatNumber(angle)}° quanh ${oText}. Quay đủ nửa vòng (180°) rồi so sánh.`
      : ok
        ? `Chồng khít! Quay nửa vòng quanh O, ${shape.name.toLowerCase()} trùng với chính nó ở vị trí ban đầu: O là tâm đối xứng.`
        : `Sau khi quay nửa vòng quanh ${oText}, hình mới không chồng khít với hình ban đầu: O không phải tâm đối xứng.`,
  );
  const verdict = $derived(
    foundIt
      ? shape.center
        ? `${shape.name} có tâm đối xứng, và em đã tìm ra nó.`
        : ''
      : misses >= 2
        ? `Gợi ý: ${TIPS[shapeId]}`
        : '',
  );
</script>

<div class="space-y-4">
  <div>
    <label for={selectId} class="mb-1 block text-sm font-semibold text-slate-700">Chọn hình</label>
    <select
      id={selectId}
      class={textInput}
      value={shapeId}
      onchange={(e) => chooseShape(/** @type {HTMLSelectElement} */ (e.currentTarget).value)}
    >
      {#each IDS as id (id)}
        <option value={id}>{SHAPES[id].name}</option>
      {/each}
    </select>
  </div>

  <GeometryBoard
    bind:svgEl
    width={SIZE}
    height={SIZE}
    interactive
    maxWidth="max-w-md"
    label="{shape.name} và điểm O kéo được; quay hình nửa vòng quanh O để kiểm tra tâm đối xứng"
  >
    {#each { length: 9 } as _, i (i)}
      <line x1={i * 40 + 20} y1="0" x2={i * 40 + 20} y2={SIZE} stroke="#f1f5f9" stroke-width="1" />
      <line x1="0" y1={i * 40 + 20} x2={SIZE} y2={i * 40 + 20} stroke="#f1f5f9" stroke-width="1" />
    {/each}
    <polygon
      points={svgPoints(shape.points)}
      fill="#2E86AB"
      fill-opacity="0.3"
      stroke="#2E86AB"
      stroke-width="2.5"
      stroke-linejoin="round"
    />
    {#if angle > 0}
      <polygon
        points={svgPoints(turned)}
        fill={ok ? '#1B998B' : '#F46036'}
        fill-opacity="0.3"
        stroke={ok ? '#1B998B' : '#F46036'}
        stroke-width="2"
        stroke-dasharray={ok ? undefined : '6 4'}
        stroke-linejoin="round"
      />
    {/if}
    {#if done}
      <line
        x1={toScreen(probe.from).x}
        y1={toScreen(probe.from).y}
        x2={toScreen(probe.to).x}
        y2={toScreen(probe.to).y}
        stroke="#7B2CBF"
        stroke-width="1.5"
        stroke-dasharray="3 3"
      />
      <circle cx={toScreen(probe.from).x} cy={toScreen(probe.from).y} r="5" fill="#2E86AB" />
      <circle cx={toScreen(probe.to).x} cy={toScreen(probe.to).y} r="5" fill="#F46036" />
    {/if}
    <DragPoint
      drag={oDrag}
      r={10}
      color="#7B2CBF"
      name="O"
      label="Điểm O đang ở {oText}: kéo hoặc dùng phím mũi tên, mỗi bước nửa ô"
    />
  </GeometryBoard>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={spin}>Quay nửa vòng</button>
    <button
      type="button"
      class={button.quiet}
      onclick={() => {
        stop();
        angle = 0;
      }}>Về vị trí ban đầu</button
    >
  </div>
  <SliderField
    label="Góc đã quay quanh O"
    bind:value={angle}
    min={0}
    max={180}
    step={15}
    unit="độ"
    oninput={() => {
      stop();
      settle();
    }}
  />

  <p
    class="rounded-lg p-3 text-sm font-semibold {ok
      ? 'bg-emerald-50 text-emerald-900'
      : 'bg-slate-50 text-slate-800'}"
    aria-live="polite"
  >
    {status}
  </p>
  <p class="min-h-5 text-sm text-slate-700" aria-live="polite">{verdict}</p>
  {#if done}
    <p class="text-xs text-slate-500">
      Chấm xanh là một đỉnh của hình, chấm cam là vị trí của nó sau khi quay nửa vòng. Điểm O luôn
      là trung điểm của đoạn nối hai chấm.
    </p>
  {/if}
</div>
