<script>
  import { resolve } from '$app/paths';
  import { t } from '#lib/i18n/index.js';
  import { gradeSlug } from '#lib/curriculum/index.js';
  import SiteShell from './site-shell.svelte';
  import Breadcrumbs from './breadcrumbs.svelte';
  import StatusBadge from './status-badge.svelte';
  import PrevNext from './prev-next.svelte';
  import { crumbs } from './crumbs.js';
  import { hub as copy } from './copy.vi.js';
  import { card, focusRing } from './ui.js';

  /**
   * Placeholder for a curriculum lesson without content yet: title, kind,
   * "Sắp ra mắt", the planned key ideas and widget, and prev/next. Not indexed.
   * @type {{
   *   grade: import('#lib/curriculum/index.js').Grade;
   *   chapter: import('#lib/curriculum/index.js').Chapter;
   *   lesson: import('#lib/curriculum/index.js').Lesson;
   *   prev: import('#lib/curriculum/index.js').LessonRef | null;
   *   next: import('#lib/curriculum/index.js').LessonRef | null;
   * }}
   */
  let { grade, chapter, lesson, prev, next } = $props();

  const site = t();
  const chapterPath = $derived(`/${gradeSlug(grade.grade)}/${chapter.slug}/`);
</script>

<svelte:head>
  <title>{lesson.title} — {site.site.title}</title>
  <meta name="description" content={`${lesson.title}. ${lesson.keyIdeas.join(', ')}.`} />
  <meta name="robots" content="noindex" />
</svelte:head>

<SiteShell>
  <Breadcrumbs items={crumbs(grade, chapter, lesson)} />

  <article class="space-y-6">
    <header>
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {chapter.label} · {site.kinds[lesson.kind]}
        </span>
        <StatusBadge status="stub" />
      </div>
      <h1 class="mb-3 mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{lesson.title}</h1>
      <p class="leading-relaxed text-slate-600">{copy.stubNote}</p>
    </header>

    {#if lesson.keyIdeas.length}
      <section class="{card} p-4 sm:p-5" aria-labelledby="will-have">
        <h2 id="will-have" class="mb-2 text-lg font-bold text-slate-900">{copy.willHave}</h2>
        <ul class="list-disc space-y-1 pl-6 text-slate-800">
          {#each lesson.keyIdeas as idea, i (i)}
            <li>{idea}</li>
          {/each}
        </ul>
      </section>
    {/if}

    {#if lesson.interactiveIdea}
      <section
        class="rounded-2xl border border-dashed border-indigo-300 bg-indigo-50 p-4 sm:p-5"
        aria-labelledby="preview"
      >
        <h2 id="preview" class="mb-1 text-lg font-bold text-indigo-900">{copy.preview}</h2>
        <p class="text-indigo-950">{lesson.interactiveIdea}</p>
      </section>
    {/if}

    <p>
      <a
        href={resolve(/** @type {import('$app/types').Path} */ (chapterPath))}
        class="rounded font-semibold text-indigo-600 hover:underline {focusRing}"
        >← {copy.backToChapter}: {chapter.title}</a
      >
    </p>
  </article>

  <PrevNext {prev} {next} />
</SiteShell>
