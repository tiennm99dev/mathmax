<script>
  import { t } from '#lib/i18n/index.js';
  import { gradeSlug } from '#lib/curriculum/index.js';
  import SiteShell from './site-shell.svelte';
  import Breadcrumbs from './breadcrumbs.svelte';
  import ChapterCard from './chapter-card.svelte';
  import { nav } from './copy.vi.js';

  /**
   * Every chapter of one strand (Số học, Đại số, ...) across grades.
   * @type {{ strand: import('#lib/curriculum/index.js').Strand }}
   */
  let { strand } = $props();

  const site = t();
  const info = $derived(site.strands[strand.slug] ?? { title: strand.slug, blurb: '' });
  const byGrade = $derived.by(() => {
    /** @type {Array<{ n: number, chapters: typeof strand.chapters }>} */
    const groups = [];
    for (const entry of strand.chapters) {
      const n = entry.grade.grade;
      const group = groups.find((g) => g.n === n);
      if (group) group.chapters.push(entry);
      else groups.push({ n, chapters: [entry] });
    }
    return groups;
  });
</script>

<svelte:head>
  <title>{info.title} — {site.site.title}</title>
  <meta name="description" content={info.blurb || info.title} />
</svelte:head>

<SiteShell width="wide">
  <Breadcrumbs items={[{ label: nav.home, href: '/' }, { label: info.title }]} />
  <header class="mb-8">
    <h1 class="mb-2 text-3xl font-bold text-slate-900 sm:text-4xl">{info.title}</h1>
    {#if info.blurb}<p class="text-lg text-slate-600">{info.blurb}</p>{/if}
  </header>

  <div class="space-y-10">
    {#each byGrade as group (group.n)}
      <section aria-labelledby="grade-{group.n}">
        <h2 id="grade-{group.n}" class="mb-4 text-xl font-bold text-slate-800">
          {site.grades[gradeSlug(group.n)]}
        </h2>
        <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {#each group.chapters as entry (entry.chapter.slug)}
            <li><ChapterCard grade={entry.grade} chapter={entry.chapter} /></li>
          {/each}
        </ul>
      </section>
    {/each}
  </div>
</SiteShell>
