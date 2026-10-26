<script>
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { compare } from '#lib/fraction-engine/index.js';
  import { fracText, texBracket, texFrac, writtenTex, writtenText } from '../_shared/rational.js';
  import {
    MAX,
    MIN,
    PARTS,
    TARGETS,
    ascending,
    isOn,
    markerFraction,
    partsNeeded,
    tickLabel,
    zoomStart,
  } from './engine.js';

  const LETTERS = 'ABCDEFGHIK';

  let targetIndex = $state(0);
  let parts = $state(2);
  let zoom = $state('all');
  /** @type {number | null} */
  let value = $state(0);
  let showOpposite = $state(false);
  /** @type {Array<{ letter: string, index: number, w: import('../_shared/rational.js').Written }>} */
  let placed = $state([]);
  let feedback = $state('');
  /** @type {'none' | 'good' | 'bad'} */
  let tone = $state('none');

  const target = $derived(TARGETS[targetIndex % TARGETS.length]);
  const finished = $derived(placed.length >= TARGETS.length);
  // The zoomed window follows the marker when the view switches.
  let windowStart = $state(0);
  const zoomed = $derived(zoom === 'one');
  const lo = $derived(zoomed ? windowStart : MIN);
  const hi = $derived(zoomed ? windowStart + 1 : MAX);
  const v = $derived(value ?? 0);
  const at = $derived(markerFraction(v, parts));
  const opposite = $derived(-v);
  /**
   * TeX of the tick k/n: an integer when it is one, otherwise k/n as counted.
   * @param {number} k
   * @param {number} n
   */
  const markTex = (k, n) => (k % n === 0 ? `${k / n + 0}` : texFrac({ n: k, d: n }));
  const atTex = $derived(markTex(at.n, at.d));

  const marks = $derived([
    ...placed
      .filter((p) => {
        const x = p.w.f.n / p.w.f.d;
        return x >= lo - 1e-9 && x <= hi + 1e-9;
      })
      .map((p) => ({ value: p.w.f.n / p.w.f.d, label: p.letter, color: '#1B998B' })),
    ...(showOpposite && opposite >= lo - 1e-9 && opposite <= hi + 1e-9
      ? [{ value: opposite, label: '−M', color: '#7c3aed' }]
      : []),
  ]);

  const chain = $derived.by(() => {
    const sorted = ascending(placed.map((p) => p.w));
    let tex = '';
    sorted.forEach((w, i) => {
      if (i > 0) tex += compare(sorted[i - 1].f, w.f) === 0 ? ' = ' : ' < ';
      tex += writtenTex(w);
    });
    return tex;
  });

  /** @param {string | number} next */
  function setZoom(next) {
    if (next === 'one') windowStart = zoomStart(v);
  }

  /** @param {string | number} next */
  function setParts(next) {
    // Keep the marker on a tick of the new division.
    const n = Number(next);
    value = Math.round(v * n) / n;
    feedback = '';
    tone = 'none';
  }

  function check() {
    if (isOn(target, v, parts)) {
      const letter = LETTERS[placed.length];
      placed = [...placed, { letter, index: targetIndex, w: target }];
      tone = 'good';
      const same = writtenText(target) === fracText(at);
      feedback = `Đúng rồi! Điểm ${letter} biểu diễn số ${writtenText(target)}${same ? '' : ` = ${fracText(at)}`}.`;
      return;
    }
    tone = 'bad';
    const q = partsNeeded(target);
    if (parts % q !== 0) {
      feedback = `Chưa đúng. Với đoạn đơn vị chia thành ${parts} phần, không vạch nào rơi đúng vào ${writtenText(target)}. Hãy viết số đó dưới dạng phân số tối giản: mẫu số là ${q}, nên chia đoạn đơn vị thành ${q} phần.`;
    } else {
      const side = compare(at, target.f) < 0 ? 'bên trái' : 'bên phải';
      feedback = `Chưa đúng. Điểm đang ở ${tickLabel(v, parts)}, nằm ${side} số ${writtenText(target)}. Hãy đếm lại số phần từ điểm 0.`;
    }
  }

  function nextTarget() {
    targetIndex++;
    feedback = '';
    tone = 'none';
  }

  function reset() {
    targetIndex = 0;
    placed = [];
    value = 0;
    parts = 2;
    zoom = 'all';
    showOpposite = false;
    feedback = '';
    tone = 'none';
  }

  const placedCurrent = $derived(placed.some((p) => p.index === targetIndex));
</script>

<div class="space-y-4">
  {#if !finished}
    <div class="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-slate-900">
      <span class="font-semibold">Nhiệm vụ:</span> đặt điểm M biểu diễn số
      <Tex math={writtenTex(target)} ariaLabel={writtenText(target)} /> trên trục số.
    </div>
  {:else}
    <div class="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-900">
      Em đã đặt đủ {TARGETS.length} số. Quan sát thứ tự của chúng trên trục số bên dưới.
    </div>
  {/if}

  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Chia đoạn đơn vị thành"
      options={PARTS.map((n) => ({ value: n, label: `${n} phần` }))}
      bind:value={parts}
      onchange={setParts}
    />
    <SegmentedControl
      label="Khung nhìn"
      options={[
        { value: 'all', label: 'Cả trục số' },
        { value: 'one', label: 'Phóng to' },
      ]}
      bind:value={zoom}
      onchange={setZoom}
    />
  </div>

  <div class="rounded-lg border border-slate-200 bg-white p-2">
    {#key `${zoom}-${parts}-${lo}`}
      <NumberLine
        min={lo}
        max={hi}
        step={zoomed ? 1 / parts : 1}
        subdivisions={zoomed ? 1 : parts}
        labelEvery={zoomed && parts >= 8 ? 2 : 1}
        bind:value
        {marks}
        format={(x) => tickLabel(x, parts)}
        valueText={(x) => tickLabel(x, parts)}
        label={zoomed
          ? `Trục số phóng to từ ${tickLabel(lo, 1)} đến ${tickLabel(hi, 1)}`
          : 'Trục số từ −3 đến 3'}
        markerLabel="Điểm M, kéo hoặc dùng phím mũi tên"
        onchange={() => {
          feedback = '';
          tone = 'none';
        }}
      />
    {/key}
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-800">
      Điểm M đang ở vạch:
      <Tex math={atTex} ariaLabel={tickLabel(v, parts)} />
      {#if at.n % at.d !== 0}
        <span class="text-sm text-slate-600"
          >(đoạn đơn vị chia {parts} phần, M cách 0 là {Math.abs(at.n)} phần)</span
        >
      {/if}
    </div>
    <label class="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <input type="checkbox" class="size-5" bind:checked={showOpposite} />
      <span>
        Hiện số đối:
        <Tex
          math={`-${texBracket(atTex)} = ${markTex(-at.n, at.d)}`}
          ariaLabel={`số đối của ${tickLabel(v, parts)} là ${tickLabel(-v, parts)}`}
        />
      </span>
    </label>
  </div>

  <div class="flex flex-wrap gap-3">
    {#if !finished && !placedCurrent}
      <button type="button" class={button.primary} onclick={check}>Kiểm tra</button>
    {/if}
    {#if !finished && placedCurrent}
      <button type="button" class={button.primary} onclick={nextTarget}>Số tiếp theo</button>
    {/if}
    <button type="button" class={button.quiet} onclick={reset}>Làm lại từ đầu</button>
  </div>

  <p
    aria-live="polite"
    class="min-h-6 font-semibold {tone === 'good'
      ? 'text-emerald-700'
      : tone === 'bad'
        ? 'text-rose-700'
        : ''}"
  >
    {feedback}
  </p>

  {#if placed.length > 0}
    <div class="rounded-lg border border-slate-200 bg-white p-3 text-slate-800">
      <p class="mb-1 text-sm font-semibold text-slate-700">
        Các điểm đã đặt, từ trái sang phải (từ nhỏ đến lớn):
      </p>
      <Tex math={chain} />
      <ul class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
        {#each placed as p (p.letter)}
          <li>
            {p.letter}:
            <Tex math={writtenTex(p.w)} ariaLabel={writtenText(p.w)} />
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
