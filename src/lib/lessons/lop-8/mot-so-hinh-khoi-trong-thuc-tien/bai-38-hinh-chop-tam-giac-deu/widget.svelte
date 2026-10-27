<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import PyramidView from '../_shared/pyramid-view.svelte';
  import { faceName, num, pyramidMeasures } from '../_shared/pyramid-geometry.js';

  const NAMES = ['A', 'B', 'C'];
  const FACES = ['side-0', 'side-1', 'side-2', 'bottom'];

  let a = $state(6);
  let h = $state(5);
  let open = $state(0);
  let lines = $state(true);
  let face = $state('');
  let view = $state({ yaw: -20, pitch: 18 });

  const m = $derived(pyramidMeasures(3, a, h));
  const one = $derived((a * m.d) / 2);

  const feedback = $derived.by(() => {
    let part = '';
    if (face === 'bottom') {
      part = `Mặt đáy ABC là tam giác đều cạnh ${num(a)} cm, diện tích khoảng ${num(m.S)} cm². `;
    } else if (face) {
      part = `Mặt bên ${faceName(face, NAMES)} là tam giác cân, đáy ${num(a)} cm, đường cao (trung đoạn) d ≈ ${num(m.d)} cm, diện tích ½ · ${num(a)} · ${num(m.d)} ≈ ${num(one)} cm². `;
    }
    if (open > 0.98) {
      part += `Lưới trải phẳng: tam giác đáy cùng ba tam giác cân bằng nhau. Ba mặt bên có tổng diện tích 3 · ½ · a · d = p · d. `;
    }
    return (
      part +
      `p = ${num(m.perimeter)} : 2 = ${num(m.p)} cm; $S_{xq}$ = p · d ≈ ${num(m.p)} · ${num(m.d)} ≈ ${num(m.lateral)} cm². ` +
      `V = ⅓ · S · h ≈ ⅓ · ${num(m.S)} · ${num(h)} ≈ ${num(m.volume)} cm³.`
    );
  });
</script>

<div class="space-y-4">
  <PyramidView
    n={3}
    {a}
    {h}
    t={open}
    bind:view
    names={NAMES}
    highlight={face}
    {lines}
    maxSide={8}
    maxHeight={10}
    label="Hình chóp tam giác đều S.ABC, cạnh đáy {num(a)} cm, chiều cao {num(h)} cm"
  />
  <p class="text-xs text-slate-500">
    Kéo hình (hoặc chọn hình rồi dùng phím mũi tên) để xoay. Cạnh khuất vẽ nét đứt; SH (đỏ) là đường
    cao, SI (xanh lá) là trung đoạn.
  </p>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Cạnh đáy a" bind:value={a} min={2} max={8} unit="cm" />
    <SliderField label="Chiều cao h = SH" bind:value={h} min={2} max={10} unit="cm" />
    <SliderField
      label="Trải phẳng"
      bind:value={open}
      min={0}
      max={1}
      step={0.05}
      format={(v) => `${Math.round(v * 100)}%`}
    />
  </div>

  <div class="flex flex-wrap items-center gap-2">
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="h-5 w-5 accent-indigo-600 {focusRing}" bind:checked={lines} />
      Hiện đường cao SH và trung đoạn SI
    </label>
  </div>

  <fieldset>
    <legend class="mb-1 text-sm font-semibold text-slate-700">Tô màu một mặt</legend>
    <div class="flex flex-wrap gap-1">
      {#each ['', ...FACES] as id (id)}
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

  <dl class="grid grid-cols-2 gap-2 text-sm tabular-nums sm:grid-cols-4">
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-600">Cạnh bên SA</dt>
      <dd class="font-semibold">≈ {num(m.edge)} cm</dd>
    </div>
    <div class="rounded-lg bg-emerald-50 p-2">
      <dt class="text-emerald-800">Trung đoạn d = SI</dt>
      <dd class="font-semibold">≈ {num(m.d)} cm</dd>
    </div>
    <div class="rounded-lg bg-indigo-50 p-2">
      <dt class="text-indigo-800">S<sub>xq</sub> = p · d</dt>
      <dd class="font-semibold">≈ {num(m.lateral)} cm²</dd>
    </div>
    <div class="rounded-lg bg-amber-50 p-2">
      <dt class="text-amber-800">V = ⅓ · S · h</dt>
      <dd class="font-semibold">≈ {num(m.volume)} cm³</dd>
    </div>
  </dl>

  <p class="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-950" aria-live="polite">
    <LiveRichText text={feedback} />
  </p>
</div>
