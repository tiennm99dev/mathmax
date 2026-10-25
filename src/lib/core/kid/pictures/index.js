/**
 * Names of the inline SVG pictures that kid exercises can count, with the
 * Vietnamese noun used in labels. `picture.svelte` draws each one.
 */
export const pictures = /** @type {const} */ ({
  apple: 'quả táo',
  star: 'ngôi sao',
  fish: 'con cá',
  flower: 'bông hoa',
  coin: 'đồng xu',
  block: 'khối vuông',
});

/** @typedef {keyof typeof pictures} PictureName */

/**
 * @param {unknown} name
 * @returns {name is PictureName}
 */
export function isPictureName(name) {
  return typeof name === 'string' && Object.hasOwn(pictures, name);
}
