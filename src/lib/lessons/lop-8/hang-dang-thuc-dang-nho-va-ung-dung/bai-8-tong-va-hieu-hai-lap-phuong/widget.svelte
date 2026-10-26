<script>
  import Tex from '#lib/components/tex.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { intText, operand } from '#lib/core/number-format.js';
  import { LEFT, RIGHT, leftValue, matches, rightValue, witness } from './engine.js';

  const uid = $props.id();

  /** @type {string | null} */
  let leftId = $state(null);
  /** @type {string | null} */
  let rightId = $state(null);
  let x = $state(0);
  /** @type {Record<string, string>} left id → right id, for pairs found */
  let done = $state({});
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  let note = $state({
    tone: 'info',
    text: 'Chọn một biểu thức ở cột trái, rồi chọn dạng tích ở cột phải mà em cho là bằng nó.',
  });

  const left = $derived(LEFT.find((c) => c.id === leftId) ?? null);
  const right = $derived(RIGHT.find((c) => c.id === rightId) ?? null);
  const usedRight = $derived(new Set(Object.values(done)));
  const found = $derived(Object.keys(done).length);

  const lv = $derived(left ? leftValue(left, x) : null);
  const rv = $derived(right ? rightValue(right, x) : null);

  /** @param {string} id */
  function chooseLeft(id) {
    if (done[id]) return;
    leftId = id;
  }

  /** @param {string} id */
  function chooseRight(id) {
    if (usedRight.has(id)) return;
    rightId = id;
  }

  function check() {
    if (!left || !right) return;
    if (matches(left, right)) {
      done = { ...done, [left.id]: right.id };
      const all = Object.keys(done).length === LEFT.length;
      note = {
        tone: 'ok',
        text: all
          ? 'Tuyệt vời! Em đã ghép đúng cả bốn cặp. Để ý dấu: tổng hai lập phương đi với "bình phương thiếu" có dấu trừ ở giữa, hiệu hai lập phương đi với dấu cộng ở giữa.'
          : 'Đúng rồi! Nhân hai nhân tử ra, các hạng tử ở giữa triệt tiêu hết, chỉ còn hai lập phương.',
      };
      leftId = null;
      rightId = null;
      return;
    }
    const w = /** @type {number} */ (witness(left, right));
    const a = leftValue(left, w);
    const b = rightValue(right, w).value;
    note = {
      tone: 'warn',
      text: `Chưa đúng. Thử x = ${intText(w)}: biểu thức bên trái bằng ${intText(a)}, còn tích bằng ${intText(b)}. Kiểm tra lại dấu trong ngoặc thứ hai.`,
    };
  }

  function reset() {
    done = {};
    leftId = null;
    rightId = null;
    note = { tone: 'info', text: 'Bắt đầu lại: chọn một biểu thức ở cột trái.' };
  }

  const compareText = $derived.by(() => {
    if (lv === null || rv === null) return '';
    if (lv !== rv.value) {
      return `Tại x = ${intText(x)} hai biểu thức khác nhau, nên chắc chắn chúng không bằng nhau.`;
    }
    return `Tại x = ${intText(x)} hai biểu thức bằng nhau. Một giá trị bằng nhau chưa đủ để kết luận; hãy thử thêm vài giá trị x.`;
  });

  const cardBase = `min-h-11 w-full rounded-lg border px-3 py-2 text-left transition ${focusRing}`;

  /**
   * @param {boolean} selected
   * @param {boolean} locked
   */
  function cardClass(selected, locked) {
    if (locked) return `${cardBase} border-emerald-300 bg-emerald-50 text-emerald-900`;
    if (selected) return `${cardBase} border-indigo-500 bg-indigo-50 ring-2 ring-indigo-300`;
    return `${cardBase} border-slate-300 bg-white hover:bg-slate-50`;
  }
</script>

<div class="space-y-4">
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1.6fr]">
    <section aria-labelledby="{uid}-left">
      <h3 id="{uid}-left" class="mb-2 text-sm font-semibold text-slate-700">
        Tổng, hiệu hai lập phương
      </h3>
      <ul class="space-y-2">
        {#each LEFT as card (card.id)}
          <li>
            <button
              type="button"
              class={cardClass(leftId === card.id, Boolean(done[card.id]))}
              aria-pressed={leftId === card.id}
              disabled={Boolean(done[card.id])}
              onclick={() => chooseLeft(card.id)}
            >
              <Tex math={card.tex} />
              {#if done[card.id]}
                <span class="ml-1 text-sm font-semibold">✓</span>
              {/if}
            </button>
          </li>
        {/each}
      </ul>
    </section>

    <section aria-labelledby="{uid}-right">
      <h3 id="{uid}-right" class="mb-2 text-sm font-semibold text-slate-700">Dạng tích</h3>
      <ul class="grid grid-cols-1 gap-2 md:grid-cols-2">
        {#each RIGHT as card (card.id)}
          <li>
            <button
              type="button"
              class={cardClass(rightId === card.id, usedRight.has(card.id))}
              aria-pressed={rightId === card.id}
              disabled={usedRight.has(card.id)}
              onclick={() => chooseRight(card.id)}
            >
              <Tex math={card.tex} />
            </button>
          </li>
        {/each}
      </ul>
    </section>
  </div>

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
    <SliderField label="Thử với giá trị x" bind:value={x} min={-3} max={3} format={intText} />
    <div class="mt-3 space-y-1 overflow-x-auto text-slate-800" aria-live="polite">
      {#if left}
        <p>
          Trái: <Tex math={left.tex} /> = {intText(/** @type {number} */ (lv))}
        </p>
      {:else}
        <p class="text-sm text-slate-500">Chưa chọn biểu thức bên trái.</p>
      {/if}
      {#if right && rv}
        <p>
          Phải: <Tex math={right.tex} /> = {operand(rv.first)} · {operand(rv.second)} = {intText(
            rv.value,
          )}
        </p>
      {:else}
        <p class="text-sm text-slate-500">Chưa chọn dạng tích bên phải.</p>
      {/if}
      {#if compareText}
        <p class="text-sm font-semibold {lv === rv?.value ? 'text-emerald-800' : 'text-rose-800'}">
          {compareText}
        </p>
      {/if}
    </div>
  </div>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.primary} disabled={!left || !right} onclick={check}>
      Ghép cặp
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
    <span class="text-sm font-semibold text-slate-700 tabular-nums"
      >Đã ghép đúng {found}/{LEFT.length}</span
    >
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
