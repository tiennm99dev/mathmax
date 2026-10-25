<script>
  import { gcd, lcm, gcdSteps } from '#lib/numtheory-engine/index.js';
  import Tex from '#lib/components/tex.svelte';
  import { button, textInput } from '#lib/core/ui.js';

  let a = $state(48);
  let b = $state(18);
  let stepIdx = $state(0);

  // Keep inputs in the [1, 999] integer range without throwing.
  const aSafe = $derived(Math.max(1, Math.min(999, Math.trunc(Number(a)) || 1)));
  const bSafe = $derived(Math.max(1, Math.min(999, Math.trunc(Number(b)) || 1)));

  const steps = $derived(gcdSteps(aSafe, bSafe));
  const visibleSteps = $derived(steps.slice(0, stepIdx));
  const finished = $derived(stepIdx >= steps.length);
  const result = $derived(finished ? gcd(aSafe, bSafe) : null);
  const lcmValue = $derived(result !== null && result !== 0 ? lcm(aSafe, bSafe) : null);

  // Restart the trace whenever the inputs change.
  $effect(() => {
    void aSafe;
    void bSafe;
    stepIdx = 0;
  });

  const gcdTex = $derived(result !== null ? `\\text{ƯCLN}(${aSafe}, ${bSafe}) = ${result}` : '');
  const lcmTex = $derived(
    lcmValue !== null && result !== null
      ? `\\text{BCNN}(${aSafe}, ${bSafe}) = \\frac{${aSafe} \\cdot ${bSafe}}{${result}} = ${lcmValue}`
      : '',
  );

  function stepOnce() {
    if (stepIdx < steps.length) stepIdx += 1;
  }
  function autoFinish() {
    stepIdx = steps.length;
  }
  function reset() {
    stepIdx = 0;
  }
</script>

<div class="space-y-4">
  <div class="grid grid-cols-2 gap-4">
    <label class="block">
      <span class="text-sm font-semibold text-slate-700">Số thứ nhất (a)</span>
      <input type="number" min="1" max="999" step="1" bind:value={a} class="mt-1 {textInput}" />
    </label>
    <label class="block">
      <span class="text-sm font-semibold text-slate-700">Số thứ hai (b)</span>
      <input type="number" min="1" max="999" step="1" bind:value={b} class="mt-1 {textInput}" />
    </label>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" onclick={stepOnce} disabled={finished} class={button.primary}>Bước</button
    >
    <button type="button" onclick={autoFinish} disabled={finished} class={button.secondary}
      >Tự động</button
    >
    <button type="button" onclick={reset} class={button.quiet}>Khởi động lại</button>
  </div>

  <div class="overflow-x-auto" aria-live="polite">
    <table class="w-full border-collapse text-sm tabular-nums">
      <caption class="pb-2 text-left font-semibold text-slate-700">a = q · b + r</caption>
      <thead>
        <tr class="border-b-2 border-slate-300 text-slate-600">
          <th scope="col" class="px-3 py-2 text-left font-semibold">#</th>
          <th scope="col" class="px-3 py-2 text-right font-semibold">a</th>
          <th scope="col" class="px-3 py-2 text-right font-semibold">q · b</th>
          <th scope="col" class="px-3 py-2 text-right font-semibold">+ r</th>
        </tr>
      </thead>
      <tbody>
        {#each visibleSteps as step, i (i)}
          <tr class="border-b border-slate-200">
            <td class="px-3 py-2 text-slate-500">{i + 1}</td>
            <td class="px-3 py-2 text-right font-semibold text-slate-900">{step.a}</td>
            <td class="px-3 py-2 text-right text-slate-700">= {step.q} · {step.b}</td>
            <td class="px-3 py-2 text-right text-slate-700">+ {step.r}</td>
          </tr>
        {/each}
        {#if visibleSteps.length === 0}
          <tr>
            <td colspan="4" class="px-3 py-4 text-center italic text-slate-500"
              >Nhấn "Bước" để bắt đầu</td
            >
          </tr>
        {/if}
      </tbody>
    </table>
  </div>

  {#if result !== null}
    <div class="rounded-lg border border-emerald-200 bg-emerald-50 p-4" aria-live="polite">
      <p class="mb-2 text-lg font-semibold text-emerald-800">
        ✓ ƯCLN({aSafe}, {bSafe}) = {result}
      </p>
      <div class="overflow-x-auto text-slate-800"><Tex display math={gcdTex} /></div>
      {#if lcmValue !== null}
        <p class="mb-1 mt-2 text-sm font-semibold text-slate-600">BCNN:</p>
        <div class="overflow-x-auto text-slate-800"><Tex display math={lcmTex} /></div>
      {/if}
    </div>
  {/if}
</div>
