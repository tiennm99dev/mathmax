import { error } from '@sveltejs/kit';
import { gradeSlug, grades, lesson } from '#lib/curriculum/index.js';
import { renderLesson } from '#lib/core/render-content.server.js';

/** @typedef {import('#lib/core/content-schema.js').LessonContent} LessonContent */

/**
 * Written lesson content, keyed by `lop-N/<chuong>/<bai>`. Eager, but this module
 * only runs on the server at prerender time, so lesson data never ships as code.
 */
const contents = /** @type {Record<string, LessonContent>} */ (
  Object.fromEntries(
    Object.entries(
      import.meta.glob('/src/lib/lessons/*/*/*/content.vi.js', { eager: true, import: 'default' }),
    ).map(([path, content]) => [
      path.replace(/^\/src\/lib\/lessons\//, '').replace(/\/content\.vi\.js$/, ''),
      content,
    ]),
  )
);

/**
 * Every curriculum lesson, written or not: unwritten ones prerender as stubs.
 * @type {import('./$types').EntryGenerator}
 */
export function entries() {
  return grades().flatMap((g) =>
    g.chapters.flatMap((c) =>
      c.lessons.map((l) => ({ grade: gradeSlug(g.grade), chapter: c.slug, lesson: l.slug })),
    ),
  );
}

/**
 * Renders the lesson's TeX to HTML here, so the client never loads KaTeX for
 * content. A stub returns `content: null`.
 * @type {import('./$types').PageServerLoad}
 */
export function load({ params }) {
  if (!lesson(params.grade, params.chapter, params.lesson)) error(404, 'Unknown lesson');
  const content = contents[`${params.grade}/${params.chapter}/${params.lesson}`];
  return { content: content ? renderLesson(content) : null };
}
