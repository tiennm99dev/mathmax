<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { focusRing } from '#lib/core/ui.js';
  import PrismView from '../_shared/prism-view.svelte';
  import LateralStrip from '../_shared/lateral-strip.svelte';
  import { faceIds, faceName, measures, rectBase } from '../_shared/prism-geometry.js';

  const NAMES = ['A', 'B', 'C', 'D'];

  let shape = $state(/** @type {string | number} */ ('box'));
  let a = $state(5);
  let b = $state(3);
  let c = $state(4);
  let edge = $state(3);
  let open = $state(0);
  let grid = $state(false);
  let face = $state('');
  let view = $state({ yaw: -28, pitch: 24 });

  const isCube = $derived(shape === 'cube');
  const da = $derived(isCube ? edge : a);
  const db = $derived(isCube ? edge : b);
  const dc = $derived(isCube ? edge : c);
  const base = $derived(rectBase(da, db));
  const m = $derived(measures(base, dc));
  const sides = $derived(
    NAMES.map((n, i) => ({ name: `${n}${NAMES[(i + 1) % 4]}`, len: i % 2 ? db : da })),
  );
  const activeSide = $derived(face.startsWith('side-') ? Number(face.slice(5)) : -1);

  /** Size of a face from its id, as "dài × rộng". */
  const faceSize = $derived.by(() => {
    if (!face) return '';
    if (face === 'bottom' || face === 'top') return `${fmt(da)} cm × ${fmt(db)} cm`;
    return `${fmt(activeSide % 2 ? db : da)} cm × ${fmt(dc)} cm`;
  });

  const feedback = $derived.by(() => {
    const name = face ? faceName(face, NAMES) : '';
    const facePart = face
      ? `Mặt ${name} là ${isCube ? 'hình vuông' : 'hình chữ nhật'} ${faceSize}${face === 'bottom' || face === 'top' ? ' (một mặt đáy)' : ' (một mặt bên)'}. `
      : '';
    const openPart =
      open >= 1
        ? 'Hình đã trải phẳng: sáu mặt nằm trên một mặt phẳng, đó là một hình khai triển. '
        : open > 0
          ? 'Các mặt bên đang mở ra quanh mặt đáy. '
          : '';
    const volPart = isCube
      ? `Thể tích V = a³ = ${fmt(edge)}³ = ${fmt(m.volume)} cm³.`
      : `Thể tích V = a · b · c = ${fmt(a)} · ${fmt(b)} · ${fmt(c)} = ${fmt(m.volume)} cm³${grid ? `: ${fmt(c)} lớp, mỗi lớp ${fmt(a * b)} hình lập phương cạnh 1 cm` : ''}.`;
    return facePart + openPart + volPart;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Loại hình"
    options={[
      { value: 'box', label: 'Hình hộp chữ nhật' },
      { value: 'cube', label: 'Hình lập phương' },
    ]}
    bind:value={shape}
  />

  <PrismView
    {base}
    h={dc}
    t={open}
    bind:view
    names={NAMES}
    highlight={face}
    {grid}
    label="{isCube ? 'Hình lập phương' : 'Hình hộp chữ nhật'} ABCD.A'B'C'D' kích thước {fmt(
      da,
    )} cm, {fmt(db)} cm, {fmt(dc)} cm"
  />
  <p class="text-xs text-slate-500">
    Kéo hình (hoặc chọn hình rồi dùng phím mũi tên) để xoay. Cạnh khuất vẽ nét đứt.
  </p>

  <div class="grid gap-3 sm:grid-cols-2">
    {#if isCube}
      <SliderField label="Cạnh a" bind:value={edge} min={1} max={6} unit="cm" />
    {:else}
      <SliderField label="Chiều dài a = AB" bind:value={a} min={1} max={6} unit="cm" />
      <SliderField label="Chiều rộng b = BC" bind:value={b} min={1} max={6} unit="cm" />
      <SliderField label="Chiều cao c = AA'" bind:value={c} min={1} max={6} unit="cm" />
    {/if}
    <SliderField
      label="Trải phẳng"
      bind:value={open}
      min={0}
      max={1}
      step={0.05}
      format={(v) => `${Math.round(v * 100)}%`}
    />
  </div>

  <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
    <input type="checkbox" class="size-5 accent-indigo-600 {focusRing}" bind:checked={grid} />
    Chia các mặt thành ô vuông cạnh 1 cm
  </label>

  <fieldset>
    <legend class="mb-1 text-sm font-semibold text-slate-700">Tô màu một mặt</legend>
    <div class="flex flex-wrap gap-1">
      {#each ['', ...faceIds(4)] as id (id)}
        <button
          type="button"
          class="min-h-11 rounded-lg border px-3 text-sm font-semibold {focusRing} {face === id
            ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
            : 'border-slate-300 bg-white text-slate-700'}"
          aria-pressed={face === id}
          onclick={() => (face = id)}>{id ? faceName(id, NAMES) : 'Không tô'}</button
        >
      {/each}
    </div>
  </fieldset>

  <div class="rounded-xl border border-slate-200 bg-white p-2">
    <p class="px-1 text-sm font-semibold text-slate-700">Bốn mặt bên xếp liền nhau</p>
    <LateralStrip {sides} h={dc} active={activeSide} />
  </div>

  <dl class="grid grid-cols-2 gap-2 text-sm tabular-nums sm:grid-cols-4">
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-600">Đỉnh · cạnh · mặt</dt>
      <dd class="font-semibold">8 · 12 · 6</dd>
    </div>
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-600">Đường chéo</dt>
      <dd class="font-semibold">AC', BD', CA', DB'</dd>
    </div>
    <div class="rounded-lg bg-indigo-50 p-2">
      <dt class="text-indigo-800">S<sub>xq</sub></dt>
      <dd class="font-semibold">
        {isCube
          ? `4 · ${fmt(edge)}² = ${fmt(m.lateral)} cm²`
          : `2 · (${fmt(a)} + ${fmt(b)}) · ${fmt(c)} = ${fmt(m.lateral)} cm²`}
      </dd>
    </div>
    <div class="rounded-lg bg-amber-50 p-2">
      <dt class="text-amber-800">V</dt>
      <dd class="font-semibold">{fmt(m.volume)} cm³</dd>
    </div>
  </dl>

  <p class="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-950" aria-live="polite">
    {feedback}
  </p>
</div>
