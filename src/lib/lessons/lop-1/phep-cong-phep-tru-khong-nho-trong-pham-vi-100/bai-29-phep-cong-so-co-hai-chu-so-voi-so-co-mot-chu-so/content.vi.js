/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép cộng số có hai chữ số với số có một chữ số (không nhớ): cộng bằng que tính, đặt tính theo cột, cộng đơn vị với đơn vị rồi hạ số chục.',
  intro:
    'Có 41 que tính, em thêm 5 que nữa. Có tất cả bao nhiêu que tính? Em cùng học cách cộng và đặt tính theo cột nhé!',
  objectives: [
    'Cộng số có hai chữ số với số có một chữ số bằng que tính.',
    'Đặt tính theo cột: đơn vị thẳng cột với đơn vị.',
    'Tính từ phải sang trái: cộng đơn vị với đơn vị, rồi hạ số chục.',
  ],
  sections: [
    {
      heading: 'Cộng bằng que tính',
      blocks: [
        {
          type: 'p',
          text: 'Số 41 gồm 4 bó chục và 1 que rời. Em thêm 5 que rời nữa.',
        },
        {
          type: 'p',
          text: '1 que rời thêm 5 que rời là 6 que rời. 4 bó chục vẫn giữ nguyên.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kết quả',
          text: '4 chục và 6 đơn vị là 46. Vậy 41 + 5 = 46.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'p',
          text: 'Em viết 41. Em viết 5 dưới 1, thẳng cột đơn vị. Em viết dấu + bên trái và kẻ vạch ngang.',
        },
        {
          type: 'tex',
          tex: '\\begin{array}{ccc} & 4 & 1 \\\\ + & & 5 \\\\ \\hline & 4 & 6 \\end{array}',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cách tính',
          text: 'Tính từ phải sang trái. 1 cộng 5 bằng 6, viết 6. Hạ 4, viết 4.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Viết 5 thẳng cột với 1 (hàng đơn vị), không viết dưới 4 (hàng chục).',
        },
      ],
    },
  ],
  explore: {
    title: 'Thêm que tính',
    instruction:
      'Chạm từng que màu xanh để thêm vào hàng đơn vị. Thêm hết rồi, em đặt tính: chạm chữ số đúng cho hàng đơn vị, rồi cho hàng chục. Chọn "Phép tính khác" để làm tiếp.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 71 + 5.',
      steps: ['Viết 71. Viết 5 thẳng cột với 1.', '1 cộng 5 bằng 6, viết 6.', 'Hạ 7, viết 7.'],
      answer: '71 + 5 = 76.',
    },
    {
      problem:
        'Mai gấp được 25 chiếc thuyền. Mi gấp được 3 chiếc thuyền. Hai chị em gấp được tất cả bao nhiêu chiếc thuyền?',
      steps: [
        'Gộp lại thì em làm phép cộng: 25 + 3.',
        '5 cộng 3 bằng 8, viết 8. Hạ 2, viết 2.',
        '25 + 3 = 28.',
      ],
      answer: 'Hai chị em gấp được 28 chiếc thuyền.',
    },
    {
      problem: 'Tính: 60 + 4.',
      steps: ['0 cộng 4 bằng 4, viết 4.', 'Hạ 6, viết 6.'],
      answer: '60 + 4 = 64.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '32 + 5 = ?',
      options: ['37', '82', '36'],
      answer: 0,
      hints: ['Cộng hàng đơn vị trước: 2 cộng 5.', 'Rồi hạ 3 ở hàng chục.'],
      solution: '2 cộng 5 bằng 7, viết 7. Hạ 3, viết 3. Vậy 32 + 5 = 37.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính 63 + 4: em viết 4 thẳng cột với chữ số nào của 63?',
      options: ['Chữ số 3 (hàng đơn vị)', 'Chữ số 6 (hàng chục)'],
      answer: 0,
      hints: ['4 là số có một chữ số: nó chỉ có hàng đơn vị.'],
      solution: 'Đơn vị thẳng cột với đơn vị: viết 4 dưới chữ số 3.',
    },
    {
      type: 'choice',
      prompt: 'Tính 34 + 5, em làm bước nào trước?',
      options: ['Hạ 3 xuống', 'Cộng 4 với 5', 'Cộng 3 với 5'],
      answer: 1,
      hints: ['Em tính từ phải sang trái.', 'Bên phải là hàng đơn vị.'],
      solution: 'Tính hàng đơn vị trước: 4 cộng 5 bằng 9, viết 9. Rồi hạ 3, viết 3. 34 + 5 = 39.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['11 + 8', '94 + 4', '42 + 4', '73 + 6'],
      right: ['19', '98', '46', '79'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Cộng hai số ở hàng đơn vị, rồi hạ số chục.'],
      solution: '11 + 8 = 19, 94 + 4 = 98, 42 + 4 = 46, 73 + 6 = 79.',
    },
    {
      type: 'choice',
      prompt:
        'Mai gấp được 25 chiếc thuyền, Mi gấp được 3 chiếc thuyền. Hai chị em gấp được tất cả bao nhiêu chiếc thuyền?',
      options: ['22', '28', '55'],
      answer: 1,
      hints: ['Gộp lại thì em làm phép cộng.', 'Tính 25 + 3.'],
      solution: '25 + 3 = 28. Hai chị em gấp được 28 chiếc thuyền.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả phép tính có kết quả là 46.',
      options: ['41 + 5', '44 + 2', '40 + 6', '43 + 4'],
      answers: [0, 1, 2],
      hints: ['Tính từng phép tính rồi so với 46.'],
      solution: '41 + 5 = 46, 44 + 2 = 46, 40 + 6 = 46. Còn 43 + 4 = 47.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['52 + 3', '50 + 2', '52 + 7'],
      answer: [1, 0, 2],
      hints: ['Tính kết quả từng phép tính trước.'],
      solution: '50 + 2 = 52, 52 + 3 = 55, 52 + 7 = 59. Thứ tự: 50 + 2, 52 + 3, 52 + 7.',
    },
    {
      type: 'choice',
      prompt: 'Số nào điền vào chỗ trống? 23 + ... = 28',
      options: ['3', '5', '6'],
      answer: 1,
      hints: ['Hàng chục giữ nguyên là 2.', '3 cộng mấy bằng 8?'],
      solution: '3 cộng 5 bằng 8, nên 23 + 5 = 28. Số cần điền là 5.',
    },
    {
      type: 'choice',
      prompt: 'Có 40 que tính, thêm 3 que tính nữa. Có tất cả bao nhiêu que tính?',
      options: ['70', '43', '34'],
      answer: 1,
      hints: ['40 là 4 chục, 3 là 3 đơn vị.'],
      solution: '40 + 3 = 43. Có tất cả 43 que tính.',
    },
  ],
  takeaways: [
    'Đặt tính: viết số đơn vị thẳng cột với đơn vị.',
    'Tính từ phải sang trái: cộng đơn vị với đơn vị, rồi hạ số chục.',
    'Ví dụ: 41 + 5 = 46.',
  ],
};
