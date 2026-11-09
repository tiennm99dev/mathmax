<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import AreaGrid from '#lib/core/visuals/area-grid.svelte';
  import {
    MAX_COLS,
    MAX_ROWS,
    TARGETS,
    areaText,
    shapeKey,
    targetVerdict,
    waysFor,
  } from './engine.js';

  let mode = $state(/** @type {'tu-do' | 'do'} */ ('tu-do'));
  let cols = $state(4);
  let rows = $state(3);
  let round = $state(0);
  /** @type {string[]} */
  let found = $state([]);

  const target = $derived(TARGETS[round % TARGETS.length]);
  const ways = $derived(waysFor(target));
  const verdict = $derived(targetVerdict(cols, rows, target));
  const allFound = $derived(found.length >= ways.length);

  /** @param {{ cols: number, rows: number }} size */
  function onSize(size) {
    if (mode !== 'do' || size.cols * size.rows !== target) return;
    const key = shapeKey(size.cols, size.rows);
    if (!found.includes(key)) found = [...found, key];
  }

  function nextTarget() {
    round += 1;
    found = [];
    onSize({ cols, rows });
  }

  /** @param {string | number} value */
  function setMode(value) {
    mode = value === 'do' ? 'do' : 'tu-do';
    found = [];
    onSize({ cols, rows });
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    value={mode}
    onchange={setMode}
    options={[
      { value: 'tu-do', label: 'Kéo và xem' },
      { value: 'do', label: 'Đố em' },
    ]}
  />

  {#if mode === 'do'}
    <p class="text-center text-xl font-bold text-slate-900">
      Kéo góc để được hình có diện tích {target} cm².
    </p>
  {/if}

  <AreaGrid
    maxCols={MAX_COLS}
    maxRows={MAX_ROWS}
    bind:cols
    bind:rows
    unit="cm²"
    label="Lưới ô vuông 1 cm² có một hình chữ nhật kéo được"
    onchange={onSize}
  />

  {#if mode === 'tu-do'}
    <FeedbackNote tone="info" text={areaText(cols, rows)} />
  {:else}
    <FeedbackNote tone={verdict.ok ? 'ok' : 'warn'} text={verdict.text} />
    <p class="text-center text-lg text-slate-800" aria-live="polite">
      Em đã tìm được {found.length} / {ways.length} hình{found.length > 0
        ? `: ${found.join(', ')}`
        : ''}.
      {#if allFound}
        Giỏi quá, em đã tìm đủ!
      {/if}
    </p>
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={nextTarget}
        >Số khác</button
      >
    </div>
  {/if}
</div>
