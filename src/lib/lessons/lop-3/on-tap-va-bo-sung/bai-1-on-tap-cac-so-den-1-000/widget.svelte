<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import { SIGNS, SIGN_WORDS, compareSign } from '#lib/core/kid/numbers.js';
  import { optionText } from '#lib/core/kid/quiz.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { compareWhy, decidingPlace, placesOf, readTo1000, valueOf } from '../_shared/place.js';
  import { SKILLS, buildMessage, nextPair, nextTarget } from './engine.js';
  import PlaceChart from './place-chart.svelte';
  import Visual from './visual.svelte';

  let mode = $state(/** @type {'build' | 'compare' | 'quiz'} */ ('build'));

  let target = $state(205);
  let built = $state({ hundreds: 1, tens: 0, ones: 0 });
  const buildNote = $derived(buildMessage(valueOf(built), target));

  let first = $state(placesOf(505));
  let second = $state(placesOf(550));
  /** @type {import('#lib/core/kid/numbers.js').Sign | null} */
  let picked = $state(null);
  const a = $derived(valueOf(first));
  const b = $derived(valueOf(second));
  const rightSign = $derived(compareSign(a, b));
  const comparedRight = $derived(picked === rightSign);
  const compareNote = $derived.by(() => {
    if (picked === null) return `Em so sánh ${a} và ${b}, rồi chạm vào dấu đúng.`;
    if (comparedRight) return `Đúng rồi! ${compareWhy(a, b)}`;
    return `Chưa đúng. ${a} và ${b}: em so sánh hàng trăm trước, rồi hàng chục, rồi hàng đơn vị.`;
  });

  function newTarget() {
    target = nextTarget(Math.random, target);
    built = { hundreds: 0, tens: 0, ones: 0 };
  }

  function newPair() {
    const [x, y] = nextPair(Math.random);
    first = placesOf(x);
    second = placesOf(y);
    picked = null;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'build', label: 'Dựng số' },
      { value: 'compare', label: 'So sánh' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'build'}
    <p class="text-center text-xl font-semibold text-slate-800">
      Dựng số: <span class="text-indigo-700">{readTo1000(target)}</span>
    </p>
    <PlaceChart counts={built} name="Bảng số" onchange={(c) => (built = c)} />
    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {buildNote.solved
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if buildNote.solved}<span aria-hidden="true">⭐ </span>{/if}{buildNote.text}
    </p>
    <button
      type="button"
      class="min-h-12 text-lg {buildNote.solved ? button.primary : button.secondary}"
      onclick={newTarget}>Số khác</button
    >
  {:else if mode === 'compare'}
    <PlaceChart
      counts={first}
      name="Số thứ nhất"
      mark={comparedRight ? decidingPlace(a, b) : null}
      onchange={(c) => {
        first = c;
        picked = null;
      }}
    />

    <div class="flex items-center justify-center gap-2" role="group" aria-label="Chọn dấu so sánh">
      <span class="text-3xl font-bold tabular-nums text-slate-800">{a}</span>
      {#each SIGNS as sign (sign)}
        <button
          type="button"
          class="h-14 w-14 rounded-2xl border-4 text-3xl font-bold {focusRing} {picked === sign
            ? sign === rightSign
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-rose-500 bg-rose-50 text-rose-700'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-label="Dấu {SIGN_WORDS[sign]}"
          aria-pressed={picked === sign}
          onclick={() => (picked = sign)}>{sign}</button
        >
      {/each}
      <span class="text-3xl font-bold tabular-nums text-slate-800">{b}</span>
    </div>

    <PlaceChart
      counts={second}
      name="Số thứ hai"
      mark={comparedRight ? decidingPlace(a, b) : null}
      onchange={(c) => {
        second = c;
        picked = null;
      }}
    />

    <FeedbackNote
      tone={picked === null ? 'info' : comparedRight ? 'ok' : 'warn'}
      text={compareNote}
    />
    <button
      type="button"
      class="min-h-12 text-lg {comparedRight ? button.primary : button.secondary}"
      onclick={newPair}>Hai số khác</button
    >
  {:else}
    <AdaptiveQuiz
      skills={SKILLS}
      length={12}
      allGood="Tuyệt vời! Em đã nắm chắc các số đến 1 000."
      listOptions={(q) => q.options.some((o) => optionText(o).length > 16)}
    >
      {#snippet visual(q, settled)}
        {#if q.visual}<Visual visual={q.visual} {settled} />{/if}
      {/snippet}
    </AdaptiveQuiz>
  {/if}
</div>
