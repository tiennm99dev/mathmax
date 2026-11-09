/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính rồi tính phép cộng các số trong phạm vi 100 000, không nhớ và có nhớ; cộng nhẩm số tròn nghìn, tròn chục nghìn; tính giá trị biểu thức và giải bài toán có lời văn.',
  intro:
    'Cửa hàng nhận về 6 500 quyển sách giáo khoa, 3 860 quyển sách tham khảo và 8 500 quyển vở. Cửa hàng nhận về tất cả bao nhiêu quyển sách và vở? Em học cộng các số có năm chữ số nhé!',
  objectives: [
    'Đặt tính và cộng các số có năm chữ số.',
    'Biết cộng có nhớ, kể cả nhớ nhiều lần.',
    'Cộng nhẩm số tròn nghìn, tròn chục nghìn.',
    'Tính giá trị biểu thức và giải bài toán có phép cộng.',
  ],
  sections: [
    {
      heading: 'Cộng không nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 23 415 + 51 362.' },
        {
          type: 'p',
          text: 'Em đặt tính: viết số này dưới số kia, các hàng thẳng cột với nhau. Hàng chục nghìn ở bên trái hàng nghìn.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '5 cộng 2 bằng 7, viết 7.',
            '1 cộng 6 bằng 7, viết 7.',
            '4 cộng 3 bằng 7, viết 7.',
            '3 cộng 1 bằng 4, viết 4.',
            '2 cộng 5 bằng 7, viết 7.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '23 415 + 51 362 = 74 777.' },
      ],
    },
    {
      heading: 'Cộng có nhớ',
      blocks: [
        {
          type: 'p',
          text: 'Em tính 45 637 + 28 485. Hàng nào cộng được 10 hoặc hơn thì phải nhớ.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '7 cộng 5 bằng 12, viết 2, nhớ 1.',
            '3 cộng 8 bằng 11, thêm 1 bằng 12, viết 2, nhớ 1.',
            '6 cộng 4 bằng 10, thêm 1 bằng 11, viết 1, nhớ 1.',
            '5 cộng 8 bằng 13, thêm 1 bằng 14, viết 4, nhớ 1.',
            '4 cộng 2 bằng 6, thêm 1 bằng 7, viết 7.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '45 637 + 28 485 = 74 122.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em cộng từ phải sang trái. Hàng nào được 10 hoặc hơn thì viết chữ số hàng đơn vị, nhớ 1 sang hàng bên trái.',
        },
      ],
    },
    {
      heading: 'Cộng với số có bốn chữ số',
      blocks: [
        { type: 'p', text: 'Em tính 45 216 + 7 395. Số 7 395 không có hàng chục nghìn.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '6 cộng 5 bằng 11, viết 1, nhớ 1.',
            '1 cộng 9 bằng 10, thêm 1 bằng 11, viết 1, nhớ 1.',
            '2 cộng 3 bằng 5, thêm 1 bằng 6, viết 6.',
            '5 cộng 7 bằng 12, viết 2, nhớ 1.',
            '4 thêm 1 bằng 5, viết 5.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '45 216 + 7 395 = 52 611.' },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Viết 7 395 thẳng cột từ hàng đơn vị: chữ số 5 dưới chữ số 6, chữ số 7 dưới chữ số 5.',
        },
      ],
    },
    {
      heading: 'Cộng nhẩm',
      blocks: [
        { type: 'p', text: 'Số tròn nghìn: 6 000 + 5 000. Em nhẩm 6 nghìn + 5 nghìn = 11 nghìn.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '6 000 + 5 000 = 11 000.' },
        {
          type: 'p',
          text: 'Số tròn chục nghìn: 40 000 + 20 000. Em nhẩm 4 chục nghìn + 2 chục nghìn = 6 chục nghìn.',
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '40 000 + 20 000 = 60 000.' },
        { type: 'p', text: '32 000 + 7 000: em nhẩm 32 nghìn + 7 nghìn = 39 nghìn.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '32 000 + 7 000 = 39 000.' },
      ],
    },
    {
      heading: 'Tính giá trị biểu thức',
      blocks: [
        { type: 'p', text: 'Biểu thức chỉ có phép cộng: em tính từ trái sang phải.' },
        {
          type: 'table',
          head: ['Bước', 'Em tính'],
          rows: [
            ['1', '35 000 + 27 000 = 62 000'],
            ['2', '62 000 + 13 000 = 75 000'],
          ],
          caption: '35 000 + 27 000 + 13 000 = 75 000',
        },
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
      problem: 'Đặt tính rồi tính: 38 050 + 9 562.',
      steps: [
        '0 cộng 2 bằng 2, viết 2.',
        '5 cộng 6 bằng 11, viết 1, nhớ 1.',
        '0 cộng 5 bằng 5, thêm 1 bằng 6, viết 6.',
        '8 cộng 9 bằng 17, viết 7, nhớ 1.',
        '3 thêm 1 bằng 4, viết 4.',
      ],
      answer: '38 050 + 9 562 = 47 612.',
    },
    {
      problem:
        'Cửa hàng nhận về 6 500 quyển sách giáo khoa, 3 860 quyển sách tham khảo và 8 500 quyển vở. Hỏi cửa hàng nhận về tất cả bao nhiêu quyển sách và vở?',
      steps: [
        'Em tính số quyển sách: 6 500 + 3 860 = 10 360 (quyển).',
        'Em tính số quyển sách và vở: 10 360 + 8 500 = 18 860 (quyển).',
      ],
      answer: 'Cửa hàng nhận về tất cả 18 860 quyển sách và vở.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '24 680 + 35 791 bằng bao nhiêu?',
      options: ['60 471', '59 371', '60 371', '50 471'],
      answer: 0,
      hints: [
        '0 cộng 1 bằng 1. Hàng chục: 8 cộng 9 bằng 17, em viết 7, nhớ 1.',
        'Hàng trăm và hàng nghìn cũng có nhớ. Em nhớ thêm 1 vào hàng bên trái nhé.',
      ],
      solution:
        '0 cộng 1 bằng 1, viết 1. 8 cộng 9 bằng 17, viết 7, nhớ 1. 6 cộng 7 bằng 13, thêm 1 bằng 14, viết 4, nhớ 1. 4 cộng 5 bằng 9, thêm 1 bằng 10, viết 0, nhớ 1. 2 cộng 3 bằng 5, thêm 1 bằng 6, viết 6. Vậy 24 680 + 35 791 = 60 471.',
    },
    {
      type: 'match',
      prompt: 'Tính nhẩm rồi nối mỗi phép cộng với kết quả của nó.',
      left: ['40 000 + 20 000', '60 000 + 30 000', '50 000 + 50 000', '32 000 + 7 000'],
      right: ['60 000', '90 000', '100 000', '39 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Em nhẩm theo chục nghìn: 4 chục nghìn + 2 chục nghìn = 6 chục nghìn.',
        '10 chục nghìn là 100 000. 32 nghìn + 7 nghìn = 39 nghìn.',
      ],
      solution:
        '40 000 + 20 000 = 60 000. 60 000 + 30 000 = 90 000. 50 000 + 50 000 = 100 000. 32 000 + 7 000 = 39 000.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 49 000 + 2 000 = ?',
      options: ['51 000', '49 200', '69 000', '41 000'],
      answer: 0,
      hints: ['2 000 là 2 nghìn.', 'Em nhẩm: 49 nghìn + 2 nghìn = mấy nghìn?'],
      solution: '49 nghìn + 2 nghìn = 51 nghìn. Vậy 49 000 + 2 000 = 51 000.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 27 154 + 36 528 theo đúng thứ tự.',
      items: [
        '1 cộng 5 bằng 6, viết 6',
        '4 cộng 8 bằng 12, viết 2, nhớ 1',
        '2 cộng 3 bằng 5, thêm 1 bằng 6, viết 6',
        '5 cộng 2 bằng 7, thêm 1 bằng 8, viết 8',
        '7 cộng 6 bằng 13, viết 3, nhớ 1',
      ],
      answer: [1, 3, 0, 4, 2],
      hints: ['Em cộng từ hàng đơn vị trước.', 'Hàng chục nghìn làm sau cùng.'],
      solution:
        '4 cộng 8 bằng 12, viết 2, nhớ 1. 5 cộng 2 bằng 7, thêm 1 bằng 8, viết 8. 1 cộng 5 bằng 6, viết 6. 7 cộng 6 bằng 13, viết 3, nhớ 1. 2 cộng 3 bằng 5, thêm 1 bằng 6, viết 6. Vậy 27 154 + 36 528 = 63 682.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị biểu thức: 20 500 + 50 900 + 8 500 = ?',
      answer: 79900,
      hints: [
        'Em tính từ trái sang phải.',
        'Trước hết em tính 20 500 + 50 900, rồi cộng thêm 8 500.',
      ],
      solution: '20 500 + 50 900 = 71 400. 71 400 + 8 500 = 79 900.',
    },
    {
      type: 'choice',
      prompt:
        'Mai tính 36 475 + 17 268 như sau: 5 cộng 8 bằng 13, viết 3, nhớ 1. 7 cộng 6 bằng 13, thêm 1 bằng 14, viết 4, nhớ 1. 4 cộng 2 bằng 6, thêm 1 bằng 7, viết 7. 6 cộng 7 bằng 13, viết 3, nhớ 1. 3 cộng 1 bằng 4, viết 4. Mai được 43 743. Mai làm đúng hay sai?',
      options: [
        'Sai, ở hàng chục nghìn Mai quên thêm 1 đã nhớ',
        'Đúng rồi',
        'Sai, ở hàng chục Mai quên thêm 1 đã nhớ',
      ],
      answer: 0,
      hints: ['Hàng nghìn có nhớ 1. Em xem Mai làm gì với số 1 đó ở hàng bên trái.'],
      solution:
        'Hàng chục nghìn: 3 cộng 1 bằng 4, phải thêm 1 bằng 5, viết 5. Vậy 36 475 + 17 268 = 53 743, không phải 43 743.',
    },
    {
      type: 'number',
      prompt: 'Trong phép cộng 3▢ 425 + 14 263 = 50 688, chữ số trong ô trống là chữ số nào?',
      answer: 6,
      hints: [
        'Em cộng hàng nghìn: ▢ cộng 4, có nhớ gì không?',
        'Hàng trăm 4 cộng 2 bằng 6, không nhớ. Vậy ▢ cộng 4 phải bằng 10, viết 0, nhớ 1.',
      ],
      solution:
        'Hàng trăm 4 cộng 2 bằng 6, không nhớ. Hàng nghìn của tổng là 0, hàng chục nghìn là 3 cộng 1 thêm 1 bằng 5, nên ▢ cộng 4 bằng 10, ▢ là 6. Thử lại: 36 425 + 14 263 = 50 688.',
    },
    {
      type: 'number',
      prompt:
        'Lần thứ nhất, bác Tư thả 10 800 con cá giống. Lần thứ hai, bác thả nhiều hơn lần thứ nhất 950 con. Hỏi cả hai lần bác Tư thả bao nhiêu con cá giống?',
      answer: 22550,
      hints: [
        'Trước hết em tìm số cá bác thả lần thứ hai: "nhiều hơn" thì em làm phép cộng.',
        'Rồi em cộng số cá của hai lần.',
      ],
      solution:
        'Lần thứ hai bác thả: 10 800 + 950 = 11 750 (con). Cả hai lần bác thả: 10 800 + 11 750 = 22 550 (con cá).',
    },
    {
      type: 'number',
      prompt:
        'Một trang trại có 28 750 con gà. Trang trại nuôi thêm 6 480 con gà. Hỏi trang trại có tất cả bao nhiêu con gà?',
      answer: 35230,
      hints: ['"Thêm" và "tất cả" thì em làm phép cộng.', 'Em đặt tính 28 750 + 6 480.'],
      solution:
        '0 cộng 0 bằng 0, viết 0. 5 cộng 8 bằng 13, viết 3, nhớ 1. 7 cộng 4 bằng 11, thêm 1 bằng 12, viết 2, nhớ 1. 8 cộng 6 bằng 14, thêm 1 bằng 15, viết 5, nhớ 1. 2 thêm 1 bằng 3, viết 3. Trang trại có tất cả 28 750 + 6 480 = 35 230 (con gà).',
    },
    {
      type: 'choice',
      prompt: 'Phép cộng nào có kết quả lớn nhất?',
      options: ['19 000 + 37 000', '30 000 + 25 000', '28 000 + 26 000'],
      answer: 0,
      hints: ['Em tính nhẩm từng phép cộng theo nghìn.', '19 nghìn + 37 nghìn = mấy nghìn?'],
      solution:
        '19 000 + 37 000 = 56 000. 30 000 + 25 000 = 55 000. 28 000 + 26 000 = 54 000. Kết quả lớn nhất là 56 000, của phép cộng 19 000 + 37 000.',
    },
  ],
  takeaways: [
    'Đặt tính thẳng cột: đơn vị thẳng đơn vị, chục thẳng chục, … chục nghìn thẳng chục nghìn.',
    'Cộng từ phải sang trái. Được 10 hoặc hơn thì nhớ 1 sang hàng bên trái.',
    'Cộng nhẩm: 4 chục nghìn + 2 chục nghìn = 6 chục nghìn.',
  ],
};
