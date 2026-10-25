/**
 * Arithmetic behind the spending planner: each expense as a percentage of
 * the total spent, the three spending groups of the book, and how much of
 * the income is left to save. Amounts are whole numbers of đồng.
 */

/** The three spending groups the book sorts expenses into. */
export const GROUPS = /** @type {const} */ ([
  { value: 'thiet-yeu', label: 'Chi cố định thiết yếu', short: 'Thiết yếu', color: '#2563EB' },
  {
    value: 'linh-hoat',
    label: 'Chi cần thiết nhưng linh hoạt',
    short: 'Linh hoạt',
    color: '#16A34A',
  },
  { value: 'phat-sinh', label: 'Chi phát sinh', short: 'Phát sinh', color: '#EA580C' },
]);

/** @typedef {(typeof GROUPS)[number]['value']} Group */
/** @typedef {{ id: number, label: string, amount: number, group: Group }} Item */

/**
 * Share of `part` in `whole`, in percent: (part / whole) · 100. Zero when
 * nothing was spent.
 * @param {number} part
 * @param {number} whole
 */
export function percentOf(part, whole) {
  return whole > 0 ? (part / whole) * 100 : 0;
}

/**
 * Rounds to `decimals` places, half away from zero, without the binary
 * drift of `Math.round(x * 100) / 100` on values such as 1.005.
 * @param {number} x
 * @param {number} [decimals]
 */
export function roundTo(x, decimals = 0) {
  return Number(`${Math.round(Number(`${x}e${decimals}`))}e-${decimals}`);
}

/**
 * Rounds an amount of money to the nearest `step` đồng (10 000 by default,
 * "làm tròn đến hàng chục nghìn").
 * @param {number} amount
 * @param {number} [step]
 */
export function roundMoney(amount, step = 10000) {
  return Math.round(amount / step) * step;
}

/**
 * The analysis table: every item with its share of the total, the three
 * groups with their amounts and shares, and the balance against `income`.
 * @param {Item[]} items
 * @param {number} income money available for the period
 */
export function budgetReport(items, income) {
  const total = items.reduce((s, it) => s + it.amount, 0);
  const rows = items.map((it) => ({ ...it, percent: percentOf(it.amount, total) }));
  const groups = GROUPS.map((g) => {
    const amount = items.filter((it) => it.group === g.value).reduce((s, it) => s + it.amount, 0);
    return { ...g, amount, percent: percentOf(amount, total) };
  });
  const balance = income - total;
  return {
    total,
    rows,
    groups,
    balance,
    /** share of the income spent, in percent */
    spentOfIncome: percentOf(total, income),
  };
}

/**
 * One sentence on the balance between income and spending.
 * @param {number} total
 * @param {number} income
 * @param {(n: number) => string} money formats an amount of đồng
 * @param {(n: number) => string} pct formats a percentage
 */
export function balanceVerdict(total, income, money, pct) {
  if (income <= 0) return 'Hãy nhập số tiền có thể chi (thu nhập) để so sánh.';
  if (total > income) {
    return `Chi vượt thu ${money(total - income)} đồng. Cần bớt các khoản linh hoạt hoặc phát sinh.`;
  }
  if (total === income) return 'Chi vừa hết số tiền có, không còn dư để tiết kiệm.';
  const left = income - total;
  return `Còn dư ${money(left)} đồng, bằng ${pct(percentOf(left, income))}% số tiền có: có thể để dành tiết kiệm.`;
}

/**
 * Compares each group's share with a target split (in percent), such as
 * 50 % – 40 % – 10 % agreed on by a group of students.
 * @param {Array<{ short: string, percent: number }>} groups
 * @param {number[]} target
 * @param {number} [slack] percentage points allowed either way
 */
export function compareWithTarget(groups, target, slack = 5) {
  return groups.map((g, i) => {
    const diff = g.percent - target[i];
    return {
      short: g.short,
      diff,
      status: Math.abs(diff) <= slack ? 'ok' : diff > 0 ? 'over' : 'under',
    };
  });
}

/** @type {Array<{ value: string, label: string, period: string, income: number, items: Item[] }>} */
export const PRESETS = [
  {
    value: 'anh-binh',
    label: 'Anh Bình (một tháng)',
    period: 'tháng',
    income: 3000000,
    items: [
      { id: 1, label: 'Thuê nhà', amount: 700000, group: 'thiet-yeu' },
      { id: 2, label: 'Điện, nước', amount: 100000, group: 'thiet-yeu' },
      { id: 3, label: 'Ăn uống', amount: 1200000, group: 'thiet-yeu' },
      { id: 4, label: 'Đi lại', amount: 200000, group: 'linh-hoat' },
      { id: 5, label: 'Điện thoại, Internet', amount: 150000, group: 'thiet-yeu' },
      { id: 6, label: 'Sách vở, giấy bút', amount: 100000, group: 'linh-hoat' },
      { id: 7, label: 'Vật dụng hằng ngày', amount: 250000, group: 'linh-hoat' },
      { id: 8, label: 'Giải trí, mua sắm, sức khoẻ', amount: 200000, group: 'linh-hoat' },
      { id: 9, label: 'Dự phòng, tiết kiệm', amount: 100000, group: 'linh-hoat' },
    ],
  },
  {
    value: 'gia-dinh',
    label: 'Gia đình (một tuần)',
    period: 'tuần',
    income: 6000000,
    items: [
      { id: 1, label: 'Đi chợ, ăn uống', amount: 1800000, group: 'thiet-yeu' },
      { id: 2, label: 'Điện, nước (phần một tuần)', amount: 400000, group: 'thiet-yeu' },
      { id: 3, label: 'Tiền học của con', amount: 700000, group: 'thiet-yeu' },
      { id: 4, label: 'Xăng xe, đi lại', amount: 500000, group: 'linh-hoat' },
      { id: 5, label: 'Mua sắm đồ dùng', amount: 700000, group: 'linh-hoat' },
      { id: 6, label: 'Giải trí', amount: 300000, group: 'linh-hoat' },
      { id: 7, label: 'Dự phòng', amount: 600000, group: 'linh-hoat' },
      { id: 8, label: 'Mừng sinh nhật, đi cỗ', amount: 500000, group: 'phat-sinh' },
    ],
  },
];
