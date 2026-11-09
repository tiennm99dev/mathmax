<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { SIGNS, SIGN_WORDS, compareSign } from '#lib/core/kid/numbers.js';
  import { PAIRS, deepestLevel, lineText, signVerdict, windowAt } from './engine.js';

  const COLORS = { a: '#2563eb', b: '#ea580c' };

  let round = $state(0);
  let level = $state(0);
  let verdict = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));
  /** @type {string[]} */
  let tried = $state([]);

  const pair = $derived(PAIRS[round % PAIRS.length]);
  const a = $derived(pair[0]);
  const b = $derived(pair[1]);
  const deepest = $derived(deepestLevel(a, b));
  const view = $derived(windowAt(level, Math.min(a, b)));
  const solved = $derived(verdict?.ok === true);
  const rightSign = $derived(compareSign(a, b));

  /** @param {'>' | '<' | '='} sign */
  function choose(sign) {
    if (solved) return;
    verdict = signVerdict(a, b, sign);
    if (!verdict.ok) tried = [...tried, sign];
  }

  function next() {
    round += 1;
    level = 0;
    verdict = null;
    tried = [];
  }
</script>

<div class="space-y-4">
  <div class="flex items-center justify-center gap-3 text-3xl font-bold tabular-nums">
    <span class="rounded-xl bg-blue-50 px-3 py-2" style:color={COLORS.a}>{fmt(a)}</span>
    <span
      class="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-dashed border-slate-400 text-slate-800"
      ><span aria-hidden="true">{solved ? rightSign : '?'}</span><span class="sr-only"
        >{solved ? `dấu ${SIGN_WORDS[rightSign]}` : 'dấu cần điền'}</span
      ></span
    >
    <span class="rounded-xl bg-orange-50 px-3 py-2" style:color={COLORS.b}>{fmt(b)}</span>
  </div>

  <NumberLine
    min={view.lo}
    max={view.hi}
    step={view.step}
    labelEvery={2}
    interactive={false}
    width={380}
    format={fmt}
    marks={a === b
      ? [{ value: a, label: fmt(a), color: '#059669' }]
      : [
          { value: a, label: 'A', color: COLORS.a },
          { value: b, label: 'B', color: COLORS.b },
        ]}
    label="Tia số từ {fmt(view.lo)} đến {fmt(view.hi)}, điểm A là {fmt(a)}, điểm B là {fmt(b)}"
  />

  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-base {button.quiet}"
      disabled={level === 0}
      onclick={() => (level -= 1)}>Thu nhỏ</button
    >
    <button
      type="button"
      class="min-h-12 text-base {button.secondary}"
      disabled={level >= deepest}
      onclick={() => (level += 1)}>Phóng to</button
    >
  </div>

  <FeedbackNote tone="info" text={lineText(level, a, b)} />

  <div class="flex justify-center gap-3" role="group" aria-label="Chọn dấu">
    {#each SIGNS as sign (sign)}
      <button
        type="button"
        class="min-h-14 min-w-14 text-3xl {button.quiet} px-0"
        aria-label="Dấu {SIGN_WORDS[sign]}"
        disabled={solved || tried.includes(sign)}
        onclick={() => choose(sign)}>{sign}</button
      >
    {/each}
  </div>

  {#if verdict}
    <FeedbackNote tone={verdict.ok ? 'ok' : 'warn'} text={verdict.text} />
  {/if}

  {#if solved}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Cặp số khác
      </button>
    </div>
  {/if}
</div>
