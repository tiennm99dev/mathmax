<script>
  import { tick } from 'svelte';
  import { rng } from '#lib/core/drill.js';
  import { capitalize } from '#lib/core/kid/quiz.js';
  import { readNumber } from '#lib/core/kid/numbers.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import Cup from '#lib/core/kid/cup.svelte';
  import Vessel from '#lib/core/kid/vessel.svelte';
  import {
    CUPS,
    compareCapacity,
    holdsSentence,
    litres,
    newVesselPair,
    newVesselTask,
    pourMessage,
    vessel,
  } from '#lib/core/kid/capacity.js';
  import { litreOptions, moreOptions, vesselLabel } from './engine.js';

  // Fixed seeds so the prerendered page and the browser agree.
  const taskRand = rng(16);
  const pairRand = rng(61);

  let mode = $state(/** @type {'measure' | 'compare'} */ ('measure'));

  // Pouring one container into mugs.
  /** @type {ReturnType<typeof newVesselTask>} */
  let task = $state({ id: 'can', l: 5 });
  let poured = $state(0);
  let options = $state(litreOptions(rng(16), 5));

  // Comparing two containers.
  /** @type {ReturnType<typeof newVesselPair>} */
  let pair = $state([
    { id: 'jar', l: 3 },
    { id: 'bucket', l: 6 },
  ]);
  /** @type {[boolean, boolean]} */
  let emptied = $state([false, false]);

  /** @type {number[]} */
  let wrong = $state([]);
  let settled = $state(false);

  /** @type {HTMLElement | undefined} */
  let answersEl = $state();
  /** @type {HTMLElement | undefined} */
  let pairEl = $state();

  const name = $derived(vessel(task.id).name);
  const names = $derived(pair.map((p) => vessel(p.id).name));
  const choice = $derived(mode === 'measure' ? options : moreOptions(pair));
  const asking = $derived(mode === 'measure' ? poured === task.l : emptied[0] && emptied[1]);

  const message = $derived.by(() => {
    if (mode === 'measure') {
      if (!asking) return pourMessage(name, task.l, poured);
      if (settled) {
        const s = holdsSentence(name, task.l);
        return wrong.length > 1 ? `Em xem nhé: ${s}` : `Đúng rồi! ${s}`;
      }
      if (wrong.length > 0) return 'Chưa đúng. Em đếm lại từng ca đầy nước nhé.';
      return pourMessage(name, task.l, poured);
    }
    if (!asking) {
      return 'Em chạm "Rót ra ca" ở cả hai đồ vật, rồi so sánh số ca đầy nước.';
    }
    const s = compareCapacity({ name: names[0], l: pair[0].l }, { name: names[1], l: pair[1].l });
    if (settled) return wrong.length > 1 ? `Em xem nhé: ${s}` : `Đúng rồi! ${s}`;
    if (wrong.length > 0)
      return 'Chưa đúng. Đồ vật nào rót ra được nhiều ca hơn thì chứa nhiều nước hơn.';
    return 'Đồ vật nào chứa được nhiều nước hơn?';
  });

  async function pourOne() {
    if (poured >= task.l) return;
    poured += 1;
    if (poured === task.l) {
      await tick();
      answersEl?.querySelector('button')?.focus();
    }
  }

  /**
   * Pours a container out into mugs. Its button goes away, so keyboard focus
   * moves to the other container's button, or to the answers once both are
   * poured.
   * @param {0 | 1} i
   */
  async function pourAll(i) {
    emptied[i] = true;
    await tick();
    /** @type {HTMLElement | null | undefined} */ (
      emptied[0] && emptied[1]
        ? answersEl?.querySelector('button')
        : pairEl?.querySelector('[data-pour]')
    )?.focus();
  }

  /** @param {number} i */
  function pick(i) {
    if (settled || wrong.includes(i)) return;
    if (i === choice.answer) settled = true;
    else {
      wrong = [...wrong, i];
      if (wrong.length > 1) settled = true;
    }
  }

  function reset() {
    wrong = [];
    settled = false;
  }

  function nextThing() {
    if (mode === 'measure') {
      task = newVesselTask(taskRand, task.id);
      options = litreOptions(taskRand, task.l);
      poured = 0;
    } else {
      pair = newVesselPair(pairRand);
      emptied = [false, false];
    }
    reset();
  }

  function again() {
    if (mode === 'measure') poured = 0;
    else emptied = [false, false];
    reset();
  }

  const answerBtn = `min-h-14 rounded-2xl border-4 px-4 text-xl font-bold transition motion-reduce:transition-none ${focusRing}`;
</script>

{#snippet cups(
  /** @type {number} */ count,
  /** @type {number} */ full,
  /** @type {string} */ label,
)}
  <div class="flex flex-wrap gap-1" role="img" aria-label={label}>
    {#each { length: count } as _, i (i)}
      <Cup full={i < full} size={34} />
    {/each}
  </div>
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Trò chơi"
    hideLabel
    options={[
      { value: 'measure', label: 'Rót ra ca 1 l' },
      { value: 'compare', label: 'Nhiều hơn, ít hơn' },
    ]}
    bind:value={mode}
    onchange={reset}
  />

  {#if mode === 'measure'}
    <div class="flex flex-wrap items-end gap-4 rounded-2xl bg-sky-50 p-3">
      <Vessel
        id={task.id}
        fill={(task.l - poured) / task.l}
        label={vesselLabel(name, poured === task.l)}
        caption={capitalize(name)}
        size={110}
      />
      <div class="min-w-0 flex-1 space-y-2">
        <p class="text-lg font-semibold text-slate-700">Các ca 1 l</p>
        {@render cups(CUPS, poured, `${poured} ca đầy nước, ${CUPS - poured} ca chưa có nước`)}
      </div>
    </div>
    <button
      type="button"
      class="min-h-14 rounded-2xl px-5 text-xl {button.primary}"
      disabled={poured >= task.l}
      onclick={pourOne}>Rót 1 l</button
    >
  {:else}
    <div bind:this={pairEl} class="space-y-3">
      {#each pair as p, i (i)}
        <div class="flex flex-wrap items-center gap-3 rounded-2xl bg-sky-50 p-3">
          <Vessel
            id={p.id}
            fill={emptied[i] ? 0 : 1}
            label={vesselLabel(names[i], emptied[i])}
            caption={capitalize(names[i])}
            size={80}
          />
          <div class="min-w-0 flex-1 space-y-2">
            {#if emptied[i]}
              {@render cups(p.l, p.l, `${p.l} ca đầy nước`)}
            {:else}
              <button
                type="button"
                data-pour
                class="min-h-12 text-lg {button.secondary}"
                onclick={() => pourAll(/** @type {0 | 1} */ (i))}>Rót {names[i]} ra ca</button
              >
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}

  {#if asking}
    <div
      bind:this={answersEl}
      role="group"
      aria-label="Chọn câu trả lời"
      class="flex flex-wrap gap-3"
    >
      {#each choice.options as text, i (text)}
        <button
          type="button"
          class="{answerBtn} {settled && i === choice.answer
            ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
            : wrong.includes(i)
              ? 'border-rose-400 bg-rose-50 text-rose-700 line-through'
              : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-disabled={settled || wrong.includes(i)}
          onclick={() => pick(i)}>{text}</button
        >
      {/each}
    </div>
  {/if}

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {settled
      ? 'bg-emerald-100 text-emerald-900'
      : wrong.length > 0
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if settled && wrong.length < 2}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  {#if mode === 'measure' && settled}
    <p class="text-lg text-slate-700">
      Em viết: <strong>{litres(task.l)}</strong>, đọc là "{readNumber(task.l)} lít".
    </p>
  {/if}

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {settled ? button.primary : button.secondary}"
      onclick={nextThing}>Đồ vật khác</button
    >
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={again}>Làm lại</button>
  </div>
</div>
