<script>
  import { rng } from '#lib/core/drill.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import PositionScene from '../_shared/position-scene.svelte';
  import {
    SCENES,
    askQuestion,
    commandText,
    fits,
    nextCommand,
    placeMessage,
  } from '../_shared/positions.js';

  /** `dat`: follow a command and put the picture; `hoi`: say where the picture is. */
  let mode = $state(/** @type {'dat' | 'hoi'} */ ('dat'));
  let sceneId = $state(/** @type {import('../_shared/positions.js').SceneId} */ ('phong'));
  const scene = $derived(SCENES[sceneId]);

  // A fixed seed keeps the prerendered page and the first browser round the same.
  const rand = rng(15);

  let command = $state('duoi-ban');
  /** @type {string | null} */
  let at = $state(null);
  let question = $state(askQuestion(SCENES.phong, rng(1)));
  /** @type {number | null} */
  let picked = $state(null);

  const placedRight = $derived(at !== null && fits(scene, at, command));
  const askedRight = $derived(picked !== null && picked === question.answer);

  function newCommand() {
    command = nextCommand(scene, command, rand);
    at = null;
  }

  function newQuestion() {
    question = askQuestion(scene, rand, question.place);
    picked = null;
  }

  /** @param {string} id */
  function switchScene(id) {
    sceneId = /** @type {import('../_shared/positions.js').SceneId} */ (id);
    command = nextCommand(SCENES[sceneId], null, rand);
    at = null;
    question = askQuestion(SCENES[sceneId], rand);
    picked = null;
  }

  /** @param {string} id */
  function put(id) {
    if (placedRight) return;
    at = id;
  }

  const noun = $derived(scene.moverName[0].toUpperCase() + scene.moverName.slice(1));
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-3">
    <SegmentedControl
      label="Chọn tranh"
      hideLabel
      value={sceneId}
      options={[
        { value: 'phong', label: 'Căn phòng' },
        { value: 'hang', label: 'Xếp hàng' },
      ]}
      onchange={(v) => switchScene(String(v))}
    />
    <SegmentedControl
      label="Chọn trò chơi"
      hideLabel
      bind:value={mode}
      options={[
        { value: 'dat', label: 'Đặt theo lệnh' },
        { value: 'hoi', label: 'Ở đâu?' },
      ]}
    />
  </div>

  {#if mode === 'dat'}
    <p
      class="rounded-2xl border-4 border-indigo-400 bg-white px-4 py-3 text-2xl font-bold text-indigo-900"
    >
      {commandText(scene, command)}
    </p>
    <div class="rounded-2xl border-2 border-slate-200 bg-white p-1">
      <PositionScene
        {scene}
        {at}
        tone={at === null ? 'none' : placedRight ? 'ok' : 'warn'}
        onpick={put}
      />
    </div>
    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {placedRight
        ? 'bg-emerald-100 text-emerald-900'
        : at
          ? 'bg-amber-100 text-amber-900'
          : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if placedRight}<span aria-hidden="true">⭐ </span>{/if}{at
        ? placeMessage(scene, at, command)
        : 'Em chạm vào ô trống đúng chỗ để đặt hình vào.'}
    </p>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newCommand}>
      Lệnh khác
    </button>
  {:else}
    <p class="text-2xl font-bold text-slate-900">{noun} ở đâu?</p>
    <div class="rounded-2xl border-2 border-slate-200 bg-white p-1">
      <PositionScene {scene} at={question.place} tone={askedRight ? 'ok' : 'none'} />
    </div>
    <div role="group" aria-label="Chọn câu đúng" class="grid gap-3">
      {#each question.options as option, i (option)}
        <button
          type="button"
          class="min-h-14 rounded-2xl border-4 px-4 text-left text-xl font-semibold transition {focusRing} {picked ===
          i
            ? i === question.answer
              ? 'border-emerald-600 bg-emerald-100 text-emerald-900'
              : 'border-rose-400 bg-rose-50 text-rose-700'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          aria-pressed={picked === i}
          onclick={() => (picked = askedRight ? picked : i)}
        >
          {noun}
          {scene.phrases[option]}.
        </button>
      {/each}
    </div>
    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {askedRight
        ? 'bg-emerald-100 text-emerald-900'
        : picked !== null
          ? 'bg-amber-100 text-amber-900'
          : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {#if picked === null}
        Em nhìn tranh rồi chạm vào câu đúng.
      {:else if askedRight}
        <span aria-hidden="true">⭐ </span>Đúng rồi! {noun}
        {scene.phrases[question.options[question.answer]]}.
      {:else}
        Chưa đúng. {noun} không {scene.phrases[question.options[picked]]}. Em nhìn lại nhé.
      {/if}
    </p>
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={newQuestion}>
      Câu khác
    </button>
  {/if}
</div>
