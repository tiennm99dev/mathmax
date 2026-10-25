<script>
  import { button } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { middleOf, rayOf, raysRelation } from './engine.js';

  const W = 480;
  const H = 200;
  const Y = 100;
  const LEFT = 20;
  const RIGHT = W - 20;
  // Points move along xy in steps of STEP units between MIN and MAX.
  const STEP = 20;
  const MIN = 40;
  const MAX = W - 40;
  const NAMES = ['O', 'A', 'B'];
  const COLORS = ['#1F2937', '#D7263D', '#2E86AB'];
  const START = [100, 240, 380];

  const TASKS = [
    { id: 'o-giua', text: 'Đặt điểm O nằm giữa A và B.' },
    { id: 'b-giua', text: 'Đặt điểm B nằm giữa O và A.' },
    { id: 'oa-ox', text: 'Làm cho tia OA trùng với tia Ox.' },
  ];

  let pts = $state(START.map((x) => ({ x, y: Y })));
  /** @type {Record<string, boolean>} */
  let done = $state({});
  /** @type {SVGSVGElement | undefined} */ let svgEl = $state();

  /** @param {number} x */
  const snapX = (x) => clamp(MIN + Math.round((x - MIN) / STEP) * STEP, MIN, MAX);

  /** @param {number} i */
  function dragFor(i) {
    return {
      point: pts[i],
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => ({ x: snapX(p.x), y: Y }),
      /** @param {number} dx @param {number} dy @param {boolean} big */
      onKeyMove: (dx, dy, big) => {
        const d = dx || -dy;
        pts[i] = { x: snapX(pts[i].x + d * STEP * (big ? 5 : 1)), y: Y };
      },
    };
  }

  function reset() {
    pts = START.map((x) => ({ x, y: Y }));
    done = {};
  }

  const o = $derived(pts[0].x);
  const a = $derived(pts[1].x);
  const b = $derived(pts[2].x);
  const mid = $derived(middleOf(NAMES.map((name, i) => ({ name, x: pts[i].x }))));
  const rel = $derived(raysRelation(o, a, b));
  const sideA = $derived(rayOf(o, a));
  const sideB = $derived(rayOf(o, b));

  const middleText = $derived.by(() => {
    if (!mid) return 'Có hai điểm đang trùng nhau. Hãy kéo để ba điểm phân biệt.';
    const m = mid.middle.name;
    const [p, q] = mid.ends.map((e) => e.name);
    return `Điểm ${m} nằm giữa hai điểm ${p} và ${q}. Hai điểm ${p} và ${q} nằm khác phía đối với ${m}; hai điểm ${m} và ${q} nằm cùng phía đối với ${p}.`;
  });

  const rayText = $derived.by(() => {
    if (!rel) return 'Điểm A hoặc B đang trùng với gốc O, nên chưa có tia OA hoặc tia OB.';
    const names = `Tia OA trùng với tia O${sideA}, tia OB trùng với tia O${sideB}.`;
    return rel === 'doi-nhau'
      ? `${names} Điểm O nằm giữa A và B, nên tia OA và tia OB là hai tia đối nhau.`
      : `${names} Hai điểm A và B nằm cùng phía đối với O, nên tia OA và tia OB trùng nhau.`;
  });

  $effect(() => {
    if (mid?.middle.name === 'O' && !done['o-giua']) done['o-giua'] = true;
    if (mid?.middle.name === 'B' && !done['b-giua']) done['b-giua'] = true;
    if (sideA === 'x' && !done['oa-ox']) done['oa-ox'] = true;
  });

  const solved = $derived(TASKS.filter((t) => done[t.id]).length);

  /**
   * The ray from O through the point at abscissa p, drawn `dy` units off the
   * line, ending in an arrowhead at the edge of the board.
   * @param {number} p @param {number} dy
   */
  function ray(p, dy) {
    const end = p < o ? LEFT : RIGHT;
    const s = p < o ? -1 : 1;
    const y = Y + dy;
    return {
      x1: o,
      x2: end - s * 8,
      y,
      head: `${end},${y} ${end - s * 12},${y - 6} ${end - s * 12},${y + 6}`,
    };
  }

  const rayA = $derived(sideA ? ray(a, -16) : null);
  const rayB = $derived(sideB ? ray(b, 16) : null);
</script>

<div class="space-y-4">
  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Đường thẳng xy với ba điểm O, A, B kéo được và hai tia OA, OB"
  >
    <line x1={LEFT} y1={Y} x2={RIGHT} y2={Y} stroke="#64748B" stroke-width="2" />
    <text x={LEFT} y={Y + 40} font-size="16" font-style="italic" fill="#475569">x</text>
    <text x={RIGHT - 10} y={Y + 40} font-size="16" font-style="italic" fill="#475569">y</text>

    {#if rayA}
      <line
        x1={rayA.x1}
        y1={rayA.y}
        x2={rayA.x2}
        y2={rayA.y}
        stroke="#D7263D"
        stroke-width="4"
        stroke-linecap="round"
      />
      <polygon points={rayA.head} fill="#D7263D" />
      <text
        x={(rayA.x1 + rayA.x2) / 2}
        y={rayA.y - 8}
        font-size="13"
        fill="#B91C1C"
        text-anchor="middle">tia OA</text
      >
    {/if}
    {#if rayB}
      <line
        x1={rayB.x1}
        y1={rayB.y}
        x2={rayB.x2}
        y2={rayB.y}
        stroke="#2E86AB"
        stroke-width="4"
        stroke-linecap="round"
      />
      <polygon points={rayB.head} fill="#2E86AB" />
      <text
        x={(rayB.x1 + rayB.x2) / 2}
        y={rayB.y + 20}
        font-size="13"
        fill="#1D4ED8"
        text-anchor="middle">tia OB</text
      >
    {/if}

    {#each pts as _, i (i)}
      <DragPoint
        drag={dragFor(i)}
        r={9}
        color={COLORS[i]}
        name={NAMES[i]}
        nameDx={-5}
        nameDy={i === 0 ? 46 : -28}
        label="Điểm {NAMES[i]} trên đường thẳng xy: kéo hoặc dùng phím mũi tên trái, phải"
      />
    {/each}
  </GeometryBoard>

  <div class="grid gap-3 sm:grid-cols-2" aria-live="polite">
    <p class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900">
      <span class="font-semibold">Điểm nằm giữa.</span>
      {middleText}
    </p>
    <p class="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-950">
      <span class="font-semibold">Hai tia OA, OB.</span>
      {rayText}
    </p>
  </div>

  <div class="rounded-lg border border-slate-200 p-3">
    <p class="mb-2 text-sm font-semibold text-slate-700">Thử thách ({solved}/{TASKS.length})</p>
    <ul class="space-y-1 text-sm">
      {#each TASKS as t (t.id)}
        <li class={done[t.id] ? 'text-emerald-700' : 'text-slate-700'}>
          <span aria-hidden="true">{done[t.id] ? '✓' : '○'}</span>
          {t.text}
          <span class="sr-only">{done[t.id] ? '(đã làm được)' : '(chưa làm)'}</span>
        </li>
      {/each}
    </ul>
  </div>

  <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
</div>
