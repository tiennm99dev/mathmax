<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { DATA_SETS, checkFlags } from './engine.js';

  let setId = $state(DATA_SETS[0].id);
  /** @type {number[]} */
  let flagged = $state([]);
  let checked = $state(false);

  const set = $derived(DATA_SETS.find((s) => s.id === setId) ?? DATA_SETS[0]);
  const result = $derived(checkFlags(set, flagged));

  const options = DATA_SETS.map((s, k) => ({ value: s.id, label: `Bộ ${k + 1}` }));

  /** @param {string | number} _ */
  function reset(_) {
    flagged = [];
    checked = false;
  }

  /** @param {number} i */
  function toggle(i) {
    flagged = flagged.includes(i) ? flagged.filter((k) => k !== i) : [...flagged, i];
    checked = false;
  }

  const feedback = $derived.by(() => {
    if (!checked)
      return {
        tone: /** @type {const} */ ('info'),
        text: `Đã đánh dấu ${flagged.length} giá trị. Chạm vào các giá trị không hợp lí rồi bấm "Kiểm tra".`,
      };
    if (result.done)
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Chính xác! Em đã tìm đủ ${result.total} giá trị không hợp lí. ${result.found.map((i) => `${set.values[i].text}: ${set.values[i].bad}`).join(' ')}`,
      };
    const parts = [];
    if (result.found.length) parts.push(`Em đã tìm đúng ${result.found.length} giá trị.`);
    if (result.extra.length)
      parts.push(
        `${result.extra.map((i) => set.values[i].text).join('; ')}: vẫn hợp lí, hãy bỏ đánh dấu.`,
      );
    if (result.missed.length)
      parts.push(`Còn ${result.missed.length} giá trị không hợp lí em chưa tìm ra.`);
    return { tone: /** @type {const} */ ('warn'), text: parts.join(' ') };
  });
</script>

<div class="space-y-4">
  <SegmentedControl label="Bộ dữ liệu" {options} bind:value={setId} onchange={reset} />

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-3">
    <p class="font-semibold text-slate-800">{set.title}</p>
    <p class="text-sm text-slate-600">{set.context}</p>
    <ul class="mt-3 flex flex-wrap gap-2" aria-label="Các giá trị của bộ dữ liệu">
      {#each set.values as v, i (i)}
        {@const on = flagged.includes(i)}
        {@const reveal = checked && v.bad && !on}
        <li>
          <button
            type="button"
            class="min-h-11 min-w-14 rounded-lg border-2 px-3 py-2 text-lg font-semibold tabular-nums transition {focusRing} {on
              ? checked
                ? v.bad
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                  : 'border-amber-500 bg-amber-50 text-amber-900'
                : 'border-rose-500 bg-rose-50 text-rose-800'
              : reveal
                ? 'border-dashed border-slate-400 bg-white text-slate-800'
                : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
            aria-pressed={on}
            aria-label="Giá trị thứ {i + 1}: {v.text}{on ? ', đã đánh dấu không hợp lí' : ''}"
            onclick={() => toggle(i)}
          >
            {#if on}<span aria-hidden="true">✗ </span>{/if}{v.text}
          </button>
        </li>
      {/each}
    </ul>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => (checked = true)}>Kiểm tra</button>
    <button type="button" class={button.quiet} onclick={() => reset('')}>Làm lại</button>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
