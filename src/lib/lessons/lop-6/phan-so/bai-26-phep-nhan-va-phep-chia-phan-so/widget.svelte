<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import Frac from '#lib/core/frac.svelte';
  import { fracText, mixedText } from '#lib/core/fractions.js';
  import { product, quotient, tiles } from './engine.js';

  const BLUE = '#4F46E5';
  const ORANGE = '#F46036';
  const PURPLE = '#7C3AED';

  let mode = $state('mul');

  // ── Multiplication: area model ──────────────────────────────────────────
  const S = 240;
  let a = $state(2);
  let b = $state(3);
  let c = $state(3);
  let d = $state(4);
  const prod = $derived(product(a, b, c, d));
  const prodMessage = $derived(
    `Phần tô chồng (màu tím) có ${a} · ${c} = ${a * c} ô trong ${b} · ${d} = ${b * d} ô của hình vuông đơn vị. Vậy ${fracText(a, b)} · ${fracText(c, d)} = ${fracText(a * c, b * d)}${
      prod.simple.d !== prod.raw.d ? ` = ${fracText(prod.simple.n, prod.simple.d)}` : ''
    }: lấy ${fracText(c, d)} của ${fracText(a, b)}.`,
  );

  /** @param {number} col @param {number} row */
  function tapCell(col, row) {
    a = col + 1;
    c = row + 1;
  }

  // ── Division: how many copies fit ───────────────────────────────────────
  let p = $state(3);
  let q = $state(4);
  let r = $state(1);
  let s = $state(8);
  const LEN = 180; // pixels for one unit
  const X0 = 14;
  const quot = $derived(quotient(p, q, r, s));
  const pieces = $derived(tiles(p, q, r, s));
  const divMessage = $derived.by(() => {
    const full = pieces.filter((t) => t.part === 1).length;
    const last = pieces.find((t) => t.part < 1);
    // The part of one more copy that still fits: quotient minus the full copies.
    const extra = fracText(quot.simple.n - full * quot.simple.d, quot.simple.d);
    const count = !last
      ? `vừa đúng ${full} đoạn ${fracText(r, s)}`
      : full === 0
        ? `${extra} đoạn ${fracText(r, s)} (chưa đủ một đoạn)`
        : `${full} đoạn ${fracText(r, s)} và thêm ${extra} đoạn nữa`;
    return `${fracText(p, q)} chứa ${count}. Vậy ${fracText(p, q)} : ${fracText(r, s)} = ${fracText(p, q)} · ${fracText(s, r)} = ${fracText(quot.raw.n, quot.raw.d)}${
      quot.simple.d !== quot.raw.d || quot.simple.n !== quot.raw.n
        ? ` = ${fracText(quot.simple.n, quot.simple.d)}`
        : ''
    }${quot.simple.d > 1 && quot.simple.n > quot.simple.d ? ` = ${mixedText(quot.simple.n, quot.simple.d)}` : ''}.`;
  });

  /** @param {number} v */
  function setQ(v) {
    if (p > 2 * v) p = 2 * v;
  }
  /** @param {number} v */
  function setS(v) {
    if (r > v) r = v;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Phép tính"
    options={[
      { value: 'mul', label: 'Nhân: mô hình diện tích' },
      { value: 'div', label: 'Chia: đếm số lần chứa' },
    ]}
    bind:value={mode}
  />

  {#if mode === 'mul'}
    <div class="grid gap-3 sm:grid-cols-2">
      <div
        class="space-y-2 rounded-xl border border-indigo-200 p-3"
        role="group"
        aria-label="Chiều ngang (cột)"
      >
        <p class="text-sm font-semibold text-indigo-700">Chiều ngang (cột)</p>
        <Stepper label="Tử" bind:value={a} min={0} max={b} />
        <Stepper
          label="Mẫu"
          bind:value={b}
          min={1}
          max={6}
          onchange={(v) => (a = Math.min(a, v))}
        />
      </div>
      <div
        class="space-y-2 rounded-xl border border-orange-200 p-3"
        role="group"
        aria-label="Chiều dọc (hàng)"
      >
        <p class="text-sm font-semibold text-orange-700">Chiều dọc (hàng)</p>
        <Stepper label="Tử" bind:value={c} min={0} max={d} />
        <Stepper
          label="Mẫu"
          bind:value={d}
          min={1}
          max={6}
          onchange={(v) => (c = Math.min(c, v))}
        />
      </div>
    </div>

    <svg
      viewBox="0 0 {S + 70} {S + 40}"
      class="mx-auto block w-full max-w-sm select-none"
      role="img"
      aria-label="Hình vuông đơn vị chia {b} cột, {d} hàng; tô {a} cột và {c} hàng, chồng nhau {a *
        c} ô"
    >
      {#each { length: b } as _, col (col)}
        {#each { length: d } as _r, row (row)}
          {@const inA = col < a}
          {@const inC = row < c}
          <!-- Tapping a cell is a pointer shortcut; the steppers are the keyboard route. -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <rect
            x={10 + (col * S) / b}
            y={10 + S - ((row + 1) * S) / d}
            width={S / b}
            height={S / d}
            fill={inA && inC ? PURPLE : inA ? BLUE : inC ? ORANGE : '#fff'}
            fill-opacity={inA && inC ? 0.85 : inA || inC ? 0.3 : 1}
            stroke="#334155"
            stroke-width="1"
            style:cursor="pointer"
            onpointerdown={() => tapCell(col, row)}
          />
        {/each}
      {/each}
      <rect x="10" y="10" width={S} height={S} fill="none" stroke="#0f172a" stroke-width="2" />
      <text x={10 + (a * S) / b / 2} y={S + 30} text-anchor="middle" font-size="15" fill={BLUE}
        >{fracText(a, b)}</text
      >
      <text x={S + 18} y={10 + S - (c * S) / d / 2 + 5} font-size="15" fill={ORANGE}
        >{fracText(c, d)}</text
      >
    </svg>

    <div
      class="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
    >
      <Frac n={a} d={b} size="lg" />
      <span class="text-2xl font-bold text-slate-500" aria-hidden="true">·</span>
      <span class="sr-only">nhân</span>
      <Frac n={c} {d} size="lg" />
      <span class="text-2xl font-bold text-slate-500" aria-hidden="true">=</span>
      <span class="sr-only">bằng</span>
      <Frac n={prod.raw.n} d={prod.raw.d} size="lg" />
      {#if prod.simple.d !== prod.raw.d}
        <span class="text-2xl font-bold text-slate-500" aria-hidden="true">=</span>
        <Frac n={prod.simple.n} d={prod.simple.d} size="lg" />
      {/if}
    </div>
    <p class="font-semibold text-slate-800" aria-live="polite">{prodMessage}</p>
    <p class="text-sm text-slate-600">Chạm vào một ô để tô đến cột và hàng của ô đó.</p>
  {:else}
    <div class="grid gap-3 sm:grid-cols-2">
      <div
        class="space-y-2 rounded-xl border border-indigo-200 p-3"
        role="group"
        aria-label="Số bị chia"
      >
        <p class="text-sm font-semibold text-indigo-700">Số bị chia</p>
        <Stepper label="Tử" bind:value={p} min={1} max={2 * q} />
        <Stepper label="Mẫu" bind:value={q} min={1} max={6} onchange={setQ} />
      </div>
      <div
        class="space-y-2 rounded-xl border border-orange-200 p-3"
        role="group"
        aria-label="Số chia"
      >
        <p class="text-sm font-semibold text-orange-700">Số chia</p>
        <Stepper label="Tử" bind:value={r} min={1} max={s} />
        <Stepper label="Mẫu" bind:value={s} min={1} max={8} onchange={setS} />
      </div>
    </div>

    <svg
      viewBox="0 0 {2 * LEN + 2 * X0} 130"
      class="mx-auto block w-full max-w-xl select-none"
      role="img"
      aria-label="Đoạn {fracText(p, q)} được đo bằng các đoạn {fracText(r, s)} đặt nối nhau"
    >
      <line x1={X0} y1="30" x2={X0 + 2 * LEN} y2="30" stroke="#94a3b8" stroke-width="2" />
      {#each [0, 1, 2] as u (u)}
        <line
          x1={X0 + u * LEN}
          y1="20"
          x2={X0 + u * LEN}
          y2="40"
          stroke="#334155"
          stroke-width="2"
        />
        <text x={X0 + u * LEN} y="15" text-anchor="middle" font-size="16" fill="#334155">{u}</text>
      {/each}
      <rect x={X0} y="22" width={(p / q) * LEN} height="16" fill={BLUE} fill-opacity="0.8" />
      {#each pieces as t, i (i)}
        <rect
          x={X0 + t.from * LEN}
          y="56"
          width={(r / s) * LEN}
          height="34"
          fill={t.part === 1 ? ORANGE : '#fff'}
          fill-opacity={t.part === 1 ? 0.7 : 1}
          stroke={ORANGE}
          stroke-width="2"
          stroke-dasharray={t.part === 1 ? null : '5 4'}
        />
        {#if t.part < 1}
          <rect
            x={X0 + t.from * LEN}
            y="56"
            width={(t.to - t.from) * LEN}
            height="34"
            fill={ORANGE}
            fill-opacity="0.7"
          />
        {/if}
        <text
          x={X0 + (t.from + r / s / 2) * LEN}
          y="112"
          text-anchor="middle"
          font-size="14"
          fill="#9a3412">{i + 1}</text
        >
      {/each}
    </svg>

    <div
      class="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
    >
      <Frac n={p} d={q} size="lg" />
      <span class="text-2xl font-bold text-slate-500" aria-hidden="true">:</span>
      <span class="sr-only">chia</span>
      <Frac n={r} d={s} size="lg" />
      <span class="text-2xl font-bold text-slate-500" aria-hidden="true">=</span>
      <Frac n={p} d={q} size="lg" />
      <span class="text-2xl font-bold text-slate-500" aria-hidden="true">·</span>
      <span class="sr-only">nhân nghịch đảo</span>
      <Frac n={s} d={r} size="lg" />
      <span class="text-2xl font-bold text-slate-500" aria-hidden="true">=</span>
      <Frac n={quot.simple.n} d={quot.simple.d} size="lg" />
    </div>
    <p class="font-semibold text-slate-800" aria-live="polite">{divMessage}</p>
  {/if}
</div>
