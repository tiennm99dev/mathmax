/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'So sánh hai số trong phạm vi 10 000: đếm chữ số, rồi so sánh từng hàng từ trái sang phải; sắp xếp các số theo thứ tự.',
  intro:
    'Cuốn truyện dày 1 205 trang, cuốn từ điển dày 1 250 trang. Cuốn nào dày hơn? Em so sánh hai số từ hàng nghìn sang phải là biết ngay!',
  objectives: [
    'So sánh được hai số trong phạm vi 10 000.',
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
          text: '999 có ba chữ số, 1 000 có bốn chữ số. Vậy 999 < 1 000.',
        },
        {
          type: 'p',
          text: '9 999 có bốn chữ số, 10 000 có năm chữ số. Vậy 10 000 > 9 999.',
        },
      ],
    },
    {
      heading: 'So sánh từng hàng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hai số có cùng số chữ số thì em so sánh từng cặp chữ số ở cùng một hàng, từ trái sang phải.',
        },
        {
          type: 'table',
          head: ['Hai số', 'Hàng quyết định', 'Kết quả'],
          rows: [
            ['7 812 và 2 999', 'hàng nghìn: 7 > 2', '7 812 > 2 999'],
            ['5 094 và 5 940', 'hàng trăm: 0 < 9', '5 094 < 5 940'],
            ['3 456 và 3 465', 'hàng chục: 5 < 6', '3 456 < 3 465'],
            ['6 150 và 6 105', 'hàng chục: 5 > 0', '6 150 > 6 105'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hai số có cùng số chữ số, mọi cặp chữ số cùng hàng đều giống nhau thì hai số bằng nhau: 2 468 = 2 468.',
        },
        {
          type: 'p',
          text: 'Trên tia số, số nằm bên trái bé hơn số nằm bên phải.',
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
          text: 'Ví dụ: 4 300, 4 030, 3 400 xếp từ bé đến lớn là 3 400, 4 030, 4 300.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tia số phóng to',
    instruction:
      'Em bấm "Phóng to" để nhìn gần hai điểm A và B trên tia số. Số nằm bên trái bé hơn. Rồi em chọn dấu >, < hoặc =.',
  },
  examples: [
    {
      problem: 'Điền dấu >, <, = vào chỗ trống: 5 094 ? 5 940.',
      steps: ['Hai số đều có bốn chữ số.', 'Hàng nghìn: 5 = 5, giống nhau.', 'Hàng trăm: 0 < 9.'],
      answer: '5 094 < 5 940.',
    },
    {
      problem: 'Tìm số lớn nhất trong các số: 8 723, 8 732, 873, 8 372.',
      steps: [
        '873 có ba chữ số nên bé nhất nhóm.',
        'Ba số còn lại cùng 8 nghìn. So sánh hàng trăm: 7, 7, 3. Số 8 372 bé hơn.',
        'So sánh 8 723 và 8 732 ở hàng chục: 2 < 3.',
      ],
      answer: 'Số lớn nhất là 8 732.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 999 ? 1 000.',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Em đếm chữ số của mỗi số.'],
      solution: '999 có ba chữ số, 1 000 có bốn chữ số. Vậy 999 < 1 000.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 7 812 ? 7 802.',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Hàng nghìn và hàng trăm giống nhau. Em nhìn hàng chục.'],
      solution: 'Hàng chục: 1 > 0. Vậy 7 812 > 7 802.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 6 000 + 400 + 5 ? 6 405.',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Em tính tổng trước: 6 nghìn, 4 trăm, 5 đơn vị.'],
      solution: '6 000 + 400 + 5 = 6 405. Hai bên bằng nhau, nên chọn dấu =.',
    },
    {
      type: 'choice',
      prompt: 'Số nào bé nhất?',
      options: ['4 300', '4 030', '4 003', '3 999'],
      answer: 3,
      hints: ['So sánh hàng nghìn trước.'],
      solution: '3 999 có 3 nghìn, các số kia có 4 nghìn. Số bé nhất là 3 999.',
    },
    {
      type: 'choice',
      prompt: 'Số nào lớn nhất?',
      options: ['9 989', '9 899', '9 998', '9 988'],
      answer: 2,
      hints: ['Cả bốn số đều có 9 nghìn. Em so sánh hàng trăm, rồi hàng chục.'],
      solution:
        'Hàng trăm: 9 899 có 8, bé hơn. Ba số còn lại có 9 trăm. Hàng chục: 9 989 và 9 988 có 8, còn 9 998 có 9. Số lớn nhất là 9 998.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số theo thứ tự từ bé đến lớn.',
      items: ['2 703', '2 073', '2 730', '2 370'],
      answer: [1, 3, 0, 2],
      hints: ['Cả bốn số đều có 2 nghìn. Em so sánh hàng trăm.'],
      solution:
        'Hàng trăm: 0, 3, 7, 7. Với 2 703 và 2 730, hàng chục 0 < 3. Thứ tự: 2 073, 2 370, 2 703, 2 730.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số theo thứ tự từ lớn đến bé.',
      items: ['5 600', '6 500', '5 060', '6 050'],
      answer: [1, 3, 0, 2],
      hints: ['Số có 6 nghìn lớn hơn số có 5 nghìn.'],
      solution: '6 500 > 6 050 > 5 600 > 5 060. Thứ tự: 6 500, 6 050, 5 600, 5 060.',
    },
    {
      type: 'choice',
      prompt: 'Cuốn truyện dày 1 205 trang, cuốn từ điển dày 1 250 trang. Cuốn nào dày hơn?',
      options: ['Cuốn truyện', 'Cuốn từ điển', 'Hai cuốn dày bằng nhau'],
      answer: 1,
      hints: ['So sánh 1 205 và 1 250 ở hàng chục.'],
      solution: 'Hàng chục: 0 < 5, nên 1 205 < 1 250. Cuốn từ điển dày hơn.',
    },
    {
      type: 'number',
      prompt: 'Số tròn nghìn lớn nhất mà bé hơn 7 500 là số nào?',
      answer: 7000,
      hints: ['Các số tròn nghìn: 1 000, 2 000, 3 000, ...', '8 000 lớn hơn 7 500.'],
      solution: '7 000 < 7 500 < 8 000. Số tròn nghìn lớn nhất bé hơn 7 500 là 7 000.',
    },
  ],
  takeaways: [
    'Số nào có ít chữ số hơn thì bé hơn.',
    'Cùng số chữ số: so sánh từng hàng từ trái sang phải, bắt đầu từ hàng nghìn.',
    'Trên tia số, số bên trái bé hơn số bên phải.',
  ],
};
