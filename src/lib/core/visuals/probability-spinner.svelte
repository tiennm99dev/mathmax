<script>
  import { Tween, prefersReducedMotion } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { fraction, format as formatFraction, simplify } from '#lib/fraction-engine/fraction.js';
  import { pickWeighted, experimentalProbability } from '#lib/stats-engine/probability.js';
  import { pieSlices } from '#lib/stats-engine/frequency.js';
  import { formatNumber } from '#lib/units-engine/format.js';
  import { button } from '../ui.js';
  import { colorAt, polar, sectorPath } from './svg-math.js';

  /**
   * A spinner for chance experiments: sectors sized by `weight`, an arrow
   * that spins to a random outcome, and a running table of how often each
   * outcome came up next to its theoretical probability. Spin with the
   * buttons (keyboard) or by tapping the spinner (pointer); "×10" runs ten
   * trials at once. Motion is skipped for people who prefer reduced motion.
   *
   * - `sectors`: `{ label, weight?, color? }`, weight 1 by default.
   * - `counts` (bindable): times each sector came up, in sector order.
   * - `random`: source of numbers in [0, 1), replaceable for repeatable demos.
   * - `onspin`: called with the index of each outcome.
   *
   * @type {{
   *   sectors?: Array<{ label: string, weight?: number, color?: string }>;
   *   counts?: number[];
   *   random?: () => number;
   *   showTable?: boolean;
   *   label?: string;
   *   size?: number;
   *   onspin?: (index: number) => void;
   * }}
   */
  let {
    sectors = [{ label: 'Đỏ' }, { label: 'Xanh' }, { label: 'Vàng' }],
    counts = $bindable([]),
    random = Math.random,
    showTable = true,
    label = 'Vòng quay may mắn',
    size = 300,
    onspin,
  } = $props();

  const weights = $derived(sectors.map((s) => s.weight ?? 1));
  const totalWeight = $derived(weights.reduce((s, w) => s + w, 0));
  const slices = $derived(pieSlices(weights));
  const tally = $derived(sectors.map((_, i) => counts[i] ?? 0));
  const trials = $derived(tally.reduce((s, c) => s + c, 0));
  const C = $derived(size / 2);
  const R = $derived(size / 2 - 12);

  const angle = new Tween(0, { duration: 1400, easing: cubicOut });
  /** @type {number | null} */
  let last = $state(null);
  let spinning = $state(false);
  let announce = $state('');

  /** @param {number} i */
  function record(i) {
    const next = sectors.map((_, j) => (tally[j] ?? 0) + (j === i ? 1 : 0));
    counts = next;
    last = i;
    onspin?.(i);
  }

  /** Arrow angle that lands inside sector `i`, away from its edges. */
  function landing(/** @type {number} */ i) {
    const s = slices[i];
    return s.start + s.sweep * (0.15 + 0.7 * random());
  }

  async function spin() {
    if (spinning || totalWeight <= 0) return;
    const i = pickWeighted(weights, random());
    const turns = prefersReducedMotion.current ? 0 : 3;
    const from = angle.current;
    let target = from - (from % 360) + turns * 360 + landing(i);
    // Always turn forward, even with no extra turns.
    if (target <= from) target += 360;
    spinning = true;
    await angle.set(target, { duration: prefersReducedMotion.current ? 0 : 1400 });
    spinning = false;
    record(i);
    announce = `Mũi tên chỉ vào ${sectors[i].label}.`;
  }

  function spinTen() {
    if (spinning || totalWeight <= 0) return;
    /** @type {number} */
    let i = 0;
    for (let k = 0; k < 10; k++) {
      i = pickWeighted(weights, random());
      record(i);
    }
    angle.set(angle.current - (angle.current % 360) + 360 + landing(i), { duration: 0 });
    announce = `Đã quay thêm 10 lần, tổng ${trials} lần.`;
  }

  function reset() {
    counts = sectors.map(() => 0);
    last = null;
    announce = 'Đã xoá kết quả.';
  }

  const theory = (/** @type {number} */ w) =>
    Number.isInteger(w) && Number.isInteger(totalWeight)
      ? formatFraction(simplify(fraction(w, totalWeight)))
      : formatNumber(w / totalWeight, 3);
</script>

<div class="space-y-4">
  <div class="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center">
    <!-- Tapping the spinner is a pointer shortcut for the "Quay" button. -->
    <svg
      viewBox="0 0 {size} {size}"
      class="block w-full max-w-xs shrink-0 cursor-pointer select-none"
      style:aspect-ratio="1 / 1"
      role="img"
      aria-label="{label}: {sectors.map((s) => s.label).join(', ')}"
      onpointerdown={spin}
    >
      {#each slices as s, i (i)}
        <path
          d={sectorPath(C, C, R, s.start, s.end)}
          fill={sectors[i].color ?? colorAt(i)}
          fill-opacity={last === null || last === i ? 1 : 0.55}
          stroke="#fff"
          stroke-width="2"
        />
        {#if s.sweep >= 16}
          {@const p = polar(C, C, R * 0.66, s.start + s.sweep / 2)}
          <text
            x={p.x}
            y={p.y + 5}
            text-anchor="middle"
            font-size="15"
            font-weight="700"
            fill="#fff"
            stroke="#0f172a"
            stroke-width="3"
            stroke-opacity="0.35"
            paint-order="stroke">{sectors[i].label}</text
          >
        {/if}
      {/each}
      <g transform="rotate({angle.current} {C} {C})">
        <path
          d="M {C} {C - R * 0.82} L {C - 9} {C} L {C + 9} {C} Z"
          fill="#0f172a"
          stroke="#fff"
          stroke-width="1.5"
        />
      </g>
      <circle cx={C} cy={C} r="11" fill="#0f172a" stroke="#fff" stroke-width="2" />
    </svg>

    {#if showTable}
      <table class="border-collapse text-sm text-slate-800">
        <thead class="bg-slate-50 text-slate-600">
          <tr>
            <th scope="col" class="border border-slate-200 px-2 py-1 text-left">Kết quả</th>
            <th scope="col" class="border border-slate-200 px-2 py-1 text-right">Số lần</th>
            <th scope="col" class="border border-slate-200 px-2 py-1 text-right">Thực nghiệm</th>
            <th scope="col" class="border border-slate-200 px-2 py-1 text-right">Lí thuyết</th>
          </tr>
        </thead>
        <tbody class="tabular-nums">
          {#each sectors as s, i (i)}
            <tr class={last === i ? 'bg-amber-50' : ''}>
              <th scope="row" class="border border-slate-200 px-2 py-1 text-left font-medium">
                <span
                  class="mr-1 inline-block h-3 w-3 rounded-sm align-middle"
                  style:background-color={s.color ?? colorAt(i)}
                  aria-hidden="true"
                ></span>{s.label}
              </th>
              <td class="border border-slate-200 px-2 py-1 text-right">{tally[i]}</td>
              <td class="border border-slate-200 px-2 py-1 text-right">
                {formatNumber(experimentalProbability(tally[i], trials), 2)}
              </td>
              <td class="border border-slate-200 px-2 py-1 text-right">{theory(weights[i])}</td>
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr class="font-semibold">
            <th scope="row" class="border border-slate-200 px-2 py-1 text-left">Tổng</th>
            <td class="border border-slate-200 px-2 py-1 text-right">{trials}</td>
            <td class="border border-slate-200 px-2 py-1" colspan="2"></td>
          </tr>
        </tfoot>
      </table>
    {/if}
  </div>

  <div class="flex flex-wrap justify-center gap-2">
    <button type="button" class={button.primary} onclick={spin} disabled={spinning}>Quay</button>
    <button type="button" class={button.secondary} onclick={spinTen} disabled={spinning}
      >Quay 10 lần</button
    >
    <button type="button" class={button.quiet} onclick={reset} disabled={spinning || trials === 0}
      >Xoá kết quả</button
    >
  </div>
  <p class="sr-only" aria-live="polite">{announce}</p>
</div>
