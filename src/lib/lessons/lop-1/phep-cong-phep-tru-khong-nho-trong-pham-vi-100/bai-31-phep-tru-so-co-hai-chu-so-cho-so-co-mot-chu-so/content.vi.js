/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép trừ số có hai chữ số cho số có một chữ số (không nhớ): bớt que tính, đặt tính theo cột, trừ hàng đơn vị rồi hạ số chục.',
  intro:
    'Xe buýt chở 29 hành khách. Đến bến, 5 người xuống xe. Trên xe còn lại bao nhiêu người? Em cùng học phép trừ theo cột nhé!',
  objectives: [
    'Trừ số có hai chữ số cho số có một chữ số bằng que tính.',
    'Đặt tính theo cột: đơn vị thẳng cột với đơn vị.',
    'Tính từ phải sang trái: trừ hàng đơn vị, rồi hạ số chục.',
  ],
  sections: [
    {
      heading: 'Bớt que tính',
      blocks: [
        {
          type: 'p',
          text: 'Số 76 gồm 7 bó chục và 6 que rời. Em bớt đi 5 que rời.',
        },
        {
          type: 'p',
          text: '6 que rời bớt 5 que rời còn 1 que rời. 7 bó chục vẫn giữ nguyên.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kết quả',
          text: '7 chục và 1 đơn vị là 71. Vậy 76 − 5 = 71.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'p',
          text: 'Em viết 76. Em viết 5 dưới 6, thẳng cột đơn vị. Em viết dấu − bên trái và kẻ vạch ngang.',
        },
        {
          type: 'tex',
          tex: '\\begin{array}{ccc} & 7 & 6 \\\\ - & & 5 \\\\ \\hline & 7 & 1 \\end{array}',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cách tính',
          text: 'Tính từ phải sang trái. 6 trừ 5 bằng 1, viết 1. Hạ 7, viết 7.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Viết 5 thẳng cột với 6 (hàng đơn vị). Số bị trừ viết ở trên, số trừ viết ở dưới.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bớt que rời',
    instruction:
      'Chạm vào que rời để gạch bớt. Bớt đủ số que rồi, em đặt tính: chạm chữ số đúng cho hàng đơn vị, rồi cho hàng chục. Chọn "Phép tính khác" để làm tiếp.',
  },
  examples: [
    {
      problem:
        'Xe buýt chở 29 hành khách. Đến bến, có 5 người xuống xe. Trên xe còn lại bao nhiêu hành khách?',
      steps: [
        'Xuống xe là bớt đi: em làm phép trừ 29 − 5.',
        '9 trừ 5 bằng 4, viết 4.',
        'Hạ 2, viết 2.',
      ],
      answer: '29 − 5 = 24. Trên xe còn lại 24 hành khách.',
    },
    {
      problem: 'Cây dừa có 48 quả. Các bạn hái 5 quả. Trên cây còn lại bao nhiêu quả dừa?',
      steps: ['Hái đi là bớt đi: 48 − 5.', '8 trừ 5 bằng 3, viết 3.', 'Hạ 4, viết 4.'],
      answer: '48 − 5 = 43. Trên cây còn lại 43 quả dừa.',
    },
    {
      problem: 'Tính: 18 − 8.',
      steps: ['8 trừ 8 bằng 0, viết 0.', 'Hạ 1, viết 1.'],
      answer: '18 − 8 = 10.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '76 − 5 = ?',
      options: ['26', '71', '81'],
      answer: 1,
      hints: ['Trừ hàng đơn vị trước: 6 trừ 5.', 'Rồi hạ 7 ở hàng chục.'],
      solution: '6 trừ 5 bằng 1, viết 1. Hạ 7, viết 7. Vậy 76 − 5 = 71.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['98 − 3', '66 − 5', '77 − 7', '59 − 2'],
      right: ['95', '61', '70', '57'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Trừ hai số ở hàng đơn vị, rồi hạ số chục.'],
      solution: '98 − 3 = 95, 66 − 5 = 61, 77 − 7 = 70, 59 − 2 = 57.',
    },
    {
      type: 'choice',
      prompt: 'Xe buýt chở 29 hành khách. 5 người xuống xe. Trên xe còn lại bao nhiêu hành khách?',
      options: ['24', '34', '25'],
      answer: 0,
      hints: ['Xuống xe là bớt đi: em làm phép trừ.', 'Tính 29 − 5.'],
      solution: '29 − 5 = 24. Trên xe còn lại 24 hành khách.',
    },
    {
      type: 'choice',
      prompt: 'Tính 87 − 4, em làm bước nào trước?',
      options: ['Hạ 8, viết 8', '7 trừ 4 bằng 3, viết 3', '8 trừ 4 bằng 4, viết 4'],
      answer: 1,
      hints: ['Em tính từ phải sang trái.', 'Bên phải là hàng đơn vị.'],
      solution: 'Trừ hàng đơn vị trước: 7 trừ 4 bằng 3, viết 3. Rồi hạ 8, viết 8. 87 − 4 = 83.',
    },
    {
      type: 'choice',
      prompt: 'Phép tính nào có kết quả lớn hơn 55?',
      options: ['59 − 6', '58 − 3', '59 − 2'],
      answer: 2,
      hints: ['Tính kết quả từng phép tính, rồi so với 55.'],
      solution: '59 − 6 = 53, 58 − 3 = 55, 59 − 2 = 57. Chỉ có 57 lớn hơn 55.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả phép tính có kết quả là 61.',
      options: ['66 − 5', '65 − 4', '67 − 5', '69 − 8'],
      answers: [0, 1, 3],
      hints: ['Tính từng phép tính rồi so với 61.'],
      solution: '66 − 5 = 61, 65 − 4 = 61, 69 − 8 = 61. Còn 67 − 5 = 62.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['48 − 5', '18 − 8', '29 − 5'],
      answer: [1, 2, 0],
      hints: ['Tính kết quả từng phép tính trước.'],
      solution: '18 − 8 = 10, 29 − 5 = 24, 48 − 5 = 43. Thứ tự: 18 − 8, 29 − 5, 48 − 5.',
    },
    {
      type: 'choice',
      prompt: 'Số nào điền vào chỗ trống? 57 − ... = 53',
      options: ['3', '4', '5'],
      answer: 1,
      hints: ['Hàng chục giữ nguyên là 5.', '7 bớt mấy thì còn 3?'],
      solution: '7 trừ 4 bằng 3, nên 57 − 4 = 53. Số cần điền là 4.',
    },
    {
      type: 'choice',
      prompt: 'Có 18 con rùa và thỏ chơi trốn tìm. Có 8 con rùa. Có bao nhiêu con thỏ?',
      options: ['8', '10', '26'],
      answer: 1,
      hints: ['Lấy tất cả bớt đi số rùa.', 'Tính 18 − 8.'],
      solution: '18 − 8 = 10. Có 10 con thỏ.',
    },
  ],
  takeaways: [
    'Đặt tính: viết số đơn vị thẳng cột với đơn vị.',
    'Tính từ phải sang trái: trừ hàng đơn vị, rồi hạ số chục.',
    'Ví dụ: 76 − 5 = 71.',
  ],
};
