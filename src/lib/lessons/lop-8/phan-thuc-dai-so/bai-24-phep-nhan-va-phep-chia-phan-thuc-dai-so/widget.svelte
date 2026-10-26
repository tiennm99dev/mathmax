<script>
  import Tex from '#lib/components/tex.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { numberText } from '#lib/core/decimal.js';
  import CancelBoard from '../_shared/cancel-board.svelte';
  import { ratioAt, ratioTex, ratioText, standing } from '../_shared/factors.js';
  import { CARDS, combine, flip, originalAt } from './engine.js';

  const cardOptions = CARDS.map((c, i) => ({ value: i, label: ratioText(c.top, c.bottom) }));
  const opOptions = [
    { value: 'mul', label: 'Nhân ×' },
    { value: 'div', label: 'Chia :' },
  ];

  /** @type {string | number} */
  let first = $state(0);
  /** @type {string | number} */
  let op = $state('mul');
  /** @type {string | number} */
  let second = $state(1);
  let x = $state(3);

  const a = $derived(CARDS[Number(first)]);
  const b = $derived(CARDS[Number(second)]);
  const operation = $derived(
    /** @type {import('./engine.js').Op} */ (op === 'div' ? 'div' : 'mul'),
  );
  const joined = $derived(combine(a, operation, b));
  const setup = $derived(`${first}-${op}-${second}`);

  let topOut = $state(combine(CARDS[0], 'mul', CARDS[1]).top.map(() => false));
  let bottomOut = $state(combine(CARDS[0], 'mul', CARDS[1]).bottom.map(() => false));

  function reset() {
    const c = combine(CARDS[Number(first)], op === 'div' ? 'div' : 'mul', CARDS[Number(second)]);
    topOut = c.top.map(() => false);
    bottomOut = c.bottom.map(() => false);
  }

  const lhs = $derived(
    `${ratioTex(a.top, a.bottom)} ${operation === 'mul' ? '\\cdot' : ':'} ${ratioTex(b.top, b.bottom)}`,
  );
  // One short line each, so the working fits a phone screen.
  const setupLines = $derived(
    operation === 'mul'
      ? [lhs, `= ${ratioTex(joined.top, joined.bottom)}`]
      : [
          lhs,
          `= ${ratioTex(a.top, a.bottom)} \\cdot ${ratioTex(flip(b).top, flip(b).bottom)}`,
          `= ${ratioTex(joined.top, joined.bottom)}`,
        ],
  );

  const show = (/** @type {number} */ v) => formatNumber(v, 4);
  const before = $derived(originalAt(a, operation, b, x));
  const now = $derived(
    ratioAt(standing(joined.top, topOut), standing(joined.bottom, bottomOut), x),
  );

  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  const check = $derived.by(() => {
    if (before === null) {
      return {
        tone: 'warn',
        text: `Tại x = ${show(x)}, biểu thức ban đầu không xác định (có mẫu bằng 0${operation === 'div' ? ', hoặc phân thức chia bằng 0' : ''}). Hãy chọn giá trị khác của x.`,
      };
    }
    return {
      tone: 'ok',
      text: `Tại x = ${show(x)}: biểu thức ban đầu bằng ${numberText(before)}, phân thức hiện tại bằng ${now === null ? 'không xác định' : numberText(now)}. Hai giá trị bằng nhau.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3">
    <SegmentedControl
      label="Thẻ thứ nhất"
      options={cardOptions}
      bind:value={first}
      onchange={reset}
    />
    <SegmentedControl label="Phép tính" options={opOptions} bind:value={op} onchange={reset} />
    <SegmentedControl
      label="Thẻ thứ hai"
      options={cardOptions}
      bind:value={second}
      onchange={reset}
    />
  </div>

  <div class="overflow-x-auto text-center text-lg">
    {#each setupLines as line, i (i)}
      <Tex math={line} display />
    {/each}
  </div>
  {#if operation === 'div'}
    <p class="text-sm text-slate-600">
      Chia cho một phân thức là nhân với phân thức nghịch đảo của nó: thẻ thứ hai đã được lật ngược.
    </p>
  {/if}

  {#key setup}
    <CancelBoard top={joined.top} bottom={joined.bottom} bind:topOut bind:bottomOut />
  {/key}

  <div class="space-y-2 rounded-xl border border-slate-200 bg-white p-3">
    <p class="text-sm font-semibold text-slate-700">Kiểm tra bằng giá trị số</p>
    <SliderField label="Giá trị của x" bind:value={x} min={-5} max={5} step={0.5} format={show} />
    <FeedbackNote tone={check.tone} text={check.text} />
  </div>
</div>
