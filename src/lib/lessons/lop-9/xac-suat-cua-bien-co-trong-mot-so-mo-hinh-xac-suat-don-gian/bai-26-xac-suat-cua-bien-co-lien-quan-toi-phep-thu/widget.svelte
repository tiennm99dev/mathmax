<script>
  import { SvelteSet } from 'svelte/reactivity';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import {
    CELLS,
    EVENTS,
    FACES,
    cellText,
    check,
    favourable,
    probability,
    probabilityTex,
  } from './engine.js';

  const FREE = 'tu-chon';

  let eventId = $state(EVENTS[0].id);
  /** @type {'cap' | 'tong' | 'tich'} */
  let mode = $state('cap');
  const marked = new SvelteSet();
  /** @type {ReturnType<typeof check> | null} */
  let result = $state(null);
  let announce = $state('');
  const selectId = $props.id();

  const event = $derived(EVENTS.find((e) => e.id === eventId) ?? null);
  const k = $derived(marked.size);
  const prob = $derived(probability(k));

  function reset() {
    marked.clear();
    result = null;
    announce = '';
  }

  /** @param {{ i: number, j: number, key: string }} c */
  function toggle(c) {
    if (marked.has(c.key)) marked.delete(c.key);
    else marked.add(c.key);
    result = null;
    announce = `${marked.has(c.key) ? 'Đã tô' : 'Bỏ tô'} ô (${c.i}, ${c.j}). Có ${marked.size} kết quả được tô.`;
  }

  function verify() {
    if (!event) return;
    result = check(marked, event);
  }

  function reveal() {
    if (!event) return;
    marked.clear();
    for (const key of favourable(event)) marked.add(key);
    result = check(marked, event);
    announce = `Đã tô đủ ${marked.size} kết quả thuận lợi.`;
  }

  /** @param {string} key */
  const pairOf = (key) => `(${key.replace('-', ', ')})`;

  /** @param {string} key */
  function cellClass(key) {
    const on = marked.has(key);
    if (result && result.extra.includes(key))
      return 'bg-rose-200 text-rose-900 ring-2 ring-rose-500';
    if (result && result.missing.includes(key))
      return 'bg-amber-50 text-amber-900 ring-2 ring-amber-500';
    return on ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 hover:bg-indigo-50';
  }

  const feedback = $derived.by(() => {
    const ratio =
      k === 0 || k === 36 ? '' : ` (khoảng ${formatNumber((k / 36) * 100, 1)}% số kết quả)`;
    if (!event)
      return {
        tone: /** @type {const} */ ('info'),
        text: `Em đã tô ${k} trong 36 kết quả đồng khả năng${ratio}. Biến cố gồm đúng các ô này có xác suất ${k}/36.`,
      };
    if (!result)
      return {
        tone: /** @type {const} */ ('info'),
        text: `Tô mọi ô thuận lợi cho biến cố "${event.text}" rồi bấm "Kiểm tra". Đã tô ${k} ô.`,
      };
    if (result.right)
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đúng! Có ${k} kết quả thuận lợi trong 36 kết quả, nên P(E) = ${k}/36${prob.p !== k ? ` = ${prob.q === 1 ? prob.p : `${prob.p}/${prob.q}`}` : ''}.`,
      };
    const parts = [];
    if (result.missing.length) parts.push(`còn thiếu ${result.missing.length} ô (viền vàng)`);
    if (result.extra.length)
      parts.push(
        `có ${result.extra.length} ô tô nhầm (màu đỏ), ví dụ ${pairOf(result.extra[0])} không làm E xảy ra`,
      );
    return { tone: /** @type {const} */ ('warn'), text: `Chưa đúng: ${parts.join('; ')}.` };
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <div>
      <label for={selectId} class="mb-1 block text-sm font-semibold text-slate-700">Biến cố E</label
      >
      <select id={selectId} class="{textInput} text-base" bind:value={eventId} onchange={reset}>
        {#each EVENTS as e (e.id)}
          <option value={e.id}>"{e.text}"</option>
        {/each}
        <option value={FREE}>Tự tô một biến cố tùy ý</option>
      </select>
    </div>
    <SegmentedControl
      label="Ghi trên mỗi ô"
      options={[
        { value: 'cap', label: 'Cặp (i, j)' },
        { value: 'tong', label: 'Tổng' },
        { value: 'tich', label: 'Tích' },
      ]}
      bind:value={mode}
    />
  </div>

  <div class="overflow-x-auto">
    <div
      class="mx-auto grid w-full max-w-md grid-cols-7 gap-1 text-center text-xs tabular-nums sm:text-sm"
      role="group"
      aria-label="Bảng 36 kết quả khi gieo hai con xúc xắc; hàng là số chấm con thứ nhất, cột là số chấm con thứ hai"
    >
      <div class="flex items-center justify-center text-[10px] leading-tight text-slate-500">
        i \ j
      </div>
      {#each FACES as j (j)}
        <div class="flex min-h-8 items-center justify-center font-bold text-slate-700">{j}</div>
      {/each}
      {#each FACES as i (i)}
        <div class="flex items-center justify-center font-bold text-slate-700">{i}</div>
        {#each CELLS.filter((c) => c.i === i) as c (c.key)}
          <button
            type="button"
            class="min-h-11 rounded-md border border-slate-300 px-0.5 font-semibold transition focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none {cellClass(
              c.key,
            )}"
            aria-pressed={marked.has(c.key)}
            aria-label="Kết quả ({c.i}, {c.j}), tổng {c.i + c.j}, tích {c.i * c.j}"
            onclick={() => toggle(c)}>{cellText(mode, c.i, c.j)}</button
          >
        {/each}
      {/each}
    </div>
  </div>

  <div class="flex flex-wrap items-center gap-3">
    <span class="text-lg">
      <Tex math={probabilityTex(k)} ariaLabel="P của E bằng {k} phần 36" />
    </span>
    {#if event}
      <button type="button" class={button.primary} onclick={verify}>Kiểm tra</button>
      <button type="button" class={button.quiet} onclick={reveal}>Hiện đáp án</button>
    {/if}
    <button type="button" class={button.quiet} onclick={reset} disabled={k === 0}>Xóa hết</button>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
  <p class="sr-only" aria-live="polite">{announce}</p>
</div>
