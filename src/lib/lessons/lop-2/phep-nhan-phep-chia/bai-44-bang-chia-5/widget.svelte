<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import PictureGroups from '../_shared/picture-groups.svelte';
  import { KIND_LABELS } from '../_shared/divide.js';
  import { BASE, ROWS, gridMessage, round } from './engine.js';

  let mode = $state(/** @type {'grid' | 'quiz'} */ ('grid'));
  let chosen = $state(0);

  const message = $derived(gridMessage(chosen));
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'grid', label: 'Lưới 5 cột' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'grid'}
    <ul class="space-y-1" aria-label="Lưới 5 cột, mỗi hàng 5 bông hoa">
      {#each ROWS as n (n)}
        {@const filled = n <= chosen}
        <li>
          <button
            type="button"
            class="flex min-h-12 w-full items-center justify-between gap-2 rounded-xl border-2 px-2 {n ===
            chosen
              ? 'border-amber-500 bg-amber-100'
              : filled
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-slate-200 bg-white hover:border-indigo-400'} {focusRing}"
            aria-pressed={n === chosen}
            aria-label="Chọn {BASE * n} bông hoa"
            onclick={() => (chosen = n)}
          >
            <span class="flex {filled ? '' : 'opacity-25'}" aria-hidden="true">
              {#each { length: BASE } as _, c (c)}
                <Picture name="flower" size={28} decorative />
              {/each}
            </span>
            <span class="text-xl font-bold tabular-nums" aria-hidden="true">
              {BASE * n} : {BASE} = {filled ? n : '?'}
            </span>
          </button>
        </li>
      {/each}
    </ul>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {chosen > 0
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {message}
    </p>
  {:else}
    <ChoiceRound build={round} labels={KIND_LABELS} allGood="Em đã thuộc bảng chia 5 rồi!">
      {#snippet visual(/** @type {{ visual?: { n: number } }} */ q, /** @type {boolean} */ settled)}
        <PictureGroups
          each={BASE}
          groups={q.visual?.n ?? 1}
          grouped={settled}
          picture="flower"
          noun="bông hoa"
        />
      {/snippet}
    </ChoiceRound>
  {/if}
</div>
