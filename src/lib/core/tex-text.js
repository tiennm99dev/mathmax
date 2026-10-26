/**
 * Accessible text for TeX. Rendered TeX is shown to the eye only; screen
 * readers get a linear Unicode form of the same source instead, such as
 * `√144`, `10×` or `−1`. The browser computes a radio's, button's or
 * textbox label's name from that text, so options that differ only in their
 * formula keep distinct names, and the read-aloud button speaks it too.
 *
 * `texText` turns TeX source into that text; `texHtml` wraps KaTeX markup
 * with it; `htmlText` reads the text back out of rendered rich text, for an
 * `aria-label` that has to name an item.
 */

/** @type {Record<string, string>} */
const SYMBOLS = {
  times: '×',
  cdot: '·',
  div: ':',
  pm: '±',
  mp: '∓',
  le: '≤',
  leq: '≤',
  leqslant: '≤',
  ge: '≥',
  geq: '≥',
  geqslant: '≥',
  ne: '≠',
  neq: '≠',
  lt: '<',
  gt: '>',
  approx: '≈',
  equiv: '≡',
  sim: '∼',
  backsim: '∽',
  cong: '≅',
  infty: '∞',
  in: '∈',
  notin: '∉',
  ni: '∋',
  subset: '⊂',
  subseteq: '⊆',
  supset: '⊃',
  supseteq: '⊇',
  cup: '∪',
  cap: '∩',
  setminus: '∖',
  emptyset: '∅',
  varnothing: '∅',
  forall: '∀',
  exists: '∃',
  neg: '¬',
  land: '∧',
  lor: '∨',
  Rightarrow: '⇒',
  Leftarrow: '⇐',
  Leftrightarrow: '⇔',
  iff: '⇔',
  implies: '⇒',
  rightarrow: '→',
  to: '→',
  leftarrow: '←',
  leftrightarrow: '↔',
  longrightarrow: '⟶',
  rightleftharpoons: '⇌',
  xrightarrow: '→',
  uparrow: '↑',
  downarrow: '↓',
  angle: '∠',
  triangle: '△',
  perp: '⊥',
  parallel: '∥',
  nparallel: '∦',
  circ: '°',
  degree: '°',
  prime: '′',
  ldots: '…',
  dots: '…',
  cdots: '⋯',
  vdots: '⋮',
  mid: '|',
  vert: '|',
  lvert: '|',
  rvert: '|',
  Vert: '‖',
  langle: '⟨',
  rangle: '⟩',
  lfloor: '⌊',
  rfloor: '⌋',
  lceil: '⌈',
  rceil: '⌉',
  colon: ':',
  backslash: '\\',
  sum: '∑',
  prod: '∏',
  int: '∫',
  partial: '∂',
  nabla: '∇',
  alpha: 'α',
  beta: 'β',
  gamma: 'γ',
  delta: 'δ',
  epsilon: 'ε',
  varepsilon: 'ε',
  zeta: 'ζ',
  eta: 'η',
  theta: 'θ',
  vartheta: 'θ',
  iota: 'ι',
  kappa: 'κ',
  lambda: 'λ',
  mu: 'μ',
  nu: 'ν',
  xi: 'ξ',
  pi: 'π',
  rho: 'ρ',
  sigma: 'σ',
  tau: 'τ',
  upsilon: 'υ',
  phi: 'φ',
  varphi: 'φ',
  chi: 'χ',
  psi: 'ψ',
  omega: 'ω',
  Gamma: 'Γ',
  Delta: 'Δ',
  Theta: 'Θ',
  Lambda: 'Λ',
  Xi: 'Ξ',
  Pi: 'Π',
  Sigma: 'Σ',
  Phi: 'Φ',
  Psi: 'Ψ',
  Omega: 'Ω',
  '%': '%',
  $: '$',
  '#': '#',
  '&': '&',
  _: '_',
  '{': '{',
  '}': '}',
  '|': '‖',
  ',': ' ',
  ';': ' ',
  ':': ' ',
  '>': ' ',
  ' ': ' ',
  quad: ' ',
  qquad: ' ',
  enspace: ' ',
  '!': '',
};

/** Commands whose one argument is shown as it is. */
const KEEP_ARG = new Set([
  'mathrm',
  'mathbf',
  'mathit',
  'mathsf',
  'mathtt',
  'boldsymbol',
  'bm',
  'operatorname',
  'boxed',
  'cancel',
  'bcancel',
  'xcancel',
  'underline',
  'underbrace',
  'overbrace',
  'mathop',
  'mathbin',
  'mathrel',
  'mathord',
]);

/** Commands whose one argument is text, read literally. */
const TEXT_ARG = new Set([
  'text',
  'textrm',
  'textbf',
  'textit',
  'textsf',
  'texttt',
  'mbox',
  'textnormal',
]);

/** Commands dropped with no output and no argument. */
const DROP = new Set([
  'left',
  'right',
  'big',
  'Big',
  'bigg',
  'Bigg',
  'bigl',
  'bigr',
  'Bigl',
  'Bigr',
  'biggl',
  'biggr',
  'middle',
  'displaystyle',
  'textstyle',
  'scriptstyle',
  'limits',
  'nolimits',
  'nonumber',
  'notag',
  'hline',
  'strut',
]);

/** Commands dropped together with their one argument. */
const DROP_ARG = new Set(['phantom', 'hphantom', 'vphantom', 'color', 'label', 'tag']);

/** @type {Record<string, string>} */
const BLACKBOARD = { N: 'ℕ', Z: 'ℤ', Q: 'ℚ', R: 'ℝ', C: 'ℂ', P: 'ℙ' };

/** @type {Record<string, string>} */
const ACCENTS = {
  bar: '̄',
  overline: '̅',
  hat: '̂',
  tilde: '̃',
  widetilde: '̃',
  vec: '⃗',
  overrightarrow: '⃗',
  dot: '̇',
  ddot: '̈',
};

const SUPER = /** @type {Record<string, string>} */ ({
  0: '⁰',
  1: '¹',
  2: '²',
  3: '³',
  4: '⁴',
  5: '⁵',
  6: '⁶',
  7: '⁷',
  8: '⁸',
  9: '⁹',
  '+': '⁺',
  '−': '⁻',
  '(': '⁽',
  ')': '⁾',
  n: 'ⁿ',
  i: 'ⁱ',
});

const SUB = /** @type {Record<string, string>} */ ({
  0: '₀',
  1: '₁',
  2: '₂',
  3: '₃',
  4: '₄',
  5: '₅',
  6: '₆',
  7: '₇',
  8: '₈',
  9: '₉',
  '+': '₊',
  '−': '₋',
  '(': '₍',
  ')': '₎',
});

/**
 * Text for a group that may need brackets after `/` or `√`: one number or
 * name stays bare, anything with an operator gets brackets.
 * @param {string} s
 */
function atom(s) {
  return /^[\p{L}\p{N}.,′²³]*$/u.test(s) || /^\(.*\)$/.test(s) ? s : `(${s})`;
}

/**
 * Maps every character through `table`, or returns null when one is missing.
 * @param {string} s
 * @param {Record<string, string>} table
 */
function mapAll(s, table) {
  let out = '';
  for (const ch of s) {
    if (!(ch in table)) return null;
    out += table[ch];
  }
  return out;
}

/** A small recursive reader over TeX source. */
class Reader {
  /** @param {string} src */
  constructor(src) {
    this.src = src;
    this.i = 0;
  }

  skipSpace() {
    while (this.i < this.src.length && /\s/.test(this.src[this.i])) this.i++;
  }

  /** The raw source of the next `{...}` group, or of one token. */
  rawArg() {
    this.skipSpace();
    const s = this.src;
    if (s[this.i] === '{') {
      let depth = 0;
      const start = this.i + 1;
      for (; this.i < s.length; this.i++) {
        if (s[this.i] === '\\') {
          this.i++;
          continue;
        }
        if (s[this.i] === '{') depth++;
        else if (s[this.i] === '}' && --depth === 0) {
          this.i++;
          return s.slice(start, this.i - 1);
        }
      }
      return s.slice(start);
    }
    if (s[this.i] === '\\') {
      const m = /^\\([A-Za-z]+|.)/.exec(s.slice(this.i));
      const token = m ? m[0] : '\\';
      this.i += token.length;
      return token;
    }
    return s[this.i++] ?? '';
  }

  /** The raw source of an optional `[...]` argument, or null. */
  optArg() {
    this.skipSpace();
    if (this.src[this.i] !== '[') return null;
    const end = this.src.indexOf(']', this.i);
    if (end === -1) return null;
    const out = this.src.slice(this.i + 1, end);
    this.i = end + 1;
    return out;
  }

  /** Text of the next argument. */
  arg() {
    return texText(this.rawArg());
  }

  /** @returns {string} */
  read() {
    let out = '';
    const s = this.src;
    while (this.i < s.length) {
      const ch = s[this.i];
      if (ch === '\\') {
        out += this.command();
      } else if (ch === '{') {
        out += this.arg();
      } else if (ch === '}') {
        this.i++;
      } else if (ch === '^') {
        this.i++;
        out += this.script(this.rawArg(), true);
      } else if (ch === '_') {
        this.i++;
        out += this.script(this.rawArg(), false);
      } else if (ch === '&') {
        this.i++;
        out += ' ';
      } else if (ch === '~') {
        this.i++;
        out += ' ';
      } else if (/\s/.test(ch)) {
        this.i++;
      } else if (ch === '-') {
        this.i++;
        out += '−';
      } else if (ch === "'") {
        this.i++;
        out += '′';
      } else {
        this.i++;
        out += ch;
      }
    }
    return out;
  }

  /**
   * @param {string} raw
   * @param {boolean} up
   */
  script(raw, up) {
    const body = texText(raw);
    if (up && (body === '°' || body === '∘')) return '°';
    if (up && /^′+$/.test(body)) return body;
    const mapped = mapAll(body, up ? SUPER : SUB);
    if (mapped !== null) return mapped;
    return `${up ? '^' : '_'}${atom(body)}`;
  }

  command() {
    const m = /^\\([A-Za-z]+|.)/.exec(this.src.slice(this.i));
    if (!m) {
      this.i++;
      return '';
    }
    this.i += m[0].length;
    const name = m[1];
    if (name === '\\') return '; ';
    if (TEXT_ARG.has(name)) return this.rawArg().replace(/\\([%$#&_{}])/g, '$1');
    if (KEEP_ARG.has(name)) return this.arg();
    if (name === 'not') {
      const next = this.arg();
      if (next === '=') return '≠';
      if (next === '∈') return '∉';
      return `¬${next}`;
    }
    if (DROP.has(name)) {
      if (name === 'left' || name === 'right' || name.startsWith('big') || name.startsWith('Big')) {
        this.skipSpace();
        if (this.src[this.i] === '.') this.i++;
      }
      return '';
    }
    if (DROP_ARG.has(name)) {
      this.rawArg();
      return '';
    }
    if (name === 'frac' || name === 'dfrac' || name === 'tfrac' || name === 'cfrac') {
      const a = this.arg();
      const b = this.arg();
      return `${atom(a)}/${atom(b)}`;
    }
    if (name === 'sqrt') {
      const index = this.optArg();
      const body = atom(this.arg());
      if (index === null) return `√${body}`;
      const n = texText(index);
      if (n === '3') return `∛${body}`;
      if (n === '4') return `∜${body}`;
      return `${mapAll(n, SUPER) ?? n}√${body}`;
    }
    if (name === 'mathbb') {
      const body = this.arg();
      return mapAll(body, BLACKBOARD) ?? body;
    }
    if (name === 'widehat') return `góc ${this.arg()}`;
    if (name in ACCENTS) {
      const body = this.arg();
      return [...body].map((c) => c + ACCENTS[name]).join('');
    }
    if (name === 'textcolor' || name === 'colorbox') {
      this.rawArg();
      return this.arg();
    }
    if (name === 'overset' || name === 'underset' || name === 'stackrel') {
      this.rawArg();
      return this.arg();
    }
    if (name === 'begin' || name === 'end') {
      const env = this.rawArg();
      if (name === 'begin' && /^(array|tabular)$/.test(env)) this.rawArg();
      if (/cases/.test(env)) return name === 'begin' ? '{ ' : ' }';
      return ' ';
    }
    if (name === 'hspace' || name === 'kern' || name === 'mkern' || name === 'hskip') {
      this.rawArg();
      return ' ';
    }
    if (name in SYMBOLS) return SYMBOLS[name];
    // Operator names (sin, log, lim, max, ...) and anything unknown: the name.
    return name.length === 1 ? name : ` ${name} `;
  }
}

/**
 * A linear Unicode form of TeX source for screen readers and speech:
 * `\sqrt{144}` → `√144`, `\frac{3}{4}` → `3/4`, `x^2` → `x²`, `-1` → `−1`,
 * `10\times` → `10×`, `90^\circ` → `90°`, `3{,}5` → `3,5`,
 * `\widehat{ABC}` → `góc ABC`. Spacing commands become spaces; layout-only
 * commands (`\left`, `\displaystyle`) are dropped.
 * @param {string} tex
 * @returns {string}
 */
export function texText(tex) {
  return new Reader(tex).read().replace(/\s+/g, ' ').trim();
}

/** @type {Record<string, string>} */
const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** @param {string} s */
const escape = (s) => s.replace(/[&<>"']/g, (c) => ENTITIES[c]);

/**
 * KaTeX markup with its accessible text: the text in a visually hidden span
 * that screen readers and accessible-name computation read, and the drawing
 * hidden from them. `label` overrides the text derived from the source.
 * @param {string} katexHtml output of `katex.renderToString`
 * @param {string} tex the source it was rendered from
 * @param {string} [label]
 */
export function texHtml(katexHtml, tex, label) {
  const text = label ?? texText(tex);
  return `<span class="tex"><span class="sr-only">${escape(text)}</span><span aria-hidden="true">${katexHtml}</span></span>`;
}

/** @type {Record<string, string>} */
const DECODE = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' };

/**
 * Plain text of rendered rich text as a screen reader hears it: elements
 * marked `aria-hidden="true"` are skipped, tags dropped, entities decoded,
 * spaces collapsed. For `aria-label`s that quote an item.
 * @param {string} html
 * @returns {string}
 */
export function htmlText(html) {
  let out = '';
  let i = 0;
  while (i < html.length) {
    const open = html.indexOf('<', i);
    if (open === -1) {
      out += html.slice(i);
      break;
    }
    out += html.slice(i, open);
    const close = html.indexOf('>', open);
    if (close === -1) break;
    const tag = html.slice(open, close + 1);
    i = close + 1;
    const name = /^<([a-zA-Z][\w-]*)/.exec(tag)?.[1];
    if (name && /\saria-hidden="true"/.test(tag) && !tag.endsWith('/>')) {
      // Skip to the matching close tag of the same name.
      let depth = 1;
      const re = new RegExp(`<(/?)${name}(?=[\\s>/])[^>]*?(/?)>`, 'g');
      re.lastIndex = i;
      for (let m = re.exec(html); m; m = re.exec(html)) {
        if (m[2] === '/') continue;
        depth += m[1] === '/' ? -1 : 1;
        if (depth === 0) {
          i = re.lastIndex;
          break;
        }
      }
      if (depth !== 0) break;
    }
  }
  return out
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, e) => DECODE[e])
    .replace(/\s+/g, ' ')
    .trim();
}
