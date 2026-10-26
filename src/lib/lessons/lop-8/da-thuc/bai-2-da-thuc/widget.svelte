<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card as cardClass, focusRing } from '#lib/core/ui.js';
  import { isCollected, polyText } from '../_shared/poly.js';
  import { PRESETS, degrees, mergeTerms, signedText, termsOf } from './engine.js';

  const DEGREE_CHOICES = [0, 1, 2, 3, 4, 5, 6, 7];

  let preset = $state(0);
  let terms = $state(termsOf(PRESETS[0].src));
  /** @type {string[]} */
  let picked = $state([]);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  let note = $state({
    tone: 'info',
    text: 'Chọn hai hay nhiều hạng tử đồng dạng rồi bấm "Gộp".',
  });
  /** @type {number | null} */
  let guess = $state(null);

  const name = $derived(PRESETS[preset].name);
  const original = $derived(polyText(termsOf(PRESETS[preset].src).map((t) => t.m)));
  const collected = $derived(isCollected(terms.map((t) => t.m)));
  const deg = $derived(degrees(terms));
  const solved = $derived(collected && guess === deg.max);

  function restart() {
    terms = termsOf(PRESETS[preset].src);
    picked = [];
    guess = null;
    note = { tone: 'info', text: 'Chọn hai hay nhiều hạng tử đồng dạng rồi bấm "Gộp".' };
  }

  /** @param {string} id */
  function toggle(id) {
    picked = picked.includes(id) ? picked.filter((x) => x !== id) : [...picked, id];
  }

  function merge() {
    const r = mergeTerms(terms, picked);
    note = { tone: r.ok ? 'info' : 'warn', text: r.message };
    if (!r.ok) return;
    terms = r.terms;
    picked = [];
    if (isCollected(terms.map((t) => t.m))) {
      note = {
        tone: 'ok',
        text: `${r.message} Không còn hai hạng tử nào đồng dạng: ${name} đã ở dạng thu gọn. Bây giờ hãy chọn bậc của ${name}.`,
      };
    }
  }

  /** @param {number} d */
  function answer(d) {
    guess = d;
    if (d === deg.max) {
      note = {
        tone: 'ok',
        text: `Đúng! Hạng tử bậc cao nhất có bậc ${deg.max}, nên ${name} có bậc ${deg.max}.`,
      };
    } else {
      note = {
        tone: 'warn',
        text: `Chưa đúng. Bậc của đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn, không phải tổng các bậc hay số hạng tử.`,
      };
    }
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Đa thức"
    options={PRESETS.map((p, i) => ({ value: i, label: p.name }))}
    bind:value={preset}
    onchange={(v) => {
      preset = Number(v);
      restart();
    }}
  />

  <p class="text-sm text-slate-600">
    Ban đầu: <span class="font-semibold text-slate-800 tabular-nums">{name} = {original}</span>
  </p>

  <div class="{cardClass} p-3">
    <p class="mb-2 text-sm font-semibold text-slate-700">
      {name} hiện tại ({terms.length} hạng tử){collected ? ', đã thu gọn' : ''}:
    </p>
    <ul class="flex flex-wrap items-center gap-2" aria-label="Các hạng tử của {name}">
      {#each terms as t, i (t.id)}
        {@const on = picked.includes(t.id)}
        <li>
          <button
            type="button"
            aria-pressed={on}
            disabled={collected}
            class="min-h-11 rounded-lg border px-3 py-2 text-lg font-semibold tabular-nums transition disabled:cursor-default {focusRing} {on
              ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
              : solved && deg.degrees[i] === deg.max
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'}"
            onclick={() => toggle(t.id)}
          >
            {signedText(t.m, i === 0)}
            {#if collected}
              <span class="ml-1 text-xs font-normal text-slate-500">(bậc {deg.degrees[i]})</span>
            {/if}
          </button>
        </li>
      {/each}
    </ul>
  </div>

  {#if !collected}
    <div class="flex flex-wrap gap-3">
      <button type="button" class={button.primary} disabled={picked.length < 2} onclick={merge}>
        Gộp {picked.length} hạng tử đã chọn
      </button>
      <button type="button" class={button.quiet} onclick={restart}>Bắt đầu lại</button>
    </div>
  {:else}
    <div class="{cardClass} space-y-2 p-3">
      <p class="text-sm font-semibold text-slate-700">Bậc của {name} là bao nhiêu?</p>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn bậc của {name}">
        {#each DEGREE_CHOICES as d (d)}
          <button
            type="button"
            aria-pressed={guess === d}
            class="h-11 w-11 rounded-lg border text-lg font-semibold {focusRing} {guess === d
              ? d === deg.max
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                : 'border-amber-500 bg-amber-50 text-amber-900'
              : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'}"
            onclick={() => answer(d)}>{d}</button
          >
        {/each}
      </div>
      <button type="button" class={button.quiet} onclick={restart}>Làm lại đa thức này</button>
    </div>
  {/if}

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
