/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về các số đến 10 000: đọc, viết số có bốn chữ số, viết số thành tổng, so sánh, sắp xếp, chữ số La Mã, làm tròn số và giải bài toán.',
  intro:
    'Em đã biết số có bốn chữ số, so sánh số, chữ số La Mã và làm tròn số. Hôm nay em ôn lại tất cả và giải vài bài toán nhé!',
  objectives: [
    'Đọc, viết được các số trong phạm vi 10 000 và viết số thành tổng.',
    'So sánh, sắp xếp được các số trong phạm vi 10 000.',
    'Đọc, viết được số La Mã đến XX; làm tròn được số đến hàng chục, hàng trăm.',
    'Vận dụng vào bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Số', 'Đọc là', 'Viết thành tổng'],
          rows: [
            ['4 725', 'bốn nghìn bảy trăm hai mươi lăm', '4 000 + 700 + 20 + 5'],
            ['3 065', 'ba nghìn không trăm sáu mươi lăm', '3 000 + 60 + 5'],
            ['7 408', 'bảy nghìn bốn trăm linh tám', '7 000 + 400 + 8'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh',
          text: 'Số nào ít chữ số hơn thì bé hơn. Cùng số chữ số thì so sánh từ hàng nghìn sang phải.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Làm tròn',
          text: 'Đến hàng chục: nhìn chữ số hàng đơn vị. Đến hàng trăm: nhìn chữ số hàng chục. Bé hơn 5 thì tròn xuống, còn lại thì tròn lên.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Chữ số 0 vẫn giữ chỗ của hàng: 3 065 có 0 trăm, đọc "không trăm". Số 4 viết là IV, không viết IIII.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Em đọc câu hỏi rồi chạm vào đáp án. Sai lần đầu, em được gợi ý và làm lại. Hết bộ, em biết phần nào cần ôn và có thể làm bộ khác.',
  },
  examples: [
    {
      problem: 'Từ bốn thẻ số 2, 0, 0, 4, lập số lớn nhất và số bé nhất có bốn chữ số.',
      steps: [
        'Số lớn nhất: xếp chữ số lớn nhất ở hàng nghìn, rồi giảm dần: 4 200.',
        'Số bé nhất: hàng nghìn không được là 0, nên chọn 2; các chữ số còn lại xếp tăng dần: 2 004.',
      ],
      answer: 'Số lớn nhất là 4 200, số bé nhất là 2 004.',
    },
    {
      problem:
        'Một nhà máy làm được 2 348 chiếc áo. Làm tròn đến hàng trăm, nhà máy làm được khoảng bao nhiêu chiếc áo?',
      steps: [
        'Chữ số hàng chục của 2 348 là 4.',
        '4 < 5 nên làm tròn xuống.',
        'Làm tròn 2 348 đến hàng trăm được 2 300.',
      ],
      answer: 'Khoảng 2 300 chiếc áo.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Em viết số: chín nghìn không trăm linh năm.',
      answer: 9005,
      hints: ['"Không trăm" là 0 trăm, "linh" là 0 chục.'],
      solution: 'Chín nghìn không trăm linh năm gồm 9 nghìn, 0 trăm, 0 chục, 5 đơn vị: 9 005.',
    },
    {
      type: 'choice',
      prompt: 'Số 7 040 đọc là gì?',
      options: [
        'bảy nghìn không trăm bốn mươi',
        'bảy nghìn bốn trăm',
        'bảy nghìn không trăm linh bốn',
      ],
      answer: 0,
      hints: ['7 040 gồm 7 nghìn, 0 trăm, 4 chục, 0 đơn vị.'],
      solution:
        'Hàng trăm là 0 nên đọc "không trăm"; 4 chục là bốn mươi. Đọc: bảy nghìn không trăm bốn mươi.',
    },
    {
      type: 'number',
      prompt: '2 046 = 2 000 + ? + 6. Số còn thiếu là số nào?',
      answer: 40,
      hints: ['2 046 có 4 chục.'],
      solution: '2 046 gồm 2 nghìn, 0 trăm, 4 chục, 6 đơn vị. 2 046 = 2 000 + 40 + 6.',
    },
    {
      type: 'number',
      prompt: 'Số liền sau của 9 999 là số nào?',
      answer: 10000,
      hints: ['Số liền sau hơn số đó 1 đơn vị.'],
      solution: '9 999 + 1 = 10 000.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số theo thứ tự từ bé đến lớn.',
      items: ['6 019', '6 190', '6 109', '961'],
      answer: [3, 0, 2, 1],
      hints: ['961 có ba chữ số nên bé nhất.', 'So sánh hàng trăm của ba số còn lại.'],
      solution: '961 < 6 019 < 6 109 < 6 190.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 4 589 ? 4 598.',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Hàng nghìn, hàng trăm giống nhau. Em nhìn hàng chục.'],
      solution: 'Hàng chục: 8 < 9. Vậy 4 589 < 4 598.',
    },
    {
      type: 'match',
      prompt: 'Em nối số La Mã với số.',
      left: ['XII', 'IX', 'XIV', 'XVIII'],
      right: ['12', '9', '14', '18', '11'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['X là 10, V là 5. Chữ I bên trái thì bớt 1.'],
      solution: 'XII = 12, IX = 9, XIV = 14, XVIII = 18.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 6 472 đến hàng chục.',
      answer: 6470,
      hints: ['Chữ số hàng đơn vị là 2.'],
      solution: '2 < 5 nên làm tròn xuống. 6 472 làm tròn đến hàng chục được 6 470.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 6 472 đến hàng trăm.',
      answer: 6500,
      hints: ['Chữ số hàng chục là 7.'],
      solution: '7 > 5 nên làm tròn lên. 6 472 làm tròn đến hàng trăm được 6 500.',
    },
    {
      type: 'choice',
      prompt:
        'Quyển sách A có 1 505 trang, quyển sách B có 1 550 trang. Quyển nào nhiều trang hơn?',
      options: ['Quyển A', 'Quyển B', 'Bằng nhau'],
      answer: 1,
      hints: ['So sánh 1 505 và 1 550 ở hàng chục.'],
      solution: 'Hàng chục: 0 < 5 nên 1 505 < 1 550. Quyển B nhiều trang hơn.',
    },
    {
      type: 'number',
      prompt: 'Từ bốn thẻ số 5, 0, 3, 0, em lập số bé nhất có bốn chữ số.',
      answer: 3005,
      hints: ['Hàng nghìn không được là chữ số 0.', 'Chọn chữ số bé nhất khác 0 ở hàng nghìn.'],
      solution:
        'Hàng nghìn là 3, chữ số bé nhất khác 0. Các chữ số còn lại 0, 0, 5 xếp tăng dần: số bé nhất là 3 005.',
    },
  ],
  takeaways: [
    'Đọc, viết số từ hàng nghìn; chữ số 0 vẫn giữ chỗ của hàng.',
    'So sánh: đếm chữ số trước, rồi so sánh từ hàng nghìn.',
    'Làm tròn: bé hơn 5 thì tròn xuống, còn lại thì tròn lên.',
  ],
};
