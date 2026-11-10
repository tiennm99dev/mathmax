/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập đọc, viết số đến 100 000; viết số thành tổng các hàng; số liền trước, số liền sau; so sánh, sắp xếp số và làm tròn số đến hàng nghìn, hàng chục nghìn.',
  intro:
    'Một ngày, thành phố tiêm được 37 243 liều vắc-xin. Em đọc số này thế nào? Số này gần với bao nhiêu nghìn? Cùng ôn lại các số đến 100 000 nhé!',
  objectives: [
    'Đọc, viết được các số trong phạm vi 100 000.',
    'Viết được số thành tổng các chục nghìn, nghìn, trăm, chục, đơn vị.',
    'So sánh, sắp xếp được các số; làm tròn được số đến hàng nghìn, hàng chục nghìn.',
  ],
  sections: [
    {
      heading: 'Đọc, viết số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đọc, viết số từ trái sang phải: hàng chục nghìn, hàng nghìn, hàng trăm, hàng chục, hàng đơn vị.',
        },
        {
          type: 'table',
          head: ['Viết số', 'Đọc số'],
          rows: [
            ['36 515', 'ba mươi sáu nghìn năm trăm mười lăm'],
            ['61 034', 'sáu mươi mốt nghìn không trăm ba mươi tư'],
            ['20 809', 'hai mươi nghìn tám trăm linh chín'],
            ['7 941', 'bảy nghìn chín trăm bốn mươi mốt'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chữ số 0',
          text: 'Hàng trăm là 0 thì đọc "không trăm". Hàng chục là 0, hàng đơn vị khác 0 thì đọc "linh".',
        },
        {
          type: 'p',
          text: 'Em viết số thành tổng theo từng hàng. Hàng nào là 0 thì không viết: 86 209 = 80 000 + 6 000 + 200 + 9.',
        },
      ],
    },
    {
      heading: 'Số liền trước, số liền sau',
      blocks: [
        {
          type: 'p',
          text: 'Số liền sau hơn số đã cho 1 đơn vị. Số liền trước kém số đã cho 1 đơn vị.',
        },
        {
          type: 'table',
          head: ['Số liền trước', 'Số đã cho', 'Số liền sau'],
          rows: [
            ['42 134', '42 135', '42 136'],
            ['79 999', '80 000', '80 001'],
            ['99 998', '99 999', '100 000'],
          ],
        },
      ],
    },
    {
      heading: 'So sánh và sắp xếp số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số nào có ít chữ số hơn thì bé hơn. Hai số có cùng số chữ số thì so sánh từng hàng, từ trái sang phải.',
        },
        {
          type: 'p',
          text: '9 897 có bốn chữ số, 10 000 có năm chữ số. Vậy 9 897 < 10 000.',
        },
        {
          type: 'p',
          text: '68 534 và 68 499: hàng chục nghìn, hàng nghìn giống nhau. Ở hàng trăm: 5 > 4. Vậy 68 534 > 68 499.',
        },
      ],
    },
    {
      heading: 'Làm tròn số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Làm tròn đến hàng nghìn: em nhìn chữ số hàng trăm. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
        },
        {
          type: 'p',
          text: '12 967 có chữ số hàng trăm là 9. Vì 9 > 5 nên làm tròn lên: 12 967 làm tròn đến hàng nghìn được 13 000.',
        },
        {
          type: 'p',
          text: 'Làm tròn đến hàng chục nghìn: em nhìn chữ số hàng nghìn. 34 000 có chữ số hàng nghìn là 4, làm tròn được 30 000.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp thẻ vào bảng các hàng',
    instruction:
      'Em đọc tên số. Em kéo thẻ chữ số vào từng cột, hoặc chạm thẻ rồi chạm cột. Bảng sẽ đọc số, viết số thành tổng và làm tròn số cho em.',
  },
  examples: [
    {
      problem: 'Viết và đọc số gồm 9 chục nghìn, 4 nghìn, 5 đơn vị.',
      steps: [
        'Số có 9 chục nghìn, 4 nghìn, 0 trăm, 0 chục, 5 đơn vị.',
        'Viết lần lượt từ trái sang phải: 9, 4, 0, 0, 5. Số đó là 94 005.',
        'Hàng trăm là 0 đọc "không trăm", hàng chục là 0 đọc "linh".',
      ],
      answer: '94 005, đọc là chín mươi tư nghìn không trăm linh năm.',
    },
    {
      problem: 'So sánh 45 031 và 40 000 + 5 000 + 100 + 30.',
      steps: [
        'Tính tổng: 40 000 + 5 000 + 100 + 30 = 45 130.',
        'So sánh 45 031 và 45 130: hàng chục nghìn, hàng nghìn giống nhau.',
        'Ở hàng trăm: 0 < 1.',
      ],
      answer: '45 031 < 40 000 + 5 000 + 100 + 30.',
    },
    {
      problem: 'Làm tròn số 83 507 đến hàng nghìn và đến hàng chục nghìn.',
      steps: [
        'Đến hàng nghìn: chữ số hàng trăm là 5, làm tròn lên được 84 000.',
        'Đến hàng chục nghìn: chữ số hàng nghìn là 3, 3 < 5 nên làm tròn xuống được 80 000.',
      ],
      answer: '84 000 (hàng nghìn) và 80 000 (hàng chục nghìn).',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Em nối cách đọc với số.',
      left: [
        'Ba mươi sáu nghìn năm trăm mười lăm',
        'Sáu mươi mốt nghìn không trăm ba mươi tư',
        'Hai mươi nghìn tám trăm linh chín',
        'Bảy nghìn chín trăm bốn mươi mốt',
      ],
      right: ['36 515', '61 034', '20 809', '7 941', '20 890'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['"Linh" cho biết hàng chục là 0.', '"Không trăm" cho biết hàng trăm là 0.'],
      solution:
        'Ba mươi sáu nghìn năm trăm mười lăm: 36 515. Sáu mươi mốt nghìn không trăm ba mươi tư: 61 034. Hai mươi nghìn tám trăm linh chín: 20 809. Bảy nghìn chín trăm bốn mươi mốt: 7 941.',
    },
    {
      type: 'number',
      prompt: 'Em viết số gồm 5 chục nghìn, 7 trăm, 1 chục, 4 đơn vị.',
      answer: 50714,
      hints: ['Số này không có nghìn, nên chữ số hàng nghìn là 0.'],
      solution: 'Số gồm 5 chục nghìn, 0 nghìn, 7 trăm, 1 chục, 4 đơn vị. Viết là 50 714.',
    },
    {
      type: 'number',
      prompt: '33 471 = 30 000 + 3 000 + ? + 70 + 1. Số còn thiếu là số nào?',
      answer: 400,
      hints: ['Chữ số hàng trăm của 33 471 là 4.'],
      solution: '33 471 có 4 trăm. Số còn thiếu là 400.',
    },
    {
      type: 'choice',
      prompt: 'Số nào viết đúng thành tổng 50 000 + 700 + 30 + 8?',
      options: ['50 738', '57 038', '5 738'],
      answer: 0,
      hints: ['Tổng không có nghìn, nên chữ số hàng nghìn là 0.'],
      solution: '50 000 + 700 + 30 + 8 = 50 738.',
    },
    {
      type: 'number',
      prompt: 'Số liền sau của 79 999 là số nào?',
      answer: 80000,
      hints: ['Số liền sau hơn số đã cho 1 đơn vị.'],
      solution: '79 999 + 1 = 80 000.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 68 534 ? 68 499',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Hai số có cùng hàng chục nghìn, hàng nghìn. Em so sánh hàng trăm.'],
      solution: 'Ở hàng trăm: 5 > 4. Vậy 68 534 > 68 499.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 70 208 ? 60 000 + 9 000 + 700 + 9',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Em tính tổng ở vế phải trước.'],
      solution: '60 000 + 9 000 + 700 + 9 = 69 709. Ở hàng chục nghìn: 7 > 6. Vậy 70 208 > 69 709.',
    },
    {
      type: 'choice',
      prompt: 'Số nào bé nhất?',
      options: ['15 999', '16 000', '15 990', '19 500'],
      answer: 2,
      hints: ['Cả bốn số đều có năm chữ số. Em so sánh từng hàng từ trái sang phải.'],
      solution:
        '15 999, 15 990 có hàng nghìn là 5, bé hơn 16 000 và 19 500. So sánh 15 999 và 15 990: ở hàng đơn vị 9 > 0. Vậy số bé nhất là 15 990.',
    },
    {
      type: 'order',
      prompt:
        'Số liều vắc-xin tiêm được: Thứ Hai 35 060, Thứ Ba 32 541, Thứ Tư 37 243, Thứ Năm 29 419. Em xếp các ngày theo số liều từ ít đến nhiều.',
      items: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm'],
      answer: [3, 1, 0, 2],
      hints: [
        '29 419 chỉ có 2 chục nghìn, nên ít nhất.',
        'So sánh 32 541, 35 060, 37 243 ở hàng nghìn.',
      ],
      solution:
        '29 419 < 32 541 < 35 060 < 37 243. Từ ít đến nhiều: Thứ Năm, Thứ Ba, Thứ Hai, Thứ Tư.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn số 12 967 đến hàng nghìn ta được số nào?',
      options: ['13 000', '12 000', '10 000', '12 900'],
      answer: 0,
      hints: ['Em nhìn chữ số hàng trăm của 12 967.'],
      solution: 'Chữ số hàng trăm là 9. Vì 9 > 5 nên làm tròn lên: được 13 000.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 44 999 đến hàng chục nghìn ta được số nào?',
      answer: 40000,
      hints: ['Em nhìn chữ số hàng nghìn của 44 999.'],
      solution: 'Chữ số hàng nghìn là 4. Vì 4 < 5 nên làm tròn xuống: được 40 000.',
    },
    {
      type: 'number',
      prompt:
        'Em chuyển một que tính trong số 28 569 để được một số bé nhất. Chữ số 8 thành chữ số 0, chữ số 9 thành chữ số 8. Số mới là số nào?',
      answer: 20568,
      hints: ['Em đổi 8 thành 0 ở hàng nghìn và 9 thành 8 ở hàng đơn vị.'],
      solution:
        'Bỏ một que ở chữ số 8 (hàng nghìn) được chữ số 0. Que đó thêm vào chữ số 9 (hàng đơn vị) được chữ số 8. Số mới là 20 568.',
    },
  ],
  takeaways: [
    'Đọc, viết số từ hàng chục nghìn đến hàng đơn vị.',
    'Số liền sau hơn 1 đơn vị, số liền trước kém 1 đơn vị.',
    'Ít chữ số hơn thì bé hơn; cùng số chữ số thì so sánh từ trái sang phải.',
    'Làm tròn: chữ số bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
  ],
};
