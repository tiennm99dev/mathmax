<script>
  /**
   * A paper strip (băng giấy): pieces side by side, each as long as its `size`
   * against `scale`, so two strips drawn with one scale compare by eye.
   * @type {{
   *   label: string;
   *   scale: number;
   *   parts: { size: number, tone: import('./strip.js').StripTone, text?: string }[];
   * }}
   */
  let { label, scale, parts } = $props();

  const TONES = /** @type {const} */ ({
    main: 'border-indigo-700 bg-indigo-200',
    copy: 'border-sky-700 bg-sky-200',
    extra: 'border-rose-700 bg-rose-200',
    plus: 'border-amber-700 bg-amber-200',
    faded: 'border-dashed border-slate-400 bg-slate-100',
  });
</script>

<div class="flex h-12 w-full" role="img" aria-label={label}>
  {#each parts as part, i (i)}
    <span
      class="flex items-center justify-center overflow-hidden border-2 text-lg font-bold tabular-nums text-slate-900 {TONES[
        part.tone
      ]} {part.tone === 'faded' ? 'text-slate-500' : ''}"
      style="width: {(part.size / scale) * 100}%">{part.text ?? ''}</span
    >
  {/each}
</div>
