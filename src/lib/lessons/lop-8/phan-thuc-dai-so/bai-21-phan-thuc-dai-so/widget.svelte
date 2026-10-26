<script>
  import Tex from '#lib/components/tex.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { numberText } from '#lib/core/decimal.js';
  import { polyTex, polyText, substituteTex } from '#lib/algebra-engine/polynomial.js';
  import { expand, polyRatioText } from '../_shared/factors.js';
  import { PRESETS, crossAt, substitute, zeros } from './engine.js';

  /**
   * @param {import('../_shared/factors.js').Factor[]} top
   * @param {import('../_shared/factors.js').Factor[]} bottom
   */
  const plain = (top, bottom) => polyRatioText(expand(top), expand(bottom));
  /**
   * @param {import('../_shared/factors.js').Factor[]} top
   * @param {import('../_shared/factors.js').Factor[]} bottom
   */
  const tex = (top, bottom) => `\\dfrac{${polyTex(expand(top))}}{${polyTex(expand(bottom))}}`;

  const options = PRESETS.map((p, i) => ({ value: i, label: plain(p.top, p.bottom) }));

  /** @type {string | number} */
  let choice = $state(0);
  // x = 1 is not a zero of any denominator, so every challenge starts unsolved.
  let x = $state(1);
  /** @type {number[]} */
  let found = $state([]);

  const preset = $derived(PRESETS[Number(choice)]);
  const roots = $derived(zeros(preset.bottom));
  const at = $derived(substitute(preset.top, preset.bottom, x));
  const partner = $derived(preset.partner);
  const partnerAt = $derived(partner ? substitute(partner.top, partner.bottom, x) : null);
  const cross = $derived(crossAt(preset, x));

  const show = (/** @type {number} */ v) => formatNumber(v, 4);
  const bottomText = $derived(polyText(expand(preset.bottom)));

  $effect(() => {
    if (at.value === null && !found.includes(x)) found = [...found, x];
  });

  const condition = $derived(
    roots.length === 0 ? 'mọi giá trị của x' : roots.map((r) => `x ≠ ${show(r)}`).join(' và '),
  );

  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  const feedback = $derived.by(() => {
    if (at.value === null) {
      return {
        tone: 'warn',
        text: `Tại x = ${show(x)}, mẫu ${bottomText} bằng 0: phân thức không xác định, không có giá trị.`,
      };
    }
    return {
      tone: 'info',
      text: `Tại x = ${show(x)}, mẫu bằng ${show(at.bottom)} ≠ 0, phân thức có giá trị ${numberText(at.value)}.`,
    };
  });

  const progress = $derived.by(() => {
    if (roots.length === 0) {
      return {
        tone: /** @type {'ok'} */ ('ok'),
        text: `Mẫu ${bottomText} luôn lớn hơn 0 (vì x² ≥ 0), nên phân thức xác định với mọi giá trị của x.`,
      };
    }
    const got = roots.filter((r) => found.includes(r)).length;
    if (got < roots.length) {
      return {
        tone: /** @type {'info'} */ ('info'),
        text: `Thử thách: tìm mọi giá trị của x làm mẫu bằng 0. Đã tìm được ${got}/${roots.length}.`,
      };
    }
    return {
      tone: /** @type {'ok'} */ ('ok'),
      text: `Đã tìm đủ! Điều kiện xác định của phân thức là ${condition}.`,
    };
  });

  const marks = $derived(
    roots.filter((r) => found.includes(r)).map((r) => ({ value: r, label: '✕', color: '#e11d48' })),
  );

  function changePreset() {
    found = [];
    x = 1;
  }
</script>

<div class="space-y-4">
  <SegmentedControl label="Chọn phân thức" {options} bind:value={choice} onchange={changePreset} />

  <p class="text-center text-xl"><Tex math={tex(preset.top, preset.bottom)} display /></p>

  <SliderField label="Giá trị của x" bind:value={x} min={-5} max={5} step={0.5} format={show} />

  <NumberLine
    min={-5}
    max={5}
    step={1}
    subdivisions={2}
    value={x}
    interactive={false}
    {marks}
    label="Trục số từ −5 đến 5: dấu ✕ đỏ là giá trị của x làm mẫu bằng 0"
    markerLabel="Giá trị x đang chọn"
  />

  <div class="grid gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm sm:grid-cols-2">
    <p>
      Tử: <Tex math={substituteTex(expand(preset.top), x)} /> = <strong>{show(at.top)}</strong>
    </p>
    <p>
      Mẫu: <Tex math={substituteTex(expand(preset.bottom), x)} /> =
      <strong class={at.bottom === 0 ? 'text-rose-700' : ''}>{show(at.bottom)}</strong>
    </p>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
  <FeedbackNote tone={progress.tone} text={progress.text} />

  {#if partner && partnerAt && cross}
    <div class="space-y-2 rounded-xl border border-indigo-200 bg-indigo-50/50 p-3 text-sm">
      <p class="font-semibold text-indigo-900">
        So sánh <Tex math={'\\dfrac{A}{B}'} /> ở trên với <Tex
          math={`\\dfrac{C}{D} = ${tex(partner.top, partner.bottom)}`}
        />
      </p>
      <p>
        Giá trị: {at.value === null ? 'không xác định' : numberText(at.value)} và {partnerAt.value ===
        null
          ? 'không xác định'
          : numberText(partnerAt.value)}.
      </p>
      <p aria-live="polite">
        A·D = {show(cross.ad)}, B·C = {show(cross.bc)}: {cross.ad === cross.bc
          ? 'bằng nhau. Nhân ra ta có A·D = B·C với mọi x, nên hai phân thức bằng nhau, dù chúng không xác định ở cùng những giá trị của x.'
          : 'khác nhau.'}
      </p>
    </div>
  {/if}
</div>
