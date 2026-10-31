<script>
  import { tick } from 'svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import KidFigure from '../_shared/kid-figure.svelte';
  import Ruler from '../_shared/ruler.svelte';
  import ThingShape from '../_shared/thing-shape.svelte';
  import { RULER_CM } from '../_shared/length.js';
  import { KIND_LABELS, buildRound, weakKinds } from './engine.js';

  /** SVG units per cm in the pictures, and the line every thing starts from. */
  const U = 22;
  const X0 = 24;
  const SW = X0 + RULER_CM * U + 48;
  const FLOOR = 196;

  // The first round is fixed so the prerendered page and the browser agree.
  let seed = $state(1);
  let index = $state(0);
  /** @type {Array<boolean | null>} */
  let firstTry = $state([]);
  /** Options already tried and wrong for the current question. */
  /** @type {number[]} */
  let wrong = $state([]);
  /** `ask`: waiting; `retry`: one miss, hint shown; `right` / `shown`: done. */
  let phase = $state(/** @type {'ask' | 'retry' | 'right' | 'shown'} */ ('ask'));
  /** @type {HTMLHeadingElement | undefined} */
  let heading = $state();

  const round = $derived(buildRound(seed));
  const finished = $derived(index >= round.length);
  const q = $derived(finished ? null : round[index]);
  const score = $derived(firstTry.filter((r) => r === true).length);
  const weak = $derived(weakKinds(round, firstTry));

  /** @param {number} option */
  function choose(option) {
    if (!q || phase === 'right' || phase === 'shown' || wrong.includes(option)) return;
    if (option === q.answer) {
      if (phase === 'ask') firstTry[index] = true;
      phase = 'right';
      return;
    }
    wrong = [...wrong, option];
    if (phase === 'ask') {
      firstTry[index] = false;
      phase = 'retry';
    } else {
      phase = 'shown';
    }
  }

  async function next() {
    index += 1;
    wrong = [];
    phase = 'ask';
    await tick();
    heading?.focus();
  }

  function again() {
    seed += 1;
    index = 0;
    firstTry = [];
    wrong = [];
    phase = 'ask';
  }

  /**
   * What the picture shows, for screen readers, without giving the answer.
   * @param {import('./engine.js').Scene} scene
   */
  function sceneLabel(scene) {
    if (scene.type === 'things') {
      const names = scene.items.map((it) => it.thing.label.toLowerCase()).join(', ');
      return `Các vật nằm thẳng hàng ở đầu bên trái: ${names}.`;
    }
    if (scene.type === 'kids') {
      return `Ba bạn đứng cạnh nhau trên mặt sàn: ${scene.items.map((it) => it.kid.label).join(', ')}.`;
    }
    return `${scene.thing.label} nằm trên thước kẻ, vạch 0 thẳng với đầu bên trái. Đầu bên phải ở vạch ${scene.length}.`;
  }

  /** @param {number} i */
  function optionClass(i) {
    if (!q) return '';
    const base = `min-h-14 min-w-16 rounded-2xl border-4 px-4 text-xl font-bold transition ${focusRing}`;
    if ((phase === 'right' || phase === 'shown') && i === q.answer) {
      return `${base} border-emerald-600 bg-emerald-600 text-white`;
    }
    if (wrong.includes(i)) return `${base} border-rose-400 bg-rose-50 text-rose-700 line-through`;
    return `${base} border-slate-300 bg-white text-slate-800 hover:border-indigo-400`;
  }
</script>

<div class="space-y-5">
  <div class="flex items-center justify-between gap-3">
    <p class="text-base font-semibold text-slate-600">
      {#if finished}Xong bộ bài{:else}Câu {index + 1} / {round.length} · {q
          ? KIND_LABELS[q.kind]
          : ''}{/if}
    </p>
    <ol class="flex gap-1" aria-label="Kết quả từng câu">
      {#each round as _, i (i)}
        <li
          class="h-3 w-3 rounded-full {firstTry[i] === true
            ? 'bg-emerald-500'
            : firstTry[i] === false
              ? 'bg-amber-400'
              : i === index
                ? 'bg-indigo-500'
                : 'bg-slate-200'}"
          aria-label="Câu {i + 1}: {firstTry[i] === true
            ? 'đúng ngay'
            : firstTry[i] === false
              ? 'cần thử lại'
              : 'chưa làm'}"
        ></li>
      {/each}
    </ol>
  </div>

  {#if q}
    <h3 bind:this={heading} tabindex="-1" class="text-2xl font-bold text-slate-900 outline-none">
      {q.prompt}
    </h3>

    {#if q.scene}
      {@const scene = q.scene}
      {#if scene.type === 'things'}
        <svg
          viewBox="0 0 {SW} {scene.items.length * 52 + 16}"
          class="w-full max-w-xl rounded-2xl border border-slate-200 bg-white"
          role="img"
          aria-label={sceneLabel(scene)}
        >
          <line
            x1={X0}
            y1="6"
            x2={X0}
            y2={scene.items.length * 52 + 10}
            stroke="#dc2626"
            stroke-width="3"
          />
          {#each scene.items as it, i (i)}
            <ThingShape
              shape={it.thing.shape}
              x={X0}
              y={26 + i * 52}
              length={it.length * U}
              color={it.thing.color}
            />
            <text x={X0 + 4} y={52 + i * 52} font-size="16" font-weight="600" fill="#334155"
              >{it.thing.label}</text
            >
          {/each}
        </svg>
      {:else if scene.type === 'kids'}
        <svg
          viewBox="0 0 {SW} {FLOOR + 30}"
          class="w-full max-w-xl rounded-2xl border border-slate-200 bg-white"
          role="img"
          aria-label={sceneLabel(scene)}
        >
          <rect x="0" y={FLOOR} width={SW} height="30" fill="#d6d3d1" />
          {#each scene.items as it, i (i)}
            <KidFigure
              x={(SW * (2 * i + 1)) / 6}
              y={FLOOR}
              height={it.height * 20}
              color={it.kid.color}
            />
            <text
              x={(SW * (2 * i + 1)) / 6}
              y={FLOOR + 21}
              text-anchor="middle"
              font-size="15"
              font-weight="600"
              fill="#1e293b">{it.kid.label}</text
            >
          {/each}
        </svg>
      {:else}
        <svg
          viewBox="0 0 {SW} 104"
          class="w-full max-w-xl rounded-2xl border border-slate-200 bg-amber-50"
          role="img"
          aria-label={sceneLabel(scene)}
        >
          <ThingShape
            shape={scene.thing.shape}
            x={X0 + 10}
            y={30}
            length={scene.length * U}
            color={scene.thing.color}
          />
          <Ruler x={X0 + 10} y={46} cm={RULER_CM} unit={U} />
        </svg>
      {/if}
    {/if}

    <div role="group" aria-label="Chọn đáp án" class="flex flex-wrap gap-3">
      {#each q.options as option, i (i)}
        <button
          type="button"
          class={optionClass(i)}
          aria-disabled={wrong.includes(i) || phase === 'right' || phase === 'shown'}
          onclick={() => choose(i)}>{option}</button
        >
      {/each}
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {phase === 'right'
        ? 'bg-emerald-100 text-emerald-900'
        : phase === 'ask'
          ? 'bg-slate-100 text-slate-800'
          : 'bg-amber-100 text-amber-900'}"
      aria-live="polite"
    >
      {#if phase === 'ask'}
        Em chạm vào đáp án đúng.
      {:else if phase === 'retry'}
        Chưa đúng. Gợi ý: {q.hint} Em thử lại nhé.
      {:else if phase === 'right'}
        <span aria-hidden="true">⭐ </span>Đúng rồi! {q.solution}
      {:else}
        Đáp án: {q.solution}
      {/if}
    </p>

    {#if phase === 'right' || phase === 'shown'}
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        {index + 1 < round.length ? 'Câu tiếp' : 'Xem kết quả'}
      </button>
    {/if}
  {:else}
    <div class="rounded-2xl bg-emerald-50 px-4 py-4 text-xl text-emerald-950" aria-live="polite">
      <p class="font-bold">
        <span aria-hidden="true">⭐ </span>Em làm đúng ngay {score} / {round.length} câu.
      </p>
      {#if weak.length > 0}
        <p class="mt-2 text-lg">Em ôn lại: {weak.join(', ')}.</p>
      {:else}
        <p class="mt-2 text-lg">Tuyệt vời! Em đã nắm chắc cách so sánh và đo độ dài.</p>
      {/if}
    </div>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={again}>
      Làm bộ bài khác
    </button>
  {/if}
</div>
