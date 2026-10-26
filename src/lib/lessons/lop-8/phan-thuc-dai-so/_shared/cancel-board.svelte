<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { polyTex, polyText } from '#lib/algebra-engine/polynomial.js';
  import { hasCommon, ratioTex, ratioText, standing } from './factors.js';

  /**
   * Factor cards of a numerator above a fraction bar and of a denominator
   * below it. The learner taps a card in one row, then an equal card in the
   * other row, and both are struck out: dividing the numerator and the
   * denominator by a common factor. "Không còn nhân tử chung" checks that the
   * fraction is fully reduced.
   *
   * - `top`, `bottom`: the factors; a number other than ±1 is given as its
   *   prime factors so that equal primes cancel.
   * - `topOut`, `bottomOut` (bindable): struck flags, one per factor; the
   *   parent resets them (and remounts the board with `{#key}`) for a new
   *   fraction.
   * - `ondone`: called when the learner rightly says nothing more cancels.
   * @type {{
   *   top: import('./factors.js').Factor[];
   *   bottom: import('./factors.js').Factor[];
   *   topOut: boolean[];
   *   bottomOut: boolean[];
   *   ondone?: () => void;
   * }}
   */
  let { top, bottom, topOut = $bindable(), bottomOut = $bindable(), ondone } = $props();

  /** @type {{ side: 'top' | 'bottom', index: number } | null} */
  let picked = $state(null);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  let note = $state({
    tone: 'info',
    text: 'Chạm một nhân tử ở tử, rồi chạm nhân tử giống hệt nó ở mẫu để gạch cả hai.',
  });

  const current = $derived(ratioTex(standing(top, topOut), standing(bottom, bottomOut)));

  /**
   * @param {'top' | 'bottom'} side
   * @param {number} index
   */
  function tap(side, index) {
    const list = side === 'top' ? top : bottom;
    const f = list[index];
    if (!picked || picked.side === side) {
      picked = { side, index };
      note = {
        tone: 'info',
        text: `Đã chọn ${polyText(f.poly)} ở ${side === 'top' ? 'tử' : 'mẫu'}. Giờ chạm nhân tử giống nó ở ${side === 'top' ? 'mẫu' : 'tử'}.`,
      };
      return;
    }
    const other = (picked.side === 'top' ? top : bottom)[picked.index];
    if (other.key !== f.key) {
      note = {
        tone: 'warn',
        text: `${polyText(other.poly)} và ${polyText(f.poly)} không phải cùng một nhân tử, nên không gạch được. Chỉ chia cả tử và mẫu cho một nhân tử chung.`,
      };
      picked = null;
      return;
    }
    const t = picked.side === 'top' ? picked.index : index;
    const b = picked.side === 'top' ? index : picked.index;
    topOut = topOut.map((v, i) => v || i === t);
    bottomOut = bottomOut.map((v, i) => v || i === b);
    picked = null;
    note = {
      tone: 'ok',
      text: `Chia cả tử và mẫu cho ${polyText(f.poly)}: còn ${ratioText(standing(top, topOut), standing(bottom, bottomOut))}.`,
    };
  }

  function finish() {
    picked = null;
    if (hasCommon(top, topOut, bottom, bottomOut)) {
      note = { tone: 'warn', text: 'Chưa xong: tử và mẫu vẫn còn một nhân tử chung. Hãy tìm nó.' };
      return;
    }
    note = {
      tone: 'ok',
      text: `Đúng rồi! Tử và mẫu không còn nhân tử chung. Kết quả rút gọn: ${ratioText(standing(top, topOut), standing(bottom, bottomOut))}.`,
    };
    ondone?.();
  }

  function reset() {
    picked = null;
    topOut = top.map(() => false);
    bottomOut = bottom.map(() => false);
    note = { tone: 'info', text: 'Làm lại từ đầu: mọi nhân tử đã hiện lại.' };
  }

  const chip = `relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border-2 px-3 py-1 text-lg transition ${focusRing}`;
</script>

{#snippet row(/** @type {'top' | 'bottom'} */ side)}
  {@const list = side === 'top' ? top : bottom}
  {@const out = side === 'top' ? topOut : bottomOut}
  <div
    class="flex flex-wrap items-center justify-center gap-2"
    role="group"
    aria-label={side === 'top' ? 'Nhân tử của tử thức' : 'Nhân tử của mẫu thức'}
  >
    {#each list as f, i (i)}
      {@const isPicked = picked?.side === side && picked.index === i}
      <button
        type="button"
        class="{chip} {out[i]
          ? 'border-slate-200 bg-slate-50 text-slate-400 line-through decoration-rose-500 decoration-2'
          : isPicked
            ? 'border-indigo-600 bg-indigo-50'
            : 'border-slate-300 bg-white hover:border-indigo-400'}"
        disabled={out[i]}
        aria-pressed={isPicked}
        aria-label="{side === 'top' ? 'Tử' : 'Mẫu'}: nhân tử {polyText(f.poly)}{out[i]
          ? ', đã gạch'
          : ''}"
        onclick={() => tap(side, i)}
      >
        <Tex math={polyTex(f.poly)} />
        {#if out[i]}
          <span
            class="pointer-events-none absolute inset-x-1 top-1/2 h-0.5 -rotate-12 bg-rose-500"
            aria-hidden="true"
          ></span>
        {/if}
      </button>
    {/each}
  </div>
{/snippet}

<div class="space-y-3">
  <div class="rounded-xl border border-slate-200 bg-white p-3">
    {@render row('top')}
    <div class="my-2 border-t-2 border-slate-700" aria-hidden="true"></div>
    {@render row('bottom')}
  </div>
  <p class="text-center text-lg" aria-live="polite">
    <span class="mr-2 text-sm text-slate-600">Phân thức hiện tại:</span>
    <Tex math={current} />
  </p>
  <FeedbackNote tone={note.tone} text={note.text} />
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={finish}>Không còn nhân tử chung</button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>
</div>
