/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập các số trong phạm vi 10 000, 100 000: đọc, viết số, viết số thành tổng, so sánh và sắp xếp, làm tròn số, số liền trước, số liền sau và chữ số La Mã.',
  intro:
    'Bốn xưởng may làm được 42 000, 37 000, 28 000 và 50 000 chiếc khẩu trang trong một ngày. Xưởng nào làm được nhiều nhất? Hôm nay em ôn lại các số đến 100 000. Bài ôn tập sẽ cho em biết phần nào đã vững nhé!',
  objectives: [
    'Đọc, viết các số trong phạm vi 100 000.',
    'Viết một số thành tổng các chục nghìn, nghìn, trăm, chục, đơn vị.',
    'So sánh, sắp xếp các số; tìm số lớn nhất, số bé nhất.',
    'Làm tròn số đến hàng nghìn, hàng chục nghìn.',
    'Đọc, viết số La Mã từ I đến XX.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Đọc, viết số',
      blocks: [
        {
          type: 'p',
          text: 'Em đọc phần nghìn trước, rồi đọc ba chữ số cuối như một số có ba chữ số.',
        },
        {
          type: 'table',
          head: ['Số', 'Đọc là'],
          rows: [
            ['9 084', 'chín nghìn không trăm tám mươi tư'],
            ['61 409', 'sáu mươi mốt nghìn bốn trăm linh chín'],
            ['95 027', 'chín mươi lăm nghìn không trăm hai mươi bảy'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chữ số 0',
          text: 'Hàng trăm là 0 thì đọc "không trăm". Hàng chục là 0, hàng đơn vị khác 0 thì đọc "linh".',
        },
      ],
    },
    {
      heading: 'Viết số thành tổng',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi chữ số cho biết có mấy chục nghìn, mấy nghìn, mấy trăm, mấy chục, mấy đơn vị.',
        },
        {
          type: 'table',
          head: ['Số', 'Viết thành tổng'],
          rows: [
            ['8 327', '8 000 + 300 + 20 + 7'],
            ['25 468', '20 000 + 5 000 + 400 + 60 + 8'],
            ['46 109', '40 000 + 6 000 + 100 + 9'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Hàng nào có chữ số 0 thì em không viết hàng đó vào tổng. Ngược lại, khi viết số từ tổng, hàng nào thiếu thì em viết chữ số 0.',
        },
      ],
    },
    {
      heading: 'So sánh, sắp xếp',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số nào có ít chữ số hơn thì bé hơn. Hai số có cùng số chữ số thì em so sánh từng hàng, từ trái sang phải.',
        },
        {
          type: 'list',
          items: [
            '9 999 < 10 001, vì 9 999 chỉ có bốn chữ số.',
            '90 537 > 90 357, vì hàng chục nghìn và hàng nghìn giống nhau, ở hàng trăm 5 > 3.',
          ],
        },
      ],
    },
    {
      heading: 'Làm tròn số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Làm tròn đến hàng nghìn: em nhìn chữ số hàng trăm. Làm tròn đến hàng chục nghìn: em nhìn chữ số hàng nghìn. Chữ số đó bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
        },
        {
          type: 'table',
          head: ['Số', 'Làm tròn đến hàng nghìn', 'Làm tròn đến hàng chục nghìn'],
          rows: [
            ['48 620', '49 000', '50 000'],
            ['74 385', '74 000', '70 000'],
          ],
        },
      ],
    },
    {
      heading: 'Chữ số La Mã',
      blocks: [
        {
          type: 'table',
          head: ['I', 'V', 'X', 'IV', 'IX', 'XIV', 'XIX', 'XX'],
          rows: [['1', '5', '10', '4', '9', '14', '19', '20']],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Chữ I đứng bên phải V hoặc X thì thêm 1. Chữ I đứng bên trái V hoặc X thì bớt 1.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Em chạm vào đáp án đúng. Sai lần đầu sẽ có gợi ý. Phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Bảng màu cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem:
        'Bốn xưởng may làm được 42 000, 37 000, 28 000 và 50 000 chiếc khẩu trang trong một ngày. Xếp các số đó theo thứ tự từ lớn đến bé.',
      steps: [
        'Bốn số đều có năm chữ số. Em so sánh hàng chục nghìn: 5 > 4 > 3 > 2.',
        'Vậy 50 000 > 42 000 > 37 000 > 28 000.',
      ],
      answer: 'Từ lớn đến bé: 50 000; 42 000; 37 000; 28 000.',
    },
    {
      problem: 'Tìm số tròn chục lớn nhất có bốn chữ số khác nhau.',
      steps: [
        'Số tròn chục có chữ số hàng đơn vị là 0.',
        'Hàng nghìn em chọn chữ số lớn nhất là 9.',
        'Hàng trăm chọn 8, hàng chục chọn 7, để các chữ số khác nhau.',
      ],
      answer: 'Số đó là 9 870.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số 61 409 đọc là:',
      options: [
        'sáu mươi mốt nghìn bốn trăm linh chín',
        'sáu mươi mốt nghìn bốn trăm chín mươi',
        'sáu mươi mốt nghìn không trăm bốn mươi chín',
        'sáu nghìn một trăm bốn mươi chín',
      ],
      answer: 0,
      hints: ['Em đọc 61 nghìn trước, rồi đọc 409.'],
      solution: '61 409 đọc là: sáu mươi mốt nghìn bốn trăm linh chín.',
    },
    {
      type: 'number',
      prompt: 'Viết số: năm mươi nghìn bảy trăm linh một.',
      answer: 50701,
      hints: ['Hàng nghìn và hàng chục không được đọc tên, em viết chữ số 0.'],
      solution: 'Năm mươi nghìn bảy trăm linh một viết là 50 701.',
    },
    {
      type: 'number',
      prompt: 'Số nào thích hợp thay cho dấu ?: 35 780; 35 790; ?; 35 810.',
      answer: 35800,
      hints: ['Hai số liền nhau trong dãy hơn kém nhau 10.'],
      solution: '35 790 + 10 = 35 800. Số cần điền là 35 800.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 9 999 ? 10 001',
      options: ['<', '>', '='],
      answer: 0,
      hints: ['Em đếm số chữ số của mỗi số.'],
      solution: '9 999 có bốn chữ số, 10 001 có năm chữ số. Vậy 9 999 < 10 001.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 90 537 ? 90 357',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Hai số có cùng số chữ số. Em so sánh từng hàng từ trái sang phải.'],
      solution:
        'Hàng chục nghìn và hàng nghìn giống nhau. Ở hàng trăm: 5 > 3. Vậy 90 537 > 90 357.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ bé đến lớn.',
      items: ['42 000', '37 000', '28 000', '50 000'],
      answer: [2, 1, 0, 3],
      hints: ['Em so sánh chữ số hàng chục nghìn của các số.'],
      solution: 'Từ bé đến lớn: 28 000; 37 000; 42 000; 50 000.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi tổng với số của nó.',
      left: [
        '30 000 + 4 000 + 500',
        '80 000 + 800 + 10 + 9',
        '7 000 + 600 + 20 + 3',
        '90 000 + 500 + 2',
      ],
      right: ['34 500', '80 819', '7 623', '90 502', '90 520'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hàng nào không có trong tổng thì em viết chữ số 0.'],
      solution:
        '30 000 + 4 000 + 500 = 34 500. 80 000 + 800 + 10 + 9 = 80 819. 7 000 + 600 + 20 + 3 = 7 623. 90 000 + 500 + 2 = 90 502.',
    },
    {
      type: 'number',
      prompt: 'Số nào thích hợp thay cho dấu ?: 48 620 = 40 000 + 8 000 + 600 + ?',
      answer: 20,
      hints: ['Hàng chục của 48 620 có chữ số 2.'],
      solution: '48 620 = 40 000 + 8 000 + 600 + 20. Số cần điền là 20.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 48 620 đến hàng nghìn ta được số nào?',
      answer: 49000,
      hints: ['Em nhìn chữ số hàng trăm của 48 620.'],
      solution: 'Chữ số hàng trăm là 6, 6 ≥ 5 nên làm tròn lên. Ta được 49 000.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn số 74 385 đến hàng chục nghìn ta được số nào?',
      options: ['70 000', '74 000', '80 000', '75 000'],
      answer: 0,
      hints: ['Em nhìn chữ số hàng nghìn của 74 385.'],
      solution: 'Chữ số hàng nghìn là 4, 4 < 5 nên làm tròn xuống. Ta được 70 000.',
    },
    {
      type: 'number',
      prompt: 'Số liền sau của 9 999 là số nào?',
      answer: 10000,
      hints: ['Số liền sau hơn số đã cho 1 đơn vị.'],
      solution: '9 999 + 1 = 10 000.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số La Mã với số của nó.',
      left: ['IV', 'IX', 'XIV', 'XX'],
      right: ['4', '9', '14', '20', '6'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['I là 1, V là 5, X là 10. Chữ I đứng bên trái thì bớt 1.'],
      solution: 'IV là 4, IX là 9, XIV là 14, XX là 20.',
    },
    {
      type: 'number',
      prompt: 'Số tròn chục bé nhất có bốn chữ số khác nhau là số nào?',
      answer: 1230,
      hints: ['Số tròn chục có hàng đơn vị là 0. Hàng nghìn không thể là 0.'],
      solution:
        'Hàng đơn vị là 0. Hàng nghìn bé nhất là 1, hàng trăm là 2, hàng chục là 3. Số đó là 1 230.',
    },
  ],
  takeaways: [
    'Đọc phần nghìn trước, rồi đọc ba chữ số cuối.',
    'Số có ít chữ số hơn thì bé hơn; cùng số chữ số thì so sánh từ trái sang phải.',
    'Làm tròn: chữ số được nhìn bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
    'I là 1, V là 5, X là 10.',
  ],
};
