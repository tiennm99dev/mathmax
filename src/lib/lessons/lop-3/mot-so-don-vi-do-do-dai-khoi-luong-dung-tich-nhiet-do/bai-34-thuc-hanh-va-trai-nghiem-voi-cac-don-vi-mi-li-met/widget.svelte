<script>
  import { tick } from 'svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import Cylinder from '../_shared/cylinder.svelte';
  import DialScale from '../_shared/dial-scale.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import MmRuler from '../_shared/mm-ruler.svelte';
  import Thermometer from '../_shared/thermometer.svelte';
  import { cylinderLabel, dialLabel, rulerLabel, thermometerLabel } from '../_shared/measure.js';
  import {
    ROUNDS,
    TOOLS,
    gameSummary,
    makeGame,
    readOptions,
    slipMessage,
    stepMessage,
    toolOf,
  } from './engine.js';

  // The first game is fixed so the prerendered page and the browser agree.
  let seed = $state(1);
  let index = $state(0);
  let step = $state(/** @type {'tool' | 'unit' | 'read' | 'done'} */ ('tool'));
  /** Picks already tried and wrong in this step. */
  /** @type {string[]} */
  let tried = $state([]);
  let stars = $state(0);
  let message = $state('Em chọn dụng cụ đo.');
  let tone = $state(/** @type {'ok' | 'warn' | 'info'} */ ('info'));

  /** @type {HTMLElement | undefined} */
  let heading = $state();

  const game = $derived(makeGame(seed));
  const finished = $derived(index >= ROUNDS);
  const item = $derived(game[Math.min(index, ROUNDS - 1)]);
  const tool = $derived(toolOf(item.tool));
  const reading = $derived(readOptions(item));
  const choices = $derived(
    step === 'tool'
      ? TOOLS.map((t) => ({ id: t.id, text: t.name, icon: t.icon }))
      : step === 'unit'
        ? TOOLS.map((t) => ({ id: t.unit, text: t.unit, icon: '' }))
        : step === 'read'
          ? reading.options.map((o) => ({ id: o, text: o, icon: '' }))
          : [],
  );
  const right = $derived(
    step === 'tool' ? tool.id : step === 'unit' ? tool.unit : reading.options[reading.answer],
  );
  const showTool = $derived(!finished && (step === 'read' || step === 'done'));

  /** @param {string} id */
  async function choose(id) {
    if (step === 'done' || tried.includes(id)) return;
    if (id !== right) {
      tried = [...tried, id];
      message = slipMessage(step, item);
      tone = 'warn';
      return;
    }
    if (tried.length === 0) stars += 1;
    message = stepMessage(step, item);
    tone = 'ok';
    tried = [];
    step = step === 'tool' ? 'unit' : step === 'unit' ? 'read' : 'done';
    await tick();
    heading?.focus();
  }

  async function next() {
    index += 1;
    step = 'tool';
    tried = [];
    message = index >= ROUNDS ? gameSummary(stars) : 'Em chọn dụng cụ đo.';
    tone = index >= ROUNDS ? 'ok' : 'info';
    await tick();
    heading?.focus();
  }

  async function again() {
    seed += 1;
    index = 0;
    step = 'tool';
    tried = [];
    stars = 0;
    message = 'Em chọn dụng cụ đo.';
    tone = 'info';
    await tick();
    heading?.focus();
  }
</script>

<div class="space-y-4">
  <p class="text-center text-lg font-semibold text-slate-700">
    <span aria-hidden="true">⭐</span>
    {stars} sao{finished ? '' : ` · Vật ${index + 1} trong ${ROUNDS}`}
  </p>

  {#if finished}
    <h3 bind:this={heading} tabindex="-1" class="text-center text-2xl font-bold outline-none">
      Em đã đo xong!
    </h3>
  {:else}
    <h3
      bind:this={heading}
      tabindex="-1"
      class="text-center text-2xl font-bold text-slate-800 outline-none"
    >
      Đo {item.what}
    </h3>
  {/if}

  {#if showTool}
    {#if item.tool === 'ruler'}
      <MmRuler mm={item.value} label={rulerLabel(item.value, step === 'done')} />
    {:else if item.tool === 'scale'}
      <DialScale g={item.value} label={dialLabel(item.value, step === 'done')} />
    {:else if item.tool === 'cylinder'}
      <Cylinder ml={item.value} label={cylinderLabel(item.value, step === 'done')} />
    {:else}
      <Thermometer t={item.value} label={thermometerLabel(item.value, step === 'done')} />
    {/if}
  {/if}

  <FeedbackNote {tone} text={message} />

  {#if !finished && step !== 'done'}
    <div class="grid grid-cols-2 gap-3" role="group" aria-label="Chọn đáp án">
      {#each choices as c (c.id)}
        <button
          type="button"
          aria-disabled={tried.includes(c.id)}
          class="flex min-h-16 items-center justify-center gap-2 rounded-2xl border-4 px-2 text-xl font-bold {focusRing} {tried.includes(
            c.id,
          )
            ? 'border-rose-400 bg-rose-50 text-rose-700 line-through'
            : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'}"
          onclick={() => choose(c.id)}
        >
          {#if c.icon}<span aria-hidden="true">{c.icon}</span>{/if}{c.text}
        </button>
      {/each}
    </div>
  {:else if !finished}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        {index + 1 < ROUNDS ? 'Vật tiếp theo' : 'Xem kết quả'}
      </button>
    </div>
  {:else}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={again}>
        Chơi lại
      </button>
    </div>
  {/if}
</div>
