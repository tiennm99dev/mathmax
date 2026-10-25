<script>
  import { onMount } from 'svelte';
  import { SvelteSet } from 'svelte/reactivity';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { rng } from '#lib/core/drill.js';
  import { fmt } from '#lib/core/number-format.js';
  import { ROUND, judge, nextNumber } from './engine.js';

  /** @typedef {import('./engine.js').Basket} Basket */

  const BASKETS = /** @type {const} */ ([2, 3, 5, 9]);
  const SPEEDS = { cham: 12, nhanh: 6 };

  let speed = $state(/** @type {'cham' | 'nhanh' | 'tu-do'} */ ('cham'));
  let seed = $state(1);
  let index = $state(0);
  let score = $state(0);
  let streak = $state(0);
  /** @type {ReturnType<typeof judge> | null} */
  let verdict = $state(null);
  let timedOut = $state(false);
  // The drop key restarts the falling animation for every new number.
  let dropKey = $state(0);
  const picked = new SvelteSet();

  const rand = $derived(rng(seed));
  const numbers = $derived(Array.from({ length: ROUND }, () => nextNumber(rand)));
  const finished = $derived(index >= ROUND);
  const current = $derived(finished ? null : numbers[index]);
  const falling = $derived(speed !== 'tu-do' && verdict === null);

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) speed = 'tu-do';
  });

  /** @param {Basket} d */
  function toggle(d) {
    if (verdict !== null || finished) return;
    if (picked.has(d)) picked.delete(d);
    else picked.add(d);
  }

  function drop() {
    if (current === null || verdict !== null) return;
    verdict = judge(current, /** @type {Iterable<Basket>} */ (picked));
    if (verdict.correct) {
      score++;
      streak++;
    } else streak = 0;
  }

  function onFallen() {
    if (current === null || verdict !== null) return;
    timedOut = true;
    verdict = judge(current, []);
    verdict = { ...verdict, correct: false };
    streak = 0;
  }

  function next() {
    index++;
    picked.clear();
    verdict = null;
    timedOut = false;
    dropKey++;
  }

  function restart() {
    seed = Math.floor(Math.random() * 2 ** 31) + 2;
    index = 0;
    score = 0;
    streak = 0;
    picked.clear();
    verdict = null;
    timedOut = false;
    dropKey++;
  }

  /** @param {KeyboardEvent} e */
  function onKey(e) {
    const target = /** @type {HTMLElement} */ (e.target);
    if (target.tagName === 'INPUT') return;
    const d = Number(e.key);
    if (d === 2 || d === 3 || d === 5 || d === 9) {
      e.preventDefault();
      toggle(d);
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="space-y-4" onkeydown={onKey}>
  <SegmentedControl
    label="Tốc độ rơi"
    options={[
      { value: 'cham', label: 'Chậm' },
      { value: 'nhanh', label: 'Nhanh' },
      { value: 'tu-do', label: 'Không tính giờ' },
    ]}
    bind:value={speed}
  />

  <p class="text-sm text-slate-600 tabular-nums" aria-live="polite">
    Số {Math.min(index + 1, ROUND)}/{ROUND} · đúng {score} · chuỗi đúng liên tiếp {streak}
  </p>

  {#if current !== null}
    <div
      class="relative h-44 overflow-hidden rounded-xl border border-sky-200 bg-gradient-to-b from-sky-50 to-white"
    >
      {#key dropKey}
        <div
          class="fall absolute left-1/2 top-2 -translate-x-1/2 rounded-xl bg-indigo-600 px-5 py-2 text-3xl font-bold tabular-nums text-white shadow-lg"
          class:falling
          style="--fall-time: {speed === 'tu-do' ? 0 : SPEEDS[speed]}s"
          onanimationend={onFallen}
          aria-label="Số đang rơi: {current}"
          role="img"
        >
          {fmt(current)}
        </div>
      {/key}
    </div>

    <fieldset>
      <legend class="mb-2 text-sm font-semibold text-slate-700">
        Chọn mọi giỏ mà số này chia hết (phím 2, 3, 5, 9), không chọn giỏ nào nếu không chia hết cho
        số nào.
      </legend>
      <div class="grid grid-cols-4 gap-2">
        {#each BASKETS as d (d)}
          <button
            type="button"
            aria-pressed={picked.has(d)}
            disabled={verdict !== null}
            onclick={() => toggle(d)}
            class="flex min-h-16 flex-col items-center justify-center rounded-b-3xl border-2 font-bold transition {focusRing} {picked.has(
              d,
            )
              ? 'border-indigo-600 bg-indigo-100 text-indigo-900'
              : 'border-amber-400 bg-amber-50 text-amber-900'}"
          >
            <span class="text-xs font-semibold">Giỏ</span>
            <span class="text-xl">⋮ {d}</span>
          </button>
        {/each}
      </div>
    </fieldset>

    <div class="flex flex-wrap gap-2">
      {#if verdict === null}
        <button type="button" class={button.primary} onclick={drop}>Thả vào giỏ</button>
      {:else}
        <button type="button" class={button.primary} onclick={next}>
          {index + 1 === ROUND ? 'Xem kết quả' : 'Số tiếp theo'}
        </button>
      {/if}
    </div>

    <div aria-live="polite">
      {#if verdict !== null}
        <div
          class="space-y-1 rounded-lg border p-3 {verdict.correct
            ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
            : 'border-rose-300 bg-rose-50 text-rose-950'}"
        >
          <p class="font-semibold">
            {timedOut ? 'Số đã rơi xuống đất!' : verdict.correct ? 'Đúng rồi!' : 'Chưa đúng.'}
            {fmt(current)} thuộc giỏ: {verdict.lines
              .filter((l) => l.belongs)
              .map((l) => l.basket)
              .join(', ') || 'không giỏ nào'}.
          </p>
          <ul class="space-y-1 text-sm">
            {#each verdict.lines as l (l.basket)}
              <li class={l.ok ? '' : 'font-semibold'}>{l.ok ? '✓' : '✗'} {l.reason}</li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  {:else}
    <div class="space-y-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4" aria-live="polite">
      <p class="text-lg font-bold text-slate-900">Em phân loại đúng {score}/{ROUND} số.</p>
      <p class="text-slate-800">
        {score === ROUND
          ? 'Tuyệt vời! Thử tốc độ nhanh hơn nhé.'
          : 'Nhớ: giỏ 2 và 5 nhìn chữ số tận cùng, giỏ 3 và 9 nhìn tổng các chữ số.'}
      </p>
      <button type="button" class={button.primary} onclick={restart}>Chơi lượt mới</button>
    </div>
  {/if}
</div>

<style>
  .fall.falling {
    animation: fall var(--fall-time) linear forwards;
  }
  @keyframes fall {
    from {
      top: 0.5rem;
    }
    to {
      top: calc(100% - 3.5rem);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .fall.falling {
      animation: none;
    }
  }
</style>
