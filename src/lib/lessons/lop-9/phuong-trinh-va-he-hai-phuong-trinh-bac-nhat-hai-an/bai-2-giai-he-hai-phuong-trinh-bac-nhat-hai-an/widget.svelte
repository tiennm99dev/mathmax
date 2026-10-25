<script>
  import { button } from '#lib/core/ui.js';
  import EquationCard from './equation-card.svelte';
  import {
    solveSystem,
    clipToBox,
    constantThrough,
    isDegenerate,
  } from '#lib/algebra-engine/system.js';
  import SystemPlane from './system-plane.svelte';

  // SVG layout constants — same 20-unit square as the other plane lessons.
  const VIEW = 420;
  const PAD = 30;
  const SPAN = 10; // math units from origin to each edge
  const U = (VIEW - PAD * 2) / (SPAN * 2); // px per math unit

  /** Convert math x → SVG x */
  const mx = (/** @type {number} */ x) => PAD + (x + SPAN) * U;
  /** Convert math y → SVG y (Y-axis flipped in SVG) */
  const my = (/** @type {number} */ y) => PAD + (SPAN - y) * U;
  /** Convert SVG x → math x */
  const svgXtoMath = (/** @type {number} */ sx) => (sx - PAD) / U - SPAN;
  /** Convert SVG y → math y */
  const svgYtoMath = (/** @type {number} */ sy) => SPAN - (sy - PAD) / U;

  const COEF_MAX = 5; // slider bound for a and b
  const CONST_MAX = 20; // slider bound for c

  const INIT_1 = { a: 1, b: 1, c: 3 };
  const INIT_2 = { a: 1, b: -1, c: 1 };

  // ── Single source of truth: the six coefficients ────────────────────────────
  let eq1 = $state({ ...INIT_1 });
  let eq2 = $state({ ...INIT_2 });

  const seg1 = $derived(clipToBox(eq1, -SPAN, SPAN, -SPAN, SPAN));
  const seg2 = $derived(clipToBox(eq2, -SPAN, SPAN, -SPAN, SPAN));
  const solution = $derived(solveSystem(eq1, eq2));

  // Only show the intersection marker when it actually falls inside the plot.
  const solutionPoint = $derived(
    solution.kind === 'unique' &&
      Math.abs(solution.point.x) <= SPAN &&
      Math.abs(solution.point.y) <= SPAN
      ? solution.point
      : null,
  );

  // ── Drag handles: one per line, parked at the midpoint of its visible part ──
  let handle1 = $state({ x: mx(0), y: my(0) });
  let handle2 = $state({ x: mx(0), y: my(0) });

  // Direction 1: coefficients → handle pixel position.
  $effect(() => {
    if (!seg1) return;
    handle1.x = (mx(seg1[0].x) + mx(seg1[1].x)) / 2;
    handle1.y = (my(seg1[0].y) + my(seg1[1].y)) / 2;
  });
  $effect(() => {
    if (!seg2) return;
    handle2.x = (mx(seg2[0].x) + mx(seg2[1].x)) / 2;
    handle2.y = (my(seg2[0].y) + my(seg2[1].y)) / 2;
  });

  // Direction 2: handle drag → new constant term. Dragging translates the line
  // so it passes through the pointer; direction (a, b) is untouched. Driven by
  // the action's onChange hook, not by a state-watching effect, so slider
  // writes cannot bounce back.
  /** @param {{x: number, y: number}} handle @param {{a: number, b: number, c: number}} eq */
  function constantFromHandle(handle, eq) {
    const raw = constantThrough(eq, { x: svgXtoMath(handle.x), y: svgYtoMath(handle.y) });
    return Math.max(-CONST_MAX, Math.min(CONST_MAX, Math.round(raw)));
  }

  function handleDrag1() {
    eq1.c = constantFromHandle(handle1, eq1);
  }
  function handleDrag2() {
    eq2.c = constantFromHandle(handle2, eq2);
  }

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  /** Keep a dragged handle inside the plotted square. */
  const clampPx = (/** @type {{x: number, y: number}} */ p) => ({
    x: Math.max(mx(-SPAN), Math.min(mx(SPAN), p.x)),
    y: Math.max(my(SPAN), Math.min(my(-SPAN), p.y)),
  });

  const drag1Opts = $derived({
    point: handle1,
    svg: () => svgEl ?? null,
    viewBox: { w: VIEW, h: VIEW },
    projector: clampPx,
    pad: 0,
    keyStep: U,
    onChange: handleDrag1,
  });
  const drag2Opts = $derived({
    point: handle2,
    svg: () => svgEl ?? null,
    viewBox: { w: VIEW, h: VIEW },
    projector: clampPx,
    pad: 0,
    keyStep: U,
    onChange: handleDrag2,
  });

  // ── Presentation helpers ────────────────────────────────────────────────────

  /**
   * Render `a·x + b·y = c` as TeX. Coefficients are integers, so terms with a
   * coefficient of ±1 drop the digit and zero terms disappear entirely.
   * @param {{a: number, b: number, c: number}} eq
   */
  function eqTex(eq) {
    const term = (/** @type {number} */ coef, /** @type {string} */ sym) => {
      const mag = Math.abs(coef);
      return (mag === 1 ? '' : String(mag)) + sym;
    };
    let lhs = '';
    if (eq.a !== 0) lhs = (eq.a < 0 ? '-' : '') + term(eq.a, 'x');
    if (eq.b !== 0) {
      lhs =
        lhs === ''
          ? (eq.b < 0 ? '-' : '') + term(eq.b, 'y')
          : lhs + (eq.b < 0 ? ' - ' : ' + ') + term(eq.b, 'y');
    }
    if (lhs === '') lhs = '0';
    return `${lhs} = ${eq.c}`;
  }

  /** Integers stay integers; fractional solutions get two decimals. */
  const fmt = (/** @type {number} */ n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

  const eq1Tex = $derived(eqTex(eq1));
  const eq2Tex = $derived(eqTex(eq2));

  const caseText = $derived(
    solution.kind === 'unique'
      ? 'Hai đường thẳng cắt nhau — hệ có nghiệm duy nhất'
      : solution.kind === 'parallel'
        ? 'Hai đường thẳng song song — hệ vô nghiệm'
        : solution.kind === 'coincident'
          ? 'Hai đường thẳng trùng nhau — hệ có vô số nghiệm'
          : 'Một phương trình có a = b = 0 nên không phải phương trình bậc nhất hai ẩn',
  );

  const offscreen = $derived(
    (seg1 === null && !isDegenerate(eq1)) || (seg2 === null && !isDegenerate(eq2)),
  );

  const solutionMarkerLabel = $derived(
    solutionPoint ? `(${fmt(solutionPoint.x)}; ${fmt(solutionPoint.y)})` : '',
  );

  const solutionText = $derived(
    solution.kind === 'unique'
      ? `(x; y) = (${fmt(solution.point.x)}; ${fmt(solution.point.y)})`
      : 'Không có điểm chung',
  );

  const plotLabel = $derived(`Đồ thị của hệ ${eq1Tex} và ${eq2Tex}. ${caseText}.`);

  // Debounced aria-live announcement (300 ms) so dragging does not flood
  // screen readers with intermediate states.
  let ariaAnnounce = $state('');
  let announceTimer = /** @type {ReturnType<typeof setTimeout> | undefined} */ (undefined);
  $effect(() => {
    const msg = `${eq1Tex}; ${eq2Tex}. ${caseText}. ${solutionText}`;
    clearTimeout(announceTimer);
    announceTimer = setTimeout(() => {
      ariaAnnounce = msg;
    }, 300);
    return () => clearTimeout(announceTimer);
  });

  /**
   * @param {{a: number, b: number, c: number}} next1
   * @param {{a: number, b: number, c: number}} next2
   */
  function applyPreset(next1, next2) {
    eq1 = { ...next1 };
    eq2 = { ...next2 };
  }

  // Presets share the same (a, b) pair within each of the parallel/coincident
  // cases, so only the constant term distinguishes them.
  const presets = [
    { label: 'Cắt nhau', one: { a: 1, b: 1, c: 3 }, two: { a: 1, b: -1, c: 1 } },
    { label: 'Song song', one: { a: 1, b: 2, c: 4 }, two: { a: 2, b: 4, c: -6 } },
    { label: 'Trùng nhau', one: { a: 1, b: 2, c: 4 }, two: { a: 2, b: 4, c: 8 } },
  ];

  function reset() {
    applyPreset(INIT_1, INIT_2);
  }

  const gridLines = Array.from({ length: SPAN * 2 + 1 }, (_, i) => i - SPAN);
</script>

<div class="space-y-4">
  <div>
    <p class="text-sm text-slate-500 mb-3">Chỉnh hệ số a, b, c của từng phương trình</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <EquationCard
        bind:a={eq1.a}
        bind:b={eq1.b}
        bind:c={eq1.c}
        title="Phương trình (1)"
        tex={eq1Tex}
        accentClass="text-teal-700"
        coefMax={COEF_MAX}
        constMax={CONST_MAX}
        coefALabel="Hệ số a"
        coefBLabel="Hệ số b"
        coefCLabel="Hằng số c"
      />
      <EquationCard
        bind:a={eq2.a}
        bind:b={eq2.b}
        bind:c={eq2.c}
        title="Phương trình (2)"
        tex={eq2Tex}
        accentClass="text-indigo-700"
        coefMax={COEF_MAX}
        constMax={CONST_MAX}
        coefALabel="Hệ số a"
        coefBLabel="Hệ số b"
        coefCLabel="Hằng số c"
      />
    </div>
  </div>

  <div>
    <p class="text-sm text-slate-500 mb-2">
      Hoặc kéo điểm vuông trên mỗi đường thẳng để tịnh tiến nó (chỉ c thay đổi)
    </p>
    <SystemPlane
      bind:svgEl
      view={VIEW}
      pad={PAD}
      {mx}
      {my}
      {gridLines}
      {seg1}
      {seg2}
      {handle1}
      {handle2}
      {drag1Opts}
      {drag2Opts}
      {solutionPoint}
      {solutionMarkerLabel}
      coincident={solution.kind === 'coincident'}
      {plotLabel}
      handle1Label="Điểm kéo của đường thẳng (1) — kéo hoặc dùng phím mũi tên"
      handle2Label="Điểm kéo của đường thẳng (2) — kéo hoặc dùng phím mũi tên"
    />
  </div>

  {#if offscreen}
    <p class="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900">
      Có đường thẳng đang nằm ngoài khung nhìn. Giảm |c| hoặc tăng hệ số a, b để kéo nó trở lại.
    </p>
  {/if}

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
    <h3 class="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
      Số nghiệm của hệ
    </h3>
    <p class="text-slate-900 font-medium mb-1">{caseText}</p>
    <p class="text-slate-700">
      <span class="text-sm text-slate-500">Nghiệm:</span>
      <span class="tabular-nums font-semibold">{solutionText}</span>
    </p>
  </div>

  <div aria-live="polite" aria-atomic="true" class="sr-only">{ariaAnnounce}</div>

  <div>
    <h3 class="mb-2 text-sm font-semibold text-slate-700">Thử nhanh ba trường hợp</h3>
    <div class="flex flex-wrap items-center gap-3">
      {#each presets as preset (preset.label)}
        <button
          type="button"
          onclick={() => applyPreset(preset.one, preset.two)}
          class={button.quiet}
        >
          {preset.label}
        </button>
      {/each}
      <button type="button" onclick={reset} class="ml-auto {button.quiet}"> Đặt lại </button>
    </div>
  </div>
</div>
