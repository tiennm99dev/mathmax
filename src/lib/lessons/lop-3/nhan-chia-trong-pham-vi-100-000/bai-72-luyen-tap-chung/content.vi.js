/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Nhân, chia trong phạm vi 100 000: tính nhẩm, đặt tính rồi tính, tính giá trị biểu thức và giải bài toán thực tế.',
  intro:
    'Em đã biết nhân, chia số có năm chữ số với số có một chữ số. Giờ em luyện tập để tính thật chắc và giải các bài toán nhé!',
  objectives: [
    'Đặt tính rồi tính nhân, chia số có năm chữ số với số có một chữ số.',
    'Tính nhẩm nhân, chia với số tròn nghìn.',
    'Tính giá trị của biểu thức có phép nhân, phép chia.',
    'Giải bài toán thực tế bằng một hoặc hai bước tính.',
  ],
  sections: [
    {
      heading: 'Nhân, chia theo cột',
      blocks: [
        {
          type: 'table',
          head: ['Phép tính', 'Em làm thế nào?'],
          rows: [
            ['Nhân', 'Từ hàng đơn vị, sang trái. Thêm số đã nhớ vào hàng tiếp theo.'],
            ['Chia', 'Từ bên trái, sang phải. Chia, viết, nhân, trừ, hạ.'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi chia, mỗi lần hạ một chữ số thì em viết một chữ số ở thương. Chia không được thì viết 0.',
        },
        { type: 'callout', tone: 'theorem', text: 'Số dư luôn bé hơn số chia.' },
      ],
    },
    {
      heading: 'Tính nhẩm số tròn nghìn',
      blocks: [
        {
          type: 'p',
          text: '2 000 × 4 × 5: em nhẩm 2 nghìn × 4 = 8 nghìn, 8 nghìn × 5 = 40 nghìn.',
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '2 000 × 4 × 5 = 40 000.' },
        {
          type: 'p',
          text: '36 000 : 6 : 2: em nhẩm 36 nghìn : 6 = 6 nghìn, 6 nghìn : 2 = 3 nghìn.',
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '36 000 : 6 : 2 = 3 000.' },
      ],
    },
    {
      heading: 'Tính giá trị biểu thức',
      blocks: [
        {
          type: 'p',
          text: 'Biểu thức có cộng, trừ và nhân, chia: em làm phép nhân, chia trước, cộng, trừ sau.',
        },
        { type: 'p', text: '7 479 + 3 204 × 5 = 7 479 + 16 020 = 23 499.' },
        {
          type: 'p',
          text: 'Biểu thức chỉ có nhân và chia: em tính từ trái sang phải.',
        },
        { type: 'p', text: '36 459 : 9 × 3 = 4 051 × 3 = 12 153.' },
        { type: 'p', text: 'Biểu thức có dấu ngoặc: em tính trong ngoặc trước.' },
        { type: 'p', text: '80 000 : (2 × 4) = 80 000 : 8 = 10 000.' },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Mỗi lượt có mười câu, mỗi câu một dạng bài. Em chọn đáp án đúng. Sai lần đầu, em được gợi ý và làm lại. Hết lượt, em xem dạng nào cần ôn, rồi bấm "Làm bộ bài khác".',
  },
  examples: [
    {
      problem:
        'Nam có 2 tờ tiền loại 20 000 đồng. Nam dùng hết số tiền đó để mua 8 quyển vở như nhau. Hỏi mỗi quyển vở giá bao nhiêu tiền?',
      steps: [
        'Nam có: 20 000 × 2 = 40 000 (đồng).',
        'Mỗi quyển vở giá: 40 000 : 8 = 5 000 (đồng). Em nhẩm 40 nghìn : 8 = 5 nghìn.',
      ],
      answer: 'Mỗi quyển vở giá 5 000 đồng.',
    },
    {
      problem:
        'Một trang trại có 2 520 cây chanh. Số cây cam gấp 3 lần số cây chanh. Hỏi trang trại có tất cả bao nhiêu cây chanh và cây cam?',
      steps: [
        'Số cây cam: 2 520 × 3 = 7 560 (cây).',
        'Cả chanh và cam: 2 520 + 7 560 = 10 080 (cây).',
      ],
      answer: 'Trang trại có tất cả 10 080 cây chanh và cây cam.',
    },
    {
      problem: 'Tính giá trị của biểu thức: 14 105 × 6 : 5.',
      steps: [
        'Biểu thức chỉ có nhân và chia, em tính từ trái sang phải.',
        '14 105 × 6 = 84 630.',
        '84 630 : 5 = 16 926.',
      ],
      answer: '14 105 × 6 : 5 = 16 926.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Tính nhẩm rồi nối mỗi biểu thức với giá trị của nó.',
      left: ['2 000 × 3 × 5', '36 000 : 6 : 2', '30 000 : 3 × 6', '80 000 : (2 × 4)'],
      right: ['30 000', '3 000', '60 000', '10 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhẩm theo nghìn.', 'Có ngoặc thì tính trong ngoặc trước: 2 × 4 = 8.'],
      solution:
        '2 nghìn × 3 = 6 nghìn, 6 nghìn × 5 = 30 nghìn. 36 nghìn : 6 = 6 nghìn, 6 nghìn : 2 = 3 nghìn. 30 nghìn : 3 = 10 nghìn, 10 nghìn × 6 = 60 nghìn. 80 nghìn : 8 = 10 nghìn.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 24 132 × 4 = ?',
      answer: 96528,
      hints: ['4 nhân 2 bằng 8, viết 8.', 'Hàng chục: 4 nhân 3 bằng 12, viết 2, nhớ 1.'],
      solution:
        '4 nhân 2 bằng 8, viết 8. 4 nhân 3 bằng 12, viết 2, nhớ 1. 4 nhân 1 bằng 4, thêm 1 bằng 5, viết 5. 4 nhân 4 bằng 16, viết 6, nhớ 1. 4 nhân 2 bằng 8, thêm 1 bằng 9, viết 9. Vậy 24 132 × 4 = 96 528.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính rồi tính: 63 854 : 7 = ?',
      options: ['9 122', '912', '9 102', '9 121'],
      answer: 0,
      hints: [
        '6 bé hơn 7, em lấy 63 để chia.',
        'Mỗi lần hạ một chữ số, em viết một chữ số ở thương.',
      ],
      solution:
        '63 chia 7 được 9, viết 9; 63 trừ 63 bằng 0. Hạ 8; 8 chia 7 được 1, viết 1; 8 trừ 7 bằng 1. Hạ 5, được 15; 15 chia 7 được 2, viết 2; 15 trừ 14 bằng 1. Hạ 4, được 14; 14 chia 7 được 2, viết 2; 14 trừ 14 bằng 0. Vậy 63 854 : 7 = 9 122.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính rồi tính: 46 519 : 6 = ?',
      options: ['7 753 (dư 1)', '7 752 (dư 7)', '7 754 (dư 1)', '7 753 (dư 2)'],
      answer: 0,
      hints: ['4 bé hơn 6, em lấy 46 để chia.', 'Số dư phải bé hơn 6.'],
      solution:
        '46 chia 6 được 7, viết 7; 46 trừ 42 bằng 4. Hạ 5, được 45; 45 chia 6 được 7, viết 7; 45 trừ 42 bằng 3. Hạ 1, được 31; 31 chia 6 được 5, viết 5; 31 trừ 30 bằng 1. Hạ 9, được 19; 19 chia 6 được 3, viết 3; 19 trừ 18 bằng 1. Vậy 46 519 : 6 = 7 753 (dư 1).',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 13 104 × 7 = ?',
      answer: 91728,
      hints: ['7 nhân 4 bằng 28, viết 8, nhớ 2.', 'Hàng chục: 7 nhân 0 bằng 0, rồi thêm 2 đã nhớ.'],
      solution:
        '7 nhân 4 bằng 28, viết 8, nhớ 2. 7 nhân 0 bằng 0, thêm 2 bằng 2, viết 2. 7 nhân 1 bằng 7, viết 7. 7 nhân 3 bằng 21, viết 1, nhớ 2. 7 nhân 1 bằng 7, thêm 2 bằng 9, viết 9. Vậy 13 104 × 7 = 91 728.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính rồi tính: 57 364 : 6 = ?',
      options: ['9 560 (dư 4)', '956 (dư 4)', '9 561 (dư 2)', '9 506 (dư 4)'],
      answer: 0,
      hints: ['5 bé hơn 6, em lấy 57 để chia.', 'Hạ 4: 4 chia 6 được 0. Em nhớ viết 0 ở thương.'],
      solution:
        '57 chia 6 được 9, viết 9; 57 trừ 54 bằng 3. Hạ 3, được 33; 33 chia 6 được 5, viết 5; 33 trừ 30 bằng 3. Hạ 6, được 36; 36 chia 6 được 6, viết 6; 36 trừ 36 bằng 0. Hạ 4; 4 chia 6 được 0, viết 0; 4 trừ 0 bằng 4. Vậy 57 364 : 6 = 9 560 (dư 4).',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 48 560 : 5 = ?',
      answer: 9712,
      hints: ['4 bé hơn 5, em lấy 48 để chia.', '48 chia 5 được 9, còn 3. Hạ 5 được 35.'],
      solution:
        '48 chia 5 được 9, viết 9; 48 trừ 45 bằng 3. Hạ 5, được 35; 35 chia 5 được 7, viết 7; 35 trừ 35 bằng 0. Hạ 6; 6 chia 5 được 1, viết 1; 6 trừ 5 bằng 1. Hạ 0, được 10; 10 chia 5 được 2, viết 2; 10 trừ 10 bằng 0. Vậy 48 560 : 5 = 9 712.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: (24 516 − 4 107) : 3.',
      answer: 6803,
      hints: ['Em tính trong ngoặc trước.', '24 516 − 4 107 = 20 409. Rồi em chia cho 3.'],
      solution: '(24 516 − 4 107) : 3 = 20 409 : 3 = 6 803.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 9 015 × 3 × 2.',
      answer: 54090,
      hints: ['Biểu thức chỉ có phép nhân: em tính từ trái sang phải.', '9 015 × 3 = 27 045.'],
      solution: '9 015 × 3 × 2 = 27 045 × 2 = 54 090.',
    },
    {
      type: 'multi',
      prompt:
        'Rô-bốt chỉ đi trên những đoạn đường ghi phép tính có kết quả bé hơn 8 000. Chọn tất cả các phép tính đó.',
      options: ['36 000 : 6', '2 000 × 4', '64 000 : 8', '3 500 × 2', '49 000 : 7', '18 000 : 2'],
      answers: [0, 3, 4],
      hints: ['Em tính nhẩm từng phép tính theo nghìn hoặc theo trăm.', '35 trăm × 2 = 70 trăm.'],
      solution:
        '36 000 : 6 = 6 000. 2 000 × 4 = 8 000. 64 000 : 8 = 8 000. 3 500 × 2 = 7 000. 49 000 : 7 = 7 000. 18 000 : 2 = 9 000. Bé hơn 8 000 là 36 000 : 6, 3 500 × 2 và 49 000 : 7.',
    },
    {
      type: 'number',
      prompt:
        'Mẹ có 5 tờ tiền loại 20 000 đồng. Mẹ dùng hết số tiền đó để mua 4 hộp bút như nhau. Hỏi mỗi hộp bút giá bao nhiêu tiền?',
      answer: 25000,
      unit: 'đồng',
      hints: ['Trước hết em tính mẹ có bao nhiêu tiền.', 'Rồi em chia số tiền đó cho 4.'],
      solution: 'Mẹ có: 20 000 × 5 = 100 000 (đồng). Mỗi hộp bút giá: 100 000 : 4 = 25 000 (đồng).',
    },
    {
      type: 'number',
      prompt:
        'Một trang trại có 1 250 cây chanh. Số cây cam gấp 4 lần số cây chanh. Hỏi trang trại có tất cả bao nhiêu cây chanh và cây cam?',
      answer: 6250,
      unit: 'cây',
      hints: ['Trước hết em tính số cây cam: 1 250 × 4.', 'Rồi em cộng với số cây chanh.'],
      solution: 'Số cây cam: 1 250 × 4 = 5 000 (cây). Tất cả: 1 250 + 5 000 = 6 250 (cây).',
    },
  ],
  takeaways: [
    'Nhân từ phải sang trái; chia từ trái sang phải.',
    'Mỗi lần hạ một chữ số thì viết một chữ số ở thương; số dư bé hơn số chia.',
    'Trong biểu thức, nhân, chia trước; cộng, trừ sau.',
  ],
};
