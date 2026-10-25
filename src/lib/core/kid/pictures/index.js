/**
 * Names of the inline SVG pictures that kid exercises and visuals can show,
 * with the Vietnamese noun used in labels. Each name has a `<name>.svelte`
 * file beside this one that draws it on a 40 × 40 canvas, and
 * `../picture.svelte` renders any of them by name. No picture fetches an image.
 */
export const pictures = /** @type {const} */ ({
  apple: 'quả táo',
  banana: 'quả chuối',
  orange: 'quả cam',
  strawberry: 'quả dâu tây',
  grapes: 'chùm nho',
  fish: 'con cá',
  cat: 'con mèo',
  chick: 'con gà con',
  rabbit: 'con thỏ',
  butterfly: 'con bướm',
  star: 'ngôi sao',
  flower: 'bông hoa',
  balloon: 'quả bóng bay',
  pencil: 'cây bút chì',
  ball: 'quả bóng',
  coin: 'đồng xu',
  banknote: 'tờ tiền',
  block: 'khối vuông',
  cube: 'khối lập phương',
});

/** @typedef {keyof typeof pictures} PictureName */

/**
 * Pictures grouped by theme, for lessons that pick a theme at random.
 * @type {Readonly<Record<'fruit' | 'animals' | 'things' | 'money' | 'blocks', readonly PictureName[]>>}
 */
export const pictureGroups = {
  fruit: ['apple', 'banana', 'orange', 'strawberry', 'grapes'],
  animals: ['fish', 'cat', 'chick', 'rabbit', 'butterfly'],
  things: ['star', 'flower', 'balloon', 'pencil', 'ball'],
  money: ['coin', 'banknote'],
  blocks: ['block', 'cube'],
};

/**
 * @param {unknown} name
 * @returns {name is PictureName}
 */
export function isPictureName(name) {
  return typeof name === 'string' && Object.hasOwn(pictures, name);
}
