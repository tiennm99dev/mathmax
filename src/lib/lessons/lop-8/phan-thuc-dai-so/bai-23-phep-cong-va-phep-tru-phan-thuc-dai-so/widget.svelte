<script>
  import Tex from '#lib/components/tex.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { polyTex, polyText } from '#lib/algebra-engine/polynomial.js';
  import { checkCommon, denPoly, denTex, denText } from '../_shared/factors.js';
  import { PRESETS, baseFactors, combine, expressionTex, fracTex } from './engine.js';

  const options = PRESETS.map((_, i) => ({ value: i, label: `Phép tính ${i + 1}` }));

  /** @type {string | number} */
  let choice = $state(0);
  let coef = $state(1);
  /** @type {number[]} */
  let exps = $state(baseFactors(PRESETS[0]).map(() => 0));

  const terms = $derived(PRESETS[Number(choice)]);
  const bases = $derived(baseFactors(terms));
  const proposal = $derived({
    coef,
    parts: bases.map((f, i) => ({ f, exp: exps[i] ?? 0 })),
  });
  const verdict = $derived(
    checkCommon(
      terms.map((t) => t.bottom),
      proposal,
    ),
  );
  const done = $derived(combine(terms));
  const raw = $derived(fracTex(done.sum, done.common));
  const reduced = $derived(fracTex(done.result.top, done.result.bottom));
  const sameDen = $derived(terms.every((t) => denTex(t.bottom) === denTex(terms[0].bottom)));

  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  const feedback = $derived.by(() => {
    if (verdict.status === 'low') {
      const d = terms[verdict.index].bottom;
      return {
        tone: 'warn',
        text: `${denText(proposal)} chưa chia hết cho mẫu ${denText(d)} của phân thức thứ ${verdict.index + 1}. Hãy tăng hệ số hoặc số mũ.`,
      };
    }
    if (verdict.status === 'high') {
      return {
        tone: 'info',
        text: `${denText(proposal)} chia hết cho mọi mẫu, nhưng chưa phải mẫu thức chung đơn giản nhất. Hãy bớt hệ số hoặc số mũ thừa.`,
      };
    }
    return {
      tone: 'ok',
      text: sameDen
        ? `Đúng! Các phân thức đã cùng mẫu ${denText(proposal)}: chỉ cần cộng, trừ các tử thức.`
        : `Đúng! MTC = ${denText(proposal)}. Xem nhân tử phụ và các tử thức mới bên dưới.`,
    };
  });

  function changePreset() {
    coef = 1;
    exps = baseFactors(PRESETS[Number(choice)]).map(() => 0);
  }
</script>

<div class="space-y-4">
  <SegmentedControl label="Chọn phép tính" {options} bind:value={choice} onchange={changePreset} />

  <p class="overflow-x-auto text-center text-xl"><Tex math={expressionTex(terms)} display /></p>

  <div class="rounded-xl border border-slate-200 bg-white p-3 text-sm">
    <p class="mb-1 font-semibold text-slate-700">Bước 1. Phân tích các mẫu thành nhân tử</p>
    <ul class="space-y-1">
      {#each terms as t, i (i)}
        {@const given = polyTex(denPoly(t.bottom))}
        <li>
          Mẫu {i + 1}: <Tex
            math={given === denTex(t.bottom) ? given : `${given} = ${denTex(t.bottom)}`}
          />
        </li>
      {/each}
    </ul>
  </div>

  <div class="space-y-3 rounded-xl border border-slate-200 bg-white p-3">
    <p class="text-sm font-semibold text-slate-700">Bước 2. Lập mẫu thức chung từ các nhân tử</p>
    <div class="flex flex-wrap gap-4">
      <Stepper label="Hệ số" bind:value={coef} min={1} max={24} />
      {#each bases as f, i (f.key)}
        <Stepper label="Số mũ của {polyText(f.poly)}" bind:value={exps[i]} min={0} max={3} />
      {/each}
    </div>
    <p class="text-lg">MTC = <Tex math={denTex(proposal)} /></p>
    <FeedbackNote tone={feedback.tone} text={feedback.text} />
  </div>

  {#if verdict.status === 'ok'}
    <div class="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/40 p-3 text-sm">
      <p class="font-semibold text-emerald-900">Bước 3. Nhân tử phụ, rồi cộng (trừ) các tử thức</p>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="border-b border-slate-300">
              <th class="p-2">Mẫu</th>
              <th class="p-2">Nhân tử phụ</th>
              <th class="p-2">Tử thức mới</th>
            </tr>
          </thead>
          <tbody>
            {#each terms as t, i (i)}
              <tr class="border-b border-slate-200">
                <td class="whitespace-nowrap p-2"><Tex math={denTex(t.bottom)} /></td>
                <td class="whitespace-nowrap p-2"><Tex math={denTex(done.rows[i].extra)} /></td>
                <td class="whitespace-nowrap p-2"><Tex math={polyTex(done.rows[i].top)} /></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div class="overflow-x-auto text-base">
        <Tex
          math={`${expressionTex(terms)} = \\dfrac{${done.steps}}{${denTex(done.common)}}`}
          display
        />
        <Tex math={`= ${raw}`} display />
      </div>
      {#if reduced !== raw}
        <p>Tử và mẫu còn nhân tử chung, rút gọn:</p>
        <div class="overflow-x-auto text-base"><Tex math={`= ${reduced}`} display /></div>
      {:else}
        <p>Tử và mẫu không còn nhân tử chung: đây là kết quả cuối cùng.</p>
      {/if}
    </div>
  {/if}
</div>
