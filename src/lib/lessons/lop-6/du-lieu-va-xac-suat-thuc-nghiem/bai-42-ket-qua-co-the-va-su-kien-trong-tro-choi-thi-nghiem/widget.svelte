<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { EXPERIMENTS, explain, grade, trial } from './engine.js';

  const BALL = ['#2563EB', '#DC2626', '#EAB308', '#F8FAFC'];
  /** Pip positions of a die face on a 0-100 square, by number of dots. */
  const PIPS = /** @type {Record<number, Array<[number, number]>>} */ ({
    1: [[50, 50]],
    2: [
      [28, 28],
      [72, 72],
    ],
    3: [
      [28, 28],
      [50, 50],
      [72, 72],
    ],
    4: [
      [28, 28],
      [72, 28],
      [28, 72],
      [72, 72],
    ],
    5: [
      [28, 28],
      [72, 28],
      [50, 50],
      [28, 72],
      [72, 72],
    ],
    6: [
      [28, 25],
      [72, 25],
      [28, 50],
      [72, 50],
      [28, 75],
      [72, 75],
    ],
  });

  let expId = $state('xuc-xac');
  /** @type {number | null} */
  let outcome = $state(null);
  /** @type {Array<boolean | null>} */
  let marks = $state([]);
  let checked = $state(false);
  let trials = $state(0);
  let right = $state(0);
  let marked = $state(0);
  let announce = $state('');

  const exp = $derived(EXPERIMENTS.find((e) => e.id === expId) ?? EXPERIMENTS[0]);
  const results = $derived(outcome === null ? [] : grade(exp, outcome, marks));
  const allMarked = $derived(exp.events.every((_, e) => marks[e] === true || marks[e] === false));

  /** @param {string | number} id */
  function choose(id) {
    expId = String(id);
    outcome = null;
    marks = [];
    checked = false;
    announce = `Đã chọn: ${exp.name}. Có ${exp.outcomes.length} kết quả có thể.`;
  }

  /** @param {number} i */
  function setOutcome(i) {
    outcome = i;
    marks = exp.events.map(() => null);
    checked = false;
    trials += 1;
    announce = `Kết quả: ${exp.outcomes[i]}. Hãy đánh dấu từng sự kiện xảy ra hay không xảy ra.`;
  }

  function run() {
    setOutcome(trial(exp, Math.random));
  }

  /** @param {number} e @param {boolean} value */
  function mark(e, value) {
    if (checked) return;
    const next = [...marks];
    next[e] = value;
    marks = next;
  }

  function check() {
    if (outcome === null || !allMarked) return;
    checked = true;
    const ok = results.filter((r) => r === true).length;
    right += ok;
    marked += results.length;
    announce =
      ok === results.length
        ? `Đúng cả ${ok} sự kiện.`
        : `Đúng ${ok} trên ${results.length} sự kiện. Xem giải thích bên dưới.`;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Trò chơi, thí nghiệm"
    options={EXPERIMENTS.map((e) => ({ value: e.id, label: e.name }))}
    value={expId}
    onchange={choose}
  />

  <div class="rounded-lg border border-slate-200 p-3">
    <p class="text-sm text-slate-700">
      <span class="font-semibold">{exp.action}.</span> Tập hợp các kết quả có thể ({exp.outcomes
        .length} kết quả):
    </p>
    <div class="mt-2 flex flex-wrap gap-2" role="group" aria-label="Các kết quả có thể">
      {#each exp.outcomes as name, i (name)}
        <button
          type="button"
          class="{outcome === i ? button.primary : button.quiet} gap-2 px-3"
          aria-pressed={outcome === i}
          aria-label="Chọn kết quả {name}"
          onclick={() => setOutcome(i)}
        >
          <svg viewBox="0 0 100 100" class="h-7 w-7 shrink-0" aria-hidden="true">
            {#if exp.id === 'xuc-xac'}
              <rect
                x="6"
                y="6"
                width="88"
                height="88"
                rx="16"
                fill="#fff"
                stroke="#334155"
                stroke-width="6"
              />
              {#each PIPS[exp.values[i]] as [x, y], k (k)}
                <circle cx={x} cy={y} r="9" fill="#0f172a" />
              {/each}
            {:else if exp.id === 'dong-xu'}
              <circle cx="50" cy="50" r="44" fill="#FCD34D" stroke="#92400E" stroke-width="6" />
              <text
                x="50"
                y="64"
                text-anchor="middle"
                font-size="42"
                font-weight="700"
                fill="#78350F">{exp.values[i] === 1 ? 'N' : 'S'}</text
              >
            {:else}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill={BALL[exp.values[i]]}
                stroke="#334155"
                stroke-width="5"
              />
            {/if}
          </svg>
          {name}
        </button>
      {/each}
    </div>
    <div class="mt-3 flex flex-wrap items-center gap-2">
      <button type="button" class={button.primary} onclick={run}>{exp.name} ngẫu nhiên</button>
      <span class="text-sm text-slate-600"
        >hoặc chạm vào một kết quả ở trên để tự chọn kết quả.</span
      >
    </div>
  </div>

  {#if outcome !== null}
    <div class="rounded-lg border border-indigo-200 bg-indigo-50/50 p-3">
      <p class="text-sm font-semibold text-indigo-950">
        Lần thử thứ {trials}: kết quả là {exp.outcomes[outcome].toLowerCase()}. Mỗi sự kiện dưới đây
        xảy ra hay không xảy ra?
      </p>
      <ul class="mt-2 space-y-2">
        {#each exp.events as ev, e (ev.text)}
          <li class="rounded-lg bg-white p-2">
            <p class="text-sm text-slate-800">"{ev.text}"</p>
            <div class="mt-1 flex flex-wrap gap-2" role="group" aria-label="Sự kiện: {ev.text}">
              <button
                type="button"
                class="{marks[e] === true ? button.secondary : button.quiet} px-3"
                aria-pressed={marks[e] === true}
                disabled={checked}
                onclick={() => mark(e, true)}>Xảy ra</button
              >
              <button
                type="button"
                class="{marks[e] === false ? button.secondary : button.quiet} px-3"
                aria-pressed={marks[e] === false}
                disabled={checked}
                onclick={() => mark(e, false)}>Không xảy ra</button
              >
            </div>
            {#if checked}
              <p class="mt-1 text-sm {results[e] ? 'text-emerald-700' : 'text-rose-700'}">
                {results[e] ? 'Đúng.' : 'Chưa đúng.'}
                {explain(exp, e, outcome)}
              </p>
            {/if}
          </li>
        {/each}
      </ul>
      <div class="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          class={button.primary}
          onclick={check}
          disabled={checked || !allMarked}>Kiểm tra</button
        >
        {#if checked}
          <button type="button" class={button.secondary} onclick={run}>Thử lần nữa</button>
        {/if}
      </div>
    </div>
  {/if}

  <p class="min-h-5 text-sm text-slate-700" aria-live="polite">
    {announce}
    {#if marked > 0}
      Tổng cộng: đánh dấu đúng {right}/{marked} sự kiện qua {trials} lần thử.
    {/if}
  </p>
</div>
