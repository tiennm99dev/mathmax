<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { viewPoint } from '#lib/geom-engine/solid.js';
  import {
    coneMeasures,
    coneOutline,
    cylinderMeasures,
    fitBox,
    linePath,
    num,
    piText,
    rim,
    rimRuns,
    splitStrips,
    sweptStrips,
    unionPath,
  } from '../_shared/round-solids.js';

  /**
   * A cylinder made by turning the rectangle OBAO' about its side OO', or a
   * cone made by turning the right triangle SOA about its leg SO. The turn
   * angle sweeps the side surface strip by strip; at a full turn the solid
   * is complete and its net (a rectangle 2πr × h, or a sector of radius l
   * whose arc is 2πr) can be shown, with S_xq, S_tp and V computed live.
   */

  const W = 360;
  const H = 300;
  const UNIT = 21;
  const VIEW = { yaw: 0, pitch: 20 };
  const SIDE = '#6366F1';
  const BASE = '#F59E0B';
  const AXIS = '#DC2626';
  const SPIN_SECONDS = 3;

  /** @type {'tru' | 'non'} */
  let shape = $state('tru');
  /** @type {'quay' | 'trai'} */
  let mode = $state('quay');
  let r = $state(3);
  let h = $state(6);
  let phi = $state(360);
  let spinning = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;

  const tru = $derived(shape === 'tru');
  const full = $derived(phi >= 360);
  const steps = $derived(Math.max(1, Math.round(phi / 5)));
  const topR = $derived(tru ? r : 0);

  const centre = $derived(viewPoint({ x: 0, y: 0, z: h / 2 }, VIEW));
  /** @param {{ x: number, y: number, z: number }} p */
  const at = (p) => {
    const v = viewPoint(p, VIEW);
    return { x: W / 2 + UNIT * (v.x - centre.x), y: H / 2 + 6 + UNIT * (v.y - centre.y) };
  };

  const strips = $derived(phi > 0 ? sweptStrips(r, 0, topR, h, 0, phi, steps) : []);
  const split = $derived(splitStrips(strips, VIEW));
  const backPath = $derived(unionPath(split.back.map((s) => s.map(at))));
  const frontPath = $derived(unionPath(split.front.map((s) => s.map(at))));
  const bottomRim = $derived(phi > 0 ? rim(r, 0, 0, phi, steps) : []);
  const bottomRuns = $derived(rimRuns(bottomRim, VIEW));
  const topRim = $derived(tru && phi > 0 ? rim(r, h, 0, phi, steps) : []);
  const O = { x: 0, y: 0, z: 0 };
  const top = $derived({ x: 0, y: 0, z: h });
  const bottomSector = $derived(phi > 0 ? unionPath([[O, ...bottomRim].map(at)]) : '');
  const topSector = $derived(topRim.length ? unionPath([[top, ...topRim].map(at)]) : '');

  /** The generating figure at the current turn: OBAO' or SOA. */
  const figure = $derived.by(() => {
    const t = (phi * Math.PI) / 180;
    const B = { x: r * Math.cos(t), y: r * Math.sin(t), z: 0 };
    const A = { ...B, z: h };
    return tru ? { O, B, A, T: top } : { O, B, A: top, T: top };
  });

  /** Outline lines of the finished solid. */
  const outline = $derived.by(() => {
    if (!full) return [];
    if (tru) {
      return [0, 180].map((d) => {
        const p = rim(r, 0, d, d, 1)[0];
        return { id: d, a: at(p), b: at({ ...p, z: h }) };
      });
    }
    const touch = coneOutline(r, h, VIEW);
    if (!touch) return [];
    return touch.map((d) => ({ id: d, a: at(rim(r, 0, d, d, 1)[0]), b: at(top) }));
  });

  const cyl = $derived(cylinderMeasures(r, h));
  const cone = $derived(coneMeasures(r, h));
  const exactL = $derived(Math.abs(cone.l - Math.round(cone.l)) < 1e-9);
  const lText = $derived(exactL ? `= ${num(cone.l)}` : `≈ ${num(cone.l, 2)}`);

  /** The net in its own drawing: model units with y down. */
  const net = $derived.by(() => {
    if (tru) {
      const c = Math.PI * r;
      const rect = [
        { x: -c, y: 0 },
        { x: c, y: 0 },
        { x: c, y: h },
        { x: -c, y: h },
      ];
      const circle = (/** @type {number} */ cy) =>
        rim(r, 0, 0, 360, 72).map((p) => ({ x: p.x, y: cy + p.y }));
      const up = circle(-r);
      const down = circle(h + r);
      const fit = fitBox([...rect, ...up, ...down], W, 240, 30);
      return {
        side: rect.map(fit),
        bases: [up.map(fit), down.map(fit)],
        labels: [
          {
            id: 'c',
            ...fit({ x: 0, y: h / 2 }),
            dx: 0,
            anchor: 'middle',
            text: `2πr ≈ ${num(cyl.circumference)} cm`,
          },
          { id: 'h', ...fit({ x: c, y: h / 2 }), dx: 8, text: `h = ${num(h)}`, anchor: 'start' },
          { id: 'r', ...fit({ x: 0, y: -r }), dx: 0, anchor: 'middle', text: `r = ${num(r)}` },
        ],
      };
    }
    const l = cone.l;
    const a = cone.angle;
    const arc = rim(l, 0, 90 - a / 2, 90 + a / 2, 72).map((p) => ({ x: p.x, y: p.y }));
    const sector = [{ x: 0, y: 0 }, ...arc];
    const base = rim(r, 0, 0, 360, 72).map((p) => ({ x: p.x, y: l + r + p.y }));
    const fit = fitBox([...sector, ...base], W, 240, 30);
    const edge = arc[0];
    return {
      side: sector.map(fit),
      bases: [base.map(fit)],
      labels: [
        { id: 'a', ...fit({ x: 0, y: l * 0.35 }), dx: 0, anchor: 'middle', text: `α ≈ ${num(a)}°` },
        { id: 'l', ...fit({ x: edge.x / 2, y: edge.y / 2 }), dx: 10, text: `l`, anchor: 'start' },
        { id: 'r', ...fit({ x: 0, y: l + r }), dx: 0, anchor: 'middle', text: `r = ${num(r)}` },
      ],
    };
  });

  const feedback = $derived.by(() => {
    if (mode === 'trai') {
      return tru
        ? `Cắt dọc một đường sinh rồi trải phẳng mặt xung quanh, ta được một hình chữ nhật có một cạnh bằng chiều cao h = ${num(h)} cm và cạnh kia bằng chu vi đáy 2πr = ${piText(2 * r)} ≈ ${num(cyl.circumference)} cm. Diện tích hình chữ nhật: 2πr · h = ${piText(cyl.k.lateral)} ≈ ${num(cyl.lateral)} cm², đúng bằng $S_{xq}$.`
        : `Cắt dọc một đường sinh rồi trải phẳng mặt xung quanh, ta được một hình quạt tròn bán kính l ${lText} cm, có độ dài cung bằng chu vi đáy 2πr ≈ ${num(cone.circumference)} cm, nên số đo cung α = 360° · r : l ≈ ${num(cone.angle)}°. Diện tích hình quạt: πl² · α : 360 = πrl ≈ ${num(cone.lateral)} cm², đúng bằng $S_{xq}$.`;
    }
    if (!full) {
      return tru
        ? `Hình chữ nhật OBAO' đã quay ${phi}° quanh cạnh OO' cố định. Cạnh AB quét nên mặt xung quanh, cạnh OB quét nên một đáy, cạnh O'A quét nên đáy kia.`
        : `Tam giác SOA vuông tại O đã quay ${phi}° quanh cạnh góc vuông SO cố định. Cạnh SA quét nên mặt xung quanh, cạnh OA quét nên mặt đáy.`;
    }
    return tru
      ? `Quay trọn một vòng, ta được hình trụ có bán kính đáy r = OB = ${num(r)} cm và chiều cao h = OO' = ${num(h)} cm. AB là một đường sinh: mọi đường sinh đều song song với trục OO' và dài bằng chiều cao.`
      : `Quay trọn một vòng, ta được hình nón đỉnh S, bán kính đáy r = OA = ${num(r)} cm, chiều cao h = SO = ${num(h)} cm. SA là một đường sinh: l = √(r² + h²) ${lText} cm.`;
  });

  function spin() {
    if (spinning) return;
    mode = 'quay';
    if (reducedMotion()) {
      phi = 360;
      return;
    }
    let angle = phi >= 360 ? 0 : phi;
    phi = angle;
    spinning = true;
    stop = frameLoop((dt) => {
      angle = Math.min(360, angle + (360 * dt) / SPIN_SECONDS);
      phi = Math.round(angle);
      if (angle < 360) return;
      spinning = false;
      stop?.();
      stop = null;
    });
  }

  function halt() {
    stop?.();
    stop = null;
    spinning = false;
  }

  $effect(() => () => stop?.());

  /** @param {number} v */
  const deg = (v) => `${v}°`;
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Hình khối"
      options={[
        { value: 'tru', label: 'Hình trụ' },
        { value: 'non', label: 'Hình nón' },
      ]}
      bind:value={shape}
    />
    <SegmentedControl
      label="Cách xem"
      options={[
        { value: 'quay', label: 'Quay tạo hình' },
        { value: 'trai', label: 'Trải phẳng' },
      ]}
      bind:value={mode}
      onchange={halt}
    />
  </div>

  <div class="rounded-xl border border-slate-200 bg-white">
    {#if mode === 'quay'}
      <svg
        viewBox="0 0 {W} {H}"
        class="block h-auto w-full select-none"
        role="img"
        aria-label="{tru ? 'Hình trụ' : 'Hình nón'} bán kính đáy {num(r)} cm, chiều cao {num(
          h,
        )} cm, đã quay {phi} độ"
      >
        <path d={bottomSector} fill={BASE} fill-opacity="0.18" />
        <path d={backPath} fill={SIDE} fill-opacity="0.12" />
        {#each bottomRuns.filter((run) => !run.front) as run, i (i)}
          <path
            d={linePath(run.pts.map(at))}
            fill="none"
            stroke="#64748B"
            stroke-width="1.5"
            stroke-dasharray="5 4"
          />
        {/each}
        <line
          x1={at(O).x}
          y1={at(O).y}
          x2={at(top).x}
          y2={at(top).y}
          stroke={AXIS}
          stroke-width="2"
          stroke-dasharray="6 4"
        />
        <path d={frontPath} fill={SIDE} fill-opacity="0.22" />
        {#if topSector}
          <path d={topSector} fill={BASE} fill-opacity="0.25" />
        {/if}
        {#each bottomRuns.filter((run) => run.front) as run, i (i)}
          <path d={linePath(run.pts.map(at))} fill="none" stroke="#1E293B" stroke-width="2" />
        {/each}
        {#if topRim.length}
          <path d={linePath(topRim.map(at))} fill="none" stroke="#1E293B" stroke-width="2" />
        {/if}
        {#each outline as o (o.id)}
          <line x1={o.a.x} y1={o.a.y} x2={o.b.x} y2={o.b.y} stroke="#1E293B" stroke-width="2" />
        {/each}
        {#if figure}
          {@const f = figure}
          {@const b = at(f.B)}
          {@const a = at(f.A)}
          {@const o = at(f.O)}
          {@const t = at(f.T)}
          <path
            d={unionPath([(tru ? [f.O, f.B, f.A, f.T] : [f.O, f.B, f.T]).map(at)])}
            fill="#4F46E5"
            fill-opacity="0.18"
            stroke="#4F46E5"
            stroke-width="3"
            stroke-linejoin="round"
          />
          <text
            x={(o.x + b.x) / 2}
            y={(o.y + b.y) / 2 + 16}
            text-anchor="middle"
            font-size="13"
            font-weight="700"
            fill="#B45309">r</text
          >
          <text
            x={o.x - 8}
            y={(o.y + t.y) / 2}
            text-anchor="end"
            font-size="13"
            font-weight="700"
            fill={AXIS}>h</text
          >
          {#if !tru}
            <text
              x={(b.x + a.x) / 2 + (b.x >= o.x ? 10 : -10)}
              y={(b.y + a.y) / 2}
              text-anchor={b.x >= o.x ? 'start' : 'end'}
              font-size="13"
              font-weight="700"
              fill="#4F46E5">l</text
            >
          {/if}
          {#each [{ n: 'O', p: o, dy: 18 }, { n: tru ? "O'" : 'S', p: t, dy: -8 }, { n: tru ? 'B' : 'A', p: b, dy: 18 }, ...(tru ? [{ n: 'A', p: a, dy: -8 }] : [])] as l (l.n)}
            <text
              x={l.p.x}
              y={l.p.y + l.dy}
              text-anchor="middle"
              font-size="14"
              font-weight="700"
              fill="#0F172A"
              paint-order="stroke"
              stroke="#FFFFFF"
              stroke-width="3">{l.n}</text
            >
          {/each}
        {/if}
      </svg>
    {:else}
      <svg
        viewBox="0 0 {W} 240"
        class="block h-auto w-full select-none"
        role="img"
        aria-label={tru
          ? `Hình khai triển của hình trụ: hình chữ nhật ${num(cyl.circumference)} cm nhân ${num(h)} cm và hai hình tròn bán kính ${num(r)} cm`
          : `Hình khai triển của hình nón: hình quạt bán kính ${num(cone.l, 2)} cm, số đo cung ${num(cone.angle)} độ, và hình tròn bán kính ${num(r)} cm`}
      >
        <path
          d={unionPath([net.side])}
          fill={SIDE}
          fill-opacity="0.25"
          stroke="#1E293B"
          stroke-width="2"
        />
        {#each net.bases as b, i (i)}
          <path
            d={unionPath([b])}
            fill={BASE}
            fill-opacity="0.3"
            stroke="#1E293B"
            stroke-width="2"
          />
        {/each}
        {#each net.labels as l (l.id)}
          <text
            x={l.x + l.dx}
            y={l.y + 5}
            text-anchor={l.anchor}
            font-size="13"
            font-weight="700"
            fill="#0F172A"
            paint-order="stroke"
            stroke="#FFFFFF"
            stroke-width="3">{l.text}</text
          >
        {/each}
      </svg>
    {/if}
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Bán kính đáy r" bind:value={r} min={1} max={5} unit="cm" />
    <SliderField label="Chiều cao h" bind:value={h} min={2} max={10} unit="cm" />
    <SliderField
      label="Góc quay"
      bind:value={phi}
      min={0}
      max={360}
      step={15}
      format={deg}
      oninput={() => {
        halt();
        mode = 'quay';
      }}
    />
  </div>
  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={spin} disabled={spinning}>
      Quay một vòng
    </button>
  </div>

  <dl class="grid grid-cols-1 gap-2 text-sm tabular-nums sm:grid-cols-3">
    {#if tru}
      <div class="rounded-lg bg-indigo-50 p-2">
        <dt class="text-indigo-800">S<sub>xq</sub> = 2πrh</dt>
        <dd class="font-semibold">{piText(cyl.k.lateral)} ≈ {num(cyl.lateral)} cm²</dd>
      </div>
      <div class="rounded-lg bg-amber-50 p-2">
        <dt class="text-amber-800">S<sub>tp</sub> = 2πrh + 2πr²</dt>
        <dd class="font-semibold">{piText(cyl.k.total)} ≈ {num(cyl.total)} cm²</dd>
      </div>
      <div class="rounded-lg bg-sky-50 p-2">
        <dt class="text-sky-800">V = πr²h</dt>
        <dd class="font-semibold">{piText(cyl.k.volume)} ≈ {num(cyl.volume)} cm³</dd>
      </div>
    {:else}
      <div class="rounded-lg bg-indigo-50 p-2">
        <dt class="text-indigo-800">S<sub>xq</sub> = πrl</dt>
        <dd class="font-semibold">≈ {num(cone.lateral)} cm²</dd>
      </div>
      <div class="rounded-lg bg-amber-50 p-2">
        <dt class="text-amber-800">S<sub>tp</sub> = πrl + πr²</dt>
        <dd class="font-semibold">≈ {num(cone.total)} cm²</dd>
      </div>
      <div class="rounded-lg bg-sky-50 p-2">
        <dt class="text-sky-800">V = ⅓πr²h</dt>
        <dd class="font-semibold">{piText(cone.k.volume)} ≈ {num(cone.volume)} cm³</dd>
      </div>
    {/if}
  </dl>

  <p class="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-950" aria-live="polite">
    <LiveRichText text={feedback} />
  </p>
</div>
