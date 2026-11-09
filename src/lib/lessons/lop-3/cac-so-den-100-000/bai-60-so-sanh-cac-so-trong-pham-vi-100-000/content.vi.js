/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'So sánh hai số trong phạm vi 100 000: đếm chữ số, rồi so sánh từng hàng từ trái sang phải; tìm số lớn nhất, bé nhất và sắp xếp các số theo thứ tự.',
  intro:
    'Xã Hoà Bình có 12 450 người, xã Sao Mai có 12 405 người. Xã nào đông người hơn? Em so sánh hai số từ hàng chục nghìn sang phải là biết ngay!',
  objectives: [
    'So sánh được hai số trong phạm vi 100 000.',
    'Tìm được số lớn nhất, số bé nhất trong một nhóm số.',
    'Sắp xếp được các số theo thứ tự từ bé đến lớn và từ lớn đến bé.',
  ],
  sections: [
    {
      heading: 'Đếm chữ số trước',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Trong hai số, số nào có ít chữ số hơn thì bé hơn.',
        },
        {
          type: 'p',
          text: '9 999 có bốn chữ số, 10 000 có năm chữ số. Vậy 9 999 < 10 000.',
        },
        {
          type: 'p',
          text: '100 000 có sáu chữ số, 99 999 có năm chữ số. Vậy 100 000 > 99 999.',
        },
      ],
    },
    {
      heading: 'So sánh từng hàng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hai số có cùng số chữ số thì em so sánh từng cặp chữ số ở cùng một hàng, từ trái sang phải, bắt đầu từ hàng chục nghìn.',
        },
        {
          type: 'table',
          head: ['Hai số', 'Hàng quyết định', 'Kết quả'],
          rows: [
            ['85 000 và 58 000', 'hàng chục nghìn: 8 > 5', '85 000 > 58 000'],
            ['43 215 và 42 351', 'hàng nghìn: 3 > 2', '43 215 > 42 351'],
            ['76 200 và 76 199', 'hàng trăm: 2 > 1', '76 200 > 76 199'],
            ['30 075 và 30 507', 'hàng trăm: 0 < 5', '30 075 < 30 507'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hai số có cùng số chữ số, mọi cặp chữ số cùng hàng đều giống nhau thì hai số bằng nhau: 24 680 = 24 680.',
        },
      ],
    },
    {
      heading: 'Sắp xếp thứ tự',
      blocks: [
        {
          type: 'p',
          text: 'Muốn xếp các số từ bé đến lớn, em tìm số bé nhất trước, rồi số bé nhất trong các số còn lại, cứ thế đến hết.',
        },
        {
          type: 'p',
          text: 'Muốn xếp từ lớn đến bé, em làm như vậy nhưng tìm số lớn nhất.',
        },
        {
          type: 'p',
          text: 'Ví dụ: 50 800, 58 000, 80 500 xếp từ bé đến lớn là 50 800, 58 000, 80 500.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp thẻ số theo thứ tự',
    instruction:
      'Em chạm từng thẻ trên bàn để xếp vào hàng. Thẻ đầu tiên là số bé nhất (hoặc lớn nhất). Chọn sai, em được nhắc và chọn lại.',
  },
  examples: [
    {
      problem: 'Điền dấu >, <, = vào chỗ trống: 76 200 ? 76 199.',
      steps: [
        'Hai số đều có năm chữ số.',
        'Hàng chục nghìn: 7 = 7. Hàng nghìn: 6 = 6.',
        'Hàng trăm: 2 > 1.',
      ],
      answer: '76 200 > 76 199.',
    },
    {
      problem: 'Xếp các số 42 315, 42 351, 43 215, 41 532 theo thứ tự từ bé đến lớn.',
      steps: [
        'Cả bốn số có 4 chục nghìn. So sánh hàng nghìn: 2, 2, 3, 1.',
        '41 532 bé nhất, 43 215 lớn nhất.',
        'So sánh 42 315 và 42 351 ở hàng chục: 1 < 5, nên 42 315 < 42 351.',
      ],
      answer: '41 532, 42 315, 42 351, 43 215.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 9 999 ? 10 000.',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Em đếm chữ số của mỗi số.'],
      solution: '9 999 có bốn chữ số, 10 000 có năm chữ số. Vậy 9 999 < 10 000.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 76 200 ? 76 199.',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Hàng chục nghìn và hàng nghìn giống nhau. Em nhìn hàng trăm.'],
      solution: 'Hàng trăm: 2 > 1. Vậy 76 200 > 76 199.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 40 000 + 5 000 + 60 ? 45 060.',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Em tính tổng trước: 4 chục nghìn, 5 nghìn, 6 chục.'],
      solution: '40 000 + 5 000 + 60 = 45 060. Hai bên bằng nhau, nên chọn dấu =.',
    },
    {
      type: 'choice',
      prompt: 'Số nào lớn nhất?',
      options: ['58 000', '85 000', '80 500', '50 800'],
      answer: 1,
      hints: ['So sánh hàng chục nghìn trước.'],
      solution:
        '85 000 và 80 500 có 8 chục nghìn, lớn hơn hai số kia. Hàng nghìn: 5 > 0, nên 85 000 lớn nhất.',
    },
    {
      type: 'choice',
      prompt: 'Số nào bé nhất?',
      options: ['30 507', '30 075', '30 750', '35 007'],
      answer: 1,
      hints: ['Cả bốn số có 3 chục nghìn. Em so sánh hàng nghìn, rồi hàng trăm.'],
      solution:
        '35 007 có 5 nghìn nên lớn nhất. Ba số còn lại có 0 nghìn; hàng trăm: 5, 0, 7. Số bé nhất là 30 075.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số theo thứ tự từ bé đến lớn.',
      items: ['42 315', '42 351', '43 215', '41 532'],
      answer: [3, 0, 1, 2],
      hints: ['Cả bốn số có 4 chục nghìn. Em so sánh hàng nghìn.'],
      solution: '41 532 < 42 315 < 42 351 < 43 215.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số theo thứ tự từ lớn đến bé.',
      items: ['67 200', '76 020', '76 200', '76 199'],
      answer: [2, 3, 1, 0],
      hints: ['67 200 có 6 chục nghìn nên bé nhất.', 'So sánh hàng trăm của ba số còn lại.'],
      solution: '76 200 > 76 199 > 76 020 > 67 200.',
    },
    {
      type: 'choice',
      prompt: 'Xã Hoà Bình có 12 450 người, xã Sao Mai có 12 405 người. Xã nào đông người hơn?',
      options: ['Xã Hoà Bình', 'Xã Sao Mai', 'Hai xã đông bằng nhau'],
      answer: 0,
      hints: ['So sánh 12 450 và 12 405 ở hàng chục.'],
      solution: 'Hàng chục: 5 > 0, nên 12 450 > 12 405. Xã Hoà Bình đông người hơn.',
    },
    {
      type: 'number',
      prompt: 'Số tròn chục nghìn lớn nhất mà bé hơn 65 000 là số nào?',
      answer: 60000,
      hints: ['Các số tròn chục nghìn: 10 000, 20 000, 30 000, ...', '70 000 lớn hơn 65 000.'],
      solution: '60 000 < 65 000 < 70 000. Số tròn chục nghìn lớn nhất bé hơn 65 000 là 60 000.',
    },
    {
      type: 'number',
      prompt: 'Số bé nhất có năm chữ số là số nào?',
      answer: 10000,
      hints: ['Chữ số hàng chục nghìn phải khác 0.', 'Chọn chữ số bé nhất cho mỗi hàng.'],
      solution: 'Hàng chục nghìn là 1, các hàng còn lại là 0. Số bé nhất có năm chữ số là 10 000.',
    },
  ],
  takeaways: [
    'Số nào có ít chữ số hơn thì bé hơn.',
    'Cùng số chữ số: so sánh từng hàng từ trái sang phải, bắt đầu từ hàng chục nghìn.',
    'Sắp xếp: tìm số bé nhất (hoặc lớn nhất) trước, rồi đến các số còn lại.',
  ],
};
