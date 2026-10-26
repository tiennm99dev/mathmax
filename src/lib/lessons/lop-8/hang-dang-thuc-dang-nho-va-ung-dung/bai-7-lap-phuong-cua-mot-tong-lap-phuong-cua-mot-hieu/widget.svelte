<script>
  import Tex from '#lib/components/tex.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { intText } from '#lib/core/number-format.js';
  import { KINDS, boxes, faces, project, termOf, viewBox } from './engine.js';

  /** @typedef {import('./engine.js').Kind} Kind */

  const S = 22; // px per unit
  const PAD = 50;
  const GAP = 1.4; // how far the pieces move apart, in units

  /** @type {Record<Kind, { color: string, label: string, tex: string, name: string }>} */
  const INFO = {
    a3: { color: '#D7263D', label: 'a³', tex: 'a^3', name: 'khối lập phương cạnh a' },
    a2b: { color: '#2E86DE', label: '3a²b', tex: '3a^2b', name: 'khối hộp a × a × b' },
    ab2: { color: '#1B998B', label: '3ab²', tex: '3ab^2', name: 'khối hộp a × b × b' },
    b3: { color: '#F4A261', label: 'b³', tex: 'b^3', name: 'khối lập phương cạnh b' },
  };

  let a = $state(3);
  let b = $state(2);
  let apart = $state(false);
  /** @type {string | number} */
  let choice = $state('all');
  const focus = $derived(/** @type {'all' | Kind} */ (choice));

  const list = $derived(boxes(a, b, apart ? GAP : 0));
  const side = $derived(a + b + (apart ? GAP : 0));
  const box = $derived(viewBox(side, S, PAD));

  const terms = $derived(KINDS.map((k) => ({ kind: k, ...termOf(k, a, b) })));
  const cube = $derived((a + b) ** 3);

  const options = [
    { value: 'all', label: 'Tất cả' },
    ...KINDS.map((k) => ({ value: k, label: INFO[k].label })),
  ];

  /**
   * Lighter and darker shades of a colour for the three faces.
   * @param {string} hex
   * @param {number} f below 1 darkens, above 1 lightens
   */
  function shade(hex, f) {
    const n = parseInt(hex.slice(1), 16);
    const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
      Math.max(0, Math.min(255, Math.round(f > 1 ? c + (255 - c) * (f - 1) : c * f))),
    );
    return `rgb(${ch.join(',')})`;
  }

  // Edge labels along the front-bottom edge (y = full side, z = 0).
  const labelA = $derived(project(a / 2, side, 0, S));
  const labelB = $derived(project(side - b / 2, side, 0, S));

  const focusText = $derived.by(() => {
    if (focus === 'all') {
      return `Tám khối có tổng thể tích ${intText(terms.reduce((s, t) => s + t.total, 0))}, đúng bằng (a + b)³ = ${a + b}³ = ${intText(cube)}.`;
    }
    const t = termOf(focus, a, b);
    return `${t.count === 1 ? 'Một' : 'Ba'} ${INFO[focus].name}, mỗi khối có thể tích ${intText(t.volume)}; cộng lại được ${INFO[focus].label} = ${intText(t.total)}.`;
  });

  const sumTex = $derived(
    `(${a} + ${b})^3 = ${a}^3 + 3 \\cdot ${a}^2 \\cdot ${b} + 3 \\cdot ${a} \\cdot ${b}^2 + ${b}^3 = ${terms.map((t) => t.total).join(' + ')} = ${cube}`,
  );
  const diffTex = $derived.by(() => {
    const [t1, t2, t3, t4] = terms.map((t) => t.total);
    const v = t1 - t2 + t3 - t4;
    return `(${a} - ${b})^3 = ${t1} - ${t2} + ${t3} - ${t4} = ${v}`;
  });
</script>

<div class="space-y-4">
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <SliderField label="Cạnh a" bind:value={a} min={1} max={5} />
    <SliderField label="Cạnh b" bind:value={b} min={1} max={4} />
  </div>

  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl label="Tô sáng nhóm khối" {options} bind:value={choice} />
    <button
      type="button"
      class={button.secondary}
      aria-pressed={apart}
      onclick={() => (apart = !apart)}
    >
      {apart ? 'Ghép lại thành khối lập phương' : 'Tách thành 8 khối'}
    </button>
  </div>

  <figure class="rounded-lg border border-slate-200 bg-white p-3">
    <svg
      viewBox={box}
      class="mx-auto block max-h-[26rem] w-full"
      role="img"
      aria-label="Khối lập phương cạnh a + b = {a +
        b} chia thành 8 khối: 1 khối a³, 3 khối a²b, 3 khối ab², 1 khối b³{apart
        ? ', đang tách rời'
        : ''}"
    >
      {#each list as bx (bx.id)}
        {@const f = faces(bx, S)}
        {@const c = INFO[bx.kind].color}
        {@const dim = focus !== 'all' && focus !== bx.kind}
        <g opacity={dim ? 0.18 : 1} style="transition: opacity 0.2s">
          <polygon points={f.top} fill={shade(c, 1.35)} stroke="#1f2937" stroke-width="1" />
          <polygon points={f.right} fill={shade(c, 0.95)} stroke="#1f2937" stroke-width="1" />
          <polygon points={f.left} fill={shade(c, 0.72)} stroke="#1f2937" stroke-width="1" />
        </g>
      {/each}
      <text
        x={labelA[0] - 10}
        y={labelA[1] + 18}
        text-anchor="end"
        font-size="14"
        font-weight="700"
        fill="#1f2937">a = {a}</text
      >
      <text
        x={labelB[0] - 10}
        y={labelB[1] + 18}
        text-anchor="end"
        font-size="14"
        font-weight="700"
        fill="#1f2937">b = {b}</text
      >
    </svg>
  </figure>

  <ul class="grid grid-cols-2 gap-2 text-sm tabular-nums sm:grid-cols-4">
    {#each terms as t (t.kind)}
      <li class="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
        <span
          class="inline-block h-4 w-4 shrink-0 rounded-sm"
          style="background:{INFO[t.kind].color}"
          aria-hidden="true"
        ></span>
        <span><span class="font-semibold">{INFO[t.kind].label}</span> = {intText(t.total)}</span>
      </li>
    {/each}
  </ul>

  <p
    class="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
    aria-live="polite"
  >
    {focusText}
  </p>

  <div
    class="space-y-1 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-800"
  >
    <Tex display math={sumTex} />
    <p class="text-sm text-slate-600">
      Đổi dấu các hạng tử chứa b mũ lẻ, ta được lập phương của một hiệu với cùng a, b:
    </p>
    <Tex display math={diffTex} />
  </div>
</div>
