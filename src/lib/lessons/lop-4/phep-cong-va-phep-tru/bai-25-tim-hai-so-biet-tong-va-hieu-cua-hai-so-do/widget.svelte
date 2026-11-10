<script>
  import SliderField from '#lib/core/slider-field.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { PROBLEMS, feedback, working } from './engine.js';

  const LEFT = 66;
  const ROOM = 200;

  let index = $state(0);
  let small = $state(20);
  let cut = $state(false);

  const problem = $derived(PROBLEMS[index]);
  const scale = $derived(ROOM / problem.sum);
  const note = $derived(feedback(problem.sum, problem.diff, small));
  const done = $derived(note.tone === 'ok');
  const smallWidth = $derived(small * scale);
  const diffWidth = $derived(problem.diff * scale);
  const braceX = $derived(LEFT + smallWidth + diffWidth + 10);

  function next() {
    index = (index + 1) % PROBLEMS.length;
    small = Math.max(1, Math.round(PROBLEMS[index].sum / 4));
    cut = false;
  }
</script>

<div class="space-y-4">
  <p class="text-lg font-semibold text-slate-800">
    Tổng hai số là {fmt(problem.sum)}. Hiệu hai số là {fmt(problem.diff)}. Em kéo thanh để tìm số
    bé.
  </p>

  <svg
    viewBox="0 0 335 120"
    class="w-full max-w-xl"
    role="img"
    aria-label="Sơ đồ đoạn thẳng. Số bé dài {small}. Số lớn dài {small} và thêm phần hơn {problem.diff}{cut
      ? ', phần hơn đã bớt đi'
      : ''}. Hai số cộng lại được {2 * small + problem.diff}, tổng cần có là {problem.sum}."
  >
    <text x="0" y="38" font-size="17" font-weight="700" fill="#334155">Số lớn</text>
    <rect x={LEFT} y="20" width={smallWidth} height="26" rx="4" fill="#818cf8" />
    <rect
      x={LEFT + smallWidth}
      y="20"
      width={diffWidth}
      height="26"
      rx="4"
      fill={cut ? '#e2e8f0' : '#fb923c'}
      stroke={cut ? '#94a3b8' : 'none'}
      stroke-dasharray="4 3"
    />
    <text
      x={LEFT + smallWidth + diffWidth / 2}
      y="14"
      font-size="15"
      text-anchor="middle"
      fill="#c2410c">hiệu {problem.diff}</text
    >
    <text x="0" y="98" font-size="17" font-weight="700" fill="#334155">Số bé</text>
    <rect x={LEFT} y="80" width={smallWidth} height="26" rx="4" fill="#818cf8" />
    <text x={LEFT + smallWidth / 2} y="99" font-size="16" text-anchor="middle" fill="#fff"
      >{small}</text
    >
    <path
      d="M {braceX} 20 q 8 0 8 10 v 23 q 0 10 8 10 q -8 0 -8 10 v 23 q 0 10 -8 10"
      fill="none"
      stroke="#475569"
      stroke-width="2"
    />
    <text x={braceX + 20} y="68" font-size="17" font-weight="700" fill="#334155"
      >{fmt(2 * small + problem.diff)}</text
    >
  </svg>

  <p class="text-lg text-slate-700">
    Tổng cần có: {fmt(problem.sum)}{cut
      ? `. Bớt phần hơn: ${fmt(problem.sum)} − ${fmt(problem.diff)} = ${fmt(problem.sum - problem.diff)}, là hai đoạn bằng nhau.`
      : '.'}
  </p>

  <SliderField label="Số bé" bind:value={small} min={1} max={problem.sum - problem.diff} />

  <button
    type="button"
    class="min-h-12 text-lg {button.quiet}"
    aria-pressed={cut}
    onclick={() => (cut = !cut)}>{cut ? 'Trả lại phần hơn' : 'Bớt phần hơn'}</button
  >

  <p
    class="rounded-2xl px-4 py-3 text-xl font-semibold {note.tone === 'ok'
      ? 'bg-emerald-100 text-emerald-900'
      : note.tone === 'warn'
        ? 'bg-amber-100 text-amber-900'
        : 'bg-slate-100 text-slate-800'}"
    aria-live="polite"
  >
    {#if done}<span aria-hidden="true">⭐ </span>{/if}{note.text}
  </p>

  {#if cut || done}
    <ol class="space-y-2 text-lg font-semibold">
      {#each working(problem.sum, problem.diff).slice(0, done ? 3 : 1) as line, i (i)}
        <li class="rounded-xl bg-indigo-50 px-3 py-2 text-indigo-950">{line}</li>
      {/each}
    </ol>
  {/if}

  <button
    type="button"
    class="min-h-12 text-lg {done ? button.primary : button.secondary}"
    onclick={next}>Bài khác</button
  >
</div>
