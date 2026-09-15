<script>
  import { base } from '$app/paths';
  import { t } from '$lib/i18n/index.js';
  import { vi as m } from '$lib/lessons/he-phuong-trinh-bac-nhat/copy.vi.js';
  import EquationCard from '$lib/lessons/he-phuong-trinh-bac-nhat/equation-card.svelte';
  import {
    solveSystem,
    clipToBox,
    constantThrough,
    isDegenerate,
  } from '$lib/algebra-engine/system.js';
  import SystemPlane from '$lib/lessons/he-phuong-trinh-bac-nhat/system-plane.svelte';

  const copy = t();

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
      : null
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
      ? m.caseUnique
      : solution.kind === 'parallel'
        ? m.caseParallel
        : solution.kind === 'coincident'
          ? m.caseCoincident
          : m.caseDegenerate
  );

  const offscreen = $derived(
    (seg1 === null && !isDegenerate(eq1)) || (seg2 === null && !isDegenerate(eq2))
  );

  const solutionMarkerLabel = $derived(
    solutionPoint ? `(${fmt(solutionPoint.x)}; ${fmt(solutionPoint.y)})` : ''
  );

  const solutionText = $derived(
    solution.kind === 'unique'
      ? `(x; y) = (${fmt(solution.point.x)}; ${fmt(solution.point.y)})`
      : m.noSolutionLabel
  );

  const plotLabel = $derived(
    `Đồ thị của hệ ${eq1Tex} và ${eq2Tex}. ${caseText}.`
  );

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
    { label: m.presetUnique, one: { a: 1, b: 1, c: 3 }, two: { a: 1, b: -1, c: 1 } },
    { label: m.presetParallel, one: { a: 1, b: 2, c: 4 }, two: { a: 2, b: 4, c: -6 } },
    { label: m.presetCoincident, one: { a: 1, b: 2, c: 4 }, two: { a: 2, b: 4, c: 8 } },
  ];

  function reset() {
    applyPreset(INIT_1, INIT_2);
  }

  const gridLines = Array.from({ length: SPAN * 2 + 1 }, (_, i) => i - SPAN);
</script>

<svelte:head>
  <title>{m.title} — {copy.site.title}</title>
  <meta name="description" content={m.intro} />
</svelte:head>

<header class="border-b border-slate-200 bg-white">
  <div class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
    <a href={base + '/'} class="text-xl font-bold text-indigo-600 tracking-tight">MathMax</a>
  </div>
</header>

<main class="bg-slate-50 min-h-screen">
  <article class="max-w-3xl mx-auto px-4 py-8">
    <nav class="mb-4 text-sm">
      <a href={base + '/dai-so/'} class="text-indigo-600 hover:underline">{copy.lessonChrome.backToTopic}</a>
    </nav>

    <header class="mb-6">
      <div class="text-sm uppercase tracking-wide text-slate-500">{m.gradeLabel}</div>
      <h1 class="text-3xl font-bold text-slate-900 mt-1 mb-2">{m.title}</h1>
      <p class="text-slate-700 leading-relaxed">{m.intro}</p>
    </header>

    <!-- Coefficient sliders, one card per equation -->
    <section class="mb-4">
      <p class="text-sm text-slate-500 mb-3">{m.instructionSlider}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EquationCard
          bind:a={eq1.a}
          bind:b={eq1.b}
          bind:c={eq1.c}
          title={m.eq1Label}
          tex={eq1Tex}
          accentClass="text-teal-700"
          coefMax={COEF_MAX}
          constMax={CONST_MAX}
          coefALabel={m.coefA}
          coefBLabel={m.coefB}
          coefCLabel={m.coefC}
        />
        <EquationCard
          bind:a={eq2.a}
          bind:b={eq2.b}
          bind:c={eq2.c}
          title={m.eq2Label}
          tex={eq2Tex}
          accentClass="text-indigo-700"
          coefMax={COEF_MAX}
          constMax={CONST_MAX}
          coefALabel={m.coefA}
          coefBLabel={m.coefB}
          coefCLabel={m.coefC}
        />
      </div>
    </section>

    <!-- SVG plane: grid, axes, both lines, intersection, drag handles -->
    <section class="mb-4">
      <p class="text-sm text-slate-500 mb-2">{m.instructionDrag}</p>
      <SystemPlane
        bind:svgEl
        view={VIEW}
        pad={PAD}
        {mx} {my}
        {gridLines}
        {seg1} {seg2}
        {handle1} {handle2}
        {drag1Opts} {drag2Opts}
        {solutionPoint}
        {solutionMarkerLabel}
        coincident={solution.kind === 'coincident'}
        {plotLabel}
        handle1Label="{m.handle1Label} — kéo hoặc dùng phím mũi tên"
        handle2Label="{m.handle2Label} — kéo hoặc dùng phím mũi tên"
      />
    </section>

    {#if offscreen}
      <p class="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900">
        {m.offscreenNote}
      </p>
    {/if}

    <!-- Case readout -->
    <section class="mb-6 rounded-lg border border-slate-200 bg-white p-5">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">{m.caseTitle}</h2>
      <p class="text-slate-900 font-medium mb-1">{caseText}</p>
      <p class="text-slate-700">
        <span class="text-sm text-slate-500">{m.solutionLabel}:</span>
        <span class="tabular-nums font-semibold">{solutionText}</span>
      </p>
    </section>

    <!-- aria-live (visually hidden): announces the case after input settles -->
    <div aria-live="polite" aria-atomic="true" class="sr-only">{ariaAnnounce}</div>

    <!-- Presets + reset -->
    <section class="mb-8">
      <h2 class="text-sm font-semibold text-slate-700 mb-2">{m.presetTitle}</h2>
      <div class="flex flex-wrap items-center gap-3">
        {#each presets as preset (preset.label)}
          <button
            onclick={() => applyPreset(preset.one, preset.two)}
            class="px-4 py-1.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors"
          >
            {preset.label}
          </button>
        {/each}
        <button
          onclick={reset}
          class="ml-auto px-4 py-1.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors"
        >
          {m.resetLabel}
        </button>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-lg font-bold text-slate-900 mb-2">{m.theoremTitle}</h2>
      <p class="rounded-lg bg-slate-100 p-4 text-slate-800">{m.theoremStatement}</p>
    </section>

    <section class="mb-10">
      <h2 class="text-lg font-bold text-slate-900 mb-2">{m.exampleTitle}</h2>
      <p class="text-slate-700 leading-relaxed">{m.exampleBody}</p>
    </section>

    <footer class="border-t border-slate-200 pt-4 text-sm text-slate-500">
      {m.nextTeaser}
    </footer>
  </article>
</main>
