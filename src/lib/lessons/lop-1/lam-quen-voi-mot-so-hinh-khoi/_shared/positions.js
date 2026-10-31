/**
 * Two picture scenes for the words of position: a room (trên, dưới, bên
 * trái, bên phải, ở giữa) and a queue walking to a door (trước, sau, ở giữa,
 * đầu hàng, cuối hàng). Each scene has empty places a moving picture can
 * take; each place lists the position phrases that are true there, so a
 * command may fit more than one place and a question has exactly one true
 * option. Left and right are as the child sees the picture. Pure and
 * DOM-free.
 */
import { pick, shuffle } from '#lib/core/drill.js';

/** @typedef {'phong' | 'hang'} SceneId */
/**
 * @typedef {object} Place
 * @property {string} id
 * @property {number} x left edge on the 400 × 240 canvas
 * @property {number} y top edge
 * @property {number} size width and height of the place
 * @property {string[]} truths ids of the phrases that name this place; a
 *   question about the place asks for one of them
 * @property {string[]} [also] ids of phrases that are also true here but do
 *   not name the place well, such as "ở bên phải cái tủ" for a ball on the
 *   table: a command with one accepts the place, and a question never offers
 *   one as a wrong option
 */
/**
 * @typedef {object} Scene
 * @property {SceneId} id
 * @property {string} title
 * @property {import('#lib/core/kid/pictures/index.js').PictureName} mover the picture the child moves
 * @property {string} moverName its noun, such as "quả bóng"
 * @property {Place[]} places
 * @property {Record<string, string>} phrases phrase id → words, such as "ở dưới cái bàn"
 */

/** Canvas of both scenes. */
export const SCENE_W = 400;
export const SCENE_H = 240;
/** Floor line of the room and of the queue. */
export const FLOOR = 206;

/** @type {Record<SceneId, Scene>} */
export const SCENES = {
  phong: {
    id: 'phong',
    title: 'Căn phòng',
    mover: 'ball',
    moverName: 'quả bóng',
    places: [
      {
        id: 'tren-tu',
        x: 13,
        y: 24,
        size: 60,
        truths: ['tren-tu'],
        also: ['trai-ban', 'trai-cay'],
      },
      {
        id: 'canh-tu',
        x: 86,
        y: 146,
        size: 60,
        truths: ['trai-ban', 'phai-tu', 'giua-tu-ban'],
        also: ['trai-cay'],
      },
      {
        id: 'tren-ban',
        x: 186,
        y: 66,
        size: 60,
        truths: ['tren-ban'],
        also: ['phai-tu', 'trai-cay'],
      },
      {
        id: 'duoi-ban',
        x: 186,
        y: 146,
        size: 60,
        truths: ['duoi-ban'],
        also: ['phai-tu', 'trai-cay'],
      },
      {
        id: 'canh-cay',
        x: 286,
        y: 146,
        size: 60,
        truths: ['phai-ban', 'trai-cay', 'giua-ban-cay'],
        also: ['phai-tu'],
      },
    ],
    phrases: {
      'tren-tu': 'ở trên cái tủ',
      'tren-ban': 'ở trên cái bàn',
      'duoi-ban': 'ở dưới cái bàn',
      'trai-ban': 'ở bên trái cái bàn',
      'phai-ban': 'ở bên phải cái bàn',
      'phai-tu': 'ở bên phải cái tủ',
      'trai-cay': 'ở bên trái chậu cây',
      'giua-tu-ban': 'ở giữa cái tủ và cái bàn',
      'giua-ban-cay': 'ở giữa cái bàn và chậu cây',
    },
  },
  hang: {
    id: 'hang',
    title: 'Xếp hàng',
    mover: 'chick',
    moverName: 'gà con',
    places: [
      { id: 'cho-1', x: 56, y: 146, size: 60, truths: ['dau-hang', 'truoc-tho', 'truoc-meo'] },
      { id: 'cho-3', x: 192, y: 146, size: 60, truths: ['sau-tho', 'truoc-meo', 'giua-tho-meo'] },
      { id: 'cho-5', x: 328, y: 146, size: 60, truths: ['cuoi-hang', 'sau-tho', 'sau-meo'] },
    ],
    phrases: {
      'dau-hang': 'đứng đầu hàng',
      'cuoi-hang': 'đứng cuối hàng',
      'truoc-tho': 'đứng trước con thỏ',
      'truoc-meo': 'đứng trước con mèo',
      'sau-tho': 'đứng sau con thỏ',
      'sau-meo': 'đứng sau con mèo',
      'giua-tho-meo': 'đứng giữa con thỏ và con mèo',
    },
  },
};

/** The two animals already standing in the queue, door on the left; `x` is the left edge of a 60-wide spot. */
export const QUEUE = /** @type {const} */ ([
  { picture: 'rabbit', name: 'con thỏ', x: 124 },
  { picture: 'cat', name: 'con mèo', x: 260 },
]);

/** What each place of a scene is, for screen readers. */
export const PLACE_NAMES = /** @type {Record<string, string>} */ ({
  'tren-tu': 'chỗ trên cái tủ',
  'canh-tu': 'chỗ giữa cái tủ và cái bàn',
  'tren-ban': 'chỗ trên cái bàn',
  'duoi-ban': 'chỗ dưới cái bàn',
  'canh-cay': 'chỗ giữa cái bàn và chậu cây',
  'cho-1': 'chỗ đầu hàng, trước con thỏ',
  'cho-3': 'chỗ giữa con thỏ và con mèo',
  'cho-5': 'chỗ cuối hàng, sau con mèo',
});

/**
 * The place with this id.
 * @param {Scene} scene
 * @param {string} id
 */
export function placeOf(scene, id) {
  const p = scene.places.find((q) => q.id === id);
  if (!p) throw new Error(`no place ${id}`);
  return p;
}

/**
 * True when the phrase is true at the place, as a name of it or as one of
 * its other true phrases.
 * @param {Scene} scene
 * @param {string} placeId
 * @param {string} phraseId
 */
export function fits(scene, placeId, phraseId) {
  const place = placeOf(scene, placeId);
  return place.truths.includes(phraseId) || (place.also ?? []).includes(phraseId);
}

/**
 * A new command phrase, different from the previous one.
 * @param {Scene} scene
 * @param {string | null} previous
 * @param {() => number} rand
 */
export function nextCommand(scene, previous, rand) {
  return pick(
    rand,
    Object.keys(scene.phrases).filter((id) => id !== previous),
  );
}

/**
 * "Đặt quả bóng ở dưới cái bàn." / "Cho gà con đứng sau con mèo."
 * @param {Scene} scene
 * @param {string} phraseId
 */
export function commandText(scene, phraseId) {
  const verb = scene.id === 'hang' ? 'Cho' : 'Đặt';
  return `${verb} ${scene.moverName} ${scene.phrases[phraseId]}.`;
}

/**
 * Feedback after the child put the picture at a place for a command.
 * @param {Scene} scene
 * @param {string} placeId
 * @param {string} phraseId
 */
export function placeMessage(scene, placeId, phraseId) {
  const noun = scene.moverName[0].toUpperCase() + scene.moverName.slice(1);
  const now = scene.phrases[placeOf(scene, placeId).truths[0]];
  if (fits(scene, placeId, phraseId)) {
    return `Đúng rồi! ${noun} ${scene.phrases[phraseId]}.`;
  }
  return `Chưa đúng. ${noun} đang ${now}. Em tìm chỗ ${scene.phrases[phraseId]} nhé.`;
}

/**
 * A question "Where is the picture?": the picture stands at a place and the
 * child picks the one true phrase among three.
 * @param {Scene} scene
 * @param {() => number} rand
 * @param {string | null} [previousPlace]
 * @returns {{ place: string, options: string[], answer: number }}
 */
export function askQuestion(scene, rand, previousPlace = null) {
  const pool = scene.places.filter((p) => p.id !== previousPlace);
  const place = pick(rand, pool.length ? pool : scene.places);
  const right = pick(rand, place.truths);
  const wrong = shuffle(
    rand,
    Object.keys(scene.phrases).filter((id) => !fits(scene, place.id, id)),
  ).slice(0, 2);
  const options = shuffle(rand, [right, ...wrong]);
  return { place: place.id, options, answer: options.indexOf(right) };
}
