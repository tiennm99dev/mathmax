<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { colorAt } from '#lib/core/visuals/svg-math.js';
  import { collect, polyTex, polyText, termTex, termText } from '../_shared/poly.js';
  import { PAIRS, columnTex, columns } from './engine.js';

  let pairId = $state(PAIRS[0].id);
  /** @type {'+' | '-'} */
  let op = $state('+');
  /** @type {'ngang' | 'cot'} */
  let layout = $state('ngang');
  let shown = $state(0);

  const pair = $derived(PAIRS.find((p) => p.id === pairId) ?? PAIRS[0]);
  const cols = $derived(columns(pair.p, pair.q, op));
  const done = $derived(shown >= cols.length);
  const result = $derived(collect(cols.map((c) => ({ c: c.r, e: c.e }))));
  const cancelled = $derived(cols.filter((c) => c.r === 0 && (c.a !== 0 || c.b !== 0)));
  const opWord = $derived(op === '+' ? 'cộng' : 'trừ');
  const last = $derived(shown === 0 ? null : cols[shown - 1]);

  const announcement = $derived(
    layout === 'ngang' || !last
      ? ''
      : `Cột bậc ${last.e}: kết quả ${last.r === 0 ? '0' : termText({ c: last.r, e: last.e })}.${done ? ` P(x) ${op === '+' ? 'cộng' : 'trừ'} Q(x) bằng ${polyText(result)}.` : ''}`,
  );

  // Changing the pair, the operation or the layout starts the working again.
  const restart = () => (shown = 0);

  /** @param {number} e */
  const tint = (e) => `background-color: ${colorAt(e)}1f; border-color: ${colorAt(e)};`;
  /** @param {number} c @param {number} e */
  const cellTex = (c, e) => (c === 0 ? '' : termTex({ c, e }));
  const uid = $props.id();
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Cặp đa thức"
      options={PAIRS.map((p) => ({ value: p.id, label: p.label }))}
      bind:value={pairId}
      onchange={restart}
    />
    <SegmentedControl
      label="Phép tính"
      options={[
        { value: '+', label: 'P(x) + Q(x)' },
        { value: '-', label: 'P(x) − Q(x)' },
      ]}
      bind:value={op}
      onchange={restart}
    />
    <SegmentedControl
      label="Cách viết"
      options={[
        { value: 'ngang', label: 'Như đề bài' },
        { value: 'cot', label: 'Đặt thẳng cột' },
      ]}
      bind:value={layout}
      onchange={restart}
    />
  </div>

  {#if layout === 'ngang'}
    <div class="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
      {#each [{ name: 'P(x)', terms: pair.p }, { name: 'Q(x)', terms: pair.q }] as row (row.name)}
        <div class="flex flex-wrap items-center gap-1 text-lg">
          <span class="mr-1 font-semibold">{row.name} =</span>
          {#each row.terms as t, i (i)}
            <span class="rounded-md border-b-4 px-2 py-1" style={tint(t.e)}>
              <Tex math={termTex(t, i === 0)} />
            </span>
          {/each}
        </div>
      {/each}
      <p class="text-sm text-slate-600">
        Các hạng tử cùng màu là các hạng tử cùng bậc. Chuyển sang "Đặt thẳng cột" để xếp chúng vào
        cùng một cột rồi {opWord} từng cột.
      </p>
    </div>
  {:else}
    <p class="text-center text-sm text-slate-600" id="{uid}-cap">
      {op === '+' ? 'Cộng' : 'Trừ'} theo cột: mỗi cột chứa các hạng tử cùng bậc
    </p>
    <div class="overflow-x-auto">
      <table
        class="mx-auto border-collapse text-center text-base sm:text-lg"
        aria-labelledby="{uid}-cap"
      >
        <thead>
          <tr>
            <th scope="col" class="px-2 py-1 text-sm font-normal text-slate-500"></th>
            {#each cols as c (c.e)}
              <th
                scope="col"
                class="border-b-4 px-1 py-1 text-sm sm:px-2 font-semibold whitespace-nowrap"
                style={tint(c.e)}
              >
                Bậc {c.e}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="px-1 py-1 text-left font-semibold whitespace-nowrap">P(x)</th>
            {#each cols as c (c.e)}
              <td class="min-w-12 px-1 py-2 sm:min-w-14 sm:px-2"
                ><Tex math={cellTex(c.a, c.e)} /></td
              >
            {/each}
          </tr>
          <tr>
            <th scope="row" class="px-1 py-1 text-left font-semibold whitespace-nowrap"
              >{op === '+' ? '+' : '−'} Q(x)</th
            >
            {#each cols as c (c.e)}
              <td class="min-w-12 px-1 py-2 sm:min-w-14 sm:px-2"
                ><Tex math={cellTex(c.b, c.e)} /></td
              >
            {/each}
          </tr>
          <tr class="border-t-2 border-slate-700">
            <th scope="row" class="px-1 py-1 text-left font-semibold whitespace-nowrap">Kết quả</th>
            {#each cols as c, i (c.e)}
              <td
                class="min-w-12 px-1 py-2 sm:min-w-14 sm:px-2 font-semibold"
                style={i < shown ? tint(c.e) : ''}
              >
                {#if i < shown}
                  <Tex math={c.r === 0 ? '0' : termTex({ c: c.r, e: c.e })} />
                {:else}
                  <span class="text-slate-300" aria-label="chưa tính">?</span>
                {/if}
              </td>
            {/each}
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex flex-wrap justify-center gap-2">
      <button type="button" class={button.primary} disabled={done} onclick={() => (shown += 1)}
        >Tính cột tiếp theo</button
      >
      <button
        type="button"
        class={button.quiet}
        disabled={done}
        onclick={() => (shown = cols.length)}>Tính tất cả</button
      >
      <button type="button" class={button.quiet} disabled={shown === 0} onclick={() => (shown = 0)}
        >Làm lại</button
      >
    </div>
  {/if}

  <p class="sr-only" aria-live="polite">{announcement}</p>
  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
    {#if layout === 'ngang'}
      <p class="text-slate-700">
        Theo hàng ngang: bỏ ngoặc{op === '-' ? ' (đổi dấu mọi hạng tử của Q(x))' : ''}, nhóm các
        hạng tử cùng màu rồi thu gọn.
      </p>
    {:else if shown === 0}
      <p class="text-slate-700">Bấm "Tính cột tiếp theo" để {opWord} cột có bậc cao nhất trước.</p>
    {:else if last}
      <p class="text-slate-700">
        Cột bậc {last.e}: <Tex math={columnTex(last, op)} />
      </p>
    {/if}
    {#if layout === 'ngang' || done}
      <p class="mt-2 overflow-x-auto font-semibold text-emerald-700">
        <Tex math={`P(x) ${op === '+' ? '+' : '-'} Q(x) = ${polyTex(result)}`} />
      </p>
      {#if cancelled.length > 0}
        <p class="mt-1 text-sm text-slate-600">
          Cột bậc {cancelled.map((c) => c.e).join(', ')} cho kết quả 0 nên hạng tử đó không còn trong
          kết quả.
        </p>
      {/if}
    {/if}
  </div>
</div>
