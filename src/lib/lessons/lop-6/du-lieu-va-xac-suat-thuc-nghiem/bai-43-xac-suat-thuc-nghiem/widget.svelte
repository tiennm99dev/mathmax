<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { fmt, formatFixed, texNumber } from '#lib/core/number-format.js';
  import {
    CHECKPOINTS,
    EVENTS,
    MAX_ROLLS,
    addRolls,
    eventCount,
    faceCounts,
    runningRatio,
    samplePoints,
  } from './engine.js';

  const W = 480;
  const H = 240;
  const LEFT = 52;
  const RIGHT = 26;
  const TOP = 14;
  const BOTTOM = 42;
  const Y_TICKS = [0, 0.25, 0.5, 0.75, 1];

  /** @type {number[]} */
  let faces = $state([]);
  let eventId = $state('mat-6');
  let announce = $state('');

  const event = $derived(EVENTS.find((e) => e.id === eventId) ?? EVENTS[0]);
  const n = $derived(faces.length);
  const hits = $derived(eventCount(faces, event));
  const counts = $derived(faceCounts(faces));
  const ratios = $derived(runningRatio(faces, event));
  const ratio = $derived(n === 0 ? 0 : hits / n);
  const points = $derived(samplePoints(ratios));
  const xMax = $derived(Math.max(10, n));
  const reached = $derived(CHECKPOINTS.filter((c) => c <= n));
  const full = $derived(n >= MAX_ROLLS);

  /** @param {number} k */
  const x = (k) => LEFT + (k / xMax) * (W - LEFT - RIGHT);
  /** @param {number} r */
  const y = (r) => TOP + (1 - r) * (H - TOP - BOTTOM);

  const path = $derived(points.map(([k, r], j) => `${j ? 'L' : 'M'} ${x(k)} ${y(r)}`).join(' '));
  const xTicks = $derived([0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(t * xMax)));

  const dec = (/** @type {number} */ r) => formatFixed(r, 2);
  const tex = $derived(
    n === 0
      ? '\\dfrac{n(A)}{n}'
      : `\\dfrac{n(A)}{n} = \\dfrac{${hits}}{${n}} \\approx ${texNumber(dec(ratio))}`,
  );

  /** @param {number} count */
  function rollMore(count) {
    const before = faces.length;
    faces = addRolls(faces, count, Math.random);
    const added = faces.length - before;
    const last = faces.at(-1);
    const r = faces.length ? eventCount(faces, event) / faces.length : 0;
    announce =
      added === 1
        ? `Mặt ${last} chấm. Sau ${fmt(faces.length)} lần gieo, xác suất thực nghiệm khoảng ${dec(r)}.`
        : `Đã gieo thêm ${fmt(added)} lần, tổng ${fmt(faces.length)} lần. Xác suất thực nghiệm khoảng ${dec(r)}.`;
  }

  function reset() {
    faces = [];
    announce = 'Đã xoá kết quả, bắt đầu gieo lại từ đầu.';
  }

  /** @param {string | number} id */
  function chooseEvent(id) {
    eventId = String(id);
    announce = `Sự kiện A: ${event.text}. Các lần gieo cũ được đếm lại cho sự kiện này.`;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Sự kiện A"
    options={EVENTS.map((e) => ({ value: e.id, label: e.text }))}
    value={eventId}
    onchange={chooseEvent}
  />

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} disabled={full} onclick={() => rollMore(1)}
      >Gieo 1 lần</button
    >
    {#each [10, 100, 1000] as c (c)}
      <button type="button" class={button.secondary} disabled={full} onclick={() => rollMore(c)}
        >Gieo {fmt(c)} lần</button
      >
    {/each}
    <button type="button" class={button.quiet} disabled={n === 0} onclick={reset}>Xoá</button>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <div class="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-950">
      <p>
        Số lần gieo: <span class="font-semibold">n = {fmt(n)}</span>. Số lần sự kiện A xảy ra:
        <span class="font-semibold">n(A) = {fmt(hits)}</span>.
      </p>
      <p class="mt-2 text-base">Xác suất thực nghiệm: <Tex math={tex} /></p>
      {#if full}
        <p class="mt-2 text-xs">Đã đạt {fmt(MAX_ROLLS)} lần gieo, bấm "Xoá" để làm lại.</p>
      {/if}
    </div>
    <table class="w-full border-collapse text-center text-sm text-slate-800">
      <caption class="mb-1 text-left text-xs font-semibold text-slate-600"
        >Số lần xuất hiện mỗi mặt (mặt làm A xảy ra được tô màu)</caption
      >
      <thead>
        <tr>
          <th scope="row" class="border border-slate-200 px-1 py-1 text-left">Mặt</th>
          {#each counts as _, i (i)}
            <th
              scope="col"
              class="border border-slate-200 px-1 py-1 {event.faces.includes(i + 1)
                ? 'bg-amber-100'
                : ''}">{i + 1}</th
            >
          {/each}
        </tr>
      </thead>
      <tbody class="tabular-nums">
        <tr>
          <th scope="row" class="border border-slate-200 px-1 py-1 text-left">Số lần</th>
          {#each counts as c, i (i)}
            <td
              class="border border-slate-200 px-1 py-1 {event.faces.includes(i + 1)
                ? 'bg-amber-50'
                : ''}">{fmt(c)}</td
            >
          {/each}
        </tr>
      </tbody>
    </table>
  </div>

  <svg
    viewBox="0 0 {W} {H}"
    class="block w-full"
    role="img"
    aria-label="Đồ thị xác suất thực nghiệm của sự kiện A theo số lần gieo{n
      ? `, hiện bằng ${dec(ratio)} sau ${fmt(n)} lần`
      : ''}"
  >
    {#each Y_TICKS as t (t)}
      <line x1={LEFT} x2={W - RIGHT} y1={y(t)} y2={y(t)} stroke="#e2e8f0" />
      <text x={LEFT - 6} y={y(t) + 4} text-anchor="end" font-size="15" fill="#475569"
        >{formatFixed(t, 2)}</text
      >
    {/each}
    {#each xTicks as k, j (j)}
      <text x={x(k)} y={H - BOTTOM + 19} text-anchor="middle" font-size="15" fill="#475569"
        >{fmt(k)}</text
      >
    {/each}
    <line x1={LEFT} x2={W - RIGHT} y1={y(0)} y2={y(0)} stroke="#334155" />
    <line x1={LEFT} x2={LEFT} y1={TOP} y2={y(0)} stroke="#334155" />
    <text x={(LEFT + W - RIGHT) / 2} y={H - 4} text-anchor="middle" font-size="15" fill="#334155"
      >Số lần gieo n</text
    >
    {#if n > 0}
      <line
        x1={LEFT}
        x2={W - RIGHT}
        y1={y(ratio)}
        y2={y(ratio)}
        stroke="#F46036"
        stroke-dasharray="5 4"
      />
      <path d={path} fill="none" stroke="#4F46E5" stroke-width="2" stroke-linejoin="round" />
      <circle cx={x(n)} cy={y(ratio)} r="4" fill="#4F46E5" />
    {:else}
      <text x={W / 2} y={H / 2} text-anchor="middle" font-size="14" fill="#64748b"
        >Bấm "Gieo" để bắt đầu</text
      >
    {/if}
  </svg>

  <div class="rounded-lg border border-slate-200 p-3 text-sm text-slate-800">
    <p class="font-semibold">Xác suất thực nghiệm tại một số mốc</p>
    {#if reached.length === 0}
      <p class="text-slate-600">Gieo ít nhất {CHECKPOINTS[0]} lần để xem các mốc.</p>
    {:else}
      <ul class="mt-1 flex flex-wrap gap-x-4 gap-y-1 tabular-nums">
        {#each reached as c (c)}
          <li>n = {fmt(c)}: {dec(ratios[c - 1])}</li>
        {/each}
      </ul>
      <p class="mt-1 text-slate-600">
        Lúc đầu tỉ số thay đổi nhiều sau mỗi lần gieo; số lần gieo càng lớn thì tỉ số càng ít thay
        đổi.
      </p>
    {/if}
  </div>

  <p class="sr-only" aria-live="polite">{announce}</p>
</div>
