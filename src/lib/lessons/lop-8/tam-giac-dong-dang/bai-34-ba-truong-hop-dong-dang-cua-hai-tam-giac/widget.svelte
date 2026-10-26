<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import PairBoard from '../_shared/pair-board.svelte';
  import CompareTable from '../_shared/compare-table.svelte';
  import { ratioTex } from '../_shared/tri.js';
  import { checkAA, checkSAS, checkSSS } from './engine.js';

  const SIDE_MAX = 15;
  /** @param {number} v */
  const deg = (v) => `${v}°`;

  let mode = $state('ccc');
  const MODES = [
    { value: 'ccc', label: 'c.c.c' },
    { value: 'cgc', label: 'c.g.c' },
    { value: 'gg', label: 'g.g' },
  ];

  // Starting data is close to similar but not quite, so the learner fixes it.
  let s1 = $state({ ab: 4, bc: 5, ca: 6 });
  let s2 = $state({ ab: 8, bc: 10, ca: 11 });
  let g1 = $state({ ab: 4, ca: 6, A: 60 });
  let g2 = $state({ ab: 6, ca: 9, A: 75 });
  let a1 = $state({ bc: 5, B: 50, C: 70 });
  let a2 = $state({ bc: 8, B: 50, C: 65 });

  const check = $derived(
    mode === 'ccc' ? checkSSS(s1, s2) : mode === 'cgc' ? checkSAS(g1, g2) : checkAA(a1, a2),
  );

  /** @type {Array<'A' | 'B' | 'C'>} */
  const marks = $derived(mode === 'cgc' ? ['A'] : mode === 'gg' ? ['B', 'C'] : []);

  const ratios = $derived(
    mode === 'ccc'
      ? [
          `\\dfrac{A'B'}{AB} = ${ratioTex(s2.ab, s1.ab)}`,
          `\\dfrac{B'C'}{BC} = ${ratioTex(s2.bc, s1.bc)}`,
          `\\dfrac{C'A'}{CA} = ${ratioTex(s2.ca, s1.ca)}`,
        ]
      : mode === 'cgc'
        ? [
            `\\dfrac{A'B'}{AB} = ${ratioTex(g2.ab, g1.ab)}`,
            `\\dfrac{A'C'}{AC} = ${ratioTex(g2.ca, g1.ca)}`,
            `\\widehat{A'} = ${g2.A}^\\circ,\\ \\widehat{A} = ${g1.A}^\\circ`,
          ]
        : [
            `\\widehat{B'} = ${a2.B}^\\circ,\\ \\widehat{B} = ${a1.B}^\\circ`,
            `\\widehat{C'} = ${a2.C}^\\circ,\\ \\widehat{C} = ${a1.C}^\\circ`,
          ],
  );

  /** @type {Record<string, string>} */
  const CASE_NAME = { ccc: 'cạnh – cạnh – cạnh', cgc: 'cạnh – góc – cạnh', gg: 'góc – góc' };

  const feedback = $derived.by(() => {
    const s = check.status;
    if (s === 'similar') {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `△A′B′C′ ∽ △ABC (${CASE_NAME[mode]}). Bảng dưới cho thấy mọi cạnh tương ứng đều tỉ lệ và mọi góc tương ứng đều bằng nhau.`,
      };
    }
    /** @type {Record<string, string>} */
    const why = {
      invalid:
        mode === 'gg'
          ? 'Tổng hai góc phải nhỏ hơn 180°, nếu không thì không có tam giác.'
          : 'Ba độ dài này không thoả bất đẳng thức tam giác: một cạnh phải nhỏ hơn tổng hai cạnh kia.',
      none:
        mode === 'ccc'
          ? 'Ba tỉ số chưa bằng nhau nên chưa đủ điều kiện c.c.c.'
          : mode === 'cgc'
            ? 'Hai cạnh chưa tỉ lệ và góc xen giữa chưa bằng nhau.'
            : 'Chưa có cặp góc tương ứng nào bằng nhau.',
      sides: 'Hai cạnh đã tỉ lệ nhưng góc xen giữa khác nhau: chưa đồng dạng. Hãy chỉnh góc A′.',
      angle: 'Góc xen giữa đã bằng nhau nhưng hai tỉ số cạnh khác nhau: chưa đồng dạng.',
      one: 'Mới có một cặp góc bằng nhau. Cần thêm một cặp nữa thì mới kết luận đồng dạng.',
      reordered:
        'Với cách ghép A ↔ A′, B ↔ B′, C ↔ C′ thì điều kiện chưa thoả, nhưng hai tam giác vẫn đồng dạng theo một cách ghép đỉnh khác. Xếp các cạnh từ nhỏ đến lớn, hoặc so các góc, để tìm cách ghép đúng.',
    };
    /** @type {'info' | 'warn'} */
    const tone = s === 'reordered' ? 'info' : 'warn';
    return { tone, text: why[s] };
  });
</script>

<div class="space-y-4">
  <SegmentedControl label="Trường hợp đồng dạng" options={MODES} bind:value={mode} />

  <PairBoard
    left={check.left}
    right={check.right}
    {marks}
    label="Tam giác ABC (bên trái) và tam giác A′B′C′ (bên phải), vẽ cùng tỉ lệ"
  />

  <div class="grid gap-4 sm:grid-cols-2">
    <fieldset class="space-y-2 rounded-xl border border-slate-200 p-3">
      <legend class="px-1 text-sm font-bold text-slate-900">Dữ kiện △ABC</legend>
      {#if mode === 'ccc'}
        <Stepper label="AB" bind:value={s1.ab} min={1} max={SIDE_MAX} />
        <Stepper label="BC" bind:value={s1.bc} min={1} max={SIDE_MAX} />
        <Stepper label="CA" bind:value={s1.ca} min={1} max={SIDE_MAX} />
      {:else if mode === 'cgc'}
        <Stepper label="AB" bind:value={g1.ab} min={1} max={SIDE_MAX} />
        <Stepper label="AC" bind:value={g1.ca} min={1} max={SIDE_MAX} />
        <SliderField label="Góc A" bind:value={g1.A} min={20} max={160} step={5} format={deg} />
      {:else}
        <Stepper label="BC" bind:value={a1.bc} min={1} max={SIDE_MAX} />
        <SliderField label="Góc B" bind:value={a1.B} min={10} max={150} step={5} format={deg} />
        <SliderField label="Góc C" bind:value={a1.C} min={10} max={150} step={5} format={deg} />
      {/if}
    </fieldset>
    <fieldset class="space-y-2 rounded-xl border border-slate-200 p-3">
      <legend class="px-1 text-sm font-bold text-slate-900">Dữ kiện △A′B′C′</legend>
      {#if mode === 'ccc'}
        <Stepper label="A′B′" bind:value={s2.ab} min={1} max={SIDE_MAX} />
        <Stepper label="B′C′" bind:value={s2.bc} min={1} max={SIDE_MAX} />
        <Stepper label="C′A′" bind:value={s2.ca} min={1} max={SIDE_MAX} />
      {:else if mode === 'cgc'}
        <Stepper label="A′B′" bind:value={g2.ab} min={1} max={SIDE_MAX} />
        <Stepper label="A′C′" bind:value={g2.ca} min={1} max={SIDE_MAX} />
        <SliderField label="Góc A′" bind:value={g2.A} min={20} max={160} step={5} format={deg} />
      {:else}
        <Stepper label="B′C′" bind:value={a2.bc} min={1} max={SIDE_MAX} />
        <SliderField label="Góc B′" bind:value={a2.B} min={10} max={150} step={5} format={deg} />
        <SliderField label="Góc C′" bind:value={a2.C} min={10} max={150} step={5} format={deg} />
      {/if}
    </fieldset>
  </div>

  <div class="space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3">
    <p class="text-sm font-semibold text-slate-700">Kiểm tra điều kiện của trường hợp</p>
    {#each ratios as r (r)}
      <div class="text-sm"><Tex math={r} /></div>
    {/each}
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  {#if check.left && check.right}
    <CompareTable left={check.left} right={check.right} />
  {/if}
</div>
