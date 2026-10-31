<script>
  import { tick } from 'svelte';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import { clientToSvg, pointsAttr } from '#lib/utils/svg.js';
  import {
    BOARD_H,
    BOARD_W,
    PIECE_SHAPES,
    PUZZLES,
    TRAY_ROW,
    boardStatus,
    boardTarget,
    clampPose,
    placed,
    sizeOf,
    solve,
    startPoses,
    statusMessage,
    turned,
  } from './engine.js';

  /** Size of one grid cell in SVG units. */
  const CELL = 40;
  const W = BOARD_W * CELL;
  const H = BOARD_H * CELL;

  let level = $state(0);
  let poses = $state(startPoses(PUZZLES[0]));
  /** Piece being dragged and its top left in grid units while it moves. */
  /** @type {{ index: number, x: number, y: number } | null} */
  let moving = $state(null);
  let selected = $state(0);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** Where the pointer grabbed the piece, from the piece centre. */
  let grab = { x: 0, y: 0 };

  const puzzle = $derived(PUZZLES[level]);
  const target = $derived(boardTarget(puzzle));
  const status = $derived(boardStatus(puzzle, poses));
  const message = $derived(statusMessage(puzzle, status));

  /** @param {number} i */
  const cornersOf = (i) => PIECE_SHAPES[puzzle.pieces[i].shape].corners;

  /**
   * Piece outline in SVG units, following the drag while it moves.
   * @param {number} i
   */
  function outline(i) {
    const pose = poses[i];
    const x = moving?.index === i ? moving.x : pose.x;
    const y = moving?.index === i ? moving.y : pose.y;
    return placed(cornersOf(i), pose.rot, x, y).map((p) => ({ x: p.x * CELL, y: p.y * CELL }));
  }

  /** @param {number} i */
  function halfSize(i) {
    const { w, h } = sizeOf(turned(cornersOf(i), poses[i].rot));
    return { w: w / 2, h: h / 2 };
  }

  /** Scratch points the drag action writes the piece centre into, one per piece. */
  const scratch = PUZZLES.map(() => Array.from({ length: 4 }, () => ({ x: 0, y: 0 })));

  /** @param {number} i */
  function dragFor(i) {
    const point = scratch[level][i];
    return {
      point,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => ({ x: p.x + grab.x, y: p.y + grab.y }),
      onChange: () => {
        const half = halfSize(i);
        moving = { index: i, x: point.x / CELL - half.w, y: point.y / CELL - half.h };
      },
      onEnd: () => {
        if (moving?.index === i) setPose(i, { ...poses[i], x: moving.x, y: moving.y });
        moving = null;
      },
      /** @param {number} dx @param {number} dy */
      onKeyMove: (dx, dy) => setPose(i, { ...poses[i], x: poses[i].x + dx, y: poses[i].y + dy }),
    };
  }

  /**
   * @param {number} i
   * @param {import('./engine.js').Pose} pose
   */
  function setPose(i, pose) {
    poses[i] = clampPose(cornersOf(i), pose);
  }

  /**
   * Remembers where on the piece the pointer pressed, so it does not jump.
   * @param {number} i @param {PointerEvent} e
   */
  function grabPiece(i, e) {
    selected = i;
    if (!svgEl) return;
    const p = clientToSvg(svgEl, e.clientX, e.clientY, W, H);
    const half = halfSize(i);
    grab = {
      x: (poses[i].x + half.w) * CELL - p.x,
      y: (poses[i].y + half.h) * CELL - p.y,
    };
  }

  /** @param {number} i */
  function rotate(i) {
    const pose = poses[i];
    const before = halfSize(i);
    const cx = pose.x + before.w;
    const cy = pose.y + before.h;
    const { w, h } = sizeOf(turned(cornersOf(i), pose.rot + 1));
    setPose(i, { rot: pose.rot + 1, x: cx - w / 2, y: cy - h / 2 });
  }

  /** @param {number} i @param {KeyboardEvent} e */
  function onPieceKey(i, e) {
    if (e.key === 'r' || e.key === 'R' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selected = i;
      rotate(i);
    }
  }

  /** @param {number} next */
  async function choose(next) {
    level = next;
    poses = startPoses(PUZZLES[next]);
    moving = null;
    selected = 0;
    await tick();
  }

  function showAnswer() {
    const answer = solve(puzzle);
    if (answer) poses = answer;
  }

  /** @param {number} i */
  function pieceLabel(i) {
    const piece = puzzle.pieces[i];
    return `Mảnh ${i + 1}: ${PIECE_SHAPES[piece.shape].name}. Kéo, hoặc dùng phím mũi tên để di chuyển; phím R để xoay.`;
  }
</script>

<div class="space-y-4">
  <div role="group" aria-label="Chọn hình cần ghép" class="flex flex-wrap gap-2">
    {#each PUZZLES as p, i (p.id)}
      <button
        type="button"
        class="min-h-12 rounded-xl border-2 px-3 text-base font-semibold transition {focusRing} {level ===
        i
          ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
          : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400'}"
        aria-pressed={level === i}
        onclick={() => choose(i)}>{i + 1}. {p.title}</button
      >
    {/each}
  </div>

  <p class="text-xl font-semibold text-slate-800">{puzzle.goal}</p>

  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {H}"
    class="w-full max-w-lg touch-none rounded-2xl border border-slate-200 bg-white select-none"
    role="group"
    aria-label="Bảng ghép hình. Hình mẫu ở trên, các mảnh ở dưới."
  >
    <rect x="0" y={TRAY_ROW * CELL} width={W} height={H - TRAY_ROW * CELL} fill="#fef3c7" />
    {#each { length: BOARD_W + 1 } as _, x (x)}
      <line x1={x * CELL} y1="0" x2={x * CELL} y2={H} stroke="#e2e8f0" stroke-width="1" />
    {/each}
    {#each { length: BOARD_H + 1 } as _, y (y)}
      <line x1="0" y1={y * CELL} x2={W} y2={y * CELL} stroke="#e2e8f0" stroke-width="1" />
    {/each}
    <text x="8" y={TRAY_ROW * CELL + 24} font-size="18" fill="#92400e">Các mảnh</text>

    {#each target as poly, k (k)}
      <polygon
        points={pointsAttr(poly.map((p) => ({ x: p.x * CELL, y: p.y * CELL })))}
        fill={status.state === 'done' ? '#d1fae5' : '#f1f5f9'}
        stroke={status.state === 'done' ? '#059669' : '#475569'}
        stroke-width="3"
        stroke-dasharray={status.state === 'done' ? undefined : '8 6'}
        stroke-linejoin="round"
      />
    {/each}

    {#key level}
      {#each puzzle.pieces as piece, i (i)}
        <g
          class="drag-handle"
          role="button"
          tabindex="0"
          aria-roledescription="mảnh ghép"
          aria-label={pieceLabel(i)}
          style="cursor: grab; outline: none"
          use:draggable={dragFor(i)}
          onpointerdown={(e) => grabPiece(i, e)}
          onfocus={() => (selected = i)}
          onkeydown={(e) => onPieceKey(i, e)}
        >
          <polygon
            class="drag-knob"
            points={pointsAttr(outline(i))}
            fill={piece.color}
            fill-opacity="0.9"
            stroke={selected === i ? '#4338ca' : '#1e293b'}
            stroke-width={selected === i ? 4 : 2}
            stroke-linejoin="round"
          />
        </g>
      {/each}
    {/key}
  </svg>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      onclick={() => rotate(selected)}
    >
      <span aria-hidden="true">↻</span> Xoay mảnh {selected + 1}
    </button>
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={() => choose(level)}>
      Làm lại
    </button>
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={showAnswer}>
      Xem cách ghép
    </button>
  </div>

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {status.state === 'done'
      ? 'bg-emerald-100 text-emerald-900'
      : status.state === 'gap'
        ? 'bg-slate-100 text-slate-800'
        : 'bg-amber-100 text-amber-900'}"
    aria-live="polite"
  >
    {#if status.state === 'done'}<span aria-hidden="true">⭐ </span>{/if}{message}
  </p>

  {#if status.state === 'done' && level + 1 < PUZZLES.length}
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      onclick={() => choose(level + 1)}
    >
      Hình tiếp theo
    </button>
  {/if}
</div>
