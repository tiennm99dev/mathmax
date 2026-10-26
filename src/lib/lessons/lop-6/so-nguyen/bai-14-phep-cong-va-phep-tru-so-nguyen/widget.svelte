<script>
  import { untrack } from 'svelte';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import { intText, operand } from '#lib/core/number-format.js';
  import { addend, chipBoard, chipRows, sumSteps } from './engine.js';

  const OPS = [
    { value: '+', label: 'Phép cộng a + b' },
    { value: '-', label: 'Phép trừ a − b' },
  ];

  let a = $state(-5);
  let b = $state(3);
  /** @type {'+' | '-'} */
  let op = $state('+');
  let cancelled = $state(0);

  const c = $derived(addend(b, op));
  const board = $derived(chipBoard(a, c));
  const rows = $derived(chipRows(a, c, cancelled));
  // The line is −10 to 10 unless a number of the sum lies outside it.
  const span = $derived(Math.max(Math.abs(a), Math.abs(a + c)) > 10 ? 18 : 10);
  const finished = $derived(cancelled >= board.pairs);
  const expression = $derived(`${intText(a)} ${op === '+' ? '+' : '−'} ${operand(b)}`);
  const hops = $derived(
    [
      { from: 0, to: a, label: intText(a), color: '#7c3aed' },
      { from: a, to: a + c, label: c > 0 ? `+${c}` : intText(c), color: '#F46036' },
    ].filter((h) => h.from !== h.to),
  );
  const status = $derived(
    finished && board.result === 0
      ? `Không còn hạt nào: ${expression} = 0.`
      : finished
        ? `Còn lại ${Math.abs(board.result)} hạt ${board.result >= 0 ? 'dương' : 'âm'}: ${expression} = ${intText(board.result)}.`
        : `Đã triệt tiêu ${cancelled}/${board.pairs} cặp.`,
  );

  // New numbers or a new operation put every chip back on the board.
  $effect(() => {
    void a;
    void b;
    void op;
    untrack(() => (cancelled = 0));
  });

  function cancelOne() {
    if (cancelled < board.pairs) cancelled++;
  }

  function cancelAll() {
    cancelled = board.pairs;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Phép tính"
    options={OPS}
    value={op}
    onchange={(v) => (op = v === '-' ? '-' : '+')}
  />
  <div class="grid gap-4 sm:grid-cols-2">
    <SliderField label="Số a" bind:value={a} min={-9} max={9} format={intText} />
    <SliderField label="Số b" bind:value={b} min={-9} max={9} format={intText} />
  </div>

  <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
    <p class="text-center text-2xl font-bold tabular-nums text-slate-900">
      {expression}{#if op === '-'}
        <span class="text-slate-500">&nbsp;= {intText(a)} + {operand(c)}</span>
      {/if}
    </p>
    {#if op === '-'}
      <p class="mt-1 text-center text-sm text-slate-600">
        Trừ đi {operand(b)} là cộng với số đối của nó, {operand(c)}: các hạt của b được lật dấu.
      </p>
    {/if}

    {#each [{ name: 'a', chips: rows.first, value: a }, { name: op === '+' ? 'b' : 'số đối của b', chips: rows.second, value: c }] as row (row.name)}
      <div class="mt-3">
        <p class="text-sm font-semibold text-slate-700">
          Hạt của {row.name} ({intText(row.value)}):
        </p>
        <ul class="mt-1 flex min-h-10 flex-wrap gap-1.5" aria-label="Hạt của {row.name}">
          {#each row.chips as chip, i (i)}
            <li
              class="flex h-9 w-9 items-center justify-center rounded-full border-2 text-xl font-bold transition-opacity motion-reduce:transition-none {chip.positive
                ? 'border-red-600 bg-red-100 text-red-700'
                : 'border-blue-600 bg-blue-100 text-blue-700'} {chip.gone ? 'opacity-20' : ''}"
              aria-label="{chip.positive ? 'hạt dương' : 'hạt âm'}{chip.gone
                ? ', đã triệt tiêu'
                : ''}"
            >
              {chip.positive ? '+' : '−'}
            </li>
          {:else}
            <li class="text-sm text-slate-500">không có hạt nào (số 0)</li>
          {/each}
        </ul>
      </div>
    {/each}

    <div class="mt-4 flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={cancelOne} disabled={finished}>
        Triệt tiêu một cặp
      </button>
      <button type="button" class={button.secondary} onclick={cancelAll} disabled={finished}>
        Triệt tiêu hết
      </button>
      <button type="button" class={button.quiet} onclick={() => (cancelled = 0)}>Đặt lại</button>
    </div>
    <p class="mt-2 text-slate-700" aria-live="polite">{status}</p>
  </div>

  <div>
    <p class="mb-1 text-sm font-semibold text-slate-700">
      Trên trục số: từ 0 đi đến a, rồi đi tiếp {c >= 0 ? 'sang phải' : 'sang trái'}
      {Math.abs(c)} đơn vị.
    </p>
    <NumberLine
      min={-span}
      max={span}
      step={1}
      labelEvery={span > 10 ? 3 : 2}
      interactive={false}
      {hops}
      marks={[{ value: a + c, color: '#0f766e' }]}
      format={intText}
      label="Trục số biểu diễn phép tính {expression}"
    />
  </div>

  {#if finished}
    <div class="space-y-1 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-slate-800">
      <p class="font-semibold text-emerald-800">Theo quy tắc trong sách:</p>
      {#each sumSteps(a, c) as step (step)}
        <p>{step}</p>
      {/each}
    </div>
  {:else}
    <p class="text-sm text-slate-600">
      Mỗi cặp gồm một hạt dương và một hạt âm có tổng bằng 0. Triệt tiêu hết các cặp để đọc kết quả.
    </p>
  {/if}
</div>
