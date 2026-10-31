const SIGNS = ['>', '<', '='];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn lại chủ đề các số đến 100: đọc, viết số, chục và đơn vị, so sánh, bảng các số từ 1 đến 100 và bài toán thực tế.',
  intro:
    'Em đã học số có hai chữ số, so sánh số và bảng các số từ 1 đến 100. Hôm nay em luyện tập lại và giải vài bài toán nhỏ nhé!',
  objectives: [
    'Đọc, viết các số đến 100.',
    'Biết số có hai chữ số gồm mấy chục và mấy đơn vị.',
    'So sánh, sắp xếp các số có hai chữ số.',
    'Dùng bảng các số từ 1 đến 100 để tìm số còn thiếu.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Chục và đơn vị',
          text: '10 đơn vị là 1 chục. 36 gồm 3 chục và 6 đơn vị, đọc là ba mươi sáu.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh',
          text: 'So sánh hàng chục trước: 52 > 48. Hàng chục bằng nhau thì so sánh hàng đơn vị: 64 > 61.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Bảng các số',
          text: 'Sang phải một ô thêm 1. Xuống dưới một ô thêm 10. 99 thêm 1 là 100.',
        },
      ],
    },
    {
      heading: 'Giải bài toán',
      blocks: [
        {
          type: 'p',
          text: 'Đồ vật xếp theo chục: mỗi hộp, mỗi bó có 10 cái. Em đếm số chục, rồi đếm số lẻ.',
        },
        {
          type: 'table',
          head: ['Bài toán nói', 'Em làm'],
          rows: [
            ['3 chục và 2 cái nữa', 'viết 3 ở hàng chục, 2 ở hàng đơn vị: 32'],
            ['ai nhiều hơn, ai ít hơn', 'so sánh hai số'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi bộ có 12 câu trộn từ cả chủ đề. Chạm vào đáp án. Sai lần đầu, em được gợi ý và thử lại. Làm xong, em xem mình cần ôn phần nào và chọn "Làm bộ bài khác".',
  },
  examples: [
    {
      problem:
        'Mỗi hộp có 1 chục quả trứng. Mẹ mua 4 hộp trứng và 5 quả trứng nữa. Mẹ mua tất cả bao nhiêu quả trứng?',
      steps: ['4 hộp là 4 chục quả trứng.', '5 quả nữa là 5 đơn vị.', '4 chục và 5 đơn vị là 45.'],
      answer: 'Mẹ mua tất cả 45 quả trứng.',
    },
    {
      problem:
        'Tổ Một hái được 48 bông hoa. Tổ Hai hái được 52 bông hoa. Tổ nào hái được nhiều hoa hơn?',
      steps: ['So sánh 48 và 52.', 'Hàng chục: 4 chục < 5 chục, nên 48 < 52.'],
      answer: 'Tổ Hai hái được nhiều hoa hơn.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có bao nhiêu khối vuông?',
      picture: 'block',
      answer: 17,
      hints: ['Đếm đủ 10 khối trước: đó là 1 chục.', 'Đếm tiếp: mười một, mười hai, ...'],
      solution: '1 chục khối và 7 khối nữa. Có 17 khối vuông.',
    },
    {
      type: 'choice',
      prompt: 'Số 63 đọc là gì?',
      options: ['ba mươi sáu', 'sáu mươi ba', 'sáu ba'],
      answer: 1,
      hints: ['Chữ số 6 ở hàng chục: "sáu mươi".'],
      solution: '63 gồm 6 chục và 3 đơn vị, đọc là sáu mươi ba.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số với cách đọc.',
      left: ['45', '81', '14', '100'],
      right: ['mười bốn', 'một trăm', 'bốn mươi lăm', 'tám mươi mốt'],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['5 ở cuối đọc là "lăm", 1 ở cuối (sau "mươi") đọc là "mốt".'],
      solution: '45 là bốn mươi lăm, 81 là tám mươi mốt, 14 là mười bốn, 100 là một trăm.',
    },
    {
      type: 'choice',
      prompt: '8 chục và 0 đơn vị là số nào?',
      options: ['8', '80', '800'],
      answer: 1,
      hints: ['Viết 8 ở hàng chục, 0 ở hàng đơn vị.'],
      solution: '8 chục là 80.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 57 ... 75',
      options: SIGNS,
      answer: 1,
      hints: ['So sánh hàng chục: 5 và 7.'],
      solution: '5 chục < 7 chục, nên 57 < 75.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 93 ... 39',
      options: SIGNS,
      answer: 0,
      hints: ['So sánh hàng chục: 9 và 3.'],
      solution: '9 chục > 3 chục, nên 93 > 39.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 64 ... 61',
      options: SIGNS,
      answer: 0,
      hints: ['Hai số cùng 6 chục.', 'So sánh hàng đơn vị: 4 và 1.'],
      solution: 'Cùng 6 chục, 4 > 1, nên 64 > 61.',
    },
    {
      type: 'choice',
      prompt: 'Số nào lớn nhất?',
      options: ['69', '96', '90'],
      answer: 1,
      hints: ['96 và 90 cùng 9 chục.', 'So sánh hàng đơn vị của 96 và 90.'],
      solution: '69 có 6 chục nên bé nhất. 96 và 90 cùng 9 chục, 6 > 0. Số 96 lớn nhất.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ bé đến lớn.',
      items: ['48', '84', '40', '44'],
      answer: [2, 3, 0, 1],
      hints: ['84 có 8 chục, lớn nhất.', '40, 44, 48 cùng 4 chục: so sánh hàng đơn vị.'],
      solution: '40 < 44 < 48 < 84.',
    },
    {
      type: 'choice',
      prompt: 'Tìm số còn thiếu: 25, 35, ?, 55',
      options: ['36', '45', '65'],
      answer: 1,
      hints: ['Các số nằm trong một cột của bảng.', 'Mỗi số thêm 10.'],
      solution: '35 thêm 10 là 45.',
    },
    {
      type: 'choice',
      prompt:
        'Mỗi hộp có 1 chục cái bút. Lan có 3 hộp bút và 2 cái bút nữa. Lan có tất cả bao nhiêu cái bút?',
      options: ['32', '23', '5'],
      answer: 0,
      hints: ['3 hộp là 3 chục cái bút.', '2 cái bút nữa là 2 đơn vị.'],
      solution: '3 chục và 2 đơn vị là 32. Lan có 32 cái bút.',
    },
    {
      type: 'choice',
      prompt:
        'Tổ Một hái được 48 bông hoa. Tổ Hai hái được 52 bông hoa. Tổ nào hái được ít hoa hơn?',
      options: ['Tổ Một', 'Tổ Hai'],
      answer: 0,
      hints: ['So sánh 48 và 52: xem hàng chục trước.'],
      solution: '4 chục < 5 chục, nên 48 < 52. Tổ Một hái được ít hoa hơn.',
    },
  ],
  takeaways: [
    'Số có hai chữ số gồm số chục (bên trái) và số đơn vị (bên phải).',
    'So sánh hàng chục trước, hàng chục bằng nhau thì so sánh hàng đơn vị.',
    'Trong bảng các số: sang phải thêm 1, xuống dưới thêm 10.',
  ],
};
