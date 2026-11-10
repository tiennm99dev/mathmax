/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'So sánh các số có nhiều chữ số: số nào nhiều chữ số hơn thì lớn hơn; hai số cùng số chữ số thì so sánh từng cặp chữ số cùng hàng, từ trái sang phải.',
  intro:
    'Năm 2020, Nhật Bản có 126 476 461 người, Việt Nam có 97 338 579 người. Nước nào đông dân hơn? Em cùng học cách so sánh các số lớn nhé!',
  objectives: [
    'So sánh được hai số có nhiều chữ số.',
    'Tìm được số lớn nhất, số bé nhất trong một nhóm số.',
    'Sắp xếp được các số theo thứ tự từ bé đến lớn, từ lớn đến bé.',
  ],
  sections: [
    {
      heading: 'Số chữ số khác nhau',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Trong hai số, số nào có nhiều chữ số hơn thì lớn hơn. Số nào có ít chữ số hơn thì bé hơn.',
        },
        {
          type: 'p',
          text: '99 999 có năm chữ số, 100 000 có sáu chữ số. Vậy 99 999 < 100 000.',
        },
        {
          type: 'p',
          text: '126 476 461 có chín chữ số, 97 338 579 có tám chữ số. Vậy 126 476 461 > 97 338 579: Nhật Bản đông dân hơn.',
        },
      ],
    },
    {
      heading: 'Số chữ số bằng nhau',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nếu hai số có số chữ số bằng nhau thì em so sánh từng cặp chữ số ở cùng một hàng, từ trái sang phải.',
        },
        {
          type: 'table',
          head: ['Số', 'Trăm nghìn', 'Chục nghìn', 'Nghìn', 'Trăm', 'Chục', 'Đơn vị'],
          rows: [
            ['Số thứ nhất', '6', '9', '3', '2', '5', '1'],
            ['Số thứ hai', '6', '9', '3', '5', '0', '0'],
          ],
          caption: 'So sánh 693 251 và 693 500',
        },
        {
          type: 'p',
          text: 'Hàng trăm nghìn, chục nghìn, nghìn giống nhau. Ở hàng trăm: 2 < 5. Vậy 693 251 < 693 500.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Chỉ cần tìm hàng đầu tiên có hai chữ số khác nhau. Các hàng bên phải không cần xét nữa.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tìm chữ số khác nhau đầu tiên',
    instruction:
      'Hai số được viết thẳng hàng. Em chạm "Xem hàng tiếp" để so sánh từng hàng. Chữ số khác nhau đầu tiên sẽ được tô sáng. Rồi em chọn dấu.',
  },
  examples: [
    {
      problem: 'So sánh 4 520 000 và 4 519 999.',
      steps: [
        'Hai số cùng có bảy chữ số.',
        'Hàng triệu: cả hai là 4. Hàng trăm nghìn: cả hai là 5.',
        'Hàng chục nghìn: 2 > 1.',
      ],
      answer: '4 520 000 > 4 519 999.',
    },
    {
      problem: 'Sắp xếp các số 2 135 000; 2 153 000; 2 099 999 theo thứ tự từ bé đến lớn.',
      steps: [
        'Ba số cùng có bảy chữ số và cùng có 2 triệu.',
        'Hàng trăm nghìn: 2 099 999 có chữ số 0, bé nhất.',
        'So sánh 2 135 000 và 2 153 000: hàng trăm nghìn đều là 1; hàng chục nghìn 3 < 5.',
      ],
      answer: '2 099 999; 2 135 000; 2 153 000.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 99 999 ? 100 000',
      options: ['<', '>', '='],
      answer: 0,
      hints: ['Em đếm số chữ số của mỗi số.'],
      solution: '99 999 có năm chữ số, 100 000 có sáu chữ số. Vậy 99 999 < 100 000.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 870 354 ? 870 345',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Hai số cùng có sáu chữ số.', 'Hàng trăm nghìn, chục nghìn, nghìn, trăm giống nhau.'],
      solution: 'Ở hàng chục: 5 > 4. Vậy 870 354 > 870 345.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 125 300 000 ? 98 999 999',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Em đếm số chữ số trước.'],
      solution:
        '125 300 000 có chín chữ số, 98 999 999 có tám chữ số. Vậy 125 300 000 > 98 999 999.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 3 000 000 + 400 000 + 5 000 ? 3 405 000',
      options: ['=', '>', '<'],
      answer: 0,
      hints: ['Em tính tổng ở vế trái trước.'],
      solution: '3 000 000 + 400 000 + 5 000 = 3 405 000. Vậy hai vế bằng nhau.',
    },
    {
      type: 'choice',
      prompt: 'Số nào lớn nhất?',
      options: ['731 520', '713 520', '731 250', '73 152'],
      answer: 0,
      hints: [
        '73 152 chỉ có năm chữ số.',
        'So sánh các số sáu chữ số ở hàng chục nghìn rồi hàng trăm.',
      ],
      solution:
        '713 520 có hàng chục nghìn là 1, bé hơn. So sánh 731 520 và 731 250: hàng trăm 5 > 2. Số lớn nhất là 731 520.',
    },
    {
      type: 'choice',
      prompt: 'Số nào bé nhất?',
      options: ['1 009 999', '1 010 000', '1 100 000', '1 090 000'],
      answer: 0,
      hints: [
        'Bốn số cùng có bảy chữ số và cùng có 1 triệu.',
        'Em so sánh hàng trăm nghìn, rồi hàng chục nghìn.',
      ],
      solution:
        '1 100 000 có hàng trăm nghìn là 1, lớn nhất. Ba số còn lại: hàng chục nghìn là 0, 1, 9. Số bé nhất là 1 009 999.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số theo thứ tự từ bé đến lớn.',
      items: ['2 153 000', '2 099 999', '2 135 000', '998 000'],
      answer: [3, 1, 2, 0],
      hints: [
        '998 000 chỉ có sáu chữ số.',
        'Ba số còn lại cùng có 2 triệu: so sánh hàng trăm nghìn, rồi hàng chục nghìn.',
      ],
      solution: '998 000 < 2 099 999 < 2 135 000 < 2 153 000.',
    },
    {
      type: 'order',
      prompt:
        'Số dân năm 2020: Nhật Bản 126 476 461, Việt Nam 97 338 579, In-đô-nê-xi-a 273 523 615. Em xếp các nước theo số dân từ nhiều đến ít.',
      items: ['Nhật Bản', 'Việt Nam', 'In-đô-nê-xi-a'],
      answer: [2, 0, 1],
      hints: [
        'Số dân Việt Nam chỉ có tám chữ số.',
        'So sánh hàng trăm triệu của hai số chín chữ số.',
      ],
      solution:
        '273 523 615 > 126 476 461 > 97 338 579. Từ nhiều đến ít: In-đô-nê-xi-a, Nhật Bản, Việt Nam.',
    },
    {
      type: 'number',
      prompt: 'Số lớn nhất có sáu chữ số là số nào?',
      answer: 999999,
      hints: ['Mỗi hàng em chọn chữ số lớn nhất.'],
      solution: 'Sáu chữ số đều là 9: số lớn nhất có sáu chữ số là 999 999.',
    },
  ],
  takeaways: [
    'Số nào nhiều chữ số hơn thì lớn hơn.',
    'Cùng số chữ số: so sánh từng hàng từ trái sang phải; chữ số khác nhau đầu tiên quyết định.',
  ],
};
