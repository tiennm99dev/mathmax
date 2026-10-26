<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { focusRing } from '#lib/core/ui.js';
  import PrismView from '../_shared/prism-view.svelte';
  import LateralStrip from '../_shared/lateral-strip.svelte';
  import { dist, faceIds, faceName, measures } from '../_shared/prism-geometry.js';
  import { BASES } from './bases.js';

  let shape = $state(BASES[0].id);
  let h = $state(6);
  let open = $state(0);
  let face = $state('');
  let view = $state({ yaw: -28, pitch: 24 });

  const pick = $derived(BASES.find((b) => b.id === shape) ?? BASES[0]);
  const n = $derived(pick.pts.length);
  const names = $derived(['A', 'B', 'C', 'D'].slice(0, n));
  const m = $derived(measures(pick.pts, h));
  const sides = $derived(
    pick.pts.map((p, i) => ({
      name: `${names[i]}${names[(i + 1) % n]}`,
      len: dist(p, pick.pts[(i + 1) % n]),
    })),
  );
  const activeSide = $derived(face.startsWith('side-') ? Number(face.slice(5)) : -1);
  const kindName = $derived(n === 3 ? 'lăng trụ đứng tam giác' : 'lăng trụ đứng tứ giác');
  const counts = $derived(n === 3 ? '6 · 9 · 5' : '8 · 12 · 6');

  /** @param {string | number} v */
  function choose(v) {
    shape = String(v);
    face = '';
  }

  const feedback = $derived.by(() => {
    let facePart = '';
    if (face === 'bottom' || face === 'top') {
      facePart = `Mặt ${faceName(face, names)} là một mặt đáy: ${pick.name}, diện tích ${fmt(m.S)} cm². `;
    } else if (activeSide >= 0) {
      facePart = `Mặt bên ${faceName(face, names)} là hình chữ nhật ${fmt(sides[activeSide].len)} cm × ${fmt(h)} cm, diện tích ${fmt(sides[activeSide].len * h)} cm². `;
    }
    return (
      facePart +
      `S_xq = C_đáy · h = ${fmt(m.C)} · ${fmt(h)} = ${fmt(m.lateral)} cm². ` +
      `V = S_đáy · h = ${fmt(m.S)} · ${fmt(h)} = ${fmt(m.volume)} cm³.`
    );
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Đáy của hình lăng trụ"
    options={BASES.map((b) => ({ value: b.id, label: b.short }))}
    value={shape}
    onchange={choose}
  />
  <p class="text-sm text-slate-600">Đáy: {pick.name}.</p>

  <PrismView
    base={pick.pts}
    {h}
    t={open}
    bind:view
    {names}
    highlight={face}
    unit={24}
    label="Hình {kindName} {names.join('')}.{names.map((x) => `${x}'`).join('')}, chiều cao {fmt(
      h,
    )} cm"
  />
  <p class="text-xs text-slate-500">
    Kéo hình (hoặc chọn hình rồi dùng phím mũi tên) để xoay. Cạnh khuất vẽ nét đứt.
  </p>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Chiều cao h = AA'" bind:value={h} min={1} max={8} unit="cm" />
    <SliderField
      label="Trải phẳng"
      bind:value={open}
      min={0}
      max={1}
      step={0.05}
      format={(v) => `${Math.round(v * 100)}%`}
    />
  </div>

  <fieldset>
    <legend class="mb-1 text-sm font-semibold text-slate-700">Tô màu một mặt</legend>
    <div class="flex flex-wrap gap-1">
      {#each ['', ...faceIds(n)] as id (id)}
        <button
          type="button"
          class="min-h-11 rounded-lg border px-3 text-sm font-semibold {focusRing} {face === id
            ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
            : 'border-slate-300 bg-white text-slate-700'}"
          aria-pressed={face === id}
          onclick={() => (face = id)}>{id ? faceName(id, names) : 'Không tô'}</button
        >
      {/each}
    </div>
  </fieldset>

  <div class="rounded-xl border border-slate-200 bg-white p-2">
    <p class="px-1 text-sm font-semibold text-slate-700">{n} mặt bên xếp liền nhau</p>
    <LateralStrip {sides} {h} active={activeSide} />
  </div>

  <dl class="grid grid-cols-2 gap-2 text-sm tabular-nums sm:grid-cols-4">
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-600">Đỉnh · cạnh · mặt</dt>
      <dd class="font-semibold">{counts}</dd>
    </div>
    <div class="rounded-lg bg-amber-50 p-2">
      <dt class="text-amber-800">C<sub>đáy</sub> · S<sub>đáy</sub></dt>
      <dd class="font-semibold">{fmt(m.C)} cm · {fmt(m.S)} cm²</dd>
    </div>
    <div class="rounded-lg bg-indigo-50 p-2">
      <dt class="text-indigo-800">S<sub>xq</sub> = C<sub>đáy</sub> · h</dt>
      <dd class="font-semibold">{fmt(m.lateral)} cm²</dd>
    </div>
    <div class="rounded-lg bg-emerald-50 p-2">
      <dt class="text-emerald-800">V = S<sub>đáy</sub> · h</dt>
      <dd class="font-semibold">{fmt(m.volume)} cm³</dd>
    </div>
  </dl>

  <p class="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-950" aria-live="polite">
    {feedback}
  </p>
</div>
