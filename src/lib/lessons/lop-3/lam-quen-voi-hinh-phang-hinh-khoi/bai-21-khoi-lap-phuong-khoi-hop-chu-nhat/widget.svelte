<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { capitalize } from '#lib/core/kid/quiz.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { SOLID_DIMS, SOLID_NAMES, START_VIEW, faceFill, projectBox } from '../_shared/box.js';
  import SceneFigure from '../_shared/scene-figure.svelte';
  import { nameAway } from '../_shared/scene.js';
  import {
    KIND_LABELS,
    PARTS,
    buildRound,
    compareMessage,
    countMessage,
    countPart,
    dragView,
    nearestPart,
    turnView,
  } from './engine.js';

  /** @typedef {import('../_shared/box.js').SolidKind} SolidKind */
  /** @typedef {import('./engine.js').PartKind} PartKind */

  const W = 320;
  const H = 300;
  /** A press that moves further than this turns the solid instead of tapping. */
  const TAP_SLOP = 6;
  const COUNTED = '#34d399';
  const INK = '#1e293b';
  const SOLIDS = /** @type {const} */ (['lap-phuong', 'hop-chu-nhat']);
  const PART_KEYS = /** @type {const} */ (['dinh', 'canh', 'mat']);
  const TURNS = /** @type {const} */ ([
    { key: 'ArrowLeft', label: 'Xoay trái' },
    { key: 'ArrowRight', label: 'Xoay phải' },
    { key: 'ArrowUp', label: 'Nhìn từ trên' },
    { key: 'ArrowDown', label: 'Nhìn từ dưới' },
  ]);

  let mode = $state(/** @type {'dem' | 'quiz'} */ ('dem'));
  let solid = $state(/** @type {SolidKind} */ ('lap-phuong'));
  let part = $state(/** @type {PartKind} */ ('dinh'));
  let view = $state({ ...START_VIEW });
  /** What was tapped, by solid and part, in tapping order. */
  let counted = $state(/** @type {Record<string, string[]>} */ ({}));

  /** @type {{ startX: number, startY: number, x: number, y: number, moved: boolean, id: string | null } | null} */
  let press = null;
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const shape = $derived(projectBox(SOLID_DIMS[solid], view, W, H));
  const list = $derived(listOf(solid, part));
  const shownFaces = $derived(shape.faces.filter((f) => f.front));
  const backEdges = $derived(shape.edges.filter((e) => !e.front));
  const frontEdges = $derived(shape.edges.filter((e) => e.front));
  const inView = $derived(
    part === 'mat'
      ? shownFaces.map((f) => f.id)
      : (part === 'canh' ? shape.edges : shape.vertices).map((p) => p.id),
  );
  const leftInView = $derived(inView.filter((id) => !list.includes(id)).length);
  const finished = $derived(list.length === PARTS[part].total);
  const message = $derived(countMessage(solid, part, list.length, leftInView));
  const comparison = $derived(compareMessage((s, p) => listOf(s, p).length));

  /**
   * @param {SolidKind} s
   * @param {PartKind} p
   */
  function listOf(s, p) {
    return counted[`${s}:${p}`] ?? [];
  }

  /** @param {string} id */
  function tap(id) {
    counted[`${solid}:${part}`] = countPart(list, id);
  }

  /**
   * The name of a part for a screen reader.
   * @param {string} id
   * @param {boolean} [front]
   */
  function partLabel(id, front = true) {
    const name = PARTS[part].name;
    const place = part === 'mat' ? '' : front ? ' ở phía trước' : ' ở phía sau';
    const order = list.indexOf(id);
    return order === -1
      ? `Một ${name}${place}, chưa đếm`
      : `${name} thứ ${order + 1}${place}, đã đếm`;
  }

  /**
   * A click reaching a part counts only from a screen reader, which sends no
   * press (detail 0). The click after a real press may land on another part
   * than the nearest one the press already counted.
   * @param {MouseEvent} e
   * @param {string} id
   */
  function clicked(e, id) {
    if (e.detail === 0) tap(id);
  }

  /** @param {KeyboardEvent} e @param {string} id */
  function keyOn(e, id) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    tap(id);
  }

  /**
   * The part under a press. A face is what the press landed on; a vertex or an
   * edge is the nearest one, since the touch areas of the edges overlap.
   * @param {PointerEvent} e
   */
  function partAt(e) {
    if (part === 'mat') {
      const target = /** @type {Element} */ (e.target).closest('[data-part]');
      return target?.getAttribute('data-part') ?? null;
    }
    const matrix = svgEl?.getScreenCTM()?.inverse();
    if (!matrix) return null;
    const at = new DOMPoint(e.clientX, e.clientY).matrixTransform(matrix);
    return nearestPart(
      at,
      part === 'canh' ? shape.edges : shape.vertices.map((v) => ({ id: v.id, a: v.at, b: v.at })),
    );
  }

  /** @param {PointerEvent} e */
  function down(e) {
    press = {
      startX: e.clientX,
      startY: e.clientY,
      x: e.clientX,
      y: e.clientY,
      moved: false,
      id: partAt(e),
    };
    /** @type {HTMLElement} */ (e.currentTarget).setPointerCapture(e.pointerId);
  }

  /** @param {PointerEvent} e */
  function move(e) {
    if (!press) return;
    if (Math.hypot(e.clientX - press.startX, e.clientY - press.startY) > TAP_SLOP) {
      press.moved = true;
    }
    if (press.moved) {
      view = dragView(view, e.clientX - press.x, e.clientY - press.y);
    }
    press.x = e.clientX;
    press.y = e.clientY;
  }

  function up() {
    if (press && !press.moved && press.id) tap(press.id);
    press = null;
  }

  function cancel() {
    press = null;
  }

  function recount() {
    counted[`${solid}:${part}`] = [];
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'dem', label: 'Xoay và đếm' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'dem'}
    <div class="flex flex-wrap gap-2">
      <SegmentedControl
        label="Chọn khối"
        hideLabel
        bind:value={solid}
        options={[
          { value: 'lap-phuong', label: 'Khối lập phương' },
          { value: 'hop-chu-nhat', label: 'Khối hộp chữ nhật' },
        ]}
      />
      <SegmentedControl
        label="Chọn phần để đếm"
        hideLabel
        bind:value={part}
        options={[
          { value: 'dinh', label: 'Đỉnh' },
          { value: 'canh', label: 'Cạnh' },
          { value: 'mat', label: 'Mặt' },
        ]}
      />
    </div>

    <div
      role="presentation"
      class="touch-none cursor-grab active:cursor-grabbing"
      onpointerdown={down}
      onpointermove={move}
      onpointerup={up}
      onpointercancel={cancel}
    >
      <GeometryBoard
        width={W}
        height={H}
        interactive
        bind:svgEl
        maxWidth="max-w-md"
        label="{SOLID_NAMES[solid]} xoay được. Chạm vào từng {PARTS[part].name} để đếm"
      >
        {#each shownFaces as face (face.id)}
          {#if part === 'mat'}
            {@const order = list.indexOf(face.id)}
            <g
              class="part"
              role="button"
              tabindex="0"
              aria-pressed={order !== -1}
              aria-label={partLabel(face.id)}
              data-part={face.id}
              onclick={(e) => clicked(e, face.id)}
              onkeydown={(e) => keyOn(e, face.id)}
            >
              <polygon
                class="mark"
                points={pointsAttr(face.points)}
                fill={order === -1 ? faceFill(solid, face.tone) : COUNTED}
                stroke={INK}
                stroke-width="3"
                stroke-linejoin="round"
              />
              {#if order !== -1}
                <text
                  x={face.middle.x}
                  y={face.middle.y}
                  text-anchor="middle"
                  dominant-baseline="middle"
                  font-size="24"
                  font-weight="700"
                  fill={INK}
                  style="pointer-events:none">{order + 1}</text
                >
              {/if}
            </g>
          {:else}
            <polygon
              points={pointsAttr(face.points)}
              fill={faceFill(solid, face.tone)}
              stroke={INK}
              stroke-width="3"
              stroke-linejoin="round"
            />
          {/if}
        {/each}

        {#if part !== 'canh'}
          {#each backEdges as edge (edge.id)}
            <line
              x1={edge.a.x}
              y1={edge.a.y}
              x2={edge.b.x}
              y2={edge.b.y}
              stroke={INK}
              stroke-width="2.5"
              stroke-dasharray="7 6"
              pointer-events="none"
            />
          {/each}
        {:else}
          {#each [...backEdges, ...frontEdges] as edge (edge.id)}
            {@const order = list.indexOf(edge.id)}
            <g
              class="part"
              role="button"
              tabindex="0"
              aria-pressed={order !== -1}
              aria-label={partLabel(edge.id, edge.front)}
              data-part={edge.id}
              onclick={(e) => clicked(e, edge.id)}
              onkeydown={(e) => keyOn(e, edge.id)}
            >
              <line
                class="mark"
                x1={edge.a.x}
                y1={edge.a.y}
                x2={edge.b.x}
                y2={edge.b.y}
                stroke="transparent"
                stroke-width="36"
                stroke-linecap="round"
              />
              <line
                x1={edge.a.x}
                y1={edge.a.y}
                x2={edge.b.x}
                y2={edge.b.y}
                stroke={order === -1 ? INK : '#059669'}
                stroke-width={order === -1 ? 4 : 7}
                stroke-linecap="round"
                stroke-dasharray={edge.front ? undefined : '7 6'}
              />
              {#if order !== -1}
                {@const middle = { x: (edge.a.x + edge.b.x) / 2, y: (edge.a.y + edge.b.y) / 2 }}
                {@const spot = nameAway(middle, shape.centre, edge.front ? 15 : -15)}
                <text
                  x={spot.x}
                  y={spot.y}
                  text-anchor="middle"
                  dominant-baseline="middle"
                  font-size="18"
                  font-weight="700"
                  fill="#065f46"
                  style="pointer-events:none">{order + 1}</text
                >
              {/if}
            </g>
          {/each}
        {/if}

        {#if part === 'dinh'}
          {#each shape.vertices as vertex (vertex.id)}
            {@const order = list.indexOf(vertex.id)}
            {@const spot = nameAway(vertex.at, shape.centre, 22)}
            <g
              class="part"
              role="button"
              tabindex="0"
              aria-pressed={order !== -1}
              aria-label={partLabel(vertex.id, vertex.front)}
              data-part={vertex.id}
              onclick={(e) => clicked(e, vertex.id)}
              onkeydown={(e) => keyOn(e, vertex.id)}
            >
              <circle class="mark" cx={vertex.at.x} cy={vertex.at.y} r="22" fill="transparent" />
              <circle
                cx={vertex.at.x}
                cy={vertex.at.y}
                r="9"
                fill={order === -1 ? '#4f46e5' : '#059669'}
                fill-opacity={vertex.front ? 1 : 0.55}
                stroke="white"
                stroke-width="2"
              />
              {#if order !== -1}
                <text
                  x={spot.x}
                  y={spot.y}
                  text-anchor="middle"
                  dominant-baseline="middle"
                  font-size="18"
                  font-weight="700"
                  fill="#065f46"
                  style="pointer-events:none">{order + 1}</text
                >
              {/if}
            </g>
          {/each}
        {/if}
      </GeometryBoard>
    </div>

    <div class="mx-auto grid max-w-md grid-cols-2 gap-2 sm:grid-cols-4">
      {#each TURNS as t (t.key)}
        <button
          type="button"
          class="min-h-12 text-base {button.quiet}"
          onclick={() => (view = turnView(view, t.key))}
        >
          {t.label}
        </button>
      {/each}
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {finished
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if finished}<span aria-hidden="true">⭐ </span>{/if}{message}
    </p>

    <table class="mx-auto w-full max-w-md text-center text-lg">
      <caption class="sr-only">Số phần em đã đếm của mỗi khối</caption>
      <thead>
        <tr class="text-slate-600">
          <th scope="col" class="p-2 text-left font-semibold">Em đã đếm</th>
          {#each PART_KEYS as p (p)}
            <th scope="col" class="p-2 font-semibold">{capitalize(PARTS[p].name)}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each SOLIDS as s (s)}
          <tr class="border-t border-slate-200">
            <th scope="row" class="p-2 text-left font-semibold">{capitalize(SOLID_NAMES[s])}</th>
            {#each PART_KEYS as p (p)}
              {@const n = listOf(s, p).length}
              <td
                class="p-2 font-semibold {n === PARTS[p].total
                  ? 'text-emerald-700'
                  : 'text-slate-700'}"
              >
                {n}{#if n === PARTS[p].total}<span aria-hidden="true"> ✓</span>{/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>

    <div aria-live="polite">
      {#if comparison}
        <p class="rounded-2xl bg-indigo-50 px-4 py-3 text-lg font-semibold text-indigo-900">
          {comparison}
        </p>
      {/if}
    </div>

    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={recount}>
        Đếm lại {PARTS[part].name}
      </button>
    </div>
  {:else}
    <ChoiceRound
      build={buildRound}
      labels={KIND_LABELS}
      allGood="Tuyệt vời! Em đã nhận ra khối lập phương, khối hộp chữ nhật và các đỉnh, cạnh, mặt của chúng."
    >
      {#snippet visual(q, settled)}
        {#if q.visual}
          <SceneFigure scene={q.visual} {settled} />
        {/if}
      {/snippet}
    </ChoiceRound>
  {/if}
</div>

<style>
  .part {
    cursor: pointer;
    outline: none;
  }
  .part:focus-visible .mark {
    stroke: #6366f1;
    stroke-opacity: 0.6;
    stroke-width: 6;
  }
  .part:focus-visible line.mark {
    stroke-width: 14;
  }
</style>
