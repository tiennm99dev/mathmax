<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { compare } from '#lib/fraction-engine/index.js';
  import { fracText, readWritten } from '../_shared/rational.js';
  import { OP_NAME, solve } from './engine.js';

  /** @typedef {import('./engine.js').Op} Op */

  /** @type {Array<{ a: string, op: Op, b: string }>} */
  const PRESETS = [
    { a: '0,25', op: '+', b: '-5/6' },
    { a: '-2/3', op: '-', b: '-1/6' },
    { a: '-1,2', op: '*', b: '5/9' },
    { a: '3/4', op: ':', b: '-1,5' },
  ];

  const uid = $props.id();
  let aText = $state('0,25');
  let bText = $state('-5/6');
  /** @type {Op} */
  let op = $state('+');
  let shown = $state(1);
  let guess = $state('');
  let verdict = $state('');

  const a = $derived(readWritten(aText));
  const b = $derived(readWritten(bText));
  const out = $derived(a && b ? solve(a, op, b) : null);
  const steps = $derived(out && 'steps' in out ? out.steps : []);
  const allShown = $derived(shown >= steps.length);

  function restart() {
    shown = 1;
    guess = '';
    verdict = '';
  }

  /** @param {{ a: string, op: Op, b: string }} p */
  function usePreset(p) {
    aText = p.a;
    bText = p.b;
    op = p.op;
    restart();
  }

  function checkGuess() {
    if (!out || !('result' in out)) return;
    const g = readWritten(guess);
    if (!g) {
      verdict = 'Hãy nhập một phân số dạng a/b, một số nguyên hoặc một số thập phân (ví dụ −0,5).';
      return;
    }
    verdict =
      compare(g.f, out.result) === 0
        ? `Đúng rồi! Kết quả bằng ${fracText(out.result)}.`
        : 'Chưa đúng. Em mở thêm từng bước bên dưới để xem mình sai ở đâu.';
  }
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-2" role="group" aria-label="Phép tính mẫu">
    {#each PRESETS as p, i (i)}
      <button type="button" class={button.quiet} onclick={() => usePreset(p)}>
        {p.a.replace('-', '−')}
        {p.op === '*' ? '·' : p.op === '-' ? '−' : p.op}
        {p.b.startsWith('-') ? `(${p.b.replace('-', '−')})` : p.b}
      </button>
    {/each}
  </div>

  <div class="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
    <div>
      <label for="{uid}-a" class="mb-1 block text-sm font-semibold text-slate-700"
        >Số thứ nhất</label
      >
      <input
        id="{uid}-a"
        class={textInput}
        bind:value={aText}
        oninput={restart}
        inputmode="text"
        autocomplete="off"
      />
    </div>
    <SegmentedControl
      label="Phép tính"
      options={[
        { value: '+', label: '+' },
        { value: '-', label: '−' },
        { value: '*', label: '·' },
        { value: ':', label: ':' },
      ]}
      bind:value={op}
      onchange={restart}
    />
    <div>
      <label for="{uid}-b" class="mb-1 block text-sm font-semibold text-slate-700">Số thứ hai</label
      >
      <input
        id="{uid}-b"
        class={textInput}
        bind:value={bText}
        oninput={restart}
        inputmode="text"
        autocomplete="off"
      />
    </div>
  </div>
  <p class="text-sm text-slate-600">
    Nhập phân số dạng a/b (ví dụ −5/6), số nguyên hoặc số thập phân có dấu phẩy (ví dụ 0,25). Phép
    tính đang chọn: {OP_NAME[op]}.
  </p>

  {#if !a || !b}
    <p class="font-semibold text-rose-700" aria-live="polite">
      {!a ? 'Số thứ nhất' : 'Số thứ hai'} chưa đúng dạng. Ví dụ hợp lệ: −5/6, 3, 0,25.
    </p>
  {:else if out && 'error' in out}
    <p class="font-semibold text-rose-700" aria-live="polite">{out.error}</p>
  {:else}
    <form
      class="flex flex-wrap items-end gap-2"
      onsubmit={(e) => {
        e.preventDefault();
        checkGuess();
      }}
    >
      <div class="min-w-40 flex-1">
        <label for="{uid}-g" class="mb-1 block text-sm font-semibold text-slate-700"
          >Em đoán kết quả là</label
        >
        <input id="{uid}-g" class={textInput} bind:value={guess} autocomplete="off" />
      </div>
      <button type="submit" class={button.secondary}>Kiểm tra</button>
    </form>
    <p aria-live="polite" class="min-h-6 font-semibold text-slate-800">{verdict}</p>

    <ol class="space-y-2" aria-live="polite">
      {#each steps.slice(0, shown) as s, i (i)}
        <li class="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p class="text-sm font-semibold text-slate-700">Bước {i + 1}. {s.caption}</p>
          <div class="mt-1 overflow-x-auto text-slate-900">
            <Tex display math={s.tex} />
          </div>
        </li>
      {/each}
    </ol>
    <div class="flex flex-wrap gap-3">
      <button
        type="button"
        class={button.primary}
        disabled={allShown}
        onclick={() => (shown = Math.min(steps.length, shown + 1))}>Bước tiếp theo</button
      >
      <button
        type="button"
        class={button.quiet}
        disabled={allShown}
        onclick={() => (shown = steps.length)}>Hiện tất cả</button
      >
      <button type="button" class={button.quiet} onclick={restart}>Ẩn các bước</button>
    </div>
  {/if}
</div>
