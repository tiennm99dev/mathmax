/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính rồi tính phép chia số có bốn chữ số cho số có một chữ số: chia từng hàng từ trái sang phải, chia hết và chia có dư, thương có chữ số 0; chia nhẩm số tròn nghìn.',
  intro:
    'Một xưởng làm được 4 575 bánh răng trong 5 ngày, mỗi ngày làm số bánh răng như nhau. Mỗi ngày xưởng làm được bao nhiêu bánh răng? Em đặt tính rồi chia từ hàng nghìn nhé!',
  objectives: [
    'Đặt tính và chia số có bốn chữ số cho số có một chữ số.',
    'Chia từng hàng từ trái sang phải: chia, nhân, trừ, hạ.',
    'Biết phép chia có dư: số dư bé hơn số chia.',
    'Chia nhẩm số tròn nghìn.',
  ],
  sections: [
    {
      heading: 'Chia từ hàng nghìn',
      blocks: [
        { type: 'p', text: 'Em tính 6 369 : 3. Em chia từ hàng nghìn, sang phải.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '6 chia 3 được 2, viết 2. 2 nhân 3 bằng 6; 6 trừ 6 bằng 0.',
            'Hạ 3; 3 chia 3 được 1, viết 1. 1 nhân 3 bằng 3; 3 trừ 3 bằng 0.',
            'Hạ 6; 6 chia 3 được 2, viết 2. 2 nhân 3 bằng 6; 6 trừ 6 bằng 0.',
            'Hạ 9; 9 chia 3 được 3, viết 3. 3 nhân 3 bằng 9; 9 trừ 9 bằng 0.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '6 369 : 3 = 2 123.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em chia từ trái sang phải. Mỗi lượt: chia, viết chữ số ở thương, nhân, trừ, rồi hạ chữ số tiếp theo.',
        },
      ],
    },
    {
      heading: 'Lấy hai chữ số để chia',
      blocks: [
        { type: 'p', text: 'Em tính 1 276 : 4. Hàng nghìn là 1, bé hơn 4, nên em lấy 12 để chia.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '12 chia 4 được 3, viết 3. 3 nhân 4 bằng 12; 12 trừ 12 bằng 0.',
            'Hạ 7; 7 chia 4 được 1, viết 1. 1 nhân 4 bằng 4; 7 trừ 4 bằng 3.',
            'Hạ 6, được 36; 36 chia 4 được 9, viết 9. 9 nhân 4 bằng 36; 36 trừ 36 bằng 0.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '1 276 : 4 = 319.' },
      ],
    },
    {
      heading: 'Phép chia có dư',
      blocks: [
        { type: 'p', text: 'Em tính 2 487 : 2.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '2 chia 2 được 1, viết 1. 1 nhân 2 bằng 2; 2 trừ 2 bằng 0.',
            'Hạ 4; 4 chia 2 được 2, viết 2. 2 nhân 2 bằng 4; 4 trừ 4 bằng 0.',
            'Hạ 8; 8 chia 2 được 4, viết 4. 4 nhân 2 bằng 8; 8 trừ 8 bằng 0.',
            'Hạ 7; 7 chia 2 được 3, viết 3. 3 nhân 2 bằng 6; 7 trừ 6 bằng 1.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '2 487 : 2 = 1 243 (dư 1).' },
        { type: 'callout', tone: 'warning', text: 'Số dư luôn bé hơn số chia.' },
        { type: 'p', text: 'Thử lại: 1 243 × 2 = 2 486, 2 486 + 1 = 2 487.' },
      ],
    },
    {
      heading: 'Thương có chữ số 0',
      blocks: [
        { type: 'p', text: 'Em tính 6 308 : 7. Hàng nghìn là 6, bé hơn 7, nên em lấy 63 để chia.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '63 chia 7 được 9, viết 9. 9 nhân 7 bằng 63; 63 trừ 63 bằng 0.',
            'Hạ 0; 0 chia 7 được 0, viết 0. 0 nhân 7 bằng 0; 0 trừ 0 bằng 0.',
            'Hạ 8; 8 chia 7 được 1, viết 1. 1 nhân 7 bằng 7; 8 trừ 7 bằng 1.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '6 308 : 7 = 901 (dư 1).' },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Mỗi lần hạ một chữ số, em viết một chữ số ở thương. Chia không được thì viết 0.',
        },
      ],
    },
    {
      heading: 'Chia nhẩm',
      blocks: [
        { type: 'p', text: 'Số tròn nghìn: 8 000 : 4. Em nhẩm 8 nghìn : 4 = 2 nghìn.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '8 000 : 4 = 2 000.' },
      ],
    },
  ],
  explore: {
    title: 'Chia từng lượt',
    instruction:
      'Em chia từ hàng nghìn. Mỗi lượt em chọn chữ số của thương, rồi chọn số còn lại sau khi trừ, rồi bấm nút để hạ chữ số tiếp theo. Chọn "Có dư", "Thương có số 0" hoặc "Lấy hai chữ số" để thử các trường hợp khác.',
  },
  examples: [
    {
      problem:
        'Một xưởng làm được 4 575 bánh răng trong 5 ngày, mỗi ngày làm số bánh răng như nhau. Hỏi mỗi ngày xưởng làm được bao nhiêu bánh răng?',
      steps: [
        'Em tính 4 575 : 5. Hàng nghìn là 4, bé hơn 5, nên em lấy 45 để chia.',
        '45 chia 5 được 9, viết 9. 9 nhân 5 bằng 45; 45 trừ 45 bằng 0.',
        'Hạ 7; 7 chia 5 được 1, viết 1. 1 nhân 5 bằng 5; 7 trừ 5 bằng 2.',
        'Hạ 5, được 25; 25 chia 5 được 5, viết 5. 5 nhân 5 bằng 25; 25 trừ 25 bằng 0.',
        '4 575 : 5 = 915 (bánh răng).',
      ],
      answer: 'Mỗi ngày xưởng làm được 915 bánh răng.',
    },
    {
      problem:
        'Kiến chúa sống được 9 490 ngày, gấp 2 lần số ngày ve sầu sống. Hỏi ve sầu sống được bao nhiêu ngày?',
      steps: [
        'Em tính 9 490 : 2.',
        '9 chia 2 được 4, viết 4. 4 nhân 2 bằng 8; 9 trừ 8 bằng 1.',
        'Hạ 4, được 14; 14 chia 2 được 7, viết 7. 7 nhân 2 bằng 14; 14 trừ 14 bằng 0.',
        'Hạ 9; 9 chia 2 được 4, viết 4. 4 nhân 2 bằng 8; 9 trừ 8 bằng 1.',
        'Hạ 0, được 10; 10 chia 2 được 5, viết 5. 5 nhân 2 bằng 10; 10 trừ 10 bằng 0.',
        '9 490 : 2 = 4 745 (ngày).',
      ],
      answer: 'Ve sầu sống được 4 745 ngày.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 5 025 : 5 = ?',
      answer: 1005,
      hints: [
        '5 chia 5 được 1. Hạ 0: 0 chia 5 được 0.',
        'Hạ 2: 2 chia 5 được 0, còn 2. Hạ 5 được 25.',
      ],
      solution:
        '5 chia 5 được 1, viết 1. Hạ 0; 0 chia 5 được 0, viết 0. Hạ 2; 2 chia 5 được 0, viết 0; 2 trừ 0 bằng 2. Hạ 5, được 25; 25 chia 5 được 5, viết 5. Vậy 5 025 : 5 = 1 005.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính rồi tính: 3 296 : 4 = ?',
      options: ['824', '8 024', '814', '834'],
      answer: 0,
      hints: ['3 bé hơn 4, em lấy 32 để chia.', 'Hạ 9: 9 chia 4 được 2, còn 1. Hạ 6 được 16.'],
      solution:
        '32 chia 4 được 8, viết 8; 32 trừ 32 bằng 0. Hạ 9; 9 chia 4 được 2, viết 2; 9 trừ 8 bằng 1. Hạ 6, được 16; 16 chia 4 được 4, viết 4; 16 trừ 16 bằng 0. Vậy 3 296 : 4 = 824.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính rồi tính: 7 369 : 8 = ?',
      options: ['921 (dư 1)', '920 (dư 9)', '921 (dư 2)', '9 021 (dư 1)'],
      answer: 0,
      hints: ['7 bé hơn 8, em lấy 73 để chia.', 'Số dư phải bé hơn 8.'],
      solution:
        '73 chia 8 được 9, viết 9; 9 nhân 8 bằng 72; 73 trừ 72 bằng 1. Hạ 6, được 16; 16 chia 8 được 2, viết 2; 16 trừ 16 bằng 0. Hạ 9; 9 chia 8 được 1, viết 1; 9 trừ 8 bằng 1. Vậy 7 369 : 8 = 921 (dư 1).',
    },
    {
      type: 'match',
      prompt: 'Tính nhẩm rồi nối mỗi phép chia với kết quả của nó.',
      left: ['7 000 : 7', '9 000 : 3', '8 000 : 4', '8 000 : 2'],
      right: ['1 000', '3 000', '2 000', '4 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhẩm theo nghìn: 7 nghìn : 7 = 1 nghìn.'],
      solution: '7 000 : 7 = 1 000. 9 000 : 3 = 3 000. 8 000 : 4 = 2 000. 8 000 : 2 = 4 000.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 2 418 : 3 theo đúng thứ tự.',
      items: [
        'Hạ 8, được 18; 18 chia 3 được 6, viết 6',
        '24 chia 3 được 8, viết 8',
        'Hạ 1; 1 chia 3 được 0, viết 0',
      ],
      answer: [1, 2, 0],
      hints: [
        '2 bé hơn 3, em lấy 24 để chia trước.',
        'Mỗi lần hạ một chữ số, em viết một chữ số ở thương.',
      ],
      solution:
        '24 chia 3 được 8, viết 8; 24 trừ 24 bằng 0. Hạ 1; 1 chia 3 được 0, viết 0; 1 trừ 0 bằng 1. Hạ 8, được 18; 18 chia 3 được 6, viết 6; 18 trừ 18 bằng 0. Vậy 2 418 : 3 = 806.',
    },
    {
      type: 'number',
      prompt: 'Có 1 250 quyển vở chia đều cho 5 lớp. Hỏi mỗi lớp được bao nhiêu quyển vở?',
      answer: 250,
      hints: ['Chia đều cho 5 lớp thì em làm phép chia cho 5.', '1 bé hơn 5, em lấy 12 để chia.'],
      solution:
        '12 chia 5 được 2, viết 2; 12 trừ 10 bằng 2. Hạ 5, được 25; 25 chia 5 được 5, viết 5; 25 trừ 25 bằng 0. Hạ 0; 0 chia 5 được 0, viết 0. Mỗi lớp được 1 250 : 5 = 250 (quyển vở).',
    },
    {
      type: 'choice',
      prompt:
        'Có 2 345 cái bánh, xếp vào các hộp, mỗi hộp 4 cái. Xếp được nhiều nhất bao nhiêu hộp và còn thừa mấy cái bánh?',
      options: [
        '586 hộp, thừa 1 cái',
        '585 hộp, thừa 5 cái',
        '587 hộp, thừa 1 cái',
        '586 hộp, thừa 2 cái',
      ],
      answer: 0,
      hints: ['Em tính 2 345 : 4.', 'Số bánh thừa phải bé hơn 4.'],
      solution:
        '23 chia 4 được 5; 23 trừ 20 bằng 3. Hạ 4, được 34; 34 chia 4 được 8; 34 trừ 32 bằng 2. Hạ 5, được 25; 25 chia 4 được 6; 25 trừ 24 bằng 1. 2 345 : 4 = 586 (dư 1). Xếp được 586 hộp, thừa 1 cái bánh.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 3 500 : 5 ? 4 000 : 5',
      options: ['<', '>', '='],
      answer: 0,
      hints: ['Em tính từng phép chia: 35 trăm : 5 và 40 trăm : 5.'],
      solution: '3 500 : 5 = 700 và 4 000 : 5 = 800. Vì 700 < 800 nên 3 500 : 5 < 4 000 : 5.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi vòng, vệ tinh B bay được 1 527 km, gấp 3 lần quãng đường vệ tinh A bay một vòng. Hỏi mỗi vòng vệ tinh A bay được bao nhiêu ki-lô-mét?',
      answer: 509,
      unit: 'km',
      hints: ['Gấp 3 lần thì muốn tìm số bé, em chia cho 3.', '1 bé hơn 3, em lấy 15 để chia.'],
      solution:
        '15 chia 3 được 5, viết 5; 15 trừ 15 bằng 0. Hạ 2; 2 chia 3 được 0, viết 0; 2 trừ 0 bằng 2. Hạ 7, được 27; 27 chia 3 được 9, viết 9; 27 trừ 27 bằng 0. Vệ tinh A bay được 1 527 : 3 = 509 (km).',
    },
    {
      type: 'choice',
      prompt: 'Trong phép chia cho 6, số dư lớn nhất có thể là bao nhiêu?',
      options: ['5', '6', '4', '1'],
      answer: 0,
      hints: ['Số dư luôn bé hơn số chia.'],
      solution: 'Số dư bé hơn 6, nên số dư lớn nhất là 5.',
    },
  ],
  takeaways: [
    'Chia từ trái sang phải: chia, viết, nhân, trừ, hạ.',
    'Mỗi lần hạ một chữ số thì viết một chữ số ở thương, có thể là 0.',
    'Số dư bé hơn số chia.',
  ],
};
