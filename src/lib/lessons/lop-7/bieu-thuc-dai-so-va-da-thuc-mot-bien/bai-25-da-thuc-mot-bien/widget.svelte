<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { numText, termText, termTex, termsTex } from '../_shared/poly.js';
  import {
    PRESETS,
    cardsOf,
    hasLikeTerms,
    isArranged,
    likeOf,
    merge,
    move,
    readout,
  } from './engine.js';

  let presetId = $state(PRESETS[0].id);
  const preset = $derived(PRESETS.find((p) => p.id === presetId) ?? PRESETS[0]);
  let cards = $state(cardsOf(PRESETS[0].terms));
  /** @type {string | null} */
  let selectedId = $state(null);
  let message = $state('Chọn một thẻ để dời hoặc gộp nó.');

  const selected = $derived(cards.findIndex((c) => c.id === selectedId));
  const like = $derived(selected < 0 ? -1 : likeOf(cards, selected));
  const collected = $derived(!hasLikeTerms(cards));
  const arranged = $derived(collected && isArranged(cards));
  const info = $derived(readout(cards));
  const polyLine = $derived(`${preset.name} = ${termsTex(cards.map((c) => ({ c: c.c, e: c.e })))}`);

  /** @param {string | number} id */
  function choose(id) {
    presetId = String(id);
    cards = cardsOf(preset.terms);
    selectedId = null;
    message = 'Đa thức mới. Chọn một thẻ để dời hoặc gộp nó.';
  }

  /** @param {{ c: number, e: number }} t */
  const say = (t) => termText(t);

  /** @param {string} id */
  function pick(id) {
    selectedId = selectedId === id ? null : id;
    const card = cards.find((c) => c.id === id);
    if (selectedId && card) message = `Đã chọn hạng tử ${say(card)}, bậc ${card.e}.`;
  }

  /** @param {number} i @param {-1 | 1} dir */
  function shift(i, dir) {
    if (i < 0) return;
    const next = move(cards, i, dir);
    if (next === cards) {
      message = dir < 0 ? 'Thẻ đã ở đầu hàng.' : 'Thẻ đã ở cuối hàng.';
      return;
    }
    cards = next;
    message = `Đã dời ${say(cards[i + dir])} sang ${dir < 0 ? 'trái' : 'phải'}.`;
  }

  function combine() {
    if (selected < 0 || like < 0) return;
    const a = cards[selected];
    const b = cards[like];
    const sum = Math.round((a.c + b.c) * 1e9) / 1e9;
    cards = merge(cards, selected);
    message =
      sum === 0
        ? `${say(a)} và ${say(b)} có tổng bằng 0, cả hai hạng tử biến mất.`
        : `Gộp ${say(a)} và ${say(b)} được ${say({ c: sum, e: a.e })}.`;
    if (sum === 0) selectedId = null;
  }

  /** @param {KeyboardEvent} e @param {number} i */
  function onKey(e, i) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      shift(i, e.key === 'ArrowLeft' ? -1 : 1);
    }
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn đa thức"
    options={PRESETS.map((p) => ({ value: p.id, label: p.name }))}
    value={presetId}
    onchange={choose}
  />

  <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white p-3 text-center text-lg">
    <Tex math={polyLine} />
  </div>

  <ul
    class="flex flex-wrap justify-center gap-2"
    aria-label="Các hạng tử của đa thức, theo thứ tự đang viết"
  >
    {#each cards as card, i (card.id)}
      <li>
        <button
          type="button"
          class="min-h-12 min-w-16 rounded-xl border-2 px-3 py-2 text-lg transition {focusRing} {card.id ===
          selectedId
            ? 'border-indigo-600 bg-indigo-50'
            : i === like
              ? 'border-amber-500 bg-amber-50'
              : 'border-slate-300 bg-white hover:bg-slate-50'}"
          aria-pressed={card.id === selectedId}
          aria-label="Hạng tử {say(card)}, bậc {card.e}. Phím mũi tên trái, phải để dời."
          onclick={() => pick(card.id)}
          onkeydown={(e) => onKey(e, i)}
        >
          <Tex math={termTex(card)} />
          <span class="block text-xs text-slate-500">bậc {card.e}</span>
        </button>
      </li>
    {/each}
  </ul>

  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class={button.quiet}
      disabled={selected <= 0}
      onclick={() => shift(selected, -1)}>◀ Dời trái</button
    >
    <button
      type="button"
      class={button.quiet}
      disabled={selected < 0 || selected === cards.length - 1}
      onclick={() => shift(selected, 1)}>Dời phải ▶</button
    >
    <button type="button" class={button.secondary} disabled={like < 0} onclick={combine}
      >Gộp với hạng tử cùng bậc</button
    >
    <button type="button" class={button.quiet} onclick={() => choose(presetId)}>Làm lại</button>
  </div>

  <p class="text-center text-sm text-slate-600" aria-live="polite">{message}</p>

  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4" aria-live="polite">
    {#if !collected}
      <p class="font-semibold text-amber-800">
        Đa thức chưa thu gọn: vẫn còn hạng tử cùng bậc. Chọn một thẻ, thẻ cùng bậc với nó được tô
        vàng; bấm "Gộp" để cộng chúng lại.
      </p>
    {:else if cards.length === 0}
      <p class="font-semibold text-slate-700">
        Mọi hạng tử triệt tiêu: đây là đa thức không, không có bậc.
      </p>
    {:else if !arranged}
      <p class="font-semibold text-amber-800">
        Đa thức đã thu gọn. Bây giờ hãy dời các thẻ để số mũ giảm dần từ trái sang phải.
      </p>
    {:else}
      <p class="font-semibold text-emerald-700">
        Đã thu gọn và sắp xếp theo lũy thừa giảm dần của biến.
      </p>
      <ul class="mt-2 space-y-1 text-slate-700">
        <li>Bậc của đa thức: <strong>{info.degree}</strong> (số mũ cao nhất).</li>
        <li>
          Hệ số cao nhất: <strong>{numText(info.lead ?? 0)}</strong> (hệ số của hạng tử bậc {info.degree}).
        </li>
        <li>
          Hệ số tự do: <strong>{numText(info.free)}</strong>{info.free === 0
            ? ' (không có hạng tử bậc 0)'
            : ' (hạng tử bậc 0)'}.
        </li>
      </ul>
    {/if}
  </div>
</div>
