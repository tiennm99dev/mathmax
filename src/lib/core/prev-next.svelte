<script>
  import { resolve } from '$app/paths';
  import { nav } from './copy.vi.js';
  import { focusRing } from './ui.js';

  /** @typedef {import('#lib/curriculum/index.js').LessonRef} LessonRef */

  /** @type {{ prev: LessonRef | null, next: LessonRef | null }} */
  let { prev, next } = $props();

  const cell = `flex min-h-12 flex-col justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-indigo-400 ${focusRing}`;
</script>

<nav aria-label={nav.prevNext} class="mt-10 grid gap-3 sm:grid-cols-2">
  {#if prev}
    <a href={resolve(/** @type {import('$app/types').Path} */ (prev.path))} rel="prev" class={cell}>
      <span class="text-sm text-slate-500">← {nav.prev}</span>
      <span class="font-semibold text-slate-900">{prev.lesson.title}</span>
    </a>
  {:else}
    <span class="hidden sm:block"></span>
  {/if}
  {#if next}
    <a
      href={resolve(/** @type {import('$app/types').Path} */ (next.path))}
      rel="next"
      class="{cell} sm:text-right"
    >
      <span class="text-sm text-slate-500">{nav.next} →</span>
      <span class="font-semibold text-slate-900">{next.lesson.title}</span>
    </a>
  {/if}
</nav>
