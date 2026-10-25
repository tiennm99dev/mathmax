<script>
  /**
   * A row of mutually exclusive options built on native radio inputs, so arrow
   * keys, Tab and screen readers behave as for any radio group.
   * @type {{
   *   label: string;
   *   options: Array<{ value: string | number, label: string }>;
   *   value: string | number;
   *   hideLabel?: boolean;
   *   onchange?: (value: string | number) => void;
   * }}
   */
  let { label, options, value = $bindable(), hideLabel = false, onchange } = $props();

  const name = $props.id();
</script>

<fieldset class="min-w-0">
  <legend class={hideLabel ? 'sr-only' : 'mb-1 text-sm font-semibold text-slate-700'}>
    {label}
  </legend>
  <div class="inline-flex max-w-full flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
    {#each options as opt (opt.value)}
      <label
        class="flex min-h-11 cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900 has-[:checked]:bg-white has-[:checked]:text-indigo-700 has-[:checked]:shadow-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-indigo-500 in-[.kid]:min-h-12 in-[.kid]:text-base"
      >
        <input
          type="radio"
          class="sr-only"
          {name}
          value={opt.value}
          bind:group={value}
          onchange={() => onchange?.(opt.value)}
        />
        {opt.label}
      </label>
    {/each}
  </div>
</fieldset>
