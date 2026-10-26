<script>
  import Stepper from '#lib/core/stepper.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { COLOURS, EVENTS, MAX_PER_COLOUR, balls, ratio, ratioTex } from './engine.js';

  /** @type {Record<import('./engine.js').Colour, number>} */
  let counts = $state({ do: 7, xanh: 4, vang: 9 });
  let eventId = $state(EVENTS[0].id);
  let size = $state('deu');
  /** @type {number | null} */
  let drawn = $state(null);
  let announce = $state('');
  const selectId = $props.id();

  const event = $derived(EVENTS.find((e) => e.id === eventId) ?? EVENTS[0]);
  const box = $derived(balls(counts));
  const r = $derived(ratio(counts, event.colours));
  const equal = $derived(size === 'deu');
  const COLS = 10;
  const rows = $derived(Math.max(1, Math.ceil(box.length / COLS)));

  /** @param {import('./engine.js').Colour} c */
  const nameOf = (c) => COLOURS.find((x) => x.id === c)?.name ?? '';

  function changed() {
    drawn = null;
  }

  function draw() {
    if (box.length === 0) return;
    // A big red ball is easier to grab: weight it three times.
    const weights = box.map((c) => (!equal && c === 'do' ? 3 : 1));
    const total = weights.reduce((s, w) => s + w, 0);
    let t = Math.random() * total;
    let i = 0;
    while (i < box.length - 1 && t >= weights[i]) {
      t -= weights[i];
      i++;
    }
    drawn = i;
    const happened = event.colours.includes(box[i]);
    announce = `Lấy được viên bi màu ${nameOf(box[i])}: biến cố E ${happened ? 'xảy ra' : 'không xảy ra'}.`;
  }

  const feedback = $derived.by(() => {
    if (!r)
      return { tone: /** @type {const} */ ('warn'), text: 'Hộp đang trống: hãy cho bi vào hộp.' };
    if (!equal)
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Các viên bi đỏ to hơn nên dễ được lấy ra hơn: ${r.n} kết quả không đồng khả năng. Không được tính xác suất bằng tỉ số ${r.k}/${r.n}.`,
      };
    const kind =
      r.k === 0
        ? 'Không có kết quả thuận lợi nào: E là biến cố không thể.'
        : r.k === r.n
          ? 'Mọi kết quả đều thuận lợi: E là biến cố chắc chắn.'
          : `Xác suất của E là ${formatNumber(r.k / r.n, 2)} (làm tròn).`;
    return {
      tone: /** @type {const} */ ('ok'),
      text: `Các viên bi cùng kích thước nên ${r.n} kết quả có thể là đồng khả năng. Có ${r.k} kết quả thuận lợi cho E. ${kind}`,
    };
  });

  const W = 480;
  const BAR_LEFT = 70;
  const BAR_W = 330;
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-x-6 gap-y-2">
    {#each COLOURS as c (c.id)}
      <Stepper
        label="Bi {c.name}"
        bind:value={counts[c.id]}
        min={0}
        max={MAX_PER_COLOUR}
        onchange={changed}
      />
    {/each}
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <div>
      <label for={selectId} class="mb-1 block text-sm font-semibold text-slate-700">Biến cố E</label
      >
      <select id={selectId} class="{textInput} text-base" bind:value={eventId} onchange={changed}>
        {#each EVENTS as e (e.id)}
          <option value={e.id}>"{e.text}"</option>
        {/each}
      </select>
    </div>
    <SegmentedControl
      label="Các viên bi"
      options={[
        { value: 'deu', label: 'Cùng kích thước' },
        { value: 'lech', label: 'Bi đỏ to hơn' },
      ]}
      bind:value={size}
      onchange={changed}
    />
  </div>

  <svg
    viewBox="0 0 {COLS * 40 + 8} {rows * 40 + 8}"
    class="mx-auto block w-full max-w-md"
    role="img"
    aria-label="Hộp có {counts.do} bi đỏ, {counts.xanh} bi xanh, {counts.vang} bi vàng; các viên làm E xảy ra được viền đậm."
  >
    <rect
      x="1"
      y="1"
      width={COLS * 40 + 6}
      height={rows * 40 + 6}
      rx="10"
      fill="#f8fafc"
      stroke="#94a3b8"
      stroke-width="2"
    />
    {#each box as c, i (i)}
      {@const fav = event.colours.includes(c)}
      {@const big = !equal && c === 'do'}
      <circle
        cx={24 + (i % COLS) * 40}
        cy={24 + Math.floor(i / COLS) * 40}
        r={big ? 16 : 12}
        fill={COLOURS.find((x) => x.id === c)?.fill}
        opacity={fav ? 1 : 0.35}
        stroke={drawn === i ? '#0f172a' : fav ? '#065f46' : 'none'}
        stroke-width={drawn === i ? 5 : 3}
      />
    {/each}
  </svg>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.secondary} onclick={draw} disabled={box.length === 0}
      >Lấy ngẫu nhiên một viên</button
    >
    {#if r && equal}
      <span class="text-lg">
        <Tex math={ratioTex(r)} ariaLabel="P của E bằng {r.k} phần {r.n}" />
      </span>
    {/if}
  </div>

  {#if r && equal}
    <svg
      viewBox="0 0 {W} 120"
      class="block w-full max-w-xl"
      role="img"
      aria-label="Biểu đồ xác suất lấy được mỗi màu: {COLOURS.map(
        (c) => `${c.name} ${counts[c.id]}/${r.n}`,
      ).join(', ')}"
    >
      {#each COLOURS as c, i (c.id)}
        {@const p = counts[c.id] / r.n}
        <text x={BAR_LEFT - 8} y={26 + i * 36} text-anchor="end" font-size="16" fill="#334155"
          >Bi {c.name}</text
        >
        <rect x={BAR_LEFT} y={10 + i * 36} width={BAR_W} height="24" rx="4" fill="#e2e8f0" />
        <rect
          x={BAR_LEFT}
          y={10 + i * 36}
          width={BAR_W * p}
          height="24"
          rx="4"
          fill={c.fill}
          opacity={event.colours.includes(c.id) ? 1 : 0.4}
        />
        <text x={BAR_LEFT + BAR_W + 8} y={28 + i * 36} font-size="16" font-weight="700"
          >{counts[c.id]}/{r.n}</text
        >
      {/each}
    </svg>
  {/if}

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
  <p class="sr-only" aria-live="polite">{announce}</p>
</div>
