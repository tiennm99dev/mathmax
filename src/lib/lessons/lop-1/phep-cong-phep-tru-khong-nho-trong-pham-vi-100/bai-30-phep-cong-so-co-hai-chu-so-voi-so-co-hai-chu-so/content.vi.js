/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép cộng số có hai chữ số với số có hai chữ số (không nhớ): đặt tính thẳng cột, cộng đơn vị rồi cộng chục, cộng nhẩm các số tròn chục.',
  intro:
    'Trên cây có 15 con chim. 24 con chim nữa bay đến. Trên cây có tất cả bao nhiêu con chim? Em học cộng hai số có hai chữ số nhé!',
  objectives: [
    'Đặt tính thẳng cột: chục thẳng chục, đơn vị thẳng đơn vị.',
    'Cộng đơn vị với đơn vị, rồi cộng chục với chục.',
    'Cộng nhẩm các số tròn chục.',
  ],
  sections: [
    {
      heading: 'Cộng bằng que tính',
      blocks: [
        {
          type: 'p',
          text: 'Số 21 gồm 2 bó chục và 1 que rời. Số 14 gồm 1 bó chục và 4 que rời.',
        },
        {
          type: 'p',
          text: 'Gộp que rời: 1 que và 4 que là 5 que. Gộp bó chục: 2 bó và 1 bó là 3 bó.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kết quả',
          text: '3 chục và 5 đơn vị là 35. Vậy 21 + 14 = 35.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'p',
          text: 'Em viết 21, rồi viết 14 ở dưới: chục thẳng chục, đơn vị thẳng đơn vị. Em viết dấu + và kẻ vạch ngang.',
        },
        {
          type: 'tex',
          tex: '\\begin{array}{ccc} & 2 & 1 \\\\ + & 1 & 4 \\\\ \\hline & 3 & 5 \\end{array}',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cách tính',
          text: 'Tính từ phải sang trái. 1 cộng 4 bằng 5, viết 5. 2 cộng 1 bằng 3, viết 3.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Cộng hàng đơn vị trước, rồi mới cộng hàng chục.',
        },
      ],
    },
    {
      heading: 'Cộng các số tròn chục',
      blocks: [
        {
          type: 'p',
          text: '30 là 3 chục. 40 là 4 chục. 3 chục cộng 4 chục là 7 chục.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính nhẩm',
          text: '3 chục + 4 chục = 7 chục, vậy 30 + 40 = 70.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Em nhẩm', 'Kết quả'],
          rows: [
            ['10 + 50', '1 chục + 5 chục = 6 chục', '60'],
            ['20 + 50', '2 chục + 5 chục = 7 chục', '70'],
            ['10 + 30', '1 chục + 3 chục = 4 chục', '40'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Cộng từng cột',
    instruction:
      'Cột được tô màu là cột em đang tính. Chạm chữ số đúng cho hàng đơn vị trước, rồi cho hàng chục. Xem que tính để đếm. Chọn "Phép tính khác" để làm tiếp.',
  },
  examples: [
    {
      problem:
        'Trên cây có 15 con chim. Có thêm 24 con chim bay đến. Trên cây có tất cả bao nhiêu con chim?',
      steps: [
        'Thêm vào thì em làm phép cộng: 15 + 24.',
        '5 cộng 4 bằng 9, viết 9.',
        '1 cộng 2 bằng 3, viết 3.',
      ],
      answer: '15 + 24 = 39. Trên cây có tất cả 39 con chim.',
    },
    {
      problem:
        'Cây cà chua thứ nhất có 10 quả. Cây thứ hai có 26 quả. Cả hai cây có bao nhiêu quả cà chua?',
      steps: [
        'Gộp lại thì em làm phép cộng: 10 + 26.',
        '0 cộng 6 bằng 6, viết 6.',
        '1 cộng 2 bằng 3, viết 3.',
      ],
      answer: '10 + 26 = 36. Cả hai cây có 36 quả cà chua.',
    },
    {
      problem: 'Tính nhẩm: 20 + 40.',
      steps: ['20 là 2 chục, 40 là 4 chục.', '2 chục + 4 chục = 6 chục.'],
      answer: '20 + 40 = 60.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '21 + 14 = ?',
      options: ['25', '35', '53'],
      answer: 1,
      hints: ['Cộng hàng đơn vị: 1 cộng 4.', 'Cộng hàng chục: 2 cộng 1.'],
      solution: '1 cộng 4 bằng 5, viết 5. 2 cộng 1 bằng 3, viết 3. 21 + 14 = 35.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['43 + 25', '52 + 36', '10 + 26', '61 + 30'],
      right: ['68', '88', '36', '91'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Cộng đơn vị với đơn vị, rồi cộng chục với chục.'],
      solution: '43 + 25 = 68, 52 + 36 = 88, 10 + 26 = 36, 61 + 30 = 91.',
    },
    {
      type: 'choice',
      prompt:
        'Trên cây có 15 con chim. 24 con chim nữa bay đến. Trên cây có tất cả bao nhiêu con chim?',
      options: ['29', '39', '93'],
      answer: 1,
      hints: ['Bay đến là thêm vào: em làm phép cộng.', 'Tính 15 + 24.'],
      solution: '15 + 24 = 39. Trên cây có tất cả 39 con chim.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 30 + 40 = ?',
      options: ['7', '34', '70'],
      answer: 2,
      hints: ['30 là 3 chục, 40 là 4 chục.'],
      solution: '3 chục + 4 chục = 7 chục. 30 + 40 = 70.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả phép tính có kết quả là 60.',
      options: ['10 + 50', '20 + 40', '30 + 30', '40 + 30'],
      answers: [0, 1, 2],
      hints: ['Nhẩm theo chục: 1 chục + 5 chục là mấy chục?'],
      solution: '10 + 50 = 60, 20 + 40 = 60, 30 + 30 = 60. Còn 40 + 30 = 70.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['80 + 3', '2 + 40', '25 + 21'],
      answer: [1, 2, 0],
      hints: ['Tính kết quả từng phép tính trước.'],
      solution: '2 + 40 = 42, 25 + 21 = 46, 80 + 3 = 83. Thứ tự: 2 + 40, 25 + 21, 80 + 3.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính 52 + 36: chữ số 3 viết thẳng cột với chữ số nào của 52?',
      options: ['Chữ số 5 (hàng chục)', 'Chữ số 2 (hàng đơn vị)'],
      answer: 0,
      hints: ['Trong số 36, chữ số 3 ở hàng chục.'],
      solution: 'Chục thẳng chục: chữ số 3 viết dưới chữ số 5. 52 + 36 = 88.',
    },
    {
      type: 'choice',
      prompt: 'Số nào điền vào chỗ trống? 34 + ... = 59',
      options: ['25', '35', '52'],
      answer: 0,
      hints: ['Hàng đơn vị: 4 cộng mấy bằng 9?', 'Hàng chục: 3 cộng mấy bằng 5?'],
      solution: '4 cộng 5 bằng 9, 3 cộng 2 bằng 5. Vậy 34 + 25 = 59. Số cần điền là 25.',
    },
    {
      type: 'choice',
      prompt: 'Tính 21 + 14: sau khi viết 5 ở hàng đơn vị, em làm gì tiếp?',
      options: ['Hạ 2, viết 2', '2 cộng 1 bằng 3, viết 3', '1 cộng 4 bằng 5, viết 5'],
      answer: 1,
      hints: ['Hàng chục có hai chữ số: 2 và 1.'],
      solution: 'Hàng chục có 2 và 1: 2 cộng 1 bằng 3, viết 3. Vậy 21 + 14 = 35.',
    },
  ],
  takeaways: [
    'Đặt tính: chục thẳng chục, đơn vị thẳng đơn vị.',
    'Cộng đơn vị với đơn vị, rồi cộng chục với chục.',
    'Số tròn chục: 3 chục + 4 chục = 7 chục, nên 30 + 40 = 70.',
  ],
};
