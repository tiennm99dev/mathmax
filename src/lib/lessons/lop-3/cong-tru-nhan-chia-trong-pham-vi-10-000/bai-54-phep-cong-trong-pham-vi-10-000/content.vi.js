/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính rồi tính phép cộng các số trong phạm vi 10 000, không nhớ và có nhớ; cộng nhẩm số tròn nghìn, tròn trăm; giải bài toán có lời văn.',
  intro:
    'Khán đài A có 4 625 người. Khán đài B nhiều hơn khán đài A 438 người. Khán đài B có bao nhiêu người? Em đặt tính rồi cộng từng hàng, từ phải sang trái nhé!',
  objectives: [
    'Đặt tính và cộng các số có bốn chữ số.',
    'Biết cộng có nhớ, kể cả nhớ nhiều lần.',
    'Cộng nhẩm số tròn nghìn, tròn trăm.',
    'Giải bài toán có phép cộng.',
  ],
  sections: [
    {
      heading: 'Cộng không nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 3 524 + 2 361.' },
        {
          type: 'p',
          text: 'Em đặt tính: viết số này dưới số kia, hàng đơn vị thẳng hàng đơn vị, hàng chục thẳng hàng chục, hàng trăm thẳng hàng trăm, hàng nghìn thẳng hàng nghìn.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '4 cộng 1 bằng 5, viết 5.',
            '2 cộng 6 bằng 8, viết 8.',
            '5 cộng 3 bằng 8, viết 8.',
            '3 cộng 2 bằng 5, viết 5.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '3 524 + 2 361 = 5 885.' },
      ],
    },
    {
      heading: 'Cộng có nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 3 628 + 4 845. Lần này có hàng cộng được 10 hoặc hơn.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '8 cộng 5 bằng 13, viết 3, nhớ 1.',
            '2 cộng 4 bằng 6, thêm 1 bằng 7, viết 7.',
            '6 cộng 8 bằng 14, viết 4, nhớ 1.',
            '3 cộng 4 bằng 7, thêm 1 bằng 8, viết 8.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '3 628 + 4 845 = 8 473.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em cộng từ phải sang trái. Hàng nào được 10 hoặc hơn thì viết chữ số hàng đơn vị, nhớ 1 sang hàng bên trái.',
        },
      ],
    },
    {
      heading: 'Cộng với số có ba chữ số',
      blocks: [
        { type: 'p', text: 'Em tính 3 847 + 635. Số 635 không có hàng nghìn.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '7 cộng 5 bằng 12, viết 2, nhớ 1.',
            '4 cộng 3 bằng 7, thêm 1 bằng 8, viết 8.',
            '8 cộng 6 bằng 14, viết 4, nhớ 1.',
            '3 thêm 1 bằng 4, viết 4.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '3 847 + 635 = 4 482.' },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Viết 635 thẳng cột từ hàng đơn vị: chữ số 5 dưới chữ số 7, không phải dưới chữ số 3.',
        },
      ],
    },
    {
      heading: 'Cộng nhẩm',
      blocks: [
        { type: 'p', text: 'Số tròn nghìn: 6 000 + 2 000. Em nhẩm 6 nghìn + 2 nghìn = 8 nghìn.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '6 000 + 2 000 = 8 000.' },
        { type: 'p', text: 'Số tròn trăm: 3 200 + 700. Em nhẩm 2 trăm + 7 trăm = 9 trăm.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '3 200 + 700 = 3 900.' },
      ],
    },
  ],
  explore: {
    title: 'Cộng từng hàng',
    instruction:
      'Em cộng từ hàng đơn vị. Chạm vào chữ số để viết kết quả của mỗi hàng. Số nhớ hiện màu đỏ trên hàng bên trái. Chọn "Nhớ một lần" hoặc "Nhớ nhiều lần" để thử phép khó hơn.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 4 252 + 5 284.',
      steps: [
        '2 cộng 4 bằng 6, viết 6.',
        '5 cộng 8 bằng 13, viết 3, nhớ 1.',
        '2 cộng 2 bằng 4, thêm 1 bằng 5, viết 5.',
        '4 cộng 5 bằng 9, viết 9.',
      ],
      answer: '4 252 + 5 284 = 9 536.',
    },
    {
      problem:
        'Khán đài A có 4 625 người. Khán đài B nhiều hơn khán đài A 438 người. Hỏi cả hai khán đài có bao nhiêu người?',
      steps: [
        'Em tìm số người ở khán đài B: 4 625 + 438 = 5 063 (người).',
        'Em tìm số người ở cả hai khán đài: 4 625 + 5 063 = 9 688 (người).',
      ],
      answer: 'Cả hai khán đài có 9 688 người.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Bác Hùng thu hoạch được 2 530 kg thóc. Bác Dương thu hoạch được nhiều hơn bác Hùng 550 kg thóc. Bác Dương thu hoạch được bao nhiêu ki-lô-gam thóc?',
      answer: 3080,
      unit: 'kg',
      hints: ['"Nhiều hơn" thì em làm phép cộng.', 'Em tính 2 530 + 550.'],
      solution:
        '0 cộng 0 bằng 0, viết 0. 3 cộng 5 bằng 8, viết 8. 5 cộng 5 bằng 10, viết 0, nhớ 1. 2 thêm 1 bằng 3, viết 3. Bác Dương thu hoạch được 2 530 + 550 = 3 080 (kg) thóc.',
    },
    {
      type: 'choice',
      prompt: '1 456 + 2 738 bằng bao nhiêu?',
      options: ['4 194', '4 184', '3 194', '3 184'],
      answer: 0,
      hints: [
        '6 cộng 8 bằng 14. Em viết 4, nhớ 1.',
        'Hàng trăm: 4 cộng 7 bằng 11, em cũng phải nhớ 1 sang hàng nghìn.',
      ],
      solution:
        '6 cộng 8 bằng 14, viết 4, nhớ 1. 5 cộng 3 bằng 8, thêm 1 bằng 9, viết 9. 4 cộng 7 bằng 11, viết 1, nhớ 1. 1 cộng 2 bằng 3, thêm 1 bằng 4, viết 4. Vậy 1 456 + 2 738 = 4 194.',
    },
    {
      type: 'match',
      prompt: 'Tính nhẩm rồi nối mỗi phép cộng với kết quả của nó.',
      left: ['6 000 + 2 000', '3 000 + 4 000', '1 000 + 9 000', '5 000 + 4 000'],
      right: ['8 000', '7 000', '10 000', '9 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhẩm theo nghìn: 6 nghìn + 2 nghìn = 8 nghìn.', '10 nghìn là 10 000.'],
      solution:
        '6 000 + 2 000 = 8 000. 3 000 + 4 000 = 7 000. 1 000 + 9 000 = 10 000. 5 000 + 4 000 = 9 000.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 3 200 + 700 = ?',
      options: ['3 900', '10 200', '3 270', '4 000'],
      answer: 0,
      hints: ['700 là 7 trăm.', 'Em cộng hàng trăm: 2 trăm + 7 trăm.'],
      solution: '2 trăm + 7 trăm = 9 trăm. Vậy 3 200 + 700 = 3 900.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 2 718 + 1 465 theo đúng thứ tự.',
      items: [
        '7 cộng 4 bằng 11, viết 1, nhớ 1',
        '8 cộng 5 bằng 13, viết 3, nhớ 1',
        '2 cộng 1 bằng 3, thêm 1 bằng 4, viết 4',
        '1 cộng 6 bằng 7, thêm 1 bằng 8, viết 8',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Em cộng từ hàng đơn vị trước.', 'Hàng nghìn làm sau cùng.'],
      solution:
        '8 cộng 5 bằng 13, viết 3, nhớ 1. 1 cộng 6 bằng 7, thêm 1 bằng 8, viết 8. 7 cộng 4 bằng 11, viết 1, nhớ 1. 2 cộng 1 bằng 3, thêm 1 bằng 4, viết 4. Vậy 2 718 + 1 465 = 4 183.',
    },
    {
      type: 'choice',
      prompt: 'Dế mèn đi vào cửa hang có phép tính cho kết quả lớn nhất. Đó là phép tính nào?',
      options: ['5 800 + 2 500', '5 800 + 2 000', '5 800 + 2 200'],
      answer: 0,
      hints: [
        'Ba phép tính đều cộng với 5 800.',
        'Em so sánh các số cộng thêm: 2 000, 2 200, 2 500.',
      ],
      solution:
        '5 800 + 2 000 = 7 800. 5 800 + 2 200 = 8 000. 5 800 + 2 500 = 8 300. Kết quả lớn nhất là 8 300, của phép tính 5 800 + 2 500.',
    },
    {
      type: 'choice',
      prompt:
        'Mai tính 2 476 + 3 158 như sau: 6 cộng 8 bằng 14, viết 4, nhớ 1. 7 cộng 5 bằng 12, viết 2, nhớ 1. 4 cộng 1 bằng 5, thêm 1 bằng 6, viết 6. 2 cộng 3 bằng 5, viết 5. Mai được 5 624. Mai làm đúng hay sai?',
      options: [
        'Sai, ở hàng chục Mai quên thêm 1 đã nhớ',
        'Đúng rồi',
        'Sai, ở hàng nghìn Mai quên thêm 1 đã nhớ',
      ],
      answer: 0,
      hints: ['Em xem Mai làm gì với số 1 nhớ từ hàng đơn vị.'],
      solution:
        'Hàng chục: 7 cộng 5 bằng 12, phải thêm 1 bằng 13, viết 3, nhớ 1. Vậy 2 476 + 3 158 = 5 634, không phải 5 624.',
    },
    {
      type: 'number',
      prompt:
        'Thư viện có 3 465 quyển sách. Thư viện mua thêm 1 280 quyển sách. Hỏi thư viện có tất cả bao nhiêu quyển sách?',
      answer: 4745,
      hints: ['"Thêm" và "tất cả" thì em làm phép cộng.', 'Em tính 3 465 + 1 280.'],
      solution:
        '5 cộng 0 bằng 5, viết 5. 6 cộng 8 bằng 14, viết 4, nhớ 1. 4 cộng 2 bằng 6, thêm 1 bằng 7, viết 7. 3 cộng 1 bằng 4, viết 4. Thư viện có tất cả 3 465 + 1 280 = 4 745 (quyển sách).',
    },
    {
      type: 'number',
      prompt:
        'Đội Một trồng được 1 345 cây. Đội Hai trồng được nhiều hơn đội Một 255 cây. Hỏi cả hai đội trồng được bao nhiêu cây?',
      answer: 2945,
      hints: ['Trước hết em tìm số cây đội Hai trồng được.', 'Rồi em cộng số cây của hai đội.'],
      solution:
        'Đội Hai trồng được: 1 345 + 255 = 1 600 (cây). Cả hai đội trồng được: 1 345 + 1 600 = 2 945 (cây).',
    },
  ],
  takeaways: [
    'Đặt tính thẳng cột: đơn vị thẳng đơn vị, chục thẳng chục, trăm thẳng trăm, nghìn thẳng nghìn.',
    'Cộng từ phải sang trái. Được 10 hoặc hơn thì nhớ 1 sang hàng bên trái.',
    'Cộng nhẩm: 6 nghìn + 2 nghìn = 8 nghìn.',
  ],
};
