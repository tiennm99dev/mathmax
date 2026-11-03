/**
 * A pretend measuring room: for each thing the child picks the right tool, the
 * right unit, then reads the tool. A pick that is right the first time earns a
 * star. Pure and DOM-free.
 */
import { pick, rng, shuffle } from '#lib/core/drill.js';
import { degText, gramText, mlText, mmText, sortedOptions } from '../_shared/measure.js';

/** @typedef {'ruler' | 'scale' | 'cylinder' | 'thermometer'} ToolId */

/**
 * A measuring tool, the unit it reads in, and how a reading is written and
 * how far a wrong reading is off.
 * @typedef {{ id: ToolId, name: string, icon: string, unit: string, unitName: string, use: string, write: (n: number) => string, slips: number[] }} Tool
 */

/** @type {readonly Tool[]} */
export const TOOLS = [
  {
    id: 'ruler',
    name: 'Thước kẻ',
    icon: '📏',
    unit: 'mm',
    unitName: 'mi-li-mét',
    use: 'Thước kẻ đo độ dài.',
    write: mmText,
    slips: [1, -1, 10],
  },
  {
    id: 'scale',
    name: 'Cân đồng hồ',
    icon: '⚖️',
    unit: 'g',
    unitName: 'gam',
    use: 'Cân đo khối lượng.',
    write: gramText,
    slips: [50, -50, 100],
  },
  {
    id: 'cylinder',
    name: 'Ống đong',
    icon: '🧪',
    unit: 'ml',
    unitName: 'mi-li-lít',
    use: 'Ống đong đo dung tích.',
    write: mlText,
    slips: [50, -50, 100],
  },
  {
    id: 'thermometer',
    name: 'Nhiệt kế',
    icon: '🌡️',
    unit: '°C',
    unitName: 'độ C',
    use: 'Nhiệt kế đo nhiệt độ.',
    write: degText,
    slips: [1, -1, 10],
  },
];

/**
 * What to measure, the tool that does it and the value it reads.
 * @typedef {{ tool: ToolId, what: string, value: number }} Item
 */

/** @type {readonly Item[]} */
export const ITEMS = [
  { tool: 'ruler', what: 'chiều dài chiếc kẹp giấy', value: 28 },
  { tool: 'ruler', what: 'chiều dài cục tẩy', value: 25 },
  { tool: 'ruler', what: 'chiều dài hạt đậu', value: 12 },
  { tool: 'ruler', what: 'bề dày quyển vở', value: 8 },
  { tool: 'scale', what: 'khối lượng quả táo', value: 150 },
  { tool: 'scale', what: 'khối lượng quả cam', value: 200 },
  { tool: 'scale', what: 'khối lượng gói bánh', value: 350 },
  { tool: 'scale', what: 'khối lượng túi đường', value: 500 },
  { tool: 'cylinder', what: 'lượng nước trong cốc', value: 200 },
  { tool: 'cylinder', what: 'lượng nước trong chai nhỏ', value: 500 },
  { tool: 'cylinder', what: 'lượng dầu ăn trong lọ', value: 350 },
  { tool: 'cylinder', what: 'lượng sữa trong ly', value: 250 },
  { tool: 'thermometer', what: 'nhiệt độ không khí trong phòng', value: 28 },
  { tool: 'thermometer', what: 'nhiệt độ cơ thể người khoẻ mạnh', value: 37 },
  { tool: 'thermometer', what: 'nhiệt độ không khí trưa hè', value: 36 },
  { tool: 'thermometer', what: 'nhiệt độ cốc nước đá', value: 0 },
];

/** Rounds in one game: one for each tool. */
export const ROUNDS = TOOLS.length;

/**
 * The tool with that id.
 * @param {ToolId} id
 */
export function toolOf(id) {
  return /** @type {Tool} */ (TOOLS.find((t) => t.id === id));
}

/**
 * One item per tool, in a shuffled order.
 * @param {number} seed
 * @returns {Item[]}
 */
export function makeGame(seed) {
  const rand = rng(seed);
  return shuffle(rand, TOOLS).map((tool) =>
    pick(
      rand,
      ITEMS.filter((item) => item.tool === tool.id),
    ),
  );
}

/**
 * The readings to choose from for an item.
 * @param {Item} item
 */
export function readOptions(item) {
  const tool = toolOf(item.tool);
  return sortedOptions(
    tool.write,
    item.value,
    tool.slips.map((d) => item.value + d),
  );
}

/**
 * The sentence for a wrong pick of tool or unit, or a wrong reading.
 * @param {'tool' | 'unit' | 'read'} step
 * @param {Item} item
 */
export function slipMessage(step, item) {
  const tool = toolOf(item.tool);
  if (step === 'tool') {
    return `Chưa đúng. Em cần đo ${item.what}. Em nghĩ xem dụng cụ nào đo được nhé.`;
  }
  if (step === 'unit') return `Chưa đúng. ${tool.use} Em chọn đơn vị khác nhé.`;
  return 'Chưa đúng. Em nhìn lại vạch trên dụng cụ rồi đọc lần nữa.';
}

/**
 * The sentence when a step is passed.
 * @param {'tool' | 'unit' | 'read'} step
 * @param {Item} item
 */
export function stepMessage(step, item) {
  const tool = toolOf(item.tool);
  if (step === 'tool') return `Đúng rồi! ${tool.use} Bây giờ em chọn đơn vị đo.`;
  if (step === 'unit') {
    return `Đúng rồi! Em đo bằng ${tool.unitName}, viết là ${tool.unit}. Bây giờ em đọc dụng cụ.`;
  }
  return `Đúng rồi! ${item.what.charAt(0).toUpperCase()}${item.what.slice(1)} là ${tool.write(item.value)}.`;
}

/**
 * The end sentence.
 * @param {number} stars
 */
export function gameSummary(stars) {
  const most = ROUNDS * 3;
  return stars === most
    ? `Tuyệt vời! Em được cả ${most} sao: em chọn đúng dụng cụ, đơn vị và đọc đúng số đo.`
    : `Em được ${stars} trong ${most} sao. Em chơi lại để chọn đúng ngay từ lần đầu nhé.`;
}
