<script>
  import { onDestroy } from 'svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { decimalText, expand } from '../_shared/decimal.js';
  import { MAX_TERM, PRESETS, divisionRows, finiteReason } from './engine.js';

  const inputId = $props.id();

  let p = $state(5);
  let q = $state(11);
  let typedP = $state('5');
  let typedQ = $state('11');
  let shown = $state(0);
  /** @type {'finite' | 'repeating' | null} */
  let guess = $state(null);
  let inputError = $state('');
  /** @type {ReturnType<typeof setInterval> | null} */
  let timer = null;

  const e = $derived(expand(p, q));
  const rows = $derived(divisionRows(p, q));
  const done = $derived(shown >= rows.length);
  const reason = $derived(finiteReason(p, q));
  /** Remainder that came back, once the division shows it. */
  const repeated = $derived(done && e.period > 0 ? e.remainders[e.start] : null);

  const verdict = $derived.by(() => {
    if (!done) return '';
    const short = decimalText(p, q);
    if (e.period === 0) {
      return `Số dư bằng 0 nên phép chia dừng lại: ${p}/${q} = ${short} là số thập phân hữu hạn.`;
    }
    const cycle = e.digits.slice(e.start).join('');
    return `Số dư ${repeated} xuất hiện lại, nên các chữ số ${cycle} lặp lại mãi: ${p}/${q} = ${short}, số thập phân vô hạn tuần hoàn có chu kì ${cycle}.`;
  });

  const guessFeedback = $derived.by(() => {
    if (!done || guess === null) return '';
    const right = (guess === 'finite') === (e.period === 0);
    return `${right ? 'Em đoán đúng.' : 'Em đoán chưa đúng.'} ${reason.text}`;
  });

  function stop() {
    if (timer !== null) clearInterval(timer);
    timer = null;
  }

  onDestroy(stop);

  /** @param {number} np @param {number} nq */
  function load(np, nq) {
    stop();
    p = np;
    q = nq;
    typedP = String(np);
    typedQ = String(nq);
    shown = 0;
    guess = null;
    inputError = '';
  }

  function loadTyped() {
    const np = Number(typedP);
    const nq = Number(typedQ);
    const ok = (/** @type {number} */ n) => Number.isInteger(n) && n >= 1 && n <= MAX_TERM;
    if (!ok(np) || !ok(nq)) {
      inputError = `Hãy nhập tử số và mẫu số là số tự nhiên từ 1 đến ${MAX_TERM}.`;
      return;
    }
    load(np, nq);
  }

  function step() {
    if (shown < rows.length) shown++;
  }

  function runAll() {
    stop();
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      shown = rows.length;
      return;
    }
    timer = setInterval(
      () => {
        if (shown >= rows.length) stop();
        else shown++;
      },
      rows.length > 12 ? 150 : 550,
    );
  }

  function restart() {
    stop();
    shown = 0;
    guess = null;
  }
</script>

<div class="space-y-4">
  <div>
    <p class="mb-1 text-sm font-semibold text-slate-700">Chọn một phân số</p>
    <div class="flex flex-wrap gap-2">
      {#each PRESETS as [a, b] (`${a}/${b}`)}
        <button
          type="button"
          class="{a === p && b === q ? button.primary : button.quiet} min-w-16"
          aria-pressed={a === p && b === q}
          onclick={() => load(a, b)}>{a}/{b}</button
        >
      {/each}
    </div>
  </div>

  <form
    class="flex flex-wrap items-end gap-2"
    onsubmit={(ev) => {
      ev.preventDefault();
      loadTyped();
    }}
  >
    <label class="w-24" for="{inputId}-p">
      <span class="text-sm font-semibold text-slate-700">Tử số</span>
      <input
        id="{inputId}-p"
        class={textInput}
        inputmode="numeric"
        bind:value={typedP}
        autocomplete="off"
      />
    </label>
    <span class="pb-2 text-2xl text-slate-500" aria-hidden="true">/</span>
    <label class="w-24" for="{inputId}-q">
      <span class="text-sm font-semibold text-slate-700">Mẫu số</span>
      <input
        id="{inputId}-q"
        class={textInput}
        inputmode="numeric"
        bind:value={typedQ}
        autocomplete="off"
      />
    </label>
    <button type="submit" class={button.secondary}>Chia phân số này</button>
  </form>
  {#if inputError}
    <p class="text-sm font-semibold text-rose-700" role="alert">{inputError}</p>
  {/if}

  {#if shown === 0 && rows.length > 0}
    <fieldset class="rounded-lg border border-indigo-200 bg-indigo-50 p-3">
      <legend class="px-1 text-sm font-semibold text-indigo-900">
        Đoán trước khi chia: {p}/{q} là số thập phân nào?
      </legend>
      <div class="mt-1 flex flex-wrap gap-2">
        <button
          type="button"
          class={guess === 'finite' ? button.primary : button.quiet}
          aria-pressed={guess === 'finite'}
          onclick={() => (guess = 'finite')}>Hữu hạn</button
        >
        <button
          type="button"
          class={guess === 'repeating' ? button.primary : button.quiet}
          aria-pressed={guess === 'repeating'}
          onclick={() => (guess = 'repeating')}>Vô hạn tuần hoàn</button
        >
      </div>
    </fieldset>
  {/if}

  <div class="rounded-lg border border-slate-200 bg-white p-3">
    <p class="text-lg break-words text-slate-900">
      <span class="font-semibold">{p} : {q} =</span>
      <span class="font-mono break-all tabular-nums"
        >{e.negative
          ? '−'
          : ''}{e.whole}{#if rows.length > 0},{/if}{#each rows.slice(0, shown) as r, i (i)}<span
            class={r.inPeriod && done ? 'rounded bg-amber-200 px-0.5 font-bold text-amber-950' : ''}
            >{r.digit}</span
          >{/each}{#if !done}…{/if}</span
      >
    </p>

    <ol class="mt-3 space-y-1 font-mono text-sm tabular-nums text-slate-800 sm:text-base">
      <li>
        Bước 0: {p} : {q} được
        <strong>{e.whole}</strong>, dư
        <span
          class="rounded px-1 {repeated !== null && e.remainders[0] === repeated
            ? 'bg-amber-200 ring-2 ring-amber-500'
            : 'bg-slate-100'}">{Math.abs(p) % q}</span
        >; viết dấu phẩy.
      </li>
      {#each rows.slice(0, shown) as r, i (i)}
        <li class={r.inPeriod && done ? 'text-amber-950' : ''}>
          Bước {i + 1}: hạ 0 được {r.dividend}; {r.dividend} : {q} được
          <strong>{r.digit}</strong>, dư
          <span
            class="rounded px-1 {r.after === repeated
              ? 'bg-amber-200 ring-2 ring-amber-500'
              : r.after === 0
                ? 'bg-emerald-100'
                : 'bg-slate-100'}">{r.after}</span
          >.
        </li>
      {/each}
    </ol>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={step} disabled={done}>
      Chia tiếp một chữ số
    </button>
    <button type="button" class={button.secondary} onclick={runAll} disabled={done}>
      Chia đến khi dừng hoặc lặp
    </button>
    <button type="button" class={button.quiet} onclick={restart}>Làm lại</button>
  </div>

  <div aria-live="polite" class="space-y-1 break-words">
    {#if done && rows.length > 0}
      <p class="font-semibold text-indigo-800">{verdict}</p>
    {:else if rows.length === 0}
      <p class="font-semibold text-indigo-800">{p}/{q} = {e.whole} là số nguyên.</p>
    {:else}
      <p class="text-slate-700">
        Số dư luôn nhỏ hơn {q}, nên chỉ có {q - 1} số dư khác 0. Quan sát xem số dư bằng 0 hay một số
        dư cũ quay lại.
      </p>
    {/if}
    {#if guessFeedback}
      <p class="text-slate-800">{guessFeedback}</p>
    {/if}
  </div>
</div>
