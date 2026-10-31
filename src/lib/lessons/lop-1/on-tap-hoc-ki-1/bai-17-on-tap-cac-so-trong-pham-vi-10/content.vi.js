const ZERO_TO_TEN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập các số từ 0 đến 10: đếm, đọc và viết số, nhiều hơn và ít hơn, so sánh số, xếp thứ tự và mấy và mấy.',
  intro:
    'Em đã học các số từ 0 đến 10. Hôm nay em ôn lại: đếm, đọc số, so sánh và xếp thứ tự các số. Em làm bài ôn tập để biết mình còn yếu phần nào nhé!',
  objectives: [
    'Đếm, đọc và viết các số từ 0 đến 10.',
    'So sánh hai số bằng các dấu >, <, =.',
    'Xếp các số theo thứ tự, tìm số lớn nhất và số bé nhất.',
    'Tách một số thành hai số (mấy và mấy).',
  ],
  sections: [
    {
      heading: 'Các số từ 0 đến 10',
      blocks: [
        {
          type: 'p',
          text: 'Em đếm từ 0 đến 10: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.',
        },
        {
          type: 'table',
          head: ['Số', 'Đọc là', 'Số', 'Đọc là'],
          rows: [
            ['1', 'một', '6', 'sáu'],
            ['2', 'hai', '7', 'bảy'],
            ['3', 'ba', '8', 'tám'],
            ['4', 'bốn', '9', 'chín'],
            ['5', 'năm', '10', 'mười'],
          ],
        },
        {
          type: 'p',
          text: 'Số 5 đứng giữa số 4 và số 6.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Số 0',
          text: 'Số 0 đọc là "không". Không có đồ vật nào thì ta dùng số 0.',
        },
      ],
    },
    {
      heading: 'Nhiều hơn, ít hơn, bằng nhau',
      blocks: [
        {
          type: 'p',
          text: 'Em nối mỗi đồ vật nhóm này với một đồ vật nhóm kia.',
        },
        {
          type: 'p',
          text: 'Nhóm nào còn thừa ra thì nhóm đó nhiều hơn. Nối vừa hết thì hai nhóm bằng nhau.',
        },
      ],
    },
    {
      heading: 'So sánh số',
      blocks: [
        {
          type: 'table',
          head: ['Dấu', 'Đọc là', 'Ví dụ'],
          rows: [
            ['>', 'lớn hơn', '5 > 3'],
            ['<', 'bé hơn', '3 < 5'],
            ['=', 'bằng', '4 = 4'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Khi đếm từ 0, số nào đếm sau thì số đó lớn hơn.',
        },
        {
          type: 'p',
          text: 'Số 0 là số bé nhất. Trong các số đã học, số 10 là số lớn nhất.',
        },
      ],
    },
    {
      heading: 'Mấy và mấy',
      blocks: [
        {
          type: 'p',
          text: 'Có 5 quả bóng: 2 quả xanh và 3 quả đỏ. Ta nói: 5 gồm 2 và 3.',
        },
        {
          type: 'table',
          head: ['Số', 'Gồm'],
          rows: [
            ['5', '1 và 4, 2 và 3'],
            ['8', '3 và 5, 4 và 4'],
            ['10', '4 và 6, 5 và 5'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 10 câu. Đầu tiên em làm thử mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào đã vững, phần nào cần ôn lại.',
  },
  examples: [
    {
      problem: 'Chọn dấu đúng: 7 ... 4',
      steps: ['Em đếm từ 0: số 4 được đếm trước, số 7 được đếm sau.', 'Vậy 7 lớn hơn 4.'],
      answer: '7 > 4. Ta cũng viết được 4 < 7.',
    },
    {
      problem: 'Xếp các số 5, 2, 8 theo thứ tự từ bé đến lớn.',
      steps: ['Số bé nhất là 2.', 'Số lớn nhất là 8.', 'Số 5 đứng ở giữa.'],
      answer: 'Từ bé đến lớn: 2, 5, 8.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy quả táo?',
      picture: 'apple',
      answer: 7,
      choices: ZERO_TO_TEN,
      hints: ['Chạm vào từng quả táo và đếm to.', 'Một, hai, ba, ...'],
      solution: 'Đếm: một, hai, ba, bốn, năm, sáu, bảy. Có 7 quả táo.',
    },
    {
      type: 'count',
      prompt: 'Có mấy ngôi sao?',
      picture: 'star',
      answer: 10,
      choices: ZERO_TO_TEN,
      hints: ['Đếm từng ngôi sao. Ngôi sao nào đếm rồi thì không đếm lại.'],
      solution: 'Đếm từ một đến mười. Có 10 ngôi sao.',
    },
    {
      type: 'choice',
      prompt: 'Số 8 đọc là gì?',
      options: ['sáu', 'tám', 'bảy'],
      answer: 1,
      hints: ['Em đếm: năm, sáu, bảy, ...'],
      solution: 'Số 8 đọc là "tám".',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cách đọc với số đúng.',
      left: ['ba', 'năm', 'chín', 'không'],
      right: ['3', '5', '9', '0', '6'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em đếm từ không và chỉ vào từng số.'],
      solution: 'Ba là 3. Năm là 5. Chín là 9. Không là 0.',
    },
    {
      type: 'choice',
      prompt: 'Mai có 4 cái kẹo. Nam có 6 cái kẹo. Bạn nào có nhiều kẹo hơn?',
      options: ['Bạn Mai', 'Bạn Nam', 'Hai bạn có bằng nhau'],
      answer: 1,
      hints: ['Em so sánh hai số 4 và 6.'],
      solution: '6 lớn hơn 4, nên bạn Nam có nhiều kẹo hơn.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 6 ... 9',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Khi đếm, số nào được đếm trước?'],
      solution: '6 được đếm trước 9, nên 6 bé hơn 9: 6 < 9.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 10 ... 7',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Khi đếm, số nào được đếm sau thì lớn hơn.'],
      solution: '10 được đếm sau 7, nên 10 lớn hơn 7: 10 > 7.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số bé hơn 5.',
      options: ['3', '7', '0', '5', '4'],
      answers: [0, 2, 4],
      hints: ['Số bé hơn 5 được đếm trước số 5.', 'Số 5 không bé hơn chính nó.'],
      solution: 'Các số bé hơn 5 là 0, 3, 4. Số 7 lớn hơn 5, còn 5 bằng 5.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ bé đến lớn.',
      items: ['6', '2', '9', '4'],
      answer: [1, 3, 0, 2],
      hints: ['Tìm số bé nhất trước.'],
      solution: 'Từ bé đến lớn: 2, 4, 6, 9.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ lớn đến bé.',
      items: ['5', '10', '1', '8'],
      answer: [1, 3, 0, 2],
      hints: ['Tìm số lớn nhất trước.'],
      solution: 'Từ lớn đến bé: 10, 8, 5, 1.',
    },
    {
      type: 'choice',
      prompt: 'Trong các số 4, 9, 1, 6, số nào lớn nhất?',
      options: ['4', '9', '1', '6'],
      answer: 1,
      hints: ['Số nào được đếm sau cùng?'],
      solution: 'Xếp từ bé đến lớn: 1, 4, 6, 9. Số lớn nhất là 9.',
    },
    {
      type: 'choice',
      prompt: 'Số nào còn thiếu? 5, 6, ?, 8',
      options: ['9', '7', '4'],
      answer: 1,
      hints: ['Đếm tiếp từ 6.'],
      solution: 'Đếm: 5, 6, 7, 8. Số còn thiếu là 7.',
    },
    {
      type: 'choice',
      prompt: '8 gồm 5 và mấy?',
      options: ['2', '3', '4'],
      answer: 1,
      hints: ['Em lấy 8 que tính, tách ra 5 que. Đếm số que còn lại.'],
      solution: 'Tách 8 que ra 5 que thì còn 3 que. Vậy 8 gồm 5 và 3.',
    },
  ],
  takeaways: [
    'Em đếm, đọc và viết được các số từ 0 đến 10.',
    'Khi đếm, số nào đếm sau thì lớn hơn. Dùng dấu >, <, = để so sánh.',
    'Một số có thể tách thành hai số: 5 gồm 2 và 3.',
  ],
};
