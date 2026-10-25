<script>
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import {
    CLASSES,
    MAX,
    expansion,
    groupDigits,
    placeValues,
    romanParts,
    romanValue,
    toRoman,
  } from './engine.js';

  let typed = $state('2375041');
  const n = $derived.by(() => {
    const digits = typed.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
    const v = Number(digits || '0');
    return Math.min(v, MAX);
  });
  const parts = $derived(placeValues(n));
  /** Selected place as a power of ten, so it survives edits to the number. */
  let power = $state(4);
  const selected = $derived(parts.find((p) => p.power === power) ?? parts[parts.length - 1]);

  /** Columns grouped by class, most significant first. */
  const groups = $derived.by(() => {
    /** @type {Array<{ name: string, cells: typeof parts }>} */
    const out = [];
    for (const p of parts) {
      const c = Math.floor(p.power / 3);
      const last = out[out.length - 1];
      if (last && last.name === CLASSES[c]) last.cells.push(p);
      else out.push({ name: CLASSES[c], cells: [p] });
    }
    return out;
  });

  function random() {
    const len = 4 + Math.floor(Math.random() * 6);
    let s = String(1 + Math.floor(Math.random() * 9));
    for (let i = 1; i < len; i++) s += Math.floor(Math.random() * 10);
    typed = s;
    power = Math.floor(Math.random() * len);
  }

  /** @param {KeyboardEvent} e */
  function digitKeys(e) {
    const top = parts.length - 1;
    if (e.key === 'ArrowLeft') power = Math.min(top, selected.power + 1);
    else if (e.key === 'ArrowRight') power = Math.max(0, selected.power - 1);
    else return;
    e.preventDefault();
    document.getElementById(`digit-${power}`)?.focus();
  }

  let roman = $state(24);
  const rParts = $derived(romanParts(roman));
</script>

<div class="space-y-6">
  <section class="space-y-3" aria-label="Bảng giá trị chữ số">
    <div class="flex flex-wrap items-end gap-2">
      <label class="block min-w-0 flex-1">
        <span class="text-sm font-semibold text-slate-700">Số tự nhiên (tối đa 9 chữ số)</span>
        <input
          class="mt-1 {textInput}"
          inputmode="numeric"
          maxlength="11"
          bind:value={typed}
          aria-describedby="digit-help"
        />
      </label>
      <button type="button" class={button.quiet} onclick={random}>Số ngẫu nhiên</button>
    </div>
    <p id="digit-help" class="text-sm text-slate-600">
      Bấm vào một chữ số (hoặc dùng phím mũi tên trái, phải) để xem giá trị của nó.
    </p>

    <div class="overflow-x-auto">
      <div class="flex w-max gap-1">
        {#each groups as g (g.name)}
          <div class="rounded-lg border border-slate-200">
            <div
              class="border-b border-slate-200 bg-slate-50 px-2 py-1 text-center text-xs font-semibold text-slate-600"
            >
              Lớp {g.name}
            </div>
            <div class="flex">
              {#each g.cells as c (c.power)}
                <div class="flex w-9 flex-col items-center gap-1 p-1">
                  <span class="text-center text-[10px] leading-tight text-slate-500">{c.place}</span
                  >
                  <button
                    id="digit-{c.power}"
                    type="button"
                    class="h-11 w-8 rounded-md border-2 text-xl font-bold tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 {c.power ===
                    selected.power
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300 bg-white text-slate-800'}"
                    aria-pressed={c.power === selected.power}
                    aria-label="Chữ số {c.digit} ở hàng {c.place}"
                    tabindex={c.power === selected.power ? 0 : -1}
                    onclick={() => (power = c.power)}
                    onkeydown={digitKeys}>{c.digit}</button
                  >
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="rounded-xl border border-indigo-200 bg-indigo-50 p-4" aria-live="polite">
      <p class="text-lg text-slate-900">
        Trong số <span class="font-semibold tabular-nums">{groupDigits(n)}</span>, chữ số
        <span class="font-bold text-indigo-700">{selected.digit}</span> ở hàng
        <span class="font-semibold">{selected.place}</span>, có giá trị
        <span class="font-bold tabular-nums text-indigo-700">{groupDigits(selected.value)}</span>.
      </p>
    </div>
    <div class="rounded-xl border border-slate-200 bg-white p-4">
      <p class="text-sm font-semibold text-slate-600">Cấu tạo thập phân</p>
      <p class="break-words font-mono text-slate-900">{groupDigits(n)} = {expansion(n)}</p>
    </div>
  </section>

  <section class="space-y-3 border-t border-slate-200 pt-4" aria-label="Số La Mã">
    <SliderField label="Số cần ghi bằng chữ số La Mã" bind:value={roman} min={1} max={30} />
    <div class="rounded-xl border border-amber-200 bg-amber-50 p-4" aria-live="polite">
      <p class="text-3xl font-bold tracking-wider text-amber-900">{toRoman(roman)}</p>
      <p class="mt-2 flex flex-wrap items-center gap-1 text-slate-800">
        {#each rParts as p, i (i)}
          {#if i > 0}<span aria-hidden="true">+</span>{/if}
          <span class="rounded bg-white px-2 py-0.5 font-mono font-semibold ring-1 ring-amber-300"
            >{p}</span
          >
        {/each}
      </p>
      <p class="mt-1 tabular-nums text-slate-700">
        = {rParts.map(romanValue).join(' + ')} = {roman}
      </p>
    </div>
  </section>
</div>
