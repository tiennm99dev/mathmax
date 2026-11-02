<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import PictureGroups from '../_shared/picture-groups.svelte';
  import { KIND_LABELS } from '../_shared/divide.js';
  import { BASE, ROWS, cardFaces, flipMessage, round } from './engine.js';

  let mode = $state(/** @type {'flip' | 'quiz'} */ ('flip'));
  /** @type {number[]} */
  let turned = $state([]);
  let last = $state(/** @type {number | null} */ (null));

  const message = $derived(flipMessage(last, turned.length));

  /** @param {number} n */
  function flip(n) {
    if (turned.includes(n)) {
      turned = turned.filter((row) => row !== n);
      last = null;
    } else {
      turned = [...turned, n];
      last = n;
    }
  }

  function faceAll() {
    turned = [];
    last = null;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'flip', label: 'Lật thẻ' },
      { value: 'quiz', label: 'Đố em' },
    ]}
  />

  {#if mode === 'flip'}
    <ul class="grid grid-flow-col grid-cols-2 grid-rows-5 gap-2" aria-label="Thẻ bảng nhân 2">
      {#each ROWS as n (n)}
        {@const faces = cardFaces(n)}
        {@const open = turned.includes(n)}
        <li>
          <button
            type="button"
            class="card h-16 w-full rounded-xl {focusRing}"
            aria-pressed={open}
            aria-label="Thẻ {open ? faces.back : faces.front}. Chạm để lật."
            onclick={() => flip(n)}
          >
            <span class="inner {open ? 'open' : ''}" aria-hidden="true">
              <span class="face bg-sky-100 text-sky-950">{faces.front}</span>
              <span class="face back bg-emerald-100 text-emerald-900">{faces.back}</span>
            </span>
          </button>
        </li>
      {/each}
    </ul>

    {#if last !== null}
      <PictureGroups each={BASE} groups={last} />
    {/if}

    <p
      class="rounded-2xl px-4 py-3 text-xl font-semibold {turned.length === 10
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-slate-100 text-slate-800'}"
      aria-live="polite"
    >
      {message}
    </p>

    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={faceAll}>
      Úp tất cả thẻ
    </button>
  {:else}
    <ChoiceRound build={round} labels={KIND_LABELS} allGood="Em đã thuộc bảng chia 2 rồi!">
      {#snippet visual(
        /** @type {{ visual?: { each: number, groups: number } }} */ q,
        /** @type {boolean} */ settled,
      )}
        <PictureGroups
          each={q.visual?.each ?? BASE}
          groups={q.visual?.groups ?? 1}
          grouped={settled}
        />
      {/snippet}
    </ChoiceRound>
  {/if}
</div>

<style>
  .card {
    perspective: 600px;
  }
  .inner {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.35s;
  }
  .inner.open {
    transform: rotateY(180deg);
  }
  .face {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.75rem;
    backface-visibility: hidden;
    font-size: 1.25rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .back {
    transform: rotateY(180deg);
  }
  @media (prefers-reduced-motion: reduce) {
    .inner {
      transition: none;
    }
  }
</style>
