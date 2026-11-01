<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import TableGrid from '../_shared/table-grid.svelte';
  import { KIND_LABELS, jumpMessage } from '../_shared/times.js';
  import { BASE, hopsFor, round } from './engine.js';

  let mode = $state(/** @type {'build' | 'quiz'} */ ('build'));
  let step = $state(0);

  const message = $derived(
    jumpMessage(BASE, step, 'Em đứng ở số 0. Em chạm "Nhảy thêm 2" để bắt đầu.'),
  );

  function jump() {
    if (step < 10) step += 1;
  }

  function back() {
    if (step > 0) step -= 1;
  }

  const big = 'min-h-12 text-lg aria-disabled:cursor-not-allowed aria-disabled:opacity-50';
</script>

{#snippet line(/** @type {number} */ hops)}
  <NumberLine
    min={0}
    max={20}
    step={BASE}
    value={BASE * hops}
    interactive={false}
    width={340}
    hops={hopsFor(hops)}
    label="Tia số từ 0 đến 20, đã nhảy {hops} bước 2"
    markerLabel="Vị trí đang đứng"
  />
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'build', label: 'Lập bảng' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'build'}
    {@render line(step)}

    <div class="flex flex-wrap gap-3">
      <button type="button" class="{big} {button.primary}" aria-disabled={step >= 10} onclick={jump}
        >Nhảy thêm 2</button
      >
      <button type="button" class="{big} {button.quiet}" aria-disabled={step <= 0} onclick={back}
        >Lùi lại</button
      >
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {step === 10
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {message}
    </p>

    <TableGrid base={BASE} shown={step} />
  {:else}
    <ChoiceRound build={round} labels={KIND_LABELS} allGood="Em đã thuộc bảng nhân 2 rồi!">
      {#snippet visual(/** @type {{ visual?: { n: number } }} */ q, /** @type {boolean} */ settled)}
        {@render line(settled ? (q.visual?.n ?? 0) : 0)}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
