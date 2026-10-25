<script>
  import { t } from '#lib/i18n/index.js';
  import SiteShell from '#lib/core/site-shell.svelte';
  import { card } from '#lib/core/ui.js';
  import Picture from '#lib/core/kid/picture.svelte';
  import { pictures, pictureGroups } from '#lib/core/kid/pictures/index.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import FractionBars from '#lib/core/visuals/fraction-bars.svelte';
  import AreaGrid from '#lib/core/visuals/area-grid.svelte';
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import PieChart from '#lib/core/visuals/pie-chart.svelte';
  import LineChart from '#lib/core/visuals/line-chart.svelte';
  import DataTable from '#lib/core/visuals/data-table.svelte';
  import ProbabilitySpinner from '#lib/core/visuals/probability-spinner.svelte';
  import UnitConverter from '#lib/core/visuals/unit-converter.svelte';
  import ClockFace from '#lib/core/visuals/clock-face.svelte';
  import BaseTenBlocks from '#lib/core/visuals/base-ten-blocks.svelte';
  import CountingTray from '#lib/core/visuals/counting-tray.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { formatTime, toMinutes } from '#lib/units-engine/clock.js';
  import { formatNumber } from '#lib/core/number-format.js';

  // A sister site's subject components each ship a `<name>.gallery.svelte` demo
  // in src/lib/domain/, exporting its section `title` from a module script, so
  // the gallery lists them without an edit to this synced page.
  const domainModules =
    /** @type {Record<string, { default: import('svelte').Component, title?: string }>} */ (
      import.meta.glob('/src/lib/domain/*.gallery.svelte', { eager: true })
    );
  const domainDemos = Object.entries(domainModules)
    .map(([file, mod]) => {
      const name = file.replace(/^.*\//, '').replace(/\.gallery\.svelte$/, '');
      return { id: name, name, title: mod.title ?? name, Demo: mod.default };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Coordinate plane: one draggable point that snaps to whole coordinates.
  const plane = planeScale({ xMin: -6, xMax: 6, yMin: -4, yMax: 4, width: 420 });
  /** @type {SVGSVGElement | undefined} */
  let planeSvg = $state();
  let planePt = $state({ x: plane.mx(2), y: plane.my(3) });
  const planeDrag = $derived({
    point: planePt,
    svg: () => planeSvg ?? null,
    viewBox: { w: plane.width, h: plane.height },
    pad: 0,
    keyStep: plane.unit,
    keyShiftStep: plane.unit,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => ({
      x: plane.mx(Math.max(plane.xMin, Math.min(plane.xMax, Math.round(plane.toX(p.x))))),
      y: plane.my(Math.max(plane.yMin, Math.min(plane.yMax, Math.round(plane.toY(p.y))))),
    }),
  });

  // Geometry board: a triangle with draggable vertices and equal-side ticks.
  /** @type {SVGSVGElement | undefined} */
  let boardSvg = $state();
  let tri = $state([
    { x: 80, y: 220 },
    { x: 200, y: 60 },
    { x: 320, y: 220 },
  ]);
  const triNames = ['A', 'B', 'C'];
  const TICKS = /** @type {const} */ ([1, 2, 3]);
  /** @param {{ x: number, y: number }} point */
  const triDrag = (point) => ({ point, svg: () => boardSvg ?? null, viewBox: { w: 400, h: 280 } });

  let lineValue = $state(/** @type {number | null} */ (3));
  let fractionValue = $state(/** @type {number | null} */ (0.75));
  let bars = $state([
    { numerator: 1, denominator: 2 },
    { numerator: 2, denominator: 4 },
    { numerator: 3, denominator: 8 },
  ]);
  let gridCols = $state(4);
  let gridRows = $state(3);
  let barData = $state([
    { label: 'Táo', value: 8 },
    { label: 'Cam', value: 5 },
    { label: 'Chuối', value: 11 },
    { label: 'Nho', value: 3 },
  ]);
  let pieData = $state([
    { label: 'Bóng đá', value: 12 },
    { label: 'Cầu lông', value: 8 },
    { label: 'Bơi', value: 6 },
    { label: 'Cờ vua', value: 4 },
  ]);
  const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
  let lineSeries = $state([
    { name: 'Năm 2025', values: [22, 25, 28, 31, 33, 32] },
    { name: 'Năm 2026', values: [23, 26, 30, 32, 35, 34] },
  ]);
  let tableRows = $state([
    { label: 'Xanh', count: 7 },
    { label: 'Đỏ', count: 12 },
    { label: 'Vàng', count: 5 },
  ]);
  /** @type {number[]} */
  let spins = $state([]);
  let converterValue = $state(2.35);
  let clock = $state(toMinutes(7, 15));
  let blocks = $state({ hundreds: 1, tens: 3, ones: 4 });
  let trayCount = $state(2);

  const sections = [
    ...domainDemos.map((d) => [d.id, d.title]),
    ['coordinate-plane', 'Mặt phẳng toạ độ'],
    ['geometry-board', 'Bảng hình học'],
    ['number-line', 'Tia số'],
    ['fraction-bars', 'Băng phân số'],
    ['area-grid', 'Lưới diện tích'],
    ['bar-chart', 'Biểu đồ cột'],
    ['pie-chart', 'Biểu đồ hình quạt tròn'],
    ['line-chart', 'Biểu đồ đoạn thẳng'],
    ['data-table', 'Bảng thống kê'],
    ['probability-spinner', 'Vòng quay xác suất'],
    ['unit-converter', 'Đổi đơn vị'],
    ['clock-face', 'Đồng hồ'],
    ['base-ten-blocks', 'Khối cơ số 10'],
    ['counting-tray', 'Khay đếm'],
    ['kid-pictures', 'Hình cho bé'],
  ];
  const box = `${card} space-y-3 p-4 sm:p-6`;
  const readout = 'text-sm text-slate-600 tabular-nums';
</script>

<svelte:head>
  <title>Thư viện hình minh hoạ — {t().site.title}</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<SiteShell width="wide">
  <header class="mb-6 space-y-2">
    <h1 class="text-3xl font-bold text-slate-900">Thư viện hình minh hoạ</h1>
    <p class="text-slate-600">
      Trang nội bộ để rà soát mọi hình trong <code>src/lib/core/visuals/</code>
      {#if domainDemos.length}và thành phần riêng của môn trong <code>src/lib/domain/</code>{/if}:
      kéo bằng chuột hoặc ngón tay, và thử bằng bàn phím (Tab rồi phím mũi tên). Trang này không
      được lập chỉ mục.
    </p>
    <nav aria-label="Các hình">
      <ul class="flex flex-wrap gap-2 text-sm">
        {#each sections as [id, title] (id)}
          <li><a class="text-indigo-700 underline" href="#{id}">{title}</a></li>
        {/each}
      </ul>
    </nav>
  </header>

  <div class="space-y-6">
    {#each domainDemos as d (d.id)}
      <section id={d.id} class={box}>
        <h2 class="text-xl font-bold">{d.title} <code class="text-sm">{d.name}</code></h2>
        <d.Demo />
      </section>
    {/each}

    <section id="coordinate-plane" class={box}>
      <h2 class="text-xl font-bold">
        Mặt phẳng toạ độ <code class="text-sm">coordinate-plane</code>
      </h2>
      <CoordinatePlane bind:svgEl={planeSvg} {plane} label="Mặt phẳng toạ độ với điểm M">
        {#snippet children(p)}
          <line
            x1={p.mx(0)}
            y1={p.my(0)}
            x2={planePt.x}
            y2={planePt.y}
            stroke="#1B998B"
            stroke-width="2"
            stroke-dasharray="5 4"
          />
          <DragPoint
            drag={planeDrag}
            name="M"
            color="#D7263D"
            label="Điểm M — kéo hoặc dùng phím mũi tên"
          />
        {/snippet}
      </CoordinatePlane>
      <p class={readout}>
        M({formatNumber(plane.toX(planePt.x))}; {formatNumber(plane.toY(planePt.y))})
      </p>
    </section>

    <section id="geometry-board" class={box}>
      <h2 class="text-xl font-bold">
        Bảng hình học <code class="text-sm">geometry-board · drag-point · tick-marks</code>
      </h2>
      <GeometryBoard
        bind:svgEl={boardSvg}
        width={400}
        height={280}
        interactive
        label="Tam giác ABC"
      >
        {#each tri as p, i (i)}
          {@const q = tri[(i + 1) % 3]}
          <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#444" stroke-width="2" />
          <TickMarks
            from={p}
            to={q}
            count={TICKS[i]}
            color={['#D7263D', '#1B998B', '#F46036'][i]}
          />
        {/each}
        {#each tri as p, i (i)}
          <DragPoint
            drag={triDrag(p)}
            name={triNames[i]}
            label="Đỉnh {triNames[i]} — kéo hoặc dùng phím mũi tên"
          />
        {/each}
      </GeometryBoard>
    </section>

    <section id="number-line" class={box}>
      <h2 class="text-xl font-bold">Tia số <code class="text-sm">number-line</code></h2>
      <NumberLine
        min={0}
        max={10}
        bind:value={lineValue}
        hops={[
          { from: 0, to: 3, label: '+3' },
          { from: 3, to: 7, label: '+4' },
        ]}
        marks={[{ value: 7, label: '7' }]}
        markerLabel="Điểm đỏ"
      />
      <p class={readout}>Giá trị: {lineValue}</p>
      <NumberLine
        min={-1}
        max={2}
        step={1}
        subdivisions={4}
        bind:value={fractionValue}
        label="Trục số chia phần tư"
      />
      <p class={readout}>Giá trị: {formatNumber(fractionValue ?? 0)}</p>
    </section>

    <section id="fraction-bars" class={box}>
      <h2 class="text-xl font-bold">Băng phân số <code class="text-sm">fraction-bars</code></h2>
      <FractionBars bind:bars />
      <p class={readout}>{bars.map((b) => `${b.numerator}/${b.denominator}`).join(' · ')}</p>
    </section>

    <section id="area-grid" class={box}>
      <h2 class="text-xl font-bold">Lưới diện tích <code class="text-sm">area-grid</code></h2>
      <AreaGrid bind:cols={gridCols} bind:rows={gridRows} unit="cm²" />
    </section>

    <section id="bar-chart" class={box}>
      <h2 class="text-xl font-bold">Biểu đồ cột <code class="text-sm">bar-chart</code></h2>
      <BarChart bind:data={barData} interactive unit="Số bạn" title="Loại quả yêu thích" />
      <p class={readout}>{barData.map((b) => `${b.label} ${b.value}`).join(' · ')}</p>
      <BarChart data={barData} title="Cùng dữ liệu, chỉ xem" />
    </section>

    <section id="pie-chart" class={box}>
      <h2 class="text-xl font-bold">
        Biểu đồ hình quạt tròn <code class="text-sm">pie-chart</code>
      </h2>
      <PieChart bind:data={pieData} interactive title="Môn thể thao yêu thích" />
      <p class={readout}>
        {pieData.map((d) => `${d.label} ${formatNumber(d.value, 2)}`).join(' · ')}
      </p>
    </section>

    <section id="line-chart" class={box}>
      <h2 class="text-xl font-bold">Biểu đồ đoạn thẳng <code class="text-sm">line-chart</code></h2>
      <LineChart
        labels={months}
        bind:series={lineSeries}
        interactive
        unit="°C"
        title="Nhiệt độ trung bình"
      />
    </section>

    <section id="data-table" class={box}>
      <h2 class="text-xl font-bold">Bảng thống kê <code class="text-sm">data-table</code></h2>
      <DataTable
        bind:rows={tableRows}
        editable
        showTally
        showPercent
        caption="Màu áo của các bạn trong lớp"
        headers={{ label: 'Màu', count: 'Số bạn' }}
      />
    </section>

    <section id="probability-spinner" class={box}>
      <h2 class="text-xl font-bold">
        Vòng quay xác suất <code class="text-sm">probability-spinner</code>
      </h2>
      <ProbabilitySpinner
        bind:counts={spins}
        sectors={[{ label: 'Đỏ', weight: 2 }, { label: 'Xanh' }, { label: 'Vàng' }]}
      />
    </section>

    <section id="unit-converter" class={box}>
      <h2 class="text-xl font-bold">Đổi đơn vị <code class="text-sm">unit-converter</code></h2>
      <UnitConverter bind:value={converterValue} from="m" to="cm" />
    </section>

    <section id="clock-face" class={box}>
      <h2 class="text-xl font-bold">Đồng hồ <code class="text-sm">clock-face</code></h2>
      <ClockFace bind:minutes={clock} showDigital />
      <p class={readout}>{clock} phút kể từ 0 giờ · {formatTime(clock, { twelveHour: true })}</p>
    </section>

    <section id="base-ten-blocks" class={box}>
      <h2 class="text-xl font-bold">Khối cơ số 10 <code class="text-sm">base-ten-blocks</code></h2>
      <BaseTenBlocks bind:counts={blocks} places={4} />
    </section>

    <section id="counting-tray" class={box}>
      <h2 class="text-xl font-bold">Khay đếm <code class="text-sm">counting-tray</code></h2>
      <div class="kid">
        <CountingTray picture="strawberry" total={8} bind:count={trayCount} target={5} />
      </div>
      <p class={readout}>count = {trayCount}</p>
    </section>

    <section id="kid-pictures" class={box}>
      <h2 class="text-xl font-bold">Hình cho bé <code class="text-sm">kid/pictures</code></h2>
      {#each Object.entries(pictureGroups) as [group, names] (group)}
        <h3 class="font-semibold text-slate-700">{group}</h3>
        <ul class="flex flex-wrap gap-4">
          {#each names as name (name)}
            <li class="flex w-20 flex-col items-center gap-1 text-center text-xs text-slate-600">
              <Picture {name} size={56} />
              <span>{pictures[name]}</span>
              <code>{name}</code>
            </li>
          {/each}
        </ul>
      {/each}
    </section>
  </div>
</SiteShell>
