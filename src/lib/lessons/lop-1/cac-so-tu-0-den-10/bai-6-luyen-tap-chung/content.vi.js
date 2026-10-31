const ZERO_TO_TEN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn lại chủ đề các số từ 0 đến 10: đếm, đọc, viết, thứ tự các số, so sánh bằng dấu >, <, = và tách, gộp số.',
  intro:
    'Em đã biết đếm đến 10, so sánh số và tách số. Hôm nay em luyện tập lại tất cả và giải vài bài toán nhỏ trong cuộc sống nhé!',
  objectives: [
    'Đếm, đọc, viết và xếp thứ tự các số từ 0 đến 10.',
    'So sánh hai số bằng dấu >, <, =.',
    'Tách một số thành hai phần, gộp hai phần thành một số.',
    'Vận dụng vào bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'p',
          text: 'Thứ tự đếm: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh số',
          text: 'Số đứng sau khi đếm thì lớn hơn: 8 > 5, 5 < 8. Hai số giống nhau thì bằng nhau: 6 = 6.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mấy và mấy',
          text: '7 gồm 3 và 4. 3 và 4 gộp lại được 7.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi bộ có 10 câu trộn từ cả chủ đề. Chạm vào đáp án. Sai lần đầu, em được gợi ý và thử lại. Làm xong, em xem mình cần ôn phần nào và chọn "Làm bộ bài khác".',
  },
  examples: [
    {
      problem: 'Có 9 quả bóng: 6 quả màu đỏ, còn lại màu xanh. Có mấy quả bóng xanh?',
      steps: ['9 gồm 6 và mấy?', 'Từ 6 đếm tiếp đến 9: bảy, tám, chín là 3.'],
      answer: 'Có 3 quả bóng xanh.',
    },
    {
      problem: 'Nam có 6 viên bi, Minh có 8 viên bi. Bạn nào có ít bi hơn?',
      steps: ['So sánh 6 và 8.', 'Khi đếm, 6 đứng trước 8, nên 6 < 8.'],
      answer: 'Nam có ít bi hơn.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy con bướm?',
      picture: 'butterfly',
      answer: 8,
      choices: ZERO_TO_TEN,
      hints: ['Chạm vào từng con bướm và đếm to.'],
      solution: 'Đếm: một, hai, ..., bảy, tám. Có 8 con bướm.',
    },
    {
      type: 'count',
      prompt: 'Có mấy quả cam?',
      picture: 'orange',
      answer: 4,
      choices: ZERO_TO_TEN,
      hints: ['Đếm từ trái sang phải, mỗi quả một lần.'],
      solution: 'Đếm: một, hai, ba, bốn. Có 4 quả cam.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số với cách đọc.',
      left: ['0', '4', '8', '10'],
      right: ['mười', 'không', 'tám', 'bốn', 'năm'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      hints: ['Số 0 đọc là "không", số 10 đọc là "mười".'],
      solution: '0 đọc là "không", 4 đọc là "bốn", 8 đọc là "tám", 10 đọc là "mười".',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ lớn đến bé.',
      items: ['3', '9', '0', '6'],
      answer: [1, 3, 0, 2],
      hints: ['Tìm số lớn nhất trước.', 'Đếm ngược: 10, 9, 8, ...'],
      solution: '9 > 6 > 3 > 0. Thứ tự từ lớn đến bé: 9, 6, 3, 0.',
    },
    {
      type: 'choice',
      prompt: 'Số nào còn thiếu: 10, 9, 8, ?, 6?',
      options: ['5', '7', '9'],
      answer: 1,
      hints: ['Dãy số đang đếm ngược.'],
      solution: 'Đếm ngược: 10, 9, 8, 7, 6. Số còn thiếu là 7.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 9 ... 7',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Khi đếm, 9 đứng sau 7.'],
      solution: '9 lớn hơn 7, nên 9 > 7.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 3 ... 3',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Hai số có giống nhau không?'],
      solution: 'Hai số bằng nhau, nên 3 = 3.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số bé hơn 5.',
      options: ['2', '5', '0', '7', '4'],
      answers: [0, 2, 4],
      hints: ['Các số đứng trước 5 khi đếm thì bé hơn 5.', 'Số 5 không bé hơn 5.'],
      solution: 'Các số bé hơn 5 là 0, 2, 4. Số 5 bằng 5, số 7 lớn hơn 5.',
    },
    {
      type: 'choice',
      prompt: '9 gồm 4 và mấy?',
      options: ['4', '5', '6'],
      answer: 1,
      hints: ['Có 4 rồi, đếm tiếp đến 9.'],
      solution: 'Từ 4 đếm tiếp: năm, sáu, bảy, tám, chín là 5. 9 gồm 4 và 5.',
    },
    {
      type: 'choice',
      prompt: 'Có 5 con vịt dưới ao và 5 con vịt trên bờ. Gộp lại có mấy con vịt?',
      options: ['5', '9', '10'],
      answer: 2,
      hints: ['5 và 5 gộp lại được mấy?', 'Đếm 5 con, rồi đếm tiếp: sáu, ...'],
      solution: 'Từ 5 đếm tiếp thêm 5: sáu, bảy, tám, chín, mười. 5 và 5 gộp lại được 10.',
    },
    {
      type: 'choice',
      prompt: 'Có 7 bạn và 6 cái ghế. Mỗi bạn ngồi một ghế. Câu nào đúng?',
      options: ['Số bạn ít hơn số ghế.', 'Số bạn nhiều hơn số ghế.', 'Số bạn bằng số ghế.'],
      answer: 1,
      hints: ['Ghép mỗi bạn với một ghế. Còn thừa bạn hay thừa ghế?'],
      solution: '6 bạn ngồi 6 ghế, còn thừa 1 bạn. Số bạn nhiều hơn số ghế (7 > 6).',
    },
    {
      type: 'choice',
      prompt: 'Trên cây có 8 quả xoài. Bố hái hết. Trên cây còn mấy quả xoài?',
      options: ['0', '1', '8'],
      answer: 0,
      hints: ['Hái hết nghĩa là không còn quả nào.'],
      solution: 'Không còn quả nào, ta dùng số 0. Trên cây còn 0 quả xoài.',
    },
  ],
  takeaways: [
    'Thứ tự đếm từ 0 đến 10; đếm ngược từ 10 về 0.',
    'Số đứng sau khi đếm thì lớn hơn; dùng dấu >, <, = để so sánh.',
    'Một số tách được thành hai phần; gộp hai phần lại được số đó.',
  ],
};
