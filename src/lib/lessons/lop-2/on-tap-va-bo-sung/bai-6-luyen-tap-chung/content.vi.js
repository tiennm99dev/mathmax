/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Ôn tập và bổ sung: tia số, chục và đơn vị, số liền trước, số liền sau, so sánh và sắp xếp số, cộng trừ không nhớ trong phạm vi 100 và giải bài toán.',
  intro:
    'Em đã ôn lại các số đến 100, tia số, phép cộng và phép trừ. Hôm nay em luyện tập tất cả cùng nhau và giải bài toán nhé!',
  objectives: [
    'Tìm số còn thiếu trên tia số.',
    'Viết số có hai chữ số thành tổng của số chục và số đơn vị.',
    'Tìm số liền trước, số liền sau của một số.',
    'So sánh, sắp xếp các số; cộng, trừ không nhớ trong phạm vi 100.',
    'Giải bài toán về nhiều hơn, ít hơn.',
  ],
  sections: [
    {
      heading: 'Nhớ lại về số',
      blocks: [
        {
          type: 'p',
          text: 'Trên tia số, mỗi số hơn số đứng trước nó 1.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chục và đơn vị',
          text: '56 gồm 5 chục và 6 đơn vị. Ta viết 56 = 50 + 6.',
        },
        {
          type: 'table',
          head: ['Số liền trước', 'Số', 'Số liền sau'],
          rows: [
            ['29', '30', '31'],
            ['65', '66', '67'],
            ['98', '99', '100'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Số lớn nhất có hai chữ số là 99. Số bé nhất có hai chữ số là 10. Số tròn chục lớn nhất có hai chữ số là 90.',
        },
      ],
    },
    {
      heading: 'So sánh và tính',
      blocks: [
        {
          type: 'p',
          text: 'So sánh hai số: em so sánh số chục trước. Số chục bằng nhau thì em so sánh số đơn vị.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ví dụ',
          text: '42 < 45, vì cùng 4 chục mà 2 đơn vị ít hơn 5 đơn vị.',
        },
        {
          type: 'p',
          text: 'Số hạng + số hạng = tổng. Số bị trừ − số trừ = hiệu.',
        },
        {
          type: 'p',
          text: 'Muốn biết nhiều hơn, ít hơn bao nhiêu, em lấy số lớn trừ số bé.',
        },
      ],
    },
  ],
  explore: {
    title: 'Luyện tập tổng hợp',
    instruction:
      'Mỗi bộ có 12 câu về tia số, chục và đơn vị, số liền trước, liền sau, so sánh, phép tính và bài toán. Em chạm vào đáp án. Sai thì em xem gợi ý và thử lại. Làm xong, em bấm "Làm bộ bài khác" để luyện thêm.',
  },
  examples: [
    {
      problem: 'Viết số 84 thành tổng của số chục và số đơn vị.',
      steps: ['84 gồm 8 chục và 4 đơn vị.', '8 chục là 80, 4 đơn vị là 4.', 'Vậy 84 = 80 + 4.'],
      answer: '84 = 80 + 4.',
    },
    {
      problem:
        'Bốn chiếc xe đua mang số 37, 45, 24, 42. Xếp các số theo thứ tự từ bé đến lớn. Tính tổng của số lớn nhất và số bé nhất.',
      steps: [
        'So sánh số chục: 24 có 2 chục, 37 có 3 chục, 42 và 45 có 4 chục.',
        'Cùng 4 chục: 42 < 45. Xếp từ bé đến lớn: 24, 37, 42, 45.',
        'Số lớn nhất là 45, số bé nhất là 24. Tính 45 + 24: 5 + 4 = 9, 4 + 2 = 6.',
      ],
      answer: 'Thứ tự: 24, 37, 42, 45. Tổng là 45 + 24 = 69.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số nào còn thiếu trên tia số: 47, 48, ?, 50?',
      options: ['39', '49', '59'],
      answer: 1,
      hints: ['Mỗi số hơn số đứng trước nó 1.', 'Số liền sau của 48 là số nào?'],
      solution: '47, 48, 49, 50. Số còn thiếu là 49.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số với tổng của số chục và số đơn vị.',
      left: ['56', '95', '84', '72'],
      right: ['50 + 6', '90 + 5', '80 + 4', '70 + 2', '60 + 5'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Chữ số bên trái là số chục, chữ số bên phải là số đơn vị.',
        '95 gồm 9 chục và 5 đơn vị.',
      ],
      solution: '56 = 50 + 6. 95 = 90 + 5. 84 = 80 + 4. 72 = 70 + 2.',
    },
    {
      type: 'choice',
      prompt: 'Số gồm 6 chục và 3 đơn vị là số nào?',
      options: ['36', '63', '9'],
      answer: 1,
      hints: ['Em viết số chục trước, rồi viết số đơn vị.'],
      solution: '6 chục và 3 đơn vị là 63. 63 = 60 + 3.',
    },
    {
      type: 'choice',
      prompt: 'Số liền trước của 30 là số nào?',
      options: ['29', '31', '20'],
      answer: 0,
      hints: ['Số liền trước kém số đã cho 1.'],
      solution: '30 − 1 = 29. Số liền trước của 30 là 29.',
    },
    {
      type: 'choice',
      prompt: 'Số liền sau của 59 là số nào?',
      options: ['58', '60', '69'],
      answer: 1,
      hints: ['Số liền sau hơn số đã cho 1.'],
      solution: '59 + 1 = 60. Số liền sau của 59 là 60.',
    },
    {
      type: 'choice',
      prompt: 'Số liền trước của số lớn nhất có hai chữ số là số nào?',
      options: ['100', '98', '99'],
      answer: 1,
      hints: ['Số lớn nhất có hai chữ số là số nào?', 'Rồi em bớt đi 1.'],
      solution: 'Số lớn nhất có hai chữ số là 99. Số liền trước của 99 là 98.',
    },
    {
      type: 'choice',
      prompt: 'Số liền sau của số tròn chục lớn nhất có hai chữ số là số nào?',
      options: ['91', '89', '100'],
      answer: 0,
      hints: ['Số tròn chục lớn nhất có hai chữ số là số nào?', 'Rồi em thêm 1.'],
      solution: 'Số tròn chục lớn nhất có hai chữ số là 90. Số liền sau của 90 là 91.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ bé đến lớn.',
      items: ['39', '23', '56', '34'],
      answer: [1, 3, 0, 2],
      hints: ['Em so sánh số chục trước.', '39 và 34 cùng 3 chục: so sánh số đơn vị.'],
      solution: 'Từ bé đến lớn: 23, 34, 39, 56.',
    },
    {
      type: 'choice',
      prompt: 'Tổng của 32 và 6 là:',
      options: ['92', '38', '82'],
      answer: 1,
      hints: ['Muốn tính tổng, em cộng hai số.', '6 viết thẳng cột đơn vị với 2.'],
      solution: '32 + 6 = 38. Tổng là 38.',
    },
    {
      type: 'choice',
      prompt: 'Hiệu của 89 và 54 là:',
      options: ['35', '45', '143'],
      answer: 0,
      hints: [
        'Muốn tính hiệu, em lấy số bị trừ trừ đi số trừ.',
        'Hàng đơn vị: 9 − 4. Hàng chục: 8 − 5.',
      ],
      solution: '9 − 4 = 5, 8 − 5 = 3. Vậy 89 − 54 = 35. Hiệu là 35.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 42 + 6 ... 50',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Em tính 42 + 6 trước, rồi so sánh với 50.'],
      solution: '42 + 6 = 48. 48 < 50, nên 42 + 6 < 50.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 68 − 44 ... 20 + 4',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Em tính cả hai bên rồi so sánh.'],
      solution: '68 − 44 = 24 và 20 + 4 = 24. Vậy 68 − 44 = 20 + 4.',
    },
    {
      type: 'choice',
      prompt: 'Có các số 23, 34, 39, 56. Tổng của số lớn nhất và số bé nhất là bao nhiêu?',
      options: ['33', '79', '89'],
      answer: 1,
      hints: ['Số lớn nhất là số nào? Số bé nhất là số nào?', 'Rồi em cộng hai số đó.'],
      solution: 'Số lớn nhất là 56, số bé nhất là 23. 56 + 23 = 79.',
    },
    {
      type: 'choice',
      prompt:
        'Lớp 2A trồng được 29 cây, lớp 2B trồng được 25 cây. Hỏi lớp 2A trồng được nhiều hơn lớp 2B bao nhiêu cây?',
      options: ['54', '4', '14'],
      answer: 1,
      hints: ['Muốn biết nhiều hơn bao nhiêu, em lấy số lớn trừ số bé.', 'Tính 29 − 25.'],
      solution: 'Lớp 2A trồng được nhiều hơn lớp 2B số cây là: 29 − 25 = 4 (cây). Đáp số: 4 cây.',
    },
  ],
  takeaways: [
    'Trên tia số, mỗi số hơn số đứng trước nó 1.',
    'Số liền trước kém 1, số liền sau hơn 1.',
    'So sánh số chục trước, rồi đến số đơn vị.',
    'Nhiều hơn, ít hơn bao nhiêu: lấy số lớn trừ số bé.',
  ],
};
