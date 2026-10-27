<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { intText } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import {
    apply,
    expected,
    fits,
    inequalityText,
    operationText,
    relation,
    ruleText,
    sideText,
    stepText,
    tilt,
  } from './engine.js';

  const W = 320;
  const CX = W / 2;
  const PIVOT_Y = 64;
  const ARM = 110;
  const HANG = 46;

  let startA = $state(2);
  let startB = $state(5);
  let sides = $state({ a: 2, b: 5 });
  let op = $state(/** @type {'cong' | 'nhan'} */ ('nhan'));
  let k = $state(-2);
  /** @type {string[]} */
  let history = $state([]);
  let right = $state(0);
  let tried = $state(0);
  let note = $state({
    tone: /** @type {'ok' | 'warn' | 'info'} */ ('info'),
    text: 'Chọn phép biến đổi và số k, rồi bấm dấu em dự đoán sẽ đứng giữa hai vế sau khi biến đổi.',
  });

  const rel = $derived(relation(sides.a, sides.b));
  const angle = $derived(tilt(rel));
  const rad = $derived((angle * Math.PI) / 180);
  const left = $derived({ x: CX - ARM * Math.cos(rad), y: PIVOT_Y - ARM * Math.sin(rad) });
  const rightEnd = $derived({ x: CX + ARM * Math.cos(rad), y: PIVOT_Y + ARM * Math.sin(rad) });
  const canApply = $derived(fits(sides, op, k));
  const preview = $derived(apply(sides, op, k));

  /** The starting inequality changed: start over from it. */
  function restart() {
    sides = { a: startA, b: startB };
    history = [];
    note = {
      tone: 'info',
      text: `Cân bắt đầu từ ${inequalityText(sides)}. Chọn phép biến đổi rồi dự đoán dấu mới.`,
    };
  }

  /** @param {'<' | '=' | '>'} guess */
  function predict(guess) {
    if (!canApply) return;
    const before = rel;
    const want = expected(before, op, k);
    const line = stepText(sides, op, k);
    const t = apply(sides, op, k);
    const calc = `${sideText(sides.a, op, k)} = ${intText(t.a)} và ${sideText(sides.b, op, k)} = ${intText(t.b)}.`;
    sides = t;
    history = [line, ...history].slice(0, 6);
    tried += 1;
    if (guess === want) {
      right += 1;
      note = { tone: 'ok', text: `Đúng: ${inequalityText(t)}. ${calc} ${ruleText(before, op, k)}` };
    } else {
      note = {
        tone: 'warn',
        text: `Chưa đúng: kết quả là ${inequalityText(t)}, không phải dấu “${guess}”. ${calc} ${ruleText(before, op, k)}`,
      };
    }
  }

  const opLabel = $derived(op === 'cong' ? 'Số cộng thêm k' : 'Số nhân k');
  const balanceLabel = $derived(
    rel === '='
      ? `Cân thăng bằng: hai đĩa đều là ${intText(sides.a)}.`
      : `Cân nghiêng về đĩa ${rel === '>' ? 'trái' : 'phải'}: ${inequalityText(sides)}.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <fieldset class="min-w-0 space-y-2 rounded-lg border border-slate-200 bg-white p-3">
      <legend class="px-1 text-sm font-semibold text-slate-700">Bất đẳng thức ban đầu</legend>
      <Stepper
        label="Vế trái"
        bind:value={startA}
        min={-10}
        max={10}
        format={intText}
        onchange={restart}
      />
      <Stepper
        label="Vế phải"
        bind:value={startB}
        min={-10}
        max={10}
        format={intText}
        onchange={restart}
      />
      <button type="button" class={button.quiet} onclick={restart}>Đặt lại cân</button>
    </fieldset>
    <fieldset class="min-w-0 space-y-2 rounded-lg border border-slate-200 bg-white p-3">
      <legend class="px-1 text-sm font-semibold text-slate-700">Phép biến đổi hai vế</legend>
      <SegmentedControl
        label="Phép biến đổi"
        bind:value={op}
        options={[
          { value: 'cong', label: 'Cộng k' },
          { value: 'nhan', label: 'Nhân với k' },
        ]}
      />
      <Stepper label={opLabel} bind:value={k} min={-5} max={5} format={intText} />
      <p class="text-sm text-slate-600">{operationText(op, k)}.</p>
    </fieldset>
  </div>

  <svg
    viewBox="0 0 {W} 196"
    class="mx-auto block w-full max-w-md"
    role="img"
    aria-label={balanceLabel}
  >
    <polygon points="{CX},{PIVOT_Y} {CX - 30},182 {CX + 30},182" fill="#cbd5e1" />
    <rect x={CX - 70} y="182" width="140" height="8" rx="3" fill="#94a3b8" />
    <line
      x1={left.x}
      y1={left.y}
      x2={rightEnd.x}
      y2={rightEnd.y}
      stroke="#475569"
      stroke-width="8"
      stroke-linecap="round"
    />
    <circle cx={CX} cy={PIVOT_Y} r="7" fill="#1e293b" />
    {#each [{ end: left, v: sides.a, color: '#0f766e', name: 'trái' }, { end: rightEnd, v: sides.b, color: '#4f46e5', name: 'phải' }] as pan (pan.name)}
      <line
        x1={pan.end.x}
        y1={pan.end.y}
        x2={pan.end.x}
        y2={pan.end.y + HANG}
        stroke="#64748b"
        stroke-width="2"
      />
      <path
        d="M {pan.end.x - 40} {pan.end.y + HANG} Q {pan.end.x} {pan.end.y + HANG + 44} {pan.end.x +
          40} {pan.end.y + HANG} Z"
        fill={pan.color}
        fill-opacity="0.15"
        stroke={pan.color}
        stroke-width="2"
      />
      <text
        x={pan.end.x}
        y={pan.end.y + HANG + 17}
        text-anchor="middle"
        font-size="17"
        font-weight="700"
        fill={pan.color}>{intText(pan.v)}</text
      >
    {/each}
  </svg>

  <p class="text-center text-2xl font-bold tabular-nums text-slate-800" aria-live="polite">
    {inequalityText(sides)}
  </p>

  <div class="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
    <p class="text-sm text-slate-700">
      {operationText(op, k)} thì dấu giữa hai vế sẽ là gì? Bấm dấu em dự đoán.
    </p>
    <div class="flex flex-wrap gap-2" role="group" aria-label="Dự đoán dấu mới">
      <button
        type="button"
        class={button.secondary}
        disabled={!canApply}
        aria-label="Dự đoán dấu nhỏ hơn"
        onclick={() => predict('<')}>&lt;</button
      >
      <button
        type="button"
        class={button.secondary}
        disabled={!canApply}
        aria-label="Dự đoán dấu bằng"
        onclick={() => predict('=')}>=</button
      >
      <button
        type="button"
        class={button.secondary}
        disabled={!canApply}
        aria-label="Dự đoán dấu lớn hơn"
        onclick={() => predict('>')}>&gt;</button
      >
    </div>
    {#if !canApply}
      <p class="text-sm text-amber-800">
        Kết quả sẽ quá lớn ({intText(preview.a)} và {intText(preview.b)}). Hãy đặt lại cân.
      </p>
    {/if}
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
  {#if tried > 0}
    <p class="text-sm text-slate-600">Em đã dự đoán đúng {right}/{tried} lần.</p>
  {/if}

  {#if history.length > 0}
    <div class="rounded-lg border border-slate-200 bg-white p-3">
      <p class="mb-1 text-sm font-semibold text-slate-700">Các bước đã làm (mới nhất ở trên)</p>
      <ul class="space-y-1 text-sm tabular-nums text-slate-700">
        {#each history as line, i (i)}
          <li>{line}</li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
