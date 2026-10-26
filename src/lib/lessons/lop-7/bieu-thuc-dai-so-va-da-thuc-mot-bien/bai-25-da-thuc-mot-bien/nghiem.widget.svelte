<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { evaluate, numTex, polyText, substituteTex } from '#lib/algebra-engine/polynomial.js';
  import { ROOT_PRESETS } from './engine.js';

  const W = 340;
  const H = 260;
  const PAD = 24;
  const X_MIN = -3.5;
  const X_MAX = 3.5;
  const Y_MIN = -6;
  const Y_MAX = 10;
  /** @param {number} x */
  const sx = (x) => PAD + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - 2 * PAD);
  /** @param {number} y */
  const sy = (y) =>
    PAD + ((Y_MAX - Math.max(Y_MIN - 1, Math.min(Y_MAX + 1, y))) / (Y_MAX - Y_MIN)) * (H - 2 * PAD);

  let presetId = $state(ROOT_PRESETS[0].id);
  let a = $state(1);
  /** @type {Record<string, number[]>} */
  let found = $state({});

  const preset = $derived(ROOT_PRESETS.find((p) => p.id === presetId) ?? ROOT_PRESETS[0]);
  const value = $derived(evaluate(preset.p, a));
  const isRoot = $derived(value === 0);
  const mine = $derived(found[preset.id] ?? []);
  const path = $derived(
    Array.from({ length: 141 }, (_, i) => {
      const x = X_MIN + (i * (X_MAX - X_MIN)) / 140;
      return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(evaluate(preset.p, x)).toFixed(1)}`;
    }).join(' '),
  );
  const substitution = $derived(
    `P(${numTex(a)}) = ${substituteTex(preset.p, a)} = ${numTex(value)}`,
  );
  const uid = $props.id();
  const clipId = `${uid}-clip`;

  $effect(() => {
    if (isRoot && !mine.includes(a)) {
      found[preset.id] = [...mine, a].sort((p, q) => p - q);
    }
  });

  const foundText = $derived(
    mine.length === 0 ? 'chưa có' : mine.map((r) => formatNumber(r)).join('; '),
  );
  const note = $derived(
    preset.roots.length === 0
      ? ' (đồ thị không cắt trục hoành: đa thức này không có nghiệm)'
      : mine.length === preset.roots.length
        ? ` (đủ cả ${preset.roots.length} nghiệm)`
        : '',
  );

  const ticks = [-3, -2, -1, 1, 2, 3];
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn đa thức P(x)"
    options={ROOT_PRESETS.map((p) => ({ value: p.id, label: polyText(p.p) }))}
    bind:value={presetId}
  />
  <SliderField
    label="Giá trị thử x = a"
    bind:value={a}
    min={-3}
    max={3}
    step={0.5}
    format={(v) => formatNumber(v)}
  />

  <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white p-3 text-center text-lg">
    <Tex math={substitution} />
  </div>

  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-md"
    role="img"
    aria-label="Đồ thị các giá trị của P(x) = {polyText(preset.p)}; điểm đang thử x = {formatNumber(
      a,
    )}, P = {formatNumber(value)}"
  >
    <line x1={PAD} x2={W - PAD} y1={sy(0)} y2={sy(0)} stroke="#334155" stroke-width="1.5" />
    <line x1={sx(0)} x2={sx(0)} y1={PAD} y2={H - PAD} stroke="#334155" stroke-width="1.5" />
    {#each ticks as t (t)}
      <line x1={sx(t)} x2={sx(t)} y1={sy(0) - 3} y2={sy(0) + 3} stroke="#334155" />
      <text x={sx(t)} y={sy(0) + 15} font-size="10" text-anchor="middle" fill="#64748B"
        >{formatNumber(t)}</text
      >
    {/each}
    <text x={W - PAD + 4} y={sy(0) + 4} font-size="12" fill="#334155">x</text>
    <clipPath id={clipId}
      ><rect x={PAD} y={PAD} width={W - 2 * PAD} height={H - 2 * PAD} /></clipPath
    >
    <path d={path} fill="none" stroke="#4F46E5" stroke-width="2" clip-path="url(#{clipId})" />
    {#each mine as r (r)}
      <circle cx={sx(r)} cy={sy(0)} r="6" fill="#059669" />
    {/each}
    <line x1={sx(a)} x2={sx(a)} y1={sy(0)} y2={sy(value)} stroke="#D97706" stroke-dasharray="4 3" />
    <circle
      cx={sx(a)}
      cy={sy(value)}
      r="6"
      fill={isRoot ? '#059669' : '#D97706'}
      stroke="white"
      stroke-width="2"
    />
  </svg>

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4" aria-live="polite">
    {#if isRoot}
      <p class="font-semibold text-emerald-700">
        P({formatNumber(a)}) = 0, nên x = {formatNumber(a)} là một nghiệm của đa thức P(x). Điểm nằm đúng
        trên trục hoành.
      </p>
    {:else}
      <p class="font-semibold text-amber-800">
        P({formatNumber(a)}) = {formatNumber(value)} ≠ 0, nên {formatNumber(a)} không phải là nghiệm.
      </p>
    {/if}
    <p class="mt-1 text-slate-700">
      Nghiệm đã tìm được: {foundText}{note}.
    </p>
  </div>
</div>
