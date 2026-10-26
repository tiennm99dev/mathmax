<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { card as cardClass } from '#lib/core/ui.js';
  import { intText } from '#lib/core/number-format.js';
  import { mono, monoTex, monoText, polyTex, polyText } from '../_shared/poly.js';
  import {
    DIVIDENDS,
    dividend,
    divisionRows,
    largestVars,
    multiplyBack,
    quotSumTex,
    quotTex,
    quotText,
    quotientOf,
  } from './engine.js';

  const COEFS = [-3, -2, -1, 1, 2, 3, 5];

  let preset = $state(0);
  let coef = $state(3);
  let ex = $state(2);
  let ey = $state(2);

  const a = $derived(dividend(preset));
  const b = $derived(mono(coef, { x: ex, y: ey }));
  const rows = $derived(divisionRows(a, b));
  const q = $derived(quotientOf(rows));
  const best = $derived(largestVars(a));
  const isBest = $derived(q !== null && ex === best.x && ey === best.y);
  const failed = $derived(rows.find((r) => !r.ok));

  const note = $derived.by(() => {
    if (q === null) {
      const bad = failed?.checks.find((c) => !c.ok);
      const term = failed ? monoText(failed.term) : '';
      const why = bad
        ? `số mũ của ${bad.name} trong B là ${bad.bottom}, lớn hơn số mũ ${bad.top} của ${bad.name} trong hạng tử đó`
        : 'hạng tử đó không chia hết';
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Hạng tử ${term} không chia hết cho B = ${monoText(b)} vì ${why}. Vậy A không chia hết cho B.`,
      };
    }
    const back = multiplyBack(q, b);
    const ok = polyText(back) === polyText(a);
    const goal = isBest
      ? ' Đây là đơn thức chia có bậc lớn nhất: tăng thêm số mũ nào cũng làm A không còn chia hết cho B.'
      : ' Thử tăng số mũ của B: đến lúc nào thì A không còn chia hết?';
    return {
      tone: /** @type {const} */ ('ok'),
      text: `Mọi hạng tử đều chia hết cho B, nên A chia hết cho B. Thử lại: B nhân với thương ${ok ? 'bằng đúng A' : 'khác A'}.${goal}`,
    };
  });

  /** @param {number} c */
  const coefLabel = (c) => intText(c);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Đa thức bị chia A"
    options={DIVIDENDS.map((_, i) => ({ value: i, label: `Đa thức ${i + 1}` }))}
    bind:value={preset}
    onchange={(v) => (preset = Number(v))}
  />

  <p class="overflow-x-auto text-base text-slate-800">
    <span class="font-semibold">A</span> = <Tex math={polyTex(a)} />
  </p>

  <div class="{cardClass} space-y-3 p-3">
    <p class="text-sm font-semibold text-slate-700">Lập đơn thức chia B</p>
    <SegmentedControl
      label="Hệ số của B"
      options={COEFS.map((c) => ({ value: c, label: coefLabel(c) }))}
      bind:value={coef}
      onchange={(v) => (coef = Number(v))}
    />
    <div class="flex flex-wrap gap-4">
      <Stepper label="Số mũ của x trong B" bind:value={ex} min={0} max={4} />
      <Stepper label="Số mũ của y trong B" bind:value={ey} min={0} max={4} />
    </div>
    <p class="text-base text-slate-800">
      <span class="font-semibold">B</span> = <Tex math={monoTex(b)} />
    </p>
  </div>

  <div class="{cardClass} overflow-x-auto p-3">
    <table class="w-full border-separate border-spacing-y-1 text-left text-sm tabular-nums">
      <caption class="sr-only">Bảng chia từng hạng tử của A cho B = {monoText(b)}</caption>
      <thead>
        <tr class="text-xs text-slate-500">
          <th scope="col" class="px-2 py-1">Hạng tử của A</th>
          <th scope="col" class="px-2 py-1">So sánh số mũ</th>
          <th scope="col" class="px-2 py-1">Thương khi chia cho B</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row, i (i)}
          <tr class={row.ok ? 'bg-emerald-50' : 'bg-rose-50'}>
            <th scope="row" class="rounded-l-lg px-2 py-2 font-normal">
              <Tex math={monoTex(row.term)} />
            </th>
            <td class="px-2 py-2">
              {#if row.checks.length === 0}
                <span class="text-slate-600">B là hằng số khác 0</span>
              {:else}
                <ul class="space-y-0.5">
                  {#each row.checks as c (c.name)}
                    <li class={c.ok ? 'text-emerald-800' : 'font-semibold text-rose-800'}>
                      {c.name}: {c.top}
                      {c.ok ? '≥' : '<'}
                      {c.bottom}
                      <span aria-hidden="true">{c.ok ? '✓' : '✗'}</span>
                      <span class="sr-only">{c.ok ? 'đạt' : 'không đạt'}</span>
                    </li>
                  {/each}
                </ul>
              {/if}
            </td>
            <td class="rounded-r-lg px-2 py-2">
              {#if row.quotient}
                <Tex math={quotTex(row.quotient)} ariaLabel={quotText(row.quotient)} />
              {:else}
                <span class="font-semibold text-rose-800">không chia hết</span>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  {#if q}
    <p class="overflow-x-auto text-base text-slate-800">
      <Tex math={`A : B = ${quotSumTex(q)}`} />
    </p>
  {/if}

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
