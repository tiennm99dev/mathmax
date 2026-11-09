<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { ROMAN_DIGITS } from '../_shared/numbers-to-10000.js';
  import { HOURS, MAX_LETTERS, TARGETS, addLetter, romanWhy, rowNote } from './engine.js';

  /** Width of each matchstick letter, in SVG units. */
  const LETTER_W = { I: 14, V: 30, X: 30 };
  const GAP = 8;
  const H = 64;
  const WOOD = '#d4a373';
  const HEAD = '#dc2626';

  let round = $state(0);
  let row = $state('');

  const target = $derived(TARGETS[round % TARGETS.length]);
  const onClock = $derived(target <= 12);
  const note = $derived(rowNote(row, target));
  const solved = $derived(note.tone === 'ok');

  /** Letters with their left edge, for drawing. */
  const laid = $derived.by(() => {
    let x = GAP;
    return [...row].map((c) => {
      const letter = /** @type {'I' | 'V' | 'X'} */ (c);
      const at = { letter, x };
      x += LETTER_W[letter] + GAP;
      return at;
    });
  });
  const rowWidth = $derived(
    Math.max(
      120,
      laid.reduce((w, l) => w + LETTER_W[l.letter] + GAP, GAP),
    ),
  );

  /**
   * The matchsticks of one letter: [x1, y1, x2, y2], the head at the first end.
   * @param {'I' | 'V' | 'X'} letter
   * @returns {Array<[number, number, number, number]>}
   */
  function sticks(letter) {
    const top = 6;
    const bottom = H - 4;
    if (letter === 'I') return [[7, top, 7, bottom]];
    if (letter === 'V')
      return [
        [3, top, 15, bottom],
        [27, top, 15, bottom],
      ];
    return [
      [3, top, 27, bottom],
      [27, top, 3, bottom],
    ];
  }

  /** @param {number} hour */
  function spot(hour, r = 78) {
    const a = ((hour * 30 - 90) * Math.PI) / 180;
    return { x: 110 + r * Math.cos(a), y: 110 + r * Math.sin(a) };
  }

  const hand = $derived(spot(target, 48));

  function next() {
    round += 1;
    row = '';
  }
</script>

<div class="space-y-4">
  {#if onClock}
    <p class="text-center text-xl font-semibold text-slate-800">
      Đồng hồ chỉ {target} giờ. Kim ngắn chỉ vào số La Mã nào? Em xếp que diêm thành số đó.
    </p>
    <svg
      viewBox="0 0 220 220"
      class="mx-auto block w-56"
      role="img"
      aria-label="Đồng hồ số La Mã chỉ {target} giờ đúng; kim dài chỉ số XII, kim ngắn chỉ vào số cần xếp"
    >
      <circle cx="110" cy="110" r="104" fill="#fffbeb" stroke="#92400e" stroke-width="4" />
      {#each HOURS as h (h.hour)}
        {@const p = spot(h.hour)}
        {#if h.hour === target && !solved}
          <circle cx={p.x} cy={p.y} r="15" fill="#e0e7ff" stroke="#4f46e5" stroke-width="2" />
          <text
            x={p.x}
            y={p.y + 6}
            text-anchor="middle"
            font-size="18"
            font-weight="700"
            fill="#4338ca">?</text
          >
        {:else}
          <text
            x={p.x}
            y={p.y + 6}
            text-anchor="middle"
            font-size="16"
            font-weight="700"
            fill={h.hour === target ? '#059669' : '#334155'}>{h.roman}</text
          >
        {/if}
      {/each}
      <line x1="110" y1="110" x2="110" y2="48" stroke="#1e293b" stroke-width="3" />
      <line
        x1="110"
        y1="110"
        x2={hand.x}
        y2={hand.y}
        stroke="#1e293b"
        stroke-width="6"
        stroke-linecap="round"
      />
      <circle cx="110" cy="110" r="6" fill="#1e293b" />
    </svg>
  {:else}
    <p class="text-center text-xl font-semibold text-slate-800">
      Em xếp que diêm thành số <strong class="text-indigo-700">{target}</strong> viết bằng chữ số La Mã.
    </p>
  {/if}

  <div class="overflow-x-auto rounded-2xl border-2 border-amber-200 bg-amber-50 p-2">
    <svg
      viewBox="0 0 {rowWidth} {H + 8}"
      class="mx-auto block h-20"
      role="img"
      aria-label={row === '' ? 'Chưa có que diêm nào' : `Các chữ đã xếp: ${[...row].join(' ')}`}
    >
      {#each laid as l, i (i)}
        <g transform="translate({l.x} 4)">
          {#each sticks(l.letter) as [x1, y1, x2, y2], j (j)}
            <line {x1} {y1} {x2} {y2} stroke={WOOD} stroke-width="4" stroke-linecap="round" />
            <circle cx={x1} cy={y1} r="3.5" fill={HEAD} />
          {/each}
        </g>
      {/each}
    </svg>
  </div>

  <div class="flex flex-wrap justify-center gap-2" role="group" aria-label="Xếp chữ số La Mã">
    {#each ROMAN_DIGITS as d (d.letter)}
      <button
        type="button"
        class="min-h-14 min-w-20 text-2xl {button.secondary}"
        aria-label="Xếp chữ {d.letter}, giá trị {d.value}, {d.letter === 'I' ? 1 : 2} que diêm"
        disabled={solved || row.length >= MAX_LETTERS}
        onclick={() => (row = addLetter(row, d.letter))}
        >{d.letter}<span class="text-sm font-normal" aria-hidden="true">= {d.value}</span></button
      >
    {/each}
  </div>
  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-base {button.quiet}"
      disabled={row === '' || solved}
      onclick={() => (row = row.slice(0, -1))}>Bỏ chữ cuối</button
    >
    <button
      type="button"
      class="min-h-12 text-base {button.quiet}"
      disabled={row === '' || solved}
      onclick={() => (row = '')}>Xếp lại</button
    >
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />

  {#if solved}
    <p class="text-center text-lg text-slate-700">{romanWhy(target)}</p>
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Xếp số khác
      </button>
    </div>
  {/if}
</div>
