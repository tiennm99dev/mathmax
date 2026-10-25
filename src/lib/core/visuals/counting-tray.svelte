<script>
  import { untrack } from 'svelte';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Picture from '../kid/picture.svelte';
  import { pictures } from '../kid/pictures/index.js';

  /**
   * A kid counting tray: pictures wait on a shelf and are dragged into a
   * ten-frame tray, where they snap into the next free slot. Dropping one
   * outside the tray sends it back to the shelf, and a tap moves a picture
   * across. On the keyboard, Tab moves between pictures, Enter or Space moves
   * one across, the down arrow puts it in the tray and the up arrow takes it
   * out. `count` reports how many are in the tray.
   *
   * - `picture`: which kid picture to count (see `../kid/pictures/index.js`).
   * - `total`: how many pictures there are (1-20); the tray has as many slots,
   *   in rows of five.
   * - `count` (bindable): pictures in the tray. Its value when the tray first
   *   renders places that many pictures in the tray.
   * - `target`: optional number to reach; the tray glows green when matched.
   *
   * @type {{
   *   picture?: import('../kid/pictures/index.js').PictureName;
   *   total?: number;
   *   count?: number;
   *   target?: number | null;
   *   interactive?: boolean;
   *   label?: string;
   *   onchange?: (count: number) => void;
   * }}
   */
  let {
    picture = 'apple',
    total = 10,
    count = $bindable(0),
    target = null,
    interactive = true,
    label = 'Khay đếm',
    onchange,
  } = $props();

  const N = $derived(Math.max(1, Math.min(20, total)));
  const CELL = 64;
  const PAD = 12;
  const PIC = 48;
  const W = PAD * 2 + 5 * CELL;
  const shelfRows = $derived(Math.ceil(N / 5));
  const trayTop = $derived(PAD + shelfRows * CELL + 28);
  const H = $derived(trayTop + shelfRows * CELL + PAD + 8);

  /** Top-left of shelf place i and tray slot i. */
  const shelfAt = (/** @type {number} */ i) => ({
    x: PAD + (i % 5) * CELL + (CELL - PIC) / 2,
    y: PAD + Math.floor(i / 5) * CELL + (CELL - PIC) / 2,
  });
  const slotAt = (/** @type {number} */ i) => ({
    x: PAD + (i % 5) * CELL + (CELL - PIC) / 2,
    y: trayTop + 6 + Math.floor(i / 5) * CELL + (CELL - PIC) / 2,
  });

  /** @typedef {{ id: number, x: number, y: number, slot: number | null }} Item */
  /** @type {Item[]} */
  let items = $state(
    untrack(() =>
      Array.from({ length: Math.max(1, Math.min(20, total)) }, (_, id) => {
        const inTray = id < Math.min(count, total);
        const p = inTray ? slotAt(id) : shelfAt(id);
        return { id, x: p.x, y: p.y, slot: inTray ? id : null };
      }),
    ),
  );
  const inTray = $derived(items.filter((it) => it.slot !== null).length);
  const matched = $derived(target !== null && inTray === target);
  const noun = $derived(pictures[picture]);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  function sync() {
    if (inTray === count) return;
    count = inTray;
    onchange?.(inTray);
  }

  /** @param {Item} it */
  function toTray(it) {
    if (it.slot !== null) return;
    const used = new Set(items.map((o) => o.slot));
    const free = Array.from({ length: N }, (_, i) => i).find((i) => !used.has(i));
    if (free === undefined) return;
    const p = slotAt(free);
    it.slot = free;
    it.x = p.x;
    it.y = p.y;
    sync();
  }

  /** @param {Item} it */
  function toShelf(it) {
    const p = shelfAt(it.id);
    it.slot = null;
    it.x = p.x;
    it.y = p.y;
    sync();
  }

  /** Where the current press started, so a tap without a drag can toggle. */
  let press = { id: -1, x: 0, y: 0 };

  /**
   * Snap a dropped picture: into the tray if its centre is over it, else
   * home. A tap that barely moved toggles the picture between shelf and tray.
   * @param {Item} it
   */
  function drop(it) {
    if (press.id === it.id && Math.hypot(it.x - press.x, it.y - press.y) < 6) {
      press.id = -1;
      if (it.slot === null) toTray(it);
      else toShelf(it);
      return;
    }
    const centreY = it.y + PIC / 2;
    const wasIn = it.slot;
    if (centreY >= trayTop) {
      if (wasIn !== null) {
        const p = slotAt(wasIn);
        it.x = p.x;
        it.y = p.y;
      } else toTray(it);
    } else {
      toShelf(it);
    }
  }

  /** @param {Item} it */
  const dragFor = (it) => ({
    point: it,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} p the pointer; the picture centres on it */
    projector: (p) => ({
      x: Math.max(0, Math.min(W - PIC, p.x - PIC / 2)),
      y: Math.max(0, Math.min(H - PIC, p.y - PIC / 2)),
    }),
    onEnd: () => drop(it),
    /** @param {number} _dx @param {number} dy */
    onKeyMove: (_dx, dy) => {
      if (dy > 0) toTray(it);
      else if (dy < 0) toShelf(it);
    },
  });

  /** @param {KeyboardEvent} e @param {Item} it */
  function onKey(e, it) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    if (it.slot === null) toTray(it);
    else toShelf(it);
  }
</script>

<figure class="space-y-2">
  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-md select-none"
    style:aspect-ratio="{W} / {H}"
    style:touch-action={interactive ? 'none' : null}
    role="group"
    aria-label="{label}: kéo {noun} vào khay"
  >
    <rect x="4" y="4" width={W - 8} height={trayTop - 20} rx="14" fill="#f8fafc" stroke="#e2e8f0" />
    <rect
      x="4"
      y={trayTop}
      width={W - 8}
      height={H - trayTop - 4}
      rx="16"
      fill={matched ? '#dcfce7' : '#fef3c7'}
      stroke={matched ? '#16a34a' : '#d97706'}
      stroke-width="4"
    />
    {#each { length: N } as _, i (i)}
      {@const s = slotAt(i)}
      <rect
        x={s.x - 6}
        y={s.y - 6}
        width={PIC + 12}
        height={PIC + 12}
        rx="10"
        fill="#fff"
        fill-opacity="0.7"
        stroke="#d6a65b"
        stroke-dasharray="5 4"
      />
    {/each}

    {#each items as it (it.id)}
      {#if interactive}
        <g
          class="drag-handle"
          role="button"
          tabindex="0"
          aria-label="{noun} {it.id + 1}, {it.slot === null
            ? 'trên kệ — nhấn Enter để bỏ vào khay'
            : 'trong khay — nhấn Enter để lấy ra'}"
          style="cursor:grab; outline:none"
          use:draggable={dragFor(it)}
          onpointerdown={() => (press = { id: it.id, x: it.x, y: it.y })}
          onkeydown={(e) => onKey(e, it)}
        >
          <rect
            class="drag-knob"
            x={it.x - 4}
            y={it.y - 4}
            width={PIC + 8}
            height={PIC + 8}
            rx="10"
            fill="transparent"
          />
          <Picture name={picture} size={PIC} x={it.x} y={it.y} decorative />
        </g>
      {:else}
        <Picture name={picture} size={PIC} x={it.x} y={it.y} decorative />
      {/if}
    {/each}
  </svg>
  <figcaption class="text-center text-2xl font-bold text-slate-800" aria-live="polite">
    Trong khay có <span class="tabular-nums">{inTray}</span>
    {noun}{#if target !== null && matched}&nbsp;— đúng rồi!{/if}
  </figcaption>
</figure>
