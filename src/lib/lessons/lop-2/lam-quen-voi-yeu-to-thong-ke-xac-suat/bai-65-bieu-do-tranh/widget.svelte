<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import PictureChart from '../_shared/picture-chart.svelte';
  import { KIND_LABELS, MAX_PICTURES, buildMessage, buildRound, makeTask } from './engine.js';

  let mode = $state(/** @type {'build' | 'quiz'} */ ('build'));
  let seed = $state(1);
  /** @type {number[]} */
  let placed = $state([0, 0, 0]);
  /** A message about a drop, shown until the next change. */
  let dropNote = $state('');
  /** @type {{ row: number, x: number, y: number, moved: boolean } | null} */
  let drag = $state(null);
  let skipClick = false;

  const rows = $derived(makeTask(seed));
  const finished = $derived(rows.every((r, i) => placed[i] === r.count));
  const message = $derived(dropNote || buildMessage(rows, placed));

  /** @param {number} row @param {number} delta */
  function change(row, delta) {
    dropNote = '';
    placed = placed.map((n, i) => (i === row ? Math.min(MAX_PICTURES, Math.max(0, n + delta)) : n));
  }

  /** @param {PointerEvent} e @param {number} row */
  function startDrag(e, row) {
    if (e.button !== 0) return;
    skipClick = false;
    drag = { row, x: e.clientX, y: e.clientY, moved: false };
    /** @type {Element} */ (e.currentTarget).setPointerCapture(e.pointerId);
  }

  /** @param {PointerEvent} e */
  function moveDrag(e) {
    if (!drag) return;
    const far = Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 6;
    drag = { ...drag, x: e.clientX, y: e.clientY, moved: drag.moved || far };
  }

  /** @param {PointerEvent} e */
  function endDrag(e) {
    const finished = drag;
    drag = null;
    if (!finished?.moved) return;
    skipClick = true;
    const under = document.elementFromPoint(e.clientX, e.clientY);
    const zone = under?.closest('[data-chart-row]');
    const name = rows[finished.row].label.toLowerCase();
    if (!(zone instanceof HTMLElement)) {
      dropNote = 'Em thả hình vào đúng hàng của nó nhé.';
    } else if (Number(zone.dataset.chartRow) !== finished.row) {
      dropNote = `Hình ${name} phải xếp vào hàng ${name}.`;
    } else {
      change(finished.row, 1);
    }
  }

  /**
   * A drag ends in a click on the same button, which must not add a second
   * picture; a key press has `detail` 0 and always adds one.
   * @param {MouseEvent} e
   * @param {number} row
   */
  function tapSource(e, row) {
    const afterDrag = skipClick && e.detail !== 0;
    skipClick = false;
    if (!afterDrag) change(row, 1);
  }

  function newChart() {
    seed += 1;
    placed = [0, 0, 0];
    dropNote = '';
  }
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'build', label: 'Xây biểu đồ' },
      { value: 'quiz', label: 'Đọc biểu đồ' },
    ]}
  />

  {#if mode === 'build'}
    <p class="text-xl font-semibold text-slate-800">
      Em xếp đủ hình vào mỗi hàng: {rows
        .map((r) => `${r.count} ${r.label.toLowerCase()}`)
        .join(', ')}.
    </p>

    <div class="space-y-3">
      {#each rows as row, r (row.picture)}
        <div class="rounded-2xl border border-slate-200 bg-white p-3">
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="flex h-14 w-14 shrink-0 cursor-grab touch-none items-center justify-center rounded-2xl bg-amber-100 shadow-sm select-none {focusRing}"
              aria-label="Thêm một {row.label.toLowerCase()} vào hàng"
              title="Kéo vào hàng hoặc chạm để thêm"
              onpointerdown={(e) => startDrag(e, r)}
              onpointermove={moveDrag}
              onpointerup={endDrag}
              onpointercancel={() => (drag = null)}
              onclick={(e) => tapSource(e, r)}
            >
              <Picture name={row.picture} size={40} decorative />
            </button>
            <p class="min-w-0 flex-1 text-lg font-semibold text-slate-800">
              {row.label}: cần {row.count}
            </p>
            <button
              type="button"
              class="min-h-12 min-w-12 text-2xl {button.quiet}"
              aria-label="Bớt một {row.label.toLowerCase()} khỏi hàng"
              disabled={placed[r] === 0}
              onclick={() => change(r, -1)}>−</button
            >
          </div>
          <div
            data-chart-row={r}
            class="mt-2 grid grid-cols-8 gap-0.5 rounded-xl p-1 {placed[r] === row.count
              ? 'bg-emerald-50'
              : 'bg-sky-50'}"
            role="group"
            aria-label="Hàng {row.label.toLowerCase()}: đã xếp {placed[r]} hình"
          >
            {#each { length: MAX_PICTURES } as _, i (i)}
              <span
                class="flex aspect-square items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white"
              >
                {#if i < placed[r]}
                  <Picture name={row.picture} size={28} decorative />
                {/if}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {finished
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if finished}<span aria-hidden="true">⭐ </span>{/if}{message}
    </p>

    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newChart}>
      Biểu đồ khác
    </button>
  {:else}
    <ChoiceRound build={buildRound} labels={KIND_LABELS} allGood="Em đọc biểu đồ tranh rất giỏi!">
      {#snippet visual(
        /** @type {import('./engine.js').ChartQuestion} */ q,
        /** @type {boolean} */ settled,
      )}
        <PictureChart rows={q.visual?.rows ?? []} title="Biểu đồ tranh" {settled} />
      {/snippet}
    </ChoiceRound>
  {/if}
</div>

{#if drag?.moved}
  <span
    aria-hidden="true"
    class="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
    style:left="{drag.x}px"
    style:top="{drag.y}px"
  >
    <Picture name={rows[drag.row].picture} size={44} decorative />
  </span>
{/if}
