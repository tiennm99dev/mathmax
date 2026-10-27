<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { readNatural } from '#lib/core/number-format.js';
  import { button, textInput } from '#lib/core/ui.js';
  import {
    SQUARES,
    checkSide,
    productSentence,
    quotientSentence,
    ratioText,
    side,
  } from './engine.js';

  const S = 300;
  const PAD = 10;
  const BLOCK_A = '#e0e7ff';
  const BLOCK_B = '#c7d2fe';
  const PIECE = '#fcd34d';

  const inputId = $props.id();

  let mode = $state(/** @type {'tich' | 'thuong'} */ ('tich'));
  let a = $state(4);
  let b = $state(9);
  let typed = $state('');
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let verdict = $state(null);
  let solved = $state(false);

  const m = $derived(side(a));
  const n = $derived(side(b));
  // Product: the big square has m·n unit cells a side, in n × n blocks of m × m.
  const cells = $derived(mode === 'tich' ? m * n : m);
  const cell = $derived(S / cells);
  const cut = $derived(mode === 'tich' ? m * cell : S / n);

  const options = SQUARES.map((v) => ({ value: v, label: String(v) }));

  function reset() {
    typed = '';
    verdict = null;
    solved = false;
  }

  function check() {
    verdict = checkSide(readNatural(typed), a, b);
    if (verdict.tone === 'ok') solved = true;
  }

  const sentence = $derived(mode === 'tich' ? productSentence(a, b) : quotientSentence(a, b));
  const picLabel = $derived(
    mode === 'tich'
      ? `Hình vuông lớn chia lưới ${m * n} × ${m * n} ô đơn vị, gồm ${b} khối vuông, mỗi khối ${m} × ${m} ô.`
      : `Hình vuông cạnh ${m}, diện tích ${a}, chia thành ${b} mảnh vuông bằng nhau; một mảnh được tô vàng.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Quy tắc"
    bind:value={mode}
    onchange={reset}
    options={[
      { value: 'tich', label: 'Căn của một tích' },
      { value: 'thuong', label: 'Căn của một thương' },
    ]}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl label="Số a (số chính phương)" bind:value={a} {options} onchange={reset} />
    <SegmentedControl label="Số b (số chính phương)" bind:value={b} {options} onchange={reset} />
  </div>

  <svg
    viewBox="0 0 {S + 2 * PAD} {S + 2 * PAD + 22}"
    class="mx-auto block w-full max-w-sm select-none"
    role="img"
    aria-label={picLabel}
  >
    <g transform="translate({PAD} {PAD})">
      {#if mode === 'tich'}
        {#each Array.from({ length: n * n }, (_, i) => i) as i (i)}
          {@const r = Math.floor(i / n)}
          {@const c = i % n}
          <rect
            x={c * cut}
            y={r * cut}
            width={cut}
            height={cut}
            fill={(r + c) % 2 === 0 ? BLOCK_A : BLOCK_B}
          />
        {/each}
      {:else}
        <rect x="0" y="0" width={S} height={S} fill={BLOCK_A} />
        <rect x="0" y="0" width={cut} height={cut} fill={PIECE} />
      {/if}
      {#each Array.from({ length: cells + 1 }, (_, i) => i) as i (i)}
        <line x1={i * cell} y1="0" x2={i * cell} y2={S} stroke="#94a3b8" stroke-width="0.6" />
        <line x1="0" y1={i * cell} x2={S} y2={i * cell} stroke="#94a3b8" stroke-width="0.6" />
      {/each}
      {#each Array.from({ length: n + 1 }, (_, i) => i) as i (i)}
        <line x1={i * cut} y1="0" x2={i * cut} y2={S} stroke="#312e81" stroke-width="2.2" />
        <line x1="0" y1={i * cut} x2={S} y2={i * cut} stroke="#312e81" stroke-width="2.2" />
      {/each}
      {#if mode === 'thuong'}
        <!-- Unit lengths of the side √a, dashed so they read apart from the cut lines. -->
        {#each Array.from({ length: m - 1 }, (_, i) => i + 1) as i (i)}
          <line
            x1={i * cell}
            y1="0"
            x2={i * cell}
            y2={S}
            stroke="#0f766e"
            stroke-width="1.5"
            stroke-dasharray="6 4"
          />
          <line
            x1="0"
            y1={i * cell}
            x2={S}
            y2={i * cell}
            stroke="#0f766e"
            stroke-width="1.5"
            stroke-dasharray="6 4"
          />
        {/each}
      {/if}
      <text
        x={S / 2}
        y={S + 18}
        text-anchor="middle"
        font-size="13"
        font-weight="700"
        fill="#312e81"
      >
        {#if mode === 'tich'}
          {solved ? `cạnh = ${n} · ${m} = ${m * n}` : `cạnh = ? (mỗi khối rộng ${m} ô)`}
        {:else}
          cạnh lớn = {m}; cạnh mảnh vàng = {m}/{n}{ratioText(m, n) === `${m}/${n}`
            ? ''
            : ` = ${ratioText(m, n)}`}
        {/if}
      </text>
    </g>
  </svg>

  {#if mode === 'tich'}
    <div class="space-y-2">
      <label class="block text-sm font-semibold text-slate-700" for={inputId}>
        Hình vuông lớn có diện tích {a} · {b} = {a * b}. Cạnh của nó dài bao nhiêu ô?
      </label>
      <div class="flex gap-2">
        <input
          id={inputId}
          class="{textInput} max-w-32"
          inputmode="numeric"
          autocomplete="off"
          bind:value={typed}
          onkeydown={(e) => {
            if (e.key === 'Enter') check();
          }}
        />
        <button type="button" class={button.primary} onclick={check}>Kiểm tra</button>
        <button type="button" class={button.quiet} onclick={() => (solved = true)}>Xem</button>
      </div>
      {#if verdict}
        <FeedbackNote tone={verdict.tone} text={verdict.text} />
      {/if}
      {#if solved}
        <p class="text-sm text-slate-700" aria-live="polite">{sentence}</p>
      {/if}
    </div>
  {:else}
    <FeedbackNote tone="ok" text={sentence} />
  {/if}
</div>
