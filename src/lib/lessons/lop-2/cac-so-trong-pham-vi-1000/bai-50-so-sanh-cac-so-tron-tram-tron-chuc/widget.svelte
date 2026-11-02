<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { SIGNS, SIGN_WORDS, compareSign } from '#lib/core/kid/numbers.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import BlockPile from '../_shared/block-pile.svelte';
  import CountStepper from '../_shared/count-stepper.svelte';
  import { FIRST_PAIR, freshPair, signNote, valueOf } from './engine.js';

  /** @type {import('./engine.js').Mode} */
  let mode = $state('tram');
  /** @type {import('./engine.js').Pair} */
  let pair = $state(FIRST_PAIR.tram);
  /** @type {import('#lib/core/kid/numbers.js').Sign | null} */
  let picked = $state(null);

  const a = $derived(valueOf(pair.left));
  const b = $derived(valueOf(pair.right));
  const note = $derived(signNote(pair, picked));
  const solved = $derived(picked === compareSign(a, b));

  const SIDES = /** @type {const} */ (['left', 'right']);
  const SIDE_NAMES = { left: 'bên trái', right: 'bên phải' };

  /** @param {string | number} next */
  function switchMode(next) {
    mode = next === 'chuc' ? 'chuc' : 'tram';
    pair = FIRST_PAIR[mode];
    picked = null;
  }

  /**
   * @param {'left' | 'right'} side
   * @param {'hundreds' | 'tens'} place
   * @param {number} value
   */
  function setPlace(side, place, value) {
    pair = { ...pair, [side]: { ...pair[side], [place]: value } };
    picked = null;
  }

  function newPair() {
    pair = freshPair(mode, pair);
    picked = null;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Loại số"
    hideLabel
    options={[
      { value: 'tram', label: 'Số tròn trăm' },
      { value: 'chuc', label: 'Số tròn chục' },
    ]}
    value={mode}
    onchange={switchMode}
  />

  <div class="grid grid-cols-2 gap-2">
    {#each SIDES as side (side)}
      {@const number = valueOf(pair[side])}
      <section
        class="flex min-w-0 flex-col gap-2 rounded-2xl bg-sky-50 p-2"
        aria-label="Số {SIDE_NAMES[side]}: {number}"
      >
        <p class="text-center text-3xl font-bold text-slate-800 tabular-nums">{number}</p>
        <div class="flex min-h-36 items-center justify-center">
          <BlockPile hundreds={pair[side].hundreds} tens={pair[side].tens} />
        </div>
        <p class="text-center font-semibold text-slate-700">{pair[side].hundreds} trăm</p>
        <CountStepper
          name="trăm {SIDE_NAMES[side]}"
          value={pair[side].hundreds}
          min={1}
          onchange={(v) => setPlace(side, 'hundreds', v)}
        />
        {#if mode === 'chuc'}
          <p class="text-center font-semibold text-slate-700">{pair[side].tens} chục</p>
          <CountStepper
            name="chục {SIDE_NAMES[side]}"
            value={pair[side].tens}
            onchange={(v) => setPlace(side, 'tens', v)}
          />
        {/if}
      </section>
    {/each}
  </div>

  <div
    class="flex items-center justify-center gap-3 text-3xl font-bold text-slate-800 tabular-nums"
    aria-hidden="true"
  >
    <span>{a}</span>
    <span
      class="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-indigo-300 bg-white text-indigo-700"
      >{solved ? picked : '?'}</span
    >
    <span>{b}</span>
  </div>

  <div class="grid grid-cols-3 gap-2" role="group" aria-label="Chọn dấu giữa {a} và {b}">
    {#each SIGNS as sign (sign)}
      <button
        type="button"
        class="min-h-14 rounded-2xl border-2 text-3xl font-bold {picked === sign
          ? solved
            ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
            : 'border-amber-500 bg-amber-50 text-amber-900'
          : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'} {focusRing}"
        aria-label={SIGN_WORDS[sign]}
        aria-pressed={picked === sign}
        onclick={() => (picked = sign)}>{sign}</button
      >
    {/each}
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />

  <div class="flex justify-center">
    <button
      type="button"
      class="min-h-12 text-lg {solved ? button.primary : button.secondary}"
      onclick={newPair}>Cặp số khác</button
    >
  </div>
</div>
