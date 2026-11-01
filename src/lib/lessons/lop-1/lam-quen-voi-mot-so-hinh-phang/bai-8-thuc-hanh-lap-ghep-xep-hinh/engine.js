/**
 * The puzzles of the shape-building board, from easy to harder. The board
 * itself (pieces, turns, checking the cover) is `#lib/core/kid/tangram.js`.
 */

/** @typedef {import('#lib/core/kid/tangram.js').Puzzle} Puzzle */

/** The puzzles, from easy to harder. Target outlines start at (0, 0). */
/** @type {readonly Puzzle[]} */
export const PUZZLES = [
  {
    id: 'vuong',
    title: 'Hình vuông',
    goal: 'Ghép 2 hình tam giác thành 1 hình vuông.',
    done: 'Hai hình tam giác ghép thành một hình vuông.',
    target: [
      [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'tri2', color: '#f87171', rot: 0 },
      { shape: 'tri2', color: '#60a5fa', rot: 1 },
    ],
  },
  {
    id: 'chu-nhat',
    title: 'Hình chữ nhật',
    goal: 'Ghép 2 hình vuông thành 1 hình chữ nhật.',
    done: 'Hai hình vuông đặt cạnh nhau thành một hình chữ nhật.',
    target: [
      [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 2 },
        { x: 0, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'square', color: '#34d399', rot: 0 },
      { shape: 'square', color: '#fbbf24', rot: 0 },
    ],
  },
  {
    id: 'tam-giac',
    title: 'Hình tam giác to',
    goal: 'Ghép 2 hình tam giác thành 1 hình tam giác to.',
    done: 'Hai hình tam giác ghép thành một hình tam giác to hơn.',
    target: [
      [
        { x: 0, y: 2 },
        { x: 2, y: 0 },
        { x: 4, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'tri2', color: '#a78bfa', rot: 0 },
      { shape: 'tri2', color: '#f472b6', rot: 0 },
    ],
  },
  {
    id: 'bon-tam-giac',
    title: 'Bốn tam giác',
    goal: 'Ghép 4 hình tam giác thành 1 hình vuông.',
    done: 'Bốn hình tam giác ghép thành một hình vuông.',
    target: [
      [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'quarter', color: '#f87171', rot: 0 },
      { shape: 'quarter', color: '#fbbf24', rot: 1 },
      { shape: 'quarter', color: '#34d399', rot: 2 },
      { shape: 'quarter', color: '#60a5fa', rot: 3 },
    ],
  },
  {
    id: 'ngoi-nha',
    title: 'Ngôi nhà',
    goal: 'Ghép 1 hình vuông và 1 hình tam giác thành ngôi nhà.',
    done: 'Thân nhà là hình vuông, mái nhà là hình tam giác.',
    target: [
      [
        { x: 0, y: 2 },
        { x: 2, y: 0 },
        { x: 4, y: 2 },
      ],
      [
        { x: 1, y: 2 },
        { x: 3, y: 2 },
        { x: 3, y: 4 },
        { x: 1, y: 4 },
      ],
    ],
    pieces: [
      { shape: 'square', color: '#fbbf24', rot: 0 },
      { shape: 'roof', color: '#f87171', rot: 2 },
    ],
  },
  {
    id: 'thuyen',
    title: 'Con thuyền',
    goal: 'Ghép 3 hình tam giác và 1 hình chữ nhật thành con thuyền.',
    done: 'Cánh buồm và hai mũi thuyền là hình tam giác, thân thuyền là hình chữ nhật.',
    target: [
      [
        { x: 2, y: 0 },
        { x: 4, y: 2 },
        { x: 2, y: 2 },
      ],
      [
        { x: 0, y: 2 },
        { x: 4, y: 2 },
        { x: 3, y: 3 },
        { x: 1, y: 3 },
      ],
    ],
    pieces: [
      { shape: 'tri2', color: '#f8fafc', rot: 1 },
      { shape: 'rect', color: '#d97706', rot: 1 },
      { shape: 'tri1', color: '#b45309', rot: 0 },
      { shape: 'tri1', color: '#b45309', rot: 2 },
    ],
  },
];
