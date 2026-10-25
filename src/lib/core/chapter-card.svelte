<script>
  import { resolve } from '$app/paths';
  import { t } from '#lib/i18n/index.js';
  import { gradeSlug, lessonStatus } from '#lib/curriculum/index.js';
  import StatusBadge from './status-badge.svelte';
  import { chapterStatus } from './chapter-status.js';
  import { hub as copy } from './copy.vi.js';
  import { focusRing } from './ui.js';

  /**
   * A chapter link with its live lesson count. The badge says `Đã có` only when
   * every lesson is live and `k/n bài` when some are. Chapters with no lesson
   * yet are dimmed but stay clickable.
   * @type {{
   *   grade: import('#lib/curriculum/index.js').Grade;
   *   chapter: import('#lib/curriculum/index.js').Chapter;
   *   showGrade?: boolean;
   * }}
   */
  let { grade, chapter, showGrade = false } = $props();

  const site = t();
  const live = $derived(
    chapter.lessons.filter((l) => lessonStatus(grade.grade, chapter.slug, l.slug) === 'live')
      .length,
  );
  const total = $derived(chapter.lessons.length);
  const status = $derived(chapterStatus(live, total));
  const path = $derived(`/${gradeSlug(grade.grade)}/${chapter.slug}/`);
</script>

<a
  href={resolve(/** @type {import('$app/types').Path} */ (path))}
  class="flex h-full flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-400 hover:shadow-sm {focusRing} {live
    ? ''
    : 'opacity-75'}"
>
  <div class="flex items-start justify-between gap-3">
    <span class="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {#if showGrade}{site.grades[gradeSlug(grade.grade)]} ·
      {/if}{chapter.label}
    </span>
    <StatusBadge {status} {live} {total} />
  </div>
  <h3 class="font-bold leading-snug text-slate-900">{chapter.title}</h3>
  <p class="mt-auto text-sm text-slate-500">{copy.lessonCount(live, total)}</p>
</a>
