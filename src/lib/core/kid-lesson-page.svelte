<script>
  import { resolve } from '$app/paths';
  import { t } from '#lib/i18n/index.js';
  import { gradeSlug, lessonPath } from '#lib/curriculum/index.js';
  import SiteShell from './site-shell.svelte';
  import Breadcrumbs from './breadcrumbs.svelte';
  import RichText from './rich-text.svelte';
  import ContentBlock from './content-block.svelte';
  import StepPlayer from './step-player.svelte';
  import PracticeBlock from './practice-block.svelte';
  import PrevNext from './prev-next.svelte';
  import KidCard from './kid/kid-card.svelte';
  import { crumbs } from './crumbs.js';
  import { lesson as copy, readAloud } from './copy.vi.js';

  /**
   * Lesson layout for grades 1-5: a 20 px base size, 48 px touch targets, the
   * widget before the text, and one idea per card with read-aloud.
   * `lesson-page.svelte` picks it for grades up to 5 and owns the page head.
   * @type {import('./content-schema.js').LessonPageProps}
   */
  let props = $props();

  const site = t();
  const { content, grade, chapter, lesson, prev, next } = $derived(props);
  const Widget = $derived(props.widget ?? null);
  const widgets = $derived(props.widgets ?? {});
  const path = $derived(lessonPath(grade.grade, chapter.slug, lesson.slug));
  const storageKey = $derived(resolve(/** @type {import('$app/types').Path} */ (path)));
</script>

<SiteShell>
  <div class="kid space-y-6 text-[20px] leading-relaxed">
    <Breadcrumbs items={crumbs(grade, chapter, lesson)} />

    <KidCard what={lesson.title} labelledby="lesson-title">
      <p class="text-base font-semibold text-slate-500">
        {site.grades[gradeSlug(grade.grade)]} · {site.kinds[lesson.kind]}
      </p>
      <h1 id="lesson-title" class="text-3xl font-bold text-slate-900 sm:text-4xl">
        {lesson.title}
      </h1>
      <RichText as="p" html={content.intro} class="text-slate-800" />
    </KidCard>

    {#if Widget}
      <KidCard what={copy.explore} tone="accent" labelledby="explore" speak={!!content.explore}>
        <RichText
          as="h2"
          id="explore"
          html={content.explore?.title ?? copy.explore}
          class="text-2xl font-bold text-indigo-900"
        />
        {#if content.explore}
          <RichText as="p" html={content.explore.instruction} class="text-indigo-950" />
        {/if}
        <div data-no-speech><Widget /></div>
      </KidCard>
    {/if}

    {#if content.objectives.length}
      <KidCard what={copy.objectives} labelledby="objectives">
        <h2 id="objectives" class="text-2xl font-bold text-slate-900">{copy.objectives}</h2>
        <ul class="list-disc space-y-2 pl-7 text-slate-800">
          {#each content.objectives as item, i (i)}
            <li><RichText html={item} /></li>
          {/each}
        </ul>
      </KidCard>
    {/if}

    {#each content.sections as section, s (s)}
      <RichText as="h2" html={section.heading} class="pt-2 text-2xl font-bold text-slate-900" />
      {#each section.blocks as block, b (b)}
        <KidCard
          what={section.blocks.length > 1
            ? readAloud.part(section.label, b + 1, section.blocks.length)
            : section.label}
          speak={block.type !== 'widget' && block.type !== 'tex' && block.type !== 'table'}
          tone={section.project ? 'accent' : 'plain'}
        >
          {#if section.project && b === 0}
            <p class="text-base font-semibold uppercase tracking-wide text-indigo-600">
              {copy.project}
            </p>
          {/if}
          <ContentBlock {block} {widgets} />
        </KidCard>
      {/each}
    {/each}

    {#if content.examples.length}
      <h2 class="pt-2 text-2xl font-bold text-slate-900">{copy.examples}</h2>
      {#each content.examples as example, i (i)}
        <StepPlayer {example} n={i + 1} />
      {/each}
    {/if}

    {#if content.practice.length}
      <section class="space-y-4" aria-labelledby="practice">
        <h2 id="practice" class="pt-2 text-2xl font-bold text-slate-900">{copy.practice}</h2>
        <PracticeBlock exercises={content.practice} {storageKey} />
      </section>
    {/if}

    {#if content.takeaways.length}
      <KidCard what={copy.takeaways} tone="success" labelledby="takeaways">
        <h2 id="takeaways" class="text-2xl font-bold text-emerald-900">{copy.takeaways}</h2>
        <ul class="list-disc space-y-2 pl-7 text-emerald-950">
          {#each content.takeaways as item, i (i)}
            <li><RichText html={item} /></li>
          {/each}
        </ul>
      </KidCard>
    {/if}

    <PrevNext {prev} {next} />
  </div>
</SiteShell>
