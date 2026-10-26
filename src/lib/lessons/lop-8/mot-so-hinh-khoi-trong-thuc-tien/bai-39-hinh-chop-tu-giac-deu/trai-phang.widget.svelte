<script>
  import SliderField from '#lib/core/slider-field.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import PyramidView from '../_shared/pyramid-view.svelte';
  import { num, pyramidMeasures } from '../_shared/pyramid-geometry.js';

  const NAMES = ['A', 'B', 'C', 'D'];

  let a = $state(6);
  let h = $state(4);
  let open = $state(0);
  let lines = $state(true);
  let view = $state({ yaw: -25, pitch: 18 });

  const m = $derived(pyramidMeasures(4, a, h));
  const exact = $derived(Math.abs(m.d - Math.round(m.d)) < 1e-9);
  const approx = $derived(exact ? '=' : '≈');

  const feedback = $derived(
    `Tam giác SHI vuông tại H: SI² = SH² + HI² = ${num(h)}² + ${num(a / 2)}², nên d = SI ${approx} ${num(m.d)} cm. ` +
      `Bốn mặt bên là bốn tam giác cân bằng nhau, mỗi tam giác có diện tích ½ · ${num(a)} · ${num(m.d)} ${approx} ${num((a * m.d) / 2)} cm². ` +
      `S_xq = p · d = ${num(m.p)} · ${num(m.d)} ${approx} ${num(m.lateral)} cm²; S_tp = S_xq + a² ${approx} ${num(m.total)} cm².` +
      (open > 0.98
        ? ' Lưới gồm hình vuông đáy và bốn tam giác cân dựng trên bốn cạnh của nó.'
        : ''),
  );
</script>

<div class="space-y-4">
  <PyramidView
    n={4}
    {a}
    {h}
    t={open}
    bind:view
    names={NAMES}
    {lines}
    maxSide={8}
    maxHeight={10}
    label="Hình chóp tứ giác đều S.ABCD, cạnh đáy {num(a)} cm, chiều cao {num(h)} cm"
  />
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Cạnh đáy a" bind:value={a} min={2} max={8} step={2} unit="cm" />
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
  <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
    <input type="checkbox" class="h-5 w-5 accent-indigo-600 {focusRing}" bind:checked={lines} />
    Hiện đường cao SH và trung đoạn SI
  </label>
  <p class="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-950" aria-live="polite">
    {feedback}
  </p>
</div>
