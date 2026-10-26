<script>
  import { onDestroy } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, focusRing, textInput } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { readNumber } from '#lib/core/decimal.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import {
    FLAP,
    TRIANGLES,
    boxNet,
    fold,
    material,
    polygonArea,
    standNet,
    viewPoint,
  } from './engine.js';

  /** @param {number} v */
  const num = (v) => formatNumber(v, 2);

  let shape = $state('hop');
  // Gift box
  let cube = $state(true);
  let a = $state(6);
  let b = $state(6);
  let c = $state(6);
  // Calendar stand
  let triIndex = $state(0);
  let L = $state(15);
  let ends = $state(true);

  const tri = $derived(TRIANGLES[triIndex]);
  const net = $derived(
    shape === 'hop' ? (cube ? boxNet(a, a, a) : boxNet(a, b, c)) : standNet(tri, L, ends),
  );
  const need = $derived(material(net));

  // Folding: 0 is the flat net, 1 the finished solid.
  let t = $state(0);
  /** @type {(() => void) | null} */
  let stop = null;
  /** @param {number} target */
  function animateTo(target) {
    stop?.();
    if (reducedMotion()) {
      t = target;
      return;
    }
    stop = frameLoop((dt) => {
      const step = dt / 1.6;
      t = target > t ? Math.min(target, t + step) : Math.max(target, t - step);
      if (t === target) {
        stop?.();
        stop = null;
      }
    });
  }
  onDestroy(() => stop?.());

  // The view turns by drag or arrow keys.
  let view = $state({ yaw: -30, pitch: 52 });
  /** @type {{ x: number, y: number } | null} */
  let last = null;
  /** @param {number} v */
  const clampPitch = (v) => Math.max(5, Math.min(90, v));
  /** @param {number} v */
  const wrapYaw = (v) => ((((v + 180) % 360) + 360) % 360) - 180;
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
    view = { yaw: wrapYaw(view.yaw - dx * 0.6), pitch: clampPitch(view.pitch + dy * 0.5) };
  }
  function up() {
    last = null;
  }
  /** @param {KeyboardEvent} e */
  function key(e) {
    const step = e.shiftKey ? 30 : 10;
    /** @type {Record<string, [number, number]>} */
    const moves = {
      ArrowLeft: [step, 0],
      ArrowRight: [-step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    view = { yaw: wrapYaw(view.yaw + m[0]), pitch: clampPitch(view.pitch + m[1]) };
  }

  // Drawing: the scale slides from the size that fits the flat net to the
  // size that fits the folded solid, and never lets the shape overflow.
  const W = 360;
  const H = 300;
  const PAD = 18;
  /** @param {ReturnType<typeof fold>} pieces */
  function extent(pieces) {
    const v = pieces.flatMap((p) => p.pts.map((q) => viewPoint(q, view)));
    const xs = v.map((p) => p.x);
    const ys = v.map((p) => p.y);
    return {
      x0: Math.min(...xs),
      x1: Math.max(...xs),
      y0: Math.min(...ys),
      y1: Math.max(...ys),
    };
  }
  /** @param {{ x0: number, x1: number, y0: number, y1: number }} e */
  const fit = (e) =>
    Math.min((W - 2 * PAD) / (e.x1 - e.x0 || 1), (H - 2 * PAD) / (e.y1 - e.y0 || 1));
  const flatFit = $derived(fit(extent(fold(net, 0))));
  const solidFit = $derived(Math.min(fit(extent(fold(net, 1))), 2 * flatFit));
  const folded = $derived(fold(net, t));
  const box = $derived(extent(folded));
  const scale = $derived(Math.min(fit(box), flatFit + (solidFit - flatFit) * t));
  /** @param {{ x: number, y: number, z: number }} p */
  function toScreen(p) {
    const v = viewPoint(p, view);
    return {
      x: W / 2 + scale * (v.x - (box.x0 + box.x1) / 2),
      y: H / 2 + scale * (v.y - (box.y0 + box.y1) / 2),
      depth: v.depth,
    };
  }
  // Farthest first; once mostly folded, the glue flaps are inside the solid,
  // so they go under every face.
  const drawn = $derived(
    folded
      .map((f) => {
        const s = f.pts.map(toScreen);
        const inside = t > 0.5 && f.piece.kind === 'flap';
        return {
          ...f,
          s,
          depth: inside ? -1e9 : s.reduce((d, p) => d + p.depth, 0) / s.length,
        };
      })
      .sort((p, q) => p.depth - q.depth),
  );
  const flat = $derived(t < 0.02);
  /** @param {{ x: number, y: number }[]} pts */
  const path = (pts) =>
    pts.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';

  /**
   * Side lengths of a rectangular face, or the base and height of a triangle.
   * @param {import('./engine.js').Piece} piece
   */
  function sizeText(piece) {
    const p = piece.pts;
    if (p.length === 3) return `${num(tri.w)} × ${num(tri.m)} : 2`;
    const w = Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y);
    const h = Math.hypot(p[3].x - p[0].x, p[3].y - p[0].y);
    return `${num(w)} × ${num(h)}`;
  }

  // The learner works out the area of the faces, then sees the cardboard needed.
  let typed = $state('');
  /** @typedef {'none' | 'ok' | 'wrong' | 'invalid'} Check */
  let check = $state(/** @type {Check} */ ('none'));
  let misses = $state(0);
  const faces = $derived(net.filter((p) => p.kind === 'face'));
  const shown = $derived(check === 'ok' || misses >= 2);

  function reset() {
    typed = '';
    check = 'none';
    misses = 0;
  }
  /** @param {SubmitEvent} e */
  function submit(e) {
    e.preventDefault();
    const v = readNumber(typed);
    if (v === null) {
      check = 'invalid';
      return;
    }
    if (Math.abs(v - need.faces) < 0.005) check = 'ok';
    else {
      check = 'wrong';
      misses += 1;
    }
  }

  const solidName = $derived(
    shape === 'hop'
      ? cube
        ? `hình lập phương cạnh ${num(a)} cm`
        : `hình hộp chữ nhật ${num(a)} × ${num(b)} × ${num(c)} cm`
      : `hình lăng trụ đứng tam giác, đáy là tam giác cân cạnh ${num(tri.w)}, ${num(tri.s)}, ${num(tri.s)} cm, chiều cao ${num(L)} cm`,
  );
  const formula = $derived(
    shape === 'hop'
      ? cube
        ? `6 · ${num(a)}² = ${num(need.faces)} cm²`
        : `2 · (${num(a)} · ${num(b)} + ${num(b)} · ${num(c)} + ${num(c)} · ${num(a)}) = ${num(need.faces)} cm²`
      : ends
        ? `S_xq + 2 · S_đáy = (${num(tri.w)} + ${num(tri.s)} + ${num(tri.s)}) · ${num(L)} + 2 · ${num(tri.w)} · ${num(tri.m)} : 2 = ${num(need.faces)} cm²`
        : `S_xq = (${num(tri.w)} + ${num(tri.s)} + ${num(tri.s)}) · ${num(L)} = ${num(need.faces)} cm²`,
  );
  const feedback = $derived(
    check === 'ok'
      ? `Đúng! Diện tích các mặt: ${formula}.`
      : check === 'invalid'
        ? 'Hãy nhập một số, ví dụ 216 hoặc 216,5.'
        : check === 'wrong'
          ? misses >= 2
            ? `Chưa đúng. Cách tính: ${formula}.`
            : shape === 'hop'
              ? 'Chưa đúng. Cộng diện tích sáu mặt của hộp, chưa tính mép dán: ba cặp mặt đối diện bằng nhau.'
              : 'Chưa đúng. Cộng diện tích ba mặt hình chữ nhật (chu vi đáy nhân chiều dài)' +
                (ends ? ' và hai mặt tam giác (cạnh đáy nhân chiều cao rồi chia 2).' : '.')
          : 'Dựa vào các kích thước trên lưới, tính tổng diện tích các mặt (chưa tính mép dán).',
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Em làm"
    options={[
      { value: 'hop', label: 'Hộp quà' },
      { value: 'chan-de', label: 'Chân đế lịch' },
    ]}
    bind:value={shape}
    onchange={() => {
      reset();
      t = 0;
    }}
  />

  {#if shape === 'hop'}
    <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
      <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
        <input
          type="checkbox"
          class="h-5 w-5 accent-indigo-600 {focusRing}"
          bind:checked={cube}
          onchange={reset}
        />
        Hình lập phương
      </label>
      <Stepper
        label={cube ? 'Cạnh (cm)' : 'Dài a (cm)'}
        bind:value={a}
        min={3}
        max={12}
        onchange={reset}
      />
      {#if !cube}
        <Stepper label="Rộng b (cm)" bind:value={b} min={3} max={12} onchange={reset} />
        <Stepper label="Cao c (cm)" bind:value={c} min={3} max={12} onchange={reset} />
      {/if}
    </div>
  {:else}
    <SegmentedControl
      label="Tam giác đáy (cạnh đáy – hai cạnh bên, cm)"
      options={TRIANGLES.map((x, i) => ({ value: i, label: `${x.w} – ${x.s} – ${x.s}` }))}
      bind:value={triIndex}
      onchange={reset}
    />
    <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
      <Stepper label="Chiều dài chân đế (cm)" bind:value={L} min={8} max={25} onchange={reset} />
      <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
        <input
          type="checkbox"
          class="h-5 w-5 accent-indigo-600 {focusRing}"
          bind:checked={ends}
          onchange={reset}
        />
        Có hai mặt tam giác ở hai đầu
      </label>
    </div>
    <p class="text-sm text-slate-600">
      Tam giác đáy có chiều cao {num(tri.m)} cm ứng với cạnh đáy {num(tri.w)} cm.
    </p>
  {/if}

  <div
    role="slider"
    tabindex="0"
    aria-label="Lưới của {solidName}, đã gấp {Math.round(
      t * 100,
    )} phần trăm. Kéo hoặc dùng phím mũi tên để xoay hình"
    aria-valuemin={-180}
    aria-valuemax={180}
    aria-valuenow={Math.round(view.yaw)}
    aria-valuetext="Xoay {Math.round(view.yaw)} độ, nhìn từ trên xuống {Math.round(view.pitch)} độ"
    class="mx-auto max-w-md cursor-grab touch-none rounded-xl border border-slate-200 bg-white active:cursor-grabbing {focusRing}"
    onpointerdown={down}
    onpointermove={move}
    onpointerup={up}
    onpointercancel={up}
    onkeydown={key}
  >
    <svg viewBox="0 0 {W} {H}" class="block h-auto w-full select-none" aria-hidden="true">
      {#each drawn as d (d.piece.id)}
        <path
          d={path(d.s)}
          fill={d.piece.kind === 'flap' ? '#F59E0B' : '#6366F1'}
          fill-opacity={d.piece.kind === 'flap' ? 0.6 : 0.4}
          stroke="#1E293B"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        {#if flat && d.piece.hinge}
          {@const h0 = toScreen({ ...d.piece.hinge[0], z: 0 })}
          {@const h1 = toScreen({ ...d.piece.hinge[1], z: 0 })}
          <line
            x1={h0.x}
            y1={h0.y}
            x2={h1.x}
            y2={h1.y}
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-dasharray="5 4"
          />
        {/if}
      {/each}
      {#if flat}
        {#each drawn as d (d.piece.id)}
          {#if d.piece.kind === 'face'}
            {@const cx = d.s.reduce((s, p) => s + p.x, 0) / d.s.length}
            {@const cy = d.s.reduce((s, p) => s + p.y, 0) / d.s.length}
            <text
              x={cx}
              y={cy + 4}
              text-anchor="middle"
              font-size="11"
              font-weight="700"
              fill="#0F172A"
              paint-order="stroke"
              stroke="#FFFFFF"
              stroke-width="3">{sizeText(d.piece)}</text
            >
          {/if}
        {/each}
      {/if}
    </svg>
  </div>
  <p class="text-center text-xs text-slate-500">
    Màu tím: các mặt; màu cam: mép dán rộng {num(FLAP)} cm. Nét đứt trắng: đường gấp. Kéo hình (hoặc dùng
    phím mũi tên) để xoay.
  </p>

  <SliderField
    label="Gấp lưới"
    bind:value={t}
    min={0}
    max={1}
    step={0.01}
    format={(v) => `${Math.round(v * 100)}%`}
    oninput={() => {
      stop?.();
      stop = null;
    }}
  />
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => animateTo(1)}>Gấp lại</button>
    <button type="button" class={button.quiet} onclick={() => animateTo(0)}>Trải phẳng</button>
  </div>

  <form class="space-y-2 rounded-lg border border-indigo-200 bg-indigo-50 p-3" onsubmit={submit}>
    <label class="flex flex-col gap-1 text-sm font-semibold text-indigo-950">
      Tổng diện tích các mặt của {solidName} (cm²)
      <input
        class={textInput}
        inputmode="decimal"
        autocomplete="off"
        bind:value={typed}
        oninput={() => {
          if (check !== 'none' && check !== 'ok') check = 'none';
        }}
      />
    </label>
    <button type="submit" class={button.primary}>Kiểm tra</button>
    <FeedbackNote
      tone={check === 'ok' ? 'ok' : check === 'none' ? 'info' : 'warn'}
      text={feedback}
    />
  </form>

  {#if shown}
    <div class="overflow-x-auto">
      <table class="w-full min-w-72 border-collapse text-sm tabular-nums">
        <caption class="mb-1 text-left text-slate-600">Bìa cần dùng</caption>
        <thead>
          <tr class="bg-slate-100">
            <th scope="col" class="border border-slate-200 px-2 py-1 text-left">Phần</th>
            <th scope="col" class="border border-slate-200 px-2 py-1">Kích thước (cm)</th>
            <th scope="col" class="border border-slate-200 px-2 py-1">Diện tích (cm²)</th>
          </tr>
        </thead>
        <tbody>
          {#each faces as f (f.id)}
            <tr>
              <td class="border border-slate-200 px-2 py-1">{f.name}</td>
              <td class="border border-slate-200 px-2 py-1 text-center">{sizeText(f)}</td>
              <td class="border border-slate-200 px-2 py-1 text-center"
                >{num(polygonArea(f.pts))}</td
              >
            </tr>
          {/each}
          <tr class="font-semibold">
            <td class="border border-slate-200 px-2 py-1" colspan="2">Các mặt</td>
            <td class="border border-slate-200 px-2 py-1 text-center">{num(need.faces)}</td>
          </tr>
          <tr>
            <td class="border border-slate-200 px-2 py-1" colspan="2">Mép dán</td>
            <td class="border border-slate-200 px-2 py-1 text-center">{num(need.flaps)}</td>
          </tr>
          <tr class="font-semibold text-emerald-800">
            <td class="border border-slate-200 px-2 py-1" colspan="2">Tổng diện tích bìa</td>
            <td class="border border-slate-200 px-2 py-1 text-center">{num(need.total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="rounded-lg bg-slate-50 p-3 text-sm text-slate-800">
      Tờ bìa hình chữ nhật nhỏ nhất chứa cả lưới: {num(need.width)} cm × {num(need.height)} cm = {num(
        need.sheet,
      )} cm². Phần bìa thừa sau khi cắt: {num(need.sheet - need.total)} cm².
    </p>
  {/if}
</div>
