<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import {
    capVolume,
    cylinderMeasures,
    num,
    piText,
    sphereMeasures,
  } from '../_shared/round-solids.js';

  /**
   * The experiment comparing a sphere with the cylinder around it (bán kính
   * đáy R, chiều cao 2R): the cylinder is full of water and the sphere is
   * lowered into it. The water that spills into a measuring cup of the same
   * base is the part of the sphere under water (a spherical cap); once the
   * sphere touches the bottom it fills two thirds of the cup, so
   * V_cầu = ⅔ · V_trụ = ⁴⁄₃πR³. Drawn as a side view.
   */

  const W = 360;
  const H = 280;
  const BASE_Y = 268;
  const WATER = '#0EA5E9';
  const DROP_SECONDS = 3;
  const GUESSES = [
    { id: '1/2', label: '1/2', value: 1 / 2 },
    { id: '2/3', label: '2/3', value: 2 / 3 },
    { id: '3/4', label: '3/4', value: 3 / 4 },
    { id: '1/3', label: '1/3', value: 1 / 3 },
  ];

  let R = $state(3);
  /** How far the sphere has gone down, in percent: 0 resting on the brim, 100 on the bottom. */
  let depth = $state(0);
  /** @type {string | null} */
  let guess = $state(null);
  let dropping = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;

  const U = $derived(250 / (4 * R));
  const width = $derived(2 * R * U);
  const tall = $derived(2 * R * U);
  const leftX = 36;
  const cupX = $derived(W - 36 - width);
  const s = $derived(depth / 100);
  /** Height of the sphere's centre above the bottom of the cylinder (cm). */
  const zc = $derived(3 * R - 2 * R * s);
  const sunk = $derived(2 * R * s);
  const spilled = $derived(capVolume(R, sunk));
  const cyl = $derived(cylinderMeasures(R, 2 * R));
  const ball = $derived(sphereMeasures(R));
  const share = $derived(spilled / cyl.volume);
  const cupLevel = $derived((spilled / (Math.PI * R * R)) * U);
  const done = $derived(depth >= 100);

  function drop() {
    if (dropping) return;
    if (reducedMotion()) {
      depth = 100;
      return;
    }
    let t = depth >= 100 ? 0 : depth;
    depth = t;
    dropping = true;
    stop = frameLoop((dt) => {
      t = Math.min(100, t + (100 * dt) / DROP_SECONDS);
      depth = Math.round(t);
      if (t < 100) return;
      dropping = false;
      stop?.();
      stop = null;
    });
  }

  function halt() {
    stop?.();
    stop = null;
    dropping = false;
  }

  function reset() {
    halt();
    depth = 0;
    guess = null;
  }

  $effect(() => () => stop?.());

  const feedback = $derived.by(() => {
    if (depth === 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Hình trụ có bán kính đáy R = ${num(R)} cm, chiều cao 2R = ${num(2 * R)} cm, đựng đầy nước. Quả cầu bán kính R vừa khít trong hình trụ. Đoán xem khi quả cầu chạm đáy, nước tràn ra chiếm bao nhiêu phần hình trụ, rồi hạ quả cầu xuống.`,
      };
    }
    if (!done) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Quả cầu chìm sâu ${num(sunk, 1)} cm. Nước tràn ra đúng bằng thể tích phần quả cầu nằm trong nước: ≈ ${num(spilled)} cm³, bằng ${num(share * 100, 0)}% thể tích hình trụ.`,
      };
    }
    const g = GUESSES.find((x) => x.id === guess);
    const start = !g
      ? ''
      : Math.abs(g.value - 2 / 3) < 1e-9
        ? 'Em đoán đúng! '
        : `Em đoán ${g.label}, thực tế là 2/3. `;
    return {
      tone: /** @type {const} */ ('ok'),
      text: `${start}Quả cầu chạm đáy: nước tràn ra chiếm 2/3 hình trụ, phần còn lại 1/3. Vậy $V_{\\text{cầu}} = \\frac{2}{3} V_{\\text{trụ}} = \\frac{2}{3} \\cdot \\pi R^2 \\cdot 2R = \\frac{4}{3}\\pi R^3$ = ${piText(ball.k.volume)} ≈ ${num(ball.volume)} cm³.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="rounded-xl border border-slate-200 bg-white">
    <svg
      viewBox="0 0 {W} {H}"
      class="block h-auto w-full select-none"
      role="img"
      aria-label="Hình trụ đầy nước và quả cầu bán kính {num(
        R,
      )} cm đã hạ {depth}%. Nước tràn ra cốc đo chiếm {num(share * 100, 0)}% thể tích hình trụ"
    >
      <!-- the cylinder full of water -->
      <rect x={leftX} y={BASE_Y - tall} {width} height={tall} fill={WATER} fill-opacity="0.35" />
      <circle
        cx={leftX + width / 2}
        cy={BASE_Y - zc * U}
        r={R * U}
        fill="#F8FAFC"
        fill-opacity="0.92"
        stroke="#334155"
        stroke-width="2"
      />
      <path
        d="M{leftX} {BASE_Y - tall}V{BASE_Y}H{leftX + width}V{BASE_Y - tall}"
        fill="none"
        stroke="#1E293B"
        stroke-width="2.5"
      />
      <text
        x={leftX + width / 2}
        y={BASE_Y - zc * U + 5}
        text-anchor="middle"
        font-size="13"
        font-weight="700"
        fill="#334155">Quả cầu</text
      >
      <!-- the measuring cup -->
      <rect
        x={cupX}
        y={BASE_Y - cupLevel}
        {width}
        height={cupLevel}
        fill={WATER}
        fill-opacity="0.45"
      />
      <path
        d="M{cupX} {BASE_Y - tall}V{BASE_Y}H{cupX + width}V{BASE_Y - tall}"
        fill="none"
        stroke="#1E293B"
        stroke-width="2.5"
      />
      {#each [1, 2] as k (k)}
        <line
          x1={cupX + width - 12}
          y1={BASE_Y - (tall * k) / 3}
          x2={cupX + width}
          y2={BASE_Y - (tall * k) / 3}
          stroke="#DC2626"
          stroke-width="2"
        />
        <text x={cupX + width + 4} y={BASE_Y - (tall * k) / 3 + 4} font-size="12" fill="#DC2626"
          >{k}/3</text
        >
      {/each}
      <text
        x={cupX + width / 2}
        y={BASE_Y - tall - 8}
        text-anchor="middle"
        font-size="13"
        font-weight="700"
        fill="#0F172A">Nước tràn ra</text
      >
    </svg>
  </div>

  <fieldset>
    <legend class="mb-1 text-sm font-semibold text-slate-700">
      Em đoán nước tràn ra chiếm bao nhiêu phần thể tích hình trụ?
    </legend>
    <div class="flex flex-wrap gap-1">
      {#each GUESSES as g (g.id)}
        <button
          type="button"
          class="min-h-11 min-w-11 rounded-lg border px-3 text-sm font-semibold {focusRing} {guess ===
          g.id
            ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
            : 'border-slate-300 bg-white text-slate-700'}"
          aria-pressed={guess === g.id}
          disabled={depth > 0}
          onclick={() => (guess = g.id)}>{g.label}</button
        >
      {/each}
    </div>
  </fieldset>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Hạ quả cầu"
      bind:value={depth}
      min={0}
      max={100}
      step={5}
      format={(v) => `${v}%`}
      oninput={halt}
    />
    <SliderField label="Bán kính R" bind:value={R} min={2} max={5} unit="cm" oninput={reset} />
  </div>
  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={drop} disabled={dropping || done}>
      Thả quả cầu
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  <dl class="grid grid-cols-2 gap-2 text-sm tabular-nums">
    <div class="rounded-lg bg-amber-50 p-2">
      <dt class="text-amber-800">V<sub>trụ</sub> = πR² · 2R</dt>
      <dd class="font-semibold">{piText(cyl.k.volume)} ≈ {num(cyl.volume)} cm³</dd>
    </div>
    <div class="rounded-lg bg-sky-50 p-2">
      <dt class="text-sky-800">Nước tràn ra</dt>
      <dd class="font-semibold">≈ {num(spilled)} cm³</dd>
    </div>
  </dl>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
