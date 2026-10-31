<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { hopPath } from '#lib/core/visuals/svg-math.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import RulerBoard from '../_shared/ruler-board.svelte';
  import { spansToCover } from '../_shared/length.js';
  import { HANDS, TABLE, answerCards, makeTask, measureMessage, spanMessage } from './engine.js';

  /** `span`: measure with hand spans. `ruler`: measure in cm with a ruler. */
  let mode = $state(/** @type {'span' | 'ruler'} */ ('span'));

  // Hand spans.
  /** @type {import('./engine.js').Hand} */
  let hand = $state('child');
  let placed = $state(0);
  /** @type {Partial<Record<import('./engine.js').Hand, number>>} */
  let done = $state({});
  const SU = 26;
  const SX = 30;
  const SY = 92;
  const SW = SX * 2 + TABLE * SU;
  const span = $derived(HANDS[hand].span);
  const need = $derived(spansToCover(TABLE, span));
  const spanText = $derived(spanMessage(hand, placed, done));

  function placeSpan() {
    if (placed >= need) return;
    placed += 1;
    if (placed >= need) done = { ...done, [hand]: need };
  }

  /** @param {import('./engine.js').Hand} next */
  function switchHand(next) {
    hand = next;
    placed = 0;
  }

  function resetSpans() {
    placed = 0;
    done = {};
  }

  // Ruler.
  let seed = $state(1);
  let shift = $state(makeTask(1).shift);
  /** @type {number | null} */
  let picked = $state(null);
  const task = $derived(makeTask(seed));
  const cards = $derived(answerCards(task));
  const rulerText = $derived(measureMessage(task, shift, picked));
  const solved = $derived(rulerText.tone === 'ok');

  function nextTask() {
    seed += 1;
    shift = makeTask(seed).shift;
    picked = null;
  }

  /** @param {number} v */
  function choose(v) {
    if (!solved) picked = v;
  }

  /** @param {'ok' | 'warn' | 'info'} tone */
  const toneClass = (tone) =>
    tone === 'ok'
      ? 'bg-emerald-100 text-emerald-900'
      : tone === 'warn'
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800';

  /** @param {number} v */
  function cardClass(v) {
    const base = `h-16 min-w-16 rounded-2xl border-4 px-3 text-3xl font-bold tabular-nums transition ${focusRing}`;
    if (picked === v && solved) return `${base} border-emerald-600 bg-emerald-600 text-white`;
    if (picked === v && shift === 0) return `${base} border-rose-400 bg-rose-50 text-rose-700`;
    return `${base} border-slate-300 bg-white text-slate-800 hover:border-indigo-400`;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn cách đo"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'span', label: 'Đo bằng gang tay' },
      { value: 'ruler', label: 'Đo bằng thước (cm)' },
    ]}
  />

  {#if mode === 'span'}
    <SegmentedControl
      label="Gang tay của ai"
      hideLabel
      bind:value={hand}
      options={[
        { value: 'child', label: HANDS.child.label },
        { value: 'adult', label: HANDS.adult.label },
      ]}
      onchange={(v) => switchHand(/** @type {import('./engine.js').Hand} */ (v))}
    />

    <svg
      viewBox="0 0 {SW} 130"
      class="w-full max-w-xl rounded-2xl border border-slate-200 bg-white"
      role="img"
      aria-label="Mặt bàn, đã đặt {placed} gang tay {HANDS[hand].owner}"
    >
      <rect x={SX} y={SY} width={TABLE * SU} height="16" rx="3" fill="#a16207" />
      <rect x={SX + 10} y={SY + 16} width="10" height="22" fill="#854d0e" />
      <rect x={SX + TABLE * SU - 20} y={SY + 16} width="10" height="22" fill="#854d0e" />
      {#each { length: placed } as _, k (k)}
        {@const x0 = SX + k * span * SU}
        {@const x1 = Math.min(SX + (k + 1) * span * SU, SX + TABLE * SU + span * SU)}
        <path
          d={hopPath(x0, x1, SY, 26)}
          fill="none"
          stroke={hand === 'child' ? '#2563eb' : '#ea580c'}
          stroke-width="4"
          stroke-linecap="round"
        />
        <circle cx={x0} cy={SY} r="5" fill={hand === 'child' ? '#2563eb' : '#ea580c'} />
        <circle cx={x1} cy={SY} r="5" fill={hand === 'child' ? '#2563eb' : '#ea580c'} />
        <text
          x={(x0 + x1) / 2}
          y={SY - 36}
          text-anchor="middle"
          font-size="18"
          font-weight="700"
          fill="#1e293b">{k + 1}</text
        >
      {/each}
    </svg>

    <div class="flex flex-wrap gap-3">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        disabled={placed >= need}
        onclick={placeSpan}>Đặt 1 gang tay</button
      >
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={resetSpans}>
        Đo lại
      </button>
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {toneClass(
        placed >= need ? 'ok' : 'info',
      )}"
      aria-live="polite"
    >
      {spanText}
    </p>
  {:else}
    <p class="text-xl font-semibold text-slate-800">
      Kéo thước cho vạch 0 thẳng với đầu trái của {task.thing.label.toLowerCase()}.
    </p>

    {#key seed}
      <RulerBoard
        thing={task.thing}
        length={task.length}
        bind:shift
        onmove={() => (picked = null)}
      />
    {/key}

    <div role="group" aria-label="Thẻ số đo, đơn vị xăng-ti-mét" class="flex flex-wrap gap-3">
      {#each cards as v (v)}
        <button
          type="button"
          class={cardClass(v)}
          aria-pressed={picked === v}
          aria-label="{v} xăng-ti-mét"
          onclick={() => choose(v)}>{v} <span class="text-lg">cm</span></button
        >
      {/each}
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {toneClass(rulerText.tone)}"
      aria-live="polite"
    >
      {#if solved}<span aria-hidden="true">⭐ </span>{/if}{rulerText.text}
    </p>

    <button
      type="button"
      class="min-h-12 text-lg {solved ? button.primary : button.secondary}"
      onclick={nextTask}>Đo vật khác</button
    >
  {/if}
</div>
