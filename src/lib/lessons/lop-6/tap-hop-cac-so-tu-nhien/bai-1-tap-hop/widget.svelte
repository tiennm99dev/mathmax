<script>
  import { tick } from 'svelte';
  import { SvelteSet } from 'svelte/reactivity';
  import { button } from '#lib/core/ui.js';
  import { CHALLENGES, listForm, membership, propertyForm, sameSet } from './engine.js';

  const TRAY = Array.from({ length: 16 }, (_, i) => i);

  const inA = new SvelteSet([0, 2, 4]);
  /** @type {number | null} */
  let last = $state(null);
  let challenge = $state(-1);

  const elements = $derived([...inA].sort((x, y) => x - y));
  const listing = $derived(listForm('A', elements));
  const property = $derived(propertyForm('A', elements));
  const target = $derived(challenge >= 0 ? CHALLENGES[challenge] : null);
  const solved = $derived(target !== null && sameSet(elements, target.target));

  const announcement = $derived.by(() => {
    if (last === null) return '';
    const parts = [membership(last, 'A', elements), listing];
    if (solved) parts.push('Đúng rồi, em đã tạo được tập hợp theo yêu cầu.');
    return parts.join('. ');
  });

  /** @param {number} n @param {boolean} inside */
  function place(n, inside) {
    if (inside) inA.add(n);
    else inA.delete(n);
    last = n;
  }

  /** @type {HTMLElement | undefined} */
  let ringEl = $state();
  /** @type {HTMLElement | undefined} */
  let rootEl = $state();

  // Pointer drag: the chip follows the pointer and lands in the ring or the
  // tray, whichever holds the point where it is released. A press without
  // movement counts as a tap and moves the chip to the other side.
  /** @type {{ n: number, id: number, x0: number, y0: number, dx: number, dy: number } | null} */
  let drag = $state(null);

  /** @param {PointerEvent} e @param {number} n */
  function down(e, n) {
    if (e.button !== 0) return;
    /** @type {HTMLElement} */ (e.currentTarget).setPointerCapture(e.pointerId);
    drag = { n, id: e.pointerId, x0: e.clientX, y0: e.clientY, dx: 0, dy: 0 };
  }

  /** @param {PointerEvent} e */
  function move(e) {
    if (!drag || drag.id !== e.pointerId) return;
    drag.dx = e.clientX - drag.x0;
    drag.dy = e.clientY - drag.y0;
  }

  /** @param {PointerEvent} e */
  function up(e) {
    if (!drag || drag.id !== e.pointerId) return;
    const { n, dx, dy } = drag;
    drag = null;
    if (Math.hypot(dx, dy) < 6) {
      place(n, !inA.has(n));
      return;
    }
    const r = ringEl?.getBoundingClientRect();
    const inside =
      !!r &&
      e.clientX >= r.left &&
      e.clientX <= r.right &&
      e.clientY >= r.top &&
      e.clientY <= r.bottom;
    place(n, inside);
  }

  /** @param {KeyboardEvent} e @param {number} n */
  function key(e, n) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      place(n, !inA.has(n));
      // The chip is re-created in the other container, so hand focus to it.
      tick().then(() =>
        /** @type {HTMLElement | null | undefined} */ (
          rootEl?.querySelector(`[data-chip="${n}"]`)
        )?.focus(),
      );
    }
  }

  function clearAll() {
    inA.clear();
    last = null;
  }

  /** @param {number} n */
  function chipStyle(n) {
    return drag && drag.n === n
      ? `transform: translate(${drag.dx}px, ${drag.dy}px); z-index: 10; position: relative;`
      : '';
  }

  const chipClass =
    'flex h-11 w-11 touch-none select-none items-center justify-center rounded-full border-2 text-lg font-bold tabular-nums shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-grab';
</script>

{#snippet chip(/** @type {number} */ n)}
  <button
    type="button"
    data-chip={n}
    class="{chipClass} {inA.has(n)
      ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
      : 'border-slate-300 bg-white text-slate-700'}"
    style={chipStyle(n)}
    aria-label="Số {n}, {inA.has(n) ? 'đang ở trong A, bấm để lấy ra' : 'bấm để đưa vào A'}"
    onpointerdown={(e) => down(e, n)}
    onpointermove={move}
    onpointerup={up}
    onpointercancel={() => (drag = null)}
    onkeydown={(e) => key(e, n)}>{n}</button
  >
{/snippet}

<div class="space-y-4" bind:this={rootEl}>
  <div
    bind:this={ringEl}
    class="relative mx-auto min-h-36 max-w-md rounded-[50%] border-4 border-indigo-500 bg-indigo-50/40 px-8 py-8"
    role="group"
    aria-label="Vòng tập hợp A"
  >
    <span class="absolute left-5 top-2 text-xl font-bold italic text-indigo-700" aria-hidden="true"
      >A</span
    >
    <div class="flex flex-wrap justify-center gap-2">
      {#each elements as n (n)}
        {@render chip(n)}
      {:else}
        <p class="py-6 text-sm italic text-slate-500">Kéo số vào vòng này</p>
      {/each}
    </div>
  </div>

  <div class="rounded-xl border border-slate-200 bg-slate-50 p-3" role="group" aria-label="Khay số">
    <p class="mb-2 text-sm font-semibold text-slate-600">Khay số (ngoài A)</p>
    <div class="flex flex-wrap gap-2">
      {#each TRAY.filter((n) => !inA.has(n)) as n (n)}
        {@render chip(n)}
      {/each}
    </div>
  </div>

  <div class="space-y-2 rounded-xl border border-slate-200 bg-white p-4">
    <p class="text-sm font-semibold text-slate-600">Cách 1. Liệt kê các phần tử</p>
    <p class="font-mono text-lg text-slate-900">
      {elements.length ? listing : 'A chưa có phần tử nào'}
    </p>
    <p class="text-sm font-semibold text-slate-600">Cách 2. Chỉ ra tính chất đặc trưng</p>
    <p class={property ? 'font-mono text-lg text-slate-900' : 'text-slate-700'}>
      {property ??
        (elements.length < 2
          ? 'Cần ít nhất hai phần tử để tìm tính chất chung.'
          : 'Các phần tử chưa theo một quy luật đơn giản; hãy viết bằng cách liệt kê.')}
    </p>
    {#if last !== null}
      <p class="text-slate-700">
        Vừa di chuyển số {last}:
        <span class="font-mono font-semibold">{membership(last, 'A', elements)}</span>
      </p>
    {/if}
  </div>

  <div class="flex flex-wrap items-center gap-2">
    {#each CHALLENGES as _, i (i)}
      <button
        type="button"
        class={challenge === i ? button.primary : button.secondary}
        aria-pressed={challenge === i}
        onclick={() => (challenge = challenge === i ? -1 : i)}>Thử thách {i + 1}</button
      >
    {/each}
    <button type="button" class={button.quiet} onclick={clearAll}>Làm trống A</button>
  </div>

  {#if target}
    <p
      class="rounded-lg border p-3 {solved
        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
        : 'border-amber-300 bg-amber-50 text-amber-900'}"
    >
      Tạo tập hợp: <span class="font-mono font-semibold">{target.text}</span>
      {solved ? ' ✓ Đúng rồi!' : ''}
    </p>
  {/if}

  <div aria-live="polite" aria-atomic="true" class="sr-only">{announcement}</div>
</div>
