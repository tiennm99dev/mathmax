<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { SOLID_NAMES } from '../_shared/solids.js';
  import {
    DIRECTIONS,
    SPHERE_RADIUS,
    arrowView,
    directionOf,
    dragView,
    drawSolid,
    foundOut,
    viewNote,
  } from './engine.js';

  /**
   * A cylinder or a ball the child turns by dragging, with the arrow keys or
   * with the big buttons. Looking from the side, from above and from below
   * shows what makes each solid what it is: the cylinder has two flat round
   * faces and a curved side; the ball stays round from everywhere.
   */

  const W = 260;
  const H = 240;
  const START = { yaw: -20, pitch: 28 };

  /** @param {{ x: number, y: number }} p */
  const toScreen = (p) => ({ x: W / 2 + p.x, y: H / 2 + p.y });

  let kind = $state(/** @type {import('./engine.js').RoundSolid} */ ('tru'));
  let view = $state({ ...START });
  /** The directions already looked from, per solid. */
  let seen = $state({
    tru: /** @type {string[]} */ ([]),
    cau: /** @type {string[]} */ ([]),
  });

  const drawing = $derived(drawSolid(kind, view, toScreen));
  const from = $derived(directionOf(view));
  const done = $derived(seen[kind].length === DIRECTIONS.length);
  const name = $derived(SOLID_NAMES[kind]);

  /** @param {{ yaw: number, pitch: number }} next */
  function turnTo(next) {
    view = next;
    const direction = directionOf(next);
    if (direction && !seen[kind].includes(direction)) seen[kind].push(direction);
  }

  /** @type {{ x: number, y: number } | null} */
  let last = null;
  /** @param {PointerEvent} e */
  function down(e) {
    last = { x: e.clientX, y: e.clientY };
    /** @type {HTMLElement} */ (e.currentTarget).setPointerCapture(e.pointerId);
  }
  /** @param {PointerEvent} e */
  function move(e) {
    if (!last) return;
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    last = { x: e.clientX, y: e.clientY };
    turnTo(dragView(view, dx, dy));
  }
  function up() {
    last = null;
  }
  /**
   * @param {string} key
   * @param {boolean} [shift]
   */
  function press(key, shift = false) {
    const next = arrowView(view, key, shift);
    if (next) turnTo(next);
    return next !== null;
  }
  /** @param {KeyboardEvent} e */
  function onKey(e) {
    if (press(e.key, e.shiftKey)) e.preventDefault();
  }

  const ARROWS = [
    { key: 'ArrowLeft', icon: '◀', label: 'Xoay sang trái' },
    { key: 'ArrowUp', icon: '▲', label: 'Nghiêng để nhìn từ trên' },
    { key: 'ArrowDown', icon: '▼', label: 'Nghiêng để nhìn từ dưới' },
    { key: 'ArrowRight', icon: '▶', label: 'Xoay sang phải' },
  ];
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn khối"
    hideLabel
    bind:value={kind}
    options={[
      { value: 'tru', label: 'Khối trụ' },
      { value: 'cau', label: 'Khối cầu' },
    ]}
  />

  <div
    role="slider"
    tabindex="0"
    aria-label="Mô hình {name}. Kéo hoặc dùng phím mũi tên để xoay khối"
    aria-valuemin={-180}
    aria-valuemax={180}
    aria-valuenow={Math.round(view.yaw)}
    aria-valuetext="Xoay {Math.round(view.yaw)} độ, nghiêng {Math.round(view.pitch)} độ"
    class="mx-auto max-w-xs cursor-grab touch-none rounded-2xl border-2 border-slate-200 bg-white select-none active:cursor-grabbing {focusRing}"
    onpointerdown={down}
    onpointermove={move}
    onpointerup={up}
    onpointercancel={up}
    onkeydown={onKey}
  >
    <svg viewBox="0 0 {W} {H}" class="block h-auto w-full" aria-hidden="true">
      {#if kind === 'cau'}
        <circle cx={W / 2} cy={H / 2} r={SPHERE_RADIUS} fill="#fef3c7" />
      {/if}
      {#each drawing.polys as poly (poly.id)}
        <polygon
          points={poly.points}
          fill={poly.fill}
          stroke={poly.fill}
          stroke-width="0.6"
          stroke-linejoin="round"
        />
      {/each}
      {#each drawing.lines as line (line.id)}
        <line
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#1e293b"
          stroke-width="2.5"
          stroke-linecap="round"
        />
      {/each}
      {#if kind === 'cau'}
        <circle
          cx={W / 2}
          cy={H / 2}
          r={SPHERE_RADIUS}
          fill="none"
          stroke="#1e293b"
          stroke-width="2.5"
        />
      {/if}
    </svg>
  </div>

  <div role="group" aria-label="Xoay khối" class="flex justify-center gap-2">
    {#each ARROWS as arrow (arrow.key)}
      <button
        type="button"
        class="{button.quiet} min-h-12 min-w-12 text-xl"
        aria-label={arrow.label}
        onclick={() => press(arrow.key)}
      >
        <span aria-hidden="true">{arrow.icon}</span>
      </button>
    {/each}
  </div>

  <ul class="flex flex-wrap justify-center gap-2" aria-label="Các phía đã nhìn">
    {#each DIRECTIONS as direction (direction.id)}
      {@const looked = seen[kind].includes(direction.id)}
      <li
        class="rounded-full px-3 py-1 text-base font-semibold {looked
          ? 'bg-emerald-100 text-emerald-900'
          : 'bg-slate-100 text-slate-600'} {from === direction.id ? 'ring-2 ring-indigo-500' : ''}"
      >
        <span aria-hidden="true">{looked ? '✓ ' : ''}</span>{direction.label}<span class="sr-only"
          >{looked ? ': đã nhìn' : ': chưa nhìn'}</span
        >
      </li>
    {/each}
  </ul>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {done
      ? 'bg-emerald-100 text-emerald-900'
      : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {viewNote(kind, view)}
    {#if done}
      <span class="mt-1 block">{foundOut(kind)}</span>
    {/if}
  </p>
</div>
