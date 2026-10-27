---
name: write-lesson
description: Write every lesson of one curriculum chapter on a KNTT learning site (MathMax and its sister sites) - content.vi.js, the interactive widget and exercises - then run the batch checks and commit. Use when assigned a chapter such as "lop-6/<chuong-slug>", or asked to write, fill in or replace the stub lessons of a chapter.
---

# Write the lessons of one chapter

You own one chapter, `lop-N/<chuong-slug>`, of this site. Your job is to turn
every stub lesson in it into a finished lesson: accurate Vietnamese content that
follows the Kết nối tri thức với cuộc sống (KNTT) book, a real interactive widget,
worked examples and self-checking exercises. Done means
`npm run stubs -- lop-N/<chuong-slug>` reports 0 and every check below passes.

The lesson contract is owned by the README section "Adding a lesson" and enforced
by `src/lib/core/content-schema.js`. This brief summarises it for you; when they
disagree, the schema and the README win. The skill is the same on every site:
the subject comes from the curriculum JSON, the site title from
`src/lib/i18n/site.vi.js`.

## 1. Files you own

You may create and edit only `src/lib/lessons/lop-N/<chuong-slug>/`:

```
src/lib/lessons/lop-N/<chuong-slug>/
  <bai-slug>/
    content.vi.js        required: export default the lesson content (pure data)
    widget.svelte        main interactive; required for kind theory
    <name>.widget.svelte extra widget, placed by a { type: 'widget', name } block
    engine.js            optional pure logic (no DOM), with engine.test.js
    *.svelte.js          optional rune state for a widget, with a *.test.js
  _shared/               optional helpers used by several lessons of this chapter
```

A lesson never imports from another lesson's folder (`../bai-26-.../engine.js`):
lesson folders are independent pages. Code two lessons need goes in the
chapter's `_shared/`, or comes from core.

Never edit anything else: not `src/lib/core/`, `src/lib/curriculum/`,
`src/lib/domain/`, `src/routes/`, `src/params/`, `scripts/`, configs,
`package.json`, workflows or another chapter. No registry, route or hub needs an
edit: a lesson goes live when its `content.vi.js` exists. Before writing a
helper, check core (section 6): number, integer, fraction and decimal writing
and reading, angle geometry, seeded random sets, practice drills, adaptive
review sets and measuring drills already live there, so never copy them into
`_shared/`. If you need a
helper that core lacks, build it in `_shared/` and mention it in your final
report so a core pass can promote it. Never add dependencies.

## 2. Before writing

1. Read the chapter in `src/lib/curriculum/lop-N.json`: its `title`, `strand`
   and, per lesson, `slug`, `title`, `kind`, `keyIdeas` and `interactiveIdea`.
   Lesson folder names are these slugs exactly.
2. Run `npm run stubs -- lop-N/<chuong-slug>` to see which lessons remain.
3. Read the README "Adding a lesson" section and `src/lib/core/content-schema.js`.
4. Read one reference lesson end to end: for grades 1-5 the kid lesson
   `src/lib/lessons/lop-1/cac-so-tu-0-den-10/bai-1-cac-so-0-1-2-3-4-5/` (on a
   sister site, its own reference lesson); for grades 6-12 a theory lesson such as
   `src/lib/lessons/lop-8/tam-giac-dong-dang/bai-35-dinh-li-pythagore-va-ung-dung/`
   on MathMax, or the reference lesson of the sister site.
5. List what you can reuse: the core visuals (section 6), `ls src/lib/domain/`
   on a sister site, and the engines under `src/lib/*-engine/`. Read the JSDoc
   header of any component before using it, and run `npm run dev` then open
   `/_gallery/` to see the core visuals working.

Write lessons in book order. Activity (`activity`), review (`review`, "Bài tập
cuối chương", "Ôn tập") and practice (`practice`, "Luyện tập chung") lessons draw
on the theory lessons of the same chapter, so write those first.

## 3. Content schema

`content.vi.js` is plain data, typed by its JSDoc annotation. Every text field is
rich text (inline TeX `$...$`, display TeX `$$...$$`, a literal dollar `\$`,
written `'\\$'` in the JS string)
except `summary`, which is plain text with no TeX, and `tex` blocks, which hold
TeX source without `$`. Unknown fields fail validation.

```js
/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary: 'Định lí Pythagore: trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.',
  intro: 'Một chiếc thang dài 5 m dựa vào tường, chân thang cách tường 3 m. Đỉnh thang cao bao nhiêu?',
  objectives: ['Phát biểu định lí Pythagore.', 'Tính một cạnh của tam giác vuông khi biết hai cạnh kia.'],
  sections: [
    {
      heading: 'Định lí Pythagore',
      blocks: [
        { type: 'p', text: 'Cho tam giác $ABC$ vuông tại $A$, cạnh huyền là $BC$.' },
        { type: 'callout', tone: 'theorem', title: 'Định lí', text: '$BC^2 = AB^2 + AC^2$.' },
        { type: 'widget', name: 'squares' }, // needs squares.widget.svelte
      ],
    },
    {
      heading: 'Định lí đảo',
      blocks: [
        { type: 'tex', tex: 'BC^2 = AB^2 + AC^2 \\Rightarrow \\widehat{BAC} = 90^\\circ' },
        { type: 'table', head: ['$a$', '$b$', '$c$'], rows: [['3', '4', '5'], ['5', '12', '13']] },
      ],
    },
  ],
  explore: { title: 'Ghép hình vuông', instruction: 'Kéo đỉnh $A$ và quan sát diện tích ba hình vuông.' },
  examples: [
    {
      problem: 'Tam giác $ABC$ vuông tại $A$, $AB = 3$ cm, $AC = 4$ cm. Tính $BC$.',
      steps: ['$BC^2 = 3^2 + 4^2 = 25$.', '$BC = \\sqrt{25} = 5$.'],
      answer: '$BC = 5$ cm.',
    },
    // a second example
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Thang dài 5 m, chân thang cách tường 3 m. Đỉnh thang cao bao nhiêu mét?',
      answer: 4,
      unit: 'm',
      hints: ['Thang là cạnh huyền.', 'Tính $5^2 - 3^2$ rồi lấy căn bậc hai.'],
      solution: '$h^2 = 5^2 - 3^2 = 16$, nên $h = 4$ m.',
    },
    {
      type: 'choice',
      prompt: 'Bộ ba nào là độ dài ba cạnh của một tam giác vuông?',
      options: ['$2, 3, 4$', '$6, 8, 10$', '$4, 5, 7$'],
      answer: 1,
      hints: ['Thử $a^2 + b^2 = c^2$ với cạnh lớn nhất là $c$.'],
      solution: '$6^2 + 8^2 = 100 = 10^2$.',
    },
    // ... at least 5 for a theory lesson
  ],
  takeaways: ['Tam giác vuông: $a^2 + b^2 = c^2$, $c$ là cạnh huyền.'],
};
```

Blocks: `p` (`text`), `tex` (`tex`), `list` (`items`, `ordered?`), `callout`
(`tone`: `definition` | `theorem` | `note` | `warning`, `title?`, `text`), `table`
(`head`, `rows`, `caption?`; each row as wide as `head`), `widget` (`name`,
kebab-case). A section may set `project: true` to mark a project brief.

Exercises all have `prompt`, `hints` (one or more, revealed one at a time) and
`solution`, plus:

| `type` | Fields | Checked as |
| --- | --- | --- |
| `number` | `answer`, `tolerance?`, `unit?` | `3,5` and `3.5` both parse; unit compared when set |
| `fraction` | `answer: [p, q]`, `simplest?` | equal value; `simplest` demands lowest terms |
| `choice` | `options` (2+), `answer` index | single choice |
| `multi` | `options`, `answers` indices | exact set |
| `text` | `accept: string[]` | ignores case, diacritics, extra spaces, final `.` |
| `order` | `items`, `answer` (item indices in correct order) | drag to sort |
| `match` | `left`, `right` (at least as many), `pairs: [[l, r]]` | each left once |
| `count` | `picture`, `answer` 0-100, `choices?` (must include it) | kids count and tap |

`picture` names come from `src/lib/core/kid/pictures/index.js` (apple, banana,
orange, strawberry, grapes, fish, cat, chick, rabbit, butterfly, star, flower,
balloon, pencil, ball, coin, banknote, block, cube).

## 4. Minimums (checked by `src/lib/core/content.test.js`)

| `kind` | Needs |
| --- | --- |
| `theory` | 2+ sections, 2+ examples, 5+ exercises, `widget.svelte` |
| `practice`, `review` | 8+ exercises; widget optional |
| `activity`, `chuyen-de` | 1+ content section, 1+ section with `project: true`, 3+ exercises |

Also: `explore` exists exactly when `widget.svelte` does; every `widget` block
has its `<name>.widget.svelte`; grade 1-5 `intro` is at most 300 characters.
These are floors. Aim for 6-10 exercises in a theory lesson and 10-12 in
practice and review lessons, covering every key idea.

## 5. Kid layout (grades 1-5) and normal layout (grades 6-12)

The page picks the layout from the grade; there is no flag to set.

- **Kid** (`kid-lesson-page.svelte`): the widget comes first, then one card per
  block with a "Nghe" read-aloud button, 48 px touch targets and a 20 px base
  font. Write short sentences a child can hear read aloud, addressed to "em".
  Keep each block to one idea, prefer `p`, `callout` and small `table` blocks,
  and keep TeX out except plain numbers and signs. Exercises favour `count`,
  `choice`, `match` and `order`; use pictures, not long word problems. Widgets
  use large buttons and kid pictures (`#lib/core/kid/picture.svelte`).
- **Normal** (`lesson-page.svelte`): intro, objectives, sections, the explore
  widget, step-by-step examples, practice and takeaways. Use proper TeX for every
  formula and unit expression, textbook terminology, and full worked solutions.

Mobile comes first in both: everything must work at 390 px wide.

## 6. Building blocks

Widgets take no props. Write Svelte 5 runes (`$state`, `$derived`, `$props`) in
plain JavaScript with JSDoc; `checkJs` is strict and `svelte-check` fails on any
warning. Import with `#lib/...`. Each component documents its props in a JSDoc
header; read it before use.

Core visuals, `#lib/core/visuals/<name>.svelte`:

| Name | What it is |
| --- | --- |
| `coordinate-plane` | Cartesian plane; children snippet gets the scale (`planeScale()` in `svg-math.js`) |
| `geometry-board` | SVG surface for geometry drawings with drag handles |
| `drag-point` | round drag handle for a point (pointer and arrow keys) |
| `tick-marks` | equal-length marks on a segment |
| `number-line` | number line with marker, marks and hop arcs |
| `fraction-bars` | fraction strips, numerators draggable |
| `area-grid` | unit-square grid with a draggable rectangle |
| `bar-chart`, `line-chart`, `pie-chart` | charts, optionally editable by drag or keys; `bar-chart` `showValues={false}` hides the values for read-the-chart tasks, `axisStart` starts its value axis above 0 (a cut axis, marked with a zigzag) |
| `pictograph` | picture chart (biểu đồ tranh): one row of icons per category, a remainder as part of an icon |
| `double-bar-chart` | double bar chart (biểu đồ cột kép) with legend, hideable series, selectable categories |
| `data-table` | statistics table with tally marks and percentages |
| `probability-spinner` | spinner with running frequency table |
| `unit-converter` | length, mass, capacity, time and VND money |
| `clock-face` | analog clock with draggable hands |
| `base-ten-blocks` | place-value blocks that break and regroup |
| `counting-tray` | kid ten-frame tray filled with pictures |

`#lib/core/visuals/svg-math.js` has `clamp`, `snap`, `linear`, `planeScale`,
`polar`, `angleOf`, `sectorPath`, `hopPath` and `PALETTE`/`colorAt`.
`#lib/core/visuals/angle-math.js` works in degrees on SVG points: `norm`,
`dirOf`, `along`, `directionTo`, `measure`, `ccwSides`, `bisectorDir`,
`intersect`, `degText` ('32,5°') and the angle drawings `arcPath`,
`sectorPath`, `insidePath`, `rightMarkPath`.

`#lib/geom-engine/plane.js` is point geometry on `{ x, y }`: `dist`, `lerp`,
`midpoint`, `angleAt(vertex, p, q)` in degrees, `cross`, `isParallel`, `foot`
(of a perpendicular), `diagonalPoint`, `triangleFromSides`, `bisectorFoot`,
`labelSpot` (a vertex name pushed away from the centroid and kept on the
board), `polygonArea`, and for quadrilaterals `quadAngles`, `splittingSide`
and `isConvex`. `#lib/geom-engine/grid-triangle.js` is a draggable triangle on
a half-unit grid: `toGrid`, `placeVertex` (never goes flat), `measureTri`
(exact squared sides, angles), `same`, `OPPOSITE`, `frame` (grid units to SVG
and back) and `labelOutside`. `#lib/utils/svg.js` has `pointsAttr` for a
polygon's `points`. Never copy `dist`, `gcd`, `polygonArea` or an angle helper
into a lesson.

`number-line` reads the marker's value to screen readers as Vietnamese decimals;
pass `valueText` when it should be read another way (a fraction).

Other shared pieces:

- `#lib/core/segmented-control.svelte` (radio-group switch), `#lib/core/slider-field.svelte`
  (labelled range input), `#lib/core/ui.js` (`button`, `focusRing`, `textInput`, `card` classes).
- `#lib/actions/draggable.svelte.js`: `use:draggable` for SVG drag with arrow-key
  support. Every handle it is put on answers to presses within an invisible
  hit area of at least 44 CSS px (`MIN_HIT`) around it, whatever the SVG's
  scale at 390 px, so draw the knob the size that looks right and add no
  transparent hit shape just for touch. Put `class="drag-handle"` on the
  focusable element; when that is a `<g>`, give its visible shape
  `class="drag-knob"` (and any transparent hit shape `class="drag-hit"`), so
  the keyboard focus ring strokes only the knob, never hit areas or labels.
- `#lib/core/number-format.js`: Vietnamese number writing for every number a
  widget shows, in text, `aria-label`s and live TeX. Never print a raw number
  with a decimal point or call `toFixed`: `formatNumber(52.94, 1)` gives
  `52,9`, `formatFixed(5, 1)` gives `5,0` (decimals kept), `texNumber(text)`
  braces the comma for TeX (`3{,}5`). For natural numbers the way the book
  prints them: `fmt(2345)` gives `2 345` (narrow space), `sup`, `powText`
  (`2⁵`) and `readNatural` for typed input. Integers: `MINUS` (the book's
  `−`), `intText` (`−1 234`), `operand` (`(−5)`) and `readInteger`.
  `roundToTotal(values, total)` rounds measures to whole numbers that still
  add up (four angles to 360°, shares to 100%).
- `#lib/core/fractions.js`: `fracText` (`−3/4`), `fracOperand`, `mixedText`
  (`1 3/4`), `texFrac`, `texOperand`, `toFraction`, `valueText`,
  `readFraction`, and `readProbability`/`probabilityText` for probabilities;
  `countOrProbabilityText` writes a drill answer that is a count or a
  probability. Ratios: `lowestTerms` (`[1, 3]`), `ratioText` (`6/20 = 3/10`)
  and `ratioTex` (`\dfrac{6}{4} = \dfrac{3}{2}`).
- `#lib/core/algebra-text.js`: algebra written the book's way, as plain text
  (`−`) or TeX (`-`): `linText`/`linTex` (`3x − 2`), `factorText`/`factorTex`
  (`x − 3`), `signedFracText`/`signedFracTex`, two-variable equations
  `eqText`/`eqTex` (`2x − 3y = −5`), `pairText` (`(2; −1)`),
  `substituteText`, monomials and sums in x and y `monoText`/`sumText`
  (`3x²y − xy + 5`), and roots `rootValue` (`= 2,5` or `≈ 1,414`),
  `isShortDecimal`, `numText`.
  `#lib/core/frac.svelte` draws a stacked fraction in HTML (no KaTeX) and
  `#lib/core/stepper.svelte` is a labelled − / + whole-number stepper.
- `#lib/core/decimal.js`: exact decimals from integers: `expand` (long
  division with its remainders and period), `decimalText` (`0,(45)`),
  `decimalTex`, `digitAt`, `roundFraction`, `sqrtFloor`, `roundSqrt`,
  `scaledText`, `isFiniteDecimal`, `PRECISIONS`, and `readNumber`/`numberText`
  for answers typed as an integer, a fraction or a decimal comma;
  `answerText` writes such a drill answer (`12 000`, `7,5`).
- `#lib/core/drill-board.svelte` with `#lib/core/drill.js`: a generated
  practice drill for `practice` and `review` lessons. Write one `Skill`
  (`{ id, label, make(rand) }`, `make` returns `{ prompt, answer, steps,
  hints? }`) per lesson in `_shared/skills.js` using `int`, `pick` and
  `shuffle` from `drill.js`, then render
  `<DrillBoard skills={[...]} perSkill={2} />`. A wrong first answer shows a
  hint ladder (the question's `hints`, else its steps that do not give the
  answer away) and a second try; only a second miss shows the full solution.
  The skill map scores first attempts. `read`, `format` and `invalidText`
  props adapt it to answers other than natural numbers. A question may also
  carry its own `unit` (`'%'`, `'đồng'`, `'°'`): the learner may then type
  that unit, or its Vietnamese word, after the number, and a question without
  a unit takes a bare number only. A question may carry its own `read` when it
  is read differently from the rest of the set; `countsAsNaturals(skill)`
  makes a skill's whole-number answers read as natural numbers (`1.350` is
  1350) on a board that reads decimals or probabilities. Never write a `read`
  that accepts a unit on every question. Prompts, hints and steps are rich
  text: write `$S_{xq}$`, not `S_xq`. The skill map only judges a skill
  ("cần ôn lại") once all its questions are answered.
- `#lib/core/adaptive-drill.svelte` with `#lib/core/adaptive.js`: an adaptive
  review set for year-end or chapter reviews: each next question comes from
  the learner's weakest skill; answers are exact fractions (`readValue`
  reads integers, decimals and `p/q`).
- `#lib/core/measure-skills.js`: ready drill skills for converting mass
  (`MASS_SKILLS`), time (`TIME_SKILLS`) and temperature (`TEMPERATURE_SKILLS`).
- `#lib/core/feedback-note.svelte` (a coloured live feedback line, tone `ok`,
  `warn` or `info`; its text is rich text, so `$C_M$` shows as math) and `#lib/core/right-wrong-sorter.svelte` (sort actions
  into "Làm đúng" and "Làm sai" on top of the card sorter).
- `#lib/core/motion.js`: `frameLoop` (per-frame callback with elapsed seconds;
  the `stop` it returns may be called from inside the callback),
  `reducedMotion()` and `wrap` for animated widgets.
- `#lib/core/tex-text.js`: `texText` turns TeX into the linear text screen
  readers hear (`√144`, `3/4`); prerendered content and `tex.svelte` already
  use it, so TeX in options, labels and buttons keeps a distinct accessible
  name. `htmlText` reads rendered rich text back as plain text for an
  `aria-label`.
- `#lib/core/card-sorter.svelte` with `#lib/core/card-sorter.js`: sort cards
  (`{ id, label, bin, why }`) into bins by tap, keyboard or drag, checked per
  move, with take-back and "Gỡ thẻ sai". `shuffled(cards, seed)` mixes the deck
  the same way for every visitor; a `face` snippet draws picture cards;
  `hintOnWrong` shows `why` as a hint after a wrong move.
- `#lib/components/tex.svelte`: live KaTeX. Import it only when the TeX changes
  with interaction; static TeX belongs in `content.vi.js`, which is prerendered.
  `#lib/components/live-rich-text.svelte` shows run-time text with inline
  `$...$` TeX (a generated sentence such as `$S_{xq}$ = 24 cm²`).
  Vietnamese letters in TeX are allowed (`\text{số dư}`); any other strict-mode
  warning fails `content.test.js`.
- `#lib/core/kid/picture.svelte` and `#lib/core/kid/pictures/index.js`
  (`pictures`, `pictureGroups`).
- Engines, pure and tested: `#lib/geom-engine/index.js`, `#lib/algebra-engine/index.js`
  (with `polynomial.js` for one-variable polynomials and `long-division.js`
  for polynomial and natural-number long division),
  `#lib/numtheory-engine/index.js`, `#lib/fraction-engine/index.js`,
  `#lib/stats-engine/index.js` (with `axisFrom` for a cut value axis and
  `iconRow` for picture charts), `#lib/units-engine/index.js` (re-exports
  `formatNumber`).
- Domain components for the site's subject: `src/lib/domain/` (empty on
  MathMax). PhysMax has `vector-field`, `force-diagram`, `motion-plot`,
  `circuit-board`, `ray-optics-bench`, `wave-plot`, `thermometer`,
  `meter-dial` (ammeter or voltmeter dial), and `materials.js` (the book's
  density table, `material`, `qty` for quantities written the book's way);
  ChemMax has `periodic-table`, `atom-model`, `molecule-viewer`,
  `equation-balancer`, `ph-scale`, `lab-glassware`, `equation-line` (a
  book-style equation such as "Zn + 2HCl → ZnCl2 + H2↑" with real subscripts)
  with `reaction.js` (`terms`, `isBalancedText`); BioMax has
  `diagram-hotspots`, `punnett-square`, `pedigree-chart`, `food-web` (`mode`
  opens it in "Loại bỏ" mode), `dna-codon-translator`, `population-chart`. Use
  what `ls src/lib/domain/` actually shows; each component has a
  `<name>.gallery.svelte` demo that `/_gallery/` lists. When two chapters need
  the same subject helper, it belongs in `src/lib/domain/`, not in two
  `_shared/` folders: report it so a core pass can move it.

Widget rules: every control works by pointer and by keyboard, has a Vietnamese
`aria-label` or visible label, and announces results in an `aria-live` region
where state changes matter. No network, no remote images, no `localStorage`
writes, no `{@html}` of anything but KaTeX output. Respect
`prefers-reduced-motion` for animations. Keep a lesson's JS under 30 KB gzip;
`npm run size-report` fails any lesson chunk over 60 KB. Put non-trivial logic in
`engine.js` or a `*.svelte.js` module and test it in Node (there is no jsdom).

## 7. Quality bar

- **Accurate and KNTT-aligned.** Follow the KNTT book's order, terminology,
  notation and scope for that grade (for example "định lí", "số hữu tỉ",
  "phân số tối giản"; decimal comma `3,5` in text). Cover every `keyIdeas` entry;
  do not teach content from a later grade. Write natural Vietnamese with full
  diacritics, no machine-translation phrasing.
- **Correct.** Every formula, number, unit, chemical equation, physical law or
  biological fact must be right. Work each example and exercise out yourself and
  check each answer twice; a wrong answer key is the worst defect a lesson can have.
  Use SI units and the book's symbols.
- **A real widget tied to the idea.** Build what the lesson's `interactiveIdea`
  describes (or something better that teaches the same idea): the learner
  manipulates something and sees the concept respond, with live feedback text.
  A slider that only changes a number, or a static picture, is not enough.
  Every `theory` lesson has one; add one to other kinds when it helps.
- **Exercises that check.** Each has an unambiguous answer the checker can
  verify: use `number` with `tolerance` for rounded results, `fraction` for exact
  ratios, `text` with every acceptable spelling in `accept`, and `choice` with
  plausible distractors drawn from real mistakes. Mix types and difficulty, from
  recall to application. Hints go from a nudge to almost the method, never the
  answer itself; the `solution` shows the full working.
- **Examples** follow textbook style: problem, numbered reasoning steps, answer.
- **Activities and chuyên đề** have a concrete project brief (`project: true`)
  with goal, materials, steps and what to report.

## 8. Batch checks

Run from the repo root once every lesson of the chapter is written. All must pass
with zero warnings; fix the cause, never weaken a test.

1. `npx vitest run src/lib/lessons/lop-N/<chuong-slug>` and
   `npx vitest run src/lib/core/content.test.js` while iterating.
2. `npm run lint`, `npm run format:check` (run `npx prettier --write
   src/lib/lessons/lop-N/<chuong-slug>` first) and `npm run check`.
3. `npm test`.
4. `npm run build`, then `npm run size-report` within budget.
5. `npm run stubs -- lop-N/<chuong-slug>` reports `0 stubs`.
6. `git diff --name-only main...HEAD` (and `git status --short`) lists only paths
   under `src/lib/lessons/lop-N/<chuong-slug>/`.
7. Spot check one lesson in the browser (`npm run preview`, agent-browser where
   the host has it). `vite preview` caches the file list of `build/` when it
   starts, so stop and restart the preview after every rebuild before any
   browser check, or it serves stale pages and 404s for new ones. Check at
   390 px and 1280 px wide; the widget responds to pointer and keyboard;
   answer one exercise right and one wrong and open its hints; no console
   errors. On a kid grade, also check the read-aloud cards.

## 9. Commit

- Work in your own git worktree and branch. Commit only your chapter folder.
- Conventional commits, one per lesson or one per chapter, for example
  `feat(lessons): add the lessons of chapter <chuong-slug> for lop-N`. Describe
  the change itself; no plan names, batch or phase numbers in messages, comments
  or test names.
- No AI attribution: no `Co-Authored-By` trailer for an agent, no "Generated
  with" footer.
- Rebase on `main` before merging; paths are disjoint from other chapters, so a
  conflict means you touched a file you do not own. Do not push unless told to.

End with a short report: lessons written, any `_shared/` helper worth promoting
to core, anything in the curriculum that looked wrong, and the check results.
