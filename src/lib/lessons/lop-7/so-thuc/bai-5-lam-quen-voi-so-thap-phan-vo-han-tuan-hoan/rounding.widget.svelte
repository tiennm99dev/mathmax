<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { PRECISIONS } from '#lib/core/decimal.js';
  import { ROUNDING_NUMBERS, checkRounding, roundingCase } from './engine.js';

  const inputId = $props.id();

  let numberIndex = $state(0);
  let precision = $state(2);
  let typed = $state('');
  let revealed = $state(false);
  let feedback = $state('');
  /** @type {'none' | 'good' | 'bad'} */
  let tone = $state('none');

  const pq = $derived(ROUNDING_NUMBERS[numberIndex]);
  const c = $derived(roundingCase(pq[0], pq[1], precision));

  function clear() {
    typed = '';
    revealed = false;
    feedback = '';
    tone = 'none';
  }

  function check() {
    const r = checkRounding(typed, c.answer);
    if (r === 'invalid') {
      tone = 'bad';
      feedback = 'Hãy nhập một số thập phân, dùng dấu phẩy, ví dụ 0,67.';
      return;
    }
    if (r === 'right') {
      tone = 'good';
      feedback = `Đúng rồi: ${c.short} ≈ ${c.answerText} (độ chính xác ${c.precision}).`;
      revealed = true;
      return;
    }
    tone = 'bad';
    feedback = `Chưa đúng. Độ chính xác ${c.precision} nghĩa là làm tròn đến ${c.place}; hãy nhìn chữ số ngay bên phải hàng đó.`;
  }
</script>

<div class="space-y-4">
  <div>
    <p class="mb-1 text-sm font-semibold text-slate-700">Chọn số cần làm tròn</p>
    <div class="flex flex-wrap gap-2">
      {#each ROUNDING_NUMBERS as [a, b], i (`${a}/${b}`)}
        <button
          type="button"
          class="{i === numberIndex ? button.primary : button.quiet} min-w-16"
          aria-pressed={i === numberIndex}
          onclick={() => {
            numberIndex = i;
            clear();
          }}>{a < 0 ? '−' : ''}{Math.abs(a)}/{b}</button
        >
      {/each}
    </div>
  </div>

  <SegmentedControl
    label="Độ chính xác"
    options={PRECISIONS.map((pr, i) => ({ value: i, label: pr.text }))}
    bind:value={precision}
    onchange={clear}
  />

  <div class="rounded-lg border border-slate-200 bg-white p-3 text-lg text-slate-900">
    <p>
      {pq[0] < 0 ? '−' : ''}{Math.abs(pq[0])}/{pq[1]} = {c.short} =
      <span class="font-mono tabular-nums"
        >{c.sign}{#if c.places === 0}<span class="rounded bg-indigo-100 px-0.5 font-bold"
            >{c.whole}</span
          >{:else}{c.whole}{/if},{#each c.head.split('') as d, i (i)}<span
            class={i === c.places - 1 ? 'rounded bg-indigo-100 px-0.5 font-bold' : ''}>{d}</span
          >{/each}{#if revealed}<span class="rounded bg-amber-200 px-0.5 font-bold">{c.next}</span
          >{:else}{c.next}{/if}{c.tail}</span
      >
    </p>
    <p class="mt-1 text-sm text-slate-600">
      Độ chính xác {c.precision}: làm tròn đến {c.place} (chữ số được tô nền).
    </p>
  </div>

  <form
    class="flex flex-wrap items-end gap-2"
    onsubmit={(ev) => {
      ev.preventDefault();
      check();
    }}
  >
    <label class="w-40" for={inputId}>
      <span class="text-sm font-semibold text-slate-700">Số làm tròn</span>
      <input
        id={inputId}
        class={textInput}
        inputmode="decimal"
        bind:value={typed}
        autocomplete="off"
      />
    </label>
    <button type="submit" class={button.primary}>Kiểm tra</button>
    <button type="button" class={button.quiet} onclick={() => (revealed = true)}
      >Xem cách làm</button
    >
  </form>

  <div aria-live="polite" class="space-y-1">
    <p
      class="min-h-6 font-semibold {tone === 'good'
        ? 'text-emerald-700'
        : tone === 'bad'
          ? 'text-rose-700'
          : ''}"
    >
      {feedback}
    </p>
    {#if revealed}
      <p class="text-slate-800">
        Chữ số ngay bên phải {c.place} là {c.next}{c.up
          ? ' ≥ 5, nên tăng chữ số ở hàng làm tròn thêm 1 đơn vị'
          : ' < 5, nên giữ nguyên chữ số ở hàng làm tròn'} và bỏ các chữ số phía sau. Kết quả: {c.short}
        ≈ {c.answerText}.
      </p>
    {/if}
  </div>
</div>
