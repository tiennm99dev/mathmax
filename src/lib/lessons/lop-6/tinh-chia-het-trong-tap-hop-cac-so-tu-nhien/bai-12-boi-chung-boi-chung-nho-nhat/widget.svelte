<script>
  import { onDestroy, untrack } from 'svelte';
  import { lcm } from '#lib/numtheory-engine/index.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import { factorText, factorize, lcmFactors, multiplesUpTo } from '../_shared/divisibility.js';
  import { lightsAt, timelineLength, togetherUpTo } from './engine.js';

  const TICK_MS = 350;

  let a = $state(6);
  let b = $state(8);
  let t = $state(0);
  let running = $state(false);
  let announcement = $state('');
  /** @type {ReturnType<typeof setInterval> | null} */
  let timer = null;

  const length = $derived(timelineLength(a, b));
  const seconds = $derived(Array.from({ length }, (_, i) => i + 1));
  const together = $derived(togetherUpTo(a, b, length));
  const first = $derived(together[0]);
  const met = $derived(t >= first);
  const now = $derived(t > 0 ? lightsAt(t, a, b) : { a: false, b: false });
  const multA = $derived(multiplesUpTo(a, first, false));
  const multB = $derived(multiplesUpTo(b, first, false));

  // New periods restart the clock.
  $effect(() => {
    void a;
    void b;
    untrack(reset);
  });

  onDestroy(stop);

  function stop() {
    if (timer !== null) clearInterval(timer);
    timer = null;
    running = false;
  }

  function step() {
    if (t >= length) {
      stop();
      return;
    }
    t++;
    const on = lightsAt(t, a, b);
    if (on.a && on.b) {
      announcement =
        t === first
          ? `Giây thứ ${t}: hai đèn cùng sáng lần đầu tiên. BCNN(${a}, ${b}) = ${t}.`
          : `Giây thứ ${t}: hai đèn lại cùng sáng. ${t} là một bội chung của ${a} và ${b}.`;
      stop();
    } else {
      announcement = '';
    }
  }

  function toggleRun() {
    if (running) {
      stop();
      return;
    }
    if (t >= length) t = 0;
    running = true;
    timer = setInterval(step, TICK_MS);
  }

  function reset() {
    stop();
    t = 0;
    announcement = '';
  }

  /** @param {number} s */
  function cellClass(s) {
    if (s > t) return 'border-slate-200 bg-white text-slate-400';
    const on = lightsAt(s, a, b);
    if (on.a && on.b) return 'border-emerald-500 bg-emerald-100 text-emerald-900 font-bold';
    return 'border-slate-300 bg-slate-50 text-slate-600';
  }
</script>

<div class="space-y-4">
  <div class="grid gap-4 sm:grid-cols-2">
    <SliderField label="Chu kì đèn A (giây)" bind:value={a} min={2} max={12} />
    <SliderField label="Chu kì đèn B (giây)" bind:value={b} min={2} max={12} />
  </div>

  <div class="flex items-center justify-around rounded-xl bg-slate-900 p-4 text-white">
    {#each [{ name: 'A', on: now.a, period: a, color: 'bg-amber-300 shadow-amber-300/70' }, { name: 'B', on: now.b, period: b, color: 'bg-sky-300 shadow-sky-300/70' }] as lamp (lamp.name)}
      <div class="flex flex-col items-center gap-2">
        <span
          class="block h-14 w-14 rounded-full border-4 border-slate-600 {lamp.on
            ? `${lamp.color} shadow-[0_0_24px]`
            : 'bg-slate-700'}"
          aria-hidden="true"
        ></span>
        <span class="text-sm">Đèn {lamp.name} · {lamp.period} giây/lần</span>
        <span class="sr-only">{lamp.on ? 'đang sáng' : 'đang tắt'}</span>
      </div>
    {/each}
  </div>

  <div class="flex flex-wrap items-center gap-2">
    <button type="button" class={button.primary} onclick={toggleRun}>
      {running ? 'Tạm dừng' : t === 0 ? 'Bắt đầu' : 'Chạy tiếp'}
    </button>
    <button type="button" class={button.secondary} onclick={step} disabled={running || t >= length}
      >+1 giây</button
    >
    <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
    <span class="text-lg font-semibold tabular-nums text-slate-800">Giây thứ {t}</span>
  </div>

  <ol class="flex flex-wrap gap-1" aria-label="Dòng thời gian từng giây">
    {#each seconds as s (s)}
      {@const on = lightsAt(s, a, b)}
      <li
        class="flex h-9 w-8 flex-col items-center justify-center rounded border text-[10px] tabular-nums {cellClass(
          s,
        )} {s === t ? 'ring-2 ring-indigo-500' : ''}"
        aria-label="Giây {s}{s <= t && on.a ? ', đèn A sáng' : ''}{s <= t && on.b
          ? ', đèn B sáng'
          : ''}"
      >
        <span>{s}</span>
        <span class="flex gap-0.5" aria-hidden="true">
          <span
            class="h-1.5 w-1.5 rounded-full {s <= t && on.a ? 'bg-amber-400' : 'bg-transparent'}"
          ></span>
          <span class="h-1.5 w-1.5 rounded-full {s <= t && on.b ? 'bg-sky-500' : 'bg-transparent'}"
          ></span>
        </span>
      </li>
    {/each}
  </ol>

  <p class="sr-only" aria-live="polite">{announcement}</p>

  <div class="space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-800">
    {#if met}
      <p class="text-lg font-semibold text-emerald-800">
        Hai đèn cùng sáng lần đầu ở giây thứ {first}: BCNN({a}, {b}) = {first}.
      </p>
      <p class="text-sm tabular-nums">Đèn A sáng ở các giây: {multA.join('; ')}.</p>
      <p class="text-sm tabular-nums">Đèn B sáng ở các giây: {multB.join('; ')}.</p>
      <p class="text-sm tabular-nums">
        Phân tích: {a} = {factorText(factorize(a))}, {b} = {factorText(factorize(b))}. Lấy mọi thừa
        số nguyên tố chung và riêng với số mũ lớn nhất: {factorText(lcmFactors(a, b))} = {lcm(
          a,
          b,
        )}.
      </p>
      <p class="text-sm tabular-nums">
        Bấm "Chạy tiếp": trên dòng thời gian, hai đèn cùng sáng ở các giây {together.join('; ')},
        đều là bội của {first}. Đó là các bội chung của {a} và {b}.
      </p>
    {:else}
      <p>Bấm "Bắt đầu" và đoán xem ở giây thứ mấy hai đèn cùng sáng lần đầu tiên.</p>
    {/if}
  </div>
</div>
