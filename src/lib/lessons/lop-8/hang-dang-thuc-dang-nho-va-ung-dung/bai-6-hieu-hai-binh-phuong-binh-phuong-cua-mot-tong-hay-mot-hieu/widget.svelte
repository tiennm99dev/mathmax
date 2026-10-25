<script>
  import Tex from '#lib/components/tex.svelte';
  import SliderField from '#lib/core/slider-field.svelte';

  const U = 18; // px per math unit
  const PAD = 24;
  const PAIR1 = '#D7263D';
  const PAIR2 = '#1B998B';

  let a = $state(5);
  let b = $state(2);

  // Keep b ≤ a; the guard prevents a feedback loop.
  $effect(() => {
    if (b > a) b = a;
  });

  const aSafe = $derived(Math.max(2, Math.min(10, Math.trunc(Number(a)) || 2)));
  const bSafe = $derived(Math.max(1, Math.min(aSafe, Math.trunc(Number(b)) || 1)));

  const aSq = $derived(aSafe * aSafe);
  const bSq = $derived(bSafe * bSafe);
  const diff = $derived(aSq - bSq);
  const product = $derived((aSafe + bSafe) * (aSafe - bSafe));

  // Square diagram: a × a with the b × b corner cut away.
  const sqView = 10 * U + PAD * 2;
  const sqSize = $derived(aSafe * U);
  const cutSize = $derived(bSafe * U);
  const stripH = $derived(bSafe * U);
  const stripW = $derived((aSafe - bSafe) * U);

  // Rectangle diagram: (a + b) × (a − b).
  const rectViewW = 20 * U + PAD * 2;
  const rectViewH = 10 * U + PAD * 2;
  const rectW = $derived((aSafe + bSafe) * U);
  const rectH = $derived((aSafe - bSafe) * U);
  const rectLeftW = $derived(aSafe * U);
  const rectRightW = $derived(bSafe * U);

  const liveTex = $derived(
    `${aSafe}^2 - ${bSafe}^2 = (${aSafe} + ${bSafe})(${aSafe} - ${bSafe}) = ${diff}`,
  );

  const squareLabel = 'Hình vuông a × a, cắt góc vuông b × b';
  const rectLabel = 'Hình chữ nhật (a + b) × (a − b)';
</script>

<div class="space-y-4">
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <SliderField label="Cạnh a" bind:value={a} min={2} max={10} />
    <SliderField label="Cạnh b" bind:value={b} min={1} max={aSafe} />
  </div>

  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <figure class="rounded-lg border border-slate-200 bg-white p-3">
      <figcaption
        class="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500"
      >
        {squareLabel}
      </figcaption>
      <svg viewBox="0 0 {sqView} {sqView}" class="block w-full" role="img" aria-label={squareLabel}>
        {#if stripW > 0}
          <rect
            x={PAD}
            y={PAD}
            width={stripW}
            height={stripH}
            fill={PAIR1}
            fill-opacity="0.55"
            stroke={PAIR1}
            stroke-width="1"
          />
        {/if}
        {#if rectH > 0}
          <rect
            x={PAD}
            y={PAD + stripH}
            width={sqSize}
            height={sqSize - stripH}
            fill={PAIR2}
            fill-opacity="0.55"
            stroke={PAIR2}
            stroke-width="1"
          />
        {/if}
        <rect
          x={PAD + stripW}
          y={PAD}
          width={cutSize}
          height={cutSize}
          fill="white"
          stroke="#94a3b8"
          stroke-width="1"
          stroke-dasharray="4 3"
        />
        <rect
          x={PAD}
          y={PAD}
          width={sqSize}
          height={sqSize}
          fill="none"
          stroke="#1f2937"
          stroke-width="1.5"
        />
        <text
          x={PAD + sqSize / 2}
          y={PAD - 8}
          text-anchor="middle"
          font-size="13"
          fill="#1f2937"
          font-weight="600">a = {aSafe}</text
        >
        <text
          x={PAD - 8}
          y={PAD + sqSize / 2}
          text-anchor="end"
          dominant-baseline="middle"
          font-size="13"
          fill="#1f2937"
          font-weight="600">a</text
        >
        <text
          x={PAD + sqSize + 4}
          y={PAD + cutSize / 2}
          text-anchor="start"
          dominant-baseline="middle"
          font-size="11"
          fill="#64748b">b = {bSafe}</text
        >
      </svg>
    </figure>

    <figure class="rounded-lg border border-slate-200 bg-white p-3">
      <figcaption
        class="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500"
      >
        {rectLabel}
      </figcaption>
      <svg
        viewBox="0 0 {rectViewW} {rectViewH}"
        class="block w-full"
        role="img"
        aria-label={rectLabel}
      >
        {#if rectH > 0}
          <rect
            x={PAD}
            y={PAD}
            width={rectLeftW}
            height={rectH}
            fill={PAIR2}
            fill-opacity="0.55"
            stroke={PAIR2}
            stroke-width="1"
          />
          <rect
            x={PAD + rectLeftW}
            y={PAD}
            width={rectRightW}
            height={rectH}
            fill={PAIR1}
            fill-opacity="0.55"
            stroke={PAIR1}
            stroke-width="1"
          />
          <rect
            x={PAD}
            y={PAD}
            width={rectW}
            height={rectH}
            fill="none"
            stroke="#1f2937"
            stroke-width="1.5"
          />
          <text
            x={PAD + 4}
            y={PAD + rectH + 16}
            text-anchor="start"
            font-size="13"
            fill="#1f2937"
            font-weight="600">a − b = {aSafe - bSafe}</text
          >
        {:else}
          <line
            x1={PAD}
            y1={PAD + 5}
            x2={PAD + rectW}
            y2={PAD + 5}
            stroke="#1f2937"
            stroke-width="1.5"
          />
          <text
            x={PAD + rectW / 2}
            y={PAD + 30}
            text-anchor="middle"
            font-size="12"
            fill="#64748b"
            font-style="italic">a = b nên a − b = 0, diện tích bằng 0</text
          >
        {/if}
        <text
          x={PAD + rectW / 2}
          y={PAD - 8}
          text-anchor="middle"
          font-size="13"
          fill="#1f2937"
          font-weight="600">a + b = {aSafe + bSafe}</text
        >
      </svg>
    </figure>
  </div>

  <p class="text-sm italic text-slate-600">
    Phần hình chữ L (diện tích a² − b²) được cắt dải đỏ ra và ghép sang bên phải thành hình chữ nhật
    (a + b) × (a − b). Hai hình có cùng diện tích.
  </p>

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
    <div class="mb-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm tabular-nums" aria-live="polite">
      <div><span class="font-semibold">a²:</span> {aSq}</div>
      <div><span class="font-semibold">b²:</span> {bSq}</div>
      <div><span class="font-semibold" style="color:{PAIR1}">a² − b²:</span> {diff}</div>
      <div><span class="font-semibold" style="color:{PAIR2}">(a + b)(a − b):</span> {product}</div>
    </div>
    <div class="overflow-x-auto text-slate-800"><Tex display math={liveTex} /></div>
  </div>
</div>
