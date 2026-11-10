<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import Banknote from '../_shared/banknote.svelte';
  import { NOTES, NOTE_WORDS, moneyText, sumNotes } from '../_shared/money.js';
  import QuizVisual from '../_shared/quiz-visual.svelte';
  import {
    GOODS,
    KIND_LABELS,
    MAX_NOTES,
    buildRound,
    changeChoices,
    changeWork,
    payAdvice,
  } from './engine.js';

  let mode = $state(/** @type {'shop' | 'quiz'} */ ('shop'));

  let chosen = $state(3);
  const good = $derived(GOODS[chosen]);
  /** @type {import('../_shared/money.js').Note[]} */
  let given = $state([]);
  let phase = $state(/** @type {'pay' | 'change' | 'done'} */ ('pay'));
  let changeNote = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));

  const paid = $derived(sumNotes(given));
  const advice = $derived(payAdvice(given, good.price));
  const choices = $derived(changeChoices(paid, good.price));

  /** @param {number} i */
  function choose(i) {
    chosen = i;
    given = [];
    phase = 'pay';
    changeNote = null;
  }

  /** @param {import('../_shared/money.js').Note} note */
  function add(note) {
    if (phase !== 'pay' || given.length >= MAX_NOTES) return;
    given = [...given, note];
  }

  /** @param {number} i */
  function takeBack(i) {
    if (phase !== 'pay') return;
    given = given.filter((_, j) => j !== i);
  }

  function pay() {
    if (!advice.enough) return;
    if (paid === good.price) {
      phase = 'done';
      changeNote = { ok: true, text: 'Em đưa vừa đủ tiền, cô bán hàng không phải trả lại.' };
      return;
    }
    phase = 'change';
    changeNote = null;
  }

  /** @param {number} i */
  function pickChange(i) {
    if (phase !== 'change') return;
    if (i === choices.answer) {
      phase = 'done';
      changeNote = { ok: true, text: `Đúng rồi! ${changeWork(paid, good.price)}` };
    } else {
      changeNote = {
        ok: false,
        text: 'Chưa đúng. Tiền trả lại bằng tiền em đã đưa trừ đi giá tiền.',
      };
    }
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'shop', label: 'Siêu thị ảo' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'shop'}
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Chọn món hàng">
      {#each GOODS as g, i (g.name)}
        <button
          type="button"
          aria-pressed={i === chosen}
          class="flex min-h-16 items-center gap-2 rounded-2xl border-4 px-2 py-1 text-left font-semibold {focusRing} {i ===
          chosen
            ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
            : 'border-slate-300 bg-white text-slate-800'}"
          onclick={() => choose(i)}
        >
          <Picture name={g.picture} size={36} decorative />
          <span class="leading-tight">{g.name}<br />{moneyText(g.price)}</span>
        </button>
      {/each}
    </div>

    <p class="text-center text-2xl font-bold text-balance text-slate-800">
      Em mua {good.name.toLowerCase()} giá {moneyText(good.price)}
    </p>

    <section
      aria-label="Tiền em đưa"
      class="rounded-2xl border-2 border-dashed border-slate-300 p-2"
    >
      <p class="mb-2 text-lg font-semibold text-slate-700">
        Tiền em đưa: {moneyText(paid)}
      </p>
      {#if given.length === 0}
        <p class="text-slate-500">Chưa có tờ tiền nào.</p>
      {:else}
        <div class="flex flex-wrap gap-2">
          {#each given as note, i (i)}
            <button
              type="button"
              class="rounded-lg {focusRing}"
              aria-label="Cất lại tờ {NOTE_WORDS[note]}"
              disabled={phase !== 'pay'}
              onclick={() => takeBack(i)}
            >
              <Banknote value={note} small decorative />
            </button>
          {/each}
        </div>
      {/if}
    </section>

    {#if phase === 'pay'}
      <div class="flex flex-wrap justify-center gap-2" role="group" aria-label="Ví tiền của em">
        {#each NOTES as note (note)}
          <button
            type="button"
            class="rounded-lg {focusRing}"
            aria-label="Đưa tờ {NOTE_WORDS[note]}"
            onclick={() => add(note)}
          >
            <Banknote value={note} small decorative />
          </button>
        {/each}
      </div>
      <FeedbackNote tone={advice.enough ? 'ok' : 'info'} text={advice.text} />
      <div class="flex justify-center">
        <button
          type="button"
          class="min-h-12 text-lg {button.primary}"
          disabled={!advice.enough}
          onclick={pay}>Trả tiền</button
        >
      </div>
    {:else}
      {#if phase === 'change' || paid > good.price}
        <p class="text-xl font-semibold text-slate-800">
          Em đưa {moneyText(paid)}. Cô bán hàng trả lại em bao nhiêu tiền?
        </p>
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-3" role="group" aria-label="Tiền trả lại">
          {#each choices.options as value, i (value)}
            <button
              type="button"
              class="min-h-12 rounded-xl border-2 px-3 text-lg font-bold {focusRing} {phase ===
                'done' && i === choices.answer
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                : 'border-slate-300 bg-white text-slate-800'}"
              disabled={phase === 'done'}
              onclick={() => pickChange(i)}>{moneyText(value)}</button
            >
          {/each}
        </div>
      {/if}
      {#if changeNote}
        <FeedbackNote tone={changeNote.ok ? 'ok' : 'warn'} text={changeNote.text} />
      {/if}
      {#if phase === 'done'}
        <div class="flex justify-center">
          <button
            type="button"
            class="min-h-12 text-lg {button.secondary}"
            onclick={() => choose((chosen + 1) % GOODS.length)}>Mua món khác</button
          >
        </div>
      {/if}
    {/if}
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em đọc tiền, đếm tiền và tính tiền trả lại rất giỏi."
    >
      {#snippet visual(q)}
        <QuizVisual visual={q.visual} />
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
