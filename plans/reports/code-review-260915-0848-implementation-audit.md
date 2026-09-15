# MathMax — implementation audit (2026-09-15)

Reviewer: code-reviewer. Review only, no source modified.

## Scope

- All of `src/` (8 shipped lessons + engines + actions + i18n), config, CI, docs.
- ~3.1k LOC source, 9 test files.
- **Tree was not clean.** A 9th lesson (`algebra-engine/system.js`, `lessons/he-phuong-trinh-bac-nhat/`, `routes/dai-so/he-phuong-trinh-bac-nhat/`) was being written by another agent *during* this review (untracked, mtimes 08:50–08:53). Those files got a shallow pass only; see §In-flight.

## Verification actually run

| Command | Result |
|---|---|
| `npm test` | PASS — 8 files / 75 tests at review start; 9 files / 92 tests after the in-flight lesson landed |
| `npm run check` | **FAIL from clean checkout**: `ERROR "jsconfig.json" 1:1 "Cannot read file '.../.svelte-kit/tsconfig.json'"`. PASS (264 files, 0 errors) only after `npx svelte-kit sync` |
| `npm run build` | PASS, `Wrote site to "build"` |
| built CSS inspection | see C1 — utilities missing |
| `node` harness on engine modules | see C2/C3/C4/M3/M4 — numeric confirmations |
| `svelte.compile` on the sieve aria-label | see H3 |

---

## CRITICAL

### C1 — Production ships with ~no Tailwind styling (theme utilities never generated) · CONFIRMED
`src/app.css:5-7` uses Tailwind v3 directives (`@tailwind base; @tailwind components; @tailwind utilities;`) but `package.json` pins `tailwindcss@^4.3.3` / `@tailwindcss/postcss@^4.3.3`. In v4 those directives do not import the theme layer, so **no `@theme` variables are emitted** and every theme-driven utility silently disappears.

Evidence — grep over the emitted `0.*.css` (41 KB, of which 22.6 KB is KaTeX + 29 `@font-face`):

```
--color-slate  0   --spacing 0   --radius 0   --breakpoint 0   --text-sm 0   --font-weight 0
.bg-white 0   .text-slate-900 0   .px-4 0   .py-8 0   .mb-6 0   .gap-4 0
.rounded-lg 0 .max-w-4xl 0 .border-slate-200 0 .text-sm 0 .font-bold 0
.md\: 0       .hover\:bg-indigo-700 0        preflight markers 0
.flex 1  .grid-cols-10 1  .sr-only 1  .min-h-screen 1  .rounded-full 1   ← static-value utilities only
```

Failure scenario: open the deployed site → no colors, no padding/margins, no type scale, no border radius, no `md:` responsive layout, no `hover:`/`focus-visible:` states, no preflight reset. Every page is effectively unstyled beyond raw flex/grid/display. CI is green because CI only runs `npm run build`, and the build does not fail on missing utilities (H4).

Fix: replace lines 5-7 with `@import 'tailwindcss';`. `tailwind.config.js` is also inert under v4 — either add `@config './tailwind.config.js';` or move the `pair` palette into `@theme`. (Note: `pair-*` classes are referenced 0 times anyway — L1.) `autoprefixer` in `postcss.config.js` is redundant under v4.

### C2 — Sieve grid permanently locks after clicking any prime > 50 · CONFIRMED
`src/lib/lessons/sang-eratosthenes/grid-interaction.svelte.js:64-84`. `rippling = true` is set before the stagger loop, and `rippling = false` only runs inside the *last* timeout callback. When `multiples.length === 0` the loop body never executes.

```
multiplesOf(53,100) = []   multiplesOf(59,100) = []   multiplesOf(97,100) = []
```

Scenario: student clicks 53 → `rippling` stays `true` forever → line 42 `if (rippling) return;` rejects every subsequent cell click, `aria-readonly="true"` sticks on the grid (page:71), and no announcement fires. Only "Đặt lại" recovers. Reachable on 10 of the 25 primes in the grid.

Fix: `if (multiples.length === 0) { announcement = buildAnnouncement(n, multiples); return; }` before setting `rippling`, or set `rippling` only when there is work to schedule.

### C3 — Pythagoras lesson: the proof animation is geometrically wrong and half off-canvas · CONFIRMED
`src/routes/hinh-hoc/dinh-ly-pythagoras/+page.svelte` + `src/lib/lessons/dinh-ly-pythagoras/geom-helpers.js`.

(a) At the initial state `R = {160,280}` (a=180, b=160, c=240.8), `squareC` returns
`[(160,100), (320,280), (500,120), (340,-60)]` — two vertices outside the `0 0 400 400` viewBox. The hypotenuse square, the thing the lesson is about, is clipped from the first paint. Every reachable `R` in the clamp range `x∈[60,280], y∈[140,340]` except the extreme small-triangle corner produces overflow.

(b) `lerpPoly(sqA, tgtA, t)` (page:47-48) is presented as a shear, but vertex-wise lerp between two parallelograms does not preserve area. Shoelace area over the tween, with a²=32400:

```
t:     0.00     0.25     0.50     0.75     1.00
area:  32400    13519     3575    18881    32400
```

The red square collapses to 11 % of its area mid-animation (and passes through near-degenerate), then re-inflates. A lesson whose entire claim is "shearing preserves area" animates the opposite. Endpoints are correct, so the dev-only assertion at page:81-86 never catches it — and that assertion is a phantom anyway (L9).

Fix: animate an actual shear (`geom-engine/transforms.js` already exports `shear`/`compose`/`applyToPolygon` and is otherwise unused — M10), or stage it classically: square → shear along leg → rotate → shear into the sub-rectangle. Rescale the layout so square-c fits the viewBox.

### C4 — Inscribed-angle lesson contradicts its own theorem on the minor arc · CONFIRMED
`src/routes/hinh-hoc/goc-noi-tiep/+page.svelte:18-19`. `M` is projected anywhere on the circle (`projectToCircle`), and `central` is the *unsigned* `angleAtVertex(A, O, B) ∈ [0,180]`. With A at 150°, B at 30°:

```
M@270  inscribed 60.0   central 120.0   ✓ theorem holds
M@300  inscribed 60.0   central 120.0   ✓
M@ 45  inscribed 120.0  central 120.0   ✗
M@ 90  inscribed 120.0  central 120.0   ✗
M@120  inscribed 120.0  central 120.0   ✗
```

Scenario: student drags M across A or B onto the short arc and the readout shows "góc nội tiếp 120° / góc ở tâm 120°", flatly contradicting `theoremStatement`. There is no arc constraint and no reflex-angle handling. Also `angleAtVertex` returns `0` when M lands exactly on A or B (`circle.js:40`), displaying a silent, meaningless `0.0°`.

Fix: constrain the projector to the major arc, or compute the central angle as the reflex arc on the side opposite M and label it accordingly.

---

## HIGH

### H1 — Keyboard focus is invisible on every draggable handle · CONFIRMED
`src/app.css:22` styles `svg [role='slider']:focus-visible`. Not one element in the repo uses `role="slider"` — all 10 handles use `role="button"` **plus inline `style="…outline:none"`**:
`cartesian-plane.svelte:113-116,121-127`, `dinh-ly-pythagoras/+page.svelte:147-150`, `goc-noi-tiep/+page.svelte:94-97`, `tam-giac-bang-nhau/+page.svelte:116,118,120,123,125,127`.
Scenario: Tab to a vertex → nothing visually changes (default outline suppressed, custom rule never matches) → arrow keys move an unidentifiable handle. WCAG 2.4.7 failure on the primary interaction of 4 of 8 lessons. Compounded by C1 (the `focus-visible:` Tailwind variants used on buttons are also missing).

### H2 — Interactive handles are hidden from assistive tech by `role="img"`
All interactive SVGs declare `role="img"` on the root: `cartesian-plane.svelte:63`, `dinh-ly-pythagoras:117`, `goc-noi-tiep:67`, `tam-giac-bang-nhau:82`, `tam-giac-dong-dang:70`. `role="img"` prunes descendants from the accessibility tree, so the carefully written per-handle `aria-label`s are never exposed — yet the handles stay in the tab order (focusable element inside a presentational subtree). Screen-reader users get a focus stop that announces the *image* label or nothing.
Fix: `role="application"`/`role="group"` (or drop the role and label the wrapper) for SVGs that contain focusable children; keep `role="img"` only for `tam-giac-dong-dang` (no interactive children).

### H3 — Sieve cell aria-label leaks a literal `$` · CONFIRMED
`src/routes/so-hoc/sang-eratosthenes/+page.svelte:86` mixes JS template-literal syntax into a Svelte attribute:
`aria-label="{n}{isCrossed ? ... : ''}${color ? ' — số nguyên tố đã chọn' : ''}"`.
Compiling that attribute with `svelte/compiler` emits `aria-label="1$"`. Every one of the 100 cells announces a trailing dollar sign; marked primes announce "7$ — số nguyên tố đã chọn". Fix: drop the `$` before `{color ? …}`.

### H4 — CI cannot catch any of the above
`.github/workflows/ci.yml` runs `npm ci` + `npm run build` only — no `npm test`, no `npm run check`. `deploy.yml` likewise. Separately, `npm run check` **fails on a clean checkout** because it does not `svelte-kit sync` first (reproduced above), so the one type-safety gate is not runnable as documented in README.
Fix: add `test` and `check` steps to `ci.yml`; make the check script `svelte-kit sync && svelte-check --tsconfig ./jsconfig.json`.

### H5 — Congruence lesson's success state is practically unreachable
`tam-giac-bang-nhau/+page.svelte:30` → `congruentSSS(t1, t2)` with default `EPSILON_LEN = 0.5` **viewBox units**, applied to all three sides simultaneously. The SVG is `viewBox="0 0 400 300"` rendered at ~700 CSS px wide, so 1 screen pixel ≈ 0.57 viewBox units — a single-pixel mouse move can exceed the tolerance; keyboard step is 2 units (draggable default). The two triangles start congruent (T2 = T1 + (160,0)), so the only available interaction is *losing* the badge and then failing to recover it.
Fix: give the lesson its own tolerance (e.g. 4–6 units) rather than reusing the engine epsilon, or snap vertices to a grid.

### H6 — `role="button"` handles honour no button interaction
All drag handles claim `role="button"` but `draggable.svelte.js:58-71` only handles Arrow keys — Enter/Space do nothing. The announced contract ("button") is wrong for a positional control; `role="slider"` with `aria-valuenow/valuemin/valuemax/valuetext` (which the existing CSS already anticipates, H1) matches the actual behaviour and would make the value audible during keyboard adjustment.

---

## MEDIUM

### M1 — `draggable` pointer handling gaps
`src/lib/actions/draggable.svelte.js`
- `onPointerDown:39` accepts any button and any pointer: right-click or a second touch starts a drag. Guard on `e.button === 0 && e.isPrimary`.
- No `lostpointercapture` listener. If capture is lost without `pointerup`/`pointercancel`, `active` stays set and the handle keeps following the bare cursor on `pointermove`.
- `destroy():84` removes listeners but never releases an active capture.
- `setPointerCapture` at :41 is unguarded; a `NotFoundError` there leaves `active` set with no capture.
- `apply():33` treats `pad === 0` as "skip clamping entirely" rather than "clamp with zero padding". Three call sites rely on this (`goc-noi-tiep:28`, `duong-thang:85,95`, `dinh-ly-pythagoras:59`); a future caller passing `pad: 0` to mean "clamp to the edge" gets unbounded coordinates. Use `pad ?? 16` and a separate `clamp: false`.

### M2 — Shift+Arrow moves *less* than Arrow in the line lesson
`duong-thang/+page.svelte:87,96` set `keyStep: U` (18 px ≈ 1 math unit) but leave `keyShiftStep` unset, so it defaults to `10` (`draggable.svelte.js:59`). Shift+ArrowUp moves 10 px, plain ArrowUp moves 18 px — the "coarse" modifier is finer than the default.

### M3 — `lcm` loses precision above 2^53 · CONFIRMED
`numtheory-engine/gcd.js:32` computes `(a*b)/gcd(a,b)`. `lcm(123456789, 987654321)` returns `13548070123626140`; the exact value is `13548070123626141`. Currently unreachable through the UI (inputs clamped to [1,999] at `uoc-chung-lon-nhat/+page.svelte:15-16`), but it is an exported engine contract. Fix: `(a / gcd(a,b)) * b`.

### M4 — `gcdSteps` violates its own documented contract for `b = 0` · CONFIRMED
`gcd.js:38-51`: the doc says "Last row's `b` is the gcd", but `gcdSteps(12, 0)` returns `[{a:12,b:0,q:0,r:0}]` — last row `b = 0` while `gcd(12,0) = 12`. `gcd.test.js:59` ("last row b equals gcd") and `:64` ("handles b=0 initial") both pass because they test disjoint cases, so the test suite encodes the inconsistency instead of catching it. Unreachable from the UI (inputs ≥ 1), but any new caller reading `steps.at(-1).b` gets 0.

### M5 — Pixel-scale epsilon used as a math-space threshold
`algebra-engine/linear.js:14` rejects a line as "vertical" when `|p2.x - p1.x| < EPSILON_LEN` (0.5), importing the *geometry pixel* epsilon into math coordinates. Two math points at x = 0.0 and x = 0.4 return `null` instead of a slope. The current caller passes x = ±5 so it is latent; `system.js` (in-flight) gets this right with its own `EPSILON_COEF` and a comment explaining why — mirror that here.

### M6 — Timers never cleaned up
- `grid-interaction.svelte.js:83` — `pendingTimeouts` only ever grows (never trimmed after completion); the 400 ms shake timeout at `:47` is untracked and not cleared by `handleReset`, so a reset during a shake re-clears `shakeIndex` afterwards; nothing is cleared on unmount.
- `duong-thang/+page.svelte:112-116` — the announce `$effect` returns no cleanup; a pending 300 ms timer writes `$state` after navigation.
- `dinh-ly-pythagoras/+page.svelte:28,62-65` — `debounceId` is never cleared on destroy.

### M7 — Pythagoras prove/reset race
`dinh-ly-pythagoras/+page.svelte:69-79`: `await tp.set(1)` then `phase = 'proven'`. Clicking "Đặt lại" mid-animation sets `phase = 'idle'` and `tp.set(0, {duration:0})`; if the awaited promise then settles, `phase` flips to `'proven'` with `$tp = 0`, i.e. the "proven" chrome over un-animated squares. Guard with a generation counter, or check `phase === 'animating'` before assigning.

### M8 — Unthrottled `aria-live` regions
`tam-giac-bang-nhau/+page.svelte:135` wraps six side lengths in `aria-live="polite"` and `goc-noi-tiep/+page.svelte:55` wraps two angles — both update on every pointermove frame. The other two drag lessons debounce to 300 ms; these two will flood a screen reader during a drag. Reuse one debounce helper across all four.

### M9 — Duplication that belongs in the registry / a shared shell
- `routes/so-hoc/+page.svelte`, `routes/dai-so/+page.svelte`, `routes/hinh-hoc/+page.svelte` are byte-identical apart from a topic key and an `aria-label` string (`diff` shows 4 differing lines out of 59). One `<TopicIndex topic="…">` component, or a prerendered `[topic]` route.
- All 9 lesson pages re-implement the same header / back-nav / grade-label / theorem / example / footer block (~50 lines each). A `<LessonShell>` fed from `registry.js` removes ~450 duplicated lines and would make H1/H2/M8 one-line fixes instead of ten.
- `PAIR1/PAIR2/PAIR3` hex literals are re-declared in `tam-giac-bang-nhau:12-14`, `tam-giac-dong-dang:12-14`, `hieu-hai-binh-phuong:10-11`, and again as a Map in `sang-eratosthenes:10-15`; `tailwind.config.js` declares the same palette as `colors.pair.*`, referenced 0 times. One exported palette module.
- The lesson URL is rebuilt as `base + '/<topic>/<slug>/'` in 12 places while `registry.js` already holds both `topic` and `slug`. Add `lessonHref(lesson)` there.

### M10 — `geom-engine/transforms.js` is dead product code
99 lines + ~100 lines of tests for `translate/rotate/shear/compose/applyToPoint/applyToPolygon/approxEqualMat`; zero imports outside `index.js` and its own test. Meanwhile the Pythagoras lesson hand-rolls a *wrong* polygon morph (C3). Either use the module there or delete it; as-is the test suite's largest file covers code no user reaches.

### M11 — Sieve grid announces 100 rows of 1 column
`sang-eratosthenes/+page.svelte:79-103` wraps each `role="gridcell"` in its own `role="row"`. The visual layout is 10×10; AT will report a 100×1 grid, so "row 7, column 1" is announced for cell 7 and arrow-key row navigation (`handleKeydown` moves ±10) contradicts the announced structure. Emit 10 `role="row"` wrappers around 10 cells each.

### M12 — Roving tabindex desyncs on click
`grid-interaction.svelte.js` updates `focusIndex` only in `handleKeydown`. Click cell 57, Tab away, Tab back → focus returns to cell 1. Also `aria-readonly` (page:71) is being used to express "busy", which is not what it means; `aria-busy` is the right attribute.

---

## LOW

- **L1 Dead code/copy**: `EPSILON_ANGLE_DEG`, `approxEqualLen`, `lineFromSlope` (exported, used only by tests); `i18n/site.vi.js` `lessonChrome.theoremTitle`/`exampleTitle`/`instructionAria` and `status.comingSoon` (0 references — every lesson re-declares its own); `sang-eratosthenes/copy.vi.js` `primeTooltip` and `specialOne` (0 references, even though cell 1 carries `aria-disabled` with no explanation shown); `tailwind.config.js` `colors.pair.*` (0 references, and inert under v4).
- **L2 Doc drift**: README "Styling: **Tailwind 3** (PostCSS)" vs `tailwindcss@4.3.3` — this mismatch *is* the root cause of C1. RUNBOOK cites `upload-pages-artifact@v3` + `deploy-pages@v4`; the workflow uses `@v5` for both. README's `npm run check` line does not work as written (H4).
- **L3** Empty `<nav aria-label="Điều hướng chính"></nav>` landmarks in `+page.svelte:19`, `so-hoc/+page.svelte:19`, `dai-so/+page.svelte:19`, `hinh-hoc/+page.svelte:19` — labelled landmark with no content.
- **L4** No ESLint config or `lint` script, despite the workspace rule that JS projects run JavaScript + ESLint + JSDoc.
- **L5** `svelte/motion`'s `tweened` (`dinh-ly-pythagoras:7,30`) is deprecated in Svelte 5 in favour of the `Tween` class.
- **L6** `hieu-hai-binh-phuong/+page.svelte:17-19` clamps `b ≤ a` in a self-writing `$effect` that duplicates the `bSafe` derived clamp at `:22`; and the *square* diagram's green piece is gated on `rectH` (`:111`), a *rectangle* diagram quantity. Both work, both mislead.
- **L7** `cartesian-plane.svelte` declares and destructures prop `u` but never uses it (`:13,36`); `Δx = 10` is hardcoded at `:98` while the anchor x-positions arrive as props.
- **L8** `geom-helpers.js:44` comments "not yet divided by c; we scale by c below" — no such scaling exists. The math is right (unit normal × c = `(a, -b)`), the comment describes code that was never written.
- **L9** `dinh-ly-pythagoras/+page.svelte:81-86` asserts `|a² + b² − c²| > 0.01` in DEV, but `c = Math.hypot(a, b)` at `:37`, so the condition is unfalsifiable. It cannot detect C3.
- **L10** `shearATarget`/`shearBTarget` accept a `c` parameter neither uses.
- **L11** `sieveUpTo(n)` allocates `Uint8Array(n+1)` with no upper bound (`sieve.js:11`). The UI hardcodes 100, so this is engine-level only — but `sieveUpTo(1e9)` is a 1 GB allocation from an exported API.
- **L12** `grid-interaction.svelte.js:36` types `cellRefs` as `HTMLButtonElement[]` while initialising with 100 `null`s; `:118` already has to `?.` it.

---

## Test coverage gaps

Suite is genuinely useful on the pure engines (92 tests, meaningful assertions, no phantom tests spotted). The gaps line up almost exactly with the Critical findings — **every C-level bug lives in an untested module**:

1. **`lessons/dinh-ly-pythagoras/geom-helpers.js` — 0 tests.** The most bug-dense file in the repo (C3). Needs: square-c stays inside the viewBox for all clamped `R`; shoelace area of `lerpPoly(sqA, tgtA, t)` equals `a²` for t ∈ {0, .25, .5, .75, 1} (this test fails today, which is the point).
2. **`lessons/sang-eratosthenes/grid-interaction.svelte.js` — 0 tests.** C2 is a two-line test: `handleCellActivate(53)` must leave `rippling === false`.
3. **`actions/draggable.svelte.js` and `utils/svg.js` — 0 tests.** No coverage of capture/release, arrow-key stepping, projector+clamp interaction, or `clientToSvg` scaling.
4. **Inscribed angle**: `circle.test.js:52` tests exactly one major-arc case. No minor-arc case, which is why C4 shipped.
5. **`congruentSSS`**: no degenerate/collinear case. Two zero-area collinear "triangles" with matching side lengths currently report congruent, and no test pins that down.
6. **`gcdSteps(a, 0)`**: `gcd.test.js:64` asserts the *current* output rather than the documented contract (M4).
7. **`lcm`**: no large-input test (M3). **`sieveUpTo`**: no large-N or allocation-bound test (L11). **`isPrime`**: no perfect-square-of-a-prime boundary beyond 91 (e.g. 9, 25, 49, 961).
8. **No component/DOM tests at all** — `vitest.config.js` sets `environment: 'node'` with no jsdom. Nothing can catch H3 (aria-label text), H2, M11, or C1. A single prerendered-HTML smoke assertion in CI would have caught C1 and H3.
9. Effort is misallocated: `transforms.test.js` is the largest test file and covers code no lesson imports (M10).

---

## In-flight work (not reviewed in depth)

`src/lib/algebra-engine/system.js` + `system.test.js` and `lessons/he-phuong-trinh-bac-nhat/` + `routes/dai-so/he-phuong-trinh-bac-nhat/` were being written while this audit ran. Shallow read of `system.js` only:

- Solid: standard-form representation, single-determinant case split, its own `EPSILON_COEF` with a comment explaining why it is not `EPSILON_LEN` (this is the pattern M5 should adopt).
- `clipToBox:105` returns `[hits[0], hits[1]]` — if dedup ever leaves 3+ hits (a line grazing a corner within `EPSILON_BOX` while crossing two edges), the first two are not necessarily the extreme pair, yielding a short segment. PLAUSIBLE, not reproduced.
- The new route/components will inherit C1, H1, H2 and the M9 duplication unless those are fixed first.

---

## Recommended order

1. **C1** — one-line CSS fix; nothing else about the site is judgeable until styling actually ships.
2. **H4** — add `npm test` + a fixed `npm run check` to `ci.yml`, plus a prerendered-HTML smoke assertion. Without this, C1-class regressions stay invisible.
3. **C2, C4, H3** — small, localized, each a concrete wrong answer shown to a student.
4. **H1 + H2 + H6 together** — switch handles to `role="slider"` + `aria-value*`, drop inline `outline:none`, retarget the existing `app.css` rule, change container roles. One pass over 5 files.
5. **C3** — needs a real redesign of the animation (use `transforms.js`) plus a viewBox that fits square-c; add the area-invariant test first.
6. **M9/M10** — extract `<LessonShell>`, the palette, and `lessonHref` *before* the 10th lesson multiplies the duplication again.
7. M1–M8, then L-tier.

## Metrics

- Type coverage: `svelte-check` 264 files / 0 errors / 0 warnings — but only after a manual `svelte-kit sync`, and it is not run in CI.
- Tests: 9 files / 92 tests, all passing; 0 % coverage of lesson logic, actions, DOM/a11y.
- Lint: no linter configured (0 findings by construction).
- Build: passes; emits a CSS bundle that is 55 % KaTeX, 40 % webfonts, ~5 % Tailwind (C1).

## Unresolved questions

1. Is the concurrent 9th-lesson work expected to land before these fixes? Several findings (H1, H2, M9) are cheaper to fix before that code is duplicated again.
2. Was Tailwind v4 an intentional upgrade (deps say v4, README and `app.css` say v3), or a dependabot bump that was never migrated? That determines whether the fix is `@import 'tailwindcss'` + `@theme`, or pinning back to v3.
3. For the congruence lesson (H5), what tolerance is pedagogically intended — "looks equal" (≈5 units) or "is equal" (exact snap)? That is a product decision, not a code one.
