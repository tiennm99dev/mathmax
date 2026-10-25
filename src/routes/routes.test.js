import { describe, it, expect } from 'vitest';
import { grades, lessonPath, strands } from '#lib/curriculum/index.js';
import { legacyRedirects } from '#lib/curriculum/legacy-redirects.js';
import * as gradeRoute from './[grade=grade]/+page.js';
import * as chapterRoute from './[grade=grade]/[chapter]/+page.js';
import * as lessonServer from './[grade=grade]/[chapter]/[lesson]/+page.server.js';
import * as lessonRoute from './[grade=grade]/[chapter]/[lesson]/+page.js';
import * as strandRoute from './[strand=strand]/+page.js';
import * as legacyRoute from './[strand=strand]/[slug]/+page.js';
import { grade as matchGrade } from '../params/grade.js';
import { strand as matchStrand } from '../params/strand.js';

/**
 * Calls a load function with only the fields these routes read.
 * @param {Function} load
 * @param {Record<string, string>} params
 * @param {unknown} [data]
 */
const run = (load, params, data = null) => load(/** @type {any} */ ({ params, data }));

/**
 * @param {() => unknown} fn
 * @returns {number | undefined} the HTTP status of the thrown SvelteKit error
 */
function statusOf(fn) {
  try {
    fn();
  } catch (e) {
    return /** @type {{ status?: number }} */ (e).status;
  }
  return undefined;
}

const allLessons = grades().flatMap((g) =>
  g.chapters.flatMap((c) => c.lessons.map((l) => ({ g, c, l }))),
);
const chapterCount = grades().reduce((n, g) => n + g.chapters.length, 0);

describe('prerender entries', () => {
  it('generates every grade, chapter, lesson, strand and legacy path', () => {
    expect(gradeRoute.entries()).toHaveLength(grades().length);
    expect(chapterRoute.entries()).toHaveLength(chapterCount);
    expect(lessonServer.entries()).toHaveLength(allLessons.length);
    expect(strandRoute.entries()).toHaveLength(strands().length);
    expect(legacyRoute.entries()).toHaveLength(legacyRedirects.length);
  });

  it('produces params the route matchers accept', async () => {
    for (const e of [...(await gradeRoute.entries()), ...(await chapterRoute.entries())]) {
      expect(matchGrade(e.grade), e.grade).toBe(e.grade);
    }
    for (const e of [...(await strandRoute.entries()), ...(await legacyRoute.entries())]) {
      expect(matchStrand(e.strand), e.strand).toBe(e.strand);
    }
  });

  it('generates each lesson path once', async () => {
    const paths = (await lessonServer.entries()).map((e) =>
      lessonPath(e.grade, e.chapter, e.lesson),
    );
    expect(new Set(paths).size).toBe(paths.length);
  });
});

describe('hub loads', () => {
  it('resolves a grade and its chapters, and 404s on unknown slugs', () => {
    const g = grades()[0];
    const c = g.chapters[0];
    const slug = `lop-${g.grade}`;
    expect(run(gradeRoute.load, { grade: slug })).toEqual({ grade: g });
    expect(run(chapterRoute.load, { grade: slug, chapter: c.slug })).toEqual({
      grade: g,
      chapter: c,
    });
    expect(statusOf(() => run(chapterRoute.load, { grade: slug, chapter: 'missing' }))).toBe(404);
  });

  it('resolves every strand', () => {
    for (const s of strands()) {
      const out = /** @type {{ strand: { slug: string } }} */ (
        run(strandRoute.load, { strand: s.slug })
      );
      expect(out.strand.slug).toBe(s.slug);
    }
  });
});

describe('lesson loads', () => {
  const { g, c, l } = allLessons[0];
  const params = { grade: `lop-${g.grade}`, chapter: c.slug, lesson: l.slug };

  it('returns null content for an unwritten lesson and 404s outside the curriculum', () => {
    const stub = allLessons.find((x) => {
      const key = { grade: `lop-${x.g.grade}`, chapter: x.c.slug, lesson: x.l.slug };
      return run(lessonServer.load, key)?.content === null;
    });
    expect(stub).toBeDefined();
    expect(statusOf(() => run(lessonServer.load, { ...params, lesson: 'missing' }))).toBe(404);
  });

  it('adds curriculum context and prev/next on the client side', async () => {
    const out = await run(lessonRoute.load, params, { content: null });
    expect(out).toMatchObject({ grade: g, chapter: c, lesson: l, content: null, widget: null });
    expect(out.prev).toBeNull();
    expect(out.next?.lesson).toBe(c.lessons[1]);
  });
});

describe('legacy redirects', () => {
  it('sends every old lesson URL to its new path, without client script', () => {
    expect(legacyRoute.csr).toBe(false);
    for (const r of legacyRedirects) {
      expect(run(legacyRoute.load, { strand: r.strand, slug: r.slug })).toEqual({ to: r.to });
    }
    expect(
      statusOf(() => run(legacyRoute.load, { strand: strands()[0].slug, slug: 'missing' })),
    ).toBe(404);
  });
});
