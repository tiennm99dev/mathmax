/**
 * A tiny spreadsheet for the Excel activity: cells hold data or formulas
 * typed as in Excel (`=COUNTIF($A$2:$A$31;D2)`, `=E2/E5`, `=SUM(E2:E4)`),
 * and the evaluator computes them the way Excel does for this small set of
 * functions: COUNTIF, COUNTA, COUNT and SUM, the four operations and cell
 * references with or without `$`. Copying a formula down a column shifts its
 * relative row numbers, which is why the data range must be written
 * `$A$2:$A$31`.
 */

/** @typedef {string | number | null} Value a cell value; null for an empty cell */
/** @typedef {Record<string, string>} Sheet raw text per address such as 'E2' */

/** Excel error values the evaluator can return. */
export const ERRORS = /** @type {const} */ ({
  value: '#VALUE!',
  name: '#NAME?',
  div0: '#DIV/0!',
  ref: '#REF!',
});

export class SheetError extends Error {
  /** @param {string} code an Excel error value */
  constructor(code) {
    super(code);
    this.code = code;
  }
}

/**
 * Splits an address such as 'B12' into its column letters and row number.
 * @param {string} addr
 * @returns {{ col: string, row: number } | null}
 */
export function splitAddr(addr) {
  const m = /^([A-Z]{1,2})([1-9][0-9]*)$/.exec(addr.toUpperCase());
  return m ? { col: m[1], row: Number(m[2]) } : null;
}

/** @param {string} col */
const colIndex = (col) => [...col].reduce((s, ch) => s * 26 + ch.charCodeAt(0) - 64, 0);

/** @param {number} n */
function colName(n) {
  let s = '';
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

/**
 * Every address of a rectangular range, row by row.
 * @param {string} from
 * @param {string} to
 */
export function rangeAddrs(from, to) {
  const a = splitAddr(from);
  const b = splitAddr(to);
  if (!a || !b) throw new SheetError(ERRORS.ref);
  const [c1, c2] = [colIndex(a.col), colIndex(b.col)].sort((x, y) => x - y);
  const [r1, r2] = [a.row, b.row].sort((x, y) => x - y);
  const out = [];
  for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) out.push(`${colName(c)}${r}`);
  return out;
}

// ------------------------------------------------------------------ tokens

/**
 * @typedef {{ t: 'num', v: number } | { t: 'str', v: string } | { t: 'ref', v: string }
 *   | { t: 'name', v: string } | { t: 'op', v: string }} Token
 */

const REF = /^\$?([A-Za-z]{1,2})\$?([1-9][0-9]*)/;

/**
 * Splits a formula body (without '=') into tokens. `;` and `,` both separate
 * arguments, as in Vietnamese and English Excel.
 * @param {string} text
 * @returns {Token[]}
 */
export function tokenize(text) {
  /** @type {Token[]} */
  const out = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (ch === '"') {
      const end = text.indexOf('"', i + 1);
      if (end < 0) throw new SheetError(ERRORS.value);
      out.push({ t: 'str', v: text.slice(i + 1, end) });
      i = end + 1;
      continue;
    }
    const num = /^[0-9]+(\.[0-9]+)?/.exec(text.slice(i));
    if (num) {
      out.push({ t: 'num', v: Number(num[0]) });
      i += num[0].length;
      continue;
    }
    const rest = text.slice(i);
    const ref = REF.exec(rest);
    if (ref && !/^[A-Za-z(]/.test(rest.slice(ref[0].length))) {
      out.push({ t: 'ref', v: `${ref[1].toUpperCase()}${ref[2]}` });
      i += ref[0].length;
      continue;
    }
    const name = /^[A-Za-z]+/.exec(rest);
    if (name) {
      out.push({ t: 'name', v: name[0].toUpperCase() });
      i += name[0].length;
      continue;
    }
    if ('+-*/():;,'.includes(ch)) {
      out.push({ t: 'op', v: ch === ',' ? ';' : ch });
      i++;
      continue;
    }
    throw new SheetError(ERRORS.name);
  }
  return out;
}

// ------------------------------------------------------------------ evaluation

/**
 * Reads a cell's raw text as a plain value: a number when it looks like one
 * (decimal comma or point), else the text; '' is empty.
 * @param {string | undefined} raw
 * @returns {Value}
 */
export function plainValue(raw) {
  if (raw === undefined || raw.trim() === '') return null;
  const t = raw.trim();
  if (/^-?[0-9]+([.,][0-9]+)?$/.test(t)) return Number(t.replace(',', '.'));
  return t;
}

/**
 * Whether a cell value meets a COUNTIF criterion: a number or text to equal
 * (text ignores case), or text starting with a comparison such as '>=8'.
 * @param {Value} value
 * @param {Value} criterion
 */
export function meets(value, criterion) {
  if (value === null || criterion === null) return false;
  if (typeof criterion === 'number') return value === criterion;
  const m = /^(>=|<=|<>|>|<|=)\s*(.*)$/.exec(criterion.trim());
  const op = m ? m[1] : '=';
  const target = plainValue(m ? m[2] : criterion);
  if (typeof target === 'number') {
    if (typeof value !== 'number') return op === '<>';
    if (op === '=') return value === target;
    if (op === '<>') return value !== target;
    if (op === '>') return value > target;
    if (op === '<') return value < target;
    if (op === '>=') return value >= target;
    return value <= target;
  }
  const same = String(value).trim().toLowerCase() === String(target ?? '').toLowerCase();
  if (op === '=') return same;
  if (op === '<>') return !same;
  return false;
}

/**
 * Evaluates every cell on demand, with a guard against circular references.
 * @param {Sheet} sheet
 */
export function evaluator(sheet) {
  /** @type {Map<string, Value>} */
  const done = new Map();
  /** @type {Set<string>} */
  const busy = new Set();

  /**
   * @param {string} addr
   * @returns {Value}
   */
  function value(addr) {
    const cached = done.get(addr);
    if (cached !== undefined) return cached;
    const raw = sheet[addr];
    if (raw === undefined || !raw.trim().startsWith('=')) {
      const v = plainValue(raw);
      done.set(addr, v);
      return v;
    }
    if (busy.has(addr)) throw new SheetError(ERRORS.ref);
    busy.add(addr);
    /** @type {Value} */
    let v;
    try {
      v = formula(raw.trim().slice(1));
    } catch (e) {
      if (!(e instanceof SheetError)) throw e;
      v = e.code;
    }
    busy.delete(addr);
    done.set(addr, v);
    return v;
  }

  /**
   * @param {string} body
   * @returns {number}
   */
  function formula(body) {
    const tokens = tokenize(body);
    let i = 0;
    const peek = () => tokens[i];
    /** @param {string} op */
    const eat = (op) => {
      const t = tokens[i];
      if (!t || t.t !== 'op' || t.v !== op) throw new SheetError(ERRORS.value);
      i++;
    };

    /** A number from a cell or an operand, as Excel arithmetic reads it. @param {Value} v */
    const num = (v) => {
      if (v === null) return 0;
      if (typeof v === 'number') return v;
      if (v.startsWith('#')) throw new SheetError(v);
      throw new SheetError(ERRORS.value);
    };

    /** A range `A2:A31` or a single cell, as a list of addresses. */
    function refList() {
      const t = peek();
      if (!t || t.t !== 'ref') return null;
      i++;
      const n = peek();
      if (n && n.t === 'op' && n.v === ':') {
        i++;
        const end = peek();
        if (!end || end.t !== 'ref') throw new SheetError(ERRORS.ref);
        i++;
        return rangeAddrs(t.v, end.v);
      }
      return [t.v];
    }

    /** @param {string} name @returns {number} */
    function call(name) {
      eat('(');
      if (name === 'COUNTIF') {
        const range = refList();
        if (!range) throw new SheetError(ERRORS.value);
        eat(';');
        const c = peek();
        /** @type {Value} */
        let criterion;
        if (c && c.t === 'str') {
          criterion = c.v;
          i++;
        } else if (c && c.t === 'ref' && tokens[i + 1]?.v !== ':') {
          criterion = value(c.v);
          i++;
        } else criterion = expr();
        eat(')');
        return range.filter((a) => meets(value(a), criterion)).length;
      }
      if (name === 'SUM' || name === 'COUNTA' || name === 'COUNT') {
        let total = 0;
        for (;;) {
          const save = i;
          const list = refList();
          const t = peek();
          if (list && (!t || t.t !== 'op' || t.v === ';' || t.v === ')')) {
            for (const a of list) {
              const v = value(a);
              if (typeof v === 'string' && v.startsWith('#') && name === 'SUM')
                throw new SheetError(v);
              if (name === 'SUM') total += typeof v === 'number' ? v : 0;
              else if (name === 'COUNT') total += typeof v === 'number' ? 1 : 0;
              else total += v === null ? 0 : 1;
            }
          } else {
            i = save;
            const v = expr();
            total += name === 'SUM' ? v : 1;
          }
          const n = peek();
          if (n && n.t === 'op' && n.v === ';') {
            i++;
            continue;
          }
          break;
        }
        eat(')');
        return total;
      }
      throw new SheetError(ERRORS.name);
    }

    /** @returns {number} */
    function factor() {
      const t = peek();
      if (!t) throw new SheetError(ERRORS.value);
      if (t.t === 'op' && t.v === '-') {
        i++;
        return -factor();
      }
      if (t.t === 'op' && t.v === '+') {
        i++;
        return factor();
      }
      if (t.t === 'op' && t.v === '(') {
        i++;
        const v = expr();
        eat(')');
        return v;
      }
      if (t.t === 'num') {
        i++;
        return t.v;
      }
      if (t.t === 'ref') {
        i++;
        return num(value(t.v));
      }
      if (t.t === 'name') {
        i++;
        return call(t.v);
      }
      throw new SheetError(ERRORS.value);
    }

    /** @returns {number} */
    function term() {
      let v = factor();
      for (;;) {
        const t = peek();
        if (t && t.t === 'op' && (t.v === '*' || t.v === '/')) {
          i++;
          const r = factor();
          if (t.v === '/') {
            if (r === 0) throw new SheetError(ERRORS.div0);
            v /= r;
          } else v *= r;
        } else return v;
      }
    }

    /** @returns {number} */
    function expr() {
      let v = term();
      for (;;) {
        const t = peek();
        if (t && t.t === 'op' && (t.v === '+' || t.v === '-')) {
          i++;
          const r = term();
          v = t.v === '+' ? v + r : v - r;
        } else return v;
      }
    }

    const v = expr();
    if (i !== tokens.length) throw new SheetError(ERRORS.value);
    return v;
  }

  return { value };
}

/**
 * The formula as it reads after copying it `rows` rows down: every row number
 * without a `$` in front moves by `rows`, as when dragging the fill handle.
 * Text in quotes is left alone. Returns null when a reference would go above
 * row 1.
 * @param {string} text
 * @param {number} rows
 * @returns {string | null}
 */
export function shiftFormula(text, rows) {
  if (!text.trim().startsWith('=')) return text;
  let out = '';
  let bad = false;
  const parts = text.split('"');
  for (let k = 0; k < parts.length; k++) {
    if (k % 2 === 1) {
      out += `"${parts[k]}"`;
      continue;
    }
    out += parts[k].replace(
      /(\$?)([A-Za-z]{1,2})(\$?)([1-9][0-9]*)(?![A-Za-z(])/g,
      (whole, d1, col, d2, row, offset, all) => {
        const before = all[offset - 1] ?? '';
        if (/[A-Za-z]/.test(before)) return whole;
        if (d2) return whole;
        const r = Number(row) + rows;
        if (r < 1) bad = true;
        return `${d1}${col}${d2}${r}`;
      },
    );
  }
  return bad ? null : out;
}

// ------------------------------------------------------------------ data sets

/**
 * @typedef {object} DataSet
 * @property {string} id
 * @property {string} label
 * @property {string} header heading of the data column A
 * @property {Array<string | number>} categories the values, in table order
 * @property {Array<string | number>} data one value per surveyed person
 */

/** @type {DataSet[]} */
export const DATASETS = [
  {
    id: 'da-ngoai',
    label: 'Địa điểm dã ngoại',
    header: 'Địa điểm',
    categories: ['Tràng An', 'Ba Vì', 'Đại Lải'],
    data: [
      'Tràng An',
      'Ba Vì',
      'Tràng An',
      'Đại Lải',
      'Tràng An',
      'Ba Vì',
      'Tràng An',
      'Tràng An',
      'Ba Vì',
      'Đại Lải',
      'Tràng An',
      'Ba Vì',
      'Tràng An',
      'Tràng An',
      'Đại Lải',
      'Ba Vì',
      'Tràng An',
      'Ba Vì',
      'Tràng An',
      'Đại Lải',
      'Tràng An',
      'Ba Vì',
      'Tràng An',
      'Ba Vì',
      'Tràng An',
      'Đại Lải',
      'Tràng An',
      'Ba Vì',
      'Tràng An',
      'Ba Vì',
    ],
  },
  {
    id: 'diem',
    label: 'Điểm kiểm tra',
    header: 'Điểm',
    categories: [5, 6, 7, 8, 9, 10],
    data: [
      7, 8, 6, 9, 7, 5, 8, 7, 10, 6, 8, 7, 9, 6, 7, 8, 5, 7, 9, 8, 6, 7, 10, 8, 9, 7, 6, 5, 8, 9,
    ],
  },
];

/** First data row; the data fill column A from here. */
export const FIRST_ROW = 2;

/**
 * Layout of the frequency table next to the data: category names in column
 * D from row 2, frequencies in E, relative frequencies in F, and a total row.
 * @param {DataSet} set
 */
export function layout(set) {
  const k = set.categories.length;
  const last = FIRST_ROW + set.data.length - 1;
  const totalRow = FIRST_ROW + k;
  return {
    k,
    lastDataRow: last,
    totalRow,
    dataRange: `$A$${FIRST_ROW}:$A$${last}`,
    /** @param {number} i category index */
    row: (i) => FIRST_ROW + i,
  };
}

/**
 * The sheet a data set starts with: data in A, headings and categories in D,
 * formula cells E and F empty.
 * @param {DataSet} set
 * @param {Array<string | number>} [data] edited data, same length as set.data
 * @returns {Sheet}
 */
export function baseSheet(set, data = set.data) {
  const { totalRow } = layout(set);
  /** @type {Sheet} */
  const sheet = {
    A1: set.header,
    D1: set.header,
    E1: 'Tần số',
    F1: 'Tần số tương đối',
    [`D${totalRow}`]: 'Tổng',
  };
  data.forEach((v, j) => {
    sheet[`A${FIRST_ROW + j}`] = String(v);
  });
  set.categories.forEach((c, i) => {
    sheet[`D${FIRST_ROW + i}`] = String(c);
  });
  return sheet;
}

/**
 * Formulas of a finished table, as the lesson teaches them.
 * @param {DataSet} set
 * @returns {Sheet}
 */
export function modelFormulas(set) {
  const { k, totalRow, dataRange, row } = layout(set);
  /** @type {Sheet} */
  const out = {};
  for (let i = 0; i < k; i++) {
    out[`E${row(i)}`] = `=COUNTIF(${dataRange};D${row(i)})`;
    out[`F${row(i)}`] = `=E${row(i)}/$E$${totalRow}`;
  }
  out[`E${totalRow}`] = `=SUM(E${FIRST_ROW}:E${totalRow - 1})`;
  out[`F${totalRow}`] = `=SUM(F${FIRST_ROW}:F${totalRow - 1})`;
  return out;
}

/**
 * The values each formula cell should show for the given data: frequencies,
 * relative frequencies (as fractions of 1) and the totals.
 * @param {DataSet} set
 * @param {Array<string | number>} data
 * @returns {Record<string, number>}
 */
export function expectedValues(set, data) {
  const { k, totalRow, row } = layout(set);
  const n = data.length;
  /** @type {Record<string, number>} */
  const out = {};
  for (let i = 0; i < k; i++) {
    const c = set.categories[i];
    const f = data.filter((v) => String(v) === String(c)).length;
    out[`E${row(i)}`] = f;
    out[`F${row(i)}`] = n === 0 ? 0 : f / n;
  }
  out[`E${totalRow}`] = n;
  out[`F${totalRow}`] = 1;
  return out;
}

/**
 * Whether a computed cell value is the expected number.
 * @param {Value} v
 * @param {number} expected
 */
export const matches = (v, expected) => typeof v === 'number' && Math.abs(v - expected) < 1e-9;
