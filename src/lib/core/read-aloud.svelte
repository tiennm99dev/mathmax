<script>
  import { onMount } from 'svelte';
  import { readAloud as copy } from './copy.vi.js';
  import { button } from './ui.js';

  /**
   * "Nghe" button that reads text with the browser's Vietnamese voice. It
   * renders nothing until mounted, and stays hidden when the browser has no
   * `speechSynthesis`.
   * @type {{ getText: () => string, what: string }}
   */
  let { getText, what } = $props();

  let supported = $state(false);
  let speaking = $state(false);

  onMount(() => {
    supported = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance === 'function';
    return () => {
      if (speaking) window.speechSynthesis.cancel();
    };
  });

  function toggle() {
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      speaking = false;
      return;
    }
    const text = getText();
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.9;
    const voice = synth
      .getVoices()
      .find((v) => v.lang.toLowerCase().replace('_', '-').startsWith('vi'));
    if (voice) utterance.voice = voice;
    utterance.onend = () => (speaking = false);
    utterance.onerror = () => (speaking = false);
    synth.cancel();
    synth.speak(utterance);
    speaking = true;
  }
</script>

{#if supported}
  <button
    type="button"
    data-no-speech
    class="{button.quiet} min-h-12 text-base"
    aria-pressed={speaking}
    aria-label={copy.label(what)}
    onclick={toggle}
  >
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" />
      {#if speaking}
        <path d="M16 9v6M20 9v6" />
      {:else}
        <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
      {/if}
    </svg>
    {speaking ? copy.stop : copy.listen}
  </button>
{/if}
