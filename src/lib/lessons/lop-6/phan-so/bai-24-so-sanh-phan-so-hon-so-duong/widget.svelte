<script>
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { sectorPath } from '#lib/core/visuals/svg-math.js';
  import Stepper from '../_shared/stepper.svelte';
  import Frac from '../_shared/frac.svelte';
  import { MINUS, fracText, valueText } from '../_shared/fractions.js';
  import { PLACE_SETS, ascending, isAt, mixedParts, pieFill, standing } from './engine.js';

  let mode = $state('line');

  // ── Number line mode ────────────────────────────────────────────────────
  let setIndex = $state(0);
  let item = $state(0);
  let value = $state(0);
  /** @type {Array<{ value: number, label: string }>} */
  let placed = $state([]);
  let message = $state('');

  const set = $derived(PLACE_SETS[setIndex]);
  const current = $derived(set.items[item] ?? null);
  const finished = $derived(item >= set.items.length);
  const markerText = $derived(valueText(value));
  const markerTicks = $derived(Math.round(value * set.sub));

  /** @param {[number, number]} f as written, sign kept where it was */
  const written = (f) =>
    f[1] < 0 ? `${f[0] < 0 ? MINUS : ''}${Math.abs(f[0])}/${MINUS}${-f[1]}` : fracText(f[0], f[1]);

  /** @param {number} i */
  function chooseSet(i) {
    setIndex = i;
    item = 0;
    value = 0;
    placed = [];
    message = '';
  }

  function place() {
    if (!current) return;
    const [n, d] = current;
    if (isAt(value, n, d, set.sub)) {
      placed = [...placed, { value, label: written(current) }];
      const onTicks = fracText(markerTicks, set.sub);
      const same = onTicks === written(current);
      message = `Đúng! ${written(current)}${same ? '' : ` = ${onTicks}`} ${standing(n, d)}.`;
      item++;
      return;
    }
    const target = (n * set.sub) / d;
    const where = markerTicks < target ? 'bên trái' : 'bên phải';
    message = `Chưa đúng: điểm đang ở ${markerText}, nằm ${where} ${written(current)}. Hãy viết ${written(current)} với mẫu ${set.sub} rồi đếm vạch từ 0.`;
  }

  // ── Pie mode ────────────────────────────────────────────────────────────
  let num = $state(7);
  let den = $state(4);
  const PIES = 4;
  const R = 44;
  const pieW = 104;
  const fill = $derived(pieFill(num, den, PIES));
  const parts = $derived(mixedParts(num, den));
  const shownPies = $derived(Math.max(1, Math.ceil(num / den)));

  /** @param {number} p @param {number} k */
  function tapSector(p, k) {
    const n = p * den + k + 1;
    num = n === num ? n - 1 : n;
    if (num < 1) num = 1;
  }

  /** @param {number} d */
  function setDen(d) {
    if (num > PIES * d) num = PIES * d;
  }

  const pieMessage = $derived.by(() => {
    const { whole, rest } = parts;
    if (num < den)
      return `${fracText(num, den)} nhỏ hơn 1 (tử nhỏ hơn mẫu), nên không viết được thành hỗn số.`;
    if (rest === 0)
      return `${fracText(num, den)} = ${num} : ${den} = ${whole}, một số nguyên: tô kín ${whole} hình.`;
    return `${num} : ${den} được thương ${whole}, dư ${rest}. Vậy ${fracText(num, den)} = ${whole} + ${fracText(rest, den)}, viết là hỗn số ${whole} ${rest}/${den} (đọc là "${whole} và ${rest} phần ${den}").`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    options={[
      { value: 'line', label: 'So sánh trên trục số' },
      { value: 'pie', label: 'Hỗn số bằng hình bánh' },
    ]}
    bind:value={mode}
  />

  {#if mode === 'line'}
    <SegmentedControl
      label="Bộ phân số"
      options={PLACE_SETS.map((s, i) => ({ value: i, label: s.label }))}
      value={setIndex}
      onchange={(v) => chooseSet(Number(v))}
    />

    <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
      {#if current}
        <p class="flex flex-wrap items-center gap-2 text-slate-800">
          Kéo điểm đỏ đến phân số
          {#if current[1] < 0}
            <Frac n={current[0]} d={current[1]} signed size="lg" />
          {:else}
            <Frac n={current[0]} d={current[1]} size="lg" />
          {/if}
          rồi bấm "Đặt vào đây".
        </p>
      {:else}
        <p class="font-semibold text-emerald-800">
          Đã đặt xong! Thứ tự tăng dần:
          {ascending(set.items).map(written).join(' < ')}
        </p>
      {/if}
    </div>

    <NumberLine
      min={-2}
      max={2}
      step={1}
      subdivisions={set.sub}
      bind:value
      marks={placed}
      format={(v) => (v < 0 ? `${MINUS}${-v}` : String(v))}
      label="Trục số từ −2 đến 2, mỗi đơn vị chia {set.sub} phần"
      markerLabel="Điểm cần đặt; phím mũi tên dịch một vạch"
    />
    <p class="text-sm text-slate-600">
      Điểm đỏ đang ở <strong class="tabular-nums">{markerText}</strong>
      ({fracText(markerTicks, set.sub)}). Phím mũi tên dịch một vạch, giữ Shift để dịch một đơn vị.
    </p>

    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={place} disabled={finished}
        >Đặt vào đây</button
      >
      <button type="button" class={button.quiet} onclick={() => chooseSet(setIndex)}>Làm lại</button
      >
    </div>
    <p class="font-semibold text-slate-800" aria-live="polite">{message}</p>
  {:else}
    <div class="flex flex-wrap gap-x-6 gap-y-2">
      <Stepper label="Tử" bind:value={num} min={1} max={PIES * den} />
      <Stepper label="Mẫu" bind:value={den} min={2} max={8} onchange={setDen} />
    </div>

    <svg
      viewBox="0 0 {PIES * pieW} {pieW}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label="{shownPies} hình tròn, mỗi hình chia {den} phần, tô {num} phần"
    >
      {#each fill as shaded, p (p)}
        {@const cx = p * pieW + pieW / 2}
        {@const cy = pieW / 2}
        <g opacity={p < shownPies ? 1 : 0.25}>
          {#each { length: den } as _, k (k)}
            <!-- Tapping a sector is a pointer shortcut; the steppers are the keyboard route. -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <path
              d={sectorPath(cx, cy, R, (k * 360) / den, ((k + 1) * 360) / den)}
              fill={k < shaded ? (p < parts.whole ? '#4F46E5' : '#F46036') : '#fff'}
              fill-opacity={k < shaded ? 0.85 : 1}
              stroke="#334155"
              stroke-width="1.5"
              style:cursor="pointer"
              onpointerdown={() => tapSector(p, k)}
            />
          {/each}
        </g>
      {/each}
    </svg>

    <div
      class="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
    >
      <Frac n={num} d={den} size="lg" />
      {#if num > den && parts.rest > 0}
        <span class="text-2xl font-bold text-slate-500" aria-hidden="true">=</span>
        <span class="text-2xl font-bold tabular-nums text-indigo-700" aria-hidden="true"
          >{parts.whole}</span
        >
        <span class="text-2xl font-bold text-slate-500" aria-hidden="true">+</span>
        <Frac n={parts.rest} d={den} size="lg" />
        <span class="text-2xl font-bold text-slate-500" aria-hidden="true">=</span>
        <Frac whole={parts.whole} n={parts.rest} d={den} size="lg" />
      {:else if num >= den}
        <span class="text-2xl font-bold text-slate-500" aria-hidden="true">=</span>
        <span class="text-2xl font-bold tabular-nums text-indigo-700">{parts.whole}</span>
      {/if}
    </div>
    <p class="font-semibold text-slate-800" aria-live="polite">{pieMessage}</p>
    {#if num > den && parts.rest > 0}
      <p class="text-sm text-slate-700">
        Ngược lại: {parts.whole}
        {parts.rest}/{den} = ({parts.whole} · {den} + {parts.rest})/{den} = {num}/{den}. Các hình tô
        kín (màu chàm) là phần nguyên, hình tô dở (màu cam) là phần phân số.
      </p>
    {/if}
    <p class="text-sm text-slate-600">Chạm vào một phần của hình tròn để tô đến phần đó.</p>
  {/if}
</div>
