<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { EXPERIMENTS, countEvent, rangeOf, runningShare, simulate } from './engine.js';

  const TRIALS = [20, 50, 100, 200, 500, 1000];
  const SHOWN_ROWS = 100;

  let expId = $state(EXPERIMENTS[0].id);
  const exp = $derived(EXPERIMENTS.find((e) => e.id === expId) ?? EXPERIMENTS[0]);
  let eventId = $state(EXPERIMENTS[0].events[0].id);
  const event = $derived(exp.events.find((e) => e.id === eventId) ?? exp.events[0]);
  let trials = $state(20);
  let seed = $state(20261);

  const values = $derived(simulate(exp, trials, seed));
  const hits = $derived(countEvent(values, event));
  const share = $derived(hits / trials);
  const chance = $derived(event.chance[0] / event.chance[1]);
  const running = $derived(runningShare(values, event));
  const range = $derived(rangeOf(trials));
  const hasSecond = $derived(Boolean(exp.second));
  const countCol = $derived(hasSecond ? 'E' : 'D');

  /**
   * Selected cell, shown in the formula bar. Only its place is kept; the
   * formula is derived so it follows the experiment, event and trial count.
   * @type {{ col: 'B' | 'C' | 'count' | 'share', row: number }}
   */
  let selected = $state({ col: 'B', row: 2 });
  // A row past the last trial no longer exists once fewer trials are chosen.
  const selectedRow = $derived(Math.min(selected.row, trials + 1));
  const selectedRef = $derived(
    selected.col === 'count'
      ? `${countCol}2`
      : selected.col === 'share'
        ? `${countCol}3`
        : `${selected.col}${selectedRow}`,
  );
  const selectedFormula = $derived(
    selected.col === 'count'
      ? event.countFormula(range)
      : selected.col === 'share'
        ? `=${countCol}2/${trials}`
        : selected.col === 'C' && exp.second
          ? exp.second.formula(selectedRow)
          : exp.cellFormula,
  );

  /** @param {string | number} v */
  function pickExperiment(v) {
    expId = String(v);
    eventId = exp.events[0].id;
    selected = { col: 'B', row: 2 };
  }

  function recalc() {
    seed = Math.floor(Math.random() * 2 ** 31);
  }

  /** @param {number} v */
  const prob = (v) => formatNumber(v, 3);

  const summary = $derived(
    `Sau ${fmt(trials)} lần ${exp.trial}, biến cố "${event.label}" xảy ra ${fmt(hits)} lần. ` +
      `Xác suất thực nghiệm ${fmt(hits)}/${fmt(trials)} ≈ ${prob(share)}; ` +
      `xác suất tính theo lí thuyết ${event.chance[0]}/${event.chance[1]} ≈ ${prob(chance)}.`,
  );

  // Running chart of the experimental probability.
  const W = 340;
  const H = 150;
  const PAD = 28;
  /** @param {number} i */
  const cx = (i) => PAD + ((W - PAD - 8) * i) / Math.max(trials - 1, 1);
  /** @param {number} p */
  const cy = (p) => H - PAD - (H - PAD - 10) * p;
  /** @param {number} v */
  const r1 = (v) => Math.round(v * 10) / 10;
  const runPath = $derived(
    running.map((p, i) => `${i ? 'L' : 'M'}${r1(cx(i))} ${r1(cy(p))}`).join(' '),
  );

  const cellClass =
    'w-full min-h-9 px-2 py-1 text-left tabular-nums hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500';
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Thí nghiệm"
    options={EXPERIMENTS.map((e) => ({ value: e.id, label: e.label }))}
    value={expId}
    onchange={pickExperiment}
  />
  <SegmentedControl
    label="Biến cố cần tính xác suất"
    options={exp.events.map((e) => ({ value: e.id, label: e.label }))}
    bind:value={eventId}
  />
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Số lần thử (số hàng kéo công thức xuống)"
      options={TRIALS.map((n) => ({ value: n, label: fmt(n) }))}
      bind:value={trials}
    />
    <button type="button" class={button.primary} onclick={recalc}>Tính lại (F9)</button>
  </div>

  <div class="overflow-hidden rounded-lg border border-slate-300 bg-white text-sm">
    <div class="flex items-center gap-2 border-b border-slate-300 bg-slate-50 px-2 py-1.5">
      <span class="w-12 shrink-0 font-mono font-semibold text-slate-700">{selectedRef}</span>
      <span class="font-serif italic text-slate-500" aria-hidden="true">fx</span>
      <output class="min-w-0 flex-1 overflow-x-auto font-mono whitespace-nowrap text-slate-900"
        >{selectedFormula}</output
      >
    </div>
    <div class="grid gap-0 md:grid-cols-[1fr_1fr]">
      <div class="max-h-72 overflow-y-auto border-slate-300 md:border-r">
        <table class="w-full border-collapse">
          <caption class="sr-only">
            Bảng tính: cột A là lần thử, cột B là kết quả của hàm ngẫu nhiên
          </caption>
          <thead class="sticky top-0 bg-slate-100 text-xs text-slate-600">
            <tr>
              <th scope="col" class="w-10 border-b border-slate-300 py-1"></th>
              <th scope="col" class="border-b border-slate-300 py-1">A</th>
              <th scope="col" class="border-b border-slate-300 py-1">B</th>
              {#if exp.second}<th scope="col" class="border-b border-slate-300 py-1">C</th>{/if}
            </tr>
          </thead>
          <tbody>
            <tr class="bg-slate-50 font-semibold">
              <th scope="row" class="border-b border-slate-200 text-xs text-slate-500">1</th>
              <td class="border-b border-slate-200 px-2">Lần thử</td>
              <td class="border-b border-slate-200 px-2">{exp.column}</td>
              {#if exp.second}<td class="border-b border-slate-200 px-2">{exp.second.column}</td
                >{/if}
            </tr>
            {#each values.slice(0, SHOWN_ROWS) as v, i (i)}
              <tr>
                <th scope="row" class="border-b border-slate-100 text-xs font-normal text-slate-500"
                  >{i + 2}</th
                >
                <td class="border-b border-slate-100 px-2 text-slate-600">{i + 1}</td>
                <td
                  class="border-b border-slate-100 p-0 {event.test(v)
                    ? 'bg-emerald-50 text-emerald-800'
                    : ''}"
                >
                  <button
                    type="button"
                    class={cellClass}
                    aria-label="Ô B{i + 2}: {exp.show(v)}"
                    onclick={() => (selected = { col: 'B', row: i + 2 })}>{exp.show(v)}</button
                  >
                </td>
                {#if exp.second}
                  {@const second = exp.second}
                  <td class="border-b border-slate-100 p-0">
                    <button
                      type="button"
                      class={cellClass}
                      aria-label="Ô C{i + 2}: {second.show(v)}"
                      onclick={() => (selected = { col: 'C', row: i + 2 })}>{second.show(v)}</button
                    >
                  </td>
                {/if}
              </tr>
            {/each}
          </tbody>
        </table>
        {#if trials > SHOWN_ROWS}
          <p class="px-2 py-2 text-xs text-slate-500">
            … công thức đã được kéo xuống đến hàng {trials + 1}; ở đây chỉ hiện {SHOWN_ROWS} hàng đầu.
          </p>
        {/if}
      </div>

      <div class="space-y-3 border-t border-slate-300 p-3 md:border-t-0">
        <dl class="space-y-2">
          <div class="rounded-lg border border-slate-200">
            <dt class="bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600">
              {countCol}2 · Số lần biến cố xảy ra
            </dt>
            <dd>
              <button
                type="button"
                class="{cellClass} text-lg font-semibold"
                aria-label="Ô {countCol}2: {hits}"
                onclick={() => (selected = { col: 'count', row: 2 })}>{fmt(hits)}</button
              >
            </dd>
          </div>
          <div class="rounded-lg border border-slate-200">
            <dt class="bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600">
              {countCol}3 · Xác suất thực nghiệm
            </dt>
            <dd>
              <button
                type="button"
                class="{cellClass} text-lg font-semibold text-indigo-700"
                aria-label="Ô {countCol}3: {prob(share)}"
                onclick={() => (selected = { col: 'share', row: 3 })}>{prob(share)}</button
              >
            </dd>
          </div>
        </dl>
        <p class="text-xs text-slate-600">
          Xác suất lí thuyết: {event.chance[0]}/{event.chance[1]} ≈ {prob(chance)}. Bấm vào một ô để
          xem công thức của nó.
        </p>
        <svg
          viewBox="0 0 {W} {H}"
          class="block w-full"
          role="img"
          aria-label="Xác suất thực nghiệm sau từng lần thử, so với xác suất lí thuyết {prob(
            chance,
          )}"
        >
          <line x1={PAD} y1={cy(0)} x2={W - 8} y2={cy(0)} stroke="#334155" />
          <line x1={PAD} y1={cy(0)} x2={PAD} y2={cy(1)} stroke="#334155" />
          {#each [0, 0.5, 1] as t (t)}
            <text x={PAD - 4} y={cy(t) + 3} font-size="9" text-anchor="end" fill="#64748b"
              >{formatNumber(t)}</text
            >
          {/each}
          <line
            x1={PAD}
            y1={cy(chance)}
            x2={W - 8}
            y2={cy(chance)}
            stroke="#e11d48"
            stroke-dasharray="4 3"
          />
          <path d={runPath} fill="none" stroke="#4f46e5" stroke-width="1.6" />
          <text x={W - 8} y={H - 8} font-size="9" text-anchor="end" fill="#64748b"
            >số lần thử: {fmt(trials)}</text
          >
        </svg>
        <p class="text-xs text-slate-500">
          <span class="text-indigo-700">Đường xanh</span>: xác suất thực nghiệm sau từng lần thử;
          <span class="text-rose-600">đường đứt</span>: xác suất lí thuyết.
        </p>
      </div>
    </div>
  </div>

  <FeedbackNote tone="info" text={summary} />
</div>
