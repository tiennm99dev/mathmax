<script>
  import { rng } from '#lib/core/drill.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { askName, judgeTap, makeCalc, nameOf, partText } from './engine.js';

  /** @typedef {import('./engine.js').Part} Part */

  // A fixed seed so the prerendered page and the browser agree.
  const rand = rng(5);

  let op = $state(/** @type {'+' | '-'} */ ('+'));
  /** `look`: tap to see the names. `game`: tap the part that is asked for. */
  let mode = $state(/** @type {'look' | 'game'} */ ('look'));
  let calc = $state({ a: 32, b: 15, c: 47, op: /** @type {'+' | '-'} */ ('+') });
  /** @type {Part[]} */
  let shownParts = $state([]);
  let asked = $state('Tổng');
  /** @type {{ ok: boolean, text: string } | null} */
  let verdict = $state(null);
  /** @type {Part | null} */
  let tapped = $state(null);

  const COLORS = {
    'Số hạng': 'bg-sky-100 text-sky-900 border-sky-400',
    Tổng: 'bg-emerald-100 text-emerald-900 border-emerald-500',
    'Số bị trừ': 'bg-violet-100 text-violet-900 border-violet-400',
    'Số trừ': 'bg-orange-100 text-orange-900 border-orange-400',
    Hiệu: 'bg-emerald-100 text-emerald-900 border-emerald-500',
  };

  /** @param {string} name */
  const colorOf = (name) => COLORS[/** @type {keyof typeof COLORS} */ (name)];

  function newCalc() {
    calc = makeCalc(rand, op);
    shownParts = [];
    verdict = null;
    tapped = null;
    asked = askName(rand, op, asked);
  }

  /** @param {Part} part */
  function tap(part) {
    if (mode === 'look') {
      shownParts = shownParts.includes(part)
        ? shownParts.filter((p) => p !== part)
        : [...shownParts, part];
      verdict = { ok: true, text: `${partText(calc, part)} là ${nameOf(op, part).toLowerCase()}.` };
      return;
    }
    if (verdict?.ok) return;
    tapped = part;
    verdict = judgeTap(calc, asked, part);
  }

  /** @param {Part} part */
  function tileClass(part) {
    const name = nameOf(op, part);
    const lit =
      (mode === 'look' && shownParts.includes(part)) ||
      (mode === 'game' && verdict?.ok && nameOf(op, part) === asked);
    const wrong = mode === 'game' && tapped === part && verdict && !verdict.ok;
    const base = `rounded-2xl border-4 font-bold tabular-nums transition ${focusRing}`;
    if (wrong) return `${base} border-rose-400 bg-rose-50 text-rose-800`;
    if (lit) return `${base} ${colorOf(name)}`;
    return `${base} border-slate-300 bg-white text-slate-800 hover:border-indigo-400`;
  }

  /** @param {Part} part */
  const labelShown = (part) =>
    (mode === 'look' && shownParts.includes(part)) ||
    (mode === 'game' && verdict?.ok === true && nameOf(op, part) === asked);

  const sign = $derived(op === '+' ? '+' : '−');
  const prompt = $derived(
    mode === 'look'
      ? 'Chạm vào từng số để xem tên gọi của nó.'
      : `Chạm vào ${asked.toLowerCase()}.${asked === 'Số hạng' ? ' (Có hai số hạng, chạm một số là được.)' : ''}`,
  );
</script>

{#snippet tile(/** @type {Part} */ part)}
  <div class="flex flex-col items-center gap-1">
    <button
      type="button"
      class="h-16 min-w-16 px-2 text-3xl {tileClass(part)}"
      aria-label="{partText(calc, part)}{labelShown(part)
        ? `, ${nameOf(op, part).toLowerCase()}`
        : ''}"
      onclick={() => tap(part)}>{partText(calc, part)}</button
    >
    <span class="min-h-7 text-base font-semibold text-slate-700" aria-hidden="true"
      >{labelShown(part) ? nameOf(op, part) : ''}</span
    >
  </div>
{/snippet}

<div class="space-y-4">
  <div class="flex flex-wrap gap-3">
    <SegmentedControl
      label="Phép tính"
      hideLabel
      bind:value={op}
      options={[
        { value: '+', label: 'Phép cộng' },
        { value: '-', label: 'Phép trừ' },
      ]}
      onchange={newCalc}
    />
    <SegmentedControl
      label="Cách chơi"
      hideLabel
      bind:value={mode}
      options={[
        { value: 'look', label: 'Xem tên gọi' },
        { value: 'game', label: 'Đố em' },
      ]}
      onchange={() => {
        verdict = null;
        tapped = null;
        shownParts = [];
      }}
    />
  </div>

  <p class="rounded-2xl bg-indigo-50 px-4 py-3 text-xl font-semibold text-indigo-900">{prompt}</p>

  <div class="overflow-x-auto pb-1">
    <div class="flex min-w-max items-start justify-center gap-1.5 rounded-2xl bg-amber-50 p-2">
      {@render tile('a')}
      <span class="flex h-16 items-center text-3xl font-bold text-slate-600" aria-hidden="true"
        >{sign}</span
      >
      {@render tile('b')}
      <span class="flex h-16 items-center text-3xl font-bold text-slate-600" aria-hidden="true"
        >=</span
      >
      {@render tile('c')}
    </div>
  </div>

  <div class="flex flex-col items-center gap-1">
    <span class="text-base text-slate-600">Cả phép tính bên trái dấu =</span>
    <button
      type="button"
      class="min-h-14 px-5 text-3xl {tileClass('expr')}"
      aria-label="{partText(calc, 'expr')}{labelShown('expr')
        ? `, ${nameOf(op, 'expr').toLowerCase()}`
        : ''}"
      onclick={() => tap('expr')}>{partText(calc, 'expr')}</button
    >
    <span class="min-h-7 text-base font-semibold text-slate-700" aria-hidden="true"
      >{labelShown('expr') ? nameOf(op, 'expr') : ''}</span
    >
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {verdict === null
      ? 'bg-slate-100 text-slate-800'
      : verdict.ok
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-amber-100 text-amber-900'}"
    aria-live="polite"
  >
    {#if verdict?.ok && mode === 'game'}<span aria-hidden="true">⭐ </span>{/if}{verdict?.text ??
      'Em chưa chạm số nào.'}
  </p>

  <div class="flex flex-wrap gap-3">
    {#if mode === 'look'}
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        onclick={() => (shownParts = ['a', 'b', 'c', 'expr'])}>Hiện tất cả tên</button
      >
    {/if}
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newCalc}>
      {mode === 'game' ? 'Câu khác' : 'Phép tính khác'}
    </button>
  </div>
</div>
