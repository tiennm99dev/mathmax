<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import {
    MAX_ICONS,
    SCALES,
    TREES,
    clampIcons,
    stepFor,
    iconParts,
    iconText,
    rowStatus,
  } from './engine.js';

  /** Width of one symbol in the row, in CSS pixels. */
  const ICON = 30;
  const uid = $props.id();

  let scaleKey = $state('5');
  /** @type {number[]} */
  let icons = $state(TREES.map(() => 0));
  let message = $state('Kéo hoặc chạm vào hàng của mỗi lớp để vẽ biểu tượng cây.');

  const scale = $derived(Number(scaleKey));
  const step = $derived(stepFor(scale));
  const rows = $derived(TREES.map((t, i) => ({ ...t, ...rowStatus(icons[i], scale, t.count) })));
  const done = $derived(rows.every((r) => r.ok));

  /** @param {number} i @param {number} next */
  function setIcons(i, next) {
    const v = clampIcons(next, step);
    if (v === icons[i]) return;
    icons[i] = v;
    const r = rowStatus(v, scale, TREES[i].count);
    message = `Lớp ${TREES[i].label}: ${iconText(v)}, ứng với ${r.value} cây. ${r.ok ? 'Khớp với bảng.' : r.text + '.'}`;
  }

  /** @param {PointerEvent} e @param {number} i */
  function fromPointer(e, i) {
    const el = /** @type {HTMLElement} */ (e.currentTarget);
    const x = e.clientX - el.getBoundingClientRect().left;
    // A tap inside a symbol's slot draws up to that symbol (or its half when halves are allowed).
    setIcons(i, Math.ceil(x / ICON / step) * step);
  }

  /** @param {PointerEvent} e @param {number} i */
  function down(e, i) {
    /** @type {HTMLElement} */ (e.currentTarget).setPointerCapture(e.pointerId);
    fromPointer(e, i);
  }

  /** @param {PointerEvent} e @param {number} i */
  function move(e, i) {
    if (/** @type {HTMLElement} */ (e.currentTarget).hasPointerCapture(e.pointerId)) {
      fromPointer(e, i);
    }
  }

  /** @param {KeyboardEvent} e @param {number} i */
  function key(e, i) {
    const steps = { ArrowRight: step, ArrowUp: step, ArrowLeft: -step, ArrowDown: -step };
    if (e.key in steps) setIcons(i, icons[i] + steps[/** @type {keyof typeof steps} */ (e.key)]);
    else if (e.key === 'Home') setIcons(i, 0);
    else if (e.key === 'End') setIcons(i, MAX_ICONS);
    else return;
    e.preventDefault();
  }

  function reset() {
    icons = TREES.map(() => 0);
    message = 'Đã xoá biểu đồ. Vẽ lại từ đầu nhé.';
  }

  /** @param {string} v */
  function scaleChanged(v) {
    icons = icons.map((n) => clampIcons(n, stepFor(Number(v))));
    message = `Bây giờ mỗi biểu tượng ứng với ${v} cây. Các hàng giữ nguyên số biểu tượng, nên số cây thay đổi: hãy vẽ lại cho khớp với bảng.`;
  }
</script>

{#snippet tree(/** @type {number} */ part, /** @type {string} */ id)}
  <svg width={ICON} height={ICON} viewBox="0 0 34 34" aria-hidden="true">
    {#if part < 1}
      <clipPath {id}><rect x="0" y="0" width="17" height="34" /></clipPath>
    {/if}
    <g clip-path={part < 1 ? `url(#${id})` : undefined}>
      <rect x="14" y="20" width="6" height="12" rx="1" fill="#92400E" />
      <circle cx="17" cy="14" r="11" fill="#16A34A" />
      <circle cx="12" cy="11" r="4" fill="#4ADE80" />
    </g>
  </svg>
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Mỗi biểu tượng cây ứng với"
    options={SCALES.map((s) => ({ value: String(s), label: `${s} cây` }))}
    bind:value={scaleKey}
    onchange={(v) => scaleChanged(String(v))}
  />

  <div class="overflow-hidden rounded-lg border border-slate-300">
    <p class="bg-slate-100 px-3 py-2 text-center text-sm font-semibold text-slate-800">
      Số cây trồng được của các lớp khối 6
    </p>
    {#each rows as r, i (r.label)}
      <div class="flex items-center gap-2 border-t border-slate-200 px-2 py-1">
        <span class="w-9 shrink-0 text-sm font-bold text-slate-800">{r.label}</span>
        <div
          role="slider"
          tabindex="0"
          aria-label="Hàng biểu tượng của lớp {r.label}"
          aria-valuemin={0}
          aria-valuemax={MAX_ICONS}
          aria-valuenow={icons[i]}
          aria-valuetext="{iconText(icons[i])}, {r.value} cây"
          class="relative h-10 shrink-0 cursor-pointer rounded-md bg-slate-50 {focusRing}"
          style:width="{ICON * MAX_ICONS}px"
          style:touch-action="none"
          onpointerdown={(e) => down(e, i)}
          onpointermove={(e) => move(e, i)}
          onkeydown={(e) => key(e, i)}
        >
          <div class="pointer-events-none flex h-full items-center">
            {#each iconParts(icons[i]) as part, k (k)}
              {@render tree(part, `${uid}-${i}-${k}`)}
            {/each}
          </div>
          <div
            class="pointer-events-none absolute inset-0 rounded-md border border-dashed border-slate-300"
          ></div>
        </div>
      </div>
    {/each}
    <p class="border-t border-slate-200 px-3 py-2 text-xs text-slate-600">
      Chú thích: mỗi biểu tượng cây ứng với {scale} cây{step < 1
        ? `, nửa biểu tượng ứng với ${scale / 2} cây`
        : ''}.
    </p>
  </div>

  <table class="w-full border-collapse text-sm">
    <caption class="pb-1 text-left font-semibold text-slate-700">
      Bảng thống kê và số cây theo biểu đồ của em
    </caption>
    <thead>
      <tr class="bg-slate-100">
        <th class="border border-slate-200 px-2 py-1 text-left">Lớp</th>
        <th class="border border-slate-200 px-2 py-1">Số cây (bảng)</th>
        <th class="border border-slate-200 px-2 py-1">Theo biểu đồ</th>
        <th class="border border-slate-200 px-2 py-1 text-left">Nhận xét</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as r (r.label)}
        <tr>
          <td class="border border-slate-200 px-2 py-1 font-semibold">{r.label}</td>
          <td class="border border-slate-200 px-2 py-1 text-center tabular-nums">{r.count}</td>
          <td class="border border-slate-200 px-2 py-1 text-center tabular-nums"
            >{formatNumber(r.value)}</td
          >
          <td
            class="border border-slate-200 px-2 py-1 {r.ok ? 'text-emerald-700' : 'text-slate-600'}"
            >{r.text}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>

  <p
    class="rounded-lg border p-3 text-sm {done
      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
      : 'border-slate-200 bg-slate-50 text-slate-900'}"
    aria-live="polite"
  >
    {done
      ? `Biểu đồ tranh đã khớp với bảng thống kê. Với ${scale} cây mỗi biểu tượng, lớp 6D cần ${iconText(30 / scale)}. Thử đổi số cây ứng với một biểu tượng xem số biểu tượng thay đổi thế nào.`
      : message}
  </p>

  <button type="button" class={button.quiet} onclick={reset}>Xoá biểu đồ</button>
</div>
