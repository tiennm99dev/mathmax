<script>
  import Picture from '#lib/core/kid/picture.svelte';
  import { pictures } from '#lib/core/kid/pictures/index.js';
  import { button } from '#lib/core/ui.js';
  import { addPair, allPaired, isPaired, newGroups, progressMessage } from './engine.js';

  /** @typedef {import('./engine.js').Row} Row */

  /** @type {Array<[import('#lib/core/kid/pictures/index.js').PictureName, import('#lib/core/kid/pictures/index.js').PictureName]>} */
  const THEMES = [
    ['cat', 'fish'],
    ['butterfly', 'flower'],
  ];

  const W = 360;
  const SLOT = 50;
  const PIC = 44;
  const TOP_Y = 8;
  const BOTTOM_Y = 150;
  const H = BOTTOM_Y + PIC + 8;

  let round = $state(0);
  let top = $state(5);
  let bottom = $state(3);
  /** @type {import('./engine.js').Pair[]} */
  let pairs = $state([]);
  /** @type {{ row: Row, index: number } | null} */
  let selected = $state(null);

  const theme = $derived(THEMES[round % THEMES.length]);
  const topNoun = $derived(pictures[theme[0]]);
  const bottomNoun = $derived(pictures[theme[1]]);
  const x0 = $derived((W - Math.max(top, bottom) * SLOT) / 2);
  const done = $derived(allPaired(pairs, top, bottom));
  const message = $derived(progressMessage(pairs.length, top, bottom, topNoun, bottomNoun));

  /** @type {Array<{ row: Row, n: number, pic: import('#lib/core/kid/pictures/index.js').PictureName, noun: string, y: number }>} */
  const rows = $derived([
    { row: 'top', n: top, pic: theme[0], noun: topNoun, y: TOP_Y },
    { row: 'bottom', n: bottom, pic: theme[1], noun: bottomNoun, y: BOTTOM_Y },
  ]);

  /** @param {number} i */
  const centre = (i) => x0 + i * SLOT + SLOT / 2;

  /**
   * @param {Row} row
   * @param {number} index
   */
  function tap(row, index) {
    if (isPaired(pairs, row, index)) return;
    if (selected && selected.row !== row) {
      const t = row === 'top' ? index : selected.index;
      const b = row === 'bottom' ? index : selected.index;
      pairs = addPair(pairs, t, b);
      selected = null;
      return;
    }
    selected = selected && selected.row === row && selected.index === index ? null : { row, index };
  }

  /**
   * @param {KeyboardEvent} e
   * @param {Row} row
   * @param {number} index
   */
  function key(e, row, index) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      tap(row, index);
    }
  }

  function newRound() {
    round += 1;
    [top, bottom] = newGroups();
    pairs = [];
    selected = null;
  }

  function reset() {
    pairs = [];
    selected = null;
  }

  /**
   * @param {Row} row
   * @param {number} index
   * @param {string} noun
   */
  function labelOf(row, index, noun) {
    if (isPaired(pairs, row, index)) return `${noun} thứ ${index + 1}, đã nối`;
    if (selected?.row === row && selected.index === index)
      return `${noun} thứ ${index + 1}, đang chọn`;
    return `${noun} thứ ${index + 1}, chưa nối`;
  }
</script>

<div class="space-y-5">
  <p class="text-xl font-semibold text-slate-800">
    Nối mỗi {topNoun} với một {bottomNoun}. Nhóm nào còn thừa?
  </p>

  <svg
    viewBox="0 0 {W} {H}"
    class="block w-full max-w-md rounded-2xl border-4 bg-white {done
      ? 'border-emerald-400'
      : 'border-sky-300'}"
    role="group"
    aria-label="Hai nhóm đồ vật: hàng trên là {topNoun}, hàng dưới là {bottomNoun}"
  >
    {#each pairs as [t, b] (`${t}-${b}`)}
      <line
        x1={centre(t)}
        y1={TOP_Y + PIC + 2}
        x2={centre(b)}
        y2={BOTTOM_Y - 2}
        stroke="#6366f1"
        stroke-width="4"
        stroke-linecap="round"
      />
    {/each}

    {#each rows as { row: r, n, pic, noun, y } (r)}
      {#each { length: n } as _, i (i)}
        {@const on = selected?.row === r && selected.index === i}
        {@const joined = isPaired(pairs, r, i)}
        {@const leftover = done && !joined}
        <g
          role="button"
          tabindex="0"
          class="drag-handle cursor-pointer outline-none"
          aria-label={labelOf(r, i, noun)}
          aria-pressed={on}
          onclick={() => tap(r, i)}
          onkeydown={(e) => key(e, r, i)}
        >
          <rect
            class="drag-knob"
            x={x0 + i * SLOT + 1}
            y={y - 4}
            width={SLOT - 2}
            height={PIC + 8}
            rx="10"
            fill={on ? '#e0e7ff' : leftover ? '#fef3c7' : joined ? '#ecfdf5' : '#f8fafc'}
            stroke={on ? '#4f46e5' : leftover ? '#f59e0b' : '#cbd5e1'}
            stroke-width={on || leftover ? 3 : 1.5}
          />
          <Picture name={pic} size={PIC} x={x0 + i * SLOT + (SLOT - PIC) / 2} {y} decorative />
        </g>
      {/each}
    {/each}
  </svg>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {done
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if done}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  <div class="flex flex-wrap gap-3">
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newRound}>
      Bài khác
    </button>
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={reset}> Nối lại </button>
  </div>
</div>
