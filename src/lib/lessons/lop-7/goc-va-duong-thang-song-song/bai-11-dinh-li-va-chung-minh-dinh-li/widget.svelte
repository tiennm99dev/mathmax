<script>
  import { button, focusRing } from '#lib/core/ui.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { THEOREMS, checkProof, move, scrambled } from './engine.js';

  const SHORT = ['Đối đỉnh', 'Phân giác kề bù', 'Cùng vuông góc'];

  let ti = $state(0);
  const theorem = $derived(THEOREMS[ti]);
  /** @type {number[]} */
  let order = $state(scrambled(THEOREMS[0].steps.length));
  /** @type {Array<number | null>} */
  let chosen = $state(THEOREMS[0].steps.map(() => null));
  /** @type {null | ReturnType<typeof checkProof>} */
  let result = $state(null);
  const baseId = $props.id();

  function reset() {
    order = scrambled(theorem.steps.length);
    chosen = theorem.steps.map(() => null);
    result = null;
  }

  /** @param {string | number} v */
  function pick(v) {
    ti = Number(v);
    reset();
  }

  /** @param {number} pos @param {-1 | 1} by */
  function shift(pos, by) {
    order = move(order, pos, by);
    result = null;
  }

  /** @param {number} step @param {string} value */
  function choose(step, value) {
    const next = [...chosen];
    next[step] = value === '' ? null : Number(value);
    chosen = next;
    result = null;
  }

  function check() {
    result = checkProof(theorem, order, chosen);
  }

  const verdict = $derived.by(() => {
    if (!result) return '';
    if (result.done)
      return 'Chính xác! Từ giả thiết, mỗi bước đều có căn cứ và dẫn tới kết luận. Định lí đã được chứng minh.';
    const parts = [];
    if (!result.placeOk)
      parts.push(
        'Thứ tự chưa đúng: một bước đang đứng trước những điều nó cần dùng, hoặc kết luận chưa ở cuối.',
      );
    const missing = result.lines.filter((l) => l.missing).length;
    if (missing) parts.push(`Còn ${missing} bước chưa chọn lí do.`);
    else if (!result.reasonsOk) parts.push('Có lí do chưa đúng (dòng tô đỏ ở cột lí do).');
    return parts.join(' ');
  });

  /** @param {number} pos */
  function lineInfo(pos) {
    if (!result) return null;
    return result.lines[pos];
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Định lí"
    value={ti}
    onchange={pick}
    options={THEOREMS.map((t, i) => ({ value: i, label: SHORT[i] }))}
  />

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
    <p class="font-semibold text-slate-900">{theorem.title}</p>
    <p class="mt-1"><span class="font-semibold text-indigo-700">GT:</span> {theorem.gt}</p>
    <p><span class="font-semibold text-indigo-700">KL:</span> {theorem.kl}</p>
  </div>

  <p class="text-sm text-slate-700">
    Dùng các nút mũi tên để xếp các bước theo thứ tự lập luận, rồi chọn lí do cho từng bước. Bước
    sau chỉ được dùng những điều đã có ở các bước trước.
  </p>

  <ol class="space-y-2">
    {#each order as s, pos (s)}
      {@const info = lineInfo(pos)}
      <li
        class="rounded-lg border p-2 {info
          ? info.placeOk && info.reasonOk
            ? 'border-emerald-300 bg-emerald-50'
            : 'border-rose-300 bg-rose-50'
          : 'border-slate-200 bg-white'}"
      >
        <div class="flex items-start gap-2">
          <span class="mt-2 w-6 shrink-0 text-right font-semibold text-slate-500">{pos + 1}.</span>
          <div class="min-w-0 flex-1">
            <p class="py-2 font-semibold text-slate-900">{theorem.steps[s].text}</p>
            <label class="block text-xs font-semibold text-slate-600" for="{baseId}-{s}"
              >Lí do<span class="sr-only"> của bước {pos + 1}</span></label
            >
            <select
              id="{baseId}-{s}"
              class="mt-1 min-h-11 w-full rounded-lg border bg-white px-2 text-sm {info &&
              !info.reasonOk
                ? 'border-rose-400'
                : 'border-slate-300'} {focusRing}"
              value={chosen[s] === null ? '' : String(chosen[s])}
              onchange={(e) => choose(s, e.currentTarget.value)}
            >
              <option value="">Chọn lí do…</option>
              {#each theorem.reasons as r, ri (ri)}
                <option value={String(ri)}>{r}</option>
              {/each}
            </select>
            {#if info && !info.placeOk}
              <p class="mt-1 text-xs text-rose-700">
                Bước này cần dùng một điều chưa có ở phía trên.
              </p>
            {/if}
          </div>
          <div class="flex shrink-0 flex-col gap-1">
            <button
              type="button"
              class="{button.quiet} px-3"
              disabled={pos === 0}
              aria-label="Đưa bước {pos + 1} lên trên"
              onclick={() => shift(pos, -1)}>↑</button
            >
            <button
              type="button"
              class="{button.quiet} px-3"
              disabled={pos === order.length - 1}
              aria-label="Đưa bước {pos + 1} xuống dưới"
              onclick={() => shift(pos, 1)}>↓</button
            >
          </div>
        </div>
      </li>
    {/each}
  </ol>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={check}>Kiểm tra chứng minh</button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>
  <p class="text-sm {result?.done ? 'text-emerald-700' : 'text-rose-700'}" aria-live="polite">
    {verdict}
  </p>
</div>
