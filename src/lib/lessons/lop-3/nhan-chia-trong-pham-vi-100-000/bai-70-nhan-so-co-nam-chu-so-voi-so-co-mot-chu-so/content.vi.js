/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính rồi tính phép nhân số có năm chữ số với số có một chữ số, không nhớ và có nhớ; tách số theo hàng để hiểu phép nhân; nhân nhẩm số tròn nghìn.',
  intro:
    'Mỗi lần người ta chuyển 15 250 kg thóc vào kho. 3 lần như thế chuyển được bao nhiêu ki-lô-gam thóc? Em đặt tính rồi nhân từng hàng, từ phải sang trái nhé!',
  objectives: [
    'Đặt tính và nhân số có năm chữ số với số có một chữ số.',
    'Biết nhân có nhớ: thêm số đã nhớ vào hàng tiếp theo.',
    'Tách số theo hàng chục nghìn, nghìn, trăm, chục, đơn vị để nhân.',
    'Nhân nhẩm số tròn nghìn.',
  ],
  sections: [
    {
      heading: 'Nhân không nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 12 132 × 3.' },
        {
          type: 'p',
          text: 'Em đặt tính: viết 12 132, viết 3 thẳng cột với chữ số hàng đơn vị, viết dấu nhân, kẻ vạch ngang.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '3 nhân 2 bằng 6, viết 6.',
            '3 nhân 3 bằng 9, viết 9.',
            '3 nhân 1 bằng 3, viết 3.',
            '3 nhân 2 bằng 6, viết 6.',
            '3 nhân 1 bằng 3, viết 3.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '12 132 × 3 = 36 396.' },
      ],
    },
    {
      heading: 'Nhân có nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 31 504 × 3.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '3 nhân 4 bằng 12, viết 2, nhớ 1.',
            '3 nhân 0 bằng 0, thêm 1 bằng 1, viết 1.',
            '3 nhân 5 bằng 15, viết 5, nhớ 1.',
            '3 nhân 1 bằng 3, thêm 1 bằng 4, viết 4.',
            '3 nhân 3 bằng 9, viết 9.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '31 504 × 3 = 94 512.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em nhân từ phải sang trái, bắt đầu từ hàng đơn vị. Sau mỗi hàng, em thêm số đã nhớ vào hàng tiếp theo.',
        },
      ],
    },
    {
      heading: 'Tách số theo hàng',
      blocks: [
        { type: 'p', text: '31 504 gồm 3 chục nghìn, 1 nghìn, 5 trăm, 0 chục và 4 đơn vị.' },
        { type: 'p', text: 'Em nhân từng phần với 3, rồi cộng lại.' },
        {
          type: 'table',
          head: ['Phần', 'Nhân với 3'],
          rows: [
            ['30 000', '30 000 × 3 = 90 000'],
            ['1 000', '1 000 × 3 = 3 000'],
            ['500', '500 × 3 = 1 500'],
            ['4', '4 × 3 = 12'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cộng lại',
          text: '90 000 + 3 000 + 1 500 + 12 = 94 512. Đúng bằng 31 504 × 3.',
        },
      ],
    },
    {
      heading: 'Nhân nhẩm số tròn nghìn',
      blocks: [
        { type: 'p', text: 'Em tính nhẩm 11 000 × 9.' },
        { type: 'p', text: 'Em nhẩm: 11 nghìn × 9 = 99 nghìn.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '11 000 × 9 = 99 000.' },
        { type: 'p', text: 'Tương tự: 15 nghìn × 6 = 90 nghìn, nên 15 000 × 6 = 90 000.' },
      ],
    },
  ],
  explore: {
    title: 'Nhân từng hàng',
    instruction:
      'Em nhân từ hàng đơn vị, chạm vào chữ số để viết. Số nhớ hiện màu đỏ trên hàng bên trái. Mỗi hàng viết xong, dòng cùng màu bên dưới cho biết phần đó nhân với số kia bằng bao nhiêu.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 23 160 × 4.',
      steps: [
        '4 nhân 0 bằng 0, viết 0.',
        '4 nhân 6 bằng 24, viết 4, nhớ 2.',
        '4 nhân 1 bằng 4, thêm 2 bằng 6, viết 6.',
        '4 nhân 3 bằng 12, viết 2, nhớ 1.',
        '4 nhân 2 bằng 8, thêm 1 bằng 9, viết 9.',
      ],
      answer: '23 160 × 4 = 92 640.',
    },
    {
      problem:
        'Mỗi lần người ta chuyển 15 250 kg thóc vào kho. Hỏi 3 lần như thế chuyển được bao nhiêu ki-lô-gam thóc vào kho?',
      steps: [
        '15 250 kg được lấy 3 lần, em làm phép nhân: 15 250 × 3.',
        '3 nhân 0 bằng 0, viết 0. 3 nhân 5 bằng 15, viết 5, nhớ 1.',
        '3 nhân 2 bằng 6, thêm 1 bằng 7, viết 7. 3 nhân 5 bằng 15, viết 5, nhớ 1.',
        '3 nhân 1 bằng 3, thêm 1 bằng 4, viết 4.',
        '15 250 × 3 = 45 750 (kg).',
      ],
      answer: '3 lần chuyển được 45 750 kg thóc.',
    },
    {
      problem:
        'Có 3 bể, mỗi bể chứa 12 000 l dầu. Người ta lấy ra 21 000 l dầu. Hỏi còn lại bao nhiêu lít dầu?',
      steps: [
        'Ba bể chứa: 12 000 × 3 = 36 000 (l). Em nhẩm 12 nghìn × 3 = 36 nghìn.',
        'Còn lại: 36 000 − 21 000 = 15 000 (l).',
      ],
      answer: 'Còn lại 15 000 l dầu.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '10 706 × 9 bằng bao nhiêu?',
      options: ['96 354', '90 304', '96 254', '95 354'],
      answer: 0,
      hints: [
        '9 nhân 6 bằng 54. Em viết 4, nhớ 5.',
        'Hàng chục: 9 nhân 0 bằng 0, rồi thêm 5 đã nhớ.',
      ],
      solution:
        '9 nhân 6 bằng 54, viết 4, nhớ 5. 9 nhân 0 bằng 0, thêm 5 bằng 5, viết 5. 9 nhân 7 bằng 63, viết 3, nhớ 6. 9 nhân 0 bằng 0, thêm 6 bằng 6, viết 6. 9 nhân 1 bằng 9, viết 9. Vậy 10 706 × 9 = 96 354.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 12 061 × 8 = ?',
      answer: 96488,
      hints: ['8 nhân 1 bằng 8, viết 8.', 'Hàng chục: 8 nhân 6 bằng 48, viết 8, nhớ 4.'],
      solution:
        '8 nhân 1 bằng 8, viết 8. 8 nhân 6 bằng 48, viết 8, nhớ 4. 8 nhân 0 bằng 0, thêm 4 bằng 4, viết 4. 8 nhân 2 bằng 16, viết 6, nhớ 1. 8 nhân 1 bằng 8, thêm 1 bằng 9, viết 9. Vậy 12 061 × 8 = 96 488.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi ngày nhà máy làm được 15 108 chai nước. Hỏi 5 ngày nhà máy làm được bao nhiêu chai nước?',
      answer: 75540,
      unit: 'chai',
      hints: ['15 108 chai được lấy 5 lần, em làm phép nhân.', '5 nhân 8 bằng 40, viết 0, nhớ 4.'],
      solution:
        '5 nhân 8 bằng 40, viết 0, nhớ 4. 5 nhân 0 bằng 0, thêm 4 bằng 4, viết 4. 5 nhân 1 bằng 5, viết 5. 5 nhân 5 bằng 25, viết 5, nhớ 2. 5 nhân 1 bằng 5, thêm 2 bằng 7, viết 7. 5 ngày làm được 15 108 × 5 = 75 540 (chai nước).',
    },
    {
      type: 'match',
      prompt: 'Tính nhẩm rồi nối mỗi phép nhân với kết quả của nó.',
      left: ['11 000 × 9', '21 000 × 3', '15 000 × 6', '12 000 × 4'],
      right: ['99 000', '63 000', '90 000', '48 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['11 000 là 11 nghìn.', 'Em nhẩm: 15 nghìn × 6 = 90 nghìn.'],
      solution:
        '11 nghìn × 9 = 99 nghìn: 11 000 × 9 = 99 000. 21 nghìn × 3 = 63 nghìn: 21 000 × 3 = 63 000. 15 nghìn × 6 = 90 nghìn: 15 000 × 6 = 90 000. 12 nghìn × 4 = 48 nghìn: 12 000 × 4 = 48 000.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 31 624 × 3 theo đúng thứ tự.',
      items: [
        '3 nhân 6 bằng 18, viết 8, nhớ 1',
        '3 nhân 3 bằng 9, viết 9',
        '3 nhân 4 bằng 12, viết 2, nhớ 1',
        '3 nhân 1 bằng 3, thêm 1 bằng 4, viết 4',
        '3 nhân 2 bằng 6, thêm 1 bằng 7, viết 7',
      ],
      answer: [2, 4, 0, 3, 1],
      hints: ['Em nhân từ hàng đơn vị trước: 3 nhân 4.', 'Hàng chục nghìn làm sau cùng.'],
      solution:
        '3 nhân 4 bằng 12, viết 2, nhớ 1. 3 nhân 2 bằng 6, thêm 1 bằng 7, viết 7. 3 nhân 6 bằng 18, viết 8, nhớ 1. 3 nhân 1 bằng 3, thêm 1 bằng 4, viết 4. 3 nhân 3 bằng 9, viết 9. Vậy 31 624 × 3 = 94 872.',
    },
    {
      type: 'choice',
      prompt:
        'An tính 15 041 × 3 như sau: 3 nhân 1 bằng 3, viết 3. 3 nhân 4 bằng 12, viết 2, nhớ 1. 3 nhân 0 bằng 0, viết 0. 3 nhân 5 bằng 15, viết 5, nhớ 1. 3 nhân 1 bằng 3, thêm 1 bằng 4, viết 4. An được 45 023. An làm đúng hay sai?',
      options: [
        'Sai, ở hàng trăm An quên thêm 1 đã nhớ',
        'Đúng rồi',
        'Sai, ở hàng chục An quên thêm 1 đã nhớ',
      ],
      answer: 0,
      hints: ['Hàng chục nhớ 1 sang hàng trăm. Em xem An có thêm số 1 đó không.'],
      solution:
        'Hàng trăm: 3 nhân 0 bằng 0, phải thêm 1 bằng 1, viết 1. Vậy 15 041 × 3 = 45 123, không phải 45 023.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 26 745 + 12 071 × 6.',
      answer: 99171,
      hints: ['Em làm phép nhân trước, phép cộng sau.', 'Em tính 12 071 × 6 trước.'],
      solution: '12 071 × 6 = 72 426. Vậy 26 745 + 12 071 × 6 = 26 745 + 72 426 = 99 171.',
    },
    {
      type: 'number',
      prompt:
        'Việt mua 6 quyển vở, mỗi quyển giá 6 000 đồng. Việt đưa cô bán hàng 100 000 đồng. Hỏi cô bán hàng trả lại Việt bao nhiêu tiền?',
      answer: 64000,
      unit: 'đồng',
      hints: [
        'Trước hết em tính tiền mua 6 quyển vở.',
        'Em nhẩm 6 nghìn × 6, rồi lấy 100 000 trừ đi.',
      ],
      solution:
        'Tiền mua 6 quyển vở: 6 000 × 6 = 36 000 (đồng). Tiền trả lại: 100 000 − 36 000 = 64 000 (đồng).',
    },
    {
      type: 'choice',
      prompt:
        'Hai vườn ươm, mỗi vườn có 14 000 cây giống. Vườn thứ ba có 15 000 cây giống. Cả ba vườn có bao nhiêu cây giống?',
      options: ['43 000 cây', '29 000 cây', '44 000 cây', '42 000 cây'],
      answer: 0,
      hints: ['Hai vườn đầu có 14 000 × 2 cây.', 'Rồi em cộng thêm số cây của vườn thứ ba.'],
      solution:
        'Hai vườn đầu có: 14 000 × 2 = 28 000 (cây). Cả ba vườn có: 28 000 + 15 000 = 43 000 (cây).',
    },
  ],
  takeaways: [
    'Đặt tính: viết thừa số có một chữ số thẳng cột với hàng đơn vị.',
    'Nhân từ phải sang trái, thêm số đã nhớ vào hàng tiếp theo.',
    'Nhân nhẩm: 11 nghìn × 9 = 99 nghìn.',
  ],
};
