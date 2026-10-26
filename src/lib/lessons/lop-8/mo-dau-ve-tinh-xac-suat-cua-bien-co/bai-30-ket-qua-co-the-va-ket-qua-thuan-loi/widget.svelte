<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, textInput, focusRing } from '#lib/core/ui.js';
  import { EXPERIMENTS, checkPicked, favourable, pips } from './engine.js';

  let expId = $state(EXPERIMENTS[0].id);
  let eventId = $state(EXPERIMENTS[0].events[0].id);
  /** @type {string[]} */
  let picked = $state([]);
  /** @type {'chon' | 'kiem-tra' | 'dap-an'} */
  let stage = $state('chon');
  const selectId = $props.id();

  const exp = $derived(EXPERIMENTS.find((e) => e.id === expId) ?? EXPERIMENTS[0]);
  const event = $derived(exp.events.find((e) => e.id === eventId) ?? exp.events[0]);
  const fav = $derived(favourable(exp, event));
  const result = $derived(checkPicked(exp, event, picked));

  /** @param {string | number} id */
  function chooseExp(id) {
    expId = String(id);
    eventId = exp.events[0].id;
    reset();
  }

  function reset() {
    picked = [];
    stage = 'chon';
  }

  /** @param {string} id */
  function toggle(id) {
    if (stage === 'dap-an') return;
    picked = picked.includes(id) ? picked.filter((x) => x !== id) : [...picked, id];
    stage = 'chon';
  }

  function showAnswer() {
    picked = fav.map((o) => o.id);
    stage = 'dap-an';
  }

  /** @param {import('./engine.js').Outcome[]} list */
  const names = (list) => list.map((o) => o.label).join('; ');

  const feedback = $derived.by(() => {
    if (stage === 'chon')
      return {
        tone: /** @type {const} */ ('info'),
        text: `Có ${exp.outcomes.length} kết quả có thể. Em đã chọn ${picked.length} kết quả. Chạm vào những kết quả làm biến cố xảy ra rồi bấm "Kiểm tra".`,
      };
    const end =
      fav.length === 0
        ? 'Không có kết quả nào thuận lợi: biến cố này không thể xảy ra.'
        : fav.length === exp.outcomes.length
          ? 'Mọi kết quả có thể đều thuận lợi: biến cố này chắc chắn xảy ra.'
          : `Có ${fav.length} kết quả thuận lợi trong ${exp.outcomes.length} kết quả có thể.`;
    if (stage === 'dap-an')
      return {
        tone: /** @type {const} */ ('info'),
        text: `Các kết quả thuận lợi cho biến cố: ${fav.length ? names(fav) : 'không có'}. ${end}`,
      };
    if (result.correct) return { tone: /** @type {const} */ ('ok'), text: `Đúng rồi! ${end}` };
    const parts = [];
    if (result.missing.length) parts.push(`còn thiếu ${result.missing.length} kết quả thuận lợi`);
    if (result.extra.length) parts.push(`${names(result.extra)} không làm biến cố xảy ra`);
    return {
      tone: /** @type {const} */ ('warn'),
      text: `Chưa đúng: ${parts.join('; ')}. Hãy xem lại từng kết quả.`,
    };
  });

  /**
   * Whether the tile shows its verdict: after "Kiểm tra" only the picked
   * tiles do, so the missing ones are not given away; the answer shows all.
   * @param {import('./engine.js').Outcome} o
   */
  const judged = (o) => stage === 'dap-an' || (stage === 'kiem-tra' && picked.includes(o.id));

  /** @param {import('./engine.js').Outcome} o */
  function tileClass(o) {
    const on = picked.includes(o.id);
    if (!judged(o)) return on ? 'ring-4 ring-indigo-400 -translate-y-0.5' : '';
    return event.test(o) ? 'ring-4 ring-emerald-500' : 'ring-4 ring-rose-500';
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hành động"
    options={EXPERIMENTS.map((e) => ({ value: e.id, label: e.label }))}
    value={expId}
    onchange={chooseExp}
  />
  <p class="text-sm text-slate-700">{exp.action}</p>

  <div>
    <label for={selectId} class="mb-1 block text-sm font-semibold text-slate-700">Biến cố E</label>
    <select id={selectId} class="{textInput} text-base" bind:value={eventId} onchange={reset}>
      {#each exp.events as e (e.id)}
        <option value={e.id}>"{e.text}"</option>
      {/each}
    </select>
  </div>

  <div>
    <p class="mb-2 text-sm font-semibold text-slate-700">
      Các kết quả có thể ({exp.outcomes.length} kết quả):
    </p>
    <ul class="flex flex-wrap gap-2" aria-label="Các kết quả có thể">
      {#each exp.outcomes as o (o.id)}
        {@const on = picked.includes(o.id)}
        <li>
          <button
            type="button"
            class="flex h-14 w-14 items-center justify-center rounded-xl border-2 text-lg font-bold transition {focusRing} {o.color ===
            'vang'
              ? 'border-amber-500 bg-amber-100 text-amber-950'
              : o.color === 'xanh'
                ? 'border-sky-600 bg-sky-100 text-sky-950'
                : on
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                  : 'border-slate-300 bg-white text-slate-800'} {tileClass(o)}"
            aria-pressed={on}
            aria-label="{o.name}{judged(o)
              ? event.test(o)
                ? ', thuận lợi'
                : ', không thuận lợi'
              : ''}"
            onclick={() => toggle(o.id)}
          >
            {#if exp.look === 'xuc-xac'}
              <svg viewBox="0 0 1 1" class="h-10 w-10" aria-hidden="true">
                <rect
                  x="0.04"
                  y="0.04"
                  width="0.92"
                  height="0.92"
                  rx="0.18"
                  fill={on ? '#fef3c7' : '#ffffff'}
                  stroke="#334155"
                  stroke-width="0.06"
                />
                {#each pips(o.value) as [x, y], i (i)}
                  <circle cx={x} cy={y} r="0.09" fill="#1e293b" />
                {/each}
              </svg>
            {:else}
              {o.label}
            {/if}
          </button>
        </li>
      {/each}
    </ul>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => (stage = 'kiem-tra')}
      >Kiểm tra</button
    >
    <button type="button" class={button.secondary} onclick={showAnswer}>Xem đáp án</button>
    <button type="button" class={button.quiet} onclick={reset}>Chọn lại</button>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
