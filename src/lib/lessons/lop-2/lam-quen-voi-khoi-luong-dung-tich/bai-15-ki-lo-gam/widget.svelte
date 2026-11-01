<script>
  import { tick } from 'svelte';
  import { rng } from '#lib/core/drill.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import BalanceScale from '../_shared/balance-scale.svelte';
  import {
    MAX_WEIGHTS,
    WEIGHTS,
    compareSentence,
    massThing,
    newPair,
    newWeighTask,
    sortedWeights,
    weighMessage,
  } from '../_shared/mass.js';
  import { compareOptions, scaleLabel } from './engine.js';

  // Fixed seeds so the prerendered page and the browser agree.
  const pairRand = rng(15);
  const taskRand = rng(51);

  let mode = $state(/** @type {'compare' | 'weigh'} */ ('weigh'));

  // Comparing two things.
  /** @type {ReturnType<typeof newPair>} */
  let pair = $state([
    { id: 'melon', kg: 3 },
    { id: 'pomelo', kg: 1 },
  ]);
  /** @type {number[]} */
  let wrong = $state([]);
  let picked = $state(false);

  // Weighing one thing with weights.
  /** @type {ReturnType<typeof newWeighTask>} */
  let task = $state({ id: 'melon', kg: 3 });
  /** @type {number[]} */
  let weights = $state([]);

  /** @type {HTMLElement | undefined} */
  let panel = $state();
  /** @type {HTMLElement | undefined} */
  let nextEl = $state();

  const choice = $derived(compareOptions(pair));
  const names = $derived(pair.map((p) => massThing(p.id).name));
  const sum = $derived(weights.reduce((s, w) => s + w, 0));
  const level = $derived(sum === task.kg);
  const thingName = $derived(massThing(task.id).name);

  /** @type {import('../_shared/mass.js').Load[]} */
  const left = $derived(
    mode === 'compare'
      ? [{ kind: 'thing', ...pair[0] }]
      : [{ kind: 'thing', id: task.id, kg: task.kg }],
  );
  /** @type {import('../_shared/mass.js').Load[]} */
  const right = $derived(
    mode === 'compare'
      ? [{ kind: 'thing', ...pair[1] }]
      : sortedWeights(weights).map((kg) => ({ kind: 'weight', kg })),
  );

  const done = $derived(mode === 'compare' ? picked : level);

  const message = $derived.by(() => {
    if (mode === 'weigh') return weighMessage(thingName, task.kg, weights);
    const sentence = compareSentence(
      { name: names[0], kg: pair[0].kg },
      { name: names[1], kg: pair[1].kg },
    );
    if (picked) return wrong.length > 1 ? `Em xem nhé: ${sentence}` : `Đúng rồi! ${sentence}`;
    if (wrong.length > 0) return 'Chưa đúng. Đĩa nào thấp hơn thì vật trên đĩa đó nặng hơn.';
    return 'Em nhìn cân đĩa. Chạm vào câu đúng.';
  });

  /** @param {number} i */
  function pick(i) {
    if (picked || wrong.includes(i)) return;
    if (i === choice.answer) picked = true;
    else {
      wrong = [...wrong, i];
      if (wrong.length > 1) picked = true;
    }
  }

  /**
   * Puts a weight of `kg` on the pan. When that balances the scale or fills
   * the pan, the add buttons turn off, so keyboard focus moves on: to "Vật
   * khác" once level, else to the weights that can be taken off.
   * @param {number} kg
   */
  async function addWeight(kg) {
    if (level || weights.length >= MAX_WEIGHTS) return;
    weights = [...weights, kg];
    if (!level && weights.length < MAX_WEIGHTS) return;
    await tick();
    (level
      ? nextEl
      : /** @type {HTMLElement | null | undefined} */ (panel?.querySelector('[data-weight]'))
    )?.focus();
  }

  /**
   * Takes one weight of `kg` off the pan, then keeps keyboard focus on the
   * weights still there or on the add buttons.
   * @param {number} kg
   */
  async function removeWeight(kg) {
    const i = weights.lastIndexOf(kg);
    if (i < 0) return;
    weights = weights.filter((_, j) => j !== i);
    await tick();
    /** @type {HTMLElement | null | undefined} */ (
      panel?.querySelector('[data-weight]') ?? panel?.querySelector('[data-add]')
    )?.focus();
  }

  function nextThing() {
    if (mode === 'compare') {
      pair = newPair(pairRand);
      wrong = [];
      picked = false;
    } else {
      task = newWeighTask(taskRand, task.id);
      weights = [];
    }
  }

  const bigBtn = `min-h-14 rounded-2xl border-4 px-4 text-xl font-bold transition motion-reduce:transition-none ${focusRing}`;
  const onPan = $derived(sortedWeights(weights));
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Trò chơi"
    hideLabel
    options={[
      { value: 'weigh', label: 'Cân bằng quả cân' },
      { value: 'compare', label: 'Nặng hơn, nhẹ hơn' },
    ]}
    bind:value={mode}
  />

  <div class="rounded-2xl bg-sky-50 p-2">
    <BalanceScale {left} {right} label={scaleLabel(left, right)} />
  </div>

  <div bind:this={panel} class="space-y-3">
    {#if mode === 'compare'}
      <p class="text-lg text-slate-700">
        Đĩa bên trái: <strong>{names[0]}</strong>. Đĩa bên phải: <strong>{names[1]}</strong>.
      </p>
      <div role="group" aria-label="Chọn câu đúng" class="grid gap-2">
        {#each choice.options as text, i (text)}
          <button
            type="button"
            class="{bigBtn} text-left {picked && i === choice.answer
              ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
              : wrong.includes(i)
                ? 'border-rose-400 bg-rose-50 text-rose-700 line-through'
                : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
            aria-disabled={picked || wrong.includes(i)}
            onclick={() => pick(i)}>{text}</button
          >
        {/each}
      </div>
    {:else}
      <p class="text-lg text-slate-700">
        Đĩa bên trái: <strong>{thingName}</strong>. Đĩa bên phải: quả cân.
      </p>
      <div role="group" aria-label="Thêm quả cân" class="flex flex-wrap gap-3">
        {#each WEIGHTS as kg (kg)}
          <button
            type="button"
            data-add
            class="{bigBtn} border-slate-400 bg-slate-700 text-white hover:bg-slate-800 disabled:opacity-40"
            disabled={level || weights.length >= MAX_WEIGHTS}
            aria-label="Thêm quả cân {kg} ki-lô-gam"
            onclick={() => addWeight(kg)}>+ {kg} kg</button
          >
        {/each}
      </div>
      {#if onPan.length > 0}
        <div
          role="group"
          aria-label="Quả cân trên đĩa, chạm để bỏ bớt"
          class="flex flex-wrap gap-2"
        >
          {#each onPan as kg, i (i)}
            <button
              type="button"
              data-weight
              class="min-h-12 rounded-xl border-2 border-slate-300 bg-white px-3 text-lg font-semibold text-slate-700 hover:border-rose-400 {focusRing}"
              aria-label="Bỏ quả cân {kg} ki-lô-gam"
              onclick={() => removeWeight(kg)}>{kg} kg <span aria-hidden="true">✕</span></button
            >
          {/each}
        </div>
      {/if}
    {/if}
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {done
      ? 'bg-emerald-100 text-emerald-900'
      : mode === 'compare' && wrong.length > 0
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if done && !(mode === 'compare' && wrong.length > 1)}<span aria-hidden="true"
        >⭐
      </span>{/if}{message}
  </p>

  <button
    type="button"
    bind:this={nextEl}
    class="min-h-12 text-lg {done ? button.primary : button.secondary}"
    onclick={nextThing}>Vật khác</button
  >
</div>
