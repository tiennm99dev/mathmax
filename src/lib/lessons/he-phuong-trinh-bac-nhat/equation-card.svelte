<script>
  import Tex from '$lib/components/tex.svelte';

  /** @type {{
   *   a: number,
   *   b: number,
   *   c: number,
   *   title: string,
   *   tex: string,
   *   accentClass: string,
   *   coefMax: number,
   *   constMax: number,
   *   coefALabel: string,
   *   coefBLabel: string,
   *   coefCLabel: string,
   * }} */
  let {
    a = $bindable(),
    b = $bindable(),
    c = $bindable(),
    title,
    tex,
    accentClass,
    coefMax,
    constMax,
    coefALabel,
    coefBLabel,
    coefCLabel,
  } = $props();
</script>

<fieldset class="bg-white rounded-lg border border-slate-200 p-5">
  <legend class="px-1 text-sm font-semibold {accentClass}">{title}</legend>

  <div class="mb-3 text-center">
    <Tex math={tex} ariaLabel="{title}: {tex}" />
  </div>

  <label class="block mb-2">
    <span class="text-sm text-slate-700">
      {coefALabel}: <span class="tabular-nums font-semibold">{a}</span>
    </span>
    <input
      type="range" min={-coefMax} max={coefMax} step="1"
      bind:value={a}
      aria-label="{title} — {coefALabel}, hiện tại {a}"
      class="mt-1 w-full accent-indigo-600"
    />
  </label>

  <label class="block mb-2">
    <span class="text-sm text-slate-700">
      {coefBLabel}: <span class="tabular-nums font-semibold">{b}</span>
    </span>
    <input
      type="range" min={-coefMax} max={coefMax} step="1"
      bind:value={b}
      aria-label="{title} — {coefBLabel}, hiện tại {b}"
      class="mt-1 w-full accent-indigo-600"
    />
  </label>

  <label class="block">
    <span class="text-sm text-slate-700">
      {coefCLabel}: <span class="tabular-nums font-semibold">{c}</span>
    </span>
    <input
      type="range" min={-constMax} max={constMax} step="1"
      bind:value={c}
      aria-label="{title} — {coefCLabel}, hiện tại {c}"
      class="mt-1 w-full accent-indigo-600"
    />
  </label>
</fieldset>
