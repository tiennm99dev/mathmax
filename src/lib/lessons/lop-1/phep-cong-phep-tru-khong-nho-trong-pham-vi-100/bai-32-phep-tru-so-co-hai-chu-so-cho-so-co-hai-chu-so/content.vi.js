/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép trừ số có hai chữ số cho số có hai chữ số (không nhớ): bớt bó chục và que rời, đặt tính thẳng cột, trừ đơn vị rồi trừ chục, trừ nhẩm các số tròn chục.',
  intro:
    'Vườn có 75 cây nhãn và cây vải, trong đó có 25 cây nhãn. Vườn có bao nhiêu cây vải? Em học trừ hai số có hai chữ số nhé!',
  objectives: [
    'Đặt tính thẳng cột: chục thẳng chục, đơn vị thẳng đơn vị.',
    'Trừ đơn vị cho đơn vị, rồi trừ chục cho chục.',
    'Trừ nhẩm các số tròn chục.',
  ],
  sections: [
    {
      heading: 'Bớt que tính',
      blocks: [
        {
          type: 'p',
          text: 'Số 76 gồm 7 bó chục và 6 que rời. Em bớt đi 34 que: 3 bó chục và 4 que rời.',
        },
        {
          type: 'p',
          text: 'Bớt que rời: 6 que bớt 4 que còn 2 que. Bớt bó chục: 7 bó bớt 3 bó còn 4 bó.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kết quả',
          text: '4 chục và 2 đơn vị là 42. Vậy 76 − 34 = 42.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'p',
          text: 'Em viết 76, rồi viết 34 ở dưới: chục thẳng chục, đơn vị thẳng đơn vị. Em viết dấu − và kẻ vạch ngang.',
        },
        {
          type: 'tex',
          tex: '\\begin{array}{ccc} & 7 & 6 \\\\ - & 3 & 4 \\\\ \\hline & 4 & 2 \\end{array}',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cách tính',
          text: 'Tính từ phải sang trái. 6 trừ 4 bằng 2, viết 2. 7 trừ 3 bằng 4, viết 4.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Trừ hàng đơn vị trước, rồi mới trừ hàng chục. Số bị trừ viết ở trên.',
        },
      ],
    },
    {
      heading: 'Trừ các số tròn chục',
      blocks: [
        {
          type: 'p',
          text: '70 là 7 chục. 50 là 5 chục. 7 chục bớt 5 chục còn 2 chục.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính nhẩm',
          text: '7 chục − 5 chục = 2 chục, vậy 70 − 50 = 20.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Em nhẩm', 'Kết quả'],
          rows: [
            ['90 − 70', '9 chục − 7 chục = 2 chục', '20'],
            ['80 − 10', '8 chục − 1 chục = 7 chục', '70'],
            ['70 − 30', '7 chục − 3 chục = 4 chục', '40'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Trừ từng cột',
    instruction:
      'Cột được tô màu là cột em đang tính. Chạm chữ số đúng cho hàng đơn vị trước: que rời bị gạch bớt. Rồi tính hàng chục: bó chục bị gạch bớt. Chọn "Phép tính khác" để làm tiếp.',
  },
  examples: [
    {
      problem: 'Vườn có 75 cây nhãn và cây vải. Có 25 cây nhãn. Vườn có bao nhiêu cây vải?',
      steps: [
        'Lấy tất cả số cây bớt đi số cây nhãn: 75 − 25.',
        '5 trừ 5 bằng 0, viết 0.',
        '7 trừ 2 bằng 5, viết 5.',
      ],
      answer: '75 − 25 = 50. Vườn có 50 cây vải.',
    },
    {
      problem: 'Đống gạch có 86 viên. Người ta chuyển đi 50 viên. Còn lại bao nhiêu viên gạch?',
      steps: [
        'Chuyển đi là bớt đi: 86 − 50.',
        '6 trừ 0 bằng 6, viết 6.',
        '8 trừ 5 bằng 3, viết 3.',
      ],
      answer: '86 − 50 = 36. Còn lại 36 viên gạch.',
    },
    {
      problem: 'Tính nhẩm: 90 − 70.',
      steps: ['90 là 9 chục, 70 là 7 chục.', '9 chục − 7 chục = 2 chục.'],
      answer: '90 − 70 = 20.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '76 − 34 = ?',
      options: ['42', '32', '24'],
      answer: 0,
      hints: ['Trừ hàng đơn vị: 6 trừ 4.', 'Trừ hàng chục: 7 trừ 3.'],
      solution: '6 trừ 4 bằng 2, viết 2. 7 trừ 3 bằng 4, viết 4. 76 − 34 = 42.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['92 − 72', '86 − 64', '65 − 25', '77 − 53'],
      right: ['20', '22', '40', '24'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Trừ đơn vị cho đơn vị, rồi trừ chục cho chục.'],
      solution: '92 − 72 = 20, 86 − 64 = 22, 65 − 25 = 40, 77 − 53 = 24.',
    },
    {
      type: 'choice',
      prompt: 'Vườn có 75 cây nhãn và cây vải, trong đó có 25 cây nhãn. Vườn có bao nhiêu cây vải?',
      options: ['55', '50', '100'],
      answer: 1,
      hints: ['Lấy tất cả bớt đi số cây nhãn.', 'Tính 75 − 25.'],
      solution: '75 − 25 = 50. Vườn có 50 cây vải.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 70 − 50 = ?',
      options: ['2', '20', '120'],
      answer: 1,
      hints: ['70 là 7 chục, 50 là 5 chục.'],
      solution: '7 chục − 5 chục = 2 chục. 70 − 50 = 20.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả phép tính có kết quả là 30.',
      options: ['40 − 10', '70 − 40', '90 − 60', '80 − 30'],
      answers: [0, 1, 2],
      hints: ['Nhẩm theo chục: 4 chục bớt 1 chục còn mấy chục?'],
      solution: '40 − 10 = 30, 70 − 40 = 30, 90 − 60 = 30. Còn 80 − 30 = 50.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['65 − 41', '89 − 60', '58 − 30', '67 − 36'],
      answer: [0, 2, 1, 3],
      hints: ['Tính kết quả từng phép tính trước.'],
      solution:
        '65 − 41 = 24, 58 − 30 = 28, 89 − 60 = 29, 67 − 36 = 31. Thứ tự: 65 − 41, 58 − 30, 89 − 60, 67 − 36.',
    },
    {
      type: 'choice',
      prompt: 'Phép tính nào có kết quả lớn nhất?',
      options: ['70 − 20', '54 − 14', '35 − 10'],
      answer: 0,
      hints: ['Tính kết quả từng phép tính rồi so sánh.'],
      solution: '70 − 20 = 50, 54 − 14 = 40, 35 − 10 = 25. Lớn nhất là 50.',
    },
    {
      type: 'choice',
      prompt: 'Số nào điền vào chỗ trống? 68 − ... = 25',
      options: ['34', '43', '93'],
      answer: 1,
      hints: ['Hàng đơn vị: 8 bớt mấy thì còn 5?', 'Hàng chục: 6 bớt mấy thì còn 2?'],
      solution: '8 trừ 3 bằng 5, 6 trừ 4 bằng 2. Vậy 68 − 43 = 25. Số cần điền là 43.',
    },
    {
      type: 'choice',
      prompt: 'Đống gạch có 86 viên. Chuyển đi 50 viên. Còn lại bao nhiêu viên gạch?',
      options: ['81', '36', '46'],
      answer: 1,
      hints: ['Chuyển đi là bớt đi.', 'Tính 86 − 50: 6 trừ 0, rồi 8 trừ 5.'],
      solution: '86 − 50 = 36. Còn lại 36 viên gạch.',
    },
  ],
  takeaways: [
    'Đặt tính: chục thẳng chục, đơn vị thẳng đơn vị.',
    'Trừ đơn vị cho đơn vị, rồi trừ chục cho chục.',
    'Số tròn chục: 7 chục − 5 chục = 2 chục, nên 70 − 50 = 20.',
  ],
};
