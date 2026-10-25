/**
 * A small scientific-calculator model in the style of the fx-580VN X used in
 * the lesson: key presses build an expression, `=` evaluates it, SHIFT and
 * ALPHA reach the second functions (x³, the comma, FACT, GCD, LCM).
 * Everything here is pure, so the widget only renders the state.
 */

/**
 * Keys on the simulated keypad. Each has its main label and, where the
 * lesson uses it, the SHIFT or ALPHA function printed above it.
 * @typedef {{ id: string, label: string, shift?: string, alpha?: string }} Key
 */

/** @type {Key[]} */
export const KEYS = [
  { id: 'shift', label: 'SHIFT' },
  { id: 'alpha', label: 'ALPHA' },
  { id: 'sq', label: 'x²', shift: 'x³' },
  { id: 'pow', label: 'x^■' },
  { id: 'fact', label: '°′″', shift: 'FACT' },
  { id: '7', label: '7' },
  { id: '8', label: '8' },
  { id: '9', label: '9' },
  { id: 'del', label: 'DEL' },
  { id: 'ac', label: 'AC' },
  { id: '4', label: '4' },
  { id: '5', label: '5' },
  { id: '6', label: '6' },
  { id: 'mul', label: '×', alpha: 'GCD' },
  { id: 'div', label: '÷', alpha: 'LCM' },
  { id: '1', label: '1' },
  { id: '2', label: '2' },
  { id: '3', label: '3' },
  { id: 'add', label: '+' },
  { id: 'sub', label: '−' },
  { id: '0', label: '0' },
  { id: 'lpar', label: '(' },
  { id: 'rpar', label: ')', shift: ',' },
  { id: 'ans', label: 'Ans' },
  { id: 'eq', label: '=' },
];

/** @param {string} id */
export function keyById(id) {
  const k = KEYS.find((x) => x.id === id);
  if (!k) throw new Error(`unknown key ${id}`);
  return k;
}

/**
 * Tokens of the expression line. Digits are single characters; the others
 * are operator or function tokens.
 * @typedef {string} Token
 */

/**
 * @typedef {object} CalcState
 * @property {Token[]} tokens expression being typed
 * @property {boolean} shift SHIFT is armed
 * @property {boolean} alpha ALPHA is armed
 * @property {number | null} ans last result
 * @property {string} screen result line ('' while typing)
 * @property {boolean} evaluated the line holds a finished calculation
 * @property {string} note short message about the last key, for learners
 */

/** @returns {CalcState} */
export function initialState() {
  return {
    tokens: [],
    shift: false,
    alpha: false,
    ans: null,
    screen: '',
    evaluated: false,
    note: '',
  };
}

const TOKEN_TEXT = /** @type {Record<string, string>} */ ({
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
  '(': '(',
  ')': ')',
  ',': ',',
  sq: '²',
  cube: '³',
  '^': '^',
  'GCD(': 'GCD(',
  'LCM(': 'LCM(',
  Ans: 'Ans',
});

/**
 * The expression line as the calculator shows it.
 * @param {Token[]} tokens
 */
export function displayTokens(tokens) {
  return tokens.map((t) => (/^\d$/.test(t) ? t : (TOKEN_TEXT[t] ?? t))).join('');
}

/**
 * Prime factorisation of a natural number ≥ 2, as [prime, exponent] pairs.
 * @param {number} n
 * @returns {Array<[number, number]>}
 */
export function factorize(n) {
  /** @type {Array<[number, number]>} */
  const out = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    let e = 0;
    while (m % p === 0) {
      m /= p;
      e++;
    }
    if (e > 0) out.push([p, e]);
  }
  if (m > 1) out.push([m, 1]);
  return out;
}

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';

/**
 * '7 × 11²' for 847.
 * @param {number} n
 */
export function factorText(n) {
  return factorize(n)
    .map(([p, e]) =>
      e === 1
        ? String(p)
        : `${p}${String(e)
            .split('')
            .map((d) => SUP[Number(d)])
            .join('')}`,
    )
    .join(' × ');
}

/** @param {number} a @param {number} b */
export function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) [x, y] = [y, x % y];
  return x;
}

/** @param {number} a @param {number} b */
export function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

class CalcError extends Error {
  /** @param {'Syntax ERROR' | 'Math ERROR'} kind */
  constructor(kind) {
    super(kind);
    this.kind = kind;
  }
}

/**
 * Evaluates the token list. Missing closing brackets at the end are added,
 * as on the real calculator. A number or `)` followed by `(`, a function or
 * Ans multiplies implicitly: 2(5 + 7) = 24.
 * @param {Token[]} tokens
 * @param {number | null} ans
 * @returns {number}
 */
export function evaluate(tokens, ans = null) {
  /** @type {Array<string | number>} */
  const lex = [];
  let inNumber = false;
  for (const t of tokens) {
    if (/^\d$/.test(t)) {
      const last = lex[lex.length - 1];
      if (inNumber && typeof last === 'number') lex[lex.length - 1] = last * 10 + Number(t);
      else lex.push(Number(t));
      inNumber = true;
    } else {
      lex.push(t);
      inNumber = false;
    }
  }
  let i = 0;
  const peek = () => lex[i];
  const next = () => lex[i++];
  /** @param {string} t */
  const expect = (t) => {
    if (peek() === t) i++;
    else if (peek() === undefined && t === ')') {
      /* closing bracket left off at the end */
    } else throw new CalcError('Syntax ERROR');
  };
  /** @param {unknown} t */
  const startsPrimary = (t) =>
    typeof t === 'number' || t === '(' || t === 'GCD(' || t === 'LCM(' || t === 'Ans';

  /** @returns {number} */
  function expr() {
    let v = term();
    while (peek() === '+' || peek() === '-') {
      const op = next();
      const r = term();
      v = op === '+' ? v + r : v - r;
    }
    return v;
  }

  /** @returns {number} */
  function term() {
    let v = unary();
    for (;;) {
      const t = peek();
      if (t === '*' || t === '/') {
        next();
        const r = unary();
        if (t === '/' && r === 0) throw new CalcError('Math ERROR');
        v = t === '*' ? v * r : v / r;
      } else if (startsPrimary(t)) {
        v *= unary();
      } else return v;
    }
  }

  /** @returns {number} */
  function unary() {
    if (peek() === '-') {
      next();
      return -unary();
    }
    if (peek() === '+') {
      next();
      return unary();
    }
    return power();
  }

  /** @returns {number} */
  function power() {
    const base = postfix();
    if (peek() === '^') {
      next();
      const e = unary();
      const v = base ** e;
      if (!Number.isFinite(v)) throw new CalcError('Math ERROR');
      return v;
    }
    return base;
  }

  /** @returns {number} */
  function postfix() {
    let v = primary();
    while (peek() === 'sq' || peek() === 'cube') v = next() === 'sq' ? v * v : v * v * v;
    return v;
  }

  /** @returns {number} */
  function primary() {
    const t = next();
    if (typeof t === 'number') return t;
    if (t === 'Ans') {
      if (ans === null) return 0;
      return ans;
    }
    if (t === '(') {
      const v = expr();
      expect(')');
      return v;
    }
    if (t === 'GCD(' || t === 'LCM(') {
      const x = expr();
      expect(',');
      const y = expr();
      expect(')');
      if (!Number.isInteger(x) || !Number.isInteger(y)) throw new CalcError('Math ERROR');
      return t === 'GCD(' ? gcd(x, y) : lcm(x, y);
    }
    throw new CalcError('Syntax ERROR');
  }

  if (lex.length === 0) throw new CalcError('Syntax ERROR');
  const v = expr();
  if (i < lex.length) throw new CalcError('Syntax ERROR');
  if (!Number.isFinite(v)) throw new CalcError('Math ERROR');
  return v;
}

/**
 * The result line: an integer in full, otherwise up to 9 decimals with a
 * decimal comma.
 * @param {number} v
 */
export function formatResult(v) {
  if (Number.isInteger(v)) return v < 0 ? `−${-v}` : String(v);
  const fixed = Math.abs(v).toFixed(9).replace(/0+$/, '').replace('.', ',');
  return v < 0 ? `−${fixed}` : fixed;
}

const PLAIN = /** @type {Record<string, Token>} */ ({
  add: '+',
  sub: '-',
  mul: '*',
  div: '/',
  lpar: '(',
  rpar: ')',
  sq: 'sq',
  pow: '^',
  ans: 'Ans',
});

/** Tokens that continue a finished result instead of starting over. */
const CONTINUES = new Set(['+', '-', '*', '/', 'sq', 'cube', '^']);

/**
 * The calculator after pressing `key`.
 * @param {CalcState} s
 * @param {string} key
 * @returns {CalcState}
 */
export function press(s, key) {
  if (key === 'shift') return { ...s, shift: !s.shift, alpha: false, note: '' };
  if (key === 'alpha') return { ...s, alpha: !s.alpha, shift: false, note: '' };
  const base = { ...s, shift: false, alpha: false, note: '' };

  if (key === 'ac') return { ...initialState(), ans: s.ans };
  if (key === 'del') {
    if (s.evaluated) return { ...base, evaluated: false, screen: '' };
    return { ...base, tokens: s.tokens.slice(0, -1), screen: '' };
  }

  if (key === 'eq') {
    if (s.tokens.length === 0) return base;
    try {
      const v = evaluate(s.tokens, s.ans);
      return { ...base, ans: v, screen: formatResult(v), evaluated: true };
    } catch (e) {
      const kind = e instanceof CalcError ? e.kind : 'Syntax ERROR';
      return { ...base, screen: kind, evaluated: true, note: errorNote(kind) };
    }
  }

  if (key === 'fact') {
    if (!s.shift) {
      return {
        ...base,
        note: 'Phím °′″ dùng cho độ, phút, giây; bài này chỉ dùng FACT (SHIFT rồi phím này).',
      };
    }
    if (!s.evaluated || s.ans === null || !Number.isInteger(s.ans) || s.ans < 2) {
      return {
        ...base,
        note: 'FACT phân tích kết quả vừa tính: nhập số, bấm = rồi mới bấm SHIFT FACT.',
      };
    }
    return { ...base, screen: factorText(s.ans), evaluated: true };
  }

  /** @type {Token | null} */
  let token;
  if (s.shift && key === 'sq') token = 'cube';
  else if (s.shift && key === 'rpar') token = ',';
  else if (s.alpha && key === 'mul') token = 'GCD(';
  else if (s.alpha && key === 'div') token = 'LCM(';
  else if (/^\d$/.test(key)) token = key;
  else token = PLAIN[key] ?? null;
  if (token === null) return base;

  if (s.evaluated) {
    const carry = CONTINUES.has(token) && s.ans !== null && !s.screen.endsWith('ERROR');
    return {
      ...base,
      tokens: carry ? ['Ans', token] : [token],
      screen: '',
      evaluated: false,
    };
  }
  return { ...base, tokens: [...s.tokens, token] };
}

/** @param {'Syntax ERROR' | 'Math ERROR'} kind */
function errorNote(kind) {
  return kind === 'Math ERROR'
    ? 'Math ERROR: phép tính không thực hiện được (ví dụ chia cho 0). Bấm AC rồi nhập lại.'
    : 'Syntax ERROR: biểu thức viết sai (thiếu số, thừa dấu hoặc sai dấu ngoặc). Bấm DEL hoặc AC để sửa.';
}

/**
 * Runs a whole key sequence from a cleared calculator.
 * @param {string[]} keys
 */
export function run(keys) {
  return keys.reduce(press, initialState());
}

/**
 * @typedef {object} Task
 * @property {string} id
 * @property {string} title what to compute, plain text
 * @property {string[]} keys the key ids to press, in order
 * @property {string} result what the screen shows at the end
 * @property {string} explain what the result means
 */

/** Guided tasks: the book's calculator exercises and two warm-ups. */
/** @type {Task[]} */
export const TASKS = [
  {
    id: 'bieu-thuc',
    title: '2 · [3 · 5² − 2 · (5 + 7)] + 3³',
    keys: [
      '2',
      'lpar',
      '3',
      'mul',
      '5',
      'sq',
      'sub',
      '2',
      'lpar',
      '5',
      'add',
      '7',
      'rpar',
      'rpar',
      'add',
      '3',
      'shift',
      'sq',
      'eq',
    ],
    result: '129',
    explain:
      'Máy chỉ có dấu ngoặc tròn, nên ngoặc vuông cũng nhập bằng ( ). Lập phương 3³ nhập bằng SHIFT x². Kết quả 129.',
  },
  {
    id: 'luy-thua',
    title: '2¹⁰',
    keys: ['2', 'pow', '1', '0', 'eq'],
    result: '1024',
    explain: 'Phím x^■ nhập số mũ bất kì: 2¹⁰ = 1024.',
  },
  {
    id: 'phan-tich',
    title: 'Phân tích 847 ra thừa số nguyên tố',
    keys: ['8', '4', '7', 'eq', 'shift', 'fact'],
    result: '7 × 11²',
    explain: 'Nhập số, bấm = rồi bấm SHIFT FACT: 847 = 7 · 11².',
  },
  {
    id: 'ucln',
    title: 'ƯCLN(215, 75)',
    keys: ['alpha', 'mul', '2', '1', '5', 'shift', 'rpar', '7', '5', 'rpar', 'eq'],
    result: '5',
    explain: 'ALPHA × mở hàm GCD, SHIFT ) là dấu phẩy ngăn hai số: ƯCLN(215, 75) = 5.',
  },
  {
    id: 'bcnn',
    title: 'BCNN(45, 72)',
    keys: ['alpha', 'div', '4', '5', 'shift', 'rpar', '7', '2', 'rpar', 'eq'],
    result: '360',
    explain: 'ALPHA ÷ mở hàm LCM: BCNN(45, 72) = 360.',
  },
  {
    id: 'nguyen-to',
    title: '14 791 là số nguyên tố hay hợp số?',
    keys: ['1', '4', '7', '9', '1', 'eq', 'shift', 'fact'],
    result: '7 × 2113',
    explain:
      'Máy phân tích 14 791 = 7 · 2113, nên ngoài 1 và chính nó, 14 791 còn chia hết cho 7: đó là hợp số.',
  },
];
