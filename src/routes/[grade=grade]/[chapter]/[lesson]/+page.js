import { error } from '@sveltejs/kit';
import { chapter, grade, lesson, prevNext } from '#lib/curriculum/index.js';

/** @typedef {import('svelte').Component<any>} Component */

/**
 * Lesson widgets, loaded lazily so each lesson's widgets land in their own
 * chunk: `widget.svelte` is the main one, `<name>.widget.svelte` the extras.
 */
const widgetModules = /** @type {Record<string, () => Promise<{ default: Component }>>} */ (
  import.meta.glob([
    '/src/lib/lessons/*/*/*/widget.svelte',
    '/src/lib/lessons/*/*/*/*.widget.svelte',
  ])
);

/**
 * Loads the widgets in one lesson folder.
 * @param {string} dir `lop-N/<chuong>/<bai>`
 * @returns {Promise<{ widget: Component | null, widgets: Record<string, Component> }>}
 */
async function loadWidgets(dir) {
  const prefix = `/src/lib/lessons/${dir}/`;
  /** @type {Component | null} */
  let widget = null;
  /** @type {Record<string, Component>} */
  const widgets = {};
  await Promise.all(
    Object.entries(widgetModules)
      .filter(([path]) => path.startsWith(prefix) && !path.slice(prefix.length).includes('/'))
      .map(async ([path, importer]) => {
        const file = path.slice(prefix.length);
        const component = (await importer()).default;
        if (file === 'widget.svelte') widget = component;
        else widgets[file.replace(/\.widget\.svelte$/, '')] = component;
      }),
  );
  return { widget, widgets };
}

/**
 * Curriculum context comes from the bundled curriculum rather than the server
 * data, so `__data.json` carries only the rendered content.
 * @type {import('./$types').PageLoad}
 */
export async function load({ params, data }) {
  const g = grade(params.grade);
  const c = chapter(params.grade, params.chapter);
  const l = lesson(params.grade, params.chapter, params.lesson);
  if (!g || !c || !l) error(404, 'Unknown lesson');
  const { prev, next } = prevNext(g.grade, c.slug, l.slug);
  const base = { grade: g, chapter: c, lesson: l, prev, next };
  if (!data.content) return { ...base, content: null, widget: null, widgets: {} };
  return {
    ...base,
    content: data.content,
    ...(await loadWidgets(`${params.grade}/${c.slug}/${l.slug}`)),
  };
}
