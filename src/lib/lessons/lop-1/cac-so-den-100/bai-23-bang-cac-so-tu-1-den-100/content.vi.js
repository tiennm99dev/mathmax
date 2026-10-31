/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bảng các số từ 1 đến 100: số 100 (một trăm), quy luật trong hàng thêm 1, trong cột thêm 10, số tròn chục và tìm số còn thiếu.',
  intro:
    'Em đã biết đếm đến 99. Đếm thêm 1 nữa là được số nào? Hôm nay em làm quen với số 100 và bảng các số từ 1 đến 100.',
  objectives: [
    'Đọc, viết số 100.',
    'Biết quy luật của bảng: sang phải thêm 1, xuống dưới thêm 10.',
    'Tìm số còn thiếu trong bảng các số từ 1 đến 100.',
  ],
  sections: [
    {
      heading: 'Số 100',
      blocks: [
        {
          type: 'p',
          text: 'Em đếm: chín mươi tám, chín mươi chín. 99 thêm 1 là 100.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số 100',
          text: 'Số 100 đọc là "một trăm". 10 chục là 100.',
        },
        {
          type: 'p',
          text: 'Số 100 có ba chữ số: 1, 0 và 0.',
        },
      ],
    },
    {
      heading: 'Bảng các số từ 1 đến 100',
      blocks: [
        {
          type: 'p',
          text: 'Bảng có 10 hàng, mỗi hàng 10 ô. Hàng đầu từ 1 đến 10, hàng thứ hai từ 11 đến 20, ...',
        },
        {
          type: 'table',
          head: ['Hàng', 'Các số'],
          rows: [
            ['Hàng 1', '1, 2, 3, ..., 10'],
            ['Hàng 2', '11, 12, 13, ..., 20'],
            ['Hàng 3', '21, 22, 23, ..., 30'],
            ['Hàng 10', '91, 92, 93, ..., 100'],
          ],
        },
      ],
    },
    {
      heading: 'Quy luật hàng và cột',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Trong một hàng',
          text: 'Sang phải một ô thì thêm 1: 34, 35, 36.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Trong một cột',
          text: 'Xuống dưới một ô thì thêm 10: 5, 15, 25, 35. Các số trong một cột có cùng chữ số hàng đơn vị.',
        },
        {
          type: 'p',
          text: 'Cột cuối có các số tròn chục: 10, 20, 30, ..., 90, và số 100.',
        },
        {
          type: 'p',
          text: 'Các số có hai chữ số giống nhau 11, 22, 33, ..., 99 nằm trên một đường chéo.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng 100 ô',
    instruction:
      'Chọn một quy luật rồi chạm vào các ô đúng để tô màu. Chọn "Tìm số còn thiếu" để điền số vào ô có dấu ?: chạm vào ô trống rồi chạm số đúng. Phím mũi tên đi giữa các ô.',
  },
  examples: [
    {
      problem: 'Trong bảng, ô ngay dưới số 47 là số nào?',
      steps: [
        'Xuống dưới một ô thì thêm 10.',
        '4 chục thêm 1 chục là 5 chục, hàng đơn vị vẫn là 7.',
      ],
      answer: 'Số 57.',
    },
    {
      problem: 'Tìm số còn thiếu: 68, 69, ?, 71',
      steps: ['Các số đứng liền nhau trong một hàng: mỗi số thêm 1.', '69 thêm 1 là 70.'],
      answer: 'Số còn thiếu là 70.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '99 thêm 1 là số nào?',
      options: ['90', '100', '98'],
      answer: 1,
      hints: ['Em đếm tiếp sau chín mươi chín.'],
      solution: '99 thêm 1 là 100, đọc là một trăm.',
    },
    {
      type: 'choice',
      prompt: 'Trong bảng, ô ngay bên phải số 47 là số nào?',
      options: ['46', '48', '57'],
      answer: 1,
      hints: ['Sang phải một ô thì thêm 1.'],
      solution: '47 thêm 1 là 48.',
    },
    {
      type: 'choice',
      prompt: 'Trong bảng, ô ngay dưới số 36 là số nào?',
      options: ['37', '26', '46'],
      answer: 2,
      hints: ['Xuống dưới một ô thì thêm 10.'],
      solution: '36 thêm 10 là 46.',
    },
    {
      type: 'choice',
      prompt: 'Trong bảng, ô ngay trên số 82 là số nào?',
      options: ['72', '81', '92'],
      answer: 0,
      hints: ['Lên trên một ô thì bớt 10.'],
      solution: '82 bớt 10 là 72.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi ô quanh số 45 với số đúng.',
      left: ['Ô bên trái 45', 'Ô bên phải 45', 'Ô ngay trên 45', 'Ô ngay dưới 45'],
      right: ['35', '55', '46', '44'],
      pairs: [
        [0, 3],
        [1, 2],
        [2, 0],
        [3, 1],
      ],
      hints: ['Trái bớt 1, phải thêm 1.', 'Trên bớt 10, dưới thêm 10.'],
      solution: 'Bên trái là 44, bên phải là 46, ngay trên là 35, ngay dưới là 55.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số tròn chục.',
      options: ['20', '25', '60', '91', '80'],
      answers: [0, 2, 4],
      hints: ['Số tròn chục có chữ số 0 ở hàng đơn vị.'],
      solution: '20, 60 và 80 là số tròn chục.',
    },
    {
      type: 'choice',
      prompt: 'Số nào có hai chữ số giống nhau?',
      options: ['12', '33', '30'],
      answer: 1,
      hints: ['Chữ số hàng chục và hàng đơn vị như nhau.'],
      solution: '33 có chữ số 3 ở cả hàng chục và hàng đơn vị.',
    },
    {
      type: 'order',
      prompt: 'Đây là các số trong một hàng của bảng. Xếp theo thứ tự từ trái sang phải.',
      items: ['54', '52', '55', '51', '53'],
      answer: [3, 1, 4, 0, 2],
      hints: ['Sang phải một ô thì thêm 1.', 'Bắt đầu từ số bé nhất.'],
      solution: '51, 52, 53, 54, 55.',
    },
    {
      type: 'choice',
      prompt: 'Tìm số còn thiếu: 9, 19, 29, ?, 49',
      options: ['30', '39', '40'],
      answer: 1,
      hints: ['Các số này nằm trong một cột của bảng.', 'Mỗi số thêm 10.'],
      solution: '29 thêm 10 là 39.',
    },
    {
      type: 'choice',
      prompt: '10 chục là bao nhiêu?',
      options: ['10', '100', '1'],
      answer: 1,
      hints: ['9 chục là 90. Thêm 1 chục nữa.'],
      solution: '10 chục là 100.',
    },
  ],
  takeaways: [
    'Số 100 đọc là một trăm; 99 thêm 1 là 100; 10 chục là 100.',
    'Trong bảng, sang phải một ô thì thêm 1.',
    'Xuống dưới một ô thì thêm 10; các số trong một cột có cùng chữ số hàng đơn vị.',
  ],
};
