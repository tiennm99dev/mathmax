<script>
  import { tick } from 'svelte';
  import { button } from '#lib/core/ui.js';
  import DivisionSheet from '../_shared/division-sheet.svelte';
  import { divText, oneStepRows } from '../_shared/division.js';
  import KidNote from '../_shared/kid-note.svelte';
  import Candy from './candy.svelte';
  import {
    TASKS,
    canFill,
    cannotFillMessage,
    finish,
    leftOver,
    progressMessage,
  } from './engine.js';

  let index = $state(0);
  let bags = $state(0);
  let done = $state(false);
  let slip = $state('');
  let doneText = $state('');
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const task = $derived(TASKS[index]);
  const left = $derived(leftOver(task, bags));
  const quotient = $derived(Math.floor(task.total / task.per));

  const message = $derived(done ? doneText : slip || progressMessage(task, bags));
  const tone = $derived(done ? 'ok' : slip ? 'warn' : 'info');

  function fill() {
    if (canFill(task, bags)) {
      bags += 1;
      slip = '';
    } else {
      slip = cannotFillMessage(task, bags);
    }
  }

  async function stop() {
    const result = finish(task, bags);
    if (!result.done) {
      slip = result.text;
      return;
    }
    doneText = result.text;
    done = true;
    slip = '';
    await tick();
    nextButton?.focus();
  }

  function next() {
    index = (index + 1) % TASKS.length;
    bags = 0;
    done = false;
    slip = '';
  }
</script>

<div class="space-y-4">
  <p class="text-center text-2xl font-bold text-slate-800">
    Có {task.total} cái kẹo. Mỗi túi {task.per} cái.
  </p>

  <div
    class="flex min-h-16 flex-wrap items-center justify-center gap-1 rounded-2xl p-3 {done &&
    left > 0
      ? 'bg-amber-100'
      : 'bg-sky-50'}"
    role="img"
    aria-label="Còn {left} cái kẹo chưa vào túi"
  >
    {#each { length: left } as _, i (i)}
      <Candy size={36} />
    {/each}
    {#if left === 0}
      <span class="text-lg font-semibold text-slate-600">Hết kẹo</span>
    {/if}
  </div>
  {#if done && left > 0}
    <p class="text-center text-xl font-bold text-amber-900">Phần thừa: {left} cái kẹo là số dư</p>
  {/if}

  <div
    class="flex flex-wrap justify-center gap-2"
    role="img"
    aria-label="Có {bags} túi kẹo, mỗi túi {task.per} cái"
  >
    {#each { length: bags } as _, i (i)}
      <div
        class="flex w-24 flex-wrap justify-center gap-0.5 rounded-b-2xl border-2 border-indigo-400 bg-indigo-50 p-1"
      >
        {#each { length: task.per } as _, j (j)}
          <Candy size={28} />
        {/each}
      </div>
    {/each}
  </div>

  <KidNote {tone} text={message} />

  {#if done}
    <div class="flex justify-center">
      <DivisionSheet
        rows={oneStepRows(task.total, task.per)}
        divisor={task.per}
        quotient={String(quotient)}
        label="Đặt tính: {divText(task.total, task.per)}"
      />
    </div>
  {:else}
    <div class="flex flex-wrap justify-center gap-3">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={fill}
        >Đóng một túi</button
      >
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={stop}>Xong</button>
    </div>
  {/if}

  <div class="flex justify-center">
    <button
      type="button"
      class="min-h-12 text-lg {done ? button.primary : button.quiet}"
      bind:this={nextButton}
      onclick={next}>Bài khác</button
    >
  </div>
</div>
