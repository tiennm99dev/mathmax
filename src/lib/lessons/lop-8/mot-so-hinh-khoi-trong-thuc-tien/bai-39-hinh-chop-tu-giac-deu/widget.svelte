<script>
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import {
    clampPitch,
    drawOrder,
    invertedPyramid,
    num,
    pathOf,
    pyramidLevel,
    squareBox,
    turnByKey,
    viewPoint,
    wrapYaw,
  } from '../_shared/pyramid-geometry.js';

  /**
   * The "rót nước" experiment: a pyramid container (apex down) and a box with
   * the same square base and the same height. Each pour empties the full
   * pyramid into the box, whose water rises by a third of its height, so
   * three pours fill it: V_chóp = ⅓ · V_hộp.
   */

  const W = 360;
  const H = 270;
  const UNIT = 14;
  const POUR_SECONDS = 1.6;
  const WATER = '#0EA5E9';

  let a = $state(6);
  let h = $state(9);
  let view = $state({ yaw: -25, pitch: 22 });
  /** Pours finished, 0 to 3. */
  let pours = $state(0);
  /** Progress of the pour under way, 0 to 1. */
  let flow = $state(0);
  let pouring = $state(false);
  /** @type {number | null} */
  let guess = $state(null);
  /** @type {(() => void) | null} */
  let stop = null;

  const full = $derived(pours >= 3 && !pouring);
  // The pyramid is refilled before each pour; when the box is full it stays empty.
  const pyramidFill = $derived(pouring ? 1 - flow : full ? 0 : 1);
  const boxFill = $derived((pours + (pouring ? flow : 0)) / 3);
  const pyramidWater = $derived(pyramidLevel(h, pyramidFill));
  const boxWater = $derived(h * boxFill);
  const vBox = $derived(a * a * h);
  const vPyramid = $derived(vBox / 3);

  /** @param {number} cx @param {number} cz */
  function placer(cx, cz) {
    const c = viewPoint({ x: 0, y: 0, z: cz }, view);
    /** @param {{ x: number, y: number }} p */
    return (p) => ({ x: cx + UNIT * (p.x - c.x), y: H / 2 + 8 + UNIT * (p.y - c.y) });
  }
  const leftAt = $derived(placer(W / 4, h / 2));
  const rightAt = $derived(placer((3 * W) / 4, h / 2));

  const pyramidShell = $derived(drawOrder(invertedPyramid(a, h, h), view, leftAt));
  const boxShell = $derived(drawOrder(squareBox(a, h), view, rightAt));
  const pyramidWaterFaces = $derived(
    pyramidWater > 0.01 ? drawOrder(invertedPyramid(a, h, pyramidWater), view, leftAt) : [],
  );
  const boxWaterFaces = $derived(
    boxWater > 0.01 ? drawOrder(squareBox(a, boxWater), view, rightAt) : [],
  );

  /** Marks at a third and two thirds of the box height, on its front edge. */
  const marks = $derived.by(() => {
    const p = { x: -a / 2, y: -a / 2 };
    return [1, 2].map((k) => {
      const s = rightAt(viewPoint({ ...p, z: (h * k) / 3 }, view));
      return { k, x: s.x, y: s.y };
    });
  });

  function pour() {
    if (pouring || pours >= 3) return;
    if (reducedMotion()) {
      pours += 1;
      return;
    }
    pouring = true;
    flow = 0;
    stop = frameLoop((dt) => {
      flow = Math.min(1, flow + dt / POUR_SECONDS);
      if (flow < 1) return;
      pouring = false;
      flow = 0;
      pours = Math.min(3, pours + 1);
      stop?.();
      stop = null;
    });
  }

  function reset() {
    stop?.();
    stop = null;
    pouring = false;
    flow = 0;
    pours = 0;
  }

  $effect(() => () => stop?.());

  const feedback = $derived.by(() => {
    if (pouring) return { tone: /** @type {const} */ ('info'), text: `Đang rót lần ${pours + 1}…` };
    if (full) {
      const right = guess === 3;
      return {
        tone: /** @type {const} */ ('ok'),
        text:
          (guess === null
            ? ''
            : right
              ? 'Em đoán đúng! '
              : `Em đoán ${guess} lần, thực tế là 3. `) +
          `Ba lần rót đầy hình chóp thì đầy hình hộp: V_chóp = ⅓ · V_hộp = ⅓ · ${num(a)}² · ${num(h)} = ${num(vPyramid)} cm³.`,
      };
    }
    if (pours === 0)
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Hình chóp đang đầy nước. Đoán xem cần rót mấy lần thì đầy hình hộp, rồi nhấn "Rót".',
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: `Sau ${pours} lần rót, nước trong hình hộp cao ${num((h * pours) / 3)} cm, bằng ${pours}/3 chiều cao hình hộp (${num(h)} cm).`,
    };
  });

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
    view = { yaw: wrapYaw(view.yaw - dx * 0.6), pitch: clampPitch(view.pitch + dy * 0.5) };
  }
  function up() {
    last = null;
  }
  /** @param {KeyboardEvent} e */
  function key(e) {
    const next = turnByKey(view, e.key, e.shiftKey);
    if (!next) return;
    e.preventDefault();
    view = next;
  }
</script>

{#snippet solid(
  /** @type {ReturnType<typeof drawOrder>} */ shell,
  /** @type {ReturnType<typeof drawOrder>} */ water,
)}
  {#each shell.filter((f) => !f.front) as f (f.face.id)}
    <path
      d={pathOf(f.screen)}
      fill="#E2E8F0"
      fill-opacity="0.6"
      stroke="#64748B"
      stroke-width="1.5"
      stroke-dasharray="5 4"
      stroke-linejoin="round"
    />
  {/each}
  {#each water as f (f.face.id)}
    <path
      d={pathOf(f.screen)}
      fill={WATER}
      fill-opacity={f.face.kind === 'top' ? 0.75 : 0.45}
      stroke={WATER}
      stroke-width="1"
      stroke-linejoin="round"
    />
  {/each}
  {#each shell.filter((f) => f.front) as f (f.face.id)}
    <path
      d={pathOf(f.screen)}
      fill="#6366F1"
      fill-opacity="0.06"
      stroke="#1E293B"
      stroke-width="2"
      stroke-linejoin="round"
    />
  {/each}
{/snippet}

<div class="space-y-4">
  <div
    role="slider"
    tabindex="0"
    aria-label="Hình chóp tứ giác đều đặt ngược và hình hộp chữ nhật cùng đáy, cùng chiều cao. Kéo hoặc dùng phím mũi tên để xoay"
    aria-valuemin={-180}
    aria-valuemax={180}
    aria-valuenow={Math.round(view.yaw)}
    aria-valuetext="Hình hộp đầy {pours}/3, xoay {Math.round(view.yaw)} độ"
    class="cursor-grab touch-none rounded-xl border border-slate-200 bg-white active:cursor-grabbing {focusRing}"
    onpointerdown={down}
    onpointermove={move}
    onpointerup={up}
    onpointercancel={up}
    onkeydown={key}
  >
    <svg viewBox="0 0 {W} {H}" class="block h-auto w-full select-none" aria-hidden="true">
      {@render solid(pyramidShell, pyramidWaterFaces)}
      {@render solid(boxShell, boxWaterFaces)}
      {#each marks as m (m.k)}
        <line x1={m.x - 8} y1={m.y} x2={m.x} y2={m.y} stroke="#DC2626" stroke-width="2" />
        <text x={m.x - 11} y={m.y + 4} text-anchor="end" font-size="12" fill="#DC2626">{m.k}/3</text
        >
      {/each}
      <text x={W / 4} y={20} text-anchor="middle" font-size="14" font-weight="700" fill="#0F172A"
        >Hình chóp</text
      >
      <text
        x={(3 * W) / 4}
        y={20}
        text-anchor="middle"
        font-size="14"
        font-weight="700"
        fill="#0F172A">Hình hộp</text
      >
    </svg>
  </div>

  <fieldset>
    <legend class="mb-1 text-sm font-semibold text-slate-700">
      Em đoán cần rót đầy hình chóp mấy lần để đầy hình hộp?
    </legend>
    <div class="flex flex-wrap gap-1">
      {#each [2, 3, 4, 6] as g (g)}
        <button
          type="button"
          class="min-h-11 min-w-11 rounded-lg border px-3 text-sm font-semibold {focusRing} {guess ===
          g
            ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
            : 'border-slate-300 bg-white text-slate-700'}"
          aria-pressed={guess === g}
          disabled={pours > 0 || pouring}
          onclick={() => (guess = g)}>{g} lần</button
        >
      {/each}
    </div>
  </fieldset>

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={pour} disabled={pouring || pours >= 3}>
      {pours === 0 ? 'Rót' : pours >= 3 ? 'Hình hộp đã đầy' : `Đổ đầy lại và rót lần ${pours + 1}`}
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Cạnh đáy a" bind:value={a} min={3} max={8} unit="cm" oninput={reset} />
    <SliderField label="Chiều cao h" bind:value={h} min={4} max={10} unit="cm" oninput={reset} />
  </div>

  <dl class="grid grid-cols-2 gap-2 text-sm tabular-nums sm:grid-cols-3">
    <div class="rounded-lg bg-sky-50 p-2">
      <dt class="text-sky-800">Đã rót</dt>
      <dd class="font-semibold">{pours} lần</dd>
    </div>
    <div class="rounded-lg bg-amber-50 p-2">
      <dt class="text-amber-800">V<sub>hộp</sub> = a² · h</dt>
      <dd class="font-semibold">{num(vBox)} cm³</dd>
    </div>
    <div class="rounded-lg bg-indigo-50 p-2">
      <dt class="text-indigo-800">V<sub>chóp</sub> = ⅓ · a² · h</dt>
      <dd class="font-semibold">{num(vPyramid)} cm³</dd>
    </div>
  </dl>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
