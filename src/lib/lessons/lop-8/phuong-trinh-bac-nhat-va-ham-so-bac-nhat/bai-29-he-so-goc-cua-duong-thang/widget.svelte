<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber, texNumber } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { clipToBox } from '#lib/algebra-engine/system.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { arcPath, degText } from '#lib/core/visuals/angle-math.js';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { CHALLENGES, angleWithOx, crossing, relation, xIntercept } from './engine.js';

  const plane = planeScale();
  const { mx, my } = plane;

  const D_COLOR = '#4F46E5';
  const E_COLOR = '#F46036';

  let a = $state(1);
  let b = $state(1);
  let a2 = $state(-0.5);
  let b2 = $state(3);
  let challenge = $state(0);

  const d = $derived({ a, b });
  const e = $derived({ a: a2, b: b2 });
  const rel = $derived(relation(d, e));
  const cross = $derived(crossing(d, e));

  /** @param {number} v */
  const fmt = (v) => formatNumber(v, 2);

  /** A number for TeX: decimal comma braced, ASCII minus. @param {number} v */
  const num = (v) => texNumber(fmt(v)).replace('−', '-');

  /** y = ax + b as TeX, with name. @param {string} name @param {number} k @param {number} c */
  function lineTex(name, k, c) {
    const kx = k === 0 ? '' : k === 1 ? 'x' : k === -1 ? '-x' : `${num(k)}x`;
    if (!kx) return `${name}\\colon y = ${num(c)}`;
    const tail = c === 0 ? '' : c > 0 ? ` + ${num(c)}` : ` - ${num(-c)}`;
    return `${name}\\colon y = ${kx}${tail}`;
  }

  /** @param {{ a: number, b: number }} l */
  const segment = (l) =>
    clipToBox({ a: l.a, b: -1, c: -l.b }, plane.xMin, plane.xMax, plane.yMin, plane.yMax);

  const segD = $derived(segment(d));
  const segE = $derived(segment(e));

  /**
   * The arc marking the angle α at A, when A is inside the window.
   * @param {{ a: number, b: number }} l
   */
  function angleMark(l) {
    const alpha = angleWithOx(l.a);
    const xa = xIntercept(l);
    if (alpha === null || xa === null || xa < plane.xMin || xa > plane.xMax) return null;
    const o = { x: mx(xa), y: my(0) };
    return { path: arcPath(o, 0, alpha, 22), alpha, o };
  }
  const markD = $derived(angleMark(d));
  const markE = $derived(angleMark(e));

  const relText = $derived(
    rel === 'trung'
      ? "a = a' và b = b': hai đường thẳng trùng nhau."
      : rel === 'song-song'
        ? `a = a' = ${fmt(a)} nhưng b ≠ b': hai đường thẳng song song.`
        : `a ≠ a' (${fmt(a)} ≠ ${fmt(a2)}): hai đường thẳng cắt nhau${
            cross ? ` tại điểm (${fmt(cross.x)}; ${fmt(cross.y)})` : ''
          }.`,
  );

  /** @param {number} k @param {string} name */
  function slopeNote(k, name) {
    if (k === 0) return `Hệ số a của ${name} bằng 0: y là hàm hằng, không phải hàm số bậc nhất.`;
    const alpha = /** @type {number} */ (angleWithOx(k));
    return `${name} có hệ số góc ${fmt(k)}: góc α tạo với Ox là góc ${k > 0 ? 'nhọn' : 'tù'} (khoảng ${degText(Math.round(alpha * 10) / 10)}).`;
  }

  const current = $derived(CHALLENGES[challenge]);
  const met = $derived(current.test(d, e));
</script>

<div class="space-y-4">
  <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
    <div class="space-y-2 rounded-xl border border-indigo-200 p-3">
      <p class="font-semibold" style="color: {D_COLOR}">Đường thẳng d</p>
      <SliderField label="Hệ số góc a" bind:value={a} min={-4} max={4} step={0.5} format={fmt} />
      <SliderField label="Hệ số b" bind:value={b} min={-6} max={6} step={1} format={fmt} />
    </div>
    <div class="space-y-2 rounded-xl border border-orange-200 p-3">
      <p class="font-semibold" style="color: {E_COLOR}">Đường thẳng d'</p>
      <SliderField label="Hệ số góc a'" bind:value={a2} min={-4} max={4} step={0.5} format={fmt} />
      <SliderField label="Hệ số b'" bind:value={b2} min={-6} max={6} step={1} format={fmt} />
    </div>
  </div>

  <div class="flex flex-wrap justify-center gap-x-6 gap-y-1">
    <Tex math={lineTex('d', a, b)} />
    <Tex math={lineTex("d'", a2, b2)} />
  </div>

  <CoordinatePlane
    {plane}
    interactive={false}
    label="Hai đường thẳng d và d' trên mặt phẳng toạ độ"
  >
    {#each [{ seg: segD, mark: markD, color: D_COLOR, dash: '' }, { seg: segE, mark: markE, color: E_COLOR, dash: rel === 'trung' ? '8 6' : '' }] as l, i (i)}
      {#if l.mark}
        <path d={l.mark.path} fill="none" stroke={l.color} stroke-width="2" />
      {/if}
      {#if l.seg}
        <line
          x1={mx(l.seg[0].x)}
          y1={my(l.seg[0].y)}
          x2={mx(l.seg[1].x)}
          y2={my(l.seg[1].y)}
          stroke={l.color}
          stroke-width="2.5"
          stroke-dasharray={l.dash}
          stroke-linecap="round"
        />
      {/if}
    {/each}
    {#if cross && Math.abs(cross.x) <= 10 && Math.abs(cross.y) <= 10}
      <circle
        cx={mx(cross.x)}
        cy={my(cross.y)}
        r="5"
        fill="#059669"
        stroke="#fff"
        stroke-width="1.5"
      />
    {/if}
  </CoordinatePlane>

  <FeedbackNote tone={rel === 'cat' ? 'info' : 'ok'} text={relText} />
  <ul class="space-y-1 text-sm text-slate-700">
    <li>{slopeNote(a, 'd')}</li>
    <li>{slopeNote(a2, "d'")}</li>
  </ul>

  <div class="space-y-2 rounded-xl bg-slate-50 p-3">
    <p class="text-sm font-semibold text-slate-700">
      Thử thách {challenge + 1}/{CHALLENGES.length}: {current.text}
    </p>
    <FeedbackNote
      tone={met ? 'ok' : 'info'}
      text={met
        ? 'Đạt yêu cầu! Bấm "Thử thách tiếp".'
        : 'Kéo các thanh trượt cho đến khi đạt yêu cầu.'}
    />
    <button
      type="button"
      class={button.secondary}
      onclick={() => (challenge = (challenge + 1) % CHALLENGES.length)}
    >
      Thử thách tiếp
    </button>
  </div>
</div>
