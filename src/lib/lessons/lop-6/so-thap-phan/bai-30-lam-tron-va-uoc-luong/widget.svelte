<script>
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { decStr, readDecimal } from '../_shared/decimal.js';
  import {
    PLACES,
    PRESETS,
    digitCells,
    explain,
    neighbours,
    placeText,
    toThousandths,
  } from './engine.js';

  const W = 380;
  const H = 120;
  const PAD = 40;
  const BASE = 70;

  let v = $state(PRESETS[0]);
  let placeIndex = $state(3);
  let typed = $state('');
  let inputError = $state('');
  let guessKey = $state('');
  let guess = $state(0);

  const place = $derived(PLACES[placeIndex]);
  const key = $derived(`${v}|${placeIndex}`);
  const guessed = $derived(guessKey === key);
  const e = $derived(explain(v, place));
  const marks = $derived(neighbours(v, place.u));
  const cells = $derived(digitCells(v, Math.min(3, place.d + 1)));
  const rPow = $derived(Math.round(Math.log10(place.u)) - 3);
  const tie = $derived(Math.abs(e.rounded - v) * 2 === place.u);

  const xOf = (/** @type {number} */ val) =>
    PAD + ((val - marks[0]) / (marks[1] - marks[0])) * (W - 2 * PAD);
  const markerX = $derived(xOf(guessed ? e.rounded : v));

  /** @param {number} next */
  function useNumber(next) {
    v = next;
    typed = '';
    inputError = '';
  }

  function submit() {
    const res = toThousandths(readDecimal(typed));
    if ('error' in res) {
      inputError = res.error;
      return;
    }
    useNumber(res.v);
  }

  /** @param {number} m */
  function pick(m) {
    guess = m;
    guessKey = key;
  }

  const verdict = $derived(
    !guessed
      ? ''
      : guess === e.rounded
        ? tie
          ? `Đúng! Số nằm đúng giữa hai mốc; chữ số bên phải là 5 nên ta tăng chữ số ${place.name}: ${decStr(v, 3)} ≈ ${e.result}.`
          : `Đúng! ${decStr(v, 3)} gần ${e.result} hơn, nên ${decStr(v, 3)} ≈ ${e.result}.`
        : tie
          ? `Chưa đúng: số nằm đúng giữa hai mốc; chữ số bên phải là 5 nên ta tăng chữ số ${place.name}: ${decStr(v, 3)} ≈ ${e.result} (xem điểm tím nhảy tới mốc đó).`
          : `Chưa đúng: ${decStr(v, 3)} gần mốc ${e.result} hơn (xem điểm tím nhảy tới mốc đó).`,
  );
</script>

<div class="space-y-4">
  <div class="space-y-2">
    <p class="text-sm font-semibold text-slate-700">Chọn một số</p>
    <div class="flex flex-wrap gap-2">
      {#each PRESETS as p (p)}
        <button
          type="button"
          class={p === v ? button.primary : button.quiet}
          aria-pressed={p === v}
          onclick={() => useNumber(p)}>{decStr(p, 3)}</button
        >
      {/each}
    </div>
    <form
      class="flex flex-wrap items-end gap-2"
      onsubmit={(ev) => {
        ev.preventDefault();
        submit();
      }}
    >
      <label class="min-w-0 basis-full sm:flex-1 sm:basis-auto">
        <span class="mb-1 block text-sm font-semibold text-slate-700"
          >Hoặc nhập số (nhiều nhất ba chữ số thập phân)</span
        >
        <input class={textInput} inputmode="decimal" autocomplete="off" bind:value={typed} />
      </label>
      <button type="submit" class={button.secondary}>Dùng số này</button>
    </form>
    <p class="text-sm font-semibold text-rose-700" aria-live="polite">{inputError}</p>
  </div>

  <SliderField
    label="Làm tròn đến"
    bind:value={placeIndex}
    min={0}
    max={PLACES.length - 1}
    format={(i) => PLACES[i].name}
  />

  <p class="text-center font-mono text-4xl font-bold tracking-wide" aria-label="Số {decStr(v, 3)}">
    {#each cells as c, i (i)}<span
        class={c.pow === rPow
          ? 'rounded bg-indigo-100 text-indigo-700'
          : c.pow === rPow - 1
            ? 'rounded bg-amber-100 text-amber-700'
            : c.pow !== null && c.pow < rPow - 1
              ? 'text-slate-400'
              : 'text-slate-900'}>{c.ch}</span
      >{/each}
  </p>
  <p class="text-center text-sm text-slate-600">
    <span class="rounded bg-indigo-100 px-1 text-indigo-700">Chữ số {place.name}</span>
    và <span class="rounded bg-amber-100 px-1 text-amber-700">chữ số ngay bên phải nó</span>
  </p>

  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-2xl select-none"
    style:aspect-ratio="{W} / {H}"
    role="img"
    aria-label="Trục số từ {placeText(marks[0], place)} đến {placeText(
      marks[1],
      place,
    )}, chia 10 phần; số {decStr(v, 3)} nằm giữa hai mốc này"
  >
    <line x1={PAD - 16} y1={BASE} x2={W - PAD + 16} y2={BASE} stroke="#334155" stroke-width="2" />
    {#each { length: 11 } as _, i (i)}
      <line
        x1={PAD + (i / 10) * (W - 2 * PAD)}
        y1={BASE - (i % 5 === 0 ? 12 : 6)}
        x2={PAD + (i / 10) * (W - 2 * PAD)}
        y2={BASE + (i % 5 === 0 ? 12 : 6)}
        stroke={i === 5 ? '#d97706' : '#475569'}
        stroke-width={i % 10 === 0 ? 2.5 : 1.2}
        stroke-dasharray={i === 5 ? '3 2' : undefined}
      />
    {/each}
    <text x={W / 2} y={BASE + 30} text-anchor="middle" font-size="13" fill="#b45309"
      >điểm chính giữa</text
    >
    {#each marks as m, i (i)}
      <text
        x={i === 0 ? PAD : W - PAD}
        y={BASE + 32}
        text-anchor="middle"
        font-size="17"
        font-weight="700"
        fill={guessed && m === e.rounded ? '#047857' : '#334155'}>{placeText(m, place)}</text
      >
    {/each}
    <g
      class="motion-safe:transition-transform motion-safe:duration-700"
      style:transform="translateX({markerX}px)"
    >
      <circle cx="0" cy={BASE} r="9" fill="#4F46E5" stroke="#fff" stroke-width="2" />
      <text x="0" y={BASE - 20} text-anchor="middle" font-size="15" font-weight="700" fill="#3730a3"
        >{guessed ? e.result : decStr(v, 3)}</text
      >
    </g>
  </svg>

  <div class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
    <p class="font-semibold text-slate-800">
      Làm tròn {decStr(v, 3)} đến {place.name}: số này gần mốc nào hơn?
    </p>
    <div class="flex flex-wrap gap-2">
      {#each marks as m, i (i)}
        <button type="button" class={button.secondary} onclick={() => pick(m)}
          >{placeText(m, place)}</button
        >
      {/each}
    </div>
    <p
      class="font-semibold {guess === e.rounded ? 'text-emerald-700' : 'text-rose-700'}"
      aria-live="polite"
    >
      {verdict}
    </p>
    {#if guessed}
      <ol class="list-decimal space-y-1 pl-6 text-slate-800">
        {#each e.steps as step (step)}<li>{step}</li>{/each}
      </ol>
    {/if}
  </div>
</div>
