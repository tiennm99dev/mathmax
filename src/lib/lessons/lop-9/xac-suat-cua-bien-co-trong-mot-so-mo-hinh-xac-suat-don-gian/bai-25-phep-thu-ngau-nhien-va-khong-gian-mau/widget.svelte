<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import {
    EXPERIMENTS,
    cellPossible,
    countText,
    omegaText,
    outcomeText,
    outcomes,
    paths,
    treeNodes,
  } from './engine.js';

  let expId = $state(EXPERIMENTS[0].id);
  let view = $state('cay');
  let shown = $state(0);
  let guess = $state(2);
  let trial = $state(/** @type {string[] | null} */ (null));
  let announce = $state('');
  const selectId = $props.id();

  const exp = $derived(EXPERIMENTS.find((e) => e.id === expId) ?? EXPERIMENTS[0]);
  const depth = $derived(exp.stages.length);
  const all = $derived(outcomes(exp));
  const nodes = $derived(treeNodes(exp));
  const done = $derived(shown === depth);
  const hasTable = $derived(depth === 2);
  const asTable = $derived(view === 'bang' && hasTable);
  const trialKey = $derived(trial ? trial.join('/') : '');

  function restart() {
    shown = 0;
    trial = null;
    announce = '';
  }

  function next() {
    if (shown >= depth) return;
    shown += 1;
    const stage = exp.stages[shown - 1];
    const count = paths(exp, shown).length;
    announce =
      shown === 1
        ? `Bước 1, ${stage.name}: ${stage.labels.join(', ')}.`
        : `Bước ${shown}, ${stage.name}: cây có ${count} nhánh.`;
  }

  function run() {
    if (!done) return;
    trial = all[Math.floor(Math.random() * all.length)];
    announce = `Kết quả của phép thử: ${outcomeText(exp, trial)}.`;
  }

  // Tree geometry: one row per leaf, one column per stage.
  const ROW = 30;
  const TOP = 34;
  const COL = 82;
  const LEFT = 18;
  const treeW = $derived(LEFT + depth * COL + 96);
  const treeH = $derived(TOP + all.length * ROW);
  /** @param {number} level */
  const xAt = (level) => LEFT + level * COL;
  /** @param {number} y */
  const yAt = (y) => TOP + y * ROW + ROW / 2 - 6;
  const rootY = $derived(yAt((all.length - 1) / 2));
  const visible = $derived(nodes.filter((n) => n.level <= shown));
  /** @param {string | null} key */
  const nodeOf = (key) => nodes.find((n) => n.key === key);
  /** @param {string} key */
  const onTrial = (key) => trialKey !== '' && (trialKey === key || trialKey.startsWith(`${key}/`));

  const feedback = $derived.by(() => {
    if (!done)
      return {
        tone: /** @type {const} */ ('info'),
        text: `Đoán xem không gian mẫu có bao nhiêu phần tử, rồi bấm "Mở bước tiếp theo" (${shown}/${depth} bước đã mở).`,
      };
    const n = all.length;
    const how = `Số phần tử: ${countText(exp)}.`;
    if (guess === n)
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Em đoán đúng: không gian mẫu có ${n} phần tử. ${how}`,
      };
    return {
      tone: /** @type {const} */ ('warn'),
      text: `Em đoán ${guess}, nhưng không gian mẫu có ${n} phần tử. ${how}${exp.distinct ? ' Thẻ đã rút không được trả lại nên lần sau còn ít thẻ hơn.' : ''}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <div>
      <label for={selectId} class="mb-1 block text-sm font-semibold text-slate-700">Phép thử</label>
      <select id={selectId} class="{textInput} text-base" bind:value={expId} onchange={restart}>
        {#each EXPERIMENTS as e (e.id)}
          <option value={e.id}>{e.title}</option>
        {/each}
      </select>
    </div>
    <SegmentedControl
      label="Cách mô tả"
      options={[
        { value: 'cay', label: 'Sơ đồ cây' },
        { value: 'bang', label: 'Bảng' },
      ]}
      bind:value={view}
    />
  </div>

  <p class="text-sm text-slate-700">{exp.story}</p>

  <div class="flex flex-wrap items-end gap-3">
    <Stepper label="Em đoán số phần tử của Ω" bind:value={guess} min={1} max={40} />
    <button type="button" class={button.primary} onclick={next} disabled={done}
      >Mở bước tiếp theo</button
    >
    <button type="button" class={button.quiet} onclick={restart}>Làm lại</button>
  </div>

  {#if view === 'bang' && !hasTable}
    <FeedbackNote
      tone="info"
      text="Phép thử này có ba bước nên không vẽ được bảng hai chiều; ta dùng sơ đồ cây."
    />
  {/if}

  {#if asTable}
    {@const [rowStage, colStage] = exp.stages}
    <div class="overflow-x-auto">
      <table class="mx-auto border-collapse text-center text-sm tabular-nums">
        <caption class="mb-2 text-sm text-slate-600"
          >Hàng: {rowStage.name}. Cột: {colStage.name}.</caption
        >
        <thead>
          <tr>
            <th class="border border-slate-300 bg-slate-100 px-2 py-1" scope="col"
              ><span class="sr-only">{rowStage.name} / {colStage.name}</span></th
            >
            {#each colStage.labels as c (c)}
              <th class="border border-slate-300 bg-slate-100 px-2 py-1" scope="col"
                >{shown >= 2 ? c : '?'}</th
              >
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each rowStage.labels as r (r)}
            <tr>
              <th class="border border-slate-300 bg-slate-100 px-2 py-1" scope="row"
                >{shown >= 1 ? r : '?'}</th
              >
              {#each colStage.labels as c (c)}
                {@const ok = cellPossible(exp, r, c)}
                {@const hit = trialKey === `${r}/${c}`}
                <td
                  class="border border-slate-300 px-2 py-1 {hit
                    ? 'bg-amber-200 font-bold'
                    : shown >= 2 && ok
                      ? 'bg-emerald-50'
                      : ''}"
                >
                  {#if shown < 2}
                    <span class="text-slate-300">·</span>
                  {:else if ok}
                    {outcomeText(exp, [r, c])}
                  {:else}
                    <span class="text-slate-400" title="Không xảy ra">✕</span>
                    <span class="sr-only">không xảy ra</span>
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <svg
      viewBox="0 0 {treeW} {treeH}"
      class="mx-auto block w-full max-w-md"
      role="img"
      aria-label="Sơ đồ cây của phép thử {exp.title}, đã mở {shown} trên {depth} bước{done
        ? `; ${all.length} nhánh ứng với ${all.length} kết quả`
        : ''}."
    >
      {#each exp.stages as st, i (i)}
        <text
          x={xAt(i + 1)}
          y="14"
          text-anchor="middle"
          font-size="11"
          fill={i < shown ? '#334155' : '#cbd5e1'}>{st.short}</text
        >
      {/each}
      <circle cx={LEFT} cy={rootY} r="5" fill="#475569" />
      {#each visible as n (n.key)}
        {@const p = nodeOf(n.parent)}
        {@const px = p ? xAt(p.level) + 12 : LEFT}
        {@const py = p ? yAt(p.y) : rootY}
        <line
          x1={px}
          y1={py}
          x2={xAt(n.level) - 12}
          y2={yAt(n.y)}
          stroke={onTrial(n.key) ? '#d97706' : '#94a3b8'}
          stroke-width={onTrial(n.key) ? 3 : 1.5}
        />
      {/each}
      {#each visible as n (n.key)}
        <rect
          x={xAt(n.level) - 12}
          y={yAt(n.y) - 11}
          width="24"
          height="22"
          rx="5"
          fill={onTrial(n.key) ? '#fde68a' : '#eef2ff'}
          stroke={onTrial(n.key) ? '#d97706' : '#6366f1'}
        />
        <text
          x={xAt(n.level)}
          y={yAt(n.y) + 5}
          text-anchor="middle"
          font-size="14"
          font-weight="700"
          fill="#1e1b4b">{n.label}</text
        >
        {#if done && n.level === depth}
          <text
            x={xAt(n.level) + 22}
            y={yAt(n.y) + 5}
            font-size="14"
            fill={onTrial(n.key) ? '#b45309' : '#047857'}
            font-weight="600">{outcomeText(exp, n.key.split('/'))}</text
          >
        {/if}
      {/each}
    </svg>
  {/if}

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.secondary} onclick={run} disabled={!done}
      >Thực hiện phép thử</button
    >
    {#if trial}
      <span class="text-sm font-semibold text-amber-800"
        >Kết quả lần này: {outcomeText(exp, trial)}</span
      >
    {:else if done}
      <span class="text-sm text-slate-600">Không biết trước kết quả nào sẽ xảy ra.</span>
    {/if}
  </div>

  {#if done}
    <p class="rounded-xl bg-slate-50 px-4 py-3 text-sm break-words text-slate-800">
      {omegaText(exp)}
    </p>
  {/if}

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
  <p class="sr-only" aria-live="polite">{announce}</p>
</div>
