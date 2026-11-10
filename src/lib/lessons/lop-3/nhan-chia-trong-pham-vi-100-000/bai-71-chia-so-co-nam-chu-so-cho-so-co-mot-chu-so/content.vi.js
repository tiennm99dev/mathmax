/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính rồi tính phép chia số có năm chữ số cho số có một chữ số: chia từng hàng từ trái sang phải, chia hết và chia có dư, thương có chữ số 0; chia nhẩm số tròn nghìn.',
  intro:
    'Kho có 10 160 kg muối, chia đều lên 4 ô tô. Mỗi ô tô chở bao nhiêu ki-lô-gam muối? Em đặt tính rồi chia từ bên trái nhé!',
  objectives: [
    'Đặt tính và chia số có năm chữ số cho số có một chữ số.',
    'Chia từng hàng từ trái sang phải: chia, nhân, trừ, hạ.',
    'Biết phép chia có dư: số dư bé hơn số chia.',
    'Chia nhẩm số tròn nghìn.',
  ],
  sections: [
    {
      heading: 'Chia từ hàng chục nghìn',
      blocks: [
        { type: 'p', text: 'Em tính 45 789 : 3. Em chia từ hàng chục nghìn, sang phải.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '4 chia 3 được 1, viết 1. 1 nhân 3 bằng 3; 4 trừ 3 bằng 1.',
            'Hạ 5, được 15; 15 chia 3 được 5, viết 5. 5 nhân 3 bằng 15; 15 trừ 15 bằng 0.',
            'Hạ 7; 7 chia 3 được 2, viết 2. 2 nhân 3 bằng 6; 7 trừ 6 bằng 1.',
            'Hạ 8, được 18; 18 chia 3 được 6, viết 6. 6 nhân 3 bằng 18; 18 trừ 18 bằng 0.',
            'Hạ 9; 9 chia 3 được 3, viết 3. 3 nhân 3 bằng 9; 9 trừ 9 bằng 0.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '45 789 : 3 = 15 263.' },
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
        {
          type: 'p',
          text: 'Em tính 21 684 : 4. Hàng chục nghìn là 2, bé hơn 4, nên em lấy 21 để chia.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '21 chia 4 được 5, viết 5. 5 nhân 4 bằng 20; 21 trừ 20 bằng 1.',
            'Hạ 6, được 16; 16 chia 4 được 4, viết 4. 4 nhân 4 bằng 16; 16 trừ 16 bằng 0.',
            'Hạ 8; 8 chia 4 được 2, viết 2. 2 nhân 4 bằng 8; 8 trừ 8 bằng 0.',
            'Hạ 4; 4 chia 4 được 1, viết 1. 1 nhân 4 bằng 4; 4 trừ 4 bằng 0.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '21 684 : 4 = 5 421.' },
      ],
    },
    {
      heading: 'Phép chia có dư',
      blocks: [
        { type: 'p', text: 'Em tính 21 437 : 3. Em lấy 21 để chia.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '21 chia 3 được 7, viết 7. 7 nhân 3 bằng 21; 21 trừ 21 bằng 0.',
            'Hạ 4; 4 chia 3 được 1, viết 1. 1 nhân 3 bằng 3; 4 trừ 3 bằng 1.',
            'Hạ 3, được 13; 13 chia 3 được 4, viết 4. 4 nhân 3 bằng 12; 13 trừ 12 bằng 1.',
            'Hạ 7, được 17; 17 chia 3 được 5, viết 5. 5 nhân 3 bằng 15; 17 trừ 15 bằng 2.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '21 437 : 3 = 7 145 (dư 2).' },
        { type: 'callout', tone: 'warning', text: 'Số dư luôn bé hơn số chia.' },
        { type: 'p', text: 'Thử lại: 7 145 × 3 = 21 435, 21 435 + 2 = 21 437.' },
      ],
    },
    {
      heading: 'Thương có chữ số 0',
      blocks: [
        { type: 'p', text: 'Em tính 16 025 : 5. Em lấy 16 để chia.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '16 chia 5 được 3, viết 3. 3 nhân 5 bằng 15; 16 trừ 15 bằng 1.',
            'Hạ 0, được 10; 10 chia 5 được 2, viết 2. 2 nhân 5 bằng 10; 10 trừ 10 bằng 0.',
            'Hạ 2; 2 chia 5 được 0, viết 0. 0 nhân 5 bằng 0; 2 trừ 0 bằng 2.',
            'Hạ 5, được 25; 25 chia 5 được 5, viết 5. 5 nhân 5 bằng 25; 25 trừ 25 bằng 0.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '16 025 : 5 = 3 205.' },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Mỗi lần hạ một chữ số, em viết một chữ số ở thương. Chia không được thì viết 0.',
        },
      ],
    },
    {
      heading: 'Chia nhẩm số tròn nghìn',
      blocks: [
        { type: 'p', text: 'Em tính nhẩm 15 000 : 5.' },
        { type: 'p', text: 'Em nhẩm: 15 nghìn : 5 = 3 nghìn.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '15 000 : 5 = 3 000.' },
      ],
    },
  ],
  explore: {
    title: 'Chia từng lượt',
    instruction:
      'Em chia từ bên trái. Mỗi lượt em chọn chữ số của thương, rồi chọn số còn lại sau khi trừ, rồi bấm nút để hạ chữ số tiếp theo. Chọn "Có dư" hoặc "Thương có số 0" để thử các trường hợp khác.',
  },
  examples: [
    {
      problem:
        'Kho có 10 160 kg muối, chia đều lên 4 ô tô. Hỏi mỗi ô tô chở bao nhiêu ki-lô-gam muối?',
      steps: [
        'Em tính 10 160 : 4. Hàng chục nghìn là 1, bé hơn 4, nên em lấy 10 để chia.',
        '10 chia 4 được 2, viết 2. 2 nhân 4 bằng 8; 10 trừ 8 bằng 2.',
        'Hạ 1, được 21; 21 chia 4 được 5, viết 5. 5 nhân 4 bằng 20; 21 trừ 20 bằng 1.',
        'Hạ 6, được 16; 16 chia 4 được 4, viết 4. 4 nhân 4 bằng 16; 16 trừ 16 bằng 0.',
        'Hạ 0; 0 chia 4 được 0, viết 0.',
        '10 160 : 4 = 2 540 (kg).',
      ],
      answer: 'Mỗi ô tô chở 2 540 kg muối.',
    },
    {
      problem:
        'Có 10 243 viên thuốc, đóng vào các vỉ, mỗi vỉ 8 viên. Hỏi đóng được nhiều nhất bao nhiêu vỉ thuốc và còn thừa mấy viên?',
      steps: [
        'Em tính 10 243 : 8. Em lấy 10 để chia.',
        '10 chia 8 được 1, viết 1. 1 nhân 8 bằng 8; 10 trừ 8 bằng 2.',
        'Hạ 2, được 22; 22 chia 8 được 2, viết 2. 2 nhân 8 bằng 16; 22 trừ 16 bằng 6.',
        'Hạ 4, được 64; 64 chia 8 được 8, viết 8. 8 nhân 8 bằng 64; 64 trừ 64 bằng 0.',
        'Hạ 3; 3 chia 8 được 0, viết 0. 3 trừ 0 bằng 3.',
        '10 243 : 8 = 1 280 (dư 3).',
      ],
      answer: 'Đóng được nhiều nhất 1 280 vỉ thuốc, còn thừa 3 viên.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đặt tính rồi tính: 36 095 : 8 = ?',
      options: ['4 511 (dư 7)', '4 510 (dư 15)', '451 (dư 7)', '4 512 (dư 1)'],
      answer: 0,
      hints: ['3 bé hơn 8, em lấy 36 để chia.', 'Số dư phải bé hơn 8.'],
      solution:
        '36 chia 8 được 4, viết 4; 36 trừ 32 bằng 4. Hạ 0, được 40; 40 chia 8 được 5, viết 5; 40 trừ 40 bằng 0. Hạ 9; 9 chia 8 được 1, viết 1; 9 trừ 8 bằng 1. Hạ 5, được 15; 15 chia 8 được 1, viết 1; 15 trừ 8 bằng 7. Vậy 36 095 : 8 = 4 511 (dư 7).',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 45 250 : 5 = ?',
      answer: 9050,
      hints: ['4 bé hơn 5, em lấy 45 để chia.', 'Hạ 2: 2 chia 5 được 0. Em nhớ viết 0 ở thương.'],
      solution:
        '45 chia 5 được 9, viết 9; 45 trừ 45 bằng 0. Hạ 2; 2 chia 5 được 0, viết 0; 2 trừ 0 bằng 2. Hạ 5, được 25; 25 chia 5 được 5, viết 5; 25 trừ 25 bằng 0. Hạ 0; 0 chia 5 được 0, viết 0. Vậy 45 250 : 5 = 9 050.',
    },
    {
      type: 'choice',
      prompt: 'Phép chia nào có kết quả lớn nhất?',
      options: ['27 162 : 3', '45 250 : 5', '36 180 : 4'],
      answer: 0,
      hints: ['Em tính từng phép chia rồi so sánh các thương.'],
      solution:
        '27 162 : 3 = 9 054. 45 250 : 5 = 9 050. 36 180 : 4 = 9 045. Số lớn nhất là 9 054, nên 27 162 : 3 có kết quả lớn nhất.',
    },
    {
      type: 'match',
      prompt: 'Tính nhẩm rồi nối mỗi phép chia với kết quả của nó.',
      left: ['21 000 : 3', '24 000 : 4', '56 000 : 7', '15 000 : 5'],
      right: ['7 000', '6 000', '8 000', '3 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhẩm theo nghìn: 21 nghìn : 3 = 7 nghìn.'],
      solution:
        '21 nghìn : 3 = 7 nghìn. 24 nghìn : 4 = 6 nghìn. 56 nghìn : 7 = 8 nghìn. 15 nghìn : 5 = 3 nghìn.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 28 036 : 4 theo đúng thứ tự.',
      items: [
        'Hạ 3; 3 chia 4 được 0, viết 0',
        '28 chia 4 được 7, viết 7',
        'Hạ 6, được 36; 36 chia 4 được 9, viết 9',
        'Hạ 0; 0 chia 4 được 0, viết 0',
      ],
      answer: [1, 3, 0, 2],
      hints: ['2 bé hơn 4, em lấy 28 để chia trước.', 'Em hạ lần lượt các chữ số 0, 3, 6.'],
      solution:
        '28 chia 4 được 7, viết 7; 28 trừ 28 bằng 0. Hạ 0; 0 chia 4 được 0, viết 0. Hạ 3; 3 chia 4 được 0, viết 0; 3 trừ 0 bằng 3. Hạ 6, được 36; 36 chia 4 được 9, viết 9; 36 trừ 36 bằng 0. Vậy 28 036 : 4 = 7 009.',
    },
    {
      type: 'number',
      prompt: 'Có 12 000 bút sáp màu, xếp vào các hộp, mỗi hộp 6 bút. Hỏi xếp được bao nhiêu hộp?',
      answer: 2000,
      unit: 'hộp',
      hints: ['Mỗi hộp 6 bút, em làm phép chia cho 6.', 'Em nhẩm: 12 nghìn : 6.'],
      solution: '12 nghìn : 6 = 2 nghìn. Xếp được 12 000 : 6 = 2 000 (hộp).',
    },
    {
      type: 'choice',
      prompt:
        'Có 12 345 cái bánh, xếp vào các hộp, mỗi hộp 6 cái. Xếp được nhiều nhất bao nhiêu hộp và còn thừa mấy cái bánh?',
      options: [
        '2 057 hộp, thừa 3 cái',
        '257 hộp, thừa 3 cái',
        '2 056 hộp, thừa 9 cái',
        '2 058 hộp, thừa 3 cái',
      ],
      answer: 0,
      hints: ['Em tính 12 345 : 6.', 'Hạ 3: 3 chia 6 được 0. Số bánh thừa phải bé hơn 6.'],
      solution:
        '12 chia 6 được 2; 12 trừ 12 bằng 0. Hạ 3; 3 chia 6 được 0, viết 0; 3 trừ 0 bằng 3. Hạ 4, được 34; 34 chia 6 được 5; 34 trừ 30 bằng 4. Hạ 5, được 45; 45 chia 6 được 7; 45 trừ 42 bằng 3. 12 345 : 6 = 2 057 (dư 3). Xếp được 2 057 hộp, thừa 3 cái bánh.',
    },
    {
      type: 'choice',
      prompt: 'Trong phép chia cho 8, số dư lớn nhất có thể là bao nhiêu?',
      options: ['7', '8', '9', '1'],
      answer: 0,
      hints: ['Số dư luôn bé hơn số chia.'],
      solution: 'Số dư bé hơn 8, nên số dư lớn nhất là 7.',
    },
    {
      type: 'choice',
      prompt: 'Bình tính 16 025 : 5 và được 325. Bình làm đúng hay sai?',
      options: [
        'Sai, Bình quên viết chữ số 0 ở thương khi hạ 2',
        'Đúng rồi',
        'Sai, 16 chia 5 phải được 2',
      ],
      answer: 0,
      hints: ['Mỗi lần hạ một chữ số, em viết một chữ số ở thương.', 'Em thử lại: 325 × 5.'],
      solution:
        'Hạ 2: 2 chia 5 được 0, phải viết 0 ở thương. Vậy 16 025 : 5 = 3 205. Thử lại: 3 205 × 5 = 16 025, còn 325 × 5 = 1 625.',
    },
    {
      type: 'number',
      prompt: 'Một phép chia có số chia là 8, thương là 4 511 và số dư là 7. Tìm số bị chia.',
      answer: 36095,
      hints: ['Số bị chia bằng thương nhân số chia, rồi cộng số dư.', 'Em tính 4 511 × 8 trước.'],
      solution: '4 511 × 8 = 36 088. 36 088 + 7 = 36 095. Số bị chia là 36 095.',
    },
  ],
  takeaways: [
    'Chia từ trái sang phải: chia, viết, nhân, trừ, hạ.',
    'Mỗi lần hạ một chữ số thì viết một chữ số ở thương, có thể là 0.',
    'Số dư bé hơn số chia.',
  ],
};
