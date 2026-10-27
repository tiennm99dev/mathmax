<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { numText } from '#lib/core/algebra-text.js';
  import { button } from '#lib/core/ui.js';
  import { PROBLEMS, measure, rootsOf } from './engine.js';

  const KEEP = '#059669';
  const DROP = '#dc2626';
  const MAIN = '#4f46e5';

  let problemId = $state(/** @type {string | number} */ ('vuon'));
  const problem = $derived(PROBLEMS.find((p) => p.id === problemId) ?? PROBLEMS[0]);
  /** Whether the equation panel is open, per problem. */
  let opened = $state(/** @type {Record<string, boolean>} */ ({}));

  // Garden: the corner of the rectangle, 18 px per metre from (20; 30).
  const S = 18;
  const GX = 20;
  const GY = 30;
  let width = $state(5);
  let corner = $state({ x: GX + 9 * S, y: GY + 5 * S });
  /** @param {{ x: number, y: number }} p */
  const widthFrom = (p) => {
    const est = ((p.x - GX) / S - 4 + (p.y - GY) / S) / 2;
    return Math.max(1, Math.min(14, Math.round(est * 2) / 2));
  };
  const projectCorner = (/** @type {{ x: number, y: number }} */ p) => {
    const w = widthFrom(p);
    return { x: GX + (w + 4) * S, y: GY + w * S };
  };

  // Car: the knob on the speed track, 0 to 60 km/h over 320 px.
  const TX = 30;
  const TLEN = 320;
  const KS = TLEN / 60;
  const HS = TLEN / 12;
  let speed = $state(20);
  let knob = $state({ x: TX + 20 * KS, y: 40 });
  /** @param {{ x: number, y: number }} p */
  const speedFrom = (p) => Math.max(10, Math.min(60, Math.round((p.x - TX) / KS / 5) * 5));
  const projectKnob = (/** @type {{ x: number, y: number }} */ p) => ({
    x: TX + speedFrom(p) * KS,
    y: 40,
  });

  /** @type {SVGSVGElement | undefined} */
  let gardenSvg = $state();
  /** @type {SVGSVGElement | undefined} */
  let carSvg = $state();
  const cornerOpts = $derived({
    point: corner,
    svg: () => gardenSvg ?? null,
    viewBox: { w: 380, h: 300 },
    projector: projectCorner,
    pad: 0,
    keyStep: S,
    keyShiftStep: 4 * S,
    onChange: () => (width = widthFrom(corner)),
  });
  const knobOpts = $derived({
    point: knob,
    svg: () => carSvg ?? null,
    viewBox: { w: 380, h: 220 },
    projector: projectKnob,
    pad: 0,
    keyStep: 5 * KS,
    keyShiftStep: 10 * KS,
    onChange: () => (speed = speedFrom(knob)),
  });

  const x = $derived(problem.id === 'vuon' ? width : speed);
  const m = $derived(measure(problem, x));
  const roots = $derived(rootsOf(problem));
  const open = $derived(Boolean(opened[problem.id]) || m.ok);
  const span = $derived(problem.id === 'vuon' ? 15 : 50);
  /** Position on the roots line, 20..360. @param {number} v */
  const lx = (v) => 190 + (v / span) * 170;
  const ticks = $derived(
    Array.from({ length: 7 }, (_, i) => ((i - 3) * span) / 3).map((v) => Math.round(v)),
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Bài toán"
    bind:value={problemId}
    options={PROBLEMS.map((p) => ({ value: p.id, label: p.label }))}
  />
  <p class="text-slate-800"><LiveRichText text={problem.statement} /></p>

  {#if problem.id === 'vuon'}
    {@const w = width}
    <svg
      bind:this={gardenSvg}
      viewBox="0 0 380 300"
      class="mx-auto block w-full max-w-md select-none rounded-lg border border-slate-200 bg-white"
      style="touch-action:none"
      role="group"
      aria-label={`Mảnh vườn hình chữ nhật: ${m.text}`}
    >
      <rect
        x={GX}
        y={GY}
        width={(w + 4) * S}
        height={w * S}
        fill={m.ok ? '#d1fae5' : '#e0e7ff'}
        stroke={m.ok ? KEEP : MAIN}
        stroke-width="2"
      />
      <text
        x={GX + ((w + 4) * S) / 2}
        y={GY - 10}
        text-anchor="middle"
        font-size="13"
        fill="#334155">x + 4 = {numText(w + 4)} m</text
      >
      <text x={GX + 6} y={GY + (w * S) / 2 + 4} font-size="13" fill="#334155"
        >x = {numText(w)} m</text
      >
      <text
        x={GX + ((w + 4) * S) / 2}
        y={w < 3 ? GY + w * S + 20 : GY + (w * S) / 2 + 20}
        text-anchor="middle"
        font-size="14"
        font-weight="700"
        fill={m.ok ? KEEP : MAIN}>S = {numText(m.quantities[2])} m²</text
      >
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Góc mảnh vườn, kéo để đổi chiều rộng x"
        aria-valuemin={1}
        aria-valuemax={14}
        aria-valuenow={w}
        aria-valuetext={`Chiều rộng ${numText(w)} m`}
        style="cursor:grab; outline:none"
        use:draggable={cornerOpts}
      >
        <circle
          class="drag-knob"
          cx={GX + (w + 4) * S}
          cy={GY + w * S}
          r="9"
          fill={MAIN}
          stroke="#fff"
          stroke-width="2"
        />
      </g>
    </svg>
  {:else}
    {@const t1 = m.quantities[0]}
    {@const t2 = m.quantities[1]}
    <svg
      bind:this={carSvg}
      viewBox="0 0 380 220"
      class="mx-auto block w-full max-w-md select-none rounded-lg border border-slate-200 bg-white"
      style="touch-action:none"
      role="group"
      aria-label={`Vận tốc dự định ${numText(speed)} km/h. ${m.text}`}
    >
      <text x={TX} y="20" font-size="12" fill="#334155">Vận tốc dự định x (km/h)</text>
      <line x1={TX} y1="40" x2={TX + TLEN} y2="40" stroke="#94a3b8" stroke-width="4" />
      {#each [0, 10, 20, 30, 40, 50, 60] as v (v)}
        <line x1={TX + v * KS} y1="34" x2={TX + v * KS} y2="46" stroke="#64748b" />
        <text x={TX + v * KS} y="60" text-anchor="middle" font-size="10" fill="#64748b">{v}</text>
      {/each}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Vận tốc dự định, kéo sang trái phải"
        aria-valuemin={10}
        aria-valuemax={60}
        aria-valuenow={speed}
        aria-valuetext={`${speed} km/h`}
        style="cursor:grab; outline:none"
        use:draggable={knobOpts}
      >
        <circle
          class="drag-knob"
          cx={TX + speed * KS}
          cy="40"
          r="9"
          fill={MAIN}
          stroke="#fff"
          stroke-width="2"
        />
      </g>

      <text x={TX} y="88" font-size="12" fill="#334155">Thời gian (giờ)</text>
      {#each [0, 2, 4, 6, 8, 10, 12] as h (h)}
        <line x1={TX + h * HS} y1="96" x2={TX + h * HS} y2="190" stroke="#e2e8f0" />
        <text x={TX + h * HS} y="206" text-anchor="middle" font-size="10" fill="#64748b">{h}</text>
      {/each}
      <rect x={TX} y="104" width={t1 * HS} height="24" rx="4" fill={MAIN} opacity="0.85" />
      <text x={TX + 4} y="121" font-size="11" fill="#fff" font-weight="700"
        >{numText(speed)} km/h</text
      >
      <rect x={TX} y="146" width={t2 * HS} height="24" rx="4" fill="#0f766e" opacity="0.85" />
      <text x={TX + 4} y="163" font-size="11" fill="#fff" font-weight="700"
        >{numText(speed + 10)} km/h</text
      >
      <rect
        x={TX + t2 * HS}
        y="146"
        width={(t1 - t2) * HS}
        height="24"
        fill="none"
        stroke={m.ok ? KEEP : '#d97706'}
        stroke-width="2"
        stroke-dasharray="4 3"
      />
      <text
        x={Math.min(TX + ((t1 + t2) / 2) * HS, 340)}
        y="186"
        text-anchor="middle"
        font-size="11"
        font-weight="700"
        fill={m.ok ? KEEP : '#b45309'}>sớm {numText(m.quantities[2])} giờ</text
      >
    </svg>
  {/if}

  <FeedbackNote tone={m.ok ? 'ok' : 'info'} text={m.text} />

  {#if !open}
    <button
      type="button"
      class={button.secondary}
      onclick={() => (opened = { ...opened, [problem.id]: true })}
    >
      Lập và giải phương trình
    </button>
  {:else}
    <div class="space-y-2 rounded-xl bg-slate-50 p-3">
      <p class="text-sm text-slate-700"><LiveRichText text={problem.unknown} /></p>
      <div class="overflow-x-auto text-center">
        {#each problem.setup as line (line)}
          <Tex math={line} display />
        {/each}
      </div>
      <svg
        viewBox="0 0 380 70"
        class="mx-auto block w-full max-w-md"
        role="img"
        aria-label={`Hai nghiệm trên trục số. ${roots.map((r) => r.reason).join(' ')}`}
      >
        <line x1="10" y1="35" x2="370" y2="35" stroke="#334155" stroke-width="1.5" />
        {#each ticks as v (v)}
          <line x1={lx(v)} y1="31" x2={lx(v)} y2="39" stroke="#334155" />
          <text x={lx(v)} y="52" text-anchor="middle" font-size="10" fill="#64748b"
            >{numText(v)}</text
          >
        {/each}
        <rect x={lx(0)} y="29" width={lx(span) - lx(0)} height="12" fill={KEEP} opacity="0.12" />
        <polygon points="{lx(x) - 6},12 {lx(x) + 6},12 {lx(x)},22" fill={MAIN} aria-hidden="true" />
        {#each roots as r (r.value)}
          {#if r.keep}
            <circle cx={lx(r.value)} cy="35" r="6" fill={KEEP} />
            <text
              x={lx(r.value)}
              y="66"
              text-anchor="middle"
              font-size="11"
              font-weight="700"
              fill={KEEP}>{numText(r.value)} nhận</text
            >
          {:else}
            <path
              d="M{lx(r.value) - 6} 29 L{lx(r.value) + 6} 41 M{lx(r.value) + 6} 29 L{lx(r.value) -
                6} 41"
              stroke={DROP}
              stroke-width="3"
            />
            <text
              x={lx(r.value)}
              y="66"
              text-anchor="middle"
              font-size="11"
              font-weight="700"
              fill={DROP}>{numText(r.value)} loại</text
            >
          {/if}
        {/each}
      </svg>
      <ul class="space-y-1 text-sm">
        {#each roots as r (r.value)}
          <li class={r.keep ? 'text-emerald-800' : 'text-rose-800'}>{r.reason}</li>
        {/each}
      </ul>
      <p class="text-sm text-slate-600">
        Vùng tô xanh là các giá trị thoả mãn điều kiện x > 0; tam giác chỉ giá trị em đang kéo trên
        sơ đồ, luôn nằm trong vùng đó.
      </p>
    </div>
  {/if}
</div>
