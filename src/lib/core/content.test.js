import { describe, it, expect } from 'vitest';
import { lesson } from '#lib/curriculum/index.js';
import { checkMinimums, validateLesson } from './content-schema.js';
import { renderLesson } from './render-content.server.js';

/**
 * Every written lesson, validated against the content schema and the per-kind
 * minimums. One eager glob keeps this a single fast Node test.
 */
const contents = /** @type {Record<string, unknown>} */ (
  import.meta.glob('/src/lib/lessons/*/*/*/content.vi.js', { eager: true, import: 'default' })
);

/** Keys only: the widget modules are never loaded here. */
const svelteFiles = Object.keys(import.meta.glob('/src/lib/lessons/*/*/*/*.svelte')).filter(
  (path) => !path.split('/').includes('_shared'),
);

const PREFIX = '/src/lib/lessons/';

/** @param {string} path */
const lessonDir = (path) => path.slice(PREFIX.length, path.lastIndexOf('/'));

const entries = Object.entries(contents).map(([path, content]) => {
  const dir = lessonDir(path);
  const [g, c, b] = dir.split('/');
  const files = svelteFiles.filter((f) => lessonDir(f) === dir).map((f) => f.split('/').pop());
  return {
    dir,
    content,
    meta: lesson(g, c, b),
    grade: Number(g.replace(/^lop-/, '')),
    hasWidget: files.includes('widget.svelte'),
    extraWidgets: files.flatMap((f) => {
      const m = /^(.+)\.widget\.svelte$/.exec(f ?? '');
      return m ? [m[1]] : [];
    }),
  };
});

describe('lesson content', () => {
  it('maps every lesson folder with files to a curriculum lesson', () => {
    const orphans = entries.filter((e) => !e.meta).map((e) => e.dir);
    expect(orphans, 'content.vi.js outside the curriculum').toEqual([]);
    const withContent = new Set(entries.map((e) => e.dir));
    const loose = [...new Set(svelteFiles.map(lessonDir))].filter((d) => !withContent.has(d));
    expect(loose, 'widgets without content.vi.js').toEqual([]);
  });

  for (const e of entries) {
    if (!e.meta) continue;
    const kind = e.meta.kind;
    it(`${e.dir} (${kind}) matches the schema and minimums`, () => {
      const errors = validateLesson(e.content);
      expect(errors, errors.join('\n')).toEqual([]);
      const content = /** @type {import('./content-schema.js').LessonContent} */ (e.content);
      const missing = checkMinimums(content, {
        kind,
        grade: e.grade,
        hasWidget: e.hasWidget,
        extraWidgets: e.extraWidgets,
      });
      expect(missing, missing.join('\n')).toEqual([]);
      // KaTeX renders a parse error as red source text instead of throwing, so
      // look for its error markup in the prerendered lesson.
      const broken = [
        ...JSON.stringify(renderLesson(content)).matchAll(/katex-error[^>]*title=\\"([^"\\]*)/g),
      ].map((m) => m[1]);
      expect(broken, 'TeX that KaTeX cannot parse').toEqual([]);
    });
  }
});
