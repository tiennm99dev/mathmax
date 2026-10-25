import { describe, it, expect } from 'vitest';
import { balancedTex, checkMinimums, validateLesson, widgetNames } from './content-schema.js';

/** @typedef {import('./content-schema.js').LessonContent} LessonContent */
/** @typedef {import('./content-schema.js').Exercise} Exercise */

const base = { prompt: 'Tính $1+1$.', hints: ['Đếm thêm một.'], solution: '$1+1=2$.' };

/** @param {number} n @returns {Exercise[]} */
const numbers = (n) =>
  Array.from({ length: n }, (_, i) => ({ ...base, type: 'number', answer: i }));

/** @returns {LessonContent} */
function theory() {
  return {
    summary: 'Bài học về phép cộng.',
    intro: 'Ta học phép cộng $a+b$.',
    objectives: ['Cộng hai số.'],
    sections: [
      {
        heading: 'Phép cộng',
        blocks: [
          { type: 'p', text: 'Ví dụ $2+3=5$.' },
          { type: 'tex', tex: 'a+b=b+a' },
          { type: 'list', items: ['Một', 'Hai'] },
          { type: 'callout', tone: 'theorem', title: 'Tính chất', text: '$a+b=b+a$' },
          { type: 'table', head: ['a', 'b'], rows: [['1', '2']] },
        ],
      },
      { heading: 'Thử', blocks: [{ type: 'widget', name: 'balance' }] },
    ],
    explore: { title: 'Cân', instruction: 'Kéo quả cân.' },
    examples: [
      { problem: '$2+2$', steps: ['Đếm.'], answer: '$4$' },
      { problem: '$3+1$', steps: ['Đếm.'], answer: '$4$' },
    ],
    practice: numbers(5),
    takeaways: ['Cộng có tính giao hoán.'],
  };
}

/** @type {import('./content-schema.js').LessonContext} */
const theoryCtx = {
  kind: 'theory',
  grade: 6,
  hasWidget: true,
  extraWidgets: ['balance'],
};

describe('balancedTex', () => {
  it.each(['', 'no math', '$a$', '$$a$$', 'x $a$ and $$b$$ y', 'cost \\$5', '$\\$$'])(
    'accepts %j',
    (s) => expect(balancedTex(s)).toBe(true),
  );
  it.each(['$a', '$$a$', 'a $b$ $c', '$$a'])('rejects %j', (s) => {
    expect(balancedTex(s)).toBe(false);
  });
});

describe('validateLesson', () => {
  it('accepts a complete lesson', () => {
    expect(validateLesson(theory())).toEqual([]);
  });

  it('accepts every exercise type', () => {
    const lesson = theory();
    lesson.practice = [
      { ...base, type: 'number', answer: 3.5, tolerance: 0.1, unit: 'cm' },
      { ...base, type: 'fraction', answer: [3, 4], simplest: true },
      { ...base, type: 'choice', options: ['a', 'b'], answer: 1 },
      { ...base, type: 'multi', options: ['a', 'b', 'c'], answers: [0, 2] },
      { ...base, type: 'text', accept: ['vuông'] },
      { ...base, type: 'order', items: ['a', 'b', 'c'], answer: [2, 0, 1] },
      {
        ...base,
        type: 'match',
        left: ['a', 'b'],
        right: ['x', 'y', 'z'],
        pairs: [
          [0, 2],
          [1, 0],
        ],
      },
      { ...base, type: 'count', picture: 'apple', answer: 4, choices: [3, 4, 5] },
    ];
    expect(validateLesson(lesson)).toEqual([]);
  });

  it('rejects a non-object', () => {
    expect(validateLesson(null)).toEqual(['content: must be an object']);
  });

  it('reports unknown fields, missing text and unclosed TeX with paths', () => {
    const lesson = /** @type {any} */ (theory());
    lesson.title = 'x';
    lesson.intro = '';
    lesson.sections[0].blocks[0].text = 'open $a+b';
    lesson.sections[0].blocks[1].tex = '$a$';
    lesson.summary = 'Có $x$';
    const errors = validateLesson(lesson);
    expect(errors).toContain('content: unknown field "title"');
    expect(errors).toContain('intro: must be a non-empty string');
    expect(errors).toContain('sections[0].blocks[0].text: has an unclosed $ delimiter');
    expect(errors).toContain(
      'sections[0].blocks[1].tex: is TeX source; leave out the $ delimiters',
    );
    expect(errors).toContain('summary: is plain text for the meta description; leave out TeX');
  });

  it('checks blocks', () => {
    const lesson = /** @type {any} */ (theory());
    lesson.sections[0].blocks = [
      { type: 'video' },
      { type: 'callout', tone: 'tip', text: 'x' },
      { type: 'table', head: ['a', 'b'], rows: [['1']] },
      { type: 'widget', name: 'Bad Name' },
      { type: 'list', items: [] },
    ];
    expect(validateLesson(lesson)).toEqual([
      'sections[0].blocks[0].type: unknown block "video"',
      'sections[0].blocks[1].tone: must be one of definition, theorem, note, warning',
      'sections[0].blocks[2].rows[0]: must have 2 cells like head',
      'sections[0].blocks[3].name: must be a kebab-case widget name',
      'sections[0].blocks[4].items: needs at least 1 item(s)',
    ]);
  });

  /** @type {Array<[string, object, string]>} */
  const badExercises = [
    ['unknown type', { type: 'essay' }, 'practice[0].type: unknown exercise "essay"'],
    ['no hints', { type: 'number', answer: 1, hints: [] }, 'practice[0].hints: needs at least 1'],
    ['number answer', { type: 'number', answer: '1' }, 'practice[0].answer: must be a finite'],
    ['tolerance', { type: 'number', answer: 1, tolerance: -1 }, 'practice[0].tolerance'],
    ['zero denominator', { type: 'fraction', answer: [1, 0] }, 'practice[0].answer: must be ['],
    ['choice range', { type: 'choice', options: ['a', 'b'], answer: 2 }, 'from 0 to 1'],
    ['multi repeat', { type: 'multi', options: ['a', 'b'], answers: [1, 1] }, 'must not repeat'],
    ['text accept', { type: 'text', accept: [] }, 'practice[0].accept: needs at least 1'],
    ['order perm', { type: 'order', items: ['a', 'b'], answer: [0, 0] }, 'permutation of 0..1'],
    [
      'match reuse',
      {
        type: 'match',
        left: ['a', 'b'],
        right: ['x', 'y'],
        pairs: [
          [0, 1],
          [1, 1],
        ],
      },
      'must not reuse a right index',
    ],
    [
      'match missing left',
      { type: 'match', left: ['a', 'b'], right: ['x', 'y'], pairs: [[0, 1]] },
      'must pair each of the 2 left items once',
    ],
    ['count picture', { type: 'count', picture: 'dragon', answer: 3 }, 'must name a kid picture'],
    [
      'count choices',
      { type: 'count', picture: 'star', answer: 3, choices: [1, 2] },
      'must include the answer',
    ],
    ['extra field', { type: 'text', accept: ['a'], answer: 'a' }, 'unknown field "answer"'],
  ];

  it.each(badExercises)('reports %s', (_, ex, message) => {
    const lesson = theory();
    lesson.practice = [/** @type {Exercise} */ ({ ...base, ...ex })];
    const errors = validateLesson(lesson);
    expect(
      errors.some((e) => e.includes(message)),
      errors.join('\n'),
    ).toBe(true);
  });
});

describe('widgetNames', () => {
  it('lists each referenced widget once', () => {
    const lesson = theory();
    lesson.sections[0].blocks.push({ type: 'widget', name: 'balance' });
    expect(widgetNames(lesson)).toEqual(['balance']);
  });
});

describe('checkMinimums', () => {
  it('passes a complete theory lesson', () => {
    expect(checkMinimums(theory(), theoryCtx)).toEqual([]);
  });

  it('enforces theory minimums and widgets', () => {
    const lesson = theory();
    lesson.sections = lesson.sections.slice(0, 1);
    lesson.examples = lesson.examples.slice(0, 1);
    lesson.practice = numbers(4);
    expect(checkMinimums(lesson, { ...theoryCtx, hasWidget: false, extraWidgets: [] })).toEqual([
      'sections: theory needs at least 2 sections',
      'examples: theory needs at least 2 examples',
      'practice: theory needs at least 5 exercises',
      'widget.svelte: theory needs a main widget',
      'explore: has no widget.svelte to frame',
    ]);
  });

  it('reports a referenced widget file that is missing', () => {
    expect(checkMinimums(theory(), { ...theoryCtx, extraWidgets: [] })).toEqual([
      'widget "balance": balance.widget.svelte is missing',
    ]);
  });

  it('needs an explore frame for a widget', () => {
    const lesson = theory();
    delete lesson.explore;
    expect(checkMinimums(lesson, theoryCtx)).toEqual([
      'explore: widget.svelte needs an explore frame',
    ]);
  });

  it.each(/** @type {const} */ (['practice', 'review']))('needs 8 exercises for %s', (kind) => {
    const lesson = { ...theory(), sections: [], explore: undefined, practice: numbers(7) };
    const ctx = { kind, grade: 7, hasWidget: false };
    expect(checkMinimums(lesson, ctx)).toEqual([`practice: ${kind} needs at least 8 exercises`]);
    expect(checkMinimums({ ...lesson, practice: numbers(8) }, ctx)).toEqual([]);
  });

  it.each(/** @type {const} */ (['activity', 'chuyen-de']))(
    'needs a section, a project brief and 3 exercises for %s',
    (kind) => {
      const lesson = theory();
      delete lesson.explore;
      const brief = { heading: 'Dự án', project: true, blocks: [{ type: 'p', text: 'Làm.' }] };
      const ctx = { kind, grade: 10, hasWidget: false, extraWidgets: ['balance'] };
      expect(checkMinimums({ ...lesson, practice: numbers(2) }, ctx)).toEqual([
        `sections: ${kind} needs a section with project: true`,
        `practice: ${kind} needs at least 3 exercises`,
      ]);
      expect(
        checkMinimums(
          /** @type {LessonContent} */ ({ ...lesson, sections: [brief], practice: numbers(3) }),
          ctx,
        ),
      ).toEqual([`sections: ${kind} needs at least 1 section besides the project brief`]);
      expect(
        checkMinimums(
          /** @type {LessonContent} */ ({
            ...lesson,
            sections: [...lesson.sections, brief],
            practice: numbers(3),
          }),
          ctx,
        ),
      ).toEqual([]);
    },
  );

  it('caps the kid intro at 300 characters', () => {
    const lesson = { ...theory(), intro: 'a'.repeat(301) };
    expect(checkMinimums(lesson, { ...theoryCtx, grade: 5 })).toEqual([
      'intro: kid intro must be at most 300 characters',
    ]);
    expect(checkMinimums(lesson, { ...theoryCtx, grade: 6 })).toEqual([]);
  });
});
