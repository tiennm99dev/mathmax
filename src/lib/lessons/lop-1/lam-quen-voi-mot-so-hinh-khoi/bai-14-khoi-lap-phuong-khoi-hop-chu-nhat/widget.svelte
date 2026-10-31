<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import SolidView from '../_shared/solid-view.svelte';
  import { SOLIDS, solidTitle } from '../_shared/solids.js';
  import { BOXES, CUBE, buildRound, compareMessage, guessMessage } from './engine.js';

  /** `xoay`: turn a cube and a box side by side; `doan`: name six solids. */
  let mode = $state(/** @type {'xoay' | 'doan'} */ ('xoay'));

  // Compare game: both drawings share one view, so they turn together.
  let view = $state({ yaw: -30, pitch: 22 });
  let boxId = $state(/** @type {(typeof BOXES)[number]['id']} */ ('dai'));
  let tone = $state(false);
  const other = $derived(BOXES.find((b) => b.id === boxId) ?? BOXES[0]);

  // Guess game. The first round is fixed so the prerendered page and the browser agree.
  let seed = $state(1);
  let index = $state(0);
  let score = $state(0);
  /** @type {import('../_shared/solids.js').SolidKind | null} */
  let guess = $state(null);
  let missed = $state(false);
  let itemView = $state({ ...buildRound(1)[0].view });
  /** @type {HTMLParagraphElement | undefined} */
  let question = $state();

  const round = $derived(buildRound(seed));
  const item = $derived(index < round.length ? round[index] : null);
  const solved = $derived(item !== null && guess === item.kind);

  function resetView() {
    if (item) itemView = { ...item.view };
  }

  /** @param {import('../_shared/solids.js').SolidKind} kind */
  function choose(kind) {
    if (!item || solved) return;
    guess = kind;
    if (kind === item.kind) {
      if (!missed) score += 1;
    } else {
      missed = true;
    }
  }

  async function next() {
    index += 1;
    guess = null;
    missed = false;
    resetView();
    await tick();
    question?.focus();
  }

  function again() {
    seed += 1;
    index = 0;
    score = 0;
    guess = null;
    missed = false;
    resetView();
  }
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn trò chơi"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'xoay', label: 'Xoay và so sánh' },
      { value: 'doan', label: 'Đoán khối' },
    ]}
  />

  {#if mode === 'xoay'}
    <p class="text-xl font-semibold text-slate-800">
      Em kéo để xoay hai khối. Hai khối xoay cùng nhau.
    </p>
    <div class="grid grid-cols-2 gap-3">
      <div class="space-y-1 text-center">
        <SolidView
          boxes={[CUBE]}
          bind:view
          {tone}
          width={200}
          height={180}
          label="Khối lập phương"
        />
        <p class="text-lg font-bold text-slate-800">Khối lập phương</p>
      </div>
      <div class="space-y-1 text-center">
        <SolidView
          boxes={[other.box]}
          bind:view
          {tone}
          width={200}
          height={180}
          label="Khối hộp chữ nhật, {other.label.toLowerCase()}"
        />
        <p class="text-lg font-bold text-slate-800">Khối hộp chữ nhật</p>
      </div>
    </div>

    <SegmentedControl
      label="Chọn khối hộp chữ nhật"
      bind:value={boxId}
      options={BOXES.map((b) => ({ value: b.id, label: b.label }))}
    />
    <label class="flex min-h-12 items-center gap-3 text-lg font-semibold text-slate-800">
      <input type="checkbox" class="h-6 w-6 accent-indigo-600 {focusRing}" bind:checked={tone} />
      Tô màu: mặt to bằng nhau thì cùng màu
    </label>
    <p
      class="rounded-2xl bg-slate-100 px-4 py-3 text-xl font-semibold text-slate-800"
      aria-live="polite"
    >
      {tone
        ? `Khối lập phương chỉ có một màu: 6 mặt to bằng nhau. ${other.label} có nhiều màu: các mặt không to bằng nhau hết.`
        : compareMessage(boxId)}
    </p>
  {:else if item}
    <p bind:this={question} tabindex="-1" class="text-xl font-semibold text-slate-800 outline-none">
      Khối {index + 1} / {round.length}. Em xoay để xem các mặt. Đây là khối gì?
    </p>
    <div class="mx-auto max-w-xs">
      <SolidView
        boxes={item.boxes}
        bind:view={itemView}
        width={220}
        height={190}
        label={item.name === 'một khối'
          ? 'Một khối'
          : item.name[0].toUpperCase() + item.name.slice(1)}
      />
      {#if item.name !== 'một khối'}
        <p class="mt-1 text-center text-lg font-bold text-slate-800">
          {item.name[0].toUpperCase() + item.name.slice(1)}
        </p>
      {/if}
    </div>
    <div role="group" aria-label="Chọn tên khối" class="grid grid-cols-2 gap-3">
      {#each SOLIDS as kind (kind)}
        <button
          type="button"
          class="min-h-16 rounded-2xl border-4 px-3 text-lg font-bold transition {focusRing} {guess ===
          kind
            ? kind === item.kind
              ? 'border-emerald-600 bg-emerald-100 text-emerald-900'
              : 'border-rose-400 bg-rose-50 text-rose-700'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-pressed={guess === kind}
          onclick={() => choose(kind)}
        >
          {solidTitle(kind)}
        </button>
      {/each}
    </div>
    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {solved
        ? 'bg-emerald-100 text-emerald-900'
        : guess
          ? 'bg-amber-100 text-amber-900'
          : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if solved}<span aria-hidden="true">⭐ </span>{/if}{guess
        ? guessMessage(item, guess)
        : 'Mọi mặt là hình vuông to bằng nhau thì là khối lập phương.'}
    </p>
    {#if solved}
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        {index + 1 < round.length ? 'Khối tiếp' : 'Xem kết quả'}
      </button>
    {/if}
  {:else}
    <p
      class="rounded-2xl bg-emerald-50 px-4 py-4 text-xl font-bold text-emerald-950"
      aria-live="polite"
    >
      <span aria-hidden="true">⭐ </span>Em đoán đúng ngay {score} / {round.length} khối.
    </p>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={again}>
      Chơi lượt khác
    </button>
  {/if}
</div>
