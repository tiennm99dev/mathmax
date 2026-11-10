<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { CLASS_NAMES } from '../_shared/big-numbers.js';
  import { ROUNDS, groups, question, tapNote } from './engine.js';

  /** Colours of lớp đơn vị and lớp nghìn. */
  const TONES = [
    'bg-sky-100 border-sky-400 text-sky-900',
    'bg-amber-100 border-amber-400 text-amber-900',
  ];

  let index = $state(0);
  let split = $state(false);
  /** The place tapped last, or null. */
  let tapped = $state(/** @type {number | null} */ (null));

  const round = $derived(ROUNDS[index % ROUNDS.length]);
  const parts = $derived(groups(round.n));
  const note = $derived(tapped === null ? null : tapNote(round, tapped));
  const solved = $derived(note?.tone === 'ok');

  /** @param {number} exp */
  function tap(exp) {
    if (solved) return;
    tapped = exp;
    if (tapNote(round, exp).tone === 'warn') split = true;
  }

  function next() {
    index += 1;
    tapped = null;
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800" aria-live="polite">
    {question(round)}
  </p>

  <div
    class="flex flex-wrap items-start justify-center {split ? 'gap-2' : 'gap-0'}"
    role="group"
    aria-label="Số {fmt(round.n)}"
  >
    {#each parts as part (part.cls)}
      <div class="flex flex-col items-center gap-1">
        <div
          class="flex rounded-2xl border-2 p-0.5 {split ? TONES[part.cls] : 'border-transparent'}"
        >
          {#each part.digits as d (d.exp)}
            <button
              type="button"
              class="flex h-16 w-12 items-center justify-center rounded-xl border-2 text-4xl font-bold tabular-nums {tapped ===
              d.exp
                ? solved
                  ? 'border-emerald-500 bg-emerald-100'
                  : 'border-amber-500 bg-amber-50'
                : 'border-slate-300 bg-white'}"
              aria-label="Chữ số {d.digit}, vị trí thứ {String(round.n).length -
                d.exp} từ trái sang"
              onclick={() => tap(d.exp)}>{d.digit}</button
            >
          {/each}
        </div>
        {#if split}
          <span class="text-base font-bold">Lớp {CLASS_NAMES[part.cls]}</span>
        {/if}
      </div>
    {/each}
  </div>

  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-lg {split ? button.primary : button.quiet}"
      aria-pressed={split}
      onclick={() => (split = !split)}>Tách lớp</button
    >
    {#if solved}
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Câu tiếp theo
      </button>
    {/if}
  </div>

  <FeedbackNote
    tone={note?.tone ?? 'info'}
    text={note?.text ?? 'Em chạm vào một chữ số. Bấm "Tách lớp" để thấy hai lớp.'}
  />
</div>
