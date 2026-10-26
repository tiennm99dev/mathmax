<script>
  import Tex from '#lib/components/tex.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { polyTex } from '#lib/algebra-engine/polynomial.js';
  import CancelBoard from '../_shared/cancel-board.svelte';
  import { expand, polyRatioText } from '../_shared/factors.js';
  import { PRESETS } from './engine.js';

  const options = PRESETS.map((p, i) => ({
    value: i,
    label: polyRatioText(expand(p.top), expand(p.bottom)),
  }));

  /** @type {string | number} */
  let choice = $state(0);
  const preset = $derived(PRESETS[Number(choice)]);
  let topOut = $state(PRESETS[0].top.map(() => false));
  let bottomOut = $state(PRESETS[0].bottom.map(() => false));
  let done = $state(false);

  function changePreset() {
    const p = PRESETS[Number(choice)];
    topOut = p.top.map(() => false);
    bottomOut = p.bottom.map(() => false);
    done = false;
  }

  const given = $derived(
    `\\dfrac{${polyTex(expand(preset.top))}}{${polyTex(expand(preset.bottom))}}`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Phân thức cần rút gọn"
    {options}
    bind:value={choice}
    onchange={changePreset}
  />

  <p class="text-center text-xl"><Tex math={given} display /></p>
  <p class="text-sm text-slate-600">
    Bước 1 đã làm sẵn: tử và mẫu được phân tích thành nhân tử, mỗi thẻ là một nhân tử (số được tách
    thành thừa số nguyên tố). Bước 2 là việc của em: chia cả tử và mẫu cho từng nhân tử chung.
  </p>

  {#key choice}
    <CancelBoard
      top={preset.top}
      bottom={preset.bottom}
      bind:topOut
      bind:bottomOut
      ondone={() => (done = true)}
    />
  {/key}

  {#if done}
    <p class="rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-900">{preset.why}</p>
  {/if}
</div>
