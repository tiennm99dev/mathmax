/**
 * Lesson content contract for `content.vi.js` files, and its validator.
 *
 * Content is pure data so it stays serialisable: answers are checked by
 * `answer-check.js` from these fields, never by code inside the content. Rich
 * text fields may carry inline TeX as `$...$` and display TeX as `$$...$$`
 * (write a literal dollar as `\$`); `render-content.server.js` turns them into
 * HTML at prerender time.
 */

import { isPictureName } from './kid/pictures.js';

/** @typedef {import('./kid/pictures.js').PictureName} PictureName */
/** @typedef {import('#lib/curriculum/index.js').LessonKind} LessonKind */

/** @typedef {'definition' | 'theorem' | 'note' | 'warning'} CalloutTone */

/** @typedef {{ type: 'p', text: string }} ParagraphBlock */
/** @typedef {{ type: 'tex', tex: string }} TexBlock Display TeX source, without delimiters. */
/** @typedef {{ type: 'list', items: string[], ordered?: boolean }} ListBlock */
/** @typedef {{ type: 'callout', tone: CalloutTone, title?: string, text: string }} CalloutBlock */
/** @typedef {{ type: 'table', head: string[], rows: string[][], caption?: string }} TableBlock */
/** @typedef {{ type: 'widget', name: string }} WidgetBlock Renders `<name>.widget.svelte`. */

/** @typedef {ParagraphBlock | TexBlock | ListBlock | CalloutBlock | TableBlock | WidgetBlock} Block */

/**
 * @typedef {object} Section
 * @property {string} heading
 * @property {Block[]} blocks
 * @property {boolean} [project] Marks the project brief of an activity or chuyên đề lesson.
 */

/** @typedef {{ title: string, instruction: string }} Explore Frame around `widget.svelte`. */

/** @typedef {{ problem: string, steps: string[], answer: string }} Example */

/**
 * @typedef {object} ExerciseBase
 * @property {string} prompt
 * @property {string[]} hints Revealed one at a time.
 * @property {string} solution
 */

/** @typedef {ExerciseBase & { type: 'number', answer: number, tolerance?: number, unit?: string }} NumberExercise */
/** @typedef {ExerciseBase & { type: 'fraction', answer: [number, number], simplest?: boolean }} FractionExercise */
/** @typedef {ExerciseBase & { type: 'choice', options: string[], answer: number }} ChoiceExercise */
/** @typedef {ExerciseBase & { type: 'multi', options: string[], answers: number[] }} MultiExercise */
/** @typedef {ExerciseBase & { type: 'text', accept: string[] }} TextExercise */
/** @typedef {ExerciseBase & { type: 'order', items: string[], answer: number[] }} OrderExercise `answer` lists item indices in the correct order. */
/** @typedef {ExerciseBase & { type: 'match', left: string[], right: string[], pairs: Array<[number, number]> }} MatchExercise `pairs` holds `[leftIndex, rightIndex]`. */
/** @typedef {ExerciseBase & { type: 'count', picture: PictureName, answer: number, choices?: number[] }} CountExercise */

/**
 * @typedef {NumberExercise | FractionExercise | ChoiceExercise | MultiExercise | TextExercise
 *   | OrderExercise | MatchExercise | CountExercise} Exercise
 */

/** @typedef {Exercise['type']} ExerciseType */

/**
 * @typedef {object} LessonContent
 * @property {string} summary One sentence for the meta description.
 * @property {string} intro
 * @property {string[]} objectives
 * @property {Section[]} sections
 * @property {Explore} [explore] Required exactly when the lesson has `widget.svelte`.
 * @property {Example[]} examples
 * @property {Exercise[]} practice
 * @property {string[]} takeaways
 */

/**
 * Rendered blocks carry HTML. Exercises and examples keep their source shape,
 * with every rich text field (prompt, hints, solution, options, items, left,
 * right, problem, steps, answer) replaced by HTML.
 * @typedef {{ type: 'p', html: string }
 *   | { type: 'tex', html: string }
 *   | { type: 'list', items: string[], ordered: boolean }
 *   | { type: 'callout', tone: CalloutTone, title: string | null, html: string }
 *   | { type: 'table', head: string[], rows: string[][], caption: string | null }
 *   | { type: 'widget', name: string }} RenderedBlock
 */

/**
 * `heading` is HTML; `label` is the same heading as plain text, for labels.
 * @typedef {{ heading: string, label: string, project: boolean, blocks: RenderedBlock[] }} RenderedSection
 */

/**
 * @typedef {object} RenderedLesson
 * @property {string} summary Plain text, TeX delimiters removed.
 * @property {string} intro HTML.
 * @property {string[]} objectives HTML.
 * @property {RenderedSection[]} sections
 * @property {Explore | null} explore HTML fields.
 * @property {Example[]} examples HTML fields.
 * @property {Exercise[]} practice HTML rich fields; answer data unchanged.
 * @property {string[]} takeaways HTML.
 */

export const CALLOUT_TONES = /** @type {const} */ (['definition', 'theorem', 'note', 'warning']);

export const EXERCISE_TYPES = /** @type {const} */ ([
  'number',
  'fraction',
  'choice',
  'multi',
  'text',
  'order',
  'match',
  'count',
]);

/** Highest grade that uses the kid lesson layout. */
export const KID_MAX_GRADE = 5;

/** Longest kid `intro`, in characters. */
export const KID_INTRO_MAX = 300;

const LESSON_KEYS = [
  'summary',
  'intro',
  'objectives',
  'sections',
  'explore',
  'examples',
  'practice',
  'takeaways',
];

/** @type {Record<Block['type'], string[]>} */
const BLOCK_KEYS = {
  p: ['text'],
  tex: ['tex'],
  list: ['items', 'ordered'],
  callout: ['tone', 'title', 'text'],
  table: ['head', 'rows', 'caption'],
  widget: ['name'],
};

const EXERCISE_BASE_KEYS = ['type', 'prompt', 'hints', 'solution'];

/** @type {Record<ExerciseType, string[]>} */
const EXERCISE_KEYS = {
  number: ['answer', 'tolerance', 'unit'],
  fraction: ['answer', 'simplest'],
  choice: ['options', 'answer'],
  multi: ['options', 'answers'],
  text: ['accept'],
  order: ['items', 'answer'],
  match: ['left', 'right', 'pairs'],
  count: ['picture', 'answer', 'choices'],
};

const WIDGET_NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * True when every `$` delimiter in `text` is closed. `\$` is a literal dollar.
 * @param {string} text
 */
export function balancedTex(text) {
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '\\') {
      i += 2;
      continue;
    }
    if (ch !== '$') {
      i += 1;
      continue;
    }
    const display = text[i + 1] === '$';
    const close = findClose(text, i + (display ? 2 : 1), display);
    if (close === -1) return false;
    i = close + (display ? 2 : 1);
  }
  return true;
}

/**
 * Index of the closing delimiter, or -1. Backslash escapes are skipped so
 * `\$` inside TeX does not close it.
 * @param {string} text
 * @param {number} from
 * @param {boolean} display
 */
export function findClose(text, from, display) {
  for (let j = from; j < text.length; j++) {
    if (text[j] === '\\') {
      j += 1;
      continue;
    }
    if (text[j] !== '$') continue;
    if (!display) return j;
    if (text[j + 1] === '$') return j;
  }
  return -1;
}

/** @param {unknown} v @returns {v is Record<string, unknown>} */
function isObject(v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** @param {unknown} v @returns {v is number} */
function isIndex(v) {
  return Number.isInteger(v) && /** @type {number} */ (v) >= 0;
}

/**
 * Collects errors as `path: message` strings.
 */
class Report {
  /** @type {string[]} */
  errors = [];

  /** @param {string} path @param {string} message */
  add(path, message) {
    this.errors.push(`${path}: ${message}`);
  }

  /**
   * @param {Record<string, unknown>} obj
   * @param {string[]} allowed
   * @param {string} path
   */
  keys(obj, allowed, path) {
    for (const key of Object.keys(obj)) {
      if (!allowed.includes(key)) this.add(path, `unknown field "${key}"`);
    }
  }

  /**
   * Non-empty string with balanced TeX delimiters.
   * @param {unknown} v
   * @param {string} path
   * @returns {v is string}
   */
  text(v, path) {
    if (typeof v !== 'string' || v.trim() === '') {
      this.add(path, 'must be a non-empty string');
      return false;
    }
    if (!balancedTex(v)) this.add(path, 'has an unclosed $ delimiter');
    return true;
  }

  /**
   * Array of rich text strings with at least `min` entries.
   * @param {unknown} v
   * @param {string} path
   * @param {number} [min]
   * @returns {v is string[]}
   */
  texts(v, path, min = 0) {
    if (!Array.isArray(v)) {
      this.add(path, 'must be an array');
      return false;
    }
    if (v.length < min) this.add(path, `needs at least ${min} item(s)`);
    v.forEach((item, i) => this.text(item, `${path}[${i}]`));
    return true;
  }

  /**
   * @param {unknown} v
   * @param {number} length
   * @param {string} path
   */
  index(v, length, path) {
    if (!isIndex(v) || /** @type {number} */ (v) >= length) {
      this.add(path, `must be an index from 0 to ${length - 1}`);
      return false;
    }
    return true;
  }
}

/**
 * @param {Report} r
 * @param {unknown} block
 * @param {string} path
 */
function validateBlock(r, block, path) {
  if (!isObject(block)) return r.add(path, 'must be an object');
  const type = /** @type {Block['type']} */ (block.type);
  if (!Object.hasOwn(BLOCK_KEYS, type)) return r.add(`${path}.type`, `unknown block "${type}"`);
  r.keys(block, ['type', ...BLOCK_KEYS[type]], path);
  switch (type) {
    case 'p':
      r.text(block.text, `${path}.text`);
      break;
    case 'tex':
      if (typeof block.tex !== 'string' || block.tex.trim() === '') {
        r.add(`${path}.tex`, 'must be a non-empty string');
      } else if (/(^|[^\\])\$/.test(block.tex)) {
        r.add(`${path}.tex`, 'is TeX source; leave out the $ delimiters');
      }
      break;
    case 'list':
      r.texts(block.items, `${path}.items`, 1);
      if (block.ordered !== undefined && typeof block.ordered !== 'boolean') {
        r.add(`${path}.ordered`, 'must be a boolean');
      }
      break;
    case 'callout':
      if (!CALLOUT_TONES.includes(/** @type {CalloutTone} */ (block.tone))) {
        r.add(`${path}.tone`, `must be one of ${CALLOUT_TONES.join(', ')}`);
      }
      if (block.title !== undefined) r.text(block.title, `${path}.title`);
      r.text(block.text, `${path}.text`);
      break;
    case 'table': {
      if (r.texts(block.head, `${path}.head`, 1)) {
        const width = /** @type {string[]} */ (block.head).length;
        if (!Array.isArray(block.rows) || block.rows.length === 0) {
          r.add(`${path}.rows`, 'needs at least 1 row');
        } else {
          block.rows.forEach((row, i) => {
            if (r.texts(row, `${path}.rows[${i}]`) && row.length !== width) {
              r.add(`${path}.rows[${i}]`, `must have ${width} cells like head`);
            }
          });
        }
      }
      if (block.caption !== undefined) r.text(block.caption, `${path}.caption`);
      break;
    }
    case 'widget':
      if (typeof block.name !== 'string' || !WIDGET_NAME_RE.test(block.name)) {
        r.add(`${path}.name`, 'must be a kebab-case widget name');
      }
      break;
  }
}

/**
 * @param {Report} r
 * @param {unknown} ex
 * @param {string} path
 */
function validateExercise(r, ex, path) {
  if (!isObject(ex)) return r.add(path, 'must be an object');
  const type = /** @type {ExerciseType} */ (ex.type);
  if (!EXERCISE_TYPES.includes(type)) return r.add(`${path}.type`, `unknown exercise "${type}"`);
  r.keys(ex, [...EXERCISE_BASE_KEYS, ...EXERCISE_KEYS[type]], path);
  r.text(ex.prompt, `${path}.prompt`);
  r.texts(ex.hints, `${path}.hints`, 1);
  r.text(ex.solution, `${path}.solution`);

  switch (type) {
    case 'number':
      if (typeof ex.answer !== 'number' || !Number.isFinite(ex.answer)) {
        r.add(`${path}.answer`, 'must be a finite number');
      }
      if (
        ex.tolerance !== undefined &&
        (typeof ex.tolerance !== 'number' || !(ex.tolerance >= 0) || !Number.isFinite(ex.tolerance))
      ) {
        r.add(`${path}.tolerance`, 'must be a non-negative number');
      }
      if (ex.unit !== undefined && (typeof ex.unit !== 'string' || ex.unit.trim() === '')) {
        r.add(`${path}.unit`, 'must be a non-empty string');
      }
      break;
    case 'fraction': {
      const a = ex.answer;
      if (
        !Array.isArray(a) ||
        a.length !== 2 ||
        !Number.isInteger(a[0]) ||
        !Number.isInteger(a[1]) ||
        a[1] === 0
      ) {
        r.add(`${path}.answer`, 'must be [numerator, denominator] integers, denominator not 0');
      }
      if (ex.simplest !== undefined && typeof ex.simplest !== 'boolean') {
        r.add(`${path}.simplest`, 'must be a boolean');
      }
      break;
    }
    case 'choice':
      if (r.texts(ex.options, `${path}.options`, 2)) {
        r.index(ex.answer, /** @type {string[]} */ (ex.options).length, `${path}.answer`);
      }
      break;
    case 'multi':
      if (r.texts(ex.options, `${path}.options`, 2)) {
        const n = /** @type {string[]} */ (ex.options).length;
        if (!Array.isArray(ex.answers) || ex.answers.length === 0) {
          r.add(`${path}.answers`, 'needs at least 1 index');
        } else {
          ex.answers.forEach((v, i) => r.index(v, n, `${path}.answers[${i}]`));
          if (new Set(ex.answers).size !== ex.answers.length) {
            r.add(`${path}.answers`, 'must not repeat an index');
          }
        }
      }
      break;
    case 'text':
      if (!Array.isArray(ex.accept) || ex.accept.length === 0) {
        r.add(`${path}.accept`, 'needs at least 1 accepted answer');
      } else {
        ex.accept.forEach((v, i) => {
          if (typeof v !== 'string' || v.trim() === '') {
            r.add(`${path}.accept[${i}]`, 'must be a non-empty string');
          }
        });
      }
      break;
    case 'order':
      if (r.texts(ex.items, `${path}.items`, 2)) {
        const n = /** @type {string[]} */ (ex.items).length;
        const a = ex.answer;
        const sorted = Array.isArray(a) ? [...a].sort((x, y) => x - y) : null;
        if (!sorted || sorted.length !== n || sorted.some((v, i) => v !== i)) {
          r.add(`${path}.answer`, `must be a permutation of 0..${n - 1}`);
        }
      }
      break;
    case 'match': {
      const okLeft = r.texts(ex.left, `${path}.left`, 2);
      const okRight = r.texts(ex.right, `${path}.right`, 2);
      if (!okLeft || !okRight) break;
      const nl = /** @type {string[]} */ (ex.left).length;
      const nr = /** @type {string[]} */ (ex.right).length;
      if (nr < nl) r.add(`${path}.right`, 'needs at least as many items as left');
      const pairs = ex.pairs;
      if (!Array.isArray(pairs) || pairs.length !== nl) {
        r.add(`${path}.pairs`, `must pair each of the ${nl} left items once`);
        break;
      }
      /** @type {Set<number>} */
      const lefts = new Set();
      /** @type {Set<number>} */
      const rights = new Set();
      pairs.forEach((p, i) => {
        if (!Array.isArray(p) || p.length !== 2) {
          r.add(`${path}.pairs[${i}]`, 'must be [leftIndex, rightIndex]');
          return;
        }
        if (r.index(p[0], nl, `${path}.pairs[${i}][0]`)) lefts.add(p[0]);
        if (r.index(p[1], nr, `${path}.pairs[${i}][1]`)) rights.add(p[1]);
      });
      if (lefts.size !== nl) r.add(`${path}.pairs`, 'must use every left index once');
      if (rights.size !== pairs.length) r.add(`${path}.pairs`, 'must not reuse a right index');
      break;
    }
    case 'count':
      if (!isPictureName(ex.picture)) r.add(`${path}.picture`, 'must name a kid picture');
      if (!isIndex(ex.answer) || /** @type {number} */ (ex.answer) > 100) {
        r.add(`${path}.answer`, 'must be a whole number from 0 to 100');
      }
      if (ex.choices !== undefined) {
        const c = ex.choices;
        if (!Array.isArray(c) || c.length < 2 || !c.every(isIndex)) {
          r.add(`${path}.choices`, 'must list at least 2 whole numbers');
        } else {
          if (new Set(c).size !== c.length) r.add(`${path}.choices`, 'must not repeat a number');
          if (!c.includes(/** @type {number} */ (ex.answer)))
            r.add(`${path}.choices`, 'must include the answer');
        }
      }
      break;
  }
}

/**
 * Checks the shape of a lesson's content. Returns an empty array when valid.
 * @param {unknown} content
 * @returns {string[]}
 */
export function validateLesson(content) {
  const r = new Report();
  if (!isObject(content)) {
    r.add('content', 'must be an object');
    return r.errors;
  }
  r.keys(content, LESSON_KEYS, 'content');
  if (r.text(content.summary, 'summary') && /\$/.test(content.summary)) {
    r.add('summary', 'is plain text for the meta description; leave out TeX');
  }
  r.text(content.intro, 'intro');
  r.texts(content.objectives, 'objectives', 1);
  r.texts(content.takeaways, 'takeaways');

  if (!Array.isArray(content.sections)) {
    r.add('sections', 'must be an array');
  } else {
    content.sections.forEach((s, i) => {
      const path = `sections[${i}]`;
      if (!isObject(s)) return r.add(path, 'must be an object');
      r.keys(s, ['heading', 'blocks', 'project'], path);
      r.text(s.heading, `${path}.heading`);
      if (s.project !== undefined && typeof s.project !== 'boolean') {
        r.add(`${path}.project`, 'must be a boolean');
      }
      if (!Array.isArray(s.blocks) || s.blocks.length === 0) {
        r.add(`${path}.blocks`, 'needs at least 1 block');
      } else {
        s.blocks.forEach((b, j) => validateBlock(r, b, `${path}.blocks[${j}]`));
      }
    });
  }

  if (content.explore !== undefined) {
    if (!isObject(content.explore)) {
      r.add('explore', 'must be an object');
    } else {
      r.keys(content.explore, ['title', 'instruction'], 'explore');
      r.text(content.explore.title, 'explore.title');
      r.text(content.explore.instruction, 'explore.instruction');
    }
  }

  if (!Array.isArray(content.examples)) {
    r.add('examples', 'must be an array');
  } else {
    content.examples.forEach((e, i) => {
      const path = `examples[${i}]`;
      if (!isObject(e)) return r.add(path, 'must be an object');
      r.keys(e, ['problem', 'steps', 'answer'], path);
      r.text(e.problem, `${path}.problem`);
      r.texts(e.steps, `${path}.steps`, 1);
      r.text(e.answer, `${path}.answer`);
    });
  }

  if (!Array.isArray(content.practice)) {
    r.add('practice', 'must be an array');
  } else {
    content.practice.forEach((ex, i) => validateExercise(r, ex, `practice[${i}]`));
  }
  return r.errors;
}

/**
 * Names of the extra widgets that content blocks reference.
 * @param {LessonContent} content
 * @returns {string[]}
 */
export function widgetNames(content) {
  const names = content.sections.flatMap((s) =>
    s.blocks.flatMap((b) => (b.type === 'widget' ? [b.name] : [])),
  );
  return [...new Set(names)];
}

/**
 * @typedef {object} LessonContext
 * @property {LessonKind} kind
 * @property {number} grade
 * @property {boolean} hasWidget Whether `widget.svelte` exists beside the content.
 * @property {string[]} [extraWidgets] Names of the `*.widget.svelte` files present.
 */

/**
 * Checks the per-kind minimums and the files a lesson's content depends on.
 * Run it on content that already passes `validateLesson`.
 * @param {LessonContent} content
 * @param {LessonContext} ctx
 * @returns {string[]}
 */
export function checkMinimums(content, ctx) {
  /** @type {string[]} */
  const errors = [];
  const at = (/** @type {string} */ path, /** @type {string} */ message) =>
    errors.push(`${path}: ${message}`);
  const exercises = content.practice.length;

  switch (ctx.kind) {
    case 'theory':
      if (content.sections.length < 2) at('sections', 'theory needs at least 2 sections');
      if (content.examples.length < 2) at('examples', 'theory needs at least 2 examples');
      if (exercises < 5) at('practice', 'theory needs at least 5 exercises');
      if (!ctx.hasWidget) at('widget.svelte', 'theory needs a main widget');
      break;
    case 'practice':
    case 'review':
      if (exercises < 8) at('practice', `${ctx.kind} needs at least 8 exercises`);
      break;
    case 'activity':
    case 'chuyen-de': {
      const briefs = content.sections.filter((s) => s.project).length;
      if (content.sections.length - briefs < 1) {
        at('sections', `${ctx.kind} needs at least 1 section besides the project brief`);
      }
      if (briefs < 1) at('sections', `${ctx.kind} needs a section with project: true`);
      if (exercises < 3) at('practice', `${ctx.kind} needs at least 3 exercises`);
      break;
    }
  }

  if (ctx.hasWidget && !content.explore) at('explore', 'widget.svelte needs an explore frame');
  if (!ctx.hasWidget && content.explore) at('explore', 'has no widget.svelte to frame');

  const present = new Set(ctx.extraWidgets ?? []);
  for (const name of widgetNames(content)) {
    if (!present.has(name)) at(`widget "${name}"`, `${name}.widget.svelte is missing`);
  }

  if (ctx.grade <= KID_MAX_GRADE && content.intro.length > KID_INTRO_MAX) {
    at('intro', `kid intro must be at most ${KID_INTRO_MAX} characters`);
  }
  return errors;
}

/**
 * What a lesson route hands to `lesson-page.svelte`.
 * @typedef {object} LessonPageProps
 * @property {RenderedLesson} content
 * @property {import('#lib/curriculum/index.js').Grade} grade
 * @property {import('#lib/curriculum/index.js').Chapter} chapter
 * @property {import('#lib/curriculum/index.js').Lesson} lesson
 * @property {import('#lib/curriculum/index.js').LessonRef | null} prev
 * @property {import('#lib/curriculum/index.js').LessonRef | null} next
 * @property {import('svelte').Component<any> | null} [widget] The lesson's `widget.svelte`.
 * @property {Record<string, import('svelte').Component<any>>} [widgets] `*.widget.svelte` by name.
 */
