import { t } from '#lib/i18n/index.js';
import { gradeSlug } from '#lib/curriculum/index.js';
import { nav } from './copy.vi.js';

/** @typedef {import('#lib/curriculum/index.js').Grade} Grade */
/** @typedef {import('#lib/curriculum/index.js').Chapter} Chapter */
/** @typedef {import('#lib/curriculum/index.js').Lesson} Lesson */

/**
 * Breadcrumb trail home → grade → chapter → lesson, as deep as given.
 * @param {Grade} grade
 * @param {Chapter} [chapter]
 * @param {Lesson} [lesson]
 * @returns {Array<{ label: string, href: string }>}
 */
export function crumbs(grade, chapter, lesson) {
  const g = gradeSlug(grade.grade);
  const items = [
    { label: nav.home, href: '/' },
    { label: t().grades[g], href: `/${g}/` },
  ];
  if (chapter) items.push({ label: chapter.title, href: `/${g}/${chapter.slug}/` });
  if (chapter && lesson) {
    items.push({ label: lesson.title, href: `/${g}/${chapter.slug}/${lesson.slug}/` });
  }
  return items;
}
