<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import PictureGroups from '../_shared/picture-groups.svelte';
  import {
    FACTS,
    PART_NAMES,
    TASKS,
    askOrder,
    askText,
    cardsOf,
    judge,
    multiplicationText,
    namedText,
    placeCard,
    tapResult,
  } from './engine.js';

  /** @typedef {import('./engine.js').Part} Part */
  /** @typedef {import('./engine.js').Slots} Slots */

  let mode = $state(/** @type {'name' | 'build'} */ ('name'));

  let taskIndex = $state(0);
  /** @type {Part[]} */
  let named = $state([]);
  let tapNote = $state('');

  const task = $derived(TASKS[taskIndex % TASKS.length]);
  const order = $derived(askOrder(taskIndex));
  const asked = $derived(order[named.length] ?? null);
  const allNamed = $derived(asked === null);
  const nameMessage = $derived(
    allNamed ? namedText(task) : `${tapNote ? `${tapNote} ` : ''}${askText(asked)}`,
  );

  /** @param {Part} part */
  function tap(part) {
    if (asked === null || named.includes(part)) return;
    const result = tapResult(asked, part);
    tapNote = result.text;
    if (result.right) named = [...named, part];
  }

  function nextTask() {
    taskIndex += 1;
    named = [];
    tapNote = '';
  }

  let factIndex = $state(0);
  /** @type {Slots} */
  let slots = $state([null, null, null]);
  /** @type {number[]} */
  let found = $state([]);
  let buildNote = $state('Em chạm vào các thẻ số để ghép phép chia.');

  const fact = $derived(FACTS[factIndex % FACTS.length]);
  const cards = $derived(cardsOf(fact));
  const product = $derived(fact.a * fact.b);
  const allFound = $derived(found.length === 2);
  const NAMES_IN_SENTENCE = /** @type {const} */ (['dividend', 'divisor', 'quotient']);

  /** @param {number} card */
  function place(card) {
    if (allFound) return;
    const next = placeCard(slots, card);
    const verdict = judge(fact, next, found);
    buildNote = verdict.text;
    if (verdict.kind === 'new') found = [...found, next[1] ?? 0];
    slots = verdict.kind === 'wait' ? next : [null, null, null];
  }

  /** @param {number} slot */
  function takeBack(slot) {
    const next = /** @type {Slots} */ ([...slots]);
    next[slot] = null;
    slots = next;
  }

  function nextFact() {
    factIndex += 1;
    slots = [null, null, null];
    found = [];
    buildNote = 'Em chạm vào các thẻ số để ghép phép chia.';
  }

  const big = 'min-h-12 text-lg';
</script>

{#snippet numberButton(/** @type {Part} */ part, /** @type {number} */ value)}
  <div class="flex w-20 flex-col items-center gap-1">
    <button
      type="button"
      class="min-h-16 w-full rounded-2xl border-4 text-4xl font-bold tabular-nums {named.includes(
        part,
      )
        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
        : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'} {focusRing}"
      aria-label="Số {value}{named.includes(part) ? `, là ${PART_NAMES[part].toLowerCase()}` : ''}"
      onclick={() => tap(part)}
    >
      {value}
    </button>
    <span class="min-h-12 text-center text-base leading-tight font-semibold text-emerald-800">
      {named.includes(part) ? PART_NAMES[part] : ''}
    </span>
  </div>
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'name', label: 'Gọi tên' },
      { value: 'build', label: 'Ghép phép chia' },
    ]}
  />

  {#if mode === 'name'}
    <PictureGroups each={task.quotient} groups={task.divisor} />

    <div class="flex items-start justify-center gap-1">
      {@render numberButton('dividend', task.dividend)}
      <span class="flex min-h-16 items-center text-3xl font-bold text-slate-600" aria-hidden="true"
        >:</span
      >
      {@render numberButton('divisor', task.divisor)}
      <span class="flex min-h-16 items-center text-3xl font-bold text-slate-600" aria-hidden="true"
        >=</span
      >
      {@render numberButton('quotient', task.quotient)}
    </div>

    {#if allNamed}
      <p class="text-center text-3xl font-bold text-emerald-700 tabular-nums">
        {multiplicationText(task)}
      </p>
    {/if}

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {allNamed
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if allNamed}<span aria-hidden="true">⭐ </span>{/if}{nameMessage}
    </p>

    <button type="button" class="{big} {button.secondary}" onclick={nextTask}>Phép chia khác</button
    >
  {:else}
    <p class="text-center text-3xl font-bold text-slate-800 tabular-nums">
      {fact.a} × {fact.b} = {product}
    </p>

    <div class="flex items-start justify-center gap-1">
      {#each slots as value, s (s)}
        <div class="flex w-20 flex-col items-center gap-1">
          <button
            type="button"
            class="min-h-16 w-full rounded-2xl border-4 border-dashed text-4xl font-bold tabular-nums {value ===
            null
              ? 'border-slate-300 bg-slate-50 text-slate-400'
              : 'border-indigo-400 bg-indigo-50 text-indigo-900'} {focusRing}"
            aria-label="{PART_NAMES[NAMES_IN_SENTENCE[s]]}: {value === null
              ? 'còn trống'
              : `số ${value}, chạm để lấy lại`}"
            onclick={() => takeBack(s)}
          >
            {value ?? '?'}
          </button>
          <span class="text-center text-base leading-tight font-semibold text-slate-700">
            {PART_NAMES[NAMES_IN_SENTENCE[s]]}
          </span>
        </div>
        {#if s < 2}
          <span
            class="flex min-h-16 items-center text-3xl font-bold text-slate-600"
            aria-hidden="true">{s === 0 ? ':' : '='}</span
          >
        {/if}
      {/each}
    </div>

    <div class="flex justify-center gap-3" role="group" aria-label="Thẻ số">
      {#each cards as card (card)}
        <button
          type="button"
          class="min-h-16 min-w-16 rounded-2xl border-4 px-3 text-3xl font-bold tabular-nums {slots.includes(
            card,
          )
            ? 'border-slate-200 bg-slate-100 text-slate-400'
            : 'border-amber-400 bg-amber-50 text-amber-900 hover:border-amber-600'} {focusRing}"
          aria-label="Thẻ số {card}"
          aria-disabled={slots.includes(card) || allFound}
          onclick={() => place(card)}
        >
          {card}
        </button>
      {/each}
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {allFound
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if allFound}<span aria-hidden="true">⭐ </span>{/if}{buildNote}
    </p>

    {#if found.length > 0}
      <table class="w-full table-fixed text-center text-lg">
        <caption class="pb-1 font-semibold text-slate-700">Các phép chia em đã ghép</caption>
        <thead>
          <tr class="bg-slate-100 text-base">
            <th scope="col" class="p-2">Số bị chia</th>
            <th scope="col" class="p-2">Số chia</th>
            <th scope="col" class="p-2">Thương</th>
          </tr>
        </thead>
        <tbody>
          {#each found as divisor (divisor)}
            <tr class="border-t border-slate-200 text-xl font-bold tabular-nums">
              <td class="p-2">{product}</td>
              <td class="p-2">{divisor}</td>
              <td class="p-2">{product / divisor}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}

    <button type="button" class="{big} {button.secondary}" onclick={nextFact}>Phép nhân khác</button
    >
  {/if}
</div>
