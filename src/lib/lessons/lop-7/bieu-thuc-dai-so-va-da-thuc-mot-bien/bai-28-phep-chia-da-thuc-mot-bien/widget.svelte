<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { polyTex, polyText, termTex, termsOf } from '#lib/algebra-engine/polynomial.js';
  import { longDivide, numberDivide } from '#lib/algebra-engine/long-division.js';
  import { ACTIONS, PRESETS, numberNarration, polyNarration, shownIn } from './engine.js';

  const START =
    'Bấm “Bước tiếp” để thực hiện từng thao tác: chia, nhân, trừ. Hai phép chia bên dưới đi cùng nhịp.';

  let id = $state(PRESETS[0].id);
  let step = $state(0);

  const preset = $derived(PRESETS.find((x) => x.id === id) ?? PRESETS[0]);
  const pd = $derived(longDivide(preset.p, preset.q));
  const nd = $derived(numberDivide(preset.a, preset.b));
  const total = $derived(3 * pd.rounds.length);
  const top = $derived(preset.p.length - 1);
  /** Degrees shown as columns, highest first. */
  const cols = $derived([...Array(top + 1).keys()].reverse());
  const digits = $derived(String(preset.a).split(''));
  const shownQuotient = $derived(
    pd.rounds.filter((_, r) => shownIn(step, r) >= 1).map((r) => r.term),
  );
  const shownDigits = $derived(
    nd.rounds
      .filter((_, r) => shownIn(step, r) >= 1)
      .map((r) => r.digit)
      .join(''),
  );
  const current = $derived(step === 0 ? -1 : Math.floor((step - 1) / 3));
  const action = $derived(step === 0 ? -1 : (step - 1) % 3);
  const polyMessage = $derived(step === 0 ? START : polyNarration(pd, preset.q, step));
  const numberMessage = $derived(step === 0 ? '' : numberNarration(nd, preset.b, step));

  /**
   * A row of the polynomial working: the TeX of each column, by degree.
   * @param {number[]} p
   * @param {boolean} [zero] write 0 in the last column for the zero polynomial
   */
  function polyRow(p, zero = false) {
    const terms = termsOf(p);
    /** @type {string[]} */
    const out = cols.map(() => '');
    terms.forEach((t, i) => (out[top - t.e] = termTex(t, i === 0)));
    if (zero && terms.length === 0) out[top] = '0';
    return out;
  }

  /**
   * Digits of n right-aligned so its last digit sits in column `end`.
   * @param {number} n
   * @param {number} end
   */
  function digitRow(n, end) {
    const s = String(n);
    /** @type {string[]} */
    const out = digits.map(() => '');
    for (let i = 0; i < s.length; i++) out[end - s.length + 1 + i] = s[i];
    return out;
  }

  /** @param {string | number} next */
  function choose(next) {
    id = String(next);
    step = 0;
  }

  /** @param {number} r @param {number} k */
  const active = (r, k) => r === current && k === action;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn phép chia"
    options={PRESETS.map((x) => ({ value: x.id, label: x.label }))}
    value={id}
    onchange={choose}
  />

  <p class="text-center text-lg">
    <Tex math={`(${polyTex(preset.p)}) : (${polyTex(preset.q)})`} />
    <span class="mx-2 text-slate-400">và</span>
    <span class="font-mono">{preset.a} : {preset.b}</span>
  </p>

  <div class="flex flex-wrap items-center justify-center gap-2">
    <button type="button" class={button.primary} disabled={step >= total} onclick={() => step++}
      >Bước tiếp{step < total ? `: ${ACTIONS[step % 3]}` : ''}</button
    >
    <button type="button" class={button.quiet} disabled={step === 0} onclick={() => step--}
      >Lùi lại</button
    >
    <button
      type="button"
      class={button.quiet}
      disabled={step >= total}
      onclick={() => (step = total)}>Làm hết</button
    >
    <button type="button" class={button.quiet} disabled={step === 0} onclick={() => (step = 0)}
      >Làm lại</button
    >
  </div>
  <p class="text-center text-sm text-slate-600">
    Bước {step} trên {total}{action >= 0 ? `, vòng ${current + 1}: ${ACTIONS[action]}` : ''}
  </p>

  <div class="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_14rem]">
    <section class="rounded-lg border border-slate-200 p-3" aria-label="Chia đa thức">
      <h4 class="mb-2 text-sm font-semibold text-slate-700">Chia đa thức</h4>
      <div class="flex items-start gap-2 overflow-x-auto" aria-hidden="true">
        <table class="border-collapse text-xs sm:text-sm">
          <tbody>
            <tr>
              <td class="w-4"></td>
              {#each polyRow(preset.p) as cell, i (i)}
                <td class="px-1 py-1 text-right whitespace-nowrap">
                  {#if cell}<Tex math={cell} />{/if}
                </td>
              {/each}
            </tr>
            {#each pd.rounds as round, r (r)}
              {@const seen = shownIn(step, r)}
              {#if seen >= 2}
                <tr class={active(r, 1) ? 'bg-amber-50' : ''}>
                  <td class="w-4 text-slate-500">−</td>
                  {#each polyRow(round.product) as cell, i (i)}
                    <td class="px-1 py-1 text-right whitespace-nowrap text-slate-600">
                      {#if cell}<Tex math={cell} />{/if}
                    </td>
                  {/each}
                </tr>
              {/if}
              {#if seen >= 3}
                <tr class={active(r, 2) ? 'bg-emerald-50' : ''}>
                  <td class="w-4"></td>
                  {#each polyRow(round.rest, true) as cell, i (i)}
                    <td class="border-t border-slate-400 px-1 py-1 text-right whitespace-nowrap">
                      {#if cell}<Tex math={cell} />{/if}
                    </td>
                  {/each}
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
        <div class="shrink-0 border-l-2 border-slate-500 pl-2 text-xs sm:text-sm">
          <div class="border-b-2 border-slate-500 py-1 whitespace-nowrap">
            <Tex math={polyTex(preset.q)} />
          </div>
          <div class="py-1 whitespace-nowrap {action === 0 ? 'bg-indigo-50' : ''}">
            {#if shownQuotient.length > 0}
              <Tex math={shownQuotient.map((t, i) => termTex(t, i === 0)).join('')} />
            {:else}
              <span class="text-slate-400">?</span>
            {/if}
          </div>
        </div>
      </div>
      <p class="mt-2 text-sm text-slate-700" aria-live="polite">{polyMessage}</p>
    </section>

    <section class="rounded-lg border border-slate-200 p-3" aria-label="Chia số tự nhiên">
      <h4 class="mb-2 text-sm font-semibold text-slate-700">Chia số tự nhiên</h4>
      <div class="flex items-start gap-2 font-mono text-lg" aria-hidden="true">
        <table class="border-collapse">
          <tbody>
            <tr>
              <td class="w-4"></td>
              {#each digits as d, i (i)}<td class="w-5 text-center">{d}</td>{/each}
            </tr>
            {#each nd.rounds as round, r (r)}
              {@const seen = shownIn(step, r)}
              {@const last = r === nd.rounds.length - 1}
              {#if seen >= 2}
                <tr class={active(r, 1) ? 'bg-amber-50' : ''}>
                  <td class="w-4 text-slate-500">−</td>
                  {#each digitRow(round.product, round.end) as d, i (i)}
                    <td class="w-5 text-center text-slate-600">{d}</td>
                  {/each}
                </tr>
              {/if}
              {#if seen >= 3}
                <tr class={active(r, 2) ? 'bg-emerald-50' : ''}>
                  <td class="w-4"></td>
                  {#each last ? digitRow(round.rest, round.end) : digitRow(nd.rounds[r + 1].partial, round.end + 1) as d, i (i)}
                    <td class="w-5 border-t border-slate-400 text-center">{d}</td>
                  {/each}
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
        <div class="shrink-0 border-l-2 border-slate-500 pl-2">
          <div class="border-b-2 border-slate-500">{preset.b}</div>
          <div class={action === 0 ? 'bg-indigo-50' : ''}>{shownDigits || '?'}</div>
        </div>
      </div>
      <p class="mt-2 text-sm text-slate-700" aria-live="polite">{numberMessage}</p>
    </section>
  </div>

  {#if step === total}
    <p class="rounded-lg bg-slate-50 p-3 text-center text-sm text-slate-800">
      Kiểm tra: đa thức bị chia = đa thức chia · thương + dư, tức là
      <span class="whitespace-nowrap">
        {polyText(preset.p)} = ({polyText(preset.q)}) · ({polyText(pd.quotient)}){pd.remainder
          .length
          ? ` + (${polyText(pd.remainder)})`
          : ''}</span
      >; và {preset.a} = {preset.b} · {nd.quotient}{nd.remainder ? ` + ${nd.remainder}` : ''}.
    </p>
  {/if}
</div>
