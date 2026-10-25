<script>
  import { resolve } from '$app/paths';
  import { t } from '#lib/i18n/index.js';
  import { lessonPath } from '#lib/curriculum/index.js';
  import SiteShell from './site-shell.svelte';
  import Breadcrumbs from './breadcrumbs.svelte';
  import RichText from './rich-text.svelte';
  import ContentBlock from './content-block.svelte';
  import StepPlayer from './step-player.svelte';
  import PracticeBlock from './practice-block.svelte';
  import PrevNext from './prev-next.svelte';
  import KidLessonPage from './kid-lesson-page.svelte';
  import { crumbs } from './crumbs.js';
  import { KID_MAX_GRADE } from './content-schema.js';
  import { lesson as copy } from './copy.vi.js';
  import { card } from './ui.js';

  /** @type {import('./content-schema.js').LessonPageProps} */
  let props = $props();

  const site = t();
  const { content, grade, chapter, lesson, prev, next } = $derived(props);
  const Widget = $derived(props.widget ?? null);
  const widgets = $derived(props.widgets ?? {});
  const path = $derived(lessonPath(grade.grade, chapter.slug, lesson.slug));
  const storageKey = $derived(resolve(/** @type {import('$app/types').Path} */ (path)));
</script>

<svelte:head>
  <title>{lesson.title} — {site.site.title}</title>
  <meta name="description" content={content.summary} />
</svelte:head>

{#if grade.grade <= KID_MAX_GRADE}
  <KidLessonPage {...props} />
{:else}
  <SiteShell>
    <Breadcrumbs items={crumbs(grade, chapter, lesson)} />

    <article class="space-y-8">
      <header>
        <p class="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {chapter.label} · {site.kinds[lesson.kind]}
        </p>
        <h1 class="mb-3 mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">{lesson.title}</h1>
        <RichText as="p" html={content.intro} class="text-lg leading-relaxed text-slate-700" />
      </header>

      {#if content.objectives.length}
        <section class="{card} p-4 sm:p-5" aria-labelledby="objectives">
          <h2 id="objectives" class="mb-2 text-lg font-bold text-slate-900">{copy.objectives}</h2>
          <ul class="list-disc space-y-1 pl-6 text-slate-800">
            {#each content.objectives as item, i (i)}
              <li><RichText html={item} /></li>
            {/each}
          </ul>
        </section>
      {/if}

      {#each content.sections as section, s (s)}
        <section class="space-y-4" aria-labelledby="section-{s}">
          {#if section.project}
            <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              {copy.project}
            </p>
          {/if}
          <RichText
            as="h2"
            id="section-{s}"
            html={section.heading}
            class="text-2xl font-bold text-slate-900"
          />
          {#each section.blocks as block, b (b)}
            <ContentBlock {block} {widgets} />
          {/each}
        </section>
      {/each}

      {#if Widget}
        <section class="{card} p-4 sm:p-5" aria-labelledby="explore">
          <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            {copy.explore}
          </p>
          <RichText
            as="h2"
            id="explore"
            html={content.explore?.title ?? copy.explore}
            class="mb-1 text-2xl font-bold text-slate-900"
          />
          {#if content.explore}
            <RichText as="p" html={content.explore.instruction} class="mb-4 text-slate-600" />
          {/if}
          <Widget />
        </section>
      {/if}

      {#if content.examples.length}
        <section class="space-y-4" aria-labelledby="examples">
          <h2 id="examples" class="text-2xl font-bold text-slate-900">{copy.examples}</h2>
          {#each content.examples as example, i (i)}
            <StepPlayer {example} n={i + 1} />
          {/each}
        </section>
      {/if}

      {#if content.practice.length}
        <section class="space-y-4" aria-labelledby="practice">
          <h2 id="practice" class="text-2xl font-bold text-slate-900">{copy.practice}</h2>
          <PracticeBlock exercises={content.practice} {storageKey} />
        </section>
      {/if}

      {#if content.takeaways.length}
        <section
          class="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5"
          aria-labelledby="takeaways"
        >
          <h2 id="takeaways" class="mb-2 text-lg font-bold text-emerald-900">{copy.takeaways}</h2>
          <ul class="list-disc space-y-1 pl-6 text-emerald-950">
            {#each content.takeaways as item, i (i)}
              <li><RichText html={item} /></li>
            {/each}
          </ul>
        </section>
      {/if}
    </article>

    <PrevNext {prev} {next} />
  </SiteShell>
{/if}
