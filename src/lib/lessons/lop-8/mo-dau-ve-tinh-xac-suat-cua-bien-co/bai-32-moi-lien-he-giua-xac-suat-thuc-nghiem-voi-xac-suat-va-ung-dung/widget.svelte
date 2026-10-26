<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { fmt, formatNumber } from '#lib/core/number-format.js';
  import { EXPERIMENTS, MAX_TRIALS, addTrials, emptyRun, estimate, samplePath } from './engine.js';

  const W = 480;
  const H = 260;
  const LEFT = 48;
  const RIGHT = 16;
  const TOP = 12;
  const BOTTOM = 36;
  const PW = W - LEFT - RIGHT;
  const PH = H - TOP - BOTTOM;
  const SCALES = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
  const Y_TICKS = [0, 0.25, 0.5, 0.75, 1];

  let expId = $state(EXPERIMENTS[0].id);
  let run = $state(emptyRun());
  // The secret number of red balls in the mystery bag; fixed for the first
  // bag so the prerendered page and the browser agree.
  let secret = $state(7);
  let revealed = $state(false);
  let announce = $state('');

  const exp = $derived(EXPERIMENTS.find((e) => e.id === expId) ?? EXPERIMENTS[0]);
  const fav = $derived(exp.hidden ? secret : exp.favourable);
  const p = $derived(fav / exp.total);
  const showTruth = $derived(!exp.hidden || revealed);
  const xMax = $derived(SCALES.find((s) => s >= run.n) ?? MAX_TRIALS);
  const ratio = $derived(run.n === 0 ? null : run.k / run.n);
  /** @param {number} n */
  const xOf = (n) => LEFT + (PW * n) / xMax;
  /** @param {number} v */
  const yOf = (v) => TOP + PH * (1 - v);

  const points = $derived(
    samplePath(run.path, 320)
      .map(([n, v]) => `${xOf(n).toFixed(1)},${yOf(v).toFixed(1)}`)
      .join(' '),
  );

  /** @param {string | number} id */
  function choose(id) {
    expId = String(id);
    run = emptyRun();
    revealed = false;
    announce = '';
  }

  /** @param {number} times */
  function trial(times) {
    run = addTrials(run, times, p, Math.random);
    announce = `Đã làm ${fmt(run.n)} lần, biến cố E xảy ra ${fmt(run.k)} lần.`;
  }

  function newBag() {
    secret = 2 + Math.floor(Math.random() * 17);
    run = emptyRun();
    revealed = false;
    announce = 'Đã thay một túi bí ẩn mới.';
  }

  const feedback = $derived.by(() => {
    if (ratio === null)
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Chưa làm lần nào. Bấm các nút để lặp lại thực nghiệm nhiều lần.',
      };
    const exp1 = `Sau ${fmt(run.n)} lần, E xảy ra ${fmt(run.k)} lần: xác suất thực nghiệm là ${fmt(run.k)}/${fmt(run.n)} ≈ ${formatNumber(ratio, 3)}.`;
    if (exp.hidden) {
      const guess = estimate(exp.total, run.k, run.n);
      const est = `Ước lượng số bi đỏ: 20 · ${formatNumber(ratio, 3)} ≈ ${guess} viên.`;
      if (!revealed) return { tone: /** @type {const} */ ('info'), text: `${exp1} ${est}` };
      return {
        tone: guess === secret ? /** @type {const} */ ('ok') : /** @type {const} */ ('warn'),
        text: `${exp1} ${est} Thực tế túi có ${secret} viên bi đỏ, P(E) = ${secret}/20 = ${formatNumber(p, 2)}.${guess === secret ? ' Ước lượng chính xác!' : ' Làm thêm nhiều lần để ước lượng tốt hơn.'}`,
      };
    }
    const gap = Math.abs(ratio - p);
    return {
      tone: gap < 0.02 ? /** @type {const} */ ('ok') : /** @type {const} */ ('info'),
      text: `${exp1} P(E) = ${exp.favourable}/${exp.total} ≈ ${formatNumber(p, 3)}, chênh lệch ${formatNumber(gap, 3)}.${run.n < 1000 ? ' Làm thêm nhiều lần nữa và quan sát đường đỏ.' : ''}`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Thực nghiệm"
    options={EXPERIMENTS.map((e) => ({ value: e.id, label: e.label }))}
    value={expId}
    onchange={choose}
  />
  <p class="text-sm text-slate-700">
    {exp.action} Biến cố E: "{exp.event}".
  </p>

  <div class="flex flex-wrap gap-2">
    {#each [1, 10, 100, 1000] as t (t)}
      <button
        type="button"
        class={button.secondary}
        onclick={() => trial(t)}
        disabled={run.n >= MAX_TRIALS}>+{fmt(t)} lần</button
      >
    {/each}
    <button type="button" class={button.quiet} onclick={() => choose(expId)}>Làm lại</button>
  </div>

  <figure class="mx-auto w-full max-w-xl">
    <figcaption class="mb-1 text-center text-sm font-semibold text-slate-700">
      Xác suất thực nghiệm của E sau mỗi lần thử
    </figcaption>
    <svg
      viewBox="0 0 {W} {H}"
      class="block w-full"
      role="img"
      aria-label="Đường xác suất thực nghiệm theo số lần thử, từ 0 đến {fmt(xMax)} lần{ratio ===
      null
        ? ''
        : `, hiện bằng ${formatNumber(ratio, 3)}`}{showTruth
        ? `; đường ngang P(E) bằng ${formatNumber(p, 3)}`
        : ''}"
    >
      {#each Y_TICKS as t (t)}
        <line x1={LEFT} x2={W - RIGHT} y1={yOf(t)} y2={yOf(t)} stroke="#e2e8f0" />
        <text x={LEFT - 6} y={yOf(t) + 5} text-anchor="end" font-size="14" fill="#475569"
          >{formatNumber(t, 2)}</text
        >
      {/each}
      {#if showTruth}
        <line
          x1={LEFT}
          x2={W - RIGHT}
          y1={yOf(p)}
          y2={yOf(p)}
          stroke="#4f46e5"
          stroke-width="2"
          stroke-dasharray="6 5"
        />
        <text x={W - RIGHT - 4} y={yOf(p) - 6} text-anchor="end" font-size="14" fill="#4f46e5"
          >P(E)</text
        >
      {/if}
      {#if run.n > 0}
        <polyline {points} fill="none" stroke="#dc2626" stroke-width="2.5" />
      {/if}
      <line x1={LEFT} x2={LEFT} y1={TOP} y2={TOP + PH} stroke="#334155" stroke-width="1.5" />
      <line
        x1={LEFT}
        x2={W - RIGHT}
        y1={TOP + PH}
        y2={TOP + PH}
        stroke="#334155"
        stroke-width="1.5"
      />
      <text x={LEFT} y={H - 12} font-size="14" fill="#475569">0</text>
      <text x={W - RIGHT} y={H - 12} text-anchor="end" font-size="14" fill="#475569"
        >{fmt(xMax)} lần</text
      >
    </svg>
  </figure>

  <div class="grid grid-cols-3 gap-2 text-center text-sm">
    <div class="rounded-xl bg-slate-100 p-2">
      <p class="text-slate-600">Số lần thử <i>n</i></p>
      <p class="text-lg font-bold tabular-nums">{fmt(run.n)}</p>
    </div>
    <div class="rounded-xl bg-slate-100 p-2">
      <p class="text-slate-600">Số lần E xảy ra <i>k</i></p>
      <p class="text-lg font-bold tabular-nums">{fmt(run.k)}</p>
    </div>
    <div class="rounded-xl bg-rose-50 p-2">
      <p class="text-rose-800">Tỉ số <i>k</i>/<i>n</i></p>
      <p class="text-lg font-bold tabular-nums text-rose-800">
        {ratio === null ? '–' : formatNumber(ratio, 3)}
      </p>
    </div>
  </div>

  {#if exp.hidden}
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class={button.primary}
        onclick={() => (revealed = true)}
        disabled={revealed || run.n === 0}>Mở túi xem đáp án</button
      >
      <button type="button" class={button.quiet} onclick={newBag}>Túi mới</button>
    </div>
  {/if}

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
  <p class="sr-only" aria-live="polite">{announce}</p>
</div>
