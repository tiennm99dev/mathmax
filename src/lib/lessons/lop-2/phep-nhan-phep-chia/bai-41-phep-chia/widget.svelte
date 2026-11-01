<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import {
    BOWL_HEIGHT,
    CANDY,
    GROUP_TASKS,
    NAMES,
    PLATE_ROOM,
    SHARE_TASKS,
    WIDTH,
    counts,
    nextPlate,
    pictureHeight,
    plateAt,
    plateBox,
    plateCount,
    sentences,
    spotOf,
    status,
  } from './engine.js';

  /** @typedef {import('./engine.js').Task} Task */
  /** @typedef {{ id: number, x: number, y: number }} Item */

  let mode = $state(/** @type {'share' | 'group'} */ ('share'));
  let round = $state(0);

  const task = $derived(
    /** @type {Task} */ (
      mode === 'share'
        ? SHARE_TASKS[round % SHARE_TASKS.length]
        : GROUP_TASKS[round % GROUP_TASKS.length]
    ),
  );
  const plates = $derived(plateCount(task));
  const height = $derived(pictureHeight(plates));

  /** @type {import('./engine.js').Where} */
  let where = $state([]);
  /** @type {Item[]} */
  let items = $state([]);
  /** Bumps on every new start, so each candy's drag handler is rebuilt for its fresh item. */
  let generation = $state(0);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const onPlates = $derived(counts(where, plates));
  const check = $derived(status(task, where));
  const said = $derived(sentences(task));
  const tally = $derived(
    onPlates
      .map((n, p) => ({ name: NAMES[p], n }))
      .filter((row) => row.n > 0)
      .map((row) => `${row.name} ${row.n} cái`)
      .join(', '),
  );

  /** @param {Task} t */
  function start(t) {
    where = Array.from({ length: t.total }, () => null);
    items = where.map((_, id) => ({ id, ...spotOf(where, id) }));
    generation += 1;
  }

  start(SHARE_TASKS[0]);

  function settle() {
    for (const it of items) Object.assign(it, spotOf(where, it.id));
  }

  /** @param {number} id @param {number | null} plate */
  function moveTo(id, plate) {
    if (plate !== null && where[id] !== plate && onPlates[plate] >= PLATE_ROOM) plate = where[id];
    where[id] = plate;
    settle();
  }

  /** Tapping a candy in the bowl hands it out; tapping one on a plate takes it back. */
  /** @param {number} id */
  function toggle(id) {
    moveTo(id, where[id] === null ? nextPlate(task, where) : null);
  }

  /** Where the current press started, so a tap without a drag can toggle. */
  let press = { id: -1, x: 0, y: 0 };

  /** @param {Item} it */
  function drop(it) {
    if (press.id === it.id && Math.hypot(it.x - press.x, it.y - press.y) < 6) {
      press.id = -1;
      toggle(it.id);
      return;
    }
    moveTo(it.id, plateAt(it.x + CANDY / 2, it.y + CANDY / 2, plates));
  }

  /** @param {Item} it */
  const dragFor = (it) => ({
    point: it,
    svg: () => svgEl ?? null,
    viewBox: { w: WIDTH, h: height },
    pad: 0,
    /** @param {{ x: number, y: number }} p the pointer; the candy centres on it */
    projector: (p) => ({
      x: Math.max(0, Math.min(WIDTH - CANDY, p.x - CANDY / 2)),
      y: Math.max(0, Math.min(height - CANDY, p.y - CANDY / 2)),
    }),
    onEnd: () => drop(it),
    /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy */
    onKeyMove: (dx, dy) => {
      const here = where[it.id];
      if (dy < 0) moveTo(it.id, null);
      else if (dy > 0 && here === null) moveTo(it.id, nextPlate(task, where));
      else if (dx !== 0) moveTo(it.id, ((here ?? (dx > 0 ? -1 : 0)) + dx + plates) % plates);
    },
  });

  /** @param {KeyboardEvent} e @param {number} id */
  function onKey(e, id) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    toggle(id);
  }

  function newTask() {
    round += 1;
    start(task);
  }

  function restart() {
    start(task);
  }

  function changeMode() {
    round = 0;
    start(task);
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn cách chia"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'share', label: 'Chia đều' },
      { value: 'group', label: 'Chia theo nhóm' },
    ]}
    onchange={changeMode}
  />

  <p class="text-xl font-semibold text-slate-800">{said.question}</p>

  <svg
    bind:this={svgEl}
    viewBox="0 0 {WIDTH} {height}"
    class="mx-auto block w-full max-w-md select-none"
    style:aspect-ratio="{WIDTH} / {height}"
    style:touch-action="none"
    role="group"
    aria-label="Bát kẹo và đĩa của các bạn. Kéo kẹo vào đĩa, hoặc chạm vào kẹo. Với bàn phím: Enter để chia hoặc lấy lại, mũi tên trái phải để đổi đĩa, mũi tên lên để trả về bát."
  >
    <rect
      x="4"
      y="4"
      width={WIDTH - 8}
      height={BOWL_HEIGHT}
      rx="16"
      fill="#fef3c7"
      stroke="#d97706"
      stroke-width="2"
    />

    {#each onPlates as count, p (p)}
      {@const box = plateBox(p)}
      {@const full = check.done && count > 0}
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx="14"
        fill={full ? '#dcfce7' : '#f0f9ff'}
        stroke={full ? '#16a34a' : '#7dd3fc'}
        stroke-width="3"
      />
      <text
        x={box.x + box.w / 2}
        y={box.y + 22}
        text-anchor="middle"
        font-size="16"
        font-weight="700"
        fill="#334155">{NAMES[p]}: {count}</text
      >
    {/each}

    {#key generation}
      {#each items as it (it.id)}
        <g
          class="drag-handle"
          role="button"
          tabindex="0"
          aria-label="Cái kẹo {it.id + 1}, {where[it.id] === null
            ? 'trong bát'
            : `của ${NAMES[where[it.id] ?? 0]}`}"
          style="cursor:grab; outline:none"
          use:draggable={dragFor(it)}
          onpointerdown={() => (press = { id: it.id, x: it.x, y: it.y })}
          onkeydown={(e) => onKey(e, it.id)}
        >
          <g transform="translate({it.x} {it.y}) scale({CANDY / 32})">
            <path d="M8 16 L0 9 L0 23 Z" fill="#fb7185" />
            <path d="M24 16 L32 9 L32 23 Z" fill="#fb7185" />
            <circle
              class="drag-knob"
              cx="16"
              cy="16"
              r="10"
              fill="#f43f5e"
              stroke="#be123c"
              stroke-width="1.5"
            />
            <path
              d="M11 13 Q16 9 21 13"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
            />
          </g>
        </g>
      {/each}
    {/key}
  </svg>

  <p
    class="text-center text-4xl font-bold tabular-nums {check.done
      ? 'text-emerald-700'
      : 'text-slate-700'}"
  >
    {check.done ? said.division : said.blank}
  </p>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {check.done
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if check.done}<span aria-hidden="true">⭐ </span>{/if}{check.text}{#if tally && !check.done}
      <span class="block text-lg font-normal">Đang có: {tally}.</span>{/if}
  </p>

  <div class="flex flex-wrap gap-3">
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newTask}>
      Bài khác
    </button>
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={restart}>Làm lại</button>
  </div>
</div>
