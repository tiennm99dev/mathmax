<script>
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import DataTable from '#lib/core/visuals/data-table.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { AXIS_MAX, GOAL, SPORTS, barStatus, readings } from './engine.js';

  /** Starting data of lớp 6B in the two-way mode. */
  const START = [10, 9, 7, 5, 8];

  let mode = $state('hai-chieu');
  let values = $state([...START]);
  let message = $state('Kéo đỉnh một cột hoặc sửa một ô trong bảng: bên kia cập nhật theo.');

  const draw = $derived(mode === 've');
  const chart = $derived(SPORTS.map((label, i) => ({ label, value: values[i] })));
  const rows = $derived(SPORTS.map((label, i) => ({ label, count: values[i] })));
  const goalRows = SPORTS.map((label, i) => ({ label, count: GOAL[i] }));
  const read = $derived(readings(SPORTS, values));
  const status = $derived(barStatus(values, GOAL));
  const done = $derived(status.every((s) => s.ok));

  /** @param {number[]} next @param {string} source */
  function update(next, source) {
    const changed = next.findIndex((v, i) => v !== values[i]);
    values = next;
    if (changed < 0) return;
    const name = SPORTS[changed];
    if (draw) {
      const s = barStatus(next, GOAL)[changed];
      message = `Cột ${name} cao ${next[changed]}: ${s.ok ? 'khớp với bảng' : s.text.toLowerCase() + ' so với bảng'}.`;
    } else {
      message = `${source} ${name} đổi thành ${next[changed]} học sinh; ${source === 'Cột' ? 'bảng' : 'biểu đồ'} đã cập nhật.`;
    }
  }

  /** @param {string | number} v */
  function setMode(v) {
    values = v === 've' ? SPORTS.map(() => 0) : [...START];
    message =
      v === 've'
        ? 'Kéo đỉnh từng cột (hoặc chọn cột rồi dùng phím mũi tên) để có chiều cao bằng số liệu trong bảng.'
        : 'Kéo đỉnh một cột hoặc sửa một ô trong bảng: bên kia cập nhật theo.';
  }

  function reset() {
    setMode(mode);
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    options={[
      { value: 'hai-chieu', label: 'Hai chiều' },
      { value: 've', label: 'Vẽ từ bảng' },
    ]}
    bind:value={mode}
    onchange={setMode}
  />

  <div class="grid items-start gap-4 lg:grid-cols-[3fr_2fr]">
    <BarChart
      data={chart}
      interactive
      max={AXIS_MAX}
      unit="Số học sinh"
      title={draw ? 'Biểu đồ cột em đang vẽ' : 'Môn thể thao yêu thích của lớp 6B'}
      onchange={(d) =>
        update(
          d.map((b) => b.value),
          'Cột',
        )}
    />
    {#if draw}
      <div class="space-y-2">
        <DataTable
          rows={goalRows}
          caption="Bảng cần vẽ: lớp 6A"
          headers={{ label: 'Môn', count: 'Số học sinh' }}
        />
        <ul class="space-y-1 text-sm">
          {#each status as s, i (SPORTS[i])}
            <li class={s.ok ? 'text-emerald-700' : 'text-slate-600'}>
              {SPORTS[i]}: {s.text}
            </li>
          {/each}
        </ul>
      </div>
    {:else}
      <DataTable
        {rows}
        editable
        max={AXIS_MAX}
        caption="Bảng thống kê lớp 6B"
        headers={{ label: 'Môn', count: 'Số học sinh' }}
        onchange={(r) =>
          update(
            r.map((x) => x.count),
            'Ô',
          )}
      />
    {/if}
  </div>

  <p
    class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900"
    aria-live="polite"
  >
    {message}
  </p>

  {#if draw}
    <p
      class="rounded-lg border p-3 text-sm {done
        ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
        : 'border-slate-200 bg-white text-slate-700'}"
      aria-live="polite"
    >
      {done
        ? 'Hoàn thành: năm cột có chiều cao đúng bằng số liệu trong bảng. Đừng quên ghi tên biểu đồ và chú thích các trục.'
        : `Đã đúng ${status.filter((s) => s.ok).length}/${SPORTS.length} cột.`}
    </p>
  {:else}
    <div class="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-950">
      <p class="font-semibold">Đọc biểu đồ</p>
      <ul class="mt-1 list-disc space-y-0.5 pl-5">
        <li>Cột cao nhất: {read.highest.join(', ')} ({read.hi} học sinh).</li>
        <li>Cột thấp nhất: {read.lowest.join(', ')} ({read.lo} học sinh).</li>
        <li>Chênh lệch giữa cột cao nhất và cột thấp nhất: {read.gap} học sinh.</li>
        <li>Tổng chiều cao các cột (sĩ số lớp): {read.total} học sinh.</li>
      </ul>
    </div>
  {/if}

  <button type="button" class={button.quiet} onclick={reset}>Đặt lại</button>
</div>
