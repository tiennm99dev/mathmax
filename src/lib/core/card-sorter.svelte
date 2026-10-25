<script>
  import { button, card as cardClass, focusRing } from './ui.js';
  import { clearWrong, isCorrect, moveFeedback, place, progress } from './card-sorter.js';

  /**
   * Sort cards into bins. Pick a card (tap or Enter/Space), then pick a bin;
   * on a desktop the card can also be dragged onto a bin. Every placement is
   * checked at once and its reason is announced. Tap a placed card to take it
   * back, or take back every wrong card at once.
   *
   * - `cards`: each with its correct `bin` and the `why` shown after placing.
   * - `bins`: the bins, in display order.
   * - `label`: names the whole activity for screen readers.
   * - `face`: optional snippet drawing a card's face (the label is used otherwise).
   * - `hintOnWrong`: after a wrong move, show the card's `why` as a hint
   *   instead of only saying to try another bin.
   *
   * @type {{
   *   cards: import('./card-sorter.js').SortCard[];
   *   bins: import('./card-sorter.js').SortBin[];
   *   label: string;
   *   face?: import('svelte').Snippet<[import('./card-sorter.js').SortCard]>;
   *   hintOnWrong?: boolean;
   * }}
   */
  let { cards, bins, label, face, hintOnWrong = false } = $props();

  /** @type {import('./card-sorter.js').Placements} */
  let placements = $state({});
  /** @type {string | null} */
  let selected = $state(null);
  let message = $state('Chọn một thẻ, rồi chọn ô phù hợp để đặt thẻ vào.');

  const pool = $derived(cards.filter((c) => placements[c.id] === undefined));
  const stats = $derived(progress(cards, placements));

  /** @param {string} id */
  function pick(id) {
    selected = selected === id ? null : id;
    const c = cards.find((x) => x.id === id);
    if (selected && c) message = `Đã chọn "${c.label}". Chọn ô để đặt thẻ.`;
  }

  /** @param {string} binId */
  function drop(binId) {
    const c = cards.find((x) => x.id === selected);
    if (!c) {
      message = 'Hãy chọn một thẻ trước.';
      return;
    }
    placements = place(placements, c.id, binId);
    selected = null;
    message = moveFeedback(c, binId, bins, hintOnWrong);
  }

  /** @param {string} id */
  function takeBack(id) {
    placements = place(placements, id, null);
    selected = id;
    message = 'Đã lấy thẻ ra. Chọn ô khác để đặt.';
  }

  function retryWrong() {
    placements = clearWrong(cards, placements);
    selected = null;
    message = 'Các thẻ xếp sai đã trở về hàng chờ. Thử lại nhé.';
  }

  function reset() {
    placements = {};
    selected = null;
    message = 'Chọn một thẻ, rồi chọn ô phù hợp để đặt thẻ vào.';
  }
</script>

{#snippet cardFace(/** @type {import('./card-sorter.js').SortCard} */ c)}
  {#if face}{@render face(c)}{:else}{c.label}{/if}
{/snippet}

<div class="space-y-4" role="group" aria-label={label}>
  <div class="{cardClass} p-3">
    <p class="mb-2 text-sm font-semibold text-slate-700">
      Thẻ chưa xếp ({pool.length})
    </p>
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
              class="min-h-11 rounded-lg border px-3 py-2 text-left text-sm font-medium transition {focusRing} {selected ===
              c.id
                ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'}"
              onclick={() => pick(c.id)}
              ondragstart={(e) => {
                selected = c.id;
                e.dataTransfer?.setData('text/plain', c.id);
              }}
            >
              {@render cardFace(c)}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    {#each bins as b (b.id)}
      <div class="{cardClass} flex flex-col gap-2 p-3">
        <button
          type="button"
          class="min-h-14 rounded-xl border-2 border-dashed px-3 py-2 text-base font-bold transition {focusRing} {selected
            ? 'border-indigo-400 bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
            : 'border-slate-300 bg-slate-50 text-slate-700'}"
          aria-label="Đặt thẻ đang chọn vào ô {b.label}"
          onclick={() => drop(b.id)}
          ondragover={(e) => e.preventDefault()}
          ondrop={(e) => {
            e.preventDefault();
            const id = e.dataTransfer?.getData('text/plain');
            if (id) selected = id;
            drop(b.id);
          }}
        >
          {b.label}
        </button>
        <ul class="flex flex-wrap gap-2">
          {#each cards.filter((c) => placements[c.id] === b.id) as c (c.id)}
            {@const ok = isCorrect(c, placements)}
            <li>
              <button
                type="button"
                class="min-h-11 rounded-lg border px-3 py-2 text-left text-sm font-medium {focusRing} {ok
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                  : 'border-rose-400 bg-rose-50 text-rose-900'}"
                aria-label="{c.label}: {ok ? 'đúng' : 'chưa đúng'}. Bấm để lấy lại thẻ."
                onclick={() => takeBack(c.id)}
              >
                <span aria-hidden="true">{ok ? '✓' : '✗'}</span>
                {@render cardFace(c)}
              </button>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {stats.done
      ? 'bg-emerald-50 text-emerald-800'
      : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {stats.done ? `Hoàn thành: cả ${stats.total} thẻ đều đúng chỗ! ` : ''}{message}
  </p>
  <div class="flex flex-wrap items-center gap-3">
    <span class="text-sm text-slate-600 tabular-nums">
      Đúng {stats.correct}/{stats.total} thẻ
    </span>
    <button
      type="button"
      class={button.quiet}
      disabled={stats.placed === stats.correct}
      onclick={retryWrong}>Gỡ thẻ sai</button
    >
    <button type="button" class={button.quiet} onclick={reset}>Xếp lại từ đầu</button>
  </div>
</div>
