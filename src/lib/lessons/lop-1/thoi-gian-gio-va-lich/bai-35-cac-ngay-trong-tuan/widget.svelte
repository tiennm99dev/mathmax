<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { polar, sectorPath } from '#lib/core/visuals/svg-math.js';
  import { WEEKDAYS, dayTitle, mod } from '../_shared/time.js';
  import {
    ROLE_WORDS,
    STEP,
    answerFeedback,
    dayAngle,
    daySentences,
    questionOf,
    roleOf,
    turnTo,
  } from './engine.js';

  const S = 320;
  const C = S / 2;
  const R = 152;
  const HOLE = 52;
  const WEDGE = sectorPath(C, C, R, -STEP / 2, STEP / 2);

  /** `turn`: tap a day or turn the wheel. `quiz`: answer "ngày mai", "hôm qua". */
  let mode = $state(/** @type {'turn' | 'quiz'} */ ('turn'));
  /** Steps the wheel has turned, not wrapped, so it always slides the short way. */
  let turn = $state(0);
  let round = $state(0);
  /** @type {number | null} */
  let picked = $state(null);

  const today = $derived(mod(turn, 7));
  const q = $derived(questionOf(round));
  const sentences = $derived(daySentences(today));
  const wheelAngle = $derived(dayAngle(0, turn));
  const solved = $derived(mode === 'quiz' && picked === q.answer);

  /** @param {number} day */
  function tap(day) {
    if (mode === 'turn') turn = turnTo(turn, day);
    else if (picked !== q.answer) picked = day;
  }

  /** @param {KeyboardEvent} e @param {number} day */
  function key(e, day) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    tap(day);
  }

  /** @param {'turn' | 'quiz'} next */
  function switchMode(next) {
    picked = null;
    if (next === 'quiz') turn = turnTo(turn, q.today);
  }

  function nextQuestion() {
    round += 1;
    picked = null;
    turn = turnTo(turn, questionOf(round).today);
  }

  /** @param {number} i */
  function fill(i) {
    if (mode === 'quiz') {
      if (picked === i) return i === q.answer ? '#059669' : '#fecdd3';
      return i === today ? '#4f46e5' : '#f1f5f9';
    }
    const role = roleOf(i, today);
    if (role === 'today') return '#4f46e5';
    if (role === 'yesterday') return '#fcd34d';
    if (role === 'tomorrow') return '#6ee7b7';
    return '#f1f5f9';
  }

  /** @param {number} i */
  function ink(i) {
    if (mode === 'quiz' && picked === i) return i === q.answer ? '#fff' : '#9f1239';
    return i === today ? '#fff' : '#0f172a';
  }

  /** @param {number} i */
  function dayLabel(i) {
    const role = mode === 'turn' ? roleOf(i, today) : i === today ? 'today' : null;
    return role ? `${dayTitle(i)}, ${ROLE_WORDS[role].toLowerCase()}` : dayTitle(i);
  }
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn trò chơi"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'turn', label: 'Xoay vòng ngày' },
      { value: 'quiz', label: 'Trả lời câu hỏi' },
    ]}
    onchange={(v) => switchMode(/** @type {'turn' | 'quiz'} */ (v))}
  />

  {#if mode === 'quiz'}
    <p class="text-xl font-semibold text-slate-800">{q.prompt}</p>
  {:else}
    <p class="text-xl font-semibold text-slate-800">
      Chạm vào một ngày để xoay nó lên trên cùng. Ngày ở trên cùng là hôm nay.
    </p>
  {/if}

  <svg
    viewBox="0 0 {S} {S + 14}"
    class="mx-auto block w-full max-w-sm select-none"
    role="group"
    aria-label="Vòng các ngày trong tuần. Hôm nay là {WEEKDAYS[today]}."
  >
    <g transform="translate(0 14)">
      <g
        class="motion-safe:transition-transform motion-safe:duration-500"
        style:transform="rotate({wheelAngle}deg)"
        style:transform-origin="{C}px {C}px"
      >
        {#each WEEKDAYS as _, i (i)}
          {@const spot = polar(C, C, (R + HOLE) / 2 + 6, i * STEP)}
          <g
            class="day cursor-pointer outline-none"
            role="button"
            tabindex="0"
            aria-label={dayLabel(i)}
            aria-pressed={mode === 'quiz' ? picked === i : undefined}
            onclick={() => tap(i)}
            onkeydown={(e) => key(e, i)}
          >
            <path
              d={WEDGE}
              transform="rotate({i * STEP} {C} {C})"
              fill={fill(i)}
              stroke="#fff"
              stroke-width="3"
            />
            <g transform="translate({spot.x} {spot.y})">
              <g
                class="motion-safe:transition-transform motion-safe:duration-500"
                style:transform="rotate({-wheelAngle}deg)"
                style:transform-origin="0px 0px"
              >
                <text
                  y={mode === 'turn' && roleOf(i, today) ? -2 : 6}
                  text-anchor="middle"
                  font-size="17"
                  font-weight="700"
                  fill={ink(i)}>{dayTitle(i)}</text
                >
                {#if mode === 'turn' && roleOf(i, today)}
                  <text y="16" text-anchor="middle" font-size="13" font-weight="600" fill={ink(i)}
                    >{ROLE_WORDS[
                      /** @type {import('./engine.js').Role} */ (roleOf(i, today))
                    ]}</text
                  >
                {/if}
              </g>
            </g>
          </g>
        {/each}
      </g>
      <circle cx={C} cy={C} r={HOLE} fill="#fff" stroke="#cbd5e1" stroke-width="2" />
      <text x={C} y={C - 4} text-anchor="middle" font-size="14" fill="#475569">Tuần có</text>
      <text x={C} y={C + 18} text-anchor="middle" font-size="18" font-weight="700" fill="#1e293b"
        >7 ngày</text
      >
    </g>
    <polygon points="{C - 12},0 {C + 12},0 {C},16" fill="#1e293b" />
  </svg>

  {#if mode === 'turn'}
    <div class="flex flex-wrap justify-center gap-3">
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={() => (turn -= 1)}
        ><span aria-hidden="true">◀ </span>Hôm qua</button
      >
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={() => (turn += 1)}
        >Ngày mai<span aria-hidden="true"> ▶</span></button
      >
    </div>
    <ul class="space-y-2 rounded-2xl bg-slate-100 px-4 py-3 text-xl" aria-live="polite">
      <li class="font-semibold text-amber-800">{sentences[0]}</li>
      <li class="font-bold text-indigo-800">{sentences[1]}</li>
      <li class="font-semibold text-emerald-800">{sentences[2]}</li>
    </ul>
  {:else}
    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {solved
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if solved}<span aria-hidden="true">⭐ </span>{/if}{picked === null
        ? 'Em chạm vào ngày đúng trên vòng.'
        : answerFeedback(q, picked)}
    </p>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={nextQuestion}>
      Câu khác
    </button>
  {/if}
</div>

<style>
  .day:focus-visible path {
    stroke: #1e1b4b;
    stroke-width: 5;
  }
</style>
