<script>
  import Tex from '#lib/components/tex.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { div, equals } from '#lib/fraction-engine/index.js';
  import { readValue, valueTex, valueText } from '../_shared/numbers.js';
  import { FORMS, NAMES, analyze, isOuter } from './engine.js';

  /** @typedef {import('#lib/fraction-engine/fraction.js').Fraction} Fraction */

  const PRESETS = [
    { label: 'x : 6 = 10 : 4', terms: ['', '6', '10', '4'] },
    { label: '2,5 : x = 7,5 : 6', terms: ['2,5', '', '7,5', '6'] },
    { label: '−15 : 12 = x : 8', terms: ['-15', '12', '', '8'] },
    { label: '3 : 7 = 15 : 35', terms: ['3', '7', '15', '35'] },
    { label: '4 : 10 = 6 : 16', terms: ['4', '10', '6', '16'] },
  ];

  const uid = $props.id();
  let texts = $state(['', '6', '10', '4']);
  let guess = $state('');
  let verdict = $state('');
  let revealed = $state(false);

  const parsed = $derived(texts.map((t) => (t.trim() === '' ? null : readValue(t))));
  const badIndex = $derived(texts.findIndex((t, i) => t.trim() !== '' && parsed[i] === null));
  const result = $derived(badIndex >= 0 ? null : analyze(parsed));

  /** @param {number} i */
  function termTex(i) {
    const t = parsed[i];
    if (!t) return 'x';
    const tex = valueTex(t);
    return t.n < 0 ? `\\left(${tex}\\right)` : tex;
  }

  /** @param {number} i */
  function boxTex(i) {
    const t = parsed[i];
    return t ? valueTex(t) : 'x';
  }

  const solveTex = $derived.by(() => {
    if (result?.kind !== 'solve') return '';
    const [p, q] = result.product;
    const x = result.index;
    const own = result.divisor;
    const lhs = isOuter(x) ? 'a \\cdot d = b \\cdot c' : 'b \\cdot c = a \\cdot d';
    return `${lhs} \\;\\Rightarrow\\; ${NAMES[x]} = \\frac{${NAMES[p]} \\cdot ${NAMES[q]}}{${NAMES[own]}} = \\frac{${termTex(p)} \\cdot ${termTex(q)}}{${termTex(own)}} = ${valueTex(result.value)}`;
  });

  const formsTex = $derived.by(() => {
    if (result?.kind !== 'check' || !result.ok) return [];
    return FORMS.map(
      ([p, q, r, s]) =>
        `\\frac{${boxTex(p)}}{${boxTex(q)}} = \\frac{${boxTex(r)}}{${boxTex(s)}} \\;\\left(= ${valueTex(
          div(/** @type {Fraction} */ (parsed[p]), /** @type {Fraction} */ (parsed[q])),
        )}\\right)`,
    );
  });

  function restart() {
    guess = '';
    verdict = '';
    revealed = false;
  }

  /** @param {string[]} terms */
  function usePreset(terms) {
    texts = [...terms];
    restart();
  }

  function checkGuess() {
    if (result?.kind !== 'solve') return;
    const g = readValue(guess);
    if (!g) {
      verdict = 'Hãy nhập một số nguyên, một số thập phân có dấu phẩy hoặc một phân số dạng a/b.';
      return;
    }
    if (equals(g, result.value)) {
      verdict = `Đúng rồi! Số hạng còn thiếu là ${valueText(result.value)}.`;
      revealed = true;
    } else {
      verdict = isOuter(result.index)
        ? 'Chưa đúng. Số còn thiếu là một ngoại tỉ: lấy tích hai trung tỉ chia cho ngoại tỉ đã biết.'
        : 'Chưa đúng. Số còn thiếu là một trung tỉ: lấy tích hai ngoại tỉ chia cho trung tỉ đã biết.';
    }
  }

  const BOX_CLASS = [
    'border-indigo-400 bg-indigo-50',
    'border-amber-400 bg-amber-50',
    'border-amber-400 bg-amber-50',
    'border-indigo-400 bg-indigo-50',
  ];
  const BOX_LABEL = [
    'Số hạng a (ngoại tỉ)',
    'Số hạng b (trung tỉ)',
    'Số hạng c (trung tỉ)',
    'Số hạng d (ngoại tỉ)',
  ];
</script>

{#snippet box(/** @type {number} */ i)}
  <input
    id="{uid}-{i}"
    class="{textInput} w-24 border-2 text-center {BOX_CLASS[i]}"
    bind:value={texts[i]}
    oninput={restart}
    placeholder={NAMES[i]}
    aria-label={BOX_LABEL[i]}
    autocomplete="off"
    inputmode="text"
  />
{/snippet}

<div class="space-y-4">
  <div class="flex flex-wrap gap-2" role="group" aria-label="Tỉ lệ thức mẫu">
    {#each PRESETS as p (p.label)}
      <button type="button" class={button.quiet} onclick={() => usePreset(p.terms)}
        >{p.label}</button
      >
    {/each}
  </div>

  <div
    class="flex items-center justify-center gap-4"
    role="group"
    aria-label="Tỉ lệ thức a/b = c/d"
  >
    <div class="flex flex-col items-center gap-1">
      {@render box(0)}
      <div class="h-0.5 w-24 bg-slate-700" aria-hidden="true"></div>
      {@render box(1)}
    </div>
    <span class="text-2xl font-bold text-slate-700" aria-hidden="true">=</span>
    <div class="flex flex-col items-center gap-1">
      {@render box(2)}
      <div class="h-0.5 w-24 bg-slate-700" aria-hidden="true"></div>
      {@render box(3)}
    </div>
  </div>
  <p class="text-center text-sm text-slate-600">
    <span class="font-semibold text-indigo-700">Ô xanh: ngoại tỉ a, d</span> ·
    <span class="font-semibold text-amber-700">ô vàng: trung tỉ b, c</span>. Nhập ba số và để trống
    một ô để tìm số còn thiếu, hoặc nhập đủ bốn số để kiểm tra tích chéo. Có thể nhập số nguyên, số
    thập phân có dấu phẩy hoặc phân số dạng a/b.
  </p>

  <div class="min-h-24 rounded-lg border border-slate-200 bg-slate-50 p-4" aria-live="polite">
    {#if badIndex >= 0}
      <p class="font-semibold text-rose-700">
        Ô {NAMES[badIndex]} chưa đúng dạng. Ví dụ hợp lệ: −4; 2,5; 3/4.
      </p>
    {:else if result?.kind === 'zero'}
      <p class="font-semibold text-rose-700">
        Các số hạng của tỉ lệ thức ở đây đều phải khác 0. Hãy thay số 0 bằng một số khác.
      </p>
    {:else if result?.kind === 'need'}
      <p class="text-slate-700">Hãy nhập ít nhất ba số hạng (để trống nhiều nhất một ô).</p>
    {:else if result?.kind === 'check'}
      <p class="text-slate-700">
        Tích ngoại tỉ: <Tex
          math={`a \\cdot d = ${termTex(0)} \\cdot ${termTex(3)} = ${valueTex(result.ad)}`}
        />
      </p>
      <p class="text-slate-700">
        Tích trung tỉ: <Tex
          math={`b \\cdot c = ${termTex(1)} \\cdot ${termTex(2)} = ${valueTex(result.bc)}`}
        />
      </p>
      {#if result.ok}
        <p class="mt-2 font-semibold text-emerald-700">
          Hai tích bằng nhau, nên bốn số này lập thành tỉ lệ thức. Từ đẳng thức tích, ta lập được
          bốn tỉ lệ thức:
        </p>
        <ul class="mt-2 grid gap-2 sm:grid-cols-2">
          {#each formsTex as tex (tex)}
            <li><Tex math={tex} /></li>
          {/each}
        </ul>
      {:else}
        <p class="mt-2 font-semibold text-rose-700">
          Hai tích khác nhau, nên {valueText(
            div(/** @type {Fraction} */ (parsed[0]), /** @type {Fraction} */ (parsed[1])),
          )} và {valueText(
            div(/** @type {Fraction} */ (parsed[2]), /** @type {Fraction} */ (parsed[3])),
          )} là hai tỉ số khác nhau: đây không phải tỉ lệ thức.
        </p>
      {/if}
    {:else if result?.kind === 'solve'}
      <form
        class="flex flex-wrap items-end gap-2"
        onsubmit={(e) => {
          e.preventDefault();
          checkGuess();
        }}
      >
        <div class="min-w-40 flex-1">
          <label for="{uid}-guess" class="mb-1 block text-sm font-semibold text-slate-700"
            >Số hạng còn thiếu {NAMES[result.index]} bằng</label
          >
          <input id="{uid}-guess" class={textInput} bind:value={guess} autocomplete="off" />
        </div>
        <button type="submit" class={button.secondary}>Kiểm tra</button>
        <button type="button" class={button.quiet} onclick={() => (revealed = true)}
          >Xem cách tính</button
        >
      </form>
      <p class="mt-2 min-h-6 font-semibold text-slate-800">{verdict}</p>
      {#if revealed}
        <div class="mt-2 overflow-x-auto">
          <Tex display math={solveTex} />
        </div>
      {/if}
    {/if}
  </div>
</div>
