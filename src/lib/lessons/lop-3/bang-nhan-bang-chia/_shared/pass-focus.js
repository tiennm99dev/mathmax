import { tick } from 'svelte';

/**
 * A button that a press has just disabled drops keyboard focus to the page, so
 * hand it to the button beside it once the page has updated.
 * @param {HTMLButtonElement | undefined} from
 * @param {HTMLButtonElement | undefined} to
 */
export async function passFocus(from, to) {
  await tick();
  if (from?.disabled) to?.focus();
}
