/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính rồi tính phép trừ các số trong phạm vi 10 000, không nhớ và có nhớ; trừ nhẩm số tròn nghìn, tròn trăm; giải bài toán có lời văn.',
  intro:
    'Sông Nin dài 6 650 km, sông Hồng dài 1 149 km. Sông Nin dài hơn sông Hồng bao nhiêu ki-lô-mét? Em đặt tính rồi trừ từng hàng, từ phải sang trái nhé!',
  objectives: [
    'Đặt tính và trừ các số có bốn chữ số.',
    'Biết trừ có nhớ: không trừ được thì lấy thêm 10, rồi nhớ 1 sang hàng bên trái.',
    'Trừ nhẩm số tròn nghìn, tròn trăm.',
    'Giải bài toán có phép trừ.',
  ],
  sections: [
    {
      heading: 'Trừ không nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 5 876 − 2 453.' },
        {
          type: 'p',
          text: 'Em đặt tính: viết số trừ dưới số bị trừ, các hàng thẳng cột với nhau.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '6 trừ 3 bằng 3, viết 3.',
            '7 trừ 5 bằng 2, viết 2.',
            '8 trừ 4 bằng 4, viết 4.',
            '5 trừ 2 bằng 3, viết 3.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '5 876 − 2 453 = 3 423.' },
      ],
    },
    {
      heading: 'Trừ có nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 6 378 − 2 549. Hàng đơn vị: 8 không trừ được 9.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '8 không trừ được 9, lấy 18 trừ 9 bằng 9, viết 9, nhớ 1.',
            '4 thêm 1 bằng 5, 7 trừ 5 bằng 2, viết 2.',
            '3 không trừ được 5, lấy 13 trừ 5 bằng 8, viết 8, nhớ 1.',
            '2 thêm 1 bằng 3, 6 trừ 3 bằng 3, viết 3.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '6 378 − 2 549 = 3 829.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em trừ từ phải sang trái. Chữ số trên bé hơn thì lấy thêm 10 để trừ, rồi nhớ 1: cộng 1 vào chữ số của số trừ ở hàng bên trái.',
        },
      ],
    },
    {
      heading: 'Trừ đi số có ba chữ số',
      blocks: [
        { type: 'p', text: 'Em tính 4 628 − 719. Số 719 không có hàng nghìn.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '8 không trừ được 9, lấy 18 trừ 9 bằng 9, viết 9, nhớ 1.',
            '1 thêm 1 bằng 2, 2 trừ 2 bằng 0, viết 0.',
            '6 không trừ được 7, lấy 16 trừ 7 bằng 9, viết 9, nhớ 1.',
            '4 trừ 1 bằng 3, viết 3.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '4 628 − 719 = 3 909.' },
      ],
    },
    {
      heading: 'Trừ nhẩm',
      blocks: [
        { type: 'p', text: 'Số tròn nghìn: 7 000 − 3 000. Em nhẩm 7 nghìn − 3 nghìn = 4 nghìn.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '7 000 − 3 000 = 4 000.' },
        { type: 'p', text: 'Số tròn trăm: 6 700 − 600. Em nhẩm 7 trăm − 6 trăm = 1 trăm.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '6 700 − 600 = 6 100.' },
      ],
    },
  ],
  explore: {
    title: 'Trừ từng hàng',
    instruction:
      'Em trừ từ hàng đơn vị. Khi chữ số trên bé hơn, em bấm nút "Mượn 1": chữ số trên có thêm 10, và số 1 đã nhớ hiện bên chữ số của số trừ ở hàng bên trái. Rồi em chạm vào chữ số để viết kết quả.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 8 380 − 6 425.',
      steps: [
        '0 không trừ được 5, lấy 10 trừ 5 bằng 5, viết 5, nhớ 1.',
        '2 thêm 1 bằng 3, 8 trừ 3 bằng 5, viết 5.',
        '3 không trừ được 4, lấy 13 trừ 4 bằng 9, viết 9, nhớ 1.',
        '6 thêm 1 bằng 7, 8 trừ 7 bằng 1, viết 1.',
      ],
      answer: '8 380 − 6 425 = 1 955.',
    },
    {
      problem:
        'Sông Nin dài 6 650 km, sông Hồng dài 1 149 km. Hỏi sông Nin dài hơn sông Hồng bao nhiêu ki-lô-mét?',
      steps: [
        'Muốn biết dài hơn bao nhiêu, em làm phép trừ: 6 650 − 1 149.',
        '0 không trừ được 9, lấy 10 trừ 9 bằng 1, viết 1, nhớ 1. 4 thêm 1 bằng 5, 5 trừ 5 bằng 0, viết 0. 6 trừ 1 bằng 5, viết 5. 6 trừ 1 bằng 5, viết 5.',
        '6 650 − 1 149 = 5 501 (km).',
      ],
      answer: 'Sông Nin dài hơn sông Hồng 5 501 km.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '4 291 − 3 864 bằng bao nhiêu?',
      options: ['427', '1 427', '437', '1 437'],
      answer: 0,
      hints: [
        '1 không trừ được 4, em lấy 11 trừ 4, nhớ 1.',
        'Hàng nghìn: 3 thêm 1 bằng 4, 4 trừ 4 bằng 0, không cần viết.',
      ],
      solution:
        '1 không trừ được 4, lấy 11 trừ 4 bằng 7, viết 7, nhớ 1. 6 thêm 1 bằng 7, 9 trừ 7 bằng 2, viết 2. 2 không trừ được 8, lấy 12 trừ 8 bằng 4, viết 4, nhớ 1. 3 thêm 1 bằng 4, 4 trừ 4 bằng 0, không cần viết. Vậy 4 291 − 3 864 = 427.',
    },
    {
      type: 'number',
      prompt: 'Tính: 6 635 − 807 = ?',
      answer: 5828,
      hints: [
        '5 không trừ được 7, em lấy 15 trừ 7.',
        'Nhớ thêm 1 vào chữ số 0 của số trừ ở hàng chục.',
      ],
      solution:
        '5 không trừ được 7, lấy 15 trừ 7 bằng 8, viết 8, nhớ 1. 0 thêm 1 bằng 1, 3 trừ 1 bằng 2, viết 2. 6 không trừ được 8, lấy 16 trừ 8 bằng 8, viết 8, nhớ 1. 6 trừ 1 bằng 5, viết 5. Vậy 6 635 − 807 = 5 828.',
    },
    {
      type: 'match',
      prompt: 'Tính nhẩm rồi nối mỗi phép trừ với kết quả của nó.',
      left: ['8 000 − 5 000', '10 000 − 6 000', '9 000 − 7 000', '5 200 − 200'],
      right: ['3 000', '4 000', '2 000', '5 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhẩm theo nghìn: 8 nghìn − 5 nghìn = 3 nghìn.', '10 000 là 10 nghìn.'],
      solution:
        '8 000 − 5 000 = 3 000. 10 000 − 6 000 = 4 000. 9 000 − 7 000 = 2 000. 5 200 − 200 = 5 000.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 8 400 − 6 000 = ?',
      options: ['2 400', '8 340', '1 400', '2 000'],
      answer: 0,
      hints: ['6 000 là 6 nghìn.', 'Em trừ hàng nghìn: 8 nghìn − 6 nghìn. Hàng trăm giữ nguyên.'],
      solution: '8 nghìn 4 trăm − 6 nghìn = 2 nghìn 4 trăm. Vậy 8 400 − 6 000 = 2 400.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 5 624 − 4 718 theo đúng thứ tự.',
      items: [
        '6 không trừ được 7, lấy 16 trừ 7 bằng 9, viết 9, nhớ 1',
        '4 thêm 1 bằng 5, 5 trừ 5 bằng 0, không cần viết',
        '4 không trừ được 8, lấy 14 trừ 8 bằng 6, viết 6, nhớ 1',
        '1 thêm 1 bằng 2, 2 trừ 2 bằng 0, viết 0',
      ],
      answer: [2, 3, 0, 1],
      hints: ['Em trừ từ hàng đơn vị trước.', 'Hàng nghìn làm sau cùng.'],
      solution:
        '4 không trừ được 8, lấy 14 trừ 8 bằng 6, viết 6, nhớ 1. 1 thêm 1 bằng 2, 2 trừ 2 bằng 0, viết 0. 6 không trừ được 7, lấy 16 trừ 7 bằng 9, viết 9, nhớ 1. 4 thêm 1 bằng 5, 5 trừ 5 bằng 0, không cần viết. Vậy 5 624 − 4 718 = 906.',
    },
    {
      type: 'choice',
      prompt:
        'Nam tính 7 352 − 2 816 như sau: 2 không trừ được 6, lấy 12 trừ 6 bằng 6, viết 6, nhớ 1. 5 trừ 1 bằng 4, viết 4. 3 không trừ được 8, lấy 13 trừ 8 bằng 5, viết 5, nhớ 1. 2 thêm 1 bằng 3, 7 trừ 3 bằng 4, viết 4. Nam được 4 546. Nam làm đúng hay sai?',
      options: [
        'Sai, ở hàng chục Nam quên thêm 1 đã nhớ',
        'Đúng rồi',
        'Sai, ở hàng nghìn Nam quên thêm 1 đã nhớ',
      ],
      answer: 0,
      hints: ['Hàng đơn vị có nhớ 1. Em xem Nam làm gì với số 1 đó ở hàng chục.'],
      solution:
        'Hàng chục: 1 thêm 1 bằng 2, 5 trừ 2 bằng 3, viết 3. Vậy 7 352 − 2 816 = 4 536, không phải 4 546.',
    },
    {
      type: 'number',
      prompt:
        'Một xe chở 9 000 l dầu. Xe bơm vào trạm thứ nhất 2 500 l dầu, vào trạm thứ hai 2 200 l dầu. Hỏi trên xe còn lại bao nhiêu lít dầu?',
      answer: 4300,
      unit: 'l',
      hints: [
        'Trước hết em tính số lít dầu đã bơm vào cả hai trạm.',
        'Rồi em lấy 9 000 trừ đi số lít dầu đã bơm.',
      ],
      solution:
        'Số lít dầu đã bơm: 2 500 + 2 200 = 4 700 (l). Số lít dầu còn lại: 9 000 − 4 700 = 4 300 (l).',
    },
    {
      type: 'number',
      prompt:
        'Một cuộn dây dài 2 500 m. Người ta đã dùng 1 375 m. Hỏi cuộn dây còn lại bao nhiêu mét?',
      answer: 1125,
      unit: 'm',
      hints: ['"Còn lại" thì em làm phép trừ.', 'Em tính 2 500 − 1 375.'],
      solution:
        '0 không trừ được 5, lấy 10 trừ 5 bằng 5, viết 5, nhớ 1. 7 thêm 1 bằng 8, 0 không trừ được 8, lấy 10 trừ 8 bằng 2, viết 2, nhớ 1. 3 thêm 1 bằng 4, 5 trừ 4 bằng 1, viết 1. 2 trừ 1 bằng 1, viết 1. Cuộn dây còn lại 2 500 − 1 375 = 1 125 (m).',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính rồi tính: 8 372 − 39 = ?',
      options: ['8 333', '8 343', '4 472', '8 323'],
      answer: 0,
      hints: [
        'Viết 39 thẳng cột từ hàng đơn vị: 9 dưới 2, 3 dưới 7.',
        '2 không trừ được 9, em lấy 12 trừ 9.',
      ],
      solution:
        '2 không trừ được 9, lấy 12 trừ 9 bằng 3, viết 3, nhớ 1. 3 thêm 1 bằng 4, 7 trừ 4 bằng 3, viết 3. Hạ 3, viết 3. Hạ 8, viết 8. Vậy 8 372 − 39 = 8 333.',
    },
  ],
  takeaways: [
    'Đặt tính thẳng cột, trừ từ phải sang trái.',
    'Không trừ được thì lấy thêm 10 để trừ, rồi nhớ 1 vào chữ số của số trừ ở hàng bên trái.',
    'Trừ nhẩm: 7 nghìn − 3 nghìn = 4 nghìn.',
  ],
};
