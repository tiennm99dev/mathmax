<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import {
    dragHourHand,
    dragMinuteHand,
    formatDigital,
    formatTime,
    handAngles,
  } from '#lib/units-engine/clock.js';
  import { angleOf, polar } from './svg-math.js';

  /**
   * An analog clock. With `interactive`, the knob at the tip of each hand
   * can be dragged around the dial; the minute hand snaps to `step` minutes
   * and carries the hour across 12 as a real clock does. Arrow keys on the
   * minute knob move `step` minutes (Shift: 15), on the hour knob one hour.
   * The time reads aloud in Vietnamese ('7 giờ 15 phút').
   *
   * - `minutes` (bindable): the time as minutes since 0:00 (0-1439); build it
   *   with `toMinutes(h, m)` from `#lib/units-engine/clock.js`.
   * - `step`: minute-hand snap (5). `showMinuteTicks`: the 60 small ticks.
   * - `showDigital`: print '07:15' under the reading.
   * - `twelveHour`: read 19:15 as '7 giờ 15 phút tối'.
   *
   * @type {{
   *   minutes?: number;
   *   interactive?: boolean;
   *   step?: number;
   *   showNumbers?: boolean;
   *   showMinuteTicks?: boolean;
   *   showDigital?: boolean;
   *   showReading?: boolean;
   *   twelveHour?: boolean;
   *   label?: string;
   *   onchange?: (minutes: number) => void;
   * }}
   */
  let {
    minutes = $bindable(7 * 60),
    interactive = true,
    step = 5,
    showNumbers = true,
    showMinuteTicks = true,
    showDigital = false,
    showReading = true,
    twelveHour = false,
    label = 'Đồng hồ',
    onchange,
  } = $props();

  const S = 300;
  const C = S / 2;
  const R = 138;
  const angles = $derived(handAngles(minutes));
  const hourTip = $derived(polar(C, C, R * 0.5, angles.hour));
  const minuteTip = $derived(polar(C, C, R * 0.78, angles.minute));
  const reading = $derived(formatTime(minutes, { twelveHour }));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  /** @param {number} next */
  function set(next) {
    if (next === minutes) return;
    minutes = next;
    onchange?.(next);
  }

  const base = $derived({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: S, h: S },
    pad: 0,
  });
  const minuteDrag = $derived({
    ...base,
    onChange: () => set(dragMinuteHand(minutes, angleOf(C, C, scratch), step)),
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) =>
      set(dragMinuteHand(minutes, angles.minute + (dx - dy) * (big ? 90 : step * 6), step)),
  });
  const hourDrag = $derived({
    ...base,
    onChange: () => set(dragHourHand(minutes, angleOf(C, C, scratch))),
    /** @param {number} dx @param {number} dy */
    onKeyMove: (dx, dy) => set((minutes + (dx - dy) * 60 + 1440) % 1440),
  });
</script>

<figure class="space-y-2">
  <svg
    bind:this={svgEl}
    viewBox="0 0 {S} {S}"
    class="mx-auto block w-full max-w-xs select-none"
    style:aspect-ratio="1 / 1"
    style:touch-action={interactive ? 'none' : null}
    role={interactive ? 'group' : 'img'}
    aria-label="{label}: {reading}"
  >
    <circle cx={C} cy={C} r={R} fill="#fff" stroke="#334155" stroke-width="5" />
    {#if showMinuteTicks}
      {#each { length: 60 } as _, m (m)}
        {#if m % 5 !== 0}
          {@const a = polar(C, C, R - 6, m * 6)}
          {@const b = polar(C, C, R - 12, m * 6)}
          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#94a3b8" stroke-width="1.5" />
        {/if}
      {/each}
    {/if}
    {#each { length: 12 } as _, h (h)}
      {@const a = polar(C, C, R - 6, h * 30)}
      {@const b = polar(C, C, R - 18, h * 30)}
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#334155" stroke-width="3" />
      {#if showNumbers}
        {@const t = polar(C, C, R - 36, h * 30)}
        <text
          x={t.x}
          y={t.y + 8}
          text-anchor="middle"
          font-size="22"
          font-weight="700"
          fill="#1e293b">{h === 0 ? 12 : h}</text
        >
      {/if}
    {/each}

    <line
      x1={C}
      y1={C}
      x2={hourTip.x}
      y2={hourTip.y}
      stroke="#1e293b"
      stroke-width="9"
      stroke-linecap="round"
    />
    <line
      x1={C}
      y1={C}
      x2={minuteTip.x}
      y2={minuteTip.y}
      stroke="#D7263D"
      stroke-width="5"
      stroke-linecap="round"
    />
    <circle cx={C} cy={C} r="8" fill="#1e293b" />

    {#if interactive}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Kim giờ"
        aria-valuemin={0}
        aria-valuemax={1439}
        aria-valuenow={minutes}
        aria-valuetext={reading}
        style="cursor:grab; outline:none"
        use:draggable={hourDrag}
      >
        <circle class="drag-hit" cx={hourTip.x} cy={hourTip.y} r="20" fill="transparent" />
        <circle
          class="drag-knob"
          cx={hourTip.x}
          cy={hourTip.y}
          r="10"
          fill="#1e293b"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Kim phút"
        aria-valuemin={0}
        aria-valuemax={1439}
        aria-valuenow={minutes}
        aria-valuetext={reading}
        style="cursor:grab; outline:none"
        use:draggable={minuteDrag}
      >
        <circle class="drag-hit" cx={minuteTip.x} cy={minuteTip.y} r="20" fill="transparent" />
        <circle
          class="drag-knob"
          cx={minuteTip.x}
          cy={minuteTip.y}
          r="10"
          fill="#D7263D"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
    {/if}
  </svg>
  {#if showReading || showDigital}
    <figcaption class="text-center text-xl font-bold text-slate-800" aria-live="polite">
      {#if showReading}{reading}{/if}
      {#if showDigital}
        <span class="ml-2 rounded bg-slate-900 px-2 py-0.5 font-mono text-lime-300 tabular-nums"
          >{formatDigital(minutes)}</span
        >
      {/if}
    </figcaption>
  {/if}
</figure>
