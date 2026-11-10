<script>
  import { tick } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { NUMBERS, builtReading, classesOf, tapClass } from './engine.js';

  /** Colours of lớp đơn vị, lớp nghìn and lớp triệu. */
  const TONES = [
    'border-sky-400 bg-sky-50 text-sky-900',
    'border-amber-400 bg-amber-50 text-amber-900',
    'border-rose-400 bg-rose-50 text-rose-900',
  ];

  let index = $state(0);
  let read = $state(/** @type {number[]} */ ([]));
  let note = $state(
    /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */ ({
      tone: 'info',
      text: 'Em chạm vào lớp bên trái trước.',
    }),
  );

  const n = $derived(NUMBERS[index % NUMBERS.length]);
  const parts = $derived(classesOf(n));
  const built = $derived(builtReading(n, read));
  const done = $derived(read.length === parts.length);

  /** @param {number} cls */
  function tap(cls) {
    const result = tapClass(n, read, cls);
    read = result.read;
    note = { tone: result.tone, text: result.text };
  }

  /** The class buttons, focused again when the reading starts over. */
  let classes = $state(/** @type {HTMLElement | null} */ (null));

  async function restart() {
    read = [];
    note = { tone: 'info', text: 'Em chạm vào lớp bên trái trước.' };
    await tick();
    classes?.querySelector('button')?.focus();
  }

  function next() {
    index += 1;
    read = [];
    note = { tone: 'info', text: 'Em chạm vào lớp bên trái trước.' };
  }
</script>

<div class="space-y-4">
  <p class="text-center text-lg font-semibold text-slate-700">
    Em đọc số theo từng lớp, từ trái sang phải.
  </p>

  <div
    class="flex justify-center gap-1.5"
    role="group"
    aria-label="Các lớp của số"
    bind:this={classes}
  >
    {#each parts as part (part.cls)}
      <button
        type="button"
        class="flex min-h-24 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl border-2 px-1 py-2 {TONES[
          part.cls
        ]} {read.includes(part.cls) ? 'ring-4 ring-emerald-400' : ''}"
        aria-label="{part.name}: {[...part.text].join(' ')}"
        onclick={() => tap(part.cls)}
      >
        <span class="text-3xl font-bold tracking-wide tabular-nums">{part.text}</span>
        <span class="text-sm font-bold">{part.name}</span>
      </button>
    {/each}
  </div>

  <p
    class="min-h-16 rounded-2xl bg-slate-50 px-4 py-3 text-center text-xl font-semibold text-slate-800"
  >
    {built || '...'}
  </p>

  <FeedbackNote tone={note.tone} text={note.text} />

  <div class="flex flex-wrap justify-center gap-2">
    {#if read.length > 0 && !done}
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={restart}
        >Đọc lại</button
      >
    {/if}
    <button
      type="button"
      class="min-h-12 text-lg {done ? button.primary : button.quiet}"
      onclick={next}>Số khác</button
    >
  </div>
</div>
