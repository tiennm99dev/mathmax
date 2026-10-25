<script>
  import { button, textInput } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { SHAPES, inSentence, clip, isAxis, lineKey, reflect } from '../_shared/symmetry.js';
  import { SIZE, svgPoints, toScreen, toSnappedUnits } from '../_shared/board.js';

  const IDS = [
    'tam-giac-deu',
    'hinh-vuong',
    'hinh-chu-nhat',
    'hinh-thoi',
    'hinh-thang-can',
    'hinh-binh-hanh',
    'luc-giac-deu',
    'hinh-tron',
    'chu-t',
    'chu-h',
  ];
  /** How far from the pivot the turning handle sits, in units. */
  const ARM = 1.5;
  /** The pivot stays this close to the centre so the turning handle stays on the board. */
  const LIMIT = 3;
  const selectId = $props.id();

  let shapeId = $state('hinh-chu-nhat');
  let pivot = $state({ x: 1, y: 0 });
  let deg = $state(60);
  let folded = $state(true);
  /** Axes found so far for the current shape, redrawn faintly on the board. */
  let found = $state(
    /** @type {Array<{ key: string, ends: Array<{ x: number, y: number }> }>} */ ([]),
  );
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  const shape = $derived(SHAPES[shapeId]);
  const line = $derived({ p: pivot, deg });

  /** @param {{ x: number, y: number }} p @param {number} d */
  const armEnd = (p, d) => ({
    x: p.x + ARM * Math.cos((d * Math.PI) / 180),
    y: p.y + ARM * Math.sin((d * Math.PI) / 180),
  });

  let screenP = $state(toScreen({ x: 1, y: 0 }));
  let screenQ = $state(toScreen(armEnd({ x: 1, y: 0 }, 60)));

  function sync() {
    screenP = toScreen(pivot);
    screenQ = toScreen(armEnd(pivot, deg));
  }

  /** @param {number} d */
  function setDeg(d) {
    deg = (((Math.round(d / 15) * 15) % 360) + 360) % 360;
    sync();
  }

  /** @param {string} id */
  function chooseShape(id) {
    shapeId = id;
    found = [];
  }

  const pDrag = $derived({
    point: screenP,
    svg: () => svgEl ?? null,
    viewBox: { w: SIZE, h: SIZE },
    pad: 0,
    /** @param {{ x: number, y: number }} s */
    projector: (s) => toScreen(toSnappedUnits(s, LIMIT)),
    onChange: () => {
      pivot = toSnappedUnits(screenP, LIMIT);
      screenQ = toScreen(armEnd(pivot, deg));
    },
    /** @param {number} dx @param {number} dy */
    onKeyMove: (dx, dy) => {
      pivot = toSnappedUnits(toScreen({ x: pivot.x + dx / 2, y: pivot.y - dy / 2 }), LIMIT);
      sync();
    },
  });

  const qDrag = $derived({
    point: screenQ,
    svg: () => svgEl ?? null,
    viewBox: { w: SIZE, h: SIZE },
    pad: 0,
    /** @param {{ x: number, y: number }} s */
    projector: (s) => {
      const c = toScreen(pivot);
      const d = (Math.atan2(c.y - s.y, s.x - c.x) * 180) / Math.PI;
      return toScreen(armEnd(pivot, Math.round(d / 15) * 15));
    },
    onChange: () => {
      const c = toScreen(pivot);
      setDeg((Math.atan2(c.y - screenQ.y, screenQ.x - c.x) * 180) / Math.PI);
    },
    /** @param {number} dx @param {number} dy */
    onKeyMove: (dx, dy) => setDeg(deg + (dx < 0 || dy < 0 ? 15 : -15)),
  });

  const axis = $derived(isAxis(shape.points, line));
  const left = $derived(clip(shape.points, line, 1));
  const right = $derived(clip(shape.points, line, -1));
  const flipped = $derived(right.map((q) => reflect(q, line)));
  const cuts = $derived(left.length > 0 && right.length > 0);
  const key = $derived(lineKey(line));

  $effect(() => {
    if (axis && !found.some((f) => f.key === key))
      found = [...found, { key, ends: across(pivot, deg) }];
  });

  const total = $derived(shape.axes);
  const tally = $derived(
    total === 'vo-so'
      ? `Đã tìm được ${found.length} trục. Hình tròn có vô số trục đối xứng: mọi đường thẳng đi qua tâm.`
      : total === 0
        ? `${shape.name} không có trục đối xứng nào: gấp theo đường nào hai phần cũng không chồng khít.`
        : found.length === total
          ? `Đã tìm đủ ${total} / ${total} trục đối xứng của ${inSentence(shape.name)}.`
          : `Đã tìm được ${found.length} / ${total} trục đối xứng.`,
  );

  const status = $derived(
    !cuts
      ? 'Đường thẳng chưa chia hình thành hai phần. Kéo điểm trên đường thẳng vào trong hình.'
      : axis
        ? `Trùng khít! Gấp theo đường thẳng này, hai phần của ${inSentence(shape.name)} chồng khít lên nhau: đây là một trục đối xứng.`
        : 'Hai phần chưa chồng khít lên nhau, nên đường thẳng này không phải trục đối xứng.',
  );

  /** @param {{ x: number, y: number }} p @param {number} d */
  function across(p, d) {
    const a = (d * Math.PI) / 180;
    return [
      toScreen({ x: p.x - 12 * Math.cos(a), y: p.y - 12 * Math.sin(a) }),
      toScreen({ x: p.x + 12 * Math.cos(a), y: p.y + 12 * Math.sin(a) }),
    ];
  }

  /** Endpoints of the fold line, long enough to cross the board. */
  const lineEnds = $derived(across(pivot, deg));
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
    <div>
      <label for={selectId} class="mb-1 block text-sm font-semibold text-slate-700">Chọn hình</label
      >
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
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.secondary} onclick={() => (folded = !folded)}>
        {folded ? 'Mở hình ra' : 'Gấp theo đường thẳng'}
      </button>
      <button type="button" class={button.quiet} onclick={() => setDeg(deg + 15)}>
        Xoay đường thẳng 15°
      </button>
    </div>
  </div>

  <GeometryBoard
    bind:svgEl
    width={SIZE}
    height={SIZE}
    interactive
    maxWidth="max-w-md"
    label="{shape.name} và một đường thẳng kéo được; gấp hình theo đường thẳng để kiểm tra trục đối xứng"
  >
    {#each { length: 9 } as _, i (i)}
      <line x1={i * 40 + 20} y1="0" x2={i * 40 + 20} y2={SIZE} stroke="#f1f5f9" stroke-width="1" />
      <line x1="0" y1={i * 40 + 20} x2={SIZE} y2={i * 40 + 20} stroke="#f1f5f9" stroke-width="1" />
    {/each}
    {#each found as f (f.key)}
      <line
        x1={f.ends[0].x}
        y1={f.ends[0].y}
        x2={f.ends[1].x}
        y2={f.ends[1].y}
        stroke="#1B998B"
        stroke-width="2"
        stroke-opacity="0.35"
      />
    {/each}

    {#if folded && cuts}
      <polygon
        points={svgPoints(shape.points)}
        fill="none"
        stroke="#94a3b8"
        stroke-dasharray="4 4"
      />
      <polygon
        points={svgPoints(left)}
        fill={axis ? '#1B998B' : '#2E86AB'}
        fill-opacity="0.35"
        stroke={axis ? '#1B998B' : '#2E86AB'}
        stroke-width="2"
        stroke-linejoin="round"
      />
      <polygon
        points={svgPoints(flipped)}
        fill={axis ? '#1B998B' : '#F46036'}
        fill-opacity="0.35"
        stroke={axis ? '#1B998B' : '#F46036'}
        stroke-width="2"
        stroke-dasharray={axis ? undefined : '6 4'}
        stroke-linejoin="round"
      />
    {:else}
      <polygon
        points={svgPoints(shape.points)}
        fill="#2E86AB"
        fill-opacity="0.25"
        stroke="#334155"
        stroke-width="2.5"
        stroke-linejoin="round"
      />
    {/if}

    <line
      x1={lineEnds[0].x}
      y1={lineEnds[0].y}
      x2={lineEnds[1].x}
      y2={lineEnds[1].y}
      stroke={axis ? '#1B998B' : '#7B2CBF'}
      stroke-width="2.5"
      stroke-dasharray="10 6"
    />
    <line
      x1={screenP.x}
      y1={screenP.y}
      x2={screenQ.x}
      y2={screenQ.y}
      stroke="#7B2CBF"
      stroke-width="1.5"
    />
    <DragPoint
      drag={qDrag}
      r={9}
      color="#F46036"
      label="Tay xoay đường thẳng, đang nghiêng {formatNumber(
        deg % 180,
      )} độ: kéo vòng quanh hoặc dùng phím mũi tên, mỗi bước 15 độ"
    />
    <DragPoint
      drag={pDrag}
      color="#7B2CBF"
      label="Điểm trên đường thẳng: kéo hoặc dùng phím mũi tên để dời đường thẳng, mỗi bước nửa ô"
    />
  </GeometryBoard>

  <p
    class="rounded-lg p-3 text-sm font-semibold {axis
      ? 'bg-emerald-50 text-emerald-900'
      : 'bg-slate-50 text-slate-800'}"
    aria-live="polite"
  >
    {status}
  </p>
  <p class="text-sm text-slate-700" aria-live="polite">{tally}</p>
  <p class="text-xs text-slate-500">
    Màu xanh dương: phần hình nằm yên. Màu cam: phần còn lại sau khi gấp sang. Khi hai phần chồng
    khít, cả hai chuyển màu xanh lục và trục vừa tìm được giữ lại trên hình.
  </p>
</div>
