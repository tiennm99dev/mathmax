<script>
  import { untrack } from 'svelte';
  import { UNITS, convert, ratio, splitMixed } from '#lib/units-engine/units.js';
  import { breakdown } from '#lib/units-engine/money.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { parseNumber } from '#lib/units-engine/format.js';
  import SegmentedControl from '../segmented-control.svelte';
  import { focusRing, textInput } from '../ui.js';

  /**
   * Converts between units of length, mass, capacity, time and Vietnamese
   * money. Under the fields, a ladder of units (largest on the left) shows
   * the steps between the two units with their ×10 or ×60 factors; tapping a
   * rung, or focusing it and pressing Enter, picks the target unit. A result
   * that is not whole also reads as a mixed amount (2,35 m = 2 m 35 cm), and
   * an amount of money is shown as the fewest đồng banknotes.
   *
   * - `quantity` (bindable): which table of units is shown.
   * - `quantities`: the tables the learner may switch between; a single one
   *   hides the switch.
   * - `value` (bindable): the amount in the `from` unit.
   * - `from`, `to` (bindable): unit ids such as 'm', 'cm', 'kg', 'h', 'dong'
   *   (see `UNITS` in `#lib/units-engine/units.js`).
   * - `showLadder`, `showNotes`: the unit ladder and the banknote breakdown.
   *
   * @type {{
   *   quantity?: import('#lib/units-engine/units.js').Quantity;
   *   quantities?: import('#lib/units-engine/units.js').Quantity[];
   *   value?: number;
   *   from?: string;
   *   to?: string;
   *   showLadder?: boolean;
   *   showNotes?: boolean;
   *   onchange?: (state: { value: number, from: string, to: string, result: number }) => void;
   * }}
   */
  let {
    quantity = $bindable('length'),
    quantities = ['length', 'mass', 'capacity', 'time', 'money'],
    value = $bindable(1),
    from = $bindable(),
    to = $bindable(),
    showLadder = true,
    showNotes = true,
    onchange,
  } = $props();

  /** @type {Record<import('#lib/units-engine/units.js').Quantity, [string, string]>} */
  const DEFAULTS = {
    length: ['m', 'cm'],
    mass: ['kg', 'g'],
    capacity: ['l', 'ml'],
    time: ['h', 'min'],
    money: ['nghin-dong', 'dong'],
  };
  const NAMES = {
    length: 'Độ dài',
    mass: 'Khối lượng',
    capacity: 'Dung tích',
    time: 'Thời gian',
    money: 'Tiền',
  };

  // Fill unset or mismatched units from the defaults of the current quantity.
  untrack(() => {
    const ids = UNITS[quantity].map((u) => u.id);
    if (!from || !ids.includes(from)) from = DEFAULTS[quantity][0];
    if (!to || !ids.includes(to)) to = DEFAULTS[quantity][1];
  });

  const units = $derived(UNITS[quantity]);
  /** Ladder order: largest unit first, as the tables in the books. */
  const ladder = $derived([...units].reverse());
  const fromId = $derived(from ?? DEFAULTS[quantity][0]);
  const toId = $derived(to ?? DEFAULTS[quantity][1]);
  const result = $derived(convert(value, fromId, toId));

  let text = $state(untrack(() => formatNumber(value)));
  const invalid = $derived(Number.isNaN(parseNumber(text)));

  function emit() {
    onchange?.({ value, from: fromId, to: toId, result: convert(value, fromId, toId) });
  }

  function onInput() {
    const v = parseNumber(text);
    if (Number.isNaN(v) || v < 0) return;
    value = v;
    emit();
  }

  /** @param {string | number} q */
  function switchQuantity(q) {
    const next = /** @type {import('#lib/units-engine/units.js').Quantity} */ (q);
    from = DEFAULTS[next][0];
    to = DEFAULTS[next][1];
    emit();
  }

  /** @param {string} id */
  function pickTo(id) {
    to = id;
    emit();
  }

  const unitName = (/** @type {string} */ id) => units.find((u) => u.id === id)?.symbol ?? id;

  // Ladder geometry.
  const W = 480;
  const H = 86;
  const boxW = $derived(W / ladder.length);
  const fi = $derived(ladder.findIndex((u) => u.id === fromId));
  const ti = $derived(ladder.findIndex((u) => u.id === toId));
  const lo = $derived(Math.min(fi, ti));
  const hi = $derived(Math.max(fi, ti));

  /** Factor between rung k and rung k + 1, when it is a whole number. */
  const stepFactor = (/** @type {number} */ k) => {
    const r = ratio(ladder[k].id, ladder[k + 1].id);
    return Number.isInteger(r) ? formatNumber(r) : '';
  };

  /** A non-whole result also reads as whole parts of the two units. */
  const mixed = $derived.by(() => {
    if (fromId === toId || Number.isInteger(result) || value < 0) return null;
    const parts = splitMixed(value, fromId, [fromId, toId]);
    if (parts[0].value === 0) return null;
    return parts.map((p) => `${formatNumber(p.value)} ${unitName(p.unit)}`).join(' ');
  });

  const dong = $derived(quantity === 'money' ? convert(value, fromId, 'dong') : 0);
  const notes = $derived(
    quantity === 'money' && Number.isInteger(dong) && dong > 0 && dong <= 10_000_000
      ? breakdown(dong)
      : null,
  );

  /** @type {Record<number, string>} */
  const NOTE_COLORS = {
    500_000: '#0ea5e9',
    200_000: '#ea580c',
    100_000: '#16a34a',
    50_000: '#db2777',
    20_000: '#2563eb',
    10_000: '#a16207',
    5000: '#4f46e5',
    2000: '#78716c',
    1000: '#65a30d',
    500: '#9333ea',
    200: '#b45309',
    100: '#57534e',
  };
  const resultId = $props.id();
  const select = `min-h-11 rounded-lg border border-slate-300 bg-white px-2 py-2 text-lg ${focusRing}`;
</script>

<div class="space-y-4">
  {#if quantities.length > 1}
    <SegmentedControl
      label="Đại lượng"
      options={quantities.map((q) => ({ value: q, label: NAMES[q] }))}
      bind:value={quantity}
      onchange={switchQuantity}
    />
  {/if}

  <div class="flex flex-wrap items-end gap-3">
    <label class="flex min-w-0 flex-col gap-1">
      <span class="text-sm font-semibold text-slate-700">Số đo</span>
      <span class="flex gap-2">
        <input
          type="text"
          inputmode="decimal"
          class="{textInput} w-36"
          aria-invalid={invalid}
          bind:value={text}
          oninput={onInput}
        />
        <select class={select} aria-label="Đơn vị ban đầu" bind:value={from} onchange={emit}>
          {#each units as u (u.id)}<option value={u.id}>{u.symbol}</option>{/each}
        </select>
      </span>
    </label>
    <span class="pb-2 text-2xl font-bold text-slate-500" aria-hidden="true">=</span>
    <div class="flex min-w-0 flex-col gap-1">
      <span class="text-sm font-semibold text-slate-700" id={resultId}>Kết quả</span>
      <span class="flex gap-2">
        <output
          class="flex min-h-11 min-w-36 items-center rounded-lg bg-indigo-50 px-3 text-lg font-bold tabular-nums text-indigo-800"
          aria-labelledby={resultId}
          aria-live="polite">{formatNumber(result)}</output
        >
        <select class={select} aria-label="Đơn vị cần đổi" bind:value={to} onchange={emit}>
          {#each units as u (u.id)}<option value={u.id}>{u.symbol}</option>{/each}
        </select>
      </span>
    </div>
  </div>

  {#if mixed}
    <p class="text-slate-700">
      {formatNumber(value)}
      {unitName(fromId)} = <strong>{mixed}</strong>
    </p>
  {/if}

  {#if showLadder}
    <svg
      viewBox="0 0 {W} {H}"
      class="block w-full select-none"
      style:aspect-ratio="{W} / {H}"
      role="group"
      aria-label="Bảng đơn vị {NAMES[
        quantity
      ].toLowerCase()}, từ lớn đến bé. Chọn một ô để đổi sang đơn vị đó."
    >
      {#each ladder as u, k (u.id)}
        {@const isFrom = k === fi}
        {@const isTo = k === ti}
        <g
          class="drag-handle"
          role="button"
          tabindex="0"
          aria-label="Đổi sang {u.name}"
          aria-pressed={isTo}
          style="cursor:pointer; outline:none"
          onclick={() => pickTo(u.id)}
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              pickTo(u.id);
            }
          }}
        >
          <rect
            class="drag-knob"
            x={k * boxW + 3}
            y="38"
            width={boxW - 6}
            height="42"
            rx="8"
            fill={isFrom
              ? '#4F46E5'
              : isTo
                ? '#1B998B'
                : k >= lo && k <= hi
                  ? '#eef2ff'
                  : '#f8fafc'}
            stroke={isFrom ? '#4F46E5' : isTo ? '#1B998B' : '#cbd5e1'}
            stroke-width="1.5"
          />
          <text
            x={k * boxW + boxW / 2}
            y="65"
            text-anchor="middle"
            font-size="15"
            font-weight="700"
            fill={isFrom || isTo ? '#fff' : '#334155'}>{u.symbol}</text
          >
        </g>
        {#if k < ladder.length - 1}
          {@const f = stepFactor(k)}
          {@const active = k >= lo && k < hi}
          {#if f}
            <text
              x={(k + 1) * boxW}
              y="24"
              text-anchor="middle"
              font-size="12"
              font-weight={active ? 700 : 400}
              fill={active ? '#4F46E5' : '#94a3b8'}>{ti > fi ? '×' : ':'} {f}</text
            >
          {/if}
          {#if active}
            <path
              d="M {(k + 0.62) * boxW} 30 Q {(k + 1) * boxW} 20 {(k + 1.38) * boxW} 30"
              fill="none"
              stroke="#4F46E5"
              stroke-width="1.5"
            />
          {/if}
        {/if}
      {/each}
    </svg>
  {/if}

  {#if showNotes && notes}
    <div>
      <p class="mb-2 text-sm font-semibold text-slate-700">
        Trả {formatNumber(dong)} đồng bằng ít tờ tiền nhất:
      </p>
      <ul class="flex flex-wrap gap-3">
        {#each notes.notes as n (n.value)}
          <li class="flex items-center gap-1">
            <svg
              viewBox="0 0 96 48"
              width="96"
              height="48"
              role="img"
              aria-label="{n.count} tờ {formatNumber(n.value)} đồng"
            >
              <rect
                x="1"
                y="1"
                width="94"
                height="46"
                rx="5"
                fill={NOTE_COLORS[n.value] ?? '#64748b'}
              />
              <rect
                x="6"
                y="6"
                width="84"
                height="36"
                rx="3"
                fill="none"
                stroke="#fff"
                stroke-opacity="0.6"
              />
              <text x="48" y="30" text-anchor="middle" font-size="15" font-weight="700" fill="#fff"
                >{formatNumber(n.value)}</text
              >
            </svg>
            <span class="font-bold tabular-nums text-slate-700">× {n.count}</span>
          </li>
        {/each}
      </ul>
      {#if notes.rest > 0}
        <p class="mt-1 text-sm text-slate-500">Còn {notes.rest} đồng lẻ, không có tờ tiền nào.</p>
      {/if}
    </div>
  {/if}
</div>
