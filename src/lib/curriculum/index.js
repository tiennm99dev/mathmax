/**
 * Curriculum accessors over the generated `lop-N.json` files. Array order is book
 * order (activity and review chapters sit between numbered ones), so nothing here
 * sorts by `no`. The global lesson order is grade → chapter → lesson.
 */

/** @typedef {'theory' | 'practice' | 'review' | 'activity' | 'chuyen-de'} LessonKind */

/**
 * @typedef {object} Lesson
 * @property {number} no
 * @property {string} title
 * @property {string} slug
 * @property {LessonKind} kind
 * @property {string[]} keyIdeas
 * @property {string} interactiveIdea
 */

/**
 * @typedef {object} Chapter
 * @property {number} no
 * @property {string} label
 * @property {string} title
 * @property {string} slug
 * @property {string} strand
 * @property {string} volume
 * @property {Lesson[]} lessons
 */

/**
 * @typedef {object} Grade
 * @property {number} grade
 * @property {string[]} volumes
 * @property {Chapter[]} chapters
 */

/**
 * @typedef {object} LessonRef
 * @property {Grade} grade
 * @property {Chapter} chapter
 * @property {Lesson} lesson
 * @property {string} path
 */

/** @typedef {number | string} GradeKey A grade number or its `lop-N` route slug. */

/** @typedef {{ slug: string, chapters: Array<{ grade: Grade, chapter: Chapter }> }} Strand */

const gradeModules = /** @type {Record<string, Grade>} */ (
  import.meta.glob('./lop-*.json', { eager: true, import: 'default' })
);

/** @type {Grade[]} */
const allGrades = Object.values(gradeModules).sort((a, b) => a.grade - b.grade);

/**
 * Lesson modules that exist on disk. Not eager: only the keys are read, so hubs
 * never load lesson code.
 */
const contentKeys = new Set(
  Object.keys(import.meta.glob('/src/lib/lessons/*/*/*/content.vi.js')).map((key) =>
    key.replace(/^\/src\/lib\/lessons\//, '').replace(/\/content\.vi\.js$/, ''),
  ),
);

/** @param {number} n */
export function gradeSlug(n) {
  return `lop-${n}`;
}

/**
 * @param {GradeKey} key
 * @returns {number}
 */
function gradeNumber(key) {
  if (typeof key === 'number') return key;
  const m = /^lop-(\d+)$/.exec(key);
  return m ? Number(m[1]) : NaN;
}

/** @type {LessonRef[]} */
const ordered = allGrades.flatMap((g) =>
  g.chapters.flatMap((c) =>
    c.lessons.map((l) => ({
      grade: g,
      chapter: c,
      lesson: l,
      path: `/${gradeSlug(g.grade)}/${c.slug}/${l.slug}/`,
    })),
  ),
);

/** All grades this site covers, in ascending order. */
export function grades() {
  return allGrades;
}

/**
 * @param {GradeKey} key
 * @returns {Grade | undefined}
 */
export function grade(key) {
  const n = gradeNumber(key);
  return allGrades.find((g) => g.grade === n);
}

/**
 * @param {GradeKey} g
 * @param {string} c chapter slug
 * @returns {Chapter | undefined}
 */
export function chapter(g, c) {
  return grade(g)?.chapters.find((ch) => ch.slug === c);
}

/**
 * @param {GradeKey} g
 * @param {string} c chapter slug
 * @param {string} b lesson slug
 * @returns {Lesson | undefined}
 */
export function lesson(g, c, b) {
  return chapter(g, c)?.lessons.find((l) => l.slug === b);
}

/**
 * Root-relative lesson path with a trailing slash, ready for `resolve()`.
 * @param {GradeKey} g
 * @param {string} c chapter slug
 * @param {string} b lesson slug
 */
export function lessonPath(g, c, b) {
  return `/${gradeSlug(gradeNumber(g))}/${c}/${b}/`;
}

/**
 * Neighbours in the global order, crossing chapter and grade boundaries.
 * @param {GradeKey} g
 * @param {string} c chapter slug
 * @param {string} b lesson slug
 * @returns {{ prev: LessonRef | null, next: LessonRef | null }}
 */
export function prevNext(g, c, b) {
  const path = lessonPath(g, c, b);
  const i = ordered.findIndex((ref) => ref.path === path);
  if (i === -1) return { prev: null, next: null };
  return { prev: ordered[i - 1] ?? null, next: ordered[i + 1] ?? null };
}

/**
 * Strands in order of first appearance, each with its chapters across grades.
 * @returns {Strand[]}
 */
export function strands() {
  /** @type {Map<string, Strand>} */
  const bySlug = new Map();
  for (const g of allGrades) {
    for (const c of g.chapters) {
      let s = bySlug.get(c.strand);
      if (!s) bySlug.set(c.strand, (s = { slug: c.strand, chapters: [] }));
      s.chapters.push({ grade: g, chapter: c });
    }
  }
  return [...bySlug.values()];
}

/**
 * `live` once the lesson's `content.vi.js` exists, otherwise `stub`.
 * @param {GradeKey} g
 * @param {string} c chapter slug
 * @param {string} b lesson slug
 * @returns {'live' | 'stub'}
 */
export function lessonStatus(g, c, b) {
  return contentKeys.has(`${gradeSlug(gradeNumber(g))}/${c}/${b}`) ? 'live' : 'stub';
}
