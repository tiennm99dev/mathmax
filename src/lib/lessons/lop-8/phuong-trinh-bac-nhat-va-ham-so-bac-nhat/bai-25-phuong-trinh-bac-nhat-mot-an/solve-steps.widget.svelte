<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { texText } from '#lib/core/tex-text.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    LINEAR_PUZZLES,
    canCollect,
    collect,
    divideOut,
    fracTex,
    linearEquation,
    linearTex,
    moveTerm,
    solved,
    termTex,
  } from './engine.js';

  /** @typedef {import('./engine.js').Equation} Equation */
  /** @typedef {import('./engine.js').Term} Term */

  /** @param {number} i */
  const start = (i) => {
    const [a, b, c, d] = LINEAR_PUZZLES[i];
    return linearEquation(a, b, c, d);
  };

  /** @typedef {{ eq: Equation, tex: string, final: boolean }} Step */

  /** @param {Equation} e @returns {Step} */
  const step = (e) => ({ eq: e, tex: linearTex(e), final: solved(e) !== null });

  const FIRST_NOTE = 'Bấm vào một hạng tử để chuyển nó sang vế kia.';

  let puzzle = $state(0);
  /** @type {Step[]} */
  let steps = $state([step(start(0))]);
  let note = $state(FIRST_NOTE);

  const last = $derived(steps[steps.length - 1]);
  const eq = $derived(last.eq);
  const done = $derived(last.final);
  const division = $derived(done ? null : divideOut(eq));
  const collectable = $derived(canCollect(eq));
  /** The root as `x = …`, also when the last step reads `3 = x`. */
  const rootTex = $derived.by(() => {
    if (!done) return '';
    const value = solved(eq);
    return last.tex.startsWith('x = ') || !value ? last.tex : `x = ${fracTex(value)}`;
  });

  /** @param {Step} next @param {string} text */
  function push(next, text) {
    steps = [...steps, next];
    note = text;
  }

  /** @param {number} k */
  const kText = (k) => (k < 0 ? `(−${-k})` : String(k));

  /** @param {Term} t @param {'trái' | 'phải'} from */
  function move(t, from) {
    const before = texText(termTex(t, true));
    const after = texText(termTex({ ...t, c: -t.c }, true));
    const to = from === 'trái' ? 'phải' : 'trái';
    push(
      step(moveTerm(eq, t.id)),
      `Chuyển ${before} từ vế ${from} sang vế ${to} thành ${after}: hạng tử đổi dấu.`,
    );
  }

  function doCollect() {
    push(
      step(collect(eq)),
      'Thu gọn mỗi vế: cộng các hạng tử chứa x với nhau, các hằng số với nhau.',
    );
  }

  function doDivide() {
    if (!division) return;
    const { k, value } = division;
    push(
      { eq, tex: `x = ${fracTex(value)}`, final: true },
      `Chia hai vế cho ${kText(k)} (quy tắc nhân với một số khác 0).`,
    );
  }

  /** @param {string | number} v */
  function choose(v) {
    steps = [step(start(Number(v)))];
    note = FIRST_NOTE;
  }

  function undo() {
    if (steps.length < 2) return;
    steps = steps.slice(0, -1);
    note = 'Đã hoàn tác bước vừa rồi.';
  }

  const chip = `inline-flex min-h-11 items-center rounded-lg border px-3 py-1 text-lg ${focusRing}`;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn phương trình"
    options={LINEAR_PUZZLES.map((_, i) => ({ value: i, label: `Phương trình ${i + 1}` }))}
    bind:value={puzzle}
    onchange={choose}
  />

  {#if !done}
    <div
      class="flex flex-wrap items-center justify-center gap-2"
      role="group"
      aria-label="Các hạng tử của phương trình"
    >
      {#each eq.left as t, i (t.id)}
        <button
          type="button"
          class="{chip} {t.x ? 'border-indigo-300 bg-indigo-50' : 'border-amber-300 bg-amber-50'}"
          aria-label="Chuyển hạng tử {texText(termTex(t, true))} sang vế phải"
          onclick={() => move(t, 'trái')}
        >
          <Tex math={termTex(t, i === 0)} />
        </button>
      {:else}
        <span class="text-lg">0</span>
      {/each}
      <span class="px-1 text-xl font-bold">=</span>
      {#each eq.right as t, i (t.id)}
        <button
          type="button"
          class="{chip} {t.x ? 'border-indigo-300 bg-indigo-50' : 'border-amber-300 bg-amber-50'}"
          aria-label="Chuyển hạng tử {texText(termTex(t, true))} sang vế trái"
          onclick={() => move(t, 'phải')}
        >
          <Tex math={termTex(t, i === 0)} />
        </button>
      {:else}
        <span class="text-lg">0</span>
      {/each}
    </div>
  {/if}

  <FeedbackNote
    tone={done ? 'ok' : 'info'}
    text={done
      ? `Xong! Nghiệm của phương trình là ${texText(rootTex)}. Em có thể thay vào phương trình ban đầu để thử lại.`
      : note}
  />

  {#if !done}
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.secondary} onclick={doCollect} disabled={!collectable}>
        Thu gọn hai vế
      </button>
      <button type="button" class={button.secondary} onclick={doDivide} disabled={!division}>
        {division ? `Chia hai vế cho ${kText(division.k)}` : 'Chia hai vế cho hệ số của x'}
      </button>
    </div>
  {/if}

  <ol class="space-y-1 text-slate-700">
    {#each steps as s, i (i)}
      <li><Tex math={(i > 0 ? '\\Leftrightarrow ' : '') + s.tex} /></li>
    {/each}
  </ol>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={undo} disabled={steps.length < 2}
      >Hoàn tác</button
    >
    <button type="button" class={button.quiet} onclick={() => choose(puzzle)}>Làm lại</button>
  </div>
</div>
