<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import KidNote from '../_shared/kid-note.svelte';
  import {
    applyOp,
    compute,
    nextOp,
    parse,
    partsOf,
    ruleFor,
    textOf,
  } from '../_shared/expression.js';
  import { EXPRESSIONS, SET_RULES, growTree, leavesOf, valueOptions } from './engine.js';

  const WIDTH = 320;
  const STEP = 66;
  const RADIUS = 21;

  let kind = $state(/** @type {import('./engine.js').SetKind} */ ('order'));
  let index = $state(0);
  const text = $derived(EXPRESSIONS[kind][index % EXPRESSIONS[kind].length]);

  let tokens = $state(parse('27 − 7 + 30'));
  let tree = $state(leavesOf('27 − 7 + 30', WIDTH));
  /** The lines of the working, as the book writes them. */
  let lines = $state(['27 − 7 + 30']);
  /** The index of the operation being worked out, or null while choosing one. */
  let picked = $state(/** @type {number | null} */ (null));
  let slip = $state('');
  let tries = $state(0);
  let nextId = 10;
  /** @type {HTMLDivElement | undefined} */
  let panel = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const parts = $derived(picked === null ? null : partsOf(tokens, picked));
  const options = $derived(parts ? valueOptions(parts.left.v, parts.op, parts.right.v) : []);
  const done = $derived(nextOp(tokens) < 0);
  const height = $derived(Math.max(...tree.map((n) => n.level), 2) * STEP + 2 * RADIUS + 6);
  const yOf = (/** @type {number} */ level) => height - RADIUS - 3 - level * STEP;

  const message = $derived.by(() => {
    if (done) return `Giá trị của biểu thức ${text} là ${lines[lines.length - 1]}.`;
    if (slip) return slip;
    if (parts) return `${parts.left.v} ${parts.op} ${parts.right.v} bằng mấy?`;
    return 'Em làm phép tính nào trước? Chạm vào dấu của phép tính đó.';
  });
  const tone = $derived(done ? 'ok' : slip ? 'warn' : 'info');
  const treeLabel = $derived(
    `Cây tính của biểu thức ${text}: ${
      tree
        .filter((n) => n.op)
        .map((n) => `đã tính được ${n.value}`)
        .join(', ') || 'chưa tính phép nào'
    }.`,
  );

  /** @param {string} next */
  function load(next) {
    tokens = parse(next);
    tree = leavesOf(next, WIDTH);
    lines = [next];
    picked = null;
    slip = '';
    tries = 0;
  }

  /** @param {string | number} next */
  function chooseKind(next) {
    kind = /** @type {import('./engine.js').SetKind} */ (next);
    index = 0;
    load(EXPRESSIONS[kind][0]);
  }

  function another() {
    index += 1;
    load(text);
  }

  /** The buttons just pressed are gone, so focus moves to what replaced them. */
  async function moveFocus() {
    await tick();
    (done ? nextButton : panel?.querySelector('button'))?.focus();
  }

  /** @param {number} i */
  function pick(i) {
    if (i !== nextOp(tokens)) {
      slip = ruleFor(tokens, i);
      return;
    }
    picked = i;
    slip = '';
    tries = 0;
    moveFocus();
  }

  /** @param {number} value */
  function answer(value) {
    if (picked === null || !parts) return;
    const { left, op, right } = parts;
    if (value !== compute(left.v, op, right.v)) {
      tries += 1;
      slip =
        tries >= 2
          ? `Em xem nhé: ${left.v} ${op} ${right.v} = ${compute(left.v, op, right.v)}.`
          : `Chưa đúng. Em tính lại ${left.v} ${op} ${right.v}.`;
      return;
    }
    const id = nextId++;
    tree = growTree(tree, left.id, op, right.id, id);
    tokens = applyOp(tokens, picked, id);
    lines = [...lines, textOf(tokens)];
    picked = null;
    slip = '';
    tries = 0;
    moveFocus();
  }

  /**
   * What a screen reader says for the sign at `i`, its neighbours included
   * when they are numbers.
   * @param {number} i
   */
  function opLabel(i) {
    const near = tokens.slice(i - 1, i + 2).filter((t) => t.k !== '(' && t.k !== ')');
    return `Làm phép tính ${textOf(near)}`;
  }

  /** @param {number} id */
  const nodeById = (id) => tree.find((n) => n.id === id);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn loại biểu thức"
    hideLabel
    bind:value={kind}
    options={[
      { value: 'order', label: 'Từ trái sang phải' },
      { value: 'strong', label: 'Nhân, chia trước' },
      { value: 'brackets', label: 'Có dấu ngoặc' },
    ]}
    onchange={chooseKind}
  />

  <p class="text-lg font-semibold text-slate-700">{SET_RULES[kind]}</p>

  <div
    bind:this={panel}
    class="flex min-h-20 flex-wrap items-center justify-center gap-x-1 gap-y-2 rounded-2xl border-4 border-slate-300 bg-white p-3 text-3xl font-bold tabular-nums"
  >
    {#each tokens as token, i (i)}
      {#if token.k === 'num'}
        <span
          class={picked !== null && (i === picked - 1 || i === picked + 1)
            ? 'rounded-lg bg-amber-200 px-1'
            : 'px-1'}>{token.v}</span
        >
      {:else if token.k === 'op'}
        {#if picked === null}
          <button
            type="button"
            class="h-12 w-12 rounded-full border-4 border-indigo-400 bg-indigo-50 text-indigo-800 hover:bg-indigo-100 {focusRing}"
            aria-label={opLabel(i)}
            onclick={() => pick(i)}>{token.op}</button
          >
        {:else}
          <span class="px-2 {i === picked ? 'text-rose-700' : 'text-slate-500'}">{token.op}</span>
        {/if}
      {:else}
        <span>{token.k}</span>
      {/if}
    {/each}
  </div>

  {#if lines.length > 1}
    <ol class="space-y-1 text-center text-2xl font-semibold tabular-nums text-slate-800">
      {#each lines as line, i (i)}
        <li>{i > 0 ? '= ' : ''}{line}</li>
      {/each}
    </ol>
  {/if}

  <KidNote {tone} text={message} />

  {#if parts}
    <div class="flex flex-wrap justify-center gap-3" role="group" aria-label="Chọn kết quả">
      {#each options as value (value)}
        <button
          type="button"
          class="min-h-16 min-w-16 rounded-2xl border-4 border-slate-300 bg-white px-3 text-3xl font-bold tabular-nums text-slate-800 hover:border-indigo-400 {focusRing}"
          onclick={() => answer(value)}>{value}</button
        >
      {/each}
    </div>
  {/if}

  <svg
    viewBox="0 0 {WIDTH} {height}"
    class="mx-auto block w-full max-w-md"
    role="img"
    aria-label={treeLabel}
  >
    {#each tree as node (node.id)}
      {#if node.op && node.leftId !== undefined && node.rightId !== undefined}
        {@const left = nodeById(node.leftId)}
        {@const right = nodeById(node.rightId)}
        {#if left && right}
          <line
            x1={node.x}
            y1={yOf(node.level)}
            x2={left.x}
            y2={yOf(left.level)}
            stroke="#64748b"
            stroke-width="3"
          />
          <line
            x1={node.x}
            y1={yOf(node.level)}
            x2={right.x}
            y2={yOf(right.level)}
            stroke="#64748b"
            stroke-width="3"
          />
          <text
            x={node.x}
            y={yOf(node.level) + RADIUS + 18}
            text-anchor="middle"
            font-size="20"
            font-weight="700"
            fill="#be123c">{node.op}</text
          >
        {/if}
      {/if}
    {/each}
    {#each tree as node (node.id)}
      {@const top = done && node.id === tree[tree.length - 1].id}
      <circle
        cx={node.x}
        cy={yOf(node.level)}
        r={RADIUS}
        fill={top ? '#a7f3d0' : node.op ? '#fde68a' : '#e0e7ff'}
        stroke={top ? '#047857' : node.op ? '#b45309' : '#4338ca'}
        stroke-width="3"
      />
      <text
        x={node.x}
        y={yOf(node.level)}
        text-anchor="middle"
        dominant-baseline="central"
        font-size="19"
        font-weight="700"
        fill="#0f172a">{node.value}</text
      >
    {/each}
  </svg>

  <button
    type="button"
    class="min-h-12 text-lg {done ? button.primary : button.secondary}"
    bind:this={nextButton}
    onclick={another}>Biểu thức khác</button
  >
</div>
