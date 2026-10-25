<script>
  import { resolve } from '$app/paths';
  import { t } from '#lib/i18n/index.js';
  import { gradeSlug, lessonPath, lessonStatus } from '#lib/curriculum/index.js';
  import SiteShell from './site-shell.svelte';
  import Breadcrumbs from './breadcrumbs.svelte';
  import StatusBadge from './status-badge.svelte';
  import { crumbs } from './crumbs.js';
  import { hub as copy } from './copy.vi.js';
  import { focusRing } from './ui.js';

  /**
   * A chapter's lessons with their kind and live / "Sắp ra mắt" status. Stub
   * lessons are dimmed but stay clickable, so navigation is complete.
   * @type {{
   *   grade: import('#lib/curriculum/index.js').Grade;
   *   chapter: import('#lib/curriculum/index.js').Chapter;
   * }}
   */
  let { grade, chapter } = $props();

  const site = t();
  const lessons = $derived(
    chapter.lessons.map((l) => ({
      ...l,
      status: lessonStatus(grade.grade, chapter.slug, l.slug),
      path: lessonPath(grade.grade, chapter.slug, l.slug),
    })),
  );
  const live = $derived(lessons.filter((l) => l.status === 'live').length);
</script>

<svelte:head>
  <title>{chapter.title} — {site.site.title}</title>
  <meta
    name="description"
    content={`${chapter.label}: ${chapter.title}. ${copy.lessonCount(live, lessons.length)}.`}
  />
</svelte:head>

<SiteShell>
  <Breadcrumbs items={crumbs(grade, chapter)} />
  <header class="mb-6">
    <p class="text-sm font-semibold uppercase tracking-wide text-slate-500">
      {site.grades[gradeSlug(grade.grade)]} · {chapter.label}
    </p>
    <h1 class="mb-2 mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">{chapter.title}</h1>
    <p class="text-slate-600">{copy.lessonCount(live, lessons.length)}</p>
  </header>

  <h2 class="sr-only">{copy.lessons}</h2>
  <ol class="space-y-3">
    {#each lessons as l (l.slug)}
      <li>
        <a
          href={resolve(/** @type {import('$app/types').Path} */ (l.path))}
          class="flex min-h-12 flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-400 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between {focusRing} {l.status ===
          'live'
            ? ''
            : 'opacity-75'}"
        >
          <span>
            <span class="block font-semibold text-slate-900">{l.title}</span>
            <span class="text-sm text-slate-500">{site.kinds[l.kind]}</span>
          </span>
          <StatusBadge status={l.status} />
        </a>
      </li>
    {/each}
  </ol>
</SiteShell>
