import { describe, it, expect, vi } from 'vitest';
import { lesson } from '#lib/curriculum/index.js';
import { checkMinimums, validateLesson } from './content-schema.js';
import { renderLesson } from './render-content.server.js';
import { matchOrder } from './practice-state.js';

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
      // KaTeX reports LaTeX-incompatible input through console.warn; any such
      // warning (Vietnamese letters are already allowed) fails the lesson.
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      /** @type {string[]} */
      let strict;
      let rendered;
      let page;
      try {
        page = renderLesson(content);
        rendered = JSON.stringify(page);
        strict = warn.mock.calls.map((args) => args.join(' '));
      } finally {
        warn.mockRestore();
      }
      expect(strict, 'TeX that KaTeX strict mode warns about').toEqual([]);
      const broken = [...rendered.matchAll(/katex-error[^>]*title=\\"([^"\\]*)/g)].map((m) => m[1]);
      expect(broken, 'TeX that KaTeX cannot parse').toEqual([]);
      // The right column is shown in a seeded order taken from the rendered
      // exercise; no left item may sit level with its partner.
      page.practice.forEach((ex, i) => {
        if (ex.type !== 'match') return;
        const order = matchOrder(ex);
        const across = ex.pairs.filter(([l, r]) => order[l] === r);
        expect(across, `practice[${i}] pairs that read straight across`).toEqual([]);
      });
    });
  }
});
