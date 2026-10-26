<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card as cardClass, focusRing } from '#lib/core/ui.js';
  import { DECKS, boardStatus, degreeWords, groupInfo, partName } from './engine.js';

  /** @typedef {import('./engine.js').Card} Card */

  let deck = $state(0);
  /** @type {string[][]} */
  let groups = $state([[], []]);
  /** @type {string | null} */
  let selected = $state(null);
  let message = $state('Chọn một thẻ, rồi chọn nhóm để đặt thẻ vào.');

  const cards = $derived(DECKS[deck].cards);
  const byId = $derived(new Map(cards.map((c) => [c.id, c])));
  const placedIds = $derived(new Set(groups.flat()));
  const pool = $derived(cards.filter((c) => !placedIds.has(c.id)));
  const status = $derived(boardStatus(cards, groups));
  const filled = $derived(groups.map((ids) => ids.map((id) => /** @type {Card} */ (byId.get(id)))));

  const summary = $derived.by(() => {
    if (status.done) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Hoàn thành! ${status.total} đơn thức chia thành ${status.parts} nhóm đồng dạng; mỗi nhóm cộng hệ số và giữ nguyên phần biến.`,
      };
    }
    if (status.mixed.length > 0) {
      const g = filled[status.mixed[0]];
      const clash = groupInfo(g).clash;
      return {
        tone: /** @type {const} */ ('warn'),
        text: clash
          ? `Nhóm ${status.mixed[0] + 1} chưa đồng dạng: ${clash[0].label} có phần biến ${partName(clash[0].m)}, còn ${clash[1].label} có phần biến ${partName(clash[1].m)}.`
          : '',
      };
    }
    if (status.split) {
      const [i, j] = status.split;
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Nhóm ${i + 1} và nhóm ${j + 1} có cùng phần biến ${partName(filled[i][0].m)}: các đơn thức đồng dạng nên nằm chung một nhóm.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `Đã xếp ${status.placed}/${status.total} thẻ. ${message}`,
    };
  });

  /** @param {string} id */
  function pick(id) {
    selected = selected === id ? null : id;
    const c = byId.get(id);
    message = selected && c ? `Đã chọn ${c.label}. Chọn nhóm để đặt thẻ.` : 'Đã bỏ chọn thẻ.';
  }

  /** @param {number} g */
  function drop(g) {
    const c = selected ? byId.get(selected) : undefined;
    if (!c) {
      message = 'Hãy chọn một thẻ trước.';
      return;
    }
    groups = groups.map((ids, i) => {
      const rest = ids.filter((id) => id !== c.id);
      return i === g ? [...rest, c.id] : rest;
    });
    selected = null;
    message = `Đã đặt ${c.label} vào nhóm ${g + 1}.`;
  }

  function newGroup() {
    groups = [...groups, []];
    if (selected) drop(groups.length - 1);
    else message = `Đã thêm nhóm ${groups.length}.`;
  }

  /** @param {string} id */
  function takeBack(id) {
    groups = groups.map((ids) => ids.filter((x) => x !== id));
    selected = id;
    const c = byId.get(id);
    message = `Đã lấy ${c?.label ?? ''} ra. Chọn nhóm khác để đặt.`;
  }

  /** @param {DragEvent} e @param {number} g */
  function onDrop(e, g) {
    e.preventDefault();
    const id = e.dataTransfer?.getData('text/plain');
    if (id) selected = id;
    drop(g);
  }

  function reset() {
    groups = [[], []];
    selected = null;
    message = 'Chọn một thẻ, rồi chọn nhóm để đặt thẻ vào.';
  }

  const chip = `min-h-11 rounded-lg border px-3 py-2 text-lg font-semibold tabular-nums transition ${focusRing}`;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Bộ thẻ"
    options={DECKS.map((d, i) => ({ value: i, label: d.name }))}
    bind:value={deck}
    onchange={reset}
  />

  <div class="{cardClass} p-3">
    <p class="mb-2 text-sm font-semibold text-slate-700">Thẻ đơn thức chưa xếp ({pool.length})</p>
    {#if pool.length === 0}
      <p class="text-sm text-slate-500">Đã xếp hết thẻ.</p>
    {:else}
      <ul class="flex flex-wrap gap-2">
        {#each pool as c (c.id)}
          <li>
            <button
              type="button"
              draggable="true"
              aria-pressed={selected === c.id}
              aria-label="Thẻ {c.label}"
              class="{chip} {selected === c.id
                ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'}"
              onclick={() => pick(c.id)}
              ondragstart={(e) => {
                selected = c.id;
                e.dataTransfer?.setData('text/plain', c.id);
              }}>{c.label}</button
            >
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    {#each filled as members, g (g)}
      {@const info = groupInfo(members)}
      <div
        class="{cardClass} flex flex-col gap-2 p-3 {info.ok
          ? ''
          : 'border-amber-400 bg-amber-50/50'}"
      >
        <button
          type="button"
          class="min-h-11 rounded-xl border-2 border-dashed px-3 py-2 text-sm font-bold transition {focusRing} {selected
            ? 'border-indigo-400 bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
            : 'border-slate-300 bg-slate-50 text-slate-700'}"
          aria-label="Đặt thẻ đang chọn vào nhóm {g + 1}"
          onclick={() => drop(g)}
          ondragover={(e) => e.preventDefault()}
          ondrop={(e) => onDrop(e, g)}>Nhóm {g + 1}</button
        >
        {#if members.length > 0}
          <ul class="flex flex-wrap gap-2">
            {#each members as c (c.id)}
              <li>
                <button
                  type="button"
                  class="{chip} border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                  aria-label="{c.label} trong nhóm {g + 1}. Bấm để lấy lại thẻ."
                  onclick={() => takeBack(c.id)}>{c.label}</button
                >
              </li>
            {/each}
          </ul>
        {/if}
        {#if info.ok && info.sum}
          <p class="text-sm text-slate-700 tabular-nums">
            {#if members.length > 1}
              <span class="font-semibold text-emerald-700">Đồng dạng.</span> Cộng hệ số:
              <span class="font-semibold">{info.line}</span>
            {:else}
              Thu gọn: <span class="font-semibold">{info.line.split(' = ')[1]}</span>
            {/if}
            ({degreeWords(info.sum)}).
          </p>
        {:else if !info.ok}
          <p class="text-sm font-semibold text-amber-900">Có thẻ không đồng dạng trong nhóm này.</p>
        {/if}
      </div>
    {/each}
  </div>

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.secondary} onclick={newGroup}>
      {selected ? 'Đặt vào nhóm mới' : 'Thêm nhóm'}
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Xếp lại từ đầu</button>
  </div>

  <FeedbackNote tone={summary.tone} text={summary.text} />
</div>
