<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import PairBoard from '../_shared/pair-board.svelte';
  import CompareTable from '../_shared/compare-table.svelte';
  import { ratioTex } from '../_shared/tri.js';
  import { checkAcute, checkHypotenuseLeg, checkLegs } from './engine.js';

  const SIDE_MAX = 15;
  /** @param {number} v */
  const deg = (v) => `${v}°`;

  let mode = $state('goc');
  const MODES = [
    { value: 'goc', label: 'Góc nhọn' },
    { value: 'cgv', label: 'Hai cạnh góc vuông' },
    { value: 'hcgv', label: 'Cạnh huyền – cạnh góc vuông' },
  ];

  // Starting data are close to similar, so the learner has one thing to fix.
  let g1 = $state({ bc: 6, B: 35 });
  let g2 = $state({ bc: 10, B: 40 });
  let l1 = $state({ ab: 3, ca: 4 });
  let l2 = $state({ ab: 6, ca: 9 });
  let h1 = $state({ bc: 5, ab: 3 });
  let h2 = $state({ bc: 10, ab: 5 });

  const check = $derived(
    mode === 'goc'
      ? checkAcute(g1, g2)
      : mode === 'cgv'
        ? checkLegs(l1, l2)
        : checkHypotenuseLeg(h1, h2),
  );

  /** @type {Array<'A' | 'B' | 'C'>} */
  const marks = $derived(mode === 'goc' ? ['B'] : []);

  const lines = $derived(
    mode === 'goc'
      ? [`\\widehat{B'} = ${g2.B}^\\circ,\\ \\widehat{B} = ${g1.B}^\\circ`]
      : mode === 'cgv'
        ? [
            `\\dfrac{A'B'}{AB} = ${ratioTex(l2.ab, l1.ab)}`,
            `\\dfrac{A'C'}{AC} = ${ratioTex(l2.ca, l1.ca)}`,
          ]
        : [
            `\\dfrac{B'C'}{BC} = ${ratioTex(h2.bc, h1.bc)}`,
            `\\dfrac{A'B'}{AB} = ${ratioTex(h2.ab, h1.ab)}`,
          ],
  );

  /** @type {Record<string, string>} */
  const CASE_TEXT = {
    goc: 'có một góc nhọn bằng nhau',
    cgv: 'có hai cạnh góc vuông tỉ lệ',
    hcgv: 'có cạnh huyền và một cạnh góc vuông tỉ lệ',
  };

  const feedback = $derived.by(() => {
    const s = check.status;
    if (s === 'similar') {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Hai tam giác vuông ${CASE_TEXT[mode]} nên △A′B′C′ ∽ △ABC. Bảng dưới: mọi cạnh tương ứng tỉ lệ, mọi góc tương ứng bằng nhau.`,
      };
    }
    if (s === 'swapped') {
      return {
        tone: /** @type {const} */ ('info'),
        text:
          mode === 'goc'
            ? 'Góc B′ bằng góc C chứ không bằng góc B: hai tam giác vẫn đồng dạng nhưng B′ ứng với C, tức △A′B′C′ ∽ △ACB.'
            : mode === 'cgv'
              ? 'A′B′ tỉ lệ với AC và A′C′ tỉ lệ với AB: hai tam giác vẫn đồng dạng nhưng theo thứ tự △A′B′C′ ∽ △ACB.'
              : 'B′C′ : BC bằng A′B′ : AC (không phải A′B′ : AB): hai tam giác vẫn đồng dạng nhưng theo thứ tự △A′B′C′ ∽ △ACB.',
      };
    }
    if (s === 'invalid') {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Cạnh góc vuông phải ngắn hơn cạnh huyền, nếu không thì không có tam giác vuông.',
      };
    }
    /** @type {Record<string, string>} */
    const why = {
      goc: 'Hai góc nhọn B và B′ khác nhau nên hai tam giác vuông chưa đồng dạng.',
      cgv: 'Hai tỉ số cạnh góc vuông chưa bằng nhau nên hai tam giác vuông chưa đồng dạng.',
      hcgv: 'Tỉ số hai cạnh huyền khác tỉ số hai cạnh góc vuông nên hai tam giác chưa đồng dạng.',
    };
    return { tone: /** @type {const} */ ('warn'), text: why[mode] };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Dấu hiệu đồng dạng của tam giác vuông"
    options={MODES}
    bind:value={mode}
  />

  <PairBoard
    left={check.left}
    right={check.right}
    {marks}
    label="Tam giác ABC vuông tại A (bên trái) và tam giác A′B′C′ vuông tại A′ (bên phải), vẽ cùng tỉ lệ"
  />

  <div class="grid gap-4 sm:grid-cols-2">
    <fieldset class="space-y-2 rounded-xl border border-slate-200 p-3">
      <legend class="px-1 text-sm font-bold text-slate-900">△ABC vuông tại A</legend>
      {#if mode === 'goc'}
        <Stepper label="Cạnh huyền BC" bind:value={g1.bc} min={1} max={SIDE_MAX} />
        <SliderField label="Góc B" bind:value={g1.B} min={10} max={80} format={deg} />
      {:else if mode === 'cgv'}
        <Stepper label="AB" bind:value={l1.ab} min={1} max={SIDE_MAX} />
        <Stepper label="AC" bind:value={l1.ca} min={1} max={SIDE_MAX} />
      {:else}
        <Stepper label="Cạnh huyền BC" bind:value={h1.bc} min={2} max={SIDE_MAX} />
        <Stepper label="AB" bind:value={h1.ab} min={1} max={SIDE_MAX} />
      {/if}
    </fieldset>
    <fieldset class="space-y-2 rounded-xl border border-slate-200 p-3">
      <legend class="px-1 text-sm font-bold text-slate-900">△A′B′C′ vuông tại A′</legend>
      {#if mode === 'goc'}
        <Stepper label="Cạnh huyền B′C′" bind:value={g2.bc} min={1} max={SIDE_MAX} />
        <SliderField label="Góc B′" bind:value={g2.B} min={10} max={80} format={deg} />
      {:else if mode === 'cgv'}
        <Stepper label="A′B′" bind:value={l2.ab} min={1} max={SIDE_MAX} />
        <Stepper label="A′C′" bind:value={l2.ca} min={1} max={SIDE_MAX} />
      {:else}
        <Stepper label="Cạnh huyền B′C′" bind:value={h2.bc} min={2} max={SIDE_MAX} />
        <Stepper label="A′B′" bind:value={h2.ab} min={1} max={SIDE_MAX} />
      {/if}
    </fieldset>
  </div>

  <div class="space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3">
    <p class="text-sm font-semibold text-slate-700">Kiểm tra điều kiện</p>
    {#each lines as line (line)}
      <div class="text-sm"><Tex math={line} /></div>
    {/each}
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  {#if check.left && check.right}
    <CompareTable left={check.left} right={check.right} />
  {/if}
</div>
