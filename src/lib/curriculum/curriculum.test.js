import { describe, it, expect } from 'vitest';
import strandSlugs from './strands.json';
import {
  chapter,
  grade,
  gradeSlug,
  grades,
  lesson,
  lessonPath,
  lessonStatus,
  prevNext,
  strands,
} from './index.js';
import { findRedirect, legacyRedirects } from './legacy-redirects.js';
import { grade as matchGrade } from '../../params/grade.js';
import { strand as matchStrand } from '../../params/strand.js';

const KINDS = ['theory', 'practice', 'review', 'activity', 'chuyen-de'];
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe('curriculum shape', () => {
  it('covers grades 1 to 12 in order', () => {
    expect(grades().map((g) => g.grade)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it('keeps only the whitelisted fields', () => {
    for (const g of grades()) {
      expect(Object.keys(g)).toEqual(['grade', 'volumes', 'chapters']);
      for (const c of g.chapters) {
        expect(Object.keys(c)).toEqual([
          'no',
          'label',
          'title',
          'slug',
          'strand',
          'volume',
          'lessons',
        ]);
        for (const l of c.lessons) {
          expect(Object.keys(l)).toEqual([
            'no',
            'title',
            'slug',
            'kind',
            'keyIdeas',
            'interactiveIdea',
          ]);
        }
      }
    }
  });

  it('gives every chapter a label and one of its grade volumes', () => {
    for (const g of grades()) {
      expect(g.volumes.length).toBeGreaterThan(0);
      for (const c of g.chapters) {
        expect(c.label.trim(), `lop-${g.grade}/${c.slug}`).not.toBe('');
        expect(g.volumes, `lop-${g.grade}/${c.slug}`).toContain(c.volume);
        expect(c.lessons.length, `lop-${g.grade}/${c.slug}`).toBeGreaterThan(0);
      }
    }
  });

  it('gives every lesson a known kind, key ideas and an interactive idea', () => {
    for (const g of grades()) {
      for (const c of g.chapters) {
        for (const l of c.lessons) {
          const at = lessonPath(g.grade, c.slug, l.slug);
          expect(KINDS, at).toContain(l.kind);
          expect(l.title.trim(), at).not.toBe('');
          expect(l.keyIdeas.length, at).toBeGreaterThan(0);
          expect(l.interactiveIdea.trim(), at).not.toBe('');
        }
      }
    }
  });

  it('keeps slugs at most 80 characters, well-formed and unique within a grade', () => {
    for (const g of grades()) {
      const chapterSlugs = new Set();
      const lessonSlugs = new Set();
      for (const c of g.chapters) {
        expect(c.slug.length, c.slug).toBeLessThanOrEqual(80);
        expect(c.slug).toMatch(SLUG_RE);
        expect(chapterSlugs.has(c.slug), `duplicate chapter ${c.slug}`).toBe(false);
        chapterSlugs.add(c.slug);
        for (const l of c.lessons) {
          expect(l.slug.length, l.slug).toBeLessThanOrEqual(80);
          expect(l.slug).toMatch(SLUG_RE);
          expect(lessonSlugs.has(l.slug), `duplicate lesson ${l.slug}`).toBe(false);
          lessonSlugs.add(l.slug);
        }
      }
    }
  });
});

describe('strands', () => {
  it('lists every chapter strand once, in order of first appearance', () => {
    expect(strands().map((s) => s.slug)).toEqual(strandSlugs);
    const total = strands().reduce((n, s) => n + s.chapters.length, 0);
    expect(total).toBe(grades().reduce((n, g) => n + g.chapters.length, 0));
  });

  it('groups chapters of a strand across grades in grade order', () => {
    for (const s of strands()) {
      const order = s.chapters.map(({ grade: g }) => g.grade);
      expect(order).toEqual([...order].sort((a, b) => a - b));
      for (const { chapter: c } of s.chapters) expect(c.strand).toBe(s.slug);
    }
  });
});

describe('param matchers', () => {
  it('accepts lop-1 to lop-12 only', () => {
    for (let n = 1; n <= 12; n++) expect(matchGrade(gradeSlug(n))).toBe(`lop-${n}`);
    for (const bad of ['lop-0', 'lop-13', 'lop-01', 'lop-', 'lop-6x', 'so-hoc']) {
      expect(matchGrade(bad), bad).toBeUndefined();
    }
  });

  it('accepts curriculum strands only', () => {
    for (const s of strandSlugs) expect(matchStrand(s)).toBe(s);
    for (const bad of ['lop-6', 'unknown', '', 'SO-HOC'])
      expect(matchStrand(bad), bad).toBeUndefined();
  });

  it('keeps the grade and strand namespaces apart', () => {
    for (const s of strandSlugs) expect(matchGrade(s), s).toBeUndefined();
    for (const g of grades()) expect(matchStrand(gradeSlug(g.grade))).toBeUndefined();
  });
});

describe('accessors', () => {
  const g6 = grade(6);
  const firstChapter = g6?.chapters[0];
  const firstLesson = firstChapter?.lessons[0];

  it('finds a grade by number or route slug', () => {
    expect(g6?.grade).toBe(6);
    expect(grade('lop-6')).toBe(g6);
    expect(grade(13)).toBeUndefined();
    expect(grade('so-hoc')).toBeUndefined();
  });

  it('finds chapters and lessons by slug', () => {
    if (!firstChapter || !firstLesson) throw new Error('lop-6 has no lessons');
    expect(chapter('lop-6', firstChapter.slug)).toBe(firstChapter);
    expect(lesson(6, firstChapter.slug, firstLesson.slug)).toBe(firstLesson);
    expect(chapter(6, 'missing')).toBeUndefined();
    expect(lesson(6, firstChapter.slug, 'missing')).toBeUndefined();
  });

  it('builds root-relative paths with a trailing slash', () => {
    expect(lessonPath('lop-6', 'a', 'b')).toBe('/lop-6/a/b/');
    expect(lessonPath(6, 'a', 'b')).toBe('/lop-6/a/b/');
  });

  it('walks prev/next across chapter and grade boundaries', () => {
    const all = grades();
    const first = all[0].chapters[0];
    const start = prevNext(all[0].grade, first.slug, first.lessons[0].slug);
    expect(start.prev).toBeNull();
    expect(start.next?.lesson).toBe(first.lessons[1]);

    const lastOfChapter = first.lessons[first.lessons.length - 1];
    const crossChapter = prevNext(all[0].grade, first.slug, lastOfChapter.slug);
    expect(crossChapter.next?.chapter).toBe(all[0].chapters[1]);
    expect(crossChapter.next?.lesson).toBe(all[0].chapters[1].lessons[0]);

    const g1Last = all[0].chapters[all[0].chapters.length - 1];
    const crossGrade = prevNext(1, g1Last.slug, g1Last.lessons[g1Last.lessons.length - 1].slug);
    expect(crossGrade.next?.grade).toBe(all[1]);
    expect(crossGrade.next?.path).toBe(
      lessonPath(2, all[1].chapters[0].slug, all[1].chapters[0].lessons[0].slug),
    );
    expect(
      prevNext(2, all[1].chapters[0].slug, all[1].chapters[0].lessons[0].slug).prev?.lesson,
    ).toBe(g1Last.lessons[g1Last.lessons.length - 1]);

    const last = all[all.length - 1];
    const lastChapter = last.chapters[last.chapters.length - 1];
    const end = prevNext(last.grade, lastChapter.slug, lastChapter.lessons.at(-1)?.slug ?? '');
    expect(end.next).toBeNull();
    expect(end.prev).not.toBeNull();

    expect(prevNext(6, 'missing', 'missing')).toEqual({ prev: null, next: null });
  });

  it('reports a lesson without content.vi.js as a stub', () => {
    expect(lessonStatus(6, 'missing', 'missing')).toBe('stub');
    if (!firstChapter || !firstLesson) throw new Error('lop-6 has no lessons');
    expect(['live', 'stub']).toContain(lessonStatus('lop-6', firstChapter.slug, firstLesson.slug));
  });
});

describe('legacy redirects', () => {
  it('covers the nine old lesson URLs once each', () => {
    expect(legacyRedirects).toHaveLength(9);
    const from = legacyRedirects.map((r) => `/${r.strand}/${r.slug}/`);
    expect(new Set(from).size).toBe(from.length);
  });

  it('keeps every old path under a known strand', () => {
    for (const r of legacyRedirects) {
      expect(matchStrand(r.strand), r.strand).toBe(r.strand);
      expect(r.slug).toMatch(SLUG_RE);
    }
  });

  it('points every old path at a lesson that exists in the curriculum', () => {
    for (const r of legacyRedirects) {
      const m = /^\/(lop-\d+)\/([^/]+)\/([^/]+)\/$/.exec(r.to);
      expect(m, r.to).not.toBeNull();
      const [, g, c, b] = /** @type {RegExpExecArray} */ (m);
      expect(lesson(g, c, b), r.to).toBeDefined();
      expect(lessonPath(g, c, b)).toBe(r.to);
    }
  });

  it('finds a redirect by strand and slug only', () => {
    const first = legacyRedirects[0];
    expect(findRedirect(first.strand, first.slug)).toBe(first);
    expect(findRedirect('dai-so', first.slug)).toBeUndefined();
    expect(findRedirect(first.strand, 'missing')).toBeUndefined();
  });
});
