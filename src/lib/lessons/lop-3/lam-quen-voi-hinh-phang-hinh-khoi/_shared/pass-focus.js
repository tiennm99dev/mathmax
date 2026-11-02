import { tick } from 'svelte';

/**
 * A button that a press has just disabled drops keyboard focus to the page, so
 * hand it to the given element once the page has updated.
 * @param {HTMLButtonElement | undefined} from
 * @param {HTMLElement | SVGElement | null | undefined} to
 */
export async function passFocus(from, to) {
  await tick();
  if (from?.disabled) to?.focus();
}
